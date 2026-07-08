"use client"

import { useReducer, useCallback, useEffect } from "react"

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

export interface GameCard {
  id: number
  slug: string
  name_ro: string
  name_en: string
  cost: number | null
  production: number | null
  marketing: number | null
  expense: number | null
  calculation: string | null
  format: string | null
  image_card: string | null
  image_thumb: string | null
  image_micro: string | null
  special_effect_ro: string | null
  special_effect_en: string | null
  sort_order: number | null
  card_types: { slug: string; name_ro: string; name_en: string } | null
  asset_types: { slug: string; name_ro: string; name_en: string } | null
  card_sets: { slug: string; name_ro: string; name_en: string } | null
}

export interface QuarterRecord {
  year: number
  quarter: number
  production: number
  marketing: number
  sales: number
  expenses: number
  profit: number
  cash: number
  cardsBought: string[]
  cardsEliminated: string[]
}

export type GamePhase =
  | "setup"         // configure game before start
  | "draw"          // auto: draw 5 cards
  | "calculate"     // show result, player reviews
  | "action"        // player picks: buy / eliminate / skip
  | "buy"           // player picks a market card to buy
  | "eliminate"     // player picks a hand card to eliminate
  | "endturn"       // wrap up turn, move cards to discard
  | "yearend"       // show annual summary
  | "gameover"      // show final screen

export interface GameSettings {
  totalYears: number
  startingDeck: string[]  // slugs of starting cards
}

export interface GameState {
  settings: GameSettings
  phase: GamePhase
  year: number
  quarter: number           // 1–4
  cash: number
  bankruptcies: number
  winTarget: number         // starts at 20, +10 per bankruptcy

  deck: GameCard[]
  hand: GameCard[]          // 5 drawn cards
  discardPile: GameCard[]
  eliminatedCards: GameCard[]
  entrepreneurCard: GameCard | null
  activeEvent: GameCard | null

  market: GameCard[][]      // array of stacks (top card visible)

  // Current quarter calculation
  calc: {
    production: number
    marketing: number
    sales: number
    expenses: number
    profit: number
  }

  // Action tracking for this quarter
  actionTaken: "buy" | "eliminate" | "skip" | null
  cardBoughtThisTurn: string | null
  cardEliminatedThisTurn: string | null

  history: QuarterRecord[]
  message: string | null    // feedback message to player
}

// ─────────────────────────────────────────
// Constants
// ─────────────────────────────────────────

export const DEFAULT_STARTING_SLUGS = [
  "s102", "s104", "s105", "s106", "s107",
  "s111", "s115", "s116", "s118", "s119",
]

const STORAGE_KEY = "ezplay_game_state"

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function calcQuarter(hand: GameCard[], entrepreneur: GameCard | null, event: GameCard | null) {
  const cards = [...hand, ...(entrepreneur ? [entrepreneur] : []), ...(event ? [event] : [])]
  const production = cards.reduce((s, c) => s + (c.production ?? 0), 0)
  const marketing = cards.reduce((s, c) => s + (c.marketing ?? 0), 0)
  const sales = Math.min(production, marketing)
  const expenses = cards.reduce((s, c) => s + (c.expense ?? 0), 0)
  const profit = sales - expenses
  return { production, marketing, sales, expenses, profit }
}

function buildInitialDeck(slugs: string[], allCards: GameCard[]): GameCard[] {
  return shuffle(
    slugs.map(slug => allCards.find(c => c.slug === slug)).filter(Boolean) as GameCard[]
  )
}

function buildMarket(allCards: GameCard[], numStacks: number): GameCard[][] {
  // Exclude entrepreneur cards and event cards from market
  const marketable = allCards.filter(c =>
    c.card_types?.slug !== "entrepreneur" &&
    c.card_types?.slug !== "event" &&
    (c.cost ?? 0) > 0
  )
  const shuffledMarket = shuffle(marketable)

  const stacks: GameCard[][] = []
  const cardsPerStack = Math.max(3, Math.floor(shuffledMarket.length / numStacks))
  for (let i = 0; i < numStacks; i++) {
    stacks.push(shuffledMarket.slice(i * cardsPerStack, (i + 1) * cardsPerStack))
  }
  return stacks
}

function drawCards(deck: GameCard[], discard: GameCard[], needed: number): { drawn: GameCard[], newDeck: GameCard[], newDiscard: GameCard[] } {
  let d = [...deck]
  let disc = [...discard]
  const drawn: GameCard[] = []

  while (drawn.length < needed) {
    if (d.length === 0) {
      if (disc.length === 0) break
      d = shuffle(disc)
      disc = []
    }
    drawn.push(d.shift()!)
  }

  return { drawn, newDeck: d, newDiscard: disc }
}

// ─────────────────────────────────────────
// Reducer actions
// ─────────────────────────────────────────

type Action =
  | { type: "START_GAME"; allCards: GameCard[]; settings: GameSettings }
  | { type: "DRAW_CARDS" }
  | { type: "CONFIRM_CALCULATION" }
  | { type: "ACTION_BUY_START" }
  | { type: "ACTION_ELIMINATE_START" }
  | { type: "ACTION_SKIP" }
  | { type: "BUY_CARD"; stackIdx: number }
  | { type: "ELIMINATE_CARD"; cardId: number }
  | { type: "END_TURN" }
  | { type: "CONFIRM_YEAR_END" }
  | { type: "NEW_GAME" }
  | { type: "LOAD_STATE"; state: GameState }
  | { type: "UPDATE_SETTINGS"; settings: GameSettings }

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {

    case "UPDATE_SETTINGS": {
      return { ...state, settings: action.settings }
    }

    case "START_GAME": {
      const { allCards, settings } = action
      const entrepreneur = allCards.find(c => c.card_types?.slug === "entrepreneur") ?? null
      const events = shuffle(allCards.filter(c => c.card_types?.slug === "event"))
      const deck = buildInitialDeck(settings.startingDeck, allCards)
      // Market: 2 stacks for solo game (N+1 where N=1)
      const market = buildMarket(
        allCards.filter(c => !settings.startingDeck.includes(c.slug) && c.slug !== entrepreneur?.slug),
        2
      )

      const { drawn, newDeck, newDiscard } = drawCards(deck, [], 5)
      const calc = calcQuarter(drawn, entrepreneur, null)

      return {
        ...state,
        settings,
        phase: "calculate",
        year: 1,
        quarter: 1,
        cash: 10,
        bankruptcies: 0,
        winTarget: 20,
        deck: newDeck,
        hand: drawn,
        discardPile: newDiscard,
        eliminatedCards: [],
        entrepreneurCard: entrepreneur,
        activeEvent: null,
        market,
        calc,
        actionTaken: null,
        cardBoughtThisTurn: null,
        cardEliminatedThisTurn: null,
        history: [],
        message: null,
      }
    }

    case "DRAW_CARDS": {
      const { drawn, newDeck, newDiscard } = drawCards(state.deck, state.discardPile, 5)
      const calc = calcQuarter(drawn, state.entrepreneurCard, state.activeEvent)
      return {
        ...state,
        phase: "calculate",
        hand: drawn,
        deck: newDeck,
        discardPile: newDiscard,
        calc,
        actionTaken: null,
        cardBoughtThisTurn: null,
        cardEliminatedThisTurn: null,
        message: null,
      }
    }

    case "CONFIRM_CALCULATION": {
      // Apply profit/loss to cash
      const newCash = state.cash + state.calc.profit
      // Check bankruptcy: cash < 0 after profit
      if (newCash < 0) {
        const record: QuarterRecord = {
          year: state.year, quarter: state.quarter,
          ...state.calc, cash: newCash,
          cardsBought: [], cardsEliminated: [],
        }
        return {
          ...state,
          cash: newCash,
          phase: "gameover",
          history: [...state.history, record],
          message: "Faliment! Cash-ul tău a scăzut sub 0.",
        }
      }
      return { ...state, cash: newCash, phase: "action", message: null }
    }

    case "ACTION_BUY_START":
      return { ...state, phase: "buy", message: "Alege o carte din Piața Liberă." }

    case "ACTION_ELIMINATE_START":
      return { ...state, phase: "eliminate", message: "Alege o carte din mână pentru a o elimina (cost: 1 ban)." }

    case "ACTION_SKIP": {
      return { ...state, phase: "endturn", actionTaken: "skip", message: null }
    }

    case "BUY_CARD": {
      const { stackIdx } = action
      const stack = state.market[stackIdx]
      if (!stack || stack.length === 0) return state
      const card = stack[0]
      const cost = card.cost ?? 0
      if (state.cash < cost) return { ...state, message: "Nu ai suficient cash pentru a cumpăra această carte!" }

      const newStack = stack.slice(1)
      const newMarket = state.market.map((s, i) => i === stackIdx ? newStack : s)
      return {
        ...state,
        cash: state.cash - cost,
        discardPile: [...state.discardPile, card],
        market: newMarket,
        phase: "endturn",
        actionTaken: "buy",
        cardBoughtThisTurn: card.slug,
        message: `Ai cumpărat: ${card.name_ro} (cost: ${cost} bani)`,
      }
    }

    case "ELIMINATE_CARD": {
      const eliminationCost = 1
      if (state.cash < eliminationCost) return { ...state, message: "Nu ai suficient cash (1 ban) pentru eliminare!" }
      const card = state.hand.find(c => c.id === action.cardId)
      if (!card) return state
      return {
        ...state,
        cash: state.cash - eliminationCost,
        hand: state.hand.filter(c => c.id !== action.cardId),
        eliminatedCards: [...state.eliminatedCards, card],
        phase: "endturn",
        actionTaken: "eliminate",
        cardEliminatedThisTurn: card.slug,
        message: `Ai eliminat: ${card.name_ro}`,
      }
    }

    case "END_TURN": {
      const record: QuarterRecord = {
        year: state.year,
        quarter: state.quarter,
        ...state.calc,
        cash: state.cash,
        cardsBought: state.cardBoughtThisTurn ? [state.cardBoughtThisTurn] : [],
        cardsEliminated: state.cardEliminatedThisTurn ? [state.cardEliminatedThisTurn] : [],
      }
      const newHistory = [...state.history, record]

      // Check win condition
      if (state.cash >= state.winTarget) {
        return { ...state, history: newHistory, phase: "gameover", message: `Felicitări! Ai câștigat cu ${state.cash} bani!` }
      }

      // Move hand to discard (except eliminated)
      const newDiscard = [...state.discardPile, ...state.hand]

      // Check year end
      if (state.quarter === 4) {
        return {
          ...state,
          history: newHistory,
          discardPile: newDiscard,
          hand: [],
          phase: "yearend",
          message: null,
        }
      }

      // Next quarter: draw immediately
      const nextQuarter = state.quarter + 1
      const { drawn, newDeck, newDiscard: nd2 } = drawCards(state.deck, newDiscard, 5)
      const calc = calcQuarter(drawn, state.entrepreneurCard, state.activeEvent)

      return {
        ...state,
        history: newHistory,
        quarter: nextQuarter,
        deck: newDeck,
        hand: drawn,
        discardPile: nd2,
        calc,
        phase: "calculate",
        actionTaken: null,
        cardBoughtThisTurn: null,
        cardEliminatedThisTurn: null,
        message: null,
      }
    }

    case "CONFIRM_YEAR_END": {
      const nextYear = state.year + 1
      if (nextYear > state.settings.totalYears) {
        return { ...state, phase: "gameover", message: "Jocul s-a terminat! Verifică capitalizarea finală." }
      }

      // Pick event for year >= 2
      const allEventCards = state.history.length > 0
        ? [] // we don't store event pool in state — we'll handle this differently
        : []

      const newDiscard = [...state.discardPile, ...state.hand]
      const { drawn, newDeck, newDiscard: nd2 } = drawCards(state.deck, newDiscard, 5)
      const calc = calcQuarter(drawn, state.entrepreneurCard, state.activeEvent)

      return {
        ...state,
        year: nextYear,
        quarter: 1,
        deck: newDeck,
        hand: drawn,
        discardPile: nd2,
        calc,
        phase: "calculate",
        actionTaken: null,
        cardBoughtThisTurn: null,
        cardEliminatedThisTurn: null,
        message: null,
      }
    }

    case "NEW_GAME": {
      return { ...state, phase: "setup", message: null }
    }

    case "LOAD_STATE":
      return action.state

    default:
      return state
  }
}

// ─────────────────────────────────────────
// Initial state
// ─────────────────────────────────────────

const initialState: GameState = {
  settings: {
    totalYears: 3,
    startingDeck: DEFAULT_STARTING_SLUGS,
  },
  phase: "setup",
  year: 1,
  quarter: 1,
  cash: 10,
  bankruptcies: 0,
  winTarget: 20,
  deck: [],
  hand: [],
  discardPile: [],
  eliminatedCards: [],
  entrepreneurCard: null,
  activeEvent: null,
  market: [],
  calc: { production: 0, marketing: 0, sales: 0, expenses: 0, profit: 0 },
  actionTaken: null,
  cardBoughtThisTurn: null,
  cardEliminatedThisTurn: null,
  history: [],
  message: null,
}

// ─────────────────────────────────────────
// Hook
// ─────────────────────────────────────────

export function useGameEngine(allCards: GameCard[]) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as GameState
        // Only load if it was an active game (not setup)
        if (parsed.phase && parsed.phase !== "setup") {
          dispatch({ type: "LOAD_STATE", state: parsed })
        }
      }
    } catch { /* ignore */ }
  }, [])

  // Save to localStorage whenever state changes (except setup)
  useEffect(() => {
    if (state.phase !== "setup") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      } catch { /* ignore */ }
    }
  }, [state])

  const startGame = useCallback((settings: GameSettings) => {
    dispatch({ type: "START_GAME", allCards, settings })
  }, [allCards])

  const confirmCalculation = useCallback(() => dispatch({ type: "CONFIRM_CALCULATION" }), [])
  const startBuy = useCallback(() => dispatch({ type: "ACTION_BUY_START" }), [])
  const startEliminate = useCallback(() => dispatch({ type: "ACTION_ELIMINATE_START" }), [])
  const skipAction = useCallback(() => dispatch({ type: "ACTION_SKIP" }), [])
  const buyCard = useCallback((stackIdx: number) => dispatch({ type: "BUY_CARD", stackIdx }), [])
  const eliminateCard = useCallback((cardId: number) => dispatch({ type: "ELIMINATE_CARD", cardId }), [])
  const endTurn = useCallback(() => dispatch({ type: "END_TURN" }), [])
  const confirmYearEnd = useCallback(() => dispatch({ type: "CONFIRM_YEAR_END" }), [])
  const newGame = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    dispatch({ type: "NEW_GAME" })
  }, [])
  const updateSettings = useCallback((settings: GameSettings) => dispatch({ type: "UPDATE_SETTINGS", settings }), [])

  // Computed: annual summary from history
  const annualSummary = useCallback((year: number) => {
    const quarters = state.history.filter(r => r.year === year)
    if (quarters.length === 0) return null
    return {
      revenue: quarters.reduce((s, q) => s + q.sales, 0),
      profit: quarters.reduce((s, q) => s + q.profit, 0),
      quarters,
    }
  }, [state.history])

  // Equity = cash + cost of all cards in deck + discard (bought cards value)
  const equity = (() => {
    const ownedCards = [...state.deck, ...state.discardPile]
    const cardValue = ownedCards.reduce((s, c) => s + (c.cost ?? 0), 0)
    return state.cash + cardValue
  })()

  return {
    state,
    equity,
    startGame,
    confirmCalculation,
    startBuy,
    startEliminate,
    skipAction,
    buyCard,
    eliminateCard,
    endTurn,
    confirmYearEnd,
    newGame,
    updateSettings,
    annualSummary,
  }
}

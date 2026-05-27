
import type { GameState, PlayerState, Card } from '../types';
import { nextRandom } from './prng';
import { coreDefaultConfig } from './defaults';

/**
 * Shuffles an array using the PRNG seed.
 */
export const shuffle = <T,>(array: T[], seed: number): { shuffledArray: T[]; nextSeed: number } => {
  const newArray = [...array];
  let currentSeed = seed;
  for (let i = newArray.length - 1; i > 0; i--) {
    const { value, nextSeed } = nextRandom(currentSeed);
    currentSeed = nextSeed;
    const j = Math.floor(value * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return { shuffledArray: newArray, nextSeed: currentSeed };
};

/**
 * Draws cards from a deck, reshuffling the discard pile if necessary.
 */
export const drawCards = (currentDeck: Card[], currentDiscard: Card[], count: number, seed: number): { newHand: Card[]; nextDeck: Card[]; nextDiscard: Card[]; nextSeed: number } => {
    const newHand: Card[] = [];
    let deck: Card[] = [...currentDeck];
    let discard: Card[] = [...currentDiscard];
    let nextSeed = seed;

    for (let i = 0; i < count; i++) {
        if (deck.length === 0) {
            if (discard.length === 0) {
                break; // No cards left to draw anywhere
            }
            // Shuffle the discard pile to create a new deck
            const shuffleResult = shuffle(discard, nextSeed);
            deck = shuffleResult.shuffledArray;
            nextSeed = shuffleResult.nextSeed;
            discard = []; // The discard pile is now empty
        }
        const drawnCard = deck.pop();
        if (drawnCard) {
            newHand.push(drawnCard);
        }
    }
    // Return the final state of the piles
    return { newHand, nextDeck: deck, nextDiscard: discard, nextSeed };
};

/**
 * Helper to update the state of the currently active player.
 */
export const updateActivePlayer = (state: GameState, updater: (player: PlayerState) => PlayerState): GameState => {
    const activePlayer = state.players[state.activePlayerIndex];
    if (!activePlayer) return state;
    const updatedPlayer = updater(activePlayer);
    const newPlayers = state.players.map((p, index) => index === state.activePlayerIndex ? updatedPlayer : p);
    return { ...state, players: newPlayers };
};

export const initialState: GameState = {
  seed: 0,
  actionLog: [],
  marketPiles: [],
  marketSetup: [],
  currentYear: 1,
  currentQuarter: 1,
  yearlyBuys: 0,
  yearlyRetirements: 0,
  eventDeck: [],
  activeEvent: null,
  discardedEvents: [],
  config: coreDefaultConfig,
  players: [],
  activePlayerIndex: 0,
  isGameOver: false,
  gameOverReason: null,
  scenario: null,
  objective: null,
  winnerPlayerIndex: null,
};

/**
 * Migrates a saved game state from the old 'sales' naming to the new 'marketing' naming.
 * This ensures backwards-compatibility for existing local storage or cloud game saves.
 */
export const migrateSavedState = (state: any): any => {
    if (!state) return state;

    const migrateCard = (card: any): any => {
        if (!card) return card;
        
        let originalCard = card.originalCard;
        if (originalCard) {
            originalCard = migrateCard(originalCard);
        }

        const marketing = card.marketing !== undefined 
            ? card.marketing 
            : (card.sales !== undefined ? card.sales : 0);

        const originalMarketing = card.originalMarketing !== undefined 
            ? card.originalMarketing 
            : (card.originalSales !== undefined ? card.originalSales : undefined);

        const newCard = {
            ...card,
            marketing,
        };

        if (originalCard) {
            newCard.originalCard = originalCard;
        }

        if (originalMarketing !== undefined) {
            newCard.originalMarketing = originalMarketing;
        }

        delete newCard.sales;
        delete newCard.originalSales;

        return newCard;
    };

    const migratePlayer = (player: any): any => {
        if (!player) return player;

        const quarterlyHistory = (player.history?.quarterly || []).map((q: any) => {
            if (!q) return q;
            const marketing = q.marketing !== undefined 
                ? q.marketing 
                : (q.sales !== undefined ? q.sales : 0);
            
            const newQ = {
                ...q,
                marketing,
            };
            delete newQ.sales;
            return newQ;
        });

        const cardChoices = { ...player.cardChoices };
        for (const uid in cardChoices) {
            if (cardChoices[uid] === 'sales') {
                cardChoices[uid] = 'marketing';
            }
        }

        let lastAction = player.lastAction;
        if (lastAction && lastAction.card) {
            lastAction = {
                ...lastAction,
                card: migrateCard(lastAction.card)
            };
        }

        return {
            ...player,
            deck: (player.deck || []).map(migrateCard),
            hand: (player.hand || []).map(migrateCard),
            discard: (player.discard || []).map(migrateCard),
            retiredCards: (player.retiredCards || []).map(migrateCard),
            activeConsultants: (player.activeConsultants || []).map(migrateCard),
            entrepreneur: migrateCard(player.entrepreneur),
            accountant: migrateCard(player.accountant),
            lastAction,
            cardChoices,
            history: player.history ? {
                ...player.history,
                quarterly: quarterlyHistory,
            } : player.history,
        };
    };

    const migrateAction = (action: any): any => {
        if (!action) return action;
        const newPayload = { ...action.payload };
        if (newPayload.card) {
            newPayload.card = migrateCard(newPayload.card);
        }
        if (newPayload.cards) {
            newPayload.cards = (newPayload.cards || []).map(migrateCard);
        }
        if (newPayload.setup) {
            const setup = newPayload.setup;
            newPayload.setup = {
                ...setup,
                selectedEntrepreneur: migrateCard(setup.selectedEntrepreneur),
                selectedAccountant: migrateCard(setup.selectedAccountant),
                finalDeck: (setup.finalDeck || []).map(migrateCard),
            };
        }
        return { ...action, payload: newPayload };
    };

    const actionLog = (state.actionLog || []).map((entry: any) => {
        if (!entry) return entry;
        return {
            ...entry,
            action: migrateAction(entry.action),
        };
    });

    return {
        ...state,
        marketPiles: (state.marketPiles || []).map((pile: any[]) => (pile || []).map(migrateCard)),
        eventDeck: (state.eventDeck || []).map(migrateCard),
        discardedEvents: (state.discardedEvents || []).map(migrateCard),
        activeEvent: migrateCard(state.activeEvent),
        players: (state.players || []).map(migratePlayer),
        actionLog,
    };
};


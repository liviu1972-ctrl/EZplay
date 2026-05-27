
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

import type { Card } from '../types';

interface BuildDeckOptions {
    pool: Card[];
    budget: number;
    deckSize: number;
}

interface BuildDeckResult {
    deck: Card[];
    remainingCash: number;
}

/**
 * Automatically builds a starting deck based on a budget and a pool of available cards.
 * It uses a simple greedy algorithm, prioritizing cheaper cards.
 * 
 * @param options - The configuration for building the deck.
 * @returns An object containing the built deck and the remaining cash.
 */
export const autoBuildDeck = (options: BuildDeckOptions): BuildDeckResult => {
    const { pool, budget, deckSize } = options;

    let cash = budget;
    const deck: Card[] = [];
    
    // Create a mutable copy of the pool. The pool might contain multiple copies of the 
    // same card definition (e.g. from playerCount scaling), which is intended.
    let currentPool = pool.map((card, index) => ({
      ...card,
      uid: `pool-autobuild-${card.globalId}-${index}-${Math.random()}`
    }));

    // Sort by cost ascending to prioritize cheaper cards
    currentPool.sort((a, b) => a.cost - b.cost);
    
    while (deck.length < deckSize && currentPool.length > 0) {
      // Find the first affordable card in the sorted pool
      const affordableCardIndex = currentPool.findIndex(card => cash >= card.cost);
      
      if (affordableCardIndex !== -1) {
        const cardToAdd = currentPool[affordableCardIndex];
        
        cash -= cardToAdd.cost;
        deck.push({ ...cardToAdd, uid: `startdeck-${cardToAdd.id}-${Date.now()}-${deck.length}` });
        
        // Remove it from the pool so it cannot be chosen again
        currentPool.splice(affordableCardIndex, 1);
      } else {
        break; // No affordable cards left
      }
    }

    return {
        deck,
        remainingCash: cash,
    };
};

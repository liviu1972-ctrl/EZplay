
import type { Card, GameAction, GameState, PlayerState } from '../types';
import { getEffectiveCost, getRetireCost } from './selectors';

// --- ACTION CREATORS (PURE FUNCTIONS) ---

export const createBuyCardAction = (sharedState: GameState, playerState: PlayerState, card: Card, pileIndex: number): GameAction | null => {
    const { cash, bonusBuy, actionsRemainingThisTurn, activeConsultants } = playerState;
    const { config } = sharedState;

    if (card.type === 'consultant' && activeConsultants.length >= config.maxActiveConsultants) {
        // Cannot buy consultant. Maximum number of active consultants reached.
        return null;
    }
    
    const effectiveCost = getEffectiveCost(card.cost, sharedState, playerState);

    // Bonus buy logic
    if (bonusBuy && cash >= effectiveCost && card.cost <= bonusBuy.maxCost && card.assetType === bonusBuy.assetType) {
        return { type: 'BUY_CARD', payload: { card, pileIndex, costPaid: effectiveCost, isBonus: true } };
    }

    // Normal buy logic
    if (actionsRemainingThisTurn <= 0 || cash < effectiveCost) {
        // Cannot buy card. Action performed or not enough cash.
        return null;
    }
    
    return { type: 'BUY_CARD', payload: { card, pileIndex, costPaid: effectiveCost, isBonus: false } };
};

export const createRetireCardAction = (sharedState: GameState, playerState: PlayerState, cardToRetire: Card): GameAction | null => {
    const { cash, actionsRemainingThisTurn } = playerState;
    const cost = getRetireCost(cardToRetire, sharedState);

    if (actionsRemainingThisTurn <= 0 || cash < cost) {
        // Cannot retire card. Action performed or not enough cash.
        return null;
    }
    
    return { type: 'RETIRE_CARD', payload: { card: cardToRetire, costPaid: cost } };
};

export const createRetireCardBonusAction = (sharedState: GameState, playerState: PlayerState, cardToRetire: Card): GameAction | null => {
    const { cash, retireFromHandBonus } = playerState;
    if (!retireFromHandBonus || cash < retireFromHandBonus.retireCost) {
        // Cannot use retire bonus. No bonus active or not enough cash.
        return null;
    }
    
    const isValidTarget = retireFromHandBonus.assetType === 'any' || cardToRetire.assetType === retireFromHandBonus.assetType;
    if (!isValidTarget) {
        // Cannot use retire bonus. Invalid card type.
        return null;
    }

    return { type: 'RETIRE_CARD_BONUS', payload: { card: cardToRetire, costPaid: retireFromHandBonus.retireCost } };
};

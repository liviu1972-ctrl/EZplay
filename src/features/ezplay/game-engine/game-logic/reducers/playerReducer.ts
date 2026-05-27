import type { GameState, GameAction, PlayerState, BonusBuyEffectPayload, RetireFromHandEffectPayload, BonusBuyState } from '../../types';
import { updateActivePlayer } from '../state-utils';

export const playerReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'BUY_CARD': {
            const { card, pileIndex, costPaid, isBonus } = action.payload;
            const newCardInstance = { ...card, uid: `${card.globalId}-bought-${Date.now()}` };
            const newMarketPiles = [...state.marketPiles];
            newMarketPiles[pileIndex] = newMarketPiles[pileIndex].slice(1);

            let nextState = updateActivePlayer(state, player => {
                const playerChanges: Partial<PlayerState> = {
                    cash: player.cash - costPaid,
                    actionsRemainingThisTurn: isBonus ? player.actionsRemainingThisTurn : 0,
                    lastAction: isBonus ? null : { type: 'buy', card: newCardInstance, fromMarketPileIndex: pileIndex, costPaid },
                    bonusBuy: isBonus ? null : player.bonusBuy,
                    effectChainDepth: isBonus ? player.effectChainDepth : 0,
                };

                if (card.type === 'consultant') {
                    playerChanges.activeConsultants = [...player.activeConsultants, { ...newCardInstance, turnsLeft: newCardInstance.contract! }];
                } else {
                    playerChanges.discard = [...player.discard, newCardInstance];
                }
                return { ...player, ...playerChanges };
            });
            nextState.yearlyBuys += 1;
            nextState.marketPiles = newMarketPiles;
            return nextState;
        }

        case 'RETIRE_CARD': {
            const { card, costPaid } = action.payload;
            let nextState = updateActivePlayer(state, player => ({
                ...player, cash: player.cash - costPaid,
                hand: player.hand.filter(c => c.uid !== card.uid),
                retiredCards: [...player.retiredCards, card],
                actionsRemainingThisTurn: 0,
                lastAction: { type: 'retire', card, costPaid },
                effectChainDepth: 0,
            }));
            nextState.yearlyRetirements += 1;
            return nextState;
        }

        case 'RETIRE_CARD_BONUS': {
            const { card, costPaid } = action.payload;
            let nextState = updateActivePlayer(state, player => ({
                ...player, cash: player.cash - costPaid,
                hand: player.hand.filter(c => c.uid !== card.uid),
                retiredCards: [...player.retiredCards, card],
                retireFromHandBonus: null, lastAction: null,
            }));
            nextState.yearlyRetirements += 1;
            return nextState;
        }

        case 'SET_CARD_CHOICE': {
            return updateActivePlayer(state, p => ({ ...p, cardChoices: { ...p.cardChoices, [action.payload.cardUid]: action.payload.choice } }));
        }

        case 'ACTIVATE_COPY': {
            return updateActivePlayer(state, p => ({ ...p, copyCardState: { isSelectingTarget: true, sourceCardUid: action.payload.sourceCardUid } }));
        }

        case 'CANCEL_COPY': {
            return updateActivePlayer(state, p => ({ ...p, copyCardState: { isSelectingTarget: false, sourceCardUid: null } }));
        }

        case 'SELECT_COPY_TARGET': {
            return updateActivePlayer(state, p => {
                if (!p.copyCardState.sourceCardUid) return p;
                return {
                    ...p,
                    copiedCards: { ...p.copiedCards, [p.copyCardState.sourceCardUid]: { targetUid: action.payload.targetCard.uid } },
                    copyCardState: { isSelectingTarget: false, sourceCardUid: null },
                };
            });
        }

        case 'RESET_COPY': {
            return updateActivePlayer(state, p => {
                const newCopied = { ...p.copiedCards };
                delete newCopied[action.payload.sourceCardUid];
                return { ...p, copiedCards: newCopied };
            });
        }

        case 'APPLY_BONUS_BUY_EFFECT': {
            return updateActivePlayer(state, p => ({ ...p, bonusBuy: action.payload, effectChainDepth: p.effectChainDepth + 1 }));
        }

        case 'APPLY_RETIRE_FROM_HAND_BONUS_EFFECT': {
            return updateActivePlayer(state, p => ({ ...p, retireFromHandBonus: action.payload, effectChainDepth: p.effectChainDepth + 1 }));
        }

        case 'APPLY_ANAF_PENALTY': {
            const { fine } = action.payload;
            return updateActivePlayer(state, p => ({
                ...p,
                cash: p.cash - fine,
                anafMistakeCount: p.anafMistakeCount + 1,
            }));
        }

        default:
            return state;
    }
};
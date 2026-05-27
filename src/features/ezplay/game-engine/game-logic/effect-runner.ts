import type { GameState, GameAction, BonusBuyEffectPayload, RetireFromHandEffectPayload, BonusBuyState } from '../types';

const MAX_EFFECT_CHAIN_DEPTH = 20;

/**
 * Compares the previous and current game states to find and process triggered effects.
 * @param previousState - The game state before the last action.
 * @param currentState - The game state after the last action.
 * @returns An array of derived GameActions to be dispatched.
 */
export const runEffects = (previousState: GameState, currentState: GameState): GameAction[] => {
  const activePlayer = currentState.players[currentState.activePlayerIndex];
  if (activePlayer && activePlayer.effectChainDepth >= MAX_EFFECT_CHAIN_DEPTH) {
    console.warn(`Effect chain limit of ${MAX_EFFECT_CHAIN_DEPTH} reached for player ${activePlayer.name}. Halting effect propagation to prevent infinite loop.`);
    return [];
  }
  
  const derivedActions: GameAction[] = [];
  // FIX: The `lastAction` variable was an ActionLogEntry, not a GameAction.
  // Renamed to `lastLogEntry` and extracted the `action` property for use below.
  const lastLogEntry = currentState.actionLog[currentState.actionLog.length - 1];

  if (!lastLogEntry) {
    return [];
  }
  const lastAction = lastLogEntry.action;

  // --- Handle ON_BUY effects ---
  if (lastAction.type === 'BUY_CARD') {
    const isBonusBuy = lastAction.payload.isBonus;
    const rule = currentState.config.bonusBuyRule;

    let canTriggerEffect = false;

    if (rule === 'no_combo') {
      canTriggerEffect = !isBonusBuy;
    } else if (rule === 'infinite_combo') {
      canTriggerEffect = true;
    } else if (rule === 'hybrid_combo') {
      // The bonus that was just *consumed* is in the *previous* state.
      // A bonus buy can trigger an effect only if the bonus itself was marked as 'chainable'.
      const previousPlayer = previousState.players[previousState.activePlayerIndex];
      canTriggerEffect = !isBonusBuy || (isBonusBuy && previousPlayer.bonusBuy?.chainable === true);
    }
    
    if (canTriggerEffect) {
      const boughtCard = lastAction.payload.card;
      const effect = boughtCard.effect;

      if (effect?.trigger === 'on_buy') {
        switch (effect.id) {
          case 'BONUS_CORPORAL_BUY_1':
          case 'BONUS_CORPORAL_BUY_2':
          case 'BONUS_UMAN_BUY_1':
          case 'BONUS_UMAN_BUY_2': {
            // Determine if the *new* bonus being granted can itself be chained.
            let isNewBonusChainable = false;
            if (rule === 'infinite_combo') {
              isNewBonusChainable = true;
            } else if (rule === 'hybrid_combo') {
              // The new bonus is only chainable if it resulted from a non-bonus buy.
              isNewBonusChainable = !isBonusBuy;
            }

            const bonusPayload: BonusBuyState = {
              ...(effect.payload as BonusBuyEffectPayload),
              chainable: isNewBonusChainable,
            };
            
            derivedActions.push({ type: 'APPLY_BONUS_BUY_EFFECT', payload: bonusPayload });
            break;
          }

          case 'RETIRE_CORPORAL_FROM_HAND_PAY_1':
          case 'RETIRE_CORPORAL_FROM_HAND_FREE':
          case 'RETIRE_ANY_FROM_HAND_FREE':
          case 'RETIRE_UMAN_FROM_HAND_PAY_1':
          case 'RETIRE_UMAN_FROM_HAND_FREE':
            derivedActions.push({
              type: 'APPLY_RETIRE_FROM_HAND_BONUS_EFFECT',
              payload: effect.payload as RetireFromHandEffectPayload,
            });
            break;
        }
      }
    }
  }
  
  return derivedActions;
};
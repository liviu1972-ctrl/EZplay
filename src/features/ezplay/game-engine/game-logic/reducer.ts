
import type { Card, GameState, PlayerState, GameAction } from '../types';
import { runEffects } from './effect-runner';
import { playerReducer } from './reducers/playerReducer';
import { turnReducer } from './reducers/turnReducer';
import { gameInitReducer } from './reducers/gameInitReducer';

// Re-export initialState so we don't break App.tsx imports
export { initialState } from './state-utils';

export function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type === 'UNDO_LAST_ACTION') {
    const activePlayer = state.players[state.activePlayerIndex];
    if (!activePlayer || !activePlayer.lastAction || activePlayer.type === 'ai') return state;

    let revertedPlayer: PlayerState;
    let nextState = { ...state };

    if (activePlayer.lastAction.type === 'buy') {
        const { card, fromMarketPileIndex, costPaid } = activePlayer.lastAction;
        const newMarketPiles = [...state.marketPiles];
        newMarketPiles[fromMarketPileIndex] = [card, ...newMarketPiles[fromMarketPileIndex]];
        
        const playerChanges: Partial<PlayerState> = {
            cash: activePlayer.cash + costPaid,
            actionsRemainingThisTurn: 1,
            lastAction: null,
            bonusBuy: null,
            retireFromHandBonus: null,
            copiedCards: {},
            effectChainDepth: 0,
        };

        if (card.type === 'consultant') {
            playerChanges.activeConsultants = activePlayer.activeConsultants.filter(c => c.uid !== card.uid);
        } else {
            playerChanges.discard = activePlayer.discard.filter(c => c.uid !== card.uid);
        }
        revertedPlayer = { ...activePlayer, ...playerChanges };
        nextState = { ...state, yearlyBuys: state.yearlyBuys - 1, marketPiles: newMarketPiles };

    } else if (activePlayer.lastAction.type === 'retire') {
        const { card, costPaid } = activePlayer.lastAction;
        const newCardChoices = { ...activePlayer.cardChoices };
        if (card.calculationType === 'choice') newCardChoices[card.uid] = 'production';
        
        revertedPlayer = {
            ...activePlayer,
            cash: activePlayer.cash + costPaid,
            retiredCards: activePlayer.retiredCards.filter(c => c.uid !== card.uid),
            hand: [...activePlayer.hand, card],
            cardChoices: newCardChoices,
            actionsRemainingThisTurn: 1,
            lastAction: null,
            effectChainDepth: 0,
        };
        nextState = { ...state, yearlyRetirements: state.yearlyRetirements - 1 };
    } else { 
        return state; 
    }
    
    const newLogEntry = { action, playerIndex: state.activePlayerIndex };
    return {
        ...nextState,
        players: state.players.map((p, i) => i === state.activePlayerIndex ? revertedPlayer : p),
        actionLog: [...state.actionLog.slice(0, -1), newLogEntry],
    };
  }
  
  // NEW: Handle Game Loading
  if (action.type === 'LOAD_GAME') {
      return action.payload;
  }
  
  let nextState: GameState;

  switch (action.type) {
    // --- DELEGATED INITIALIZATION ACTIONS ---
    case 'START_GAME':
    case 'RESET_GAME':
    case 'RESTART_PLAYER':
        nextState = gameInitReducer(state, action);
        break;

    // --- DELEGATED TURN ACTIONS ---
    case 'END_TURN':
    case 'TRIGGER_BANKRUPTCY':
    case 'ADVANCE_TO_NEXT_PLAYER':
    case 'START_NEXT_QUARTER':
    case 'START_NEXT_YEAR':
        nextState = turnReducer(state, action);
        break;

    // --- DELEGATED PLAYER ACTIONS (Catch-all for the rest) ---
    default:
        nextState = playerReducer(state, action);
        break;
  }
  
  // Logging is handled at the very end for all actions except UNDO (handled above)
  if (action.type !== 'RESET_GAME') {
      const newLogEntry = { action, playerIndex: state.activePlayerIndex ?? 0 };
      return { ...nextState, actionLog: [...state.actionLog, newLogEntry] };
  }

  return nextState;
}

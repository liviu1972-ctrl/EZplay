import type { GameAction, GameState, ActionLogEntry } from '../types';

export function formatActionToLogMessage(logEntry: ActionLogEntry, state: GameState): { message: string, type: 'player' | 'system' | 'bonus' | 'error' } | null {
    const { action, playerIndex } = logEntry;
    const player = state.players[playerIndex];
    if (!player) return null;
    const playerName = player.name;

    switch (action.type) {
        case 'START_GAME':
            return { message: `Joc nou început. Anul 1, Trimestrul 1.`, type: 'system' };

        case 'BUY_CARD': {
            const { card, costPaid, isBonus } = action.payload;
            if (isBonus) {
                return { message: `${playerName} a activat un BONUS și a cumpărat "${card.name}".`, type: 'bonus' };
            }
            return { message: `${playerName} a cumpărat "${card.name}" pentru ${costPaid}$.`, type: 'player' };
        }

        case 'RETIRE_CARD': {
            const { card, costPaid } = action.payload;
            return { message: `${playerName} a retras "${card.name}" plătind ${costPaid}$.`, type: 'player' };
        }
        
        case 'RETIRE_CARD_BONUS': {
            const { card, costPaid } = action.payload;
            return { message: `${playerName} a activat un BONUS și a retras "${card.name}" plătind ${costPaid}$.`, type: 'bonus' };
        }

        case 'END_TURN':
            return { message: `== ${playerName} a încheiat tura. ==`, type: 'system' };
            
        case 'START_NEXT_QUARTER':
        case 'ADVANCE_TO_NEXT_PLAYER': {
             return null;
        }

        case 'START_NEXT_YEAR': {
             const nextYear = state.currentYear + 1;
             return { message: `== A început Anul ${nextYear}. ==`, type: 'system' };
        }
        
        case 'TRIGGER_BANKRUPTCY':
            return { message: `FALIMENT! ${playerName} a terminat tura cu cash negativ.`, type: 'error' };
            
        case 'UNDO_LAST_ACTION':
            return { message: `${playerName} a anulat ultima acțiune.`, type: 'system' };

        default:
            return null;
    }
}
import { createClient } from '@/lib/supabase/client';
import type { GameState } from '../../game-engine/types';

const CURRENT_SCHEMA_VERSION = 1;
const MAX_ACTION_LOG_SIZE = 20;

export interface SaveMetadata {
    updatedAt: number;
    year: number;
    quarter: number;
    playerCount: number;
    gameConfigSummary: string;
    version: number;
}

export interface CloudSaveData {
    gameState: GameState;
    metadata: SaveMetadata;
}

const serializeGameState = (gameState: GameState): any => {
    const cleanState = JSON.parse(JSON.stringify(gameState));
    if (cleanState.actionLog && cleanState.actionLog.length > MAX_ACTION_LOG_SIZE) {
        cleanState.actionLog = cleanState.actionLog.slice(-MAX_ACTION_LOG_SIZE);
    }
    if (Array.isArray(cleanState.marketPiles)) {
        cleanState.marketPiles = cleanState.marketPiles.map((pile: any[]) => ({ cards: pile }));
    }
    if (cleanState.scenario && Array.isArray(cleanState.scenario.predefinedMarket)) {
        cleanState.scenario.predefinedMarket = cleanState.scenario.predefinedMarket.map((pile: any[]) => ({ ids: pile }));
    }
    return cleanState;
};

const deserializeGameState = (data: any): GameState => {
    const state = { ...data };
    if (Array.isArray(state.marketPiles)) {
        state.marketPiles = state.marketPiles.map((item: any) => {
            return (item && typeof item === 'object' && 'cards' in item) ? item.cards : item;
        });
    }
    if (state.scenario && Array.isArray(state.scenario.predefinedMarket)) {
        state.scenario.predefinedMarket = state.scenario.predefinedMarket.map((item: any) => {
            return (item && typeof item === 'object' && 'ids' in item) ? item.ids : item;
        });
    }
    return state as GameState;
};

export const saveGameToCloud = async (uid: string, gameState: GameState): Promise<void> => {
    try {
        const supabase = createClient();
        const serializedState = serializeGameState(gameState);

        const metadata: SaveMetadata = {
            updatedAt: Date.now(),
            year: gameState.currentYear,
            quarter: gameState.currentQuarter,
            playerCount: gameState.players.length,
            gameConfigSummary: gameState.scenario ? `Scenariu: ${gameState.scenario.scenarioName}` : 'Joc Liber',
            version: CURRENT_SCHEMA_VERSION
        };

        const { error } = await (supabase as any).from('ezplay_saves').upsert({
            user_id: uid,
            game_state: serializedState,
            metadata: metadata,
            updated_at: new Date().toISOString()
        });

        if (error) throw error;
        
        console.log('Game saved to cloud successfully (Supabase).');
    } catch (error) {
        console.error("Error saving game to cloud:", error);
        throw error;
    }
};

export const loadGameFromCloud = async (uid: string): Promise<CloudSaveData | null> => {
    try {
        const supabase = createClient();
        const { data, error } = await (supabase as any)
            .from('ezplay_saves')
            .select('game_state, metadata')
            .eq('user_id', uid)
            .single();

        if (error && error.code !== 'PGRST116') throw error; // PGRST116 is not found

        if (data) {
            const metadata = data.metadata as unknown as SaveMetadata;
            return {
                gameState: deserializeGameState(data.game_state),
                metadata: metadata
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error loading game from cloud:", error);
        throw error;
    }
};

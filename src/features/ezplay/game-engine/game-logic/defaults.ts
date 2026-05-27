
import type { GameConfig, MarketSlotConfig } from '../types';
import { getDefaultMarketSetup } from './market-config';

/**
 * Defines the absolute core default settings required for the game engine to run.
 * This object is used as the base layer of configuration, which can then be
 * overridden by expansion settings and finally by user-saved preferences.
 */
export const coreDefaultConfig: GameConfig = {
    // Core Gameplay Rules
    marketConfig: getDefaultMarketSetup(), // Use the standard setup as a reasonable default
    bonusBuyRule: 'no_combo',
    shuffleMarketOnTurnEnd: false,
    maxActiveConsultants: 99,
    eventsStartYear: 999, // Events are off by default
    hudCalculationMode: 'manual',

    // Standard Game Start Rules
    startingCash: 10,
    startingDeckSize: 10,
    startingDeckMaxCost: 0,

    // Taxes Expansion Defaults
    isAnafEnabled: false,
    anafPenaltyMode: 'incremental',
    isAccountingEnabled: false,
};

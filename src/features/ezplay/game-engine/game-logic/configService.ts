import type { ExpansionModule, RawCard, SettingDefinition, Card, GameConfig } from '../types';
import { BaseGameModule } from '../expansions/base-game/index';
import { EventsModule } from '../expansions/events/index';
import { ConsultantsModule } from '../expansions/consultants/index';
import { TaxesModule } from '../expansions/taxes/index';
import { CardSchema } from './zod';

// A central registry of all available expansion modules in the application.
export const allModules: ExpansionModule[] = [
  BaseGameModule,
  EventsModule,
  ConsultantsModule,
  TaxesModule,
];

// NEW: Export available expansions from here as the single source of truth.
export const availableExpansions = allModules.map(m => m.manifest);


// Type for the fully resolved configuration, combining settings and cards.
export interface ResolvedGameConfig {
  cards: Partial<Record<'standard' | 'entrepreneur' | 'event' | 'consultant' | 'accountant', Card[]>>;
  settings: Partial<Record<string, SettingDefinition>>;
  defaultGameConfig: Partial<GameConfig>;
}

/**
 * Builds a consolidated game configuration object based on a list of active expansion IDs.
 * It merges, validates, and processes cards and settings from all specified modules.
 *
 * @param activeExpansionIds - An array of strings representing the IDs of the active expansions.
 * @returns A ResolvedGameConfig object containing all cards and settings for the active expansions.
 */
export function buildResolvedConfig(activeExpansionIds: string[]): ResolvedGameConfig {
  const resolvedConfig: ResolvedGameConfig = {
    cards: {},
    settings: {},
    defaultGameConfig: {},
  };

  const activeModules = allModules.filter(module => activeExpansionIds.includes(module.manifest.id));

  for (const module of activeModules) {
    // Merge cards
    for (const cardType in module.cards) {
      if (Object.prototype.hasOwnProperty.call(module.cards, cardType)) {
        const type = cardType as keyof typeof module.cards;
        const cardList = module.cards[type] || [];
        
        // --- ZOD VALIDATION ---
        try {
            cardList.forEach(cardDef => CardSchema.parse(cardDef));
        } catch (error: any) {
            if (error.errors && Array.isArray(error.errors)) {
                const cardId = (error.input as any)?.id || 'unknown';
                console.error(`❌ Zod Validation Error in expansion "${module.manifest.id}" for card with id "${cardId}":`);
                error.errors.forEach((err: any) => {
                    console.error(`  - Path: ${err.path.join('.') || 'card'}, Message: ${err.message}`);
                });
            } else {
                 console.error(`An unexpected error occurred during validation in expansion "${module.manifest.id}":`, error);
            }
            continue; // Skip this module's card type if validation fails
        }

        const processedCards: Card[] = cardList.map(cardDef => ({
            ...(cardDef as Card),
            uid: '', // Instance UID is empty at definition time
            globalId: `${module.manifest.id}:${cardDef.id}`,
            expansionId: module.manifest.id,
        }));

        if (!resolvedConfig.cards[type]) {
            resolvedConfig.cards[type] = [];
        }
        resolvedConfig.cards[type]!.push(...processedCards);
      }
    }

    // Merge settings
    if (module.settings) {
      Object.assign(resolvedConfig.settings, module.settings);
    }
    
    // Merge default game configs
    if (module.defaultGameConfig) {
        Object.assign(resolvedConfig.defaultGameConfig, module.defaultGameConfig);
    }
  }

  return resolvedConfig;
}
import { z } from 'zod';
import type { CardEffectId, AnafPenaltyMode } from '../types';

// Base Enums
const AssetTypeSchema = z.enum(['corporal', 'necorporal', 'uman']);
const CardTypeSchema = z.enum(['standard', 'entrepreneur', 'event', 'consultant', 'accountant']);
const CalculationTypeSchema = z.enum(['additive', 'choice']);

// Effect Payloads
const BonusBuyEffectPayloadSchema = z.object({
  maxCost: z.number().int().positive(),
  assetType: AssetTypeSchema,
});

const RetireFromHandEffectPayloadSchema = z.object({
  retireCost: z.number().int().min(0),
  assetType: z.union([AssetTypeSchema, z.literal('any')]),
});

const PurchaseDiscountEffectPayloadSchema = z.object({
  discount: z.number().int().positive(),
});

const ModifyHandCardExpensePayloadSchema = z.object({
    targetExpense: z.number().int(),
    newExpense: z.number().int(),
});

const EmptyEffectPayloadSchema = z.object({});

// Group effects by trigger, then create a discriminated union for each group.
// This allows reusing an `id` across different triggers.

const OnBuyEffectSchema = z.discriminatedUnion('id', [
    z.object({ trigger: z.literal('on_buy'), id: z.literal('BONUS_CORPORAL_BUY_1'), description: z.string(), payload: BonusBuyEffectPayloadSchema }),
    z.object({ trigger: z.literal('on_buy'), id: z.literal('BONUS_CORPORAL_BUY_2'), description: z.string(), payload: BonusBuyEffectPayloadSchema }),
    z.object({ trigger: z.literal('on_buy'), id: z.literal('BONUS_UMAN_BUY_1'), description: z.string(), payload: BonusBuyEffectPayloadSchema }),
    z.object({ trigger: z.literal('on_buy'), id: z.literal('BONUS_UMAN_BUY_2'), description: z.string(), payload: BonusBuyEffectPayloadSchema }),
    z.object({ trigger: z.literal('on_buy'), id: z.literal('RETIRE_CORPORAL_FROM_HAND_PAY_1'), description: z.string(), payload: RetireFromHandEffectPayloadSchema }),
    z.object({ trigger: z.literal('on_buy'), id: z.literal('RETIRE_CORPORAL_FROM_HAND_FREE'), description: z.string(), payload: RetireFromHandEffectPayloadSchema }),
    z.object({ trigger: z.literal('on_buy'), id: z.literal('RETIRE_ANY_FROM_HAND_FREE'), description: z.string(), payload: RetireFromHandEffectPayloadSchema }),
    z.object({ trigger: z.literal('on_buy'), id: z.literal('RETIRE_UMAN_FROM_HAND_PAY_1'), description: z.string(), payload: RetireFromHandEffectPayloadSchema }),
    z.object({ trigger: z.literal('on_buy'), id: z.literal('RETIRE_UMAN_FROM_HAND_FREE'), description: z.string(), payload: RetireFromHandEffectPayloadSchema }),
]);

const OnPlayEffectSchema = z.discriminatedUnion('id', [
    z.object({ trigger: z.literal('on_play'), id: z.literal('PURCHASE_DISCOUNT_1'), description: z.string(), payload: PurchaseDiscountEffectPayloadSchema }),
    z.object({ trigger: z.literal('on_play'), id: z.literal('PURCHASE_DISCOUNT_2'), description: z.string(), payload: PurchaseDiscountEffectPayloadSchema }),
    z.object({ trigger: z.literal('on_play'), id: z.literal('MODIFY_EXPENSE_2_TO_1'), description: z.string(), payload: ModifyHandCardExpensePayloadSchema }),
    z.object({ trigger: z.literal('on_play'), id: z.literal('ACTIVATE_TO_COPY_CARD_FROM_HAND'), description: z.string(), payload: EmptyEffectPayloadSchema }),
    z.object({ trigger: z.literal('on_play'), id: z.literal('DOUBLE_UMAN_SALES_IN_HAND'), description: z.string(), payload: EmptyEffectPayloadSchema }),
    z.object({ trigger: z.literal('on_play'), id: z.literal('REDUCE_CORPORAL_EXPENSE_2_TO_1'), description: z.string(), payload: EmptyEffectPayloadSchema }),
    z.object({ trigger: z.literal('on_play'), id: z.literal('REDUCE_UMAN_EXPENSE_2_TO_1'), description: z.string(), payload: EmptyEffectPayloadSchema }),
]);

const OnEventActiveEffectSchema = z.discriminatedUnion('id', [
    z.object({ trigger: z.literal('on_event_active'), id: z.literal('RETIRE_UMAN_FROM_HAND_FREE'), description: z.string(), payload: RetireFromHandEffectPayloadSchema }),
    z.object({ trigger: z.literal('on_event_active'), id: z.literal('RETIRE_CORPORAL_FROM_HAND_FREE'), description: z.string(), payload: RetireFromHandEffectPayloadSchema }),
    z.object({ trigger: z.literal('on_event_active'), id: z.literal('PURCHASE_DISCOUNT_1'), description: z.string(), payload: PurchaseDiscountEffectPayloadSchema }),
]);

// The final CardEffectSchema is a union of the trigger-specific schemas.
const CardEffectSchema = z.union([
    OnBuyEffectSchema,
    OnPlayEffectSchema,
    OnEventActiveEffectSchema
]);


// Main Card Schema
export const CardSchema = z.object({
  id: z.string().min(1, { message: "Card ID cannot be empty." }),
  name: z.string().min(1, { message: "Card name cannot be empty." }),
  type: CardTypeSchema,
  cost: z.number().int().min(0),
  production: z.number().int(),
  marketing: z.number().int(),
  expenses: z.number().int(),
  imageUrl: z.string().url({ message: "Invalid URL format for imageUrl." }),
  assetType: AssetTypeSchema.optional(),
  calculationType: CalculationTypeSchema.optional(),
  contract: z.number().int().positive().optional(),
  effect: CardEffectSchema.optional(),
  // FIX: Added optional description field to validate cards with descriptive text.
  description: z.string().optional(),
})
.superRefine((card, ctx) => {
    // Rule 1: 'standard' and 'entrepreneur' cards must have an assetType.
    if ((card.type === 'standard' || card.type === 'entrepreneur' || card.type === 'accountant') && !card.assetType) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Cards of type '${card.type}' must have an 'assetType'.`,
            path: ['assetType'],
        });
    }

    // Rule 2: 'event' cards must NOT have an assetType.
    if (card.type === 'event' && card.assetType) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Cards of type 'event' must not have an 'assetType'.",
            path: ['assetType'],
        });
    }

    // Rule 3: 'choice' cards must have both production and marketing greater than 0.
    if (card.calculationType === 'choice' && (card.production <= 0 || card.marketing <= 0)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Cards with 'calculationType: choice' must have positive values for both 'production' and 'marketing'.",
            path: ['calculationType'],
        });
    }

    // Rule 4: 'consultant' cards must have an assetType and a contract duration.
    if (card.type === 'consultant') {
        if (!card.assetType) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Cards of type 'consultant' must have an 'assetType'.",
                path: ['assetType'],
            });
        }
        if (!card.contract || card.contract <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Cards of type 'consultant' must have a positive 'contract' duration.",
                path: ['contract'],
            });
        }
    }
});

// --- NEW: Scenario Schema Validation ---

const BonusBuyRuleSchema = z.enum(['no_combo', 'infinite_combo', 'hybrid_combo']);
const AiStrategySchema = z.enum(['balanced', 'aggressive', 'profit-focused', 'early-rusher', 'deck-thinner']);
const AiSkillLevelSchema = z.enum(['novice', 'competent', 'expert', 'master']);
// FIX: Added schema for AnafPenaltyMode.
const AnafPenaltyModeSchema = z.enum(['incremental', 'flat_rate', 'percentage', 'warnings_only']);

// FIX: Moved MarketSlot schemas before GameConfigSchema to allow referencing it.
const MarketSlotFilterSchema = z.object({
  assetType: z.enum(['any', 'corporal', 'uman', 'necorporal']),
  costOperator: z.enum(['any', '=', '>', '<', '>=', '<=']),
  costValue: z.number().int(),
  isEmpty: z.boolean(),
});

const MarketSlotConfigSchema = z.object({
  title: z.string(),
  filters: MarketSlotFilterSchema,
});

const GameConfigSchema = z.object({
  eventsStartYear: z.number().int().min(1),
  maxActiveConsultants: z.number().int().min(0),
  shuffleMarketOnTurnEnd: z.boolean(),
  bonusBuyRule: BonusBuyRuleSchema,
  hudCalculationMode: z.enum(['automatic', 'manual', 'anaf', 'empty']).default('empty'),
  marketConfig: z.array(MarketSlotConfigSchema).length(6),
  startingCash: z.number().int().min(0),
  startingDeckSize: z.number().int().positive(),
  startingDeckMaxCost: z.number().int().min(0),
  // FIX: Added missing properties to match the GameConfig type in types.ts.
  isAnafEnabled: z.boolean(),
  anafPenaltyMode: AnafPenaltyModeSchema,
  isAccountingEnabled: z.boolean(),
});

const DeckBuilderConfigSchema = z.object({
  pool: z.array(z.string()).min(1, { message: "Pool-ul de cărți pentru deck builder nu poate fi gol." }),
  budget: z.number().int().min(0),
  deckSize: z.number().int().positive(),
});

const ScenarioPlayerConfigSchema = z.object({
  type: z.enum(['human', 'ai']),
  name: z.string().min(1),
  aiStrategy: AiStrategySchema.optional(),
  aiSkillLevel: AiSkillLevelSchema.optional(),
  forceEntrepreneurId: z.string().min(1).optional(),
  allowedEntrepreneurIds: z.array(z.string()).optional(),
  startingDeck: z.array(z.string()).optional(),
  deckBuilderConfig: DeckBuilderConfigSchema.optional(),
  startingCash: z.number().int().min(0),
}).superRefine((data, ctx) => {
    if (data.type === 'ai') {
      if (!data.forceEntrepreneurId) {
          ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "forceEntrepreneurId este obligatoriu pentru jucătorii de tip 'ai'.",
              path: ['forceEntrepreneurId'],
          });
      }
      if (!data.startingDeck) {
          ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "startingDeck este obligatoriu pentru jucătorii de tip 'ai'.",
              path: ['startingDeck'],
          });
      }
    }
    if (data.forceEntrepreneurId && data.allowedEntrepreneurIds) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Nu pot fi specificate simultan 'forceEntrepreneurId' și 'allowedEntrepreneurIds'.",
            path: ['forceEntrepreneurId'],
        });
    }
    if (data.startingDeck && data.deckBuilderConfig) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Nu pot fi specificate simultan 'startingDeck' și 'deckBuilderConfig'.",
            path: ['startingDeck'],
        });
    }
});

const GameObjectiveSchema = z.discriminatedUnion('type', [
    z.object({ type: z.literal('infinite'), value: z.literal(0) }),
    z.object({ type: z.literal('timeLimit'), value: z.number().int().positive() }),
    z.object({ type: z.literal('cashGoal'), value: z.number().int().positive() }),
    z.object({ type: z.literal('capitalizationGoal'), value: z.number().int().positive() }),
]);

export const ScenarioSchema = z.object({
  version: z.literal(1, { message: "Versiunea scenariului trebuie să fie 1." }),
  scenarioName: z.string().min(1, { message: "Numele scenariului este obligatoriu." }),
  activeExpansions: z.array(z.string()).min(1, { message: "Trebuie să existe cel puțin o extensie activă." }),
  gameConfig: GameConfigSchema,
  eventSequence: z.array(z.string()).optional(),
  players: z.array(ScenarioPlayerConfigSchema).min(1, { message: "Trebuie configurat cel puțin un jucător." }),
  predefinedMarket: z.array(z.array(z.string())).length(6, { message: "Piața predefinită trebuie să aibă exact 6 grămezi (teancuri)." }).optional(),
  marketConfig: z.array(MarketSlotConfigSchema).length(6, { message: "Configurația pieței (marketConfig) trebuie să aibă exact 6 sloturi." }).optional(),
  objective: GameObjectiveSchema.optional(),
  bannedCards: z.array(z.string()).optional(),
}).superRefine((data, ctx) => {
    if (data.predefinedMarket && data.marketConfig) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Nu pot fi specificate simultan 'predefinedMarket' și 'marketConfig'. Alegeți o singură metodă de configurare a pieței.",
            path: ['predefinedMarket'],
        });
    }
});
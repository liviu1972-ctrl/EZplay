import type { MarketSlotConfig as GenericMarketSlotConfig } from './game-logic/market-config';

// Re-export from market-config to ensure consistency
export type MarketSlotConfig = GenericMarketSlotConfig;

export type AssetType = 'corporal' | 'necorporal' | 'uman';

export type View = 'mainMenu' | 'entrepreneurSelection' | 'accountantSelection' | 'game' | 'settings' | 'gameSetup' | 'startingDeckSetup' | 'companyHistory' | 'documentation' | 'scenarioLoader' | 'gameSimulator' | 'userProfile' | 'admin';

export type GameLayout = 'classic' | 'extended';

// --- Card Types ---

export type CardType = 'standard' | 'entrepreneur' | 'event' | 'consultant' | 'accountant';

export type CardEffectId =
  | 'BONUS_CORPORAL_BUY_1'
  | 'BONUS_CORPORAL_BUY_2'
  | 'BONUS_UMAN_BUY_1'
  | 'BONUS_UMAN_BUY_2'
  | 'RETIRE_CORPORAL_FROM_HAND_PAY_1'
  | 'RETIRE_CORPORAL_FROM_HAND_FREE'
  | 'RETIRE_ANY_FROM_HAND_FREE'
  | 'RETIRE_UMAN_FROM_HAND_PAY_1'
  | 'RETIRE_UMAN_FROM_HAND_FREE'
  | 'PURCHASE_DISCOUNT_1'
  | 'PURCHASE_DISCOUNT_2'
  | 'MODIFY_EXPENSE_2_TO_1'
  | 'ACTIVATE_TO_COPY_CARD_FROM_HAND'
  | 'DOUBLE_UMAN_SALES_IN_HAND'
  | 'REDUCE_CORPORAL_EXPENSE_2_TO_1'
  | 'REDUCE_UMAN_EXPENSE_2_TO_1';

export type CardEffectTrigger = 'on_buy' | 'on_play' | 'on_event_active';

export interface BonusBuyEffectPayload {
  maxCost: number;
  assetType: AssetType;
}

export interface RetireFromHandEffectPayload {
  retireCost: number;
  assetType: AssetType | 'any';
}

export interface PurchaseDiscountEffectPayload {
  discount: number;
}

export interface ModifyHandCardExpensePayload {
  targetExpense: number;
  newExpense: number;
}

export interface EmptyEffectPayload {}

export interface CardEffect {
  trigger: CardEffectTrigger;
  id: CardEffectId;
  description?: string;
  payload: 
    | BonusBuyEffectPayload 
    | RetireFromHandEffectPayload 
    | PurchaseDiscountEffectPayload 
    | ModifyHandCardExpensePayload 
    | EmptyEffectPayload;
}

export interface Card {
  uid: string;
  globalId: string;
  expansionId: string;
  id: string;
  name: string;
  type: CardType;
  cost: number;
  production: number;
  marketing: number;
  expenses: number;
  imageUrl: string;
  assetType?: AssetType;
  calculationType?: 'additive' | 'choice';
  contract?: number;
  effect?: CardEffect;
  description?: string;
}

export interface ProcessedCard extends Card {
  originalCard?: Card;
  originalExpenses?: number;
  originalMarketing?: number;
  turnsLeft?: number; // For consultants
}

export type RawCard = Omit<Card, 'uid' | 'globalId' | 'expansionId'>;

// --- Game Configuration Types ---

export type BonusBuyRule = 'no_combo' | 'infinite_combo' | 'hybrid_combo';
export type HudCalculationMode = 'automatic' | 'manual' | 'anaf' | 'empty';
export type AnafPenaltyMode = 'incremental' | 'flat_rate' | 'percentage' | 'warnings_only';

export interface GameConfig {
  marketConfig: MarketSlotConfig[];
  bonusBuyRule: BonusBuyRule;
  shuffleMarketOnTurnEnd: boolean;
  maxActiveConsultants: number;
  eventsStartYear: number;
  hudCalculationMode: HudCalculationMode;
  startingCash: number;
  startingDeckSize: number;
  startingDeckMaxCost: number;
  isAnafEnabled: boolean;
  anafPenaltyMode: AnafPenaltyMode;
  isAccountingEnabled: boolean;
}

export type AiStrategy = 'balanced' | 'aggressive' | 'profit-focused' | 'early-rusher' | 'deck-thinner';
export type AiSkillLevel = 'novice' | 'competent' | 'expert' | 'master';

// --- Player State ---

export interface BonusBuyState extends BonusBuyEffectPayload {
  chainable: boolean;
}

export interface AnnualReportData {
  year: number;
  quarter?: number;
  turnover: number;
  profit: number;
  capitalization: number;
  netProfitMargin: number;
  returnOnAssets: number;
  assetTurnover: number;
}

export interface CompanyHistory {
  id: number;
  companyName?: string;
  reports: AnnualReportData[];
  reasonForEnd: string | null;
  finalYear: number;
  finalQuarter: number;
}

export interface PlayerState {
  id: number;
  name: string;
  type: 'human' | 'ai';
  aiStrategy?: AiStrategy;
  aiSkillLevel?: AiSkillLevel;
  
  deck: Card[];
  hand: Card[];
  discard: Card[];
  retiredCards: Card[];
  
  entrepreneur: Card;
  accountant: Card | null;
  activeConsultants: (Card & { turnsLeft: number })[];
  
  cash: number;
  initialCapitalization: number;
  
  actionsRemainingThisTurn: number;
  lastAction: { 
    type: 'buy' | 'retire'; 
    card: Card; 
    fromMarketPileIndex?: number; 
    costPaid: number 
  } | null;
  
  bonusBuy: BonusBuyState | null;
  retireFromHandBonus: RetireFromHandEffectPayload | null;
  
  cardChoices: Record<string, 'production' | 'marketing'>;
  
  copyCardState: {
    isSelectingTarget: boolean;
    sourceCardUid: string | null;
  };
  copiedCards: Record<string, { targetUid: string }>;
  
  effectChainDepth: number;
  anafMistakeCount: number;
  
  history: {
    quarterly: any[];
    annual: AnnualReportData[];
  };
}

// --- Scenario Types ---

export type GameObjectiveType = 'infinite' | 'timeLimit' | 'cashGoal' | 'capitalizationGoal';

export interface GameObjective {
  type: GameObjectiveType;
  value: number;
}

export interface DeckBuilderConfig {
  pool: string[]; // List of globalIds
  budget: number;
  deckSize: number;
}

export interface PlayerSetupPayload {
  type: 'human' | 'ai';
  name: string;
  aiStrategy?: AiStrategy;
  aiSkillLevel?: AiSkillLevel;
  forceEntrepreneurId?: string;
  allowedEntrepreneurIds?: string[];
  startingDeck?: string[]; // List of globalIds
  deckBuilderConfig?: DeckBuilderConfig;
  startingCash: number;
  // Runtime properties used during setup logic but maybe not in schema
  selectedEntrepreneur?: Card;
  selectedAccountant?: Card;
  finalDeck?: Card[];
  finalCash?: number;
}

export interface Scenario {
  version: 1;
  scenarioName: string;
  activeExpansions: string[];
  gameConfig: GameConfig;
  players: PlayerSetupPayload[];
  predefinedMarket?: string[][]; // 6 piles of globalIds
  marketConfig?: MarketSlotConfig[];
  objective?: GameObjective;
  bannedCards?: string[];
  eventSequence?: string[]; // List of globalIds
}

// --- Actions ---

export interface ActionLogEntry {
  action: GameAction;
  playerIndex: number;
}

// Discriminants for GameAction
export type GameAction =
  | { type: 'START_GAME'; payload: { playerSetups: any[], playerCount: number, cardData: any, seed: number, gameConfig: GameConfig, eventSequence?: Card[], scenario?: Scenario | null, objective: GameObjective } }
  | { type: 'RESET_GAME' }
  | { type: 'LOAD_GAME'; payload: GameState } // NEW ACTION
  | { type: 'RESTART_PLAYER'; payload: { playerIndex: number, setup: { finalDeck: Card[], finalCash: number, selectedEntrepreneur: Card } } }
  | { type: 'BUY_CARD'; payload: { card: Card, pileIndex: number, costPaid: number, isBonus: boolean } }
  | { type: 'RETIRE_CARD'; payload: { card: Card, costPaid: number } }
  | { type: 'RETIRE_CARD_BONUS'; payload: { card: Card, costPaid: number } }
  | { type: 'END_TURN'; payload: { turnProfit: number, turnTotals: any } }
  | { type: 'TRIGGER_BANKRUPTCY' }
  | { type: 'ADVANCE_TO_NEXT_PLAYER' }
  | { type: 'START_NEXT_QUARTER' }
  | { type: 'START_NEXT_YEAR'; payload: { reports: Record<number, AnnualReportData> } }
  | { type: 'UNDO_LAST_ACTION' }
  | { type: 'SET_CARD_CHOICE'; payload: { cardUid: string, choice: 'production' | 'marketing' } }
  | { type: 'ACTIVATE_COPY'; payload: { sourceCardUid: string } }
  | { type: 'CANCEL_COPY' }
  | { type: 'SELECT_COPY_TARGET'; payload: { targetCard: Card } }
  | { type: 'RESET_COPY'; payload: { sourceCardUid: string } }
  | { type: 'APPLY_BONUS_BUY_EFFECT'; payload: BonusBuyState }
  | { type: 'APPLY_RETIRE_FROM_HAND_BONUS_EFFECT'; payload: RetireFromHandEffectPayload }
  | { type: 'APPLY_ANAF_PENALTY'; payload: { fine: number } };

// --- Game State ---

export interface GameState {
  seed: number;
  actionLog: ActionLogEntry[];
  
  marketPiles: Card[][];
  marketSetup: MarketSlotConfig[];
  
  currentYear: number;
  currentQuarter: number;
  
  yearlyBuys: number;
  yearlyRetirements: number;
  
  eventDeck: Card[];
  activeEvent: Card | null;
  discardedEvents: Card[];
  
  config: GameConfig;
  
  players: PlayerState[];
  activePlayerIndex: number;
  
  isGameOver: boolean;
  gameOverReason: string | null;
  winnerPlayerIndex: number | null;
  
  scenario: Scenario | null;
  objective: GameObjective | null;
}

// --- Modules ---

export interface SettingDefinition {
  // Can be expanded as needed
  type: string;
  default: any;
}

export interface ExpansionModule {
  manifest: { id: string; name: string };
  cards?: {
    standard?: RawCard[];
    entrepreneur?: RawCard[];
    event?: RawCard[];
    consultant?: RawCard[];
    accountant?: RawCard[];
  };
  settings?: Record<string, SettingDefinition>;
  defaultGameConfig?: Partial<GameConfig>;
}

export interface AnafModalData {
  correctValues: Record<string, number>;
  userValues: Record<string, number>;
  capitalization: number;
}

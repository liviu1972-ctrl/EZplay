import type { AssetType, Card } from '../types';

export type CostOperator = 'any' | '=' | '>' | '<' | '>=' | '<=';
export type AssetTypeFilter = 'any' | AssetType;

export interface MarketSlotConfig {
  title: string;
  filters: {
    assetType: AssetTypeFilter;
    costOperator: CostOperator;
    costValue: number;
    isEmpty: boolean;
  };
}

export const getDefaultMarketSetup = (): MarketSlotConfig[] => [
    { title: 'Cost 1 / Corporal', filters: { assetType: 'corporal', costOperator: '=', costValue: 1, isEmpty: false } },
    { title: 'Cost 1 / Uman', filters: { assetType: 'uman', costOperator: '=', costValue: 1, isEmpty: false } },
    { title: 'Cost > 1 / Corporal', filters: { assetType: 'corporal', costOperator: '>', costValue: 1, isEmpty: false } },
    { title: 'Cost > 1 / Uman', filters: { assetType: 'uman', costOperator: '>', costValue: 1, isEmpty: false } },
    { title: 'Necorporal', filters: { assetType: 'necorporal', costOperator: 'any', costValue: 0, isEmpty: false } },
    { title: 'Extra', filters: { assetType: 'any', costOperator: 'any', costValue: 0, isEmpty: true } },
];

export const createCardFilter = (config: MarketSlotConfig): ((card: Omit<Card, 'uid' | 'globalId' | 'expansionId'>) => boolean) => {
    if (config.filters.isEmpty) {
        return () => false;
    }

    return (card) => {
        const { assetType, costOperator, costValue } = config.filters;

        const assetMatch = assetType === 'any' || card.assetType === assetType;
        if (!assetMatch) return false;

        if (costOperator === 'any') return true;

        switch (costOperator) {
            case '=': return card.cost === costValue;
            case '>': return card.cost > costValue;
            case '<': return card.cost < costValue;
            case '>=': return card.cost >= costValue;
            case '<=': return card.cost <= costValue;
            default: return true;
        }
    };
};

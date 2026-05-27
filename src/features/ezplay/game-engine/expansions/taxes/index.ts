import { manifest } from './cards';
import type { ExpansionModule } from '../../types';

export const TaxesModule: ExpansionModule = {
  manifest: manifest,
  // NEW: Add default config for this expansion
  defaultGameConfig: {
    isAnafEnabled: false,
    anafPenaltyMode: 'incremental',
    isAccountingEnabled: false,
  },
};
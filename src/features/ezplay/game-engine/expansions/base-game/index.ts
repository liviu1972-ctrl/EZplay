import { manifest as baseGameManifest } from './cards';
import type { ExpansionModule } from '../../types';
import { getDefaultMarketSetup } from '../../game-logic/market-config';

export const BaseGameModule: ExpansionModule = {
  manifest: baseGameManifest,
  defaultGameConfig: {
    marketConfig: getDefaultMarketSetup(),
    bonusBuyRule: 'no_combo',
    shuffleMarketOnTurnEnd: false,
    startingCash: 10,
    startingDeckSize: 10,
    startingDeckMaxCost: 0,
    hudCalculationMode: 'manual',
  },
};
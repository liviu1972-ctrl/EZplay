import { manifest as consultantsManifest } from './cards';
import type { ExpansionModule } from '../../types';

export const ConsultantsModule: ExpansionModule = {
  manifest: consultantsManifest,
  defaultGameConfig: {
    maxActiveConsultants: 1,
  },
};
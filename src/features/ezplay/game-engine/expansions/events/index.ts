import { manifest as eventsManifest } from './cards';
import type { ExpansionModule } from '../../types';

export const EventsModule: ExpansionModule = {
  manifest: eventsManifest,
  defaultGameConfig: {
    eventsStartYear: 2,
  },
};
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { BaseGameModule } from '../src/features/ezplay/game-engine/expansions/base-game/index';
import { EventsModule } from '../src/features/ezplay/game-engine/expansions/events/index';
import { ConsultantsModule } from '../src/features/ezplay/game-engine/expansions/consultants/index';
import { TaxesModule } from '../src/features/ezplay/game-engine/expansions/taxes/index';

const envPath = path.resolve('.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const value = trimmed.slice(eqIdx + 1).trim();
  env[key] = value;
}

const supabase = createClient(
  env['NEXT_PUBLIC_SUPABASE_URL'],
  env['SUPABASE_SERVICE_ROLE_KEY'] || env['NEXT_PUBLIC_SUPABASE_ANON_KEY'],
  { auth: { persistSession: false } }
);

async function main() {
  const allModules = [BaseGameModule, EventsModule, ConsultantsModule, TaxesModule];
  let updateCount = 0;

  for (const module of allModules) {
    const cardsObj = module.cards as any;
    for (const key of Object.keys(cardsObj)) {
      const cardsArray = cardsObj[key] as any[];
      if (!cardsArray) continue;
      for (const card of cardsArray) {
        if (card.effect) {
          const { error } = await supabase
            .from('cards')
            .update({ effect_config: card.effect })
            .eq('slug', card.id);
            
          if (error) {
            console.error(`Failed to update ${card.id}:`, error);
          } else {
            console.log(`Successfully migrated effect for ${card.id}`);
            updateCount++;
          }
        }
      }
    }
  }
  
  console.log(`Migration complete. Updated ${updateCount} cards.`);
}

main().catch(console.error);

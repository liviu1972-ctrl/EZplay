
import { createClient } from '@/lib/supabase/server';
import type { Card } from '@/features/ezplay/game-engine/types';

import GameRunnerClient from '@/features/ezplay/game-engine/GameRunnerClient';

function mapCardType(slug?: string): any {
  if (!slug) return 'standard';
  if (slug === 'event') return 'event';
  if (slug === 'entrepreneur') return 'entrepreneur';
  if (slug === 'consultant') return 'consultant';
  if (slug === 'accountant') return 'accountant';
  return 'standard';
}

function mapAssetType(slug?: string): any {
  if (!slug) return undefined;
  if (slug === 'tangible-assets') return 'corporal';
  if (slug === 'human-resources') return 'uman';
  if (slug === 'intangible-assets') return 'necorporal';
  return undefined;
}

export default async function EZPlayPage() {
  const supabase = await createClient();
  const { data: dbCards, error } = await supabase
    .from('cards')
    .select(`
      *,
      card_sets (slug),
      card_types (slug),
      asset_types (slug)
    `);

  if (error) {
    console.error("Failed to load cards from DB:", error);
  }

  const STORAGE_BASE = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`;
  
  const formattedCards: Card[] = (dbCards || []).map((c: any) => {
    const expansionSlug = c.card_sets?.slug || 'base-game';
    return {
      uid: '',
      globalId: `${expansionSlug}:${c.external_id || c.slug}`,
      expansionId: expansionSlug,
      id: c.slug,
      name: c.name_ro,
      type: mapCardType(c.card_types?.slug),
      cost: c.cost || 0,
      production: c.production || 0,
      sales: c.marketing || 0,
      expenses: c.expense || 0,
      imageUrl: c.image_card ? (c.image_card.startsWith('http') ? c.image_card : `${STORAGE_BASE}/cards/${c.image_card}`) : '',
      assetType: mapAssetType(c.asset_types?.slug),
      calculationType: c.calculation || 'additive',
      effect: c.effect_config,
      description: c.special_effect_ro || undefined,
    };
  });

  return (
    <div className="min-h-screen w-full bg-slate-900">
      <GameRunnerClient dbCards={formattedCards} />
    </div>
  );
}

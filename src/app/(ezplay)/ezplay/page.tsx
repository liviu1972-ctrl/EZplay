
import { createClient } from '@/lib/supabase/server';
import type { Card } from '@/features/ezplay/game-engine/types';

import GameRunnerClient from '@/features/ezplay/game-engine/GameRunnerClient';

import { formatDbCard } from '@/features/ezplay/game-engine/card-mapper';

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
  
  const formattedCards: Card[] = (dbCards || []).map((c: any) => formatDbCard(c, STORAGE_BASE));

  return (
    <div className="min-h-screen w-full bg-slate-900">
      <GameRunnerClient dbCards={formattedCards} />
    </div>
  );
}

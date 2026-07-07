import type { Card } from './types';

export function mapCardType(slug?: string): any {
  if (!slug) return 'standard';
  if (slug === 'event') return 'event';
  if (slug === 'entrepreneur') return 'entrepreneur';
  if (slug === 'consultant') return 'consultant';
  if (slug === 'accountant') return 'accountant';
  return 'standard';
}

export function mapAssetType(slug?: string): any {
  if (!slug) return undefined;
  if (slug === 'tangible-assets') return 'corporal';
  if (slug === 'human-resources') return 'uman';
  if (slug === 'intangible-assets') return 'necorporal';
  return undefined;
}

export function formatDbCard(c: any, storageBase: string): Card {
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
    marketing: c.marketing || 0,
    expenses: c.expense || 0,
    imageUrl: c.image_card ? (c.image_card.startsWith('http') ? c.image_card : `${storageBase}/cards/${c.image_card}`) : '',
    assetType: mapAssetType(c.asset_types?.slug),
    calculationType: c.calculation || 'additive',
    effect: c.effect_config,
    description: c.special_effect_ro || undefined,
  };
}

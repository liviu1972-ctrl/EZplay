const STORAGE_BASE = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`;

export const STANDARD_CARD_BACK_URL = `${STORAGE_BASE}/cards/backs/standard.webp`;
export const STANDARD_CARD_FLIP_BACK_URL = `${STORAGE_BASE}/cards/backs/standard-flip.webp`;
export const EVENT_CARD_BACK_URL = `${STORAGE_BASE}/cards/backs/event.webp`;

export const STAT_ICONS = {
  cash: '/images/game-icons/cash.webp',
  production: '/images/game-icons/production.webp',
  sales: '/images/game-icons/sales.webp',
  income: '/images/game-icons/income.webp',
  expenses: '/images/game-icons/expenses.webp',
  capitalization: '/images/game-icons/capitalization.webp',
  profit: '/images/game-icons/profit.webp',
};

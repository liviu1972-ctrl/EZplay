const STORAGE_BASE = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`;

export const STANDARD_CARD_BACK_URL = `${STORAGE_BASE}/cards/backs/standard.webp`;
export const STANDARD_CARD_FLIP_BACK_URL = `${STORAGE_BASE}/cards/backs/standard-flip.webp`;
export const EVENT_CARD_BACK_URL = `${STORAGE_BASE}/cards/backs/event.webp`;

export const STAT_ICONS = {
  cash: `${STORAGE_BASE}/game-icons/cash.webp`,
  production: `${STORAGE_BASE}/game-icons/production.webp`,
  sales: `${STORAGE_BASE}/game-icons/sales.webp`,
  income: `${STORAGE_BASE}/game-icons/income.webp`,
  expenses: `${STORAGE_BASE}/game-icons/expenses.webp`,
  capitalization: `${STORAGE_BASE}/game-icons/capitalization.webp`,
  profit: `${STORAGE_BASE}/game-icons/profit.webp`,
};

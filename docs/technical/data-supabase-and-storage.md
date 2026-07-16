---
status: Working
version: "0.1"
updated: 2026-07-17
canonical_for: technical database and storage schema
---

# Date, Supabase și Storage

(Auditat pe branch `dev`, commit `338dab3`)

## Schemă și Migrații
Baza de date conține scripturi de migrație găsite în `supabase/migrations/`.
Observate în audit:
- `20260525_cards_system.sql`
- `20260527_cards_effect_config.sql`
- `20260527_ezplay_saves.sql`

**Migrații incomplete observate**: Migrațiile versionate nu reconstruiesc integral schema descrisă de `types.ts`. Lipsesc definițiile (DDL) și politicile pentru tabelele `user_profiles`, `wallets`, `token_transactions` și `user_skills`.

## Servicii de Date
Interacțiunea cu Supabase din frontend-ul de React are loc izolat:
- Tipizările TypeScript sunt folosite activ (`src/lib/supabase/types.ts`). **Desincronizare observată**: Fișierul `types.ts` nu include tabelele `effect_config` și `ezplay_saves`, deși acestea apar în migrații și cod. Ca rezultat, serviciul de salvare (`saveService.ts`) folosește cast-uri de tip `any`.
- `userService.ts` manipulează starea utilizatorului post-autentificare.

## Securitate și RLS (Row Level Security)
- **Observat și Limitări**: Politicile RLS pot fi descrise precis doar pentru tabelele prezente în migrații (ex: `cards`). Funcționarea RLS-ului pentru întreaga schemă (inclusiv profile, tranzacții) și pentru Supabase Storage nu este demonstrată de codul din repository.

## Supabase Storage
- **Observat**: Directorul `public/transfer images from user/` este doar un director protejat de transfer/sursă pentru asetele inițiale. Acesta nu este o dovadă a unui flux runtime complet pentru imaginile de profil. RLS-ul și manipularea avansată pentru Storage nu sunt demonstrabile prin acest repository local.

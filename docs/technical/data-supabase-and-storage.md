---
status: Working
version: "0.1"
updated: 2026-07-17
canonical_for: technical database and storage schema
---

# Date, Supabase și Storage

(Auditat pe branch `dev`, commit `338dab3`)

## Schemă și Migrații
Baza de date este administrată exclusiv prin scripturi de migrație găsite în `supabase/migrations/`.
Observate în audit:
- `20260525_cards_system.sql` – definește sistemul centralizat de date și inventar pentru seturile de cărți de joc.
- `20260527_cards_effect_config.sql` – configurează regulile și efectele generate de activarea cărților în simulator / deckbuilder.
- `20260527_ezplay_saves.sql` – permite retenția și reîncărcarea progresului sau a jocului EZplay la nivel de utilizator autentificat.

Tabela `user_profiles` acționează ca extensie pentru tabela Auth nativă, adăugând `role` (ex. 'admin') și flag-ul `onboarding_completed`.

## Servicii de Date
Interacțiunea cu Supabase din frontend-ul de React are loc izolat:
- Tipizările TypeScript sunt folosite activ și sunt derivate direct din schema (`src/lib/supabase/types.ts`).
- Există servicii ca `saveService.ts` (`src/features/ezplay/platform/saves/`) folosite pentru serializarea și persistența locală/remote a statusului partidei.
- `userService.ts` manipulează starea utilizatorului post-autentificare.

## Securitate și RLS (Row Level Security)
- **Observat**: Design-ul bazat pe migrații presupune definirea RLS la crearea tabelelor. Există implementare implicită de protecție la nivel de server client pentru editarea rolurilor. Se recomandă ca cheia `service_role` să fie adăugată din panoul Supabase în backend.
- **Neconfirmat**: Funcționarea efectivă a blocajelor RLS nu a fost validată prin testare integrată, neexistând fixture-uri locale. Validările depind de logica existentă care leagă acțiunile specifice ID-ului de utilizator (`user.id`).

## Supabase Storage
- **Observat**: `api/cards/upload` și `public/transfer images from user/` semnalează prezența unui proces de gestiune a activelor (imagini de cărți, asete de profil). Manipularea avansată și RLS pentru bucket nu pot fi validate local.

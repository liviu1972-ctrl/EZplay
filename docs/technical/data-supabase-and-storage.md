---
status: Working
version: "0.2"
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

Serviciile și tipurile observate includ:
- Tipizările TypeScript sunt folosite activ (`src/lib/supabase/types.ts`). **Desincronizare observată**: fișierul nu include coloana `effect_config` adăugată tabelei `cards` și nici tabela `ezplay_saves`, deși acestea apar în migrații și cod. Ca rezultat, serviciul de salvare (`saveService.ts`) folosește cast-uri de tip `any`.
- `userService.ts` manipulează starea utilizatorului post-autentificare.

## Securitate și RLS (Row Level Security)

Migrațiile versionate demonstrează politici numai pentru tabelele definite sau modificate acolo:

- citire publică a jocurilor, seturilor și cărților active, plus operații administrative bazate pe profil;
- citire publică și operații administrative pentru relațiile dintre seturi, tipurile de cărți și tipurile de active;
- citire și inserare proprie pentru seturile deținute de utilizator, plus acces administrativ;
- citire, inserare și actualizare proprie pentru `ezplay_saves`.

Aplicarea acestor migrații în proiectul Supabase remote nu a fost verificată. Funcționarea RLS pentru întreaga schemă — inclusiv profiluri, portofele, tranzacții și skill-uri — nu este demonstrată de repository.

## Supabase Storage
- **Observat**: directorul `public/transfer images from user/` este doar un director protejat de transfer/sursă pentru activele inițiale. Acesta nu este dovada unui flux runtime complet pentru imaginile de profil.
- Repository-ul nu conține politici Storage versionate suficiente pentru a valida autorizarea bucket-urilor.
- `POST /api/cards/upload` folosește un client `service_role` pentru bucket-ul `cards`, dar handler-ul nu verifică sesiunea sau rolul. Riscul critic este descris în [Rute și Acces](routes-and-access.md) și necesită un task tehnic separat.

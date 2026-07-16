---
status: Working
version: "0.2"
updated: 2026-07-17
canonical_for: audited implementation baseline
---

# Starea implementării curente

Această pagină rezumă baza tehnică observată după unificarea repository-ului și auditul documentar-tehnic din 2026-07-17. Nu înlocuiește testarea funcțională și nu declară automat funcțiile drept validate.

## Baza auditată

- repository: `https://github.com/liviu1972-ctrl/EZplay`;
- bază istorică a unificării: `9ac8a88b5b5224da250c7ef4ad7b2bbc6912c87d`;
- checkpoint auditat tehnic pe `dev`: `338dab3c07fe45248f5bb73c9f99ad42aa6dbdf9`;
- referință tehnică rezultată: [`docs/technical/`](../technical/);
- auditul a fost executat fără modificări ale codului aplicației.

## Structura observată

- Next.js 16 cu App Router în `src/app/`;
- Supabase pentru integrarea de autentificare și date, cu migrații în `supabase/migrations/`;
- prototipul EZPLAY Deckbuilder importat din React/AI Studio și integrat hibrid în `src/features/ezplay/`;
- rute publice pentru homepage, program, experiențe, cercetare, platformă, instrumente și contact;
- rută separată `/ezplay` pentru experiența jocului.

## Starea Documentației Tehnice

`docs/technical/` este referința `Working` pentru arhitectura, rutele, autentificarea, datele, salvările și verificările observate la checkpoint-ul auditat. `docs/archive/legacy-application/` rămâne material istoric și nevalidat, nu sursă pentru aplicația curentă.

## Verificări și Limite

- `pnpm build` a reușit la checkpoint-ul auditat;
- `pnpm lint` a eșuat cu 213 erori și 116 avertismente; 239 dintre cele 329 de constatări sunt în motorul prototip `game-engine`;
- repository-ul nu conține suite de teste automate;
- login-ul, OAuth, sesiunile, onboarding-ul, rolurile, RLS, Storage, salvările și jocul nu au fost validate end-to-end;
- migrațiile versionate nu reconstruiesc întreaga schemă sugerată de tipurile și serviciile aplicației.

## Riscuri Cunoscute

- `POST /api/cards/upload` nu verifică sesiunea sau rolul în handler, dar folosește un client Supabase `service_role` pentru scriere în bucket-ul `cards`; acesta este un risc critic de securitate care necesită un task tehnic separat;
- login-ul și callback-ul deduc onboarding-ul din `display_name`, în timp ce middleware-ul verifică `onboarding_completed`;
- rolurile acceptate diferă între tipuri, middleware și layout-ul administrativ;
- tipurile Supabase sunt desincronizate parțial față de migrațiile pentru cărți și salvări.

EZPLAY Deckbuilder rămâne intenționat relativ izolat și nu este prioritate curentă pentru refactorizare generală sau perfecționare. Această limită nu amână riscurile critice de securitate, integritate a datelor ori pierdere a salvărilor.

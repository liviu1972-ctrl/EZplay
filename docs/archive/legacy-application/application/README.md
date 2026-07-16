---
status: Working
version: "0.1"
updated: 2026-07-16
---

# Aplicația EZPLAY

Acest director grupează documentația despre aplicația digitală, dar fișierele existente provin dintr-o versiune anterioară și nu sunt încă validate față de codul curent.

## Zone logice curente

Website-ul public, conturile, Deckbuilder-ul și simulatorul sunt zone ale aceleiași aplicații Next.js, nu aplicații sau repository-uri separate:

- rutele și paginile → `src/app/`;
- Deckbuilder și simulator → `src/features/ezplay/`;
- integrarea Supabase → `src/lib/supabase/` și `supabase/`;
- activele runtime → `public/` și Supabase Storage.

Separarea viitoare într-un serviciu sau deploy distinct se justifică numai printr-o nevoie tehnică ori de produs aprobată.

## Statutul fișierelor existente

- `features.md` — inventar vechi de funcții și roadmap;
- `glossary.md` — terminologie veche, nevalidată față de sursele canonice;
- `how-it-works.md` — parcursuri vechi ale aplicației;
- `roles-and-permissions.md` — roluri și permisiuni care trebuie verificate în cod și Supabase.

Aceste fișiere se păstrează fără rescriere în timpul unificării. Refacerea lor se face separat, prin auditul codului, autentificării, bazei de date și rutelor curente.

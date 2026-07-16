---
status: Working
version: "0.1"
updated: 2026-07-17
canonical_for: technical stack and architecture
---

# Arhitectură și Stack

(Auditat pe branch `dev`, commit `338dab3`)

## Stack Tehnologic
Observat în `package.json`:
- **Framework**: Next.js 16.2.6 folosind App Router (`src/app/`).
- **UI & Stiluri**: React 19.2.4, Tailwind CSS v4, `lucide-react`, componente UI shadcn, `recharts` pentru vizualizări.
- **Autentificare & Bază de date**: `@supabase/supabase-js`, `@supabase/ssr`.
- **Validare**: `zod`.
- **Limbaj**: TypeScript.

## Organizarea modulelor (`src/`)
Structura principală observată:
- `src/app/`: Conține organizarea rutelor Next.js (App Router), folosind *Route Groups* (ex: `(platform)`, `(ezplay)`) pentru layout-uri specifice izolate. Directoarele `auth/` și `api/` se află în afara acestor grupuri.
- `src/components/`: Componente vizuale specifice secțiunilor (dashboard, home, landing, layout, program) și primitive UI.
- `src/features/ezplay/`: Conține nucleul logic al aplicației și jocului:
  - `game-engine/`: Componente, logica de reducere (state machine), cârlige (hooks) și date pentru jocul Deckbuilder.
  - `platform/`: Conține servicii de platformă precum integrarea de `auth` (cu contextul Auth), `saves` și profil de `user`.
- `src/lib/`: Module utilitare:
  - `i18n/`: Configurație de internaționalizare (RO/EN) și dicționare statice.
  - `supabase/`: Clienți SSR, Middleware și definiția tipurilor (tipuri TypeScript generate pentru schema BD).

## Granițe Server/Client
- Autentificarea și protejarea rutelor (middleware, layout-uri de bază) utilizează capabilități server-side Next.js, combinate cu `@supabase/ssr`.
- Motorul jocului (`src/features/ezplay/game-engine`) provine dintr-un prototip React construit anterior în AI Studio. Pagina destinație `/ezplay` integrează hibrid acest modul: încarcă setul de date (cărți) server-side din Supabase, apoi predă datele motorului client-side care operează starea izolat.
- Layout-urile boxed la 1440px și componenta de navigare `ExplorerRail` sunt implementate pentru a delimita spațiul "editorial" de platforma administrativă.

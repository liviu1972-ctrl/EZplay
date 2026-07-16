---
status: Working
version: "0.1"
updated: 2026-07-17
canonical_for: technical game engine and save logic
---

# Motorul Deckbuilder și Salvări

(Auditat pe branch `dev`, commit `338dab3`)

## Arhitectura Motorului de Joc
Motorul este situat integral în `src/features/ezplay/game-engine/` și funcționează ca o aplicație complet izolată (State Machine) la nivel de client.

### 1. Managementul Stării
- Starea este condusă prin funcții reducătoare pure (`reducers/`): `gameInitReducer.ts`, `playerReducer.ts`, `turnReducer.ts`.
- Gestiunea evenimentelor este encapsulată în contextul de joc `GameContext.tsx`.
- Există controllere React personalizate (`hooks/`): `useGameEngine.ts`, `useGameSetup.ts`, `useGameViewLogic.ts`. 

### 2. Logica Core a Jocului
Pachetul `game-logic/` susține funcțiile primare:
- **`financials.ts`**: Calcule și ecuații economice de bază.
- **`simulation-runner.ts` / `ai-player.ts`**: Mecanism pentru instanțierea jocului împotriva logicii AI.
- **`deck-builder.ts`**: Manipularea inventarului de cărți pe perimetrul unei ture.
- **`effect-runner.ts`**: Declanșarea efectelor cărților peste resursele curente.

### 3. Extensii (Expansions)
Arhitectura permite module decuplate pentru adăugarea de pachete de cărți sau mecanici noi, grupate în sub-directoare ale `expansions/`:
- `base-game`
- `consultants`
- `events`
- `taxes`

## Vederi și Interfață
- `views/` organizează perspectivele jocului în funcție de etapă: `entrepreneur-selection`, `accountant-selection`, `starting-deck-setup`, și `game` (cu suport pentru modul `classic` sau `extended`).

## Sistemul de Salvare
- Starea generată din reduceri poate fi serializată.
- Funcțiile din `platform/saves/saveService.ts` preiau starea clientului și o sincronizează asincron cu tabelul de salvări Supabase, în funcție de profilul utilizatorului.
- **Neconfirmat funcțional**: Procesul complet de salvare locală și trimitere în Supabase pe baza unui token RLS valabil depinde de serverul Supabase și nu a fost verificat printr-un flux E2E automat.

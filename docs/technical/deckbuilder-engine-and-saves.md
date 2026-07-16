---
status: Working
version: "0.2"
updated: 2026-07-17
canonical_for: technical game engine and save logic
---

# EZPLAY Deckbuilder: Motor și Salvări

(Auditat pe branch `dev`, commit `338dab3`)

## Origine și Integrare

Motorul din `src/features/ezplay/game-engine/` provine dintr-un prototip React construit anterior în AI Studio. Codul a fost preluat aproape integral și adaptat limitat pentru a păstra munca existentă.

Integrarea actuală este hibridă: pagina Next.js `/ezplay` citește server-side cărțile din Supabase și transmite datele motorului client-side. Starea și interacțiunile jocului rămân concentrate în modulul client, relativ izolat față de restul platformei.

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
- Hook-urile motorului și `GameRunner.tsx` folosesc `localStorage` pentru salvarea și încărcarea locală a stării și a unor preferințe/configurații.
- Funcțiile din `platform/saves/saveService.ts` pot sincroniza asincron starea clientului cu tabela `ezplay_saves` din Supabase, în funcție de utilizator.
- **Neconfirmat funcțional**: nici restaurarea locală, nici sincronizarea cloud pe baza unui token și a politicilor RLS valide nu au fost verificate printr-un flux E2E.

## Limită de Mentenanță Aprobată

- Izolarea relativă a prototipului este intenționată. Perfecționarea, refactorizarea generală și redesign-ul EZPLAY Deckbuilder nu sunt priorități curente.
- Datoria de lint și tipizare observată nu autorizează o rescriere. Problemele se corectează gradual când zona este modificată pentru o nevoie aprobată.
- Riscurile critice de securitate, integritate a datelor sau pierdere a salvărilor se tratează separat de această carantină tehnică.
- Înaintea unei dezvoltări substanțiale a motorului sunt recomandate teste de regresie pentru calculele din `financials.ts`, reduceri, serializarea salvărilor și maparea cărților. Apoi pot fi abordate efectele React problematice și tipurile `any`, gradual.

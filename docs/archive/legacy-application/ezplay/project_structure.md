
# Structura Proiectului - EZ Play Platform

Acest document servește ca ghid de navigare în codul sursă al aplicației. Este destinat dezvoltatorilor și agenților AI pentru a înțelege rolul fiecărui fișier și modul în care acestea interacționează.

## 1. Rădăcina Proiectului (Root)

Fișierele de la nivelul de bază configurează mediul de execuție React și punctul de intrare în aplicație.

*   **`index.html`**: Punctul de intrare HTML. Conține importurile CSS (Tailwind), definițiile de animații globale și Import Map-ul pentru dependențe.
*   **`index.tsx`**: Punctul de montare React. Inițializează aplicația în elementul DOM `#root`.
*   **`App.tsx`**: Componenta rădăcină ("Wrapper").
    *   **Rol:** Decide ce ecran major să afișeze: `LoginScreen` (dacă utilizatorul nu e logat) sau `GameRunner` (dacă e logat/guest).
    *   **Context:** Împachetează aplicația în `AuthProvider`.
*   **`manifest.json` & `sw.js`**: Configurații pentru PWA (Progressive Web App) și caching offline.
*   **`metadata.json`**: Metadate specifice mediului de dezvoltare (permisiuni, descriere).

---

## 2. Platformă (`/platform`)

Acest director conține infrastructura aplicației, independentă de logica jocului de cărți. Gestionează utilizatorii, autentificarea și baza de date.

*   **`firebase-config.ts`**: Inițializează conexiunea la Firebase (Auth & Firestore).

### `/platform/auth` (Autentificare)
*   **`AuthContext.tsx`**: Gestionează starea globală a sesiunii (utilizator logat, guest, loading). Expune hook-ul `useAuth`.
*   **`authService.ts`**: Funcții wrapper peste Firebase Auth API (`login`, `register`, `logout`).
*   **`LoginScreen.tsx`**: UI-ul pentru autentificare și înregistrare.

### `/platform/user` (Profil Utilizator)
*   **`types.ts`**: Definește interfața `UserProfile`.
*   **`userService.ts`**: Funcții pentru citirea/scrierea profilului în Firestore (`users` collection).
*   **`UserProfile.tsx`**: Componenta UI pentru vizualizarea și editarea profilului (avatar, nickname).

---

## 3. Motorul de Joc (`/features/game-engine`)

Acesta este nucleul aplicației. Conține toată logica, datele și interfața specifică jocului EZ Play.

*   **`GameRunner.tsx`**: Componenta principală a jocului. Inițializează `GameContext`, rutele interne (`GameRouter`) și hook-urile majore (`useGameEngine`, `useGameSetup`).
*   **`types.ts`**: **Esențial.** Conține toate definițiile TypeScript globale (`GameState`, `Card`, `GameAction`, `GameConfig`).
*   **`constants.ts`**: URL-uri pentru imagini și constante statice.

### `/game-logic` (Business Logic - Pure TS)
Acest folder conține "creierul" jocului. Este decuplat de React (nu conține JSX sau hook-uri).

*   **Core:**
    *   **`reducer.ts`**: Reducer-ul rădăcină. Distribuie acțiunile către sub-reduceri.
    *   **`actions.ts`**: **Action Creators.** Funcții pure care validează intenția și returnează un obiect `GameAction` sau `null`.
    *   **`selectors.ts`**: Funcții pure pentru calcule derivate (ex: `processHandAndCalculateTotals`, `getEffectiveCost`).
    *   **`state-utils.ts`**: Utilitare pentru manipularea stării (shuffle, drawCards).
    *   **`effect-runner.ts`**: Middleware care analizează schimbările de stare și declanșează efecte în lanț (ex: bonusuri la cumpărare).
    *   **`log-formatter.ts`**: Transformă acțiunile din log în text lizibil pentru UI.
    *   **`prng.ts`**: Generator de numere pseudo-aleatoare pentru determinism (seed-based).

*   **Configurare & Date:**
    *   **`configService.ts`**: Încarcă dinamic modulele din `/expansions` și construiește configurația finală.
    *   **`defaults.ts`**: Valorile implicite "hardcoded".
    *   **`market-config.ts`**: Logica pentru configurarea sloturilor de piață.
    *   **`zod.ts`**: Scheme de validare Zod pentru integritatea datelor (cărți, scenarii).

*   **Simulare & AI:**
    *   **`ai-player.ts`**: Logica de decizie pentru bot. Evaluează starea și returnează cea mai bună acțiune.
    *   **`ai-hints.ts`**: Valori heuristice hardcoded pentru a ajuta AI-ul să evalueze cărți complexe.
    *   **`simulation-runner.ts`**: Rulează jocuri "headless" (fără UI) în buclă rapidă pentru teste.
    *   **`deck-builder.ts`**: Algoritm greedy pentru construcția automată a pachetelor.
    *   **`financials.ts`**: Calculul rapoartelor anuale.

*   **Sub-Reducers:**
    *   `reducers/playerReducer.ts`: Acțiuni specifice jucătorului (Buy, Retire).
    *   `reducers/turnReducer.ts`: Logica de final de tură/an.
    *   `reducers/gameInitReducer.ts`: Inițializarea și resetarea jocului.

### `/hooks` (React Logic)
Podul dintre React și `game-logic`.

*   **`useGameEngine.ts`**: Gestionează ciclul de viață al reducer-ului, AI-ului, salvării automate și efectelor.
*   **`useGameSetup.ts`**: Gestionează "Wizard-ul" de configurare a unui joc nou (selecție antreprenor, deck building).
*   **`useGameViewLogic.ts`**: **Important.** Abstracție pentru UI-ul de joc. Gestionează input-urile manuale, animațiile și validarea finalului de tură, fiind folosit atât de Desktop cât și de Mobile views.
*   **`useIsMobile.ts`**: Detectează dimensiunea ecranului.

### `/expansions` (Date)
Module de conținut. Fiecare folder conține un `index.ts` (entry point) și `cards.ts` (date).

*   **`base-game`**: Cărțile standard.
*   **`events`**: Evenimente economice.
*   **`consultants`**: Consultanți.
*   **`taxes`**: Modulul ANAF și Contabili.

### `/components` (Interfață Utilizator)

*   **Rute Principale:**
    *   `MainMenu.tsx`: Ecranul de start.
    *   `GameRouter.tsx`: Switcher între ecranele jocului.
    *   `Settings.tsx`, `GameSetup.tsx`: Ecrane de configurare.
    *   `CompanyHistoryView.tsx`: Grafice istorice.
    *   `DocumentationView.tsx`: Viewer pentru Markdown.
    *   `ScenarioLoader.tsx`: Import JSON pentru scenarii.
    *   `GameSimulator.tsx`: UI pentru rularea simulărilor.

*   **Views (Ecrane Specifice Jocului):**
    *   **`views/game/`**: Ecranul principal de joc.
        *   `classic/`: Layout-ul standard.
        *   `extended/`: Layout cu zonă dedicată pentru management.
        *   Fiecare are `Desktop.tsx` și `Mobile.tsx`.
    *   `views/entrepreneur-selection/`: Ecran selecție.
    *   `views/accountant-selection/`: Ecran selecție contabil.
    *   `views/starting-deck-setup/`: Ecran construire pachet.

*   **Elemente UI Reutilizabile:**
    *   **`CardUI.tsx`**: Componenta complexă care randează o carte (imagine sau generată).
    *   **`Pile.tsx`**: Reprezintă un teanc de cărți (Deck, Market).
    *   **`PlayerHUD.tsx`**: Bara de sus cu avatarele jucătorilor.
    *   **`ActionHub.tsx`**: Meniul contextual când dai click pe o carte.
    *   **`HistoryChart.tsx`**, `MultiCompanyHistoryChart.tsx`: Grafice D3/SVG.
    *   **`AnafModal.tsx`**: Fereastra de penalizare.
    *   **`Numpad.tsx`**, `NumberReelInput.tsx`: Metode de input.

## 4. Directorul `/documentation`

*   `rules.md`: Manualul de utilizare pentru jucători.
*   `technical_docs.md`: Documentație de arhitectură high-level și istoric versiuni.
*   `project_structure.md`: (Acest fișier) Harta detaliată a codului.
*   `game_data.json`: Dump complet al datelor pentru referință.

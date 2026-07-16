

# Documentație Tehnică - EZ Play Platform

## 1. Introducere
### 1.1. Viziune
**EZ Play Platform** nu mai este doar un simplu joc, ci o aplicație web complexă, modulară și scalabilă. Arhitectura a fost refăcută pentru a separa clar **Platforma** (autentificare, infrastructură, navigare globală) de **Motorul de Joc** (logica de business, simulare, reguli).

### 1.2. Stack Tehnologic Actualizat
*   **Frontend:** React 19.2.3 (Concurrent Features, Suspense).
*   **Limbaj:** TypeScript (Tipizare strictă).
*   **Autentificare & Backend:** Firebase 12.6.0 (Authentication, pregătit pentru Firestore).
*   **Stilizare:** TailwindCSS.
*   **Validare:** Zod (pentru integritatea datelor din extensii).
*   **Build Tool:** Vite.

## 2. Arhitectură High-Level

Aplicația este împărțită în două straturi majore:

### 2.1. Stratul Platformă (`platform/`)
Gestionează tot ce ține de utilizator și mediul în care rulează jocul, dar nu jocul în sine.
*   **Autentificare:** `AuthContext` și `authService` gestionează starea utilizatorului (Logged In / Guest) folosind Firebase Auth.
*   **Configurare Firebase:** `firebase-config.ts` inițializează conexiunea.
*   **Routing Global:** `App.tsx` decide dacă afișează ecranul de Login sau `GameRunner`.

### 2.2. Stratul Game Engine (`features/game-engine/`)
Este un modul complet decuplat, care conține logica jocului. Începând cu v1.4, acest strat este **Framework-Agnostic** (Pure TypeScript).
*   **`GameRunner.tsx`:** Componenta rădăcină a jocului (fostul App.tsx). Inițializează `GameContext` și rutele interne ale jocului.
*   **`game-logic/`:** "Creierul" aplicației. Nu conține importuri din React. Poate rula pe server (Node.js) sau într-un web worker.
*   **`expansions/`:** Datele jocului (cărți, reguli), încărcate dinamic.

## 3. Structura Proiectului

```
/
├── platform/                  # STRATUL PLATFORMĂ
│   ├── auth/                  # Logica de autentificare (Login, Register, Context)
│   └── firebase-config.ts     # Configurare Firebase 12.6.0
│
├── features/                  # FEATURE MODULES
│   └── game-engine/           # STRATUL MOTOR DE JOC
│       ├── components/        # Componente UI specifice jocului
│       │   ├── views/         # Ecrane majore (Game, Setup, History)
│       │   └── ...
│       ├── contexts/          # GameContext (State-ul jocului - React dependency)
│       ├── expansions/        # Module de conținut (Base Game, Events, etc.)
│       ├── game-logic/        # Business Logic pur (NO React imports)
│       │   ├── actions.ts     # Action Creators (Pure Functions)
│       │   ├── ai-player.ts   # Logică AI
│       │   ├── simulation-runner.ts # Motorul de simulare "headless"
│       │   ├── reducer.ts     # Root Reducer
│       │   └── ...
│       ├── hooks/             # Custom Hooks (React Logic)
│       │   ├── useGameEngine.ts    # Logică ciclu viață joc
│       │   ├── useGameSetup.ts     # Logică configurare joc
│       │   └── useGameViewLogic.ts # Logică comună UI joc (HUD, Charts, EndTurn)
│       └── GameRunner.tsx     # Entry point-ul jocului
│
├── App.tsx                    # Entry point-ul aplicației (Platform Wrapper)
├── types.ts                   # Definiții de tipuri globale
└── index.html                 # Importmap și configurare
```

## 4. Detalii Implementare

### 4.1. Autentificare (Firebase)
Sistemul folosește `onAuthStateChanged` din Firebase v12.6.0 pentru a menține sesiunea.
*   **Erori:** Erorile de tip `auth/invalid-credential` sunt interceptate și tratate UI-friendly, fără a polua consola (vezi `authService.ts`).
*   **Guest Mode:** Starea `guest` este gestionată local în `AuthContext` pentru a permite jocul fără cont.

### 4.2. Motorul de Simulare (`simulation-runner.ts`)
O componentă critică pentru echilibrarea jocului.
*   Rulează jocul "headless" (fără UI), executând direct funcțiile din reducer.
*   Poate rula mii de iterații într-o buclă `while` rapidă.
*   Permite testarea scenariilor: AI vs AI cu strategii diferite.

### 4.3. Sistemul de Extensii & Configurare
Jocul este "Data-Driven".
*   **`configService.ts`:** Încarcă modulele din `expansions/`.
*   **Zod Validation:** Fiecare carte încărcată este validată strict împotriva unei scheme.
*   **Layered Config:** Configurația finală a jocului este o fuziune între:
    1.  Defaults (Hardcoded)
    2.  Extensii (ex: Taxe activează ANAF mode)
    3.  User Settings (localStorage)

### 4.4. Managementul Stării (Multiplayer-Ready)
Deși este o aplicație web client-side, structura de date `GameState` este pregătită pentru multiplayer.
*   **Istoric Izolat:** Fiecare `PlayerState` are propriul istoric (`history`).
*   **Rapoarte Sincronizate:** La finalul anului, se generează rapoarte pentru *toți* jucătorii simultan, permițând grafice comparative (`MultiCompanyHistoryChart`).

### 4.5. Abstracția Logicii de Vizualizare (`useGameViewLogic`)
Pentru a elimina duplicarea codului între cele 4 variante de vizualizare a jocului (Desktop/Mobile × Classic/Extended), logica de stare și calcul a fost extrasă într-un hook personalizat: `useGameViewLogic`.
*   **Centralizare Logică:** Gestionează starea input-urilor manuale din HUD, validarea datelor la final de tură, secvențierea animațiilor de tranziție ('sweep') și pregătirea datelor pentru grafice.
*   **Interfață Unificată:** Returnează un obiect `logic` standardizat care este consumat de componentele vizuale.
*   **Separation of Concerns:** Componentele View (`DesktopGameViewClassic` etc.) rămân responsabile doar de randare (JSX), layout și gestionarea evenimentelor specifice platformei (ex: Drag and Drop API, Fullscreen Toggle), în timp ce regulile de interacțiune sunt dictate de hook.

### 4.6. UX/UI Adaptiv (Responsive Header)
Componenta `GameRunner` implementează o logică de randare condiționată pentru antetul aplicației (Top Bar), optimizată pentru dispozitive mobile în modul Landscape:
*   **Desktop:** Afișează avatarul, numele utilizatorului și butonul de meniu ("Acasă") cu fundal vizibil și efecte de blur.
*   **Mobile:** Maximizează spațiul de joc (Screen Real Estate) prin ascunderea completă a detaliilor utilizatorului (avatar/nume). Se randează doar un buton 'Home' minimalist, transparent, cu o culoare distinctă (auriu) pentru vizibilitate maximă fără a bloca elementele de joc.

### 4.7. Pattern-ul Action Creators (Logic Decoupling)
Începând cu versiunea 1.4, am adoptat pattern-ul **Pure Action Creators** pentru a decupla complet logica de joc (`game-logic`) de framework-ul UI (React).

**Problema anterioară:**
Funcțiile din `actions.ts` primeau ca argument `dispatch` din React. Asta făcea imposibilă testarea logicii fără a randa componente sau rularea motorului pe un server Node.js.

**Soluția Curentă:**
1.  **Creatori Puri:** Fișierul `actions.ts` exportă funcții pure (ex: `createBuyCardAction`). Acestea primesc starea jocului (`GameState`) și parametrii acțiunii.
2.  **Validare:** Funcția validează dacă acțiunea este permisă (ex: jucătorul are suficienți bani).
3.  **Return:** Dacă validarea trece, returnează un obiect `GameAction` ({ type: '...', payload: ... }). Dacă nu, returnează `null`.
4.  **Execuție:** Componenta UI (ex: `DesktopGameViewClassic`) apelează creatorul, verifică dacă rezultatul nu este null, și abia apoi apelează `dispatch(action)`.

**Avantaje:**
*   **Portabilitate:** Directorul `game-logic` poate fi copiat "as-is" într-un proiect backend Node.js pentru validare multiplayer autoritară.
*   **Testare:** Putem scrie teste unitare simple: `expect(createBuyCardAction(state, expensiveCard)).toBeNull()`.

### 4.8. Sistemul de Salvare în Cloud (Cloud Persistence)
Începând cu versiunea 1.5, jocul suportă salvarea progresului în Cloud (Firestore) pentru utilizatorii autentificați.

**Structura Datelor în Firestore:**
Datele sunt salvate în calea: `user_saves/{uid}/slots/autosave`. Documentul conține două obiecte principale:
1.  **`gameState`**: Starea completă a jocului (serialized).
2.  **`metadata`**: Informații sumare (timestamp, an curent, număr jucători, versiune schemă).

**Provocări Tehnice și Soluții (IMPORTANT):**
Pentru a evita erorile la scrierea în Firestore, `saveService.ts` implementează o logică strictă de transformare a datelor (`serializeGameState` și `deserializeGameState`):

1.  **Nested Arrays (Array-uri imbricate):**
    *   *Problema:* Firestore nu suportă nativ array-uri care conțin direct alte array-uri (ex: `marketPiles: Card[][]` sau `predefinedMarket`).
    *   *Soluția:* Înainte de salvare, array-urile interioare sunt "împachetate" în obiecte.
        *   `[[card1], [card2]]` devine `[{ cards: [card1] }, { cards: [card2] }]`.
    *   La încărcare, procesul este inversat ("unwrap") pentru a restabili structura corectă în memorie.

2.  **Valori `undefined`:**
    *   *Problema:* Firestore aruncă o eroare dacă un obiect conține chei cu valoarea `undefined`.
    *   *Soluția:* Sanitizarea întregului obiect `gameState` folosind `JSON.parse(JSON.stringify(gameState))`. Aceasta elimină automat toate cheile `undefined` înainte de trimitere.

3.  **Limita de Mărime a Documentului (1 MiB):**
    *   *Problema:* `actionLog` crește cu fiecare acțiune a utilizatorului. Într-un joc lung, istoricul complet ar putea depăși limita maximă a unui document Firestore (1 Megabyte), cauzând eșecul salvării.
    *   *Soluția:* **Trunchierea Jurnalului.** La salvare, păstrăm doar ultimele 20 de intrări din `actionLog`. Acest lucru este suficient pentru funcționalitatea "Undo" recentă, reducând drastic dimensiunea documentului fără a afecta gameplay-ul la reluare.

4.  **Versionarea Schemei:**
    *   Salvarea include un câmp `version`. Acest lucru permite implementarea viitoare a unor funcții de migrare a datelor, în cazul în care structura `GameState` se schimbă radical.

## 5. Ghid pentru Dezvoltatori

### Adăugarea unei noi funcționalități de Platformă
1.  Modificările se fac în `platform/`.
2.  Dacă funcționalitatea afectează jocul (ex: Salvare în Cloud), aceasta trebuie injectată în `GameRunner` sau accesată via `useAuth` în interiorul componentelor jocului.

### Adăugarea unei noi acțiuni de Joc (Refactorizat v1.4)
1.  Definește tipul acțiunii în `types.ts` (discriminant union `GameAction`).
2.  Implementează logica de modificare a stării în `reducer.ts` (sau sub-reducerii aferenți).
3.  Creează un **Action Creator** în `game-logic/actions.ts`.
    *   Funcția trebuie să fie pură.
    *   Nu importa `Dispatch` sau `React`.
    *   Returnează `GameAction | null`.
4.  În componenta UI, importă creatorul și folosește-l:
    ```typescript
    const handleAction = () => {
        const action = createMyNewAction(gameState, payload);
        if (action) dispatch(action);
    };
    ```

### Crearea unui nou Game View Layout
1.  Creați două componente: `MyNewViewDesktop.tsx` și `MyNewViewMobile.tsx`.
2.  În interiorul lor, apelați `const logic = useGameViewLogic(props, 'desktop' | 'mobile')`.
3.  Folosiți datele din `logic` (ex: `logic.processedHand`, `logic.turnTotals`) pentru a randa interfața.
4.  Nu reimplementați logica de `handleEndTurn` sau calculele HUD; folosiți funcțiile expuse de hook.

## 6. Istoric Versiuni

### v1.5 (Curent) - Cloud Saves & Persistence
*   **Cloud Save:** Implementare salvare automată în Firestore.
*   **Firestore Optimization:** Rezolvare limitări Firestore (nested arrays, undefined values, document size limit via log truncation).
*   **UI:** Notificări toast la încărcarea jocului din cloud.

### v1.4 - Core Architecture Decoupling
*   **Arhitectură:** Implementarea pattern-ului Action Creators. Eliminarea dependenței de `React.Dispatch` din `game-logic`.
*   **Testabilitate:** Pregătirea motorului pentru teste unitare și validare server-side.
*   **Refactor:** Actualizarea tuturor consumatorilor de acțiuni (`Desktop`, `Mobile`, `ActionHub`) pentru a suporta noul pattern.

### v1.3 - Refactoring & UI Optimization
*   **Code Quality:** Introducerea `useGameViewLogic` pentru reducerea duplicării codului în componentele de vizualizare.
*   **Mobile UX:** Optimizarea antetului pentru ecrane mici (ascundere avatar, iconițe minimaliste).
*   **Corecții:** Rezolvarea exporturilor numite incorect în vizualizările mobile.

### v1.2 - Platform Transformation
*   **Auth:** Integrare Firebase 12.6.0.
*   **Refactor:** Separare clară între Platformă și Game Engine.
*   **Simulare:** Adăugarea motorului de simulare a partidelor.
*   **UI:** Suport complet pentru Mobile Landscape și input methods (Number Reel).

### v1.1 - Multiplayer & Reports
*   Suport pentru grafice comparative multi-companie.
*   Refactorizarea reducer-ului în sub-module.

### v1.0 - Core Game
*   Implementarea mecanicii de bază deck-building.



Modificari 19 decembrie 2025 




### 2.1. Autentificare (Firebase Auth)
*   Suportă provideri multiple: `Email/Password` și `GoogleAuthProvider`.
*   Sesiunea este menținută prin `onAuthStateChanged`.

### 2.2. Stocare Date (Firestore & Storage)
*   **Firestore:** Stochează profilele utilizatorilor, salvarea jocurilor (`user_saves`) și istoricul tranzacțiilor.
*   **Firebase Storage:** Stochează imaginile de tip avatar încărcate de utilizatori în calea `/avatars/{uid}/`.

## 3. Sistemul Economic și Tranzacțional

### 3.1. Documentul de Profil (Firestore)
Fiecare utilizator are un document în colecția `users` cu următoarele câmpuri economice:
*   `ezc`: `number` (Atomic increment)
*   `ezg`: `number` (Atomic increment)

### 3.2. Sistemul Ledger (Sub-colecție)
Orice modificare a balanței (recompensă de joc sau ajustare admin) este înregistrată în sub-colecția `ledger` a utilizatorului:
```typescript
{
  currency: 'ezc' | 'ezg',
  delta: number,
  reason: string,
  timestamp: number
}
```

### 3.3. Logica Recompenselor (useGameEngine.ts)
*   **Trigger:** Declanșat la `isGameOver` dacă `winnerPlayerIndex` corespunde jucătorului uman.
*   **EZC:** `player.history.annual.length * 1`. (1 unitate per an supraviețuit).
*   **EZG:** `1` per victorie (dacă obiectivul nu este 'infinite').
*   **Faliment:** Nicio recompensă nu este procesată.

## 4. Panoul de Administrare (AdminPanel.tsx)
Accesibil doar utilizatorilor cu `role === 'admin'`.
*   **Ajustări Economice:** Folosește `processTransaction` pentru a modifica balanțele și a loga motivul.
*   **Acțiuni Globale:** Implementate prin iterație peste lista de utilizatori (`handleAdjustAll`), permițând acordarea de bonusuri de masă (+10 EZC sau +1 EZG).

## 5. Abstracția Logicii de Vizualizare (`useGameViewLogic`)
Centralizează starea input-urilor manuale, animațiile de tranziție și pregătirea datelor pentru grafice, fiind consumat de toate variantele de layout.

## 6. Sistemul de Salvare în Cloud (Cloud Persistence)
Implementează o logică de transformare a datelor (`serializeGameState`) pentru a rezolva limitările Firestore privind array-urile imbricate și valorile `undefined`.

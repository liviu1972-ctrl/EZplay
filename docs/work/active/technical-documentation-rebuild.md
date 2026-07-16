---
status: Working
version: "0.2"
updated: 2026-07-17
lifecycle: active
---

# Reconstruirea documentației tehnice curente EZPLAY

## Scop

Acest document coordonează primul pilot al fluxului de colaborare dintre utilizator, Codex și Gemini. Rezultatul urmărit este o documentație tehnică nouă, verificabilă, pentru implementarea Next.js/Supabase/Deckbuilder existentă.

Taskul nu autorizează schimbări de cod, dependențe, Supabase, migrări, autentificare sau comportament de produs. Orice problemă descoperită se documentează separat; nu se repară în cadrul auditului.

## Responsabilități

- utilizatorul este Product Owner și decide orice schimbare de produs sau extindere de scope;
- Codex răspunde de auditul documentar, sursele de produs, statusuri, terminologie, legături și reconcilierea finală;
- Gemini răspunde de auditul tehnic bazat pe cod, de verificările rulate și de acuratețea documentației tehnice;
- agenții lucrează secvențial și nu modifică simultan aceleași fișiere.

## Checkpoint inițial

- repository: `C:\Antigravity projects\EZplay`;
- branch: `dev`;
- commit: `793752ddd7aa58e970906e6b3c653e2b4f1cb387`;
- stare la început: working tree curat, `dev` sincronizat cu `origin/dev`;
- data auditului documentar inițial: 2026-07-17.

Checkpoint-ul tehnic efectiv al Gemini va fi commitul rezultat după checkpoint-ul documentar Codex creat la finalul primei etape.

## Constatări documentare inițiale

### Structură și igienă

- au fost inventariate 69 de fișiere Markdown în afara directoarelor `archive`;
- la început existau 44 de documente cu front matter în afara arhivei; marcarea Quick Start-ului și crearea acestui document de lucru au ridicat totalul la 46, toate folosind numai stările `Draft`, `Working` și `Current`;
- README-urile și `AGENTS.md`-urile fără front matter sunt conforme cu metoda curentă;
- nu au fost găsite linkuri relative rupte în documentele Markdown;
- `regulament-quick-start-EZPLAY.md` era singurul document obișnuit activ fără front matter și a fost marcat `Draft` fără validarea regulilor;
- denumirea necanonică a jocului avansat din `current-assets.md` a fost înlocuită cu `Tableau Builder`.

### Maturitatea conținutului

- definiția proiectului și metoda documentară sunt `Current`;
- poziționarea, viziunea, modelul economic, inventarul activelor și starea implementării sunt încă `Working`;
- cea mai mare parte a pachetului editorial și UX/UI este `Draft`, chiar dacă unele elemente au fost deja implementate;
- `docs/roadmap/current-implementation-status.md` fixează o bază observată, nu un audit funcțional complet;
- afirmațiile tehnice sunt dispersate în roadmap și în documentele de continuitate ale website-ului, dar nu formează o sursă tehnică actuală completă.

### Materiale nevalidate

- `docs/regulament-quick-start-EZPLAY.md` conține o variantă completă de Quick Start, dar versiunea, regulile și relația cu jocul fizic și digital nu sunt confirmate;
- `docs/cum se joaca.jpg` prezintă o configurație `EZ-CORE v3.0` și text de licențiere care nu poate fi tratat ca aprobat înaintea reconcilierii cu `docs/licensing/`;
- ambele fișiere rămân temporar la rădăcina `docs/` și nu sunt canonice.

## Golul tehnic care trebuie închis

Documentele din `docs/archive/legacy-application/technical/` și `docs/archive/legacy-application/ezplay/` sunt istorice și nevalidate. Ele nu pot fi copiate, rescrise superficial sau citate ca dovadă a comportamentului curent.

Auditul Gemini trebuie să pornească din:

1. `/AGENTS.md`;
2. `src/AGENTS.md` și `src/features/ezplay/AGENTS.md`;
3. codul și configurația actuală;
4. migrațiile Supabase și tipurile versionate;
5. documentele canonice strict relevante pentru limitele de produs;
6. arhiva numai după audit, exclusiv pentru identificarea diferențelor istorice.

## Livrabile tehnice așteptate

Gemini creează `docs/technical/` și numai documentele necesare pentru următoarele responsabilități:

1. `README.md` — scopul, ordinea de lectură, sursele și limitele documentației tehnice;
2. `architecture.md` — stack-ul real, route groups, layout-uri, granițe server/client, i18n și organizarea modulelor;
3. `routes-and-access.md` — inventarul rutelor publice, autentificate, administrative, API și callback, cu regulile reale de acces;
4. `authentication-and-user-lifecycle.md` — login, înregistrare, OAuth, sesiune, middleware, onboarding, profil și roluri;
5. `data-supabase-and-storage.md` — tabele, migrații, tipuri, servicii, operații, politici RLS observabile și utilizarea Storage;
6. `deckbuilder-engine-and-saves.md` — structura motorului, starea jocului, configurațiile, cărțile, extensiile, simulatorul, salvarea și încărcarea;
7. `verification.md` — comenzile și scenariile executate, rezultate, limitări, verificări imposibile local și riscuri.

Gemini poate adapta numărul de fișiere numai dacă păstrează aceste responsabilități fără definiții duplicate.

## Reguli pentru afirmațiile tehnice

Fiecare document tehnic:

- folosește `status: Working`, versiune `0.1`, data auditului și `canonical_for` precis;
- indică branch-ul și commitul auditat;
- leagă afirmațiile importante de căi concrete din `src/`, `supabase/`, `package.json` sau configurație;
- separă `observat în cod`, `verificat prin comandă/scenariu`, `neconfirmat` și `planificat`;
- nu declară RLS, OAuth, salvări, acces administrativ sau scenarii de joc drept funcționale numai prin prezența codului;
- nu include secrete, valori din `.env`, token-uri, identificatori sensibili sau date personale;
- nu transformă arhiva legacy în sursă curentă;
- nu schimbă decizii, copy, formule sau reguli de joc ca să corespundă implementării.

## Verificări tehnice cerute

Gemini trebuie să raporteze separat:

- scripturile disponibile în `package.json` și absența oricăror scripturi așteptate;
- rezultatul `pnpm lint`;
- rezultatul `pnpm build`;
- testele automate găsite și rezultatele lor; dacă nu există, se spune explicit;
- verificările statice pentru auth, middleware, callback, roluri și RLS;
- scenariile funcționale executate local pentru autentificare, acces, Deckbuilder, salvări și responsive;
- scenariile care nu pot fi executate fără acces extern, date, conturi sau configurare și motivul exact.

Rularea verificărilor nu autorizează modificarea codului pentru a le face să treacă.

## Fișiere permise în etapa Gemini

Gemini modifică numai:

- `docs/technical/**`;
- secțiunile `Rezultatul auditului Gemini` și `Checkpoint final Gemini` din acest document.

Nu modifică alte documente, cod, configurație, dependențe, migrări sau fișiere de date. Dacă descoperă că este necesară o schimbare în afara scope-ului, o raportează ca propunere.

La final creează un commit local numai cu fișierele permise, fără push, și lasă working tree-ul curat.

## Rezultatul auditului Gemini

Au fost create documentele tehnice în `docs/technical/`:
- `README.md`
- `architecture.md`
- `routes-and-access.md`
- `authentication-and-user-lifecycle.md`
- `data-supabase-and-storage.md`
- `deckbuilder-engine-and-saves.md`
- `verification.md`

**Realitatea observată:**
Arhitectura Next.js App Router este coerent structurată, separând responsabilitățile de UI, Platform (Supabase auth/saves), și Game Engine (reduceri, simulări). Middleware-ul Next.js gestionează protecția rutelor server-side.

**Verificări Rulate:**
- `pnpm lint`: Executat, 329 probleme raportate (lipsă tipizări, hooks incorecte), status EȘUAT.
- `pnpm build`: Executat, compilare curată a rutelor statice și dinamice, status SUCCES.
- Teste Automate: Nu au fost găsite în cod (`*.test.ts`, `*.spec.ts`). Nu se confirmă E2E scenariile.

**Diferențe față de documentația existentă:**
Documentația din `archive/legacy-application` descria vechiul sistem și nu are corespondent direct în actuala arhitectură bazată pe reduceri React și integrare de profil Supabase (auth/salvări) client/server.

**Riscuri:**
Datoria tehnică vizibilă din lipsa testelor unitare/E2E și erorile de linter pe codebase. Imposibilitatea probării locale a fluxului de date prin Supabase fără o instanță activă.


## Checkpoint final Gemini

- Branch auditat: `dev`
- Commit auditat: `338dab3c07fe45248f5bb73c9f99ad42aa6dbdf9`
- Git status raportat la pre-commit: Curat pentru documentația non-tehnică. Au fost introduse doar fișiere noi din `docs/technical/` și acest document updatat.

## Controlul de reconciliere Codex

> **Stare:** este necesară o corecție tehnică Gemini înainte ca documentele din `docs/technical/` să fie integrate în navigarea canonică și înaintea arhivării acestui document.

Inspecția read-only a surselor a identificat următoarele diferențe materiale:

1. `architecture.md` menționează route group-ul `(auth)`, dar structura actuală folosește `(platform)` și `(ezplay)`, iar `auth/` și `api/` sunt directoare de rută în afara acestor grupuri.
2. Ruta `/ezplay` găzduiește **EZPLAY Deckbuilder**, jocul de bază, nu „motorul de joc avansat”. Numele canonice aprobate sunt `EZPLAY Deckbuilder` și `EZPLAY Tableau Builder`; `EZPLAY1` și `EZPLAY2` rămân numai aliasuri istorice de prompt.
3. Motorul provine dintr-un prototip React construit anterior în AI Studio, preluat aproape integral și adaptat limitat în aplicația actuală. Pagina `/ezplay` citește însă cărțile server-side din Supabase înainte să predea datele motorului client-side; documentația trebuie să distingă originea client-side de integrarea curentă hibridă.
4. Middleware-ul aplică verificarea `onboarding_completed` și unor rute publice care nu se află în lista sa restrânsă de excepții. Lista include `/how-it-works`, deși ruta curentă este `/how-we-learn`.
5. Login-ul și callback-ul decid onboarding-ul prin existența `display_name`, în timp ce middleware-ul verifică `onboarding_completed`; această diferență trebuie documentată ca nealiniere observată, nu ca flux unic confirmat.
6. Rolul implicit „participant” nu este demonstrat de sursele versionate. Tipurile aplicației menționează `standard`, `admin` și `premium`; layout-ul administrativ acceptă și `superadmin`, dar middleware-ul acceptă numai `admin`.
7. Migrațiile versionate nu reconstruiesc integral schema descrisă de `types.ts`: lipsesc DDL-ul și politicile pentru `user_profiles`, `wallets`, `token_transactions` și `user_skills`.
8. `types.ts` nu include `effect_config` și `ezplay_saves`, deși acestea apar în migrații și cod; serviciul de salvare folosește cast-uri `any`. Afirmația că tipurile sunt sincronizate direct cu schema este prea puternică.
9. Politicile RLS pot fi descrise precis pentru tabelele și politicile prezente în migrații, dar RLS-ul întregii scheme și al Storage nu este demonstrat de repository.
10. `POST /api/cards/upload` nu verifică sesiunea sau rolul în handler și nu este inclus între rutele private din middleware, dar folosește clientul cu `service_role` pentru upload în bucket-ul `cards`. Aceasta este o constatare de securitate cu prioritate ridicată și trebuie documentată explicit, fără remediere în acest task.
11. `public/transfer images from user/` este un director protejat de transfer/sursă, nu dovadă a unui flux runtime pentru imaginile de profil.
12. Secțiunea `Checkpoint final Gemini` trebuie să indice commitul documentar rezultat `f8b24438a0d90208202b4ed78c9e928c4a518871` și starea Git de după commit, nu numai commitul de cod auditat.
13. Izolarea relativă a prototipului `/ezplay` este intenționată, iar perfecționarea, refactorizarea generală și redesign-ul nu sunt priorități curente. Documentația tehnică trebuie să descrie această limită fără să transforme datoria tehnică observată într-o autorizație de rescriere; riscurile critice de securitate și date se tratează separat.

Corecțiile de produs și terminologie au fost aplicate separat de Codex. Corectarea afirmațiilor tehnice rămâne responsabilitatea Gemini și nu autorizează modificări de cod.

## Reconcilierea finală Codex

După revenirea utilizatorului, Codex va:

1. compara checkpoint-ul inițial cu rezultatul Gemini;
2. verifica dacă documentele tehnice respectă sursele și limitele taskului;
3. actualiza numai documentele canonice de produs, roadmap și navigare afectate de constatări;
4. clasifica sau păstra separat materialele Quick Start numai după clarificarea versiunii și provenienței;
5. decide împreună cu utilizatorul dacă documentația tehnică poate rămâne `Working` sau dacă anumite părți pot deveni `Current`;
6. arhiva acest document după transferul adevărului curent;
7. evalua pilotul și actualiza fluxul de colaborare dacă este necesar.

## Întrebări care rămân pentru reconciliere

- Care variantă fizică reprezintă sursa de adevăr pentru Quick Start și pentru imaginea `EZ-CORE v3.0`?
- Ce verificări funcționale pot fi executate local fără acces la proiectul Supabase remote?
- Ce afirmații tehnice din `current-assets.md` și `existing-platform-continuity.md` trebuie corectate după audit?
- Cât de granulară trebuie să rămână documentația tehnică pentru a fi întreținută după schimbările viitoare?

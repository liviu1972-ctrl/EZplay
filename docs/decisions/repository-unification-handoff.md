---
status: Working
version: "0.1"
updated: 2026-07-16
---

# Handoff pentru unificarea repository-ului EZPLAY

## Rolul documentului

Acest document transferă contextul necesar unui task Codex nou, pornit din repository-ul tehnic Next.js, pentru unificarea controlată a documentației, codului și regulilor de colaborare EZPLAY într-un singur repository.

Documentul trebuie citit integral înaintea oricărei mutări, ștergeri sau rescrieri.

El consemnează:

- situația verificată a celor două repository-uri;
- decizia de unificare;
- motivele deciziei;
- structura finală urmărită;
- harta preliminară a migrării;
- responsabilitățile utilizatorului și agenților AI;
- regulile de lucru după unificare;
- fazele, verificările și condițiile de oprire ale migrării;
- instrucțiunile pentru primul turn al noului task Codex.

Conversația în care a fost pregătit acest handoff este atelierul în care s-au clarificat ideile. Acest document este memoria transferabilă. Noul agent nu trebuie să presupună că are acces la conversația originală.

## Mesajul cu care se pornește noul task Codex

Utilizatorul va porni un proiect Codex din rădăcina repository-ului Next.js și va atașa acest fișier.

Mesaj recomandat:

> Citește integral fișierul `repository-unification-handoff.md`. Confirmă mai întâi repository-ul, branch-ul, remote-ul, starea Git și existența tuturor căilor menționate. Execută numai Faza 0 — auditul și harta exactă de migrare. Nu muta și nu șterge încă fișiere. Compară rezultatul auditului cu handoff-ul, raportează orice diferență și cere aprobarea hărții finale înainte de Faza 1.

## Decizia de principiu

EZPLAY va folosi un singur repository activ pentru:

- documentația de produs;
- strategie și poziționare;
- programul educațional;
- copywriting;
- UX/UI;
- cercetare;
- licențiere și proveniență;
- documentație tehnică;
- codul Next.js;
- Supabase;
- activele aplicației;
- implementare și deployment.

Repository-ul tehnic existent devine repository-ul canonic unificat:

```text
https://github.com/liviu1972-ctrl/EZplay
```

Repository-ul de documentație:

```text
https://github.com/enterstef/ezplay
```

va rămâne disponibil ca istoric și backup până când migrarea este verificată complet. El va fi arhivat numai după o confirmare explicită separată.

## De ce se face unificarea

Separarea inițială a urmărit să protejeze documentația de produs de prototipul tehnic. În practica utilizatorului, separarea a produs însă un cost operațional prea mare:

- strategia era dezvoltată cu ChatGPT/Codex într-un repository;
- planificarea era făcută cu Claude;
- implementarea era făcută cu Gemini într-un alt repository;
- pentru a oferi context implementării a fost copiat întregul repository de documentație în `docs/new site`;
- deciziile apărute în implementare riscau să rămână numai în conversația agentului sau în cod;
- utilizatorul trebuia să sincronizeze manual două sisteme și două istorii.

Pentru modul real de lucru EZPLAY, distincția profesională trebuie realizată prin foldere, ierarhia surselor, roluri și reguli `AGENTS.md`, nu prin două repository-uri active.

Principiul rezultat este:

> **Un singur repository. O singură memorie. Surse canonice diferite pentru tipuri diferite de adevăr.**

## Utilizatorul și agenții

Utilizatorul este Product Owner și decidentul final.

Agenții AI sunt colaboratori cu responsabilități diferite. Niciun agent nu deține un teritoriu personal și niciun fișier nu devine autoritate doar pentru că a fost creat de un anumit model.

Rolurile sunt definite prin natura muncii, nu prin numele furnizorului:

### Product și editorial

Responsabilități:

- definiția și granițele EZPLAY;
- poziționare și voce;
- strategie;
- program educațional;
- metode;
- copywriting;
- UX și arhitectură informațională;
- priorități și decizii de produs;
- reconcilierea intenției cu implementarea.

În fluxul actual, acest rol este îndeplinit în principal de utilizator împreună cu ChatGPT/Codex.

### Planificare și arhitectură

Responsabilități:

- inspectarea documentației și codului;
- planuri de implementare;
- dependențe, etape și riscuri;
- criterii de acceptare;
- review de arhitectură.

În fluxul actual, Claude este folosit frecvent pentru acest rol.

### Implementare

Responsabilități:

- cod;
- componente;
- integrare;
- teste;
- build;
- remedierea problemelor;
- actualizarea documentației tehnice;
- propuneri de îmbunătățire UX/UI rezultate din implementare.

În fluxul actual, Gemini este folosit frecvent pentru acest rol.

### Review și QA

Responsabilități:

- compararea site-ului cu documentația;
- verificarea afirmațiilor publice;
- verificarea rutelor, stărilor și parcursurilor;
- accesibilitate și responsive;
- regresii pentru autentificare, Supabase și Deckbuilder;
- clasificarea diferențelor între intenție și implementare.

Oricare dintre agenți poate îndeplini acest rol dacă primește taskul și respectă sursele canonice.

## Situația locală verificată la 2026-07-16

### Repository-ul de documentație

Locație locală verificată:

```text
C:\ChatGPT projects\EZPLAY
```

Remote:

```text
origin  https://github.com/enterstef/ezplay.git
```

Branch principal:

```text
main
```

Commitul în care a fost publicat pachetul complet pentru website:

```text
42ab337a3caa3a0c93d042226ad98f0bcf0598ed
docs: prepare ezplay.org product content and ux package
```

Commitul conține 38 de fișiere noi sau actualizate pentru:

- direcția de produs;
- blueprint;
- copywriting pentru 14 pagini;
- UX/UI;
- continuitatea platformei;
- cercetare;
- harta dovezilor;
- registre de drepturi și permisiuni.

La ultimul audit local existau două elemente neincluse în acest commit:

- `agents/gemini/` — fișier local neversionat, care nu trebuie tratat ca sursă canonică;
- `prompts/README.md` — raportat local ca modificat din cauza stării/line endings, fără diferență reală de conținut față de `HEAD`.

Migrarea trebuie să pornească din conținutul versionat și verificat, nu din fișiere locale neversionate doar pentru că există pe disc.

### Repository-ul tehnic Next.js

Locație locală verificată:

```text
C:\Antigravity projects\EZplay
```

Utilizatorul poate folosi în conversație o denumire ușor diferită a folderului. Agentul trebuie să confirme calea reală prin `Resolve-Path` și să nu presupună.

Remote:

```text
origin  https://github.com/liviu1972-ctrl/EZplay.git
```

Starea verificată:

```text
branch local: dev
HEAD: 9ac8a88b5b5224da250c7ef4ad7b2bbc6912c87d
origin/dev: 9ac8a88
origin/main: 9ac8a88
main local: 9ac8a88
working tree: curat la momentul auditului
```

Commitul implementării:

```text
9ac8a88 feat: complete ezplay.org public website transformation and redesign
```

Acest commit a fost foarte mare:

- 147 de fișiere modificate;
- aproximativ 21.165 de inserări;
- aproximativ 2.357 de ștergeri;
- documentația copiată și implementarea au fost incluse împreună.

Repository-ul conține:

- Next.js 16;
- `src/app/` cu route groups;
- Supabase Auth, Database și Storage;
- Deckbuilder-ul în `src/features/ezplay/`;
- documentație tehnică existentă în `docs/technical/`;
- documentație de aplicație în `docs/application/`;
- documentație istorică/tehnică a jocului în `docs/ezplay/`;
- copia repository-ului de documentație în `docs/new site/`.

### Deployment verificat

URL:

```text
https://ezplay-seven.vercel.app/
```

Titlu observat:

```text
EZPLAY — Educație antreprenorială prin experiență
```

Versiune observată:

```text
1.0.1.260716.0804
```

Implementarea publică este o primă versiune funcțională și trebuie tratată ca bază pentru audit și rafinare, nu ca nouă sursă automată de adevăr pentru produs.

### Verificarea copiei `docs/new site`

La 2026-07-16 a fost comparat conținutul tuturor fișierelor din:

```text
C:\ChatGPT projects\EZPLAY
```

cu:

```text
C:\Antigravity projects\EZplay\docs\new site
```

după normalizarea line endings.

Rezultatul auditului:

```text
numai în repository-ul canonic: 0 fișiere
numai în copia new site:        0 fișiere
conținut diferit:               0 fișiere
```

Aceasta este o fotografie a situației din ziua auditului, nu o garanție permanentă. Noul task trebuie să repete comparația înainte de migrare.

## Decizii deja confirmate pentru modul de lucru

### Repository unic

Repository-ul Next.js devine repository-ul activ unic după migrare.

### Folder local unic

După migrare, toate taskurile noi pornesc din rădăcina repository-ului Next.js, nu din `docs/` și nu dintr-o copie separată.

Motivul:

- agentul trebuie să poată vedea atât intenția, cât și implementarea;
- accesul la întregul repository nu înseamnă permisiune de modificare a întregului repository;
- taskul și `AGENTS.md` definesc ce poate fi schimbat;
- pornirea din `docs/` ar recrea orbirea față de `src/`.

Principiul este:

> **Vezi întregul proiect. Modifică numai ce autorizează taskul.**

### Româna este prioritatea curentă

Pentru etapa actuală:

- limba de lucru și validare este româna;
- traducerea completă în engleză se face ulterior;
- selectorul RO/EN existent nu este subiectul migrării;
- inconsistențele de traducere nu blochează unificarea repository-ului;
- nu se investește acum timp în auditul copy-ului englez.

### Activele vizuale AI nu sunt prioritate pentru v1

Prima versiune nu depinde de Nano Banana, o bibliotecă de randări 3D sau o ședință foto nouă.

Se folosesc:

- layout;
- tipografie;
- culoare;
- componente React/SVG/CSS;
- logo-ul real;
- activele reale existente;
- imaginile reale ale cărților unde au rol clar.

### Utilizatorul decide produsul

Un agent poate propune, dar nu transformă singur o alegere de implementare într-o decizie canonică despre:

- poziționare;
- copy;
- sitemap;
- navigare majoră;
- publicuri;
- ofertă;
- CTA-uri;
- accesul minorilor;
- rolul jocului;
- afirmații publice;
- roadmap.

## Sursele canonice după unificare

Un singur repository nu înseamnă un singur fișier care răspunde la toate întrebările.

| Întrebare | Sursa principală după migrare |
|---|---|
| Ce este EZPLAY? | `docs/context/what-is-ezplay.md` |
| Poziționare și voce | `docs/context/brand-positioning.md` |
| Viziune viitoare | `docs/context/ezplay-vision.md` |
| Formule și terminologie economică | `docs/methods/economic-model.md` |
| Produse și program educațional | `docs/products/` |
| Site, copy și UX/UI | `docs/platform/website/` |
| Cercetare și surse | `docs/research/` |
| Starea reală și prioritățile | `docs/roadmap/` |
| Decizii și motive | `docs/decisions/` |
| Drepturi și permisiuni | `docs/licensing/` |
| Arhitectura tehnică descrisă | `docs/technical/` |
| Comportamentul efectiv al aplicației | `src/`, `supabase/`, teste |
| Active runtime | `public/`, Supabase Storage |
| Active sursă | `assets/` |
| Date versionate | `data/` |
| Deployment public | commitul `main` publicat de Vercel |

Dacă documentația tehnică și codul diferă, codul descrie realitatea curentă, iar documentația tehnică trebuie actualizată. Dacă implementarea și o decizie de produs diferă, agentul nu presupune că implementarea a anulat decizia: conflictul se reconciliază explicit.

## Structura finală urmărită

Structura exactă poate fi rafinată în Faza 0 dacă auditul descoperă conflicte reale, dar rezultatul trebuie să respecte această arhitectură:

```text
EZplay/
├── AGENTS.md
├── GEMINI.md
├── README.md
├── package.json
├── pnpm-lock.yaml
│
├── src/
├── public/
├── supabase/
├── scripts/
│
├── docs/
│   ├── README.md
│   ├── AGENTS.md
│   ├── context/
│   ├── methods/
│   ├── products/
│   ├── platform/
│   ├── community/
│   ├── research/
│   ├── roadmap/
│   ├── decisions/
│   ├── licensing/
│   ├── technical/
│   └── application/
│
├── prompts/
├── agents/
├── assets/
├── data/
└── src/features/ezplay/AGENTS.md
```

Observații:

- `docs/technical/`, `docs/application/` și `docs/ezplay/` existente nu se șterg sau suprascriu;
- rolul final al `docs/ezplay/` se clarifică prin inventar;
- `public/` păstrează activele runtime ale aplicației;
- `assets/` păstrează active sursă, nu duplicate arbitrare ale `public/` sau Supabase Storage;
- `data/` păstrează date structurate versionate, nu exporturi cu secrete sau date personale;
- `docs/new site/` nu există în structura finală.

## Harta preliminară de migrare

Harta trebuie confirmată prin audit înainte de executare.

| Sursa din `docs/new site/` | Destinația propusă | Regula |
|---|---|---|
| `docs/context/` | `docs/context/` | mutare directă după comparație |
| `docs/methods/` | `docs/methods/` | mutare directă după comparație |
| `docs/products/` | `docs/products/` | mutare directă; păstrează terminologia |
| `docs/platform/` | `docs/platform/` | mutare directă; include pachetul website |
| `docs/community/` | `docs/community/` | mutare directă după audit |
| `docs/roadmap/` | `docs/roadmap/` | mutare și reconciliere cu realitatea implementată |
| `docs/decisions/` | `docs/decisions/` | mutare; include acest handoff și decizia finală |
| `research/` | `docs/research/` | mutare cu actualizarea linkurilor |
| `licensing/` | `docs/licensing/` | mutare cu actualizarea linkurilor |
| `prompts/` | `prompts/` | mutare la rădăcină, fără conversații brute |
| `agents/` | `agents/` | migrează numai fișiere utile și neutre ca rol |
| `assets/` | `assets/` | migrează structura numai după inventarul activelor reale |
| `data/` | `data/` | migrează structura; fără secrete/date personale |
| `apps/` | de reconciliat cu `docs/application/` | nu crea o arhitectură paralelă față de `src/` |
| `README.md` | merge în root și `docs/README.md` | nu suprascrie README-ul aplicației |
| `AGENTS.md` | merge în noul `/AGENTS.md` | nu copia orbește peste regulile tehnice |
| `.gitignore` | root `.gitignore` | compară și unește numai regulile necesare |
| `.gitattributes` | root `.gitattributes` | compară înainte de merge |

### Fișiere care nu se migrează automat

- `agents/gemini/camera_lui_gemini.md` nu devine instrucțiune globală și nu creează un teritoriu exclusiv pentru un model;
- fișiere locale neversionate nu se migrează numai pentru că există;
- fișiere `.env*`, chei, token-uri sau exporturi cu date personale nu se copiază;
- `.next/`, `node_modules/`, cache-uri și build artifacts nu intră în migrare;
- documentele duplicate nu se păstrează în două locații „ca rezervă”. Git și repository-ul arhivat reprezintă rezerva.

## Arhitectura regulilor pentru agenți

Nu se creează un sistem separat de reguli pentru fiecare furnizor AI.

### `/AGENTS.md`

Trebuie să conțină regulile globale:

- utilizatorul este decidentul final;
- ordinea surselor canonice;
- diferența dintre intenție și realitate;
- terminologia obligatorie;
- protecția autentificării, datelor, Supabase și Deckbuilder-ului;
- regulile pentru minori;
- regulile Git;
- obligația de audit înainte de reorganizare;
- obligația de a raporta ce s-a schimbat și ce a fost verificat;
- regula „vezi întregul proiect, modifică numai ce autorizează taskul”.

### `/docs/AGENTS.md`

Trebuie să conțină regulile pentru documentație și produs:

- limba română;
- stările `Draft`, `Working`, `Current`;
- front matter;
- ierarhia documentelor canonice;
- fără afirmații inventate;
- fără promovarea ideilor viitoare ca funcții existente;
- verificarea codului înainte de a descrie o funcție ca implementată;
- deciziile importante se scriu în `docs/decisions/`;
- copy-ul nu se schimbă unilateral pentru a încăpea într-o componentă.

### `/src/AGENTS.md`

Trebuie să conțină regulile pentru implementare:

- citește documentele relevante înainte de lucru;
- nu inventa copy, oferte, rezultate sau funcții;
- nu modifica decizii de produs fără aprobare;
- raportează conflictele dintre documentație și cod;
- actualizează documentația tehnică odată cu arhitectura;
- păstrează componentele client la limita interacțiunii;
- rulează verificările proporționale cu riscul;
- nu expune secrete și nu slăbi RLS.

### `/src/features/ezplay/AGENTS.md`

Trebuie să protejeze explicit:

- game engine;
- regulile și formulele economice;
- datele și imaginile cărților;
- salvările;
- autentificarea necesară jocului;
- scenariile de regresie;
- interdicția rescrierilor cosmetice fără scop de produs.

### `GEMINI.md`, `.cursorrules`, `.clinerules`

Acestea trebuie să fie scurte și să trimită la `AGENTS.md` și la instrucțiunile locale relevante. Nu trebuie să redefinească proiectul sau să creeze reguli concurente.

## Fluxul de lucru după unificare

### Principiul general

```text
obiectiv stabilit de utilizator
→ clarificare și documentare
→ plan, dacă schimbarea este amplă
→ implementare etapizată
→ preview local/Vercel
→ reconciliere cod–site–documentație
→ aprobare
→ main
```

### Ce poate decide direct agentul de implementare

- împărțirea în componente;
- nume interne de funcții și fișiere;
- reutilizarea unui hook;
- rezolvarea unei erori clare;
- detalii CSS în limitele sistemului aprobat;
- optimizări fără schimbarea experienței;
- actualizări ale documentației tehnice care descriu fidel codul.

### Ce trebuie propus și aprobat

- schimbarea sitemap-ului;
- eliminarea sau adăugarea unei pagini publice;
- schimbarea destinației unui CTA important;
- schimbarea ordinii mesajelor;
- copy nou sau modificarea promisiunii;
- publicuri noi;
- ofertă, preț sau calendar;
- accesul minorilor;
- deschiderea înregistrării;
- rolul jocului digital;
- schimbarea terminologiei canonice;
- o funcție viitoare prezentată ca disponibilă.

### Raportul obligatoriu al fiecărui task de implementare

Agentul trebuie să încheie cu:

1. ce a implementat;
2. fișierele schimbate;
3. verificările rulate;
4. rezultatul verificărilor;
5. diferențele față de documentație;
6. deciziile noi propuse;
7. riscurile sau lucrurile rămase neclare;
8. commitul și URL-ul preview-ului, dacă există.

## Navigarea: intenție, implementare și graf generat

În conversația de implementare, Gemini a propus o diagramă numită „Navigation Schema”. Aceasta a inclus o parte dintre traseele dintre:

- homepage;
- `/experiences`;
- `/program`;
- `/how-we-learn`;
- `/for/young-people`;
- `/for/organizations`;
- `/research`;
- `/tools`;
- `/platform`;
- `/ezplay`;
- `/contact`.

Diagrama nu a fost găsită ca fișier în repository la auditul din 2026-07-16. Ea trebuie tratată ca propunere de parcurs CTA, nu ca sitemap canonic.

Conținea și semnale că nu reprezintă întreaga arhitectură:

- nu includea toate cele 14 rute;
- amesteca header-ul global cu traseele de conversie;
- conținea un nod accidental `class`;
- trimitea tânărul spre platformă și joc înainte de închiderea politicii de conturi.

După unificare se păstrează două artefacte distincte:

1. navigarea intenționată și parcursurile aprobate — în `docs/platform/website/ux-ui/navigation-system.md` sau într-o decizie asociată;
2. graful efectiv al rutelor și linkurilor — generat sau auditat din cod, în documentația tehnică, fără întreținere manuală duplicată.

## Git și branch-uri

### Regula urmărită

- `main` — versiunea acceptată și publicabilă;
- `dev` — integrarea și verificarea curentă;
- branch separat pentru migrare și schimbări majore.

Pentru migrare, nume recomandat:

```text
codex/unify-repository
```

Migrarea nu se execută direct pe `main`.

În prezent, `main` și `dev` indică același commit în repository-ul tehnic. Aceasta este o bază bună pentru pornirea branch-ului de migrare, dar agentul trebuie să verifice din nou.

### Lucrul cu mai mulți agenți

Pentru fluxul curent, agenții lucrează secvențial în același working tree:

```text
git status curat
→ agentul lucrează
→ verificare
→ commit
→ următorul agent
```

Doi agenți nu modifică simultan același working tree. Git worktrees se introduc numai dacă apare o nevoie reală de paralelism.

## Planul migrării

### Faza 0 — audit, fără mutări

Obiectiv: transformarea hărții preliminare într-o hartă exactă și aprobabilă.

Agentul:

1. confirmă calea repository-ului Next.js;
2. rulează `git status --short --branch`;
3. verifică `git remote -v`;
4. verifică `main`, `dev` și upstream-urile;
5. confirmă commiturile menționate în handoff;
6. inventariază complet `docs/new site/`;
7. inventariază `docs/technical/`, `docs/application/`, `docs/ezplay/` și fișierele aflate direct în `docs/`;
8. inventariază README-urile, `AGENTS.md`, `GEMINI.md`, `.cursorrules`, `.clinerules`, `.gitignore` și `.gitattributes`;
9. compară din nou copia `docs/new site` cu repository-ul canonic sau cu ultimul commit publicat al acestuia;
10. identifică toate conflictele de cale și conținut;
11. propune destinația exactă pentru fiecare grup de fișiere;
12. identifică linkurile relative care trebuie rescrise;
13. confirmă backup-ul prin Git și remote;
14. prezintă harta și se oprește pentru aprobare.

În Faza 0 nu se mută, șterge, redenumește sau rescrie în masă.

### Faza 1 — fundația regulilor

După aprobarea hărții:

1. creează branch-ul de migrare;
2. construiește noul `AGENTS.md` global;
3. construiește `docs/AGENTS.md`;
4. construiește `src/AGENTS.md`;
5. construiește `src/features/ezplay/AGENTS.md`;
6. aliniază `GEMINI.md`, `.cursorrules` și `.clinerules`;
7. verifică dacă noile reguli nu se contrazic;
8. face un checkpoint verificabil înaintea mutării conținutului.

### Faza 2 — migrarea documentației

1. integrează documentele canonice în `docs/`;
2. păstrează și reconciliază documentația tehnică existentă;
3. mută cercetarea și licențierea în destinațiile aprobate;
4. integrează prompturile și regulile de agent utile;
5. nu suprascrie fișiere cu același nume fără comparație;
6. actualizează toate linkurile relative;
7. actualizează README-urile de navigare;
8. adaugă o decizie finală despre unificare;
9. adaugă o pagină scurtă despre starea implementării curente și commitul auditat.

### Faza 3 — eliminarea copiei

`docs/new site/` se elimină numai după ce:

- fiecare fișier relevant are destinație confirmată;
- comparația arată că nu lipsește conținut;
- toate linkurile noi sunt valide;
- sursa canonică este declarată în noul `AGENTS.md`;
- Git păstrează commitul care conține copia inițială;
- utilizatorul aprobă explicit eliminarea.

Nu se folosește o ștergere recursivă înainte de verificarea căii absolute și a conținutului.

### Faza 4 — validare

Verificări minime:

- inventar fișiere înainte/după;
- nicio definiție canonică duplicată;
- nicio referință activă la `docs/new site`;
- linkuri Markdown relative valide;
- front matter valid pentru documentele importante;
- numai stările `Draft`, `Working`, `Current`;
- `git diff --check`;
- scanare pentru secrete;
- `pnpm lint`;
- `pnpm build`;
- testele existente;
- scenariile de regresie pentru login email;
- Google OAuth și callback;
- sesiune și refresh;
- încărcarea cărților și imaginilor;
- accesul la `/ezplay`;
- rularea Deckbuilder-ului;
- rutele publice principale;
- versiunea afișată;
- verificare locală și preview Vercel.

Agentul nu declară un test trecut dacă nu l-a rulat.

### Faza 5 — publicare și arhivare

1. inspectează diferențele finale;
2. adaugă numai fișierele migrării;
3. creează un commit clar;
4. publică mai întâi branch-ul de migrare sau `dev`, conform aprobării utilizatorului;
5. verifică preview-ul Vercel;
6. după acceptare, integrează în `main`;
7. verifică `origin/main`;
8. actualizează vechiul repository de documentație cu un README de arhivare și destinația canonică nouă;
9. arhivează repository-ul vechi numai cu aprobarea explicită a utilizatorului;
10. păstrează temporar folderul local vechi până la confirmarea că nimic nu lipsește.

## Condiții de oprire și confirmare

Agentul se oprește și cere direcție dacă:

- repository-ul sau commiturile nu corespund handoff-ului;
- există modificări locale necomise în oricare dintre surse;
- copia `docs/new site` diferă de repository-ul canonic;
- o destinație ar suprascrie documentație tehnică existentă;
- un fișier poate conține secrete sau date personale;
- o mutare ar pierde istoricul necesar în mod neprevăzut;
- trebuie decisă o schimbare de definiție, scope, terminologie, licențiere sau formulă;
- eliminarea `docs/new site` nu poate fi demonstrată ca sigură;
- lint, build sau regresiile funcționale eșuează din cauza migrării.

## Ce nu face migrarea

Migrarea repository-ului nu este autorizare pentru:

- redesign suplimentar;
- schimbarea sitemap-ului;
- corectarea tuturor paginilor;
- traducerea completă în engleză;
- schimbarea autentificării;
- deschiderea înregistrării publice;
- modificarea schemelor Supabase;
- rescrierea Deckbuilder-ului;
- generarea activelor vizuale;
- reorganizarea codului pentru eleganță;
- rezolvarea tuturor ideilor sau deciziilor deschise.

Acestea devin taskuri separate după unificare.

## Rezultatul așteptat

La final:

- utilizatorul deschide un singur folder local;
- toate modelele AI primesc același context;
- documentația și codul sunt versionate împreună;
- nu mai există `docs/new site`;
- `AGENTS.md` controlează responsabilitățile, nu „camere” separate pentru modele;
- deciziile apărute în implementare sunt propuneri până la reconciliere;
- implementarea poate fi verificată direct față de documentație;
- `main` reprezintă produsul acceptat;
- `dev` reprezintă integrarea curentă;
- vechiul repository rămâne istoric, nu a doua sursă activă.

## Primul răspuns așteptat de la noul agent

După citirea documentului și auditul fără mutări, noul agent trebuie să răspundă cu:

1. calea și remote-ul confirmate;
2. branch-ul și commitul confirmate;
3. starea working tree;
4. diferențele față de situația descrisă aici;
5. inventarul conflictelor de structură;
6. harta exactă sursă → destinație;
7. fișierele care necesită merge manual;
8. fișierele care nu trebuie migrate;
9. verificările pe care le va rula;
10. riscurile;
11. planul etapizat final;
12. cererea explicită de aprobare înaintea mutărilor și ștergerilor.

Până la acea aprobare, taskul rămâne read-only.

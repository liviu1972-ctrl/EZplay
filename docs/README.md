# Documentația EZPLAY

Acest fișier este punctul de intrare în documentație. Nu este necesară citirea integrală a directorului `docs/` pentru fiecare task.

Comportamentul efectiv al aplicației se verifică în `src/`, `supabase/` și prin verificările tehnice rulate. Documentația descrie intenția, deciziile, cercetarea și starea cunoscută a proiectului.

## Începe aici

1. Citește `/AGENTS.md` și `docs/AGENTS.md`.
2. Citește taskul și documentul indicat din [`work/active/`](work/active/), dacă există.
3. Consultă numai [deciziile active](decisions/active/) și sursele canonice relevante subiectului.
4. Verifică implementarea direct în cod când taskul depinde de comportamentul actual.
5. Consultă arhiva numai dacă istoricul este necesar.

## Surse canonice curente

- [`context/`](context/) — definiție, poziționare și viziune;
- [`methods/`](methods/) — modele și formule comune;
- [`products/`](products/) — produse, jocuri și program educațional;
- [`platform/`](platform/) — ezplay.org, copy și UX/UI;
- [`community/`](community/) — participare și guvernanță;
- [`research/`](research/) — surse, analiză și dovezi;
- [`roadmap/`](roadmap/) — starea curentă și prioritățile;
- [`licensing/`](licensing/) — proveniență, drepturi și permisiuni.

Documentația tehnică a implementării Next.js/Supabase nu are încă un director canonic curent. Reconstruirea ei este urmărită în [`work/active/technical-documentation-rebuild.md`](work/active/technical-documentation-rebuild.md); până la reconcilierea acelui task, comportamentul efectiv se verifică în cod și prin verificările tehnice rulate.

## Decizii și lucru curent

- [`decisions/active/`](decisions/active/) — decizii care guvernează proiectul acum;
- [`decisions/drafts/`](decisions/drafts/) — propuneri încă neaprobate sau netestate;
- [`work/active/`](work/active/) — documente de lucru pentru funcționalități și inițiative în desfășurare;
- [`decisions/README.md`](decisions/README.md) și [`work/README.md`](work/README.md) — indexurile și regulile locale.

## Istoric

- [`decisions/archive/`](decisions/archive/) — decizii, audituri și handoff-uri care nu mai guvernează munca prezentă;
- [`work/archive/`](work/archive/) — documente de lucru închise după reconciliere;
- [`archive/legacy-application/`](archive/legacy-application/) — documentație veche despre aplicație, joc și arhitectură tehnică.

Arhiva nu se citește implicit și nu este dovadă a comportamentului curent.

## Materiale inspectate, încă nevalidate

- [`regulament-quick-start-EZPLAY.md`](regulament-quick-start-EZPLAY.md) — candidat `Draft` pentru Quick Start-ul Deckbuilder-ului; regulile și valorile nu au fost încă reconciliate cu jocul fizic și implementarea digitală;
- [`cum se joaca.jpg`](<cum se joaca.jpg>) — imagine de referință a unei configurații marcate `EZ-CORE v3.0`; include și afirmații de licențiere care nu sunt confirmate de registrele actuale.

Fișierele rămân temporar la rădăcina `docs/` până la verificarea versiunii, provenienței și rolului. Nu sunt surse canonice și nu trebuie publicate automat.

## Când se creează un document nou

O conversație nu produce automat un fișier. Creează un document nou numai când rezultatul trebuie reutilizat ca:

- sursă canonică;
- decizie durabilă;
- document de lucru pentru o funcționalitate sau inițiativă;
- dovadă, cercetare ori registru care trebuie păstrat.

Clarificările mici actualizează documentul canonic existent. Un document de lucru se creează per funcționalitate sau rezultat coerent, nu per idee, mesaj ori modificare minoră.

## Status și lifecycle

- `status` descrie maturitatea conținutului: `Draft`, `Working`, `Current`;
- `lifecycle` descrie rolul temporal al deciziilor, handoff-urilor și documentelor de lucru importante: `active`, `completed`, `superseded`, `archived`.

Modelul complet este definit în [`decisions/active/documentation-working-method.md`](decisions/active/documentation-working-method.md).

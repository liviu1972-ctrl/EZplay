---
status: Current
version: "1.4"
updated: 2026-07-18
lifecycle: active
canonical_for:
  - Technical implementation plan for correcting and expanding Curriculum Explorer
---

# Plan tehnic de implementare: Curriculum Explorer

Acest document descrie arhitectura și pașii exacți pentru corectarea pilotului actual și extinderea sa într-un produs conform cu specificația UX/UI și cu sursele canonice de produs. Acest plan încorporează deciziile finale din revizuirile de produs, separând clar sursele Markdown de afișarea publică.

## 1. Arhitectura tehnică de prelucrare a conținutului

### Procesare Server-Only la Build Time
Transformarea Markdown-ului în date consumabile de aplicație se face strict la **build time** într-un modul **server-only**. Nu există citire la runtime a folderului `docs/` și nici revalidare statică (ISR). Orice schimbare în structura curriculară necesită un rebuild al aplicației.

### Delimitarea Responsabilităților: `content-engine.ts` vs `parser.ts`
- `src/lib/curriculum/parser.ts`: Modul low-level de parsare care ia un string Markdown și extrage front matter-ul, blocurile și titlurile. Acesta folosește expresii regulate stricte pentru a izola conținutul vizat.
- `src/lib/curriculum/content-engine.ts`: Modul high-level care folosește parser-ul pe întreg inventarul din sistemul de fișiere, validează unicitatea identificatorilor, asamblează graful curricular global (matricea de Round-uri, Levels, Pillars), și emite raportul global de erori și avertismente.

### Comportamentul Fail-Fast și Oprirea Build-ului
Validarea se face pe întregul inventar de surse:
- `content-engine.ts` colectează toate erorile structurale într-un raport agregat.
- Dacă raportul conține cel puțin o eroare structurală (identificatori duplicați, lipsă ID/coordonate, coliziune a slugului canonic), se aruncă o eroare agregată care **oprește eșuat build-ul Next.js**. Nicio entitate structural invalidă nu este eliminată în tăcere dintr-un build reușit.
- Avertismentele de conținut (ex: lipsa `Întrebării antreprenoriale` în Faza Level 1) intră în raportul structurat de validare, dar nu opresc build-ul. Ele nu influențează eligibilitatea pentru generarea paginii detaliate a Round-ului, iar interfața gestionează secțiunile lipsă. Aceste constatări curriculare cunoscute sunt distincte de warning-urile tehnice ale build-ului, linter-ului sau runtime-ului.

## 2. Generarea Statică a Rutelor și Stările 404

Parametrii dinamici (Level, Pillar, Round, Mastery Lens) sunt pre-calculați folosind `generateStaticParams`.
- Rutele dinamice vor opri randarea pentru parametrii necunoscuți (`dynamicParams = false`).
- Parametrii invalizi direcționează nativ către starea 404 (`notFound()`).
- Slug-ul canonic al unui Round se obține determinist: lowercase, transformarea spațiilor și punctelor în cratime (ex: `FIN 1.2.1` devine `fin-1-2-1`).

### Pragul editorial și eligibilitatea rutelor detaliate
Cele 191 de Round-uri identificate aparțin inventarului curricular validat. Orice Round din inventar este listat în catalogul agregat cu statusul fallback `Hartă curriculară`.

Totuși, **pentru generarea paginii detaliate a unui Round** (`/rounds/[slug]`), se aplică un singur prag editorial fix și clar auditat:
- **Prezența `Titlului pentru participant` și a `Descrierii pentru participant`**.
Pentru un Round care nu îndeplinește acest prag, ruta respectivă nu este generată. O accesare directă a slug-ului respectiv va returna 404. Nu se creează layout-uri minimale concurente pentru Round-urile neeligibile.

Toate cele 191 de Round-uri trebuie auditate explicit față de acest prag înainte de generarea rutelor.

## 3. Allowlist-ul per Tip de Pagină și Excluderea Notelor Interne

Se exclud toate notele de lucru, instrucțiunile de redactare, paragrafele libere nemapate și secțiunile interne de audit din `docs/`. Allowlist-urile de proiecție sunt împărțite pe rute și indică secțiunile aprobate din surse:

- **Founder Round (`/rounds/[slug]`):** Extrage din fișierele de Nivel (ex: `finance/level-1.md`) și din `docs/products/educational-program/curriculum/mastery-rounds.md` strict componentele: ID, Titlu participant, Descriere participant, Titlu pedagogic, Descriere pedagogică, Întrebare, Competență, Prerechizite, Continuitate.
- **Intersecție Level × Business Pillar (`/levels/[level]/pillars/[pillar]`):** Extrage din fișierul specific (`ex: finance/level-1.md`) strict overview-ul general (descrierea nivelului pe respectivul pilon).
- **Overview de Level (`/levels/[level]`):** Reunește dinamic descrierile agregatelor extrase din cele 5 fișiere aferente pilonilor pe acel nivel.
- **Overview de Pillar (`/pillars/[pillar]`):** Proiectat din fișierele dedicate spiralelor: `docs/products/educational-program/curriculum/finance-spiral.md` (și similare pentru ceilalți 4 piloni), extrăgând exclusiv meta-definiția aprobată a pilonului.
- **Mastery Overview (`/mastery`):** Extrage strict antetul și conceptele generale din `docs/products/educational-program/curriculum/mastery.md` și afișează indexul de Round-uri de Mastery.
- **Mastery Lens (`/mastery/lenses/[pillar]`):** Extrage strict secțiunile `Standardul terminal` și `Corpul coerent de dovezi [Pillar]` din fișierele dedicate (ex: `docs/products/educational-program/curriculum/mastery/finance.md`).
- **Glosar (`/glossary`):** Dicționar selectiv extras prin parsarea explicită a surselor reale aprobate: `docs/methods/economic-model.md` (Dicționarul comun) și `docs/products/educational-program/curriculum/architecture.md` (conceptele de Founder Round, Founder Loop).

## 4. Contractul Exact de Navigare și Integrare Shell

### Navigare Principală (Site vs Curriculum)
- **`CurriculumHeader` (`src/components/curriculum/CurriculumHeader.tsx`):** Componentă nouă și izolată, care reutilizează primitivele și token-urile aplicabile din `src/components/layout/SiteHeader.tsx`. Acțiuni permise: logo → `/`, `Programul EZPLAY` → `/program`, controlul de limbă și un control `Meniu` care oferă acces la navigarea globală (dropdown/drawer) fără afișarea simultană a `ExplorerRail`.
- **Explorer Rail (`src/components/layout/ExplorerRail.tsx`):** În afara Curriculumului, afișează opțiunile `Prezentare`, `Harta programului`, `Experiența introductivă`.

### Shell-ul Curriculumului
- **Atlas (`src/components/curriculum/AtlasSidebar.tsx`):** Partea stângă. Acțiuni: `Despre program` → `/program`, apoi macro-secțiunile curriculumului: Overview, Niveluri, Business Pillars, Founder Rounds, Mastery, Harta conectată și Glosar.
- **Spirală (`src/components/curriculum/SpiralSidebar.tsx`):** Partea dreaptă. Păstrează același pilon curent la navigarea de la Level 1 la 5 și către lentila Mastery. De asemenea, păstrează același Level atunci când navighezi lateral între piloni.
- **Mobil (`src/components/curriculum/CurriculumMobileControls.tsx`):** Acces separat inteligent la Atlas și la Spirală/coordonata contextuală, plus Cuprins Local (TOC) independent pentru paginile lungi, fără blocarea ferestrei principale cu tot meniul.
- Toate rutele beneficiază de stări active semantice și arhitectură fluidă de breadcrumbs.

### Integrarea cu Site-ul Principal
- Adăugăm CTA explicit "Explorează harta programului" pe `/program` inserat în (sau lângă) `src/components/program/ProgramProgression.tsx` apelat în `src/app/(platform)/program/page.tsx`.
- Folosim strict legături editoriale în `src/app/(platform)/how-we-learn/page.tsx`, `src/app/(platform)/research/page.tsx`, `src/app/(platform)/for/organizations/page.tsx`.
- Referința "Harta programului" se adaugă în `src/components/layout/SiteFooter.tsx`.

### Harta Conectată (`/map/page.tsx`)
O schemă interactivă accesibilă ce pornește de la cele **5 × 5 = 25 intersecții** (`Level × Business Pillar`). Fiecare celulă este un link direct (`<a>`) la ruta canonică, accesibil din tastatură.

## 5. Milestone-urile de Implementare pe Faze de Produs

Validarea structurală a tuturor celor 191 de entități are loc la început, în `T1` din Faza 1 de produs, dar nu forțează publicarea simultană a tuturor paginilor detaliate. Etapizarea este următoarea:

| Faza de Produs | Descriere & Activități Tehnice | Criterii de Finalizare Milestone |
|---|---|---|
| **Faza 1: Shell și Hartă** | T1. Setup `content-engine.ts`, validarea completă a celor 191 pentru erori structurale.<br>T2. Generarea shell-ului (`CurriculumHeader`, Atlas, Spirală, Mobil).<br>T3. Harta conectată (25 intersecții) și navigarea Level × Pillar. | Shell stabil pe toate ecranele, contractul UI (`CurriculumHeader`, Meniu) respectat. Validarea raportează curat inventarul 191. Legăturile cu site-ul global funcționale. |
| **Faza 2: Catalog controlat și subset fidel** | T4. Listarea catalogului (`/rounds`).<br>T5. Publicarea rutei detaliate fidele `/rounds/[slug]` DOAR pentru un subset controlat (ex. L1 Finance), pentru a asigura fidelity 1:1 față de Markdown. | Catalogul raportează `Hartă curriculară` (fallback corect). Paginile detaliate selectate respectă cu sfințenie rubricile din allowlist (ex: afișează corect doar Vânzări la FIN 1.2.1). |
| **Faza 3: Extindere la tot inventarul eligibil** | T6. Deschiderea rutelor detaliate (`/rounds/[slug]`) către toate restul de entități care respectă *pragul editorial* (Titlu + Descriere participant).<br>T7. Integrare Mastery completă. | Orice Round auditat ca eligibil se randează; cele neeligibile dau nativ 404. |

## 6. Contract QA la Baseline

Pentru aprobarea finală tehnică, se aplică un standard **Baseline strict**:
- Comanda `next build`, linter-ul și testele din proiect **nu emit erori**.
- Implementarea **nu introduce niciun avertisment nou**.
- Orice avertisment tehnic produs de modulele Curriculum Explorer trebuie rezolvat la sursă. Avertismentele curriculare cunoscute și documentate în matrice rămân în raportul structurat de validare și nu sunt raportate drept warning-uri ale framework-ului, linter-ului sau runtime-ului.
- Teste funcționale: exact 191 identificatori, 5 lentile distincte; 404 pentru param invalizi; round-trip pe ambele axe validat; HTML rezultat e curat (fără note de audit interne); a11y cu focus și skip link testate pe desktop/mobil; fără diacritice cu mojibake.

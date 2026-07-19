---
status: Current
version: "1.0"
updated: 2026-07-18
lifecycle: completed
canonical_for:
  - final review of the Curriculum Explorer Phase 3A technical delta plan
  - binding execution clarifications for Phase 3A implementation
---

# Review final — plan tehnic Curriculum Explorer Faza 3A

## Verdict

**Planul este aprobat pentru implementare, cu clarificările obligatorii din acest review.** Nu este necesară redactarea unei versiuni noi a planului și nu se redeschide arhitectura Fazelor 1–2.

Direcția principală este corectă: limita temporară de șapte pagini este eliminată, publicarea se derivă din eligibilitatea editorială, catalogul conduce către paginile canonice, iar Mastery primește tratament distinct.

## Clarificări obligatorii pentru execuție

### 1. Funcția de publicare trebuie să fie null-safe

`getRoundBySlug(slug)` poate întoarce `undefined`, în timp ce `isEligibleForDetailedPage` primește un `Round`. Implementarea nu apelează funcția de eligibilitate cu o valoare absentă.

Agentul poate păstra numele `isPublishedDetailedRound` sau poate simplifica API-ul, dar rezultatul trebuie să fie unic:

- un Round existent și eligibil este publicat;
- un slug necunoscut întoarce `false` și ruta răspunde 404;
- nu există allowlist manual paralel cu graful curricular.

### 2. Navigarea Mastery include nucleul celor 13 Round-uri

Contextul Mastery nu se limitează la un link către overview și la cele cinci Lentile. Handoff-ul cere și poziția în nucleul Mastery, deoarece ordinea `MST 01–13` este explicită în sursă.

Pentru un Round Mastery, navigarea contextuală trebuie să ofere:

- revenirea la overview-ul Mastery;
- identificarea poziției curente în secvența `MST 01–13` și o traversare lizibilă a nucleului, fără a încărca Atlasul global;
- acces către cele cinci Lentile Mastery;
- nicio reprezentare ca `Level 6` și niciun Business Pillar principal fictiv.

Implementarea poate extinde `SpiralContextLinks` sau poate introduce o proiecție contextuală mică și reutilizabilă. Nu dublează shell-ul și nu schimbă arhitectura navigației.

### 3. Parserul relațional propus nu intră în Faza 3A

Lotul 3 din plan, `parseCurriculumLinks`, este eliminat din scope-ul de implementare curent.

Sursele folosesc inclusiv intervale precum `MST 03–09`, `MST 02–04` și referințe descriptive la Level 5. Regexul propus ar putea lega numai primul identificator și ar lăsa o relație publică ambiguă. Handoff-ul permite legături numai când rezolvarea este sigură, dar nu le face obligatorii pentru publicarea curriculumului.

În Faza 3A:

- `Prerechizite` și `Continuitate` rămân text editorial randat prin mecanismul deja acceptat;
- nu se adaugă regex, parser nou sau transformare automată în linkuri;
- relațiile structurate pot fi proiectate ulterior, după un audit separat al tuturor formatelor.

Această limitare reduce riscul și păstrează obiectivul Product Owner-ului: toate paginile curriculare vizibile pe site.

### 4. Testele înlocuiesc explicit contractul temporar al Fazei 2

Testele existente care cer exact șapte pagini publicate și destinații fallback trebuie actualizate, nu păstrate alături de noile aserțiuni.

Suita Fazei 3A confirmă determinist cel puțin:

- `191` Round-uri publicate și `191` slug-uri unice;
- separarea `178` Level 1–5 + `13` Mastery;
- cele `5` Lentile rămân entități distincte și nu intră în totalul de 191;
- toate cele 191 de intrări din catalog conduc la `/program/curriculum/rounds/[slug]`;
- `fin-1-2-1` păstrează identitatea și conținutul acceptate;
- un Round cu rubrici opționale lipsă rămâne eligibil;
- un slug necunoscut nu este găsit și nu este publicabil.

Răspunsul HTTP 404 nu se dovedește numai printr-un test al helperului. Se confirmă după build prin artefact și/sau accesarea rutei necunoscute în aplicație.

## QA final obligatoriu

Eșantionul scurt din plan se extinde conform handoff-ului, fără verificarea manuală individuală a tuturor celor 191 de pagini:

- cel puțin un Round din fiecare Business Pillar;
- cel puțin un Round din fiecare Level 1–5;
- un Round Level 1 fără Întrebare și Continuitate;
- `FIN 1.2.1`, pentru non-regresia Fazei 2;
- un Round Mastery și traversarea nucleului `MST 01–13`;
- o Lentilă Mastery;
- catalogul pe desktop și mobil;
- o rută necunoscută care răspunde 404.

Build-ul trebuie să genereze exact 191 de pagini detaliate reale, nu doar 191 de chei care pot conține fallback 404. Un eșantion de artefacte HTML include conținutul canonic și nu expune Markdown brut, note interne ori starea `Working`.

## Fișiere și limite

Lista de fișiere din plan este estimativă, nu o obligație de a modifica fiecare fișier. `RoundsCatalog.tsx` se schimbă numai dacă implementarea destinațiilor o cere efectiv.

Nu se instalează dependențe, nu se adaugă funcții din Faza 3B, nu se redesenează interfața și nu se modifică documentele curriculare pentru a face implementarea să treacă.

## Instrucțiune de implementare

Agentul de implementare poate începe direct codarea pe baza handoff-ului, planului și acestui review. Lucrează într-un singur ciclu coerent, pe loturi logice, apoi rulează validările complete la final. Se oprește după raportarea rezultatelor Fazei 3A, fără commit și fără push până la acceptarea independentă.

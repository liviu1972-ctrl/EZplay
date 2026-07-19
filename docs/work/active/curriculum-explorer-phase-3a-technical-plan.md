---
status: Proposed
version: "1.0"
updated: 2026-07-18
lifecycle: active
canonical_for:
  - technical delta plan for Curriculum Explorer Phase 3A
---

# Plan Tehnic Delta — Curriculum Explorer Faza 3A

Acest plan acoperă strict trecerea de la Faza 2 la Faza 3A: publicarea deterministă a tuturor celor 191 de Founder Rounds eligibile și integrarea celor 13 Round-uri Mastery, păstrând arhitectura și infrastructura curente, fără adăugarea de CMS sau baze de date.

## 1. Lotul 1: Publicare Deterministă și Destinații de Catalog

### 1.1 Înlocuirea Allowlist-ului
- În `src/lib/curriculum/content-engine.ts`, se elimină lista hardcodată `PUBLISHED_DETAILED_SLUGS`.
- Funcția `isPublishedDetailedRound(slug)` va delega direct către `isEligibleForDetailedPage(getRoundBySlug(slug))`.
- Funcția `isEligibleForDetailedPage(round)` rămâne sursa de adevăr: round-ul are `titlu_participant`, are `descriere_participant` și există valid în graf (structura).

### 1.2 Unificarea destinațiilor din catalog
- Funcția `mapToCatalogRound(round)` din `content-engine.ts` va rezolva `destination` la `/program/curriculum/rounds/${round.slug}` pentru *toate* instanțele eligibile, fie ele Level 1-5 sau Mastery.
- Ancorele hash fallback (de tip `#fin-1-1`) sunt complet eliminate din fluxul `CatalogRound` pentru round-urile eligibile.

## 2. Lotul 2: Pagina Detaliată și Contextul Mastery

### 2.1 Tratarea diferențiată a nivelului Mastery (`MST`)
În `src/app/(curriculum)/program/curriculum/rounds/[slug]/page.tsx`:
- Dacă `round.level === 'MST'`, **breadcrumb-ul și etichetele** nu vor expune un `Level 6` inventat sau un pilon Business fictiv, ci vor afișa eticheta canonică "Mastery".
- Câmpurile opționale absente (ex: Întrebare fondator, Continuitate) vor fi ignorate dinamic. Secțiunile de Atribute Structurale nu vor randa nimic dacă valorile respective sunt falsy, prevenind afișarea unor placeholdere.

### 2.2 Extinderea navigării contextuale (`SpiralContextLinks`)
În `src/components/curriculum/SpiralContextLinks.tsx`:
- Primirea suportului pentru `currentLevel: number | 'MST'`.
- Pentru Level 1-5: Se păstrează axele transversale "Level X în alți piloni" și longitudinale "Spirala Pillar".
- Pentru Level 'MST': Se omite grila de piloni și se randează contextualitatea Mastery:
  - Legătură `Înapoi la Nucleul Mastery` (`/program/curriculum/mastery`).
  - Lista statică către cele 5 Lentile terminale (`/mastery/lenses/[pillar]`).

## 3. Lotul 3: Legături Inteligente în Relații Curriculare

### 3.1 Parser Relațional
- Implementarea unei utilitare ușoare `parseCurriculumLinks(text: string, allSlugs: string[])` care detectează identificatori canonici în "Prerechizite" și "Continuitate" (regex pentru `[A-Z]{3} \d\.\d(\.\d)?` și `MST \d+`).
- Pentru fiecare identificator validat prin content engine, se generează un link relativ către `/program/curriculum/rounds/[slug]`.
- Identificatorii care nu rezolvă la o pagină (inexistenți sau non-canonici) rămân text simplu pentru a evita `404`-uri sau presupuneri nefondate.

## 4. Validări, Verificări și QA

### 4.1 Teste Deterministice Noi (`content-engine.test.ts`)
- Assert: `getPublishedDetailedSlugs().length === 191`.
- Assert: Cele 13 Round-uri Mastery se află în array-ul celor publicate și direcționează corect.
- Assert: `getRoundBySlug('fake-1-1')` se tratează ca 404 (absent).

### 4.2 Eșantion QA Vizual Obligatoriu post-build
1. **L1 Operations (Fără Întrebare)**: ex. `ops-1-1` (Verificarea ascunderii automate a etichetelor goale).
2. **L1 Finance (Complet)**: ex. `fin-1-2-1` (Păstrarea calității Fazei 2).
3. **Mastery Round**: ex. `mst-01` (Breadcrumb "Mastery", SpiralContextLinks specializat).
4. **Mastery Lens**: `/program/curriculum/mastery/lenses/finance` (A rămas intact).
5. **Catalog Responsive**: Testarea link-urilor de ieșire spre cele 191 de rute.

## 5. Fișiere Afectate Estimativ
- `src/lib/curriculum/content-engine.ts`
- `src/lib/curriculum/content-engine.test.ts`
- `src/app/(curriculum)/program/curriculum/rounds/[slug]/page.tsx`
- `src/components/curriculum/SpiralContextLinks.tsx`
- `src/components/curriculum/RoundsCatalog.tsx`

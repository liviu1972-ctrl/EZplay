---
status: Current
version: "1.1"
updated: 2026-07-18
lifecycle: active
canonical_for:
  - Technical implementation plan for Curriculum Explorer Phase 2
---

# Plan Tehnic de Implementare: Curriculum Explorer (Faza 2)

Acest document reprezintă un delta tehnic (versiune 1.1) bazat pe implementarea stabilă a Fazei 1. Scopul este transformarea rutei `/rounds` într-un catalog navigabil pentru întregul inventar de 191 de Round-uri, și generarea unui subset strict controlat de pagini detaliate exclusiv pentru Finance Level 1 (cele 7 rute).

## 1. Extensiile Modelului și Content Engine-ului

Nu se modifică arhitectura de parsare server-only. Se vor efectua următoarele ajustări specifice:
- **Eligibilitatea Canonică vs. Publicare Temporară:** Funcția `isEligibleForDetailedPage(round)` își păstrează definiția canonică (prezența Titlului și Descrierii pentru participant). Separat, introducem un **allowlist explicit temporar** cu cele 7 slug-uri aprobate (ex: `fin-1-1`, `fin-1-2-1`, etc.) și o funcție cu semantică de publicare (ex: `isPublishedDetailedRound(slug)`). Generarea paginilor statice va folosi strict această funcție pentru a limita output-ul, prevenind publicarea accidentală a altor runde din același fișier.
- **Protecția Rutei Detaliate:** Ruta `[slug]` va verifica atât existența Round-ului în graf, cât și apartenența la lista de publicare temporară, altfel apelând nativ `notFound()`.

## 2. Catalogul Celor 191 de Round-uri și Proiecția Minimă

Ruta `/rounds/page.tsx` interoghează graful complet, dar **nu transferă obiectul complet `Round`** către componenta client.
- **Tipul `CatalogRound`:** Se va defini un tip minim proiectat: ID, slug, Titlu participant (sau ID ca fallback), Level, Pillar, Status și Destinație.
- **Constantă pentru Starea Publică:** Starea va fi furnizată printr-o constantă singulară (`const PUBLIC_STATUS = 'Hartă curriculară'`), decuplată de starea internă `Working` din front matter.
- **Helper Server-Side pentru Destinații:** Funcția va calcula determinist ruta destinație:
  - Cele 7 din subsetul publicat → `/program/curriculum/rounds/[slug]`
  - Celelalte Level 1-5 → `/program/curriculum/levels/[level]/pillars/[pillar]#[slug]`
  - Mastery → `/program/curriculum/mastery#[slug]`

## 3. Filtrarea Locală și Accesibilitatea

Componenta client va gestiona filtrarea locală peste setul de 191 de `CatalogRound`.
- **Logica de Filtrare:** 
  - Level (Toate, 1-5, Mastery) și Business Pillar (Toate, Strategy, Product, Market, Operations, Finance). Combinație conjunctivă. 
  - Mastery nu se asociază unui Pillar. Selectarea unui Pillar exclude rundele Mastery.
- **Contractul de Accesibilitate (A11y):** 
  - Controale native (ex. `<select>` sau `<button>`) care suportă operarea integrală din tastatură.
  - Actualizarea numărului de rezultate va fi anunțată clar către tehnologiile asistive.
  - Butonul de "Resetare" va fi activ/vizibil doar atunci când filtrele deviază de la starea inițială ("Toate").
  - După resetare, se va menține un focus previzibil. 
  - Layout-ul filtrelor trebuie să fie compact și utilizabil pe viewport-uri mici.

## 4. Cele 7 Rute Detaliate Finance L1 (`/rounds/[slug]/page.tsx`)

Rutele vor fi generate pe baza allowlist-ului celor 7, cu `dynamicParams = false`.
- **Proiecția Allowlist-ului de Câmpuri:** UI-ul va prelua direct din `Round` doar câmpurile aprobate (Titlu pedagogic, Descriere pedagogică, Întrebare, Competență, Prerechizite, Continuitate), grupate clar ("Registrul participant", "Registrul pedagogic").
- **Randarea:** Etichetele și titlurile secțiunilor se randează ca texte native. `markdown-renderer.tsx` va fi aplicat punctual doar pentru valorile rubricilor (care conțin formatare). Motorul nu va procesa blocuri Markdown nemapate libere.

## 5. Teste, Verificări și Artefacte Deterministe

Se vor adăuga teste unitare și de integrare stricte:
- Egalitate exactă cu cele 7 ID-uri/slug-uri aprobate în generatorul de subset.
- Verificare țintită pentru `FIN 1.2.1` (Titlul canonic este precis `Cum face firma vânzări?` și body-ul reflectă strict Vânzări/Revenue, protejând remedierea erorii pilotului).
- Catalogul primește exact 191 de instanțe unice.
- Aserțiuni pentru logica de filtrare: `Level 1 + Finance` = 7 rezultate; `Mastery + Toate` = 13 rezultate; `Mastery + Finance` = 0 rezultate.
- Aserțiuni pentru testarea funcției de calcul a destinațiilor.
- **Verificarea Post-Build:** Examinarea `prerender-manifest` (sau echivalent static) va confirma că doar cele 7 rute detaliate există, iar orice alt slug returnează cert 404.

## 6. Fișiere Afectate și Dependențe de Loturi (Ordinea Implementării)

1. **Lotul 1 (Extensia motorului logic și a proiecției):**
   - *Afectate:* `src/types/curriculum.ts`, `src/lib/curriculum/content-engine.ts`, modul/helper nou (dacă e cazul) pentru proiecția `CatalogRound` și logica de publicare, `src/lib/curriculum/content-engine.test.ts` (inclusiv teste pentru catalog helpers).
   - *Scop:* Definirea constantelor de publicare (cele 7), funcțiile ajutătoare pentru status, catalog și aserțiunile exacte deterministe.

2. **Lotul 2 (Catalogul celor 191 și Filtrarea Accesibilă):**
   - *Afectate:* `src/app/(curriculum)/program/curriculum/rounds/page.tsx` și componenta client nouă (ex: `src/components/curriculum/RoundsCatalog.tsx`).
   - *Scop:* Implementarea UI-ului nativ și accesibil pentru listă și filtre, legarea la destinațiile precalculate din `CatalogRound`.

3. **Lotul 3 (Pagina Detaliată & Allowlist Câmp-cu-Câmp):**
   - *Afectate:* Creare `src/app/(curriculum)/program/curriculum/rounds/[slug]/page.tsx`.
   - *Scop:* Crearea layout-ului detaliat pentru cele 7 rute, validarea `notFound()`, și apelurile punctuale ale `markdown-renderer`.

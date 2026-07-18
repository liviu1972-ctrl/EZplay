---
status: Working
version: "1.0"
updated: 2026-07-18
lifecycle: active
canonical_for:
  - product handoff for Curriculum Explorer Phase 2
  - controlled Founder Round catalog and Finance Level 1 detail subset
---

# Handoff de produs — Curriculum Explorer Faza 2

## 1. Context și obiectiv

Faza 1 — Shell și Hartă a fost acceptată prin `curriculum-explorer-phase-1-review.md` și salvată în commitul `890cc09`.

Faza 2 transformă `/program/curriculum/rounds` dintr-o pagină de așteptare într-un catalog curricular navigabil și publică un prim subset controlat de pagini detaliate. Scopul nu este publicarea integrală a celor 191 de pagini de Round, ci validarea unei reprezentări fidele și extensibile înainte de Faza 3.

Rezultatul trebuie să permită două lucruri distincte:

1. utilizatorul poate vedea și filtra întregul inventar curricular ca hartă;
2. utilizatorul poate deschide pagina detaliată numai pentru cele șapte Founder Round-uri Finance Level 1.

## 2. Scope aprobat

### Catalogul complet

Ruta `/program/curriculum/rounds` listează toate cele 191 de Round-uri validate de content engine:

- 178 Round-uri Level 1–5;
- 13 Round-uri Mastery.

Catalogul descrie harta curriculară, nu disponibilitatea comercială sau operațională. Toate intrările folosesc starea publică sigură:

> **Hartă curriculară**

Nu se publică `Working`, `Disponibil`, `Testat` sau altă stare care nu este susținută de o mapare aprobată.

### Subsetul cu pagină detaliată

Numai următoarele șapte Round-uri primesc rută statică `/program/curriculum/rounds/[slug]` în această fază:

| ID | Slug | Titlu canonic pentru participant |
|---|---|---|
| `FIN 1.1` | `fin-1-1` | `Ai grijă de banii firmei` |
| `FIN 1.2.1` | `fin-1-2-1` | `Cum face firma vânzări?` |
| `FIN 1.2.2` | `fin-1-2-2` | `Cât ne costă și ce ne rămâne?` |
| `FIN 1.3` | `fin-1-3` | `Unde s-au dus banii?` |
| `FIN 1.4` | `fin-1-4` | `Cum a fost anul firmei?` |
| `FIN 1.5` | `fin-1-5` | `Ce ne spun cifrele să facem?` |
| `FIN 1.6` | `fin-1-6` | `Mai poate firma continua?` |

Titlurile și conținutul se extrag din sursă; tabelul fixează identitatea și previne reapariția vechiului mismatch pentru `FIN 1.2.1`.

Celelalte 184 de Round-uri nu primesc pagină detaliată în Faza 2. O accesare directă a slugului lor sub `/rounds/[slug]` răspunde 404.

## 3. Comportamentul catalogului

Catalogul folosește stilul Bibliotecii centrale: listă editorială lizibilă, nu un grid dens de 191 de carduri.

Fiecare intrare afișează numai:

- identificatorul Round-ului;
- titlul pentru participant, cu fallback vizual la identificator numai dacă titlul lipsește;
- coordonata Level și Business Pillar sau identitatea Mastery;
- starea publică `Hartă curriculară`.

Toate intrările oferă o destinație utilă:

- cele șapte Round-uri Finance Level 1 conduc la pagina detaliată canonică `/rounds/[slug]`;
- celelalte Round-uri Level 1–5 conduc la ancora Round-ului din intersecția canonică `/levels/[level]/pillars/[pillar]#[slug]`;
- Round-urile Mastery conduc la ancora lor din `/mastery#[slug]`.

Această diferență de destinație nu schimbă starea publică și nu sugerează că cele șapte Round-uri sunt deja testate sau disponibile.

## 4. Filtrele Fazei 2

Catalogul include două filtre locale și un control de resetare:

### Level

- Toate;
- Level 1;
- Level 2;
- Level 3;
- Level 4;
- Level 5;
- Mastery.

### Business Pillar

- Toate;
- Strategy;
- Product;
- Market;
- Operations;
- Finance.

Filtrele se combină conjunctiv. Round-urile Mastery nu primesc artificial un Business Pillar principal; ele apar în `Toate` sau când filtrul Level este `Mastery` și sunt excluse când utilizatorul selectează un Business Pillar.

Interfața afișează numărul rezultatelor curente și permite revenirea clară la lista completă. Filtrarea este locală; nu se introduce serviciu extern, bază de date sau CMS.

Nu intră în Faza 2:

- căutarea text;
- filtre după prerechizite, stare sau Business Pillars secundari;
- sortări multiple;
- salvarea filtrelor în profil;
- recomandări personalizate.

## 5. Pagina detaliată Finance Level 1

Pagina detaliată folosește exclusiv allowlist-ul deja aprobat în planul tehnic:

- ID;
- Titlu pentru participant;
- Descriere pentru participant;
- Titlu pedagogic;
- Descriere pedagogică;
- Întrebarea antreprenorială sau Întrebarea fondatorului;
- Competență urmărită;
- Prerechizite;
- Continuitate.

Câmpurile opționale lipsă sunt omise fără placeholder. Nu se publică:

- note interne;
- condiții de lucru;
- ipoteze de proiectare;
- instrucțiuni editoriale;
- rubrici libere nemapate;
- afirmații că Round-ul este disponibil sau testat.

Pagina separă vizual registrul participantului de registrul pedagogic, dar nu transformă fiecare câmp într-un card. Păstrează ritmul editorial al Bibliotecii centrale.

Navigarea paginii include:

- breadcrumb `Program → Curriculum → Founder Rounds → [ID]`;
- coordonata `Finance × Level 1` cu legătură spre intersecția canonică;
- starea `Hartă curriculară`;
- Spirala contextuală și TOC-ul local când lungimea conținutului îl justifică;
- comportamentul mobil compact acceptat în Faza 1.

## 6. Reguli de rutare și conținut

- Slug-urile sunt generate prin regula canonică deja implementată.
- `generateStaticParams` publică exact cele șapte slug-uri aprobate.
- `dynamicParams = false` și `notFound()` protejează slug-urile necunoscute sau neincluse în subset.
- Content engine-ul rămâne sursa unică server-only și citește documentele numai la build time.
- Nu se creează JSON secundar editabil, CMS, bază de date sau citire a folderului `docs/` la runtime.
- Nu se instalează dependențe noi pentru Markdown, filtre sau teste.

## 7. Criterii de acceptare

Faza 2 este pregătită pentru review când:

1. catalogul listează exact 191 de identificatori fără duplicate;
2. filtrele Level și Business Pillar funcționează cu tastatura și pe mobil;
3. combinația `Level 1 + Finance` produce exact cele șapte Round-uri aprobate;
4. cele șapte titluri conduc la paginile detaliate, iar restul inventarului conduce la intersecția sau ancora Mastery potrivită;
5. sunt generate exact șapte rute detaliate și toate celelalte slug-uri răspund 404;
6. `FIN 1.2.1` afișează exclusiv conținutul canonic despre Vânzări/Revenue;
7. paginile detaliate respectă allowlist-ul și nu expun note interne sau Markdown brut;
8. starea publică este `Hartă curriculară` în catalog și în paginile detaliate;
9. shell-ul, Atlasul, Spirala, skip link-ul și integrarea website-ului din Faza 1 nu regresează;
10. testele curriculare, build-ul static și verificarea vizuală desktop/mobil sunt raportate după ultima modificare;
11. implementarea nu adaugă probleme lint noi peste baseline-ul legacy acceptat.

## 8. În afara scope-ului

Faza 2 nu autorizează:

- pagini detaliate pentru celelalte 184 de Round-uri;
- Faza 3 sau publicarea automată a tuturor entităților eligibile;
- materiale pentru participant, fișe de facilitator sau mecanici de livrare;
- autentificare, progres personal, Skills XP ori recomandări;
- schimbarea arhitecturii Curriculum Explorer acceptate în Faza 1;
- redesignul website-ului principal.

## 9. Primul deliverable tehnic

Înainte de cod, agentul de implementare produce un plan-delta scurt, bazat pe implementarea existentă și pe acest handoff. Planul trebuie să acopere numai:

- extensiile necesare modelului și content engine-ului;
- structura catalogului și starea filtrelor;
- generarea celor șapte rute;
- proiecția allowlist-ului în pagina detaliată;
- testele și verificările finale;
- fișierele estimate ca afectate și riscurile concrete.

Planul nu reia arhitectura Fazei 1, nu propune dependențe noi și nu implementează cod. După review și aprobare, implementarea se execută în loturi coerente și se oprește pentru acceptare înainte de Faza 3.

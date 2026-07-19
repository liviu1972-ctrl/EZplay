---
status: Working
version: "1.0"
updated: 2026-07-18
lifecycle: active
canonical_for:
  - product handoff for Curriculum Explorer Phase 3A
  - publication of all eligible Founder Round detail pages
  - complete public integration of Mastery Rounds
---

# Handoff de produs — Curriculum Explorer Faza 3A

## 1. Decizia și obiectivul

Faza 2 este acceptată prin `curriculum-explorer-phase-2-review.md`. Catalogul face vizibile toate cele 191 de Round-uri, dar numai cele șapte Round-uri Finance Level 1 au în prezent pagini detaliate.

Product Owner-ul aprobă continuarea cu Faza 3. Obiectivul imediat este ca utilizatorul să poată **vedea curriculumul complet pe site**, nu doar inventarul lui.

Faza 3 este împărțită deliberat în două praguri:

1. **Faza 3A — publicarea curriculumului complet eligibil**, aprobată prin acest handoff;
2. **Faza 3B — instrumente de explorare avansată și materiale suplimentare**, evaluată separat după ce Product Owner-ul vede Faza 3A în aplicație.

Această separare evită amânarea conținutului principal din cauza unor funcții secundare.

## 2. Ce înseamnă Faza 3A pentru utilizator

După implementare:

- toate cele 191 de intrări din catalog conduc la pagina lor detaliată canonică;
- utilizatorul poate deschide toate cele 178 de Round-uri Level 1–5;
- utilizatorul poate deschide toate cele 13 Round-uri Mastery;
- cele cinci Lentile Mastery rămân destinații distincte și sunt conectate clar cu overview-ul Mastery;
- fiecare pagină păstrează orientarea în Atlas și în sistemul pe două axe Level × Business Pillar;
- conținutul public rămâne o proiecție editorială sigură a surselor Working, nu publicarea brută a fișierelor din `docs/`.

Matricea de audit confirmă că toate cele 191 de Round-uri îndeplinesc pragul editorial curent: prezența exactă a câmpurilor `Titlu pentru participant` și `Descriere pentru participant`.

## 3. Scope aprobat

### 3.1 Publicarea tuturor Round-urilor eligibile

Allowlist-ul temporar de șapte slug-uri din Faza 2 este înlocuit cu regula editorială canonică deja aprobată:

> Un Round primește pagină detaliată dacă are `Titlu pentru participant` și `Descriere pentru participant` și trece validarea structurală a content engine-ului.

Pentru inventarul auditat curent, rezultatul așteptat este:

- `178` pagini detaliate pentru Level 1–5;
- `13` pagini detaliate pentru Mastery;
- `191` pagini detaliate în total.

Nu se menține o a doua listă manuală cu 191 de slug-uri. Publicarea trebuie derivată determinist din inventarul validat și din pragul editorial.

### 3.2 Catalogul

Ruta `/program/curriculum/rounds` își păstrează structura și filtrele acceptate în Faza 2. Se schimbă numai destinația intrărilor:

- fiecare Round eligibil conduce la `/program/curriculum/rounds/[slug]`;
- nu mai există intrări eligibile care trimit doar la ancora intersecției sau la ancora Mastery;
- starea publică rămâne `Hartă curriculară` pentru toate cele 191 de Round-uri.

Catalogul nu este redesenat și nu devine un grid de carduri.

### 3.3 Paginile detaliate Level 1–5

Toate paginile reutilizează modelul editorial acceptat în Faza 2 și afișează numai câmpurile aprobate disponibile în sursă:

- ID;
- Titlu pentru participant;
- Descriere pentru participant;
- Titlu pedagogic;
- Descriere pedagogică;
- Întrebarea antreprenorială sau Întrebarea fondatorului;
- Competență urmărită;
- Prerechizite;
- Continuitate.

Câmpurile opționale lipsă sunt omise, fără placeholder și fără copy inventat. Această regulă se aplică în special Round-urilor Strategy, Product, Market și Operations din Level 1, unde auditul a identificat absența Întrebării și a Continuității.

Paginile păstrează:

- un singur shell curricular;
- breadcrumb-ul și coordonata Level × Business Pillar;
- registrul participantului și registrul pedagogic;
- prezentarea atributelor într-un flux editorial continuu;
- `SpiralContextLinks` cu ambele coordonate;
- comportamentul compact acceptat pe mobil.

### 3.4 Round-urile și Lentilele Mastery

Cele 13 Round-uri Mastery primesc pagini detaliate în același spațiu canonic `/rounds/[slug]`, dar nu li se inventează un Level 6 sau un Business Pillar principal.

Contextul lor de navigare include:

- legătură către overview-ul `/program/curriculum/mastery`;
- poziția în nucleul celor 13 Round-uri Mastery, acolo unde ordinea este definită în sursă;
- acces către cele cinci Lentile Mastery ca perspective terminale distincte;
- breadcrumb și etichete care folosesc identitatea `Mastery`, nu o coordonată fictivă.

Cele cinci rute `/program/curriculum/mastery/lenses/[pillar]` se păstrează. Ele nu sunt convertite în Founder Rounds și nu intră în totalul de 191.

### 3.5 Relații curriculare

Prerechizitele și Continuitatea se afișează din câmpurile aprobate existente. Se pot transforma în legături numai identificatorii care se rezolvă fără ambiguitate către un Round canonic din content engine.

Nu se inventează:

- prerechizite absente;
- trasee obligatorii din relații editoriale descriptive;
- ordini rigide acolo unde programul permite libertate de navigare;
- Business Pillars secundari care nu sunt mapați explicit în sursă.

## 4. Ce rămâne neschimbat

- Curriculum Explorer rămâne o zonă a website-ului și a Programului educațional EZPLAY, nu un produs separat;
- ruta publică rămâne sub `/program/curriculum`;
- content engine-ul server-only și documentele Markdown Working rămân sursa unică la build time;
- nu se citește folderul `docs/` la fiecare request;
- nu se introduc CMS, bază de date sau JSON editorial secundar;
- nu se publică notele interne, condițiile de lucru, ipotezele de design sau instrucțiunile pentru agenți;
- `Working` nu devine stare publică și nu se afirmă că un Round este disponibil sau testat;
- shell-ul, Atlasul, Spirala și direcția Bibliotecii centrale acceptate în Fazele 1–2 se păstrează.

## 5. În afara Fazei 3A

Următoarele aparțin unei posibile Faze 3B și nu trebuie să întârzie publicarea celor 191 de pagini:

- căutare text;
- filtre după prerechizite, stare, bandă de clase sau Business Pillars secundari;
- vizualizare grafică a tuturor relațiilor dintre Round-uri;
- trasee recomandate sau personalizate;
- salvarea progresului, conturi, Skills XP sau recomandări;
- materiale pentru participant, fișe de lucru ori ghiduri de facilitator;
- maparea publică la stările `În proiectare`, `Prototipat`, `Testat` sau `Disponibil`;
- redesignul Curriculum Explorer sau al website-ului principal.

După acceptarea Fazei 3A, Product Owner-ul vede curriculumul complet în aplicație și decide care dintre aceste instrumente aduce valoare reală.

## 6. Criterii de acceptare

Faza 3A este pregătită pentru review când:

1. catalogul păstrează exact 191 de Round-uri fără duplicate;
2. toate cele 191 de intrări conduc la o pagină detaliată canonică;
3. sunt generate exact 191 de rute detaliate, dintre care 178 Level 1–5 și 13 Mastery;
4. un slug necunoscut continuă să răspundă 404;
5. cele șapte pagini Finance Level 1 acceptate în Faza 2 nu regresează;
6. câmpurile opționale absente sunt omise fără placeholder;
7. niciuna dintre pagini nu expune note interne, Markdown brut sau starea internă `Working`;
8. fiecare Round Level 1–5 păstrează coordonatele corecte de Level și Business Pillar pe ambele axe;
9. Round-urile Mastery folosesc contextul Mastery și nu primesc artificial Level 6 ori pilon principal;
10. cele cinci Lentile Mastery rămân accesibile și distincte de cele 13 Round-uri;
11. shell-ul este unic, iar desktopul și mobilul păstrează navigarea și accesibilitatea acceptate;
12. testele curriculare, build-ul static și QA-ul vizual pe un eșantion reprezentativ sunt raportate după ultima modificare;
13. implementarea nu introduce dependențe sau probleme lint noi peste baseline-ul acceptat.

Eșantionul vizual minim trebuie să includă:

- un Round din fiecare Business Pillar;
- cel puțin un Round din fiecare Level;
- un Round Level 1 căruia îi lipsesc câmpurile opționale;
- un Round Mastery;
- o Lentilă Mastery;
- catalogul pe desktop și mobil.

## 7. Mod de lucru pentru agentul tehnic

Agentul tehnic inspectează întâi implementarea acceptată a Fazelor 1–2 și produce un plan-delta scurt pentru Faza 3A. Planul nu reia arhitectura și nu propune un redesign.

După aprobarea planului, agentul de implementare rezolvă scope-ul ca un singur rezultat coerent:

> Inspectează întâi toate fișierele relevante, apoi implementează corecțiile în loturi logice. Nu este nevoie să rulezi verificări după fiecare editare; rulează validările complete la finalul fiecărui lot. Nu instala dependențe noi, nu extinde scope-ul spre Faza 3B și nu schimba cerințele de produs. Oprește-te când toate criteriile sunt îndeplinite și prezintă rezultatele și diferențele reale față de handoff.

Planul-delta trebuie să clarifice numai:

- eliminarea limitei temporare de șapte pagini și derivarea publicării din eligibilitatea canonică;
- proiecția celor 13 Round-uri Mastery în modelul paginii detaliate;
- destinațiile catalogului și navigarea contextuală;
- testele deterministe pentru totaluri, 404 și separarea Round-uri/Lentile;
- QA-ul pe eșantion și fișierele estimate ca afectate.

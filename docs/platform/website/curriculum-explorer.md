---
title: "Curriculum Explorer — specificație de produs și experiență"
status: Working
version: "1.4"
updated: 2026-07-19
canonical_for:
  - website information architecture for the public curriculum area
  - curriculum navigation and page types
  - public representation rules for curriculum content
---

# Curriculum Explorer — specificație de produs și experiență

## 1. Rolul zonei

Curriculum Explorer face vizibilă structura Programului educațional EZPLAY fără să transforme pagina publică `/program` într-un document foarte lung și fără să publice documentația internă ca atare.

El deservește în special:

- tânărul care vrea să vadă ce ar putea explora;
- părintele care vrea să înțeleagă progresia și valoarea educațională;
- educatorul sau facilitatorul care caută structură, competențe și relații;
- organizația care evaluează amploarea și coerența programului.

Nu este dashboard de participant, LMS, catalog comercial sau editor intern.

## 2. Relația cu `/program`

`/program` păstrează rolul de prezentare, orientare și conversie. După explicarea Business Pillars și a progresiei, include o cale contextuală:

> **Explorează harta programului**

Destinație: `/program/curriculum`.

Curriculum Explorer oferă permanent o cale clară înapoi:

> **Înapoi la Programul EZPLAY**

## Legătura completă cu website-ul principal

Curriculum Explorer este profunzimea Programului, nu o destinație globală concurentă. Legătura dintre cele două suprafețe este implementată astfel:

| Loc | Etichetă | Destinație și rol |
|---|---|---|
| header global | `Programul` | `/program`, intrarea publică principală |
| header global, imediat după `Programul` | `Atlas curricular` | `/program/curriculum`, intrarea directă de studiu și explorare |
| Explorer Rail extins, sub Program | `Prezentare` | `/program` |
| Explorer Rail extins, sub Program | `Atlas curricular` | `/program/curriculum` |
| Explorer Rail extins, sub Program | `Experiența introductivă` | `/experiences/introduction` |
| pagina `/program`, după Business Pillars și progresie | `Explorează atlasul curricular` | `/program/curriculum` |
| footer, grupul `Descoperă` | `Atlas curricular` | `/program/curriculum` |

`Programul` și `Atlas curricular` au roluri complementare și apar separat în navigarea globală. `Programul` prezintă oferta educațională și primul pas; `Atlas curricular` deschide direct structura completă pentru utilizatorii care vor să o studieze. Substructura Atlasului nu este duplicată în header sau în Explorer Rail.

În interiorul Curriculum Explorer:

- logo-ul EZPLAY conduce la `/`;
- legătura `Programul EZPLAY` conduce la `/program`;
- controlul `Meniu` oferă acces la navigarea globală;
- primul element al Atlasului este `Despre program` și conduce la `/program`;
- breadcrumb-ul începe cu legături funcționale `Programul → Curriculum`.

Nu se introduce pagină intermediară sau confirmare la trecerea dintre site și curriculum.

Legăturile contextuale secundare sunt:

| Rută | Etichetă | Destinație |
|---|---|---|
| `/how-we-learn` | `Vezi cum metoda devine curriculum` | `/program/curriculum` |
| `/research` | `Explorează arhitectura curriculară` | `/program/curriculum` |
| `/for/organizations` | `Vezi structura programului` | `/program/curriculum` |

Acestea rămân căi contextuale și nu înlocuiesc CTA-urile principale ale paginilor.

## 3. Sitemap-ul zonei

| Destinație | Rol |
|---|---|
| `/program/curriculum` | overview, explicația hărții și intrările principale |
| `/program/curriculum/levels` | comparația Level 1–5 și Mastery |
| `/program/curriculum/levels/[level]` | harta unui nivel prin cei cinci Business Pillars |
| `/program/curriculum/levels/[level]/pillars/[pillar]` | capitolul canonic aflat la intersecția dintre un Level și un Business Pillar |
| `/program/curriculum/pillars` | overview-ul celor cinci Business Pillars |
| `/program/curriculum/pillars/[pillar]` | spirala unui pilon prin Level 1–5 și relația cu Mastery |
| `/program/curriculum/rounds` | catalogul Founder Rounds publicabile |
| `/program/curriculum/rounds/[round]` | pagina canonică a unui Founder Round |
| `/program/curriculum/mastery` | identitatea, accesul, nucleul și cele cinci lentile Mastery |
| `/program/curriculum/mastery/lenses/[pillar]` | lentila terminală a unui Business Pillar în programul Mastery integrat |
| `/program/curriculum/map` | modul separat de descoperire a relațiilor dintre niveluri, piloni și Round-uri |
| `/program/curriculum/glossary` | termenii necesari pentru citirea programului |

Indexurile intermediare pot fi pagini sau stări ale explorer-ului, în funcție de auditul tehnic. URL-urile individuale trebuie să rămână distribuibile și inteligibile fără starea interfeței.

## 4. Modelul de navigare

### Header compact

Conține:

- logo EZPLAY;
- denumirea `Programul educațional` sau `Curriculum Explorer` după validarea etichetei în interfață;
- legătura `Programul EZPLAY`;
- acces controlat la navigarea globală;
- limbă și opțiunile globale care rămân aplicabile.

Nu dublează toate destinațiile sidebar-ului curricular.

### Compoziția hibridă pe desktop

Shell-ul folosește trei zone cu roluri diferite:

1. **Atlas în stânga** — orientarea stabilă în întregul curriculum;
2. **Bibliotecă în centru** — lectura editorială a conținutului selectat;
3. **Spirală contextuală în dreapta** — deplasarea pe cele două axe și cuprinsul local.

Cele trei zone nu sunt trei meniuri care repetă aceleași linkuri. Atlasul schimbă zona mare a programului, Biblioteca prezintă conținutul, iar Spirala păstrează continuitatea curriculară a selecției curente.

### Atlasul din stânga

Ordinea implicită este:

1. Overview;
2. Niveluri;
3. Business Pillars;
4. Founder Rounds;
5. Mastery;
6. Glosar.

Atlasul arată destinația activă și poate dezvălui substructura relevantă. Nu deschide simultan arborele complet al celor 191 de Round-uri. Include o intrare distinctă către Harta conectată, fără ca aceasta să devină modul implicit.

### Biblioteca centrală

Conținutul central folosește ritmul unei publicații educaționale:

- breadcrumb și coordonatele selecției;
- titlu de capitol și introducere;
- afirmația de progres în spirală;
- secțiuni numerotate și lățime de lectură controlată;
- liste de Founder Rounds și metadate fără aglomerare de carduri;
- legături editoriale către prerechizite și continuări.

Biblioteca nu imită un PDF și nu transformă fiecare paragraf într-un card. Este o suprafață web de lectură, cu structură suficientă pentru scanare și deep links.

### Spirala contextuală din dreapta

Zona contextuală face disponibile simultan două traversări:

- **același Business Pillar între etape** — Level 1–5 și apoi lentila obligatorie corespunzătoare din Mastery;
- **același Level între Business Pillars** — Strategy, Product, Market, Operations și Finance.

Schimbarea nivelului păstrează pilonul selectat. Schimbarea pilonului păstrează nivelul selectat. Centrul devine pagina aflată la intersecția celor două coordonate.

Ruta canonică a intersecției este `/program/curriculum/levels/[level]/pillars/[pillar]`. Pagina de Level, pagina overview a pilonului, Spirala din dreapta și Harta conectată trimit toate la aceeași rută; nu se creează o a doua reprezentare sub `/pillars/[pillar]/...`.

Mastery este diferențiat de Level 1–5 și nu primește eticheta `Level 6`. În contextul unui pilon, ultimul pas al spiralei conduce la `/program/curriculum/mastery/lenses/[pillar]`, lentila acelui pilon din programul Mastery integrat.

### Breadcrumb

Breadcrumb-ul exprimă ierarhia, de exemplu:

```text
Program → Curriculum → Level 3 → Finance → [Founder Round]
```

El nu înlocuiește titlul paginii și nu inventează o ordine curriculară acolo unde traseul este liber.

### Cuprins local

Paginile lungi pot avea un cuprins local distinct de sidebar. Pe ecranele care nu permit două coloane auxiliare, cuprinsul devine control compact sau este integrat în panoul mobil.

### Harta conectată

`/program/curriculum/map` este o suprafață separată pentru descoperire și relații. Poate permite explorarea nivelurilor, Business Pillars, prerechizitelor și Round-urilor conexe, dar fiecare element conduce înapoi la pagina editorială canonică din Bibliotecă.

Harta nu este obligatorie pentru înțelegerea sau parcurgerea programului, nu încarcă toate cele 191 de noduri într-o singură stare și nu înlocuiește navigarea accesibilă prin linkuri și liste.

## 5. Explorarea pe două axe

### După nivel

Răspunde la întrebarea: „Ce complexitate și ce decizii apar în această etapă?”. Pagina unui nivel conectează cei cinci Business Pillars și face vizibilă încărcarea generală.

### După Business Pillar

Răspunde la întrebarea: „Cum revine și se adâncește această perspectivă de la Level 1 la Level 5?”. Pagina unui pilon folosește spirala canonică și trimite la Round-urile asociate.

Aceeași pagină de Round poate fi accesată din ambele axe. Navigarea păstrează contextul de intrare numai ca ajutor de revenire; conținutul canonic nu se duplică.

## 6. Tipuri de pagină

### Overview curricular

Include:

- ce este și ce nu este harta;
- Level 1–5 și Mastery;
- cei cinci Business Pillars;
- cum se citește un Founder Round;
- starea reală a dezvoltării;
- căile recomandate pentru explorare.

### Pagină de nivel

Include:

- banda principală de clase și limitele interpretării ei;
- schimbarea de complexitate specifică nivelului;
- cele cinci Business Pillars;
- Round-urile publicabile;
- legăturile și prerechizitele importante;
- starea de dezvoltare.

### Pagină de Business Pillar

Include:

- definiția canonică a pilonului;
- progresia Level 1–5;
- relația cu celelalte Business Pillars;
- Round-urile publicabile;
- rolul lentilei în Mastery.

### Pagină de Founder Round

Poate include, când sursa conține informația aprobată:

- codul și titlul;
- întrebarea sau miza pentru participant;
- Level și Business Pillar principal;
- Business Pillars secundari;
- capacitatea urmărită;
- decizia participantului;
- concepte și instrumente;
- dovezi observabile;
- prerechizite reale;
- relații cu alte Round-uri;
- registrul pedagogic;
- starea dezvoltării și disponibilității.

Câmpurile lipsă nu sunt completate prin copy inventat. Secțiunile interne, ipotezele de design și notele de audit nu se publică implicit.

## 7. Căutare și filtre

Catalogul Round-urilor trebuie proiectat pentru următoarele filtre, fără obligația ca toate să intre în prima fază:

- Level;
- Business Pillar principal;
- Business Pillars secundari;
- stare;
- prerechizite sau traseu;
- bandă de clase, prezentată ca calibrare și nu ca interdicție rigidă.

Prima versiune poate folosi filtrare locală dacă volumul publicat permite. Un serviciu extern de căutare nu este implicit aprobat.

## 8. Stări publice

Starea documentului intern și starea publică a experienței sunt dimensiuni diferite.

`Working` în documentație înseamnă că harta este coerentă și utilizabilă pentru dezvoltare. Nu înseamnă automat că Round-ul este testat sau disponibil.

Interfața publică trebuie să poată diferenția:

- hartă curriculară;
- în proiectare;
- prototipat;
- testat;
- disponibil.

Înainte de import sau randare, planning-ul trebuie să definească o mapare explicită și o regulă sigură pentru starea necunoscută. Fallback-ul nu este `disponibil`.

## 9. Direcția vizuală

Curriculum Explorer păstrează identitatea EZPLAY, dar folosește o compoziție editorială mai densă și mai stabilă decât paginile de prezentare.

Direcția include:

- suprafețe luminoase și calde;
- tipografia și token-urile EZPLAY;
- linii și noduri numai când exprimă relații curriculare reale;
- lățime de lectură controlată;
- metadate ușor de scanat;
- tabele responsive și alternative lizibile pe mobil;
- stări prin text și formă, nu numai prin culoare;
- motion redus și funcțional.
- compoziția Atlas + Bibliotecă + Spirală pe desktop;
- aceeași coordonată `Level × Business Pillar` păstrată când utilizatorul schimbă axa de navigare.

Nu folosește:

- estetică de wiki generic, IDE sau admin;
- temă dark-tech separată;
- grafuri mari animate fără valoare de orientare;
- toate cele 191 de noduri într-o singură vizualizare obligatorie;
- densitate care sacrifică înțelegerea pentru impresia de amploare.

## 10. Responsive și accesibilitate

- conținutul rămâne navigabil fără deschiderea sidebar-ului;
- panoul mobil are etichetă clară și gestionarea corectă a focusului;
- breadcrumb-ul se adaptează fără pierderea destinației curente;
- tabelele primesc reprezentare alternativă când scroll-ul orizontal nu este suficient;
- filtrele pot fi eliminate și resetate cu tastatura;
- stările active folosesc text, formă și atribute semantice;
- linkul către conținut permite evitarea navigării repetitive;
- URL-ul individual poate fi deschis direct și păstrează orientarea.

## 11. Etapizare de produs

### Faza 1 — shell și hartă

- shell-ul propriu;
- overview curricular;
- Level 1–5 și Mastery;
- overview-urile Business Pillars;
- starea Working și limitele publicării.

### Faza 2 — catalog controlat

- modelul public al Founder Round-ului;
- un subset reprezentativ de Round-uri;
- catalog, filtre de bază și legături între axe;
- verificarea registrelor participant și pedagogic.

### Faza 3 — extindere după audit

- Round-uri suplimentare aprobate editorial;
- căutare și filtre extinse;
- prerechizite și trasee;
- materiale publice numai după aprobarea și verificarea lor.

Publicarea tuturor Round-urilor nu este criteriu de acceptare pentru Faza 1.

### Starea curentă și continuarea editorială

La 2026-07-19, infrastructura publică a Atlasului curricular este implementată și acceptată: shell propriu, explorare Level × Business Pillar, catalogul complet și pagini canonice pentru toate cele 191 de Founder Rounds, inclusiv nucleul Mastery.

Următoarea etapă pe filiera `ezplay.org` nu este o nouă arhitectură a Atlasului, ci aprofundarea editorială a fiecărui Round în pagina existentă. Lucrul se face progresiv, în loturi coerente, pe baza conținutului curricular aprobat.

O pagină poate deveni mai bogată prin problema și decizia participantului, concepte și instrumente, dovezi observabile, prerechizite, continuitate și relații curriculare numai când aceste elemente sunt susținute de sursă. Materialele de participant, ghidurile de facilitator, jocurile și simulările rămân produse editoriale și experiențiale distincte, nu sunt deduse automat din harta publică.

## 12. Criterii de acceptare de produs

Zona este corect definită când:

- `/program` și Curriculum Explorer au roluri distincte și complementare;
- utilizatorul înțelege că a rămas în EZPLAY;
- navigarea globală și cea curriculară nu concurează;
- fiecare Round are o singură reprezentare canonică;
- nivelurile și pilonii oferă două căi reale către același curriculum;
- starea Working nu este confundată cu disponibilitatea;
- documentația internă nu este expusă textual fără filtru editorial;
- shell-ul funcționează pe desktop, mobil și cu tastatura;
- zona poate crește fără adăugarea fiecărui Round în meniul principal.

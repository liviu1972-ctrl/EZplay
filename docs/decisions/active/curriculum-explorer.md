---
status: Current
version: "1.2"
updated: 2026-07-18
lifecycle: active
canonical_for:
  - public identity and scope of the EZPLAY Curriculum Explorer
  - relationship between /program and the curriculum area
  - navigation and visual continuity rules for the curriculum area
  - publication boundary between internal curriculum and public content
---

# Curriculum Explorer pentru Programul educațional EZPLAY

## Decizia

Programul educațional primește o zonă publică structurată cu navigare proprie, denumită de lucru **Curriculum Explorer**. Zona aparține website-ului EZPLAY și Programului educațional EZPLAY; nu este un site, produs sau brand separat.

Relația dintre cele două suprafețe este:

```text
/program
→ prezentarea editorială a programului, a valorii și a primului pas

/program/curriculum
→ explorarea structurată a nivelurilor, Business Pillars și Founder Rounds
```

Pagina `/program` rămâne intrarea principală pentru publicul larg. Curriculum Explorer este destinația pentru utilizatorii care vor să înțeleagă în profunzime arhitectura și conținutul programului.

## Motivul separării

Navigarea website-ului public răspunde întrebării „Ce este EZPLAY și unde pot merge?”. Navigarea curriculară răspunde întrebărilor „Unde sunt în program?”, „Cum se leagă această pagină de nivel, pilon și celelalte Round-uri?” și „Ce pot studia în continuare?”.

Programul are 25 de hărți Level × Business Pillar, o etapă Mastery integrată, cinci lentile Mastery și un inventar Working de 191 de Founder Rounds. Această profunzime nu trebuie înghesuită în header-ul global sau în Explorer Rail-ul website-ului.

## Arhitectura informației

Curriculum Explorer folosește următoarele destinații conceptuale:

- overview-ul programului;
- Level 1–5 și Mastery;
- Strategy, Product, Market, Operations și Finance;
- catalogul Founder Rounds;
- paginile individuale ale Founder Rounds;
- glosarul și explicația modului de citire a hărții.

Conținutul poate fi explorat atât după nivel, cât și după Business Pillar. Acestea sunt două căi către aceleași entități, nu două copii ale curriculumului. Fiecare Founder Round are o singură pagină canonică și poate apărea în mai multe liste, filtre și trasee.

Identificatorii de rută propuși sunt:

```text
/program/curriculum
/program/curriculum/levels/[level]
/program/curriculum/levels/[level]/pillars/[pillar]
/program/curriculum/pillars/[pillar]
/program/curriculum/rounds
/program/curriculum/rounds/[round]
/program/curriculum/mastery
/program/curriculum/mastery/lenses/[pillar]
/program/curriculum/map
/program/curriculum/glossary
```

Forma finală a slug-urilor individuale este stabilită în planning după auditul codurilor și titlurilor. Codurile de lucru ale Round-urilor nu devin automat identificatori publici permanenți.

Intersecția canonică `Level × Business Pillar` folosește o singură rută:

```text
/program/curriculum/levels/[level]/pillars/[pillar]
```

Atât pagina unui Level, cât și spirala unui Business Pillar trimit la această destinație. `/program/curriculum/pillars/[pillar]` rămâne overview-ul vertical al pilonului și nu înlocuiește capitolele pe nivel. Lentila terminală folosește `/program/curriculum/mastery/lenses/[pillar]`, fără a crea un `Level 6`.

## Navigarea proprie

Curriculum Explorer folosește compoziția hibridă aprobată **Atlas + Bibliotecă + Spirală**:

- header EZPLAY compact, cu acces clar la `/program` și la website-ul principal;
- **Atlas în stânga** — navigarea stabilă prin overview, niveluri, Business Pillars, Founder Rounds, Mastery, glosar și modul de descoperire;
- **Bibliotecă în centru** — suprafața editorială principală pentru citirea capitolului curricular aflat la intersecția dintre Level și Business Pillar;
- **Spirală contextuală în dreapta** — navigarea în același Business Pillar între Level 1–5 și lentila sa Mastery, plus traversarea aceluiași Level între cei cinci Business Pillars;
- breadcrumb;
- selectorul coordonatelor `Level × Business Pillar`;
- cuprins local pentru paginile lungi, integrat în zona contextuală;
- căutare și filtre atunci când inventarul publicat le justifică;
- navigare către elemente conexe și, unde există o ordine reală, anterior/următor;
- variantă mobilă printr-un panou controlat explicit de utilizator.

Explorer Rail-ul global nu apare simultan cu Atlasul curricular. Header-ul global complet poate fi înlocuit în această zonă cu varianta compactă aprobată, fără ca utilizatorul să piardă identitatea EZPLAY sau ieșirea către site.

Harta conectată este un mod separat de descoperire la `/program/curriculum/map`. Ea face vizibile relațiile dintre niveluri, piloni și Founder Rounds, dar nu înlocuiește structura principală de lectură și nu obligă utilizatorul să navigheze printr-un graf.

Mastery apare după Level 5 în contextul spiralei, dar este diferențiat vizual și semantic ca etapă terminală integrată. Nu este prezentat drept `Level 6`; fiecare pilon conduce către lentila sa obligatorie din același program Mastery.

## Continuitatea vizuală și CSS

Curriculum Explorer poate avea layout, componente și stiluri proprii pentru nevoile sale funcționale:

- densitate informațională mai mare;
- coloană de lectură controlată;
- tabele, hărți, metadate și relații curriculare;
- stări active și filtre;
- pagini lungi și cuprins persistent.

Zona păstrează token-urile de brand, paleta, tipografia, iconografia și standardele de accesibilitate EZPLAY. Diferența trebuie să comunice „instrument de explorare în profunzime”, nu „alt website” și nici „dashboard SaaS”. Nu se introduce o temă vizuală complet separată doar pentru a demonstra existența unui route group.

## Relația cu route groups

Un route group separat în Next.js este o opțiune recomandată pentru a aplica un layout curricular fără a introduce segmentul tehnic în URL. De exemplu, un grup `(curriculum)` poate servi rutele publice de sub `/program/curriculum`.

Această decizie stabilește rezultatul de produs — shell propriu și URL-uri sub `/program` — nu structura exactă a folderelor. Agentul de implementare verifică mai întâi codul și alege organizarea tehnică sigură. Parantezele route group-ului nu apar în URL.

## Conținut public și sursă internă

Documentele din `docs/products/educational-program/` devin sursa curriculară Working, nu pagini publice publicate textual.

Stratul public:

- păstrează sensul și terminologia canonică;
- elimină notele interne, riscurile de lucru și instrucțiunile pentru agenți;
- nu transformă ipotezele, exemplele sau pragurile nevalidate în promisiuni;
- afișează starea reală a conținutului;
- nu declară un Round disponibil doar pentru că harta lui curriculară există.

Stările publice trebuie să distingă cel puțin între hartă curriculară, în proiectare, prototipat, testat și disponibil. Numele finale și condițiile de trecere între stări se stabilesc înaintea publicării datelor.

## Cele două registre editoriale

O pagină de Founder Round poate prezenta, fără duplicarea entității:

- un registru pentru participant: problemă, miză și acțiunea pe care o va întreprinde;
- un registru pedagogic: competențe, concepte, dovezi, prerechizite și relații curriculare.

Cele două registre descriu același Round și nu creează rezultate sau promisiuni diferite. Conținutul intern care nu are încă formulare publică rămâne nepublicat.

## Ce nu decide această alegere

- publicarea imediată a tuturor celor 191 de Round-uri;
- disponibilitatea programului ori a fiecărui nivel;
- slug-urile finale și modelul tehnic de date;
- căutarea sau filtrarea printr-un serviciu extern;
- autentificarea, progresul participantului sau personalizarea pe cont;
- pragurile Skills XP și regulile de deblocare;
- un CMS ori sincronizarea automată între Markdown și website;
- designul final al componentelor.

Acestea se planifică sau se decid separat, fără schimbarea arhitecturii de produs aprobate aici.

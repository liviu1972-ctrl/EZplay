---
status: Current
version: "1.3"
updated: 2026-07-18
lifecycle: active
canonical_for:
  - product handoff for direct implementation of the Curriculum Explorer
---

# Handoff pentru implementare — Curriculum Explorer

## Autoritate

Implementarea urmează:

- [decizia Curriculum Explorer](../../decisions/active/curriculum-explorer.md);
- [specificația de produs și experiență](../../platform/website/curriculum-explorer.md);
- [pagina publică a programului](../../platform/website/pages/program.md);
- [sistemul global de navigare](../../platform/website/ux-ui/navigation-system.md);
- [arhitectura curriculară](../../products/educational-program/curriculum/architecture.md);
- [harta Level 1–5 și Mastery](../../products/educational-program/curriculum/progression-map.md);
- [standardul hărților de Round-uri](../../products/educational-program/curriculum/round-map-standard.md).

Acest document autorizează implementarea după auditul codului și un mini-plan tehnic realizat de același agent. Nu autorizează agentul de implementare să schimbe curriculumul, copy-ul, stările de publicare, autentificarea, accesul minorilor sau progresul participantului.

## Obiectiv

Implementează Curriculum Explorer ca zonă publică sub `/program/curriculum`, cu layout propriu, compoziția aprobată Atlas + Bibliotecă + Spirală, Harta conectată ca mod separat, continuitate vizuală EZPLAY și o graniță sigură între documentația curriculară internă și conținutul public.

Agentul:

1. inspectează implementarea și sursele;
2. scrie un mini-plan tehnic suficient pentru a controla riscurile;
3. continuă direct cu implementarea;
4. se oprește numai dacă găsește un conflict real de produs sau o schimbare care necesită autoritate nouă.

## Audit obligatoriu

Agentul inspectează read-only:

- `src/app/layout.tsx` și toate route groups și layout-urile existente;
- layout-ul `(platform)` și shell-urile `(ezplay)`, dashboard și admin;
- `SiteHeader`, `ExplorerRail`, navigarea mobilă, footer-ul și localizarea;
- ruta și componentele actuale `/program`;
- sistemul de token-uri, stilurile globale, responsive și dark mode;
- limitele server/client și modul actual de încărcare a copy-ului;
- posibilitățile existente pentru Markdown sau date structurate, fără introducerea automată a unui CMS;
- structura și consistența front matter-ului curricular;
- codurile, titlurile și relațiile Founder Rounds;
- testele disponibile pentru routing, navigare, accesibilitate și localizare;
- conflictele dintre documentația website și comportamentul implementat.

## Alegerea tehnică a graniței de layout

Auditul compară cel puțin:

1. un route group separat, de exemplu `(curriculum)`, cu layout propriu pentru rutele de sub `/program/curriculum`;
2. un layout imbricat în structura publică existentă, cu dezactivarea explicită a Explorer Rail-ului global.

Recomandarea de produs favorizează un route group și un shell distinct, cu evitarea simultană a Explorer Rail-ului global și a Atlasului curricular. Agentul poate alege layout-ul imbricat dacă auditul dovedește că este mai sigur și produce exact comportamentul aprobat. Alegerea este tehnică și trebuie raportată, nu cerută utilizatorului în lipsa unui conflict de produs.

Parantezele route group-ului nu apar în URL. CSS-ul propriu poate fi modular sau compus din token-urile existente; nu se creează o identitate vizuală paralelă.

## Comportament funcțional obligatoriu

1. `/program` rămâne pagina publică de prezentare.
2. `/program/curriculum` este intrarea în explorer.
3. Zona curriculară oferă o cale permanentă către `/program` și către site-ul principal.
4. În header-ul global, `Programul` continuă să ducă la `/program`; Curriculum Explorer nu devine item global separat.
5. Pe `/program`, Explorer Rail-ul extins și meniul mobil grupează `Prezentare`, `Harta programului` și `Experiența introductivă`.
6. Pagina `/program` afișează `Explorează harta programului` după Business Pillars și progresie, cu destinația `/program/curriculum`.
7. Footer-ul include `Harta programului` sub `Descoperă`.
8. `/how-we-learn`, `/research` și `/for/organizations` primesc legăturile contextuale și etichetele exacte definite în specificație, fără înlocuirea CTA-urilor principale.
9. În shell-ul curricular, logo-ul duce la `/`, `Programul EZPLAY` la `/program`, `Meniu` deschide navigarea globală, Atlasul începe cu `Despre program`, iar breadcrumb-ul începe cu `Programul → Curriculum`.
10. Trecerea între site și curriculum este directă, fără interstițial sau confirmare.
11. Explorer Rail-ul global și Atlasul curricular nu apar simultan.
12. Pe desktop, stânga este Atlasul, centrul este Biblioteca, iar dreapta este Spirala contextuală și cuprinsul local.
13. Selectorul `Level × Business Pillar` schimbă pagina centrală la intersecția celor două coordonate.
14. Intersecția folosește ruta canonică `/program/curriculum/levels/[level]/pillars/[pillar]`; nu există o copie concurentă sub ruta pilonului.
15. Schimbarea nivelului păstrează pilonul; schimbarea pilonului păstrează nivelul.
16. Navigarea pe nivel și pe Business Pillar ajunge la aceleași entități canonice.
17. Mastery este terminal și integrat; nu este afișat drept Level 6, iar lentilele folosesc `/program/curriculum/mastery/lenses/[pillar]`.
18. `/program/curriculum/map` este un mod separat de descoperire și trimite la paginile canonice de lectură.
19. O pagină de Round poate fi deschisă direct prin URL și păstrează orientarea.
20. Starea documentară `Working` nu este afișată drept `disponibil`.
21. Lipsa unei stări publice explicite folosește un fallback restrictiv.
22. Notele interne, riscurile, instrucțiunile pentru agenți și ipotezele nu intră automat în UI.
23. Mobilul primește aceeași informație printr-o navigare controlabilă și accesibilă; cele trei coloane nu sunt comprimate artificial.
24. Zona rămâne utilizabilă fără motion și fără grafuri interactive.
25. Rutarea nu introduce autentificare sau profil de participant.

## Modelul de conținut

Implementarea separă explicit:

- sursa curriculară internă;
- modelul de date publicabil;
- transformarea sau selecția editorială;
- starea documentului;
- starea publică a Round-ului;
- copy-ul pentru participant;
- registrul pedagogic;
- relațiile nivel, pilon, prerechizit și conexiuni.

Agentul nu presupune că randarea directă a Markdown-ului este soluția corectă. Dacă folosește import automat, trebuie să excludă câmpurile interne, să valideze schema, să evite expunerea accidentală și să păstreze URL-urile stabile. Nu inventează un CMS și nu adaugă o dependență externă dacă proiectul poate susține o sursă versionată mai simplă.

## Ordinea de implementare

Agentul poate ajusta granițele tehnice după audit, dar implementează în ordinea:

1. auditul rutelor, shell-urilor și surselor curriculare;
2. mini-planul și alegerea structurii de routing și a graniței de layout;
3. modelul public de conținut și validarea stărilor;
4. shell-ul responsive Atlas + Bibliotecă + Spirală și navigarea de bază;
5. overview-ul, nivelurile, Business Pillars și Mastery;
6. un pilot cu un subset reprezentativ de Founder Rounds;
7. Harta conectată ca mod separat de descoperire;
8. catalogul și filtrele de bază justificate de conținutul real;
9. QA pentru deep links, mobil, tastatură, stări, localizare și conținut nepublicabil;
10. extinderea la întregul conținut care poate fi reprezentat fidel din sursele Working.

## Verticala inițială de validare

Implementarea începe cu o verticală completă înaintea extinderii mecanice la toate cele 191 de Round-uri. Verticala trebuie să demonstreze:

- un overview curricular;
- o pagină de nivel;
- o pagină de Business Pillar;
- o pagină Mastery;
- câteva Round-uri care acoperă tipuri diferite de relații și cantități de conținut;
- navigarea către aceeași pagină de Round din ambele axe.

Agentul folosește pentru verticală exemple existente și suficient de complete din sursele Working. El nu declară Round-urile disponibile și nu inventează copy pentru câmpurile lipsă. După validarea structurii în cod, extinde reprezentarea la conținutul care poate fi transformat fidel.

## Criterii de acceptare pentru implementare

Implementarea este gata când:

- descrie realitatea rutelor și layout-urilor curente;
- raportează alegerea argumentată între route group și layout imbricat;
- folosește fișierele și componentele reale fără reorganizări nejustificate;
- păstrează URL-urile sub `/program/curriculum`;
- separă conținutul intern de schema publică;
- explică fallback-ul stărilor și prevenirea expunerii accidentale;
- livrează compoziția Atlas + Bibliotecă + Spirală fără două sisteme globale concurente;
- permite navigarea aceleiași spirale între niveluri și compararea pilonilor în același nivel;
- oferă Harta conectată separat și păstrează paginile canonice de lectură;
- include responsive, accesibilitate, localizare și deep links;
- validează verticala inițială înaintea extinderii;
- trece lint, build și verificările relevante;
- listează deciziile tehnice, riscurile și orice conflict rămas.

## Verificări și raport final

Agentul rulează cel puțin `pnpm lint` și `pnpm build`, plus verificări pentru rutele noi, deep links, responsive și navigare cu tastatura. Raportează:

- realitatea implementată și diferențele față de documentație;
- opțiunile de routing evaluate și recomandarea;
- arhitectura shell-ului și reutilizarea token-urilor CSS;
- modelul de conținut și granița de publicare;
- mini-planul urmat, implementarea rezultată, dependențele și riscurile;
- verificările executate și rezultatele reale;
- alegerile de produs care nu pot fi completate tehnic prin presupuneri.

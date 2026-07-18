---
title: "EZPLAY.org — sistemul de navigare"
status: Draft
version: "0.3"
updated: 2026-07-18
scope:
  - header global
  - explorer rail
  - navigare responsive
  - corectarea discretă a perspectivei editoriale
---

# EZPLAY.org — sistemul de navigare

## 1. Decizia

Website-ul public EZPLAY folosește două straturi de navigare pe desktop:

1. un meniu orizontal global în partea de sus;
2. un rail vertical de iconuri în partea stângă, care se extinde la cererea utilizatorului.

Cele două straturi nu sunt alternative și nu se copiază integral unul pe celălalt.

> **Header-ul spune unde poți merge. Explorer Rail-ul arată ce poți descoperi.**

Rail-ul nu transformă website-ul într-un dashboard și nu este un sidebar de documentație. Este o componentă de explorare construită pentru a face vizibilă amploarea programului, a metodei și a ecosistemului EZPLAY.

## 2. Ce păstrăm din observația Boundaryless

Referința Boundaryless nu este folosită pentru culori, fonturi sau estetică tehnică.

Principiul relevant este:

- navigarea sugerează că în spatele homepage-ului există un sistem amplu;
- meniul poate dezvălui mai multă profunzime decât încape permanent în header;
- structura devine vizibilă printr-o schimbare de stare, nu printr-o listă statică foarte lungă;
- deschiderea meniului este un moment de orientare și descoperire;
- paginile păstrează aceeași impresie de sistem matur.

EZPLAY interpretează acest principiu printr-un header orizontal și un rail extensibil propriu. Nu copiază meniul public Boundaryless și nici sidebar-ul separat al zonei sale de documentație.

## 3. Rolurile celor două meniuri

| Strat | Rol | Conținut | Nu face |
|---|---|---|---|
| `TopHeader` | orientare globală rapidă | destinațiile principale, limbă, acces platformă | nu afișează întreaga arhitectură a site-ului |
| `ExplorerRail` colapsat | prezență persistentă și acces rapid | iconuri, stare activă, progres în pagină, trigger | nu cere memorarea iconurilor fără tooltip |
| `ExplorerRail` extins | explorare și profunzime | subpagini, ancore locale, destinații conexe, explicații scurte | nu devine un al doilea homepage și nu dublează fiecare link din header |
| `MobileSheet` | echivalent mobil unificat | navigare globală și contextuală în grupuri clare | nu afișează permanent un rail îngust pe ecrane mici |

## 4. Header-ul orizontal

Header-ul este disponibil pe toate paginile publice, cu excepția suprafețelor care au propriul app shell aprobat.

Conține:

- logo EZPLAY;
- `Programul`;
- `Cum învățăm`;
- `Experiențe`;
- `Pentru organizații`;
- `Cercetare`;
- `Despre EZPLAY`;
- selector `RO / EN`;
- `Intră în platformă`;
- trigger-ul pentru meniul mobil la lățimi mici.

Pe viewport-uri foarte mari poate include CTA-ul contextual `Adu EZPLAY în comunitatea ta`, dacă nu aglomerează navigarea.

Header-ul:

- este fixat în partea de sus și rezervă permanent în layout înălțimea sa de `64px`;
- este vizibil în primii aproximativ `100px` ai paginii;
- se ascunde la scroll deliberat în jos și reapare la scroll în sus, fără să intercepteze scroll-ul nativ;
- rămâne vizibil în timpul deplasărilor programatice inițiate prin linkuri sau butoane;
- rămâne luminos și compact;
- nu dispare când Explorer Rail-ul se extinde;
- păstrează aceeași ordine semantică pe toate paginile;
- indică ruta globală activă prin text și un semnal vizual discret;
- nu folosește iconuri în locul etichetelor principalelor destinații.

## 5. Explorer Rail-ul din stânga

### 5.1. Starea colapsată

Pe desktop larg, rail-ul este o bandă verticală de aproximativ `72–88px`, poziționată sub header și ancorată în partea stângă a viewport-ului.

Conține:

- un trigger vizibil pentru extindere;
- 5–7 iconuri pentru zonele relevante ale paginii sau ale secțiunii;
- indicatorul destinației ori secțiunii active;
- progresul discret al paginii, când pagina este lungă;
- acces la închiderea ori restrângerea rail-ului;
- versiunea aplicației în zona inferioară, dacă nu este afișată în altă zonă persistentă.

Fiecare icon are:

- nume accesibil;
- tooltip la hover și focus;
- stare default, hover, focus-visible, active și selected;
- target tactil suficient;
- o formă ori etichetă suplimentară când culoarea transmite stare.

Iconurile nu se aleg doar pentru asemănare decorativă. `lucide-react` este folosit pentru funcții și navigare; conceptele centrale EZPLAY pot primi simboluri proprii, construite din familia `ModuleNode`.

### 5.2. Starea extinsă

Rail-ul se extinde la aproximativ `288–320px` după click, tap sau activare cu tastatura.

Deschiderea nu pornește numai din hover. Hover-ul asupra unui icon afișează tooltip; utilizatorul controlează explicit extinderea.

Meniul extins poate conține:

1. titlul și descrierea scurtă a zonei curente;
2. destinațiile principale relevante;
3. subpaginile din zona activă;
4. secțiunile paginii curente;
5. maximum trei căi conexe;
6. starea `disponibil`, `în dezvoltare` sau `direcție viitoare`, numai unde este necesară;
7. versiunea și o legătură utilitară discretă în partea de jos.

Nu conține:

- paragrafe editoriale lungi;
- CTA-uri concurente cu CTA-ul principal al paginii;
- statistici decorative;
- funcții indisponibile prezentate drept active;
- toate linkurile din footer;
- autentificare duplicată dacă ea rămâne clar vizibilă în header.

### 5.3. Relația cu pagina

La minimum `1280px`:

- rail-ul colapsat rezervă spațiu în layout;
- la extindere, conținutul se reconfigurează fluid prin `SidebarInset` sau o soluție echivalentă;
- headline-ul și coloana de lectură nu sunt acoperite;
- lățimea de lectură rămâne în limitele sistemului tipografic.

Între aproximativ `1024px` și `1279px`:

- rail-ul poate rămâne doar ca trigger compact;
- meniul extins apare ca panou `floating` sau `offcanvas`;
- pagina nu este comprimată sub limita de lizibilitate.

Sub aproximativ `1024px`:

- rail-ul permanent dispare;
- informația lui este integrată în `Sheet`-ul mobil;
- butonul `În această pagină` poate deschide direct grupul de ancore locale.

Breakpoints finale se aliniază cu proiectul existent după audit. Valorile de mai sus descriu comportamentul, nu obligă agentul să introducă praguri aproape identice dacă proiectul are unele coerente.

## 6. Ce afișează rail-ul

Rail-ul are două niveluri de conținut:

### Nivel global

Iconurile pot oferi acces rapid la:

- Acasă;
- Program;
- Cum învățăm;
- Experiențe;
- Cercetare;
- Instrumente;
- Dezvoltare.

Aceste destinații funcționează ca hartă a ecosistemului. Header-ul păstrează etichetele principale și traseul rapid; rail-ul arată relațiile și substructura.

### Nivel contextual

După selectarea unei zone sau pe o pagină lungă, panoul extins arată:

- secțiunile paginii;
- subpaginile relevante;
- poziția curentă;
- următoarea destinație logică;
- relația cu programul, metoda ori publicul.

Nivelul contextual are prioritate față de repetarea integrală a meniului global.

## 7. Corectarea discretă a perspectivei

Navigarea oferă o cale secundară prin care utilizatorul poate ajunge la perspectiva potrivită fără să fie întrerupt și fără să i se afișeze o clasificare.

Controlul:

- poate apărea în Explorer Rail extins, în `MobileNavigationSheet` sau în footer;
- folosește o formulare discretă precum `Cauți altceva?` sau `Vezi EZPLAY pentru...`;
- oferă legături către tineri, părinți, educatori și organizații;
- nu ocupă poziția CTA-ului principal și nu intră ca item dominant în header;
- nu este modal, banner persistent, toast repetat ori popover declanșat automat;
- nu afișează lentila activă drept identitate, scor sau probabilitate;
- rămâne complet utilizabil cu tastatura și pe mobil;
- poate furniza un semnal puternic pentru sesiunea curentă conform [`../adaptive-editorial-lenses.md`](../adaptive-editorial-lenses.md).

Până la aprobarea unei rute pentru educatori, legătura folosește destinația comună relevantă, fără să introducă o rută nouă în sitemap.

## 8. Unde apare

### Explorer Rail complet

Este parte din compoziția implicită pentru:

- `/`;
- `/program`;
- `/how-we-learn`;
- `/experiences`;
- `/research`;
- `/tools`;
- `/development`.

Aceste pagini trebuie să transmită explicit amploarea sistemului EZPLAY și au suficientă structură pentru a justifica explorarea laterală.

### Explorer Rail contextual, implicit colapsat

Este folosit pentru:

- `/for/young-people`;
- `/for/parents`;
- `/for/organizations`;
- `/about`.

Pe aceste pagini, meniul extins prioritizează ancorele locale și maximum trei destinații conexe. Nu expune întreaga arhitectură dacă aceasta distrage de la publicul paginii.

### Fără Explorer Rail persistent

Nu apare pe:

- `/experiences/introduction`;
- `/contact`;
- `/platform`;
- login, register și callback-uri de autentificare;
- pagini juridice;
- Deckbuilder-ul de la `/ezplay`;
- alte suprafețe aplicative cu propriul app shell.

Acestea sunt fluxuri focalizate. Header-ul, breadcrumb-ul, butonul de revenire sau app shell-ul propriu oferă orientarea necesară.

## 9. Componente shadcn/ui

Agentul verifică versiunea instalată și folosește, unde sunt disponibile:

- `SidebarProvider`;
- `Sidebar`;
- `SidebarHeader`;
- `SidebarContent`;
- `SidebarGroup`;
- `SidebarMenu`;
- `SidebarMenuItem`;
- `SidebarMenuButton`;
- `SidebarFooter`;
- `SidebarTrigger`;
- `SidebarInset`;
- `Collapsible` pentru grupuri;
- `Tooltip` pentru rail-ul colapsat;
- `Sheet` pentru mobil și viewport-uri intermediare;
- `ScrollArea` numai dacă meniul extins depășește viewport-ul.

Direcția recomandată este `collapsible="icon"`, adaptată la top header și la token-urile EZPLAY. Componenta shadcn este o fundație de comportament, nu designul final.

Referință: `https://ui.shadcn.com/docs/components/radix/sidebar`.

## 10. Componente proprii

### `TopHeader`

Navigarea globală, limba și intrarea în platformă.

### `ExplorerRail`

Orchestrează starea colapsat/extins, nivelul global și nivelul contextual.

### `ExplorerRailTrigger`

Buton vizibil, cu `aria-expanded`, stare de focus și explicație accesibilă.

### `ExplorerIconItem`

Icon, etichetă, tooltip, stare activă și traseu asociat.

### `ExplorerPanel`

Conținutul extins: grupuri, subpagini, ancore și relații.

### `ActiveTrace`

Traseul care leagă trigger-ul, destinația activă și secțiunea selectată.

### `PageProgressTrace`

Indicator discret de progres și poziție în paginile lungi. Nu înlocuiește scrollbar-ul și nu cere precizie numerică.

### `MobileNavigationSheet`

Combină navigarea globală și contextuală în grupuri, fără rail permanent.

## 11. Motion și efecte

### `RailExpand`

- durată orientativă `180–280ms`;
- lățimea și poziția se schimbă prin layout animation;
- etichetele apar după ce panoul are suficient spațiu;
- conținutul principal se reconfigurează fără salt;
- starea poate fi întreruptă de utilizator.

### `ActiveTraceMove`

- indicatorul activ se deplasează prin `layoutId`;
- traseul se scurtează sau se prelungește către itemul selectat;
- selecția rămâne identificabilă și fără animație.

### `SectionSync`

- secțiunea activă se actualizează la scroll;
- eticheta și traseul se schimbă discret;
- nu se schimbă URL-ul la fiecare pixel de scroll;
- click-ul pe o ancoră actualizează hash-ul numai dacă ajută distribuirea și revenirea.

### `ConnectorReveal`

- la deschiderea unui grup se desenează o singură conexiune scurtă;
- nu se animează simultan toate liniile;
- efectul confirmă ierarhia, nu decorează golul.

### `ArtifactSignal`

- un singur `ComponentArtifact` poate marca deschiderea ori o destinație importantă;
- are maximum o pulsație scurtă;
- nu există loop permanent și nici glow neon.

Motion folosește `motion/react`, în principal `layout`, `layoutId`, `AnimatePresence` și `MotionConfig reducedMotion="user"`.

## 12. Stil vizual

Rail-ul:

- folosește suprafețele luminoase și calde ale site-ului;
- este separat de canvas printr-o linie structurală fină;
- poate continua rar un traseu din `SystemField`;
- nu are aspect dark-tech;
- nu folosește iconuri într-o coloană neagră generică;
- nu pare bara unui IDE sau a unui panou de administrare;
- folosește maximum un `ComponentArtifact` vizibil simultan;
- păstrează spațiu și ritm, chiar dacă dezvăluie multe destinații.

Complexitatea trebuie să provină din ierarhie, relații, schimbări de stare și continuitate vizuală — nu din înghesuirea tuturor linkurilor.

## 13. Accesibilitate

- deschiderea și închiderea funcționează cu click, Enter și Space;
- trigger-ul expune `aria-expanded` și relația cu panoul;
- Escape închide varianta overlay sau floating;
- focusul nu este prins în varianta desktop inset, dar este gestionat în `Sheet`;
- toate iconurile interactive au etichete accesibile;
- tooltip-ul completează eticheta, nu este singura sursă semantică;
- ordinea de tab urmează ordinea vizuală;
- secțiunea activă folosește `aria-current` unde este potrivit;
- focus-visible rămâne clar pe orice suprafață;
- cu reduced motion, rail-ul își schimbă starea fără deplasări ample;
- pagina rămâne complet navigabilă dacă JavaScript-ul de motion nu se încarcă.

## 14. Persistența stării

- preferința colapsat/extins poate fi păstrată în sesiunea curentă;
- starea nu se salvează în cont înainte să existe un motiv real;
- la intrarea într-o pagină fără rail, layout-ul revine la varianta focalizată;
- revenirea într-o pagină eligibilă poate restaura alegerea din sesiune;
- schimbarea limbii păstrează, pe cât posibil, starea rail-ului și pagina curentă.

## 15. Criterii de acceptare

Sistemul este acceptat când:

- header-ul orizontal și rail-ul vertical coexistă fără să concureze;
- utilizatorul poate înțelege site-ul și fără să deschidă rail-ul;
- rail-ul extins face vizibilă profunzimea reală a EZPLAY;
- iconurile colapsate sunt inteligibile prin etichete și tooltip-uri;
- conținutul nu este acoperit sau comprimat excesiv;
- paginile focalizate nu primesc rail doar pentru consistență decorativă;
- starea activă se sincronizează corect cu ruta și secțiunea;
- mobilul primește aceeași informație într-un `Sheet` coerent;
- tastatura, focusul și reduced motion funcționează;
- versiunea și selectorul RO/EN rămân accesibile;
- corectarea perspectivei este disponibilă discret, fără să concureze cu navigarea globală sau CTA-ul principal;
- sistemul arată ca o extensie a identității EZPLAY, nu ca o temă shadcn sau un dashboard SaaS.

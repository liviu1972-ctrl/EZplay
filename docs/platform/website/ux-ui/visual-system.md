---
status: Draft
version: "0.3"
updated: 2026-07-17
---

# Sistemul vizual EZPLAY pentru website

## Concept

Sistemul vizual pornește de la o idee funcțională:

> **EZPLAY face sistemele vizibile și deciziile tangibile.**

Compania este reprezentată ca o hartă vie:

- traseele arată conexiuni și consecințe;
- modulele arată componente ale sistemului;
- culorile diferențiază funcții și stări;
- componentele speciale creează puncte de interes și sugerează roluri diferite;
- obiectele reale arată că experiența nu este doar digitală.

## Formula de dozaj

### 70% — Canvas editorial

- suprafețe luminoase;
- tipografie clară;
- spațiu calm;
- conținut și dovezi;
- ritm de lectură.

### 20% — Sistem conectat

- trasee;
- module;
- diagrame;
- animații cauză–efect;
- hărți și progresii.

### 10% — Energie tactilă

- cărți;
- token-uri;
- culorile logo-ului;
- obiecte fizice;
- componente speciale;
- fotografie reală.

Aceste procente sunt principii de compoziție, nu valori de măsurat în CSS.

## Personalitatea vizuală

### Trebuie să fie

- luminoasă;
- inteligentă;
- construită;
- curioasă;
- tactilă;
- contemporană;
- clară;
- energică prin detalii;
- serioasă fără rigiditate.

### Nu trebuie să fie

- cyberpunk;
- dark-tech;
- corporate enterprise;
- școlărească;
- infantilă;
- skeuomorphică;
- supraîncărcată cu circuite;
- dependentă de randări 3D;
- o reproducere a cutiei jocului.

## Paleta

### Culorile de brand existente

Aceste culori provin din logo-ul SVG inspectat. Ele sunt păstrate ca accente de brand:

| Token | Valoare | Rol inițial |
|---|---:|---|
| `brand-yellow` | `#FEBD00` | activare, energie, highlight |
| `brand-orange` | `#F26F35` | acțiune, decizie, accent cald |
| `brand-green` | `#8FC74A` | progres, confirmare contextuală |
| `brand-teal` | `#2D93A7` | conexiune, structură, trasee |
| `brand-sky` | `#55BFE5` | explorare, explicație, date |
| `brand-charcoal` | `#373435` | ancoră, text, contrast |

Asocierea acestor culori cu Strategy, Product, Market, Operations și Finance nu este decisă. Agentul nu face această asociere în cod, nume de token sau conținut înaintea deciziei canonice.

### Neutre recomandate

| Token | Valoare | Utilizare |
|---|---:|---|
| `canvas` | `#F7F3EA` | fundal general cald |
| `surface` | `#FFFDF8` | carduri și zone de lectură |
| `surface-soft` | `#F0E9DD` | diferențiere de secțiuni |
| `surface-strong` | `#E4DACB` | panouri, selecții, stări active discrete |
| `ink` | `#252422` | text principal și CTA principal |
| `ink-brand` | `#373435` | alternativă apropiată de identitate |
| `ink-muted` | `#5E5A54` | text secundar accesibil |
| `line` | `#D7D0C2` | borduri și separatoare |
| `line-strong` | `#AAA294` | borduri pentru controale |
| `white` | `#FFFFFF` | text invers și suprafețe speciale |

### Variante funcționale

| Token | Valoare | Utilizare |
|---|---:|---|
| `interactive` | `#252422` | buton principal, link puternic |
| `interactive-hover` | `#373435` | hover pentru suprafețe închise |
| `focus` | `#176B78` | focus ring, link accesibil, stare selectată |
| `danger` | `#B64233` | erori și acțiuni distructive |
| `warning` | `#8B5C00` | avertismente pe fundal deschis |
| `success` | `#326A29` | confirmare textuală |

### Reguli de contrast

- textul normal folosește `ink` sau `ink-muted` pe suprafețe luminoase;
- `brand-yellow`, `brand-green` și `brand-sky` folosesc text `ink`, nu alb;
- `brand-orange` poate folosi `ink` pentru text normal;
- `brand-teal` nu se folosește ca fundal pentru text normal alb sau închis fără verificare, deoarece contrastul este insuficient la dimensiuni mici;
- `focus` poate folosi text alb;
- culorile de brand nu transmit singure o stare sau categorie;
- CTA-ul principal este închis la culoare, nu curcubeu și nu gradient.

## Distribuția culorii

- 70–80% neutre luminoase;
- 10–15% charcoal și text;
- 5–10% accente de brand;
- maximum două culori de brand dominante într-un viewport;
- spectrul complet apare numai în logo, hărți de sistem și momente de sinteză.

Nu se folosește gradient multicolor în spatele textului. Gradientele admise sunt foarte discrete, construite dintr-o singură familie cromatică sau folosite în trasee active.

## Mod întunecat

Website-ul public nu pornește cu dark mode. Suprafețele întunecate pot apărea local pentru:

- demonstrația unui instrument digital;
- o secțiune de tranziție;
- CTA-ul final;
- o diagramă în care culorile trebuie să lumineze trasee.

Ele nu depășesc aproximativ 15–20% dintr-o pagină și folosesc:

- fundal `#252422`;
- suprafață `#373435`;
- text `#FFFDF8`;
- accente de brand controlate.

## Tipografie

### Direcție recomandată

#### Heading și UI — Manrope

Rol:

- headline-uri;
- titluri;
- navigare;
- butoane;
- etichete;
- numere importante.

Caracter:

- geometric, dar mai cald decât Inter;
- contemporan;
- suficient de distinct pentru brand;
- potrivit pentru titluri mari și forme modulare.

#### Corp — Source Sans 3

Rol:

- paragrafe;
- formulare;
- explicații;
- cercetare;
- descrieri și microcopy.

Caracter:

- humanist;
- foarte lizibil;
- potrivit pentru texte educaționale lungi;
- nu produce estetica de produs pentru programatori.

Ambele trebuie încărcate prin `next/font` sau local, după verificarea licenței și a setului de caractere. Înainte de aprobarea finală se testează explicit diacriticele românești `ă â î ș ț` în toate greutățile folosite.

### Ce nu folosim

- font monospace ca limbaj dominant;
- uppercase pentru paragrafe sau titluri mari;
- mai mult de două familii de font;
- greutăți foarte subțiri;
- text italic pentru informație esențială;
- font „jucăuș” sau handwritten;
- text condensat pentru corp.

### Scară recomandată

| Stil | Desktop | Mobil | Line height | Greutate |
|---|---:|---:|---:|---:|
| Display hero | `clamp(3.5rem, 6vw, 5.5rem)` | `clamp(2.7rem, 12vw, 4rem)` | `0.98–1.04` | 600 |
| H1 pagină | `clamp(3rem, 5vw, 4.5rem)` | `2.5–3.25rem` | `1.02–1.08` | 600 |
| H2 | `clamp(2.25rem, 3.5vw, 3.5rem)` | `2–2.5rem` | `1.08–1.14` | 600 |
| H3 | `1.75–2.25rem` | `1.5–1.8rem` | `1.15–1.2` | 600 |
| Lead | `1.25–1.5rem` | `1.15–1.25rem` | `1.45` | 400 |
| Body | `1.0625–1.125rem` | `1rem–1.0625rem` | `1.6–1.7` | 400 |
| Small | `0.875–0.9375rem` | `0.875rem` | `1.45` | 400/600 |
| Eyebrow | `0.75–0.8125rem` | `0.75rem` | `1.2` | 700 |

### Lățimi de lectură

- headline hero: maximum 14–18 caractere medii pe rând;
- headline secțiune: maximum 20–24 caractere medii pe rând;
- paragraf principal: maximum 62–72 caractere pe rând;
- paragrafe în card: maximum 45–58 caractere pe rând;
- textele lungi de cercetare: coloană de 680–760 px.

Nu se micșorează fontul pentru a forța copywriting-ul într-o componentă prea îngustă.

## Grid și layout

### Container

- canvasul paginii publice este boxed, centrat și are lățimea maximă de `1440px`;
- lățime maximă generală: `1360px`;
- gutter desktop: `32–48px`;
- gutter tabletă: `24–32px`;
- gutter mobil: `18–24px`;
- conținutul nu atinge marginea viewport-ului;
- la ecrane foarte late, suprafața exterioară rămâne vizibilă în jurul canvasului, iar conținutul rămâne limitat;
- canvasul este separat discret de suprafața exterioară prin borduri laterale și o umbră fină.

### Grid

- desktop: 12 coloane;
- tabletă: 8 coloane;
- mobil: 4 coloane;
- gap desktop: `24–32px`;
- gap mobil: `16–20px`.

### Shell cu header și Explorer Rail

Pe paginile stabilite în `navigation-system.md`, gridul funcționează în interiorul unui shell cu două axe de navigare:

- header orizontal global, conform [sistemului de navigare](navigation-system.md);
- `ExplorerRail` vertical în stânga, sub header și în afara canvasului boxed;
- canvas editorial boxed definit în secțiunea `Container`, într-o zonă echivalentă cu `SidebarInset`;
- rail colapsat aproximativ `72–88px`;
- rail extins aproximativ `288–320px`;
- extinderea reconfigurează canvasul pe desktop larg și devine floating/offcanvas înainte ca textul să fie comprimat;
- containerul editorial își păstrează lățimea maximă și măsura de lectură indiferent de starea rail-ului.

Rail-ul folosește aceleași suprafețe, borduri, porturi, trasee și reguli de culoare ca restul site-ului. Nu primește o temă întunecată de dashboard și nu devine o coloană generică de iconuri.

În starea colapsată, traseul activ și iconurile produc ritm vertical. În starea extinsă, spațiul suplimentar este folosit pentru ierarhie, explicații scurte și subnavigare, nu pentru decor sau carduri înghesuite.

### Spațiere verticală

| Context | Desktop | Tabletă | Mobil |
|---|---:|---:|---:|
| Între secțiuni majore | `112–160px` | `88–120px` | `64–88px` |
| Interior secțiune | `56–88px` | `48–72px` | `36–56px` |
| Între heading și lead | `20–28px` | `18–24px` | `16–20px` |
| Între paragrafe | `16–24px` | `16–20px` | `14–18px` |

Hero-ul poate avea minimum `680px` pe desktop, dar nu este obligat la `100vh`. Pe mobil înălțimea este determinată de conținut.

## Forme și suprafețe

### Colțuri

- control mic: `10–12px`;
- card: `16–20px`;
- panou major: `24–32px`;
- pill se folosește numai pentru status, filtru sau selector, nu pentru toate butoanele.

EZPLAY nu folosește colțuri tăiate pe fiecare componentă. Identitatea apare prin porturi, trasee și module, nu printr-un artificiu repetat până devine zgomot.

### Borduri

- 1 px `line` pentru structură;
- 1.5–2 px numai pentru stare activă sau focus;
- bordura poate fi întreruptă de un mic `connector port` decorativ;
- nu se trasează rame în jurul fiecărei secțiuni a paginii.

### Umbre

- suprafețe editoriale: fără umbră sau umbră foarte discretă;
- element tactil: umbră scurtă, difuză, caldă;
- dialog/sheet: umbră funcțională mai puternică;
- nu se folosesc glow-uri neon;
- nu se folosesc umbre 3D dure inspirate direct din randările cutiei.

### Textură

Poate exista un grain foarte fin sau o fibră abia perceptibilă pe suprafețe speciale, la opacitate sub 3–4%. Nu se aplică textură în spatele textelor lungi și nu se simulează lemn pe întreaga pagină.

## Limbajul „sistemului viu”

### 1. `SystemField`

Fundal vizual format din trasee rare și spațiu liber.

Reguli:

- SVG, nu imagine raster repetată;
- opacitate uzuală `0.06–0.12`;
- stroke `1–1.5px`;
- maximum 15–20% din suprafață ocupată vizual;
- nu trece prin text;
- traseele pornesc sau se termină în module reale;
- poate continua subtil între două secțiuni pentru a sugera relația.

### 2. `TraceLine`

Traseu care leagă două concepte sau arată propagarea unei decizii.

Poate avea:

- stare inactivă neutră;
- stare activă colorată;
- sens indicat prin mișcare rară sau marker;
- etichetă accesibilă în diagramă;
- desenare progresivă atunci când explică un proces.

Nu se animează permanent toate traseele.

### 3. `ModuleNode`

Formă inspirată din modulele triunghiulare ale logo-ului.

Roluri:

- categorie;
- etapă;
- alegere;
- stare;
- piesă dintr-un sistem mai mare.

Modulele pot forma structuri noi, dar logo-ul oficial nu este dezasamblat sau reinterpretat ca animație fără o variantă aprobată.

### 4. `ComponentArtifact`

Componentă specială inspirată de CPU, condensator, senzor, comutator, punte sau rezervor.

Ce produce:

- întrerupe ritmul repetitiv;
- creează un punct de descoperire;
- sugerează o funcție specifică;
- face suprafața tactilă;
- oferă personalitate sistemului.

Reguli:

- maximum 1–3 componente speciale pe o pagină publică;
- stil propriu EZPLAY, nu iconografie hardware realistă generică;
- poate combina ceramică, metal mat, carton sau lemn ca inspirație materială;
- nu primește text tehnic fals;
- nu devine element principal în fiecare hero;
- poate fi pur decorativ sau poate explica o funcție;
- dacă este interactiv, trebuie să aibă alternativă accesibilă.

Familii vizuale posibile:

- `Core` — nucleu sau sinteză;
- `Sensor` — observare și piață;
- `Bridge` — legătura dintre două zone;
- `Switch` — alegere și schimbare de direcție;
- `Reservoir` — resurse și capacitate;
- `Amplifier` — efect multiplicat;
- `Memory` — reflecție și învățare acumulată.

Aceste nume sunt denumiri interne de design, nu concepte educaționale publice.

Pentru prima versiune, aceste componente sunt opționale și se construiesc numai ca forme simple în SVG/CSS dacă ajută o compoziție deja implementată. Nu se creează o bibliotecă 3D și nu se condiționează lansarea de generarea unor active vizuale noi.

## Fotografie și imagini

### Decizia pentru prima versiune

Prima versiune nu este blocată de o ședință foto sau de producția unor imagini AI. Se folosesc, în această ordine:

1. layout, tipografie, culoare și spațiu;
2. diagrame și trasee construite în React/SVG/CSS;
3. logo-ul și activele reale deja disponibile;
4. imaginile reale ale cărților din Supabase Storage, numai unde au un rol clar.

Fotografiile și imaginile suplimentare se decid punctual după evaluarea paginilor implementate. Lipsa unei imagini nu se acoperă cu un placeholder decorativ sau cu o scenă generată generic.

### Prioritate

1. participanți care iau decizii;
2. mâini, cărți și obiecte în folosire;
3. facilitatorul și conversația;
4. masa și sistemul complet;
5. detalii ale componentelor reale;
6. portrete ale oamenilor implicați.

### Stil

- lumină naturală sau caldă;
- cadre autentice, nu stock;
- energie concentrată, nu zâmbete regizate;
- diversitate reală a participanților;
- top-down pentru explicarea sistemului;
- close-up pentru decizie și materialitate;
- fundaluri neutre;
- culorile cărților rămân vizibile.

### Ce nu se publică

- fotografii cu minori fără acorduri potrivite;
- randări AI prezentate drept sesiuni reale;
- imagini cu texte sau reguli incorecte;
- mockup-uri care arată produse inexistente;
- logo-uri de parteneri fără permisiune;
- fotografii stock generice cu „copii la școală”.

### Până există fotografie suficientă

Se folosesc:

- diagrame proprii;
- compoziții cu imaginile reale ale cărților din Supabase Storage;
- fotografii reale ale materialelor fizice, după selecție;
- forme modulare și componente grafice;
- stări de tip `asset pending` numai în prototip, nu în producție.

## Iconografie

`lucide-react` este folosit pentru acțiuni și navigare:

- săgeți;
- meniu;
- închidere;
- limbă;
- autentificare;
- link extern;
- informație;
- succes și eroare;
- expandare;
- controale carousel.

Conceptele centrale EZPLAY nu sunt reprezentate numai prin iconuri Lucide generice. Cele cinci perspective, Founder Loop și sistemul companiei primesc simboluri sau diagrame proprii.

Reguli:

- stroke uzual `1.75–2px`;
- dimensiuni UI: 18, 20 și 24 px;
- iconurile decorative au `aria-hidden`;
- un icon fără text trebuie să aibă nume accesibil și tooltip când sensul nu este universal;
- nu se importă pachetul complet dinamic dacă o listă explicită este suficientă.

## Butoane și linkuri

### Primary

- fundal `ink`;
- text `surface`;
- icon `ArrowRight` opțional;
- înălțime 48–52 px;
- fără gradient;
- hover: fundal `ink-brand`, deplasare a săgeții 2–3 px;
- active: scale maximum `0.985` sau coborâre 1 px.

### Secondary

- fundal transparent sau `surface`;
- border `line-strong`;
- text `ink`;
- hover: `surface-soft` și traseu colorat discret.

### Tertiary

- text și icon;
- underline sau linie animată;
- target tactil complet, nu numai textul vizual.

### Accent

O variantă colorată poate fi folosită rar pentru un CTA contextual, cu contrast verificat. Nu înlocuiește Primary global.

## Carduri

Sistemul nu folosește un singur card universal.

### `EditorialCard`

- titlu, text, link;
- suprafață calmă;
- fără icon obligatoriu;
- folosit pentru idei, rezultate și principii.

### `SystemCard`

- are porturi și trasee;
- arată relația cu alte componente;
- folosit în perspective, Founder Loop și arhitectura programului.

### `TactileCard`

- include fotografie sau obiect;
- poate avea umbră discretă și ușoară rotație controlată;
- folosit pentru instrumente și experiențe.

### `EvidenceCard`

- tip sursă;
- rezumat;
- relevanță;
- limită;
- link extern;
- aspect editorial, nu card comercial.

### `StatusCard`

- status disponibil / în dezvoltare / direcție viitoare;
- statusul este text și formă, nu doar culoare;
- folosit în platformă și dezvoltare.

### `AudienceCard`

- vorbește direct unui rol;
- are o întrebare sau rezultat, nu o fotografie stock;
- folosește o componentă specială discretă;
- CTA unic.

## Formulare

- suprafață luminoasă distinctă;
- label permanent deasupra câmpului;
- placeholder numai ca exemplu;
- help text înainte de eroare;
- eroare sub câmp și sumar de erori la formulare lungi;
- câmpurile condiționate apar fără salt violent de layout;
- indicator clar pentru opțional;
- consimțământul nu este bifat implicit;
- butonul arată loading fără să își schimbe drastic lățimea;
- confirmarea succesului înlocuiește formularul sau apare într-un panou clar;
- datele rămân în formular la eroare.

## Footer

Footer-ul trebuie să susțină impresia de ecosistem matur:

- logo și formulă scurtă;
- navigare în patru coloane conform blueprintului;
- limbă;
- contact confirmat;
- linkuri juridice numai când există;
- stare a proiectului;
- CTA discret către dezvoltare;
- o singură compoziție `SystemField` care închide traseele paginii.

Nu se umple footer-ul cu rețele sociale inexistente sau linkuri placeholder.

## Reguli pentru logo

- se folosește SVG-ul oficial, nu recrearea din imaginile generate;
- varianta full-color apare pe suprafețe calme;
- trebuie să existe variantă monocromă pentru suprafețe complexe;
- clear space minimum egal cu înălțimea unui modul din simbol;
- nu se aplică bevel, glow sau textură în UI;
- animația logo-ului nu este obligatorie;
- dacă se dezvoltă o animație, ea trebuie aprobată ca activ de brand separat.

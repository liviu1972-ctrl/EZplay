---
status: Draft
version: "0.1"
updated: 2026-07-16
canonical_for:
  - rights and provenance inventory
  - third-party attribution inventory
---

# Registrul de drepturi, proveniență și atribuiri EZPLAY

## Rol și limită

Acest document inventariază originea cunoscută, utilizarea planificată și verificările necesare pentru conținutul public EZPLAY.

Este un instrument operațional, nu o opinie juridică. Câmpurile neconfirmate rămân neconfirmate. Registrul nu acordă licențe și nu dovedește singur titularul unui drept.

Auditul inițial a pornit din workspace-ul de documentație. După unificare, codul și activele din `src/`, `public/`, `assets/`, Supabase Storage sau alte stocări trebuie inventariate înainte de publicare.

## Stările drepturilor

- `Origine documentată` — sursa de lucru este identificată, dar pot rămâne verificări juridice;
- `Permisiune verificată` — există un acord identificabil și aplicabil utilizării propuse;
- `Licență verificată` — licența și obligațiile sale au fost verificate pentru utilizarea concretă;
- `Numai referință` — materialul informează munca, dar nu se copiază și nu se publică drept activ EZPLAY;
- `De confirmat` — titularul, licența, proveniența sau permisiunea nu sunt suficiente;
- `Blocat` — materialul nu poate fi publicat în forma propusă.

## Reguli generale

1. „Disponibil pe internet” nu înseamnă „liber de reutilizat”.
2. O trimitere bibliografică și un rezumat propriu sunt tratate diferit de copierea unui text, tabel, grafic sau imagini.
3. Un logo, o fotografie, un testimonial și o filmare necesită verificarea drepturilor și a permisiunii persoanelor sau organizațiilor implicate.
4. Pentru minori, existența unei fotografii nu dovedește consimțământul valabil pentru publicarea pe site.
5. Fonturile, iconurile, bibliotecile și activele generate ori cumpărate se verifică pentru utilizarea web, modificare, distribuție și atribuire.
6. Materialele de referință vizuală nu se transformă prin copiere într-un activ EZPLAY.
7. Fiecare activ public primește un ID de drepturi înainte de intrarea în implementare.

## Registrul inițial

| ID | Material sau categorie | Proveniență cunoscută | Utilizare planificată | Stare | Ce lipsește / acțiune |
|---|---|---|---|---|---|
| `RIGHT-001` | Copywriting-ul românesc din `docs/platform/website/pages/` | dezvoltat în workspace-ul EZPLAY din sursele interne | text public al site-ului | Origine documentată | Confirmarea responsabilului editorial și păstrarea istoricului Git; verificarea afirmațiilor prin harta de dovezi. |
| `RIGHT-002` | Traducerea engleză a site-ului | nu există încă în acest workspace | versiunea EN | De confirmat | Identificarea traducătorului sau procesului, revizie umană și aceeași trasabilitate ca versiunea RO. |
| `RIGHT-003` | Numele `EZPLAY` și headline-ul `WHERE FUTURE FOUNDERS START` | documente canonice interne | identitate publică | Origine documentată | Verificarea separată a mărcii, teritoriilor și claselor relevante înaintea unor afirmații de exclusivitate. |
| `RIGHT-004` | Logo-ul EZPLAY | inventarul menționează surse grafice și un export SVG verificat în alt context; fișierul nu este prezent aici | header, footer, materiale publice | De confirmat | Localizarea fișierului sursă, autorului, versiunii și lanțului de drepturi; atașarea exportului verificabil. |
| `RIGHT-005` | Fișiere CorelDRAW și exporturi ale jocurilor | directoarele `assets/` descriu structura, dar auditul curent nu a găsit activele efective în workspace | jocuri, print și imagini de produs | De confirmat | Inventar fișier cu fișier, autor, versiune, sursă editabilă și exporturi; verificarea elementelor terțe incluse. |
| `RIGHT-006` | Imaginile cărților din aplicația existentă | `public/`, codul aplicației sau stocare externă, încă neauditate complet | Card Browser și prezentarea jocului | De confirmat | Audit în repository-ul unificat și în stocarea folosită: proveniență, autor, licență, variantă, drept de publicare și relația cu sursa `.cdr`. |
| `RIGHT-007` | Cele 12 surse de cercetare | autori, editori și instituții externe identificați în registrul de surse | referințe, linkuri și rezumate proprii | Numai referință | Nu se copiază figuri, tabele, imagini sau pasaje lungi; orice utilizare suplimentară cere verificarea drepturilor. |
| `RIGHT-008` | Rezumatele și analiza EZPLAY ale surselor | redactate în `docs/research/product/` | carduri publice și documentație internă | Origine documentată | Păstrarea relevanței și limitei; verificare editorială înainte de publicare. |
| `RIGHT-009` | Documentația tehnică Next.js, shadcn/ui, Motion, Lucide și Embla | site-urile oficiale sunt folosite ca referințe | ghid de implementare | Numai referință | Licența fiecărei dependențe se verifică în `package.json`, lockfile și sursele oficiale; documentația nu se copiază ca text public. |
| `RIGHT-010` | Boundaryless | menționat ca reper de direcție în specificația UX/UI | inspirație de poziționare și experiență | Numai referință | Nu se copiază layout, copy, imagini, identitate sau active; orice asemănare concretă se revizuiește înainte de implementare. |
| `RIGHT-011` | Fonturile site-ului | încă nealese sau neverificate pentru implementarea finală | tipografie web | De confirmat | Licența web, greutățile, subseturile, auto-găzduirea și obligațiile de atribuire. |
| `RIGHT-012` | Iconuri și ilustrații UI | sistemul propune Lucide și active construite controlat | interfața publică | De confirmat | Confirmarea bibliotecii efectiv folosite, versiunii și licenței; inventarierea ilustrațiilor separate. |
| `RIGHT-013` | Fotografii și video din sesiuni | nu au fost identificate fișiere și permisiuni utilizabile în acest workspace | pagini About, experiențe, rezultate | Blocat | Nu se publică înaintea inventarului, consimțământului și intrării în registrul de permisiuni. |
| `RIGHT-014` | Testimoniale și citate ale participanților | nu există corpus verificat cu permisiuni | încredere și rezultate | Blocat | Text exact, autor sau anonimizare, context, permisiune, scop și perioadă de folosire. |
| `RIGHT-015` | Nume și logo-uri de școli, ONG-uri, companii sau parteneri | unele organizații sunt menționate ca istoric posibil, fără acord documentat | cronologie, parteneri, studii de caz | Blocat | Confirmare factuală și permisiune explicită pentru nume, logo și descrierea relației. |
| `RIGHT-016` | Rezultate, clasamente și date din sesiuni | observații retrospective în inventar | cercetare și comunicare | De confirmat | Reconcilierea datelor, anonimizare, metodă și drept de publicare; fără rezultate individuale ale minorilor. |
| `RIGHT-017` | Contribuții viitoare ale comunității | procesul și termenii nu există încă | carduri, reguli, traduceri, cercetare, cod | Blocat | Termeni de contribuție, autor, licență acordată, atribuire, posibilitatea retragerii și proces de acceptare. |
| `RIGHT-018` | Codul platformei existente | `src/`, `supabase/`, `scripts/` și istoricul Git al repository-ului unificat | implementarea site-ului și jocului digital | De confirmat | Auditul licențelor dependențelor, autorilor, contribuțiilor și activelor înainte de lansare ori deschidere. |

## Registrul atribuirilor publice

În versiunea actuală nu a fost identificat niciun activ terț aprobat care să necesite deja o atribuire publică în footer sau într-o pagină `Credits`.

Sursele de cercetare vor fi atribuite în cardurile bibliotecii `/research`. Atribuirea lor nu autorizează reproducerea textului integral sau a materialelor vizuale.

Când apare primul activ terț publicabil, se adaugă aici:

| ID drepturi | Creator / titular | Material | Licență sau permisiune | Textul exact al atribuirii | Locul afișării | Verificat la |
|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — |

## Porțile de publicare

Un activ nu intră pe site până când:

- fișierul și versiunea sunt identificabile;
- proveniența și autorul sunt documentate;
- utilizarea propusă este acoperită de drepturi sau permisiune;
- obligațiile de atribuire sunt cunoscute;
- permisiunea poate fi retrasă sau actualizată în mod controlat, dacă natura ei o cere;
- pentru persoane și organizații există legătura cu registrul de permisiuni;
- implementarea nu expune fișiere sursă sau metadate care nu trebuie publicate.

## Ce necesită revizuire specializată

- alegerea și formularea licențelor EZPLAY;
- statutul și protecția mărcii;
- termenii de utilizare ai platformei;
- politica de confidențialitate și cookies;
- conturile, consimțământul și datele minorilor;
- termenii pentru contribuțiile comunității;
- acordurile comerciale și de facilitare;
- formularele și durata de păstrare a permisiunilor media.

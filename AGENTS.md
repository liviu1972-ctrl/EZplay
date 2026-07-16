# Reguli globale de lucru — EZPLAY

Acest fișier se aplică întregului repository. Fișierele `AGENTS.md` din subdirectoare adaugă reguli mai specifice și au prioritate numai în aria lor.

## 1. Autoritate și decizii

- Utilizatorul este Product Owner și decidentul final.
- Agenții pot propune soluții, dar nu transformă unilateral o alegere de implementare într-o decizie de produs.
- Necesită aprobare explicită schimbările de definiție, scope, poziționare, sitemap, publicuri, ofertă, CTA major, acces al minorilor, autentificare publică, terminologie canonică, formule economice, licențiere sau roadmap.
- Regula de bază este: vezi întregul proiect, modifică numai ce autorizează taskul.

## 2. Repository și flux Git

- Repository canonic: `https://github.com/liviu1972-ctrl/EZplay`.
- `main` reprezintă versiunea acceptată și publicabilă.
- `dev` reprezintă integrarea curentă.
- Schimbările ample se fac pe branch separat, pornit din baza confirmată de utilizator.
- Înainte și după lucru, confirmă calea, branch-ul și `git status --short --branch`.
- Nu schimba remote-uri, nu rescrie istoricul, nu folosi force-push și nu șterge branch-uri fără aprobare explicită.
- Nu face checkout pe `main`, merge în `main` sau push fără cererea explicită a utilizatorului.
- Adaugă în Git numai fișierele taskului și păstrează modificările existente ale utilizatorului.
- Nu muta sau șterge în masă înainte de inventar, hartă aprobată și verificarea căii absolute.
- Agenții lucrează secvențial în același working tree, dacă utilizatorul nu stabilește explicit alt flux.

## 3. Ierarhia surselor

Sursele răspund la întrebări diferite:

- definiție și scope → `docs/context/what-is-ezplay.md`;
- poziționare și voce → `docs/context/brand-positioning.md`;
- viziune → `docs/context/ezplay-vision.md`;
- formule și terminologie economică → `docs/methods/economic-model.md`;
- produse și program educațional → `docs/products/`;
- website, copy și UX/UI → `docs/platform/website/`;
- cercetare → `docs/research/`;
- stare și priorități → `docs/roadmap/`;
- decizii → `docs/decisions/`;
- drepturi și permisiuni → `docs/licensing/`;
- comportament efectiv → `src/`, `supabase/` și testele rulate;
- active runtime → `public/` și Supabase Storage;
- active sursă → `assets/`;
- date structurate versionate → `data/`.

Sursele canonice sunt directoarele finale enumerate mai sus. Copia temporară `docs/new site/` a fost eliminată după verificarea migrării; nu o recrea.

`docs/application/`, `docs/ezplay/` și `docs/technical/` provin din versiuni anterioare ale aplicației. Sunt documentație veche și nevalidată, nu autoritate pentru aplicația Next.js/Supabase curentă. Păstrează-le până la taskul separat de refacere, dar verifică orice afirmație direct în cod.

Dacă documentația tehnică și codul diferă, codul descrie realitatea curentă. Dacă implementarea și o decizie de produs diferă, raportează conflictul; nu presupune că implementarea a anulat decizia.

## 4. Limbă și terminologie

- Documentația internă și validarea curentă se fac în română.
- Codul, identificatorii și comentariile tehnice se scriu în engleză, dacă fișierul nu stabilește altceva.
- Folosește `EZPLAY` pentru proiect și numele public al jocului de bază.
- Folosește `Deckbuilder` pentru mecanica jocului de bază și `Tableau Builder` pentru jocul avansat; nu folosi `EZPLAY2`.
- Termenii canonici includ `Founder Round`, `Founder Loop`, `Prestige`, `Equity` și `Founder Skills / Skill XP` conform documentației dedicate.
- Nu inventa copy, oferte, rezultate, cercetări, funcții existente sau promisiuni publice.

## 5. Intenție și realitate

- Separă explicit ce există, ce este testat, ce este planificat și ce este numai viziune.
- O pagină, componentă sau funcție prezentă în cod nu devine automat decizie canonică de produs.
- O idee din documentație nu se prezintă ca implementată fără verificarea codului și, când este relevant, a aplicației rulate.
- Româna este prioritatea curentă; traducerea completă în engleză nu se face incidental.
- Migrarea repository-ului nu autorizează redesign, schimbarea sitemap-ului, autentificării, schemelor Supabase sau rescrierea Deckbuilder-ului.

## 6. Siguranță și zone protejate

- Nu expune secrete, token-uri, date personale, dump-uri sau fișiere `.env*`.
- Modificările de schemă se scriu mai întâi ca migrații în `supabase/migrations/` și nu se aplică remote fără aprobare.
- Nu slăbi RLS, validarea, protecția rutelor, sesiunile sau callback-urile de autentificare.
- Conturile și traseele pentru minori sunt zonă de siguranță ridicată. Nu deschide înregistrarea și nu schimba accesul fără decizie explicită.
- Protejează motorul Deckbuilder, formulele, datele și imaginile cărților, salvările și autentificarea necesară jocului.
- Nu șterge directorul `public/transfer images from user/`; fișierele din el se procesează numai în limitele taskului.

## 7. Verificare și raportare

- Rulează verificări proporționale cu riscul și nu declara un test trecut dacă nu l-ai rulat.
- Pentru cod, verificările uzuale sunt `pnpm lint`, `pnpm build` și testele sau scenariile relevante disponibile.
- Pentru documentație și reorganizare, verifică linkurile relative, front matter-ul, duplicatele, referințele vechi și `git diff --check`.
- Încheie taskul cu: ce s-a schimbat, fișierele afectate, verificările și rezultatele, diferențele față de documentație, deciziile propuse și riscurile rămase.

# Reguli pentru documentația EZPLAY

Aceste reguli se aplică tuturor fișierelor din `docs/` și completează regulile globale din `/AGENTS.md`.

## Starea actuală a documentației

- `docs/application/`, `docs/ezplay/` și `docs/technical/` descriu versiuni anterioare ale aplicației și sunt nevalidate față de implementarea Next.js/Supabase curentă.
- Nu cita aceste trei directoare ca dovadă a comportamentului actual fără verificarea codului.
- Nu le șterge, muta sau rescrie în cadrul migrării repository-ului. Refacerea lor este un task separat.
- Sursele canonice sunt directoarele normale din `docs/`. `docs/new site/` este copia-sursă înghețată, păstrată temporar numai pentru comparația migrării; nu o edita și nu dezvolta documente noi în ea.
- `docs/new site/AGENTS.md` este el însuși un artefact legacy. Regulile sale despre vechiul remote, vechiul branch și structura separată nu se aplică în afara copiei înghețate și vor dispărea odată cu aceasta.

## Limbă, stare și front matter

- Scrie documentația internă în română.
- Folosește numai stările `Draft`, `Working` și `Current`.
- `Draft` este starea implicită pentru informații exploratorii, incomplete sau neverificate.
- `Working` înseamnă coerent și utilizabil, dar încă în dezvoltare sau testare.
- `Current` înseamnă referința acceptată pentru versiunea curentă; nu îl folosi dacă există secțiuni neverificate.
- Documentele importante folosesc front matter coerent. `canonical_for` descrie rolul documentului și nu este o stare suplimentară.

## Acuratețe și surse

- Verifică `src/`, `supabase/` și testele înainte de a descrie o funcție ca implementată.
- Separă explicit realitatea curentă de roadmap, ipoteze și viziune.
- Nu inventa afirmații, rezultate, citate, surse, permisiuni sau dovezi pentru a completa goluri.
- Păstrează limitele cercetării și proveniența în `docs/research/` și `docs/licensing/`.
- Dacă o afirmație publică nu este susținută, marcheaz-o pentru decizie; nu o întări editorial.
- Copy-ul aprobat nu se schimbă unilateral pentru a încăpea într-o componentă.

## Decizii și conflicte

- Deciziile importante și motivele lor se scriu în `docs/decisions/`.
- Schimbările de definiție, poziționare, terminologie, formulă, public, ofertă, sitemap, CTA major sau acces al minorilor necesită aprobarea utilizatorului.
- Când codul diferă de documentația tehnică veche, notează realitatea codului și propune actualizarea documentației.
- Când codul diferă de o decizie de produs, nu rescrie decizia pentru a corespunde implementării; raportează conflictul.

## Structură și linkuri

- Nu crea directoare noi la rădăcina repository-ului fără aprobare.
- Nu păstra aceeași definiție canonică în două locuri.
- README-urile explică rolul și navigarea folderelor; nu devin specificații paralele de produs.
- Folosește linkuri relative și verifică-le după orice mutare.
- La migrare, actualizează referințele de la `research/` la `docs/research/`, de la `licensing/` la `docs/licensing/` și elimină afirmațiile că aplicația se află într-un repository tehnic separat.

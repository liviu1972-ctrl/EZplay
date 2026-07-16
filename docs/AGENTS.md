# Reguli pentru documentația EZPLAY

Aceste reguli se aplică tuturor fișierelor din `docs/` și completează regulile globale din `/AGENTS.md`.

## Starea actuală a documentației

- `docs/archive/legacy-application/` păstrează documentația veche `application`, `ezplay` și `technical`, nevalidată față de implementarea Next.js/Supabase curentă.
- Nu cita arhiva ca dovadă a comportamentului actual fără verificarea codului și nu o include în lectura implicită a unui task.
- `docs/technical/` este referința tehnică `Working` reconstruită prin auditul implementării curente. Codul, migrațiile și verificările executate au prioritate pentru comportamentul efectiv; arhiva nu se rescrie pentru a simula actualizarea ei.
- `docs/decisions/` separă deciziile `active`, propunerile `drafts` și istoricul `archive`.
- `docs/work/active/` păstrează documentele de lucru curente; după reconciliere, acestea trec în `docs/work/archive/`.
- Sursele canonice sunt directoarele curente enumerate în `docs/README.md`. Copia temporară `docs/new site/` a fost eliminată după verificarea migrării; nu o recrea.

## Limbă, stare și front matter

- Scrie documentația internă în română.
- Folosește numai stările `Draft`, `Working` și `Current`.
- `Draft` este starea implicită pentru informații exploratorii, incomplete sau neverificate.
- `Working` înseamnă coerent și utilizabil, dar încă în dezvoltare sau testare.
- `Current` înseamnă referința acceptată pentru versiunea curentă; nu îl folosi dacă există secțiuni neverificate.
- Pentru decizii, handoff-uri și documente de lucru importante, folosește separat `lifecycle`: `active`, `completed`, `superseded` sau `archived`.
- `status` descrie maturitatea conținutului; `lifecycle` descrie dacă documentul participă la munca prezentă. Nu schimba lifecycle-ul după fiecare editare minoră.
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
- La reconcilierea pentru `main`, actualizează fiecare schimbare în sursa sa canonică principală. Celelalte documente trimit la aceasta sau păstrează numai rezumatul necesar propriei responsabilități; nu repeta același comportament în mai multe locuri.
- Nu transforma roadmap-ul, starea implementării sau documentele canonice în changelog-uri ale fiecărei promovări. Consemnează acolo numai schimbări durabile de capabilitate, produs sau stare; detaliile promovării rămân în Git.
- README-urile explică rolul și navigarea folderelor; nu devin specificații paralele de produs.
- Folosește linkuri relative și verifică-le după orice mutare.
- Folosește `docs/research/` și `docs/licensing/`; nu recrea directoarele root `research/`, `licensing/` sau `apps/`.

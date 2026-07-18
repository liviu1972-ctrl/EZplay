# Pachetul pentru ezplay.org

Acest folder conține direcția de produs, arhitectura informației, copywriting-ul și specificația UX/UI pentru prima versiune publică a `ezplay.org`.

Documentele descriu:

- ce trebuie să comunice site-ul;
- arhitectura informației și navigarea;
- parcursurile principale;
- copywriting-ul sursă în limba română;
- direcția vizuală și principiile de experiență;
- componentele, interacțiunile, mișcarea și comportamentul responsive;
- ordinea și criteriile de implementare;
- ce poate fi publicat și ce rămâne de confirmat.

Ele nu înlocuiesc sursele canonice ale proiectului și nu prescriu o rescriere a aplicației tehnice existente.

## Starea pachetului

Blueprint-ul, copywriting-ul și specificația UX/UI sunt complete ca prim draft pentru toate cele 14 pagini din sitemap-ul v1.

Pachetul este referința editorială și UX/UI pentru implementarea din acest repository. Agentul trebuie să citească `existing-platform-continuity.md` și să inspecteze `src/`, `package.json` și configurația existentă înainte de instalări, reorganizări sau decizii privind framework-ul.

Copywriting-ul nu trebuie regenerat de agentul care scrie codul. Dacă un text nu încape în componenta propusă, se ajustează mai întâi componenta sau se propune explicit o variantă editorială, fără schimbarea sensului.

## Ordinea de citire pentru agentul care construiește site-ul

1. `../ezplay-org-product-direction.md`;
2. `blueprint-v1.md`;
3. `existing-platform-continuity.md`;
4. `copy-rules.md`;
5. `pages/homepage.md`;
6. toate celelalte documente din `pages/`;
7. `ux-ui/README.md` și documentele indicate acolo;
8. `ux-ui/implementation-handoff.md` înaintea implementării.

## Regula de utilizare a copy-ului

Textele din `pages/` sunt copywriting sursă, nu simple exemple. Agentul le poate adapta numai pentru:

- lungimea necesară în interfață;
- acord gramatical;
- accesibilitate;
- traducere;
- eliminarea unui bloc marcat explicit ca indisponibil.

Agentul nu inventează statistici, testimoniale, parteneri, prețuri, certificări, funcții, rezultate sau afirmații juridice.

## Documente editoriale

- `blueprint-v1.md` — scope, sitemap, navigare, parcursuri și rolul paginilor;
- `existing-platform-continuity.md` — ce se păstrează, adaptează, înlocuiește sau elimină din platforma actuală;
- `copy-rules.md` — voce, terminologie, reguli editoriale și microcopy comun;
- `content-evidence-map.md` — legătura dintre afirmațiile publice, sursele interne, cercetarea externă, dovezile proprii și blocajele de publicare;
- `pages/homepage.md` — copywriting-ul complet al homepage-ului;
- `pages/program.md` — programul educațional pentru tineri;
- `pages/how-we-learn.md` — metoda și modul de învățare;
- `pages/experiences.md` — prezentarea formatelor de experiență;
- `pages/intro-experience.md` — experiența introductivă Joc + Debrief;
- `pages/for-young-people.md` — pagina adresată participanților;
- `pages/for-parents.md` — pagina adresată părinților;
- `pages/for-organizations.md` — pagina pentru școli, cluburi și ONG-uri;
- `pages/research.md` — cercetarea și principiile pedagogice;
- `pages/tools-and-simulations.md` — rolul Deckbuilder-ului și al instrumentelor;
- `pages/about.md` — identitatea și povestea EZPLAY;
- `pages/development.md` — dezvoltarea proiectului și participarea comunității;
- `pages/contact.md` — contact și formulare;
- `pages/platform.md` — intrarea în zona autentificată.

## Documente UX/UI

- `ux-ui/README.md` — scop, ordine de lectură și referințe;
- `ux-ui/experience-direction.md` — poziționare experiențială, navigare și principii UX;
- `ux-ui/navigation-system.md` — meniu orizontal global și rail vertical extensibil, cu reguli pe rute;
- `ux-ui/visual-system.md` — paletă, tipografie, layout și metafora sistemului conectat;
- `ux-ui/components-and-motion.md` — componente React, shadcn/ui, Lucide, Motion și efecte;
- `ux-ui/page-specifications.md` — compoziția și comportamentul fiecărei rute;
- `ux-ui/implementation-handoff.md` — instrucțiuni, etape, QA și criterii de acceptanță pentru agentul de coding.

## Informații care lipsesc înainte de publicare

Aceste goluri sunt intenționate și sunt marcate în fișiere:

- durata publică a experienței introductive;
- modelul comercial, prețul și condițiile de livrare;
- adresa publică de contact;
- bio-ul verificat al fondatorului;
- calendarul și capacitatea reală de livrare;
- rolul public al Deckbuilder-ului digital;
- regulile de creare a conturilor, în special pentru minori;
- textele juridice și fluxurile de consimțământ;
- testimoniale, fotografii, logo-uri și rezultate cu permisiuni și surse;

Absența acestor informații nu blochează designul. Se folosesc stările și variantele condiționate deja scrise, fără inventarea datelor.

Paginile juridice nu primesc copywriting în acest pachet. Ele necesită cercetare juridică actuală și revizuire specializată.

## Controlul surselor și al drepturilor

Înainte de implementarea sau publicarea unei rute, agentul citește [`content-evidence-map.md`](content-evidence-map.md) și verifică starea fiecărui grup de afirmații.

Sursele și drepturile sunt separate astfel:

- `docs/research/source-register.md` — ID-urile și starea linkurilor externe;
- `docs/research/product/curriculum-progression-and-gamification.md` — analiza și limitele cercetării;
- `docs/research/playtests/historical-session-evidence.md` — ce poate fi afirmat prudent despre experiențele istorice;
- `docs/licensing/rights-and-provenance-register.md` — proveniența și drepturile activelor;
- `docs/licensing/publication-permissions-register.md` — permisiunile pentru persoane, organizații, media și rezultate.

Un bloc de copy, o imagine, un logo, un testimonial sau un rezultat fără lanț de trasabilitate rămâne în afara build-ului public.

## Relația cu implementarea curentă

Prima implementare a website-ului există în `src/app/` la baza auditată `9ac8a88`. Următorul task pentru website trebuie să compare această implementare cu blueprint-ul, copy-ul și specificațiile UX/UI, fără să presupună că implementarea a înlocuit intenția aprobată.

Ordinea de comunicare rămâne:

1. program educațional;
2. învățare prin experiență;
3. primul program pentru tineri;
4. încredere pentru părinți și organizații;
5. jocuri și simulări ca instrumente;
6. platformă și comunitate ca infrastructură în dezvoltare.

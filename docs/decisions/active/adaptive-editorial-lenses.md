---
status: Current
version: "1.2"
updated: 2026-07-18
lifecycle: active
canonical_for:
  - adoption of adaptive editorial lenses on ezplay.org
  - session-context personalization boundaries
  - preservation of existing website copy and sitemap
---

# Lentile editoriale adaptive pentru ezplay.org

## Decizia

EZPLAY adoptă un sistem de personalizare contextuală de sesiune pentru website-ul public. Sistemul deduce progresiv intenția probabilă a vizitei din rutele și acțiunile parcurse și poate aplica pe paginile comune una dintre patru lentile editoriale:

1. tânăr / participant;
2. părinte;
3. educator / facilitator;
4. organizație / decident.

Lentila este o ipoteză temporară despre scopul vizitei, nu o identitate permanentă a persoanei. Prima intrare folosește copy-ul comun, nu cere alegerea unui rol și nu este blocată de un formular sau modal.

Comportamentul complet, regulile semnalelor și conservarea copy-ului sunt definite în [sistemul de lentile editoriale adaptive](../../platform/website/adaptive-editorial-lenses.md).

## Principii aprobate

- sitemap-ul public rămâne unic;
- rutele pentru tineri, părinți și organizații rămân porți de intrare și pagini cu voce proprie;
- în prima versiune, paginile comune pot adapta introducerea, exemplele și CTA-urile, dar păstrează structura și ordinea comună a secțiunilor;
- reordonarea cardurilor dintr-un bloc sau a secțiunilor întregi rămâne o posibilă extensie ulterioară și necesită o decizie separată înainte de implementare;
- faptele, dovezile, starea produsului, curriculumul, siguranța, accesul și informațiile juridice nu se schimbă prin lentilă;
- Curriculum Explorer și toate rutele `/program/curriculum/**` sunt în afara sistemului adaptiv: nu primesc variante, nu afișează controlul de perspectivă și nu produc semnale de lentilă în prima versiune;
- cele cinci `Mastery Lenses` sunt structuri pedagogice ale curriculumului și nu au nicio legătură tehnică sau semantică cu lentilele editoriale ale vizitatorului;
- un singur semnal slab nu activează sau schimbă o lentilă;
- două intenții apropiate păstrează copy-ul comun sau lentila stabilă;
- schimbarea apare la navigarea următoare, nu în timpul lecturii;
- sistemul folosește o singură lentilă ori starea comună, fără combinații procentuale;
- copy-ul existent al paginilor comune rămâne fallback complet;
- nu fiecare pagină trebuie să aibă patru variante;
- variantele se redactează și se aprobă editorial înainte de implementare;
- două CTA-uri pot avea text diferit și aceeași destinație când pasul este același;
- corecția perspectivei este discretă, accesibilă și neintruzivă;
- sistemul nu generează liber copy cu AI în runtime;
- prima versiune nu creează profil persistent, istoric între vizite sau identificator personal pentru lentile.

## Relația cu munca existentă

Documentele actuale din `docs/platform/website/pages/` nu sunt înlocuite și nu sunt declarate greșite.

- paginile comune rămân copy-ul implicit și fallback-ul;
- `for-young-people.md`, `for-parents.md` și `for-organizations.md` rămân pagini canonice și surse pentru trei lentile;
- perspectiva educatorului se dezvoltă editorial din documentele despre metodă, curriculum, Founder Rounds, cercetare și facilitare, fără aprobarea automată a unei rute noi; aceste documente sunt surse de redactare, nu transformă rutele Curriculum Explorer în semnale;
- curriculumul și documentația internă rămân surse riguroase și nu se rescriu în patru voci;
- adoptarea variantelor este progresivă și nu condiționează funcționarea paginilor existente.

## Motivație

EZPLAY are publicuri care caută lucruri diferite în același produs. Tânărul caută experiența și provocarea, părintele caută valoarea și condițiile pentru copil, educatorul caută mecanismul de învățare, iar decidentul caută potrivirea și seriozitatea colaborării.

Construirea unor sitemap-uri separate ar multiplica necontrolat copy-ul, navigarea, verificarea și mentenanța. Un nucleu comun cu variante modulare păstrează complexitatea controlabilă și permite folosirea muncii editoriale deja realizate.

## Limite

Decizia nu aprobă:

- urmărirea cross-site sau cumpărarea de date;
- folosirea conținutului liber din formulare pentru inferență;
- deducerea vârstei exacte ori a altor caracteristici sensibile;
- cookie persistent, bază de date sau profil de cont pentru lentile;
- personalizare între sesiuni;
- schimbarea sitemap-ului;
- o pagină nouă pentru educatori;
- rescrierea automată a copy-ului existent;
- implementarea unui algoritm înaintea auditului și planificării tehnice;
- publicarea variantelor care nu au surse, dovezi și aprobare editorială.

## Următorul pas

Agentul de planning și arhitectură tehnică inspectează implementarea curentă și transformă această decizie într-un plan etapizat. Nu modifică pragurile de produs, publicurile, copy-ul sau sitemap-ul și nu inventează variante lipsă.

Handoff-ul funcțional este în [documentul de lucru activ](../../work/active/adaptive-editorial-lenses-handoff.md).

## Ce rămâne de validat

- harta exactă a semnalelor și pragurilor;
- prototipul pe paginile comune prioritare;
- diferența minimă care justifică o variantă;
- locul exact al controlului discret în fiecare shell;
- felul în care utilizatorii percep adaptarea și corectarea perspectivei;
- verificarea completă în română și engleză;
- orice extindere viitoare dincolo de sesiunea curentă.

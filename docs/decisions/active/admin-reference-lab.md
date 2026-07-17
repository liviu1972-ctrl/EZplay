---
status: Current
version: "1.0"
updated: 2026-07-17
lifecycle: active
canonical_for:
  - Admin Reference Lab purpose and access
  - non-canonical interactive reference pages
  - relationship between references and the public product
---

# Admin Reference Lab

## Decizia

EZPLAY păstrează interacțiunile, prototipurile și paginile istorice care pot inspira munca viitoare într-o zonă internă numită **Admin Reference Lab**.

Zona este disponibilă la `/admin/references` și poate fi accesată numai prin contractul de acces administrativ existent. Ea nu face parte din website-ul public, sitemap, navigarea publică sau produsul canonic.

## Rol

Admin Reference Lab trebuie să permită unui administrator să:

- vadă într-un singur loc referințele interactive păstrate;
- înțeleagă ce este fiecare referință și de ce a fost păstrată;
- deschidă referința fără a o confunda cu produsul curent;
- compare ulterior idei de interacțiune, compoziție sau comportament.

Fiecare intrare afișează cel puțin:

- nume;
- descriere scurtă;
- motivul păstrării;
- starea de referință necanonică;
- butonul de acces.

## Reguli

- toate rutele laboratorului rămân sub `/admin/references/*` și moștenesc protecția zonei administrative;
- paginile și catalogul folosesc `noindex` și nu intră în sitemap;
- referințele sunt read-only dacă nu există o decizie separată pentru editare;
- fiecare pagină afișează clar că este o referință internă și nu produsul curent;
- codul păstrat poate servi drept material de observație, nu drept bază tehnică implicită pentru o funcție nouă;
- adăugarea unei referințe noi trebuie să fie simplă și versionată în repository, fără bază de date pentru prima versiune;
- laboratorul nu introduce roluri, permisiuni sau infrastructură de autentificare noi.

## Prima referință

Prima intrare este pagina istorică de explorare a cărților pentru **EZPLAY Deckbuilder**.

Ea păstrează în special:

- reprezentarea teancurilor de cărți;
- comportamentul de amestecare;
- întoarcerea și dezvăluirea cărților;
- tranzițiile și ritmul explorării vizuale.

Referința va fi disponibilă la `/admin/references/cards-deck`. Ruta temporară `/cards_old` dispare din suprafața publică și nu redirecționează către laborator.

## Ce nu decide

Această decizie nu aprobă:

- restaurarea vechii pagini `/cards` ca produs public;
- reutilizarea automată a codului legacy în viitorul Cards Library;
- transformarea laboratorului într-un mediu de producție sau într-un editor;
- accesul altor roluri decât cele deja acceptate de contractul administrativ curent;
- păstrarea tuturor prototipurilor fără selecție și explicație.

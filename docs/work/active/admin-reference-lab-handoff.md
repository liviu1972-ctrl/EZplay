---
status: Current
version: "1.0"
updated: 2026-07-17
lifecycle: active
canonical_for:
  - approved implementation handoff for Admin Reference Lab v1
---

# Handoff — Admin Reference Lab v1

## Autoritate

Implementarea urmează decizia [Admin Reference Lab](../../decisions/active/admin-reference-lab.md). Handoff-ul nu schimbă rolurile, autentificarea, sitemap-ul public sau direcția viitorului Cards Library.

## Obiectiv

Construiește o zonă administrativă reutilizabilă pentru referințe interactive necanonice și mută pagina temporară `/cards_old` în această zonă ca primul exemplu.

## Scope aprobat

1. Creează catalogul `/admin/references` în layout-ul administrativ existent.
2. Adaugă accesul către catalog în navigarea admin.
3. Folosește un registru static, versionat în cod, pentru lista referințelor; nu introduce tabel sau migrare.
4. Fiecare intrare din catalog afișează titlu, descriere, motivul păstrării, marcajul `Referință internă — necanonică` și buton de acces.
5. Mută implementarea din `/cards_old` la `/admin/references/cards-deck`.
6. Păstrează comportamentele valoroase ale paginii: teancuri, shuffle, reveal și tranziții.
7. Menține pagina read-only și nu adăuga operații de scriere în Supabase sau Storage.
8. Elimină ruta publică `/cards_old`; nu crea redirect.
9. Adaugă `noindex` pentru catalog și paginile de referință și nu le include în sitemap.
10. Corectează textele românești cu encoding corupt și problemele `git diff --check` din codul restaurat.

## Limite

- nu redesena pagina legacy;
- nu o transforma în Cards Library;
- nu schimba middleware-ul, rolurile sau modelul de autentificare dacă structura existentă `/admin` poate proteja rutele;
- nu instala dependințe;
- nu modifica date, RLS, migrații sau bucket-uri;
- nu conecta laboratorul în navigarea publică.

## Criterii de acceptare

- un utilizator neautentificat nu poate vedea `/admin/references` sau copiii săi;
- un utilizator fără rol administrativ nu poate vedea zona;
- un administrator vede catalogul și poate deschide prima referință;
- catalogul explică explicit caracterul intern și necanonic;
- `/cards_old` nu mai există ca rută publică;
- referința afișează și amestecă teancurile fără operații de scriere;
- textele românești sunt corecte;
- `pnpm lint`, `pnpm build` și `git diff --check` trec;
- documentația tehnică a rutelor este actualizată după verificarea implementării.

## Raport cerut agentului de implementare

Raportează fișierele modificate, protecțiile reutilizate, rezultatele verificărilor, comportamentul celor trei tipuri de acces — neautentificat, non-admin și admin — și orice diferență rămasă față de decizia canonică.

---
status: Working
version: "0.2"
updated: 2026-07-17
canonical_for: audited implementation baseline
---

# Starea implementării curente

Această pagină fixează baza tehnică observată la unificarea repository-ului. Nu înlocuiește testarea funcțională și nu declară automat toate funcțiile drept validate.

## Baza auditată

- repository: `https://github.com/liviu1972-ctrl/EZplay`;
- commit de implementare: `9ac8a88b5b5224da250c7ef4ad7b2bbc6912c87d`;
- mesaj: `feat: complete ezplay.org public website transformation and redesign`;
- branch-uri observate la audit: `main` și `dev` la același commit;
- branch de migrare: `codex/unify-repository`;
- checkpoint reguli: `793a58d55552c13a84261bca4630d3d39ff1bb40`.

## Structura observată

- Next.js 16 cu App Router în `src/app/`;
- Supabase pentru integrarea de autentificare și date, cu migrații în `supabase/migrations/`;
- Deckbuilder și simulator integrate în `src/features/ezplay/`;
- rute publice pentru homepage, program, experiențe, cercetare, platformă, instrumente și contact;
- rută separată `/ezplay` pentru experiența jocului.

## Starea acceptată pentru promovarea din 2026-07-17

Intervalul `main..dev` a fost reconciliat înainte de promovare, cu `00c0249` ca bază și `fd4e89f` ca ultim commit de implementare anterior checkpoint-ului documentar. Starea acceptată adaugă:

- shell public cu canvas boxed, centrat, de maximum `1440px` și `ExplorerRail` păstrat în stânga canvasului;
- header public fix, cu ascundere la scroll deliberat în jos, revenire la scroll în sus și excepție temporară pentru deplasările programatice inițiate prin linkuri sau butoane;
- româna drept limbă inițială pentru vizitatorii fără cookie de preferință, cu selectorul RO/EN păstrat;
- afișarea imediată, fără delay de intrare, a conținutului editorial din hero-urile Homepage și Program;
- corectarea liniei verticale din fluxul introductiv al paginii Program.

Aceste puncte descriu comportamentul observat în cod. Nu reprezintă validarea funcțională sau responsive a întregului website.

## Documentație care necesită refacere

`docs/archive/legacy-application/` păstrează documentele `application`, `ezplay` și `technical` din versiuni anterioare sau nevalidate după reconstrucția aplicației. Ele nu sunt surse curente de adevăr. Documentația tehnică actuală va fi refăcută într-un task separat prin auditul codului, rutelor, autentificării, Supabase și Deckbuilder-ului.

## Limită de verificare

În faza de unificare au fost verificate repository-ul, structura și commiturile. Nu au fost rerulate încă toate scenariile funcționale pentru login, OAuth, sesiuni, RLS, încărcarea cărților, salvări, simulator și responsive. Rezultatele acestor verificări se vor consemna numai după rularea lor efectivă.

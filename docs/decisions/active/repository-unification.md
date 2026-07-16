---
status: Current
version: "1.1"
updated: 2026-07-17
lifecycle: active
canonical_for: repository structure and source hierarchy
---

# Unificarea repository-ului EZPLAY

## Context

Documentația de produs și aplicația Next.js au fost dezvoltate în repository-uri separate. Pentru a oferi context implementării, repository-ul de documentație a fost copiat integral în `docs/new site/`, ceea ce a creat două memorii active și riscul unor decizii divergente.

## Decizie

Repository-ul `https://github.com/liviu1972-ctrl/EZplay` este repository-ul canonic unic pentru documentație, cod, Supabase, active, date și reguli de colaborare.

Structura și autoritatea sunt separate prin directoare și fișiere `AGENTS.md`, nu prin repository-uri diferite. Utilizatorul rămâne Product Owner și decidentul final.

## Surse de adevăr

- intenția de produs este descrisă în documentele canonice din `docs/`;
- comportamentul efectiv este descris de `src/`, `supabase/` și verificările rulate;
- un conflict între cod și o decizie de produs se reconciliază explicit;
- documentația tehnică se actualizează pentru a descrie codul, nu invers;
- `docs/archive/legacy-application/` păstrează documentația veche și nevalidată `application`, `ezplay` și `technical`.

## Consecințe

- toate taskurile noi pornesc din rădăcina repository-ului unificat;
- `docs/research/` și `docs/licensing/` sunt destinațiile canonice pentru cercetare și drepturi;
- `apps/` nu este recreat; comportamentul aplicației se verifică în `src/`, iar `docs/technical/` păstrează referința tehnică `Working` reconstruită prin audit;
- regulile globale sunt în `/AGENTS.md`, cu reguli locale pentru documentație, cod și Deckbuilder;
- vechiul repository de documentație rămâne istoric până la arhivarea aprobată separat;
- copia `docs/new site/` a fost eliminată după verificarea completă a migrării și aprobarea explicită a utilizatorului.

## Implementare

Auditul și harta au fost aprobate la 2026-07-16. Fundația regulilor a fost fixată în commitul `793a58d`, iar migrarea conținutului în commitul `7c04ad6`, pe branch-ul `codex/unify-repository`. Copia temporară a fost eliminată în Faza 3 după aprobarea explicită a utilizatorului.

Contextul complet și auditul inițial sunt păstrate în [`../archive/repository-unification-handoff.md`](../archive/repository-unification-handoff.md).

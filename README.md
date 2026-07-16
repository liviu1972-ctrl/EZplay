# EZPLAY

> **WHERE FUTURE FOUNDERS START**

EZPLAY creează jocuri, simulări și experiențe prin care antreprenorii de azi și de mâine învață cum funcționează o companie, luând decizii și observând consecințele lor.

Acesta este repository-ul canonic unificat pentru documentația de produs, cercetare, decizii, active, aplicația Next.js, integrarea Supabase și implementarea Deckbuilder-ului.

## Surse de adevăr

- definiția și granițele proiectului → `docs/context/what-is-ezplay.md`;
- poziționarea și vocea → `docs/context/brand-positioning.md`;
- viziunea → `docs/context/ezplay-vision.md`;
- formulele economice → `docs/methods/economic-model.md`;
- website, copy și UX/UI → `docs/platform/website/`;
- comportamentul efectiv al aplicației → `src/`, `supabase/` și verificările rulate;
- reguli de colaborare → `AGENTS.md` și fișierele locale `AGENTS.md`.

`docs/archive/legacy-application/` păstrează documentația din aplicații sau etape anterioare și nu descrie automat implementarea curentă. Documentația tehnică actuală va fi refăcută într-un task separat, pe baza codului actual.

## Structură

```text
EZplay/
├── src/                 # aplicația Next.js și Deckbuilder-ul
├── public/              # active runtime
├── supabase/            # migrații și integrare backend
├── scripts/             # utilitare versionate
├── docs/                # produs, cercetare, decizii și documentație
├── prompts/             # prompturi de lucru reutilizabile
├── agents/              # ghiduri neutre pentru colaboratori AI
├── assets/              # active sursă
└── data/                # date structurate versionate
```

## Dezvoltare locală

Cerința proiectului este Node.js cu `pnpm`.

```bash
pnpm install
pnpm dev
```

Aplicația locală este disponibilă implicit la `http://localhost:3000`.

Verificările principale sunt:

```bash
pnpm lint
pnpm build
```

Variabilele de mediu și schimbările Supabase se gestionează fără a versiona secrete. Modificările DDL se scriu în `supabase/migrations/` înaintea oricărei aplicări remote.

## Git

- repository canonic: `https://github.com/liviu1972-ctrl/EZplay`;
- `main` — versiunea acceptată și publicabilă;
- `dev` — integrarea curentă;
- schimbările ample — branch separat și verificabil.

Nu se face push, merge în `main` sau modificare remote fără aprobarea explicită a utilizatorului.

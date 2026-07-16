# EZPLAY

> **WHERE FUTURE FOUNDERS START**

Acesta este workspace-ul curat pentru continuarea proiectului EZPLAY cu ChatGPT Work, Codex sau alți agenți AI.

## Definiția proiectului

> **EZPLAY creează jocuri, simulări și experiențe prin care antreprenorii de azi și de mâine învață cum funcționează o companie, luând decizii și observând consecințele lor.**

Definiția completă și granițele proiectului sunt în `docs/context/what-is-ezplay.md`.

## Repository Git

Repository-ul canonic al acestui workspace este:

- GitHub: `https://github.com/enterstef/ezplay`;
- remote local: `origin`;
- branch principal: `main`.

Un agent care deschide proiectul trebuie să confirme folderul activ, starea Git și remote-ul înainte să creeze commituri sau să facă push.

## Cum se folosește acest workspace

Fiecare folder și subfolder conține un `README.md` care explică:

- rolul directorului;
- ce tipuri de fișiere vor intra acolo;
- ce nu trebuie presupus că există deja;
- relația cu celelalte zone ale proiectului;
- indicații pentru oamenii și agenții AI care vor lucra acolo.

Înainte să lucrezi într-un director, citește README-ul local și README-urile directoarelor părinte.

> **Existența unui folder descrie arhitectura de lucru, nu dovedește că produsul, codul sau activul respectiv există deja.**

## Ordinea de citire pentru AI

1. `AGENTS.md`
2. `docs/decisions/documentation-working-method.md`
3. `docs/context/what-is-ezplay.md`
4. `docs/context/brand-positioning.md`
5. `docs/context/ezplay-vision.md`
6. `docs/methods/economic-model.md`
7. `docs/roadmap/current-assets.md`
8. README-ul folderului în care urmează să lucrezi

## Documentele canonice incluse

- `docs/context/what-is-ezplay.md` — definiția, domeniul și granițele;
- `docs/context/brand-positioning.md` — poziționarea și vocea brandului;
- `docs/context/ezplay-vision.md` — direcția ecosistemului;
- `docs/methods/economic-model.md` — formulele și terminologia economică;
- `docs/roadmap/current-assets.md` — inventarul actual;
- `docs/decisions/documentation-working-method.md` — metoda de lucru pentru documentația vie și colaborarea cu agenții.

Când două documente par să se contrazică, documentul canonic dedicat conceptului are prioritate față de inventar.

## Prioritatea actuală

Prioritatea operațională este clarificarea și dezvoltarea `ezplay.org`, în legătură cu jocurile și experiențele testate în realitate.

Aplicația actuală trebuie tratată ca prototip tehnic și punct de pornire, nu ca produs sau arhitectură finală.

Sursele Next.js curente pentru `ezplay.org`, Deckbuilder-ul digital și simulatorul integrat sunt dezvoltate într-un repository tehnic separat. În acest workspace, `apps/` descrie zone logice și context tehnic; importarea codului necesită o decizie explicită.

Repository-ul este documentație vie. Stările documentației sunt `Draft`, `Working` și `Current`, conform metodei canonice.

## Structura principală

```text
EZPLAY/
├── README.md
├── AGENTS.md
├── apps/
├── docs/
├── licensing/
├── assets/
├── data/
├── research/
├── prompts/
└── agents/
```

Fiecare dintre aceste directoare conține propriul README.

## Reguli generale

- Separă întotdeauna ce există de ceea ce este doar viziune.
- Nu crea o a doua sursă canonică pentru același concept.
- Nu presupune că folderele goale conțin implementări.
- Nu muta sau șterge în masă fără aprobare.
- Nu construi funcții doar pentru că sunt menționate în viziune.
- Folosește româna pentru documentația internă.
- Păstrează termenii oficiali englezi acolo unde modelul îi definește astfel.

## Atenție înainte de ștergerea folderului vechi

Acest zip nu este un backup al aplicației existente și nu conține:

- codul actual al site-ului;
- istoricul Git;
- configurațiile Vercel sau Supabase;
- exporturi ale bazei de date;
- imaginile cărților;
- regulamentele și materialele fizice;
- secrete sau variabile de mediu.

Salvează separat aceste elemente înainte de a șterge vechiul folder.

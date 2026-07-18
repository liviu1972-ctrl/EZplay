---
status: Current
version: "1.0"
updated: 2026-07-18
lifecycle: active
canonical_for:
  - product review of the first Curriculum Explorer implementation
  - correction scope before accepting the implementation
---

# Review de implementare — Curriculum Explorer

## Verdict

Implementarea din 2026-07-18 este o fundație tehnică funcțională și o verticală vizibilă, dar nu îndeplinește încă handoff-ul aprobat și nu este gata de acceptare ca Curriculum Explorer.

Au fost verificate read-only codul, rutele și aplicația locală. Pagina `/program/curriculum` răspunde, nu afișează Explorer Rail-ul global și nu a produs erori în consola browserului în scenariile inspectate. Rezultatele `pnpm lint` și `pnpm build` sunt cele raportate de agentul de implementare; Codex nu le-a rerulat.

## Ce este corect

- există route group-ul `(curriculum)` și rutele publice de bază;
- Atlasul curricular este separat de Explorer Rail-ul global;
- există shell responsive și un `Sheet` mobil pentru Atlas;
- Mastery este prezentat ca etapă terminală, nu `Level 6`;
- starea `Working` este explicată public fără a declara Round-urile disponibile;
- nu a fost adăugat un CMS sau o bibliotecă nouă pentru front matter;
- există overview-uri pentru niveluri, piloni, Mastery, Round-uri, hartă și glosar.

## Blocaje înainte de acceptare

### 1. Pilotul FIN 1.2.1 folosește conținutul altui Round

Ruta și badge-ul declară `FIN 1.2.1`, dar pagina prezintă Profitul, Cheltuielile și calculul Profitului. Sursa canonică definește `FIN 1.2.1` drept **Vânzările/Revenue**, cu titlul pentru participant `Cum face firma vânzări?`, relația `Vânzări = min(Producție, Clienți)` și întrebarea despre condițiile unei vânzări. Cheltuielile și Profitul aparțin `FIN 1.2.2`.

Aceasta este o eroare de fidelitate curriculară, nu o simplă diferență de copy. Pilotul trebuie reconstruit din câmpurile reale ale unei singure surse.

### 2. Legătura website principal → curriculum nu este implementată

În aplicația verificată:

- `/program` nu conține niciun link către `/program/curriculum`;
- Explorer Rail-ul global nu dezvăluie `Prezentare`, `Harta programului` și `Experiența introductivă`;
- footer-ul nu include `Harta programului`;
- legăturile contextuale aprobate pentru `/how-we-learn`, `/research` și `/for/organizations` lipsesc;
- shell-ul curricular reutilizează header-ul global complet în locul variantei compacte aprobate.

### 3. Coordonata `Level × Business Pillar` nu este funcțională

Pagina unui Level trimite la overview-ul pilonului și pierde Level-ul. Pagina pilonului trimite la overview-ul Level-ului și pierde pilonul. În `SpiralSidebar`, toate Level-urile unui pilon au același `href`, deci selecția nu se schimbă.

Ruta canonică aprobată este:

```text
/program/curriculum/levels/[level]/pillars/[pillar]
```

Pentru Mastery, lentilele folosesc:

```text
/program/curriculum/mastery/lenses/[pillar]
```

### 4. Sursele Working nu alimentează conținutul central

Parserul citește front matter și conținut Markdown, dar paginile folosesc aproape exclusiv texte hardcodate. Pagina pilonului conține explicit descrieri placeholder, iar paginile de Level repetă aceeași formulare generică pentru toți pilonii.

Implementarea trebuie să transforme controlat câmpurile publicabile din cele 25 de hărți de nivel, spirale și Mastery într-un model public versionat. Nu este necesar un CMS sau o bază de date pentru conținutul care există deja în repository.

### 5. Verticala a rămas pilot în loc să fie extinsă

Catalogul conține un singur Round, deși sursele Working inventariază 191. Handoff-ul cerea validarea verticalei și apoi extinderea la întregul conținut care poate fi reprezentat fidel. Conținutul fără suficiente câmpuri publice poate rămâne ascuns sau marcat restrictiv, dar inventarul existent nu trebuie amânat automat pentru un CMS viitor.

### 6. Harta conectată este numai placeholder

Ruta există, dar nu oferă descoperire sau legături. Nu este obligatorie introducerea D3 ori React Flow. Prima versiune poate folosi o hartă schematică accesibilă, construită din structura Level × Business Pillar și legături către paginile canonice.

## Diferențe UX importante

- Atlasul etichetează `Despre program`, dar linkul duce la overview-ul Curriculum Explorer; conform specificației trebuie să ducă la `/program`;
- header-ul curricular nu oferă compoziția compactă `logo → /`, `Programul EZPLAY → /program`, `Meniu → navigarea globală`;
- Biblioteca centrală folosește numeroase carduri și texte generice, fără ritmul editorial și secțiunile canonice din surse;
- Spirala din dreapta este absentă sau goală pe mai multe pagini și nu conține cuprins local;
- controlul mobil include numai Atlasul, nu coordonatele și navigarea contextuală necesare.

## Ordinea de corecție

1. corectarea fidelității FIN 1.2.1 și eliminarea copy-ului inventat;
2. implementarea legăturilor dintre site și curriculum;
3. implementarea rutei canonice `Level × Business Pillar` și a lentilelor Mastery;
4. construirea modelului public din sursele Working;
5. completarea shell-ului Atlas + Bibliotecă + Spirală pe desktop și mobil;
6. extinderea catalogului și paginilor la conținutul reprezentabil fidel;
7. transformarea Hărții conectate din placeholder într-un mod real de descoperire;
8. lint, build și scenarii funcționale complete.

## Criteriu de reluare a review-ului

Review-ul se reia când nu mai există placeholder-e editoriale, intersecția păstrează ambele coordonate, legăturile website–curriculum sunt vizibile, iar cel puțin inventarul complet al Round-urilor publicabile este derivat din sursele Working fără amestecarea conținutului între coduri.

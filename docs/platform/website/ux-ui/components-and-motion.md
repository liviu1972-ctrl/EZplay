---
status: Draft
version: "0.3"
updated: 2026-07-17
---

# Componente, interacțiuni și motion

## Principiu

Componentele trebuie să transforme același conținut într-o experiență coerentă, fără să facă toate secțiunile să arate identic.

`shadcn/ui` oferă primitivele accesibile. EZPLAY definește:

- compoziția;
- tokens;
- spațierea;
- stările;
- formele;
- iconografia de brand;
- traseele și modulele;
- regulile de motion.

Tema vizuală implicită `shadcn/ui` nu este rezultatul final.

## Biblioteci recomandate

### Obligatorii sau deja asumate

- React și Next.js din aplicația existentă;
- `shadcn/ui` pentru primitive accesibile;
- `lucide-react` pentru iconografie funcțională;
- `motion`, importat din `motion/react`, pentru animațiile React și SVG care au sens;
- `embla-carousel-react`, direct sau prin componenta Carousel din `shadcn/ui`;
- `next/image` pentru imaginile locale și cele din Supabase Storage;
- `next/font` pentru fonturile aprobate.

### În funcție de proiectul existent

- `react-hook-form` pentru formulare lungi;
- `zod` pentru schema de validare;
- `sonner` prin `shadcn/ui` pentru notificări non-critice.

Agentul verifică `package.json` înainte să instaleze orice dependență. Nu introduce o a doua bibliotecă pentru aceeași funcție dacă proiectul are deja una potrivită.

### Nu sunt recomandate pentru v1

- GSAP pentru animații care pot fi realizate clar cu CSS sau Motion;
- Lenis sau alt smooth-scroll global;
- Three.js / React Three Fiber;
- WebGL pentru decor;
- un framework separat de design system;
- o bibliotecă de iconuri suplimentară;
- un carousel diferit de Embla;
- Lottie cu active externe necontrolate;
- Rive înainte să existe un activ propriu și un motiv educațional clar.

O excepție trebuie justificată printr-o experiență imposibil de realizat rezonabil cu stack-ul de bază.

## Referințe oficiale pentru agent

- Next.js App Router: `https://nextjs.org/docs/app`;
- optimizarea imaginilor: `https://nextjs.org/docs/app/getting-started/images`;
- optimizarea fonturilor: `https://nextjs.org/docs/app/getting-started/fonts`;
- componente shadcn/ui: `https://ui.shadcn.com/docs/components`;
- Motion for React: `https://motion.dev/docs/react`;
- accesibilitatea Motion: `https://motion.dev/docs/react-accessibility`;
- Lucide for React: `https://lucide.dev/guide/react`;
- Embla React: `https://www.embla-carousel.com/docs/v8/get-started/react`.

## Primitive `shadcn/ui`

### Navigare

- `Sidebar` și componentele sale — `ExplorerRail` desktop colapsabil în mod icon;
- `NavigationMenu` — panourile desktop pentru Program și Experiențe;
- `Sheet` — meniul mobil și cuprinsul mobil;
- `Accordion` sau `Collapsible` — grupurile din meniul mobil;
- `Breadcrumb` — pagini secundare;
- `DropdownMenu` — selector de limbă, numai dacă are mai mult de două opțiuni;
- `Button` — toate CTA-urile și controalele.

### Conținut

- `Tabs` — formate, publicuri și perspective alternative;
- `Accordion` — FAQ și detalii secundare;
- `Carousel` — provocări, experiențe sau imagini când secvența laterală este justificată;
- `Card` — numai ca bază semantică pentru variantele proprii;
- `Badge` — status și etichete scurte;
- `Separator` — delimitări funcționale;
- `Tooltip` — iconuri și controale, nu informație esențială;
- `HoverCard` — note de cercetare pe desktop, cu alternativă click/tap;
- `Dialog` — detaliu extins sau imagine, nu pentru navigarea de bază;
- `ScrollArea` — numai în meniuri/panouri care chiar depășesc viewport-ul.

### Formulare și feedback

- `Field` / componentele de formular disponibile în versiunea instalată;
- `Input`;
- `Textarea`;
- `Select` sau `NativeSelect`;
- `Checkbox`;
- `RadioGroup`;
- `Label`;
- `Alert`;
- `Skeleton`;
- `Spinner`;
- `Sonner`;
- `Empty` pentru stări fără date;
- `AlertDialog` numai pentru acțiuni cu consecințe reale.

Nu se instalează toate componentele bibliotecii. Se adaugă numai cele folosite.

## Inventarul componentelor proprii

### Shell global

#### `SiteHeader`

Conține:

- logo;
- navigare principală;
- limbă;
- acces platformă;
- CTA contextual pe viewport mare;
- stări top / scrolled / menu-open.

#### `ExplorerRail`

Coexistă cu `SiteHeader` pe rutele indicate în `navigation-system.md`.

Este construit din primitivele shadcn `Sidebar`, `SidebarGroup`, `SidebarMenu`, `SidebarMenuButton`, `SidebarTrigger` și `SidebarInset`, după verificarea versiunii instalate.

Conține:

- iconuri globale și contextuale;
- trigger pentru extindere;
- tooltip-uri în starea colapsată;
- subpagini și ancore în starea extinsă;
- stare activă sincronizată cu ruta și secțiunea;
- `PageProgressTrace` pe paginile lungi;
- versiune discretă în zona inferioară, când aceasta nu este deja persistentă.

Nu se deschide exclusiv la hover și nu apare pe fluxurile focalizate, autentificare sau Deckbuilder.

#### `MobileNavigation`

Bazat pe `Sheet`.

Conține:

- grupuri de linkuri;
- CTA principal;
- selector limbă;
- intrare platformă;
- focus trap și închidere predictibilă.

#### `SiteFooter`

Conține navigarea completă, starea proiectului, contact și traseul vizual de închidere.

#### `PageShell`

Setează:

- fundalul;
- containerul;
- breadcrumb;
- metadata vizuală;
- cuprinsul local;
- relația cu footer-ul.

### Compoziție editorială

#### `PageHero`

Variante:

- `program` — mesaj și sistem vizual;
- `editorial` — titlu și introducere;
- `audience` — mesaj direct publicului;
- `offer` — condiții și CTA;
- `gateway` — acces platformă.

Props conceptuale:

- eyebrow;
- title;
- lead;
- primaryAction;
- secondaryAction;
- visual;
- status;
- signature.

#### `ContentSection`

Variante:

- standard;
- split;
- full-bleed;
- dark;
- connected;
- compact.

Componenta nu decide copywriting-ul și nu forțează orice conținut în două coloane.

#### `SectionHeading`

Conține eyebrow, H2, lead și link contextual. Este folosit consecvent, dar nu obligatoriu în fiecare secțiune.

#### `LocalTOC`

Cuprins integrat în `ExplorerRail` pe paginile eligibile. Pe paginile fără rail, poate rămâne o componentă locală compactă. Pe mobil intră în `Sheet`.

#### `RelatedPaths`

Maximum trei destinații contextuale la finalul paginii.

### Sistem vizual EZPLAY

#### `SystemField`

SVG decorativ sau parțial interactiv cu trasee rare.

#### `TraceLine`

SVG path cu stări:

- idle;
- active;
- completed;
- unavailable.

#### `ModuleNode`

Modul geometric inspirat din simbolul EZPLAY.

Stări:

- neutral;
- highlighted;
- selected;
- connected;
- locked numai în platformă, când există o regulă reală.

#### `ComponentArtifact`

Obiect special rar: Core, Sensor, Bridge, Switch, Reservoir, Amplifier sau Memory.

#### `SystemLegend`

Legendă accesibilă pentru orice diagramă cu mai mult de trei tipuri de noduri sau trasee.

### Componente educaționale

#### `DecisionCascade`

Arată:

```text
Decizie → Consecință → Reflecție → Următoarea decizie
```

Desktop: diagramă conectată.

Mobil: pași verticali. Conținutul complet rămâne vizibil fără animație.

#### `FounderLoopDiagram`

Arată exact:

```text
Business Run
→ Founder Debrief
→ Learning Input
→ Business Challenge
→ Level Up
```

Fiecare etapă are:

- nume canonic;
- titlu public;
- explicație;
- stare activă;
- trasee către etapa următoare.

Nu este o roată generică infinită dacă aceasta reduce lizibilitatea pe mobil.

#### `PerspectiveSystem`

Arată cele cinci perspective în jurul participantului sau companiei.

Până la decizia culorilor:

- numele perspectivelor sunt neutre;
- activarea poate folosi spectrul de brand ca efect general;
- token-urile nu poartă numele unei perspective.

#### `SpiralProgression`

Arată că o idee este revizitată cu profunzime mai mare. Nu este un timeline liniar cu module bifate.

#### `ProgramLayers`

Arată relația:

```text
Joc / simulare
→ facilitare
→ reflecție
→ input
→ provocare
→ progres
```

#### `FounderSkillsPreview`

Arată cele cinci perspective în starea `neînceput` fără numere inventate.

### Componente de ofertă și public

#### `AudienceRouter`

Carduri sau panouri pentru tânăr, părinte și organizație. Fiecare are o întrebare, un beneficiu și un CTA.

#### `ExperienceFormatCard`

Conține:

- format;
- pentru cine;
- ce se întâmplă;
- ce urmează;
- disponibilitate.

#### `IntroExperiencePanel`

Pune împreună pașii, condițiile confirmate, obiectul tactil și CTA-ul de solicitare.

#### `OrganizationCollaborationSteps`

Stepper pentru cele patru etape ale colaborării.

#### `RoleResponsibilities`

Comparație între responsabilitățile EZPLAY și ale organizației, accesibilă și pe mobil.

#### `PromiseBoundary`

Două coloane sau panouri: `Ce urmărim` și `Ce nu promitem`. Nu folosește simboluri punitive.

### Cercetare și transparență

#### `EvidenceLevel`

Cele trei niveluri:

- cercetare externă;
- ipoteză EZPLAY;
- observație EZPLAY.

Fiecare are formă și etichetă, nu doar culoare.

#### `ResearchThemeCard`

Conține temă, explicație, consecință pentru design și limită.

#### `SourceCard`

Conține autor, an, tip, rezumat, relevanță, limită și link.

#### `DevelopmentStatus`

Separă `Există acum` de `Se construiește` fără să sugereze date de lansare.

### Instrumente

#### `DeckbuilderPreview`

Folosește imagini reale ale cărților și explică rolul instrumentului.

#### `EconomicRelation`

Vizualizează formula canonică relevantă fără să o redefinească.

#### `CardBrowserPreview`

Preview al bibliotecii, cu filtre și stări. Nu presupune că browserul complet este disponibil.

#### `ToolStatusPanel`

Pentru Deckbuilder și Tableau Builder, cu status textual explicit.

### Formulare

#### `IntentRouter`

Selectează scopul înaintea formularului și afișează câmpurile potrivite.

#### `InquiryForm`

Variantă pentru organizații, părinți, contribuții și contact general.

#### `FormStatusPanel`

Loading, succes, eroare generală și retry.

#### `MinorSafetyNotice`

Mesaj contextual, vizibil și calm. Nu folosește alarmism.

## Iconurile Lucide recomandate

### Navigare și acțiuni

- `ArrowRight`;
- `ArrowLeft`;
- `ChevronDown`;
- `ChevronRight`;
- `Menu`;
- `X`;
- `ExternalLink`;
- `Languages`;
- `LogIn`;
- `Send`;
- `Download` numai când există fișier;
- `Play` numai pentru conținut media sau joc disponibil.

### Feedback

- `Check`;
- `CircleCheck`;
- `Info`;
- `TriangleAlert`;
- `CircleAlert`;
- `LoaderCircle`;
- `RefreshCw`.

### Publicuri și organizare

- `UsersRound`;
- `School`;
- `Building2`;
- `Handshake`;
- `UserRound`;
- `CalendarDays` numai când calendarul există;
- `MapPin` numai pentru o locație confirmată.

Aceste iconuri susțin UI-ul. Nu devin simbolurile oficiale ale perspectivelor sau programului.

## Sistemul de motion

### Rol

Motion-ul trebuie să explice, să confirme sau să orienteze. Dacă eliminarea animației nu schimbă nimic în înțelegere, se preferă CSS simplu sau lipsa efectului.

### Durate

| Tip | Durată recomandată |
|---|---:|
| feedback tactil | `80–140ms` |
| hover / focus / culoare | `140–200ms` |
| meniu / accordion / tabs | `180–280ms` |
| apariție secțiune | `350–550ms` |
| diagramă simplă | `600–900ms` |
| secvență de sistem | `900–1400ms` |

Nu se prelungește animația doar pentru efect cinematografic.

### Easing

- intrare: `cubic-bezier(0.22, 1, 0.36, 1)`;
- schimbare UI: `cubic-bezier(0.4, 0, 0.2, 1)`;
- ieșire: `cubic-bezier(0.4, 0, 1, 1)`;
- spring doar pentru module mici și layout changes, cu bounce redus.

### Rețete aprobate

#### `SectionReveal`

- opacity `0 → 1`;
- y `12 → 0`;
- durata `400–500ms`;
- se rulează o singură dată;
- stagger maximum `60–90ms` pentru 3–5 copii;
- heading-ul nu așteaptă după decor.

#### `TraceReveal`

- SVG `pathLength 0 → 1`;
- opacity `0.4 → 1`;
- durata `700–1200ms`;
- nodul apare după ce traseul ajunge la el;
- reduced motion: traseul apare complet prin opacity.

#### `DecisionRipple`

- utilizatorul selectează o decizie;
- nodul selectat primește contur;
- traseele relevante se activează în ordine;
- modulele afectate își schimbă discret suprafața;
- textul rezultat apare lângă sistem;
- interacțiunea are și variantă click/tap, nu numai hover.

#### `ModuleReconfigure`

- modulele își schimbă poziția prin layout animation;
- distanța este mică și sensul clar;
- nu se rotește întreaga compoziție;
- starea finală este stabilă;
- reduced motion: crossfade între stări.

#### `ArtifactDiscovery`

- componenta specială apare când intră în viewport;
- scale `0.96 → 1` și opacity;
- poate emite o singură pulsație scurtă pe traseul asociat;
- nu clipește și nu pulsează permanent.

#### `ActivePath`

- linkurile, tabs sau cuprinsul local folosesc un mic traseu care se mută între selecții;
- se poate folosi `layoutId`;
- indicatorul nu este singura dovadă a selecției.

#### `RailExpand`

- rail-ul trece între starea icon și starea extinsă prin layout animation;
- etichetele apar numai după ce există spațiu suficient;
- pe desktop larg se reconfigurează și `SidebarInset`;
- pe viewport intermediar panoul devine floating sau offcanvas;
- reduced motion elimină deplasarea amplă și folosește o schimbare directă ori fade.

#### `ActiveTraceMove`

- folosește `layoutId` pentru traseul sau indicatorul activ;
- leagă iconul, grupul și ancora selectată;
- se sincronizează cu ruta și secțiunea curentă;
- nu pulsează permanent.

#### `TactileHover`

- ridicare maximum `2–4px`;
- schimbare ușoară de border sau umbră;
- iconul se deplasează `2–3px`;
- pe touch nu se păstrează stări hover artificiale.

### Hero-ul homepage-ului

La primul load:

1. eyebrow, H1, lead-ul și CTA-urile sunt vizibile imediat, fără fade, scale sau stagger de intrare;
2. sistemul vizual pornește numai după ce mesajul poate fi citit;
3. 2–3 trasee se desenează;
4. modulele apar în ordinea conexiunilor;
5. o componentă specială poate marca finalul secvenței;
6. sistemul intră în stare stabilă.

Orice secvență vizuală complementară nu depășește aproximativ 1,4 secunde și nu blochează interacțiunea sau afișarea conținutului editorial. Aceeași regulă de afișare imediată se aplică hero-ului paginii Program.

După secvență nu există loop vizual agresiv. Poate rămâne o mișcare ambientală aproape imperceptibilă la 8–12 secunde sau sistemul poate rămâne complet static.

### Scroll

Se folosesc:

- `whileInView` pentru apariții simple;
- `useScroll` și `useTransform` numai în 1–2 diagrame importante;
- sticky numai când ajută comparația sau explicarea unei secvențe;
- scroll nativ.

Nu se folosesc:

- scroll hijacking;
- pagini care cer scroll mare pentru puțin conținut;
- secțiuni pinned mai lungi de 1,5–2 viewport-uri;
- parallax pe text;
- transformări 3D ale paginii;
- animarea permanentă a fundalului;
- cursor custom sau magnetic;
- efecte care întârzie navigarea.

### Carousels

- nu pornesc automat;
- au Previous, Next și indicator de poziție;
- suportă swipe și tastatură;
- controalele sunt în afara zonei de drag;
- conținutul curent este anunțat accesibil;
- pe mobil poate fi folosit overflow cu preview al următorului card;
- dacă toate elementele încap într-un grid lizibil, nu se folosește carousel.

### Tabs

- prima opțiune este selectată logic, nu aleator;
- tablist-ul poate face scroll orizontal pe mobil;
- conținutul esențial nu depinde de hover;
- schimbarea folosește crossfade și indicator `layoutId`;
- URL hash sau query se folosește când utilizatorul trebuie să poată distribui starea.

### Formulare

- câmpurile condiționate folosesc `AnimatePresence` numai pentru opacity și height controlat;
- mesajele de eroare nu împing brusc pagina cu zeci de pixeli dacă spațiul poate fi rezervat;
- butonul loading păstrează eticheta sau o alternativă accesibilă;
- succesul nu apare doar ca toast; este vizibil în zona formularului;
- toast-ul completează feedbackul, nu îl înlocuiește.

## Reduced motion

La nivel global:

```text
MotionConfig reducedMotion="user"
```

Pentru utilizatorii cu reduced motion:

- se elimină parallax și layout movement;
- traseele apar direct sau prin fade;
- modulele nu se reconfigurează prin deplasare amplă;
- nu pornește video automat;
- carousels nu avansează automat în nicio situație;
- conținutul rămâne complet și în aceeași ordine semantică.

## Performanță

- CSS transitions pentru hover, focus, culoare și transformări mici;
- Motion numai în componente client care au interacțiune sau secvență;
- restul paginii rămâne Server Component unde este posibil;
- SVG inline optimizat pentru trasee și module;
- fără filtre SVG costisitoare pe suprafețe mari;
- imaginile au dimensiuni cunoscute și aspect ratio rezervat;
- componentele vizuale grele sunt lazy-loaded sub fold;
- animațiile folosesc în principal `opacity` și `transform`;
- nu se animă simultan zeci de elemente;
- CLS trebuie evitat prin dimensiuni stabile;
- JS-ul de motion nu este încărcat pentru elemente pur decorative care pot folosi CSS.

## Matricea stărilor obligatorii

Fiecare componentă interactivă relevantă trebuie să specifice și să implementeze:

- default;
- hover, când există pointer;
- focus-visible;
- active / pressed;
- selected;
- disabled;
- loading;
- success, dacă produce o acțiune;
- error, dacă poate eșua;
- empty, dacă depinde de date;
- unavailable / in development, dacă funcția nu este publică.

O captură desktop în starea default nu reprezintă o componentă finalizată.

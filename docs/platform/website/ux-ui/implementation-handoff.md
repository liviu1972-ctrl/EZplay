---
title: "EZPLAY.org — handoff UX/UI pentru implementare"
status: Draft
version: "0.2"
last_updated: 2026-07-16
owners:
  - EZPLAY
scope:
  - ezplay.org
  - implementare frontend
  - control de calitate UX/UI
---

# EZPLAY.org — handoff UX/UI pentru implementare

## 1. Scop

Acest document îi spune agentului de implementare cum să transforme pachetul editorial și specificația UX/UI într-un produs coerent. Implementarea continuă pe platforma tehnică existentă, conform `docs/platform/website/existing-platform-continuity.md`; nu prescrie o rescriere tehnică și nu presupune că prototipul actual este produsul dorit.

Rezultatul urmărit este un site educațional matur, în care utilizatorul înțelege rapid că EZPLAY construiește programe și experiențe de educație antreprenorială. Jocurile și instrumentele interactive sunt parte din metodă, nu identitatea principală afișată în primul ecran.

## 2. Surse obligatorii

Ordinea de lectură este:

1. `docs/context/what-is-ezplay.md`;
2. `docs/context/brand-positioning.md`;
3. `docs/context/ezplay-vision.md`;
4. `docs/methods/economic-model.md`;
5. `docs/roadmap/current-assets.md`;
6. `docs/platform/ezplay-org-product-direction.md`;
7. `docs/platform/website/blueprint-v1.md`;
8. `docs/platform/website/existing-platform-continuity.md`;
9. `docs/platform/website/copy-rules.md`;
10. fișierul de copy al paginii implementate;
11. `docs/platform/website/ux-ui/navigation-system.md`;
12. toate documentele din acest folder UX/UI.

Copy-ul din `docs/platform/website/pages/` este sursa editorială. Poate fi adaptat ca lungime numai pentru integrarea în componentă, fără schimbarea promisiunii, terminologiei sau sensului. O modificare editorială importantă se întoarce în documentul-sursă, nu rămâne numai în cod.

`docs/platform/website/content-evidence-map.md` este controlul de publicare pentru afirmații. Înainte ca o rută să intre în build-ul public, implementarea trebuie să confirme că blocurile `De confirmat` și `Blocat` au fost eliminate, înlocuite cu starea reală sau rezolvate prin dovadă și drepturi documentate.

Pentru imagini, logo-uri, testimoniale, citate, rezultate și contribuții, fișierul implementat trebuie să poată fi legat de un ID `RIGHT-xxx` și, când este necesar, de un ID `PERM-xxx`. Lipsa lanțului exclude activul din build.

## 3. Audit tehnic înainte de instalare

Codul Next.js se află în același repository. Înainte să modifice sau să instaleze ceva, agentul inspectează:

- versiunea reală de Next.js și tipul de router;
- `package.json` și managerul de pachete;
- configurația Tailwind și instalarea shadcn/ui, dacă există;
- rutele, layout-urile și componentele actuale;
- ruta funcțională a Deckbuilder-ului și dependențele ei;
- dependențele dintre pagina veche `/cards`, configuratorul vechi `/cards3` și jocul `/ezplay`;
- mecanismul de localizare pentru română și engleză;
- sursa și modul de afișare a versiunii aplicației;
- autentificarea Supabase și stările de sesiune;
- schemele, operațiile și politicile RLS relevante;
- accesul la Supabase Storage;
- variabilele de mediu, fără expunerea secretelor;
- verificările existente: lint, typecheck, teste și build.

Documentația nu impune o versiune de framework. Se lucrează cu versiunea proiectului după audit; orice upgrade cu risc sau arie mai mare se propune separat.

Auditul trebuie să producă o hartă explicită `păstrează / adaptează / înlocuiește / elimină`. Se păstrează infrastructura Next.js–Vercel–Supabase, autentificarea și login-ul, baza de date și imaginile, Deckbuilder-ul, capabilitatea RO/EN și afișarea versiunii. Suprafețele publice actuale — inclusiv homepage, meniu, footer, `/cards`, About și How it Works — nu se reutilizează ca UX/UI. Configuratorul `/cards3` se scoate din navigare și se elimină după verificarea dependențelor; nu se redesenează și nu se migrează.

## 4. Stack și roluri

| Strat | Alegere | Rol |
|---|---|---|
| Framework | Next.js existent | routing, rendering, layout-uri și pagini |
| Hosting | Vercel | preview-uri și producție |
| Date și identitate | Supabase | autentificare, bază de date și Storage |
| Primitive UI | shadcn/ui | comportamente accesibile, personalizate pentru EZPLAY |
| Iconuri | Lucide React | iconografie funcțională discretă |
| Mișcare | Motion pentru React | reveal-uri, trasee, reconfigurări și feedback tactil |
| Carusel | Embla direct sau prin shadcn/ui | carusele controlabile, numai unde sunt necesare |
| Imagini și fonturi | facilitățile Next.js | încărcare optimizată și stabilitate de layout |
| Formulare | soluția existentă; altfel React Hook Form + Zod | validare și integrare cu Supabase |

Reguli:

- nu instala o bibliotecă dacă proiectul are o soluție echivalentă sănătoasă;
- nu combina două biblioteci de animație pentru aceleași efecte;
- nu adăuga un al doilea sistem de iconuri;
- nu folosi JavaScript pentru un efect realizabil clar prin CSS;
- nu introduce GSAP, Lenis, Three.js, React Three Fiber, WebGL, Lottie sau Rive în v1 fără un caz aprobat;
- importă iconurile individual și păstrează componentele client la limita interacțiunii.

Detaliile sunt în `components-and-motion.md`.

## 5. Arhitectura logică a interfeței

Aceasta este o separare de responsabilități, nu o comandă de reorganizare a folderelor.

### App shell

- `SiteHeader`, `DesktopNavigation`, `ExplorerRail`, `MobileNavigationSheet`, `LanguageSwitcher`, `VersionIndicator`, `SiteFooter`;
- skip link și gestionarea focusului;
- layout-uri pentru pagini publice și zone autentificate.

### Layout editorial

- `PageShell`, `PageHero`, `ContentSection`, `SectionIntro`;
- `LocalTOC`, `QuoteBlock`, `EvidenceBlock`, `CTASection`.

### Limbaj vizual de sistem

- `SystemField`, `TraceLine`, `ModuleNode`, `ComponentArtifact`;
- `DecisionCascade`, `PerspectiveSystem`, `SpiralProgression`.

Acestea formează o singură familie, cu aceleași grosimi de linie, raze, culori, stări și logică de mișcare. Nu se redesenează independent pe fiecare pagină.

### Componente educaționale

- `FounderLoopDiagram`, `ProgramLayers`, `FounderSkillsPreview`;
- `ExperienceCard`, `AudiencePathCard`, `OutcomeCluster`, `ReflectionPrompt`.

### Conversie și date

- `ContactForm`, `OrganizationInquiryForm`;
- stări de autentificare;
- stări loading, empty, error și success;
- componente Supabase numai unde datele sunt cu adevărat dinamice.

## 6. Design tokens și shadcn/ui

Token-urile din `visual-system.md` se transpun în variabile CSS semantice, nu în valori răspândite prin componente:

```css
--color-canvas
--color-surface
--color-surface-soft
--color-ink
--color-text-muted
--color-border
--color-focus
--color-accent-primary
--color-accent-secondary
--radius-control
--radius-card
--shadow-raised
--space-section
--content-measure
```

Paleta implicită este luminoasă și caldă. Zonele întunecate pot apărea local pentru ritm, dar site-ul nu devine o interfață dark-tech. Culorile brandului funcționează ca semnale și categorii, nu apar toate simultan în fiecare secțiune.

Componentele shadcn/ui sunt primitive, nu designul final. Ele trebuie aduse în limbajul EZPLAY prin token-uri, tipografie, spațiere, stări și compoziție.

## 7. Fonturi

Direcția recomandată:

- Manrope pentru titluri, navigație și interfață;
- Source Sans 3 pentru text editorial și formulare.

Înainte de adoptare se verifică licența, diacriticele românești, randarea pe sisteme uzuale, greutățile folosite și impactul asupra performanței. Se încarcă doar subseturile și greutățile necesare. Dacă fonturile nu trec proba vizuală, se păstrează rolurile tipografice și se propune o alternativă explicită.

## 8. Imagini și Supabase Storage

Imaginile cu cărți și celelalte active din Storage sunt active de produs, nu decorațiuni generice.

V1 nu include un flux separat de producție a imaginilor și nu depinde de active generate cu AI sau de o ședință foto nouă. Agentul construiește mai întâi paginile cu sistemul vizual din cod și folosește numai logo-ul și activele reale deja accesibile. După evaluarea site-ului funcțional, imaginile suplimentare vor fi comandate punctual.

Pentru fiecare imagine:

- stabilește dimensiunile sau raportul de aspect înainte de încărcare;
- configurează numai originile necesare;
- păstrează un crop controlat pentru context;
- scrie text alternativ după rol;
- definește o stare de eroare care nu rupe layout-ul;
- evită variantele originale supradimensionate;
- nu include text important în imagine.

Conceptele cu plăci electronice sunt referințe de direcție. Nu se folosesc drept dovezi de produs sau sursă de text. Dacă o asemenea compoziție ajunge în producție, activele sunt reconstruite controlat.

## 9. Responsive design

Fiecare pagină se validează cel puțin la aproximativ 390, 768, 1024 și 1440 px. Se păstrează breakpoints existente dacă sunt coerente.

- textul editorial păstrează o măsură confortabilă;
- diagramele se recompun sau devin secvențe verticale;
- liniile de sistem nu traversează textul pe mobil;
- caruselele indică existența conținutului suplimentar;
- controalele nu depind de hover;
- meniul mobil arată căile importante și CTA-ul principal fără ambiguitate.

## 10. Accesibilitate

Ținta este WCAG 2.2 nivel AA. Minimul de livrare include:

- structură semantică și skip link;
- navigare integrală cu tastatura;
- focus vizibil și ordine logică;
- contrast verificat pentru text, controale și stări;
- etichete persistente și erori asociate câmpurilor;
- nume accesibile pentru butoane;
- iconuri decorative ascunse tehnologiilor asistive;
- alternative text pentru conținut relevant;
- utilizare completă cu `prefers-reduced-motion`;
- nicio informație transmisă numai prin culoare sau mișcare;
- zone de interacțiune proiectate în general la minimum 44 × 44 px.

Animația traseelor este un strat explicativ suplimentar. Relațiile importante rămân inteligibile când animația este oprită.

## 11. Mișcare

Mișcarea trebuie să exprime o decizie, propagarea unui efect, reconfigurarea sistemului, descoperirea unui detaliu sau schimbarea unei stări.

Nu se animează doar pentru ca pagina să pară vie. Hero-ul poate avea o secvență scurtă, apoi intră într-o stare calmă. Nu se folosesc loop-uri agresive, scroll hijacking, text cu parallax sau cursor personalizat.

Caruselele sunt controlabile manual. Autoplay-ul nu este necesar în v1. Tab-urile, acordioanele și dialogurile păstrează comportamentul de tastatură al primitivelor accesibile.

## 12. Formulare și siguranță

Fiecare formular are scop explicit, câmpuri minime, labels persistente, validare calmă, prevenirea trimiterii duble și stări clare de succes sau eroare. Mesajul de succes spune pasul următor și o așteptare realistă. Se adaugă protecție anti-spam și informarea privind datele.

Orice funcție destinată minorilor este zonă de siguranță ridicată și nu se publică înaintea clarificării consimțământului, datelor colectate și regulilor operaționale.

## 13. Ordinea de implementare

### Etapa 0 — audit

- inventariază codul și rulează verificările existente;
- identifică ce se păstrează, adaptează, înlocuiește sau elimină;
- protejează prin scenarii de regresie autentificarea, accesul la datele și imaginile cărților și Deckbuilder-ul;
- confirmă că eliminarea `/cards3` nu rupe module folosite de `/ezplay`;
- documentează riscurile reorganizărilor.

### Etapa 1 — fundație

- scoate `/cards3` din navigarea publică, fără a șterge încă dependențe neverificate;
- token-uri, fonturi, grid și containere;
- header orizontal, `ExplorerRail` extensibil, navigație mobilă, selector RO/EN, versiune vizibilă și footer;
- variantele de shell `rail complet`, `rail contextual` și `fără rail`;
- focus, butoane, linkuri, formulare și stări de bază.

### Etapa 2 — biblioteca EZPLAY

- layout editorial, carduri și CTA-uri;
- trasee, noduri și componente speciale;
- diagrame educaționale;
- setul minim de motion recipes.

### Etapa 3 — homepage complet

- folosește copy real;
- validează primul ecran, ritmul și responsive design-ul;
- verifică dacă sistemul rămâne educațional și uman;
- corectează biblioteca înainte de multiplicare.

### Etapa 4 — pagini principale

1. `/program`;
2. `/how-we-learn`;
3. `/experiences`;
4. `/for/young-people`;
5. `/for/parents`;
6. `/for/organizations`;
7. `/research`;
8. `/about`;
9. `/contact`.

### Etapa 5 — pagini specializate

1. `/experiences/introduction`;
2. `/tools`;
3. `/development`;
4. `/platform`.

Ultimele două nu transformă viziunea în promisiune publică. Conținutul lor se verifică față de starea reală.

### Etapa 6 — integrare și QA

- conectează numai datele necesare;
- elimină controlat implementarea `/cards3` și adaugă redirect-ul decis către `/tools`;
- reverifică separat Deckbuilder-ul după eliminare;
- verifică toate stările;
- auditează tastatura și reduced motion;
- măsoară performanța;
- rezolvă regresiile înainte de lansare.

## 14. Ținte de performanță

Pentru paginile publice, țintele de teren sunt:

- LCP cel mult 2,5 secunde;
- INP cel mult 200 ms;
- CLS cel mult 0,1;
- măsurare la percentila 75, separat unde este relevant pentru mobil și desktop.

Sunt ținte de produs, nu rezultate declarabile fără măsurare. În plus:

- componentele client rămân la limita interacțiunii;
- layout-ul rezervă spațiu imaginilor și conținutului dinamic;
- efectele sub fold nu intră inutil în bundle-ul critic;
- erorile de consolă și warning-urile de hidratare nu sunt acceptate.

## 15. Checklist de acceptanță

### Conținut

- primul ecran comunică educație antreprenorială;
- jocul nu domină hero-ul și nu definește categoria proiectului;
- textele provin din sursele editoriale;
- terminologia este consecventă;
- viziunea nu apare drept funcție existentă;
- formulele economice nu sunt reinterpretate.

### Navigare și UI

- fiecare pagină are un obiectiv și un pas următor;
- tinerii, părinții și organizațiile își găsesc calea fără jargon intern;
- site-ul nu arată ca tema implicită a unei biblioteci;
- paleta este caldă, luminoasă și controlată;
- traseele și piesele speciale sunt rare și semnificative;
- fiecare pagină are o compoziție memorabilă în același sistem.
- header-ul orizontal și rail-ul vertical coexistă fără dublarea integrală a navigării;
- rail-ul se extinde prin click și tastatură, iar iconurile colapsate au tooltip și nume accesibil;
- rutele folosesc varianta de shell stabilită în `navigation-system.md`;
- versiunea și RO/EN rămân accesibile în toate variantele relevante;

### Responsive, accesibilitate și tehnic

- paginile sunt verificate la lățimile de referință;
- nu există overflow accidental;
- ordinea de lectură rămâne logică;
- meniul, tab-urile, acordioanele, caruselele și formularele funcționează cu tastatura;
- reduced motion elimină transformările nenecesare;
- lint, typecheck, testele existente și build-ul trec;
- nu sunt expuse secrete sau date personale;
- politicile Supabase atinse sunt verificate;
- autentificarea cu Google și Deckbuilder-ul trec verificările de regresie;
- `/cards3` nu mai este o suprafață de produs și nu mai apare în navigare;
- suprafețele publice vechi nu sunt reutilizate ca design sau structură;
- româna și engleza sunt complete pentru rutele publicate, iar versiunea reală este vizibilă;
- imaginile au dimensiuni, crop, `sizes` și alternative corecte;
- nu există erori de consolă sau hidratare;
- performanța este măsurată, nu estimată.

## 16. Livrabile așteptate de la agent

La predare, agentul oferă:

1. rutele implementate;
2. inventarul componentelor;
3. deciziile de adaptare la codul real;
4. capturi la aproximativ 1440 și 390 px;
5. rezultatele lint, typecheck, teste și build;
6. verificările de tastatură și reduced motion;
7. măsurătorile de performanță disponibile;
8. golurile editoriale, activele temporare și riscurile;
9. diferențele intenționate față de documentație.

Nu se declară pagina finală dacă folosește placeholder-e neidentificate, promisiuni neverificate, active generate prezentate drept produs real sau componente neverificate responsive.

## 17. Criteriul final

Implementarea reușește când vizitatorul simte că EZPLAY este o organizație educațională cu o metodă serioasă și un sistem amplu, dar poate înțelege site-ul fără efort.

Profesionalismul vine din arhitectură, claritate, consecvență și detalii. Personalitatea vine din felul în care EZPLAY face vizibile legăturile dintre decizii, resurse și consecințe — nu din imitarea unei interfețe pentru programatori și nici din expunerea jocului ca produs principal.

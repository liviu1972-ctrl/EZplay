---
status: Draft
version: "0.2"
updated: 2026-07-16
---

# Specificații UX/UI pentru paginile ezplay.org

## Cum se folosește documentul

Pentru fiecare rută, copywriting-ul din `../pages/` este sursa textului. Acest document stabilește:

- ordinea și compoziția vizuală;
- componentele;
- interacțiunile;
- elementul memorabil al paginii;
- comportamentul responsive;
- ce trebuie evitat.

Agentul nu înlocuiește textele cu lorem ipsum și nu scurtează mesajele înainte să testeze layout-ul cu copy-ul real.

## Sistemul comun al paginilor

### Începutul paginii

Ordine standard:

1. `SiteHeader`;
2. `ExplorerRail`, numai în varianta stabilită pentru rută;
3. breadcrumb, exceptând homepage-ul;
4. `PageHero`;
5. cuprins local integrat în rail sau în varianta mobilă;
6. conținutul principal.

### Încheierea paginii

Ordine standard:

1. CTA final;
2. `RelatedPaths` cu maximum trei destinații;
3. `SiteFooter`.

Nu se repetă în `RelatedPaths` destinația CTA-ului principal.

### Densitate

- maximum 2–3 paragrafe lungi într-un bloc fără element de orientare;
- listele cu peste cinci elemente primesc structură vizuală;
- maximum patru carduri egale pe un rând desktop;
- secțiunile consecutive alternează compoziția;
- paginile de public sunt mai directe decât paginile de metodă;
- paginile de cercetare și platformă acceptă densitate mai mare.

### Stări fără active

Dacă lipsește o fotografie, un testimonial sau un calendar:

- secțiunea se reconstruiește cu diagramă, copy și spațiu;
- nu se afișează placeholder public;
- nu se folosește stock generic;
- nu se inventează dovada.

---

# Shell de navigare pe rute

Toate paginile publice folosesc header-ul orizontal. `ExplorerRail` se aplică diferențiat, conform `navigation-system.md`:

| Mod | Rute |
|---|---|
| complet | `/`, `/program`, `/how-we-learn`, `/experiences`, `/research`, `/tools`, `/development` |
| contextual, implicit colapsat | `/for/young-people`, `/for/parents`, `/for/organizations`, `/about` |
| fără rail persistent | `/experiences/introduction`, `/contact`, `/platform`, auth, juridic, `/ezplay` |

Specificațiile de pagină presupun acest shell. O compoziție 7/5, 8/4 sau full-bleed se calculează în canvasul rămas după rail, nu în întregul viewport.

---

# 1. Homepage — `/`

## Obiectiv UX

Vizitatorul trebuie să înțeleagă în primul viewport că EZPLAY dezvoltă programe de educație antreprenorială pentru tineri prin experiență. Până la final, trebuie să poată alege între program, experiența introductivă, pagina pentru organizații și dezvoltarea proiectului.

## Element memorabil

Un `LivingCompanySystem` în hero: o hartă luminoasă, construită din trasee, module și o componentă specială. Nu este o masă de joc și nu este o diagramă tehnică de infrastructură.

### Comportament

- la load se construiește o relație simplă între 3–5 module;
- la hover/tap pe un modul se activează traseele conexe;
- explicațiile scurte folosesc limbajul: decizie, resurse, consecință, adaptare;
- sistemul nu cere interacțiune pentru a fi înțeles;
- pe mobil devine o compoziție statică sau o singură relație activabilă.

## Structură

### 1. Hero — `ProgramHero`

Desktop:

- grid 7/5;
- stânga: etichetă, H1, lead, CTA-uri, semnătură;
- dreapta: `LivingCompanySystem`;
- sub lead, o propoziție despre primul program pentru tineri;
- fără logo-uri de parteneri sau cifre neverificate.

Mobil:

- copy înaintea vizualului;
- CTA-urile stacked și full-width la ecrane înguste;
- semnătura nu concurează cu H1;
- vizualul ocupă maximum 45–55% din înălțimea primului viewport suplimentar.

### 2. Diferența EZPLAY — `ExperienceContrast`

Compoziție split:

- stânga: ordinea tradițională, redusă vizual;
- dreapta: ordinea EZPLAY, activă;
- un `Switch` component marchează inversarea;
- nu atacă școala și nu folosește simboluri negativiste.

### 3. Parcursul simplu — `DecisionCascade`

- patru pași conectați;
- fiecare pas are verb, explicație și micro-vizual;
- click/tap activează pasul și consecința;
- pe mobil este un traseu vertical;
- o singură componentă `Memory` poate marca reflecția.

### 4. Primul program — `ProgramOverview`

- panou editorial mare, nu grid de feature-uri;
- un vizual cu participantul în centru și trasee care se deschid;
- CTA către `/program`;
- vârstele apar ca intervale, nu ca segmente rigide de produs;
- nu se afișează curriculum complet aici.

### 5. Ce dezvoltă participantul — `OutcomeField`

- cinci rezultate în compoziție asimetrică;
- fiecare rezultat este o capacitate, nu o promisiune de succes;
- modulele pot apărea conectate, dar cardurile rămân lizibile independent;
- pe mobil devin o listă vizuală, nu carousel.

### 6. Cele cinci perspective — `PerspectiveSystem`

- secțiune interactivă principală;
- participantul sau compania în centru;
- cinci perspective dispuse în jur;
- selectarea uneia afișează explicația și legăturile cu alte perspective;
- nu asociază permanent culorile înaintea deciziei canonice;
- legendă și listă textuală completă;
- CTA către arhitectura programului.

### 7. Dincolo de joc — `ProgramLayers`

- straturi vizuale care pornesc de la instrument și ajung la progres;
- jocul ocupă primul strat, nu întreaga secțiune;
- Founder Debrief, Learning Input și Business Challenge sunt vizibile;
- o fotografie a cărților poate apărea doar în stratul instrumentului;
- fundalul poate deveni temporar charcoal pentru a evidenția traseul.

### 8. Experiența introductivă — `IntroExperiencePanel`

- prima secțiune tactilă amplă;
- fotografie reală top-down sau compoziție cu cărți reale;
- copy, pași, status și CTA;
- durata/prețul nu apar până la confirmare;
- un port vizual leagă secțiunea de pagina programului.

### 9. Pentru cine construim — `AudienceRouter`

- trei intrări: tânăr, părinte, organizație;
- cardurile au compoziții diferite discret, nu trei copii perfecte;
- fiecare include întrebarea publicului, răspunsul scurt și CTA;
- pe mobil ordinea este tânăr, părinte, organizație;
- pagina pentru organizații poate avea accent vizual mai puternic datorită conversiei curente.

### 10. Cercetare — `EvidencePreview`

- prezintă diferența dintre sursă, ipoteză și observație;
- maximum trei exemple;
- limitarea este vizibilă, nu ascunsă în tooltip;
- CTA către `/research`;
- aspect editorial calm.

### 11. Instrumentele — `ToolWindow`

- un preview al Deckbuilder-ului și o mențiune Tableau Builder;
- ocupă mai puțin spațiu decât programul;
- imaginile reale ale cărților, nu randarea AI;
- status explicit;
- CTA către `/tools`.

### 12. Dezvoltarea proiectului — `BuildWithUsPanel`

- comparație scurtă `Există / Construim`;
- o componentă `Bridge` sugerează participarea;
- CTA către `/development`;
- nu folosește progress bar procentual.

### 13. CTA final — `ConnectedCTA`

- suprafață închisă sau contrastantă;
- traseele paginii converg vizual spre CTA;
- CTA principal: program sau experiență, conform copy-ului;
- CTA secundar: organizații/dezvoltare;
- fără formular în homepage v1.

## Ce evităm

- jocul ca hero;
- carduri de funcții digitale în primul ecran;
- cont în CTA principal;
- logo wall fără permisiuni;
- carousel automat;
- mai mult de două secțiuni pinned;
- circuit board ca fundal continuu.

---

# 2. Programul — `/program`

## Obiectiv UX

Pagina trebuie să transforme promisiunea homepage-ului într-o arhitectură de program ușor de înțeles și suficient de profundă pentru un adult decident.

## Element memorabil

`ProgramMap`: început comun, Founder Rounds, cinci perspective și trasee care se dezvoltă în spirală.

## Structură

1. `PageHero program` — H1, lead, CTA experiență introductivă, preview al hărții;
2. `AudienceRange` — pentru cine este, cu accent pe nivel și experiență, nu doar vârstă;
3. `CommonStart` — traseu scurt pentru experiența introductivă;
4. `FounderLoopDiagram` — cele cinci etape, complet și interactiv;
5. `PerspectiveSystem` — cele cinci perspective;
6. `SpiralProgression` — trei reveniri exemplificative asupra unei idei, fără a inventa curriculum;
7. `PathChoice` — libertate ghidată, prerechizite și trasee;
8. `IndividualTeamSplit` — individ vs echipă, două panouri conectate;
9. `FounderSkillsPreview` — toate perspectivele `neînceput`;
10. `PromiseBoundary` — ce este și ce nu este programul;
11. CTA final către experiența introductivă.

## Cuprins local

- Începutul;
- Founder Rounds;
- Perspective;
- Progresie;
- Traseu;
- Progres.

## Responsive

- `ProgramMap` devine o secvență verticală;
- Founder Loop nu se comprimă într-un cerc ilizibil;
- cuprinsul trece în `Sheet`;
- tabelele conceptuale devin cards cu heading-uri repetate.

## Ce evităm

- hartă curriculară cu lecții inventate;
- level map de joc video;
- lacăte și XP numerice;
- vârste folosite ca singura progresie;
- prea multe culori active simultan.

---

# 3. Cum învățăm — `/how-we-learn`

## Obiectiv UX

Pagina trebuie să arate cum o experiență devine învățare, fără să transforme Founder Loop într-un slogan dominant sau într-o metodă pretins validată.

## Element memorabil

`DecisionToUnderstanding`: aceeași situație înainte și după reflecție și Learning Input.

## Structură

1. `PageHero editorial` cu o decizie vizuală incompletă;
2. `DecisionToUnderstanding` — experiență, reflecție, instrument, aplicare;
3. `FounderRoundContext` — rolul sesiunii;
4. `FounderLoopDiagram` — principalul element interactiv;
5. `LearningInputReveal` — arată de ce informația apare la momentul potrivit;
6. `FacilitatorRole` — facilitatorul, materialele, întrebările și sprijinul;
7. `GameAsLab` — jocurile drept laboratoare, cu obiect tactil;
8. `IndividualTeamSplit`;
9. `EvidencePreview` cu link către cercetare;
10. CTA către experiența introductivă.

## Interacțiune

În `DecisionToUnderstanding`, utilizatorul poate comuta între:

- ce vede înainte de debrief;
- ce poate explica după reflecție;
- ce poate aplica într-o situație nouă.

Nu se notează participantul și nu se sugerează un răspuns corect unic.

## Ce evităm

- diagrama Kolb copiată;
- Founder Loop ca cerc decorativ fără explicație;
- „learning science” ca autoritate vizuală;
- iconuri academice generice;
- video autoplay.

---

# 4. Experiențe — `/experiences`

## Obiectiv UX

Vizitatorul compară formatele și găsește punctul de intrare potrivit.

## Element memorabil

`ExperienceSelector`: o alegere ghidată după familiaritate, context și obiectiv.

## Structură

1. `PageHero editorial`;
2. `IntroExperiencePanel` — experiența introductivă, cea mai vizibilă;
3. `FounderRoundCollection` — teme și structură, fără ofertă inventată;
4. `CompetitionContext` — competiția ca engagement, nu evaluare;
5. `FormatTabs` — fizic, digital, hibrid;
6. `ExperienceSelector` — întrebări simple și recomandare contextuală;
7. `OrganizationPanel`;
8. CTA final.

## Interacțiune

`ExperienceSelector` nu este quiz de marketing. Are maximum trei întrebări și recomandă:

- experiența introductivă;
- o discuție despre parcurs;
- exprimarea interesului;
- informații suplimentare.

Nu colectează date înainte să afișeze recomandarea.

## Responsive

- formatele devin tabs scrollabile sau accordion;
- selectorul rămâne o singură întrebare per ecran logic;
- nu se folosește carousel pentru toate formatele.

---

# 5. Experiența introductivă — `/experiences/introduction`

## Obiectiv UX

Pagina trebuie să facă oferta concretă și să permită unei organizații să înceapă o conversație relevantă.

## Element memorabil

O fotografie sau compoziție top-down cu instrumentul real, legată vizual de pașii experienței.

## Structură

1. `PageHero offer` — status, ce este, CTA, fără preț/durată neconfirmate;
2. `PurposePanel` — de ce există înaintea Founder Rounds;
3. `ExperienceSteps` — pregătire, joc, observare, debrief;
4. `DebriefQuestionRail` — întrebări ca mostre, manual control;
5. `DiscoveryOutcomes` — ce poate descoperi participantul;
6. `OfferFacts` — format, grup, loc, durată și condiții; câmpurile neconfirmate nu sunt randate;
7. `AudienceFit` — potrivit / de discutat;
8. `NextStep` — legătura cu Founder Rounds;
9. `InquiryForm organization`;
10. CTA alternativ pentru tineri/părinți.

## Formular

- desktop: formular 7/5 cu sumar sticky;
- mobil: sumar înaintea formularului;
- formularul nu cere date despre minori;
- mesajul de succes arată ce a fost trimis și următorul pas generic;
- dacă oferta nu este încă disponibilă, CTA-ul devine `Anunță-mă` sau contact.

## Ce evităm

- buton `Cumpără`;
- countdown;
- locuri rămase inventate;
- fotografie generată drept dovadă;
- testimonial placeholder.

---

# 6. Pentru tineri — `/for/young-people`

## Obiectiv UX

Tânărul trebuie să simtă că va decide și experimenta, nu că va primi încă o lecție.

## Element memorabil

`ChoiceMoment`: o decizie scurtă cu două opțiuni rezonabile și consecințe diferite, fără scor.

## Structură

1. `PageHero audience` cu energie vizuală mai mare, dar fără masă de joc dominantă;
2. `ChoiceMoment`;
3. `WhatYouDo` — acțiuni, nu competențe abstracte;
4. `FailureAsFeedback` — restart și adaptare;
5. `NotAnotherClass` — comparație pozitivă;
6. `NoBusinessRequired`;
7. `PerspectiveDiscovery` — cinci zone, limbaj simplu;
8. `IndividualTeamSplit`;
9. `FirstStep`;
10. `SafeInterestPath` — implică adultul potrivit.

## Stil

- ritm mai rapid;
- mai multe obiecte și culori;
- paragrafe mai scurte;
- fără slang artificial;
- fără mascote;
- fără infantilizare.

## Ce evităm

- formular individual cu date sensibile;
- leaderboard;
- badge-uri;
- „devino CEO”;
- promisiunea unei afaceri;
- mesaj construit numai pentru părinți.

---

# 7. Pentru părinți — `/for/parents`

## Obiectiv UX

Părintele înțelege valoarea educațională, limitele, vârstele, primul pas și condițiile de siguranță.

## Element memorabil

`ExperienceToCapability`: o relație clară între ce face participantul, ce observă și ce poate exersa.

## Structură

1. `PageHero audience` calm și cald;
2. `WhyEntrepreneurship` — sistem și decizii, nu carieră obligatorie;
3. `ExperienceToCapability`;
4. `OutcomeField` adaptat părinților;
5. `AgeAndReadiness` — vârsta plus nivelul de autonomie;
6. `IntroExperiencePanel`;
7. `PromiseBoundary`;
8. `EvidencePreview`;
9. `MinorSafetyNotice` extins;
10. formular de interes.

## Stil

- mai mult spațiu editorial;
- explicații și limite vizibile;
- accente calde;
- fotografii reale cu interacțiune, numai după acorduri;
- fără frică despre „viitorul copiilor”.

---

# 8. Pentru organizații — `/for/organizations`

## Obiectiv UX

Un decident trebuie să poată evalua colaborarea și să trimită un context suficient pentru următorul pas.

## Element memorabil

`CollaborationMap`: ce aduce EZPLAY, ce aduce organizația și unde se întâlnesc în experiența participantului.

## Structură

1. `PageHero offer` cu CTA conversație;
2. `OrganizationTypes` — patru contexte;
3. `WhatEZPLAYBrings` — cinci componente, nu feature cards SaaS;
4. `StartOptions` — experiență, parcurs, acces, contribuție;
5. `OrganizationCollaborationSteps`;
6. `CollaborationMap` / `RoleResponsibilities`;
7. `QualityConditions` — format și limite;
8. `PromiseBoundary`;
9. `InquiryForm organization` cu sumar;
10. CTA final.

## Cuprins local

- Pentru cine;
- Ce aduce EZPLAY;
- Cum începem;
- Roluri;
- Calitate;
- Formular.

## Formular

- secțiune distinctă, nu modal;
- poate preselecta interesul din cardurile anterioare;
- câmpurile selectate sunt reflectate în sumar;
- fără upload în v1;
- fără programare automată dacă nu există calendar real.

## Ce evităm

- pachete comerciale inventate;
- logo wall;
- studii de caz fără documentare;
- cifre de impact;
- calendar fals;
- formular foarte scurt care pierde contextul.

---

# 9. Cercetare — `/research`

## Obiectiv UX

Pagina demonstrează disciplină intelectuală și transparență fără să devină o arhivă academică greu de folosit.

## Element memorabil

`EvidenceTopology`: trei tipuri de cunoaștere conectate, dar vizual distincte.

## Structură

1. `PageHero editorial`;
2. `EvidenceTopology` — cercetare, ipoteză, observație;
3. `ResearchThemeCollection` — șase teme;
4. `ResearchQuestions` — listă editorială numerotată;
5. `HowWeReadSources` — criterii;
6. `ResearchLibrary` — filtre și `SourceCard`;
7. `PromiseBoundary` pentru ce nu afirmăm;
8. `ResearchInvitation`.

## Biblioteca

- filtrele apar ca tabs sau select pe mobil;
- URL-ul păstrează filtrul dacă biblioteca are mai mult de o pagină;
- cardul poate extinde relevanța și limita;
- linkul extern este explicit;
- nu se afișează indicatori de „quality score” inventați;
- sursele sunt ordonate editorial, nu prin popularitate.

## Cuprins local

- Niveluri de claritate;
- Teme;
- Întrebări;
- Surse;
- Limite.

## Ce evităm

- design de dashboard academic;
- grafice fără date;
- citate lungi;
- logo-uri de universități folosite ca endorsement;
- bibliografie ascunsă în PDF dacă poate fi accesibilă în pagină.

---

# 10. Instrumente și simulări — `/tools`

## Obiectiv UX

Pagina arată instrumentele ca parte a metodei, fără să transforme EZPLAY într-un studio de jocuri.

## Element memorabil

`SystemTable`: o compoziție cu cărți reale și trasee care arată cum o decizie schimbă capacitatea, piața și rezultatul.

## Structură

1. `PageHero editorial` cu un obiect special, nu game screenshot full-screen;
2. `GameStartsConversation` — explicație split;
3. `DeckbuilderPreview` și `EconomicRelation`;
4. `FormatTabs` — fizic, digital, hibrid;
5. `CardBrowserPreview` cu date reale;
6. `ToolStatusPanel` pentru Tableau Builder;
7. `ToolSelectionCriteria` — decizie, consecință, reflecție, transfer;
8. CTA către program și experiență.

## Card Browser preview

- folosește imaginile reale din Supabase Storage;
- păstrează aspect ratio;
- skeleton la încărcare;
- stare de eroare și retry;
- filtrele se bazează numai pe date confirmate;
- preview de 6–8 cărți, nu implementarea forțată a întregii biblioteci;
- nu se inventează raritate sau categorie.

## Stil

Aceasta poate fi cea mai tactilă pagină:

- suprafețe ușor mai materiale;
- componente speciale;
- dark panel pentru digital;
- mișcare controlată a cărților.

Nu schimbă identitatea globală a site-ului.

---

# 11. Despre EZPLAY — `/about`

## Obiectiv UX

Pagina explică identitatea, originea, misiunea și principiile fără să devină un CV al fondatorului.

## Element memorabil

`ProjectEvolution`: joc → experiență → program → platformă și comunitate.

## Structură

1. `PageHero editorial` cu semnătura brandului;
2. `WhyEZPLAY` — compania ca sistem;
3. `ProjectEvolution` — cronologie numai cu fapte documentate;
4. `FourComponents` — program, instrumente, platformă, comunitate;
5. `MissionStatement`;
6. `PrincipleField` — șase principii în compoziție conectată;
7. `BoundaryList` — ce nu este EZPLAY;
8. `FounderProfile` — numai după completarea bio-ului;
9. `RomaniaToOpenWorld` — local și bilingv;
10. `ProtectionDirection` — open core / protected program / trusted community;
11. CTA final.

## Active

- cronologia nu afișează fotografii sau logo-uri fără permisiune;
- founder profile nu apare ca placeholder public;
- dacă nu există destule repere documentate, evoluția rămâne conceptuală și marcată ca atare.

---

# 12. Dezvoltare — `/development`

## Obiectiv UX

Pagina arată maturitatea reală a proiectului și permite contribuții bine direcționate.

## Element memorabil

`BuildState`: două sisteme alăturate — unul funcțional, unul care își primește modulele.

## Structură

1. `PageHero editorial` cu status de dezvoltare;
2. `DevelopmentStatus` — există / se construiește;
3. `ContributorRoleGrid` — șapte roluri;
4. `ContributionPrinciples`;
5. `TrustPath` — feedback, contribuție, responsabilitate, influență viitoare;
6. `BoundaryList` — ce nu cerem;
7. `InquiryForm contribution`;
8. CTA final.

## Roluri

- pe desktop pot fi grupate 3 + 4, nu șapte carduri identice;
- selectarea unui rol precompletează formularul;
- fiecare rol are text, nu numai icon;
- contribuția nu primește puncte sau Prestige în interfața publică.

## Ce evităm

- progress bar al proiectului;
- roadmap cu date inventate;
- listă de voluntariat vagă;
- leaderboard de contributori;
- promisiunea influenței.

---

# 13. Contact — `/contact`

## Obiectiv UX

Utilizatorul alege motivul și trimite un mesaj cu informația potrivită, fără să fie obligat să înțeleagă structura internă EZPLAY.

## Element memorabil

`IntentRouter`: șase direcții clare care configurează formularul.

## Structură

1. `PageHero editorial` compact;
2. `IntentRouter`;
3. `InquiryForm general`, adaptat intenției;
4. `DirectContact`, numai cu adresă confirmată;
5. `MinorSafetyNotice`;
6. `UsefulLinks`.

## Interacțiune

- alegerea unui intent face scroll/focus către formular;
- subiectul este preselectat și vizibil;
- utilizatorul poate schimba intentul;
- URL query poate păstra intenția când pagina este accesată din CTA-uri;
- succesul înlocuiește formularul și oferă întoarcere sau link relevant.

## Ce evităm

- chatbot automat în v1;
- hartă fără locație publică;
- timp de răspuns inventat;
- formular într-un modal;
- mai multe formulare complete randate simultan.

---

# 14. Platforma — `/platform`

## Obiectiv UX

Pagina explică rolul platformei și permite accesul conturilor existente fără să promită funcții inexistente sau să deschidă necontrolat conturi pentru minori.

## Element memorabil

`PlatformTopology`: participant, facilitator, organizație și contributor conectați la funcții marcate prin status.

## Structură

1. `PageHero gateway` cu status și CTA login;
2. `WhyPlatform` — continuitatea experienței;
3. `AvailableNow` — cards cu status real;
4. `PlatformTopology` — roluri și direcții viitoare;
5. `FounderSkillsPreview` — neînceput, fără numere;
6. `PrestigeExplanation` — separat de Founder Skills și Equity;
7. `NotYet` — funcții pe care nu le introducem;
8. `AccessSafety` — minor, consimțământ, rol;
9. `InterestForm`, numai dacă mecanismul există;
10. `AuthPanel`;
11. CTA final către program.

## Auth panel

- poate fi panou lateral pe desktop și secțiune completă pe mobil;
- metodele afișate corespund configurației Supabase Auth;
- resetarea parolei folosește mesaj neutru;
- nu confirmă existența contului;
- loading și erori sunt inline;
- dacă înregistrarea este închisă, `Creează cont` nu apare;
- linkul către program rămâne vizibil.

## Statusuri

Fiecare funcție folosește unul dintre:

- `Disponibil`;
- `În testare`;
- `În dezvoltare`;
- `Direcție viitoare`.

Aceste statusuri sunt textuale, au legendă și nu sunt deduse din existența unui ecran în prototip.

## Ce evităm

- dashboard public ca hero;
- profil fals populat;
- XP numeric;
- Coins, Gems sau Credits;
- comunitate și mesagerie promise;
- signup pentru minori înaintea fluxurilor aprobate;
- butoane inactive fără explicație.

---

# Componente partajate între rute

| Componentă | Rute principale |
|---|---|
| `LivingCompanySystem` | `/` |
| `DecisionCascade` | `/`, `/how-we-learn` |
| `FounderLoopDiagram` | `/program`, `/how-we-learn` |
| `PerspectiveSystem` | `/`, `/program`, `/for/young-people` |
| `IntroExperiencePanel` | `/`, `/experiences`, `/for/parents` |
| `AudienceRouter` | `/` |
| `EvidencePreview` | `/`, `/how-we-learn`, `/for/parents` |
| `PromiseBoundary` | `/program`, `/for/parents`, `/for/organizations`, `/research` |
| `DevelopmentStatus` | `/development`, `/platform` |
| `IntentRouter` | `/contact` și CTA-uri către contact |
| `FounderSkillsPreview` | `/program`, `/platform` |
| `MinorSafetyNotice` | `/for/parents`, `/contact`, `/platform` |
| `InquiryForm` | `/experiences/introduction`, `/for/parents`, `/for/organizations`, `/development`, `/contact` |

Componentele partajate folosesc aceeași logică și aceleași stări, dar pot avea compoziții adaptate paginii. Nu se duplică implementări doar pentru diferențe de spacing.

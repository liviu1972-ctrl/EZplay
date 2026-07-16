---
title: "EZPLAY.org — continuitatea cu platforma existentă"
status: Draft
version: "0.3"
updated: 2026-07-17
scope:
  - ezplay.org
  - migrare experiență publică
  - protejarea funcțiilor existente
---

# EZPLAY.org — continuitatea cu platforma existentă

## 1. Decizia de bază

Noul `ezplay.org` nu pornește de la zero și nu este nici un simplu redesign al site-ului actual.

Implementarea trebuie tratată ca evoluția controlată a unei platforme existente:

- se păstrează infrastructura și funcțiile care rezolvă deja probleme dificile;
- se reconstruiesc poziționarea publică, arhitectura informației, copywriting-ul și limbajul vizual;
- se adaptează vizual login-ul și, ulterior, shell-ul jocului fără a schimba inutil comportamentul sau contractele de date;
- se elimină explicit prototipurile care nu mai aparțin direcției produsului.

Formula de lucru este:

> **Păstrăm fundația funcțională. Reconstruim experiența publică.**

Site-ul actual este punct de pornire tehnic, nu sursă pentru categoria publică, ierarhia mesajelor sau structura viitorului website.

## 2. Sursele acestei decizii

Documentul se bazează pe:

- inventarul din `docs/roadmap/current-assets.md`;
- direcția de produs din `docs/platform/ezplay-org-product-direction.md`;
- blueprint-ul și copywriting-ul din acest folder;
- inspecția vizuală a versiunii publice `https://ezplay-seven.vercel.app/`, realizată la 16 iulie 2026;
- clarificările fondatorului privind activele care trebuie continuate.

Versiunea live inspectată afișa identificatorul `v1.0.1.260711.1723`. Au fost inspectate numai suprafețele publice și comportamentul de redirecționare către autentificare. Nu a fost realizată autentificarea și nu a fost inspectat codul repository-ului tehnic separat.

Prin urmare:

- existența și funcționarea Deckbuilder-ului sunt confirmate de inventarul proiectului și de fondator, nu reverificate printr-o sesiune autentificată în acest audit;
- detaliile despre scheme, politici RLS, callback-uri OAuth, stocare și dependențe trebuie confirmate în cod;
- agentul nu deduce arhitectura internă doar din interfața publică.

## 3. Ce a confirmat inspecția live

Versiunea live confirmă existența unui schelet Next.js cu navigare publică, localizare, temă, autentificare și suprafețe pentru cărți și joc. Această constatare documentează realitatea tehnică; nu transformă niciuna dintre suprafețele publice actuale în model pentru noul site.

### Suprafața `/cards`

La momentul inspecției, biblioteca prezenta 78 de cărți grupate în cinci categorii:

- Tangible Assets — 24;
- Human Resources — 24;
- Intangible Assets — 10;
- Event — 10;
- Entrepreneur — 10.

Interfața includea pachete vizuale, amestecarea și selectarea cărților, navigare între cărți, galerie și detalii precum cod, set, format, producție, cheltuieli și efect special. Acestea confirmă existența datelor și activelor, dar pagina, interacțiunile, componentele și organizarea ei nu se păstrează.

Inspecția publică sugerează că activele pot proveni din surse mixte: Supabase Storage și fișiere publice servite de aplicație. Agentul trebuie să inventarieze sursa reală a fiecărei familii de imagini înainte să schimbe căile sau configurația `next/image`.

### Autentificarea și ruta jocului

Accesarea `/ezplay` fără sesiune redirecționa către `/login`. Interfața de autentificare includea:

- e-mail și parolă;
- autentificare cu Google;
- legătură către înregistrare;
- formular de creare a contului cu nume afișat, e-mail și parolă.

Aceste suprafețe arată că există deja autentificare, rută protejată și integrare cu identitatea utilizatorului. Fluxurile nu trebuie reconstruite de la zero doar pentru a obține o interfață nouă; aspectul paginilor poate fi reconstruit complet.

### Suprafața `/cards3`

Ruta prezenta o configurare de simulare cu alegerea numărului de ani, un deck inițial și pornirea unei rulări.

Această implementare **nu se păstrează**. Ea nu reprezintă Deckbuilder-ul funcțional care trebuie protejat și nu trebuie confundată cu rolul viitor al simulărilor în ecosistemul EZPLAY.

## 4. Matricea de continuitate

| Zonă | Decizie | Ce este permis | Ce este interzis în prima etapă |
|---|---|---|---|
| Next.js existent | Păstrează | folosește versiunea și routerul existente după audit | migrare de framework sau rescriere fără motiv verificat |
| Vercel | Păstrează | menține proiectul, preview-urile, domeniile și variabilele corect configurate | recrearea proiectului ori schimbarea configurației fără inventar și plan de revenire |
| Supabase Auth | Protejează | redesenează interfețele după ce fluxurile au teste de regresie | reimplementarea Google sign-in, schimbarea callback-urilor sau a sesiunii pentru motive vizuale |
| Supabase Database | Protejează | citește contractele existente și adaugă adaptoare la nivelul de prezentare | redenumirea tabelelor, câmpurilor, identificatorilor sau relațiilor doar pentru noul UI |
| Supabase Storage | Protejează | reutilizează imaginile și optimizează afișarea | mutarea bucket-urilor, schimbarea căilor ori regenerarea activelor fără inventar |
| Pagina actuală `/cards` | Înlocuiește | păstrează numai datele și imaginile din spate; construiește orice experiență viitoare de la zero după noua specificație | reutilizarea paginii, structurii, componentelor sau interacțiunilor actuale ca model UX/UI |
| Deckbuilder `/ezplay` | Păstrează | protejează regulile, starea, datele și accesul; adaptează ulterior shell-ul vizual | rescrierea jocului în cadrul construirii site-ului public |
| Configuratorul `/cards3` | Elimină | scoate din navigare, verifică dependențele și elimină implementarea | redesign, migrare sau prezentare ca parte a noului produs |
| Autentificare și login | Păstrează funcția, adaptează UI | aplică noul sistem vizual și copy-ul verificat | schimbarea providerilor, callback-urilor sau sesiunii pentru motive vizuale |
| Register actual | Nu păstra automat ca suprafață publică | reutilizează fluxul tehnic numai dacă politica de acces îl cere | deschiderea necontrolată a conturilor, în special pentru minori |
| Română și engleză | Păstrează capabilitatea | păstrează arhitectura bilingvă sănătoasă și reconstruiește conținutul în ambele limbi | păstrarea automată a traducerilor vechi sau amestecarea limbilor într-o pagină |
| Afișarea versiunii | Păstrează capabilitatea | afișează discret versiunea reală a build-ului în noul UI | hardcodarea unei versiuni sau copierea obligatorie a badge-ului actual |
| Tema și designul actual | Înlocuiește | construiește noii tokeni și noul sistem vizual | reutilizarea esteticii, layout-urilor sau componentelor publice actuale ca direcție |
| Homepage, header, footer | Înlocuiește | implementează noua ierarhie și noul copy | folosirea structurii actuale ca punct de plecare editorial |
| About și How it Works actuale | Înlocuiește suprafețele | păstrează numai redirect-uri utile | reutilizarea structurii, componentelor sau mesajelor existente |
| Termeni și confidențialitate actuale | Înlocuiește conținutul | rutele pot fi refolosite după redactare și revizuire juridică | reutilizarea automată a textelor sau interfețelor existente |

## 5. Contractele care nu se rup

### 5.1. Contractul de autentificare

Agentul păstrează până la verificare:

- proiectul Supabase asociat;
- providerii activi;
- configurarea Google OAuth;
- URL-urile de callback și redirect;
- persistarea și reîmprospătarea sesiunii;
- middleware-ul și regulile rutelor protejate;
- legătura dintre utilizatorul autentificat și profil;
- resetarea parolei și confirmarea e-mailului, dacă sunt implementate;
- politicile RLS asociate profilului și jocului.

O nouă pagină de login nu este acceptată dacă arată corect, dar rupe revenirea din Google, sesiunea după refresh sau accesul la joc.

Înregistrarea publică existentă nu constituie automat o decizie că minorii își pot crea cont. Interfața finală trebuie aliniată cu regulile de vârstă, consimțământ și acces înainte de lansare.

### 5.2. Contractul datelor și imaginilor cărților

Până la audit, se consideră stabile:

- identificatorii și codurile cărților;
- categoriile și relațiile dintre date;
- câmpurile folosite de joc;
- legătura dintre înregistrări și imagini;
- denumirile bucket-urilor și căile obiectelor;
- politicile de acces;
- regulile de cache și transformare deja necesare aplicației.

Noul UI poate introduce un `view model` sau un adaptor care transformă datele pentru prezentare. Nu se remodelează baza de date doar pentru ca o componentă React să primească proprietăți mai comode.

Pagina actuală `/cards` nu creează un contract de interfață. Dacă noul produs va include o bibliotecă de cărți, funcțiile, structura și interacțiunile ei pornesc din blueprint și din specificația UX/UI. Ea folosește datele și imaginile reale, dar nu moștenește obligația de a reproduce pachetele, shuffle-ul, galeria sau organizarea curentă.

### 5.3. Contractul Deckbuilder-ului

Deckbuilder-ul este activ protejat. Înaintea oricărei schimbări, agentul inventariază:

- rutele publice și protejate implicate;
- componentele și modulele de reguli;
- încărcarea deck-urilor și a configurațiilor;
- starea unei partide și persistența ei;
- calculul rezultatelor;
- legătura cu utilizatorul;
- dependențele de date și Storage;
- stările loading, empty, error și recovery;
- comportamentul pe mobil și desktop;
- testele existente sau, în lipsa lor, un scenariu reproductibil de verificare.

Construirea website-ului public nu autorizează rescrierea jocului. Jocul poate primi ulterior noul app shell și noii tokeni, dar numai după ce comportamentul său este protejat prin verificări de regresie.

Conform istoricului confirmat de creator, implementarea de la `/ezplay` provine dintr-un prototip React construit anterior în AI Studio, preluat aproape integral și adaptat limitat pentru aplicația Next.js. Izolarea sa relativă este intenționată. Jocul digital a fost integrat mai devreme decât etapa lui firească de roadmap pentru a păstra și valorifica munca existentă; nu devine prin aceasta prioritatea curentă de perfecționare tehnică sau vizuală.

Înaintea etapei dedicate jocului, intervențiile se limitează la continuitate, compatibilitate, protecția datelor și riscuri critice de securitate. Refactorizarea amplă, eliminarea generală a datoriei tehnice, redesign-ul și integrarea mai profundă se planifică separat.

### 5.4. Contractul de deployment

Se păstrează până la inventar:

- proiectul Vercel actual;
- mediile și aliasurile de deployment;
- variabilele de mediu, fără copierea secretelor în documentație sau cod;
- integrarea cu Supabase;
- configurația domeniului și a redirect-urilor;
- comenzile reale de build, lint, typecheck și test.

Agentul nu creează o a doua infrastructură doar pentru noua interfață dacă site-ul poate fi dezvoltat sigur în proiectul existent.

### 5.5. Contractul de versiune vizibilă

Noul site păstrează afișarea unei versiuni tehnice reale. Agentul verifică mecanismul existent și îl conectează la noul app shell fără a hardcoda valoarea.

Versiunea:

- rămâne vizibilă, dar discretă;
- poate fi mutată în footer, meniul utilitar sau o zonă secundară potrivită noului design;
- trebuie să provină din mecanismul real de build sau release;
- nu concurează cu navigarea și CTA-urile;
- este verificabilă în producție și în preview-urile unde această informație este utilă.

Se păstrează funcția, nu forma badge-ului actual.

### 5.6. Contractul bilingv română–engleză

Noul site este disponibil în română și engleză. Agentul păstrează mecanismul tehnic existent numai dacă este sănătos, dar reconstruiește navigarea, copy-ul, metadatele și stările de interfață pentru noul sitemap.

Pentru un vizitator fără preferință salvată, limba inițială este româna. Detectarea automată a antetului `Accept-Language` nu schimbă această intrare implicită; utilizatorul poate selecta ulterior engleza, iar alegerea este memorată.

Comportamentul minim:

- selectorul de limbă are nume accesibil și este utilizabil cu tastatura;
- alegerea utilizatorului persistă conform mecanismului stabilit în aplicație;
- schimbarea limbii păstrează, pe cât posibil, pagina și contextul curent;
- navigarea, formularele, erorile, metadatele SEO și textele alternative sunt localizate;
- nu rămân fragmente englezești într-o pagină românească sau invers;
- lipsa unei traduceri este detectabilă în QA și nu este ascunsă prin fallback-uri confuze.

Copywriting-ul românesc din acest pachet este sursa editorială. Versiunea engleză se traduce cu păstrarea sensului și se revizuiește editorial; textele actualului site nu devin automat sursă pentru traducere.

## 6. Decizii pe rutele publice existente

| Rută actuală | Decizie pentru noul site | Destinație sau rol |
|---|---|---|
| `/` | înlocuiește complet experiența și copy-ul | homepage-ul educațional din `pages/homepage.md` |
| `/about` | păstrează identificatorul dacă este util, înlocuiește conținutul | pagina din `pages/about.md` |
| `/how-it-works` | nu păstra drept sursă editorială | redirect permanent către `/how-we-learn` după implementarea noii pagini |
| `/cards` | elimină suprafața actuală | redirect către `/tools`; o eventuală bibliotecă viitoare primește specificație și implementare noi |
| `/cards3` | elimină | scoate imediat din navigare; după verificarea dependențelor, șterge implementarea și redirecționează ruta veche către `/tools` |
| `/ezplay` | păstrează ruta și jocul funcțional | acces controlat la Deckbuilder; nu devine mesajul principal al homepage-ului |
| `/login` | păstrează fluxul și, preferabil, ruta | aplică noul shell fără schimbarea contractului de autentificare |
| `/register` | nu păstra automat ca pagină publică | fluxul tehnic poate rămâne, dar accesul se limitează, ascunde sau condiționează conform politicii aprobate |
| `/terms` | înlocuiește conținutul; ruta poate rămâne | conținut public numai după verificare juridică |
| `/privacy` | înlocuiește conținutul; ruta poate rămâne | conținut public numai după verificare juridică |

Rutele autentificate, administrative și callback-urile care nu sunt vizibile public se inventariază din cod. Ele nu se redenumesc ca efect secundar al noii arhitecturi informaționale.

Redirect-ul de la `/cards3` nu înseamnă păstrarea simulării. El este doar o măsură de continuitate pentru linkurile vechi și poate fi eliminat ulterior dacă nu există trafic sau referințe externe.

## 7. Ce se reconstruiește

Următoarele zone nu moștenesc direcția actualului site:

- mesajul din primul ecran;
- navigarea principală și ierarhia CTA-urilor;
- ordinea paginilor și parcursurile publicurilor;
- header-ul și footer-ul;
- sistemul vizual, tipografia, spațierea și motion language;
- homepage-ul;
- paginile editoriale;
- explicația programului și a metodei;
- Founder Loop, care trebuie prezentat în forma canonică cu cinci etape;
- poziția publică a jocurilor, care apar ca instrumente ale programului;
- accesibilitatea și comportamentul responsive al suprafețelor publice.

Nu există obligația de a reutiliza componente publice din homepage, meniu, footer, Cards, About sau How it Works. Noul site se construiește din specificația aprobată. Pot fi păstrate numai utilitare tehnice neutre, după audit, dacă nu transferă în noul produs structura sau comportamentul vechilor suprafețe.

## 8. Ce nu se face

Agentul de implementare nu:

- pornește un proiect Next.js nou înainte să demonstreze că repository-ul existent nu poate susține noul site;
- recreează autentificarea Google;
- schimbă schemele Supabase pentru a potrivi un mockup;
- înlocuiește datele reale ale cărților cu date locale temporare;
- mută imaginile fără hartă sursă–destinație și plan de revenire;
- rescrie Deckbuilder-ul în aceeași etapă cu homepage-ul;
- investește timp în `/cards3` în afară de decuplare și eliminare;
- reutilizează homepage-ul, meniul, footer-ul, Cards, About sau How it Works ca șabloane pentru noile pagini;
- menține Cards, Game Simulation sau Joacă EZPLAY în navigarea principală doar fiindcă există acum;
- tratează o pagină accesibilă în browser drept funcție validată operațional;
- publică funcții viitoare ale platformei drept disponibile.

## 9. Ordinea recomandată de implementare

### Etapa 0 — inventar și plasă de siguranță

1. confirmă repository-ul, branch-ul și comenzile proiectului;
2. inventariază toate rutele, inclusiv callback-urile și rutele protejate;
3. mapează Supabase Auth, Database și Storage fără a expune secrete;
4. identifică dependențele comune dintre `/cards`, `/cards3` și `/ezplay`, fără a confunda codul comun cu o decizie de reutilizare a interfeței;
5. inventariază mecanismul de localizare RO/EN și sursa versiunii afișate;
6. rulează verificările existente și înregistrează starea inițială;
7. definește scenariile minime de regresie pentru login, Google sign-in, accesul la datele cărților și Deckbuilder;
8. pregătește o cale de revenire pentru modificările de infrastructură.

### Etapa 1 — separarea suprafeței publice

1. scoate `/cards3` din navigarea publică;
2. construiește noii tokeni și noul app shell fără să schimbe contractele zonelor protejate;
3. înlocuiește header-ul și footer-ul;
4. păstrează temporar rutele vechi accesibile direct acolo unde previne regresii.

### Etapa 2 — noul site editorial

1. implementează homepage-ul cu copy-ul aprobat;
2. implementează paginile obligatorii din blueprint;
3. adaugă noile parcursuri și CTA-uri;
4. validează desktop, mobil, tastatură, reduced motion și performanță.

### Etapa 3 — integrarea activelor protejate

1. construiește de la zero orice nouă prezentare a cărților, folosind datele și imaginile existente;
2. adaptează login și accesul la platformă fără să schimbe autentificarea;
3. conectează contextual Deckbuilder-ul la `/tools` și `/platform` numai dacă accesul public este aprobat;
4. aplică jocului noul shell numai după verificările de regresie;
5. integrează selectorul RO/EN și versiunea reală în noul app shell.

### Etapa 4 — eliminarea controlată a `/cards3`

1. confirmă că jocul nu depinde de module exclusive rutei `/cards3`;
2. extrage numai utilitarele comune cu adevărat necesare altor funcții;
3. șterge componentele, datele mock și legăturile specifice configuratorului;
4. adaugă redirect-ul către `/tools`, dacă este necesar;
5. rulează din nou scenariile Deckbuilder-ului și build-ul complet.

## 10. Primul livrabil al agentului de coding

Înainte de modificarea amplă a interfeței, agentul predă o notă scurtă cu:

1. versiunea Next.js, routerul și managerul de pachete;
2. harta rutelor publice, protejate, administrative și de autentificare;
3. utilitarele tehnice neutre și componentele zonelor protejate care pot fi reutilizate, fără componentele publice vechi;
4. contractele Supabase folosite de auth, cărți și joc;
5. sursa reală a imaginilor: Storage, `public/` sau ambele;
6. dependențele dintre `/cards3` și `/ezplay`;
7. mecanismul actual de localizare și sursa versiunii afișate;
8. verificările care trec înainte de intervenție;
9. riscurile și schimbările care cer aprobare separată.

Acest livrabil nu este o cerere de rescriere a specificației. El stabilește cum se aplică specificația peste realitatea codului.

## 11. Criterii de acceptare pentru continuitate

Migrarea este corectă numai dacă:

- homepage-ul și navigarea comunică program educațional înaintea jocului;
- nicio suprafață publică veche nu este prezentată ca noul design;
- orice prezentare nouă a cărților folosește datele și imaginile reale, fără a moșteni pagina `/cards`;
- login-ul cu e-mail și Google funcționează după schimbările vizuale;
- refresh-ul și revenirea din OAuth păstrează sesiunea corect;
- utilizatorul neautentificat este rutat corect la accesarea jocului;
- Deckbuilder-ul își păstrează regulile, datele și parcursul funcțional;
- `/cards3` nu mai apare în navigare și implementarea lui este eliminată controlat;
- româna și engleza acoperă noua navigare, paginile publicate și stările de interfață;
- versiunea reală rămâne vizibilă discret și nu este hardcodată;
- rutele vechi utile au redirect-uri intenționate, fără lanțuri sau bucle;
- nu sunt expuse secrete și nu sunt slăbite politicile RLS;
- lint, typecheck, testele existente și build-ul trec;
- diferențele intenționate față de această hartă sunt documentate.

## 12. Criteriul final

Un vizitator nou trebuie să vadă un site complet diferit ca poziționare și experiență, în timp ce un utilizator existent trebuie să își poată folosi în continuare contul și Deckbuilder-ul, alimentat de datele și imaginile existente.

Aceasta este măsura corectă a schimbării: **transformare publică amplă, fără pierderea activelor funcționale deja construite.**

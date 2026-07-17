---
status: Draft
version: "0.3"
updated: 2026-07-17
---

# Direcția experienței ezplay.org

## North Star

Vizitatorul trebuie să simtă că EZPLAY este un sistem educațional contemporan pe care îl poate explora, nu o prezentare liniară pe care trebuie să o consume pasiv.

Experiența centrală:

> **Înțeleg că EZPLAY este mai amplu decât un joc, descopăr cum funcționează și găsesc ușor punctul potrivit de intrare pentru mine.**

## Poziția vizuală dorită

EZPLAY trebuie să se afle între patru lumi, fără să fie confundat cu vreuna dintre ele:

| Lume | Ce preluăm | Ce evităm |
|---|---|---|
| Organizație educațională | încredere, structură, claritate | aspect instituțional rigid |
| Studio de experiențe | curiozitate, obiecte, interacțiune | spectacol fără substanță |
| Platformă digitală | consistență, stări, navigare matură | estetică SaaS generică |
| Joc și simulare | decizii, feedback, energie | infantilizare și jocul pus înaintea programului |

Rezultatul trebuie să poată fi descris astfel:

> **Inteligență caldă. Precizie fără răceală. Energie fără zgomot.**

## Ce produce senzația de profesionalism

Profesionalismul nu va proveni dintr-o paletă întunecată, efecte 3D sau un număr mare de animații. El trebuie să apară din:

- arhitectură informațională vizibilă;
- ierarhie tipografică stabilă;
- compoziții diferite construite din aceeași gramatică;
- componente cu toate stările proiectate;
- navigare previzibilă;
- imagini și date autentice;
- spațiu folosit intenționat;
- mișcare care explică;
- consistență între homepage și paginile secundare;
- onestitate despre ce este disponibil și ce este în dezvoltare.

## Principii UX

### 1. Mai întâi categoria, apoi mecanismul

Primul ecran explică faptul că EZPLAY dezvoltă programe de educație antreprenorială pentru tineri. Jocul, Founder Loop și platforma apar după stabilirea categoriei.

### 2. Fiecare pagină are o întrebare principală

Utilizatorul trebuie să înțeleagă de ce se află pe pagină și ce poate face în continuare. CTA-ul principal nu concurează cu mai mult de o acțiune secundară.

### 3. Complexitate stratificată

Informația este oferită în trei straturi:

1. mesajul esențial;
2. explicația și exemplele;
3. detaliile, sursele și limitele.

Tabs, accordion, hover card și dialog sunt folosite doar pentru straturile doi și trei. Mesajul principal nu este ascuns în interacțiuni.

### 4. Vizitatorul recunoaște traseul

Navigarea, breadcrumb-ul, titlul paginii, indicatorul activ și legăturile contextuale trebuie să arate permanent locul utilizatorului în ecosistem.

### 5. Interacțiunea demonstrează ideea

O animație sau componentă interactivă trebuie să arate una dintre următoarele:

- o decizie produce consecințe;
- două părți ale companiei sunt conectate;
- o idee revine cu mai multă complexitate;
- o experiență devine reflecție și aplicare;
- progresul este construit, nu primit.

### 6. Tânărul nu este tratat ca un copil mic

Nu se folosesc mascote, forme gonflabile, confetti, badge-uri excesive, gradient curcubeu sau ilustrații școlare. Energia vine din alegeri, culoare, ritm și obiecte reale.

### 7. Adultul nu este obligat să creadă

Părintele sau organizația găsește metodă, limite, cercetare, responsabilități și pași concreți. Designul nu ascunde lipsa dovezilor prin testimoniale sau cifre inventate.

### 8. Accesul la platformă nu întrerupe povestea

`Intră în platformă` este prezent, dar secundar. Utilizatorul public nu este împins către autentificare înainte să înțeleagă valoarea.

## Modelul experienței publice

```text
Orientare
→ Descoperire
→ Înțelegere
→ Alegerea unui rol
→ Acțiune
→ Continuitate
```

### Orientare

Vizitatorul identifică imediat:

- educație antreprenorială;
- primul program pentru tineri;
- învățare prin experiență;
- EZPLAY ca proiect, nu doar joc.

### Descoperire

Vizitatorul vede că deciziile, consecințele, reflecția, provocările și cei cinci Business Pillars formează un sistem.

### Înțelegere

El poate aprofunda metoda, programul, experiențele, cercetarea și instrumentele fără să piardă traseul principal.

### Alegerea unui rol

Interfața îi oferă intrări distincte:

- tânăr;
- părinte;
- școală sau organizație;
- facilitator sau contributor;
- participant existent.

### Acțiune

CTA-ul trebuie să ducă la una dintre acțiunile reale:

- descoperirea programului;
- solicitarea unei experiențe;
- exprimarea interesului;
- contribuția la dezvoltare;
- autentificarea unui utilizator existent.

### Continuitate

Confirmările, e-mailurile și stările succesului arată următorul pas fără să promită un calendar inexistent.

## Sistemul de navigare

Website-ul public folosește două straturi complementare pe desktop:

1. header orizontal global;
2. `ExplorerRail` vertical în stânga, colapsat la iconuri și extensibil la cererea utilizatorului.

Specificația completă, inclusiv rutele pe care rail-ul apare, este în `navigation-system.md`.

Header-ul oferă acces rapid la destinațiile principale. Rail-ul dezvăluie profunzimea, subpaginile și secțiunile relevante. Ele nu se duplică integral și niciunul nu transformă website-ul într-un dashboard.

### Desktop

Header-ul este sticky, luminos și compact. Nu folosește un fundal complet transparent peste texte sau imagini complexe.

Structură recomandată:

```text
Logo
Programul
Cum învățăm
Experiențe
Pentru organizații
Cercetare
Despre EZPLAY
RO / EN
Intră în platformă
```

La lățimi foarte mari poate apărea și CTA-ul `Adu EZPLAY în comunitatea ta`. El dispare înainte ca navigarea să devină înghesuită.

`Programul` și `Experiențe` pot deschide panouri scurte cu maximum patru destinații. Arhitectura mai amplă și navigarea contextuală apar în `ExplorerRail`; header-ul nu devine mega-menu.

Pe paginile eligibile, sub header apare în stânga un rail de iconuri. La activare, rail-ul se extinde și afișează subpagini, ancore locale și căi conexe. Deschiderea este controlată prin click sau tastatură, nu exclusiv prin hover.

### Mobil

Header-ul conține:

- logo;
- selector de limbă simplificat;
- buton meniu.

Meniul se deschide într-un `Sheet` pe toată înălțimea și combină navigarea globală cu informația contextuală a rail-ului. Ordinea acțiunilor:

1. `Descoperă programul`;
2. navigarea publică;
3. paginile pentru publicuri;
4. `Adu EZPLAY în comunitatea ta`;
5. `Intră în platformă`.

Meniul nu pornește cu autentificarea.

### Comportament la scroll

Vizibilitatea și relația header-ului cu scroll-ul sunt definite în [sistemul de navigare](navigation-system.md).

- schimbarea stării header-ului nu afectează accesul la conținut;
- focusul și navigarea cu tastatura nu sunt afectate;
- nu se folosește smooth-scroll global sau scroll hijacking.

## Navigarea în pagini lungi

Paginile lungi folosesc un cuprins local integrat în `ExplorerRail`, conform matricei din `navigation-system.md`.

Desktop:

- ancorele paginii apar în panoul extins din stânga;
- secțiunea activă este indicată prin text și un traseu colorat;
- rail-ul se restrânge sau trece în variantă floating înainte să reducă excesiv coloana de lectură.

Mobil:

- buton `În această pagină`;
- deschide `Sheet` sau `Drawer` cu ancore;
- nu ocupă permanent spațiu vertical.

## Ritmul paginilor

Fiecare pagină lungă alternează:

1. secțiune editorială calmă;
2. secțiune vizuală sau interactivă;
3. secțiune de clarificare ori dovadă;
4. invitație la următorul pas.

Nu se repetă mai mult de două secțiuni consecutive construite din carduri egale.

Spațiul liber creează respirație, dar nu trebuie să producă ecrane aproape goale pentru a susține o singură animație. Un utilizator trebuie să primească informație relevantă la fiecare 1–1,5 înălțimi de viewport.

## Răspunsul pentru fiecare public

### Tânăr

Trebuie să simtă:

- autonomie;
- provocare;
- obiecte și situații reale;
- posibilitatea de a încerca din nou;
- lipsa unui ton moralizator.

### Părinte

Trebuie să găsească:

- ce face participantul;
- ce poate dezvolta;
- ce nu promite programul;
- cum începe experiența;
- cum sunt tratate siguranța și datele.

### Organizație

Trebuie să găsească:

- formatul;
- responsabilitățile;
- condițiile de calitate;
- ce există acum;
- ce informații trebuie trimise.

### Contributor

Trebuie să înțeleagă:

- ce se construiește;
- unde poate ajuta;
- cum este tratată contribuția;
- ce nu primește automat.

## Accesibilitate ca regulă de design

- contrast minim WCAG AA pentru text și controale;
- focus ring vizibil pe toate controalele;
- target tactil de minimum 44 × 44 px;
- heading-uri în ordine semantică;
- navigare completă cu tastatura;
- carousels și tabs operabile fără pointer;
- fără informație transmisă numai prin culoare;
- fără text esențial în imagini;
- descrieri alternative pentru fotografii informative;
- SVG-urile decorative au `aria-hidden="true"`;
- opțiunea `prefers-reduced-motion` este respectată global;
- formularele păstrează valorile după erori și mută focusul către primul câmp invalid.

## Lucruri pe care site-ul nu trebuie să le pară

- o temă `shadcn/ui` instalată fără personalizare;
- un produs SaaS pentru programatori;
- un site de jocuri pentru copii;
- o școală privată convențională;
- o prezentare de consultanță enterprise;
- un portofoliu de efecte WebGL;
- un landing page cu hero, trei carduri și formular;
- o promisiune vizuală mai matură decât produsul real.

## Criterii UX de acceptare

1. Un vizitator nou identifică categoria EZPLAY fără scroll.
2. Jocul nu domină primul viewport.
3. Fiecare public găsește o intrare dedicată în maximum două acțiuni.
4. CTA-ul principal al fiecărei pagini este unic și vizibil.
5. Pagina poate fi înțeleasă fără animații.
6. Paginile lungi au orientare locală.
7. Interacțiunile nu ascund conținut esențial.
8. Versiunea mobilă nu este doar desktop-ul pus pe o singură coloană.
9. Orice funcție viitoare este marcată vizual distinct de una disponibilă.
10. Sistemul este recognoscibil ca EZPLAY chiar fără logo în fiecare secțiune.

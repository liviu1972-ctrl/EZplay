---
status: Current
version: "1.0"
updated: 2026-07-18
lifecycle: active
canonical_for:
  - adaptive editorial lens system for ezplay.org
  - session-context lens inference
  - relationship between shared copy, audience routes and lens variants
  - preservation and progressive adaptation of existing website copy
---

# Sistemul de lentile editoriale adaptive pentru ezplay.org

## Rolul documentului

Acest document definește felul în care website-ul public EZPLAY își poate adapta vocea, ordinea editorială și următorul pas la intenția observată în sesiunea curentă, fără să creeze site-uri paralele și fără să schimbe adevărul despre produs.

Decizia de produs este consemnată în [decizia privind lentilele editoriale adaptive](../../decisions/active/adaptive-editorial-lenses.md). Acest document este sursa canonică pentru comportamentul editorial, inventarul inițial, limitele personalizării și regulile pe care trebuie să le urmeze viitoarele variante de copy.

Sistemul nu este încă descris ca implementat. Arhitectura tehnică, pragurile exacte și verificarea în aplicație aparțin planificării și implementării ulterioare.

## Decizia de experiență

EZPLAY păstrează un singur sitemap public și un nucleu comun de conținut. Pe paginile comune, prezentarea poate folosi una dintre patru lentile editoriale:

1. tânăr / participant;
2. părinte;
3. educator / facilitator;
4. organizație / decident.

Lentila activă este o ipoteză temporară despre intenția vizitei, nu o afirmație despre identitatea permanentă a persoanei. Ea este dedusă progresiv din traseul și acțiunile sesiunii curente.

Website-ul:

- pornește cu versiunea comună implicită;
- nu blochează prima vizită prin formular, modal sau întrebare obligatorie;
- nu schimbă lentila după un singur semnal slab;
- nu rescrie pagina în timp ce utilizatorul o citește;
- nu combină proporțional mai multe voci într-un text hibrid;
- păstrează o cale discretă prin care utilizatorul poate ajunge la perspectiva potrivită;
- revine la copy-ul comun când intenția nu este suficient de clară sau varianta nu există.

## Termeni

### Copy comun implicit

Copy-ul actual al paginilor comune este experiența completă și sigură folosită când:

- sesiunea nu are încă semnale suficiente;
- două lentile au semnale apropiate;
- pagina nu are o variantă aprobată pentru lentila activă;
- personalizarea nu poate funcționa;
- utilizatorul ajunge printr-un context care nu justifică o adaptare.

`Comun` nu înseamnă lipsit de personalitate. Înseamnă că textul exprimă vocea generală EZPLAY și poate fi înțeles fără cunoașterea intenției vizitatorului.

### Lentilă editorială

O perspectivă controlată care poate modifica introducerea, accentul, exemplele, ordinea unor blocuri și formularea acțiunilor, fără să schimbe faptele, promisiunile sau regulile produsului.

### Semnal

O rută, o alegere sau o succesiune de acțiuni care indică interesul probabil al sesiunii. Un semnal nu este o etichetă personală și nu dovedește cine este utilizatorul.

### Sesiune

Vizita curentă în website, în interiorul căreia semnalele pot produce o adaptare contextuală. Lentila nu devine implicit preferință de cont și nu creează istoric între vizite.

### Rută de public

O pagină adresată explicit unui public, precum `/for/young-people`, `/for/parents` sau `/for/organizations`. Vocea declarată de rută are prioritate pe acea pagină.

## Cele patru lentile

| Lentilă | Nevoia dominantă observată | Voce și ritm | Evidențiază | Nu face |
|---|---|---|---|---|
| **Tânăr / participant** | vrea să descopere, să joace sau să participe | directă, energică, la persoana a II-a, fără slang artificial | alegerea, provocarea, consecința, restartul, autonomia și primul pas | nu infantilizează, nu promite succes și nu cere date sensibile |
| **Părinte** | caută valoarea experienței pentru copil și condițiile de acces | calmă, clară, apropiată, fără frică folosită comercial | mecanismul de învățare, progresia, limitele, rolul adultului și siguranța | nu etichetează copilul și nu garantează rezultate |
| **Educator / facilitator** | vrea să înțeleagă sau să folosească metoda cu tineri | colegială, pedagogică și aplicată, fără academism inutil | Founder Loop, facilitarea, obiectivele, materialele, debrief-ul și adaptarea | nu confundă metoda cu dovada eficienței și nu transformă profesorul în simplu distribuitor de conținut |
| **Organizație / decident** | evaluează potrivirea, seriozitatea și posibilitatea unei colaborări | structurată, credibilă și orientată spre decizie | programul, dovezile și limitele, implementarea, rolurile, condițiile și următorul pas | nu inventează ofertă, capacitate, rezultate, parteneri sau proces operațional |

`Vreau să colaborez` rămâne o intenție și o destinație posibilă pentru contributori, cercetători, antreprenori și parteneri. Nu devine automat a cincea lentilă. Când persoana nu corespunde clar uneia dintre cele patru perspective, copy-ul comun și rutele `Development` sau `Contact` rămân suficiente.

## Vocea brandului și lentilele

Lentilele nu sunt patru branduri și nu schimbă personalitatea EZPLAY. Toate păstrează regulile din [ghidul de copywriting](copy-rules.md): claritate, curiozitate, respect, precizie și optimism fără promisiuni false.

Separăm trei dimensiuni care nu trebuie confundate:

- **limba** — română sau engleză, controlată de mecanismul de localizare;
- **lentila** — perspectiva editorială a sesiunii;
- **complexitatea subiectului** — nivelul real de cunoaștere cerut de conținut.

Un text colegial despre valuation nu devine automat potrivit pentru un copil. Tonul nu înlocuiește calibrarea cognitivă și nu modifică nivelurile curriculare.

## Începutul unei sesiuni

La prima intrare fără context suficient:

1. se livrează copy-ul comun implicit;
2. website-ul rămâne complet utilizabil;
3. nu apare un selector obligatoriu de rol;
4. nu se cere vârsta, localitatea, țara sau o identitate;
5. prima navigare începe să producă semnale numai prin alegerile normale ale utilizatorului.

Intrarea directă pe o rută de public folosește vocea acelei rute și constituie un semnal puternic pentru paginile comune vizitate ulterior. Nu este necesar ca utilizatorul să declare formal cine este.

## Modelul semnalelor

Semnalele sunt evaluate prin coerență și intensitate, nu doar prin numărul de clickuri.

### Semnale slabe

Nu activează singure o lentilă:

- deschiderea unei singure pagini tematice;
- citirea unui articol sau a unei surse;
- scroll-ul ori timpul petrecut într-o pagină;
- o revenire izolată la o secțiune;
- intrarea pe homepage fără o alegere ulterioară.

### Semnale medii

Pot construi o intenție când apar împreună:

- navigarea repetată între joc, reguli și experiența introductivă;
- navigarea între informații despre copil, vârstă, progres și participare;
- navigarea între curriculum, Founder Rounds, facilitare și metodă;
- navigarea între cercetare, implementare, colaborare și condițiile organizaționale;
- selectarea mai multor CTA-uri compatibile cu aceeași perspectivă.

### Semnale puternice

Pot activa sau schimba o lentilă dacă nu contrazic o alegere explicită recentă:

- accesarea unei rute de public și continuarea către o pagină comună;
- un CTA explicit precum participare, experiență pentru copil, facilitare sau colaborare organizațională;
- alegerea unui subiect corespunzător în `IntentRouter`;
- începerea unui formular specific unui public, fără ca datele introduse să fie folosite la scorare;
- utilizarea controlului discret pentru a merge către altă perspectivă.

Harta exactă rută/acțiune → semnal și greutățile numerice se stabilesc după auditul aplicației și se validează prin scenarii. Documentația de produs nu transformă presupunerile de mai sus în praguri tehnice arbitrare.

## Stabilirea lentilei active

Sistemul respectă următoarele reguli:

1. **Prag minim:** nu activează o lentilă fără semnale suficiente.
2. **Diferență relevantă:** dacă primele două lentile sunt apropiate, păstrează copy-ul comun sau lentila deja stabilă.
3. **Inerție:** o lentilă activă nu este înlocuită de o singură abatere.
4. **Recență:** un traseu nou și coerent poate schimba intenția sesiunii.
5. **Moment de aplicare:** adaptarea apare la următoarea navigare sau într-o tranziție inițiată de utilizator, nu în mijlocul lecturii.
6. **O singură voce:** se folosește copy-ul comun sau o singură lentilă; nu se generează combinații procentuale.
7. **Fallback:** orice incertitudine sau eroare revine la copy-ul comun.

Stările conceptuale sunt:

| Stare | Comportament editorial permis |
|---|---|
| **Fără intenție suficientă** | copy comun, navigare comună și CTA-uri comune |
| **Intenție probabilă** | CTA, recomandare următoare, subtitlu ori exemplu aprobat |
| **Intenție coerentă** | introducere, ordine de blocuri, exemple și CTA-uri ale unei singure lentile |
| **Intenție schimbată coerent** | noua lentilă se aplică la următoarea navigare, cu inerție împotriva oscilațiilor |

## Rutele și lentilele

Lentilele nu produc sitemap-uri paralele.

### Rute comune

Rutele comune rămân unice și pot folosi variante editoriale:

- `/`;
- `/program`;
- `/how-we-learn`;
- `/experiences`;
- `/experiences/introduction`;
- `/research`;
- `/tools`;
- `/about`;
- `/development`;
- alte pagini declarate ulterior ca adaptabile.

Nu se creează automat rute precum `/young/program`, `/parent/program` sau combinații echivalente.

### Rute de public

Rutele de public își păstrează scopul și vocea:

- `/for/young-people`;
- `/for/parents`;
- `/for/organizations`.

Lentila sesiunii nu rescrie o pagină care declară explicit alt public. Vizitarea și continuarea din acea rută pot însă constitui un semnal puternic pentru paginile comune următoare.

Lentila educator există editorial înaintea unei rute dedicate. Până la aprobarea unei asemenea rute, semnalele și următorii pași pot folosi `/how-we-learn`, `/program`, `/research`, `/development` sau `/contact`, după intenție. Sistemul nu introduce unilateral o pagină nouă în sitemap.

### Rute focalizate și conținut fix

Autentificarea, formularele, paginile juridice, siguranța minorilor, stările produsului și suprafețele aplicative pot folosi contextul numai pentru orientare sau preselectarea sigură a unei intenții. Regulile, câmpurile obligatorii, consimțământul și informațiile juridice nu se schimbă prin lentilă.

## Ierarhia editorială

Pentru orice bloc public se aplică ordinea:

1. adevărul factual, starea produsului, dovezile și regulile de siguranță;
2. vocea specifică unei rute de public sau unui flux focalizat;
3. varianta aprobată pentru lentila activă pe o rută comună;
4. copy-ul comun implicit.

O lentilă nu poate suprascrie un nivel superior.

## Ce poate varia

Pe o rută comună, o variantă aprobată poate schimba:

- eyebrow, titlu și lead;
- introducerea unei secțiuni;
- persoana gramaticală și explicația;
- exemplele, fără inventarea unor funcții sau rezultate;
- ordinea blocurilor independente;
- CTA-ul și descrierea destinației;
- `RelatedPaths` și următoarea pagină recomandată;
- densitatea și ritmul, în limitele sistemului vizual.

Două CTA-uri pot avea etichete diferite și aceeași destinație dacă ambele descriu corect pasul. Destinația diferă numai când acțiunea utilizatorului este realmente diferită.

## Ce rămâne invariant

Lentila nu schimbă:

- definiția și poziționarea EZPLAY;
- oferta, disponibilitatea, prețul sau calendarul;
- arhitectura curriculumului și nivelurile;
- formulele și terminologia economică;
- starea unei funcții;
- rezultatele, dovezile și limitele cercetării;
- regulile de acces și autentificare;
- protecțiile și traseele pentru minori;
- informațiile juridice;
- afirmațiile de siguranță, consimțământ și utilizare a datelor;
- sitemap-ul și numele rutelor;
- limba selectată.

## Conservarea copy-ului existent

Introducerea sistemului nu autorizează rescrierea în masă a website-ului sau a curriculumului.

### Copy comun implicit existent

Următoarele documente rămân surse complete și fallback editorial:

- `pages/homepage.md`;
- `pages/program.md`;
- `pages/how-we-learn.md`;
- `pages/experiences.md`;
- `pages/intro-experience.md`;
- `pages/tools-and-simulations.md`;
- `pages/research.md`;
- `pages/about.md`;
- `pages/development.md`;
- `pages/contact.md`;
- `pages/platform.md`.

Unele pagini au un accent adult sau instituțional potrivit scopului lor. Ele nu trebuie forțate într-o neutralitate artificială. `Comun` înseamnă fallback coerent, nu medie matematică între publicuri.

### Surse existente pentru lentile

- `pages/for-young-people.md` este sursa principală pentru perspectiva participantului;
- `pages/for-parents.md` este sursa principală pentru perspectiva părintelui;
- `pages/for-organizations.md` este sursa principală pentru perspectiva organizației;
- `pages/how-we-learn.md`, `pages/program.md`, `pages/research.md`, curriculumul și materialele de facilitare informează perspectiva educatorului.

Aceste documente nu devin colecții din care implementarea poate recombina liber propoziții. Orice variantă publică nouă se redactează și se aprobă editorial înainte să intre în cod.

### Aplicare progresivă

- nicio pagină nu așteaptă patru variante pentru a rămâne funcțională;
- o pagină fără variantă folosește copy-ul existent;
- nu fiecare pagină trebuie să primească toate lentilele;
- o variantă se activează numai când blocurile ei formează o experiență coerentă;
- primele pagini recomandate pentru prototipare sunt homepage, program, experiența introductivă, cum învățăm și experiențe;
- curriculumul și documentele interne rămân surse riguroase, nu suprafețe cu patru voci.

## Fluxul editorial de acum înainte

Pentru o pagină sau secțiune publică nouă:

1. se stabilește adevărul canonic și dovada;
2. se scrie sau se confirmă copy-ul comun implicit;
3. se decide dacă personalizarea produce valoare reală;
4. se aleg numai lentilele relevante;
5. se scriu variante complete pentru blocurile adaptabile;
6. se verifică faptul că variantele au același sens și aceeași stare de dovadă;
7. se documentează destinațiile CTA și diferențele intenționate;
8. varianta intră în implementare numai după aprobare editorială.

Variantele nu trebuie create doar pentru a umple o matrice. Dacă diferența este cosmetică sau artificială, se păstrează copy-ul comun.

## Controlul discret al perspectivei

Website-ul oferă o cale discretă de corecție, fără să întrerupă utilizatorul și fără să îi spună că a fost „clasificat”.

Controlul poate apărea în navigarea secundară, în Explorer Rail extins, în meniul mobil sau în footer, în funcție de compoziția aprobată. El:

- folosește formulări precum `Cauți altceva?` sau `Vezi EZPLAY pentru...`;
- oferă legături către tineri, părinți, educatori și organizații;
- nu este modal, banner dominant, toast repetat sau întrebare obligatorie;
- nu concurează cu CTA-ul principal al paginii;
- nu afișează scoruri, probabilități sau etichete de profil;
- poate furniza un semnal puternic pentru sesiunea curentă.

Până la existența unei rute dedicate educatorilor, legătura poate conduce către destinația comună cea mai relevantă, fără să pretindă că există o pagină neaprobată.

## Date, persistență și siguranță

În prima versiune, lentila este context de sesiune, nu profil persistent.

Sistemul de lentile:

- nu creează un identificator personal;
- nu adaugă cookie persistent pentru profilarea editorială;
- nu scrie lentila în cont, bază de date sau CRM;
- nu păstrează istoric între vizite;
- nu folosește referrer extern, date cumpărate sau urmărire cross-site;
- nu folosește conținutul liber introdus în formulare pentru inferență;
- nu deduce vârsta exactă, școala, localitatea, situația familială sau alte caracteristici sensibile;
- nu schimbă protecțiile pentru minori.

Un mecanism strict limitat la sesiunea curentă poate păstra starea necesară navigării. Soluția tehnică se decide după audit și trebuie să respecte aceste limite. Cookie-urile sau sesiunile necesare autentificării, securității ori localizării sunt probleme separate și nu devin surse pentru lentila editorială fără o decizie nouă.

## AI și control editorial

AI poate ajuta echipa să propună și să compare variante înainte de aprobare. Website-ul public nu generează liber copy în timp real.

În runtime, sistemul selectează numai variante:

- scrise și versionate;
- aprobate editorial;
- verificate față de surse și dovezi;
- disponibile în limba activă;
- testate în layout și pentru accesibilitate.

## Dovezi și publicare

O variantă de lentilă moștenește grupul de afirmații, dovezile, starea și limitele copy-ului comun din [harta afirmațiilor și dovezilor](content-evidence-map.md).

Dacă varianta introduce o afirmație nouă sau întărește sensul, ea nu mai este o simplă adaptare. Necesită actualizarea hărții, sursă și aprobare înainte de publicare.

O variantă nu poate transforma:

- `Ipoteză explicită` în fapt;
- `Dovadă internă parțială` în rezultat general;
- `De confirmat` în ofertă disponibilă;
- `Blocat` în flux public;
- o posibilitate într-o promisiune.

## Limbă, indexare și accesibilitate

- româna rămâne sursa editorială;
- engleza păstrează aceeași lentilă și același sens, nu traduce mecanic cuvintele;
- schimbarea limbii nu este un semnal de lentilă;
- copy-ul comun rămâne versiunea sigură pentru indexare și funcționare fără personalizare;
- arhitectura tehnică trebuie să evite conținutul instabil, erorile de hidratare și diferențele imposibil de verificat;
- controlul discret și orice CTA adaptat păstrează nume accesibile și destinații previzibile;
- pagina rămâne inteligibilă când mecanismul de adaptare nu rulează.

## Criterii de acceptare de produs

Sistemul este conform acestei specificații când:

- prima vizită funcționează integral cu copy-ul comun și fără întrebare obligatorie;
- exact patru lentile editoriale sunt disponibile conceptual, plus starea comună;
- comportamentul sesiunii produce semnale fără a crea identitate persistentă;
- un semnal slab nu schimbă singur lentila;
- două intenții apropiate păstrează fallback-ul sau lentila stabilă;
- lentila se schimbă numai la o navigare ulterioară, nu în timpul lecturii;
- rutele de public își păstrează vocea și sitemap-ul rămâne unic;
- paginile fără variante continuă să folosească textele actuale;
- nicio variantă nu schimbă adevărul, dovada, siguranța ori starea produsului;
- CTA-uri diferite pot duce la aceeași destinație când acțiunea este aceeași;
- controlul de corecție este discret, accesibil și neintruziv;
- nu există generare liberă de copy în runtime;
- sistemul poate fi dezactivat fără să rupă navigarea sau conținutul.

## Ce nu este încă decis

Această specificație nu stabilește:

- valorile numerice ale semnalelor și pragurilor;
- algoritmul, structura componentelor sau locul exact al stării;
- instrumentarea tehnică și testele automate;
- lista completă de variante editoriale;
- o rută publică dedicată educatorilor;
- persistența între sesiuni ori în cont;
- folosirea analiticelor pentru optimizare;
- extinderea la alte publicuri sau la personalizare generativă.

Acestea necesită audit tehnic, prototip editorial, verificare cu utilizatori și, unde schimbă decizia de produs, aprobare explicită.

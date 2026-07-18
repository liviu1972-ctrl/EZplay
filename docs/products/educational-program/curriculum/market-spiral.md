---
status: Draft
version: "0.4"
updated: 2026-07-18
---

# Spirala Market

## Rolul documentului

Acest document este sursa de lucru pentru progresia curriculară Market din Programul educațional EZPLAY. Păstrează Market Level 1 existent și dezvoltă capacitățile propuse pentru Level 2–5 și contribuția Market la Mastery.

Arhitectura comună este definită în [arhitectura curriculară](architecture.md), standardul orizontal în [harta Level 1–5 și Mastery](progression-map.md), iar definiția Market în [Business Pillar — Market](../../../methods/business-pillars/market.md).

## Market în Deckbuilder

Deckbuilder face Market vizibil prin capacitatea firmei de a câștiga clienți. Materialele pentru copii pot folosi `Marketing` sau `Clienți`, iar Business Language folosește `Market`.

Valoarea din joc nu reprezintă numărul total al oamenilor care există pe piață. Ea arată câți clienți poate câștiga compania în trimestrul respectiv. Vânzările sunt limitate de valoarea mai mică dintre Producție și Clienți:

> **Vânzări = min(Producție, Clienți)**

Round-urile de Market pornesc de la această relație și adaugă întrebările despre cine cumpără, cum ajunge firma la client și dacă dezvoltarea Market-ului produce Vânzări utile.

## Market Level 1

Nivelul este calibrat pentru clasele a II-a–a IV-a din România și folosește Deckbuilder ca instrument principal.

### Cele două registre editoriale ale nivelului

**Titlu pentru participant:** Cum găsește firma clienți?

**Descriere pentru participant:** Descoperi cine ar putea cumpăra, cum află oamenii despre ofertă și de ce firma nu poate vinde mai mult decât îi permit împreună Clienții și Producția.

**Titlu pedagogic:** Clienți, Marketing și Vânzări

**Descriere pedagogică:** Participantul descrie un client, explică modul în care firma ajunge la el, calculează capacitatea Market în Deckbuilder și leagă dezvoltarea clienților de Producție și Vânzări.

**Întrebarea fondatorului:** Cui vindem și cum ajungem la suficienți clienți?

**Capacitate centrală:** Participantul poate explica de unde vin Vânzările din perspectiva Market și poate decide dacă firma trebuie să dezvolte capacitatea de a câștiga clienți.

### Liniile începute la Level 1

| Linie | Fundația nivelului |
|---|---|
| **1 — Clientul** | persoana sau organizația care poate alege oferta |
| **2 — Ajungerea la client** | modalitățile prin care clientul află și poate cumpăra |
| **3 — Capacitatea Market** | câți clienți poate câștiga firma într-o perioadă |
| **4 — Echilibrul cu Operations** | Vânzările limitate de Producție sau Clienți |
| **5 — Decizia Market** | alegerea dezvoltării care poate produce Vânzări utile |

### Harta Round-urilor

| Cod | Titlu pentru participant | Titlu pedagogic |
|---|---|---|
| `MKT 1.1` | Cine cumpără de la noi? | Clientul firmei |
| `MKT 1.2` | Cum află clienții despre noi? | Cum ajunge firma la clienți |
| `MKT 1.3` | Câți clienți putem câștiga? | Capacitatea de a câștiga clienți |
| `MKT 1.4` | Putem vinde tot ce producem? | Echilibrul dintre Clienți și Producție |
| `MKT 1.5` | Avem nevoie de mai mulți clienți? | Decizia de a atrage mai mulți clienți |

După onboardingul comun, Round-urile pot fi parcurse în orice ordine. Clientul, oferta și indicatorii necesari sunt incluși în cazul Round-ului atunci când nu au fost întâlniți anterior.

### MKT 1.1 — Clientul

**Titlu pentru participant:** Cine cumpără de la noi?

**Descriere pentru participant:** Firma nu vinde „tuturor”. Alegi cine ar putea folosi oferta și explici de ce persoana respectivă ar cumpăra.

**Titlu pedagogic:** Clientul firmei

**Descriere pedagogică:** Participantul descrie un client concret și leagă alegerea lui de o nevoie și de oferta companiei, fără segmentare formală.

**Competență urmărită:** Poate identifica un client posibil și poate explica motivul cumpărării.

**Prerechizite:** onboardingul programului.

### MKT 1.2 — Ajungerea la client

**Titlu pentru participant:** Cum află clienții despre noi?

**Descriere pentru participant:** Un produs bun nu se vinde dacă nimeni nu știe de el sau nu poate ajunge la el. Alegi cum află clientul, cum vorbește firma cu el și cum poate cumpăra.

**Titlu pedagogic:** Cum ajunge firma la clienți

**Descriere pedagogică:** Participantul recunoaște rolul comunicării, vânzării, distribuției și altor modalități simple prin care compania ajunge la client.

**Competență urmărită:** Poate propune o modalitate potrivită prin care firma ajunge la clientul ales.

**Prerechizite:** onboardingul programului; nu cere alt Market Round.

### MKT 1.3 — Capacitatea Market

**Titlu pentru participant:** Câți clienți putem câștiga?

**Descriere pentru participant:** Mulți oameni ar putea avea nevoie de produs, dar firma poate ajunge doar la o parte dintre ei într-un trimestru. Calculezi valoarea din joc și explici ce arată.

**Titlu pedagogic:** Capacitatea de a câștiga clienți

**Descriere pedagogică:** Participantul adună valorile de Marketing/Clienți din Deckbuilder și le interpretează drept capacitatea companiei de a câștiga clienți în trimestrul respectiv, nu drept dimensiunea totală a pieței.

**Competență urmărită:** Poate calcula valoarea și poate explica limita pe care o reprezintă.

**Prerechizite:** onboardingul Deckbuilder; nu cere alt Market Round.

### MKT 1.4 — Clienți și Producție

**Titlu pentru participant:** Putem vinde tot ce producem?

**Descriere pentru participant:** Uneori firma poate produce mai mult decât poate vinde. Alteori are clienți, dar nu poate produce suficient. Descoperi ce limitează Vânzările.

**Titlu pedagogic:** Echilibrul dintre Clienți și Producție

**Descriere pedagogică:** Participantul folosește relația `Vânzări = min(Producție, Clienți)`, identifică limita trimestrului și explică de ce dezvoltarea unei singure capacități poate să nu crească Vânzările. Round-ul răspunde direct dezechilibrului observat frecvent în joc între Producție și Clienți.

**Competență urmărită:** Poate identifica dacă Vânzările sunt limitate de Market sau Operations și poate explica efectul.

**Prerechizite:** onboardingul Deckbuilder; nu cere alt Market sau Operations Round.

### MKT 1.5 — Decizia Market

**Titlu pentru participant:** Avem nevoie de mai mulți clienți?

**Descriere pentru participant:** Compari Clienții, Producția, Vânzările, Cheltuielile și Profitul. Alegi dacă firma trebuie să investească în Marketing, să caute o resursă flexibilă sau să rezolve mai întâi o altă limită.

**Titlu pedagogic:** Decizia de a atrage mai mulți clienți

**Descriere pedagogică:** Participantul folosește indicatorii Deckbuilder pentru a decide dacă dezvoltarea Market este prioritară și evită investiția inutilă într-o capacitate care nu limitează Vânzările.

**Competență urmărită:** Poate susține sau respinge o investiție Market folosind cel puțin doi indicatori relevanți.

**Prerechizite:** onboardingul Deckbuilder; nu cere alt Market sau Finance Round.

**Condiție de lucru:** cazul oferă valorile de Producție, Clienți, Vânzări, Cheltuieli și Profit necesare deciziei.

## Ce nu intră încă în Market Level 1

- segmentare formală și dimensionarea pieței;
- cercetare de piață structurată;
- brand și poziționare dezvoltate;
- funnel, conversie și Customer Acquisition Cost;
- canale, distribuție și parteneriate analizate comparativ;
- pricing, retenție și Lifetime Value;
- strategie comercială și extindere pe piețe noi.

Level 1 urmărește clientul, accesul la el, capacitatea Market și relația directă cu Vânzările.

## Regula progresiei după Level 1

Level 2–5 pornesc de la deciziile Market pe care participantul trebuie să le poată lua. Deckbuilder poate rămâne un instrument acolo unde face cererea și limita Market vizibile, dar nu definește programa.

Market nu este numai promovare și nu este mărimea totală a pieței. Progresia urmărește capacitatea companiei de a înțelege cererea, a ajunge la client, a facilita cumpărarea și a construi relații comerciale sustenabile.

```text
client și acces
→ traseu către primii clienți
→ go-to-market și conversie
→ motor de creștere și retenție
→ strategie comercială multi-segment și multi-piață
→ strategie Market de enterprise și ecosisteme
```

## Market Level 2 — drumul către primii clienți

**Calibrare:** clasele a V-a–a VI-a.

### Cele două registre editoriale ale nivelului

**Titlu pentru participant:** Cum ajunge oferta la oamenii potriviți?

**Descriere pentru participant:** Alegi un grup de clienți, afli cum descoperă și compară oferta și construiești un drum simplu până la cumpărare. Compari mesaje și canale fără să presupui că mai multă atenție înseamnă automat mai multe vânzări.

**Titlu pedagogic:** Client, traseu de cumpărare și primele canale

**Descriere pedagogică:** Participantul definește un segment simplu, reprezintă traseul clientului și alege o combinație de mesaj, canal, vânzare și relație potrivită ofertei și economiei firmei.

**Întrebarea fondatorului:** Cine are nevoie de ofertă și care este drumul realist prin care o descoperă, o înțelege și o cumpără?

**Capacitate centrală:** Participantul poate proiecta și explica un traseu simplu către primii clienți și poate compara două modalități de a ajunge la ei.

### Arii curriculare

- client, utilizator, cumpărător și plătitor în situații simple;
- gruparea clienților printr-o nevoie sau situație comună;
- observație și conversație cu clienții;
- alternativele clientului;
- traseul de la descoperire la cumpărare și folosire;
- mesaj, dovadă și încredere;
- canale simple de comunicare, vânzare și distribuție;
- conversația de vânzare și ascultarea nevoii;
- prețul și condițiile de cumpărare la nivel introductiv;
- experiența după cumpărare, revenire și recomandare;
- cost simplu al unei acțiuni Market;
- respect, transparență și protejarea datelor clientului.

### Participantul poate

- descrie un grup de clienți prin nevoie și context, nu doar vârstă;
- distinge persoana care folosește, alege și plătește;
- identifica alternativele și barierele de cumpărare;
- reprezenta pașii esențiali ai traseului clientului;
- formula un mesaj care explică valoarea fără promisiuni false;
- compara două canale prin acces, încredere, cost și efort;
- construi o conversație de vânzare care include întrebări și ascultare;
- explica de ce atenția nu este vânzare;
- propune o modalitate simplă de a păstra relația;
- decide ce semnal arată că traseul funcționează.

### Dovezi de nivel

Participantul poate construi un traseu coerent `client → descoperire → înțelegere → acces → cumpărare → relație`, poate justifica alegerea canalului și poate identifica cel puțin o barieră și un cost.

### Granița spre Level 3

Level 2 nu cere încă segmentare formală, dimensionarea pieței, poziționare competitivă dezvoltată, funnel măsurat, CAC, CRM sau strategie multi-canal.

## Market Level 3 — go-to-market și conversie

**Calibrare:** clasele a VII-a–a VIII-a.

### Cele două registre editoriale ale nivelului

**Titlu pentru participant:** Cum transformăm interesul în clienți reali?

**Descriere pentru participant:** Alegi segmentul, poziția și canalele, măsori pașii până la cumpărare și descoperi unde se pierde interesul. Compari clienții câștigați cu banii și efortul folosite.

**Titlu pedagogic:** Segmentare, poziționare, go-to-market și conversie

**Descriere pedagogică:** Participantul construiește un go-to-market pentru un segment, urmărește conversia și costul de achiziție la nivel de bază și revizuiește mesajul, canalul sau procesul comercial pe baza datelor.

**Întrebarea fondatorului:** Ce combinație de segment, poziționare, mesaj, canal și vânzare poate produce clienți potriviți?

**Capacitate centrală:** Participantul poate proiecta și analiza un go-to-market simplu și poate identifica intervenția care îmbunătățește conversia sau calitatea clienților.

### Arii curriculare

- segmentare, target și criterii de alegere;
- mărimea pieței la nivel de estimare și limitele estimării;
- concurenți, substitute și poziționare împreună cu Strategy și Product;
- propunere de valoare și mesaj;
- brand, dovadă și încredere;
- funnel sau traseu comercial ca instrument contextual, nu universal;
- reach, răspuns, conversie și Sales Volume;
- Customer Acquisition Cost la nivel de bază;
- proces de vânzare și durata lui;
- canale și distribuție comparate;
- onboarding, suport, retenție și repeat purchase;
- feedback Market către Product;
- etică, consimțământ și calitatea datelor.

### Participantul poate

- segmenta clienții prin criterii relevante pentru cumpărare;
- estima o piață și explica ipotezele și limitele;
- construi o poziționare față de alternative;
- proiecta pașii unui go-to-market;
- calcula rate simple de conversie și un CAC de bază;
- identifica locul în care se pierde interesul sau încrederea;
- compara canale prin volum, cost, calitate și timp;
- separa clientul nepotrivit de o problemă a mesajului sau produsului;
- conecta retenția cu promisiunea Product și livrarea Operations;
- recomanda un experiment Market și criteriul lui de succes.

### Dovezi de nivel

Participantul poate apăra un go-to-market cu segment, poziționare, canal, proces, metrici și economie de bază și îl poate revizui când o ipoteză este infirmată.

### Granița spre Level 4

Level 3 construiește un sistem comercial simplu. Level 4 cere gestionarea creșterii prin mai multe canale, retenție, pricing, echipe și forecasturi.

## Market Level 4 — motorul de creștere

**Calibrare:** clasele a IX-a–a X-a.

### Cele două registre editoriale ale nivelului

**Titlu pentru participant:** Cum creștem vânzările fără să cumpărăm clienți neprofitabili?

**Descriere pentru participant:** Conectezi achiziția, conversia, retenția, pricing-ul și capacitatea Operations. Construiești un sistem de creștere care urmărește nu doar volumul, ci și calitatea Revenue-ului și experiența clientului.

**Titlu pedagogic:** Growth engine, customer economics și management comercial

**Descriere pedagogică:** Participantul proiectează și gestionează un motor de creștere, folosind unit economics, canale, retenție, pricing, sales forecasting și organizarea activității comerciale.

**Întrebarea fondatorului:** Ce sistem de achiziție, conversie, retenție și monetizare poate crește fără să distrugă economia sau promisiunea companiei?

**Capacitate centrală:** Participantul poate proiecta un motor de creștere și poate aloca resurse între canale și etape ale relației folosind date comerciale și financiare.

### Arii curriculare

- strategie go-to-market și rolul canalelor;
- B2C, B2B și alte modele la nivel comparativ;
- customer journey și experiență end-to-end;
- achiziție, activare, conversie, retenție și recomandare;
- cohorte simple, churn și repeat purchase;
- Customer Acquisition Cost și Lifetime Value;
- pricing și packaging împreună cu Product și Finance;
- sales pipeline și forecasting;
- CRM și calitatea datelor;
- distribuție și parteneriate comerciale;
- brand, reputație și încredere;
- organizarea rolurilor Marketing, Sales și Customer Success;
- cerere, capacitate Operations și calitatea livrării;
- privacy, securitate, discriminare și comunicare responsabilă.

### Participantul poate

- construi o arhitectură de canale și explica rolul fiecăruia;
- calcula și interpreta CAC, LTV și retenție în context;
- evita concluzia că un raport bun garantează profitabilitatea;
- construi un sales forecast și declara ipotezele;
- prioritiza bugetul între achiziție, conversie și retenție;
- evalua efectul pricing-ului asupra cererii, poziționării și marjei;
- proiecta responsabilități și handoff-uri între rolurile comerciale;
- folosi CRM-ul ca sistem de decizie, nu doar bază de contacte;
- identifica o promisiune Market pe care Operations nu o poate susține;
- construi un plan de creștere cu indicatori și limite de risc.

### Dovezi de nivel

Participantul poate apăra un motor de creștere prin date de canal, conversie, retenție, customer economics, capacitate și calitatea Revenue-ului, apoi poate realoca resursele într-un scenariu schimbat.

### Granița spre Level 5

Level 4 gestionează creșterea unui sistem comercial. Level 5 cere leadership asupra mai multor segmente, piețe, canale, echipe, parteneri și riscuri reputaționale sau de concentrare.

## Market Level 5 — strategie comercială complexă

**Calibrare:** clasele a XI-a–a XII-a.

### Cele două registre editoriale ale nivelului

**Titlu pentru participant:** Pe ce piețe creștem și ce sistem comercial construim?

**Descriere pentru participant:** Alegi între segmente, canale, piețe și parteneri, coordonezi brandul, vânzările și retenția și explici cum creșterea afectează marja, Cash-ul, operațiunile, reputația și riscul.

**Titlu pedagogic:** Strategie multi-segment, multi-canal și market expansion

**Descriere pedagogică:** Participantul conduce o strategie comercială multianuală, integrează customer economics, echipe, parteneriate, extinderea pe piețe și guvernanța datelor și gestionează tensiunile dintre volum, valoare și risc.

**Întrebarea fondatorului:** Unde și prin ce sistem comercial alocăm resurse pentru a construi Revenue de calitate și relații durabile?

**Capacitate centrală:** Participantul poate construi și apăra o strategie Market complexă pentru mai multe segmente, canale sau piețe și poate coordona economia, organizația și riscul comercial.

### Arii curriculare

- strategie de segment, categorie și piață;
- dimensionare și dinamică de piață;
- portofoliu de segmente și canale;
- enterprise sales, key accounts și cicluri lungi la nivel de principiu;
- distribuție, platforme și parteneriate;
- channel conflict și reguli comerciale;
- pricing architecture și discount governance;
- cohort economics, calitatea Revenue-ului și concentrare;
- revenue operations și sisteme de performanță;
- extindere geografică și localizare;
- brand portfolio, reputație și criză;
- leadershipul echipelor comerciale și stimulente;
- date, AI, automatizare și guvernanță;
- etică, reglementare, incluziune și impact;
- Market due diligence și riscul comercial.

### Participantul poate

- compara oportunități de piață prin atractivitate, acces, capabilități și economie;
- aloca buget și oameni între segmente și canale;
- construi o strategie de enterprise sales sau parteneriate la nivel de principiu;
- gestiona conflictul dintre canale și obiectivele de termen scurt;
- proiecta pricing-ul și limitele discounturilor;
- analiza cohortele, concentrarea și calitatea Revenue-ului;
- proiecta revenue operations și responsabilități;
- evalua o extindere internațională și cerințele de localizare;
- conduce un răspuns Market la o problemă de reputație sau livrare;
- integra privacy, securitatea datelor și riscul automatizării;
- susține strategia în fața leadershipului, board-ului sau investitorilor.

### Dovezi de nivel

Participantul poate apăra o strategie Market multianuală prin segment, canale, customer economics, organizare, capacitate, risc și scenarii. Creșterea reach-ului sau Revenue-ului singură nu este dovadă suficientă.

### Granița spre Mastery

Level 5 oferă o decizie comercială complexă și cere o strategie integrată. În Mastery, participantul formulează problema, conduce transformarea comercială și guvernează ecosistemul, datele, reputația și capitalul alocat.

## Market în Mastery — strategie de enterprise și ecosisteme

**Calibrare:** independentă de vârstă; fundație Level 5 sau echivalentă.

**Întrebarea fondatorului:** Cum construim și transformăm sistemul prin care compania creează cerere, încredere și Revenue de calitate în piețe aflate în schimbare?

**Contribuția Market la Mastery:** Participantul poate formula și guverna strategia Market a unei companii sau a unui portofoliu, conectând category, pricing, go-to-market, relațiile, datele, organizația și capitalul.

Market Mastery poate include, când problema o cere:

- category design și repoziționare de enterprise;
- portofoliu de piețe, segmente și branduri;
- ecosisteme, platforme și parteneriate;
- pricing architecture la nivel de portofoliu;
- vânzări enterprise și negocieri complexe;
- extindere, retragere și transformare geografică;
- M&A și integrarea canalelor, clienților și brandurilor;
- revenue transformation și schimbarea operating model-ului comercial;
- reputație, stakeholder communication și criză;
- data strategy, AI, privacy și securitate;
- reglementare, concurență și practici comerciale responsabile;
- Market due diligence pentru investiție sau tranzacție;
- comunicarea cu investitorii fără a înlocui adevărul comercial cu narațiunea.

Mastery nu reia funnel-ul, CAC-ul sau segmentarea ca definiții. Le folosește critic pentru a conduce un sistem comercial complex.

## Matricea revenirilor Market

| Fir recurent | Level 1 | Level 2 | Level 3 | Level 4 | Level 5 | Mastery |
|---|---|---|---|---|---|---|
| **Client și segment** | identifică un client | grupează prin nevoie și traseu | segmentează și alege targetul | gestionează customer lifecycle | alocă între segmente și piețe | transformă portofoliul de piețe |
| **Acces și canal** | propune o cale | compară primele canale | construiește go-to-market | proiectează arhitectura de canale | gestionează multi-canal și parteneri | guvernează ecosisteme și integrare |
| **Mesaj și încredere** | explică modul de ajungere | formulează mesaj și dovadă | construiește poziționare și brand | leagă brandul de experiență | gestionează reputația și portofoliul | conduce category și criză |
| **Vânzare și conversie** | observă limita Clienți | construiește traseul de cumpărare | măsoară conversia și procesul | gestionează pipeline și forecast | conduce enterprise sales și RevOps | transformă sistemul comercial |
| **Economie** | leagă Clienții de Vânzări | compară costul canalelor | calculează CAC de bază | integrează CAC, LTV și pricing | analizează calitatea Revenue-ului | alocă capital între piețe și modele |
| **Relație** | recunoaște clientul | introduce revenirea și recomandarea | măsoară retenția | gestionează lifecycle-ul | coordonează portofoliul și key accounts | guvernează relații și stakeholderi |

## Relația cu celelalte spirale

- Strategy alege arena, poziționarea și prioritățile de creștere.
- Product susține valoarea și promisiunea care fac Market credibil.
- Operations limitează capacitatea de vânzare și calitatea livrării.
- Finance verifică marja, Cash-ul, customer economics și riscul.
- Dimensiunile transversale protejează oamenii, datele, drepturile și impactul.

Market nu poate compensa pe termen lung o ofertă slabă sau o promisiune nelivrabilă și nu trebuie optimizat numai pentru atenție ori volum.

## Ce rămâne de proiectat

- competențele granulare și standardele de stăpânire;
- nucleul obligatoriu și extensiile fiecărui nivel;
- dependențele exacte față de Product, Operations, Finance și Strategy;
- formele potrivite pentru B2C, B2B, marketplace și alte modele;
- dovezile individuale și de echipă;
- Round-urile, cercetările, cazurile, simulările și jocurile;
- criteriile de poziționare și trecere;
- revizuirea de specialitate și validarea cu participanți.

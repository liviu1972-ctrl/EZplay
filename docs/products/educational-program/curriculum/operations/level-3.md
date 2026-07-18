---
status: Working
version: "0.1"
updated: 2026-07-18
pillar: Operations
level: 3
grade_band: "VII–VIII"
canonical_for:
  - Operations Level 3 curriculum
  - Operations Level 3 Founder Round map
---

# Operations Level 3

## Rolul documentului

Acest fișier definește harta curriculară Operations Level 3. Se citește împreună cu [standardul hărților de Founder Rounds](../round-map-standard.md) și [Spirala Operations](../operations-spiral.md).

## Identitatea nivelului

**Calibrare:** clasele a VII-a–a VIII-a.

**Titlu pentru participant:** Unde se pierde timpul, calitatea sau capacitatea?

**Descriere pentru participant:** Măsori fluxul, vezi unde apar așteptări, erori și stocuri și compari soluții. Alegi ce schimbare rezolvă cauza, nu doar simptomul vizibil.

**Titlu pedagogic:** Flux, productivitate, furnizori și control operațional

**Descriere pedagogică:** Participantul măsoară un sistem Operations, diagnostichează blocaje și variație și îmbunătățește fluxul, capacitatea, stocul, calitatea și relația cu furnizorii.

**Întrebarea fondatorului:** Ce ne arată datele despre flux și ce intervenție îmbunătățește sistemul complet?

**Capacitate centrală:** Participantul poate diagnostica și îmbunătăți un proces folosind metrici, cauze și compromisuri.

## Harta Round-urilor

| Cod | Titlu pentru participant | Titlu pedagogic | Rol în nivel |
|---|---|---|---|
| `OPS 3.1` | Ce măsurăm ca să înțelegem sistemul? | Metrici operaționale și definiții | construiește un set mic de indicatori cu numitori și surse clare |
| `OPS 3.2` | De ce se formează cozile? | Flow, WIP, loturi și bottleneck | explică relația dintre lucru început, variație și timpul de livrare |
| `OPS 3.3` | Cât și când pregătim? | Cerere, stoc și planificare | echilibrează disponibilitatea cu riscul de exces sau lipsă |
| `OPS 3.4` | Ce furnizor ne costă cu adevărat mai puțin? | Selecția furnizorului și total cost | compară prețul cu timpul, calitatea, flexibilitatea și riscul |
| `OPS 3.5` | Cum facem rezultatul repetabil? | Standard work, calitate și control | proiectează standardul și punctele de control potrivite |
| `OPS 3.6` | Cum găsim cauza și testăm schimbarea? | Îmbunătățire continuă și root cause | folosește date, cauze și cicluri de experiment |
| `OPS 3.7` | Cum continuăm când sistemul este lovit? | Dependențe, risc și continuitate | construiește răspuns și recuperare pentru un scenariu operațional |

Nivelul începe cu limbajul comun al măsurării, apoi urmărește fluxul, resursele externe și controlul. `OPS 3.6–3.7` integrează diagnosticul într-un sistem de îmbunătățire și continuitate.

## OPS 3.1 — Metrici operaționale și definiții

**Titlu pentru participant:** Ce măsurăm ca să înțelegem sistemul?

**Descriere pentru participant:** Alegi puțini indicatori care arată volumul, timpul, calitatea și costul. Definești exact ce numără fiecare, de unde vine informația și cum ar putea fi interpretată greșit.

**Titlu pedagogic:** Metrici operaționale și definiții

**Descriere pedagogică:** Participantul construiește un sistem minim de măsurare cu operational definitions, unități, numitori, frecvență și proprietar. Diferențiază input, process, output și outcome și recunoaște comportamentele distorsionate de metrici.

**Întrebarea antreprenorială:** Ce informație ne arată dacă procesul produce rezultatul dorit și unde se degradează?

**Competență urmărită:** Participantul poate defini, calcula și interpreta metrici operaționale și poate explica limitele fiecăreia.

**Concepte și instrumente:** throughput; lead time; cycle time; WIP; defect rate; service level; productivitate; definiție operațională; dashboard minim.

**Dovadă de învățare:** un dicționar de maximum șase metrici și un dashboard interpretat pe două perioade sau scenarii.

**Prerechizite:** Operations Level 2; procente și medii de bază.

**Legături cu ceilalți piloni:** Product și Market definesc outcome-ul clientului; Finance costul și impactul; Strategy stabilește compromisurile.

**Continuitate:** la Level 4, metricile intră în managementul operating model-ului; la Level 5, în management rhythms și enterprise performance.

## OPS 3.2 — Flow, WIP, loturi și bottleneck

**Titlu pentru participant:** De ce se formează cozile?

**Descriere pentru participant:** Urmărești câte lucrări sunt începute, cât așteaptă și cât de mari sunt loturile. Testezi ce se întâmplă când limitezi munca începută sau schimbi regula de trecere prin bottleneck.

**Titlu pedagogic:** Flow, WIP, loturi și bottleneck

**Descriere pedagogică:** Participantul analizează relația dintre arrival rate, capacitate, utilizare, WIP, batch size, variație și lead time, fără formalism matematic avansat. Recunoaște efectul utilizării apropiate de 100% asupra cozilor.

**Întrebarea antreprenorială:** Ce politică de lucru reduce timpul și crește fluxul prin constrângere?

**Competență urmărită:** Participantul poate diagnostica o coadă și poate compara limitarea WIP, reducerea lotului, protejarea bottleneck-ului sau schimbarea priorității.

**Concepte și instrumente:** flow; WIP; queue; batch; bottleneck; utilization; variability; pull; limită WIP; cumulative flow simplificat.

**Dovadă de învățare:** analiza unui set de date sau a unei simulări și o regulă operațională nouă, cu efecte și guardrails.

**Prerechizite:** `OPS 3.1` și harta procesului de la Level 2.

**Legături cu ceilalți piloni:** Market influențează variabilitatea cererii; Product tipurile de lucru; Finance costul întârzierii; Strategy nivelul de serviciu.

**Continuitate:** la Level 4, flow-ul intră în demand/capacity planning și scalarea operating model-ului.

## OPS 3.3 — Cerere, stoc și planificare

**Titlu pentru participant:** Cât și când pregătim?

**Descriere pentru participant:** Cererea nu vine mereu în același ritm, iar resursele au termene diferite. Compari lipsa, excesul și rezerva și construiești un plan simplu de aprovizionare sau capacitate.

**Titlu pedagogic:** Cerere, stoc și planificare

**Descriere pedagogică:** Participantul folosește istoric și scenarii pentru a estima cererea, lead time-ul și necesarul. Distinge cycle stock, safety stock și resurse perisabile sau intangibile și tratează forecastul ca ipoteză actualizabilă.

**Întrebarea antreprenorială:** Ce nivel de resurse protejează livrarea fără să blocheze inutil Cash și capacitate?

**Competență urmărită:** Participantul poate construi un plan simplu, poate calcula efectul unei variații și poate justifica rezerva aleasă.

**Concepte și instrumente:** forecast; cerere; lead time; stoc; stockout; overstock; safety stock orientativ; reorder point simplu; capacitate rezervată.

**Dovadă de învățare:** un plan pe mai multe perioade, cu scenariu de bază, variație, regulă de reaprovizionare și efect asupra serviciului și Cash-ului.

**Prerechizite:** `OPS 3.1–3.2`; Finance Level 2 pentru Cash.

**Legături cu ceilalți piloni:** Market furnizează cererea; Finance costul și Working Capital; Product lifecycle-ul; Strategy apetitul de risc.

**Continuitate:** la Level 4, planificarea devine integrată cu scenarii, workforce, supply chain și investiții.

## OPS 3.4 — Selecția furnizorului și total cost

**Titlu pentru participant:** Ce furnizor ne costă cu adevărat mai puțin?

**Descriere pentru participant:** Prețul cel mai mic poate veni cu întârzieri, defecte, loturi mari sau lipsă de flexibilitate. Compari costul complet și riscul, nu doar oferta de pe prima linie.

**Titlu pedagogic:** Selecția furnizorului și total cost

**Descriere pedagogică:** Participantul construiește criterii de supplier selection și un total cost of ownership simplificat care include preț, transport, control, defecte, stoc, timp, minimum order și risc. Introduce responsabilitatea în supply chain.

**Întrebarea antreprenorială:** Ce furnizor creează cea mai bună combinație de valoare, fiabilitate, flexibilitate și risc?

**Competență urmărită:** Participantul poate compara oferte și poate recomanda o relație de furnizare cu criterii, condiții și plan de monitorizare.

**Concepte și instrumente:** supplier; SLA de bază; lead time; defect; MOQ; total cost; flexibilitate; concentrare; responsabilitate; scorecard.

**Dovadă de învățare:** un scorecard ponderat, calculul total cost și o recomandare care explică sensibilitatea la criterii.

**Prerechizite:** `OPS 3.3`; costuri de bază din Finance.

**Legături cu ceilalți piloni:** Product stabilește specificația; Finance total cost și termenele; Strategy dependența; Market efectul asupra promisiunii.

**Continuitate:** la Level 4, furnizorii intră în network design și supply chain resilience; la Level 5, în sourcing strategy și contract governance.

## OPS 3.5 — Standard work, calitate și control

**Titlu pentru participant:** Cum facem rezultatul repetabil?

**Descriere pentru participant:** Descrii metoda bună cunoscută acum, criteriile și verificările, dar lași loc pentru semnalarea problemelor și îmbunătățire. Alegi unde trebuie prevenită eroarea și unde este suficientă detectarea.

**Titlu pedagogic:** Standard work, calitate și control

**Descriere pedagogică:** Participantul proiectează standard work ca bază actualizabilă, selectează controale după severitate și frecvență și urmărește first-pass yield, defectele și rework-ul. Evită controlul excesiv care adaugă cost fără reducerea relevantă a riscului.

**Întrebarea antreprenorială:** Ce standard și ce control fac rezultatul previzibil fără să blocheze învățarea și autonomia?

**Competență urmărită:** Participantul poate documenta o metodă, poate plasa controale și poate defini reacția la abatere.

**Concepte și instrumente:** standard work; checklist; specification; prevention; inspection; poka-yoke ca idee; first-pass yield; control plan; escalation.

**Dovadă de învățare:** un standard de o pagină și un plan de control cu risc, punct, metodă, frecvență, proprietar și reacție.

**Prerechizite:** metricile din `OPS 3.1` și criteriile de calitate Level 2.

**Legături cu ceilalți piloni:** Product definește calitatea; Market promisiunea; Finance cost of quality; Strategy nivelul de diferențiere.

**Continuitate:** la Level 4, controlul devine sistem de calitate și service; la Level 5, governance și risk controls.

## OPS 3.6 — Îmbunătățire continuă și root cause

**Titlu pentru participant:** Cum găsim cauza și testăm schimbarea?

**Descriere pentru participant:** Un simptom poate avea mai multe cauze. Strângi date, întrebi de ce în lanț, reprezinți cauzele posibile și testezi o contramăsură înainte să declari problema rezolvată.

**Titlu pedagogic:** Îmbunătățire continuă și root cause

**Descriere pedagogică:** Participantul folosește PDCA sau o buclă echivalentă, 5 Whys și cause-and-effect cu grijă pentru a formula cauze verificabile. Distinge corecția, acțiunea corectivă și prevenția.

**Întrebarea antreprenorială:** Ce cauză controlabilă explică problema și ce rezultat arată că intervenția funcționează?

**Competență urmărită:** Participantul poate conduce un ciclu de problem solving bazat pe date și poate evita învinovățirea persoanei drept explicație finală.

**Concepte și instrumente:** simptom; cauză; root cause; 5 Whys; fishbone; Pareto simplu; contramăsură; PDCA; control.

**Dovadă de învățare:** un A3 simplificat sau o fișă echivalentă cu problemă, date, cauze, test, rezultate, concluzie și standard actualizat.

**Prerechizite:** `OPS 3.1` și un proces măsurabil.

**Legături cu ceilalți piloni:** Product și Market arată efectul extern; Finance cuantifică pierderea și investiția; Strategy decide prioritatea.

**Continuitate:** la Level 4, problem solving-ul este integrat în operating model și management; la Level 5, în transformare și restructurare.

## OPS 3.7 — Dependențe, risc și continuitate

**Titlu pentru participant:** Cum continuăm când sistemul este lovit?

**Descriere pentru participant:** Alegi un scenariu care afectează un furnizor, un om, un sistem, o locație sau datele. Urmărești efectele în lanț și construiești răspunsul, comunicarea și recuperarea.

**Titlu pedagogic:** Dependențe, risc și continuitate

**Descriere pedagogică:** Participantul cartografiază dependențe, evaluează probabilitate și impact, stabilește prevenție, detecție, răspuns, recovery time orientativ și criteriu de revenire. Include siguranța și comunicarea stakeholderilor.

**Întrebarea antreprenorială:** Ce trebuie protejat și în ce ordine refacem livrarea după întrerupere?

**Competență urmărită:** Participantul poate construi și testa prin tabletop un plan de continuitate proporțional cu un risc operațional.

**Concepte și instrumente:** risc; dependență; control preventiv; incident; impact; recovery; workaround; escalation; tabletop exercise.

**Dovadă de învățare:** un plan și jurnalul unui exercițiu, cu decizii, roluri, timpi, informații lipsă și două îmbunătățiri.

**Prerechizite:** `OPS 3.1–3.5` sau o arhitectură de proces oferită.

**Legături cu ceilalți piloni:** Market gestionează comunicarea; Product prioritizează serviciile; Finance lichiditatea și pierderea; Strategy definește activitățile critice.

**Continuitate:** la Level 4, continuitatea include date, security, supply chain și operating model; la Level 5, enterprise resilience și criză.

## Standardul de ieșire din nivel

Participantul primește un proces cu date și produce un diagnostic: metrici, flow, WIP, plan de resurse, furnizor, calitate și cauză. Recomandă o schimbare, definește controlul și demonstrează printr-un scenariu cum răspunde sistemul unei întreruperi.

## Granița spre Level 4

Level 3 optimizează și controlează un sistem delimitat. Level 4 proiectează operating model-ul necesar creșterii și integrează demand/capacity planning, supply chain, automatizare, workforce, date, securitate și reziliență.

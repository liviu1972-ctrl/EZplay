---
status: Draft
version: "0.1"
updated: 2026-07-18
stage: Mastery
canonical_for:
  - hybrid Mastery curriculum architecture
  - Mastery pillar lens rules
  - cross-pillar coverage of integrated Mastery Rounds
---

# Arhitectura hibridă Mastery

## Rolul documentului

Acest document explică felul în care [Programul Mastery](../mastery.md) păstrează simultan integrarea companiei și profunzimea celor cinci Business Pillars.

Mastery are o singură [hartă de Founder Rounds](../mastery-rounds.md), dar rezultatul fiecărui pilon este urmărit printr-o lentilă terminală proprie:

- [Strategy în Mastery](strategy.md);
- [Product în Mastery](product.md);
- [Market în Mastery](market.md);
- [Operations în Mastery](operations.md);
- [Finance în Mastery](finance.md).

Lentilele nu redefinesc pilonii. Definițiile lor canonice rămân în [cadrul Business Pillars](../../../../methods/business-pillars/README.md), iar progresia până la Level 5 rămâne în cele cinci spirale curriculare.

## Decizia de arhitectură

Modelul hibrid are patru componente:

1. **un nucleu comun integrat** — `MST 01–13`, organizat în jurul deciziilor de companie, nu al departamentelor;
2. **cinci lentile terminale de competență** — standarde distincte pentru Strategy, Product, Market, Operations și Finance;
3. **bridge-uri și laboratoare de profunzime țintite** — folosite pentru goluri sau contexte speciale, fără a crea niveluri noi;
4. **o demonstrație terminală integrată** — standardul `MST 13`, în care toate cele cinci lentile trebuie reconciliate într-o singură decizie condusă până la consecințe.

Prin urmare, expresii precum `Strategy Mastery` sau `Finance Mastery` denumesc **rezultatul terminal observat prin lentila pilonului**, nu un curs separat, un `Level 6`, un nou tip de XP sau o absolvire independentă.

## De ce este hibrid

O singură hartă integrată protejează realitatea antreprenorială: o tranzacție, o criză, o transformare sau o decizie de capital nu poate fi condusă într-un singur pilon.

Cele cinci lentile protejează profunzimea: integrarea nu este suficientă dacă participantul ascunde o zonă slabă în munca echipei, folosește jargon fără judecată sau produce o recomandare convingătoare care nu rezistă într-unul dintre piloni.

```text
Strategy ────┐
Product ─────┤
Market ──────┼── decizii MST integrate ── demonstrație terminală
Operations ──┤             │
Finance ─────┘             └── corp distinct de dovezi pentru fiecare lentilă
```

## Statutul arhitecturii

Este decis că:

- există un singur program Mastery;
- există cinci lentile terminale obligatorii;
- lentilele sunt demonstrate în Round-uri integrate, nu în cinci trasee paralele;
- un gol de fundație este tratat prin bridge țintit;
- profunzimea contextuală poate fi construită prin laboratoare în interiorul Mastery;
- standardul terminal cere atât profunzime pe fiecare lentilă, cât și integrarea lor.

Rămân `Draft`:

- distribuția exactă a evaluării între Round-uri;
- numărul minim și ponderea dovezilor pentru fiecare lentilă;
- rubricile, pragurile și regulile de echivalare;
- catalogul laboratoarelor de profunzime;
- forma de livrare și validarea prin prototipare.

## Cum se citește matricea

Matricea nu acordă puncte și nu stabilește durata. Ea verifică dacă fiecare Round contribuie real la standardul terminal.

- **D — profunzime directă:** Round-ul dezvoltă și cere explicit o capacitate terminală a lentilei; dovada trebuie evaluată prin acea lentilă.
- **I — integrare materială:** lentila nu este obiectul principal al Round-ului, dar trebuie să schimbe analiza, alternativa, decizia sau planul; simpla menționare nu este suficientă.

Nu există celule goale. Dacă un pilon poate fi eliminat fără ca decizia sau dovada unui Round Mastery să se schimbe, Round-ul nu respectă încă regula de integrare și trebuie revizuit.

## Matricea inițială Round × lentilă

| Founder Round | Strategy | Product | Market | Operations | Finance |
|---|---:|---:|---:|---:|---:|
| `MST 01` — diagnostic și mandat | D | I | I | I | I |
| `MST 02` — teză și scenarii | D | I | I | I | I |
| `MST 03` — portofoliu și capital allocation | D | D | I | I | D |
| `MST 04` — sistem comercial | I | D | D | I | D |
| `MST 05` — operating model, tehnologie și date | I | D | I | D | I |
| `MST 06` — leadership executiv și succesiune | I | I | I | I | I |
| `MST 07` — ownership, finanțare și investitori | D | I | I | I | D |
| `MST 08` — board și guvernanță | D | I | I | I | D |
| `MST 09` — risc, etică, legal și sustenabilitate | I | I | I | I | I |
| `MST 10` — criză și restructurare | D | I | D | D | D |
| `MST 11` — M&A, due diligence și integrare | D | D | D | D | D |
| `MST 12` — opțiuni de ciclu de viață | D | I | D | D | D |
| `MST 13` — decizie terminală integrată | D | D | D | D | D |

`MST 06` și `MST 09` dezvoltă direct dimensiuni transversale, de aceea apar cu `I` în cele cinci coloane. Acest lucru nu le face secundare: leadershipul, guvernanța, riscul, etica și responsabilitatea trebuie să transforme material fiecare pilon.

## Dimensiunile transversale

Dimensiunile transversale nu devin piloni suplimentari și nu primesc trasee de XP. Ele funcționează ca teste de calitate și responsabilitate aplicate deciziilor din cei cinci piloni.

| Dimensiune | Round-uri cu dezvoltare directă inițială | Ce trebuie să devină vizibil |
|---|---|---|
| **People & Leadership** | `MST 06`, `MST 08`, `MST 10`, `MST 11`, `MST 13` | echipă, putere, conflict, succesiune și responsabilitate |
| **Governance, Ethics & Legal** | `MST 01`, `MST 08–13` | mandat, drepturi, aprobări, controale, obligații și limite |
| **Risk & Resilience** | `MST 01–02`, `MST 05`, `MST 09–13` | expuneri, dependențe, scenarii, răspuns și risc rezidual |
| **Technology & Data** | `MST 03`, `MST 05`, `MST 09`, `MST 11–13` | alegere tehnologică, calitatea datelor, securitate și responsabilitate AI |
| **Sustainability & Impact** | `MST 02–05`, `MST 09–10`, `MST 13` | efecte materiale, costuri transferate, stakeholderi și valoare pe termen lung |

Lista indică ancorele inițiale, nu limitează aplicarea dimensiunilor în celelalte Round-uri.

## Regula corpului de dovezi

O lentilă nu este demonstrată printr-un singur artefact și nici prin participarea administrativă la un Round. Corpul de dovezi trebuie să arate, împreună:

1. **profunzime** — cel puțin o situație în care lentila este marcată `D` și schimbă decizia;
2. **transfer** — folosirea capacității într-un alt context, Round sau caz;
3. **adaptare** — revizuirea unei ipoteze sau decizii după informație nouă ori consecințe;
4. **limite profesionale** — recunoașterea expertizei, autorității și verificărilor necesare;
5. **integrare terminală** — contribuție materială și apărată la standardul `MST 13`.

Exact câte dovezi, ce pondere au și ce prag este suficient se stabilește prin rubrici și prototipare. Până atunci, matricea este un instrument de audit curricular, nu un algoritm de absolvire.

## Bridge, laborator de profunzime și specializare

### Bridge

Un bridge recuperează o fundație Level 1–5 lipsă. El:

- pornește din diagnostic;
- are scope limitat și rezultat verificabil;
- se desfășoară înaintea sau în afara activității Mastery pe care o blochează;
- nu produce singur dovadă terminală;
- nu este redenumit „Mastery Basics”.

### Laborator de profunzime

Un laborator de profunzime extinde o fundație deja stăpânită într-un context avansat: industrie, tehnologie, jurisdicție, tip de companie, rol sau tranzacție. El:

- rămâne în interiorul Mastery;
- poate întări una sau mai multe lentile;
- trebuie să se întoarcă într-o decizie integrată;
- nu creează un nivel ulterior și nu înlocuiește standardul comun.

### Specializare

O specializare poate grupa mai multe laboratoare și practică aplicată. Ea descrie profunzimea contextuală, nu o ierarhie peste Mastery. Numele, conținutul și forma eventualelor specializări nu sunt încă decise.

## Regula evaluării terminale

Recunoașterea finală Mastery nu se acordă prin media compensatorie a celor cinci lentile. O performanță foarte puternică în Strategy sau Finance nu poate ascunde incapacitatea materială de a evalua Product, Market ori Operations.

Standardul cere:

- corp coerent de dovezi pentru fiecare lentilă;
- folosirea dimensiunilor transversale relevante;
- o decizie terminală în care toate cele cinci lentile sunt materiale;
- apărarea limitelor, compromisurilor și consecințelor;
- revizuirea deciziei când ipotezele sunt contrazise.

Rubrica poate permite profiluri diferite de profunzime, dar nu poate transforma un gol critic într-o absolvire prin compensare numerică.

## Legături canonice

- [Decizia Level 1–5 și Mastery](../../../../decisions/active/curriculum-levels-and-mastery.md)
- [Programul Mastery](../mastery.md)
- [Harta celor 13 Founder Rounds](../mastery-rounds.md)
- [Harta comună de progresie](../progression-map.md)
- [Standardul hărților de Founder Rounds](../round-map-standard.md)

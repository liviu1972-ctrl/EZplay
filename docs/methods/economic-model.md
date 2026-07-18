---
status: Working
version: "0.4"
updated: 2026-07-18
canonical_for:
  - economic model
  - economic formulas
  - economic role of Business Pillars
  - Learn Language
  - Business Language
---

# Modelul economic comun EZPLAY

## Rolul documentului

Acest document este sursa canonică pentru modelul economic comun folosit în jocurile, simulările și experiențele EZPLAY.

El definește:

- formula economică generală;
- rolul economic al celor cinci Business Pillars;
- relația dintre EZPLAY Deckbuilder și EZPLAY Tableau Builder;
- Learn Language și Business Language;
- formulele și regulile principale de terminologie.

Documentele fiecărui joc explică modul concret în care modelul este aplicat, fără să îl redefinească.

## Modelul general

Formula completă este:

> **Revenue = min(Operations, Market) × Product**

Modelul exprimă trei idei:

1. compania poate vinde doar volumul pe care îl pot susține împreună Operations și Market;
2. volumul este limitat de capacitatea mai mică;
3. Product multiplică valoarea economică generată de acel volum.

Formula poate fi descompusă astfel:

> **Sales Volume = min(Operations, Market)**

> **Revenue = Sales Volume × Product**

## Cei cinci Business Pillars

Modelul complet al unei companii este organizat prin cinci **Business Pillars**:

1. **Strategy**
2. **Product**
3. **Market**
4. **Operations**
5. **Finance**

Modelul de business predat în EZPLAY, relațiile dintre piloni și definițiile lor conceptuale sunt dezvoltate în [sursa generală Business Pillars](business-pillars/README.md). Acest document păstrează rolul lor în formula economică și limbajele comune.

### Strategy

Stabilește direcția, alegerile, prioritățile și modul în care compania își construiește avantajul.

Strategy influențează ceilalți piloni, dar nu intră direct în formula Revenue.

### Product

Reprezintă valoarea economică a produsului sau serviciului.

Product poate reflecta:

- diferențiere;
- calitate;
- design;
- tehnologie;
- inovație;
- proprietate intelectuală;
- experiență;
- poziționare;
- putere de preț.

Product este un multiplicator și pornește de la valoarea 1.

### Market

Reprezintă capacitatea companiei de a ajunge la piață și de a câștiga clienți.

Poate fi construită prin:

- marketing;
- vânzări;
- distribuție;
- brand;
- parteneriate;
- magazine;
- canale digitale;
- comunități;
- software și automatizări.

Market nu reprezintă dimensiunea totală a pieței și nici numărul total de clienți existenți.

### Operations

Reprezintă capacitatea companiei de a crea, executa și livra valoare.

Poate include:

- oameni;
- utilaje;
- echipamente;
- procese;
- sisteme;
- software;
- infrastructură;
- capacitate de prestare sau livrare.

Operations nu înseamnă doar producție industrială.

### Finance

Urmărește și susține rezultatul economic al companiei:

- Revenue;
- Expenses;
- Profit;
- Cash Flow;
- Cash;
- Annual Revenue;
- Equity.

Finance influențează deciziile și sustenabilitatea, dar nu intră direct în formula Revenue.

## Relația dintre jocuri

### EZPLAY Deckbuilder

În Deckbuilder:

> **Product = 1**

Prin urmare:

> **Revenue = min(Operations, Market)**

În Learn Language:

> **Vânzări = min(Producție, Clienți)**

Deckbuilder face vizibile în principal Operations și Market. Product rămâne implicit, iar Strategy și Finance sunt învățate prin decizii și rezultate.

### EZPLAY Tableau Builder

În Tableau Builder, Product devine o variabilă explicită.

Formula este:

> **Revenue = min(Operations, Market) × Product**

Tableau Builder poate face vizibili toți cei cinci Business Pillars, dar mecanicile sale concrete rămân ipoteze până la prototipare și testare.

## Cele două limbaje

### Learn Language

Learn Language folosește termeni intuitivi și concreți.

Este recomandat pentru:

- regulamentul de bază;
- prima partidă;
- copii și familii;
- jucători fără experiență economică;
- facilitări introductive.

### Business Language

Business Language folosește termenii profesionali ai modelului.

Este recomandat pentru:

- antreprenori;
- studenți;
- universități;
- facilitatori avansați;
- training și analiză de business.

## Dicționarul comun

| Rol | Learn Language RO | Learn Language EN | Business Language |
|---|---|---|---|
| Capacitatea de execuție | Producție | Production | Operations |
| Capacitatea de a câștiga clienți | Clienți | Clients | Market |
| Valoarea ofertei | Valoarea produsului | Product Value | Product |
| Volumul realizat | Volum vânzări | Sales Volume | Sales Volume |
| Rezultatul Deckbuilder pe tură | Vânzări | Sales | Revenue |
| Rezultatul Tableau Builder pe tură | Venituri | Revenue | Revenue |
| Costurile activității | Cheltuieli | Expenses | Expenses |
| Costul unei resurse | Cost | Cost | Resource Cost |
| Rezultatul financiar | Profit | Profit | Profit |
| Numerarul disponibil | Cash | Cash | Cash |
| Modificarea numerarului | Cashflow | Cash Flow | Cash Flow |
| Rezultatul anual | Cifră de afaceri anuală | Annual Revenue | Annual Revenue |
| Valoarea acumulată a firmei | Capitalizare | Company Value | Equity |

## Formulele canonice

### Volum vânzări

> **Sales Volume = min(Operations, Market)**

În Learn Language:

> **Volum vânzări = min(Producție, Clienți)**

### Revenue

> **Revenue = Sales Volume × Product**

Echivalent:

> **Revenue = min(Operations, Market) × Product**

### Deckbuilder

Pentru că Product este 1:

> **Vânzări = min(Producție, Clienți)**

### Profit

> **Profit = Revenue − Expenses**

În Deckbuilder:

> **Profit = Vânzări − Cheltuieli**

### Cash Flow

> **Cash Flow = Profit − Achiziții − alte costuri plătite**

Alte costuri pot include:

- eliminarea unei resurse;
- efecte speciale;
- costuri generate de evenimente;
- alte plăți care nu intră în Cheltuielile operaționale ale turei.

### Cash

> **Cash nou = Cash anterior + Cash Flow**

Echivalent:

> **Cash nou = Cash anterior + Profit − Achiziții − alte costuri plătite**

### Rezultatul anual

> **Annual Revenue = suma Revenue din cele patru trimestre**

În Learn Language pentru Deckbuilder:

> **Cifra de afaceri anuală = suma Vânzărilor trimestriale**

> **Profit anual = suma Profitului trimestrial**

### Capitalizare / Equity

Modelul simplificat actual este:

> **Capitalizare = Cash + valoarea resurselor păstrate în companie**

În Business Language:

> **Equity = Cash + Resource Value**

Modelul presupune momentan că firma nu are datorii. Dacă sunt introduse datorii, formula trebuie completată.

## Reguli de terminologie

1. `EZPLAY` desemnează proiectul și ecosistemul.
2. Jocul de bază se numește **EZPLAY Deckbuilder**, iar jocul avansat se numește **EZPLAY Tableau Builder**.
3. După prima mențiune clară se pot folosi formele scurte **Deckbuilder** și **Tableau Builder**.
4. `EZPLAY1` / `EZPLAY 1` și `EZPLAY2` / `EZPLAY 2` sunt aliasuri istorice acceptate numai pentru interpretarea prompturilor creatorului. Ele se normalizează la numele canonice în documentație, copy și interfață.
5. `EZPLAY` folosit singur poate desemna istoric jocul de bază, dar în documentația curentă înseamnă implicit proiectul sau ecosistemul.
6. Identificatorii tehnici istorici se documentează ca atare și nu se redenumesc fără un task tehnic separat.
7. Regulamentul Deckbuilder folosește Learn Language în limba română.
8. În Deckbuilder, Product are valoarea implicită 1.
9. În Deckbuilder, rezultatul pe tură este numit **Vânzări**.
10. În Tableau Builder, rezultatul după aplicarea Product este numit **Venituri**.
11. `Product` nu trebuie confundat cu `Producție / Operations`.
12. `Clienți` reprezintă capacitatea de a câștiga clienți într-o tură, nu baza totală de clienți.
13. `Equity` se folosește numai pentru valoarea economică a companiei.
14. Contribuția comunitară se numește **Prestige**, nu Community Equity.
15. Cele cinci domenii ale companiei se numesc **Business Pillars**: Strategy, Product, Market, Operations și Finance.
16. Simbolurile pot rămâne constante între publicuri; legenda și limbajul se pot adapta.
17. Definițiile detaliate ale variabilelor unui joc apar în documentul acelui joc, nu se repetă aici.

## Surse derivate

Din acest document pot deriva:

- dicționarul simplificat al Deckbuilder-ului;
- regulamentele jocurilor;
- textele din interfața platformei;
- legendele cărților;
- materialele pentru facilitatori;
- modulele educaționale;
- documentele de design ale jocurilor.

Orice modificare a formulelor sau a terminologiei comune trebuie făcută mai întâi aici și apoi propagată către documentele derivate.

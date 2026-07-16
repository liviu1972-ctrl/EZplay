
# Manual de Utilizare – EZ Play Platform (Consolidat)

## I. Rezumat General
**EZ Play** a evoluat de la un simplu joc de cărți la o **platformă extensibilă de simulare economică**. Nucleul rămâne un joc de tip **deck-builder** cu tematică de business, dar platforma include acum conturi de utilizator, istoric persistent, un simulator pentru testarea strategiilor și un motor modular de joc.

Jucătorul își asumă rolul unui antreprenor (sau manager AI), având ca scop construirea unei companii profitabile prin achiziționarea de active și gestionarea finanțelor.

---

## II. Funcționalități Platformă

### 1. Autentificare și Profil
Platforma oferă trei moduri de acces:
- **Cont Înregistrat (Email/Parolă):** Acces securizat, cu persistența datelor în cont.
- **Cont Google:** Autentificare rapidă folosind contul Google existent.
- **Mod Oaspete (Guest):** Testare rapidă fără cont, însă datele sunt salvate doar local în browser.

### 2. Personalizare (Avatar)
În secțiunea **Profil Utilizator**, poți alege cum ești reprezentat în joc:
- **Preseturi:** Alege dintr-o listă de ilustrații tematice (Antreprenor, Contabil, etc.).
- **Upload Personalizat:** Încarcă propria imagine de profil de pe dispozitiv. Aceasta poate fi vizibilă în HUD-ul de joc și în clasamente (dacă sunt active).

### 3. Simulator de Jocuri
O unealtă avansată pentru jucătorii competitivi și dezvoltatori:
- Permite rularea automată a sute sau mii de partide între diverse configurații de AI (strategii și nivele de dificultate diferite).
- Generează statistici detaliate (rata de câștig, durata medie a jocului, cauzele falimentului) pentru a valida echilibrul jocului sau eficiența unei strategii.

---

## III. Sistemul Economic (EZC & EZG)

Platforma folosește un sistem cu două monede pentru a recompensa progresul și performanța:

### 1. EZCoins (EZC) – Moneda de Supraviețuire
- **Simbol:** Galben/Auriu cu litera „C”.
- **Cum se obține:** Se acordă la finalul fiecărui joc **câștigat**, calculat ca **1 EZC pentru fiecare an fiscal finalizat**.
- **Rol:** Reflectă experiența acumulată și reziliența afacerii în timp.

### 2. EZGold (EZG) – Moneda de Performanță
- **Simbol:** Stea aurie pulsatorie.
- **Cum se obține:** Se acordă **1 EZG fix pentru fiecare victorie** (atingerea obiectivului stabilit la începutul jocului).
- **Rol:** Monedă premium care atestă succesul strategic (victorie).

**Notă importantă:** Jocurile terminate prin **Faliment** nu acordă nicio recompensă financiară (**0 EZC și 0 EZG**).

---

## IV. Experiența de Joc (Game Engine)

### 1. Configurarea Jocului
- **Alegerea Antreprenorului:** Jocul începe prin selectarea unui profil de antreprenor care definește statisticile de start (ex: Producție, Vânzări, Cheltuieli).
- **Configurare Avansată:** Utilizatorii pot activa/dezactiva **Extensii** (module plug-and-play precum **Evenimente**, **Consultanți**, **Taxe**) și pot personaliza regulile jocului de bază.
- **Setări Generale:** Preferințe vizuale, metode de input (Rotiță vs Calculator), capital inițial.

### 2. Construirea Pachetului Inițial (StartingDeckSetup)
- Jucătorul își construiește pachetul de start folosind un buget inițial de **cash**.
- Există opțiunea **Auto-Fill** pentru a crea rapid un pachet viabil bazat pe bugetul disponibil.

### 3. Ecranul Principal de Joc
- **Piața (Market):** Grămezi de cărți de unde se pot cumpăra active. Configurația pieței este dinamică.
- **Echipa de Management:** Zonă dedicată (accesibilă prin click pe Antreprenor) unde sunt afișate activele permanente: Antreprenorul, Contabilul și Consultanții activi.
- **Panoul de Statistici (HUD):** Afișează Cash, Producție, Vânzări, Venituri, Cheltuieli, Capitalizare și Profit.
  - **Mod Manual:** Jucătorul introduce valorile. Greșelile pot fi penalizate (dacă modul ANAF este activ).
  - **Mod Automat:** Sistemul calculează valorile instantaneu.

### 4. Mecanica de Bază
- **Tură:** Jucătorul trage 5 cărți, le joacă (stats se calculează automat), apoi poate:
  - cumpăra o carte din piață **sau**
  - retrage (elimina) o carte (dacă regulile permit).
- **Evenimente:** Dacă extensia este activă, în fiecare an fiscal apar evenimente globale care modifică regulile pieței.
- **Finalul Turei:** Profitul se adaugă la Cash. Dacă **Cash < 0 → Faliment**.

### 5. Rapoarte și Istoric
- **Raport Anual:** La fiecare 4 ture, se generează un bilanț detaliat cu indicatori financiari (ex: **ROA**, **Marjă Profit**).
- **Istoric Companii:** Platforma salvează performanța companiilor rulate, permițând:
  - vizualizarea grafică a evoluției
  - compararea strategiilor în timp.
```

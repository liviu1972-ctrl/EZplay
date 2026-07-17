# Materiale tipărite Deckbuilder

Aici intră planșe, fișe, plăcuțe de instrucțiuni, bani și alte componente printabile.

Unele materiale vechi folosesc terminologie depășită. Verifică `docs/methods/economic-model.md` înainte de actualizare.

Fișierele de lucru și cele gata de tipar trebuie denumite distinct.

## Coala 01 - active corporale

[`deckbuilder-cards-tangible-assets-sheet-01-ro-v01-press.pdf`](deckbuilder-cards-tangible-assets-sheet-01-ro-v01-press.pdf) este PDF-ul în două pagini trimis la tipografie în 2024:

- pagina 1 conține 25 de fețe de carte într-o grilă 5 × 5;
- pagina 2 conține 25 de spate-uri aliniate aceleiași grile;
- fiecare celulă măsoară aproximativ 62 × 84 mm;
- ordinea fizică nu urmează crescător slug-urile;
- harta confirmată se află în [`deckbuilder-card-sheet-map.csv`](deckbuilder-card-sheet-map.csv).

Primele zece poziții includ perechi de cărți intenționat identice vizual. Cărțile dintr-o pereche au aceeași imagine și aceleași valori, dar slug-uri și nume diferite în baza de date. Poziția din coala de tipar, nu similaritatea imaginii, stabilește slug-ul fiecărei copii.

Ultima poziție conține `corporate_gol`, o carte fizică de înlocuire pe care proprietarul jocului poate recrea cu markerul o carte pierdută pentru a putea continua jocul. Nu este o carte de joc numerotată și nu trebuie eliminată ca placeholder accidental.

### Constatări tehnice

- PDF-ul a fost exportat din CorelDRAW 2022 și păstrează ilustrații raster la aproximativ 300 dpi și multe elemente vectoriale;
- textul este convertit în curbe și nu conține identificatori selectabili;
- cărțile complete și ilustrațiile centrale pot fi extrase automat;
- unele iconuri sunt mascate în layout și nu devin automat mastere curate prin extragerea brută a obiectului PDF;
- imaginile sunt RGB și documentul nu declară un profil ICC de ieșire;
- box-urile PDF sunt definite pentru coala completă și nu separă trim-ul de bleed pentru fiecare carte.

Fișierul rămâne masterul compozit operațional și dovada materialului trimis la tipografie. Sursa CorelDRAW editabilă trebuie legată separat atunci când este importată.

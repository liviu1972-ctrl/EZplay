# Cărțile Deckbuilder

Aici intră imaginile și fișierele sursă pentru cărțile jocului.

Datele economice și efectele structurate trebuie păstrate în `data/cards/`, nu îngropate exclusiv în fișiere grafice.

Menține legătura clară dintre identificatorul unei cărți, datele ei și imaginea corespunzătoare.

Fișierele `.cdr` sunt acceptate ca surse editabile principale pentru creator. Pentru fiecare versiune relevantă, păstrează pe cât posibil:

- același nume de bază și aceeași versiune pentru `.cdr`, PDF și PNG;
- un PDF pentru layout, text și verificarea materialului de print;
- un PNG la rezoluție bună pentru inspecție vizuală;
- legătura cu identificatorul și datele structurale din `data/cards/`.

Agentul declară dacă a verificat sursa, exportul PDF/PNG sau numai inventarul. Existența sursei `.cdr` nu dovedește că agentul a putut să o citească ori să o verifice vizual.

## Active individuale reutilizabile

Activele extrase sunt organizate pe tip și format, nu într-un folder separat pentru fiecare slug:

```text
faces/webp/<slug>-<tip>-<categorie>-cost-<valoare>.webp
faces/pdf/<slug>-<tip>-<categorie>-cost-<valoare>.pdf
artwork/png/<slug>-<tip>-<categorie>-cost-<valoare>.png
artwork/jpg/<slug>-<tip>-<categorie>-cost-<valoare>.jpg
artwork/webp/<slug>-<tip>-<categorie>-cost-<valoare>.webp
```

Exemplu: `s109-activ-corporal-cost-0.webp`. Slugul rămâne primul pentru legătura sigură cu baza de date; tipul, categoria și costul fac fișierul ușor de găsit pentru om. Numele sunt lowercase, fără spații și fără diacritice.

- `faces/webp` — fața completă optimizată pentru utilizare digitală;
- `faces/pdf` — PDF individual compact pentru reutilizare și revizuire, fără bleed sau semne de tăiere;
- `artwork/png` — ilustrația centrală extrasă fără pierderi și folosită ca master individual;
- `artwork/jpg` și `artwork/webp` — derivate pentru contexte care cer JPEG sau web.

README-urile individuale poartă aceeași denumire de bază ca activul și indică masterul compozit, pagina și poziția din care provine. PDF-ul individual nu este declarat automat fișier de tipar și nu este presupus vectorial.

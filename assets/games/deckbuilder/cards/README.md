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

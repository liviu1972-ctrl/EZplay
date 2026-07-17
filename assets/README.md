# Activele EZPLAY

`assets/` conține sursele și masterele vizuale, media și de producție ale proiectului.

Aici intră:

- identitatea de brand;
- cărți și componente;
- cutii și print;
- imagini și video.

Nu păstra aici documentație conceptuală sau date structurate care trebuie versionate ca CSV/JSON în `data/`.

## Principiul de administrare

Product Owner-ul creează sau furnizează activele. Agenții se ocupă de:

- inventariere;
- denumiri coerente;
- separarea surselor de exporturi și derivate;
- versiuni și stare;
- legătura dintre master, exportul de verificare și fișierul public;
- înregistrarea provenienței și a restricțiilor comunicate de Product Owner.

Un activ furnizat de Product Owner fără marcaj de restricție este tratat operațional ca având proveniența și permisiunea confirmate de acesta. Agentul consemnează confirmarea în inventar sau în registrul relevant; nu inventează titulari, licențe ori permisiuni suplimentare.

## Straturile unui activ

Pentru fiecare activ important se disting, când există:

1. `source` — sursa editabilă, de exemplu `.cdr`, `.psd`, `.ai` sau proiectul aplicației de creație;
2. `review` — exportul verificabil, de exemplu PDF sau PNG la rezoluție bună;
3. `approved-master` — versiunea curentă aprobată;
4. `public` — derivata optimizată pentru site, social media sau print;
5. `archive` — versiuni istorice, păstrate și marcate clar ca depășite.

Nu toate straturile trebuie create imediat. Pentru Deckbuilder, colile compozite CorelDRAW/PDF trimise la tipar pot rămâne sursa de adevăr curentă până când activele individuale sunt extrase și verificate. Agentul documentează această realitate și nu pretinde că există deja mastere individuale independente.

## Convenția de denumire

Agenții normalizează numele la import. Forma de bază este:

```text
<produs>-<familie>-<identificator>-<limbă>-v<NN>-<rol>.<extensie>
```

Exemple:

```text
deckbuilder-card-s134-ro-v01-approved-master.cdr
deckbuilder-card-s134-ro-v01-review.png
deckbuilder-print-cards-sheet-01-ro-v03-press.pdf
deckbuilder-component-production-icon-v01-approved-master.svg
```

Numele sunt scrise cu litere mici, fără spații și fără diacritice. Identificatorii existenți ai cărților se păstrează. Agentul nu redenumește în orb: verifică mai întâi relația dintre fișier, versiune și utilizarea reală.

Pentru derivatele individuale ale cărților Deckbuilder se folosește o formă mai scurtă, deoarece directoarele indică deja tipul și formatul:

```text
<slug>-<tip>-<categorie>-cost-<valoare>.<extensie>
```

De exemplu: `s109-activ-corporal-cost-0.webp`. Slugul este primul, iar descrierea umană rămâne vizibilă în nume.

## Transparență pentru elemente reutilizabile

Pentru un element vizual izolat — de exemplu monedă, icon, token sau ilustrație decupată — derivata `public` în WebP păstrează canalul alpha și elimină numai fundalul care nu face parte din design. JPEG rămâne potrivit pentru fotografie, print sau imagini cu fundal intenționat, deoarece nu poate păstra transparența.

Această regulă nu se aplică automat fețelor complete de cărți, afișelor sau compozițiilor în care fundalul face parte din layout. Înainte de a publica o derivată transparentă, agentul verifică vizual că nu au fost eliminate elemente albe intenționate din interiorul obiectului.

## Inventarul

[`inventory.csv`](inventory.csv) este registrul operațional al fișierelor și al relațiilor dintre ele. Agenții îl întrețin; Product Owner-ul nu trebuie să completeze manual rânduri, căi sau versiuni.

Stările de lucru recomandate sunt:

- `inbox` — primit, încă neinventariat complet;
- `source` — sursă editabilă identificată;
- `review` — export disponibil pentru verificare;
- `approved-master` — master curent aprobat;
- `public` — derivată publicabilă sau deja folosită public;
- `archive` — versiune istorică;
- `restricted-local` — material local privat, absent din Git.

Inventarul operațional nu înlocuiește registrele de drepturi și permisiuni din `docs/licensing/`. El păstrează legăturile către ID-urile relevante fără a duplica date personale sau dovezi juridice.

## Proveniența creației

Inventarul poate indica metoda de creare, de exemplu CorelDRAW, CapCut, cameră Samsung sau generare AI. Pentru un activ generat cu AI se notează instrumentul și, dacă este disponibil, referința către prompt sau sesiunea de lucru. Proveniența tehnică nu este prezentată automat drept concluzie juridică despre copyright.

## Active locale private

`assets/private-local/` este echivalentul media al unui fișier `.env.local`:

- există numai pe dispozitivul Product Owner-ului;
- este ignorat integral de Git;
- nu se încarcă în GitHub, Git LFS, `public/` sau Supabase;
- conținutul său este implicit intern și nepublicabil;
- nu se trimit fișierele sale către servicii AI sau alte servicii externe fără instrucțiune explicită;
- inventarul versionat folosește numai ID-uri anonime, fără nume sau alte date personale.

Mutarea unui fișier din `private-local/` într-o zonă versionată este o acțiune intenționată, făcută numai după ce Product Owner-ul îl declară utilizabil în scopul respectiv.

## Git LFS și active runtime

Formatele binare de lucru din `assets/` sunt gestionate prin Git LFS conform `.gitattributes`. Regula include surse editabile, PDF-uri, imagini master, video și audio uzual.

Fișierele optimizate folosite efectiv de aplicație aparțin `public/` sau Supabase Storage și nu sunt duplicate automat din `assets/`. Derivatele se generează sau se copiază controlat din masterul aprobat.

Fișierele sursă CorelDRAW `.cdr` sunt active valide și pot rămâne aici ca surse editabile principale pentru creator, chiar dacă agenții AI nu le pot edita direct.

Pentru acces și verificare:

- folosește PDF pentru pagini, layout, text și materiale de print;
- folosește PNG la rezoluție bună pentru inspecție vizuală;
- folosește SVG pentru vectori când exportul este fidel;
- păstrează regulile, textele și datele structurale în Markdown, CSV sau JSON.

Sursa și exporturile folosesc, pe cât posibil, același nume de bază și aceeași versiune. README-ul local sau inventarul leagă sursa, exporturile și datele structurale și indică scopul, versiunea, maturitatea, programul de editare și limitările cunoscute.

Agentul precizează dacă a verificat fișierul sursă, un export sau numai inventarul și nu pretinde că a verificat vizual un format inaccesibil.

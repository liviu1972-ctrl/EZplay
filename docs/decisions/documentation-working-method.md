---
status: Current
version: "1.1"
updated: 2026-07-16
lifecycle: active
canonical_for:
  - documentation working method
  - document and section status model
  - document lifecycle model
  - collaboration autonomy
  - opaque source asset handling
---

# Metoda de lucru pentru documentația vie EZPLAY

## Rolul repository-ului

Repository-ul EZPLAY este un atelier viu și memoria organizată a proiectului. El păstrează contextul, deciziile, metodele, activele, datele, cercetarea și prompturile necesare continuării muncii.

Existența unui fișier sau a unei secțiuni nu înseamnă automat că acel conținut este complet, definitiv, validat, promis publicului sau imposibil de schimbat.

Creatorul lucrează în principal împreună cu agenți AI și editează direct documentele numai când este necesar.

Creatorul și agenții AI lucrează ca o singură echipă. Ideile nu se marchează drept „ale utilizatorului” sau „ale agentului”. Ideile neclare se discută mai întâi în conversație; agentul poate propune două sau trei variante, iar după alegerea direcției actualizează documentația.

## Stările documentației

Documentația folosește numai trei stări:

- `Draft`;
- `Working`;
- `Current`.

`Official`, `Lab`, `Validated`, `Concept`, `Beta` și alte denumiri nu sunt stări ale documentației.

### Draft

`Draft` descrie material exploratoriu, incomplet sau încă neclarificat. Poate conține numai o parte dintre ideile necesare, alternative, întrebări deschise, contradicții nerezolvate și direcții care trebuie discutate.

`Draft` este starea implicită atunci când nu există suficiente informații pentru o alegere mai matură.

### Working

`Working` descrie material coerent și suficient de clar pentru continuarea muncii, dar încă aflat în dezvoltare, testare sau rafinare.

Materialul poate fi folosit în proiect, fără să fie prezentat automat ca funcție validată sau promisiune publică.

### Current

`Current` este referința acceptată pentru versiunea curentă. Nu înseamnă adevăr etern sau conținut definitiv. Documentul poate fi schimbat într-o versiune ulterioară, la fel ca într-un proiect software.

Un document `Current` trebuie să fie coerent pentru scopul declarat.

## Ciclul de viață al documentelor

`status` și `lifecycle` răspund la întrebări diferite:

- `status` descrie maturitatea și calitatea conținutului;
- `lifecycle` descrie rolul documentului în munca prezentă.

Lifecycle-ul folosește numai valorile:

- `active` — documentul guvernează proiectul acum sau este folosit într-o lucrare în desfășurare;
- `completed` — documentul și-a îndeplinit scopul operațional, dar poate rămâne temporar vizibil pentru închidere sau reconciliere;
- `superseded` — documentul a fost înlocuit de o sursă mai nouă și trebuie să indice înlocuitorul;
- `archived` — documentul este păstrat pentru istoric și nu face parte din lectura implicită a agenților.

Exemple:

```yaml
status: Current
lifecycle: active
```

descrie o decizie matură care continuă să guverneze proiectul.

```yaml
status: Working
lifecycle: archived
```

poate descrie un handoff folosit cu succes, păstrat ca istoric chiar dacă nu a fost transformat într-un document canonic final.

Schimbarea lifecycle-ului se face numai la o tranziție reală de etapă, nu după fiecare idee, editare sau commit. Tranzițiile obișnuite sunt `active → completed → archived` și `active → superseded → archived`.

Lifecycle-ul este obligatoriu pentru decizii, handoff-uri și documente de lucru importante. Nu trebuie adăugat mecanic fiecărui README, inventar sau fișier auxiliar dacă nu clarifică rolul documentului.

## Front matter și starea secțiunilor

Documentele importante folosesc front matter cu cel puțin:

```yaml
---
status: Working
version: "0.1"
updated: 2026-07-13
lifecycle: active
---
```

Secțiunile moștenesc starea documentului. O secțiune se marchează separat numai atunci când starea ei diferă de cea a fișierului:

```markdown
## Titlul secțiunii

> **Stare secțiune:** Draft
```

Marcarea se face la nivelul capitolului sau subcapitolului relevant, nu pentru fiecare propoziție ori element de listă.

Dacă un fișier este `Current`, toate secțiunile sale sunt `Current`. Un document `Current` nu poate ascunde capitole `Draft` sau `Working`. O idee exploratorie destinată unei zone acoperite de un document `Current` se dezvoltă separat până când poate forma o nouă versiune coerentă.

## Versiunile documentelor

Documentele importante folosesc versiuni vizibile:

- `0.x` pentru `Draft` și `Working`;
- `1.0` pentru prima versiune `Current`;
- `1.1`, `1.2` pentru extinderi și clarificări importante;
- `2.0` pentru o schimbare substanțială de sens sau structură.

Versiunea nu se mărește pentru fiecare corectură de tastare sau formatare. Data `updated` se actualizează când conținutul se schimbă semnificativ.

## Rolul canonic

`canonical_for` declară rolul unui document ca sursă principală pentru un subiect. Nu este o a patra stare.

Un document canonic poate fi `Working` dacă reprezintă cea mai bună referință disponibilă, chiar dacă evoluează. Pentru același concept trebuie să existe o singură sursă canonică. Alte documente pot explica aplicarea conceptului, dar nu îi redefinesc formula, terminologia sau structura.

## Starea documentației și maturitatea activelor

Starea documentației nu trebuie confundată cu maturitatea unui produs sau activ. Un document `Current` poate consemna corect că un joc este `Beta`, că o funcție este insuficient testată sau că un produs este numai un concept.

Termeni precum `existent`, `funcțional`, `Beta`, `testat`, `insuficient testat` și `concept de produs` descriu realitatea activului, nu starea documentației. Inventarele folosesc etichete precum `Maturitate activ` sau `Stare produs` pentru a evita confuzia cu `status` din front matter.

## Documentele incomplete

Un document nu se completează artificial doar pentru a părea terminat. Dacă sunt cunoscute numai câteva idei, documentul poate rămâne util ca `Draft`.

Golurile se declară prin secțiuni precum:

- `Ce lipsește`;
- `Întrebări deschise`;
- `De clarificat`;
- `Direcții de explorat`.

Informațiile lipsă nu se înlocuiesc cu presupuneri prezentate ca fapte.

## Autonomia agentului

Agentul deduce dacă o sarcină este de explorare, organizare, decizie, implementare sau verificare. Nu cere micro-confirmări și poate actualiza documentația când rezultatul este clar din conversație, sursele canonice, regulile proiectului sau consecințele evidente ale unei decizii deja confirmate.

De exemplu, dacă un document devine `Current`, agentul verifică singur că nu rămân în el secțiuni cu stare inferioară.

Agentul cere confirmare când schimbarea:

- este majoră sau ambiguă;
- are mai multe direcții semnificativ diferite;
- este greu reversibilă;
- afectează definiția sau scope-ul EZPLAY;
- schimbă formulele ori terminologia centrală;
- schimbă licențierea;
- schimbă o sursă canonică importantă;
- presupune mutări sau ștergeri ample;
- poate produce pierderea muncii existente.

Nivelul de autonomie urmărit este ridicat, dar nu absolut.

## Sursele CorelDRAW și formatele accesibile agenților

Fișierele CorelDRAW `.cdr` sunt active valide și pot fi păstrate în `assets/`, chiar dacă agentul AI nu le poate edita direct. Creatorul le poate folosi ca surse editabile principale.

Pentru fiecare grup relevant de active, README-ul local sau inventarul trebuie să poată indica:

- numele fișierului;
- scopul;
- versiunea;
- maturitatea;
- programul în care se editează;
- dacă este sursa editabilă principală;
- exporturile corespunzătoare;
- limitările cunoscute.

Formatele recomandate pentru accesul agenților sunt:

- PDF pentru pagini, layout, text și materiale de print;
- PNG la rezoluție bună pentru inspecție vizuală;
- SVG pentru vectori, când exportul este fidel;
- Markdown, CSV sau JSON pentru reguli, texte și date structurale.

Fișierul `.cdr` și exporturile sale folosesc, pe cât posibil, același nume de bază și aceeași versiune. Legătura dintre sursă, export și datele structurale trebuie să fie explicită.

Agentul declară clar dacă a verificat fișierul sursă, un export sau numai inventarul. Nu pretinde că a citit ori verificat vizual un format inaccesibil.

## Relația dintre cod și documentație

Codul Next.js al `ezplay.org`, documentația, activele, datele, cercetarea și prompturile sunt versionate în același repository.

Zonele logice ale website-ului, Deckbuilder-ului și simulatorului sunt documentate în `docs/application/`, iar implementarea lor se află în `src/`. Existența unei zone logice nu dovedește existența unei aplicații, a unui serviciu sau a unui deploy separat.

Documentația de produs stabilește intenția aprobată. Codul și verificările rulate stabilesc comportamentul efectiv. Diferențele dintre ele se raportează și se reconciliază explicit.

## Audituri periodice

Agenții pot propune audituri pentru:

- documente fără stare sau versiune;
- stări care nu mai corespund realității;
- definiții duplicate;
- surse canonice concurente;
- active fără inventar;
- surse grafice fără export accesibil;
- terminologie depășită;
- trimiteri rupte;
- fișiere `Draft` care pot fi promovate, reunite sau arhivate.

Auditul produce mai întâi un inventar și o propunere. Mutările, ștergerile în masă și schimbările canonice majore necesită confirmare.

## Protecția muncii și raportarea

Munca existentă nu se șterge și nu se mută în masă fără aprobare. Înaintea unei migrări se inventariază conținutul, se identifică sursele canonice, se propun destinațiile, se verifică backup-ul, apoi se execută și se validează rezultatul.

Pentru modificări, agentul raportează:

1. ce a schimbat;
2. fișierele afectate;
3. verificările efectuate;
4. riscurile și lucrurile rămase neclare.

Inferențele sunt marcate explicit, iar o verificare nu este declarată reușită dacă nu a fost rulată.

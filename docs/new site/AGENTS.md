# AGENTS.md

Instrucțiuni pentru ChatGPT Work, Codex și orice agent AI care lucrează în repository-ul EZPLAY.

## 1. Citește contextul înainte să modifici

Pentru o sarcină amplă, citește:

1. `README.md`;
2. `docs/decisions/documentation-working-method.md`;
3. `docs/context/what-is-ezplay.md`;
4. `docs/context/brand-positioning.md`;
5. `docs/context/ezplay-vision.md`;
6. `docs/methods/economic-model.md`;
7. `docs/roadmap/current-assets.md`;
8. toate fișierele `README.md` de pe traseul către folderul în care lucrezi.

README-ul local poate conține restricții mai specifice decât instrucțiunile generale.

## 2. Ierarhia surselor

- definiție și scope → `docs/context/what-is-ezplay.md`;
- brand și comunicare → `docs/context/brand-positioning.md`;
- viziune viitoare → `docs/context/ezplay-vision.md`;
- formule și terminologie → `docs/methods/economic-model.md`;
- stare actuală → `docs/roadmap/current-assets.md`.

Dacă inventarul repetă diferit o definiție sau o formulă, sursa canonică dedicată are prioritate.

## 3. Separă realitatea de intenție

Repository-ul este documentație vie și atelierul proiectului. Existența unui text nu înseamnă automat că este complet, definitiv, validat sau promis publicului.

Documentația folosește numai stările:

- `Draft` — exploratoriu, incomplet sau neclarificat; este starea implicită;
- `Working` — coerent și utilizabil, dar încă în dezvoltare sau testare;
- `Current` — referința acceptată pentru versiunea curentă, nu adevăr definitiv.

Secțiunile moștenesc starea documentului și se marchează separat numai când diferă. Toate secțiunile unui document `Current` sunt `Current`; ideile cu stare inferioară se dezvoltă separat.

`canonical_for` declară rolul de sursă principală și nu este o stare suplimentară. Metoda completă este în `docs/decisions/documentation-working-method.md`.

Separă starea documentației de maturitatea produselor și activelor. Termeni precum:

- existent;
- funcțional;
- Beta;
- testat;
- insuficient testat;
- concept de produs;

descriu realitatea activului, nu starea documentației.

Nu transforma o idee din viziune în funcție promisă sau validată.

## 4. Prioritatea actuală

Prioritatea este `ezplay.org`, dar aplicația existentă este prototip tehnic.

Nu optimiza sau separa codul doar pentru eleganță. Pornește de la utilizator, experiență și caz de utilizare validat.

## 5. Terminologie obligatorie

- `EZPLAY` — proiectul și, în contextul jocului de bază, numele public;
- `Deckbuilder` — mecanica jocului de bază;
- `Tableau Builder` — jocul avansat; nu folosi `EZPLAY2`;
- `Founder Round` — sesiunea educațională;
- `Founder Loop` — arhitectura pedagogică;
- `Prestige` — contribuția și încrederea comunitară;
- `Equity` — numai valoarea economică a unei companii;
- `Founder Skills / Skill XP` — progres educațional;
- `Credits` — concept separat, încă nedefinit.

Founder Loop:

```text
Business Run
→ Founder Debrief
→ Learning Input
→ Business Challenge
→ Level Up
```

## 6. Modelul economic

Sursa canonică este `docs/methods/economic-model.md`.

```text
Sales Volume = min(Operations, Market)
Revenue = Sales Volume × Product
```

În Deckbuilder:

```text
Product = 1
Vânzări = min(Producție, Clienți)
```

Nu redefini formulele în alte documente.

## 7. Reguli pentru structură

- zone logice ale aplicațiilor → `apps/`;
- context → `docs/context/`;
- metode → `docs/methods/`;
- produse → `docs/products/`;
- platformă → `docs/platform/`;
- comunitate → `docs/community/`;
- roadmap și inventar → `docs/roadmap/`;
- decizii → `docs/decisions/`;
- licențiere → `licensing/`;
- fișiere vizuale/fizice → `assets/`;
- date structurate → `data/`;
- cercetare → `research/`;
- prompturi → `prompts/`;
- agenți → `agents/`.

Nu crea un director nou la rădăcină fără aprobare.

## 8. Reguli pentru documentație

- Scrie în română.
- Folosește front matter pentru documentele importante.
- Nu copia aceeași definiție completă în mai multe fișiere.
- Folosește numai `Draft`, `Working` și `Current` ca stări ale documentației.
- Folosește implicit `Draft` când informațiile nu justifică o stare mai matură.
- Nu promova un document la `Current` dacă include secțiuni cu stare inferioară.
- Nu crea documente sau conținut inventat doar pentru a umple goluri ori foldere.
- Nu transforma README-urile locale în specificații de produs; ele explică rolul folderelor.

## 9. Autonomia agentului

Agentul lucrează autonom pentru schimbări clare, mici și reversibile care rezultă din conversație, sursele canonice și regulile proiectului.

Cere confirmare când schimbarea este majoră, ambiguă, greu reversibilă, afectează definiția sau scope-ul EZPLAY, formulele, terminologia centrală, licențierea ori o sursă canonică importantă, presupune mutări sau ștergeri ample sau poate pierde muncă existentă.

## 10. Active sursă și exporturi

Fișierele `.cdr` sunt active valide și pot fi păstrate în `assets/`, chiar dacă agentul nu le poate edita direct. Pentru accesul agenților, păstrează exporturi PDF pentru layout și print, PNG pentru inspecție vizuală, SVG când exportul vectorial este fidel și Markdown, CSV sau JSON pentru reguli și date.

Sursa și exporturile folosesc, pe cât posibil, același nume de bază și aceeași versiune. Agentul spune explicit dacă a verificat sursa, un export sau numai inventarul și nu pretinde că a verificat un format inaccesibil.

## 11. Reguli pentru cod

Codul Next.js curent al `ezplay.org`, Deckbuilder-ului digital și simulatorului integrat este dezvoltat într-un repository tehnic separat. `apps/` descrie zone logice și context tehnic; existența folderelor nu dovedește existența unor aplicații separate.

Nu importa aici codul aplicației fără o decizie explicită.

După importarea codului:

- inspectează structura înainte să propui reorganizare;
- rulează verificările existente;
- păstrează schimbările mici și verificabile;
- nu rescrie aplicația fără plan aprobat;
- nu expune secrete;
- protejează datele utilizatorilor;
- tratează funcțiile pentru minori ca zonă de siguranță ridicată;
- nu pretinde că un test a trecut dacă nu l-ai rulat.

## 12. Protecția muncii existente

Nu șterge sau muta în masă fără aprobare.

Înaintea unei migrări:

1. inventariază;
2. identifică sursele canonice;
3. propune destinațiile;
4. verifică backup-ul;
5. execută;
6. validează că nimic important nu s-a pierdut.

## 13. Cum raportezi munca

Pentru modificări, prezintă:

1. ce ai schimbat;
2. fișierele afectate;
3. verificările efectuate;
4. riscurile și lucrurile rămase neclare.

Fii explicit când faci o inferență.

## 14. Fluxul Git și GitHub

Repository-ul canonic este `https://github.com/enterstef/ezplay`, remote-ul local este `origin`, iar branch-ul principal este `main`.

Înainte de lucru și înainte de commit:

1. confirmă folderul activ;
2. rulează `git status --short --branch`;
3. verifică `git remote -v` dacă destinația nu este deja clară;
4. inspectează diferențele și adaugă numai fișierele relevante;
5. rulează verificările potrivite și `git diff --check`.

Folosește mesaje de commit clare. Fă push numai când utilizatorul îl cere sau îl autorizează explicit. Pentru fluxul normal, publică `main` în `origin` și verifică după push că branch-ul local urmărește `origin/main`.

Nu schimba remote-ul, nu rescrie istoricul, nu folosi force-push și nu șterge branch-uri fără confirmare explicită.

# Reguli globale de lucru — EZPLAY

Acest fișier se aplică întregului repository. Fișierele `AGENTS.md` din subdirectoare adaugă reguli mai specifice și au prioritate numai în aria lor.

## 0. Rolul implicit Codex — Product, Vision & Editorial

În toate taskurile EZPLAY, Codex lucrează implicit exclusiv ca partener de produs, viziune și editorial. Utilizatorul este Product Owner și decidentul final.

Codex poate:

- lucra la viziune, definiția și poziționarea produsului, pedagogie, publicuri, UX la nivel de intenție, arhitectură informațională, sitemap, copy, conținut, priorități, roadmap, cercetare și decizii;
- citi întregul repository și inspecta read-only codul sau aplicația pentru a înțelege realitatea implementată;
- modifica documentația de produs când utilizatorul cere redactarea, actualizarea sau consemnarea unei decizii;
- crea specificații funcționale și editoriale, criterii de acceptare din perspectiva utilizatorului și handoff-uri pentru Claude.

Codex nu implementează aplicația. Nu modifică fișiere de cod, componente, stiluri, dependințe, Supabase, baza de date, migrări sau autentificarea și nu rulează lint, build, teste ori deployment. Regulile generale de verificare tehnică din acest fișier nu autorizează asemenea acțiuni pentru Codex.

Formulări precum „hai să facem”, „schimbăm”, „adăugăm” sau „rezolvăm” deschid implicit o discuție de produs; nu reprezintă autorizație de implementare. Excepția trebuie formulată explicit, de exemplu: „Suspendăm pentru acest task rolul Product & Vision și te autorizez să implementezi cod.”

Pentru fiecare subiect, Codex separă clar ce există, ce este decis, ce este propus și ce rămâne neclar. După aprobarea deciziei, actualizează documentația relevantă și, dacă este necesară implementarea, pregătește handoff-ul pentru Claude, apoi se oprește înainte de cod.

Claude transformă deciziile aprobate în plan și arhitectură tehnică, iar Gemini implementează. Utilizatorul selectează manual acești agenți în Antigravity; Codex nu îi pornește, nu le simulează munca și nu le preia responsabilitățile.

### Rolurile agenților tehnici

Instrucțiunile tehnice sunt definite aici după responsabilitate, nu după furnizorul modelului.

**Agentul de planning și arhitectură tehnică:**

- transformă deciziile și handoff-urile aprobate în faze, taskuri, dependențe, riscuri, verificări și criterii tehnice de acceptare;
- inspectează codul și infrastructura înainte de planificare;
- nu schimbă viziunea, strategia, copy-ul sau cerințele de produs și nu completează golurile prin presupuneri;
- se oprește pentru clarificare când documentația aprobată și implementarea intră în conflict.

**Agentul de implementare:**

- execută scope-ul și planul aprobate prin cod, componente, stilizare, integrare, Supabase, teste și build;
- nu inventează funcții, copy, CTA-uri, roluri sau comportamente;
- nu extinde taskul prin redesign, refactoring ori schimbări de infrastructură neaprobate;
- raportează rezultatele verificărilor și diferențele dintre implementare și documentația aprobată.

Pentru ambele roluri, ordinea de citire este:

1. taskul, decizia și handoff-ul aprobate;
2. `/AGENTS.md` și cel mai apropiat `AGENTS.md` de zona afectată;
3. codul, configurația, Supabase și testele relevante;
4. documentele canonice strict necesare: `docs/decisions/`, `docs/roadmap/`, `docs/technical/`, `docs/platform/website/`, `docs/products/` și `docs/methods/economic-model.md`;
5. `docs/context/` numai pentru limitele de produs deja aprobate, nu pentru reinterpretarea viziunii sau strategiei.

`docs/archive/legacy-application/application/`, `docs/archive/legacy-application/ezplay/` și `docs/archive/legacy-application/technical/` nu sunt autoritate pentru implementarea curentă; orice afirmație din ele trebuie verificată direct în cod.

## 1. Autoritate și decizii

- Utilizatorul este Product Owner și decidentul final.
- Agenții pot propune soluții, dar nu transformă unilateral o alegere de implementare într-o decizie de produs.
- Necesită aprobare explicită schimbările de definiție, scope, poziționare, sitemap, publicuri, ofertă, CTA major, acces al minorilor, autentificare publică, terminologie canonică, formule economice, licențiere sau roadmap.
- Regula de bază este: vezi întregul proiect, modifică numai ce autorizează taskul.

## 2. Repository și flux Git

- Repository canonic: `https://github.com/liviu1972-ctrl/EZplay`.
- `main` reprezintă versiunea acceptată și publicabilă.
- `dev` reprezintă integrarea curentă.
- `dev` este branch-ul comun și implicit de lucru în folderul local `C:\Antigravity projects\EZplay`. Codex și agenții din Antigravity lucrează pe rând în același working tree.
- Nu crea branch-uri denumite după agent sau instrument (`codex/...`, `gemini/...`, `claude/...`) decât dacă utilizatorul cere explicit un branch separat.
- Când utilizatorul spune „push pe GitHub”, fă commit numai pentru fișierele taskului și publică branch-ul de lucru curent, în mod normal `dev`; nu crea automat alt branch sau Pull Request.
- Când utilizatorul cere „push pe main” sau sincronizarea `main`, Codex tratează intervalul `main..dev` ca etapă de reconciliere: inspectează commiturile și diferențele, actualizează autonom numai documentația canonică afectată, creează checkpoint-ul documentar pe `dev`, publică `dev`, apoi face fast-forward și push pe `main`.
- Cererea de push pe `main` reprezintă acceptarea de către utilizator a stării curente din `dev`. Verificarea funcționalității codului aparține agentului de implementare; Codex oprește promovarea numai dacă descoperă o decizie majoră neclară, un conflict între sursele canonice sau un risc de produs care necesită alegerea utilizatorului.
- Schimbările pur tehnice sau vizuale care nu stabilesc o regulă durabilă nu produc documentație nouă. Reconcilierea documentară este necesară când se schimbă comportamentul produsului, traseele utilizatorului, navigarea, accesul sau autentificarea, datele, integrările externe, promisiunile publice ori un principiu UX/UI durabil. Git este evidența implicită a implementării.
- Pentru modificări documentare coerente și aprobate, Codex creează automat la final un commit local numai cu fișierele taskului, dacă working tree-ul nu conține modificări străine. Dacă există modificări străine, Codex nu le include și raportează situația înainte de commit.
- Commitul local este checkpoint-ul implicit; push-ul rămâne o acțiune separată și se face numai la cererea explicită a utilizatorului.
- Înainte și după lucru, confirmă calea, branch-ul și `git status --short --branch`.
- Nu schimba remote-uri, nu rescrie istoricul, nu folosi force-push și nu șterge branch-uri fără aprobare explicită.
- Nu face checkout pe `main`, merge în `main` sau push fără cererea explicită a utilizatorului.
- Adaugă în Git numai fișierele taskului și păstrează modificările existente ale utilizatorului.
- Nu muta sau șterge în masă înainte de inventar, hartă aprobată și verificarea căii absolute.
- Agenții pot lucra în paralel în același working tree când zonele lor nu se suprapun. Fiecare include în commit numai fișierele propriului task. Dacă trebuie modificat același fișier sau este necesară o operație Git amplă, lucrul devine temporar secvențial și conflictul se clarifică înainte de continuare.

## 3. Ierarhia surselor

Sursele răspund la întrebări diferite:

- definiție și scope → `docs/context/what-is-ezplay.md`;
- poziționare și voce → `docs/context/brand-positioning.md`;
- viziune → `docs/context/ezplay-vision.md`;
- formule și terminologie economică → `docs/methods/economic-model.md`;
- produse și program educațional → `docs/products/`;
- website, copy și UX/UI → `docs/platform/website/`;
- cercetare → `docs/research/`;
- stare și priorități → `docs/roadmap/`;
- decizii → `docs/decisions/`;
- drepturi și permisiuni → `docs/licensing/`;
- arhitectură și stare tehnică auditată → `docs/technical/`;
- comportament efectiv → `src/`, `supabase/` și testele rulate;
- active runtime → `public/` și Supabase Storage;
- active sursă → `assets/`;
- date structurate versionate → `data/`.

Sursele canonice sunt directoarele finale enumerate mai sus. Copia temporară `docs/new site/` a fost eliminată după verificarea migrării; nu o recrea.

`docs/archive/legacy-application/` păstrează documentația `application`, `ezplay` și `technical` din versiuni anterioare. Este material istoric și nevalidat, nu autoritate pentru aplicația Next.js/Supabase curentă. Verifică orice afirmație direct în cod.

Dacă documentația tehnică și codul diferă, codul descrie realitatea curentă. Dacă implementarea și o decizie de produs diferă, raportează conflictul; nu presupune că implementarea a anulat decizia.

## 4. Limbă și terminologie

- Documentația internă și validarea curentă se fac în română.
- Codul, identificatorii și comentariile tehnice se scriu în engleză, dacă fișierul nu stabilește altceva.
- Folosește `EZPLAY` pentru proiect și ecosistem.
- Numele canonice ale jocurilor sunt `EZPLAY Deckbuilder` pentru jocul de bază și `EZPLAY Tableau Builder` pentru jocul avansat. După prima mențiune clară se pot folosi formele scurte `Deckbuilder` și `Tableau Builder`.
- Dacă utilizatorul scrie `EZPLAY1` sau `EZPLAY 1`, interpretează aliasul istoric drept `EZPLAY Deckbuilder`. Dacă scrie `EZPLAY2` sau `EZPLAY 2`, interpretează aliasul istoric drept `EZPLAY Tableau Builder`. Normalizează documentația, copy-ul și interfața la numele canonice fără să corectezi inutil conversația.
- `EZPLAY` folosit singur poate desemna istoric jocul de bază, dar în documentația curentă desemnează implicit proiectul sau ecosistemul. Cere clarificare numai dacă sensul schimbă material decizia.
- Identificatorii tehnici istorici pot fi documentați ca atare, dar nu se redenumesc incidental și nu devin nume publice.
- Termenii canonici includ `Founder Round`, `Founder Loop`, `Prestige`, `Equity` și `Founder Skills / Skill XP` conform documentației dedicate.
- Nu inventa copy, oferte, rezultate, cercetări, funcții existente sau promisiuni publice.

## 5. Intenție și realitate

- Separă explicit ce există, ce este testat, ce este planificat și ce este numai viziune.
- O pagină, componentă sau funcție prezentă în cod nu devine automat decizie canonică de produs.
- O idee din documentație nu se prezintă ca implementată fără verificarea codului și, când este relevant, a aplicației rulate.
- Româna este prioritatea curentă; traducerea completă în engleză nu se face incidental.
- Migrarea repository-ului nu autorizează redesign, schimbarea sitemap-ului, autentificării, schemelor Supabase sau rescrierea Deckbuilder-ului.

## 6. Siguranță și zone protejate

- Nu expune secrete, token-uri, date personale, dump-uri sau fișiere `.env*`.
- Modificările de schemă se scriu mai întâi ca migrații în `supabase/migrations/` și nu se aplică remote fără aprobare.
- Nu slăbi RLS, validarea, protecția rutelor, sesiunile sau callback-urile de autentificare.
- Conturile și traseele pentru minori sunt zonă de siguranță ridicată. Nu deschide înregistrarea și nu schimba accesul fără decizie explicită.
- Protejează motorul Deckbuilder, formulele, datele și imaginile cărților, salvările și autentificarea necesară jocului.
- Nu șterge directorul `public/transfer images from user/`; fișierele din el se procesează numai în limitele taskului.

## 7. Verificare și raportare

- Rulează verificări proporționale cu riscul și nu declara un test trecut dacă nu l-ai rulat.
- Pentru cod, verificările uzuale sunt `pnpm lint`, `pnpm build` și testele sau scenariile relevante disponibile.
- Pentru documentație și reorganizare, verifică linkurile relative, front matter-ul, duplicatele, referințele vechi și `git diff --check`.
- Încheie taskul cu: ce s-a schimbat, fișierele afectate, verificările și rezultatele, diferențele față de documentație, deciziile propuse și riscurile rămase.

---
status: Draft
version: "0.4"
updated: 2026-07-17
lifecycle: active
---

# Fluxul de colaborare de la concept la implementare

## Scopul documentului

Acest document păstrează propunerea de lucru prin care discuțiile de produs, implementarea software și documentația finală rămân aliniate fără ca un agent să devină șeful altuia și fără reveniri obligatorii între agenți în timpul implementării.

Fluxul este încă `Draft`. Va fi testat pe o funcționalitate reală înainte de a deveni regulă permanentă în `AGENTS.md` sau metodă `Current`.

## Principiul de bază

Utilizatorul este Product Owner și decide direcția. Codex, agentul de planning tehnic și agentul de implementare sunt colaboratori cu responsabilități diferite, nu trepte într-o ierarhie de aprobare.

- Codex lucrează cu utilizatorul la concept, intenție, comportament, experiență și documentația de produs.
- Pentru probleme software complexe, utilizatorul poate apela la un agent de planning și arhitectură tehnică, de obicei Claude.
- Utilizatorul lucrează direct și liber cu agentul de implementare, de obicei Gemini, pentru coding și ajustările descoperite în timpul lucrului.
- Codex nu aprobă și nu controlează munca Gemini. Utilizatorul poate lua direct cu Gemini decizii noi sau poate modifica soluția pe parcurs.
- La final există o singură reconciliere documentară, astfel încât deciziile și comportamentul implementat să nu rămână despărțite.

## Fluxul propus

```text
Utilizator + Codex: concept și intenție
               ↓
       document de lucru
               ↓
Utilizator + Gemini: implementare și ajustări
               ↓
       rezultatul implementat
               ↓
Utilizator + Codex: reconciliere finală
```

### 1. Explorarea produsului

Utilizatorul deschide un task Codex și discută natural subiectul. Codex citește documentele canonice relevante și poate inspecta read-only codul sau aplicația pentru a separa:

- ce există acum;
- ce este deja decis;
- ce este numai propunere;
- ce rămâne neclar.

Discuția poate include problema, publicul, experiența dorită, comportamentul, limitele, alternativele și consecințele. În această etapă nu se construiește încă planul tehnic.

### 2. Documentul de lucru

Când direcția este suficient de coerentă, Codex creează în mod normal un document `Working` în `docs/work/active/`. Acesta este punctul de plecare comun, nu o specificație rigidă și definitivă.

Documentul conține, după caz:

- problema și rezultatul urmărit;
- perspectiva utilizatorului;
- conceptul și intenția de produs;
- comportamentul dorit;
- deciziile aprobate până în acel moment;
- conținutul sau copy-ul aprobat;
- constrângerile și lucrurile care trebuie păstrate;
- lucrurile care nu trebuie schimbate;
- criteriile de acceptare din perspectiva produsului;
- întrebările deschise;
- sursele canonice relevante.

### 3. Alegerea traseului tehnic

Utilizatorul alege traseul în funcție de complexitate:

- pentru o schimbare simplă sau medie, documentul poate merge direct la Gemini;
- pentru o schimbare software complexă, documentul poate merge mai întâi la Claude pentru arhitectură, faze, riscuri și plan tehnic, apoi la Gemini;
- Claude nu este o etapă obligatorie și Codex nu decide automat că trebuie folosit.

### 4. Implementarea și libertatea de ajustare

Utilizatorul lucrează direct cu Gemini în Antigravity. În timpul implementării pot apărea soluții mai bune, limite tehnice, simplificări sau idei noi. Utilizatorul poate decide aceste schimbări cu Gemini fără să revină la Codex după fiecare detaliu.

Git este evidența implicită a implementării. Commiturile, diferențele și raportul de încheiere din taskul Gemini sunt suficiente pentru schimbările obișnuite și nu se copiază automat în documentație.

Dacă există deja un document de lucru pentru o inițiativă complexă, Gemini poate nota numai deciziile importante sau motivele care nu pot fi deduse din cod. Secțiunile sunt opționale:

```markdown
## Decizii luate în timpul implementării

- schimbarea față de intenția inițială;
- motivul;
- decizia aprobată de utilizator.

## Rezultatul implementat

- comportamentul existent la final;
- ce a rămas neimplementat;
- diferențele relevante față de documentul inițial;
- întrebările sau riscurile rămase.
```

Scopul notelor este păstrarea intenției care nu există în Git, nu raportarea fiecărui detaliu și nu controlarea implementării de către Codex.

### 5. Checkpoint-urile Git

Pentru o funcționalitate individuală, documentul de lucru poate nota:

- commitul de bază înaintea implementării;
- commitul final al etapei reconciliate.

Gemini poate face oricâte commituri intermediare și push-uri sunt utile. Codex compară întregul interval dintre cele două checkpoint-uri, nu numai ultimul commit.

Pentru promovarea unei versiuni, `main` este checkpoint-ul reconciliat anterior, iar `dev` este rezultatul curent. Intervalul `main..dev` oferă implicit comparația exactă, fără ca utilizatorul sau Gemini să păstreze un registru separat.

### 6. Reconcilierea și promovarea pe `main`

După una sau mai multe etape de implementare, utilizatorul poate cere direct Codex să facă push pe `main`. Această cerere reprezintă acceptarea stării curente din `dev` și pornește automat reconcilierea. Codex compară:

- intenția inițială;
- deciziile luate în timpul implementării;
- rezultatul implementat;
- documentele canonice existente;
- codul sau aplicația, inspectate read-only când verificarea este necesară.

Codex nu tratează automat diferențele ca erori și nu cere revenirea la soluția inițială. Schimbările acceptate de utilizator în timpul lucrului cu Gemini sunt considerate valide. Codex cere clarificare numai dacă descoperă o decizie majoră neclară, un conflict canonic sau un risc de produs care nu poate fi rezolvat prin documentele și rezultatul existente.

Codex actualizează numai documentația canonică realmente afectată. Schimbările pur tehnice sau vizuale nu produc documente noi. Dacă reconcilierea cere modificări documentare, Codex le comite pe `dev`, publică `dev`, apoi face fast-forward și push pe `main`. Verificarea funcționalității codului rămâne responsabilitatea agentului de implementare.

Pragul este consecința durabilă, nu numărul de fișiere sau linii schimbate. Ajustările de pixeli, lățime sau prezentare rămân de regulă în Git, dacă nu stabilesc un principiu UX/UI canonic. O schimbare precum introducerea autentificării printr-un furnizor extern necesită reconciliere deoarece afectează accesul, datele, securitatea, integrarea și comportamentul produsului.

Dacă există un document de lucru, acesta trece în `docs/work/archive/` după reconciliere. Documentele canonice descriu adevărul actual, iar Git păstrează istoricul implementării.

## Unitatea surselor de adevăr

„Unic” nu înseamnă un singur document care conține tot proiectul. Înseamnă că fiecare categorie de informație are un singur loc canonic și că sursele nu se contrazic după reconciliere:

- intenția și comportamentul produsului → documentele produsului sau platformei;
- decizia și motivul → `docs/decisions/`;
- starea și prioritățile → `docs/roadmap/`;
- istoricul funcționalității → documentul ei de lucru;
- comportamentul tehnic efectiv → codul și verificările rulate.

## Formulări simple pentru utilizator

La finalul discuției cu Codex:

> Pune ce am stabilit într-un document de lucru pentru implementare.

La începutul lucrului cu Gemini:

> Citește documentul acesta și hai să implementăm. Putem ajusta soluția pe parcurs, dar notează deciziile de produs pe care le schimbăm și descrie rezultatul final.

Pentru un proiect tehnic complex:

> Claude, citește documentul și transformă-l într-un plan tehnic. Nu schimba deciziile de produs.

Pentru reconciliere și publicarea versiunii acceptate:

> Fă push pe main.

## Întrebări pentru următorul pilot

- Este suficient un singur document de lucru pentru fiecare funcționalitate?
- În ce situații motivația unei schimbări trebuie notată separat de Git?
- Unde se păstrează cel mai bine documentele de lucru pentru funcționalități diferite?
- Când merită implicat Claude și când documentul poate merge direct la Gemini?
- Ce informații trebuie mutate în documentele canonice și ce rămâne numai ca istoric?

## Primul pilot încheiat

Fluxul a fost testat prin reconstruirea documentației tehnice, consemnată în [arhiva lucrării](../../work/archive/technical-documentation-rebuild.md).

Pilotul folosește o separare explicită:

- Codex auditează sistemul documentar, delimitează sursele de produs și pregătește handoff-ul;
- Gemini auditează codul, rulează verificările autorizate și reconstruiește documentația tehnică;
- Codex reconciliază rezultatul tehnic cu documentele canonice și închide documentul de lucru;
- agenții lucrează secvențial în același working tree și modifică numai fișierele alocate etapei lor.

### Ce a funcționat

- separarea secvențială a responsabilităților a permis auditarea tehnică fără ca agentul tehnic să schimbe produsul sau codul;
- documentul de lucru și commiturile locale au oferit checkpoint-uri clare;
- utilizatorul a putut adăuga în timpul pilotului context esențial despre numele jocurilor și originea prototipului;
- reconcilierea finală a separat afirmațiile observate în cod de cele validate prin comenzi sau rămase neconfirmate.

### Fricțiuni observate

- primul rezultat tehnic a necesitat o rundă explicită de corecții pentru rute, onboarding, roluri, migrații, RLS și integrarea hibridă a jocului;
- a doua rundă a corectat majoritatea problemelor, dar a lăsat câteva formulări prea puternice și un raport temporar de lint în working tree;
- agentul tehnic nu își poate consemna în același commit propriul hash final; checkpoint-ul trebuie raportat după commit sau completat la reconciliere;
- un prompt foarte lung reduce probabilitatea unui control final uniform asupra tuturor documentelor.

### Ajustări propuse

- handoff-ul tehnic va include un tabel scurt „afirmație → sursă → nivel de verificare”, concentrat pe punctele cu risc;
- agentul tehnic va face un control post-commit al `git status --short --branch` și va raporta orice artefact generat;
- constatările critice de securitate vor fi scoase separat în raport, chiar dacă taskul nu autorizează remedierea;
- Codex poate face la reconciliere corecții editoriale limitate, bazate pe cod verificat read-only, fără să preia implementarea;
- este acceptată o singură rundă de corecții tehnice; dacă rămân diferențe editoriale restrânse, acestea se închid în reconcilierea finală.

## Următorul pas

Metoda rămâne `Draft`. Ajustările vor fi testate pe încă o funcționalitate reală înainte de a decide dacă fluxul devine `Working`, `Current` sau trebuie simplificat.

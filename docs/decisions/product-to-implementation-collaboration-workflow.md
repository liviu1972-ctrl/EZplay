---
status: Draft
version: "0.1"
updated: 2026-07-16
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

Când direcția este suficient de coerentă, Codex creează un document de lucru `Working`. Acesta este punctul de plecare comun, nu o specificație rigidă și definitivă.

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

Pentru a păstra continuitatea, Gemini notează numai schimbările care afectează produsul sau comportamentul utilizatorului, nu fiecare detaliu tehnic.

Documentul de lucru rezervă două secțiuni:

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

Gemini poate completa aceste secțiuni pe parcurs sau la încheierea taskului. Scopul este evitarea dependenței de memoria conversației, nu controlarea implementării de către Codex.

### 5. Reconcilierea finală

După terminarea implementării, utilizatorul revine o singură dată la Codex. Codex compară:

- intenția inițială;
- deciziile luate în timpul implementării;
- rezultatul implementat;
- documentele canonice existente;
- codul sau aplicația, inspectate read-only când verificarea este necesară.

Codex nu tratează automat diferențele ca erori și nu cere revenirea la soluția inițială. Dacă utilizatorul confirmă că ajustările făcute cu Gemini sunt bune, acestea devin noua decizie de produs.

Codex actualizează documentația canonică relevantă, deciziile, roadmap-ul și starea implementării. Documentul de lucru păstrează traseul funcționalității, iar documentele canonice descriu adevărul actual.

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

La revenirea în Codex:

> Implementarea este gata. Citește documentul, deciziile notate în timpul implementării și rezultatul actual. Hai să reconciliem documentația.

## Întrebări de verificat în practică

- Este suficient un singur document de lucru pentru fiecare funcționalitate?
- Cât de detaliate trebuie să fie notele lăsate de Gemini?
- Unde se păstrează cel mai bine documentele de lucru pentru funcționalități diferite?
- Când merită implicat Claude și când documentul poate merge direct la Gemini?
- Ce informații trebuie mutate în documentele canonice și ce rămâne numai ca istoric?

## Următorul pas

Fluxul va fi testat pe prima funcționalitate reală. După reconcilierea acelei implementări, utilizatorul și Codex vor evalua fricțiunea, informațiile pierdute și nivelul de documentare. Abia apoi se va decide dacă metoda devine `Working` sau `Current` și dacă trebuie rezumată în `AGENTS.md`.

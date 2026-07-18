---
status: Working
version: "0.2"
updated: 2026-07-18
canonical_for:
  - curricular specification standard for Founder Round maps
  - working code convention for Level 1-5 and Mastery Rounds
---

# Standardul hărților de Founder Rounds

## Rolul documentului

Acest document definește cât de detaliat trebuie descrisă o lecție în hărțile curriculare Level 1–5 și Mastery.

Unitatea curriculară este `Founder Round`. În conversație poate fi numită simplu `Round` sau `lecție`, dar fișierul de nivel nu proiectează încă desfășurarea completă a sesiunii.

## Ce înseamnă un Round definit în hartă

Un Round este suficient de definit curricular când are:

1. un cod stabil;
2. un titlu pentru participant;
3. un titlu pedagogic;
4. o întrebare antreprenorială centrală;
5. o descriere accesibilă participantului;
6. o descriere pedagogică;
7. o capacitate sau competență urmărită;
8. conceptele și instrumentele necesare;
9. o dovadă observabilă de învățare;
10. prerechizitele reale;
11. legăturile cu ceilalți Business Pillars;
12. continuitatea spre o revenire mai avansată.

Definiția curriculară nu înseamnă că Round-ul este gata de livrare.

## Ce nu conține încă harta

Harta nu stabilește automat:

- Business Run-ul;
- configurația de joc sau simulare;
- Founder Debrief-ul;
- Learning Input-ul;
- Business Challenge-ul;
- scenariul complet și setul de date;
- materialele participantului;
- ghidul facilitatorului;
- durata exactă;
- recompensa Skills XP;
- rubrica finală de evaluare.

Aceste elemente apar în fișa completă a Round-ului, după stabilizarea hărții și alegerea experienței potrivite.

## Convenția codurilor Level 1–5

| Business Pillar | Prefix |
|---|---|
| Strategy | `STR` |
| Product | `PRD` |
| Market | `MKT` |
| Operations | `OPS` |
| Finance | `FIN` |

Forma de bază este:

```text
PREFIX LEVEL.ROUND
```

Exemple:

- `STR 2.3` — al treilea Strategy Round din Level 2;
- `MKT 4.6` — al șaselea Market Round din Level 4;
- `FIN 1.2.1` și `FIN 1.2.2` — două Round-uri aflate într-o serie curriculară explicită în interiorul aceleiași linii.

Ultimul segment suplimentar se folosește numai când două Round-uri formează o secvență pedagogică reală. Nu se folosește doar pentru a evita renumerotarea.

Codul este un identificator curricular stabil. El nu garantează că toate Round-urile cu număr mai mic sunt prerechizite.

## Convenția de lucru pentru Mastery

Mastery este o etapă integrată, nu `Level 6` în fiecare pilon. Round-urile sale folosesc convenția de lucru:

```text
MST 01
MST 02
…
```

Cele două cifre reprezintă identificatorul Round-ului, nu un nivel. Convenția rămâne provizorie până la validarea primei experiențe Mastery.

### Acoperirea prin lentilele Mastery

Round-urile `MST` rămân într-o singură hartă integrată. Ele nu primesc coduri paralele pentru Strategy, Product, Market, Operations sau Finance.

Fiecare Round este mapat separat în [arhitectura hibridă Mastery](mastery/README.md) prin două roluri:

- **profunzime directă** — Round-ul dezvoltă și evaluează explicit o capacitate terminală a lentilei;
- **integrare materială** — lentila trebuie să schimbe analiza, alternativa, decizia sau planul, chiar dacă nu este obiectul principal.

Un Round Mastery nu poate avea un pilon absent. Dacă eliminarea unui pilon nu schimbă dovada sau decizia, Round-ul trebuie revizuit înainte de proiectarea experienței.

## Regula pilonului principal

Fiecare Round Level 1–5 are un singur Business Pillar principal. Celelalte apar prin:

- informații necesare deciziei;
- consecințe care trebuie urmărite;
- prerechizite;
- dovezi secundare posibile.

Un Round nu devine multi-pilon doar fiindcă folosește cifre, oameni sau clienți. Întrebarea centrală stabilește pilonul principal.

Mastery este excepția integratoare: fiecare Round Mastery trebuie să ceară o decizie în care cei cinci piloni sunt materiali, cu grade diferite de profunzime directă.

## Regula ordinii

Ordinea din harta unui nivel arată o progresie recomandată. Un Round declară separat dacă:

- poate fi parcurs după onboarding sau poziționare;
- are nevoie de o competență anterioară din același pilon;
- are nevoie de o fundație din alt pilon;
- are nevoie numai de date sau de un context oferit în interiorul cazului.

Nu transformăm numărul codului într-un traseu rigid fără motiv pedagogic.

## Criteriul de diferențiere între niveluri

O lecție nu este mutată la un nivel superior doar prin adăugarea unor termeni sau cifre. Revenirea trebuie să crească cel puțin două dintre:

- autonomia participantului;
- numărul variabilelor;
- orizontul de timp;
- incertitudinea;
- calitatea dovezilor;
- integrarea dintre piloni;
- responsabilitatea pentru oameni, capital și stakeholderi;
- consecințele implementării.

## Statutul fișierelor de nivel

- Level 1 păstrează hărțile deja construite;
- Level 2–5 au hărți curriculare complete ca inventar Working de Round-uri;
- Mastery are o hartă integrată Working;
- un Round devine gata de prototipare numai după verificarea suprapunerilor, prerechizitelor și dovezilor;
- un Round devine gata de livrare numai după proiectarea Founder Loop-ului, materialelor, facilitării și verificărilor necesare.

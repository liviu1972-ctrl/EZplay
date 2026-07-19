---
status: Draft
version: "0.3"
updated: 2026-07-18
---

# Blueprint pentru prima versiune publică ezplay.org

## Scop

Prima versiune publică trebuie să facă EZPLAY inteligibil și credibil înainte să încerce să prezinte toate funcțiile viitoare ale platformei.

Site-ul trebuie să răspundă clar la cinci întrebări:

1. Ce este EZPLAY?
2. Pentru cine este primul program?
3. Cum se învață în EZPLAY?
4. Ce poate face cineva acum?
5. Cum poate participa la dezvoltarea proiectului?

## Rezultatul dorit

După vizită, un utilizator trebuie să poată spune:

> EZPLAY dezvoltă programe de educație antreprenorială în care tinerii învață prin experiență, decizii și consecințe. Jocurile și simulările sunt instrumente ale programului, nu produsul principal.

Un adult decident trebuie să înțeleagă că programul este:

- atractiv pentru tineri;
- serios construit;
- diferit de o lecție tradițională fără a fi împotriva școlii;
- în dezvoltare, cu o direcție curriculară și pedagogică reală;
- disponibil pentru discuții cu școli, cluburi, ONG-uri și comunități.

## Prioritatea publicurilor

### 1. Adultul care permite experiența

Include:

- părinte;
- profesor;
- director sau decident dintr-o școală;
- coordonator de club;
- reprezentant al unui ONG;
- organizator de programe pentru tineri;
- sponsor sau partener.

El trebuie să găsească încredere, claritate, metodă, seriozitate și o acțiune concretă.

### 2. Tânărul participant

El trebuie să simtă că experiența:

- nu este încă o oră de teorie;
- îi oferă libertatea de a decide;
- îi permite să greșească și să încerce din nou;
- este provocatoare și socială;
- îl tratează cu seriozitate;
- nu îl infantilizează.

### 3. Membrul viitor al ecosistemului

Include facilitatorul, contributorul, antreprenorul, cercetătorul sau partenerul care poate ajuta EZPLAY să crească.

Acest public este important, dar nu trebuie să concureze cu mesajul programului în primul ecran.

## Lentile editoriale adaptive

Website-ul păstrează un singur sitemap, dar paginile comune pot fi prezentate prin patru lentile: tânăr/participant, părinte, educator/facilitator și organizație/decident.

Prima intrare folosește copy-ul comun și nu cere declararea unui rol. Traseul sesiunii poate produce progresiv o ipoteză despre intenția curentă și poate adapta numai variante editoriale aprobate. Rutele de public rămân porți de intrare cu voce proprie, iar copy-ul actual al paginilor comune rămâne fallback complet.

Sistemul nu creează profil persistent, nu schimbă sitemap-ul și nu generează liber copy în runtime. Regula completă este în [sistemul de lentile editoriale adaptive](adaptive-editorial-lenses.md).

## Oferta de lucru pentru versiunea 1

### Oferta centrală

Primul program EZPLAY pentru tineri.

Numele public final nu este stabilit. Până la alegerea lui se folosește:

> **Programul EZPLAY pentru tineri**

### Prima experiență concretă

> **Experiența introductivă EZPLAY — Joc + Debrief**

Aceasta este intrarea necesară în program și cea mai potrivită ofertă pentru prima versiune publică.

Pagina trebuie să poată colecta interes de la:

- școli;
- cluburi;
- ONG-uri;
- comunități;
- grupuri de părinți;
- parteneri care pot găzdui sau susține o experiență.

Durata, prețul, localizarea și calendarul rămân câmpuri de confirmat înainte de publicare.

## Conversiile principale

### Conversia 1 — înțelegerea programului

CTA:

> **Descoperă programul**

Destinație: pagina `Programul EZPLAY pentru tineri`.

### Conversia 2 — solicitarea unei experiențe

CTA:

> **Adu o experiență EZPLAY în comunitatea ta**

Destinație: pagina experienței introductive, urmată de formularul de contact.

### Conversia 3 — participarea la dezvoltare

CTA:

> **Construiește EZPLAY împreună cu noi**

Destinație: pagina despre dezvoltarea proiectului.

### Conversia 4 — utilizator existent

CTA secundar în header:

> **Intră în platformă**

Destinație: pagina de intrare în zona autentificată.

## Principiile experienței publice

1. Programul apare înaintea jocurilor.
2. Participantul apare înaintea platformei.
3. Experiența apare înaintea curriculumului detaliat.
4. Rezultatul educațional apare înaintea funcțiilor digitale.
5. Cercetarea susține mesajul, fără să îl îngreuneze.
6. Realitatea și dezvoltarea viitoare sunt diferențiate clar.
7. Fiecare pagină are o singură acțiune principală.
8. Contul nu este cerut înainte ca utilizatorul să înțeleagă valoarea.
9. Jocurile nu sunt folosite ca decor dominant.
10. Copywriting-ul nu atacă școala și nu promite succes antreprenorial.
11. Prima vizită rămâne completă fără profil, întrebare obligatorie sau personalizare.
12. Intenția poate adapta prezentarea, nu adevărul, siguranța sau starea produsului.
13. Rutele rămân stabile; lentilele nu creează site-uri paralele.
14. Orice incertitudine revine la copy-ul comun.

## Navigația principală

Ordinea recomandată:

```text
Programul
Cum învățăm
Experiențe
Pentru organizații
Cercetare
Despre EZPLAY
```

Acțiune separată:

```text
Intră în platformă
```

Pe mobil, acțiunea `Descoperă programul` trebuie să fie vizibilă în meniu înaintea intrării în platformă.

### Prezentarea navigării

Pe desktop, această navigare globală apare în header-ul orizontal. Pe paginile ample, ea coexistă cu un `ExplorerRail` vertical în stânga, colapsat la iconuri și extensibil la cererea utilizatorului.

Header-ul oferă accesul direct la destinațiile principale. Rail-ul face vizibile subpaginile, secțiunile curente și relațiile dintre zone, fără să copieze integral header-ul. Nu apare persistent pe fluxurile focalizate, autentificare sau Deckbuilder.

Specificația completă este în `ux-ui/navigation-system.md`.

## Navigația contextuală

### Din pagina Programului

- Curriculum Explorer — harta detaliată a programului;
- Cum învățăm;
- Experiențe;
- Pentru tineri;
- Pentru părinți;
- Experiența introductivă.

### Din pagina Cum învățăm

- Programul;
- Curriculum Explorer — `Vezi cum metoda devine curriculum`;
- Cercetare;
- Instrumente și simulări;
- Experiențe.

### Din pagina Experiențe

- Experiența introductivă;
- Programul;
- Pentru organizații;
- Contact.

### Din pagina Instrumente și simulări

- Cum învățăm;
- Programul;
- Experiența introductivă;
- platforma autentificată, doar când există un motiv real.

### Din pagina Cercetare

- Curriculum Explorer — `Explorează arhitectura curriculară`;
- Cum învățăm;
- Dezvoltare;

### Din pagina Pentru organizații

- Curriculum Explorer — `Vezi structura programului`;
- Programul;
- Experiența introductivă;
- Contact.

## Footer

### Descoperă

- Programul;
- Harta programului;
- Cum învățăm;
- Experiențe;
- Instrumente și simulări.

### Pentru

- Tineri;
- Părinți;
- Școli și organizații;
- Facilitatori și contributori.

### EZPLAY

- Despre EZPLAY;
- Cercetare;
- Dezvoltarea proiectului;
- Contact.

### Informații

- Licențiere;
- Siguranță;
- Confidențialitate;
- Termeni.

Paginile juridice rămân indisponibile public până când textele sunt verificate.

## Sitemap v1

| Pagină | Identificator recomandat | Rol |
|---|---|---|
| Acasă | `/` | poziționare și orientare |
| Programul | `/program` | oferta educațională principală |
| Curriculum Explorer | `/program/curriculum` | explorarea structurată a nivelurilor, Business Pillars și Founder Rounds |
| Cum învățăm | `/how-we-learn` | metoda și experiența |
| Experiențe | `/experiences` | formatele de participare |
| Experiența introductivă | `/experiences/introduction` | oferta inițială concretă |
| Pentru tineri | `/for/young-people` | mesaj adresat participantului |
| Pentru părinți | `/for/parents` | încredere și valoare educațională |
| Pentru organizații | `/for/organizations` | școli, cluburi și ONG-uri |
| Cercetare | `/research` | fundament, surse și întrebări |
| Instrumente și simulări | `/tools` | rolul jocurilor și simulărilor |
| Despre EZPLAY | `/about` | identitate și poveste |
| Dezvoltare | `/development` | transparență și participare |
| Contact | `/contact` | rutarea solicitărilor |
| Platformă | `/platform` | intrarea în zona autentificată |

Identificatorii sunt independenți de mecanismul tehnic de localizare. Versiunea engleză va folosi echivalentele stabilite după aprobarea copywriting-ului românesc.

`/program/curriculum` este rădăcina unei zone extensibile, nu o singură pagină editorială. Subrutele ei sunt definite în [`curriculum-explorer.md`](curriculum-explorer.md) și folosesc un shell curricular propriu.

Lentilele editoriale sunt independente de identificatorii rutelor și de localizare. Ele nu produc variante de sitemap sau URL-uri separate pe public.

## Ierarhia paginilor în prima lansare

### Nivel 1 — obligatoriu

- Acasă;
- Programul;
- Cum învățăm;
- Experiența introductivă;
- Pentru organizații;
- Cercetare;
- Despre EZPLAY;
- Contact.

### Nivel 2 — recomandat pentru un site complet

- Experiențe;
- Pentru tineri;
- Pentru părinți;
- Instrumente și simulări;
- Dezvoltarea proiectului;
- Platformă.

### Nivel 3 — după decizii suplimentare

- pagini detaliate pentru Founder Rounds;
- harta curriculară interactivă;
- pagini pentru facilitatori;
- comunitate și contribuții;
- licențiere publică;
- siguranță și politici pentru minori;
- magazin sau acces la jocul de bază;
- calendar public de sesiuni.

## Parcursurile principale

### Părinte

```text
Homepage
→ Programul
→ Pentru părinți
→ Experiența introductivă
→ Contact / solicitare
```

Succes: părintele înțelege valoarea și știe cum poate crea acces pentru copil.

### Școală, club sau ONG

```text
Homepage
→ Pentru organizații
→ Cum învățăm
→ Cercetare
→ Experiența introductivă
→ Solicită o discuție
```

Succes: organizația solicită o discuție relevantă și oferă informațiile necesare.

### Tânăr

```text
Homepage
→ Pentru tineri
→ Experiențe
→ Cum învățăm
→ Vorbește cu un adult / exprimă interesul
```

Succes: tânărul își dorește experiența și poate explica de ce.

### Contributor sau facilitator potențial

```text
Homepage
→ Dezvoltare
→ Despre EZPLAY
→ Cercetare
→ Contact
```

Succes: persoana declară clar cum poate contribui.

### Participant existent

```text
Homepage sau link direct
→ Platformă
→ Autentificare
→ experiențele și materialele disponibile
```

Succes: participantul existent nu este obligat să parcurgă din nou site-ul public.

Aceste parcursuri sunt și surse posibile de semnale pentru lentila sesiunii. Niciun parcurs nu dovedește singur identitatea persoanei, iar semnalele ambigue păstrează copy-ul comun sau lentila stabilă.

## Rolul zonei autentificate

Zona autentificată este prezentată public ca infrastructură în dezvoltare pentru:

- acces la program;
- înscrieri și sesiuni;
- materiale;
- istoric;
- Founder Skills;
- progres;
- contribuții;
- instrumente pentru facilitatori.

Funcțiile nu se enumeră ca disponibile dacă nu sunt confirmate în implementare.

## Contextul de implementare care nu trebuie pierdut

Implementarea va folosi infrastructura deja disponibilă:

- Next.js;
- Vercel;
- Supabase Auth;
- Supabase Database;
- Supabase Storage pentru imaginile cărților;
- ruta funcțională a Deckbuilder-ului digital.

Acest stack nu dictează arhitectura publică a produsului.

Harta completă de continuitate este în `existing-platform-continuity.md`. Se păstrează stack-ul Next.js–Vercel–Supabase, autentificarea și login-ul, baza de date și imaginile cărților, Deckbuilder-ul, capabilitatea română–engleză și afișarea versiunii. Suprafețele publice actuale, inclusiv homepage-ul, meniul, `/cards`, About și How it Works, nu se păstrează ca UX/UI. Configuratorul vechi de la `/cards3` nu se păstrează și nu trebuie confundat cu Deckbuilder-ul sau cu direcția viitoare a simulărilor EZPLAY.

Specificația viitoare UX/UI va defini separat:

- componentele React recomandate;
- utilizarea `shadcn/ui`;
- iconografia `lucide-react`;
- animațiile și efectele;
- sistemul de layout;
- comportamentul responsive;
- accesibilitatea;
- stările componentelor.

## Conținut interzis fără validare

Agentul nu publică:

- numere de participanți neverificate;
- „sute de tineri”;
- testimoniale inventate;
- logo-uri fără permisiune;
- prețuri neconfirmate;
- calendar inventat;
- rezultate educaționale garantate;
- certificări;
- expresia `program validat`;
- afirmații de conformitate juridică;
- monede, Credits sau mecanisme de recompensă nedefinite;
- Founder Skills numerice înaintea deciziei curriculare;
- funcții viitoare prezentate ca disponibile.

## Criterii editoriale de acceptare

Website-ul este corect din punct de vedere editorial dacă:

1. primul ecran comunică educație antreprenorială, nu jocuri;
2. publicul inițial este clar;
3. adultul și tânărul găsesc motive diferite, dar compatibile, pentru a continua;
4. jocurile apar în rol de instrument;
5. metoda este explicată fără jargon excesiv;
6. cercetarea este vizibilă fără a domina;
7. dezvoltarea proiectului este transparentă;
8. fiecare pagină are un CTA principal clar;
9. conținutul indisponibil este marcat sau eliminat, nu inventat;
10. site-ul conduce către o ofertă concretă sau către colectarea interesului.
11. copy-ul comun rămâne coerent când personalizarea nu rulează;
12. o lentilă schimbă numai blocuri aprobate și nu slăbește trasabilitatea afirmațiilor;
13. corecția perspectivei este discretă și nu concurează cu acțiunea principală.

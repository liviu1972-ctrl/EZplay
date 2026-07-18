---
status: Current
version: "1.0"
updated: 2026-07-18
lifecycle: active
canonical_for:
  - product handoff for technical planning of adaptive editorial lenses
---

# Handoff pentru planning — lentile editoriale adaptive

## Autoritate

Planning-ul urmează:

- [decizia activă](../../decisions/active/adaptive-editorial-lenses.md);
- [specificația canonică a sistemului](../../platform/website/adaptive-editorial-lenses.md);
- [blueprint-ul website-ului](../../platform/website/blueprint-v1.md);
- [regulile de copywriting](../../platform/website/copy-rules.md);
- [harta afirmațiilor și dovezilor](../../platform/website/content-evidence-map.md).

Acest handoff cere planificare tehnică după auditul codului. Nu autorizează schimbarea viziunii, sitemap-ului, publicurilor, copy-ului aprobat, autentificării ori protecțiilor pentru minori.

## Obiectiv

Transformă sistemul editorial aprobat într-un plan tehnic etapizat care:

- păstrează un singur set de rute publice;
- livrează copy-ul comun ca fallback complet;
- observă numai traseul sesiunii curente;
- stabilește o singură lentilă sau starea comună;
- aplică variante aprobate numai pe paginile eligibile;
- permite corectarea discretă a perspectivei;
- poate fi dezactivat fără să rupă site-ul.

## Audit obligatoriu înainte de plan

Agentul inspectează read-only:

- rutele și layout-urile publice existente;
- sursa reală a copy-ului și mecanismul RO/EN;
- componentele header, Explorer Rail, meniu mobil, footer, CTA și `RelatedPaths`;
- starea și navigarea deja folosite între rute;
- SSR/SSG/client boundaries și riscurile de hidratare;
- orice mecanism existent de sesiune, fără expunerea secretelor;
- analiticele ori tracking-ul existent, numai pentru a evita reutilizarea neaprobată;
- testele disponibile pentru navigare, localizare și accesibilitate;
- diferențele dintre documentația website și comportamentul implementat.

Auditul raportează conflictele înainte să proiecteze soluția.

## Comportament funcțional obligatoriu

1. O sesiune nouă fără context primește copy-ul comun.
2. Nicio întrebare, fereastră modală sau alegere de rol nu blochează prima intrare.
3. Rutele și acțiunile eligibile produc semnale slabe, medii sau puternice conform unei hărți versionate și testabile.
4. Un semnal slab izolat nu schimbă lentila.
5. Lentila activă cere un prag minim și o diferență suficientă față de alternativa apropiată.
6. O lentilă activă are inerție; intenția nouă trebuie să fie coerentă pentru a o înlocui.
7. Schimbarea copy-ului se aplică la navigarea următoare, nu în timpul lecturii.
8. Rutele de public își păstrează propria voce și nu sunt rescrise de lentila sesiunii.
9. Paginile fără variante aprobate folosesc copy-ul comun actual.
10. Sistemul nu combină fragmente generate din mai multe lentile și nu generează copy în runtime.
11. Controlul discret nu este modal, toast repetat sau CTA dominant și nu afișează clasificări ori scoruri.
12. Defectarea sau dezactivarea mecanismului păstrează conținutul, navigarea și CTA-urile comune.

## Date și limite

Planul nu introduce pentru lentile:

- identificator personal;
- cookie persistent;
- scriere în cont, Supabase, CRM sau alt sistem extern;
- istoric între vizite;
- tracking cross-site ori referrer extern ca semnal;
- analizarea textului liber din formulare;
- inferențe despre vârsta exactă, școală, localitate ori caracteristici sensibile.

Mecanismul strict necesar în sesiunea curentă este permis numai în limitele deciziei. Autentificarea și localizarea rămân sisteme separate și nu furnizează semnale fără o decizie nouă.

## Copy și variante

Agentul tehnic nu scrie variante editoriale.

Planul trebuie să prevadă:

- o sursă versionată pentru copy-ul comun și variante;
- o reprezentare explicită a paginilor și blocurilor eligibile;
- fallback per pagină și per bloc;
- păstrarea dovezilor și a stării de publicare;
- paritate semantică între română și engleză;
- posibilitatea de a lansa o pagină fără toate cele patru variante;
- imposibilitatea ca o variantă lipsă să afișeze text gol sau placeholder.

Exemplele discutate pentru tânăr și părinte nu devin automat copy public. Variantele intră în implementare numai după ce sunt versionate și aprobate în documentația editorială.

## Etapizare cerută în plan

Planul propune cel puțin:

1. audit și hartă a surselor de copy;
2. fundația pentru copy comun, variante și fallback;
3. modelul de semnale și starea sesiunii;
4. controlul discret în shell-urile relevante;
5. prototip editorial pe un număr restrâns de pagini comune;
6. verificarea rutelor de public și a schimbării intenției;
7. QA pentru română, engleză, accesibilitate, hidratare și lipsa persistenței;
8. extinderea progresivă numai după validarea prototipului.

Paginile recomandate pentru prioritizare sunt homepage, program, experiența introductivă, cum învățăm și experiențe. Agentul poate propune o ordine tehnică diferită după audit, fără să schimbe prioritățile de produs.

## Criterii de acceptare pentru plan

Planul este gata de aprobare când:

- leagă fiecare etapă de comportamentul produsului;
- identifică fișierele, componentele și testele reale după audit;
- separă copy-ul comun, variantele, semnalele și starea;
- explică fallback-ul și dezactivarea sigură;
- evită stocarea persistentă și colectarea de date neaprobate;
- include scenarii pentru intenție necunoscută, stabilă, ambiguă și schimbată;
- include rutele de public și paginile fără variante;
- include QA pentru navigare, localizare, accesibilitate și erori de hidratare;
- listează conflictele dintre cod și documentație;
- nu transformă opțiunile tehnice în decizii noi de produs.

## Scenarii obligatorii pentru validare

### Sesiune fără semnale

Utilizatorul vede copy-ul comun și poate parcurge integral site-ul.

### Traseu participant

Navigarea coerentă între joc, cum se joacă și experiența introductivă poate activa lentila participantului la o navigare ulterioară.

### Traseu părinte

Navigarea coerentă între pagina părinților, vârstă, progres și participare poate activa lentila părintelui.

### Traseu educator

Navigarea coerentă între metodă, curriculum, Founder Rounds și facilitare poate activa lentila educatorului fără să presupună existența unei rute dedicate.

### Traseu organizație

Navigarea coerentă între organizații, cercetare, implementare și solicitarea unei discuții poate activa lentila organizației.

### Intenție ambiguă

Semnalele apropiate păstrează copy-ul comun sau lentila stabilă.

### Intenție schimbată

O succesiune coerentă de semnale noi poate schimba lentila la navigarea următoare fără oscilații.

### Variantă lipsă

Pagina afișează copy-ul comun, fără text gol și fără rută duplicată.

### Mecanism indisponibil

Site-ul rămâne complet utilizabil, indexabil și navigabil cu experiența comună.

## Raport cerut agentului de planning

Raportează:

- realitatea implementată și conflictele cu documentația;
- arhitectura propusă și alternativele respinse;
- harta inițială de semnale și justificarea pragurilor propuse;
- impactul asupra copy-ului, localizării, routing-ului și rendering-ului;
- planul pe faze, dependențele, riscurile și verificările;
- deciziile de produs care mai necesită clarificare înainte de implementare.

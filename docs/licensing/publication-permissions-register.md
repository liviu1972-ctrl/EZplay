---
status: Draft
version: "0.1"
updated: 2026-07-16
---

# Registrul permisiunilor de publicare EZPLAY

## Rol și protecția datelor

Acest document păstrează numai evidența operațională a permisiunilor, nu formularele semnate și nu datele personale.

Documentele care conțin nume, semnături, date de contact, imagini originale sau informații despre minori se păstrează într-un sistem cu acces controlat, stabilit ulterior. Repository-ul public sau colaborativ păstrează doar un ID, categoria materialului, scopul, starea și locul securizat al dovezii.

Acest șablon nu reprezintă un formular juridic și nu stabilește singur valabilitatea consimțământului.

## Stări

- `Neinițiată`;
- `Solicitată`;
- `Acordată`;
- `Acordată cu limite`;
- `Refuzată`;
- `Retrasă`;
- `Expirată`;
- `Nu este necesară`, cu justificare verificată.

Numai `Acordată`, `Acordată cu limite` și `Nu este necesară` pot trece poarta de publicare, iar limitele trebuie aplicate în implementare.

## Registrul curent

| ID | Categorie | Material / context | Scop public | Persoane sau organizații | Stare | Dovada securizată | Limite / expirare | Legătură drepturi |
|---|---|---|---|---|---|---|---|---|
| `PERM-001` | fotografii sesiuni istorice | sesiuni cu copii, părinți și antreprenori | About, experiențe, dezvoltare | neinventariate | Neinițiată | — | Publicarea este blocată. | `RIGHT-013` |
| `PERM-002` | video sesiuni istorice | sesiuni și competiții | pagini publice și social media | neinventariate | Neinițiată | — | Publicarea este blocată. | `RIGHT-013` |
| `PERM-003` | testimoniale | participanți, părinți, educatori, antreprenori | pagini de încredere | neinventariate | Neinițiată | — | Publicarea este blocată. | `RIGHT-014` |
| `PERM-004` | nume organizații | colaborări și istoric | cronologie și studii de caz | de confirmat | Neinițiată | — | Numele nu se publică drept parteneriat confirmat. | `RIGHT-015` |
| `PERM-005` | logo-uri organizații | colaborări și istoric | logo wall și studii de caz | de confirmat | Neinițiată | — | Publicarea este blocată. | `RIGHT-015` |
| `PERM-006` | rezultate și clasamente | sesiuni și competiții istorice | cercetare și dezvoltare | date neinventariate | Neinițiată | — | Numai agregat după verificarea metodei și anonimizării. | `RIGHT-016` |
| `PERM-007` | bio și fotografie fondator | pagina About | identitate publică | persoana vizată | Neinițiată | — | Bio-ul și fotografia rămân de confirmat. | de adăugat după alegerea activului |

## Câmpuri obligatorii pentru o intrare nouă

- ID unic;
- descrierea exactă a materialului;
- persoana sau organizația care poate acorda dreptul;
- scopurile și canalele permise;
- dacă materialul poate fi editat, tradus, decupat sau combinat;
- teritoriul și perioada, dacă sunt limitate;
- condițiile de atribuire;
- procesul de retragere;
- locul securizat al dovezii;
- responsabilul care a verificat corespondența dintre dovadă și material;
- ID-ul din registrul de drepturi și proveniență.

## Regula pentru minori

Pentru un material care implică un minor:

- nu se pune în acest fișier numele copilului;
- se folosește un ID anonim legat de evidența securizată;
- se verifică separat participarea la activitate și permisiunea pentru publicare;
- acordul pentru o fotografie nu se extinde automat la video, testimonial, reclamă sau utilizare nelimitată;
- retragerea se poate aplica materialului public fără a șterge documentarea internă legitimă, conform procesului juridic aprobat;
- publicarea rămâne blocată până la existența formularului și procesului revizuite specializat.

## Verificare înainte de deploy

Pentru fiecare material media, testimonial, logo sau nume de organizație, implementarea trebuie să poată indica:

```text
RIGHT-xxx → PERM-xxx → fișierul și versiunea publicată
```

Dacă lanțul lipsește, materialul nu intră în build-ul public.

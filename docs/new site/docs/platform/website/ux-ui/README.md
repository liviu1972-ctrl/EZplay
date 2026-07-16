---
status: Draft
version: "0.2"
updated: 2026-07-16
---

# Specificația UX/UI pentru ezplay.org

## Rol

Acest folder transformă blueprintul de produs și copywriting-ul aprobat într-un sistem de experiență și interfață pentru prima versiune publică a `ezplay.org`.

Documentele nu înlocuiesc:

- definiția EZPLAY;
- poziționarea de brand;
- copywriting-ul paginilor;
- deciziile viitoare privind oferta, siguranța minorilor sau funcțiile platformei.

Ele stabilesc cum trebuie organizat, prezentat și pus în mișcare conținutul deja definit.

## Rezultatul urmărit

Site-ul trebuie să transmită simultan că:

1. EZPLAY este un proiect serios de educație antreprenorială;
2. există în spate un sistem amplu, o metodă și o direcție organizațională;
3. experiența este atractivă și vie pentru tineri;
4. adulții pot înțelege și evalua programul fără limbaj infantil;
5. jocurile și platforma sunt instrumente, nu identitatea principală;
6. complexitatea este controlată și ușor de explorat.

Formula de design:

> **Profunzimea unui sistem. Claritatea unei experiențe. Energia descoperirii.**

## Ordinea de citire pentru agentul de implementare

1. `../../ezplay-org-product-direction.md`;
2. `../blueprint-v1.md`;
3. `../existing-platform-continuity.md`;
4. `../copy-rules.md`;
5. documentul de copy al paginii implementate din `../pages/`;
6. `experience-direction.md`;
7. `navigation-system.md`;
8. `visual-system.md`;
9. `components-and-motion.md`;
10. `page-specifications.md`;
11. `implementation-handoff.md`.

Agentul nu începe implementarea din `page-specifications.md` fără să citească mai întâi direcția și sistemul vizual. O pagină corectă structural, dar construită cu estetica implicită `shadcn/ui`, nu satisface această specificație.

## Documente

- `experience-direction.md` — experiența urmărită, principiile UX, navigarea și relația cu referințele;
- `navigation-system.md` — header-ul orizontal, Explorer Rail-ul extensibil, utilizarea pe rute și comportamentul responsive;
- `visual-system.md` — paletă, tipografie, layout, imagini, trasee, module și componente vizuale;
- `components-and-motion.md` — inventarul componentelor React, utilizarea `shadcn/ui`, `lucide-react`, Motion și regulile de animație;
- `page-specifications.md` — compoziția și comportamentul celor 14 pagini din sitemap;
- `implementation-handoff.md` — stack, ordine de implementare, criterii de acceptare și verificări.

Documentul-părinte `../existing-platform-continuity.md` stabilește granița dintre fundația tehnică păstrată și experiența publică reconstruită. El este obligatoriu înainte de orice reorganizare a codului.

## Surse vizuale analizate

### Boundaryless

`https://boundaryless.io/` este referință pentru:

- nivelul de finisare;
- varietatea compozițiilor;
- sentimentul de sistem complet;
- navigarea matură;
- consecvența dintre homepage și paginile interioare;
- mișcarea legată de conținut.

Nu este referință pentru:

- culori;
- fonturi monospace;
- estetică dark-tech;
- rame tehnice dense;
- ton corporate;
- diagrame de infrastructură;
- cantitatea de spațiu consumată de efectele de scroll.

### Imaginile concept pentru cutiile EZPLAY

Au fost analizate imaginile din seria `Generated Image April 22–23, 2026` prezentate de fondator.

Ele sunt referințe de concept pentru:

- compania ca sistem conectat;
- trasee care transportă efectele unei decizii;
- module colorate;
- componente speciale care întrerup un pattern;
- contrastul dintre precizie și materialitate;
- jocul ca obiect tangibil.

Ele nu sunt active finale pentru website. Conțin randări și detalii care trebuie înlocuite cu logo, cărți, componente și fotografii reale.

## Regula centrală de transpunere

> Nu copiem placa electronică. Construim o hartă vie a unei companii.

Traseele reprezintă conexiuni și consecințe. Modulele reprezintă părți ale sistemului. Componentele speciale creează funcție, surpriză și profunzime.

## Starea pachetului

Documentele sunt `Draft`. Ele sunt suficient de clare pentru realizarea unui prototip vizual complet, dar următoarele decizii pot cere actualizări:

- fonturile finale după testare în browser;
- asocierea culorilor cu cele cinci perspective;
- disponibilitatea fotografiilor reale;
- rolul public al Deckbuilder-ului digital;
- textele și fluxurile juridice;
- accesul și conturile pentru minori.

# Documentația EZPLAY

`docs/` conține memoria de produs, cercetarea, deciziile și documentația proiectului. Comportamentul efectiv al aplicației se verifică în `src/`, `supabase/` și prin testele rulate.

## Surse canonice

- `context/` — definiție, poziționare și viziune;
- `methods/` — modele și formule comune;
- `products/` — produse, jocuri și program educațional;
- `platform/` — ezplay.org, copy și UX/UI;
- `community/` — participare și guvernanță;
- `research/` — surse, analiză și dovezi;
- `roadmap/` — starea curentă și prioritățile;
- `decisions/` — decizii importante și motivele lor;
- `licensing/` — proveniență, drepturi și permisiuni.

## Documentație tehnică veche

Următoarele directoare sunt păstrate pentru inventar și istoric, dar nu sunt surse actuale de adevăr:

- `application/` — descrieri ale unor funcții și roluri dintr-o versiune anterioară;
- `ezplay/` — documentație pentru o arhitectură mai veche Firebase/Vite;
- `technical/` — documentație tehnică nevalidată după reconstrucția aplicației.

Refacerea lor se va face într-un task separat, pornind din codul Next.js/Supabase curent. Până atunci, orice afirmație despre implementare trebuie verificată direct în cod.

## Reguli de lucru

- Citește `/AGENTS.md` și `docs/AGENTS.md` înainte de modificări.
- Folosește numai stările `Draft`, `Working` și `Current`.
- Separă ce este implementat de ceea ce este planificat sau exploratoriu.
- Nu dubla definițiile canonice și nu transforma README-urile în specificații paralele.
- Notează deciziile durabile în `decisions/` și verifică linkurile relative după reorganizări.

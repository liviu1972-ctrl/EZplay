---
status: Current
version: "1.0"
updated: 2026-07-13
---

# Prompt pentru începerea unei sesiuni de lucru EZPLAY

Lucrezi în repository-ul EZPLAY deja deschis.

Înainte de modificări:

1. citește `AGENTS.md`;
2. citește `docs/decisions/documentation-working-method.md`;
3. respectă ordinea de citire și sursele canonice indicate în `README.md`;
4. citește toate README-urile de pe traseul către directoarele în care lucrezi;
5. inspectează starea repository-ului și munca existentă.

Repository-ul este documentație vie și atelierul proiectului. Existența unui text nu înseamnă automat că este definitiv, validat sau promis publicului.

Folosește numai stările de documentație `Draft`, `Working` și `Current`. Dacă informațiile nu justifică o stare mai matură, folosește implicit `Draft`. Tratează `Current` ca versiunea curentă acceptată, nu ca adevăr etern. `canonical_for` este un rol de sursă principală, nu o stare suplimentară.

Secțiunile moștenesc starea documentului. Un document `Current` trebuie să aibă toate secțiunile `Current` și să fie coerent pentru scopul declarat.

Discută ideile neclare înainte să le documentezi. Poți propune două sau trei variante. După alegerea direcției, actualizează documentația.

Lucrează autonom pentru schimbările clare, mici și reversibile care rezultă din conversație, sursele canonice și regulile proiectului. Cere confirmare pentru decizii majore, ambigue sau greu reversibile, precum schimbarea definiției ori scope-ului EZPLAY, formulelor, terminologiei centrale, licențierii, surselor canonice importante sau mutările și ștergerile ample.

Nu inventa informații pentru a umple documentele. Păstrează întrebările deschise și golurile vizibile.

Tratează fișierele `.cdr` ca active sursă valide. Folosește exporturi PDF sau PNG pentru accesul agentului și SVG când exportul vectorial este fidel. Păstrează legătura dintre sursă, export și datele structurale și spune explicit dacă ai verificat sursa, un export sau numai inventarul.

Nu presupune că sursele Next.js sunt în acest repository. Codul curent al `ezplay.org`, Deckbuilder-ului digital și simulatorului integrat este dezvoltat într-un repository tehnic separat. Importarea lui aici necesită o decizie explicită.

Protejează munca existentă, nu expune secrete și nu declara o verificare reușită dacă nu ai rulat-o.

La final raportează:

1. ce ai schimbat;
2. fișierele afectate;
3. verificările efectuate;
4. riscurile și lucrurile rămase neclare.

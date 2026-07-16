---
status: Working
version: "0.2"
updated: 2026-07-17
canonical_for: technical documentation entry point
---

# Documentația Tehnică EZPLAY

Acest director conține referința tehnică de lucru pentru implementarea Next.js 16, Supabase și EZPLAY Deckbuilder, obținută în urma auditului din 2026-07-17 pe branch-ul `dev` (commit `338dab3`).

## Scop și Ordinea de Lectură

Documentele descriu checkpoint-ul auditat și limitele verificării sale. Pentru comportamentul efectiv au prioritate codul, migrațiile și verificările executate; o diferență ulterioară se reconciliază aici, nu se rezolvă presupunând că documentul este mai nou decât implementarea.

Ordinea recomandată de lectură este:

1. [Arhitectură și Stack (`architecture.md`)](architecture.md)
2. [Rute și Acces (`routes-and-access.md`)](routes-and-access.md)
3. [Autentificare și Ciclul de Viață (`authentication-and-user-lifecycle.md`)](authentication-and-user-lifecycle.md)
4. [Date, Supabase și Storage (`data-supabase-and-storage.md`)](data-supabase-and-storage.md)
5. [Motorul Deckbuilder și Salvări (`deckbuilder-engine-and-saves.md`)](deckbuilder-engine-and-saves.md)
6. [Raport de Verificare (`verification.md`)](verification.md)

## Limite

- Afirmațiile se bazează pe codul observat static și pe comenzile consemnate în `verification.md`. Lipsa testelor automate și E2E face ca validarea funcțională să fie incompletă.
- Statutul `Working` este intenționat: documentele sunt utilizabile, dar nu certifică funcționarea end-to-end, securitatea completă sau schema Supabase remote.
- Arhiva din `docs/archive/legacy-application/` este material istoric și nevalidat pentru aplicația curentă.
- Nu sunt incluse detalii sensibile sau credențiale, conform regulilor de siguranță.

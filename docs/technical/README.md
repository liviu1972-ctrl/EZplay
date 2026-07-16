---
status: Working
version: "0.1"
updated: 2026-07-17
canonical_for: technical documentation entry point
---

# Documentația Tehnică EZPLAY

Acest director conține specificațiile tehnice pentru implementarea Next.js 16, Supabase și motorul Deckbuilder, obținute în urma auditului din 2026-07-17 pe branch-ul `dev` (commit `338dab3`).

## Scop și Ordinea de Lectură

Aceste documente reprezintă sursa de adevăr pentru arhitectura curentă. Lectura trebuie să urmeze această ordine:

1. [Arhitectură și Stack (`architecture.md`)](architecture.md)
2. [Rute și Acces (`routes-and-access.md`)](routes-and-access.md)
3. [Autentificare și Ciclul de Viață (`authentication-and-user-lifecycle.md`)](authentication-and-user-lifecycle.md)
4. [Date, Supabase și Storage (`data-supabase-and-storage.md`)](data-supabase-and-storage.md)
5. [Motorul Deckbuilder și Salvări (`deckbuilder-engine-and-saves.md`)](deckbuilder-engine-and-saves.md)
6. [Raport de Verificare (`verification.md`)](verification.md)

## Limite

- Afirmațiile se bazează pe codul observat static. Lipsa testelor E2E face ca validarea funcțională să fie incompletă (vezi `verification.md`).
- Arhiva din `docs/archive/legacy-application/` nu mai este aplicabilă și nu reprezintă comportamentul actualizat descris aici.
- Nu sunt incluse detalii sensibile sau credențiale, conform regulilor de siguranță.

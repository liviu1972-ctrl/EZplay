# Reguli pentru implementarea EZPLAY

Aceste reguli se aplică întregului cod din `src/` și completează `/AGENTS.md`.

## Înainte de modificare

- Citește documentele de produs relevante și cel mai apropiat `AGENTS.md`.
- Citește documentele canonice din directoarele finale din `docs/`; nu recrea vechea copie `docs/new site/`.
- Tratează `docs/application/`, `docs/ezplay/` și `docs/technical/` ca documentație veche până la auditul lor separat.
- Inspectează implementarea existentă înainte de a propune reorganizări sau dependențe noi.

## Limitele implementării

- Nu inventa copy, ofertă, rezultate, funcții, roluri sau promisiuni publice.
- Nu modifica decizii de produs pentru comoditatea implementării.
- Nu reorganiza codul pentru eleganță dacă taskul nu cere asta și nu există un beneficiu verificabil.
- Păstrează componentele client la limita interacțiunii; nu transforma inutil componente server în componente client.
- Actualizează documentația tehnică numai într-un task care autorizează refacerea ei și numai după verificarea codului.

## Autentificare, Supabase și date

- Nu expune chei și nu introduce credențiale în cod, documentație, loguri sau fixture-uri.
- Modificările DDL se fac prin fișiere noi în `supabase/migrations/`.
- Nu executa migrații remote și nu modifica proiectul Supabase remote fără aprobare.
- Nu slăbi RLS, separarea client/server, validarea rolurilor, middleware-ul, callback-ul OAuth, cookie-urile sau refresh-ul sesiunii.
- Folosește clientul Supabase potrivit contextului din `src/lib/supabase/`; cheia service-role nu ajunge în cod client.
- Datele personale și traseele minorilor necesită cel mai restrictiv comportament compatibil cu cerința aprobată.

## Calitate și verificare

- Păstrează schimbările mici și verificabile.
- Rulează `pnpm lint` pentru modificări de cod și `pnpm build` pentru schimbări care pot afecta compilarea, rutele sau granițele server/client.
- Rulează scenariile relevante pentru autentificare, Supabase, rute publice și joc atunci când zona este afectată.
- Raportează explicit orice diferență observată între cod și documentație.

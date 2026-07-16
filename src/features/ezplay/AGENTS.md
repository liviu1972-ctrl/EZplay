# Reguli pentru motorul și experiența EZPLAY

Aceste reguli se aplică în `src/features/ezplay/` și completează regulile globale și `src/AGENTS.md`.

## Zonă protejată

Acest director conține motorul Deckbuilder, interfața jocului și integrarea sa cu platforma. Schimbările pot afecta formule, cărți, salvări și progresul utilizatorilor.

- Nu face rescrieri cosmetice sau reorganizări ample fără scop de produs aprobat.
- Nu schimba formulele economice, ordinea acțiunilor, condițiile de victorie/faliment sau efectele cărților fără cerință explicită și criterii de acceptare.
- Sursa canonică pentru formule este `docs/methods/economic-model.md`; copia din `docs/new site/` nu se folosește pentru schimbări noi.
- Nu modifica datele și imaginile cărților fără inventar, proveniență și verificarea mapării către Supabase Storage sau `public/`.
- Nu rupe compatibilitatea salvărilor fără plan de migrare și aprobare.
- Nu elimina autentificarea sau protecțiile necesare accesului la joc.

## Regresii obligatorii când zona este afectată

Verifică proporțional cu schimbarea:

- încărcarea configurațiilor, cărților și imaginilor;
- inițializarea jocului și setup-ul de bază;
- calculele financiare și tranzițiile de tură;
- salvarea și reîncărcarea unei partide;
- scenariile de victorie, faliment și simulator;
- randarea desktop și mobil a ecranelor modificate;
- accesul prin ruta `/ezplay` și comportamentul sesiunii.

Pentru o eroare descoperită în formule sau date, oprește extinderea schimbării, documentează cazul reproductibil și cere decizie dacă remedierea ar modifica regulile jocului.

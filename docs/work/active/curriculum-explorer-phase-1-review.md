---
status: Current
version: "1.5"
updated: 2026-07-18
lifecycle: completed
canonical_for:
  - final product acceptance of Curriculum Explorer Phase 1
  - boundary before Phase 2 can begin
---

# Review de acceptare — Curriculum Explorer Faza 1

## Verdict final

**Faza 1 — Shell și Hartă este acceptată.** Toate blocajele din review-urile anterioare au fost închise și nu mai există corecții obligatorii în scope-ul acestei faze.

Faza 2 nu a început și nu este autorizată automat prin acest verdict. Catalogul controlat și paginile detaliate ale Founder Round-urilor necesită o decizie separată de pornire.

## Dovezi de acceptare

Au fost inspectate read-only codul, artefactul `.next` și aplicația locală pe desktop și mobil. Codex nu a rerulat lint, build ori testele; rezultatele comenzilor tehnice sunt cele raportate de agentul de implementare.

### Conținut și validare

- content engine-ul server-only cere sursele obligatorii și validează exact 178 Round-uri Level 1–5, 13 Round-uri Mastery, 191 în total și cinci lentile;
- testele native acoperă fail-fast, slug-urile, inventarul complet și lentilele ne-goale;
- cele cinci lentile Mastery afișează conținutul canonic;
- proiecțiile publice nu mai folosesc `dangerouslySetInnerHTML`, nu mai afișează sintaxă Markdown brută și nu publică statusul intern `Working`;
- fenced code blocks din progresiile Pillar sunt transformate într-o reprezentare semantică lizibilă;
- allowlist-ul paginii Pillar folosește secțiuni explicite din sursele spiralelor;
- diferența dintre Finance și ceilalți patru piloni este fidelă surselor: Finance are o secțiune introductivă separată, iar Strategy, Product, Market și Operations includ introducerea în `Definiția progresiei`.

### Navigare și experiență

- shell-ul dedicat, Curriculum Header, Atlasul, Biblioteca și Spirala contextuală sunt funcționale;
- rutele Level × Business Pillar păstrează ambele coordonate;
- Harta conectată oferă cele 25 de intersecții și cele cinci lentile Mastery;
- skip link-ul, TOC-ul și navigarea pe cele două axe sunt disponibile;
- navigarea contextuală mobilă este compactă și nu blochează accesul la conținut;
- breadcrumb-urile și căile înapoi către Program sunt funcționale;
- pilotul factual greșit `FIN 1.2.1` a fost retras și răspunde 404.

### Integrarea cu website-ul principal

- `/program`, Explorer Rail și footer-ul folosesc etichetele și destinațiile aprobate;
- `Harta programului` conduce la `/program/curriculum`, nu direct la modul `/map`;
- `Experiența introductivă` conduce la `/experiences/introduction`;
- `/how-we-learn`, `/research` și `/for/organizations` folosesc legăturile editoriale discrete și etichetele canonice.

### Build și QA raportat

- `pnpm test:curriculum` este raportat `pass 4`;
- `pnpm build` este raportat ca reușit după ultima modificare;
- artefactul inspectat conține 47 de rute curriculare prerandate;
- artefactul nu mai conține ruta dinamică `[round]` sau pagina pilot `fin-1-2-1`;
- cele 246 de probleme lint din motorul de joc și zona legacy sunt baseline preexistent; agentul raportează că Curriculum Explorer nu introduce probleme noi.

## Limita verdictului

Acceptarea confirmă Faza 1: engine-ul de conținut, shell-ul, overview-urile, navigarea, harta, integrarea website-ului și fundația statică. Nu confirmă și nu autorizează:

- catalogul public extins al celor 191 de Round-uri;
- paginile detaliate `/rounds/[slug]`;
- filtrele și căutarea catalogului;
- extinderea editorială din Fazele 2 și 3.

Aceste elemente intră într-un handoff și un review separat.

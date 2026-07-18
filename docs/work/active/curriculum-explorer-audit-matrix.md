---
status: Current
version: "1.2"
updated: 2026-07-18
lifecycle: active
canonical_for:
  - Technical audit matrix of curriculum sources
---

# Matrice de Audit: Curriculum Explorer

Această matrice fundamentează [Planul tehnic de implementare versiunea 1.4](curriculum-explorer-technical-plan.md).

Pragul editorial pentru generarea rutei detaliate a unui Round (`/rounds/[slug]`) este fix: **Prezența exactă a câmpurilor `Titlu pentru participant` și `Descriere pentru participant`**.

## 1. Inventarul surselor Level 1–5 (25 fișiere)

Legendă coloane: `Rds` = Round-uri identificate (ID), `TP` = Titlu participant, `DP` = Descriere participant, `TPed` = Titlu pedagogic, `DPed` = Descriere pedagogică, `Înt` = Întrebarea antreprenorială/fondatorului, `Cmp` = Competență, `Pre` = Prerechizite, `Con` = Continuitate.

Toate cele 178 de Round-uri trebuie validate față de acest audit la build time.

| Sursa (`docs/products/educational-program/curriculum/...`) | Rds | TP | DP | TPed | DPed | Înt | Cmp | Pre | Con | Abateri majore (avertismente) |
|---|---|---|---|---|---|---|---|---|---|---|
| `finance/level-1.md` | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | Niciuna |
| `finance/level-2.md` | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | Niciuna |
| `finance/level-3.md` | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | Niciuna |
| `finance/level-4.md` | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | Niciuna |
| `finance/level-5.md` | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | Niciuna |
| `strategy/level-1.md` | 6 | 6 | 6 | 6 | 6 | 0 | 6 | 6 | 0 | Lipsesc Întrebarea și Continuitatea |
| `strategy/level-2.md` | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | Niciuna |
| `strategy/level-3.md` | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | Niciuna |
| `strategy/level-4.md` | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | Niciuna |
| `strategy/level-5.md` | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | Niciuna |
| `product/level-1.md` | 5 | 5 | 5 | 5 | 5 | 0 | 5 | 5 | 0 | Lipsesc Întrebarea și Continuitatea |
| `product/level-2.md` | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | 6 | Niciuna |
| `product/level-3.md` | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | Niciuna |
| `product/level-4.md` | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | Niciuna |
| `product/level-5.md` | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | Niciuna |
| `market/level-1.md` | 5 | 5 | 5 | 5 | 5 | 0 | 5 | 5 | 0 | Lipsesc Întrebarea și Continuitatea |
| `market/level-2.md` | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | Niciuna |
| `market/level-3.md` | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | Niciuna |
| `market/level-4.md` | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | Niciuna |
| `market/level-5.md` | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | Niciuna |
| `operations/level-1.md` | 6 | 6 | 6 | 6 | 6 | 0 | 6 | 6 | 0 | Lipsesc Întrebarea și Continuitatea |
| `operations/level-2.md` | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | Niciuna |
| `operations/level-3.md` | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 7 | Niciuna |
| `operations/level-4.md` | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | Niciuna |
| `operations/level-5.md` | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 | Niciuna |

**Subtotal Level 1–5:** 178 Round-uri evaluate.

## 2. Inventarul Mastery (13 Round-uri + 5 Lentile)

### A. Round-uri Mastery (Nucleul Integrat)
Sursa unică: `docs/products/educational-program/curriculum/mastery-rounds.md`

| ID Round | Rds | TP | DP | TPed | DPed | Înt | Cmp | Pre | Con | Abateri majore |
|---|---|---|---|---|---|---|---|---|---|---|
| MST 01 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | Niciuna |
| MST 02 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | Niciuna |
| MST 03 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | Niciuna |
| MST 04 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | Niciuna |
| MST 05 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | Niciuna |
| MST 06 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | Niciuna |
| MST 07 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | Niciuna |
| MST 08 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | Niciuna |
| MST 09 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | Niciuna |
| MST 10 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | Niciuna |
| MST 11 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | Niciuna |
| MST 12 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | Niciuna |
| MST 13 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | Niciuna |

### B. Lentile Mastery
Sursele sunt cele 5 fișiere distincte per pilon din `docs/products/educational-program/curriculum/mastery/[pillar].md`. Lentilele sunt terminale, nu au cele 9 rubrici standard de mai sus.

| Pilon | Fișier Sursă | Standard de profunzime detectat | Corp de dovezi detectat |
|---|---|---|---|
| Finance | `mastery/finance.md` | Da | Da |
| Strategy | `mastery/strategy.md` | Da | Da |
| Product | `mastery/product.md` | Da | Da |
| Market | `mastery/market.md` | Da | Da |
| Operations | `mastery/operations.md` | Da | Da |

**Total Curricular Complet:** 191 Round-uri de bază (178 L1-L5 + 13 MST) + 5 Lentile Mastery. Toate cele 191 sunt auditate explicit față de pragul editorial curent.

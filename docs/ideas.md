---
status: Current
version: "1.1"
updated: 2026-07-17
lifecycle: active
canonical_for:
  - captured EZPLAY ideas awaiting exploration or promotion
---

# Registrul de idei EZPLAY

## Rolul registrului

Acest fișier păstrează ideile pe care vrem să nu le pierdem înainte ca ele să devină propuneri, decizii sau lucrări active.

Registrul nu este backlog, roadmap, sursă de cerințe sau autorizație de implementare. Agenții nu pornesc taskuri pe baza lui. O idee produce muncă numai când utilizatorul o promovează explicit și `promoted_to` indică decizia, sursa canonică sau documentul din `docs/work/active/` care o guvernează.

Stările permise sunt:

| `idea_stage` | Sens |
|---|---|
| `captured` | Păstrată concis, încă neanalizată suficient |
| `exploring` | Aflată în discuție sau cercetare, fără decizie |
| `parked` | Păstrată pentru mai târziu, cu o condiție clară de reluare |
| `promoted` | Mutată explicit într-o sursă care poate guverna munca |

## Idei înregistrate

### IDEA-001 — Sistem Credits pe două niveluri

- `idea_stage`: `parked`
- `captured`: 2026-07-17
- `theme`: economie de platformă și monetizare
- `summary`: explorarea unui sistem cu o resursă obținută relativ ușor prin activități eligibile și o resursă premium obținută rar sau cumpărată cu bani fiat, fiecare având utilizări distincte în ecosistem.
- `why_keep`: poate susține în viitor produse, beneficii sau servicii digitale recurente și o economie internă inteligibilă.
- `already_excluded`: Founder Skills / Skills XP, Prestige și Equity nu pot fi cumpărate și nu se convertesc în Credits; simpla vânzare a jocului fizic nu justifică introducerea unei monede virtuale; denumirile `EZC`, `EZG`, `Coins`, `Gold` și `Gems` nu sunt aprobate.
- `revisit_when`: există un catalog concret de bunuri sau servicii recurente pentru care plata în monedă internă ar crea o experiență mai bună decât prețul direct în fiat și sunt definite protecțiile comerciale și de siguranță pentru minori.
- `promoted_to`: —

### IDEA-002 — Influență comunitară progresivă prin Prestige

- `idea_stage`: `promoted`
- `captured`: 2026-07-17
- `theme`: comunitate și guvernanță
- `summary`: Prestige devine greutate decizională în EZPLAY Governance, proporțional cu contribuția validată, fără niveluri generale de încredere sau rang comunitar.
- `why_keep`: poate transforma contribuția demonstrată în responsabilitate reală și poate permite o guvernanță mai participativă pe măsură ce comunitatea se maturizează.
- `already_excluded`: Prestige nu poate fi cumpărat, transferat sau transformat într-un rang general al persoanei; nu toate deciziile folosesc același proces.
- `revisit_when`: —
- `promoted_to`: [`docs/decisions/active/prestige-and-ezplay-governance.md`](decisions/active/prestige-and-ezplay-governance.md)

### IDEA-003 — Influență contextuală la scară mare

- `idea_stage`: `parked`
- `captured`: 2026-07-17
- `theme`: comunitate și guvernanță
- `summary`: dacă EZPLAY devine o organizație mare, greutatea unei contribuții sau eligibilitatea decizională ar putea ține cont de domeniul în care persoana a demonstrat experiență, fără a crea acum mai multe tipuri de Prestige.
- `why_keep`: poate împiedica transformarea experienței dintr-o singură zonă în autoritate universală într-un ecosistem foarte mare.
- `already_excluded`: în etapa actuală există un singur Prestige și nu se construiesc scoruri contextuale.
- `revisit_when`: volumul și diversitatea comunității fac ca un singur context decizional să producă probleme observabile de relevanță sau reprezentare.
- `promoted_to`: —

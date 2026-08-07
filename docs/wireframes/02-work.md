# Wireframe — `/work`

**Specification source:** [`ROUTE_SPECIFICATIONS.md`](../design/ROUTE_SPECIFICATIONS.md) §1 · [`COMPONENT_GUIDELINES.md`](../design/COMPONENT_GUIDELINES.md) §4.1
**Status:** §§1–3 current. **§§4–6 draw project cards and are superseded by ADR-028** — the built page uses the home page's editorial language, with space rather than cards as the separator. The layouts below are retained as the record of what that decision argued against.

---

## 1. Purpose

Let a reader compare all four case studies side by side, and house the one with no homepage band.

**Comparison surface, not the primary path.** Homepage bands 3 and 4 link directly into case studies, so a reader arriving here has deliberately chosen breadth over depth.

## 2. Audience

Hiring manager selecting by relevance rather than accepting the featured choice. Senior engineer choosing a second case study. Collaborator determining what kind of problem to bring.

## 3. Narrative goal

**Entering:** directed interest — "which of these is mine?"
**Leaving:** a specific choice, made for a role-relevant reason.
**Exit action:** into one case study. Failure signal: choosing the first one because it is first.

Density `default`.

---

## 4. Mobile — 375 px

```
┌───────────────────────────────────────┐
│ Jigar Gajjar            ☰{menu} {theme}│
├───────────────────────────────────────┤
│                          ⟨--space-section-sm⟩
│ H1  Work                              │
│                                       │
│ Three projects, three different kinds │
│ of engineering. Plus this site, which │
│ is the fourth.                        │
│                          ⟨--space-12⟩ │
├───────────────────────────────────────┤
│ ┌───────────────────────────────────┐ │  ← project card
│ │ LABEL                             │ │    --color-surface-raised
│ │ AI INFRASTRUCTURE & FRAMEWORK ENG.│ │    1px --color-border-subtle
│ │                                   │ │
│ │ H2  OrchestAI      [ Production ] │ │
│ │                                   │ │
│ │ A multi-agent framework on .NET,  │ │
│ │ built so other engineers can      │ │
│ │ extend it without reading its     │ │
│ │ internals.                        │ │
│ │                                   │ │
│ │ .NET · CQRS · MCP · MediatR       │ │  ← stack tags, max 5
│ │                                   │ │
│ │ Read the case study {arrow-right} │ │
│ └───────────────────────────────────┘ │
│                          ⟨--space-6⟩  │
│ ┌───────────────────────────────────┐ │
│ │ LABEL  AI PRODUCT ENGINEERING     │ │
│ │ H2  NovaMind AI     [ Production ]│ │
│ │ Document intelligence with        │ │
│ │ grounded citations — upload,      │ │
│ │ organise, and ask questions       │ │
│ │ against your own documents.       │ │
│ │ RAG · Vector search · Auth        │ │
│ │ Read the case study {arrow-right} │ │
│ └───────────────────────────────────┘ │
│                          ⟨--space-6⟩  │
│ ┌───────────────────────────────────┐ │
│ │ LABEL  ENTERPRISE SOFTWARE ENG.   │ │
│ │ H2  Edge10 — NHL Athlete          │ │
│ │     Performance    [ Production ] │ │
│ │ CQRS and clean architecture in a  │ │
│ │ live production organisation,     │ │
│ │ with agentic systems for API and  │ │
│ │ end-to-end validation.            │ │
│ │ C# .NET · SQL Server · React      │ │
│ │ Read the case study {arrow-right} │ │
│ └───────────────────────────────────┘ │
│                          ⟨--space-section-md⟩
├───────────────────────────────────────┤
│ H2  Methodology                       │  ← categorical separation
│                                       │
│ The fourth case study is this site.   │
│ Specification first, decisions        │
│ recorded, gates before features.      │
│                          ⟨--space-6⟩  │
│ ┌───────────────────────────────────┐ │
│ │ LABEL  ENGINEERING METHODOLOGY    │ │
│ │ H3  jigargajjar.dev  [ Production ]│ │
│ │ Built from a frozen specification │ │
│ │ written before any code. The      │ │
│ │ documentation is public, so every │ │
│ │ claim here is checkable.          │ │
│ │ Next.js · TypeScript · MDX        │ │
│ │ Read the case study {arrow-right} │ │
│ └───────────────────────────────────┘ │
│                          ⟨--space-section-lg⟩
├───────────────────────────────────────┤
│ FOOTER                                │
└───────────────────────────────────────┘
```

◇ **No lifecycle badge is asserted as `production` without being accurate.** Values shown are placeholders for the owner's declaration; the badge is schema-required (`ARCHITECTURE.md` §6.3) and a false `production` claim is the kind a senior engineer verifies in under a minute.

◇ **The methodology card uses `<h3>`** because it sits under the `<h2>` "Methodology" heading. The three flagship cards use `<h2>` directly under the page `<h1>`.

---

## 5. Tablet — 768 px

```
┌─────────────────────────────────────────────────────┐
│ Jigar Gajjar      Work Workflow About Connect {theme}│
├─────────────────────────────────────────────────────┤
│ H1  Work                                             │
│ Three projects, three different kinds of             │
│ engineering. Plus this site, which is the fourth.    │
├─────────────────────────────────────────────────────┤
│ ┌─────────────────────┐ ┌─────────────────────┐     │  ← 2-col grid
│ │ OrchestAI           │ │ NovaMind AI         │     │    at --bp-sm
│ └─────────────────────┘ └─────────────────────┘     │
│ ┌─────────────────────┐                             │
│ │ Edge10              │                             │
│ └─────────────────────┘                             │
├─────────────────────────────────────────────────────┤
│ H2  Methodology                                      │
│ ┌─────────────────────┐                             │
│ │ jigargajjar.dev     │   ← single column, not in    │
│ └─────────────────────┘     the grid above           │
└─────────────────────────────────────────────────────┘
```

◇ **Two columns at `--bp-sm`** — the documented threshold "where a two-column card grid becomes viable" (`SPACING.md` §7).

◇ **The third card does not stretch to fill the row.** All four cards render identically (`ROUTE_SPECIFICATIONS.md` §1) — stretching one would weight it editorially on the surface whose job is comparability.

---

## 6. Desktop — 1280 px

```
┌───────────────────────────────────────────────────────────────┐
│ ⟨--container-wide, 1120⟩                                       │
│ H1  Work                                                       │
│ Three projects, three different kinds of engineering.          │
│ Plus this site, which is the fourth.                           │
├───────────────────────────────────────────────────────────────┤
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │  ← 3-col at
│ │ OrchestAI    │ │ NovaMind AI  │ │ Edge10       │            │
│ │ AI INFRA     │ │ AI PRODUCT   │ │ ENTERPRISE   │            │
│ │ [Production] │ │ [Production] │ │ [Production] │            │
│ │ summary ×3   │ │ summary ×3   │ │ summary ×3   │            │
│ │ stack tags   │ │ stack tags   │ │ stack tags   │            │
│ │ Read {→}     │ │ Read {→}     │ │ Read {→}     │            │    --bp-md
│ └──────────────┘ └──────────────┘ └──────────────┘            │
├───────────────────────────────────────────────────────────────┤
│ H2  Methodology                                                │
│ ┌──────────────┐                                              │
│ │ jigargajjar  │   ← one column wide, left-aligned            │
│ │ .dev         │     Separated, not demoted                   │
│ └──────────────┘                                              │
├───────────────────────────────────────────────────────────────┤
│ FOOTER                                                         │
└───────────────────────────────────────────────────────────────┘
```

◇ **Three columns begin at `--bp-md` (900 px)**, not at the 1280 px width drawn here — `SPACING.md` §7 defines `--bp-md` as the point where the prose column reaches its measure and gutters can grow, which is also where a third card stops crowding. No new breakpoint is introduced: the grid is one column below `--bp-sm`, two from `--bp-sm` to `--bp-md`, and three from `--bp-md` upward.

◇ **Three columns puts the competency thesis on one line.** A reader sees three distinct labels simultaneously, which is the fastest possible delivery of ADR-012's argument.

◇ **Cards are equal height by content, not by stretch.** No fixed heights (`SPACING.md` §7); the grid aligns tops, and ragged bottoms are acceptable.

---

## 7. Component mapping

| Element | Component | Source |
|---|---|---|
| Page header | Prose primitive | `ARCHITECTURE.md` §3 |
| Four cards | Project card | `COMPONENT_GUIDELINES.md` §4.1 |
| Lifecycle badge | Lifecycle badge | §5.1 |
| Stack tags | Stack tag, non-interactive | §5.2 |
| Card link | Whole card is one link, one accessible name | §4.1 |
| Footer | Footer | §3.3 |

**No new components.**

## 8. Ledger mapping

| Section | Resolves |
|---|---|
| Page header | Framing only — resolves nothing on its own |
| Three flagship cards | H2 breadth · C6 what problems they can solve · H1 shipped something real |
| Methodology section | The only surface where the fourth case study is discoverable |

## 9. Design rationale

**Competency label leads every card.** ADR-012 requires the thesis to be legible at a glance; the label above the title is what makes this page scan as three distinct stories rather than three projects.

**No filters, no tabs, no sort control.** Four items do not need filtering, and a filter implies a collection large enough to require one.

**All four cards render identically.** Featuring happens on the homepage where it serves guide-don't-ask; on the comparison surface, differential weighting defeats the purpose.

**The methodology card is separated categorically, not demoted editorially.** A heading distinguishes it as a different kind of artifact — the site the reader is currently inside — without styling it as lesser.

**Summary capped at three lines by authoring discipline, never by truncation.** Long enough to orient, short enough that it cannot substitute for the document. Truncated text is content the reader cannot reach.

## 10. What was deliberately removed

- **Hero section** — this is an index; a hero would delay the only thing it exists to show
- **Cover images on cards** — would make the page about screenshots rather than the competency claim (`COMPONENT_GUIDELINES.md` §4.1), and would consume the entire route image budget
- **Filters, tags-as-navigation, sort** — a technology tag that navigates implies a filtered index that does not exist and should not
- **Counts or statistics** — "4 projects" tells a reader nothing
- **A call to action** — the footer is the exit

## 11. Accessibility

One `<h1>` ("Work"). Flagship cards `<h2>`; methodology heading `<h2>`, its card `<h3>`. Cards are a `<ul>` so count and position are announced. Each card is one link with one accessible name — no "read more" in the link list. Tab order: skip → wordmark → nav → theme → card 1–3 → card 4 → footer. Grid order matches DOM order at every breakpoint.

## 12. Open questions

None blocking.

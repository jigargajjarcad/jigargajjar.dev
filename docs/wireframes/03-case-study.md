# Wireframe — `/work/[slug]` Case Study

**Specification source:** [`ARCHITECTURE.md`](../ARCHITECTURE.md) §6.2 · [`COMPONENT_GUIDELINES.md`](../design/COMPONENT_GUIDELINES.md) §6, §7, §8

Drawn as OrchestAI. The nine-section model is identical for all four.

---

## 1. Purpose

Carry the full argument for one competency, verifiably, to a reader who may have arrived cold.

**This page must self-orient.** `EXPERIENCE_FLOW.md` §2 establishes that the highest-value handoff on the site — a hiring manager forwarding a case study to a senior engineer — always lands here with no context. The Summary is not a preamble for readers who scrolled the homepage; it is the layer-1 surface for everyone who did not.

## 2. Audience

Hiring manager (sections 1–5, 8). Senior engineer (5–7, 9, plus source). Collaborator (6, 9).

## 3. Narrative goal

| Section | State entering |
|---|---|
| 1 Summary | Unoriented, or provisional |
| 2 Context | Qualifying |
| 3 Timeline | Orienting |
| 4 Architecture | Engaged |
| 5 Key decisions | **Pivotal — hiring manager** |
| 6 Failures & mistakes | Surprised, then trusting |
| 7 Verification | **Pivotal — senior engineer** |
| 8 Outcomes | Confirming |
| 9 Looking back | Respecting |

**Exit action:** source repository, an adjacent case study, or `/connect`.

Density `reading` — `--space-section-lg` between sections, ×1.25 vertical gaps.

---

## 4. Mobile — 375 px

```
┌───────────────────────────────────────┐
│ Jigar Gajjar            ☰{menu} {theme}│
├───────────────────────────────────────┤
│  ⟨HEADER REGION — density compact⟩    │
│                                       │
│ LABEL                                 │
│ AI INFRASTRUCTURE & FRAMEWORK ENG.    │
│                                       │
│ H1  OrchestAI                         │
│ [ Production ]                        │
│                                       │
│ A multi-agent framework on .NET,      │  ← summary, ≤180 chars
│ built so other engineers can extend   │
│ it without reading its internals.     │
│                                       │
│ Role   Sole engineer — architecture,  │
│        direction, verification        │
│ Stack  .NET · CQRS · MCP · MediatR    │
│ Updated  ‹ISO date›                   │
│                                       │
│ ‹Source {arrow-up-right}›             │
│                                       │
│ ── Outcomes ─────────────────────     │
│ ▸ ‹OWNER: outcome 1 — one line›       │  ← exactly three
│ ▸ ‹OWNER: outcome 2 — one line›       │
│ ▸ ‹OWNER: outcome 3 — one line›       │
│                          ⟨--space-section-lg⟩
├═══════════════════════════════════════┤
│  ⟨BODY REGION — density reading,      │
│    --container-prose 68ch⟩            │
│                                       │
│ H2  Context and constraints           │
│ ‹OWNER: 150–500 words — the problem,  │
│  who it was for, what was non-        │
│  negotiable. Constraints are what     │
│  make the decisions meaningful›       │
│                          ⟨--space-section-md⟩
│ H2  Timeline                          │
│ ┌─│──────────────────────────────────┐│  ← Timeline component
│ │ ■ PLANNING            2025 Q1      ││    hairline + 5px square
│ │ │ ‹OWNER: ≤2 sentences›            ││    nodes, ordered list
│ │ ■ ARCHITECTURE        2025 Q1      ││
│ │ │ ‹OWNER: ≤2 sentences›            ││
│ │ ■ IMPLEMENTATION      2025 Q2      ││
│ │ │ ‹OWNER: ≤2 sentences›            ││
│ │ ■ MAJOR SETBACKS      2025 Q2      ││  ← visually identical
│ │ │ ‹OWNER: where it stalled,        ││    to every other entry
│ │ │  broke, or was redirected›       ││
│ │ ■ VERIFICATION        2025 Q3      ││
│ │ │ ‹OWNER: ≤2 sentences›            ││
│ │ ■ RELEASE             2025 Q3      ││
│ │ │ ‹OWNER: ≤2 sentences›            ││
│ │ ■ FUTURE ROADMAP      —            ││
│ │   ‹OWNER: what is planned, or an   ││
│ │    explicit statement that the     ││
│ │    project is complete or dormant› ││
│ └──────────────────────────────────── ┘│
│                          ⟨--space-section-md⟩
│ H2  Architecture                      │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │  ← Diagram, inline SVG
│ ▓  system diagram — currentColor,  ▓  │    real <text> nodes
│ ▓  orthogonal routing, hairline    ▓  │    breaks out to --wide
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │
│ Caption — what the reader should      │
│ notice, not "diagram"                 │
│                                       │
│ ‹OWNER: 150–500 words — components,   │
│  boundaries, data flow, failure modes›│
│                          ⟨--space-section-md⟩
│ H2  Key decisions                     │
│ ┌───────────────────────────────────┐ │  ← Decision component
│ │ CONTEXT                           │ │    bordered, no fill
│ │ ‹OWNER›                           │ │    4 required regions
│ │ CHOICE                            │ │
│ │ ‹OWNER›                           │ │
│ │ ALTERNATIVES CONSIDERED           │ │
│ │ ‹OWNER: ≥2, genuinely rejected›   │ │
│ │ CONSEQUENCE                       │ │
│ │ ‹OWNER›                           │ │
│ └───────────────────────────────────┘ │
│         ⟨2–5 decisions total⟩         │
│                          ⟨--space-section-md⟩
│ H2  Failures and mistakes             │
│ ‹OWNER: at least one wrong            │
│  assumption, architectural mistake,   │
│  or verification failure — with what  │
│  it cost and what changed›            │
│ ┌───────────────────────────────────┐ │  ← Callout, critical
│ │ ▌ What I got wrong                │ │    left rule 2px
│ │ ▌ ‹OWNER: ≤3 sentences›           │ │
│ └───────────────────────────────────┘ │
│                          ⟨--space-section-md⟩
│ H2  Verification                      │
│ ‹OWNER: 150–500 words — how           │
│  correctness was established for      │
│  non-deterministic output. Tests,     │
│  evaluation methodology, gates,       │
│  review process›                      │
│                                       │
│ ```                                   │  ← Code block
│ ‹OWNER: real test or CI output›       │    build-time highlight
│ ```                        {copy}     │    horizontal scroll
│                          ⟨--space-section-md⟩
│ H2  Outcomes                          │
│                                       │
│      ‹OWNER›                          │  ← Metric, display face
│      METRIC LABEL                     │    tabular figures
│      qualifier — conditions           │    max 3 adjacent
│                                       │
│ ‹OWNER: what shipped and what changed›│
│                          ⟨--space-section-md⟩
│ H2  Looking back                      │
│ ‹OWNER: what would be done            │
│  differently on a rebuild today, and  │
│  why. Reasoning, not regrets›         │
│                          ⟨--space-section-lg⟩
├═══════════════════════════════════════┤
│  ⟨FOOTER REGION — density default⟩    │
│ H2  Next                              │
│ LABEL  AI PRODUCT ENGINEERING         │
│ ‹NovaMind AI {arrow-right}›           │
│                                       │
│ ‹Source on GitHub {arrow-up-right}›   │
│ ‹All four case studies {arrow-right}› │
├───────────────────────────────────────┤
│ FOOTER                                │
└───────────────────────────────────────┘
```

◇ **Source link appears twice — in the header region and in the page footer region — and once more inline within Architecture or Key decisions where the code becomes relevant.** `EXPERIENCE_FLOW.md` §4.3 identifies the return from GitHub as the fragile step; an in-narrative link means the reader leaves from a point in an argument they have not finished, with unread sections below.

◇ **Restricted-disclosure variant (Edge10).** Where `disclosure: restricted`, `sourceUrl` is absent and **the source link is not rendered at all — not disabled, not greyed** (`INTERACTION.md` §8). No explanatory badge appears in its place; the reason is stated in the case study's own prose under `FOUNDATION.md` §10. The header region reflows with one fewer link; nothing else changes. This is the only structural variation across the four case studies.

◇ **Major setbacks carries no warning colour or icon.** Marking it would make honest entries look like errors and discourage writing them (`COMPONENT_GUIDELINES.md` §7).

---

## 5. Tablet — 768 px

Changes only.

```
┌─────────────────────────────────────────────────────┐
│ HEADER REGION — --container-wide                     │
│ LABEL / H1 OrchestAI / [Production]                  │
│ Summary ────────────────────────────                 │
│                                                      │
│ Role ─────────────  Stack ─────────────              │  ← metadata pairs
│ Updated ──────────  ‹Source {↗}›                     │    two columns
│                                                      │
│ ── Outcomes ──────────────────────────               │
│ ▸ one   ▸ two   ▸ three                              │  ← inline row
├─────────────────────────────────────────────────────┤
│ BODY — --container-prose stays 68ch, centred         │
│ Diagram and code blocks break out to --container-wide│
│ Timeline retains single-column vertical form         │
└─────────────────────────────────────────────────────┘
```

◇ **Prose does not widen.** The measure is capped at 68ch regardless of viewport — it is the single largest lever on twenty-minute reading comfort.

---

## 6. Desktop — 1280 px

```
┌───────────────────────────────────────────────────────────────┐
│ HEADER REGION ⟨--container-wide 1120, density compact⟩         │
│                                                                │
│ LABEL  AI INFRASTRUCTURE & FRAMEWORK ENGINEERING               │
│ H1  OrchestAI                                  [ Production ]  │
│ ───────────────────────────────────────────────────────────    │
│ A multi-agent framework on .NET, built so other engineers      │
│ can extend it without reading its internals.                   │
│                                                                │
│ ROLE ──────────  STACK ──────────  UPDATED ──────  ‹Source ↗›  │
│                                                                │
│ ▸ outcome one      ▸ outcome two      ▸ outcome three          │
├───────────────────────────────────────────────────────────────┤
│ BODY ⟨--container-prose 68ch, centred on page axis⟩            │
│                                                                │
│        H2  Context and constraints                             │
│        prose ───────────────────────────                       │
│                                                                │
│        H2  Timeline                                            │
│        ┌────────────────────────────────┐                      │
│        │ ■ stage / period / body        │                      │
│        └────────────────────────────────┘                      │
│                                                                │
│        H2  Architecture                                        │
│  ┌──────────────────────────────────────────────┐              │
│  │ ▓▓ diagram — breaks out to --container-wide ▓▓│              │
│  └──────────────────────────────────────────────┘              │
│        prose returns to 68ch immediately                       │
│                                                                │
│        H2  Key decisions        (2–5 Decision blocks)          │
│        H2  Failures and mistakes                               │
│        H2  Verification                                        │
│  ┌──────────────────────────────────────────────┐              │
│  │ code block — breaks out, own h-scroll        │              │
│  └──────────────────────────────────────────────┘              │
│        H2  Outcomes                                            │
│              ‹metric›   ‹metric›   ‹metric›                    │  ← max 3
│        H2  Looking back                                        │
├───────────────────────────────────────────────────────────────┤
│ FOOTER REGION — Next: NovaMind AI · Source · All case studies  │
└───────────────────────────────────────────────────────────────┘
```

◇ **Break-outs are centred on the prose column axis** so the eye returns to a consistent point (`SPACING.md` §6). Two consecutive break-outs of different widths would be a layout error.

◇ **No sticky table of contents, at any width.** It duplicates a structure the heading hierarchy already exposes to assistive technology, and it consumes horizontal space at desktop.

---

## 7. Component mapping

| Element | Component | Source |
|---|---|---|
| Page regions | Case-study layout | `COMPONENT_GUIDELINES.md` §6 |
| Lifecycle badge, stack tags | §5.1, §5.2 |
| Timeline | Timeline — ordered list, square nodes | §7 |
| System diagram | Diagram — inline SVG, `currentColor` | §8.5 |
| Decision blocks | Decision — four required regions | §8.6 |
| Failure emphasis | Callout, `critical` variant | §8.1 |
| Test output | Code block + copy control | §8.3 |
| Metrics | Metric — display face, tabular | §8.7 |
| Diagram caption | Figure | §8.4 |

**No new components.** All nine sections render from the closed MDX set (`ARCHITECTURE.md` §6.4).

## 8. Ledger mapping

| Section | Resolves |
|---|---|
| 1 Summary | H1 · R3 · self-orientation for cold arrivals |
| 2 Context | H3 can they operate without supervision |
| 3 Timeline | Comprehension aid |
| 4 Architecture | H3 designed or assembled |
| 5 Key decisions | H4 · S2 alternatives seriously considered |
| 6 Failures | H6 raise the bar · S5 what they got wrong · C3 what happens when it goes wrong |
| 7 Verification | H5 · S3 do they know what correct means |
| 8 Outcomes | H8 did it work |
| 9 Looking back | S6 have they revised their thinking |
| Footer region | S4 can I read the source |

## 9. Design rationale

**All nine sections, always, in order.** Uniformity is what makes a thin section legible as a signal rather than a stylistic choice — and a thin Verification section is a thin central claim.

**The header region is `compact`; the body is `reading`.** A cold arrival needs orientation fast; a reader eight paragraphs in needs pacing. Density is a surface property, not a preference.

**Exactly three outcomes.** Schema-enforced (`ARCHITECTURE.md` §6.3). Three forces prioritisation; four becomes a list nobody weights.

**Metrics carry their qualifier in the same visual unit as the number.** A number without its conditions is a claim without its evidence, and for Edge10 the anonymisation must be visible rather than implied.

## 10. What was deliberately removed

- **Sticky table of contents** — duplicates the heading structure, costs horizontal space
- **Reading-progress indicator** — measures scroll position, which is not reading progress, and updates every frame
- **Estimated reading time** — sets an expectation the reader did not ask for
- **Share buttons** — third-party requests are prohibited (`ARCHITECTURE.md` §10)
- **Author byline and date at the top** — one author; `updated` sits in the metadata row
- **Related-projects grid at the end** — one "Next" link plus `/work` is enough; a grid at the end of a 3,000-word document is a menu after a conclusion
- **Line numbers in code blocks** — copied along with the code by most selection implementations

## 11. Accessibility

One `<h1>` (project title). Nine `<h2>` sections; Decision region labels are not headings. Timeline is `<ol>` — order is the meaning. Diagram carries an accessible description of relationships, not just `<text>` labels. Code block copy control is in the tab order at all times, not only on hover, and announces success via a live region. Tab order: skip → header → source link → in-narrative links → copy controls → next/source/all → footer.

## 12. Open questions

**Adjacency rule for the "Next" link is unspecified.** `COMPONENT_GUIDELINES.md` §6 says "adjacent case study" without defining adjacency. Drawn here as next-by-`order`, which is competency-driven rather than chronological. Not blocking — one line to confirm before Phase 5.

# Wireframe — `/workflow`

**Specification source:** [`ARCHITECTURE.md`](../ARCHITECTURE.md) §6.6 · ADR-014 (engineering notes region)

---

## 1. Purpose

Convert the AI-native claim from an assertion into a described, checkable process.

Answers three questions in order of importance: what actually happens between a problem and a release; where human judgement enters; how correctness is established when code arrives faster than it can be read line by line.

## 2. Audience

Layer 2 and layer 3, and — decisively — the collaborator, for whom this is the single most relevant surface on the site.

## 3. Narrative goal

**Entering:** curiosity, or unresolved skepticism band 2 of the homepage only partly satisfied.
**Leaving:** trust — specifically, "this person will tell me when something is going wrong."
**Pivotal beat:** Failure modes. A process page with no stated failure modes reads as marketing and loses this reader entirely.
**Exit action:** into a case study where the method is visible in practice, or `/connect`.

Density `default`.

---

## 4. Mobile — 375 px

```
┌───────────────────────────────────────┐
│ Jigar Gajjar            ☰{menu} {theme}│
├───────────────────────────────────────┤
│ H1  Workflow                          │
│                                       │
│ Engineering is no longer constrained  │  ← THESIS region
│ by writing code. It is constrained by │
│ making correct technical decisions.   │
│                                       │
│ This is the process that follows from │
│ that. It is not a philosophy — it is  │
│ what actually happens between a       │
│ problem and a release, including the  │
│ parts that go wrong.                  │
│                          ⟨--space-section-md⟩
├───────────────────────────────────────┤
│ H2  The sequence                      │  ← PROCESS OVERVIEW
│                                       │    ordered list, not
│  1  Problem                           │    a Timeline — see
│  2  Architecture                      │    Component Mapping
│  3  Decision records                  │
│  4  Planning                          │
│  5  Implementation with Claude Code   │
│  6  Verification                      │
│  7  Testing                           │
│  8  Review                            │
│  9  Release                           │
│ 10  Retrospective                     │
│                                       │
│ Ten stages. Four are delegated. The   │
│ other six are not, and that division  │
│ is the whole argument.                │
│                          ⟨--space-section-md⟩
├───────────────────────────────────────┤
│ H2  Ownership                         │  ← OWNERSHIP MODEL
│                                       │
│ ┌───────────────────────────────────┐ │
│ │ OWNED          Problem            │ │
│ │                Architecture       │ │
│ │                Decision records   │ │
│ │                Verification       │ │
│ │                Review             │ │
│ │                Retrospective      │ │
│ ├───────────────────────────────────┤ │
│ │ DELEGATED      Planning detail    │ │
│ │                Implementation     │ │
│ │                Testing            │ │
│ │                Release mechanics  │ │
│ └───────────────────────────────────┘ │
│                                       │
│ The objection this answers: if agents │
│ write the code, do I understand it?   │
│ I define what correct means and I     │
│ verify it. I do not type the          │
│ implementation, and I do not delegate │
│ the definition of correct.            │
│                          ⟨--space-section-md⟩
├───────────────────────────────────────┤
│ H2  Each stage                        │  ← STAGE DETAIL
│                                       │
│ H3  1 · Problem                       │
│ Input   ‹OWNER: 1 line›               │
│ Output  ‹OWNER: 1 line›               │
│ Owner   Human                         │
│ Done when  ‹OWNER: 1 line›            │
│ ───────────────────────────────       │
│ H3  2 · Architecture                  │
│ ⟨same four-field shape ×10⟩           │
│                          ⟨--space-section-md⟩
├───────────────────────────────────────┤
│ H2  How I know it is correct          │  ← VERIFICATION MODEL
│                                       │    load-bearing section
│ ‹OWNER: 300–500 words — automated     │
│  gates, review discipline, and what   │
│  each catches that the others do not› │
│                          ⟨--space-section-md⟩
├───────────────────────────────────────┤
│ H2  Where this breaks down            │  ← FAILURE MODES
│                                       │    the pivotal beat
│ ┌───────────────────────────────────┐ │
│ │ ▌ Specification ambiguity         │ │  ← Callout, caution
│ │ ▌ ‹OWNER: what it costs, what     │ │
│ │ ▌  compensates›                   │ │
│ └───────────────────────────────────┘ │
│ ┌───────────────────────────────────┐ │
│ │ ▌ Verification gaps               │ │
│ │ ▌ ‹OWNER›                         │ │
│ └───────────────────────────────────┘ │
│ ┌───────────────────────────────────┐ │
│ │ ▌ Volume outpacing review         │ │
│ │ ▌ ‹OWNER›                         │ │
│ └───────────────────────────────────┘ │
│                          ⟨--space-section-md⟩
├───────────────────────────────────────┤
│ H2  See it in practice                │  ← EVIDENCE
│                                       │
│ Every stage above is visible in this  │
│ repository.                           │
│                                       │
│ ‹Specification — docs/ {↗}›           │
│ ‹Decision records — 14 ADRs {↗}›      │
│ ‹CI configuration {↗}›                │
│ ‹Pull requests {↗}›                   │
│                                       │
│ ‹OrchestAI — the method on one        │
│  project {arrow-right}›               │
│                          ⟨--space-section-md⟩
├───────────────────────────────────────┤
│ H2  Notes                             │  ← ENGINEERING NOTES
│                                       │    ADR-014, capped at 6
│ Longer arguments about parts of the   │    rendered inline,
│ process above.                        │    no per-note URL
│                                       │
│ H3  Why verification matters more     │
│     than generation                   │
│ ‹OWNER: 600–1,200 words›              │
│ ───────────────────────────────       │
│ H3  How I review AI-generated code    │
│ ‹OWNER: 600–1,200 words›              │
│ ───────────────────────────────       │
│ H3  Architecture decisions I changed  │
│     my mind about                     │
│ ‹OWNER: 600–1,200 words›              │
│                          ⟨--space-section-lg⟩
├───────────────────────────────────────┤
│ FOOTER                                │
└───────────────────────────────────────┘
```

◇ **The stage sequence is an ordered list, not the Timeline component.** `COMPONENT_GUIDELINES.md` §7 restricts Timeline to project chronology inside a case study. This is a process, not a chronology. `ARCHITECTURE.md` §6.6 explicitly permits "semantic markup styled as a sequence."

◇ **Notes are undated and ordered by relevance to the stages, never by recency** (ADR-014). No index, no feed, no "latest" — those are the mechanisms that create a publishing promise.

◇ **Notes are rendered inline with no URL of their own.** ADR-014 declined notes as routes and the route table is closed.

---

## 5. Tablet — 768 px

```
┌─────────────────────────────────────────────────────┐
│ H2  The sequence                                     │
│  1 Problem            6 Verification                 │  ← two columns
│  2 Architecture       7 Testing                      │    reading order
│  3 Decision records   8 Review                       │    stays 1→10
│  4 Planning           9 Release                      │    column-major
│  5 Implementation    10 Retrospective                │
├─────────────────────────────────────────────────────┤
│ H2  Ownership                                        │
│ ┌───────────────────┐ ┌───────────────────┐         │
│ │ OWNED             │ │ DELEGATED         │         │  ← side by side
│ │ 6 stages          │ │ 4 stages          │         │
│ └───────────────────┘ └───────────────────┘         │
├─────────────────────────────────────────────────────┤
│ H2  Each stage — four-field shape, metadata inline   │
│ H3 1 · Problem                                       │
│ Input ────── Output ────── Owner ── Done when ────   │
└─────────────────────────────────────────────────────┘
```

◇ **Column-major ordering in the sequence list** so DOM order and reading order both run 1→10. Row-major would put stage 2 beside stage 1 and break the sequence visually.

---

## 6. Desktop — 1280 px

```
┌───────────────────────────────────────────────────────────────┐
│ ⟨--container-wide⟩                                             │
│ H1  Workflow                                                   │
│ Engineering is no longer constrained by writing code.          │
│ It is constrained by making correct technical decisions.       │
├───────────────────────────────────────────────────────────────┤
│ H2  The sequence                                               │
│ ┌────────────────────────────────────────────────────────┐    │
│ │ 1 Problem → 2 Architecture → 3 Decision records →      │    │  ← full
│ │ 4 Planning → 5 Implementation → 6 Verification →       │    │    shape
│ │ 7 Testing → 8 Review → 9 Release → 10 Retrospective    │    │    visible
│ └────────────────────────────────────────────────────────┘    │    at once
│                                                                │
│ ◇ Still an <ol>. Arrows are CSS pseudo-content, not markup,    │
│   and are hidden from assistive technology.                    │
├───────────────────────────────────────────────────────────────┤
│ H2  Ownership                                                  │
│ ┌────────────────────────┐ ┌────────────────────────┐         │
│ │ OWNED — 6              │ │ DELEGATED — 4          │         │
│ └────────────────────────┘ └────────────────────────┘         │
├───────────────────────────────────────────────────────────────┤
│ ⟨--container-prose 68ch for all remaining sections⟩            │
│ H2 Each stage · H2 How I know it is correct ·                  │
│ H2 Where this breaks down · H2 See it in practice · H2 Notes   │
├───────────────────────────────────────────────────────────────┤
│ FOOTER                                                         │
└───────────────────────────────────────────────────────────────┘
```

◇ **The sequence renders as content, not as an animation.** Complete and readable with JavaScript disabled and under reduced motion (`ARCHITECTURE.md` §6.6). Any motion is an entrance reveal at most.

---

## 7. Component mapping

| Element | Component | Source |
|---|---|---|
| Stage sequence | Semantic `<ol>` — **not** Timeline | `ARCHITECTURE.md` §6.6 |
| Ownership split | Generic card ×2, non-interactive | `COMPONENT_GUIDELINES.md` §4.2 |
| Failure modes | Callout, `caution` variant | §8.1 |
| Evidence links | Link, outbound `{arrow-up-right}` | §2.1 |
| Stage detail, notes | Prose primitives | `ARCHITECTURE.md` §3 |

**No new components.** The near-miss — using Timeline for the sequence — was rejected as misuse.

## 8. Ledger mapping

| Section | Resolves |
|---|---|
| Thesis | Framing |
| Sequence + Ownership | H5 is the claim substance · C2 what they own vs delegate |
| Stage detail | C1 how they make decisions |
| Verification model | H5 · S3 do they know what correct means |
| Failure modes | **C3 what happens when things go wrong** |
| Evidence | S1 does the artifact match the claim |
| Notes | C5 communication quality |

## 9. Design rationale

**Failure modes is the pivotal section and it is not buried.** A collaborator has no interview process to fall back on; they are deciding whether this person will tell them when something is going wrong. This is why the section is three explicit callouts rather than a paragraph.

**The ownership split is the objection answer, made structural.** A two-column list of what is and is not delegated is checkable in five seconds. Prose making the same point takes a paragraph and is easier to disbelieve.

**Notes sit last, under a heading that promises nothing.** "Notes" with no dates and no ordering by recency cannot fall behind a publishing rhythm — which is the entire mechanism of `FOUNDATION.md` §12's blog objection.

**The page describes; it does not argue.** `EXPERIENCE_PRINCIPLES.md` §8 names *defensive* as a failure mode. No sentence here pre-empts a critic who has not spoken.

## 10. What was deliberately removed

- **An animated or scroll-driven stage sequence** — the obvious treatment, and it would delay content, break without JavaScript, and violate the reduced-motion path
- **A diagram of the process** — the ordered list *is* the diagram; an SVG would add bytes and remove selectable text
- **Per-note pages** — ADR-014; would create routes outside the frozen table
- **Dates on notes** — reintroduces the cadence signal the decision exists to avoid
- **A "why AI-native" persuasion section** — the process is the argument
- **Tooling logos** — `FOUNDATION.md` §12 non-goal

## 11. Accessibility

One `<h1>`. Seven `<h2>` regions; stage entries and note titles are `<h3>`. Sequence is `<ol>` so position and count are announced. Desktop arrows are pseudo-content, `aria-hidden`. Ownership cards are `<ul>`s inside labelled regions. Tab order: skip → header → nav → theme → evidence links → case-study link → footer.

## 12. Open questions

None blocking. Note count is capped at six; three are drafted here.

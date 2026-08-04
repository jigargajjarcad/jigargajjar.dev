# Wireframes — Phase 4

**Status:** In progress — Phase 4 deliverable
**Owner:** Jigar Gajjar
**Last reviewed:** 2026-08-04
**Governed by:** [`ROADMAP.md`](../ROADMAP.md) §5 · specification sources per route listed there

Implementation-ready wireframes for all eight routes. These are **contracts for Phase 5**, not visual designs. They answer what belongs on a page, in what order, what receives emphasis, and what was deliberately removed. They do not answer what it should look like.

**Authoring order is mobile → tablet → desktop** (`ROADMAP.md` §4). Mobile defines the architecture; desktop is refinement. Every wireframe below was drawn at 375 px first.

---

## 1. Files

| # | Route | File |
|---|---|---|
| 1 | `/` | [`01-home.md`](./01-home.md) |
| 2 | `/work` | [`02-work.md`](./02-work.md) |
| 3 | `/work/[slug]` | [`03-case-study.md`](./03-case-study.md) |
| 4 | `/workflow` | [`04-workflow.md`](./04-workflow.md) |
| 5 | `/about` | [`05-about.md`](./05-about.md) |
| 6 | `/connect` | [`06-connect.md`](./06-connect.md) |
| 7 | `/resume` | [`07-resume.md`](./07-resume.md) |
| 8 | `/404` | [`08-404.md`](./08-404.md) |

---

## 2. Notation

```
┌───────────────┐   Region boundary (not a visible border)
├───────────────┤   Hairline — --color-border-subtle, 1 px
▓▓▓▓▓▓▓▓▓▓▓▓▓   Image, diagram, or media placeholder
[ Label ]         Button
‹Label›           Link
H1 H2 H3 H4       Heading level — semantic, not size
▸                 List item
· · · · · ·       Fold line at 375 × 600
⟨token⟩           Spacing or container token applied here
◇ NOTE            Annotation
```

**Greyscale only. No colour, no typography styling, no shadows, no icons rendered.** Where the specification calls for an icon, it appears as its documented name in braces — `{arrow-right}` — because rendering it would be visual polish and the icon set is already frozen (`ICONOGRAPHY.md` §7).

**Widths drawn:** mobile 375 px, tablet 768 px, desktop 1280 px. Breakpoint behaviour changes at `--bp-sm` 640, `--bp-md` 900, `--bp-lg` 1280 (`TOKENS.md` §3.6).

---

## 3. Copy convention

**Real copy throughout.** No lorem ipsum, no "Heading here," no sample text. Copy is either quoted verbatim from the frozen documentation or drafted against `CONTENT_STRATEGY.md`.

One exception, marked explicitly:

```
‹OWNER: 40–60 words — the retrieval decision, its rejected
 alternative, and the constraint that decided it›
```

**A slot marked `‹OWNER›` is a factual claim about a real project that only Jigar can make.** These appear where the specification requires a specific engineering decision, metric, or outcome from OrchestAI, NovaMind AI, or Edge10. Writing plausible-sounding content into them would be fabricating facts about real work, and fabricated copy in a wireframe has a way of surviving into production. Each slot states its word budget and exactly what it must contain, so the wireframe still proves the density.

Everything else — positioning, competency stories, philosophy, section framing, navigation, error copy — is real and final.

---

## 4. Global shell

Present on every route. Drawn once here; referenced, not repeated, in each file.

```
┌─────────────────────────────────────────┐
│ ‹Skip to content›        (visible on focus only)
├─────────────────────────────────────────┤
│ Jigar Gajjar                    ☰ {menu} │  ← header, not sticky
├─────────────────────────────────────────┤
```

**Header** (`COMPONENT_GUIDELINES.md` §3.1). Wordmark left; navigation right; theme control adjacent **at `--bp-sm` and above only**. Not sticky — it consumes vertical space on the surface where it matters most, and a sticky element is the commonest cause of focus being obscured. Below `--bp-sm` navigation collapses to the `{menu}` toggle and an overlay panel (§3.2), and the theme control moves to the footer — §3.3 places it there "at narrow widths." It appears in exactly one location at any given width; rendering it in both would put two identical controls on one page and two identical stops in the tab order.

**Primary navigation, four items:** Work · Workflow · About · Connect. Under the documented maximum of five, with `/resume` and `/404` excluded per §3.1. Current route marked by weight 600 **and** `aria-current="page"` — never colour alone.

**Footer** (`COMPONENT_GUIDELINES.md` §3.3), on every route, separated by `--space-section-lg`:

```
├─────────────────────────────────────────┤
│ H2  Get in touch                        │
│ Open to senior engineering roles and    │
│ collaboration on AI infrastructure.     │
│                                         │
│ jigargajjarcad@gmail.com  ‹mailto›      │  ← plaintext + link
│ ‹GitHub {arrow-up-right}›               │
│ ‹LinkedIn {arrow-up-right}›             │
│ ‹Résumé›                                │
│                                         │
│ {theme}   (below --bp-sm only)          │
│ © 2026 Jigar Gajjar                     │
└─────────────────────────────────────────┘
```

The footer is the terminal action for every route (`ARCHITECTURE.md` §4 — no route is a dead end) and resolves ledger **R5** and **C9** everywhere. The address appears as selectable plaintext beside the `mailto:` link, resolving `INTERACTION.md` §16 open question 3.

---

## 5. Quality gate

Every wireframe in this directory satisfies:

- Real copy, or an `‹OWNER›` slot with a stated contract
- Mobile drawn first, then tablet, then desktop
- Greyscale, no styling, no rendered icons
- Every element maps to a documented component — no inventions
- One `<h1>`; heading levels never skip
- Landmarks marked; tab order stated and matching visual order
- Every interactive target ≥ 44 × 44 px
- Density within `CONTENT_STRATEGY.md` §6
- Exit action present
- Ledger questions annotated per section (`EXPERIENCE_FLOW.md` §5)
- What was cut is stated

**No new components were required.** Three cases came close and were resolved inside existing documentation rather than by invention:

| Requirement | Resolved by |
|---|---|
| `/workflow` stage sequence | Semantic ordered-list markup, permitted by `ARCHITECTURE.md` §6.6. **Not** the Timeline component — `COMPONENT_GUIDELINES.md` §7 restricts that to project chronology |
| Homepage band 4 | Composed section, not project cards, per `HOMEPAGE_NARRATIVE.md` §4 band 4 constraint |
| Résumé entries | Composed section over semantic HTML; `ROUTE_SPECIFICATIONS.md` §3 requires prose, not bullets |

All three live in `components/sections/`, which `ARCHITECTURE.md` §3 already anticipates.

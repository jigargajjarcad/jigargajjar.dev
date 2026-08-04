# Design System

**Status:** Active — Phase 2 deliverable, no implementation exists
**Version:** 0.1.0
**Owner:** Jigar Gajjar
**Last reviewed:** 2026-08-04
**Governed by:** [`FOUNDATION.md`](../FOUNDATION.md) §8 · [`ARCHITECTURE.md`](../ARCHITECTURE.md) §8–§9 · [`DECISIONS.md`](../DECISIONS.md) ADR-006, ADR-011

This is the entry point to the design system. It defines what the system is, what it is not, how its documents relate, and how it changes over time. The specific rules live in the sibling documents.

The system exists to make implementation mechanical. When implementation begins in Phase 5, no component decision should require design deliberation — every value, state, and behavior should be resolvable by reading these documents. Where that is not yet true, this document says so explicitly in §8.

---

## 1. What this system is for

Three jobs, in priority order.

**1. Make the artifact evidence.** `FOUNDATION.md` §1 states that the build is the first case study. A design system that produces a fast, legible, keyboard-operable, honestly-degrading interface *is* the argument, running in the reader's browser before they open anything. Every rule here is downstream of that.

**2. Make consistency automatic rather than remembered.** `FOUNDATION.md` §8: "Memorability comes from a coherent system applied without exception, not from a signature effect." A system where the correct choice is the easy choice produces consistency without vigilance. A system that relies on discipline produces drift.

**3. Make the design decisions inheritable.** A future maintainer — likely the author, two years out, with no context — should be able to determine not just what the value is but why it is that value, and what would have to change for it to be different. This is `FOUNDATION.md` §7: document decisions, not just outcomes.

---

## 2. What this system is not

- **Not a component library.** `FOUNDATION.md` §12 lists a design-system showcase as a non-goal. There will be no `/components` route, no Storybook deployment, no kitchen-sink page. Components exist because pages need them.
- **Not general-purpose.** This system serves one site with eight routes and four content types. It is deliberately underpowered — no theming API beyond light/dark, no density API beyond three fixed modes, no variant matrix beyond what the pages use. Generality that nothing consumes is cost without benefit.
- **Not an implementation guide.** These documents specify behavior, values, and rationale. They do not contain JSX, Tailwind class strings, or CSS beyond the occasional token declaration used to make a value unambiguous.
- **Not a style guide in the branding sense.** There is no logo system, no illustration library, no photographic direction. The visual language is typographic (see `VISUAL_LANGUAGE.md`).

---

## 3. Design principles, restated as constraints

`FOUNDATION.md` §8 states eight design principles. They are the authority. This section restates each as the specific constraint it imposes on this system, so that a reviewer can check compliance rather than interpret intent.

| Principle (`FOUNDATION.md` §8) | Constraint imposed here |
|---|---|
| Craft is demonstrated by restraint | Two webfont families, four weight values, one accent hue, two elevation levels, four motion durations, one closed icon set. Adding to any of these lists requires a decision record |
| Typography is editorial, not decorative | One modular scale with a fixed ratio; hierarchy legible in greyscale; tabular figures wherever numbers are compared; 68ch prose measure |
| Space is a design element with a budget | Two scales — component spacing and section rhythm — with three named density modes bound to surface, not to preference |
| Motion is purposeful or absent | Closed pattern set (four patterns); `transform` and `opacity` only; reduced-motion is a designed path, not a degradation |
| Every visual decision serves readability, storytelling, or perceived quality | Each rule in these documents states which of the three it serves. A rule that serves none is removed |
| Contrast and legibility are non-negotiable | Body text targets 7:1 (AAA), not the 4.5:1 floor. Reduced-opacity text is not an available technique — opacity is reserved for non-text |
| Consistency is the memorable part | Three-layer tokens (§5); a hard-coded value in a component is a defect (`ARCHITECTURE.md` §3, rule 5) |
| The system degrades honestly | Every surface specified at 320 px, at 200% zoom, without JavaScript, without webfonts, under reduced motion, and under forced colors |

---

## 4. Document map

| Document | Owns | Depends on |
|---|---|---|
| `DESIGN_SYSTEM.md` | Purpose, principles, governance, declared authority | — |
| `EXPERIENCE_PRINCIPLES.md` | Emotional register, reader journey, memorable moments, failure modes | Visual Language |
| `EXPERIENCE_FLOW.md` | Entry points, route jobs, per-audience journeys, question ledger, leak points | Experience Principles |
| `HOMEPAGE_NARRATIVE.md` | The homepage argument — belief over time, band order, emotional progression | Experience Flow |
| `ROUTE_SPECIFICATIONS.md` | Content specifications for `/work`, `/about`, `/resume` | Experience Flow |
| `CONTENT_STRATEGY.md` | Editorial voice — tone, rhythm, density, terminology, forbidden language | Experience Principles |
| `VISUAL_LANGUAGE.md` | Expressive character, layout grammar, compositional devices, rejections | Typography, Color, Spacing |
| `TYPOGRAPHY.md` | Typefaces, scale, rhythm, measure, emphasis, optical rules | Spacing |
| `COLOR_SYSTEM.md` | Neutral ramp, accent, semantic roles, surfaces, elevation, themes | — |
| `SPACING.md` | Base unit, component scale, section rhythm, density modes, layout containers | Typography |
| `MOTION.md` | Duration and easing tokens, patterns, stagger, hover, transitions, reduced motion | — |
| `INTERACTION.md` | Behavioural rules — input modalities, navigation, loading, empty and error states, feedback | Motion, Accessibility |
| `ICONOGRAPHY.md` | Icon set, grid, stroke, sizing, semantics, usage limits | Color, Spacing |
| `IMAGERY.md` | Editorial asset strategy — what may be shown, and how it is treated | Visual Language, Iconography |
| `COMPONENT_GUIDELINES.md` | Per-component behavior, states, structure, constraints | All of the above |
| `ACCESSIBILITY.md` | Design-level accessibility requirements and verification | All of the above |
| `TOKENS.md` | Token architecture, naming grammar, full token inventory, versioning | All of the above |

**Reading order for a new maintainer:** `DESIGN_SYSTEM.md` → `EXPERIENCE_PRINCIPLES.md` → `VISUAL_LANGUAGE.md` → `TOKENS.md` → whichever specific document the task touches.

**The three experiential documents answer different questions.** `EXPERIENCE_PRINCIPLES.md` asks what the reader should feel; `VISUAL_LANGUAGE.md` asks what the site should look like; `INTERACTION.md` asks how it should behave. When they appear to conflict, the order of authority is Experience → Visual Language → Interaction, because feeling is the outcome the other two exist to produce.

### Declared authority

Several ideas are legitimately discussed in more than one document, because each needs them in its own context. Repetition is not duplication when authority is declared. Where two documents disagree, this table decides.

| Idea | Authority | Also appears in, deferring |
|---|---|---|
| Audience needs, exit actions, failure modes | `FOUNDATION.md` §4 | `EXPERIENCE_PRINCIPLES.md` §4, `EXPERIENCE_FLOW.md` §4 |
| Audience emotional state | `EXPERIENCE_PRINCIPLES.md` §4 | `EXPERIENCE_FLOW.md` §4, `HOMEPAGE_NARRATIVE.md` §6 |
| Journey sequence and entry points | `EXPERIENCE_FLOW.md` §2, §4 | `HOMEPAGE_NARRATIVE.md` §7 |
| Homepage band structure and order | `HOMEPAGE_NARRATIVE.md` §4–§5 | `EXPERIENCE_FLOW.md` §6 |
| Which routes exist | `ARCHITECTURE.md` §4 | Everywhere |
| Route content specifications | `ROUTE_SPECIFICATIONS.md`, or the route's own document per `ROADMAP.md` §5 | `EXPERIENCE_FLOW.md` §3 (jobs only) |
| Token values | `TOKENS.md` | All topic documents |
| Motion timing and patterns | `ARCHITECTURE.md` §9, then `MOTION.md` | `INTERACTION.md`, `VISUAL_LANGUAGE.md` |
| Editorial voice | `CONTENT_STRATEGY.md` | All content-bearing specifications |
| Content storage and schema | `ARCHITECTURE.md` §6 | `CONTENT_STRATEGY.md` header disambiguates the two |

**Precedence.** `FOUNDATION.md` and `ARCHITECTURE.md` outrank every document here. Within this directory, `TOKENS.md` is authoritative on values; the topic documents are authoritative on rules and rationale. If a value in a topic document disagrees with `TOKENS.md`, `TOKENS.md` is correct and the topic document is stale.

---

## 5. Token architecture

Three layers, each with one job. This structure is conventional, well-documented elsewhere, and adopted here because the alternative — a flat set of values referenced directly — makes theming impossible without a rename and makes every component a place where a global decision can be quietly overridden.

```
Primitive        raw values, no meaning
  --neutral-800, --type-700, --space-6, --duration-base
       ↓
Semantic         purpose, theme-aware
  --color-text-primary, --type-heading-2, --space-section-md
       ↓
Component        one component's use of a purpose
  --button-padding-inline, --card-border-color
```

**Rules.**

1. **Components reference semantic tokens. Never primitives.** A component that reaches past the semantic layer has hard-coded a theme decision.
2. **Semantic tokens reference primitives. Never other semantic tokens.** Chained aliases make the resolved value unpredictable and turn a one-line change into an investigation.
3. **The component layer is optional and is the exception.** It exists only where a component needs a value that no semantic token expresses. Most components need none. A proliferating component layer means the semantic layer is under-specified.
4. **Theme switching happens exclusively at the semantic layer.** Primitives are theme-invariant; components are theme-unaware. Only the semantic layer knows what "light" means.
5. **Every token is documented in `TOKENS.md` with its purpose.** An undocumented token is indistinguishable from an accident.

Full inventory, naming grammar, and versioning policy: `TOKENS.md`.

### Alternative considered: two layers (primitive → component)

Simpler, and adequate for a single-theme site. Rejected because light and dark are both first-class (`ARCHITECTURE.md` §8), and with two layers every component would need to know about both themes. The semantic layer is what makes a component theme-unaware, and theme-unaware components are what makes the dark theme cheap to maintain rather than a parallel system.

### Alternative considered: HSL for color

The common recommendation, and the one the token-architecture reference this system was checked against suggests, largely because HSL makes opacity manipulation straightforward. Rejected in favor of OKLCH: HSL's lightness is not perceptually uniform, so a ramp with evenly-spaced `L` values produces steps that look unevenly spaced, and contrast has to be verified per-pair by trial. OKLCH lightness corresponds to perceived lightness, which makes the ramp predictable and contrast reasoning approximately arithmetic. Rationale in full: `COLOR_SYSTEM.md` §2. The opacity argument does not apply here because this system does not use color opacity on text at all.

---

## 6. Governance

**Adding a value to a closed set** — a fifth motion duration, a third font weight, a second accent hue, a fifteenth icon — requires a written justification recorded in the relevant document's changelog, stating what the addition enables that the existing set cannot. Closed sets are the mechanism by which restraint survives contact with deadlines; a set that grows on request is not closed.

**Changing a token value** is a version event (§7) and requires checking every consumer. `TOKENS.md` records which surfaces consume each semantic token for exactly this reason.

**Removing a token** requires a deprecation period: mark deprecated in `TOKENS.md`, remove consumers, then remove the token in the next minor version. Never remove and rename in the same change.

**Overriding the system in a component** is a defect, not a decision. If a component needs a value the system does not provide, the system is wrong and gets amended. The escape hatch is the component token layer, and using it requires documenting why in `COMPONENT_GUIDELINES.md`.

---

## 7. Versioning

The system is versioned semantically, independently of the site.

- **Major** — a change that requires revisiting every surface. A typeface change, a scale ratio change, a restructuring of the token layers.
- **Minor** — a new token, a new component specification, a new pattern, a non-breaking value change.
- **Patch** — corrections, clarifications, documentation fixes that change no value.

Version is recorded in the header of this document. Each topic document carries a changelog section. The current version is `0.1.0`: complete as a specification, unvalidated against an implementation. It becomes `1.0.0` when every specification here has been built at least once and the open questions in §8 are closed.

---

## 8. Decisions previously held open

All six were resolved and frozen at the close of Phase 2 and Phase 3. `ROADMAP.md` §2 is the freeze register; this table records where each is specified and what reversing it would now cost.

| # | Decision | Status | Specified in | Cost of changing now |
|---|---|---|---|---|
| 1 | **Typeface selection** — Newsreader (display) + Inter (text) | Frozen, Phase 2 | `TYPOGRAPHY.md` §2 | High. Every vertical rhythm value, measure, and optical adjustment is calibrated to specific font metrics |
| 2 | **Serif display thesis** | Frozen, Phase 2 | `VISUAL_LANGUAGE.md` §3 | Very high. Reverses the visual thesis |
| 3 | **Accent hue** — OKLCH hue 220, an azure-petrol | Frozen, Phase 2 (monochrome posture) | `COLOR_SYSTEM.md` §4 | Low, but it is the tightest contrast pair in the system at 4.8:1. Any revision must clear 4.5:1 in *both* themes |
| 4 | **Elevation without shadows** | Frozen, Phase 2 | `COLOR_SYSTEM.md` §6 | Medium. Affects every card, callout, and overlay specification |
| 5 | **No page transitions** — declined, with reasoning | Frozen, Phase 2 (motion philosophy) | `MOTION.md` §8 | Adopting them requires an ADR per `ARCHITECTURE.md` §9 |
| 6 | **Theme default** — follow `prefers-color-scheme`, with an explicit override control | Frozen, Phase 3 | `COLOR_SYSTEM.md` §8 | Low |

**Nothing in this system is provisional.** Changing any decision above requires an ADR (`ROADMAP.md` §6). The two questions that remain genuinely open are recorded in `EXPERIENCE_FLOW.md` §12 and neither blocks implementation.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-08-04 | Initial system specification. Phase 2. |

# Tokens

**Status:** Active — specification only
**Version:** 0.1.0
**Last reviewed:** 2026-08-04
**Governed by:** [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) §5 · [`ARCHITECTURE.md`](../ARCHITECTURE.md) §3, §8

**This document is authoritative on values.** Where a topic document and this document disagree, this one is correct and the topic document is stale (`DESIGN_SYSTEM.md` §4).

All values originate here and in `src/design/tokens.ts`; Tailwind's theme is derived from that file. A hard-coded value in a component is a defect (`ARCHITECTURE.md` §3, rule 5).

---

## 1. Architecture

Three layers (`DESIGN_SYSTEM.md` §5):

```
Primitive    raw values, no meaning, theme-invariant
     ↓
Semantic     purpose, theme-aware — the layer components consume
     ↓
Component    one component's use of a purpose — rare, exceptional
```

**The five rules, restated because they are the whole point of the structure.**

1. Components reference semantic tokens. Never primitives.
2. Semantic tokens reference primitives. Never other semantic tokens.
3. The component layer is optional and exceptional.
4. Theme switching happens only at the semantic layer.
5. Every token is documented here with its purpose.

**Rule 2 is the one most likely to be broken** and the most damaging. A semantic token aliasing another semantic token means a value change propagates through a chain nobody can see, and it makes `--color-text-primary` unresolvable without following three hops. If two semantic tokens need the same value, both point at the same primitive.

---

## 2. Naming grammar

```
--{category}-{concept}-{variant?}-{state?}
```

| Part | Rule |
|---|---|
| `category` | `color`, `type`, `space`, `duration`, `ease`, `icon`, `container`, `bp`, `radius`, `border` |
| `concept` | What it is for, in the vocabulary of the design documents — `text`, `surface`, `border`, `interactive`, `heading-2`, `section-md` |
| `variant` | Where a concept has kinds — `primary`, `secondary`, `subtle`, `strong` |
| `state` | Interaction state only — `hover`, `pressed` |

**Primitives are named by scale position, not by appearance.** `--neutral-800`, not `--grey-dark`. `--type-600`, not `--type-xl`. Appearance-based names become lies the moment a value changes; position-based names stay true.

**Semantic tokens are named by purpose, never by appearance or by consumer.** `--color-text-secondary` is correct. `--color-text-grey` describes a value that may change. `--color-card-text` describes a consumer, which forces a new token for every component that needs the same thing.

**T-shirt sizes are not used for type or space.** `sm`/`md`/`lg` carry no information about relationship — a maintainer cannot tell whether `lg` is one step or three above `md`. Numeric scales make the relationship visible. They are retained only for `--icon-*`, `--space-section-*`, and `--container-*`, where the sets are three items and the relationships are self-evident.

---

## 3. Primitive tokens

### 3.1 Colour

Authored in OKLCH (`COLOR_SYSTEM.md` §2). A hex fallback is generated per primitive; it is never hand-maintained.

**Neutral ramp** — hue 250, chroma 0.004–0.012.

| Token | `L` | `C` |
|---|---|---|
| `--neutral-0` | 0.995 | 0.004 |
| `--neutral-50` | 0.980 | 0.005 |
| `--neutral-100` | 0.962 | 0.006 |
| `--neutral-200` | 0.925 | 0.008 |
| `--neutral-300` | 0.870 | 0.010 |
| `--neutral-400` | 0.740 | 0.012 |
| `--neutral-500` | 0.620 | 0.012 |
| `--neutral-600` | 0.520 | 0.012 |
| `--neutral-700` | 0.410 | 0.011 |
| `--neutral-800` | 0.300 | 0.010 |
| `--neutral-900` | 0.215 | 0.008 |
| `--neutral-950` | 0.165 | 0.006 |
| `--neutral-1000` | 0.120 | 0.005 |

**Accent ramp** — hue 220.

| Token | `L` | `C` |
|---|---|---|
| `--accent-400` | 0.780 | 0.100 |
| `--accent-500` | 0.700 | 0.120 |
| `--accent-600` | 0.560 | 0.140 |
| `--accent-700` | 0.480 | 0.145 |
| `--accent-800` | 0.400 | 0.130 |

**Status ramps** — hue 150 (positive), 75 (caution), 25 (critical). Four steps each: `-text-light`, `-text-dark`, `-tint-light`, `-tint-dark`. Values are derived to meet the contrast floors in `ACCESSIBILITY.md` §3 against their respective surfaces and are recorded in `tokens.ts` rather than duplicated here, because they are computed from the floors rather than chosen.

### 3.2 Type scale

Fluid via `clamp()` between the 375 px and 1280 px anchors (`TYPOGRAPHY.md` §3).

| Token | Mobile | Desktop |
|---|---|---|
| `--type-100` | 11.5 px | 11.5 px |
| `--type-200` | 14 px | 14.5 px |
| `--type-300` | 17 px | 18 px |
| `--type-400` | 20 px | 22.5 px |
| `--type-500` | 24 px | 28 px |
| `--type-600` | 28 px | 35 px |
| `--type-700` | 32 px | 44 px |
| `--type-800` | 38 px | 55 px |

### 3.3 Font families and weights

| Token | Value |
|---|---|
| `--font-display` | Newsreader Variable, Georgia, serif |
| `--font-text` | Inter Variable, system-ui sans stack |
| `--font-mono` | `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace` |
| `--weight-regular` | 400 |
| `--weight-medium` | 500 — display face only |
| `--weight-semibold` | 600 — text face only |

Four weight values across two families (`ARCHITECTURE.md` §8). `--weight-medium` and `--weight-semibold` are not interchangeable: each is valid in exactly one family.

### 3.4 Space

| Token | Value |
|---|---|
| `--space-0` | 0 |
| `--space-1` | 4 px |
| `--space-2` | 8 px |
| `--space-3` | 12 px |
| `--space-4` | 16 px |
| `--space-5` | 20 px |
| `--space-6` | 24 px |
| `--space-8` | 32 px |
| `--space-10` | 40 px |
| `--space-12` | 48 px |
| `--space-16` | 64 px |
| `--space-20` | 80 px |

Absent steps are deliberate (`SPACING.md` §3).

### 3.5 Motion

| Token | Value |
|---|---|
| `--duration-instant` | 100 ms |
| `--duration-fast` | 160 ms |
| `--duration-base` | 240 ms |
| `--duration-entrance` | 400 ms |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--ease-decelerate` | `cubic-bezier(0.05, 0.7, 0.1, 1)` |
| `--ease-accelerate` | `cubic-bezier(0.3, 0, 0.8, 0.15)` |
| `--stagger-interval` | 60 ms |
| `--stagger-max` | 4 |

Frozen by `ARCHITECTURE.md` §9. Additions require an ADR.

### 3.6 Dimension

| Token | Value |
|---|---|
| `--radius-sm` | 2 px — badges, tags, code blocks, diagram corners |
| `--radius-md` | 4 px — cards, callouts, buttons |
| `--border-hairline` | 1 px |
| `--border-emphasis` | 2 px — callout left rules, focus ring |
| `--icon-sm` | 16 px |
| `--icon-md` | 20 px |
| `--icon-lg` | 24 px |
| `--container-prose` | 68ch |
| `--container-wide` | 1120 px |
| `--container-full` | 100% |
| `--bp-sm` | 640 px |
| `--bp-md` | 900 px |
| `--bp-lg` | 1280 px |

**Two radii only.** A radius scale with five steps produces components whose corner treatment varies for no reason a reader could name. 2 px for small elements, 4 px for containers, 0 for rules and diagram edges.

---

## 4. Semantic tokens

The layer components consume. Every token below is theme-aware.

### 4.1 Colour — text

Measured ratios against `--color-surface-base` (`COLOR_SYSTEM.md` §7).

| Token | Light | Dark | Light ratio | Dark ratio |
|---|---|---|---|---|
| `--color-text-primary` | `--neutral-1000` | `--neutral-50` | 16.2:1 | 13.9:1 |
| `--color-text-secondary` | `--neutral-800` | `--neutral-400` | 9.2:1 | 7.2:1 |
| `--color-text-tertiary` | `--neutral-700` | `--neutral-500` | 6.2:1 | 4.9:1 |
| `--color-text-accent` | `--accent-700` | `--accent-500` | 4.8:1 | 6.4:1 |
| `--color-text-on-accent` | `--neutral-0` | `--neutral-1000` | 4.8:1 | 7.1:1 |

### 4.2 Colour — surface and border

| Token | Light | Dark |
|---|---|---|
| `--color-surface-base` | `--neutral-0` | `--neutral-950` |
| `--color-surface-raised` | `--neutral-50` | `--neutral-900` |
| `--color-surface-sunken` | `--neutral-100` | `--neutral-1000` |
| `--color-surface-overlay` | `--neutral-0` | `--neutral-900` |
| `--color-border-subtle` | `--neutral-200` | `--neutral-800` |
| `--color-border-strong` | `--neutral-600` | `--neutral-500` |

### 4.3 Colour — interaction

| Token | Light | Dark |
|---|---|---|
| `--color-interactive` | `--accent-700` | `--accent-500` |
| `--color-interactive-hover` | `--accent-600` | `--accent-400` |
| `--color-interactive-pressed` | `--accent-800` | `--accent-600` |
| `--color-focus-ring` | `--accent-700` | `--accent-400` |
| `--color-focus-ring-offset` | `--color-surface-base` | `--color-surface-base` |

`--color-focus-ring-offset` is the single sanctioned exception to rule 2 (§1) — it aliases a semantic token rather than a primitive, because its correct value is definitionally "whatever the page surface is." It is documented here so the exception is visible rather than mistaken for drift.

### 4.4 Colour — status

| Token | Purpose |
|---|---|
| `--color-status-positive` / `-tint` | Confirmed callouts; `production`, `released` badges |
| `--color-status-caution` / `-tint` | Constraint callouts; `experimental`, `prototype`, `research` badges |
| `--color-status-critical` / `-tint` | Failure callouts; reversals in Failures & mistakes |

### 4.5 Type

Each token bundles size, family, weight, line height, and tracking (`TYPOGRAPHY.md` §3).

A CSS custom property cannot hold a bundle, so each token below is emitted as five properties — `--type-body-size`, `--type-body-family`, `--type-body-weight`, `--type-body-line-height`, `--type-body-tracking`. There is no bare `--type-body`. Tailwind's `fontSize` tuple binds size, weight, line height, and tracking to a single class so a component cannot apply one and forget the rest; family is the one part applied separately, because it is the display/text boundary and should be visible at the call site.

| Token | Step | Family | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| `--type-display` | 800 | display | 400 | 1.05 | −0.025em |
| `--type-heading-1` | 700 | display | 400 | 1.10 | −0.02em |
| `--type-heading-2` | 600 | display | 400 | 1.15 | −0.015em |
| `--type-heading-3` | 500 | display | 500 | 1.25 | −0.01em |
| `--type-heading-4` | 400 | text | 600 | 1.35 | −0.005em |
| `--type-lede` | 400 | text | 400 | 1.50 | −0.005em |
| `--type-body` | 300 | text | 400 | 1.60 | 0 |
| `--type-body-sm` | 200 | text | 400 | 1.55 | 0 |
| `--type-label` | 200 | text | 600 | 1.30 | 0.01em |
| `--type-caption` | 100 | text | 400 | 1.45 | 0.005em |
| `--type-metric` | 800 | display | 400 | 1.00 | −0.02em |
| `--type-code` | 200 | mono | 400 | 1.55 | 0 |

### 4.6 Space

| Token | Mobile | Desktop |
|---|---|---|
| `--space-section-sm` | 56 px | 80 px |
| `--space-section-md` | 80 px | 128 px |
| `--space-section-lg` | 112 px | 192 px |

Component spacing consumes the primitive scale directly (§3.4). This is a deliberate exception to rule 1: a semantic alias for every spacing step would double the token count without adding meaning, because `--space-4` has no purpose beyond being 16 px. The section scale is semantic because "the space between sections" *is* a purpose.

### 4.7 Density multipliers

| Token | Value | Applied to |
|---|---|---|
| `--density-compact` | 0.75 | Vertical gaps in the layer-1 region, navigation, footer |
| `--density-default` | 1 | Index pages and standard routes |
| `--density-reading` | 1.25 | Case-study bodies |

Applied once, by the container (`SPACING.md` §5). Nested application compounds and is a defect.

---

## 5. Component tokens

**Currently: two.**

The component layer exists for cases the semantic layer cannot express. Each entry records the component, the value, and why no semantic token expresses it — that statement is the check on whether the escape hatch is being used or abused.

| Token | Value | Component |
|---|---|---|
| `--target-min` | 44 px | Every interactive control |
| `--link-underline-offset` | 0.15em | Link |

**`--target-min`** — the minimum interactive target, applied to buttons, navigation items, and menu options. Specified in `COMPONENT_GUIDELINES.md` §2.2 and `ACCESSIBILITY.md` §2, both of which set 44 × 44 px against the WCAG 2.2 floor of 24 × 24, because the reference device is a phone and the cost is zero.

*Why no semantic token expresses it.* It is an accessibility floor, not a spacing step. The nearest values on the component scale are `--space-10` (40 px) and `--space-12` (48 px), and neither is 44. More importantly, binding it to the spacing scale would make a conformance requirement move whenever the scale is retuned — a spacing change could silently drop targets below the minimum. It is a constant that must not drift, which is precisely what the component layer is for.

**`--link-underline-offset`** — the distance between a link's baseline and its underline. Specified in `COMPONENT_GUIDELINES.md` §2.1, which sets the underline as the link affordance with an offset of 0.15em.

*Why it is relative to typography rather than spacing.* The value is optical and proportional to type size: an offset that reads correctly under `--type-body` would collide with descenders at `--type-caption` and float away at `--type-heading-2`. Expressing it in `em` makes it scale with whatever type token the link inherits. Every value on the spacing scale is an absolute length in `rem` and cannot track type size, so no semantic spacing token can express it.

Underline *thickness* deliberately adds no token: it reuses `--border-hairline` (1 px) at rest and `--border-emphasis` (2 px) on hover, which are the values `COMPONENT_GUIDELINES.md` §2.1 specifies.

**The bar for a third entry is unchanged.** A component token is justified only when no semantic token expresses the value *and* binding it to one would be wrong. A proliferating component layer means the semantic layer is under-specified.

---

## 6. Consumers

Recorded so that a value change can be scoped without a search. Maintained as part of any token change.

| Token group | Consumed by |
|---|---|
| `--color-text-*` | Every text-bearing component |
| `--color-surface-*` | Page shell, cards, callouts, code blocks, overlay |
| `--color-border-subtle` | Hairlines, cards, figures, tables, code blocks, header, footer |
| `--color-border-strong` | Secondary buttons, blockquote rules, interactive boundaries |
| `--color-interactive-*` | Links, buttons, card hover, navigation |
| `--color-focus-*` | Every focusable element |
| `--color-status-*` | Callouts, lifecycle badges |
| `--type-display`, `--type-heading-1` | Home hero, case-study title, page headers |
| `--type-heading-2/3/4` | Case-study section headings, card titles, callout headings |
| `--type-body`, `--type-lede` | Prose, summaries |
| `--type-label` | Badges, tags, timeline stages, table headers, eyebrow labels, navigation |
| `--type-caption` | Figure captions, timeline periods, metadata, code language labels |
| `--type-metric` | Metric component only |
| `--type-code` | Code blocks, inline code |
| `--space-section-*` | Page and case-study layouts only |
| `--duration-*`, `--ease-*` | Motion primitives under `components/motion/` only |
| `--container-*` | Page layouts, break-out elements |
| `--icon-*` | Icon component |

---

## 7. Verification

Tokens are enforced, not trusted.

| Check | Blocks merge |
|---|---|
| No hard-coded colour, size, space, or duration outside `tokens.ts` | Yes |
| No component references a primitive token | Yes |
| No semantic token references another semantic token, except `--color-focus-ring-offset` | Yes |
| Every semantic colour pair meets its contrast floor, both themes | Yes |
| Every token in `tokens.ts` appears in this document | Yes |
| Every token in this document exists in `tokens.ts` | Yes |

The last two are bidirectional and matter more than they appear: a token that exists in code but not in documentation is undocumented, and a token documented but absent from code is a specification nobody implemented. Both are silent failures without the check.

---

## 8. Versioning and deprecation

Versioned with the design system (`DESIGN_SYSTEM.md` §7).

| Change | Version impact |
|---|---|
| Adding a token | Minor |
| Changing a semantic token's primitive reference | Minor — requires re-verifying contrast and checking §6 consumers |
| Changing a primitive value | Minor or major, depending on reach |
| Renaming a token | Major |
| Removing a token | Major, and only after a deprecation cycle |
| Restructuring the layers | Major |

**Deprecation cycle.** Mark deprecated here with the replacement named → migrate every consumer in §6 → remove in the next minor version. Never remove and rename in the same change: a maintainer resolving a build error can find a renamed token, and cannot find one that was deleted.

---

## 9. Maintenance implications

- **The bidirectional documentation check (§7) is what keeps this document true.** Without it, this becomes a stale snapshot within two changes, and a stale token reference is worse than no reference because it will be trusted.
- **The consumer table (§6) is the highest-maintenance item here and the most valuable.** It converts "change this value and see what breaks" into a bounded review.
- **Rule 2 will be broken first at the status tokens**, where a `-tint` naturally wants to reference its `-text` sibling. It must not. Both point at primitives.
- **The absence of component tokens (§5) is a property worth defending.** The first one added makes the second easier to justify.
- **Density multipliers are the subtlest failure mode in the system.** Applied twice, they produce spacing that is wrong only on nested surfaces, which is exactly where nobody looks.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-08-04 | Initial token inventory. |

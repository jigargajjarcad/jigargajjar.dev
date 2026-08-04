# Color System

**Status:** Active — specification only
**Version:** 0.1.0
**Last reviewed:** 2026-08-04
**Governed by:** [`ARCHITECTURE.md`](../ARCHITECTURE.md) §8, §11 · [`FOUNDATION.md`](../FOUNDATION.md) §8 · ADR-005

The system is functionally monochrome. A neutral ramp carries the interface, one accent hue serves four interactive roles, and three semantic hues appear almost nowhere. This document explains why, defines every value, and specifies how colour maps to meaning.

---

## 1. Constraints inherited

| Constraint | Source |
|---|---|
| One neutral ramp carrying most of the interface | `ARCHITECTURE.md` §8 |
| One accent, used sparingly for interactive affordances and emphasis | `ARCHITECTURE.md` §8 |
| Semantic tokens for callouts | `ARCHITECTURE.md` §8 |
| Light and dark both first-class, defined as token sets rather than filters or inversions | `ARCHITECTURE.md` §8 |
| Honour `prefers-color-scheme` with an optional explicit override | `ARCHITECTURE.md` §8 |
| 4.5:1 body text · 3:1 large text and UI components · 3:1 focus indicators against adjacent colours | `ARCHITECTURE.md` §8 |
| Reduced-opacity body text is not an available technique | `ARCHITECTURE.md` §8 |
| No meaning conveyed by colour alone | `ARCHITECTURE.md` §11 |

---

## 2. Colour space: OKLCH

All primitives are authored in OKLCH.

**Why.** Three concrete reasons, all of which reduce work rather than add sophistication.

*Perceptual uniformity.* In OKLCH, the `L` channel corresponds to perceived lightness. A ramp with evenly-spaced `L` values looks evenly spaced. In HSL it does not — HSL lightness is a mathematical midpoint between the colour and white or black, so `hsl(220 90% 50%)` and `hsl(60 90% 50%)` have wildly different apparent brightness. Building a twelve-step neutral ramp in HSL means hand-tuning every step by eye and re-tuning whenever the hue changes.

*Contrast becomes predictable.* Because `L` tracks perception, the contrast between two ramp steps is approximately a function of their `L` difference. This makes it possible to reason about which pairings will pass before testing them, rather than testing every pairing and adjusting. Every ratio in §7 is still verified — this makes the first guess right, not the verification unnecessary.

*Hue stability across lightness.* Changing lightness in HSL or HSV shifts perceived hue, which is why HSL ramps often drift purple in the shadows. OKLCH holds hue constant, so a single accent hue works from its lightest to its darkest step without correction.

**Alternative considered: HSL.** The conventional choice, recommended by most token references including the one this system was checked against, largely because it makes alpha manipulation and mental arithmetic easy. Rejected because the alpha argument does not apply — this system does not use colour opacity on text at all (§5) — and because the hand-tuning cost of an HSL ramp is paid every time the palette is touched.

**Alternative considered: hex primitives.** Simplest to read and to paste from a design tool. Rejected because it makes the ramp opaque: a maintainer cannot tell from `#4A5568` whether it is two steps or three from `#2D3748`, so the relationships that make the ramp a system are invisible in the source.

**Fallback.** OKLCH is supported across current browser baselines. A hex fallback is emitted for each primitive so that the site renders correctly on older engines, degrading to a visually near-identical palette rather than to nothing. The fallback is generated, not hand-maintained.

---

## 3. Neutral ramp

One ramp, hue **250** (cool), chroma **0.004–0.012** — barely chromatic, enough to avoid the deadness of pure grey.

**Why a cool cast rather than pure grey or a warm cast.** Pure grey (`C = 0`) reads as flat and slightly clinical on screen, and it is the default that signals no decision was made. A warm neutral reads as paper and pairs beautifully with a serif — genuinely tempting here — but it competes with the accent, drifts toward sepia in dark mode, and carries a nostalgic register at odds with `VISUAL_LANGUAGE.md` §1. A very low-chroma cool neutral reads as precise, pairs with the accent hue without conflict, and stays neutral in both themes. The chroma is low enough that most readers will not perceive it as coloured — it registers as "a good grey."

**Why chroma varies across the ramp.** Chroma is lowest at the extremes and slightly higher in the middle. At near-white and near-black, chroma reads as a colour cast; in the mid-range it reads as depth.

### Primitives

| Token | `L` | `C` | `H` | Role band |
|---|---|---|---|---|
| `--neutral-0` | 0.995 | 0.004 | 250 | Lightest surface |
| `--neutral-50` | 0.980 | 0.005 | 250 | |
| `--neutral-100` | 0.962 | 0.006 | 250 | |
| `--neutral-200` | 0.925 | 0.008 | 250 | Hairlines, light |
| `--neutral-300` | 0.870 | 0.010 | 250 | |
| `--neutral-400` | 0.740 | 0.012 | 250 | Non-text boundaries |
| `--neutral-500` | 0.620 | 0.012 | 250 | |
| `--neutral-600` | 0.520 | 0.012 | 250 | Secondary text, light |
| `--neutral-700` | 0.410 | 0.011 | 250 | |
| `--neutral-800` | 0.300 | 0.010 | 250 | Hairlines, dark |
| `--neutral-900` | 0.215 | 0.008 | 250 | Dark surface |
| `--neutral-950` | 0.165 | 0.006 | 250 | Darkest surface |
| `--neutral-1000` | 0.120 | 0.005 | 250 | Primary text, light theme |

**Neither end is pure.** `--neutral-0` is not `#ffffff` and `--neutral-1000` is not `#000000`.

*Why not pure white.* A full-white page at typical display brightness produces halation around dark text — the glow that makes long reading tiring. Pulling the page surface fractionally off white measurably reduces it at no perceptible cost.

*Why not pure black.* Pure black text on white is higher contrast than necessary and reads as harsh; pure black surfaces in dark mode cause smearing on OLED panels during scroll, and the contrast against light text exceeds what is comfortable for long-form reading. `L = 0.12` still gives 16.8:1 against the page surface, well past AAA.

---

## 4. Accent

One accent hue: **220** — an azure with a slight petrol lean.

> **Requires approval before implementation** — open question 3 in `DESIGN_SYSTEM.md` §8. Low cost to change: one primitive ramp and a contrast re-verification.

**Why hue 220.** The selection criteria were, in order: (1) a single hue must reach 4.5:1 against both the lightest and darkest surfaces without hue-shifting, so that one accent serves both themes; (2) it must be distinguishable from the reference products it will be compared against; (3) it must be conventional enough that a link reads as a link.

Hue 220 satisfies all three. The blue-azure band has the widest usable lightness range against both light and dark neutrals of any hue — which is the engineering reason, not an aesthetic one. It is distinct from Linear's violet (~285) and Stripe's blurple (~265), and far from the violet-to-magenta band that currently marks AI products and will date accordingly. And it remains recognisably a link colour, which matters more than novelty: a reader should never have to test whether something is interactive.

**Alternatives considered.**

*Amber or ochre* — warm, distinctive, pairs beautifully with a serif. Rejected on a hard constraint: warm hues cannot reach 4.5:1 against a light surface without becoming brown, so the accent could not be used for links in prose on the light theme. A colour that only works in one theme is not a system accent.

*Green* — uncommon, calm. Rejected because green carries an unavoidable success/valid semantic. Using it for links makes the semantic layer ambiguous.

*Violet or indigo* — the current default for technical products. Rejected on differentiation: it is the exact hue band the reference products occupy, and it currently signals "AI product" strongly enough to date the site.

*No accent at all* — pure monochrome, links distinguished by underline only. Genuinely considered, and the most restrained option available. Rejected because focus indicators need a colour that is distinguishable from every surface and every border (`ACCESSIBILITY.md` §4), and because an accent used in four functional roles costs nothing while making interactivity unmistakable.

### Primitives

| Token | `L` | `C` | `H` | Use |
|---|---|---|---|---|
| `--accent-400` | 0.780 | 0.100 | 220 | Dark-theme hover |
| `--accent-500` | 0.700 | 0.120 | 220 | Dark-theme default |
| `--accent-600` | 0.560 | 0.140 | 220 | Light-theme hover |
| `--accent-700` | 0.480 | 0.145 | 220 | Light-theme default |
| `--accent-800` | 0.400 | 0.130 | 220 | Light-theme pressed |

**The accent appears in exactly four roles.** Links in prose, focus indicators, active navigation state, and interactive hover affordance. It is not used for headings, borders, backgrounds, decorative elements, badges, or emphasis. If it appears anywhere else, the system has been violated — its scarcity is what makes it read as "this does something."

---

## 5. On opacity

**Colour opacity is never applied to text.** Not for secondary text, not for disabled states, not for placeholders.

**Why.** An opacity value produces an unknown final colour, because it depends on whatever is behind it. That makes contrast unverifiable in principle — the same `rgba(0,0,0,0.6)` passes on one surface and fails on another, and CI cannot catch it because the computed style is compliant while the rendered result is not. Every level of text emphasis therefore has its own token with a measured ratio (§7).

**Where opacity is permitted:** non-text decorative elements, the overlay scrim behind the mobile navigation panel, and the opacity channel of motion (`MOTION.md`). Never on anything a reader reads.

This is the concrete implementation of `ARCHITECTURE.md` §8: "Reduced-opacity body text is not an available refinement technique — hierarchy comes from scale, weight, and space."

---

## 6. Surfaces and elevation

Three surface levels. Elevation is expressed by **surface lightness plus a hairline border** — never by shadow, blur, or translucency.

> **Requires approval before implementation** — open question 4 in `DESIGN_SYSTEM.md` §8.

| Level | Light theme | Dark theme | Used by |
|---|---|---|---|
| `base` | `--neutral-0` | `--neutral-950` | Page background |
| `raised` | `--neutral-50` | `--neutral-900` | Cards, callouts, code blocks, table headers |
| `overlay` | `--neutral-0` | `--neutral-900` | Mobile navigation panel — the only floating element |

Each raised surface additionally carries a 1 px border at `--color-border-subtle`. The lightness step alone is deliberately small; the hairline does most of the separation work.

**Why lightness plus hairline rather than shadows.**

*Shadows are a light-theme technique.* Against a dark surface, a dark shadow is invisible. Dark interfaces therefore substitute a light glow or a brightened border — both of which read as artificial, and the glow costs real compositing time. Lightness plus a hairline behaves identically in both themes with no per-theme special-casing.

*Shadows are the most expensive cheap effect.* A multi-layer shadow on a scrolling element is a repeated composite. The performance budget in `ARCHITECTURE.md` §10 is tight enough that spending frames on depth simulation is not defensible.

*Forced-colors mode strips shadows entirely.* A hierarchy built on shadow disappears for those users; a hierarchy built on borders survives, because borders are among the properties forced-colors preserves (`ACCESSIBILITY.md` §6).

*And the conceptual reason.* This interface is a document with regions, not a stack of physical objects. A hairline states a boundary. A shadow states a fiction about depth that does not exist.

**Alternative considered: a five-level shadow elevation scale.** The conventional approach, well-understood by every developer who would maintain this. Rejected on the maintenance cost of keeping five levels coherent across two themes for an interface that genuinely has three depths, and on the performance cost of the two levels that would go unused.

**The one exception.** The mobile navigation overlay uses a scrim — a semi-transparent neutral over the page behind it. This is opacity on a non-text element, which §5 permits, and it is the only place in the system where one surface obscures another.

---

## 7. Semantic tokens and contrast

The semantic layer is what components consume. No component references a primitive (`DESIGN_SYSTEM.md` §5).

### Text

Ratios below are computed against `--color-surface-base` in each theme and are stated as measured, not as intentions.

| Semantic token | Light | Dark | Floor | Light | Dark |
|---|---|---|---|---|---|
| `--color-text-primary` | `--neutral-1000` | `--neutral-50` | 4.5:1 | **16.2:1** | **13.9:1** |
| `--color-text-secondary` | `--neutral-800` | `--neutral-400` | 4.5:1 | **9.2:1** | **7.2:1** |
| `--color-text-tertiary` | `--neutral-700` | `--neutral-500` | 4.5:1 | **6.2:1** | **4.9:1** |
| `--color-text-accent` | `--accent-700` | `--accent-500` | 4.5:1 | **4.8:1** | **6.4:1** |
| `--color-text-on-accent` | `--neutral-0` | `--neutral-1000` | 4.5:1 | **4.8:1** | **7.1:1** |

**Body text reaches roughly 14–16:1, well past AAA.** `ARCHITECTURE.md` §8 sets 4.5:1 as the floor. This system exceeds it because the cost is zero — it is a choice among ramp steps — and the benefit is real for a site whose primary activity is reading three thousand words. `FOUNDATION.md` §8 states that low-contrast type is the most common way premium is faked; the system is built so that faking it is not available.

**Secondary text sits at AAA (≥ 7:1) in both themes**, which is unusual — secondary text is normally where systems spend their contrast budget. It costs nothing here because the ramp has steps available.

`--color-text-tertiary` is the only token near the floor, and it is restricted to timestamps, image credits, and footer metadata — never to content a reader needs.

**The accent is the tightest pair in the system at 4.8:1 in light.** It clears the floor and has little headroom, which is a consequence of choosing an accent that must also work on dark. If the accent hue is revised (§4), this pair is the binding constraint.

> **Correction note.** An earlier draft of this table mapped secondary text to `--neutral-600` and tertiary to `--neutral-500` in the light theme, claiming ≥ 7:1 and ≥ 4.6:1. Measured, those pairs give 4.1:1 and 2.9:1 — the first below its claimed target, the second below the AA floor outright. Both were corrected by moving one ramp step darker. The lesson is recorded rather than quietly fixed: contrast on a perceptually-uniform ramp is *predictable*, not *known*, and `FOUNDATION.md` §7 requires it be measured before it is claimed.

### Surfaces and borders

| Semantic token | Light | Dark | Notes |
|---|---|---|---|
| `--color-surface-base` | `--neutral-0` | `--neutral-950` | |
| `--color-surface-raised` | `--neutral-50` | `--neutral-900` | |
| `--color-surface-sunken` | `--neutral-100` | `--neutral-1000` | Code block interiors |
| `--color-border-subtle` | `--neutral-200` | `--neutral-800` | The hairline. Default rule |
| `--color-border-strong` | `--neutral-600` | `--neutral-500` | Interactive boundaries. Measured 4.1:1 light, 4.9:1 dark against base; 4.2:1 against dark raised |

`--color-border-subtle` is decorative and is not required to meet 3:1 — it separates regions but carries no information a reader must perceive. `--color-border-strong` marks interactive boundaries and therefore must meet the 3:1 non-text contrast requirement, which is why it is a distinct token rather than a darker shade chosen ad hoc.

### Interaction

| Semantic token | Light | Dark |
|---|---|---|
| `--color-interactive` | `--accent-700` | `--accent-500` |
| `--color-interactive-hover` | `--accent-600` | `--accent-400` |
| `--color-interactive-pressed` | `--accent-800` | `--accent-600` |
| `--color-focus-ring` | `--accent-700` | `--accent-400` |
| `--color-focus-ring-offset` | `--color-surface-base` | `--color-surface-base` |

The focus ring must reach 3:1 against **both** the element it surrounds and the surface behind it. This is why it carries its own token rather than reusing `--color-interactive`, and why an offset colour is specified — the two-tone ring (`ACCESSIBILITY.md` §4) is what guarantees perceptibility regardless of what the focused element sits on.

### Status

Three hues, used almost nowhere. They exist for callout variants and lifecycle badges, and appear on perhaps two surfaces on the entire site.

| Semantic token | Hue | Use |
|---|---|---|
| `--color-status-positive` | 150 | Callout: confirmed. Lifecycle: `production`, `released` |
| `--color-status-caution` | 75 | Callout: constraint or limitation. Lifecycle: `experimental`, `prototype` |
| `--color-status-critical` | 25 | Callout: failure or reversal. Used in Failures & mistakes sections |

Each resolves to a text-safe step and a surface-tint step per theme, both contrast-verified.

**Status colour never carries meaning alone.** Every status-coloured element pairs the colour with a text label and, where a callout, a heading. A reader with a colour-vision deficiency, in forced-colors mode, or printing in greyscale loses nothing (`ACCESSIBILITY.md` §5).

---

## 8. Themes

Light and dark are separate token sets, not inversions.

> Theme default is open question 6 in `DESIGN_SYSTEM.md` §8.

**Default:** follow `prefers-color-scheme`, with an explicit override control persisted locally and applied via a `data-theme` attribute on the root element.

**Why both, and why neither is "primary."** Dark-mode-only signals aesthetic preference over reader comfort, and a meaningful share of readers — particularly those reading long-form text in daylight — prefer light. Light-only ignores a majority default in this audience. Both being first-class costs one extra token set, which is roughly forty lines of declarations.

**Why not an inversion.** Inverting a light palette produces dark surfaces that are too contrasty and accents that are too saturated, because perceived contrast is not symmetric — light text on dark reads as heavier than dark text on light at the same measured ratio. The dark theme therefore uses a lighter text step (`--neutral-50`, not `--neutral-0`) and a lighter, less saturated accent than a strict inversion would produce. These are separate decisions and they are recorded as separate values.

**Implementation notes for Phase 3.** The theme attribute must be set before first paint to avoid a flash. The override control is a three-state control — light, dark, system — because a two-state toggle gives a reader no way back to system default once they have chosen. `color-scheme` is declared so that form controls and scrollbars follow the theme.

---

## 9. Verification

Contrast is not asserted; it is measured.

- Every semantic token pair that produces text on a surface is checked at build time. A pair below its floor fails the build.
- Focus ring contrast is checked against every surface it can appear on, not only the default one.
- The check runs on both themes. A pair passing in light and failing in dark is a failure.
- Automated contrast checking is necessary but not sufficient — it cannot detect a colour used to convey meaning alone. That is a review item (`ACCESSIBILITY.md` §9).

Thresholds and the full verification protocol: `ACCESSIBILITY.md` §3.

---

## 10. Maintenance implications

- **The accent hue is the cheapest thing in the system to change** — one ramp, one re-verification. It is deliberately isolated for this reason.
- **The neutral ramp is expensive to change.** Every semantic token, both themes, every contrast pair. Treat as a major version.
- **Adding a fourth accent role erodes the system.** The accent means "interactive." Each additional role dilutes that meaning, and the dilution is not recoverable by later removal because readers will already have learned that colour is decorative here.
- **The status hues will be under pressure to expand** — an "info" blue is the usual first request. It would collide with the accent and make link colour ambiguous. Decline it; use the caution or positive tokens, or no colour at all.
- **The OKLCH fallback must stay generated.** A hand-maintained hex fallback will drift from the OKLCH source, and the drift will be invisible because it only appears on engines the developer is not testing on.

---

## 11. User experience implications

- A reader in daylight and a reader at night both get a theme designed for their condition, not one derived from the other.
- A reader with low vision gets body text at ≥ 15:1 and secondary text at ≥ 7:1 — well beyond the requirement, at no cost to anyone else.
- A reader with a colour-vision deficiency loses nothing, because the interface conveys no information by hue.
- A reader in forced-colors mode gets a fully functional interface, because the hierarchy is built from borders, type, and space rather than from colour and shadow.
- A reader scanning quickly can identify every interactive element on a page by a single visual property, because exactly one colour means "interactive."

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-08-04 | Initial specification. Accent hue and elevation model pending approval. |

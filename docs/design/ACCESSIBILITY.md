# Accessibility

**Status:** Active — specification only
**Version:** 0.1.0
**Last reviewed:** 2026-08-04
**Governed by:** [`ARCHITECTURE.md`](../ARCHITECTURE.md) §11, §12 · ADR-005 · [`FOUNDATION.md`](../FOUNDATION.md) §11

`ARCHITECTURE.md` §11 defines the architectural accessibility commitments and the three-method verification. This document specifies the **design-level** requirements — the decisions made in the design system that determine whether those commitments are achievable — and states where this system deliberately exceeds the standard.

---

## 1. Position

Accessibility is treated as a property of good design, not as a compliance layer applied afterwards. The distinction is not rhetorical: a design that meets the standard by adjustment produces an interface that is technically conformant and practically awkward, and it produces exactly the interfaces that pass an audit and fail a real user.

The concrete expression of that position throughout this system:

- Hierarchy is built from scale, weight, face, and space — so it survives greyscale, forced colors, and colour-vision deficiency without a fallback path (`TYPOGRAPHY.md` §6, `VISUAL_LANGUAGE.md` §5).
- Text opacity is not an available technique — so contrast is verifiable by construction rather than by inspection (`COLOR_SYSTEM.md` §5).
- Elevation is borders, not shadows — so depth survives forced-colors mode (`COLOR_SYSTEM.md` §6).
- Reduced motion is a designed path, not a stripped one (`MOTION.md` §9).
- Icons never carry meaning alone, because the set is small enough that every icon has a label (`ICONOGRAPHY.md` §6).

None of these were adopted for accessibility reasons alone. Each is also the better design decision, which is the point.

**The standard: WCAG 2.2 Level AA is a release requirement** (ADR-005). Non-conformance blocks merge and blocks deploy.

---

## 2. Where this system exceeds AA

Listed because they are commitments, not aspirations, and because a future maintainer needs to know which values are the standard's floor and which are this system's choice.

| Requirement | WCAG 2.2 AA | This system | Why |
|---|---|---|---|
| Body text contrast | 4.5:1 | **≥ 13:1** (16.2 light, 13.9 dark) | Costs a ramp-step choice; the primary activity is reading long-form text |
| Secondary text contrast | 4.5:1 | **≥ 7:1** (AAA) | Same |
| Touch target size | 24 × 24 px (2.5.8) | **44 × 44 px** | Reference device is a phone (`ARCHITECTURE.md` §10) |
| Focus indicator contrast | 3:1 | **≥ 3:1 against every adjacent colour, two-tone** | Guarantees visibility on any surface (§4) |
| Motion | Respect `prefers-reduced-motion` | **Designed reduced path, CI-asserted** | A degraded path is not an equal path |
| Text resize | 200% (1.4.4) | **200% plus text-spacing overrides (1.4.12), verified** | 1.4.12 is the criterion most often skipped |

**AAA conformance is not the target.** ADR-005 rejects it deliberately: AAA's 7:1 floor applied site-wide would constrain the colour and typographic system beyond what serves readers, and the W3C does not recommend AAA as a site-wide requirement. This system exceeds AA where doing so is free and stops where it would cost design quality.

---

## 3. Contrast

Every text-on-surface token pair has a measured ratio (`COLOR_SYSTEM.md` §7). Floors:

| Content | Floor | System, measured |
|---|---|---|
| Body and all prose | 4.5:1 | 16.2:1 light · 13.9:1 dark |
| Secondary text — captions, metadata, labels | 4.5:1 | 9.2:1 light · 7.2:1 dark |
| Tertiary text — timestamps, credits | 4.5:1 | 6.2:1 light · 4.9:1 dark |
| Links and accent text | 4.5:1 | 4.8:1 light · 6.4:1 dark |
| Large text (≥ 24 px, or ≥ 18.66 px bold) | 3:1 | Inherits the body tokens |
| Interactive component boundaries | 3:1 | 4.1:1 light · 4.9:1 dark |
| Focus indicators | 3:1 | ≥ 3:1 against both adjacent colours |
| Decorative borders (`--color-border-subtle`) | None | Not required — carries no information |
| Syntax highlighting | 4.5:1 | ≥ 4.5:1 against the code surface, both themes |

**`--color-border-subtle` is deliberately below 3:1 and that is correct.** It separates regions visually but carries no information a reader must perceive; every boundary it draws is also expressed by spacing and structure. `--color-border-strong` exists for the cases where a border *is* the information — interactive boundaries — and it meets 3:1.

**Verification is automated and blocking** (`COLOR_SYSTEM.md` §9). Both themes. A pair passing in light and failing in dark is a failure.

---

## 4. Focus

The focus indicator is the single most important accessibility element in this system, because the senior-engineer audience will tab through the site (`FOUNDATION.md` §4, layer 3) and because a keyboard reader who loses the indicator has lost the interface.

**Specification.**

| Property | Value |
|---|---|
| Trigger | `:focus-visible` — keyboard and programmatic focus, not pointer clicks |
| Style | Two-tone ring: 2 px `--color-focus-ring` outside a 2 px `--color-focus-ring-offset` |
| Offset | 2 px from the element's border box |
| Radius | Follows the element's radius |
| Animation | None on appearance (`MOTION.md` §6.3) |
| Under reduced motion | Identical — it was never animated |
| Under forced colors | `Highlight` system colour, 2 px, no offset ring |

**Why two-tone.** A single-colour ring must contrast with both the element it surrounds and the surface behind it. On a bordered button on a raised surface, one colour cannot reliably do both. The offset ring — a band of the page surface colour between the element and the accent ring — guarantees separation regardless of what the element sits on. This is the mechanism that makes a single focus token work everywhere.

**Rules.**

- **The default indicator is replaced, never removed.** `outline: none` without a replacement is the single most common accessibility defect in styled interfaces.
- **`:focus-visible`, not `:focus`.** Pointer users clicking a button should not see a keyboard indicator; keyboard users must.
- **The indicator is never clipped.** `overflow: hidden` on an ancestor of a focusable element will clip the offset ring. Components with clipping ancestors use an inset ring instead, specified per component.
- **Focus is never obscured** (WCAG 2.2, 2.4.11). Nothing floats over focused content. The header is not sticky (`COMPONENT_GUIDELINES.md` §3.1), which removes the most common cause.
- **Focus order matches visual order.** Verified by the keyboard traversal suite, not by inspection.
- **Focus is managed on the one interactive surface** — the mobile navigation overlay traps focus while open and returns it to the toggle on dismiss (`COMPONENT_GUIDELINES.md` §3.2).

---

## 5. Information conveyed without colour

**No information is conveyed by colour alone.** Every instance where colour carries meaning is paired with a second channel.

| Element | Colour | Second channel |
|---|---|---|
| Prose link | `--color-text-accent` | Underline, always |
| Navigation current item | Weight 600 | `aria-current="page"` |
| Lifecycle badge | Status tint | The label text |
| Callout variant | Left border colour | Icon plus the text's own content |
| Diagram categories | Not colour-coded | Stroke pattern and label |
| Status in Failures & mistakes | `critical` tint | Section heading and prose |
| Competency story on `/work` | Not colour-coded | Label above the title (ADR-012) |

**Competency stories are deliberately not colour-coded.** It is the obvious design move for `/work` and it would fail this requirement while also spending the colour signal (`VISUAL_LANGUAGE.md` §5). The differentiation is the label and the ordering.

---

## 6. Forced colors mode

Windows High Contrast and equivalents replace author colours with a user-selected system palette. Most interfaces built on shadows, background images, and coloured borders lose their entire hierarchy.

This system is designed to survive it, largely as a side effect of decisions made for other reasons.

| Element | Behaviour under forced colors |
|---|---|
| Type hierarchy | Intact — built from scale, weight, and face |
| Surfaces and elevation | Intact — borders are preserved by forced-colors mode; shadows would not have been |
| Icons | Intact — `currentColor` strokes inherit the forced text colour |
| Focus indicator | Uses the `Highlight` system colour |
| Links | Intact — underline plus the forced link colour |
| Status tints | Lost, as expected. Meaning survives via the label text (§5) |
| Diagrams | Intact — `currentColor` strokes and real text nodes |

**`forced-colors-adjust` is never set to `none`** except where a brand mark's fidelity requires it, and brand marks carry no information.

**This is verified**, not assumed — it is part of the manual verification pass (§9).

---

## 7. Reflow, resize, and text spacing

| Condition | Requirement |
|---|---|
| 320 px viewport | No horizontal page scroll. All content reachable |
| 200% zoom | No horizontal page scroll, no clipping, no overlap |
| 400% zoom | Content reflows to a single column and remains operable |
| Text spacing overrides (WCAG 1.4.12) | No clipping or overlap at 1.5× line height, 0.12em letter spacing, 0.16em word spacing, 2em paragraph spacing |
| Browser minimum font size | Containers grow; nothing truncates |

**The design decisions that make this achievable:** no fixed heights (`SPACING.md` §7), no truncation (`COMPONENT_GUIDELINES.md` §9), relative units throughout, and containers that grow with content. Horizontal scroll is permitted **inside** a designated container — a wide table, a code block — and never on the page.

**1.4.12 is the criterion most commonly skipped**, because it requires an explicit test with a user stylesheet. It is included in the automated suite for exactly that reason.

---

## 8. Structure and semantics

Design-level requirements that determine whether the markup can be correct.

- **One `<h1>` per page.** The visual design must not require two headings at the same top level.
- **Heading levels never skip.** The type scale assigns a size to each level; a designer wanting a smaller heading uses a lower level, not a smaller size on a higher one.
- **Visual hierarchy and heading hierarchy are the same hierarchy.** A visually prominent element that is not a heading, or a heading that is not visually prominent, means one of the two is wrong.
- **Landmarks on every page** — banner, navigation, main, contentinfo.
- **Lists are lists.** The timeline is an ordered list; stack tags are an unordered list; the navigation is a list. Sequence and count are announced.
- **Tables are tables**, with `<th scope>` and `<caption>` (`COMPONENT_GUIDELINES.md` §8.8).
- **Language declared; page titles unique and descriptive.**
- **ARIA only where native semantics are insufficient.** In this system that is: `aria-current` on navigation, `aria-expanded` on the mobile toggle, `aria-hidden` on decorative SVG, and one live region for copy confirmation. Nothing else.

---

## 9. Verification

Three methods (`ARCHITECTURE.md` §11), because automation detects roughly a third of real barriers.

**1. Automated — blocking in CI**

- axe-core via Playwright across every route. Zero serious or critical.
- Lighthouse accessibility score of 100 on every route.
- `eslint-plugin-jsx-a11y` at lint time, zero warnings.
- Contrast assertion across every token pair, both themes.

**2. Programmatic behavioural — blocking in CI**

These catch what axe cannot:

- Keyboard-only traversal of every route: every interactive element reachable, operable, in visual order, no traps.
- Focus visibility: an indicator is present and meets contrast at every stop.
- Reduced-motion: no transform-based animation applied under the media query.
- JavaScript-disabled: every route renders complete and navigable.
- Text-spacing override: no clipping or overlap.
- 320 px and 200% zoom: no horizontal page scroll.

**3. Manual — required before launch and before any structural change**

The only method that catches interfaces that are technically accessible and practically unusable.

- VoiceOver traversal of every route, recorded in the pull request.
- Keyboard-only navigation of every route by hand.
- Forced-colors mode inspection of every route (§6).
- Greyscale inspection of every route — confirms §5 by observation rather than by audit.
- Zoom to 400% on the case-study layout, which is the densest surface.

**What automation cannot detect, and therefore what the manual pass is looking for:** an illogical tab order that is technically sequential, a focus indicator that is present and visually lost, a heading structure that is valid and meaningless, alt text that is present and useless, a live region that fires too often to be tolerable, and a reading order that makes sense visually and not linearly.

---

## 10. Maintenance implications

- **The contrast targets in §2 are choices, not requirements.** A future maintainer under pressure may reduce them to the AA floor and remain conformant. Doing so would contradict `FOUNDATION.md` §8; if it is ever done, it needs an ADR.
- **The focus indicator specification is the most fragile element.** It breaks silently whenever a component introduces a clipping ancestor. The focus-visibility CI assertion is what catches it.
- **`:focus-visible` support is assumed.** If a fallback is ever needed, it must be `:focus`, not nothing.
- **The manual pass has no automated substitute and will be the first thing skipped under deadline pressure.** It is a required item in the pull request template for exactly that reason.
- **Every new component adds five state definitions and a keyboard path.** This is the real cost of the accessibility commitment and it is why the component set is kept small.

---

## 11. User experience implications

- A keyboard reader can traverse the entire site, see where they are at every step, and never become trapped.
- A screen reader user gets a heading structure that matches what a sighted reader sees, and a link list that makes sense out of context.
- A reader with low vision gets body text at ≥ 15:1 and a layout that reflows to 400% without breaking.
- A reader with a vestibular disorder gets an interface with no movement that still confirms their interactions.
- A reader in forced-colors mode gets the full hierarchy, not a flattened document.
- A reader with a colour-vision deficiency loses no information anywhere on the site.
- A reader with none of these gets a faster, clearer interface, because every one of these decisions also improved the design.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-08-04 | Initial specification. |

# Iconography

**Status:** Active — specification only
**Version:** 0.1.0
**Last reviewed:** 2026-08-04
**Governed by:** [`ARCHITECTURE.md`](../ARCHITECTURE.md) §7, §10 · [`VISUAL_LANGUAGE.md`](./VISUAL_LANGUAGE.md)

Icons are a small part of this system and this document is correspondingly short. The important decisions are what *not* to do: no icon library, no icon font, and very few icons.

---

## 1. Position: icons are functional, and there are almost none

The visual identity is typographic (`VISUAL_LANGUAGE.md` §2.3). Icons are not part of it. They exist where a glyph communicates faster than a word in a constrained space, and nowhere else.

This is a deliberate departure from the convention in this category, where icons decorate section headings, appear beside every list item, and mark every feature. That convention is a habit inherited from marketing pages, and it costs bytes, adds visual noise, and produces the specific failure mode where a reader must decode a pictogram to understand a label that could have been a word.

**The test for including an icon:** would a word be worse here, given the available space? If a word fits, use the word.

---

## 2. No icon library

Icons are authored inline SVG. No Lucide, no Phosphor, no Heroicons, no Radix icons, no library of any kind.

**Why.**

*Budget.* An icon library is a dependency that ships either the whole set or a tree-shaken subset plus its runtime. For a site using roughly a dozen icons against a 120 KB first-load JavaScript budget (`ARCHITECTURE.md` §10), inline SVG at a few hundred bytes each is the only proportionate choice.

*Consistency.* A library's icons are drawn to that library's grid, stroke weight, and terminal style. This system specifies a stroke weight and corner treatment derived from its own hairline (`VISUAL_LANGUAGE.md` §2.1). Adopting a library means either accepting its drawing conventions or overriding them per icon, which is more work than drawing twelve icons.

*Server components.* Inline SVG in a server component ships as markup with zero JavaScript. Most icon libraries are React components, which — even when they render no client-side behaviour — pull an import into the module graph.

**Alternative considered: an icon font.** Rejected outright. Icon fonts render as missing-glyph boxes during font load, are announced as garbage characters by some screen readers, cannot be multi-coloured, and break entirely when a reader overrides fonts for dyslexia. They are a solved-and-abandoned technique.

**Alternative considered: a sprite sheet.** One request, cacheable, avoids duplicating markup for repeated icons. Rejected because the site's icon usage is sparse enough that duplication costs less than the extra request and the indirection, and because a sprite referenced by `<use>` complicates `currentColor` inheritance across shadow boundaries.

---

## 3. Drawing specification

| Property | Value |
|---|---|
| Grid | 24 × 24 |
| Live area | 20 × 20 (2 px padding on all sides) |
| Stroke width | 1.5 px at 24 px, scaled proportionally |
| Stroke colour | `currentColor` — always |
| Fill | `none` — always |
| Caps and joins | Round |
| Corner radius | 2 px on rectangular forms |
| Terminals | Flush to the live area, never to the grid edge |

**Why 1.5 px stroke.** It sits between the 1 px hairline (`VISUAL_LANGUAGE.md` §2.1) and the stroke weight of the text face at body size. A 1 px icon stroke reads as too fine beside 18 px text and disappears at small sizes; 2 px reads as heavier than the surrounding type. 1.5 px matches the optical weight of the type it accompanies, which is the actual goal.

**Why `currentColor` and no fills.** The icon inherits its colour from its context, so it works in both themes, in forced-colors mode, on any surface, and inside a link that changes colour on hover — all without a single colour token. Fills would require per-theme values and would break forced-colors mode.

**Why round caps and joins.** Round terminals at 1.5 px read as slightly softer and more finished than butt caps, and they avoid the sharp corner artefacts that appear when a stroked path is scaled down. This is the only stylistic decision in the icon system; everything else is functional.

---

## 4. Sizes

Three sizes. Each is a distinct rendering, not a scaled version of one drawing.

| Token | Size | Use |
|---|---|---|
| `--icon-sm` | 16 px | Inline with `--type-body-sm` and `--type-label`; inside compact controls |
| `--icon-md` | 20 px | Default. Inline with `--type-body`; navigation; buttons |
| `--icon-lg` | 24 px | Standalone; touch targets on mobile navigation |

**Optical adjustment at 16 px.** Scaling a 24 px drawing to 16 px produces a 1 px stroke and sub-pixel detail that renders inconsistently. Icons used at `--icon-sm` are drawn on a 16 px grid with a 1.25 px stroke and simplified detail. This means some icons exist as two drawings. That is the cost of icons that are legible at both sizes, and it is why the icon set is kept small.

---

## 5. Alignment

- **Icons align optically to the x-height of their adjacent label**, not to its line box. Box alignment places an icon slightly high beside lowercase text, which is the most common icon alignment error.
- **Gap between icon and label:** `--space-2` (8 px) at `--icon-md`, `--space-1` (4 px) at `--icon-sm`.
- **Icons in a vertical list align to a common left axis**, with labels aligned to a second axis. Icons of differing widths are centred within a fixed-width column so that labels never ragged.
- **An icon inside a button is optically centred**, which for most glyphs is not the same as mathematically centred — an arrow pointing right needs slightly more space on its right.

---

## 6. Semantics and accessibility

**Icons never carry meaning alone** (`ARCHITECTURE.md` §11, `ACCESSIBILITY.md` §5). Every icon is either accompanied by a text label or, where space genuinely prevents one, has an accessible name and a visible tooltip is not the mechanism.

| Case | Treatment |
|---|---|
| Icon beside a visible label | `aria-hidden="true"` on the SVG. The label is the accessible name; announcing both produces a duplicate |
| Icon as the only content of a control | The control carries an accessible name. The SVG stays `aria-hidden` |
| Icon conveying status | Paired with text. The status is in the text; the icon is reinforcement |
| Purely decorative icon | Does not exist in this system. If it is decorative, it is removed (§1) |

**Icon-only controls are permitted only against all three of these conditions:** the glyph's convention is universal; a visible label would be redundant with adjacent content or space is genuinely constrained; and the control carries an accessible name with its state exposed programmatically.

Four controls in the system qualify, and the list is closed:

| Control | Why it qualifies |
|---|---|
| Mobile navigation toggle | Universal convention; state via `aria-expanded` |
| Overlay close | Universal convention; a "Close" label inside a panel the reader just opened is redundant |
| Code-block copy | Universal convention; a label would crowd the block's header at narrow widths |
| Theme control trigger | Universal convention; the control's *options* carry visible text labels (`INTERACTION.md` §11) — only the trigger is icon-only |
| Profile mark row | Universal conventions, and the row is the same four marks wherever it appears — footer and `/connect`. Added by ADR-031; see below |

Everything else pairs an icon with a word.

**The profile mark row is the one case that is a set rather than a control** (ADR-031). Four marks — GitHub, LinkedIn, mail, document — rendered from one shared list, each with a visually-hidden label. It qualifies on the three conditions above, and it carries one extra obligation the other four do not: in page content it takes the link colour, because the last clause of this section holds and a grey glyph in a paragraph's flow is not identifiable as interactive. In the footer, position and convention do that work and the marks stay tertiary.

**The list is closed at five.** A sixth entry means icon-only has become the default rather than the exception, which is the failure this section exists to prevent.

**Icons are never the sole indicator of an interactive element.** A control is identifiable as interactive by its shape, border, or text — not by containing an icon.

---

## 7. The set

The closed set. Adding to it requires a written justification (`DESIGN_SYSTEM.md` §6).

| Icon | Purpose | Where |
|---|---|---|
| `arrow-right` | Forward navigation, "continue reading" | Case-study cards, next/previous links |
| `arrow-up-right` | Outbound link leaving the site | Source links, live-site links |
| `chevron-down` | Disclosure in the one place disclosure exists | Mobile navigation |
| `menu` | Mobile navigation open | Header, mobile only |
| `close` | Mobile navigation dismiss | Overlay |
| `copy` | Copy code to clipboard | Code blocks |
| `check` | Copy succeeded; positive callout | Code blocks, callouts |
| `alert` | Caution callout | Callouts |
| `x-circle` | Critical callout, reversal | Callouts, Failures & mistakes sections |
| `github` | Source repository | Case-study links, footer |
| `linkedin` | Profile | Footer |
| `mail` | Contact | Footer, contact affordance |
| `sun` / `moon` / `monitor` | Theme control states | Theme control |

Fifteen icons. Four of them — `arrow-right`, `arrow-up-right`, `check`, `copy` — appear at both 16 px and 20 px and therefore exist as two drawings each (§4), giving nineteen drawings in total. Estimated inline cost: under 5 KB uncompressed, and only the icons a route uses appear in that route's markup.

**Brand marks** (`github`, `linkedin`) are the only icons not drawn to this system's specification — they are reproduced per their owners' guidelines, because a redrawn brand mark is both wrong and disrespectful of the mark. They are normalised to the same optical size and inherit `currentColor` where their guidelines permit it.

---

## 8. Maintenance implications

- **The set is closed and small enough to hold in mind**, which is what makes drift visible. A sixteenth icon should trigger a question about whether the interface has grown a surface it should not have.
- **Two drawings per icon at different sizes is a real maintenance cost.** It is accepted for the icons that actually appear at both sizes; icons used at only one size get one drawing. `TOKENS.md` records which is which.
- **Brand marks change.** GitHub and LinkedIn have both revised their marks within the last decade. These are the only icons in the set with an external dependency, and they should be checked at each annual review.
- **Inline SVG duplicates markup** where an icon appears many times on one page. At current usage this is negligible; if a future surface repeats an icon more than a dozen times, revisit the sprite decision in §2.

---

## 9. User experience implications

- A reader never has to decode a pictogram to understand a control, because every icon has a word beside it or an accessible name.
- A reader in forced-colors mode sees every icon, because they are strokes in `currentColor` rather than fills in a token colour.
- A reader on a slow connection sees icons at first paint, because they are markup rather than a fetched asset or a font.
- A reader who overrides fonts for dyslexia is unaffected, because no glyph in this system is carrying an icon.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-08-04 | Initial specification. |

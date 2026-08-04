# Spacing & Layout

**Status:** Active — specification only
**Version:** 0.1.0
**Last reviewed:** 2026-08-04
**Governed by:** [`ARCHITECTURE.md`](../ARCHITECTURE.md) §8 · [`FOUNDATION.md`](../FOUNDATION.md) §8

Space is the cheapest quality signal available — it costs no bytes and no main-thread time — and it is the element most often left to per-component judgement, which is why interfaces drift out of rhythm. This document makes spacing a decided property rather than a felt one.

---

## 1. Constraints inherited

| Constraint | Source |
|---|---|
| 4 px base with an 8 px rhythm | `ARCHITECTURE.md` §8 |
| Section spacing is its own scale, considerably larger than component spacing | `ARCHITECTURE.md` §8 |
| Density varies deliberately by surface | `ARCHITECTURE.md` §8 |
| Responsive-first: authored narrow, expanded — not authored wide and patched | `ARCHITECTURE.md` §8 |
| A small number of container widths — prose, wide, full | `ARCHITECTURE.md` §8 |
| CSS Grid for page structure, flexbox within components | `ARCHITECTURE.md` §8 |
| No fixed heights on content containers | `ARCHITECTURE.md` §8 |

---

## 2. Base unit and rhythm

**Base unit: 4 px. Preferred rhythm: 8 px.**

The scale is built on 4 px, but values divisible by 8 are the default choice. 4 px increments exist for the cases where 8 is genuinely too coarse — the gap between a label and its input, the inset of an icon within a button — and nowhere else.

**Why 4 with an 8 preference rather than 8 alone.** A strict 8 px scale is cleaner in principle and produces awkward compromises in practice: at small sizes the difference between 8 and 16 is the difference between cramped and disconnected, with nothing between. Allowing 4 px steps at the bottom of the scale solves this without opening the door to arbitrary values, because the scale is still closed — a component cannot use 6 or 10.

**Why not a typographic rhythm unit** (spacing derived from line height, e.g. multiples of 28.8 px). Genuinely appealing for a type-led system, and it produces beautiful vertical rhythm in prose. Rejected as a global scale because it does not survive contact with interface components — a button whose padding must be a multiple of the body line height is either too large or requires fractions. The compromise adopted: **prose spacing derives from line height (`TYPOGRAPHY.md` §4); everything else uses this scale.** Two systems, each in its correct domain, with a documented boundary between them.

---

## 3. Component scale

| Token | Value | Typical use |
|---|---|---|
| `--space-0` | 0 | Explicit reset |
| `--space-1` | 4 px | Icon-to-label gap, tight inline pairs |
| `--space-2` | 8 px | Inline element gaps, badge padding |
| `--space-3` | 12 px | Compact vertical stacks, small button padding |
| `--space-4` | 16 px | Default gap, standard button padding-inline |
| `--space-5` | 20 px | Paragraph rhythm (one body line) |
| `--space-6` | 24 px | Card padding, list item separation |
| `--space-8` | 32 px | Card padding at reading density, grouped element separation |
| `--space-10` | 40 px | Sub-section separation |
| `--space-12` | 48 px | Component-to-component separation |
| `--space-16` | 64 px | Large internal separation |
| `--space-20` | 80 px | Smallest section-adjacent gap |

Steps 7, 9, 11, 13–15, 17–19 are deliberately absent. The scale is roughly geometric above `--space-6`, because at larger sizes a 4 px difference is imperceptible and offering it invites arbitrary choices.

**Prose does not consume this scale.** Paragraph rhythm, heading spacing, and list spacing are specified in line units in `TYPOGRAPHY.md` §4 and resolve to values that are deliberately *not* on this scale — one body line at 18 px × 1.6 is 28.8 px, which sits between `--space-6` and `--space-8` and belongs to neither. This is the boundary described in §2, and it is the reason `--space-5` (20 px) is a general-purpose step rather than a paragraph gap.

---

## 4. Section rhythm

A separate, larger scale for the space between major page regions. This is where the site earns its "breathing room" and it is deliberately not part of the component scale — mixing them is how section separation gradually erodes into component separation.

Values are fluid via `clamp()` between the 375 px and 1280 px anchors.

| Token | Mobile | Desktop | Use |
|---|---|---|---|
| `--space-section-sm` | 56 px | 80 px | Between related sub-sections within a page region |
| `--space-section-md` | 80 px | 128 px | Default between page sections |
| `--space-section-lg` | 112 px | 192 px | Around major boundaries — page header to content, final section to footer |

**Why section spacing scales with viewport but component spacing does not.** Component spacing relates to the size of the elements it separates, which does not change with viewport. Section spacing relates to the reader's sense of the page as a whole, which does — 128 px of separation reads as generous on a 1280 px page and as a chasm on a 375 px one. Keeping component spacing fixed also means a card looks the same everywhere, which is what makes the interface feel stable across breakpoints.

**Section boundaries are marked by space, not by rules.** A hairline appears between sections only where the space alone is ambiguous — which, at these values, is almost never. `VISUAL_LANGUAGE.md` §2.1 reserves the hairline for structure that space cannot express.

---

## 5. Density modes

Three densities, bound to surface rather than exposed as a preference (`VISUAL_LANGUAGE.md` §6).

| Mode | Applied to | Section rhythm | Component multiplier |
|---|---|---|---|
| `compact` | Layer-1 region above the fold; navigation; footer | `sm` | ×0.75 on vertical gaps |
| `default` | `/work`, `/about`, `/workflow`, `/resume` | `md` | ×1 |
| `reading` | Case-study bodies | `lg` | ×1.25 on vertical gaps |

**Why density is a surface property.** The correct spacing for a thirty-second scan and the correct spacing for a twenty-minute read are different, and the system knows which surface is which. A recruiter with thirty seconds should not scroll past whitespace to reach the claim; a reader eight paragraphs into a case study benefits from every bit of separation. Exposing this as a user setting would push a decision with real consequences onto a reader who has no context for making it.

**The multiplier applies to vertical gaps only.** Horizontal spacing — button padding, inline gaps, card insets — is constant across densities, because changing it would change the apparent size of components rather than the pacing of the page.

---

## 6. Containers

Three widths. A fourth would mean the layout has more cases than the content does.

| Token | Max width | Use |
|---|---|---|
| `--container-prose` | 68ch | All body copy. The measure column (`VISUAL_LANGUAGE.md` §2.2) |
| `--container-wide` | 1120 px | Diagrams, comparison tables, card grids, page headers |
| `--container-full` | 100% | Full-bleed figures. Rare — the only element permitted to touch the viewport edge |

**Gutters.** 20 px at mobile, 32 px at tablet, 48 px at desktop. The gutter is the minimum distance between content and the viewport edge and it is never zero except inside a `--container-full` element.

**Break-out behaviour.** Content inside `--container-prose` may break out to `--container-wide` or `--container-full`. Break-outs are centred on the prose column axis, so the reader's eye returns to a consistent point. A break-out always returns to prose width immediately after; two consecutive break-outs of different widths are a layout error.

**Why `ch` for prose and `px` for wide.** The prose container exists to control reading measure, which is a function of the font — `ch` tracks the font, `px` does not. The wide container exists to control layout, which is a function of the viewport.

---

## 7. Grid and layout

**Page structure uses CSS Grid; component internals use flexbox** (`ARCHITECTURE.md` §8).

The page is a three-column grid: gutter, content, gutter — with the content column subdivided where a layout needs it. Break-outs are implemented by assigning an element to a wider column span, not by negative margins. Negative margins to escape a container are prohibited: they break at unpredictable widths and they make the containing element's box meaningless.

**No fixed heights on content containers.** Content determines height. A container with a fixed height either clips content or leaves dead space, and it will do one or the other at some viewport, in some language, at some zoom level, for some reader with a text-spacing override.

**Aspect ratios are permitted on media**, where the ratio is a property of the asset rather than of the layout.

**Responsive-first, meaning authored narrow.** Every layout is specified at 320 px first and expanded upward. This is a process rule, not a preference: layouts authored wide and then patched accumulate breakpoint-specific overrides that nobody can safely remove later.

**Breakpoints.** Three, named for content rather than for devices:

| Token | Min width | Rationale |
|---|---|---|
| `--bp-sm` | 640 px | Where a two-column card grid becomes viable |
| `--bp-md` | 900 px | Where the prose column reaches its measure and gutters can grow |
| `--bp-lg` | 1280 px | Where fluid scaling reaches its desktop anchor and stops |

Breakpoints are where the layout needs to change, determined by the content, not by device categories. A fourth breakpoint should be treated as evidence that a layout is over-specified.

---

## 8. Alignment

- **Everything aligns to the prose column axis** unless it is deliberately breaking out. Two elements that are neither aligned nor clearly offset read as a mistake.
- **Optical alignment overrides mathematical alignment** where they conflict. A quotation mark, a bullet, or a large numeral hangs slightly outside the column so its visual mass aligns rather than its bounding box.
- **Vertical alignment of mixed-size text is on the baseline**, not on the box centre — a label beside a metric aligns to the metric's baseline (`VISUAL_LANGUAGE.md` §2.4).
- **Icons align optically to their label's x-height**, not to its box (`ICONOGRAPHY.md` §5).

---

## 9. Maintenance implications

- **The two-scale split (component vs. section) is the thing most likely to erode.** The pressure appears as "this section gap should be 64 px, and `--space-16` is 64 px." Using a component token for section spacing works once and breaks the system's ability to retune pacing globally. If a section needs a size the section scale lacks, the section scale is wrong.
- **The absent steps are load-bearing.** Adding `--space-7` because something needs 28 px converts a closed scale into an open one, and the next request will be for 26.
- **Density multipliers must not be applied twice.** A component inside a `reading`-density region already receives the multiplier from its container; applying it again produces compounding gaps that only appear on specific surfaces.
- **Container widths are consumed by the case-study layout, which is the highest-traffic surface.** Changing `--container-prose` changes reading measure and therefore invalidates the calibration in `TYPOGRAPHY.md` §5.

---

## 10. User experience implications

- A reader scrolling a long case study can tell where a section ends without reading, because section separation is three to five times component separation.
- A reader on a 320 px phone gets the same layout logic as one on a 1440 px display, with no surface that only works at one width.
- A reader with a text-spacing override or at 200% zoom gets containers that grow rather than clip, because nothing has a fixed height.
- A recruiter above the fold gets compact density and reaches the claim without scrolling past decorative whitespace.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-08-04 | Initial specification. |

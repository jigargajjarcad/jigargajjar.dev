# Typography

**Status:** Active — specification only
**Version:** 0.1.0
**Last reviewed:** 2026-08-04
**Governed by:** [`ARCHITECTURE.md`](../ARCHITECTURE.md) §8, §10 · [`FOUNDATION.md`](../FOUNDATION.md) §8

Typography carries the identity, the hierarchy, and nearly all of the expression in this system (`VISUAL_LANGUAGE.md` §2.3). It is also the largest single lever on whether a twenty-minute case study is comfortable to read. This document is correspondingly the most detailed in the system.

---

## 1. Constraints inherited

Non-negotiable, from frozen documents:

| Constraint | Source |
|---|---|
| Two families maximum: one display, one text for body and interface | `ARCHITECTURE.md` §8 |
| Four weight values total across both | `ARCHITECTURE.md` §8 |
| Self-hosted `woff2`, Latin subset, preloaded, `font-display: swap` | `ARCHITECTURE.md` §8 |
| `size-adjust` and metric overrides on fallbacks; zero layout shift from font loading | `ARCHITECTURE.md` §8, §10 |
| Variable fonts preferred where not larger than the statics they replace | `ARCHITECTURE.md` §8 |
| One modular scale with a fixed ratio; `clamp()` fluid sizing | `ARCHITECTURE.md` §8 |
| Body measure ≤ 68 characters | `ARCHITECTURE.md` §8 |
| Body line height 1.5–1.6; display 1.05–1.15 with negative tracking | `ARCHITECTURE.md` §8 |
| Tabular lining figures wherever numbers are compared | `ARCHITECTURE.md` §8 |
| ≤ 120 KB total fonts, ≤ 4 files | `ARCHITECTURE.md` §10 |
| Reduced-opacity text is not an available technique | `ARCHITECTURE.md` §8 |

---

## 2. Typeface selection

> **Frozen, Phase 2** (`ROADMAP.md` §2). The single most expensive decision to reverse — vertical rhythm, measure, and every optical adjustment are calibrated to specific font metrics. Reversal requires an ADR.

### Display — Newsreader

A variable serif designed by Production Type for on-screen reading, with weight and optical-size axes, released under the SIL Open Font License.

**Selection criteria and how it meets them.**

| Criterion | Assessment |
|---|---|
| Editorial character without novelty | A text-first serif with moderate contrast. Reads as publication, not as fashion |
| Genuine optical sizing | The `opsz` axis is real, not interpolated from weight. Display settings get the tighter fit and higher contrast they need; small settings stay sturdy |
| Variable, single file | Weight and optical size in one file, so the four-file budget is not consumed by cuts |
| Screen-designed | Drawn for rendering at screen resolutions rather than adapted from print, which matters on the 1× displays in the reference device profile |
| Licensing | OFL. Self-hostable without cost or restriction, which the zero-third-party constraint requires |
| Not ubiquitous in this category | Rare in developer portfolios; common enough in editorial contexts to feel established rather than experimental |

**Weights used:** 400 (all display settings), 500 (small headings and eyebrow labels, where 400 at small sizes lacks presence). Italic is **not** loaded — pull quotes are set in the roman, which is both the more restrained choice and a saved file.

**Alternatives considered.**

*Source Serif 4* — excellent, variable, OFL, extremely legible. Rejected narrowly: it is a superb text serif and a merely adequate display serif. Its low contrast makes large settings feel soft rather than authoritative, and this system uses the serif exclusively at display sizes.

*Literata* — variable, OFL, designed for reading, slightly slab-like. Rejected because its sturdiness reads as friendly rather than precise, which is the wrong register for `VISUAL_LANGUAGE.md` §1.

*Fraunces* — variable, OFL, with optical-size, softness, and "wonk" axes. Genuinely distinctive. Rejected as too characterful: the personality would compete with the content, and high-personality display faces are the most reliably dating element in any system.

*Instrument Serif* — high contrast, striking at large sizes, OFL. Rejected on two counts: single weight only, and it is currently fashionable enough that it will read as "2025" within a cycle.

*A commercially licensed face* (Söhne, Untitled, GT Sectra and similar). Rejected on cost and on the maintenance implication: a licence tied to one person's purchase is a dependency a future maintainer cannot resolve. There is no quality argument that justifies it here — the OFL field at this quality level is deep.

### Text — Inter

A variable neutral grotesque by Rasmus Andersson, designed specifically for user interfaces, OFL.

**Selection criteria and how it meets them.**

| Criterion | Assessment |
|---|---|
| Legibility at 16–18 px | Large x-height, open apertures, generous spacing. Designed for exactly this size range |
| Character disambiguation | Distinguishable `1` / `l` / `I` and `0` / `O`, with optional alternates. Necessary on a technical site where a reader may be reading identifiers |
| Tabular lining figures | Present and well-drawn. Required by `ARCHITECTURE.md` §8 |
| Variable, roman and italic | Weight axis across the range in one file per style |
| Metric-compatible fallback | Well-documented metrics, so `size-adjust` overrides can be computed precisely enough to hold CLS at zero |
| Licensing | OFL |

**Weights used:** 400 (body, and all default interface text), 600 (interface emphasis, labels, table headers, active navigation, strong emphasis in prose). Italic is loaded for `<em>` in prose — synthesised obliques are unacceptable in a system whose thesis is typographic craft.

**The honest objection.** Inter is the most widely used interface typeface in this category. Linear and Vercel both use it or a close relative, and `FOUNDATION.md` §8 requires the site to feel unlike a standard developer portfolio.

**Why it is chosen anyway.** Differentiation is carried by the serif and by the system (`VISUAL_LANGUAGE.md` §3), not by an unfamiliar text face. Selecting a less-proven sans to avoid a familiar one trades measurable reading quality for unmeasurable novelty, which inverts the priority in `FOUNDATION.md` §8 — reading comfort over twenty minutes outranks visual novelty on first impression. Inter is ubiquitous because it is very good at this specific job.

**Alternatives considered.**

*Instrument Sans* — neutral, contemporary proportions, variable, OFL, notably less common. The strongest alternative and the one to switch to if the ubiquity objection is judged to outweigh the quality argument. Rejected for now on maturity: less field-tested at long-form body sizes, and less complete in the figure and disambiguation features this site relies on.

*Public Sans* — OFL, variable, neutral, uncommon. Rejected as institutionally plain; it reads as government service design, which is a specific and unwanted association.

*IBM Plex Sans* — OFL, variable, real character. Rejected because that character is IBM's; the association is too strong to borrow.

*Source Sans 3* — OFL, variable, highly legible. Rejected as slightly generic and weaker in tabular figures than Inter.

### Monospace — system stack

No monospace webfont is loaded. Code blocks and inline code use:

```
ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace
```

**Why.** A third webfont family would exceed the two-family constraint in `ARCHITECTURE.md` §8 and consume roughly a third of the font budget for content that occupies a small fraction of the site. Modern system monospace faces — SF Mono, Cascadia, Liberation Mono — are excellent and are already resident, so they cost zero bytes and zero requests, and they render instantly with no swap.

There is also a legibility argument. A reader viewing code in the monospace face their own editor uses is reading in a face they are already fluent in.

**The tradeoff, stated honestly:** code blocks will not look identical across platforms. This is accepted. Code is content to be read, not a designed artifact, and cross-platform consistency of a code sample is worth less than 40 KB and a swap event. Metrics are normalised with `size-adjust` so that line height and inline code baselines stay stable regardless of which face resolves.

### Budget

| File | Style | Est. subset size |
|---|---|---|
| Inter Variable | Roman, wght 400–600 | ~34 KB |
| Inter Variable Italic | Italic, wght 400–600 | ~34 KB |
| Newsreader Variable | Roman, wght 400–500, opsz | ~30 KB |
| **Total** | 3 files | **~98 KB** |

Budget is ≤ 120 KB across ≤ 4 files (`ARCHITECTURE.md` §10). Three files, with one in reserve.

**These are estimates and must be measured before they are claimed.** Per `FOUNDATION.md` §7 — verify before claiming success. If the measured total exceeds budget, the reductions in priority order are: (1) narrow the Inter weight axis to 400–600 exactly, (2) drop the Newsreader `opsz` axis and select a fixed optical size, (3) drop Inter Italic and set `<em>` in the display serif roman. Raising the budget is not on the list (ADR-006).

### Loading strategy

- All three files preloaded in the document head. There are only three, they are needed on every route, and preloading is what makes `swap` invisible.
- `font-display: swap`. Text is readable immediately in the fallback; the swap is imperceptible because metrics are matched.
- Subset to Latin basic plus the punctuation the site actually uses — including the en dash, em dash, typographic quotes, and the section sign used throughout the documentation. Not Latin Extended.
- `size-adjust`, `ascent-override`, `descent-override`, and `line-gap-override` computed per fallback face so that fallback and webfont occupy identical vertical space. This is the mechanism that holds CLS at 0 from fonts (`ARCHITECTURE.md` §10) and it is verified in CI, not assumed.
- Fallback stacks: display falls back to Georgia then the generic serif; text falls back to the system UI stack.

---

## 3. Type scale

One modular scale, ratio **1.25 (major third)**, base 18 px at desktop.

**Why 1.25.** A ratio below 1.2 produces steps too close to read as distinct hierarchy, requiring weight or colour to compensate — which the system does not want, since hierarchy must survive greyscale. A ratio above 1.33 produces display sizes that overflow at 320 px and a gap between body and the first heading level wide enough that intermediate content has nowhere to sit. 1.25 gives eight usable steps between 11.5 px and 55 px with clear separation at every adjacent pair.

**Why base 18 and not 16.** The default 16 px is a browser convention, not a reading recommendation. At the 68-character measure this system uses, 18 px produces a comfortable relationship between glyph size and line length on both desktop and mobile, and it is meaningfully more comfortable over twenty minutes. The cost is that slightly less content fits above the fold, which is accepted — `FOUNDATION.md` §8 ranks reading comfort above first-impression density for the case-study surface, and the compact density mode handles the layer-1 surface where density does matter.

### Scale

Primitive steps. Values are fluid via `clamp()` between the mobile anchor at 375 px and the desktop anchor at 1280 px.

| Token | Mobile | Desktop | Ratio position |
|---|---|---|---|
| `--type-100` | 11.5 | 11.5 | ×1.25⁻² |
| `--type-200` | 14 | 14.5 | ×1.25⁻¹ |
| `--type-300` | 17 | 18 | ×1.25⁰ — base |
| `--type-400` | 20 | 22.5 | ×1.25¹ |
| `--type-500` | 24 | 28 | ×1.25² |
| `--type-600` | 28 | 35 | ×1.25³ |
| `--type-700` | 32 | 44 | ×1.25⁴ |
| `--type-800` | 38 | 55 | ×1.25⁵ |

Values are rounded to the nearest half pixel and expressed in `rem`. Rounding is applied to the desktop anchors; mobile anchors are set independently so that display steps stay inside a 320 px viewport, which strict ratio scaling at mobile would not achieve.

**Why the mobile anchors are not simply the desktop scale multiplied down.** A strict proportional reduction produces a body size below 17 px, which is uncomfortable, or display sizes that still overflow. Compressing the top of the scale more than the bottom is the standard resolution, and it is why the mobile column is not derived arithmetically.

### Semantic assignment

| Semantic token | Step | Face | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| `--type-display` | 800 | Display | 400 | 1.05 | −0.025em |
| `--type-heading-1` | 700 | Display | 400 | 1.10 | −0.02em |
| `--type-heading-2` | 600 | Display | 400 | 1.15 | −0.015em |
| `--type-heading-3` | 500 | Display | 500 | 1.25 | −0.01em |
| `--type-heading-4` | 400 | Text | 600 | 1.35 | −0.005em |
| `--type-lede` | 400 | Text | 400 | 1.50 | −0.005em |
| `--type-body` | 300 | Text | 400 | 1.60 | 0 |
| `--type-body-sm` | 200 | Text | 400 | 1.55 | 0 |
| `--type-label` | 200 | Text | 600 | 1.30 | 0.01em |
| `--type-caption` | 100 | Text | 400 | 1.45 | 0.005em |
| `--type-metric` | 800 | Display | 400 | 1.00 | −0.02em |
| `--type-code` | 200 | Mono | 400 | 1.55 | 0 |

**Note that `--type-heading-4` uses the text face, not the display face.** Below roughly 24 px the serif's advantage disappears and its lower x-height makes it harder to read than the sans at the same size. The switch point is a legibility decision, not an arbitrary boundary, and it is why heading 4 also carries weight 600 — it needs a different mechanism to signal hierarchy once it can no longer use the face change.

**Tracking rationale.** Negative tracking at display sizes compensates for the fact that type designed to be readable at 18 px has spacing that reads as loose at 44 px. Positive tracking on labels and captions compensates in the opposite direction. Body text is untracked because the designer's spacing is correct at the size it was drawn for, and adjusting it is almost always a mistake.

---

## 4. Vertical rhythm

Spacing between typographic elements derives from the line height of the element above, not from an independent spacing scale. This is what makes the page feel set rather than assembled.

One body line = 18 px × 1.6 = **28.8 px** at desktop, 17 px × 1.6 = 27.2 px at mobile. All values below are multiples of that unit and resolve fluidly with it. They are deliberately not on the component spacing scale (`SPACING.md` §3) — prose rhythm and component spacing are two systems with a documented boundary.

| Relationship | Space |
|---|---|
| Paragraph → paragraph | 1 body line |
| Paragraph → heading 3 | 2 body lines, minus the heading's leading trim |
| Paragraph → heading 2 | 3 body lines |
| Heading → its first paragraph | 0.5 body line |
| Paragraph → list | 0.75 body line; list items 0.5 line apart |
| Paragraph → figure, table, code block | 1.5 body lines both sides |
| Section → section | Section rhythm scale (`SPACING.md` §4) |

**The asymmetry is deliberate.** Space above a heading is always larger than space below it, so a heading groups with the content it introduces rather than floating between two blocks. This is the single most common typographic error in developer-authored interfaces and it is the reason many otherwise-clean pages feel disorganised.

**Leading trim.** Headings apply half-leading trim at the top so that their optical top edge — the cap height, not the line box — aligns to the spacing grid. Without this, a heading at line height 1.1 sits visually lower than its measured position, and every heading in the document is misaligned by a different amount depending on its size.

---

## 5. Measure and reading

**Prose measure is capped at 68 characters** (`ARCHITECTURE.md` §8). Implemented as a `max-width` in `ch` units against the body font, so it tracks the actual font rather than a pixel guess.

**Why 68.** The research range for comfortable sustained reading is roughly 45–75 characters. Below 50, the eye returns too frequently and the reader loses rhythm. Above 75, the return sweep becomes unreliable and readers lose their line. 68 sits at the upper end of comfortable, which is the right end for a technical audience reading long-form arguments — it reduces the number of line returns over three thousand words without crossing into discomfort.

**Other measures.**

| Context | Measure |
|---|---|
| Prose body | 68ch |
| Lede paragraphs | 60ch — larger type wants a shorter line |
| Display headings | 24ch (display), 32ch (heading 1–2) — headline measure is much shorter than body measure |
| Captions and labels | Constrained by their container, never wider than 68ch |
| Table and diagram break-outs | `SPACING.md` §6 |

**Orphans, widows, and breaking.**

- Headings use balanced wrapping so a two-line heading splits evenly rather than leaving one word on line two.
- Prose paragraphs use pretty wrapping where supported, which prevents single-word last lines. Where unsupported, no fallback — this is a refinement, not a requirement.
- Long identifiers, URLs, and file paths in prose break at sensible points rather than overflowing. A horizontal scrollbar on a paragraph is a defect.
- Hyphenation is off. Automatic hyphenation quality varies too much across engines to be trusted in a system this exacting.

---

## 6. Emphasis

Hierarchy is built from **scale, weight, face, and space** — in that order of preference. Colour is not a hierarchy mechanism (`VISUAL_LANGUAGE.md` §5), and opacity is not available for text (`ARCHITECTURE.md` §8).

| Mechanism | Use | Constraint |
|---|---|---|
| Scale | Primary hierarchy between levels | From the scale only |
| Weight | Secondary hierarchy within a level; interface emphasis | 400 and 600 only in the text face; 400 and 500 in the display |
| Face | Display versus text marks the heading/body boundary | Never mixed within a line except for metric units |
| Space | Grouping and separation | Vertical rhythm (§4) |
| Italic | `<em>` — genuine semantic emphasis in prose | Text face only. Never for decoration, never for whole paragraphs |
| Bold | `<strong>` — importance, not loudness | Weight 600. Never more than a short phrase; a bolded sentence is a heading in the wrong element |
| Small caps | Not used | The chosen faces lack true small caps, and synthesised small caps are a craft failure |
| Underline | Links only | Never for emphasis. An underlined non-link is a broken affordance |
| Uppercase | Eyebrow labels only, with positive tracking | Never in prose. Reduces reading speed and is read as shouting by screen readers with some settings |

**Secondary text.** Where text must recede — captions, metadata, timestamps — it recedes by using a smaller step and a lower-contrast *token from the colour system*, never by opacity and never below the contrast floors in `ACCESSIBILITY.md` §3. `--color-text-secondary` is a real colour with a verified contrast ratio, not `--color-text-primary` at 60%.

---

## 7. Figures and numerals

**Tabular lining figures are the default** everywhere numbers are compared, stacked, or aligned: metrics, comparison tables, timelines, version numbers, budget tables. This is a `font-feature-settings` decision applied at the semantic-token level, not per component.

**Proportional figures** are used only inside running prose, where tabular spacing looks gapped.

**Metric numerals** (`--type-metric`) are set in the display serif at step 800 with tabular lining figures. Units, qualifiers, and labels beside them are set in the text face at `--type-label`, never in the serif — the number is the artifact, the label is annotation (`VISUAL_LANGUAGE.md` §2.4).

**Slashed or dotted zero** is not enabled. In prose and metrics it is unnecessary; in code, the system monospace face handles it according to the reader's own platform conventions.

---

## 8. Behaviour under stress

The system must remain legible in conditions that are not the design condition. Each of these is verified (`ACCESSIBILITY.md` §7), not assumed.

| Condition | Required behaviour |
|---|---|
| Webfonts fail to load | Fallback stack renders at matched metrics. Layout is identical; only the face differs |
| 200% zoom | All text reflows. No horizontal scroll. No clipped or overlapping text |
| 320 px viewport | Display step 800 fits without overflow. Measure collapses to container width |
| User text-spacing overrides (WCAG 1.4.12) | No clipping or overlap at 1.5× line height, 0.12em letter spacing, 0.16em word spacing, 2em paragraph spacing |
| Forced colors mode | Type hierarchy survives via scale, weight, and face. Nothing depends on a colour that gets replaced |
| Browser minimum font size set high | No text becomes clipped; containers grow rather than truncate |
| Long unbroken strings | Break rather than overflow (§5) |
| Print | Serif display retained; body reflows to the page measure; link URLs are not expanded (they would be noise in a case study) |

---

## 9. Maintenance implications

- **The scale ratio is effectively permanent.** Changing 1.25 to any other value invalidates every vertical rhythm value in §4 and every optical adjustment in §3. This is a major version event (`DESIGN_SYSTEM.md` §7).
- **Typeface changes require recomputing fallback metric overrides.** The `size-adjust` values in §2 are specific to the pairing. A face swap without recomputing them reintroduces layout shift, and CI will catch it — but only after the work is done.
- **The two-family, four-weight limit is the thing most likely to be eroded.** The pressure will come as "just one more weight for this one component." Each such request has a real cost in bytes and a larger cost in consistency. Additions require a written justification (`DESIGN_SYSTEM.md` §6).
- **The `opsz` axis on the display face must be driven, not left at default.** An optical-size axis that is never set is dead weight in the file. If implementation does not bind it to font size, drop the axis and save the bytes.

---

## 10. User experience implications

- A reader on a mid-tier phone sees text in the fallback face within the first paint and never sees a reflow. The swap is imperceptible.
- A reader with a twenty-minute case study gets an 18 px body at a 68-character measure with 1.6 line height — near the top of the comfort range for sustained screen reading.
- A reader who scans rather than reads gets hierarchy that works in peripheral vision, because it is built from size and face rather than from colour.
- A reader using a screen reader gets a heading structure that matches the visual hierarchy exactly, because the visual hierarchy is built from the heading elements rather than applied over them.
- A reader who prints or saves to PDF gets a document that still looks set.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-08-04 | Initial specification. Typeface selection pending approval. |

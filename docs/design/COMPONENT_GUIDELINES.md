# Component Guidelines

**Status:** Active — specification only
**Version:** 0.1.0
**Last reviewed:** 2026-08-04
**Governed by:** [`ARCHITECTURE.md`](../ARCHITECTURE.md) §2, §6.4 · all documents in this directory

This document specifies component **behaviour** — states, structure, constraints, and the rules that govern each component's use. It contains no implementation. Where a value is needed to make a rule unambiguous, the semantic token is named rather than the value.

**The governing constraint from `ARCHITECTURE.md` §2:** components are server components by default. A component becomes a client component only if it requires interaction state, viewport observation, `matchMedia`, or animation. Each specification below states which side of that boundary the component sits on, because that decision has a bundle cost and should be visible at design time rather than discovered at implementation time.

---

## 1. Conventions used here

**State tables** cover the five states every interactive component must specify. A component that does not define all five has undefined behaviour in at least one.

| State | Meaning |
|---|---|
| Default | At rest |
| Hover | Pointer over, pointer devices only (`MOTION.md` §6.1) |
| Focus | Keyboard focus, via `:focus-visible` |
| Active | Being pressed |
| Disabled | Present but not operable |

**Disabled is nearly absent from this system.** The site has no forms and almost no controls that can be unavailable. Where a control would be disabled, the preferred answer is that it is not rendered. A disabled control that a reader cannot act on and cannot understand the reason for is worse than its absence.

---

## 2. Primitives

### 2.1 Link (in prose)

Server component.

| State | Treatment |
|---|---|
| Default | `--color-text-accent`, underline at 1 px, offset 0.15em, `--duration-fast` transition ready |
| Hover | `--color-interactive-hover`, underline thickness 2 px |
| Focus | Focus ring (`ACCESSIBILITY.md` §4). Underline retained |
| Active | `--color-interactive-pressed` |
| Visited | Not styled. On a site with seven routes, visited state adds noise without navigational value |

**Rules.**

- **Prose links are always underlined.** Colour alone is not a sufficient link indicator — it fails colour-vision deficiency and forced-colors mode, and it violates the "no meaning by colour alone" requirement (`ACCESSIBILITY.md` §5). The underline is the affordance; the colour is reinforcement.
- **Link text is descriptive.** Never "click here," never a bare URL in running prose. The accessible name must make sense read out of context, because screen reader users routinely navigate by link list.
- **Outbound links carry the `arrow-up-right` icon** (`ICONOGRAPHY.md` §7) and are announced as opening externally. They do not open in a new tab — that decision belongs to the reader.
- **Navigation and card links are not underlined**, because their affordance comes from position and container. This is the only exception and it is deliberate.

### 2.2 Button

Client component only when it carries an action; the majority of "buttons" on this site are links styled as buttons and remain server components.

Two variants. A third would exceed what seven routes require.

| Variant | Use |
|---|---|
| `primary` | The single most important action on a surface. At most one per viewport |
| `secondary` | Everything else |

| State | Primary | Secondary |
|---|---|---|
| Default | Fill `--color-interactive`, text `--color-text-on-accent`, no border | Transparent, text `--color-text-primary`, 1 px `--color-border-strong` |
| Hover | Fill `--color-interactive-hover` | Border `--color-text-primary`, background `--color-surface-raised` |
| Focus | Focus ring, offset 2 px | Focus ring, offset 2 px |
| Active | Fill `--color-interactive-pressed`, `scale(0.99)` | Background `--color-surface-sunken`, `scale(0.99)` |
| Disabled | Not rendered — see §1 | Not rendered |

**Rules.**

- **Minimum target 44 × 44 px** including padding, on every device. This exceeds the WCAG 2.2 minimum of 24 × 24 (`ACCESSIBILITY.md` §5) because the reference device is a phone and the cost is zero.
- **A button that navigates is a link.** Semantics follow behaviour, not appearance. A styled `<a>` is correct for navigation; a `<button>` that changes `location` is not.
- **Label is a verb phrase.** "Read the case study," not "More."
- **No icon-only buttons** except the four enumerated in `ICONOGRAPHY.md` §6: mobile navigation toggle, overlay close, code-block copy, and the theme control trigger.
- **Never `scale()` on a button containing text at any size above `--type-body`** — glyph resampling is visible at larger sizes (`MOTION.md` §6.1).

---

## 3. Navigation

### 3.1 Header

Server component; the mobile disclosure inside it is a client leaf.

**Structure.** Wordmark (text, set in the display face) at the left; primary navigation at the right; theme control adjacent. Separated from content by a hairline.

**Rules.**

- **Not sticky.** A sticky header consumes vertical space on every scroll of a long case study, which is the surface where vertical space matters most. The reader's route back is the browser's back affordance and the footer.
- **Current route is marked by two mechanisms** — `--color-text-primary` weight 600 plus `aria-current="page"`. Colour alone would fail the same test link colour does.
- **Below `--bp-sm`, navigation collapses** to the `menu` toggle and an overlay panel (§3.2).
- **The skip link is the first focusable element** on every page, visually hidden until focused, then rendered at full contrast above the header (`ACCESSIBILITY.md` §4).
- **Maximum five primary items.** The site has seven routes; two of them (`/resume`, `/404`) do not belong in primary navigation.

### 3.2 Mobile navigation overlay

Client component.

| Property | Specification |
|---|---|
| Surface | `--color-surface-overlay`, scrim over the page beneath |
| Entry | Opacity only under reduced motion; opacity plus 16 px translate otherwise, `--duration-base` |
| Focus | Trapped within the panel while open |
| Dismissal | `close` control, `Escape`, scrim click |
| Return focus | To the `menu` toggle that opened it |
| Background | Page scroll locked while open |

This is the only floating surface in the system and the only place a scrim is used (`COLOR_SYSTEM.md` §6).

### 3.3 Footer

Server component. Contact affordance, source links, theme control at narrow widths, copyright. Separated by a hairline and `--space-section-lg` above.

**The footer is the terminal action for every route** (`ARCHITECTURE.md` §4: no route is a dead end). It must always offer a contact path.

---

## 4. Cards

### 4.1 Project card

Server component. The primary element of `/work` and the highest-value component on the site — it is where a hiring manager forms their impression of breadth.

**Structure, in reading order.**

1. Competency story label — `--type-label`, uppercase, `--color-text-secondary`
2. Project title — `--type-heading-3`, display face
3. Lifecycle badge (§5.1)
4. Summary — `--type-body`, maximum three lines
5. Stack tags (§5.2), maximum five
6. Continue affordance — `arrow-right` icon with text

| State | Treatment |
|---|---|
| Default | `--color-surface-raised`, 1 px `--color-border-subtle` |
| Hover | Border `--color-border-strong`, `translateY(-2px)`, title colour → `--color-interactive` |
| Focus | Focus ring on the card's outer boundary. The card *is* the link, so there is no inner focusable element |
| Active | `translateY(0)`, background `--color-surface-sunken` |

**Rules.**

- **The whole card is one link, with one accessible name.** Multiple links inside a card produce a confusing tab order and a link list full of "Read more."
- **The competency label leads.** ADR-012 requires the competency thesis to be legible at a glance; putting the label above the title is what makes `/work` scannable as three distinct stories rather than three projects.
- **No cover image on the card.** An image per card would consume the entire above-the-fold image budget (`ARCHITECTURE.md` §7) and would make the cards about screenshots rather than about the competency claim.
- **Fixed number of summary lines, not fixed height.** Content determines height (`SPACING.md` §7); the summary is capped at three lines by content discipline, verified at authoring time, not by truncation. Truncated text is content the reader cannot reach.

### 4.2 Generic card

Used for grouped content within a case study. Same surface and border treatment; no hover state, because it is not interactive. A card that does not link should never appear interactive.

---

## 5. Badges and tags

### 5.1 Lifecycle badge

Server component. Renders the `lifecycle` frontmatter value (`ARCHITECTURE.md` §6.3).

| Property | Specification |
|---|---|
| Type | `--type-label`, weight 600 |
| Shape | 2 px radius, `--space-1` block padding, `--space-2` inline padding |
| Colour | Text and a subtle surface tint from the status tokens (`COLOR_SYSTEM.md` §7) |
| Border | 1 px, matched to the text colour at reduced chroma |

| Value | Status token |
|---|---|
| `production`, `released` | `--color-status-positive` |
| `maintained` | Neutral — `--color-text-secondary` on `--color-surface-raised` |
| `experimental`, `prototype`, `research` | `--color-status-caution` |
| `archived` | Neutral, at `--color-text-tertiary` |
| `future` | Neutral, outlined only, no fill |

**Rules.**

- **The label text carries the meaning; colour reinforces it.** A greyscale reader loses nothing (`ACCESSIBILITY.md` §5).
- **Never abbreviated.** "Production," not "Prod." The badge is a claim and claims are stated in full.
- **`archived` and `future` are as prominent as `production`** (`ARCHITECTURE.md` §6.3). Styling them to recede would make the honest labels quieter than the flattering ones, which defeats the purpose of having them.

### 5.2 Stack tag

Server component. Neutral, non-interactive, `--type-label` at `--color-text-secondary` on `--color-surface-raised`, 2 px radius.

**Rules.**

- **Not links.** A technology tag that navigates implies a filtered index that does not exist and should not (`FOUNDATION.md` §12 — no technology grid).
- **Maximum five per card, ordered by significance** (`ARCHITECTURE.md` §6.3). A six-technology list is a stack dump, not a claim.
- **No logos.** Text only.

---

## 6. Case-study layout

Server component. The most important layout in the system — it hosts the nine-section document model (`ARCHITECTURE.md` §6.2) and it is where a reader spends twenty minutes.

**Structure.**

| Region | Container | Density |
|---|---|---|
| Header — title, lifecycle, summary, links, three outcomes | `--container-wide` | `compact` |
| Body — sections 2–9 | `--container-prose`, break-outs per `SPACING.md` §6 | `reading` |
| Footer — adjacent case study, source links | `--container-wide` | `default` |

**Rules.**

- **Section headings are `--type-heading-2`, and there is exactly one `<h1>`** — the project title.
- **The nine sections appear in the specified order, always.** Uniformity is the mechanism by which a thin section becomes visible (`ARCHITECTURE.md` §6.2).
- **No sticky table of contents.** It consumes horizontal space at desktop, collapses to a disclosure at mobile, and duplicates a structure that the heading hierarchy already exposes to assistive technology. A reader who wants to skim uses the headings.
- **No reading-progress indicator.** It measures scroll position, which is not reading progress, and it is decoration that updates on every scroll frame.
- **Section boundaries are marked by `--space-section-md` and nothing else.** No rules, no numbers, no icons.

---

## 7. Timeline

Server component. Renders section 3 of the case-study model (`ARCHITECTURE.md` §6.2).

> **This is a project timeline, never a career timeline.** It traces one project from planning to current status and exists inside a single case study. There is no site-wide chronology of roles, employers, or years, and there is no `/timeline` route — a career chronology would imply the career-progression narrative that ADR-012 exists to prevent, and `/resume` already serves that need for the reader who has it. If a future contributor is asked for "the timeline," this is the only thing that means.

**Structure.** A vertical sequence of stages. Each entry: stage name (`--type-label`, uppercase), period (`--type-caption`, tabular figures), body (`--type-body`).

**Visual treatment.** A single hairline runs the full height at the left of the stage column, with each entry marked by a 5 px square node on that line. Squares, not circles — the system has no circles anywhere else, and a square node reads as a measurement mark rather than a bullet.

**Rules.**

- **Semantically an ordered list.** The order is the meaning; it must be exposed as order, not implied by position.
- **Stage names come from the canonical set** (`ARCHITECTURE.md` §6.2): Planning, Architecture, Implementation, Major setbacks, Verification, Release, Future roadmap. Adapted per project, not invented per project.
- **Major setbacks entries are visually identical to every other entry.** Marking them with a warning colour or icon would make the honest entries look like errors, which discourages writing them. They are ordinary engineering events and the design says so.
- **No horizontal timeline variant.** Horizontal timelines break at every narrow viewport and force a scroll direction the rest of the page does not use.
- **Periods use tabular figures** so that dates align down the column (`TYPOGRAPHY.md` §7).

---

## 8. Content components

These are the MDX component map from `ARCHITECTURE.md` §6.4. The set is closed.

### 8.1 Callout

Server component. Three variants, each bound to a semantic status (`COLOR_SYSTEM.md` §7).

| Variant | Use | Icon |
|---|---|---|
| `note` | A constraint or aside | None |
| `caution` | A limitation or risk | `alert` |
| `critical` | A failure, reversal, or thing that went wrong | `x-circle` |

**Structure.** Optional heading (`--type-heading-4`), body, left border 2 px in the status colour, `--color-surface-raised` background, `--space-6` padding.

**Rules.**

- **The variant is legible from the text**, not only from the colour or icon. A callout whose meaning depends on its border colour has failed.
- **Never nested.** A callout inside a callout means the outer one is a section.
- **`critical` is for the Failures & mistakes section and its equivalents.** It is not an error state and must not read as one — it marks honest disclosure, which the site treats as valuable content.

### 8.2 Blockquote and pull quote

Server components, distinct treatments.

**Blockquote** — quoted external material. Set in the text face at `--type-body`, indented from the prose column, marked by a 2 px left rule at `--color-border-strong`. Attribution in `--type-caption`. No quotation marks — the rule and indent already mark it, and decorative quote glyphs are the most common ornamental cliché in this category.

**Pull quote** — an emphasised line drawn from the surrounding prose. Set in the display face at `--type-heading-3`, roman (not italic — `TYPOGRAPHY.md` §2), breaking out to `--container-wide`, with `--space-section-sm` above and below.

**Rules.**

- **A pull quote never introduces new content.** It repeats something already in the prose. A reader who skips it loses nothing; a reader who reads only pull quotes gets the argument's spine.
- **Maximum one pull quote per case-study section.** More than that and the device stops marking emphasis.
- **Blockquotes use `<blockquote>` with `<cite>`.** The semantics carry to assistive technology; the visual treatment is secondary.

### 8.3 Code block

Server component; the copy affordance is a client leaf — one of the four client components the architecture anticipates (`ARCHITECTURE.md` §2).

| Property | Specification |
|---|---|
| Surface | `--color-surface-sunken`, 1 px `--color-border-subtle` |
| Type | `--type-code`, system monospace (`TYPOGRAPHY.md` §2) |
| Highlighting | Build-time, via a Shiki-class highlighter. No client-side library |
| Overflow | Horizontal scroll within the block. The page never scrolls horizontally |
| Language label | `--type-caption`, top right, `--color-text-tertiary` |
| Copy control | Icon button, appears on hover at pointer devices, always present and focusable for keyboard |

**Rules.**

- **The copy control is always in the tab order**, not only on hover. A control that only exists on hover does not exist for keyboard or touch.
- **Copy success is announced**, not only shown — the `check` icon swap is supplemented by a live region.
- **Syntax highlighting colours are a separate concern from the palette** and must meet 4.5:1 against the code surface in both themes. A highlighting theme is chosen to satisfy that, not adopted wholesale from a popular scheme.
- **No line numbers by default.** They are copied along with the code in most selection implementations, which makes the block hostile to its primary use.
- **Code blocks break out to `--container-wide`** where the content warrants it, and return to prose width immediately.

### 8.4 Figure

Server component. Image or inline diagram plus caption.

**Rules.**

- **Alt text is required by schema** (`ARCHITECTURE.md` §7). There is no path to a figure without it.
- **Caption is not alt text.** The caption is visible to everyone and adds context; the alt text describes the image for those who cannot see it. Duplicating one into the other serves neither.
- **Explicit dimensions always.** This is the primary CLS defence (`ARCHITECTURE.md` §7).
- **Framed by a hairline, nothing else.** No shadow, no device frame, no perspective (`VISUAL_LANGUAGE.md` §7).

### 8.5 Diagram

Server component. Inline SVG, `currentColor`, real `<text>` nodes (`ARCHITECTURE.md` §7).

**Rules.**

- **Stroke weight matches the hairline** at 1 px for structure, 1.5 px for emphasis — the same weights as the icon system, so diagrams and icons read as one hand.
- **Text in diagrams uses the text face at `--type-caption` or `--type-body-sm`**, never smaller. A diagram label below 12 px is unreadable at mobile widths.
- **Orthogonal routing.** Connectors run horizontally and vertically with 2 px corner radii. Diagonal and curved connectors are harder to follow and inconsistent with the system's geometry.
- **Accessible description required.** The `<text>` nodes make labels readable, but the diagram's *relationships* need a description — either a caption that states them or a linked longer description.
- **No colour-coded legends.** If a diagram distinguishes categories, it does so by stroke pattern and label (`ACCESSIBILITY.md` §5).

### 8.6 Decision

Server component. Renders a structured decision block inside a case study: context, choice, alternatives, consequence.

**Structure.** Four labelled regions in fixed order, labels in `--type-label` uppercase at `--color-text-secondary`, bodies in `--type-body`. Contained by a 1 px border, no fill.

**Rules.**

- **All four regions are required.** A decision block missing its alternatives is the exact failure mode ADR-002 exists to prevent, and the component should make the omission visible rather than collapse gracefully.
- **Visually distinct from a callout.** A decision is a primary content structure; a callout is an aside. Bordered-no-fill versus filled-with-left-rule is the distinction.

### 8.7 Metric

Server component. A single number with label and qualifier (`VISUAL_LANGUAGE.md` §2.4).

| Element | Treatment |
|---|---|
| Value | `--type-metric` — display face, step 800, tabular lining figures |
| Unit | `--type-heading-4`, text face, baseline-aligned to the value |
| Label | `--type-label`, `--color-text-secondary`, below |
| Qualifier | `--type-caption`, `--color-text-tertiary` |

**Rules.**

- **Maximum three adjacent.** Four or more is a comparison, and comparisons are tables (§8.8).
- **The qualifier is not optional where the number needs one.** An anonymised or relative figure from employer work must state that it is one (`FOUNDATION.md` §10). A number without its conditions is a claim without its evidence.
- **Never animated.** Counting-up animations delay the evidence and add motion with no informational content (`MOTION.md` §1).

### 8.8 Comparison table

Server component. Two- or three-way tradeoff comparison.

**Rules.**

- **Real table semantics** — `<table>`, `<th>` with `scope`, `<caption>`. This is tabular data and assistive technology needs the structure.
- **Header row at `--color-surface-raised`**, separated by a hairline. No zebra striping — alternating rows are a workaround for tables that are too dense, and the fix is fewer columns.
- **Tabular figures throughout** (`TYPOGRAPHY.md` §7).
- **Horizontal scroll within a container at narrow widths**, with the container focusable so a keyboard reader can scroll it. The page never scrolls horizontally.
- **Breaks out to `--container-wide`.**

---

## 9. Cross-cutting rules

1. **No component sets a colour, size, space, or duration that is not a semantic token.** A hard-coded value is a defect (`ARCHITECTURE.md` §3, rule 5).
2. **No component has a fixed height** (`SPACING.md` §7).
3. **Every interactive component defines all five states** (§1).
4. **Every interactive component is reachable and operable by keyboard**, in an order matching its visual order.
5. **Every component renders correctly without JavaScript.** Client components enhance; they do not enable.
6. **Every component is specified at 320 px.** A component that only works above a breakpoint is unfinished.
7. **Hover never reveals information** (`MOTION.md` §6.1).
8. **Nothing truncates content.** Content determines size; a reader can always reach every word.

---

## 10. Maintenance implications

- **The closed MDX component set is the boundary that keeps case studies portable** (`ARCHITECTURE.md` §6.4). A one-off component authored for a single case study makes that document dependent on this application.
- **The project card is the component most likely to accumulate requests** — a cover image, a metric, a date, a second link. Each addition dilutes the competency claim that the card exists to make.
- **Two-variant buttons will be under pressure to become four.** Ghost and destructive variants have no consumer on this site.
- **The `Decision` and `Callout` components look similar enough to be confused by a future author.** Their distinction is documented in §8.6 and should be preserved in naming, not only in styling.
- **If a component's state table has an undefined cell after Phase 3, the component is not finished** — regardless of whether the undefined state is currently reachable.

---

## 11. User experience implications

- A reader tabbing through `/work` moves card to card, one stop each, with a clear focus indicator and a meaningful accessible name at every stop.
- A reader on a phone gets 44 px targets on every control, above the standard's requirement.
- A reader who cannot see colour can distinguish every link, every badge, every callout variant, and every diagram category.
- A reader who skims a case study by pull quotes gets the argument's spine without reading a word of prose.
- A reader who copies a code sample gets the code, not the line numbers.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-08-04 | Initial specification. |

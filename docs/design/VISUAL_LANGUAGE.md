# Visual Language

**Status:** Active — specification only
**Version:** 0.1.0
**Last reviewed:** 2026-08-04
**Governed by:** [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) · [`FOUNDATION.md`](../FOUNDATION.md) §8

`DESIGN_SYSTEM.md` defines the machinery. This document defines the character — what the site looks and feels like, and why it looks and feels that way rather than some other way. It is the document to read when a design decision is not covered by a rule and someone has to exercise judgement.

---

## 1. The concept: instrument, not brochure

The site presents itself as a precision instrument or a well-set technical publication, not as a marketing surface.

The distinction is concrete. A brochure uses visual devices to create feeling and to direct attention toward a conclusion the reader has not yet reached. An instrument presents information at the highest available fidelity and trusts the reader to draw the conclusion. Brochures use gradients, imagery, and motion to compensate for content that cannot carry itself. An instrument is legible, exact, calm, and gives away nothing about how hard it was to build.

This follows directly from the portfolio's thesis (ADR-013). A site arguing that engineering judgement is the scarce capability cannot be persuading by decoration — the form would contradict the claim. The reader is a senior engineer, a hiring manager, or a founder. All three are professionally trained to discount presentation and look for substance. Presentation that gets in the way of substance is not neutral with this audience; it is a negative signal.

**What this means in practice.** Neutral ground. Exact alignment. One accent, used functionally. Generous rest. Type doing nearly all the expressive work. Nothing that moves without a reason. Nothing that exists to be noticed.

**The intended reaction** is not "this looks impressive." It is the absence of friction — the reader gets three thousand words in without noticing the interface, and if asked afterwards could not describe it beyond "clean." That is the target. A memorable interface on a site whose subject is the content has failed at its job.

### Why not the alternative

**A high-craft expressive design** — signature effects, distinctive motion, a strong colour identity. This is what most portfolios in the reference class attempt, and done exceptionally it works. Rejected for two reasons. First, it competes with the content for the reader's attention, and the content is the argument. Second, it is graded against a field of thousands of attempts and is the axis where a full-time designer wins; the axis where a senior engineer wins is restraint, correctness, and things that are hard to fake — 7:1 contrast, a 120 KB budget, a keyboard path that actually works. Compete where the evidence is verifiable.

**A deliberately plain, unstyled document** — the "brutally honest engineer" position. Rejected because `FOUNDATION.md` §8 requires the site to feel premium, and because plainness is not restraint. Restraint is the deliberate removal of things that were available; plainness is the absence of decisions. A reader cannot tell the difference between an engineer who declined to design and one who could not, and the site cannot afford that ambiguity.

---

## 2. The five compositional devices

The visual identity is carried by five devices and nothing else. A new surface is composed from these; anything requiring a sixth device should be questioned.

### 2.1 The hairline

A one-pixel rule in the neutral ramp is the primary structural element. Rules separate sections, delimit tables, underline links on hover, mark the edges of raised surfaces, and establish the horizontal rhythm of the case-study layout.

**Why.** Hairlines work identically in light and dark themes; shadows do not (`COLOR_SYSTEM.md` §6). They cost one border declaration and no paint complexity. They read as precision — drafting, engineering drawings, financial typesetting — rather than as depth simulation. And a rule is honest about what it is: a boundary, not a fake object floating above a fake surface.

**Rules.** Always exactly 1 CSS pixel, never scaled with the type scale or the density mode — the rule is a constant, which is what makes it read as a drawn line rather than as a border that grew. Always from the border token set, never an arbitrary colour. Never doubled — two adjacent rules mean the layout is wrong. Never dashed or dotted except where a diagram needs to distinguish a logical boundary from a physical one.

### 2.2 The measure column

Everything aligns to a single prose column capped at 68 characters. Wider elements — diagrams, comparison tables, full-bleed figures — break out of it symmetrically, and they return to it immediately. The column is perceptible as a rhythm even where no rule marks it.

**Why.** Measure is the largest single lever on reading comfort (`ARCHITECTURE.md` §8), and case studies are read for twenty minutes. A stable column also gives the eye a fixed return point after every break-out element, which is what makes a long document feel navigable rather than sprawling.

**Rules.** The column is a constant, not a per-page decision. Break-outs are centred on the column axis and use one of exactly three widths (`SPACING.md` §6). A break-out that is not clearly worth its interruption is set inside the column instead.

### 2.3 Typographic contrast as the only flourish

Serif display against sans text is the single expressive move in the system. Everything else — colour, elevation, motion, iconography — is deliberately neutral so that this one contrast carries the identity.

**Why.** Concentrating expression in one dimension is what makes restraint legible as a choice. It also puts the identity in the element that is present on every surface at every scroll position, which is the cheapest possible way to be recognisable. And it is the device least likely to date: the serif/sans pairing is two centuries old and has survived every trend cycle in between.

**Rules.** The serif appears in headings, pull quotes, the positioning statement, and metric numerals. Nowhere else — not in body copy, not in navigation, not in labels, not in code. Its scarcity is what gives it weight.

### 2.4 Numerals as artifacts

Metrics are set in the display serif at large size with tabular lining figures. This is the one place the system permits scale drama.

**Why.** Numbers are evidence, and this site's entire argument is evidentiary. A measured result presented at the same visual weight as the prose around it is being under-claimed. Setting it as an artifact — large, serif, precisely aligned — makes the reader stop, which is correct, because the number is the point of the paragraph.

**Rules.** Tabular lining figures always, so that stacked or adjacent numbers align on the decimal. Units and qualifiers set in the text face at small size, never in the serif — the number is the artifact, the label is annotation. Never more than three metrics adjacent; four or more is a table, and tables are for comparison rather than emphasis.

### 2.5 Asymmetric openers, symmetric bodies

Section openers and page headers may be asymmetric — offset from the column, ragged, weighted to one side. Body content is symmetric and centred on the measure column without exception.

**Why.** Asymmetry creates arrival. It signals a boundary more effectively than space alone and gives each major section a distinct visual entry point, which is what makes a long document scannable. Symmetric bodies then remove every variable from the reading experience. The pattern is: notice, then read undisturbed.

**Rules.** One asymmetric element per section, at its opening. Never inside prose. Never on the case-study body, where the reader's position in a long document is already cognitive load enough.

---

## 3. The typographic thesis

The single largest expressive decision in the system: **headings are set in an editorial serif; body and interface are set in a neutral sans.**

**Why.** Three reasons, in order of weight.

*It is the strongest available signal of the site's category.* Nearly every developer portfolio, and every reference product named in `FOUNDATION.md` §8 — Linear, Stripe, Vercel, Raycast, Apple — uses an all-sans system. Adopting a serif display places the site in the category of publications rather than products. That is the correct category: the reader's job is to read arguments, and the site's job is to make twenty minutes of reading feel like a considered experience rather than a documentation site.

*It satisfies "editorial, not decorative" literally rather than by assertion.* `FOUNDATION.md` §8 requires editorial typography. A sans-only system can be excellent and still not be editorial; the word means something specific about how publications set text.

*It achieves differentiation without novelty.* The requirement to feel "unlike a standard developer portfolio" could be met by an unusual typeface, an unusual colour, or an unusual layout — all of which date quickly. A serif/sans pairing is conventional in publishing, unconventional in this specific category, and effectively immune to trend cycles.

**Alternatives considered.**

*All-sans, single superfamily* (display and text cut of the same family). The safest option, and the one all five reference products use. Rejected because it forfeits the category signal entirely, and because a single family means hierarchy must come from size and weight alone — which works, but leaves the site looking like well-executed documentation rather than a publication.

*Serif for body, sans for interface* — prose in the serif, chrome in the sans. Genuinely appealing, and arguably better for sustained reading. Rejected on one hard constraint: `ARCHITECTURE.md` §8 is frozen and specifies "one display face for headings, one text face for body and interface." Reversing the roles would reinterpret a frozen document. It also carries real risk — serif body copy at 18 px is excellent on high-density displays and noticeably worse on 1× displays, and the reference device profile in `ARCHITECTURE.md` §10 is a mid-tier phone.

*Display face with a distinctive personality* — a high-contrast fashion serif or a quirky grotesque. Rejected as the exact failure mode the brief names: memorable for its own sake, dated within three years, and competing with the content.

Full typeface selection, metrics, and the fallback strategy: `TYPOGRAPHY.md`.

---

## 4. Surface and depth

The system is flat, and deliberately so. Depth is expressed by **surface lightness and a hairline border** — never by drop shadows, never by blur, never by translucency.

Exactly three surface levels exist (`COLOR_SYSTEM.md` §6): `base` (the page), `raised` (cards, callouts, code blocks), and `overlay` (the mobile navigation panel, the only element that ever floats).

**Why.** Shadows are a light-theme technique. In a dark theme a shadow against a dark surface is nearly invisible, which is why dark interfaces so often substitute a glow or a translucent border — both of which read as cheap, and both of which cost paint performance. Lightness plus a hairline behaves identically in both themes, requires no per-theme special-casing, costs nothing to render, and survives forced-colors mode where shadows are stripped entirely.

There is also a conceptual argument. Shadows simulate physical objects stacked in space. This interface is not a stack of objects; it is a document with regions. A hairline states a boundary honestly. A shadow states a fiction.

**Rejected:** glassmorphism and backdrop blur (expensive to composite, poor contrast, unmistakably of a specific period); layered shadow elevation scales (unmaintainable across two themes for three levels of depth); noise or grain textures (bytes spent on the appearance of texture).

---

## 5. Colour posture

The system is functionally monochrome. A neutral ramp carries the entire interface. One accent hue exists and appears in exactly four roles: links in prose, focus indicators, active navigation state, and interactive hover affordance. Three semantic hues exist and appear almost nowhere — they are reserved for callout variants and lifecycle badges.

**Why.** Colour is the most common way portfolios attempt distinction, and the least durable. A palette dates a site more precisely than a typeface does. More importantly, colour used decoratively spends a signal that is then unavailable when something actually needs to be signalled: if six things on the page are coloured, the one that means "this is interactive" no longer reads as meaningful.

Functional monochrome also forces hierarchy to be built from type, weight, and space — which is the hierarchy that survives greyscale, forced-colors mode, colour-vision deficiency, and printing. `FOUNDATION.md` §8 requires "real hierarchy that survives without color." The cheapest way to guarantee that is to build the hierarchy without colour in the first place.

**Rejected:** a multi-hue brand palette (spends the signal, dates the site); competency colour-coding on `/work` (would convey meaning by colour alone, violating `ACCESSIBILITY.md` §5, and ADR-012 specifies differentiation by label and ordering); gradient anything.

Full ramp, accent rationale, and semantic mapping: `COLOR_SYSTEM.md`.

---

## 6. Density and pacing

Three densities, each bound to a surface rather than offered as a preference (`SPACING.md` §5).

- **Compact** — the layer-1 region above the fold. Information-dense, immediate, minimal scroll cost. A recruiter with thirty seconds should not have to scroll past whitespace to reach the claim.
- **Default** — index pages, `/about`, `/workflow`, navigation, footers.
- **Reading** — case-study bodies. Generous, paced, with section spacing large enough that a reader always knows where a section boundary is without a rule.

**Why density is a surface property, not a user setting.** A density toggle sounds user-respecting and is in practice a way of avoiding the decision. The correct density for a thirty-second scan and the correct density for a twenty-minute read are different, and the system knows which surface is which. Offering the choice pushes a decision the designer should have made onto a reader who has no context for making it.

---

## 7. Imagery and diagrams

**Prefer no image** (`ARCHITECTURE.md` §7). The visual identity is typographic; imagery is content, not decoration.

**Diagrams are the highest-value visual on the site** and are authored as inline SVG using `currentColor`, with real text nodes. They adopt the same visual language as everything else: hairline strokes at the border token weight, no fills except the surface tokens, labels set in the text face at the small step, orthogonal routing, generous internal spacing. A diagram should look like it was drawn by the same hand that set the type — which, in a token-driven system, it was.

**Screenshots** are framed by a hairline and nothing else. No browser chrome mockups, no perspective transforms, no device frames, no drop shadows. A screenshot is evidence; presenting it as a floating object in a rendered scene is decoration applied to evidence.

---

## 8. What this language explicitly rejects

Written down so these get declined quickly rather than relitigated. Each is a technique that is currently common, currently effective at attracting attention, and wrong for this site.

| Rejected | Why |
|---|---|
| Glassmorphism, backdrop blur | Compositing cost, poor and unpredictable contrast, strongly period-specific |
| Gradient meshes, aurora backgrounds, neon | Decorative by definition; dates within one cycle; spends the colour signal |
| Dark-mode-only | Halves the audience's comfort and signals aesthetic preference over user respect |
| Bento grids | A layout pattern in place of an information architecture |
| Marquee logo strips, technology grids | `FOUNDATION.md` §12 names these a non-goal; they signal nothing about capability |
| Custom cursors, cursor followers | `ARCHITECTURE.md` §9 prohibits them; they break pointer affordance for no gain |
| Scroll-driven narrative, parallax, scroll-jacking | Prohibited by `ARCHITECTURE.md` §9. Takes control of pacing from the reader |
| 3D, WebGL, canvas backdrops | Cannot fit the 120 KB budget; decorative; inaccessible |
| Noise, grain, paper texture | Bytes spent simulating a material the site is not made of |
| Text on images | Contrast becomes unverifiable; fails at every breakpoint differently |
| Animated numeric counters | Motion without informational content; delays the evidence |
| Testimonial cards, star ratings, "trusted by" | Persuasion devices from a category this site is not in |
| Emoji as interface elements | Renders inconsistently across platforms; conveys tone the interface should not have |

---

## 9. How to judge a new surface

When a page or component is not covered by an existing rule, apply these in order. They are ordered so that earlier questions dominate.

1. **Is it readable at 320 px, at 200% zoom, in greyscale, without JavaScript?** If not, it is not finished, regardless of anything else.
2. **Which of readability, storytelling, or perceived quality does each element serve?** An element serving none is removed (`FOUNDATION.md` §8).
3. **Is any element present because it looked empty?** Emptiness is a design element with a budget. Fill it only with something that earns its place.
4. **Does it use a sixth compositional device?** (§2.) If so, either compose it from the five or record why a sixth is warranted.
5. **Does it introduce a value not in the token set?** If so, the system is under-specified and gets amended — the component does not get an exception.
6. **Would a senior engineer reading it find anything that looks like it is trying?** If yes, remove that thing.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-08-04 | Initial visual language. Phase 2. |

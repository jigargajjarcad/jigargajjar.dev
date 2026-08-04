# Imagery

**Status:** Active — specification only
**Version:** 0.1.0
**Last reviewed:** 2026-08-04
**Governed by:** [`ARCHITECTURE.md`](../ARCHITECTURE.md) §7 · [`VISUAL_LANGUAGE.md`](./VISUAL_LANGUAGE.md) §7 · [`ICONOGRAPHY.md`](./ICONOGRAPHY.md)

`ARCHITECTURE.md` §7 specifies the technical image strategy — formats, delivery, dimensions, budgets, and the alt-text schema requirement. It is frozen and this document does not restate it.

This document specifies the **editorial** strategy: what may be shown, what may not, and how anything shown is treated. Icons are out of scope entirely (`ICONOGRAPHY.md`).

---

## 1. The credibility test

Every asset on this site answers one question before it earns its place:

> **Does this increase the reader's ability to verify a claim?**

If yes, it may exist. If it merely illustrates, decorates, fills space, or sets a mood, it does not. `ARCHITECTURE.md` §7 already states the default — *prefer no image* — because most portfolio imagery is decorative. This is the test applied to the exceptions.

The test has a useful property: it is answerable by someone other than the author. "Does this look good" is a taste question with no resolution; "does this let a reader check something" has an answer.

**The corollary that governs everything below: prefer the real engineering artifact over the produced graphic.** A screenshot of an actual terminal beats a rendered mock-up. A committed architecture diagram beats a marketing-grade illustration. Roughness in a real artifact is a credibility signal; polish in a fabricated one is the opposite.

---

## 2. Permitted asset classes

| Class | Permitted | Where |
|---|---|---|
| Architecture diagrams | **Yes — the highest-value visual on the site** | Case-study Architecture sections |
| Product screenshots | Yes, of real running software | Case studies |
| Terminal, CI, and test output | Yes | Case studies, Verification sections |
| Data visualisation | Yes, from real measurements only (§5) | Case studies, Outcomes sections |
| Portrait | One, on `/about` only (§6) | `/about` |
| Brand marks | GitHub, LinkedIn only (`ICONOGRAPHY.md` §7) | Footer, case-study links |
| Open Graph cards | Generated at build from content (`ARCHITECTURE.md` §7) | Social previews only |

---

## 3. Prohibited

| Prohibited | Why |
|---|---|
| **Stock photography** | Recognisable as stock, and its presence says the real thing was unavailable |
| **AI-generated imagery of any kind** | On a site arguing for verifiable engineering judgement, a fabricated image is a claim that cannot be checked. The contradiction is fatal, and it would be the first thing a skeptical reader tests |
| **AI-generated or stock people** | The above, plus a fabricated human is a deception regardless of intent |
| **Fabricated dashboards or mock data** | A screenshot of a UI populated with invented numbers is a fake artifact presented as evidence. If the real data cannot be shown, describe it in prose instead |
| **Decorative illustration** | Fails the credibility test by definition |
| **Abstract or gradient backgrounds** | Decorative; costs budget; dates the site (`VISUAL_LANGUAGE.md` §8) |
| **Technology logo grids** | A stated non-goal (`FOUNDATION.md` §12) |
| **Device frames, browser chrome mock-ups, perspective transforms** | Present evidence as a rendered object. `VISUAL_LANGUAGE.md` §7 |
| **Text rendered inside images** | Unselectable, untranslatable, unreadable by assistive technology, and contrast becomes unverifiable |
| **Employer interface screenshots** | Prohibited by the disclosure policy (`FOUNDATION.md` §10) |
| **Animated GIFs** | Enormous for their quality, cannot be paused, and autoplay is prohibited (`ARCHITECTURE.md` §9) |

---

## 4. Diagrams

Diagrams are the most valuable asset class here and the one to invest in. They are the only visual that can carry an architectural argument, and a good one does work that several paragraphs cannot.

Drawing rules are specified in `COMPONENT_GUIDELINES.md` §8.5 — inline SVG, `currentColor`, real `<text>` nodes, orthogonal routing, hairline strokes, no colour-coded legends. The editorial rules:

- **One diagram per architectural idea.** A diagram showing an entire system at once shows nothing. If a case study needs three, it has three ideas.
- **Diagrams show structure, not features.** Boundaries, data flow, failure modes, and trust edges. Not a labelled inventory of components.
- **Every diagram is referenced from the prose**, and the prose states what the reader should take from it. An unreferenced diagram is decoration positioned near text.
- **Diagrams are authored, not exported.** No screenshots of a diagramming tool's canvas (`ARCHITECTURE.md` §7). Authored SVG is theme-aware, selectable, searchable, and versionable in a diff — an exported PNG is none of these.
- **Complexity is capped by legibility at 320 px.** A diagram that requires a desktop viewport is a diagram most readers will not read.

---

## 5. Data visualisation

Charts are permitted and rare. They follow the diagram rules plus:

- **Real measurements only.** A chart of illustrative or representative data is fabricated evidence, which §3 prohibits. If the real numbers cannot be published, use prose and a qualifier.
- **The axis starts at zero** for any magnitude comparison. A truncated axis exaggerates a difference, and this site cannot afford a reader catching it.
- **Every chart states its source and conditions** — what was measured, on what, when. A number without conditions is a claim without evidence (`VISUAL_LANGUAGE.md` §2.4).
- **No colour-coded series without a second channel.** Direct labelling is preferred over a legend; where a legend is unavoidable, series are distinguished by pattern as well as hue (`ACCESSIBILITY.md` §5).
- **A chart with fewer than five data points is a table or a `Metric`.** Charting three numbers spends the reader's attention on decoding a form that a sentence would have delivered directly.
- **Chart type is chosen by the question, not by variety.** Comparison is bars. Change over time is a line. Nothing here needs anything else, and anything else should be justified in the case study's text.

---

## 6. Screenshots

- **Real running software only.** Not a design file, not a prototype, not a rebuilt-for-the-portfolio version.
- **Captured deterministically** by a committed script at fixed 2× viewport dimensions (`ARCHITECTURE.md` §7), so they are reproducible and consistent across case studies rather than being whatever the author's window happened to be.
- **Cropped to the subject.** A full-window screenshot to show one panel wastes the payload budget on chrome and shrinks the subject below legibility.
- **Never retouched.** No removed error badges, no cleaned-up data, no adjusted spacing. A retouched screenshot is a fabricated artifact.
- **Redaction is visible.** Where something must be obscured for disclosure reasons, it is covered with a solid neutral block and the caption says what was redacted and why. Blurring reads as concealment; a stated redaction reads as discipline.
- **Framed by a 1 px `--color-border-subtle` hairline and nothing else** (`VISUAL_LANGUAGE.md` §7). No shadow, no radius, no frame.

---

## 7. Terminal and CI output

The most credible asset class available, and the most underused in this category.

- **Prefer text over image.** Terminal output pasted into a code block is selectable, searchable, theme-aware, weighs nothing, and is readable by assistive technology. A screenshot of a terminal is none of these. Use the code block (`COMPONENT_GUIDELINES.md` §8.3) unless the colour or layout is itself the point.
- **Where an image is genuinely warranted** — a CI results view, a coverage report, a Lighthouse panel — it follows the screenshot rules in §6.
- **Never trimmed to show only passing output.** A test run with a failure in it, discussed in the surrounding prose, is worth more than a green screenshot.

---

## 8. Portrait

**At most one photograph of a person on the entire site, on `/about`, and it is optional.**

**Why it is permitted at all**, given that `ARCHITECTURE.md` §7 prefers no image: the collaborator audience (`FOUNDATION.md` §4.4) is deciding whether to work with a person, and a portrait is the one asset that serves a question no case study answers. It clears the credibility test narrowly — it verifies that there is a real, identifiable person behind the claims, which is not nothing on a site with a named employer and public repositories.

**Rules if included.**

- A real photograph of the actual person. Not an illustration, not an avatar, not a generated likeness.
- Neutral and plain. No office backdrop, no laptop prop, no conference-stage crop. The photograph should look like a photograph, not like a brand asset.
- Modest scale. It sits within the prose column, not as a hero.
- Framed by the same hairline as any other image, no radius, no shadow, no circular crop. A circular crop is a social-profile convention and imports that register.
- Alt text names the person and nothing else. A portrait's alt text should not describe appearance.
- Subject to the same budget as any image (`ARCHITECTURE.md` §7).

**Open question 2 in `EXPERIENCE_PRINCIPLES.md` §10 is whether it should exist at all.** The argument against: it is the only asset on the site that serves presence rather than verification, and the site's discipline is that presence is not a reason. Unresolved.

---

## 9. Video and animated assets

**No video, and no animated assets.**

- Autoplay is prohibited (`ARCHITECTURE.md` §9), and a video that requires a click is a video most readers will not watch.
- Video is unskimmable, forces the author's pacing on the reader, and is inaccessible without captions and a transcript — at which point the transcript is doing the work and the video is overhead.
- The payload is incompatible with the route budget (`ARCHITECTURE.md` §10) unless third-party hosted, which the zero-third-party constraint prohibits.
- A screen recording demonstrating an interaction is the strongest case for an exception. It is still declined: an annotated still plus prose conveys the same thing, is skimmable, and costs a fraction of the bytes.

If video is ever needed, it is an ADR against the performance budget, not a design decision.

---

## 10. Treatment

| Property | Rule |
|---|---|
| **Corner radius** | **Zero.** Images and their frames are square. `--radius-sm` and `--radius-md` (`TOKENS.md` §3.6) apply to interface containers, not to content. A rounded screenshot is a screenshot presented as a UI object |
| **Frame** | 1 px `--color-border-subtle`. Nothing else — no shadow, no inner glow, no gradient edge |
| **Aspect ratio** | Determined by the content, never by a layout grid. No forced 16:9 or 4:3. Diagrams are whatever shape the diagram is |
| **Cropping** | To the subject. Never to a shape. Never a circular crop, ever |
| **Alignment** | Within `--container-prose` by default; break out to `--container-wide` only when legibility requires it (`SPACING.md` §6) |
| **Full bleed** | Reserved for `--container-full` and effectively unused. An image touching the viewport edge is a magazine device and this is not a magazine |
| **Filters and overlays** | None. No duotone, no colour wash, no darkening scrim. An image is shown as it is or not shown |
| **Grouping** | Maximum two images side by side, and only for a before/after or a genuine comparison. Three or more is a gallery, and a gallery is decoration |

---

## 11. Captions and alt text

**Captions and alt text are different jobs and are never the same string.**

- **The caption** is visible to everyone and adds what the image does not carry — the conditions, the source, what the reader should notice. "The retrieval path after the hybrid-search change" is a caption. "Diagram" is not.
- **The alt text** describes the image for a reader who cannot see it. It is required by schema and there is no path to an image without one (`ARCHITECTURE.md` §7).
- **Diagrams need more than alt text.** The `<text>` nodes make labels readable, but the *relationships* are the content. Either the caption states them or a linked longer description does (`COMPONENT_GUIDELINES.md` §8.5).
- **Every image has a caption.** If an image is worth its budget, it is worth a sentence saying why it is there. An uncaptioned image on this site is usually an image that failed the credibility test and was not caught.

Conformance requirements are in `ACCESSIBILITY.md`; this section specifies editorial expectations only.

---

## 12. Dark and light variants

- **Diagrams need no variant.** `currentColor` and surface tokens mean one authored SVG serves both themes (`COMPONENT_GUIDELINES.md` §8.5). This is the strongest practical argument for authoring diagrams rather than exporting them.
- **Screenshots do need variants** where the captured software has both themes. Two captures, swapped by `prefers-color-scheme`, each within budget. Where the software has only one theme, one screenshot is used in both and the hairline frame separates it from the page.
- **A light screenshot on a dark page is acceptable** and is preferable to a fabricated dark version. The frame does the separation work.
- **Never invert or filter an image to produce a variant.** It corrupts colours that may be meaningful and produces artefacts that look like a rendering fault.
- **Brand marks follow their owners' guidelines**, which may specify per-theme versions.

---

## 13. Compression and quality

Technical budgets are frozen in `ARCHITECTURE.md` §7 — ≤ 150 KB per image, ≤ 400 KB of imagery per case study, at most one image above the fold. The editorial position within them:

- **Legibility is the floor, not file size.** A screenshot compressed until its text is soft has failed at the only thing it was for. If it cannot be legible within budget, crop it further or replace it with text.
- **Diagrams are effectively free** — authored SVG is a few kilobytes. This is another reason to prefer them, and it means the raster budget is available for the screenshots that genuinely need it.
- **Budget pressure is resolved by removing images, not by degrading them.** An image that cannot justify 150 KB probably could not justify its place (§1).
- **Quality settings are measured per image, not applied globally.** A screenshot of text and a photograph have different thresholds, and a single global quality value is wrong for one of them.

---

## 14. Anti-patterns

| Rejected | Why |
|---|---|
| Hero image on the home page | Consumes the entire above-fold budget for something typography carries better (`ARCHITECTURE.md` §7) |
| Cover image per project card | Makes `/work` about screenshots rather than about the competency claim (`COMPONENT_GUIDELINES.md` §4.1) |
| Image galleries or carousels | Decoration; hides content behind interaction; requires JavaScript |
| Fade-in on image load | Draws attention to arriving late (`INTERACTION.md` §7) |
| Parallax or scroll-linked imagery | Prohibited (`ARCHITECTURE.md` §9) |
| Lightbox or zoom-on-click | If the image needs zoom, it is cropped wrong or belongs at `--container-wide` |
| Watermarks | Nothing here needs protecting, and a watermark reads as insecurity |
| Screenshots with visible personal data | A disclosure failure and a judgement failure |

---

## 15. Open questions

1. **Does the portrait exist?** (§8.) The only asset on the site serving presence rather than verification. Genuinely unresolved and worth deciding deliberately rather than by default.
2. **Do the flagship projects have publishable screenshots at all?** NovaMind AI is a document-intelligence product — every realistic screenshot contains document content. Real documents may not be publishable and synthetic ones would be a fabricated artifact under §3. This may mean the case study is diagram-and-text only, which is acceptable but should be an intentional decision made while authoring, not a discovery.
3. **Is a Lighthouse or CI screenshot the right way to evidence this site's own quality claims?** The alternative is a linked, reproducible CI run, which is stronger evidence and requires no image at all. Leaning toward the link.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-08-04 | Initial specification. |

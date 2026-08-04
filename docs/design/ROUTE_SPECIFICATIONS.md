# Route Specifications

**Status:** Active — specification only. Frozen Phase 3
**Version:** 0.1.0
**Last reviewed:** 2026-08-04
**Governed by:** [`ARCHITECTURE.md`](../ARCHITECTURE.md) §4 · [`EXPERIENCE_FLOW.md`](./EXPERIENCE_FLOW.md) · [`CONTENT_STRATEGY.md`](./CONTENT_STRATEGY.md)

Content specifications for the three routes that had a job statement but no section-level specification. The other five are specified elsewhere:

| Route | Specified in |
|---|---|
| `/` | `HOMEPAGE_NARRATIVE.md` |
| `/work/[slug]` | `ARCHITECTURE.md` §6.2 · `COMPONENT_GUIDELINES.md` §6 |
| `/workflow` | `ARCHITECTURE.md` §6.6 |
| `/connect` | `EXPERIENCE_FLOW.md` §11 |
| `/404`, empty and error states | `INTERACTION.md` §8–§9 |

Structure and behaviour only. No layout, no dimensions, no visual treatment — those are Phase 4. Question IDs reference the ledger at `EXPERIENCE_FLOW.md` §5.

---

## 1. `/work`

### Purpose

**Let a reader compare all four case studies side by side, and house the one that has no homepage band.**

`/work` is the **comparison surface, not the primary path.** Homepage bands 3 and 4 link directly into case studies (`HOMEPAGE_NARRATIVE.md` §7), so a reader arriving at `/work` has deliberately chosen breadth over depth — they want to see the set before committing, or they want the fourth case study.

This is a narrower job than the route originally carried, and the narrowing is deliberate. When the homepage presented three equal competency stories, `/work` duplicated it. Featuring one flagship on the homepage removed that duplication and left `/work` with a job of its own.

### Audience

Primarily the hiring manager who wants to select by relevance rather than accept the featured choice, and the senior engineer who has finished one case study and is choosing a second. Secondarily the collaborator determining what kind of problem to bring (C6).

### Questions answered

H2 (breadth), C6 (what can they solve), and — uniquely — the only surface where the fourth case study, `jigargajjar-dev`, is discoverable.

### Section order

1. **Page header.** One sentence stating what the reader is looking at and the organising principle: three competencies, plus the site itself. Not a mission statement.
2. **The three flagship case studies**, ordered by the `order` frontmatter field, which is competency-driven and not chronological (`ARCHITECTURE.md` §6.3). Each rendered as a project card (`COMPONENT_GUIDELINES.md` §4.1).
3. **The methodology case study** — `jigargajjar-dev` — set apart from the three. It is a different kind of artifact: the site the reader is currently inside.
4. **Footer.**

### How projects are grouped

**By competency, and the competency label leads the card** (`COMPONENT_GUIDELINES.md` §4.1). Not by date, not by technology, not by perceived impressiveness. Chronological ordering implies a career narrative; competency ordering implies breadth (ADR-012).

**There are no filters, no tabs, and no sort control.** Four items do not need to be filtered, and a filter implies a collection large enough to require one.

### How featured projects differ

**They do not.** All four cards render identically. Featuring happens on the homepage, where it serves the guide-don't-ask decision; on the comparison surface, differential weighting would defeat the purpose — a reader who came to compare needs comparable presentation.

The `jigargajjar-dev` card is *separated*, not *demoted*: a heading distinguishes it as methodology rather than client-facing work. Separation is categorical; weighting would be editorial.

### Interaction model

Whole-card links, one accessible name each (`COMPONENT_GUIDELINES.md` §4.1). No hover-revealed content, no expansion, no preview. Behaviour is specified in `INTERACTION.md` §11.

### Relationship to the homepage

**Complementary, not duplicative.** The homepage carries depth for one project and names two more; `/work` carries all four at equal depth with no argument attached. A reader who has read the homepage learns exactly one new thing here: that a fourth case study exists.

### Relationship to case-study pages

`/work` is an index and nothing more. It makes no claim a case study does not make, and it must never become a place where summaries are read instead of case studies. **The card summary is capped at three lines by authoring discipline** — long enough to orient, short enough that it cannot substitute for the document.

### What does not belong

A hero section. Filters or sorting. Technology tags as navigation. Cover images (`COMPONENT_GUIDELINES.md` §4.1). Counts, statistics, or "4 projects." A call to action.

---

## 2. `/about`

### Purpose

**Answer who this person is and how they operate alongside other engineers** — the one question no other route owns.

This is the thinnest route on the site and the specification is deliberately tight. After `/connect` absorbed availability and current focus, and `/workflow` absorbed method, `/about` uniquely answers H7 and supports C5. It survives on that plus conspicuous absence: a reader looking for "who is this" and finding no such page reads it as evasive.

**Standing instruction:** if this page cannot be written well within the section list below, it should be merged into `/connect` rather than padded. A thin page filled with filler is worse than no page. This is recorded so a future author facing a blank page has permission to delete rather than pressure to expand.

### Audience

Hiring manager (H7), and the collaborator at their comfort stage (`EXPERIENCE_FLOW.md` §4.4).

### Questions answered

H7 — how they work with other engineers. C5 — communication quality, demonstrated rather than claimed.

### Section order

1. **Who and what.** Two or three paragraphs: the shape of the career, the domains worked in, what kind of engineer this is. Written as prose, not as a summary of the résumé.
2. **How I work with other engineers.** The load-bearing section and the reason the route exists. Review posture, how disagreement is handled, how work is decomposed and handed off, what this person is like to be blocked by. Specific, not aspirational.
3. **What I am trying to get better at.** One short paragraph. Its presence is a credibility signal of the same kind as the Failures & mistakes section — a page describing a person with no development edge is a page describing a persona.
4. **Where to go next.** `/workflow` for method, `/connect` to act, `/resume` for the record.
5. **Footer.**

### Content hierarchy

Section 2 is the page. Sections 1 and 3 frame it. If section 2 is weaker than section 1, the page has become a biography and has stopped answering H7.

### Relationship to `/workflow`

**`/workflow` is how work gets done; `/about` is what it is like to work alongside this person.** Method versus disposition. `/about` does not describe the process, name the stages, or explain the AI-native workflow — it links.

### Relationship to `/resume`

**`/resume` is the record; `/about` is the reading of it.** No employment dates, no role titles in sequence, no education, no skills list. If a fact belongs on a résumé, it does not belong here.

### Relationship to `/connect`

**`/about` is evaluative; `/connect` is transactional.** No availability, no current focus, no response expectations, no contact details beyond the footer. Those live at `/connect` (ADR-014) and duplicating them creates two surfaces that decay independently.

### What explicitly does not belong

A portrait, unless the open question in `IMAGERY.md` §8 resolves in favour of one. A timeline of roles — that is `/resume`, and a career chronology contradicts ADR-012. A skills or technology list (`FOUNDATION.md` §12). Personal interests, hobbies, or "when I'm not coding." Availability or contact details. Testimonials. A philosophy statement that restates `FOUNDATION.md` §6 — the philosophy is demonstrated across the site, not declared here.

---

## 3. `/resume`

### Purpose

**Give a recruiter something forwardable, printable, and readable on a phone in under thirty seconds.**

### Audience

Recruiter, primarily and almost exclusively. The hiring manager reads it differently (see below) but does not need it — they have the case studies.

### Questions answered

R1, R2, R3 at speed; R4 partially (`/connect` owns availability); H1 as a cross-check.

### Mobile experience

**The primary experience.** The recruiter reads on a phone, often between meetings.

- Single column, `--container-prose`, `compact` density.
- The positioning sentence and current role visible without scrolling.
- Experience entries in reverse chronological order, each: role, organisation, dates, and two or three lines of substance. Not bullet lists of responsibilities — `CONTENT_STRATEGY.md` §8 governs when bullets are permitted, and a résumé entry is prose.
- Tabular figures for all dates so columns align (`TYPOGRAPHY.md` §7).
- No two-column layout at any width below `--bp-md`. Two columns on a phone produce a 20-character measure.
- The PDF link present but not prominent. On mobile, HTML is better than a PDF and the reader should not be pushed toward the worse experience.

### Desktop experience

The same document, expanded — not a different layout. Per `ROADMAP.md` §4, this page is authored mobile-first and widened.

- The measure remains capped at `--container-prose`. A résumé that fills a 1440 px viewport is unreadable.
- A second column is permitted above `--bp-md` for metadata only — dates and locations moving beside their entries rather than beneath them. Content never splits across columns.
- Print stylesheet: the page prints on two sides of A4 or less, link URLs are not expanded, and the theme resolves to light regardless of the reader's setting.

### How recruiter reading differs from hiring-manager reading

| | Recruiter | Hiring manager |
|---|---|---|
| Reading mode | Scanning for match against a requisition | Cross-checking a claim made elsewhere |
| Enters at | Top, reads down, stops early | Jumps to a specific role or period |
| Needs | Role, seniority, stack, employer, dates | Duration, scope, whether the case study's claim matches the record |
| Leaves for | Forwarding, or `/connect` | Back to the case study |

**The design consequence:** the document must be scannable top-down *and* addressable by section. Headings are real headings so both a screen reader and a jumping reader can navigate, and each role is self-contained enough to be read out of order.

### Relationship to the downloadable PDF

**Recommendation, recorded as the preferred long-term architecture: the PDF is generated from the HTML route at build time. It is never authored or maintained separately.**

**Why.** Two hand-maintained résumés drift, and the drift is invisible because nobody diffs them. The failure mode is specific and embarrassing: a recruiter forwards a PDF that contradicts the site, and the inconsistency is discovered by the hiring manager. A single source removes the class of error rather than managing it.

**How, at the level of architecture only.** The HTML route is the source. The build renders it to PDF with the print stylesheet applied and writes the result to `public/resume.pdf`. This adds a build step and a build-time dependency; it removes a maintenance obligation that would otherwise recur at every content change and would be forgotten at least once.

**The tradeoff, stated honestly.** Headless PDF generation is one more moving part in a build that is currently very simple, and it can break in ways that are silent — a PDF that generates but paginates badly. Mitigation: the generated PDF is committed, so a bad render appears in a pull-request diff rather than only in production.

**Fallback if generation proves fragile:** keep the PDF hand-maintained, but add a CI check asserting that the HTML route and the PDF were modified in the same commit. Weaker than generation, and better than nothing.

This is an implementation decision for Phase 5 and is recorded here so it is made deliberately rather than by default.

### What does not belong

A photograph. A skills matrix or proficiency ratings. Soft-skill claims. References or "references available." An objective statement — the positioning sentence does that work. Anything not also true on LinkedIn.

---

## 4. Open questions

None blocking. The portrait question (`IMAGERY.md` §8) touches `/about` and is a Phase 6 content decision, not a structural one.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-08-04 | Initial specification for `/work`, `/about`, `/resume`. Phase 3 close-out. |

# Wireframe — `/resume`

**Specification source:** [`ROUTE_SPECIFICATIONS.md`](../design/ROUTE_SPECIFICATIONS.md) §3

---

## 1. Purpose

Give a recruiter something forwardable, printable, and readable on a phone in under thirty seconds.

## 2. Audience

Recruiter, primarily and almost exclusively. The hiring manager reads it differently — cross-checking a claim made elsewhere — but does not need it, because they have the case studies.

## 3. Narrative goal

**Entering:** scanning for a match against a requisition, probably between meetings, probably on a phone.
**Leaving:** confidence that forwarding this will not embarrass them.
**Exit action:** forward, download the PDF, or contact.

Density `default` (`SPACING.md` §5). Compact is reserved for the layer-1 region, navigation, and footer — the résumé is a full route and takes the route density.

---

## 4. Mobile — 375 px

**The primary experience.** Single column, `--container-prose`.

```
┌───────────────────────────────────────┐
│ Jigar Gajjar            ☰{menu} {theme}│
├───────────────────────────────────────┤
│ H1  Jigar Gajjar                      │
│                                       │
│ AI-Native Full-Stack Engineer         │  ← positioning, verbatim
│ designing reliable software systems   │
│ through architecture, orchestration,  │
│ and verification.                     │
│                                       │
│ ‹OWNER: location›  ·  ‹OWNER: email›  │
│ ‹GitHub ↗›  ‹LinkedIn ↗›              │
│                                       │
│ ‹Download PDF›                        │  ← present, not prominent
│                          ⟨--space-12⟩ │
· · · · · · · · · · · · · · · · · · · · ·  ← fold, 375 × 600
├───────────────────────────────────────┤
│ H2  Experience                        │
│                                       │
│ H3  ‹OWNER: Role title›               │
│ Edge10 Group                          │
│ ‹OWNER: 2022 — Present›               │  ← tabular figures
│                                       │
│ ‹OWNER: 2–3 lines of substance.       │  ← prose, not bullets
│  What was owned, what was built,      │    ROUTE_SPEC §3
│  what changed. Not a list of          │
│  responsibilities›                    │
│ ───────────────────────────────       │
│ H3  ‹OWNER: Previous role›            │
│ ‹OWNER: Organisation›                 │
│ ‹OWNER: dates›                        │
│ ‹OWNER: 2–3 lines›                    │
│ ───────────────────────────────       │
│ ⟨further entries, reverse             │
│  chronological⟩                       │
│                          ⟨--space-section-sm⟩
├───────────────────────────────────────┤
│ H2  Selected work                     │
│                                       │
│ ‹OrchestAI› — AI infrastructure and   │
│ framework engineering. .NET, CQRS,    │
│ MCP.                                  │
│                                       │
│ ‹NovaMind AI› — AI product            │
│ engineering. RAG, grounded citations, │
│ vector search.                        │
│                                       │
│ ‹Edge10 platform› — enterprise        │
│ engineering. CQRS, SQL Server, React. │
│                          ⟨--space-section-sm⟩
├───────────────────────────────────────┤
│ H2  Technologies                      │
│                                       │
│ Backend   C# .NET · CQRS · MediatR ·  │
│           PostgreSQL · SQL Server     │
│ Frontend  React · TypeScript ·        │
│           Next.js                     │
│ AI        Anthropic SDK · MCP · RAG   │
│                          ⟨--space-section-sm⟩
├───────────────────────────────────────┤
│ H2  Education                         │
│ ‹OWNER: qualification, institution,   │
│  year›                                │
│                          ⟨--space-section-lg⟩
├───────────────────────────────────────┤
│ FOOTER                                │
└───────────────────────────────────────┘
```

◇ **Positioning and contact are above the fold; experience begins immediately after.** A recruiter with thirty seconds needs role, seniority, and a forwarding path without scrolling.

◇ **The PDF link is present but not prominent.** On mobile, HTML is the better experience — pinch-zooming a PDF on a phone is worse in every respect — and the reader should not be pushed toward the worse one.

◇ **Prose, not bullet lists of responsibilities.** `ROUTE_SPECIFICATIONS.md` §3. A bullet holds a fact; two or three lines of prose can hold what was owned and what changed.

◇ **Technologies is a grouped list, not a skills matrix.** No proficiency ratings, no bars, no star counts — those are unverifiable claims presented as data.

---

## 5. Tablet — 768 px

```
┌─────────────────────────────────────────────────────┐
│ H1  Jigar Gajjar                                     │
│ AI-Native Full-Stack Engineer designing reliable     │
│ software systems through architecture, orchestration,│
│ and verification.                                    │
│ ‹location› · ‹email› · ‹GitHub ↗› · ‹LinkedIn ↗›     │
│ ‹Download PDF›                                       │
├─────────────────────────────────────────────────────┤
│ H2  Experience                                       │
│ H3 Role title                          2022 — Present│  ← dates move
│    Edge10 Group                                      │    to the right
│    prose ─────────────────────────────               │    on the same
│ ────────────────────────────────────────             │    baseline
└─────────────────────────────────────────────────────┘
```

◇ **Dates move beside the role rather than beneath it**, which is the first change that makes the document scannable top-down at speed.

---

## 6. Desktop — 1280 px

```
┌───────────────────────────────────────────────────────────────┐
│ ⟨--container-prose 68ch — the résumé never fills the viewport⟩ │
│                                                                │
│ H1  Jigar Gajjar                                               │
│ AI-Native Full-Stack Engineer designing reliable software      │
│ systems through architecture, orchestration, and verification. │
│ ‹location› · ‹email› · ‹GitHub ↗› · ‹LinkedIn ↗›  ‹PDF›        │
│ ───────────────────────────────────────────────────────        │
│ H2  Experience                                                 │
│                                                                │
│ ┌──────────────┬──────────────────────────────────────┐       │
│ │ 2022–Present │ H3  Role title                       │       │  ← metadata
│ │ Edge10 Group │ prose, 2–3 lines ──────────────      │       │    column,
│ └──────────────┴──────────────────────────────────────┘       │    content
│ ┌──────────────┬──────────────────────────────────────┐       │    never
│ │ ‹dates›      │ H3  Previous role                    │       │    splits
│ │ ‹org›        │ prose ────────────────────────       │       │
│ └──────────────┴──────────────────────────────────────┘       │
│                                                                │
│ H2  Selected work · H2  Technologies · H2  Education           │
├───────────────────────────────────────────────────────────────┤
│ FOOTER                                                         │
└───────────────────────────────────────────────────────────────┘
```

◇ **The measure stays capped at 68ch.** A résumé that fills a 1440 px viewport is unreadable. The second column is metadata only — dates and organisation — and content never splits across columns.

◇ **Print stylesheet:** two pages are preferred where content allows; three are acceptable when supported by substantive experience and without reducing readability. Link URLs are not expanded, the theme resolves to light regardless of the reader's setting, and the header and footer are suppressed.

◇ **Revised after measurement, 2026-08-05.** This originally read "two sides of A4 or fewer", written before the content existed. With all five roles carrying verified summaries the document measures 2.38 pages; reaching two would require roughly a 16 % reduction in vertical rhythm or type size. The constraint existed to prevent padding, not to cap real experience, so the page count follows the content rather than the content following the page count.

---

## 7. Component mapping

| Element | Component | Source |
|---|---|---|
| Experience entries | Composed section, semantic HTML | `ARCHITECTURE.md` §3 |
| Dates | Tabular lining figures | `TYPOGRAPHY.md` §7 |
| Selected work links | Link | `COMPONENT_GUIDELINES.md` §2.1 |
| Technologies | Definition list `<dl>` | Semantic HTML |
| PDF link | Link | §2.1 |

**No new components.** Résumé entries are a composed section over semantic HTML, not a new card type — a card would visually equate a job with a project.

## 8. Ledger mapping

| Section | Resolves |
|---|---|
| Header | R1 role and seniority · R2 technologies · R5 contact |
| Experience | R3 real production work · H1 cross-check |
| Selected work | Bridge to `/work` |
| Technologies | R2 |
| Education | R3 supporting |

## 9. Design rationale

**Scannable top-down and addressable by section.** The recruiter reads down and stops early; the hiring manager jumps to a specific role. Real headings serve both, and a screen reader gets the same structure.

**The PDF is generated from this route at build time** (`ROUTE_SPECIFICATIONS.md` §3). Two hand-maintained résumés drift, and the failure is specific: a recruiter forwards a PDF contradicting the site, and the hiring manager finds it. This is recorded as the preferred architecture for Phase 5.

**Nothing here is not also true on LinkedIn.** A résumé that says something the profile does not is a discrepancy a recruiter will notice.

## 10. What was deliberately removed

- **Photograph** — `ROUTE_SPECIFICATIONS.md` §3
- **Skills matrix with proficiency ratings** — unverifiable claims presented as data
- **Soft-skill claims** — "excellent communicator" is asserted, not evidenced; the case studies are the evidence
- **"References available on request"** — assumed, and its presence is filler
- **Objective statement** — the positioning sentence does that work
- **Bulleted responsibility lists** — `ROUTE_SPECIFICATIONS.md` §3 requires prose

## 11. Accessibility

One `<h1>` (name). Four `<h2>` sections; role titles `<h3>`. Dates use `<time datetime>`. Technologies is a `<dl>`. The desktop two-column layout is CSS Grid over a single DOM order — dates precede their role in source, as read. Print output tested as part of the manual pass. Tab order: skip → header → nav → theme → contact links → PDF → selected-work links → footer.

## 12. Open questions

None blocking. Whether the PDF or the HTML route is the primary recruiter surface was resolved in favour of HTML, with the PDF generated from it.

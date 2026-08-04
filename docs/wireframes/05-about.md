# Wireframe — `/about`

**Specification source:** [`ROUTE_SPECIFICATIONS.md`](../design/ROUTE_SPECIFICATIONS.md) §2

---

## 1. Purpose

Answer who this person is and how they operate alongside other engineers — the one question no other route owns.

**This is the thinnest route on the site and the specification is deliberately tight.** After `/connect` absorbed availability and current focus, and `/workflow` absorbed method, `/about` uniquely answers H7 and supports C5.

> **Standing instruction from `ROUTE_SPECIFICATIONS.md` §2:** if this page cannot be written well within the section list below, merge it into `/connect` rather than pad it. A thin page filled with filler is worse than no page.

## 2. Audience

Hiring manager (H7). Collaborator at their comfort stage.

## 3. Narrative goal

**Entering:** "who is this, and would we get on?"
**Leaving:** comfort — a sense of what working alongside this person is like.
**Exit action:** `/workflow` for method, `/connect` to act, `/resume` for the record.

Density `default`.

---

## 4. Mobile — 375 px

```
┌───────────────────────────────────────┐
│ Jigar Gajjar            ☰{menu} {theme}│
├───────────────────────────────────────┤
│ H1  About                             │
│                          ⟨--space-12⟩ │
├───────────────────────────────────────┤
│ ⟨--container-prose⟩                   │
│                                       │
│ I build production software and have  │  ← §1 WHO AND WHAT
│ done for long enough to have opinions │    2–3 paragraphs
│ about what makes it survive contact   │    prose, not a
│ with a team. Most of that work has    │    résumé summary
│ been backend — C# .NET, CQRS, clean   │
│ architecture, SQL Server — with       │
│ enough React to be useful on the      │
│ other side of the API.                │
│                                       │
│ For the past eighteen months I have   │
│ worked in an AI-native workflow:      │
│ agents write the implementation, I    │
│ architect, direct, and verify. That   │
│ is a change in method, not in         │
│ standards.                            │
│                                       │
│ The domain I know best is athlete     │
│ performance in professional sport,    │
│ where the data is sensitive, the      │
│ users are specialists, and being      │
│ wrong is visible quickly.             │
│                          ⟨--space-section-md⟩
├───────────────────────────────────────┤
│ H2  How I work with other engineers   │  ← §2 LOAD-BEARING
│                                       │    This section is
│ ‹OWNER: 250–400 words. Review         │    the page.
│  posture. How disagreement gets       │
│  handled. How work is decomposed and  │
│  handed off. What I am like to be     │
│  blocked by. Specific, not            │
│  aspirational — an interviewer will   │
│  test this against a reference›       │
│                          ⟨--space-section-md⟩
├───────────────────────────────────────┤
│ H2  What I am trying to get better at │  ← §3
│                                       │
│ ‹OWNER: one short paragraph. A real   │
│  development edge, not a humblebrag.  │
│  Its presence is a credibility signal │
│  of the same kind as a case study's   │
│  Failures section›                    │
│                          ⟨--space-section-md⟩
├───────────────────────────────────────┤
│ H2  Where to go next                  │  ← §4 EXIT
│                                       │
│ ‹How the work gets made — the         │
│  workflow {arrow-right}›              │
│ ‹What to bring, and what to expect    │
│  back {arrow-right}›                  │
│ ‹Résumé — the record {arrow-right}›   │
│                          ⟨--space-section-lg⟩
├───────────────────────────────────────┤
│ FOOTER                                │
└───────────────────────────────────────┘
```

◇ **No portrait.** `ROUTE_SPECIFICATIONS.md` §2 excludes it pending the open question in `IMAGERY.md` §8. If it is later approved, it sits within the prose column at modest scale, hairline-framed, square-cropped — never circular, never a hero.

◇ **Section 2 is longer than sections 1 and 3 combined.** If it is not, the page has become a biography and has stopped answering H7.

---

## 5. Tablet — 768 px

```
┌─────────────────────────────────────────────────────┐
│ H1  About                                            │
├─────────────────────────────────────────────────────┤
│ ⟨--container-prose, 68ch — unchanged⟩                │
│ Prose sections identical to mobile.                  │
├─────────────────────────────────────────────────────┤
│ H2  Where to go next                                 │
│ ‹Workflow {→}›   ‹Connect {→}›   ‹Résumé {→}›        │  ← inline row
└─────────────────────────────────────────────────────┘
```

◇ **Almost nothing changes.** This is a prose page; the measure is already at its cap on mobile. Only the exit links move from stacked to inline.

---

## 6. Desktop — 1280 px

```
┌───────────────────────────────────────────────────────────────┐
│ ⟨--container-wide⟩                                             │
│ H1  About                                                      │
│ ───────────────────────────────────────────────────────        │
├───────────────────────────────────────────────────────────────┤
│ ⟨--container-prose 68ch, centred⟩                              │
│                                                                │
│        I build production software and have done for           │
│        long enough to have opinions about what makes           │
│        it survive contact with a team. ...                     │
│                                                                │
│        H2  How I work with other engineers                     │
│        ‹OWNER: 250–400 words›                                  │
│                                                                │
│        H2  What I am trying to get better at                   │
│        ‹OWNER: one paragraph›                                  │
│                                                                │
│        H2  Where to go next                                    │
│        ‹Workflow {→}›  ‹Connect {→}›  ‹Résumé {→}›             │
├───────────────────────────────────────────────────────────────┤
│ FOOTER                                                         │
└───────────────────────────────────────────────────────────────┘
```

◇ **The prose column never widens.** A biography set at 1120 px would be unreadable, and this page has no break-out content.

---

## 7. Component mapping

| Element | Component | Source |
|---|---|---|
| All body content | Prose primitive | `ARCHITECTURE.md` §3 |
| Exit links | Link | `COMPONENT_GUIDELINES.md` §2.1 |
| Footer | Footer | §3.3 |

**No new components.** This page is entirely prose and links, which is itself the argument for keeping it under review — a route that needs no components is a route that may not need to be a route.

## 8. Ledger mapping

| Section | Resolves |
|---|---|
| Who and what | Partial H1 context; no unique question |
| How I work with other engineers | **H7 — the only place it is answered** |
| What I am trying to get better at | Supports C5 credibility |
| Where to go next | Exit action |

## 9. Design rationale

**Section 2 is the reason the route exists.** Everything else frames it. `/resume` owns the facts, `/workflow` owns the method, case studies own capability — H7 is what is left, and it is genuinely unanswered elsewhere.

**Prose, not bullets.** `CONTENT_STRATEGY.md` §8: reasoning bulleted is reasoning amputated. How someone handles disagreement cannot survive being reduced to a list.

**The development-edge section is a credibility device, not modesty.** A page describing a person with no development edge is describing a persona, and this reader has met personas before.

**No availability, no current focus, no contact details.** Those live at `/connect` (ADR-014). Duplicating them creates two surfaces that decay independently, and `/connect` is already the one surface on the site with a months-scale shelf life.

## 10. What was deliberately removed

- **Portrait** — pending `IMAGERY.md` §8; excluded by the route specification until then
- **Timeline of roles** — that is `/resume`, and a career chronology contradicts ADR-012
- **Skills or technology list** — `FOUNDATION.md` §12 non-goal
- **Personal interests, hobbies, "when I'm not coding"** — answers no ledger question
- **Availability and contact details** — `/connect` owns them
- **A philosophy statement** — restating `FOUNDATION.md` §6 here would be the third time; the philosophy is demonstrated across the site, not declared
- **Testimonials** — `EXPERIENCE_PRINCIPLES.md` §3 refuses borrowed credibility

## 11. Accessibility

One `<h1>` ("About"). Three `<h2>` sections. Exit links are a `<ul>` so the count is announced. Tab order: skip → header → nav → theme → three exit links → footer. No interactive content beyond links.

## 12. Open questions

None blocking. The portrait remains a Phase 6 content decision, and the standing merge instruction in §1 applies if the copy proves thin when written.

# Roadmap

**Status:** Active
**Owner:** Jigar Gajjar
**Last reviewed:** 2026-08-04
**Governed by:** [`FOUNDATION.md`](./FOUNDATION.md)

The project-level phase sequence, what each phase produces, and what freezes when it completes.

**Why this document exists.** The phase numbering used to direct this project was, until now, unwritten — it lived in conversation while `ARCHITECTURE.md` §14 carried a separate 0–7 sequence for implementation. Two numbering schemes with no mapping between them is the kind of ambiguity that produces a wrong decision six months out. §3 reconciles them.

---

## 1. Sequence

| Phase | Produces | Status |
|---|---|---|
| **1 — Foundation** | `FOUNDATION.md`, `ARCHITECTURE.md`, `DECISIONS.md` | Complete · Frozen 2026-08-04 |
| **2 — Design system** | Thirteen documents in `docs/design/` | Complete · Frozen 2026-08-04 |
| **3 — Experience & narrative** | `EXPERIENCE_FLOW.md`, `HOMEPAGE_NARRATIVE.md`, `ROUTE_SPECIFICATIONS.md`, `CONTENT_STRATEGY.md` | Complete · Frozen 2026-08-04 |
| **4 — Wireframes** | Per-route wireframes, **mobile → tablet → desktop** | Next |
| **5 — Implementation** | Running application | Not started |
| **6 — Content** | Four case studies and all page copy | Not started |
| **7 — Launch verification** | Tier 3 comprehension testing passed | Not started |

**No phase begins without explicit approval of the one before it.** This is the mechanism that has kept the project documentation-first, and it is the reason each phase's output has been reviewable rather than presented as finished work.

> **Renumbering note.** Wireframes were previously scheduled as Phase 3B, with implementation as Phase 4. Phase 3 now covers the full experience and narrative track, and wireframes are Phase 4. Every phase after it shifts by one. This document is the authority; earlier conversational numbering is superseded.

---

## 2. What is frozen

Frozen means: source of truth, not to be rewritten, expanded, or reinterpreted without an explicit request. A change requires an ADR.

| Frozen | Since | Contains |
|---|---|---|
| `FOUNDATION.md` | Phase 1 | Vision, thesis, audiences, positioning, principles, inventory, disclosure, success criteria, non-goals |
| `ARCHITECTURE.md` | Phase 1 | Stack, rendering model, folder structure, **route table**, content model, budgets, accessibility, pipeline |
| `DECISIONS.md` | Phase 1 | ADR-001 – ADR-014 |
| Typeface selection | Phase 2 | Newsreader (display) + Inter (text) + system monospace |
| Serif display thesis | Phase 2 | `VISUAL_LANGUAGE.md` §3 |
| Shadowless elevation | Phase 2 | `COLOR_SYSTEM.md` §6 |
| Monochrome colour posture | Phase 2 | `VISUAL_LANGUAGE.md` §5, `COLOR_SYSTEM.md` §4 |
| Motion philosophy | Phase 2 | `MOTION.md`, ADR-011 |
| Experience, Interaction, Imagery | Phase 2 | The experiential layer |
| **Homepage narrative** | Phase 3 | Six bands, order, and reasoning. `HOMEPAGE_NARRATIVE.md` |
| **Route specifications** | Phase 3 | All eight routes fully specified |
| **Editorial voice** | Phase 3 | `CONTENT_STRATEGY.md` |
| **Mobile-first authoring** | Phase 3 | §4 below |

**The route table in `ARCHITECTURE.md` §4 is frozen and is the authority on which pages exist.** Adding a route is an architecture change requiring an ADR, not a wireframing decision.

---

## 3. Reconciling the two phase numberings

`ARCHITECTURE.md` §14 sequences *implementation* as phases 0–7. That sequence remains correct and is not superseded; it is a decomposition of project Phase 5 onward.

| Project phase | `ARCHITECTURE.md` §14 |
|---|---|
| 1 — Foundation | Phase 0 |
| 2, 3, 4 — Design, experience, wireframes | *Not covered.* §14 predates the design track |
| 5 — Implementation | Phases 1–5 (toolchain and CI · content layer · layout and primitives · case-study rendering · motion) |
| 6 — Content | Phase 6 |
| 7 — Launch verification | Phase 7 |

**Where they conflict, `ARCHITECTURE.md` §14 governs implementation ordering** — in particular its rule that quality gates stand up in its Phase 1, against an empty page, before any feature exists. That ordering is load-bearing and this document does not alter it.

---

## 4. Mobile-first is canonical

**Every layout is authored at the narrow width and expanded. Mobile → tablet → desktop, at every stage of the project.**

This was already the architectural rule (`ARCHITECTURE.md` §8, `SPACING.md` §7). It is now also the **wireframing** rule, which closes the only contradiction the Phase 3A review found on this axis.

**Why.** The reference device profile is a mid-tier phone on emulated Slow 4G (`ARCHITECTURE.md` §10), and the recruiter — the reader whose abandonment costs the most, because nobody downstream ever sees the site — reads on mobile. The 375 px viewport is also the constraint that forces the hard editorial choices. Drawing wide first defers every one of those choices to the viewport where making them is most painful, and produces layouts that accumulate breakpoint overrides nobody can later remove safely.

**No ADR.** This synchronises the wireframing process to a rule already frozen in `ARCHITECTURE.md` §8. Nothing architectural changed.

---

## 5. Phase 4 scope

**Page set:** `/`, `/work`, `/work/[slug]`, `/about`, `/workflow` (including the notes region), `/resume`, `/connect`, `/404`, the footer as an exit surface, plus the no-JavaScript and reduced-motion renderings.

**Authoring order:** mobile → tablet → desktop (§4).

**Specification sources per route:**

| Route | Specified in |
|---|---|
| `/` | `HOMEPAGE_NARRATIVE.md` |
| `/work`, `/about`, `/resume` | `ROUTE_SPECIFICATIONS.md` |
| `/work/[slug]` | `ARCHITECTURE.md` §6.2 · `COMPONENT_GUIDELINES.md` §6 |
| `/workflow` | `ARCHITECTURE.md` §6.6 |
| `/connect` | `EXPERIENCE_FLOW.md` §11 |
| `/404`, empty and error states | `INTERACTION.md` §8–§9 |

All eight routes are specified. No route enters Phase 4 without a content specification.

---

## 6. Documentation Freeze

**Phase 3 is frozen as of 2026-08-04.** Phases 1, 2, and 3 together form the specification, and the specification is now closed.

**From this point, documentation changes are bug fixes, not feature work.** A permitted change corrects something factually wrong, resolves a contradiction, or fixes a broken reference. It does not introduce a new idea.

**New ideas, routes, UX concepts, and architectural changes are not added to the existing documents.** Editing a frozen document to accommodate a new thought is how a specification quietly becomes a wish list, and it destroys the ability to tell what was decided from what was appended.

**Any future enhancement requires one of two routes:**
- **An ADR** — if it is architectural, changes a frozen decision, or alters the route table.
- **A future milestone** — v1.1, v2, recorded as such and scheduled, not folded into current scope.

**Implementation follows the documentation; it does not redesign it.** Where implementation reveals that a specification is wrong — and it will, at least once — the correction is an ADR and a documentation fix, made deliberately. It is not a silent divergence discovered later in the code.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.3.0 | 2026-08-04 | Documentation freeze policy added. Phase 3 permanently closed. |
| 0.2.0 | 2026-08-04 | Phase 3 close-out. Wireframes renumbered to Phase 4; mobile-first made canonical; scope resolutions folded into §5. |
| 0.1.0 | 2026-08-04 | Initial roadmap. Reconciles project phases with `ARCHITECTURE.md` §14. |

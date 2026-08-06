# Homepage Narrative

**Status:** Active — narrative specification. Frozen Phase 3; §4–§5 amended by ADR-020, superseded by ADR-022
**Version:** 0.4.0
**Last reviewed:** 2026-08-06
**Governed by:** [`FOUNDATION.md`](../FOUNDATION.md) §3 · [`EXPERIENCE_FLOW.md`](./EXPERIENCE_FLOW.md) · [`EXPERIENCE_PRINCIPLES.md`](./EXPERIENCE_PRINCIPLES.md)

This document freezes the homepage's argument: what it is trying to make a reader believe, in what order, and why that order and no other. It describes **narrative, not layout**. No positions, no dimensions, no visual treatment. It is the reasoning a wireframe must satisfy, and the document a wireframe is checked against.

---

## 1. Conviction over navigation

**The homepage is not optimised for navigation. It is optimised for conviction.**

Navigation answers *where do I click*. Conviction answers *I want to keep reading*. These produce different pages from the same content.

A navigation-optimised homepage presents the site's contents efficiently: here is the work, here is the background, here is the method, choose one. It is a directory with a headline. It fails, because a reader who does not yet believe the person is worth reading has no basis for choosing and will choose nothing.

A conviction-optimised homepage assumes the reader arrives skeptical, sequences the answers to their objections in the order the objections occur, and only invites a choice once the reader wants to make one. **Interaction is requested last, because interaction is expensive and a reader spends it only after belief exists.**

**The homepage does not ask the reader to choose. It guides them.** This is the decision behind the band structure in §4: rather than presenting three competency stories as three equal doors and asking the reader to pick, the homepage carries one flagship project far enough that the reader receives depth without navigating at all. Breadth follows, and comparison is available at `/work` for readers who want it.

**The operational test:** if a reader could reach the same destination faster by ignoring the page and using the header navigation, the page has not done its job.

---

## 2. What the homepage is trying to accomplish

**Convert a stranger's skepticism into enough conviction that continuing feels worth their time — and then give them somewhere to continue that does not require a decision.**

Three things follow.

**The homepage carries depth for exactly one project.** The flagship (OrchestAI) is presented far enough that a reader understands what it is, why it was hard, and what was decided — without leaving the page. Every other project is named, framed, and linked. This is the practical expression of guide-don't-ask: depth arrives before a choice is required.

**The homepage's most important content is not text.** For the senior-engineer reader, the artifact's own behaviour — nothing loading, nothing shifting, immediate legibility, a working keyboard path — answers question S1 (`EXPERIENCE_FLOW.md` §5) before a single word is read. This is the only homepage "section" that cannot be wireframed, and it may be the most persuasive one.

**A reader who leaves without opening anything has not necessarily failed.** A recruiter who reads the positioning, takes the résumé, and forwards it has completed their journey successfully. The homepage serves two different successful outcomes and must not optimise the deep one at the expense of the shallow one.

---

## 3. What the visitor should believe, over time

### After 10 seconds — no scroll, on a phone

> *"This is a senior engineer with a specific position, and whoever built this page knew what they were doing."*

Two beliefs, and the second is carried by the artifact rather than by content. The reader has not evaluated anything yet; they have formed an impression of care, and that impression determines how charitably they read everything after it.

**The belief that must not form:** *"this is a designer"* or *"this is a template."* Both are fatal in different ways — the first miscategorises the person, the second says nothing was decided.

### After 30 seconds — one screen of scroll

> *"The AI-native claim is a considered engineering position, not a trend I should discount."*

This is the pivotal belief. The positioning in `FOUNDATION.md` §5 is deliberately provocative and generates one specific objection: *if agents write the code, do you understand it?* A reader carrying that objection unresolved discounts everything downstream — projects read while suspecting the author did not write them are projects that prove nothing.

`FOUNDATION.md` §3, goal 4 makes this non-negotiable: the site must answer that objection **"before the reader has to ask it."**

### After 2 minutes — full scroll

> *"I have seen how this person thinks about one hard problem, there are two more of a different kind, and I want to go further."*

Belief has become appetite, and the reader has already received evidence rather than a promise of it. **The measure is that the reader can describe one specific engineering decision** — not "there's good work here," but "they chose X over Y because of Z."

---

## 4. The five bands

**Superseded by ADR-022 (2026-08-06).** This section has now specified six bands, then seven, then five. The count was never the thing worth freezing — §4.1 states what actually is.

**§5 is unchanged in substance and always has been.** The order is the objection sequence; qualification precedes evidence. Every revision has kept that and changed only the *form* each answer takes.

### Band 1 — The claim, and the instrument

**Produces:** *this person instruments systems — and I have just watched one do it.*

The thesis at the largest type on the site, `POSITIONING` verbatim beneath it (`FOUNDATION.md` §5), and then a live span waterfall of the reader's own page load: DNS, connect, request, response, parse, first paint, largest paint, hydrate, in milliseconds read from the Performance API on their machine.

**Why this and not an architecture diagram:** V2 drew OrchestAI's topology here with a pulse looping along its edges. Nothing was flowing. A well-made architecture drawing is reproducible in an afternoon and proves nothing, which places it in the same category as the decorative gradients this site's visual language exists to refuse. A measurement of the reader's own visit cannot be copied, cannot be faked, and is confirmed by the reader having already experienced it.

**It also teaches the notation** used by bands 3 and 4, which is why it is a waterfall rather than a readout.

**Constraint:** nothing animates on entrance (`MOTION.md` §5). Script supplies numbers, never structure — every span label and description is in the HTML response.

### Band 2 — Verification

**Produces:** *the method is real, and here is its output.*

The seven-stage pipeline with the artefact each stage leaves behind, then stage five opened in full: four budget gauges, the check and gate counts, the Lighthouse scores — every figure produced by a script from the build and re-verified on every CI run. Then, immediately beneath, what none of it reaches.

**Why it holds the second position:** unchanged from V2's lifecycle band and from V1's qualification band. `FOUNDATION.md` §3 goal 4 requires the *agents wrote this, so what did you do* objection to be answered before any evidence, because an unresolved objection discounts everything after it. "Claude Code" is stage four of seven, and the reader draws the conclusion themselves.

**What changed:** the answer now arrives with a receipt. V2 asserted a method; this band shows what the method produced, in numbers a reader can check.

**Constraint, and it is the important one:** `NOT_VERIFIED` is not optional and not a disclaimer. Four green gauges with no adjacent statement of limits describe a system nobody has looked at hard enough. It is asserted by `tests/quality/homepage.spec.ts`.

### Band 3 — Systems

**Produces:** *this person builds real systems, and I can read them.*

OrchestAI and NovaMind, each as a span waterfall in the notation band 1 taught. Then the remaining published case studies as a quiet index.

**Why one notation for both:** V2 gave each project a bespoke visual — a layer stack and a staged pipeline. Two forms to learn, and the reader's attention spent on the diagrams instead of their contents. Sameness of form is what makes difference of content legible.

**Constraint:** these traces carry **no timings**, and the axis caption says so. Neither system has production traffic; a latency column would be the one fabricated number on a page whose argument is that its numbers are checkable. Asserted in CI.

### Band 4 — Failure

**Produces:** *this person thinks about production, not demos.*

Each failure mode, the mechanism that contains it, and a topology that lights the components doing the containing. One row is not contained at all, and selecting it dims the entire map.

**Why it exists:** it is the band a staff engineer reads first and the band almost no portfolio has. Everything else describes a happy path, and a reader who has run something in production knows the happy path is the easy half.

**Constraint:** at least one uncontained row, always. A failure matrix in which everything is contained is a failure matrix nobody stress-tested. Asserted in CI.

### Band 5 — Judgement

**Produces:** *this person has judgement, including about AI itself.*

Six decisions where the obvious modern answer was declined, each with the reasoning and the cost.

**Why it replaced the philosophy band:** four aphorisms with citations create the impression of someone who enjoys writing aphorisms. Six refusals with costs attached create the impression of someone who has had to decide something. The positions are identical; only one of them is expensive, and only the expensive one is evidence.

**Constraint:** every entry states a cost. A refusal with no consequence is a preference, and a list of preferences is a personality test. Asserted in CI.

### Band 6 — Connect

**Produces:** *I know what to do if I want to act.* Unchanged across all three versions. Not a call to action — `EXPERIENCE_PRINCIPLES.md` §3 refuses urgency and obligation.

---

### 4.1 What is actually frozen

Not a count. A band ships only if it passes all four:

1. **It produces a belief no other band produces**, stated in the terms above.
2. **Its form is justified by its content.** Two bands making the same argument in the same component means one is decoration.
3. **It is checkable.** Every number comes from a tool; every structural claim cites the file it can be verified against; anything that is neither is stated as unknown.
4. **It renders completely without JavaScript.** Script adds exploration, never content.

Test 3 is what ADR-022 added, and it is the one that changed the page most.

---

## 5. Why this order

**The order is the objection sequence.** A skeptical reader's questions arrive predictably, and each must be answered before the next can be heard.

```
"Who is this?"                      → Band 1  Claim and instrument
"So you don't write your own code?" → Band 2  Verification
"Show me something real."           → Band 3  Systems
"Would it survive contact?"         → Band 4  Failure
"Do they have judgement?"           → Band 5  Refusals
"What now?"                         → Band 6  Connect
```

**Qualification precedes evidence, and this is the load-bearing ordering decision.** `FOUNDATION.md` §3 goal 4 requires the workflow objection be answered *before the reader has to ask it*. Evidence presented to a skeptical reader does not accumulate — it gets discounted, and discounted evidence cannot be re-presented later. Unchanged since V1 and asserted in `tests/quality/homepage.spec.ts`.

**Measurement precedes argument.** Band 1 establishes that this page reports rather than claims, before it claims anything. Every band after it is read in that light.

**Failure follows the systems, never precedes them.** A failure-mode table for a system the reader has not yet seen is a list of nouns.

**Judgement is last of the substantive bands.** A refusal is only interesting once the reader believes the thing could have been built.

**Departure is last.** Interaction is requested only after belief exists (§1).

---

## 6. Emotional progression

Mapped to `EXPERIENCE_PRINCIPLES.md` §1–§2.

| Band | Beat | State entering | State leaving |
|---|---|---|---|
| Arrival | **Orientation** | Neutral, possibly rushed | Settled — nothing loading, nothing moved |
| 1 Hero | **Recognition** | Settled | "This is a specific person" |
| 2 Qualification | **Disarmament** | A forming objection | The objection answered before it was voiced |
| 3 Featured | **Engagement** | Open | "I have seen them solve something" |
| 4 Additional | **Widening** | Engaged in one thing | "There are two more, and they are different" |
| 5 Workflow | **Substantiation** | Convinced by output | "And the method is documented too" |
| 6 Connect | **Intent** | Convinced | Decided |

**Disarmament is the homepage's distinctive moment.** Most portfolios have no equivalent because most have no claim requiring defence. The reader begins forming a challenge and finds it already addressed, without the page appearing to have noticed — which produces the sense of dealing with someone who has already thought about the hard part.

**Engagement is the new peak.** Under the previous four-band structure the homepage never delivered evidence; it delivered a well-argued promise. Band 3 moves the first real payoff onto the homepage, which is what makes the page guide rather than route.

**The progression never passes through excitement.** No beat here is arousal. `EXPERIENCE_PRINCIPLES.md` §1 targets calm competence, and a homepage producing excitement has produced a feeling the content must then live up to.

---

## 7. Where the visitor should leave

**Primary exit: into the OrchestAI case study, from band 3.** The reader has partial evidence and wants the rest. This is the shortest path from arrival to depth on the site, and it is deliberate.

**Secondary exits, all legitimate:**

| Exit | Reader | From | Journey status |
|---|---|---|---|
| `/work/[slug]` — NovaMind or Edge10 | Hiring manager whose role matches a different competency | Band 4 | Continuing |
| `/workflow` | Collaborator, or a skeptic wanting the method in full | Band 5 | Continuing |
| `/connect` | Anyone ready to act | Band 6 | Complete — successful |
| `/resume` | Recruiter | Band 1 or 6 | Complete — successful |
| `/work` | A reader who wants to compare before committing | Band 4 or 6 | Continuing |

**`/work` is the comparison surface, not the homepage's primary destination.** Band 3 and band 4 link directly to case studies. `/work` exists for readers who want all four side by side and for the fourth case study, which has no band of its own. This resolves the contradiction the Phase 3A review found between this document and `EXPERIENCE_FLOW.md` §4.2.

**The exit that indicates failure: the header navigation.** A reader who scrolls the homepage and then uses the header has read the page without being convinced by it. Some always will. If most do, the fix is band 2 or band 3, not the header.

---

## 8. What the homepage must not do

| Must not | Why |
|---|---|
| Summarise all nine sections of the flagship case study | A reader who feels they have read it will not open it (§4, band 3) |
| Give bands 3 and 4 equal weight | Recreates the menu that featuring exists to avoid |
| Present a technology grid | `FOUNDATION.md` §12 non-goal |
| Include a hero image | Consumes the entire above-fold budget for something typography carries better (`IMAGERY.md` §14) |
| Restate the positioning sentence | Repetition is the behaviour of a page that does not believe it landed |
| Animate above the fold | `MOTION.md` §5. Delays first contact and risks the LCP budget |
| Include testimonials or endorsement logos | `EXPERIENCE_PRINCIPLES.md` §3 refuses borrowed credibility |
| Add a seventh band | §4 is closed. A seventh band is content that belongs on a route |
| Treat band 6 as a call to action | `EXPERIENCE_PRINCIPLES.md` §3 refuses urgency |

---

## 9. How this is validated

No analytics (ADR-009). Validated by observation in the Tier 3 sessions (`FOUNDATION.md` §11), with three homepage-specific protocol additions:

1. **The 30-second belief test.** Show the homepage for thirty seconds, then ask: *"does this person write their own code?"* Pass: the reader states the position accurately and does not treat it as an open question. Tests band 2 directly and is the single most important homepage measurement.
2. **The specificity test.** After a full read, ask what they learned about OrchestAI. Pass: they can name one engineering decision and why it was made. Failure: "it's an AI agent thing." This tests whether band 3 delivered evidence or a summary.
3. **The exit-path observation.** Record whether readers leave via a band or via the header. Header-dominant behaviour indicates the narrative did not carry (§7).

---

## 10. Open questions

None. The three questions carried in version 0.1.0 — whether band 2 links to `/workflow`, whether the projects band names projects or competencies, and where `/connect` sits — are all resolved by the six-band structure: band 2 does not link away, band 3 features a named project, and `/connect` is band 6.

---

## Changelog

**0.4.0 — 2026-08-06.** §4 and §5 superseded by ADR-022: seven bands become five, and §4.1 replaces the band-count freeze with four tests a band must pass — of which “it is checkable” is new and reshaped the page. The objection sequence is unchanged for the third consecutive version.

**0.3.0 — 2026-08-06.** §4 and §5 amended by ADR-020: six bands become seven, the count freeze is replaced by a produces-a-belief test, and every band's *form* is specified alongside its content. The objection sequence is unchanged.

| Version | Date | Change |
|---|---|---|
| 0.2.0 | 2026-08-04 | Six-band structure. Featured flagship replaces the three-competency band; workflow and connect become explicit bands. All open questions resolved. Frozen. |
| 0.1.0 | 2026-08-04 | Initial narrative. Four bands. |

# Homepage Narrative

**Status:** Active — narrative specification. Frozen Phase 3; §4–§5 amended by ADR-020
**Version:** 0.3.0
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

## 4. The seven bands

**Amended by ADR-020 (2026-08-06).** This section previously specified six bands and froze that count. Version 1 shipped against it and was correct against it, and it was flat — because every band made its argument by asserting it in prose, and a reader is asked to accept six assertions from a stranger on the strength of the prose alone. ADR-020 replaces the count freeze with a stronger constraint, stated at the end of this section.

**What did not change is §5.** The order is still the objection sequence, and qualification still precedes evidence. The bands below occupy the same positions in the same argument; what changed is the form each one takes.

Each band is defined by the belief it produces. Bands 1–4 carry the argument; bands 5–7 route.

### Band 1 — Hero

**Produces:** *this is a specific person making a specific claim, not a category.*

The thesis — "I build AI systems that survive production" — carried at the largest type on the site, with `POSITIONING` verbatim (`FOUNDATION.md` §5) on the line beneath it, and a live topology drawn from OrchestAI's real admission path beside it. Present without scroll at 375 px. Answers R1, R2, R3, and provides the R5 exit.

**Why the thesis leads and the positioning sentence follows:** a category is not a claim. "AI-Native Full-Stack Engineer designing reliable software systems through architecture, orchestration, and verification" tells a machine what terms to match and tells a person nothing they will still hold in a minute. The thesis can be *wrong*, which is what makes the six bands of evidence beneath it worth reading. ADR-020 has the full reasoning.

**Why a topology and not a photograph:** the diagram is the first argument, not the first decoration. A reader who knows what an admission stage is has learned something true about the work before reading a sentence; a reader who does not has learned that this person draws systems. Neither is available from a portrait or a gradient.

**Constraint:** the positioning sentence still appears exactly once. Nothing here animates on entrance — it is above the fold (`MOTION.md` §5).

### Band 2 — Qualification, as a lifecycle

**Produces:** *the claim is a position, not a shortcut.*

The seven-stage delivery lifecycle, explorable: problem, architecture, decision, Claude Code, verification, release, retrospective. Each stage names what it produces and the failure it prevents.

**Why it exists:** unchanged — the only band that removes a belief rather than creating one, mandated by `FOUNDATION.md` §3 goal 4.

**What changed:** the objection is no longer answered by a paragraph saying implementation is delegated and judgement is not. It is answered by *position in a sequence*. A reader who walks the rail finds "Claude Code" at stage four of seven, after problem, architecture and decision, and before verification, release and retrospective — and draws the conclusion themselves. A conclusion a reader reaches is held more firmly than one they are handed.

**Constraint:** unchanged. States a position; does not argue with an imagined critic. Does not link away — band 5 of the old structure, now `/workflow`, owns the depth.

### Band 3 — Featured flagship: OrchestAI

**Produces:** *I have explored a real production architecture, and I did not have to go looking for it.*

Six layers — edge, admission, orchestration, agents, persistence, telemetry — each carrying the decision that shapes it and one property that holds. Then the link into the case study.

**Why OrchestAI specifically:** unchanged (`FOUNDATION.md` §9, as corrected by ADR-019).

**Why layers and not a second topology:** the hero already draws this system's shape. Drawing it again would be the second time a reader is told the same thing. What a layer stack adds is the axis a topology cannot show — *why each layer is shaped the way it is*.

**Constraint:** unchanged, and now sharper. A taste, never a compression. Every layer states a **property**, never a measurement: OrchestAI has no users, and a latency figure here would be a benchmark of nothing that a reader could disprove by opening the case study.

### Band 4 — NovaMind AI, as a pipeline

**Produces:** *a second competency, genuinely different in kind.*

The retrieval pipeline in seven stages, each naming its implementation and — the part that matters — the shape of what leaves it: one document, n passages, n × 1024, ten candidates, five passages, one answer, n citations.

**Why a pipeline and not the same layer stack:** two projects presented in the same component read as two instances of one thing, which is the exact failure ADR-012 exists to prevent. A sequence and a stack are different claims about how a system is organised.

**Why the shape line:** every RAG diagram draws these seven boxes and almost none say what leaves each one. Reading ten narrow to five tells a reader who knows the domain that reranking is present and that generation never sees the full candidate set — the one non-obvious decision in the pipeline.

### Band 5 — The rest of the work

**Produces:** *there is more, and it is a different kind.*

A compact index of every published case study not named in bands 3 and 4, with its competency, plus the route to `/work`.

**Why it exists:** bands 3 and 4 name two projects. The site has four case studies, and without this band two of them appear nowhere on the home page — invisible, because the page still looks complete. It is derived from content rather than listed, so a new case study appears here without an edit.

**Constraint:** deliberately the quietest band on the page. Equal weight with bands 3 and 4 would recreate the menu that featuring exists to avoid.

### Band 6 — Position

**Produces:** *this person has a view, and it is one I could disagree with.*

Four lines, each attributed to where it is load-bearing in this repository. No supporting paragraph.

**Why it exists:** the bands above establish that the work is real. This establishes that there is a mind behind the choices, which is what separates an engineer a team wants from an engineer a team can hire. It is placed after the evidence because a philosophy asserted before any work is a slogan.

**Constraint:** a line nobody could argue with is not a philosophy, it is a platitude, and it does not belong here. No line may need explaining.

### Band 7 — Connect

**Produces:** *I know what to do if I want to act.*

Unchanged from the previous band 6: the invitation to `/connect`, plus `/resume`, plus location, hours and address (ADR-014).

**Constraint:** unchanged. Not a call to action. `EXPERIENCE_PRINCIPLES.md` §3 refuses urgency and obligation. The page ends; the reader decides.

---

### The constraint that replaced the count freeze

The six-band freeze existed to stop bands accumulating by drift. It is replaced by two tests, both of which a proposed band must pass:

1. **It produces a belief no other band produces.** Stated in the terms above — what the reader believes after it that they did not believe before.
2. **Its form is justified by its content.** Two bands presenting different arguments in the same component is a signal that one of them is not needed.

Band 5 is the test case: it earns its place on test 1 and is kept visually quiet because it barely passes test 2.

---

## 5. Why this order

**The order is the objection sequence.** A skeptical reader's questions arrive predictably, and each must be answered before the next can be heard.

```
"Who is this?"                      → Band 1  Hero
"So you don't write your own code?" → Band 2  Lifecycle
"Show me something hard."           → Band 3  OrchestAI
"Is that all you do?"               → Band 4  NovaMind AI
"Is there more?"                    → Band 5  The rest of the work
"Do they think, or just build?"     → Band 6  Position
"What now?"                         → Band 7  Connect
```

**Qualification precedes evidence, and this is the load-bearing ordering decision.** `FOUNDATION.md` §3 goal 4 requires the workflow objection be answered *before the reader has to ask it*. Evidence presented to a skeptical reader does not accumulate — it gets discounted, and discounted evidence cannot be re-presented later. This survived the V2 redesign unchanged and is asserted in `tests/quality/homepage.spec.ts`.

**Depth precedes breadth.** Bands 3 and 4 before band 5 is the guide-don't-ask decision. A reader given four options chooses none; a reader given two systems to explore and then told there are more has already started.

**Position follows work, not the reverse.** A philosophy is credible in proportion to the evidence already in hand. Band 6 before band 3 would be a stranger's opinions.

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

**0.3.0 — 2026-08-06.** §4 and §5 amended by ADR-020: six bands become seven, the count freeze is replaced by a produces-a-belief test, and every band's *form* is specified alongside its content. The objection sequence is unchanged.

| Version | Date | Change |
|---|---|---|
| 0.2.0 | 2026-08-04 | Six-band structure. Featured flagship replaces the three-competency band; workflow and connect become explicit bands. All open questions resolved. Frozen. |
| 0.1.0 | 2026-08-04 | Initial narrative. Four bands. |

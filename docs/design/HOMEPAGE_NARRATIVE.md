# Homepage Narrative

**Status:** Active — narrative specification. Frozen Phase 3
**Version:** 0.2.0
**Last reviewed:** 2026-08-04
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

## 4. The six bands

Each band is defined by the belief it produces. Bands 1–4 carry the argument; bands 5–6 route.

### Band 1 — Hero

**Produces:** *this is a specific person, not a category.*

The positioning sentence verbatim (`FOUNDATION.md` §5), seniority, domain, primary stack. Present without scroll at 375 px. Answers R1, R2, R3, and provides the R5 exit (`EXPERIENCE_FLOW.md` §5).

**Why it exists:** the only content every reader sees, and the only chance to prevent miscategorisation. `FOUNDATION.md` §4 names the recruiter's failure mode precisely — "full-stack engineer + AI" is a category, not a position.

**If removed:** the site has no thesis. Every downstream page becomes evidence for an unstated claim.

**Constraint:** the positioning sentence appears once. Repeating it later is the behaviour of a page that does not believe it landed.

### Band 2 — Qualification

**Produces:** *the claim is a position, not a shortcut.*

The objection answered before it is asked. Not the full method — one compressed statement of what is delegated and what is not, and what makes the difference defensible: architecture, direction, verification, decision-making (`FOUNDATION.md` §5). The verification philosophy lands here, once.

**Why it exists:** the only band that removes a belief rather than creating one, and it is mandated by `FOUNDATION.md` §3 goal 4. A conventional portfolio has no equivalent because it has no objection to answer.

**If removed:** the flagship project in band 3 is read by a skeptical reader as a prompt. The entire evidentiary structure is discounted at first contact, and no project can recover it because the reader now reads *for* confirmation of the doubt.

**Constraint:** states a position; does not argue with an imagined critic. `EXPERIENCE_PRINCIPLES.md` §8 names *defensive* as a failure mode. Band 5 owns the depth; this band does not link away.

### Band 3 — Featured flagship: OrchestAI

**Produces:** *I have seen this person solve something hard, and I did not have to go looking for it.*

The primary story, carried far enough to be evidence rather than a summary: what it is, the constraint that made it hard, one architectural decision with its rejected alternative, and how correctness was established. Then the link into the full case study.

**Why OrchestAI specifically:** it is the AI Infrastructure Engineering story (`FOUNDATION.md` §9) — the infrastructure that has to hold when the workload it carries is non-deterministic. Of the three competencies, it is the one that most directly evidences the positioning claim, because it is carried by decision records and verification methodology rather than by features, which are precisely the capabilities the site argues are scarce. It is also public, so every claim in the band is checkable in one click.

**Why featured rather than three equal doors:** three equal doors is a menu, and a menu asks the reader to choose before they have grounds to. One story carried to depth gives the reader evidence *and* a demonstration of what the other two will be like. This is the guide-don't-ask decision.

**If removed:** the homepage returns to being an index. The reader leaves with a claim, a qualification, and three names — a promise of evidence rather than evidence. Every subsequent click becomes a gamble the reader may not take.

**Constraint:** this band is a *taste* of the case study, not a compression of it. It must not summarise all nine sections. One decision, told properly, beats nine sections told briefly — and a reader who feels they have already read the case study will not open it.

### Band 4 — Additional projects

**Produces:** *this is three genuinely different competencies, not one thing three times.*

NovaMind AI and Edge10, each with its competency story named and the question it answers. Serves H2 and C6. Together with band 3, this is where the competency thesis (ADR-012) resolves on the homepage without navigation, satisfying `ARCHITECTURE.md` §5.

**Why it exists:** breadth is the argument a hiring manager who reads nothing else still leaves with. It is also what makes band 3 legible as *one of three kinds* rather than as the only thing this person does.

**If removed:** the site becomes a single-project portfolio with two footnotes, and ADR-012's entire purpose collapses.

**Constraint:** these are presented as competency stories with a project attached, not as cards. They are deliberately lighter than band 3 — the asymmetry is the message. Equal weight here would recreate the menu that band 3 exists to avoid.

### Band 5 — Workflow

**Produces:** *the method is documented, not asserted.*

The invitation into `/workflow`: the process end to end, what is owned versus delegated, and where it breaks down. Serves H5 at depth and C1–C3.

**Why it exists here, and not earlier:** band 2 answers the objection; this band offers the full argument to readers who want it. Placing it before the work would ask a reader to study the method before seeing what it produced. Placing it after means the reader arrives at `/workflow` already holding evidence, which is the order in which a method claim is credible.

**Why it exists at all:** it is the primary entry point for the collaborator audience (`FOUNDATION.md` §4.4), and the deepening path for the skeptic band 2 only partially satisfied.

**If removed:** the collaborator has no route in, and the AI-native claim rests on one compressed paragraph.

### Band 6 — Connect

**Produces:** *I know what to do if I want to act.*

The invitation to `/connect` — availability, current focus, what to bring, response expectations (ADR-014). Plus the exits for readers whose journey is complete: `/resume` for the recruiter, `/work` for the reader who wants to compare.

**Why it exists:** `ARCHITECTURE.md` §4 — no route is a dead end. A reader convinced at band 3 or 5 needs somewhere to go that is not the header.

**If removed:** the convinced reader's only exit is the header navigation, which is the failure this document exists to prevent.

**Constraint:** the exits are not equally weighted, and this is not a call to action. `EXPERIENCE_PRINCIPLES.md` §3 refuses urgency and obligation. The page ends; the reader decides.

---

## 5. Why this order

**The order is the objection sequence.** A skeptical reader's questions arrive predictably, and each must be answered before the next can be heard.

```
"Who is this?"                      → Band 1  Hero
"So you don't write your own code?" → Band 2  Qualification
"Show me something hard."           → Band 3  Featured flagship
"Is that all you do?"               → Band 4  Additional projects
"How do you actually work?"         → Band 5  Workflow
"What now?"                         → Band 6  Connect
```

**Qualification precedes evidence, and this is the load-bearing ordering decision.** `FOUNDATION.md` §3 goal 4 requires the workflow objection be answered *before the reader has to ask it*. Evidence presented to a skeptical reader does not accumulate — it gets discounted, and discounted evidence cannot be re-presented later.

**Depth precedes breadth.** Band 3 before band 4 is the guide-don't-ask decision. A reader given three options chooses none; a reader given one story and then told there are two more of a different kind has already started.

**Method follows work, not the reverse.** A method claim is credible in proportion to the evidence already in hand. Band 5 before band 3 would ask a reader to study process before seeing output.

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

| Version | Date | Change |
|---|---|---|
| 0.2.0 | 2026-08-04 | Six-band structure. Featured flagship replaces the three-competency band; workflow and connect become explicit bands. All open questions resolved. Frozen. |
| 0.1.0 | 2026-08-04 | Initial narrative. Four bands. |

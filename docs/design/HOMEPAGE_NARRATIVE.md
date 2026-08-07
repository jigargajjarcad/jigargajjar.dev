# Homepage Narrative

**Status:** Active — narrative specification. Frozen Phase 3; §4–§5 amended by ADR-020, superseded by ADR-023
**Version:** 0.5.0
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

## 4. The one idea, in six screens

**Superseded by ADR-023 (2026-08-06).** This section has specified six bands, then seven, then five, then this. Every previous version froze a *structure*; none of them froze the thing that was actually going wrong, which was length.

**The page carries one idea and every screen is an instance of it:**

> **Good systems are defined by what they refuse.**

That is what makes this a page rather than a table of contents. A reader leaves remembering one sentence, not six sections — and the sentence is demonstrated four times before it is ever stated.

**§5 is unchanged in substance for the fourth consecutive version.** The order is the objection sequence; qualification precedes evidence.

### Screen 1 — The claim

**Belief:** *this person builds production AI systems.*

The thesis at the largest type on the site, `POSITIONING` verbatim beneath it (`FOUNDATION.md` §5), one link into the work, and one mono line at the foot reporting the reader's own page load.

**Why the footnote survived and the waterfall did not:** V3 rendered this measurement as eight rows of spans, bars and durations. The idea was original; the presentation made it read as *look what I measured*, which is the register the redesign existed to escape. Eleven words carry the same fact and read as confidence. Nothing about the claim was softened — only its volume.

**Constraint:** nothing animates (`MOTION.md` §5). The footnote must cost zero layout shift, because it names its own.

### Screen 2 — Method

**Belief:** *there is a repeatable way of working here.*

Three clauses, and one sentence naming the number of checks that block a merge.

**Why it holds the second position:** unchanged across all four versions. `FOUNDATION.md` §3 goal 4 requires the *agents wrote this, so what did you do* objection to be answered before any evidence. The third clause answers it, and is the page's idea in its first form: a gate that says no.

**What changed:** V3 answered this with a seven-stage grid, four gauges, six counters and four caveat cards — 397 words. It now takes fifteen.

### Screens 3 and 4 — The systems

**Belief:** *these are elegant.*

One idea each, stated in one sentence, with its consequence in a second. Both ideas are the page's idea: OrchestAI rejects a run before any model is called; NovaMind discards five of ten candidates before the model sees anything.

**Why one sentence and not a diagram:** the sentence is the thing the case study is organised around, which makes the screen an invitation rather than a summary. V3 gave each system a twelve- and six-span waterfall; a reader at forty-five seconds read the headline and left, so the headline is now all there is.

**Constraint — the figure test.** A visualisation ships only if it communicates faster than the sentence it replaces. `10 → 5 → 1` at display size passes and is the page's only figure. OrchestAI has none, because its idea is a sentence and a diagram of it would be slower to read.

### Screen 5 — Refusals

**Belief:** *this person has judgement, including about AI itself.*

Four things not built, one line of consequence each, and then the page's idea stated outright for the only time.

**Why it replaced the philosophy band, and then absorbed the failure screen:** aphorisms with citations create the impression of someone who enjoys writing aphorisms. Refusals with costs create the impression of someone who has had to decide something. The fourth entry is a failure rather than a decision and is the most valuable line on the site, because it is the only one that costs something to admit.

**Constraint:** the closing line appears once, at the end. An idea asserted before its evidence is a slogan; the same sentence after it is a thesis. Asserted in CI.

### Screen 6 — Connect

**Belief:** *I know what to do if I want to act.* Unchanged across all four versions. Not a call to action — `EXPERIENCE_PRINCIPLES.md` §3 refuses urgency and obligation.

---

### 4.1 What is frozen

Not a structure. Four rules, all enforced in CI:

1. **One screen, one belief.** A screen needing three diagrams, five paragraphs or eight labels is a screen whose belief is wrong, or two screens.
2. **A figure must be faster than the sentence it replaces.** This is the test every component deleted in V4 failed.
3. **The page stays inside its word budget.** 340 words, enforced alongside the byte budgets — because nothing in types, lint, bundle size, axe or Lighthouse has any opinion about length, and all of them stayed green while the page grew to 1,914 words across thirteen screens.
4. **It renders completely without JavaScript.**

Rule 3 is what ADR-023 added, and it is the one that would have prevented all three previous versions.

---

## 5. Why this order

**The order is the objection sequence.** A skeptical reader's questions arrive predictably, and each must be answered before the next can be heard.

```
"Who is this?"                      → 1  The claim
"So you don't write your own code?" → 2  Method
"Show me something real."           → 3  OrchestAI
"Is there more than one?"           → 4  NovaMind
"Do they have judgement?"           → 5  Refusals
"What now?"                         → 6  Connect
```

**Qualification precedes evidence, and this is the load-bearing ordering decision.** `FOUNDATION.md` §3 goal 4 requires the workflow objection be answered *before the reader has to ask it*. Evidence presented to a skeptical reader does not accumulate — it gets discounted, and discounted evidence cannot be re-presented later. Unchanged since V1 and asserted in `tests/quality/homepage.spec.ts`.

**Judgement is last of the substantive screens.** A refusal is only interesting once the reader believes the thing could have been built, which takes screens 3 and 4.

**The idea is named last.** Four demonstrations, then the sentence. Reversing that order would cost it everything.

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

**0.5.0 — 2026-08-06.** §4 and §5 superseded by ADR-023. The page now carries one idea in six screens and ~270 words; §4.1 replaces every previous structural freeze with four rules, of which a word budget is new and is the one that would have prevented V1, V2 and V3. The objection sequence is unchanged for the fourth consecutive version.

**0.4.0 — 2026-08-06.** §4 and §5 superseded by ADR-023: seven bands become five, and §4.1 replaces the band-count freeze with four tests a band must pass — of which “it is checkable” is new and reshaped the page. The objection sequence is unchanged for the third consecutive version.

**0.3.0 — 2026-08-06.** §4 and §5 amended by ADR-020: six bands become seven, the count freeze is replaced by a produces-a-belief test, and every band's *form* is specified alongside its content. The objection sequence is unchanged.

| Version | Date | Change |
|---|---|---|
| 0.2.0 | 2026-08-04 | Six-band structure. Featured flagship replaces the three-competency band; workflow and connect become explicit bands. All open questions resolved. Frozen. |
| 0.1.0 | 2026-08-04 | Initial narrative. Four bands. |

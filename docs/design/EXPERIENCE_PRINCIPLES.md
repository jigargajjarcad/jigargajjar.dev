# Experience Principles

**Status:** Active — specification only
**Version:** 0.1.0
**Last reviewed:** 2026-08-04
**Governed by:** [`FOUNDATION.md`](../FOUNDATION.md) §2, §4, §6 · [`VISUAL_LANGUAGE.md`](./VISUAL_LANGUAGE.md) §1

`FOUNDATION.md` §4 defines what each reader **needs** and what action ends their visit well. This document defines what each reader should **feel** while getting it, and what the site must never make them feel.

Feeling is not decoration. A reader's emotional state determines whether they keep reading, how charitably they interpret ambiguity, and what they say about the site to someone else three days later. It is a design output like any other, and leaving it unspecified means it gets decided accidentally.

---

## 1. The target register

**Calm competence.**

The site should feel like being handed a well-made instrument by someone who does not need you to be impressed by it. Everything is where it should be. Nothing is asking for attention. The quality is evident in how little effort the reader has to spend, not in anything the reader is invited to admire.

The closest analogue is not a portfolio. It is a good technical document written by someone who knew the material completely — the kind where you notice, twenty minutes in, that you have not been confused once.

**The reaction we are engineering for is the absence of friction, not the presence of delight.** A reader who finishes a case study and could not describe the interface has had the intended experience. A reader who remembers the interface has been distracted from the argument.

---

## 2. Principles

**Confidence without assertion.** The site never tells the reader it is good. It demonstrates the properties that would make it good and lets the reader conclude. Every superlative removed is a superlative the reader gets to supply, and a conclusion a reader reaches themselves is one they defend to other people.

**Clarity is a kindness, and it is also evidence.** Ambiguity in an interface is unpaid work handed to the reader. Removing it is courtesy — and on a site arguing for engineering judgement, the ability to make a complex thing legible *is* the argument, performed rather than claimed.

**Trust is built by disclosure, not by polish.** The elements that most increase trust are the ones a marketing instinct would remove: the Failures & mistakes section, the `archived` badge, the stated limitation, the metric that carries its qualifier. A reader who finds one honest weakness believes the strengths. A reader who finds none believes nothing.

**Calm is a performance characteristic.** Nothing moves unbidden. Nothing appears late. Nothing shifts under the reader's eye. Calm is what a strict performance budget and a closed motion system *feel* like from the outside — the emotional register is a direct consequence of the engineering, which is why it cannot be faked by a site that skipped the engineering.

**Density matched to intent.** A reader with thirty seconds should not scroll past whitespace; a reader eight paragraphs into an argument should never feel crowded. Getting this right is invisible. Getting it wrong reads as either desperation or indifference.

**The reader is always oriented.** They know where they are, how much is left, and what happens if they click. Disorientation is the fastest route from interest to abandonment, and it is almost always caused by something the designer thought was interesting.

**Precision as a texture.** Alignment that holds, figures that line up, spacing that repeats, contrast that never wavers. No single instance is noticed; the accumulation is felt as care. This is the only mechanism by which "craft" registers on a site with no decoration.

---

## 3. Anti-principles

Emotions the site deliberately refuses to produce, each with the technique that would produce it.

| Refused | Produced by | Why refused |
|---|---|---|
| **Awe** | Spectacle, scroll narratives, WebGL, oversized motion | Awe is directed at the artifact. We need attention directed at the argument |
| **Delight** | Easter eggs, playful microcopy, animated flourishes | Delight is a product-experience goal. This is a professional evaluation, and charm reads as compensation |
| **Urgency** | Scarcity framing, availability banners, calls to action | The reader is evaluating a person, not converting on an offer. Urgency reads as need |
| **Flattery** | Testimonials, endorsement logos, "trusted by" | Borrowed credibility invites the question of why the work cannot carry itself |
| **Intimacy** | Casual voice, personal anecdote, first-person warmth | Distance is appropriate. Over-familiarity with a stranger evaluating you professionally reads as a misjudged register |
| **Obligation** | Newsletter prompts, contact interstitials, exit intent | Any interruption converts a reader into a target |
| **Uncertainty** | Ambiguous affordances, unexplained states, hidden content | The reader should never have to test the interface to understand it |
| **Impatience** | Loading states, entrance delays, transitions between routes | Every millisecond a reader waits is a millisecond spent evaluating the engineering, unfavourably |

**The unifying rule: no emotion is produced by a technique the content did not earn.** Every item above is a way of generating feeling that the underlying work has not justified. If the work is good, these are unnecessary. If it is not, these are a disguise.

---

## 4. The reader journey

`FOUNDATION.md` §4 specifies what each reader needs. This is the emotional arc alongside it.

### Recruiter — thirty seconds

| Beat | Feeling |
|---|---|
| First paint | Nothing is loading. Immediate orientation |
| Reading the positioning | "This is a specific person, not a category" |
| Scanning | "This is more considered than what I usually open" |
| Leaving | Confidence that forwarding this will not embarrass them |

**The emotional job is de-risking.** A recruiter forwards a candidate to a hiring manager whose time is expensive. Their private question is not "is this person good" but "will I look foolish for sending this." Everything above the fold is answering that.

**The failure to avoid:** an interface that looks designed enough to raise the question of whether the person is an engineer or a designer who codes. Restraint resolves this — the site reads as built by someone whose priority was correctness.

### Hiring manager — five to ten minutes

| Beat | Feeling |
|---|---|
| `/work` | "Three different things, not three versions of one thing" |
| Opening a case study | "This is structured. I know where the useful part is" |
| Reaching Key decisions | Recognition — "these are the tradeoffs I have argued about" |
| Reaching Failures & mistakes | Surprise, then increased trust |
| Leaving | "I would like to hear them talk about this" |

**The emotional job is producing recognition.** A hiring manager decides on whether the person thinks like someone they would want to argue with productively. The moment that lands is not a metric — it is encountering a constraint they have personally fought and seeing it resolved in a way they had not considered.

**The failure to avoid:** feature description in place of reasoning. It produces a flat, unmemorable read that the reader cannot distinguish from competent tutorial completion.

### Senior engineer — twenty minutes and more

| Beat | Feeling |
|---|---|
| Arrival | Suspicion. This is correct and expected |
| Testing the interface — keyboard, devtools, zoom | Mild surprise that it holds |
| Reading Verification | "They know what correct means" |
| Reading Looking back | "They know what they got wrong, and why" |
| Following a source link | Confirmation, not revelation |
| Leaving | Respect, and one idea they did not have |

**The emotional job is surviving scrutiny.** This reader arrives adversarially and is right to. Their satisfaction comes from *failing to find the gap* — which means the experience is a sequence of small tests, each passed without ceremony. Nothing on the site should acknowledge that it is being tested.

**The failure to avoid:** a single discovered gap. This reader generalises from one finding to the whole artifact, and correctly — an inconsistency is evidence about process, not about one element.

### Future collaborator — self-directed

| Beat | Feeling |
|---|---|
| `/workflow` | "This is a real process, with named failure modes" |
| Reading a case study | "I can tell how they think, not just what they built" |
| Reading Failures & mistakes | "This person will tell me when something is going wrong" |
| Leaving | "Working with them would be low-friction" |

**The emotional job is projecting collaboration.** This reader is imagining working alongside the person. The strongest signals are written clarity, visible process, and candour about failure — none of which any outcome metric conveys.

**The failure to avoid:** a site that reads purely as a job application. It answers a question the collaborator is not asking and tells them nothing about partnership.

---

## 5. The arc across the site

The full-site journey has a deliberate shape: **claim → structure → evidence → candour.**

1. **Claim** (home, above the fold) — a specific assertion, stated once, plainly.
2. **Structure** (home scroll, `/work`) — the claim decomposes into three distinct competencies. The reader's model of the person gets more precise rather than louder.
3. **Evidence** (case-study body) — decisions, constraints, verification. The claim becomes checkable.
4. **Candour** (Failures & mistakes, Looking back, `/workflow` failure modes) — the argument's weakest points, volunteered.

**The arc ends on candour deliberately.** A document that ends on strength leaves the reader waiting for the catch. A document that volunteers its own limits removes the catch, and the last thing the reader feels is that they have been dealt with straight. That feeling is the one that survives until the debrief.

---

## 6. Memorable moments

Memorability without theatre comes from a small number of moments where the reader's expectation is quietly violated in the direction of higher quality. Four are engineered.

**The absence of load.** Every route appears complete on first paint. On a mid-tier phone this is genuinely unusual and it registers before the reader has read a word — as competence, not as speed.

**The failure section that is not hedged.** A portfolio that names its own architectural mistakes, in a section given the same visual weight as everything else, contradicts what the reader expects hard enough to be remembered. It is the single most memorable element on the site and it costs nothing but honesty.

**The metric set as an artifact.** One number, in the serif, at scale, with its qualifier attached (`VISUAL_LANGUAGE.md` §2.4). The reader stops. It works precisely because it is rare.

**The keyboard path that holds.** For the senior-engineer reader only: tabbing through the site and finding the focus indicator visible, ordered, and untrapped at every stop. Almost nothing they open passes this. It is remembered as a fact about the person.

**None of these are effects.** Each is a consequence of a decision made for an engineering reason — the performance budget, the document model, the type system, the accessibility gate. That is what makes them unfakeable, and it is why the site does not need a signature moment.

---

## 7. Where the verification philosophy shows up

`FOUNDATION.md` §6: *engineering is not measured by how quickly code is written, but by how confidently it can be verified.*

The site should make a reader feel this without stating it more than once. It shows up as texture:

- Claims arrive with their evidence attached, so the reader never has to decide whether to believe an assertion.
- Numbers arrive with their conditions, so a qualified figure reads as rigour rather than as a hedge.
- The artifact exhibits the properties it claims, so a reader who tests one thing stops testing.
- Failures are recorded, so the successes read as measured rather than as selected.

**The feeling produced is the feeling of dealing with someone who checks.** That is worth more than any statement of the philosophy, and it is the reason the sentence appears once in `FOUNDATION.md` and nowhere on the site as a slogan.

---

## 8. Failure modes

| Failure | Symptom | Cause |
|---|---|---|
| **Cold** | Precise, correct, and the reader feels nothing | Restraint applied to the writing as well as the interface. The prose must carry conviction the visual system deliberately withholds |
| **Austere** | Reads as unfinished rather than as edited | Space without composition. Emptiness must be shaped, not merely present |
| **Smug** | The confidence reads as superiority | Claims without their limits attached. The candour layer is the corrective |
| **Anonymous** | Well-executed and indistinguishable | The competency thesis has not landed. Three projects reading as one |
| **Trying** | The reader notices an element working for effect | Any device present for its own sake. `VISUAL_LANGUAGE.md` §9, test 6 |
| **Defensive** | The AI-native workflow reads as justified rather than asserted | Over-explaining. `/workflow` states the process; it does not argue with an imagined critic |

**Cold is the most likely failure and the hardest to detect.** Every decision in this system removes something, and the accumulated result can be an interface with nothing wrong and nothing alive. The counterweight is the writing: the visual system is deliberately quiet so that the prose can be direct, specific, and occasionally sharp. If both are quiet, the site is a well-formatted void.

---

## 9. How this is evaluated

Feeling is not measurable in analytics, and `FOUNDATION.md` §11 ships none. It is evaluated in the Tier 3 comprehension sessions, with two questions added to the existing protocols:

- **After the recruiter session:** "Would you forward this? What would make you hesitate?" Hesitation names the failure mode.
- **After the senior-engineer session:** "What did you think of the person, separate from the work?" This surfaces *smug*, *cold*, and *trying* — none of which the existing protocol asks about.

Both are qualitative and both are recorded. A finding here becomes an issue in the same way a finding about content does.

---

## 10. Open questions

1. **Does the prose carry enough warmth to prevent *cold*?** Undecidable until real case-study copy exists. Review after the first case study is drafted, not before.
2. **Is `/about` the right place for the only human moment on the site?** The collaborator audience needs some sense of the person. Whether that belongs in prose, in a portrait (`IMAGERY.md` §8), or in neither is unresolved.
3. **Does the candour layer risk under-selling?** The failure sections are the site's differentiator and also, read uncharitably, a list of mistakes. Worth testing explicitly with a hiring manager in Tier 3 rather than assuming the framing lands.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-08-04 | Initial specification. |

# Content Strategy — Editorial

**Status:** Active — specification only. Frozen Phase 3
**Version:** 0.1.0
**Last reviewed:** 2026-08-04
**Governed by:** [`FOUNDATION.md`](../FOUNDATION.md) §5–§7 · [`EXPERIENCE_PRINCIPLES.md`](./EXPERIENCE_PRINCIPLES.md)

> **Not to be confused with `ARCHITECTURE.md` §6, "Content strategy,"** which specifies storage, schema, and the MDX component set. That document governs how content is stored. **This document governs how it is written.** Where the two are referenced together, this one is "editorial" and that one is "content architecture."

The design system is finished. The writing is not, and it is now the largest remaining risk to the project — `EXPERIENCE_PRINCIPLES.md` §8 names *cold* as the most likely failure mode, and its cause is a visual system that withholds while the prose also withholds. **The visual system is deliberately quiet so that the prose can be direct.** If both are quiet, the site is a well-formatted void.

This document exists so that every page sounds like it was written by the same person, and so that excellent design is never weakened by weak writing.

---

## 1. Writing philosophy

**Write like the smartest engineer you know explaining something they actually understand.** Not teaching, not selling, not performing — explaining, to a peer, with the assumption that the peer is capable and busy.

Four commitments follow.

**Specificity over completeness.** One decision explained properly beats five listed. A reader who understands one thing deeply extrapolates; a reader given five summaries extrapolates nothing. This is the rule that most often means cutting good material.

**The reasoning is the content.** What was built is recoverable from the artifact. Why it was built that way, what was rejected, and what it cost are not, and they are the only part that cannot be inferred (`FOUNDATION.md` §7).

**Claims arrive with their evidence attached.** Never a statement followed later by support. The qualifier belongs in the same sentence as the number, and the alternative belongs in the same paragraph as the decision. A reader should never have to decide whether to believe something and wait to find out.

**Concede before you are asked.** The limitation stated voluntarily is worth more than the strength asserted confidently. This is the mechanism that makes the rest credible (`EXPERIENCE_PRINCIPLES.md` §2).

---

## 2. Tone of voice

**Direct, precise, unhurried, and slightly understated.**

| The voice is | The voice is not |
|---|---|
| Plain — the simplest accurate word | Simplified — accuracy is never traded for accessibility |
| Confident — states things without hedging | Assertive — never tells the reader what to conclude |
| Specific — names the constraint, the number, the alternative | Exhaustive — does not list everything it knows |
| Dry — occasional understatement is permitted | Funny — no jokes, no wordplay, no asides |
| Personal — first person singular, because one person did this | Intimate — no anecdote, no emotion, no warmth for its own sake |
| Measured — comfortable with "probably" and "it depends" | Hedged — never uses qualifiers to avoid committing |

**Person and tense.** First person singular ("I chose") for decisions and actions. Third person for the system ("the loader validates"). Past tense for what happened, present for what is true now. Never the editorial "we" — one person built this and the plural reads as a company that does not exist.

**The understatement rule.** Where a result is genuinely strong, state it plainly and stop. "Retrieval precision improved by roughly a third" is stronger than any adjective that could precede it. Superlatives transfer the judgement from the reader to the author, and the reader resents it.

---

## 3. Sentence length and rhythm

**Target 15–25 words. Vary deliberately.**

Uniform sentence length is the most reliable signature of writing that was generated rather than composed. The correction is not a target average but deliberate variation: a long sentence that develops an idea, followed by a short one that lands it.

**Rules.**
- No sentence over 40 words. Above that, a clause is doing work that deserves its own sentence.
- A paragraph of uniformly long sentences is unreadable; a paragraph of uniformly short ones is staccato and reads as breathless.
- One idea per sentence. Two ideas joined by "and" are usually two sentences.
- Semicolons are permitted and should be rare. A semicolon joining two independent clauses is often a full stop avoiding commitment.
- Em dashes are permitted for genuine parenthetical asides — like this — and are the most frequently overused mark in technical writing. **Maximum one per paragraph.**
- Start sentences with "But," "And," and "Because" where the rhythm calls for it. The prohibition is a schoolroom rule with no basis.

---

## 4. Paragraph rhythm

**Target 3–5 sentences. Never more than 6.**

- **One paragraph, one point.** If a paragraph needs a "furthermore," it is two paragraphs.
- **Lead with the point, then support it.** Never build to a conclusion — a reader scanning first sentences should get the argument's spine.
- **Vary paragraph length.** A one-sentence paragraph is a legitimate emphasis device and loses all force if used more than once or twice per document.
- **No orphaned transitions.** A paragraph beginning "However," or "That said," is usually the second half of the paragraph above it.
- **Paragraphs are not scrollable units.** At 68 characters and 18 px, six sentences already fills most of a phone screen. Density is a mobile constraint before it is a stylistic one.

---

## 5. Section introduction rules

**Every section under a heading begins with a sentence that states what the section is about — not what it will do.**

- Correct: *"Retrieval quality was the constraint that shaped every other decision in the system."*
- Wrong: *"In this section I will discuss retrieval quality."*
- Wrong: *"Let's talk about retrieval."*

**No section announces itself, and no section recaps.** The heading names the section; restating it wastes the reader's most attentive sentence. Closing summaries are equally prohibited — a reader who has just read four paragraphs does not need them compressed, and a reader who skipped them is not served by a summary that lets them skip more.

**The first sentence after a heading is the most-read sentence in any section.** In a scanned document it may be the only one. It should be able to stand alone.

---

## 6. Maximum content density

Limits that make a page readable rather than merely complete.

| Unit | Limit |
|---|---|
| Words per case study | 1,800–3,000. Below 1,800, the argument is thin; above 3,000, it is a document nobody finishes |
| Case-study section | 150–500 words. A section over 500 has become two |
| Paragraphs before a break | 4. Then a heading, list, figure, or callout |
| Homepage band 3 (featured) | ≤ 250 words. It is a taste, not a summary (`HOMEPAGE_NARRATIVE.md` §4) |
| Project-card summary | ≤ 3 lines rendered — roughly 30 words |
| Timeline entry | ≤ 2 sentences |
| Callout | ≤ 3 sentences. Longer is a section |
| Metric qualifier | ≤ 15 words |
| Engineering note | 600–1,200 words |

**On brevity generally:** the constraint is not "write less." It is "cut what does not serve the argument." A 3,000-word case study where every paragraph is load-bearing is a better read than a 1,200-word one padded with context the reader already had.

---

## 7. Heading hierarchy

**Heading level is a structural claim, never a size preference** (`ACCESSIBILITY.md` §8).

- One `<h1>` per page. Levels never skip.
- Headings are noun phrases or plain statements, never questions and never sentences. "Retrieval and citation grounding," not "How did I handle retrieval?"
- **Headings are not clever.** A reader scanning headings must be able to reconstruct the argument's shape. A heading that requires reading the section to understand has failed at its only job.
- Sentence case, always.
- No numbering in case studies — the nine-section model is fixed, and numbering makes it look like a form. Numbering is used in the internal documentation, where cross-referencing matters more than reading flow.
- No heading immediately followed by another heading. If a section has nothing before its first subsection, the section is unnecessary.

---

## 8. Bullets — when, and when not

**Default to prose. Bullets are the exception and require a reason.**

Bulleted lists are the fastest way to make technical writing look organised and the fastest way to strip it of reasoning. A bullet holds a fact; it cannot hold a *because*. A page of bullets is a page where nothing is connected to anything, and connection is precisely what this site is arguing it can do.

**Use bullets when:**
- The items are genuinely parallel and genuinely unordered.
- The items are enumerable and complete — the four stages, the three constraints.
- The reader will scan for one item rather than read all of them.
- A table would be better, but there is only one column.

**Do not use bullets when:**
- The items have a causal or sequential relationship. That is prose, or a numbered list.
- Any item needs more than two lines. That is a paragraph with a heading.
- The list has two items. That is a sentence with "and."
- You are listing decisions, tradeoffs, or reasoning. **This is the important one.** Reasoning bulleted is reasoning amputated — the connective tissue is where the judgement lives, and it is exactly what the bullet format removes.
- The list is longer than seven items. Seven-plus means the grouping is wrong.

**Never:** bullets inside bullets, bullets as the entire content of a section, bullets that are complete paragraphs with a dot in front, or a bullet list immediately following a heading with no introductory sentence.

**Tables are preferred to bullets** wherever items share attributes. A table makes the comparison explicit; a bulleted list makes the reader hold it in their head.

---

## 9. Terminology

One term per concept, used everywhere. Terminology drift makes a single-author site read as though it were assembled by a committee.

| Use | Never |
|---|---|
| case study | project page, portfolio piece, write-up |
| competency story | pillar, category, focus area, specialism |
| AI-native workflow | AI-assisted, AI-powered, AI-driven, vibe coding |
| agent | bot, assistant, copilot, AI |
| verification | testing (when the broader discipline is meant) |
| reader | user, visitor, audience member |
| decision record / ADR | doc, write-up, note |
| lifecycle | status (which means document publication state) |
| engineering note | post, article, blog, essay collection |
| the site / this site | my portfolio, my website |

**Product names.** "OrchestAI," "NovaMind AI," "Edge10" — exactly as written, every time, including capitalisation. First mention on any page includes its competency story; subsequent mentions do not.

**Technology names take their own conventions:** .NET, TypeScript, PostgreSQL, MCP, Next.js. Never "dotnet," "TS," "postgres."

---

## 10. Forbidden language

### Marketing register

Absolutely prohibited. Each of these is a claim the reader is being asked to accept rather than evidence they can check.

*passionate, cutting-edge, state-of-the-art, best-in-class, world-class, industry-leading, game-changing, revolutionary, seamless, effortless, elegant (of one's own work), beautiful (of one's own work), delightful, magical, blazing fast, lightning fast, supercharged, unlock, empower, transform, elevate, craft (as a verb), curated, bespoke, journey (of anything but a reader), passionate about, obsessed with, love for*

### Buzzwords and filler

*leverage (use "use"), utilise (use "use"), synergy, ecosystem (unless literally a package ecosystem), holistic, robust (say what property is meant), scalable (say to what), performant (say how fast), best practices, industry standard, deep dive, learnings (use "lessons"), impactful, actionable, thought leadership, at scale (unless the scale is named), production-grade (say what makes it so), enterprise-grade*

### Hedges that weaken without adding precision

*arguably, essentially, basically, simply, just, quite, very, really, actually, obviously, clearly, of course, needless to say, it's worth noting, it goes without saying*

"Simply" and "just" are singled out: both tell the reader that something was easy, which is either false or insulting depending on whether they found it easy.

### Constructions

- **"I'm excited to announce"** and variants. Nothing on this site is announced.
- **"In today's fast-paced world"** and every environmental scene-setter.
- **Rhetorical questions as section openers.** "So how do you verify an agent's output?" — state the problem instead.
- **The rule of three used decoratively.** "Fast, reliable, and maintainable" is three adjectives doing the work of none.
- **Self-congratulation by implication.** "Not many people think about X" is a claim about others.
- **Apologetic framing.** "This is just a small project, but…" — either it merits a case study or it does not.

---

## 11. Preferred engineering language

The vocabulary this site is written in.

**For decisions:** chose, rejected, traded, constrained by, required, ruled out, settled on, reversed.
**For evidence:** measured, verified, asserted in CI, reproduced, failed at, held at, degraded to.
**For uncertainty:** unresolved, unverified, not measured, an assumption I did not test.
**For scale and magnitude:** name the number and its conditions. "Roughly a third" beats "significantly."
**For failure:** wrong, broke, reverted, cost me, did not catch, missed.

**Say the honest thing in the plainest available words.** "The retrieval evaluation did not catch it" is stronger than "there was a gap in the evaluation coverage," because the first has a subject who is accountable and the second does not. Passive voice around failure is the most common way technical writing quietly declines responsibility.

---

## 12. Good and bad, with the reason

**Describing a decision**

> ✗ We leveraged a cutting-edge hybrid retrieval approach to deliver best-in-class citation accuracy.

> ✓ I chose hybrid retrieval over pure vector search because citation precision mattered more than recall — a wrong citation is worse than a missing one. It cost roughly 40 ms per query.

*Why:* the first is three unverifiable claims. The second names the choice, the rejected alternative, the constraint that decided it, and the price paid.

**Opening a section**

> ✗ In this section, let's dive deep into the architecture and explore some of the key decisions.

> ✓ The framework's extension model was the decision everything else depended on.

*Why:* the first spends the most-read sentence announcing itself. The second is already arguing.

**Describing a failure**

> ✗ There were some learnings around the initial architecture that led to iterative improvements.

> ✓ The first architecture assumed agents were stateless. They were not, and I rewrote the orchestration layer in week six.

*Why:* the first has no subject, no mistake, and no cost. The second is checkable, and it is the sentence that makes the rest of the case study credible.

**Stating a result**

> ✗ Dramatically improved performance across the board.

> ✓ P95 latency fell from 820 ms to 310 ms on the same hardware and query set. Cold starts were unaffected.

*Why:* the second names the metric, the conditions, and what did *not* improve. The exclusion is what makes the inclusion believable.

**Introducing a project**

> ✗ NovaMind AI is a cutting-edge, enterprise-grade AI platform that empowers organisations to unlock insights from their documents.

> ✓ NovaMind AI lets organisations upload documents and ask questions against them, with answers grounded in retrievable citations. The hard part was making the citations trustworthy.

*Why:* the second says what it does in words with referents, then names the actual engineering problem. It is also shorter.

---

## 13. Voice consistency check

Before any page publishes, four checks. Each takes under a minute and catches a different failure.

1. **The scan test.** Read only the headings and first sentences. Is the argument's shape recoverable? If not, §5 or §7 has been violated.
2. **The forbidden-word grep.** Search for the §10 lists. This should be automatable in CI and should be, in Phase 5.
3. **The bullet audit.** For every bulleted list, ask whether it holds facts or reasoning. Reasoning goes back to prose (§8).
4. **The sameness test.** Read a paragraph from this page next to one from a different page. Could a reader tell they had different authors? If yes, the register drifted.

**One further check for case studies:** read the Failures & mistakes section aloud. If it sounds like an interview answer where the difficulty resolves flatteringly, it has been sanitised and must be rewritten (`ARCHITECTURE.md` §6.2).

---

## 14. Maintenance implications

- **The forbidden-word list will feel excessive until the first draft.** It is calibrated for the failure mode this project actually has: a technically strong author reaching for marketing register when describing their own work, because describing your own work plainly feels like under-claiming.
- **Terminology (§9) is the fastest thing to drift** and the cheapest to enforce. It belongs in the CI grep alongside §10.
- **The density limits (§6) will be resisted first at the case studies.** A 4,000-word case study feels more thorough. It is read by fewer people, all the way through, which makes it less thorough in effect.
- **This document governs the internal documentation too.** `docs/` is public (`FOUNDATION.md` §9) and is the fourth case study's primary artifact.

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-08-04 | Initial editorial specification. Phase 3 close-out. |

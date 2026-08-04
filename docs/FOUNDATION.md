# Foundation

**Status:** Active
**Owner:** Jigar Gajjar
**Last reviewed:** 2026-08-04

This document defines why jigargajjar.dev exists, who it is for, what it claims, and how we will know whether it worked. It is the highest-authority document in this repository. When `ARCHITECTURE.md`, `DECISIONS.md`, or any implementation disagrees with this document, this document wins or it gets amended — silent drift is not an option.

Read this before proposing a feature. Most feature ideas die here, and that is the point.

---

## 1. Vision

jigargajjar.dev is a production software product whose function is to move a specific reader from "who is this" to "we should talk to this person" inside their available attention budget.

It is not a place where work is listed. It is the place where the reasoning behind the work is made legible. A list of projects asks the reader to infer competence from artifacts. This site does the opposite: it shows the decisions, the constraints that forced them, the alternatives that were rejected, and the evidence that the result behaves as claimed. Competence is demonstrated by exposing judgement, not by exhibiting output.

The site is held to the same standard as the systems it describes. If the portfolio arguing for senior engineering craft ships with layout shift, keyboard traps, or a 400 KB JavaScript bundle, the argument is already lost — the reader does not need to open a case study to know. The build is the first case study, and it is running in the reader's browser while they decide.

---

## 2. Why this portfolio exists

> **Engineering is no longer constrained by writing code. It is constrained by making correct technical decisions.**

A portfolio built to demonstrate coding ability is answering a question that is closing.

The production of code is being commoditized. Not completely and not evenly, but directionally and fast: the mechanical translation of a well-specified requirement into working implementation is now something a competent engineer delegates and reviews. That capability is spreading to every engineer at every level of experience, which means it is on its way to being worth what every widely available capability is worth. An artifact whose purpose is to prove that its author can write a well-structured React component is proving something that is on a short path to distinguishing nobody.

What does not commoditize is the set of judgements that determine whether the generated code was the *right* code.

**Architecture.** What to build, where the boundaries go, which failure modes are acceptable, and what the system must not become. A generator will produce a competent implementation of whatever shape it is given. It will not tell you the shape was wrong.

**Technical leadership.** Decomposing work so it can be executed correctly by others — human or otherwise — sequencing it, and recognizing when a task is too ambiguous to hand off. Throughput increases the cost of poor decomposition rather than reducing it.

**Product thinking.** Knowing which problem is worth solving, which constraint is real and which is assumed, and when the correct engineering answer is to build less. Faster implementation makes building the wrong thing cheaper to start and no cheaper to have been wrong about.

**Verification discipline.** Establishing what "correct" means for a change and having a mechanism that answers it without relying on trust. When code arrives faster than it can be read, verification stops being a phase and becomes the load-bearing structure of the whole process.

**Decision quality.** Choosing among viable options under real constraints, recording the reasoning, and owning the consequences. This is the part that compounds, and the part that is invisible in a screenshot.

None of these are accelerated by generation. Several are made materially *more* consequential by it, because generation removes the friction that used to make bad decisions surface slowly. A team that could previously build one wrong thing per quarter can now build several, each one internally consistent, well-formatted, and fully tested against the wrong specification.

This site is an argument for that position, made in the only form that is honest: by being an instance of it. Every case study is organized around decisions rather than features. Every claim about the artifact — performance, accessibility, correctness — is gated by something automated rather than asserted. The reasoning behind the site's own construction is published in `DECISIONS.md` and can be read by anyone who wants to check whether the practice matches the claim.

The position is falsifiable, which is what separates it from marketing. If the reasoning here is shallow, a senior engineer will find that in twenty minutes. That is the intended test.

---

## 3. Goals, ranked

Ranking is the useful part. When two goals conflict, the lower-numbered one wins, and that resolution is not open for renegotiation at implementation time.

**1. Establish credibility at senior/staff level within the reader's first screen.**
Positioning, competency breadth, and proof-of-craft must be perceptible before any scrolling or interaction. Every other goal depends on the reader still being present.

**2. Make engineering judgement the visible subject.**
Architecture, tradeoffs, verification strategy, and rejected alternatives are the product. Screenshots and feature lists are supporting material, not the substance.

**3. Communicate breadth without redundancy.**
Three flagship projects, three distinct competency stories (§9). A reader who studies all three should come away with three different conclusions about capability, not the same conclusion three times.

**4. Make the AI-native workflow a credibility asset rather than a liability.**
The workflow claim invites a specific objection — that the engineer does not understand the code. The site must answer that objection with verification methodology before the reader has to ask it (§6).

**5. Serve four audiences and three attention budgets from one artifact.**
30 seconds, 5–10 minutes, and 20+ minutes are three different readers with three different jobs, and a fourth reader arrives evaluating collaboration rather than employment. One site, complete experiences for each, no dead ends (§4).

**6. Demonstrate craft through restraint.**
Typography, spacing, motion, and interaction quality should read as considered. Perceived quality is evidence; excess is noise (§8).

**7. Remain maintainable by one engineer over years.**
Adding a case study should be writing a document, not modifying an application. Content and presentation stay separate.

**Explicit ranking consequences.** Goal 1 over goal 6: if a visual treatment delays first contentful paint, the treatment goes. Goal 2 over goal 3: a fourth project is never added to broaden coverage if it dilutes depth. Goal 6 over goal 7: a bespoke component that materially improves the reading experience is acceptable even though it costs maintenance.

---

## 4. Audience

The site has exactly four readers. Anyone else is a bystander, and designing for bystanders is how portfolios become generic.

Three of them are distinguished by attention budget and form the depth layers that drive the information architecture (ADR-003). The fourth is distinguished by intent rather than depth, and is addressed in §4.4.

### Layer 1 — Recruiter (≈30 seconds)

**Their job.** Decide whether this candidate is plausibly a fit for a role they are filling, and whether to forward the profile. They are pattern-matching against a requisition, often on mobile, often with a dozen other tabs open.

**What they need.** Role and seniority. Primary technologies. Whether the experience is real production work or coursework. A way to contact or forward. They are not evaluating architecture and will not read a case study.

**What ends the visit well.** They can state the positioning sentence in their own words and have either the résumé or the contact path in hand.

**Failure mode to design against.** Ambiguity about what the person actually does. "Full-stack engineer + AI" is a category, not a position. The specific claim must be readable without interpretation.

### Layer 2 — Hiring manager (5–10 minutes)

**Their job.** Decide whether to spend an interview slot. They are testing for: has this person shipped something real, can they operate without supervision, will they raise or lower the team's bar, and is the AI-workflow claim substance or marketing.

**What they need.** The competency thesis (§9) made obvious. One case study read at the summary-and-architecture level. Evidence of ownership: constraints faced, decisions made, outcomes measured. Some signal about how this person works with other engineers.

**What ends the visit well.** They can name the three competency stories and cite one specific decision the candidate made and why.

**Failure mode to design against.** Case studies that describe features instead of decisions. A hiring manager cannot distinguish "built a RAG pipeline" from "assembled a tutorial." They can distinguish "chose hybrid retrieval over pure vector search because citation precision mattered more than recall, and here is how that was measured."

### Layer 3 — Senior/staff engineer (20+ minutes)

**Their job.** Find the seams. They are actively looking for the gap between the claim and the artifact, because that gap is where every hiring mistake they have made previously lived. They will read code. They will open devtools. They will tab through the site with the keyboard.

**What they need.** Full architectural narrative with the reasoning intact. Rejected alternatives — the presence of alternatives that were seriously considered is itself the signal. Verification methodology: how the engineer knows the system is correct. Links to source. Honest limitations, and honest failures.

**What ends the visit well.** They find no gap between claim and artifact, and they encounter at least one decision they would not have thought of themselves.

**Failure mode to design against.** Polish without depth. This reader is the most likely to be repelled by the site, and the most valuable to convince, because they are the one who says "yes, bring them in" in the debrief.

### 4.4 Future collaborators (no fixed budget)

Founders, early-stage teams, open-source contributors, prospective consulting clients, conference and meetup organizers, and future technical partners. They are not filling a requisition. They arrive with a specific opportunity and one question: would working with this person be worth it?

**Their job.** Assess fit for a collaboration rather than for a role — a co-founder conversation, a contract, a contribution, a talk, a joint project. They have no interview process to fall back on, so the site has to do work that a hiring pipeline would otherwise do.

**What they need.** Evidence about *how* this person works, which is different from evidence about what they produced:

- **Process, made visible.** The workflow page (`ARCHITECTURE.md` §6.6) is the only surface built primarily for this reader. Someone deciding whether to work alongside an engineer cares more about how decisions get made than about any single decision's outcome.
- **Communication quality.** Written clarity is the strongest available proxy for what collaboration will feel like. The case studies are the sample.
- **Judgement under uncertainty.** The Failures & Mistakes and Looking Back sections (`ARCHITECTURE.md` §6.2) matter more to this reader than to any other. A collaborator is deciding whether this person can be trusted when something goes wrong, and a portfolio with no visible failures answers that question badly.
- **Sustained ownership.** Whether the public repositories are maintained or abandoned, and whether this person finishes things.
- **Range.** The competency thesis in §9 tells a founder which kind of problem to bring.

**What ends the visit well.** They make contact with a specific proposal rather than a general enquiry — a project, a role, a talk, a contribution.

**Failure mode to design against.** A site that reads exclusively as a job application. Employment-shaped material — a résumé, a stack list, availability framing — tells a founder nothing about what a partnership would be like, and signals that collaboration was not considered. The correction is not a separate "work with me" section; it is ensuring that process, reasoning, and honest failure are visible everywhere, which serves layer 3 equally.

**Structural note.** This audience is deliberately *not* a fourth depth layer. They traverse layers 1–3 like anyone else, reading to whatever depth their interest supports, but they weight the evidence differently — process and candour over credentials and outcomes. Adding a fourth tier of content would violate the layering rule below and serve nobody. Serving this reader is a question of what the existing layers contain, not of how many layers exist.

### Layer contract

| | Recruiter | Hiring manager | Senior engineer | Future collaborator |
|---|---|---|---|---|
| Budget | ~30s | 5–10 min | 20+ min | Variable; self-directed |
| Entry surface | Home, above the fold | Home → `/work` → one case study | Any case study, deep sections; source | `/workflow`, then case studies |
| Question being answered | "What is this person?" | "Can they operate at our level?" | "Is the claim real?" | "Would working with them be worth it?" |
| Primary evidence | Positioning, stack, seniority | Competency thesis, decisions, outcomes | Alternatives, verification, source, limits | Process, communication, failures, follow-through |
| Exit action | Forward or contact | Schedule | Advocate | Propose |
| Never required to | Scroll or click | Read source | Take anything on faith | Infer process from outcomes |

**Layering rule.** Each layer is a complete experience that terminates in an action. A layer is never a teaser for the next one. The recruiter must never need to reach layer 2 to answer their question, and the senior engineer must never have to pass through recruiter-grade summary content to reach substance. This constraint drives the information architecture in `ARCHITECTURE.md` and is recorded as ADR-003.

---

## 5. Brand positioning

### Primary

> **Senior Full-Stack Engineer building production systems through an AI-native engineering workflow — architecting, directing, and verifying while AI agents implement.**

This sentence is the site's thesis. It appears verbatim in the primary position on the home page. It is not paraphrased, softened, or A/B varied across surfaces, because inconsistent positioning reads as uncertainty about one's own claim.

### Supporting positioning

The primary statement is deliberately provocative, and it must be immediately qualified — not walked back, but sharpened. The differentiator is not AI usage. AI usage is now table stakes and will be universal among candidates within the year. Anyone can generate code. The scarce capability is everything that surrounds generation:

**Architecture.** Deciding what to build before anything is built. Boundaries, data flow, failure modes, and the interfaces between components are specified by a human who will be accountable for them. An agent that is handed a well-formed architecture produces work that composes; one that is handed a vague prompt produces work that has to be thrown away.

**Direction.** Decomposing a system into units an agent can execute correctly, sequencing them, and knowing when a task is too large or too ambiguous to delegate. This is the same skill as breaking work down for a team, applied at higher throughput and with less tolerance for ambiguity.

**Verification.** Knowing what "correct" means for a given change, and having a mechanism that answers it without relying on trust. This is the load-bearing discipline of the entire workflow. Generation speed without verification produces liability at scale.

**Decision-making.** Choosing among viable options under real constraints, recording why, and accepting the consequences. Agents will produce a defensible implementation of whichever option they are pointed at. They will not tell you that the option was wrong for your constraints, and they will not be in the room when it fails.

The reframe the site must land: **an AI-native workflow raises the value of engineering judgement rather than removing the need for it, because judgement is now the only part that is scarce.** An engineer who cannot architect and cannot verify does not become more productive with agents — they accumulate unverified code faster.

### What this positioning is not

- Not a claim of AI research or model-training expertise. The claim is applied AI engineering and systems work.
- Not "vibe coding." The workflow is documentation-first, decision-recorded, and verification-gated. That distinction is the whole argument.
- Not a claim that AI wrote everything unsupervised. The claim is that implementation is delegated while architecture, review, and verification are not.
- Not a novelty pitch. The workflow is presented as an engineering practice with tradeoffs, including its failure modes.

---

## 6. Engineering philosophy

> **Engineering is not measured by how quickly code is written, but by how confidently it can be verified.**

This is the site's organizing principle and the reason the AI-native workflow is defensible rather than reckless. It is the operational consequence of the position in §2: if the constraint has moved from production to decision quality, then the discipline that establishes whether a decision was correct is the discipline that matters most.

When implementation speed approaches zero cost, the constraint moves. It is no longer "how long to write this" but "how do I know this is right." Every practice this project follows falls out of that shift:

**Documentation precedes implementation.** A specification an agent can execute correctly is a specification a human has fully thought through. Ambiguity that would be silently resolved by a human implementer's judgement becomes visible as an agent's wrong output. Writing the document first is not process overhead; it is where the engineering happens. (ADR-004)

**Decisions are recorded, not remembered.** A decision that exists only in someone's head cannot be reviewed, revisited, or inherited. `DECISIONS.md` exists so that the reasoning survives longer than the memory of it, and so that a future maintainer — including a future me — can tell the difference between a deliberate choice and an accident.

**Verification is designed, not added.** Automated gates, typed content schemas, accessibility audits, and performance budgets are specified before the code they govern exists. A gate added after the fact tests what was built; a gate specified in advance constrains what gets built.

**Constraints are declared in advance.** A performance budget agreed to before implementation is an engineering constraint. The same number produced after implementation is a rationalization. This is why `ARCHITECTURE.md` §10 contains hard numbers and why they gate the build. (ADR-006)

**The build is the argument.** Claims about craft that the artifact does not exhibit are worse than no claim, because a reader who finds one such gap will stop trusting the rest. This is why accessibility and performance are release requirements rather than aspirations. (ADR-005, ADR-006)

---

## 7. Engineering principles

The philosophy in §6 is a single claim. These are the working rules that follow from it. They govern how this site is built, and they are the standard every case study is written to — a project that cannot be described in these terms is a project that was not engineered in these terms.

**Verify before claiming success.** "Done" means something checked it, and the check is named. An assertion without evidence is a hypothesis.

**Document decisions, not just outcomes.** The outcome is recoverable from the artifact. The reasoning, the constraints, and the rejected alternatives are not, and they are the part that has to be inherited.

**Measure before optimizing.** Optimization without a baseline is guessing with extra steps. This applies to performance, to retrieval quality, and to process.

**Architecture before implementation.** Decide the boundaries, the data flow, and the failure modes before anything is generated. Implementation is cheap to redo; a wrong boundary is not.

**Build systems that explain themselves.** Structure, naming, types, and errors should make intent legible without a guided tour. A system that requires its author present is unfinished.

**Prefer maintainability over cleverness.** Optimize for the engineer reading this in two years with no context, who may be you. Cleverness that cannot be safely modified is a liability regardless of how well it performs.

**Treat AI as an engineering multiplier, not a substitute for judgement.** Delegate implementation; never delegate architecture, review, or the definition of correct. A multiplier applied to poor judgement produces more of it, faster.

---

## 8. Design principles

The site must feel premium, memorable, and unlike a standard developer portfolio. That is a goal with real consequences, so it needs testable rules rather than adjectives. The reference bar is Linear, Stripe, Vercel, Raycast, and Apple — products where the interface reads as deliberate at every zoom level, and where nothing is present for decoration.

**Craft is demonstrated by restraint.** The distance between a good developer portfolio and a great product surface is mostly subtraction. Fewer typefaces, fewer colors, fewer simultaneous motions, more space. Anything that survives should be load-bearing.

**Typography is editorial, not decorative.** Type carries the storytelling. Deliberate scale relationships, generous measure, real hierarchy that survives without color, tabular figures wherever numbers are compared. Long-form case studies are read, and reading comfort over 20 minutes outranks visual novelty on first impression.

**Space is a design element with a budget.** Sections breathe. Density is chosen per surface: the recruiter layer is compact and immediate; the case-study body is spacious and paced for sustained reading. Whitespace is a signal of confidence and it is also free — it costs no bytes and no main-thread time.

**Motion is purposeful or absent.** Every animation answers "what does this help the reader understand?" Permitted purposes: orienting the reader to new content, confirming an interaction, and establishing continuity between two states. Not permitted: decoration, spectacle, or motion that delays access to content. Motion is subject to the performance budget and to `prefers-reduced-motion` as a first-class path, not a degraded one. (ADR-011)

**Every visual decision serves readability, storytelling, or perceived quality.** A decision that serves none of the three does not ship. A decision that serves one while damaging another gets resolved by the goal ranking in §3.

**Contrast and legibility are non-negotiable.** Low-contrast type is the most common way "premium" is faked, and it fails both accessibility and actual readers. Refinement comes from type, spacing, and rhythm — not from lowering opacity on text.

**Consistency is the memorable part.** Memorability comes from a coherent system applied without exception, not from a signature effect. One set of tokens for type, space, color, and motion, used everywhere.

**The system degrades honestly.** Content is readable without JavaScript, without animation, and at 200% zoom. If a surface only reads well under ideal conditions, it is not finished.

---

## 9. Portfolio inventory and competency thesis

Three flagship projects plus the site itself. Each project answers a different question about capability. This separation is the core of the information architecture and is recorded as ADR-012.

| Project | Competency story | Question it answers | Disclosure |
|---|---|---|---|
| **NovaMind AI** | AI Product Engineering | Can this person ship an AI product end to end? | Public repository, full depth |
| **OrchestAI** | AI Infrastructure & Framework Engineering | Can this person design systems other engineers build on? | Public repository, full depth |
| **Edge10 — NHL Athlete Performance Platform** | Enterprise Software Engineering | Can this person operate inside a real production organization? | Named employer, architecture-level only, anonymized metrics (§10) |
| **jigargajjar.dev** | Engineering Methodology | Is the AI-native workflow real? | This repository, fully open |

**NovaMind AI — AI Product Engineering.** A production AI document-intelligence platform that lets organizations upload, organize, and chat with documents using Retrieval-Augmented Generation, grounded citations, vector search, and enterprise-grade authentication. The story is product ownership: taking an AI capability all the way to something with users, auth, data lifecycle, and an interface people can operate. The engineering interest is in the parts tutorials skip — grounding answers in retrievable sources, making citations trustworthy, and the retrieval quality work that separates a demo from a product.

**OrchestAI — AI Infrastructure & Framework Engineering.** A multi-agent AI framework built on .NET with CQRS and MCP integration, taken to production release. The story is designing for other engineers: abstractions, extension points, protocol integration, and the verification methodology that makes a framework trustworthy to build on. Product engineering is judged by whether users succeed; framework engineering is judged by whether other engineers can succeed without reading your internals. Different discipline, different evidence.

**Edge10 — NHL Athlete Performance Platform.** Enterprise engineering in a real production environment: CQRS and clean architecture in C# .NET, authorization policy design, SQL Server schema and access control, React interfaces, and agentic systems for API validation, frontend validation, and end-to-end testing. The story is operating within constraints not of your choosing — existing systems, existing teams, compliance boundaries, and stakes measured in professional sport rather than in a side project. Presented at architecture level under the disclosure policy in §10.

**jigargajjar.dev — Engineering Methodology.** The site is its own fourth case study, and it is the one the senior-engineer layer is most likely to check, because the artifact and the claim are in the same place. It documents the AI-native workflow applied to a project the reader is currently inside: documentation-first, ADR-recorded, CI-gated. The repository is public, so every claim is falsifiable by reading it.

**The non-competition rule.** These projects must not read as three similar projects. Product engineering, infrastructure engineering, and enterprise engineering are distinct disciplines evaluated by distinct evidence, and the site's job is to make that progression obvious quickly enough that the breadth registers before the reader has committed to a deep read. Case-study presentation, ordering, and labeling all serve this. If a reader finishes two case studies and cannot articulate what different thing each one proved, the information architecture has failed regardless of how good either case study is on its own.

---

## 10. Disclosure policy for employer work

Edge10 work is presented under a fixed policy. This exists so the decision is made once, in advance, rather than negotiated per sentence while writing.

**Permitted.** Naming the employer and the domain. Describing architectural patterns and technology choices at the level found in any conference talk. Describing agentic systems built and the engineering problems they solved. Characterizing outcomes qualitatively and with relative or anonymized figures.

**Not permitted.** Proprietary source code or excerpts. Screenshots of internal interfaces. Athlete, team, or client data in any form, including synthetic data resembling it. Absolute business metrics — revenue, headcount, contract values, user counts. Internal roadmap, unreleased features, or organizational detail. Anything that would embarrass a current or former colleague.

**Ambiguity rule.** If a statement's disclosability is unclear, it does not ship. There is no version of this site worth a professional-conduct problem, and a hiring manager who notices an engineer publishing borderline employer detail draws a conclusion about how that engineer will treat *their* proprietary information.

**Failures under disclosure.** The Failures & Mistakes section (`ARCHITECTURE.md` §6.2) is required of every case study, including Edge10, and this policy constrains how it is written. Permitted: one's own wrong assumptions, one's own architectural mistakes, and technical judgements that turned out badly. Not permitted: anything attributable to a colleague, a team, or an organizational decision. The section documents what *this engineer* got wrong, which is both the disclosable version and the more useful one.

**Compensating evidence.** Because Edge10 cannot be verified by reading source, its credibility comes from specificity of reasoning rather than from artifacts. NovaMind AI and OrchestAI carry the source-level proof; Edge10 carries the enterprise-context proof. The three are load-bearing together, which is another reason the non-competition rule in §9 matters.

Recorded as ADR-010.

---

## 11. Success criteria

Criteria that cannot be measured are aspirations. Each item below has a named instrument. Per ADR-009 the site ships no third-party analytics, so the instruments are the CI pipeline, structured content validation, and deliberate human testing — not dashboards.

### Tier 1 — Automated gates (blocking; enforced on every pull request)

These are pass/fail. A red gate blocks merge. Full definitions and thresholds live in `ARCHITECTURE.md` §10–§12.

| Criterion | Instrument | Threshold |
|---|---|---|
| Performance | Lighthouse CI, mobile profile | Performance ≥ 95 on every route |
| Core Web Vitals | Lighthouse CI, lab | LCP ≤ 1.5 s, CLS ≤ 0.05, TBT ≤ 150 ms |
| Accessibility score | Lighthouse CI | 100 on every route |
| Accessibility violations | axe-core via Playwright | Zero serious or critical, every route |
| Keyboard operability | Playwright keyboard-only traversal | Every interactive element reachable and operable; no traps |
| JavaScript weight | Bundle assertion in CI | First-load JS ≤ 120 KB gzipped per route |
| Third-party requests | Build-time network assertion | Exactly zero |
| Type safety | `tsc --noEmit`, strict | Zero errors |
| Content integrity | Schema validation at build | Every case study conforms; build fails otherwise |
| Link integrity | Link checker | Zero broken internal or external links |

### Tier 2 — Content standards (reviewed before publishing any case study)

- Every case study conforms to the nine-section document model in `ARCHITECTURE.md` §6.2. All nine sections are required; a missing section blocks publication.
- **Verification** is present and specific. A case study without it does not publish — it is the section that carries the positioning.
- **Failures & Mistakes** names at least one wrong assumption, architectural mistake, or verification failure, with what it cost and what was changed. A project with no recorded failures is a project that was not examined honestly, and the section is worthless if it lists only cosmetic regrets.
- **Timeline** covers the full arc through to current status, including where the project stalled or was redirected.
- **Looking Back** states what would be done differently on a rebuild today, and why — reasoning, not a list of regrets.
- Every case study states at least two seriously considered alternatives and why they were rejected. Alternatives invented afterwards to fill the section are worse than omitting it; if a decision genuinely had no alternative, say that instead.
- Every case study declares a `lifecycle` value that is currently accurate (`ARCHITECTURE.md` §6.3). A project claiming `production` that is unmaintained is a false claim, and it is the kind a senior engineer checks.
- Every claim about Edge10 passes §10 on explicit review, not by assumption.
- Every image has meaningful alternative text; enforced by schema, not by discipline.

### Tier 3 — Comprehension testing (before launch, and after any information-architecture change)

Measured with people, because comprehension is not observable in analytics.

- **Recruiter test.** Five people unfamiliar with the work view the home page for 30 seconds, then state what this person does. Pass: at least four state the role and seniority correctly and mention the AI-native workflow.
- **Hiring-manager test.** Three engineering managers spend ten minutes, then name the three competency stories and cite one specific decision. Pass: all three name at least two stories correctly and cite a real decision.
- **Senior-engineer test.** Two senior or staff engineers read for 20+ minutes with an explicit brief to find the weakest claim on the site. Pass: their strongest objection is about the work itself rather than about a gap between claim and artifact. Their findings become issues regardless of pass or fail.

### Tier 4 — Outcome signals (tracked manually, reviewed quarterly)

Lagging, noisy, and the only ones that matter commercially. Recorded in a private log, not on the site.

- Inbound conversations that reference a specific case study by name. This is the sharpest available signal that layering worked: a generic inbound means the recruiter layer did its job; a specific one means someone read.
- Interview conversations that open at architecture level rather than at "walk me through your background."
- Fewer requests to re-explain the AI-native workflow defensively — the site should have already answered it.
- Inbound that is collaborative rather than transactional — a project proposal, a contribution, a speaking invitation. This is the signal specific to §4.4, and it is the one that indicates the process material is doing work.
- Unsolicited engagement with the public repositories.

### Anti-criteria

Deliberately not tracked, because optimizing for them corrupts the goals in §3: traffic volume, time on page, social engagement, and repository stars. This site is aimed at a few dozen readers who matter. It is possible for it to succeed completely with almost no traffic, and every one of these metrics rewards behavior that would make it worse.

---

## 12. Non-goals

Written down so they get rejected quickly instead of relitigated.

- **A blog or newsletter.** Requires ongoing publishing to avoid looking abandoned. A stale blog subtracts credibility; case studies do not decay.
- **A CMS.** Content is version-controlled MDX authored by the only person who will ever write it. A CMS adds a runtime dependency, a network hop, and an availability risk for zero benefit. (ADR-008)
- **A comprehensive project list.** Depth on four beats breadth on twelve. Additional work belongs on GitHub.
- **A technology logo grid.** Signals nothing about capability and reads as filler. Technology is named in context, inside the case studies where it was actually used.
- **Third-party analytics or tracking.** Costs a consent banner, script weight, and a privacy obligation, to produce data that would not change a single decision here. (ADR-009)
- **Animation as spectacle.** Cursor followers, scroll-jacking, WebGL backdrops, parallax on text. These target a different audience than §4. (ADR-011)
- **A design-system showcase.** The site is not a component library demonstration. Components exist because pages need them.
- **A "hire me" or "work with me" landing page.** The correct way to serve §4.4 is to make process, reasoning, and honest failure visible throughout, not to add a surface that asks for business.
- **Multi-language support, comments, a guestbook, or a "uses" page.** No reader in §4 needs any of these.

---

## 13. Amendment and review

This document is reviewed when a case study is added, when positioning changes, and at minimum every six months. Changes to §5 (positioning), §9 (inventory and thesis), or §11 (success criteria) are structural and require a corresponding ADR in `DECISIONS.md`.

Sections §1–§4 and §6–§8 are stable by design. If they are being edited frequently, that is a signal the project's purpose is drifting and the drift should be examined directly rather than absorbed into edits.

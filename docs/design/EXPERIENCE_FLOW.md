# Experience Flow

**Status:** Active — Phase 3A deliverable, specification only
**Version:** 0.1.0
**Last reviewed:** 2026-08-04
**Governed by:** [`FOUNDATION.md`](../FOUNDATION.md) §4 · [`EXPERIENCE_PRINCIPLES.md`](./EXPERIENCE_PRINCIPLES.md) · [`ARCHITECTURE.md`](../ARCHITECTURE.md) §4–§5

`EXPERIENCE_PRINCIPLES.md` defines what a reader should feel. `ARCHITECTURE.md` §4–§5 defines what routes exist and how depth is layered. This document defines the **path between them**: how a reader arrives, what they consume in what order, which question each step answers, and what they do next.

**Its purpose is to make wireframing deterministic.** A wireframe drawn from this document is answering "which questions does this viewport resolve, for whom, in what emotional state" — a question with a checkable answer. A wireframe drawn without it is a layout someone liked, rationalised afterwards.

---

## 1. How to use this document

For any proposed element in a wireframe:

1. **Which question in the ledger (§5) does it answer?** If none, it does not appear.
2. **Which reader is it for, at what stage?** An element serving no reader at no stage is decoration.
3. **What is the reader's emotional state at that point (§4)?** An element that fights the state is wrong even if it answers a question.
4. **What does it make possible next?** Every element either answers or advances. Elements that do neither are removed.

**The inverse check matters more.** For each stage in §4, every question listed must be answerable from what is on screen. A stage with an unanswered question is a leak point (§8), and leak points are where readers stop.

---

## 2. Entry points

**The home page is not the primary entry for the highest-value readers.** This is the single most consequential finding in this document and it changes what every case study must contain.

| Entry | Who | Lands on | Context they arrive with |
|---|---|---|---|
| Link in outreach or application | Recruiter, hiring manager | `/` | Knows the name and the role being filled |
| LinkedIn or GitHub profile link | All four | `/` | Knows the name, has seen a résumé summary |
| **Forwarded case-study link** | Hiring manager, senior engineer | `/work/[slug]` | **Often none.** A colleague sent "look at this" |
| Search on the name | Recruiter, collaborator | `/` or `/about` | Verifying a person is real |
| Long-tail technical search | Senior engineer, collaborator | `/work/[slug]` | Was researching a problem, not a person |
| Repository README link | Senior engineer, collaborator | `/work/[slug]` | Arrived from the code, wants the reasoning |
| Conference or community referral | Collaborator | `/workflow` or `/` | Heard about the method |

### The three consequences for design

**Every case study must self-orient.** A reader entering at `/work/[slug]` with no context needs to learn who this is, what the competency claim is, and why this project is here — without leaving the page. The Summary section (`ARCHITECTURE.md` §6.2, section 1) is not a preamble for readers who already scrolled the home page; it is the layer-1 surface for everyone who did not. This is a stronger requirement than the frozen document states and it drives the case-study wireframe.

**The Open Graph card is the first impression for a meaningful share of readers.** A link pasted into Slack or email renders as a card before anyone clicks. It is generated from title, competency, and stack (`ARCHITECTURE.md` §7), which means the recruiter's thirty-second layer partly happens *before* the site loads. The card must carry the competency claim, not just a project name.

**Arrival from code inverts the normal order.** A senior engineer who came from a repository has already seen the implementation and wants the reasoning. They will read Key decisions, Failures, and Verification first, and may never read Context. Those sections must stand alone rather than depend on what precedes them.

---

## 3. Route jobs

Every route in the frozen table (`ARCHITECTURE.md` §4) stated as one job, with what it must not do. A route that cannot justify a one-sentence job does not need to exist.

| Route | Job | Must not |
|---|---|---|
| `/` | Convert a stranger's skepticism into enough conviction that opening a case study feels worth their time. **Optimised for conviction, not navigation** — see `HOMEPAGE_NARRATIVE.md` | Contain depth, or present equally-weighted doors. It earns the next click; it does not merely offer one |
| `/work` | Let a reader compare all four case studies side by side, and house the one with no homepage band. **Comparison surface, not the primary path** — see `ROUTE_SPECIFICATIONS.md` §1 | Rank the projects, or read as a portfolio grid |
| `/work/[slug]` | Carry the full argument for one competency, verifiably, to a reader who may have arrived cold | Assume the home page was read |
| `/about` | Answer who this person is and how they operate with others | Duplicate the résumé, or become a personal essay |
| `/workflow` | Convert the AI-native claim from an assertion into a described, checkable process | Argue with an imagined critic |
| `/resume` | Give a recruiter something forwardable and printable in under thirty seconds | Compete with the case studies for depth |
| `/connect` | Tell a reader who is ready to act what to bring, when, and what to expect back (ADR-014) | Become a contact form, or a page whose content is an email address |
| `/404` | Return a lost reader to `/` or `/work` without friction | Entertain |

---

## 4. The four journeys

Each stage lists the question being answered, what the reader consumes, their emotional state (`EXPERIENCE_PRINCIPLES.md` §4), and the next action the design must make obvious.

### 4.1 Recruiter — ~30 seconds, usually mobile

```
OG card or link  →  /  (above fold)  →  scan  →  /resume  →  forward or contact
```

| Stage | Question | Consumes | State | Next |
|---|---|---|---|---|
| Arrival | "Did this load?" | First paint, complete | Orientation | Read |
| Positioning | "What is this person?" | The positioning sentence, seniority | Recognition | Continue |
| Verification | "Is this real work?" | Employer, domain, stack, one lifecycle badge | Reassurance | Scan |
| Exit | "How do I forward this?" | Résumé link, contact path | Confidence they won't look foolish | Forward |

**Design requirements.** Positioning, seniority, primary technologies, and a contact path are all present above the fold at 375 px with no scroll and no interaction (`ARCHITECTURE.md` §5). The résumé is reachable in one action from that screen. Nothing above the fold animates.

**The dominant risk is not boredom — it is doubt.** This reader is deciding whether forwarding is safe. Anything that reads as unusual invites a second look they do not have time for, which resolves as "skip."

### 4.2 Hiring manager — 5–10 minutes, desktop

```
/  →  qualification  →  featured flagship (evidence, on the homepage)
   →  OrchestAI case study  →  Summary → Architecture → Decisions
   →  Failures  →  Outcomes  →  adjacent case study, /work, or exit to schedule
```

| Stage | Question | Consumes | State | Next |
|---|---|---|---|---|
| Home, band 2 | "Do they write their own code?" | The compressed method statement | Disarmament | Continue |
| Home, band 3 | "Can they solve something hard?" | One decision, told properly, with its rejected alternative | Engagement | **Open the case study directly** |
| Home, band 4 | "Is that all they do?" | Two further competency stories | Widening | Continue or open a second |
| Summary | "Is this substantial?" | One-line claim, lifecycle, stack, three outcomes | Provisional respect | Continue |
| Architecture | "Did they design this or assemble it?" | Diagram plus narrative | Engagement | Continue |
| Key decisions | "Do they think like me?" | Two to five decisions with rejected alternatives | **Recognition — the pivotal beat** | Continue |
| Failures | "Are they honest?" | Wrong assumptions, reversals, what it cost | Surprise, then trust | Continue |
| Outcomes | "Did it work?" | Metrics with qualifiers | Confirmation | Exit or second study |
| Exit | "Do I want to talk to them?" | Contact path, adjacent case study | Intent | Schedule |

**The pivotal beat is Key decisions**, not the metrics. A hiring manager decides on whether this is someone they would enjoy arguing with. The moment that converts is encountering a constraint they have personally fought, resolved in a way they had not considered. Everything before it is qualification; everything after is confirmation.

**`/work` is not on the primary path.** Bands 3 and 4 link directly to case studies; `/work` is the comparison surface for readers who want all four side by side, and the home of the fourth case study (`ROUTE_SPECIFICATIONS.md` §1).

**Design requirement.** The competency thesis must resolve on `/` without navigation — bands 3 and 4 together carry all three stories, so a reader who never navigates still leaves with the breadth argument (`ARCHITECTURE.md` §5).

### 4.3 Senior engineer — 20+ minutes, adversarial

```
any entry  →  Summary  →  skips to Key decisions  →  Verification  →  Failures
   →  Looking back  →  source  →  returns  →  second case study  →  /workflow
```

| Stage | Question | Consumes | State | Next |
|---|---|---|---|---|
| Arrival | "Is this substance or presentation?" | Whatever they landed on | **Suspicion — correct and expected** | Probe |
| Interface probe | "Does the artifact match the claim?" | Keyboard, devtools, zoom, source view | Guarded surprise | Continue |
| Key decisions | "Were alternatives real?" | Rejected options and why | Provisional respect | Continue |
| Verification | "Do they know what correct means?" | Tests, evals, gates, review process | **The load-bearing beat** | Continue |
| Failures | "What did they get wrong?" | Reversals, verification failures, near-misses | Trust | Continue |
| Looking back | "Have they learned since?" | Revised reasoning | Respect | Follow source |
| **Source** | "Does the code match the story?" | GitHub | Verification | **Return** |
| Return | "What else is here?" | Second competency, `/workflow` | Interest | Advocate |

**The return is the fragile step.** A reader who leaves for GitHub frequently does not come back. Three things make return likely, and all three are design decisions already made:

- Outbound links do not open new tabs (`INTERACTION.md` §6), so return is one keystroke and preserves scroll position.
- The source link sits *inside* the case study, not in a header, so the reader leaves from a specific point in an argument they have not finished.
- The case study has unread sections below the link. A source link placed at the end gives no reason to come back.

**Design requirement.** Source links appear at the point in the narrative where the code becomes relevant — inside Architecture or Key decisions — not collected in a header block.

### 4.4 Future collaborator — self-directed

```
/workflow  or  /  →  /workflow  →  process → ownership → failure modes
   →  one case study, read for method  →  /about  →  propose
```

| Stage | Question | Consumes | State | Next |
|---|---|---|---|---|
| Arrival | "How does this person work?" | `/workflow` thesis and stage overview | Curiosity | Continue |
| Ownership model | "What do they actually own?" | Which stages are delegated, which are not | Clarity | Continue |
| Failure modes | "What happens when it goes wrong?" | Where the process breaks and what compensates | **Trust — the pivotal beat** | Continue |
| Case study | "Is this real in practice?" | One study read for method, not outcome | Confirmation | Continue |
| `/about` | "Who is this, and would we get on?" | Background, how they work with others | Comfort | Contact |
| Exit | "How do I propose something?" | Contact path | Intent | Propose |

**The pivotal beat is failure modes**, not capability. A collaborator has no interview process to fall back on; they are deciding whether this person will tell them when something is going wrong. A `/workflow` page with no stated failure modes reads as marketing and loses this reader entirely.

---

## 5. The question ledger

Every question each reader arrives with, and the single surface responsible for answering it. **This is the primary input to wireframing:** a wireframe is complete when every question owned by its stage is answerable from what is on screen.

### Recruiter

| # | Question | Answered at |
|---|---|---|
| R1 | What is this person's role and seniority? | `/` above fold · OG card |
| R2 | Which technologies? | `/` above fold · `/resume` |
| R3 | Is this real production work or side projects? | `/` — employer named, lifecycle badges |
| R4 | Where are they, and are they available? | `/connect` — timezone, availability · `/resume` |
| R5 | How do I forward or contact? | `/` above fold · footer, every route · `/connect` |

### Hiring manager

| # | Question | Answered at |
|---|---|---|
| H1 | Have they shipped something real? | Case-study Summary · lifecycle badge |
| H2 | What is their breadth? | `/` scroll · `/work` competency labels |
| H3 | Can they operate without supervision? | Context and constraints · Key decisions |
| H4 | What decisions have they actually made? | Key decisions |
| H5 | Is the AI-workflow claim substance? | `/workflow` · Verification |
| H6 | Will they raise the team's bar? | Verification · Failures |
| H7 | How do they work with other engineers? | `/about` · `/workflow` ownership model |
| H8 | Did any of it work? | Outcomes |

### Senior engineer

| # | Question | Answered at |
|---|---|---|
| S1 | Does the artifact match the claim? | The site itself — performance, keyboard, source |
| S2 | Were alternatives seriously considered? | Key decisions |
| S3 | Do they know what "correct" means? | Verification |
| S4 | Can I read the source? | In-narrative source links |
| S5 | What did they get wrong? | Failures & mistakes |
| S6 | Have they revised their thinking? | Looking back |
| S7 | Would I learn anything from them? | Emergent — the whole case study |

### Collaborator

| # | Question | Answered at |
|---|---|---|
| C1 | How do they make decisions? | `/workflow` |
| C2 | What do they own versus delegate? | `/workflow` ownership model |
| C3 | What happens when things go wrong? | `/workflow` failure modes · Failures & mistakes |
| C4 | Do they finish things? | Lifecycle badges · repository activity |
| C5 | What is their communication like? | The prose itself · engineering notes |
| C6 | What kind of problem *can* they solve? | `/work` competency thesis |
| C7 | What kind of problem should I *bring* them? | **`/connect` — current focus and what to bring** |
| C8 | Will they reply, and how soon? | **`/connect` — response expectations** |
| C9 | How do I reach them with a proposal? | Footer · `/connect` |

**Three findings from building the ledger.**

*The footer carries R5 and C9 on every route*, because both readers may decide to act from any page. It is the only element that must serve an exit action everywhere (`ARCHITECTURE.md` §4: no route is a dead end). `/connect` does not replace it — a collaborator decides mid-case-study, and a route cannot reach that moment.

*C6 and C7 are different questions, and separating them is what justified `/connect`* (ADR-014). The competency thesis establishes what this person **can** do; it says nothing about what they **want** brought to them. A founder can determine from `/work` that this person builds agent infrastructure and still have no idea whether to send the email. Capability is not appetite, and only one of the two was previously answered anywhere on the site.

*S1 is not answered by any content.* It is answered by the artifact's behaviour. This is the only question in the ledger that no wireframe can address, and it is the one the most valuable reader cares most about.

---

## 6. Scroll choreography

For the two surfaces where scroll order is the design. Each band states what it resolves; a band that resolves nothing gets cut in wireframing.

### `/` — home

Narrative reasoning, band-by-band justification, and the emotional progression are owned by `HOMEPAGE_NARRATIVE.md`. This table is the flow summary only.

| Band | Resolves | Density |
|---|---|---|
| 1 Hero (above fold) | R1, R2, R3, R5 — positioning, seniority, stack, contact | `compact` |
| 2 Qualification | H5 — the workflow objection, answered before it is asked | `default` |
| 3 Featured flagship — OrchestAI | H1, H4, S2 — evidence delivered on the homepage, not promised | `default` |
| 4 Additional projects | H2, C6 — NovaMind and Edge10, competency stories named | `default` |
| 5 Workflow | H5 at depth, C1–C3 — entry to `/workflow` | `default` |
| 6 Connect | C7, C8, C9 — entry to `/connect`; exits to `/resume`, `/work` | `default` |
| Footer | R5, C9 | `compact` |

**The homepage guides; it does not ask the reader to choose.** Depth arrives at band 3 before any navigation is required. Six bands, closed — a seventh is content that belongs on a route.

**Superseded structures, recorded so the reasoning is not relitigated.** Version 0.1.0 of this document put breadth at band 2 and the method at band 3; `FOUNDATION.md` §3 goal 4 reversed them, because an unanswered objection discounts the evidence that follows it. Version 0.1.0 of `HOMEPAGE_NARRATIVE.md` then carried a four-band structure whose third band presented three competency stories as equal options — a menu, which asks a reader to choose before they have grounds to. Full reasoning: `HOMEPAGE_NARRATIVE.md` §5.

### `/work/[slug]` — case study

The nine-section model (`ARCHITECTURE.md` §6.2) with the reader's state per section:

| Section | Serves | State entering |
|---|---|---|
| 1 Summary | H1, R3 — and self-orientation for cold arrivals (§2) | Unoriented or provisional |
| 2 Context and constraints | H3 | Qualifying |
| 3 Timeline | Comprehension aid — the shape of the story | Orienting |
| 4 Architecture | H3 | Engaged |
| 5 Key decisions | H4, S2 | **Pivotal for the hiring manager** |
| 6 Failures & mistakes | H6, S5, C3 | Surprised, then trusting |
| 7 Verification | H5, S3 | **Pivotal for the senior engineer** |
| 8 Outcomes | H8 | Confirming |
| 9 Looking back | S6 | Respecting |

**The order is frozen and it is correct**, but note that the two pivotal beats sit at positions 5 and 7 — deep enough that a reader must be carried there. Sections 2–4 do the carrying, and their job in wireframing is momentum, not just information.

---

## 7. Cross-journey transitions

Readers hand off to each other, and the handoff is part of the design.

**Recruiter → hiring manager.** The recruiter forwards a link, usually to `/` or `/resume`. The hiring manager arrives with a one-line endorsement and no context. `/` must therefore work as a cold entry, not only as a first visit.

**Hiring manager → senior engineer.** A manager forwards a specific case study to an engineer for a read. This is the highest-value handoff on the site and it always lands deep — which is the strongest argument for the self-orienting requirement in §2.

**Senior engineer → advocate.** In a hiring debrief, this reader repeats one specific thing. The design goal is that the thing they repeat is a *decision*, not a visual. That is what the Key decisions and Failures sections are engineered to supply.

**Collaborator → proposal.** Requires only that a contact path exists at the moment of decision, which may be on any route.

---

## 8. Leak points

Where readers are lost, ranked by cost.

| Leak | Cost | Mitigation |
|---|---|---|
| Cold arrival at a case study that assumes the home page | Highest — loses the best-qualified reader at the best moment | Self-orienting Summary (§2) |
| Source link that does not return | High — loses the senior engineer mid-argument | In-narrative placement, same-tab, unread sections remaining (§4.3) |
| `/work` reading as three similar projects | High — collapses the breadth argument (ADR-012) | Competency label above the title |
| Doubt above the fold | High — recruiter skips, nobody downstream ever sees it | Positioning readable without interpretation |
| `/workflow` reading as justification | Medium — loses the collaborator and hardens the skeptic | Describe the process; state failure modes; do not argue |
| A case study with a thin Verification section | Medium — the senior engineer generalises from one gap | Content standard, `FOUNDATION.md` §11 Tier 2 |
| No exit action on a route | Low but universal | Footer on every route |

---

## 9. Re-entry and return

Readers leave and come back — to GitHub and back, to the site days later after a conversation, to a case study half-read.

- **Every URL is permanent and shareable** (`ARCHITECTURE.md` §4). A reader can bookmark a position in an argument.
- **Back always restores scroll position** — free on a statically rendered site with no route transitions (`INTERACTION.md` §6).
- **No "continue reading" state, no progress persistence.** Both require client state to solve a problem the browser already solves, and neither would survive the reader switching devices.
- **A returning reader gets an identical page.** Nothing re-animates, nothing has moved. Entrance reveals fire once per page load and never re-fire (`MOTION.md` §5), which is what makes a re-read feel like returning to a document rather than restarting an experience.

---

## 10. Validating the flow without analytics

The site ships no analytics (ADR-009), so the flow is validated by observation in the Tier 3 sessions (`FOUNDATION.md` §11), with three protocol additions:

1. **Cold-entry test.** Give a hiring manager a case-study URL with no context — no home page, no introduction. Pass: they can state who this person is and what the project proves, without navigating away.
2. **Return test.** Watch a senior engineer follow a source link. Record whether they come back unprompted. This is the leak nobody would otherwise detect.
3. **Question-coverage test.** After each session, ask which of their questions went unanswered. Anything named is a gap in §5, and §5 gets amended.

---

## 11. Scope resolutions

The four items raised at Phase 3A review, resolved. Two were re-proposed in a materially different form and accepted; two were confirmed as originally analysed.

### Connect — accepted as a route (ADR-014)

**Reversed from the Phase 3A recommendation**, because the proposal changed. What was declined was a *contact page* — a form, or a page whose content is an email address. What is now specified is a professional card: availability, current focus, what to bring, channels, response expectations.

**What changed the analysis:** splitting C6 from C7 (§5). The competency thesis answers what this person *can* do and nothing about what they *want brought to them*. That question was unserved anywhere on the site, and it is the one standing between a founder and an email.

**The original objection is retired, not overruled.** It was that a contact route removes contact from the moment of decision. The footer affordance is retained unchanged on every route, so nothing is removed — `/connect` is added alongside it. Both surfaces, different moments: the footer serves a reader who decides mid-page, the route serves one who has finished and is deciding what to say.

**Content:** a short statement of what makes a good approach; current focus; availability; timezone; response expectations; GitHub, LinkedIn, résumé, email. No form (`INTERACTION.md` §12), no scheduling embed (a third party, prohibited by `ARCHITECTURE.md` §10).

**The one cost, recorded honestly:** `/connect` carries the only content on the site that decays on a scale of months. A stale "currently focused on" line is worse than no line, and this is the surface most likely to quietly go wrong.

### Engineering notes — accepted as a region of `/workflow`, not a route (ADR-014)

**Partially reversed.** The blog rejection in `FOUNDATION.md` §12 stands; what is accepted is materially different from what it rejects.

**Why the distinction holds.** `FOUNDATION.md` §12's objection is mechanical, not topical: *"requires ongoing publishing to avoid looking abandoned."* Staleness is a function of implied cadence. A dated, ordered feed under a navigation item promises a rhythm and can fall behind it; a capped set of undated essays inside a method page promises nothing and cannot.

**Why a region and not a route** — the decisive argument. Every proposed note is method content ("why verification matters more than generation," "how I review AI-generated code"), and `/workflow` already owns method. A route would split the method argument across two surfaces, weakening both, and would attach the cadence signal that is the entire risk. As a region, notes read as depth rather than as a feed, and the collaborator audience — their primary reader — already lands on `/workflow` first (§4.4).

**Constraints, all of which exist to prevent accretion into a blog:** capped at six; no dates displayed; ordered by relevance to the workflow stages, never by recency; no index route, no feed, no "latest"; every note attaches to a workflow stage or to the thesis. A note that attaches to neither is a case study, or it is nothing.

### Timeline — confirmed: a case-study section, not a route

**Confirmed as originally analysed, and the distinction is now explicit** in `COMPONENT_GUIDELINES.md` §7 so a future contributor cannot conflate the two.

**Project timeline** — required section 3 of every case study, tracing one project: Planning, Architecture, Implementation, Major setbacks, Verification, Release, Future roadmap. Wireframed as part of the case-study layout.

**Career timeline** — does not exist and will not. It answers no ledger question, and a chronological career page implies the career-progression narrative ADR-012 exists to prevent. `/resume` serves the reader who wants chronology.

> **One discrepancy to settle before wireframing.** The stage list proposed at review ended with *Reflection*; the frozen canonical set (`ARCHITECTURE.md` §6.2) ends with *Future roadmap*. These are not the same, and section 9 *Looking back* already owns reflection. Recommendation: keep **Future roadmap** — the timeline's final stage should look forward, because the backward-looking view is a full section of its own and duplicating it inside the timeline would make section 9 redundant. Flagged rather than assumed.

### Loading states — confirmed: none exist

`INTERACTION.md` §7 — every route is statically generated with no client-side data fetching. A skeleton on a static page is a costume.

**Wireframe the honest set instead:** `/404`, the JavaScript-disabled rendering of every route, and the reduced-motion rendering. Each is a CI-gated requirement (`ARCHITECTURE.md` §12). The empty and error states in `INTERACTION.md` §8–§9 are in scope and small.

---

## 12. Open questions

Two remain. Neither blocks Phase 4.

1. **Should the OG card carry the competency label?** §2 argues it should, since it is the pre-click impression for a forwarded link. It is generated from frontmatter (`ARCHITECTURE.md` §7) so the data is available; whether it fits legibly at card dimensions is a wireframing question, answerable in Phase 4.
2. **Does `/about` carry the portrait?** Unresolved from `IMAGERY.md` §8 and `EXPERIENCE_PRINCIPLES.md` §10. `ROUTE_SPECIFICATIONS.md` §2 excludes it pending that decision. The flow analysis adds one data point: C5 and the collaborator's comfort stage are the only places it would serve, and both are already served by prose. This is a Phase 6 content decision, not a structural one.

**Resolved at Phase 3 close-out.** *Whether `/` needs a separate method band* — yes, as band 5, placed after the work rather than before it (`HOMEPAGE_NARRATIVE.md` §5). *Where the résumé PDF sits relative to `/resume`* — the HTML route is primary and the PDF is generated from it at build time (`ROUTE_SPECIFICATIONS.md` §3).

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-08-04 | Initial experience flow. Phase 3A. |

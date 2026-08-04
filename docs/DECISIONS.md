# Architecture Decision Records

**Owner:** Jigar Gajjar
**Last reviewed:** 2026-08-04
**Governed by:** [`FOUNDATION.md`](./FOUNDATION.md) · Implemented per [`ARCHITECTURE.md`](./ARCHITECTURE.md)

Decisions that shape this project, with the reasoning intact. The purpose is not to document what was chosen — that is visible in the code — but to preserve *why*, and what was rejected, so that a future maintainer can tell a deliberate constraint from an accident and knows what would have to change for the decision to be reopened.

## Conventions

Each record contains **Context**, **Decision**, **Alternatives considered**, and **Consequences**. Consequences are stated honestly, including the ones that are costs; a record listing only benefits is advocacy, not a decision record.

Records are immutable once accepted. A decision that changes gets a new record that supersedes the old one, and the old one is marked but never edited or deleted — the fact that a decision was reversed, and why, is more useful than a tidy list.

**Status values:** `Accepted` · `Superseded by ADR-NNN` · `Deprecated`

| # | Title | Status |
|---|---|---|
| [001](#adr-001) | The portfolio is a product, not a résumé | Accepted |
| [002](#adr-002) | Projects are presented as engineering case studies | Accepted |
| [003](#adr-003) | Layered information architecture | Accepted |
| [004](#adr-004) | Documentation-first development | Accepted |
| [005](#adr-005) | Accessibility is a release requirement | Accepted |
| [006](#adr-006) | Performance budget precedes visual effects | Accepted |
| [007](#adr-007) | Next.js App Router, statically rendered, on Vercel | Accepted |
| [008](#adr-008) | Content is filesystem MDX with a validated schema | Accepted |
| [009](#adr-009) | No third-party analytics; CI is the measurement instrument | Accepted |
| [010](#adr-010) | Employer work is named, described at architecture level | Accepted |
| [011](#adr-011) | Motion is a design system with a budget | Accepted |
| [012](#adr-012) | Each flagship project tells one non-overlapping story | Accepted |
| [013](#adr-013) | The portfolio demonstrates engineering judgement rather than programming speed | Accepted |
| [014](#adr-014) | `/connect` is a route; engineering notes are not | Accepted |

---

<a id="adr-001"></a>
## ADR-001 — The portfolio is a product, not a résumé

**Status:** Accepted · 2026-08-04

### Context

The default developer portfolio is a résumé with styling: a bio, a technology list, a grid of project cards, a contact form. It is an inventory. Its implicit argument is "here are the things I have touched, please infer competence."

That argument fails for the position being pursued. Senior and staff roles are not filled by matching technology lists — they are filled by evidence of judgement under constraint. Inventories cannot carry that evidence, because judgement lives in the reasoning behind a choice, and an inventory has discarded the reasoning by construction. It also fails on differentiation: every candidate's inventory looks approximately the same, and where it differs it differs on facts (years, company names) that a résumé already communicates more efficiently.

There is a further problem specific to this positioning. Claiming an AI-native workflow while shipping a template-grade site is self-refuting. The reader's first evidence is the artifact in front of them.

### Decision

jigargajjar.dev is built and maintained as a production software product with a defined audience, ranked goals, measurable success criteria, a performance budget, accessibility requirements, and a CI pipeline that gates releases. Product decisions are made against the goal ranking in `FOUNDATION.md` §3 rather than against taste or convention.

The résumé still exists — at `/resume`, and as a PDF — because the recruiter layer needs it. It is one surface of the product, not the thing the product is.

### Alternatives considered

**Conventional portfolio site.** Fast to build, familiar to readers, low maintenance. Rejected because it cannot carry the differentiator: nothing about a project grid distinguishes an engineer who architects and verifies from one who follows tutorials. The cost saved is the entire argument.

**A single long-form page.** Popular, cohesive, and genuinely good at telling one story. Rejected because it cannot serve three attention budgets — a document optimized for a 30-second read cannot also hold 20 minutes of architectural depth without one reader paying for the other. ADR-003 depends on structure a single page cannot provide.

**LinkedIn and GitHub only, no site.** Zero maintenance, and where recruiters already are. Rejected because both platforms constrain presentation to their own template. A GitHub README cannot demonstrate interface craft, performance discipline, or accessibility work, and those are part of what is being claimed. The platforms remain distribution channels pointing here.

**A generated résumé site from a template.** Rejected for the same reason as the conventional portfolio, with the additional problem that a recognizable template actively signals the opposite of the claim.

### Consequences

- Substantially higher build and maintenance cost than a template, absorbed deliberately.
- Changes are evaluated against ranked goals and blocking gates, which slows shipping and is the intended effect.
- The site becomes evidence in its own right, which is why it appears as a case study in `FOUNDATION.md` §9.
- Any defect a reader encounters — a layout shift, a broken keyboard path — costs more credibility than the same defect on a template site would, because the standard being claimed is higher. This is the correct incentive.
- Non-goals in `FOUNDATION.md` §12 become enforceable: a feature request is now answerable with "which ranked goal does this serve?"

---

<a id="adr-002"></a>
## ADR-002 — Projects are presented as engineering case studies

**Status:** Accepted · 2026-08-04

### Context

A project card shows a name, a description, a technology list, and a screenshot. It communicates that a thing exists. It does not communicate what was hard, what was decided, what was rejected, or how the engineer knows the result is correct — which is the entire content of senior engineering.

The gap is most visible in AI work, where the distance between a weekend demo and a production system is almost entirely invisible from the outside. "Built a RAG application" describes both a tutorial completion and a system with hybrid retrieval, citation grounding, evaluation harnesses, and auth. A hiring manager cannot distinguish them from a card. They can distinguish them from a decision record.

### Decision

Each project is a long-form case study following the fixed document model in `ARCHITECTURE.md` §6.2: Summary, Context and constraints, Timeline, Architecture, Key decisions, Failures & mistakes, Verification, Outcomes, Looking back. Three sections are load-bearing and mandatory:

- **Key decisions** must include alternatives that were seriously considered and the reason each was rejected. The presence of real alternatives is itself the signal — it demonstrates that a decision space was explored rather than a default accepted.
- **Verification** must describe how correctness was established. Under the positioning in `FOUNDATION.md` §5, this is the section the entire claim rests on. A case study without it does not publish.
- **Failures & mistakes** must record what was got wrong — wrong assumptions, reversed decisions, verification failures, near-misses. Deliberately not titled "Challenges," which invites the interview-answer register in which every difficulty resolves flatteringly. A spotless record is not evidence of quality; it is evidence that nobody looked.

The structure is identical across all case studies so that decision quality can be compared across projects without re-learning a layout, and so that a thin section is conspicuous.

### Alternatives considered

**Project cards with links to repositories.** Minimal effort, and lets the code speak. Rejected because it delegates the argument to a reader's willingness to read source — which the senior-engineer layer will do and the other two layers will not. It also loses everything not visible in code: the constraints, the rejected paths, the reasoning.

**Short summaries with expandable detail.** A compromise offering scannability with depth on demand. Rejected on the same grounds as the disclosure-widget rule in `ARCHITECTURE.md` §5: interaction-gated content is invisible to search, print, and readers who do not realize it is there. Document order achieves the same layering for free.

**Video walkthroughs.** High bandwidth for conveying architecture, and hard to fake. Rejected as a primary format: it is unskimmable, poorly accessible without significant additional work, unindexable, and it forces the reader onto the author's pacing. Reconsiderable later as a supplement.

**Free-form writing per project.** Lets each project be told in its most natural shape. Rejected because uniform structure is what makes cross-project comparison possible, and because free form makes it easy to quietly skip the Verification section on the project where it is weakest — which is precisely where a reader most needs it.

### Consequences

- Writing a case study is a multi-day effort. This caps the portfolio at four projects (`FOUNDATION.md` §9) and that cap is a feature.
- Case studies are dense and long. The layering in ADR-003 is what makes that acceptable.
- Honesty is enforced structurally. The Failures & mistakes and Looking back sections make overclaiming difficult, and their absence would be conspicuous.
- Projects without genuine engineering decisions cannot be written up in this format at all, which is an effective and automatic filter on what belongs here.
- Retrospective reconstruction is required for older work. Where reasoning cannot be honestly reconstructed, it is omitted rather than invented.

---

<a id="adr-003"></a>
## ADR-003 — Layered information architecture

**Status:** Accepted · 2026-08-04

### Context

Three readers with incompatible needs consume the same site: a recruiter with 30 seconds, a hiring manager with 5–10 minutes, and a senior engineer with 20+ minutes (`FOUNDATION.md` §4). A fourth audience — future collaborators (`FOUNDATION.md` §4.4) — reads at self-directed depth and is distinguished by what it weights rather than by how long it stays, so it is served by the content of these layers rather than by a layer of its own.

Optimizing for any one of them damages the others. A site tuned for the recruiter is too shallow to convince the engineer, who is the one whose advocacy actually carries weight in a hiring debrief. A site tuned for the engineer loses the recruiter in the first ten seconds, and the recruiter is frequently the gate that determines whether the other two ever see it. Writing for an average of the three produces a document that satisfies none of them.

### Decision

The site presents three complete experiences layered by document order. Each layer terminates in an action appropriate to its reader, and no layer is a teaser for the next.

- **Layer 1** occupies the region above the fold on `/` at a 375 px viewport: positioning, seniority, primary technologies, contact. No scroll, no interaction, no JavaScript required.
- **Layer 2** is the scroll depth of `/` plus the Summary, Context, Architecture, and Outcomes sections of any case study. The competency thesis resolves here without navigation.
- **Layer 3** is the depth of a case study — Key decisions, Failures & mistakes, Verification, Looking back — plus outbound links to source.

Layering is achieved by ordering, never by accordions, tabs, or "read more" toggles for primary content.

### Alternatives considered

**Separate paths per audience** ("for recruiters" / "for engineers"). Explicit and easy to reason about. Rejected because it requires the reader to self-classify before they know what the site contains, it reads as condescending, and it multiplies the surfaces that must be maintained and kept consistent.

**Progressive disclosure through interaction.** Compact and conventional. Rejected because collapsed content is effectively invisible: it is skipped by many readers, poorly served in print, weaker for search indexing, and adds client-side JavaScript to solve a problem that document order solves for free.

**Depth-tiered pages** — a summary page linking to a detail page linking to a deep-dive page. Rejected because each navigation step loses readers, and the senior engineer is forced to traverse two layers of material written for someone else before reaching substance.

**One depth, chosen for the hiring manager.** The simplest option, and defensible — the hiring manager is arguably the decision-maker. Rejected because it forfeits both ends: the recruiter never gets a clean forward, and the engineer finds nothing to verify, so the AI-workflow claim goes unanswered for the reader most inclined to challenge it.

### Consequences

- Content must be ordered by audience depth rather than by narrative preference. Some naturally early material (nuance, caveats) must move later.
- The first screen carries disproportionate weight and warrants disproportionate iteration.
- Case studies get long. Typography, measure, and spacing (`ARCHITECTURE.md` §8) become functional requirements rather than aesthetic ones.
- Success is measurable per layer, which is what makes the Tier 3 comprehension tests in `FOUNDATION.md` §11 meaningful.
- Every information-architecture change must be re-validated against all three layers, not just the one being edited.

---

<a id="adr-004"></a>
## ADR-004 — Documentation-first development

**Status:** Accepted · 2026-08-04

### Context

Implementation is delegated to AI agents (`FOUNDATION.md` §5). This changes where the engineering cost sits. Producing code is fast; producing *correct* code depends almost entirely on whether the specification was unambiguous.

A human implementer silently resolves ambiguity using context, taste, and knowledge of the surrounding system. That resolution is invisible — it happens in someone's head and usually turns out fine. An agent resolves the same ambiguity too, but without the context, and the resolution surfaces as wrong output. Every unstated assumption becomes a defect rather than a quiet judgement call.

This makes ambiguity expensive in a way it was not before, and it makes the specification the highest-leverage artifact in the process.

### Decision

Documentation precedes implementation at every level.

- **Project level.** `FOUNDATION.md`, `ARCHITECTURE.md`, and `DECISIONS.md` are written before any application code. This milestone.
- **Feature level.** Non-trivial features get a written specification — behavior, constraints, verification approach — before implementation.
- **Decision level.** Architecturally significant choices are recorded here before they are built.

Documentation is treated as source: reviewed in pull requests, kept current, and updated in the same change as the code it describes. Documentation that contradicts the implementation is a defect and is triaged as one.

### Alternatives considered

**Code-first with documentation after.** The industry default. Rejected because it inverts the economics of this workflow: it front-loads the cheap activity and defers the expensive one. Documentation written afterwards also describes what was built rather than constraining what gets built, which forfeits its main value. In practice it also does not get written.

**Lightweight documentation — a README and inline comments.** Adequate for a small project with a single human implementer. Rejected because it cannot carry architectural reasoning, and because reasoning is the specific thing this project needs to preserve, both for the agent workflow and because the documents are themselves evidence for the positioning.

**Documentation-as-code generation** — generate docs from the implementation. Rejected because it can only describe structure, never intent. "What this does" is recoverable from source; "why this rather than the alternative" is not, and only the second is worth writing down.

### Consequences

- Slower start. This milestone produces no running software, and that is the intended trade.
- Specifications are reusable directly as agent context, which is where the time is recovered.
- Documentation drift becomes a maintenance obligation with real cost. Mitigated by treating docs as source and reviewing them in the same pull request as the code.
- The documents are public and become evidence for the methodology claim — the fourth case study in `FOUNDATION.md` §9 is largely this repository's `docs/` directory.
- Ambiguity is forced to surface at design time, where resolving it is cheap.

---

<a id="adr-005"></a>
## ADR-005 — Accessibility is a release requirement

**Status:** Accepted · 2026-08-04

### Context

Accessibility is commonly treated as a post-launch improvement. It rarely survives that treatment: retrofitting it means revisiting markup, focus management, color, and interaction patterns after they have hardened, at which point the cost is high enough that the scope is quietly reduced.

Three factors make deferral untenable here. Accessible interfaces are a direct measure of engineering thoroughness, and the site's central claim is thoroughness. The senior-engineer layer will tab through the site — this is standard practice for that reader, and a keyboard trap in a portfolio arguing for craft is a self-inflicted wound. And it is the right thing to build.

### Decision

WCAG 2.2 Level AA conformance is a release requirement. Non-conformance blocks merge and blocks deploy.

Enforced by three complementary methods (`ARCHITECTURE.md` §11), because automated tooling detects only a fraction of real barriers:

1. Automated — axe-core across every route in CI, zero serious or critical violations; `jsx-a11y` at lint time; Lighthouse accessibility score of 100.
2. Programmatic behavioral — Playwright suites covering keyboard-only traversal, focus visibility, reduced-motion rendering, and JavaScript-disabled rendering.
3. Manual — VoiceOver traversal of every route before launch and before any structural change, recorded in the pull request.

### Alternatives considered

**Best-effort accessibility without gates.** The common approach, and well-intentioned. Rejected because "best effort" degrades silently under deadline pressure and there is no signal when it does. A gate is the only mechanism that holds.

**Automated checks only.** Cheap and fully automatic. Rejected as insufficient: axe catches roughly a third of real barriers. It cannot detect an illogical tab order, a focus indicator that is technically present but visually lost, or a heading structure that is valid and useless. Automation is necessary and not sufficient.

**WCAG 2.1 AA instead of 2.2.** Lower bar, broader tooling support. Rejected because 2.2 adds criteria that matter here — notably 2.5.8 target size and 2.4.11 focus-not-obscured — and the incremental cost is small when adopted from the start rather than retrofitted.

**AAA conformance.** Rejected as the wrong target: AAA imposes constraints (such as a 7:1 contrast floor) that would materially restrict the typographic and color system for a general-audience site, and W3C itself does not recommend AAA as a site-wide requirement.

### Consequences

- Every interactive component costs more to build. Focus management, keyboard handling, and semantics are designed rather than added.
- Some visual approaches are unavailable: low-contrast text, motion-dependent affordances, custom controls without full keyboard equivalents.
- The three-method verification (`ARCHITECTURE.md` §12) is real CI time and real manual effort per structural change.
- Accessibility work becomes legitimate case-study material — it is evidence of the verification discipline the positioning claims.
- Downstream benefits are automatic: semantic structure improves search indexing, keyboard operability improves usability generally, and reduced-motion support was already required by ADR-011.

---

<a id="adr-006"></a>
## ADR-006 — Performance budget precedes visual effects

**Status:** Accepted · 2026-08-04

### Context

The site must feel premium (`FOUNDATION.md` §8), and premium is usually pursued through addition: animation libraries, custom cursors, WebGL, large hero imagery, multiple typeface families. Each addition costs bytes, main-thread time, or both. The costs are individually small and collectively fatal, and they are invisible on the developer's machine — a fast laptop on fast broadband hides every one of them.

The actual first impression is frequently formed on a mid-tier phone on a poor connection, by a recruiter opening a link between meetings. On that device, a site that takes four seconds to become useful has already communicated something about the engineer, and no amount of animation quality recovers it.

A budget adopted after implementation is a rationalization of what was built. A budget adopted before is a constraint.

### Decision

The performance budget in `ARCHITECTURE.md` §10 is fixed before implementation and enforced in CI on every route, at the mobile profile. Headline constraints: LCP ≤ 1.5 s, CLS ≤ 0.05, TBT ≤ 150 ms, first-load JavaScript ≤ 120 KB gzipped, zero third-party requests, Lighthouse Performance ≥ 95.

A visual treatment that cannot fit the budget is redesigned or dropped. It is never implemented first with optimization deferred, because deferred optimization competes with the next feature and loses.

Raising a budget number requires an ADR stating what was gained in exchange. A budget that can be silently adjusted when inconvenient is not a budget.

### Alternatives considered

**Build first, optimize later.** Standard practice, and it preserves design freedom during the creative phase. Rejected because optimization-later reliably becomes optimization-never, and because architectural performance decisions — the server/client component boundary, the animation library import strategy, the font loading approach — are extremely expensive to reverse once components depend on them.

**Softer targets** — the Core Web Vitals "good" thresholds of 2.5 s LCP and 0.1 CLS. Rejected because meeting the industry floor is not evidence of craft. The site's argument requires being conspicuously fast, not adequately fast, and the headroom absorbs the cost of a case study with heavier media.

**Field measurement instead of lab budgets.** More representative of real users. Rejected on volume: the audience is a few dozen people who matter, which will never produce statistically meaningful field data, and it would require the analytics that ADR-009 rejects. Lab measurement at a fixed device profile is reproducible and can gate a pull request, which field data cannot.

**Budget only the critical routes.** Rejected because the senior-engineer layer is most likely to be on a case-study route, which is the heaviest one, and exempting the heaviest route from the budget defeats it.

### Consequences

- Some desirable visual treatments will be rejected on cost. This is the decision working, not failing.
- Technology choices are constrained upstream: no component library, no runtime CSS-in-JS, no client state library, no third-party embeds.
- Motion is bounded to compositor-only properties and a small sanctioned set of patterns (ADR-011).
- Every pull request carries the budget assertion, so regressions are attributed to the change that caused them rather than discovered months later.
- A strict Content Security Policy becomes available at no additional cost, since the zero-third-party constraint already eliminates every origin that would need allowing.

---

<a id="adr-007"></a>
## ADR-007 — Next.js App Router, statically rendered, deployed on Vercel

**Status:** Accepted · 2026-08-04

### Context

The site is a content-driven, largely static product with a strict performance budget (ADR-006), MDX case studies (ADR-008), and no request-time data. It is maintained by one engineer whose production background is C# .NET and React, and it must remain maintainable in two years without continuous attention to the toolchain.

The framework choice determines the achievable JavaScript floor, the image pipeline, and how much of the budget is spent before any feature exists.

### Decision

Next.js with the App Router, TypeScript in `strict` mode, statically rendered at build time, deployed on Vercel.

React Server Components are the default; client components are leaves and exceptions (`ARCHITECTURE.md` §2). Every route is statically generated — no ISR, no on-demand revalidation, no request-time rendering. Content changes ship as deploys, which removes cache invalidation as a category of problem.

Vercel is chosen for first-party App Router support: static generation, edge CDN, and image optimization work without an adapter layer, and the adapter layer is where the budget would otherwise leak.

### Alternatives considered

**Astro.** Ships zero JavaScript by default and is arguably the better technical fit for a content site — it would make the bundle budget nearly free rather than something to defend. Rejected on a strategic basis: React and Next.js are the stack the target roles use, and the site is itself an artifact those roles evaluate. Demonstrating a strict budget met *within* a React framework is a stronger signal than meeting it in a framework designed to make it easy. The cost is real and is accepted knowingly.

**Next.js Pages Router.** Mature and familiar. Rejected because it forfeits Server Components, which are the primary mechanism for meeting the bundle budget, and because it is the framework's legacy path — a maintainability liability on a two-year horizon.

**SvelteKit.** Smaller runtime, excellent ergonomics. Rejected on the same strategic grounds as Astro, with weaker relevance to the target roles.

**Static site generator with hand-authored templates** (Eleventy, Hugo). Minimal JavaScript, minimal dependencies. Rejected because component-driven architecture is a requirement, and because the animation system in ADR-011 and the MDX component map in `ARCHITECTURE.md` §6.4 both want a real component model.

**Cloudflare, Railway, or static export to a generic CDN.** Each viable. Rejected because each requires either an adapter (`@opennextjs/cloudflare`), self-managed image optimization and CDN, or the loss of the built-in image optimizer under `output: 'export'`. All three spend engineering effort on infrastructure that is not the point of this project.

### Consequences

- Static rendering yields edge-served TTFB and eliminates a class of runtime failure entirely.
- The React runtime is a fixed cost against the bundle budget, making the server/client boundary discipline in `ARCHITECTURE.md` §2 mandatory rather than advisory.
- Vercel coupling is limited to static generation, image optimization, and edge caching. No Vercel-specific runtime API is used, so a migration is a build-and-deploy change rather than an application rewrite. Paying an abstraction cost now to hedge a migration that may never occur is the wrong trade at this scale.
- Framework upgrades become a maintenance obligation. Next.js moves faster than a static site generator would.
- Choosing the harder framework for strategic reasons is itself a decision worth documenting, and it belongs in the site's own case study.

---

<a id="adr-008"></a>
## ADR-008 — Content is filesystem MDX with a validated schema

**Status:** Accepted · 2026-08-04

### Context

Case studies are long-form documents with structured metadata and a small set of semantic components — figures, diagrams, decision blocks, metrics, comparison tables (`ARCHITECTURE.md` §6.4). There is exactly one author, who will ever be the only author. Content changes are infrequent and always accompany a deploy.

The site must remain maintainable by one person over years, and adding a case study should be writing a document rather than modifying an application (`FOUNDATION.md` §3, goal 7).

### Decision

Case studies are MDX files at `content/case-studies/<slug>/index.mdx`, with media stored alongside. Frontmatter is validated by a Zod schema at build time; a file that fails validation fails the build. TypeScript types are inferred from the schema, never declared in parallel.

A single content layer at `src/content/` is the only code that reads the filesystem. No component reads content directly.

The set of components usable inside MDX is closed (`ARCHITECTURE.md` §6.4), keeping documents portable and the bundle bounded.

### Alternatives considered

**Headless CMS** (Contentful, Sanity, Payload). Better authoring experience, content editable without a deploy. Rejected on every axis that matters here: it adds a runtime dependency and an availability risk, it puts content outside version control where it cannot be reviewed in a pull request, it requires either request-time fetching or a webhook-triggered rebuild, and it solves multi-author collaboration — a problem this project does not have.

**Plain Markdown.** Simpler, more portable. Rejected because the semantic components in §6.4 cannot be expressed, and the alternative is raw HTML embedded in prose, which is worse on every dimension including accessibility.

**Content in a database.** Rejected outright: it introduces infrastructure, request-time rendering, and backup obligations to store four documents that change a few times a year.

**Case studies as React components.** Maximum layout control per case study. Rejected because it destroys the content/presentation separation that makes the site maintainable, makes every case study a code review, and guarantees that a design system change requires editing prose files.

**Contentlayer or a similar typed content pipeline.** Close to the chosen approach and would provide the schema layer directly. Rejected on maintenance risk — the project's stewardship has been intermittent — and because the requirement here is small enough that owning it is cheaper than depending on it. Reconsiderable if the content layer grows past roughly 200 lines.

### Consequences

- A content change is a git commit and a deploy. Acceptable and arguably desirable: content passes through review.
- Malformed content fails the build loudly rather than rendering incorrectly, which is the correct failure mode for a site where content *is* the product.
- Frontmatter requirements are enforceable rather than conventional — required alt text, exactly three outcomes, mandatory disclosure classification (`ARCHITECTURE.md` §6.3).
- The `disclosure: restricted` field makes ADR-010's review step structural rather than remembered.
- Authoring requires a local development environment. Acceptable for a single technical author; would be disqualifying for any other authoring model.
- Content is fully portable. MDX with frontmatter can be moved to any framework, which is the strongest hedge available against ADR-007's framework coupling.

---

<a id="adr-009"></a>
## ADR-009 — No third-party analytics; CI is the measurement instrument

**Status:** Accepted · 2026-08-04

### Context

Success criteria that cannot be measured are aspirations (`FOUNDATION.md` §11), so the site needs measurement. The reflexive answer is analytics.

Analytics answers poorly here. The audience is a few dozen people over months — far too little volume for any behavioral metric to be statistically meaningful. Worse, the metrics analytics produces are the wrong ones: pageviews, bounce rate, and time on page cannot distinguish a recruiter who found what they needed in 20 seconds from one who left confused. The questions that matter — did the positioning land, could a hiring manager name the three competency stories, did a senior engineer find a gap between claim and artifact — are comprehension questions, and comprehension is not observable in a click stream.

Against near-zero informational value sit real costs: third-party script weight against the budget (ADR-006), a consent banner as the first thing a recruiter sees, a privacy policy obligation, and a contradiction with the engineering values the site is arguing for.

### Decision

The site ships zero third-party analytics, tracking, and telemetry. Zero third-party network requests of any kind is an asserted constraint in CI (`ARCHITECTURE.md` §10).

Measurement is redistributed to instruments that answer the actual questions:

- **Automated gates in CI** measure everything about the artifact — performance, accessibility, bundle size, type safety, content integrity, link integrity. These are pass/fail and block merge.
- **Structured comprehension testing with real people** measures whether the layering works: the Tier 3 protocols in `FOUNDATION.md` §11.
- **A private outcome log** tracks the lagging signals that matter commercially — inbound conversations that reference a specific case study, interviews that open at architecture level.

Traffic volume, time on page, and repository stars are explicit anti-criteria. Optimizing for them would corrupt the ranked goals.

### Alternatives considered

**Privacy-first analytics** (Plausible, Fathom, Vercel Analytics). Cookie-free, no consent banner, lightweight. The strongest alternative, and rejected only after weighing it seriously: it would still add a third-party origin, still cost bytes, and — decisively — would still not answer a single question in `FOUNDATION.md` §11. Data that changes no decision is not worth its cost, however small that cost is.

**Full product analytics** (PostHog and similar). Session recordings and funnels would be genuinely informative at scale. Rejected on volume, on the consent banner as a first impression, on script weight, and on the privacy position.

**Self-hosted analytics.** Removes the third-party origin. Rejected because it adds infrastructure to maintain in exchange for data that still would not change a decision.

**Server log analysis.** Free, no client cost, no privacy concern. Rejected as not worth the effort for the same reason: request counts do not answer comprehension questions. Available later at zero cost if a specific question ever arises that logs can answer.

### Consequences

- Zero third-party requests becomes an assertable, enforced constraint — which in turn makes a strict CSP available for free and removes an entire class of supply-chain exposure.
- No consent banner. Nothing to disclose in a privacy policy.
- Real behavioral questions become genuinely unanswerable. If "do recruiters reach the contact section" ever becomes a decision-blocking question, this ADR must be superseded rather than quietly worked around.
- Comprehension testing requires recruiting real people and real hours. This is a meaningful cost, and it is the point — it produces qualitative findings that no dashboard would have surfaced.
- Shipping a site with no tracking is itself a legible engineering position, consistent with everything else recorded here.

---

<a id="adr-010"></a>
## ADR-010 — Employer work is named and described at architecture level

**Status:** Accepted · 2026-08-04

### Context

The Edge10 NHL athlete performance platform is the strongest available evidence of enterprise engineering: CQRS and clean architecture in production C# .NET, authorization policy design, SQL Server schema and access control, React interfaces, and agentic systems for API validation, frontend validation, and end-to-end testing. It is the only project in the portfolio that demonstrates operating inside constraints not of one's own choosing — existing systems, existing teams, real stakes.

It is also employer-owned. It cannot be linked to source, screenshotted, or described with proprietary figures. And how an engineer handles this boundary is itself observed: a hiring manager who sees a candidate publishing borderline employer detail draws a conclusion about how that candidate will treat *their* proprietary information.

### Decision

Edge10 is named, with the domain named, described at architecture level only, with anonymized or relative metrics.

**Permitted:** naming the employer and domain; describing architectural patterns and technology choices at the level found in any conference talk; describing agentic systems built and the engineering problems they solved; characterizing outcomes qualitatively or with relative figures.

**Not permitted:** proprietary source or excerpts; screenshots of internal interfaces; athlete, team, or client data in any form, including synthetic data resembling it; absolute business metrics; internal roadmap or unreleased features; organizational detail; anything that would embarrass a colleague.

**Ambiguity rule:** if disclosability is unclear, it does not ship.

Enforcement is structural rather than remembered. The `disclosure: restricted` frontmatter field (`ARCHITECTURE.md` §6.3) triggers an explicit review of the case study against this policy before publication, recorded in the pull request.

### Alternatives considered

**Named, with real metrics.** Strongest possible credibility signal. Rejected: it would require written clearance, the approval process is slow and may fail, and the downside of getting it wrong is a professional-conduct problem rather than a weaker portfolio. The marginal credibility is not worth that asymmetry.

**Unnamed, domain only** — "a professional sports performance platform." Zero attribution risk. Rejected because unverifiable claims are weak claims. A named employer that a reader can confirm on LinkedIn is materially more credible than an anonymous description, and the naming itself carries no real risk when the content stays at conference-talk level.

**Excluded entirely.** Cleanest legally. Rejected because it discards the only enterprise-engineering evidence in the portfolio and leaves an unexplained gap where the reader's eye goes to current employment.

### Consequences

- Edge10's credibility rests on specificity of reasoning rather than on artifacts. This makes it the hardest case study to write well — the Architecture and Key decisions sections must carry weight that source links carry elsewhere.
- The three flagship projects become load-bearing together: NovaMind AI and OrchestAI supply source-level verification, Edge10 supplies enterprise context. This reinforces ADR-012.
- Every Edge10 statement requires an explicit policy review, not an assumption. The schema makes that step unavoidable.
- The policy is decided once, in advance, rather than negotiated sentence by sentence while writing — which is the condition under which boundaries actually get crossed.
- It generalizes. Any future employer work follows the same policy without a new decision.

---

<a id="adr-011"></a>
## ADR-011 — Motion is a design system with a budget

**Status:** Accepted · 2026-08-04

### Context

The site must feel premium and memorable, at the standard set by Linear, Stripe, Vercel, Raycast, and Apple (`FOUNDATION.md` §8). Motion is central to how those products feel — and it is also the single most common way developer portfolios become worse. The failure pattern is consistent: animation is added because it is impressive rather than because it communicates, and the result is a site that is slower, harder to use, actively hostile to motion-sensitive users, and that reads as a demonstration of a library rather than of judgement.

The distinguishing property of the reference products is not that they animate more. It is that every animation has a job, the vocabulary is small, and the system is applied consistently. Restraint is the craft signal.

### Decision

Motion is a constrained design system, not a per-component decision.

**Inclusion test.** Every animation answers: what does this help the reader understand? Three answers are acceptable — orienting the reader to newly arrived content, confirming an interaction registered, and establishing continuity between two states of the same object. An animation answering none of the three does not ship.

**Tokens.** Four durations (100 / 160 / 240 / 400 ms) and three easing curves, enumerated in `src/design/motion.ts` and used exclusively. Nothing exceeds 400 ms.

**Properties.** `transform` and `opacity` only. Both are compositor-driven. Animating `width`, `height`, `top`, `left`, `margin`, or `padding` is prohibited.

**Sanctioned patterns.** Entrance reveal (opacity plus ≤ 16 px translate, once, at 20% intersection, never above the fold), interaction feedback, shared-element continuity, and focus transitions. Nothing else without an ADR.

**Prohibited.** Scroll-jacking, parallax on text, custom cursors, staggered reveals beyond four elements, load-time animation that delays content, autoplaying video, and any animation that must complete before content is readable.

**Reduced motion is a first-class path.** Under `prefers-reduced-motion: reduce`, transform animation is removed and replaced with instant or opacity-only transitions — not shortened, not reduced in amplitude. Tested in CI.

**Containment.** Motion components live under `components/motion/` as client leaves and are the only sanctioned animation surface. The library is imported through `LazyMotion` with the DOM feature set only. Animated content renders visible without JavaScript.

### Alternatives considered

**No animation.** Guarantees the performance budget and eliminates a class of accessibility risk. Rejected because motion at this quality level genuinely contributes to perceived craft, and the goal in `FOUNDATION.md` §8 is real. The correct response to a risky tool is constraint, not abstinence.

**Per-component animation decisions.** Maximum flexibility. Rejected because it produces inconsistency, and consistency is where memorability actually comes from. It also has no natural stopping point — every component gets slightly more animation than the last.

**CSS transitions and keyframes only, no library.** Zero bundle cost, and sufficient for entrance reveals and hover states. Genuinely tempting, and rejected narrowly: interruptible, spring-based, and shared-element animation are hard to do well in raw CSS, and the reduced-motion handling is more reliable through `MotionConfig` than through scattered media queries. The `LazyMotion` import keeps the cost bounded. If the sanctioned pattern list ever shrinks to entrances and hovers, this ADR should be superseded and the library dropped.

**A scroll-driven animation showcase.** Common in portfolios and effective at signaling front-end capability. Rejected because it targets a different audience than `FOUNDATION.md` §4 — it impresses other portfolio authors, not hiring managers — and it directly conflicts with the performance budget and the reduced-motion commitment.

### Consequences

- Animation ideas are evaluated against the inclusion test, and most fail it. Expected.
- The animation library is a bounded, measured line item in the bundle budget rather than an open-ended cost.
- Reduced-motion users get a designed experience rather than a broken or merely faster one.
- Compositor-only property restriction means motion cannot cause layout shift, protecting the CLS budget structurally rather than by vigilance.
- Adding a new motion pattern requires an ADR, which is deliberate friction against the failure mode this decision exists to prevent.
- The site will have less motion than most portfolios that pursue the same feeling. That is the intended outcome.

---

<a id="adr-012"></a>
## ADR-012 — Each flagship project tells one non-overlapping competency story

**Status:** Accepted · 2026-08-04

### Context

Three flagship projects — NovaMind AI, OrchestAI, and Edge10 — share substantial surface characteristics. All involve AI systems. All involve backend architecture. Two are built on .NET with CQRS. Presented conventionally, they would read as three variations on one capability, and the reader's conclusion after the third would be the same as after the first.

That would be a serious misrepresentation, because they demonstrate genuinely different disciplines evaluated by genuinely different evidence:

- **Product engineering** is judged by whether users succeed: shipping something with real users, auth, data lifecycle, and an operable interface.
- **Infrastructure and framework engineering** is judged by whether other engineers succeed without reading your internals: abstractions, extension points, protocol integration, and verification methodology.
- **Enterprise engineering** is judged by whether you can operate inside constraints you did not choose: existing systems, existing teams, compliance boundaries, real stakes.

An engineer with all three is materially more valuable than one with three instances of any single one, and that is exactly what a conventional project grid would obscure.

### Decision

Each flagship project is assigned exactly one competency story, and every presentation decision reinforces the separation.

| Project | Competency story | Question it answers |
|---|---|---|
| NovaMind AI | AI Product Engineering | Can this person ship an AI product end to end? |
| OrchestAI | AI Infrastructure & Framework Engineering | Can this person design systems others build on? |
| Edge10 | Enterprise Software Engineering | Can this person operate in a real production organization? |
| jigargajjar.dev | Engineering Methodology | Is the AI-native workflow real? |

Enforcement:

- `competency` is a required enumerated frontmatter field (`ARCHITECTURE.md` §6.3), so the assignment is type-checked rather than editorial.
- `/work` orders and labels by competency story, not chronologically. Chronology implies a career narrative; competency implies breadth.
- The home page resolves the full thesis before any navigation, so a reader who never leaves `/` still receives the breadth argument (ADR-003, layer 2).
- Case studies emphasize the evidence proper to their discipline: NovaMind AI on product decisions, retrieval quality, and citation grounding; OrchestAI on abstraction design, extension points, and framework verification; Edge10 on operating within organizational and technical constraints.
- Overlap is deliberately de-emphasized. Where two projects share a technology, the shared part is stated once and the case study spends its length on what is distinct.

The success test is stated in `FOUNDATION.md` §11, Tier 3: a hiring manager who reads for ten minutes should be able to name the three stories. If a reader finishes two case studies and cannot articulate what different thing each proved, the information architecture has failed regardless of the quality of either one.

### Alternatives considered

**Chronological presentation.** Conventional and easy to maintain. Rejected because it invites the reader to construct a career-progression narrative and to weight recency, which obscures breadth entirely — the specific thing this portfolio needs to communicate.

**Presentation by technology.** "Here is the .NET work, here is the AI work." Rejected because it groups on the least meaningful axis. Technology is the most substitutable part of an engineer's skill set and the part a hiring manager is least concerned about at senior level.

**Presentation by impressiveness, strongest first.** Rejected because it implicitly asks the reader to rank the projects against each other, which is exactly the framing this decision exists to prevent. It also makes the second and third case studies feel like diminishing returns.

**Merging the AI projects into one "AI engineering" narrative.** Simpler story, less to read. Rejected because it collapses the product/infrastructure distinction, which is one of the most meaningful distinctions in senior hiring and one that a single narrative cannot express.

### Consequences

- Case-study scope is constrained by its assigned story. Material that would strengthen a project but belongs to another project's competency is cut or compressed, even when it is good material.
- The competency taxonomy becomes a maintained abstraction. A fifth project must either fit an existing story or justify a new one via an ADR, which is useful friction against portfolio sprawl.
- Home-page design is harder: the thesis must resolve above and just below the fold without turning into a taxonomy diagram.
- The separation is testable, which is what makes the Tier 3 hiring-manager protocol meaningful rather than decorative.
- Depth is protected. Because each project owns a distinct story, none of them competes for the same attention, and the case for four deep case studies over twelve shallow ones becomes structural rather than a matter of preference.

---

<a id="adr-013"></a>
## ADR-013 — The portfolio demonstrates engineering judgement rather than programming speed

**Status:** Accepted · 2026-08-04

### Context

ADR-001 through ADR-012 all rest on an unstated premise: that engineering judgement is the scarce capability worth demonstrating. ADR-001 decides the artifact's form, ADR-002 its presentation unit, ADR-003 its structure, ADR-012 its composition. Each assumes the premise. None records it, and none records that a different premise was available.

The premise is not obvious and it is not the popular one. The common positioning for an AI-native engineer is velocity — ship more, ship faster, output as evidence. That framing is easier to communicate, easier to quantify, and produces a materially different site.

It is also, on inspection, a claim with a short half-life. Generation speed is converging across the industry; within a hiring cycle it distinguishes nobody, and it invites the objection it cannot answer — that volume without verification is liability accumulating faster. Meanwhile the constraint has moved. When implementation is cheap, the expensive failures are architectural, and they are caused by decisions, not by typing.

Recording this late is deliberate. It became clear that the premise needed its own record only after twelve decisions had been made on top of it, which is the ordinary way a foundational assumption becomes visible.

### Decision

The portfolio's central thesis is: **engineering is no longer constrained by writing code; it is constrained by making correct technical decisions.**

Every surface argues that thesis or is cut. Concretely:

- Case studies are organized around decisions, failures, and verification rather than features or output volume (ADR-002).
- Claims about the artifact are gated by automated checks rather than asserted (ADR-005, ADR-006, ADR-009).
- The reasoning behind the site's own construction is published so the practice can be checked against the claim (ADR-004).
- Speed, output volume, and velocity multiples are never used as evidence anywhere on the site — not in copy, not in metrics, not in the résumé.

This ADR supersedes nothing. It records the premise that ADR-001, ADR-002, ADR-003, and ADR-012 descend from, and it is the record to revisit first if the portfolio's direction is ever reconsidered.

### Alternatives considered

**The velocity thesis** — "I ship several times faster with an AI-native workflow." The obvious alternative and the common one. Rejected on three grounds: it is converging to a universal claim and will shortly distinguish nobody; it is close to unverifiable, since no reader can audit a counterfactual about how long something would otherwise have taken; and it actively invites the objection that the engineer does not understand their own output. It argues for the commoditizing half of the work.

**The output thesis** — a large volume of projects as evidence of capability. Rejected because volume is now cheap to manufacture and therefore carries little signal, and because it directly contradicts the depth-over-breadth decision in ADR-002.

**The credentials thesis** — years, employers, and technology lists as the primary evidence. Rejected because a résumé already does this more efficiently, and because it is the framing that a portfolio exists to move beyond.

**No stated thesis** — present the work and let readers draw conclusions. Rejected because it forfeits the framing to the reader's defaults, and the default frame for an AI-native engineer is currently the velocity thesis. Declining to argue is not neutral here.

### Consequences

- A hard editorial constraint: speed and output volume are unavailable as evidence anywhere on the site, including where they would be flattering.
- The thesis is falsifiable by the artifact, which is the intended risk. Shallow reasoning in any case study refutes it more effectively than any competitor could, and this is what the senior-engineer comprehension test (`FOUNDATION.md` §11, Tier 3) is designed to detect.
- Feature and content proposals gain a first-pass filter: does this demonstrate judgement, or does it demonstrate production? Proposals that only demonstrate production are cut regardless of how impressive they are.
- The thesis carries a shelf life of its own. If decision quality also becomes cheap to demonstrate, this ADR is the one to supersede — and the thing that would have to change is the whole portfolio, not one section of it.
- The positioning is harder to communicate in 30 seconds than the velocity claim. This cost lands squarely on the recruiter layer, and it is why the layer-1 surface required disproportionate design attention (ADR-003).

---

<a id="adr-014"></a>
## ADR-014 — `/connect` is a route; engineering notes are not

**Status:** Accepted · 2026-08-04

### Context

Two surfaces were proposed during Phase 3A review that do not exist in the route table (`ARCHITECTURE.md` §4): a contact destination and a writing section. Both were initially declined on the grounds that the footer already carries the contact affordance and that `FOUNDATION.md` §12 names a blog a non-goal. Both were re-proposed in a materially different form, which is what makes this a new decision rather than a reversal.

**The contact proposal changed shape.** What was declined was a contact page — a form, or a page whose content is an email address. What is now proposed is a professional card: availability, current focus, what to bring, preferred channels, response expectations. Checked against the question ledger (`EXPERIENCE_FLOW.md` §5), this surfaces a genuinely unserved question. R4 (availability) is weakly served by `/resume`; C6 asks what kind of problem to bring, and the competency thesis answers *capability* but not *appetite*. A founder can determine from `/work` that this person can build agent infrastructure, and cannot determine whether they want to hear about it. The collaborator's exit action is *propose* (`FOUNDATION.md` §4.4), and a proposal requires knowing what a good one looks like.

**The writing proposal also changed shape** — durable engineering essays with no cadence, reinforcing an existing philosophy rather than creating a content obligation. The staleness argument in `FOUNDATION.md` §12 is specifically about publishing rhythm, and content with no rhythm cannot fall behind one. But every proposed piece is method content, and `/workflow` already owns method.

### Decision

**`/connect` is added to the route table** as a full route, and the footer contact affordance is retained unchanged on every route. Both, not either.

**Engineering notes are a region of `/workflow`, not a route.** They extend the Evidence region: the process described in general, then examined in specific.

### Alternatives considered

**Keep contact footer-only.** The Phase 3A recommendation. Rejected because the footer can carry a channel but not a position — availability, current focus, and what to bring require prose, and prose in a footer is a footer that has become a page. The original objection was that a contact route *removes* contact from the moment of decision; retaining the footer removes that objection entirely, and it was the only substantive one.

**A `/notes` route.** Rejected on the staleness mechanism that `FOUNDATION.md` §12 identifies. A route in primary navigation carries an implicit publishing promise; three essays under a nav item read as dormant in a way that three essays inside a method page do not. A route would also split method across two surfaces, weakening both, and would require the reader to discover that the site's philosophy is documented in two places.

**Notes inside `/about`.** Rejected on subject. `/about` answers who this person is and how they work with others. Notes are method, and method has a home.

**Reject notes entirely.** Rejected because the content is genuinely distinct from what `FOUNDATION.md` §12 declines. Non-cadenced durable essays that deepen an existing position are closer to documentation than to blogging, and the ledger shows they serve C1 and C5 at a depth the case studies cannot — a case study argues one project; an essay argues a principle across projects.

**A contact form on `/connect`.** Rejected, unchanged from `INTERACTION.md` §12: it requires a third party or a server, both prohibited, and it replaces an email link that works everywhere with the site's only validation surface and only spam vector.

### Consequences

- The route table grows from seven to eight. `ARCHITECTURE.md` §4 is amended, which is a frozen-document edit and the reason this record exists.
- `/connect` becomes the natural terminal destination after a case study, which is the position the footer previously held alone. The footer continues to serve readers who decide mid-page — a decision point the route cannot reach.
- `/connect` carries content that decays: availability, current focus, response expectations. It is the only surface on the site with a maintenance obligation measured in months, and a stale "currently focused on" line is worse than no line. Reviewed at each case-study addition (`FOUNDATION.md` §13).
- Notes inherit `/workflow`'s framing, which constrains what can be written there: a note that does not attach to a workflow stage or to the thesis is a case study or nothing. This is deliberate friction against the surface becoming a blog by accretion.
- Notes are presented without dates and without recency ordering. A durable essay carries a position, not a timestamp, and dating them reintroduces the cadence signal this decision exists to avoid.
- The notes region is capped (`ARCHITECTURE.md` §6.6). An uncapped set becomes a feed regardless of what it is called.

# Architecture Decision Records

**Owner:** Jigar Gajjar
**Last reviewed:** 2026-08-06
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
| [015](#adr-015) | The shared framework chunk is a recorded baseline, not a design budget | Accepted |
| [016](#adr-016) | Case-study adjacency is a single forward link, cycling by `order` | Accepted |
| [017](#adr-017) | The cover image is metadata, never rendered in the article | Accepted |
| [018](#adr-018) | Motion is implemented natively; the animation library is removed | Accepted |
| [019](#adr-019) | OrchestAI is an orchestration service; the framework claim is withdrawn | Accepted |
| [020](#adr-020) | The home page argues by demonstration, not by description | Accepted |
| [021](#adr-021) | Ambient system motion is a second motion system, bounded separately | Superseded by ADR-023 |
| [022](#adr-022) | The home page reports measurements, and prints what it cannot measure | Superseded by ADR-023 |
| [023](#adr-023) | The home page is one idea in two hundred words | Accepted |
| [024](#adr-024) | Art direction pass: the home page is finished as a composition | Accepted |
| [025](#adr-025) | Final polish: the headline is measured, and outbound links open away | Accepted |
| [026](#adr-026) | Final proof: a missing favicon, and four things that were already right | Accepted |
| [027](#adr-027) | Pre-launch validation: three defects the gates had never been able to see | Accepted |
| [028](#adr-028) | `/work` adopts the home page's editorial language; the project card is withdrawn | Accepted |
| [029](#adr-029) | `/workflow` is set as an article; two components leave it | Accepted |

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

**Status:** Accepted · 2026-08-04 · **Implementation mechanism superseded by ADR-018**

> The decision below stands in full: motion remains a closed system with a budget, the four sanctioned patterns are unchanged, and every constraint holds. Only the *mechanism* named in "Containment" and in the rejected "CSS transitions and keyframes only" alternative is superseded. That alternative anticipated this: "If the sanctioned pattern list ever shrinks to entrances and hovers, this ADR should be superseded and the library dropped." Measurement met that condition (ADR-018).

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

**Status:** Accepted · 2026-08-04 · **OrchestAI's competency characterisation superseded by ADR-019**

> The decision below stands in full: three flagship projects, one non-overlapping competency each, and the non-competition rule are all unchanged. Only OrchestAI's *characterisation* is superseded. Where this record describes it as framework engineering evidenced by "abstractions, extension points, and framework verification," ADR-019 withdraws that claim against the source: `AgentType` is a closed enum and every agent and tool registers by concrete type. The competency is AI Infrastructure Engineering, evidenced by isolation, cost control, and observability. The slug `ai-infrastructure` is unchanged, so nothing in the schema or the content contract is affected.

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

---

<a id="adr-015"></a>
## ADR-015 — The shared framework chunk is a recorded baseline, not a design budget

**Status:** Accepted · 2026-08-04

### Context

`ARCHITECTURE.md` §10 set the shared framework chunk at ≤ 90 KB gzipped. The first production build of an empty application — zero components, zero client directives — measured 100.3 KB. The budget was exceeded by 11% before any feature existed, and no engineering decision available to the project could reduce it.

Two frozen documents disagreed. ADR-007 fixes Next.js App Router and React. §10 fixed the shared chunk at 90 KB. The framework could not fit its own budget.

Measured from `.next/app-build-manifest.json`, gzipped, per route:

| Component | Gzipped |
|---|---|
| React 19 runtime | 53.1 KB |
| Next 15 App Router runtime | 45.4 KB |
| webpack + main-app | 1.8 KB |
| **Total** | **100.3 KB** |
| Application code, worst route | 0.2 KB |

First-load JavaScript measured 100.5 KB against its 120 KB budget and passed.

Published figures put React 18.3.1 at 46.34 KB gzipped against React 19.0.0 at 58.96 KB. A delta of that order subtracted from 100.3 KB lands near 87.7 KB — under the original line. The 90 KB figure is consistent with a React 18-era runtime and was unreachable for the stack ADR-007 selected. Typical App Router production builds land at 80–130 KB first-load; 100.3 KB is a normal floor for this stack, not a defect.

The underlying documentation failure: §10 stated 90 KB without derivation. No document recorded the runtime size it assumed, so the assumption could not be seen to expire. ADR-007 came closest, noting "the React runtime is a fixed cost against the bundle budget" — it identified the dependency and never quantified it.

### Decision

**The shared framework chunk line is reclassified from a design budget to a recorded baseline with a regression ceiling, set at 105 KB gzipped.**

- The ceiling exists to catch framework-upgrade regressions — a risk ADR-007 recorded — not to constrain design.
- The measured baseline is recorded alongside it and re-recorded on any major framework upgrade.
- **First-load JavaScript remains ≤ 120 KB, unchanged.** It is the line that governs project decisions and it continues to gate every pull request.
- Every other budget in §10 is unchanged.

This is reclassification, not relaxation. The number moves because the line was measuring the wrong kind of thing, and the document now says which kind it is.

### Alternatives considered

**Change framework to reach 90 KB.** Astro ships approximately zero JavaScript by default and would clear the line. Rejected because ADR-007 rejected Astro *strategically*, not technically: React and Next are the stack the target roles use, and the site is an artifact those roles evaluate. This measurement does not touch that reasoning, and ADR-007 already recorded that the byte cost "is real and is accepted knowingly."

**Leave the gate permanently red.** Rejected as the most damaging option available. A gate that is expected to fail is ignored within weeks, and it discredits the twelve gates that pass. On a repository whose thesis is verification discipline, a check the author routes around is exactly what a senior engineer looks for.

**Raise 90 to 105 and call it a budget.** Rejected as the dishonest version of this decision. A budget line that no engineering choice can influence is not a budget; repeatedly raising it would hide that fact rather than record it.

### Consequences

- The bundle-budget gate turns green on the existing foundation with no code change beyond one constant.
- The distinction between constraints the project chooses and constants it inherits is now explicit in §10, which is what the section was reaching for and never stated.
- A framework upgrade that inflates the runtime past 105 KB now fails CI, which is protection §10 did not previously provide.
- **19.7 KB of first-load headroom remains for all client-side application code.** Motion's `LazyMotion` with the `domAnimation` feature set is approximately that on its own, before the theme control, mobile navigation, and copy affordance. `ARCHITECTURE.md` §14 phase 5 will test it. No pre-emptive relaxation is proposed; ADR-006 is right that budgets should not be relaxed before they fail.
- ADR-006 is narrowed, not weakened: its rule now applies to every line in §10 except the one reclassified here, and reclassifying a line is itself an ADR.

---

<a id="adr-016"></a>
## ADR-016 — Case-study adjacency is a single forward link, cycling by `order`

**Status:** Accepted · 2026-08-04

### Context

`COMPONENT_GUIDELINES.md` §6 places an "adjacent case study" in the case-study footer region. `ARCHITECTURE.md` §4 requires an "adjacent case study" as the layer-2 next action. `EXPERIENCE_FLOW.md` §4.2 and §4.3 both route readers to one. None of the three defines what *adjacent* means.

The gap was found during the Phase 4 wireframe review, recorded in `docs/wireframes/03-case-study.md` §12 as needing one line of confirmation before Phase 5, and reached Phase 5 Day 5 unresolved. It blocked the case-study footer, because every reading of the word produces different behaviour.

### Decision

**One forward link. No previous.**

| Rule | Behaviour |
|---|---|
| Ordering | Ascending `order`, over published case studies only. Drafts are already excluded by the content layer and never enter the sequence |
| Next | The case study with the next-highest `order` |
| First case study | Nothing special — its next is the second |
| Last case study | Wraps to the lowest `order` |
| Only one published study | No next link is rendered. Linking a study to itself is not a next action |
| Any case | The footer additionally carries "All case studies" and, where disclosure is public, the source link |

**"No route is a dead end" (`ARCHITECTURE.md` §4) is satisfied twice over.** The cycle guarantees a next study whenever two or more exist, and the footer's `/work` link plus the site footer's contact path carry the requirement even when only one does.

The methodology case study participates in the cycle. `/work` keeps its distinct job — side-by-side comparison, which a forward link cannot provide (`ROUTE_SPECIFICATIONS.md` §1).

### Alternatives considered

**A previous/next pair.** The conventional treatment. Rejected on two grounds. `COMPONENT_GUIDELINES.md` §6 says "adjacent case study" in the singular. More substantially, a pager implies a linear reading order the reader has not followed — they arrived from the homepage, from `/work`, or from a link a colleague forwarded (`EXPERIENCE_FLOW.md` §2). Offering "previous" invites them to reconstruct a sequence that never existed, and a numbered series reads as ranking, which ADR-012 exists to prevent.

**No wrap: the last study offers only `/work`.** Rejected because it creates a special case the reader experiences as an arbitrary stop, and because `/work` is already on every case-study footer — the last study would simply have one fewer link for no reason the reader could name. A cycle has no terminus, so nothing reads as last or least.

**Adjacency within a competency tier** — flagship studies cycling among themselves, methodology separate. Rejected because it would keep a reader inside one kind of engineering, which is precisely the opposite of the breadth argument in ADR-012. The value of the next link is that it crosses competencies, and `order` already encodes that crossing.

**A curated `next` field in frontmatter.** Maximum control. Rejected because it adds a required field to keep correct, introduces the possibility of a broken or circular reference, and encodes by hand what `order` already encodes by rule.

### Consequences

- One rule, one special case. The behaviour is derivable from `order` alone and needs no additional content.
- Reordering `/work` reorders the reading path automatically, because both derive from the same field.
- A reader who works through all four studies returns to the first. That is a cycle rather than a loop with an exit, and it is intended: there is no natural end to a set of non-competing stories.
- The single-study case renders no next link. That is the current state of the repository and it is correct, not a gap.
- Adding a fifth case study changes the path silently. `order` is competency-driven (ADR-012), so a fifth study must be given an `order` deliberately, not appended.

---

<a id="adr-017"></a>
## ADR-017 — The cover image is metadata, never rendered in the article

**Status:** Accepted · 2026-08-04

### Context

`ARCHITECTURE.md` §6.3 makes `cover` a required frontmatter field with `src`, `alt`, `width`, and `height`. No document says where it renders.

Three documents point away from rendering it. `COMPONENT_GUIDELINES.md` §4.1 states plainly: "No cover image on the card. An image per card would consume the entire above-the-fold image budget and would make the cards about screenshots rather than about the competency claim." §6's case-study header region lists title, lifecycle, summary, links, and three outcomes — no cover. `ARCHITECTURE.md` §7 opens with "Prefer no image" and caps above-the-fold imagery at one per route.

Nothing points toward rendering it. The field was therefore required, shaped like something displayable, and consumed by nothing. Found during Phase 5 Day 5 while implementing the case-study detail route.

### Decision

**The cover is metadata. It is never rendered inside the article, on the card, or in any reading surface.**

Its sole consumer is the Open Graph card for the case-study route. Where a case study declares a cover, that image is the Open Graph image; where the asset is absent, the generated card of `ARCHITECTURE.md` §7 — composed from title, competency, and stack — is used instead.

### Alternatives considered

**Render it in the case-study header.** The shape of the field suggests it: `alt`, `width`, and `height` are what a rendered image needs. Rejected because three frozen documents argue against it and none argues for it, and because it would fail the credibility test in `IMAGERY.md` §1 — a decorative header image increases no reader's ability to verify a claim, and `IMAGERY.md` §2 permits only diagrams, screenshots, terminal output, charts, one portrait, and brand marks. A cover is none of those.

**Drop the field, or make it optional.** Honest, and the right answer if the field genuinely had no consumer. Rejected because under this decision it has one, and because changing schema requiredness is an implementation change outside a documentation task.

**Use the generated card always and ignore the cover.** Simplest. Rejected because the Open Graph card is the first impression for a meaningful share of readers (`EXPERIENCE_FLOW.md` §2), and a case study whose strongest artifact is an architecture diagram is better represented by that diagram than by a text card.

### Consequences

- `alt`, `width`, and `height` are exactly what an Open Graph image needs. The field's shape is now explained rather than merely inherited.
- No reading surface gains an image, so `ARCHITECTURE.md` §7's "prefer no image" and the one-image-above-the-fold cap are unaffected.
- **A declared cover must exist on disk at build time.** `content/case-studies/jigargajjar-dev/index.mdx` currently declares `cover.svg`, which does not exist. That is latent: nothing reads it today, and it becomes a build failure when the Open Graph route is implemented. It must be resolved then — by creating the asset or by removing the declaration — and is recorded here so it is not discovered as a surprise.
- The generated-card fallback means a case study is never without a social image.

---

<a id="adr-018"></a>
## ADR-018 — Motion is implemented natively; the animation library is removed

**Status:** Accepted · 2026-08-04 · Supersedes the implementation mechanism of ADR-011

### Context

`ARCHITECTURE.md` §1 named Motion (Framer Motion) as the animation technology, and §9 with `MOTION.md` §10 required it be imported through `LazyMotion` with the DOM-animation feature set only. Three consecutive implementation reports carried an estimate that this would cost 15–18 KB gzipped, and each noted that the remaining first-load headroom was close to that figure.

The estimate was never measured. A spike measured it.

**Measured, `motion@12.43.0`, gzipped, two independent methods:**

| Implementation | Route-specific | First Load JS | vs 120 KB budget |
|---|---|---|---|
| Baseline, no motion | — | 103 kB | — |
| `LazyMotion` + `domAnimation` + `strict` — as documented | **38.4 KB** | **142 kB** | **exceeds by 18.8 KB** |
| `LazyMotion` with async feature loading | — | 169 kB | exceeds by 45 KB |
| `IntersectionObserver` + CSS | **0.4 KB** | **103 kB** | fits, 13.9 KB spare |

The documented mechanism costs **+35.0 KB gzipped**. Chunk analysis of Next's build manifest and real browser transfer measurement agreed: +35.0 KB gzipped, +114.2 KB raw (357.2 → 471.4 KB across the page load).

Applied to the real worst route — `/work/[slug]` at 109.1 KB — the result is **144.1 KB against a 120 KB budget, over by 24.1 KB.** A 20% overrun, not a rounding error.

**Why the 15–18 KB estimate was wrong.** It described `domAnimation`'s own documented weight in isolation. It did not account for what `LazyMotion` and the `m` component pull in alongside it once bundled through Next's webpack graph, nor for React 19's own contribution to the route chunk. The figure was plausible, was repeated across three reports without being checked, and was wrong by more than a factor of two. Nothing in the project's process caught it, because nothing measured it — the bundle gate only fires against code that exists, and the code did not exist.

**The estimate survived precisely because it sat below the threshold of alarm.** 15–18 KB against 10.9 KB of headroom reads as "tight, watch it." 35 KB reads as "impossible." The project spent three phases managing a risk whose size it had never established. This is the failure mode `FOUNDATION.md` §7 exists to prevent — *verify before claiming success* — applied to a number rather than to a feature.

**Runtime is not the blocker.** Median of three Lighthouse runs, documented mechanism versus native: Total Blocking Time 0 ms in both, Largest Contentful Paint 429 ms versus 430 ms, main-thread work 107 ms versus 79 ms. The library is not slow. It is large.

**This is a tooling decision, not a design decision.** The interaction design is unaffected and remains valid.

### Decision

**Motion / Framer Motion is removed from the architecture.** No animation library is a dependency of this project.

The four sanctioned patterns of `ARCHITECTURE.md` §9 are implemented as follows. Three of them already were.

| Pattern | Mechanism |
|---|---|
| Entrance reveal (§5) | `IntersectionObserver` sets a state attribute; a CSS transition on `opacity` and `transform` carries the animation, with duration and easing from the motion tokens |
| Interaction feedback — hover, press (§6.1–6.2) | CSS only. Already implemented; unchanged |
| Focus transitions (§6.3) | CSS only. Already implemented; unchanged |
| Shared continuity (§7) | **Removed.** It has no identified consumer |

**Shared continuity is removed on the terms `MOTION.md` §7 set for itself:** "This pattern is specified because `ARCHITECTURE.md` §9 sanctions it, not because a use case has been identified. If Phase 3 completes without consuming it, it should be removed from the system rather than kept for a hypothetical." Phase 3 completed. Phases 4, 5 and 6 identified no consumer. A sanctioned pattern with no consumer is a pattern that will eventually be used badly because it was available.

**Nothing else changes.**

- Duration and easing tokens are unchanged, and remain frozen at four durations and three easings.
- The `transform`-and-`opacity`-only constraint is unchanged and becomes easier to enforce, not harder: a CSS transition property list is statically greppable.
- The reduced-motion path of §9 is unchanged and is already implemented globally in `globals.css`, where it removes transform-based transitions rather than shortening them. It was never dependent on the library.
- Progressive enhancement is unchanged: animated content renders visible by default and the script only adds the animation, so a script failure cannot hide content (`ARCHITECTURE.md` §2).
- `components/motion/` remains the only sanctioned animation surface.
- Every performance budget is unchanged. None is weakened by this decision.
- Every accessibility guarantee is unchanged.

### Alternatives considered

**A. Keep Motion despite exceeding the budget.** Rejected. It violates the first-load budget in `ARCHITECTURE.md` §10 by 24.1 KB on the worst route. §10 is explicit that a treatment exceeding a budget line "is not implemented and then optimized — it is redesigned or dropped."

**B. Raise the performance budget.** Rejected. It contradicts ADR-006 directly: budgets exist to constrain engineering decisions, and "a budget that can be quietly raised when it becomes inconvenient is not a budget." ADR-015 raised one line and was careful to distinguish a constant the project inherits from a constraint it chooses. This budget is a constraint the project chose, the overrun is caused by a replaceable tool, and a cheaper mechanism satisfying the same behaviour was measured. Raising it here would be exactly the erosion ADR-006 warns against.

**C. `LazyMotion` with async feature loading.** Rejected on measurement, not on principle. It was expected to defer the feature bundle past first load; it measured **worse** — 169 kB against 142 kB — because the async import plus `strict` re-pulls the module graph. The obvious mitigation made the problem larger.

**D. Native implementation — `IntersectionObserver` and CSS. Accepted.** 0.4 KB route-specific, 95× cheaper than the documented mechanism, and verified against the behavioural contract rather than assumed: the reveal fires on intersection at the specified threshold; content is visible with JavaScript disabled; under `prefers-reduced-motion: reduce` the computed transition property list contains colour properties only, with transforms removed.

### Consequences

**Positive.**

- Every performance budget is met with headroom. First load on the worst route stays at ~109.5 KB against 120 KB rather than 144.1 KB.
- One production dependency removed. The dependency surface returns to five packages.
- The animation runtime is roughly 0.4 KB instead of 35 KB — a 95× reduction for identical behaviour.
- Enforcement gets easier. A CSS transition property list can be asserted by a static check; a library's runtime behaviour cannot.
- Progressive enhancement is structurally simpler: there is no hydration boundary between the content and its visibility.
- Fewer moving parts to maintain, and no framework-upgrade coupling to an animation library.

**Negative.**

- **Shared layout animation is no longer available.** Animating between two states of the same element across a layout change is genuinely hard in raw CSS, and this decision forfeits the capability. It is being forfeited having never been used, which is the cheapest possible moment to forfeit it.
- Spring physics are unavailable. `MOTION.md` §3 already declined them, because a spring has no fixed duration and the 400 ms ceiling would be unenforceable — so nothing is lost that was wanted.
- Any future pattern needing interruptible or physics-based animation would require reintroducing a library, and reintroduction now carries a measured 35 KB price rather than an estimated one.

**Mitigation.** If future work genuinely requires shared layout transitions or physics-based animation, that is a new ADR. It must state the pattern's consumer, measure the mechanism's cost against the budget of the day, and say what is given up in exchange. Re-adding a library is a decision, not a convenience, and the measurement in this record is the baseline it must argue against.

---

<a id="adr-019"></a>
## ADR-019 — OrchestAI is an orchestration service; the framework claim is withdrawn

**Status:** Accepted · 2026-08-04

### Context

`FOUNDATION.md` §9 describes the flagship AI-infrastructure project as "a multi-agent AI framework built on .NET with CQRS and MCP integration, taken to production release," whose story is "designing for other engineers: abstractions, extension points, protocol integration." The same section sets the competency question as "Can this person design systems other engineers build on?" `HOMEPAGE_NARRATIVE.md` §4 justifies featuring the project on those grounds: "framework design is judged by abstraction quality and verification methodology." Both documents are frozen. The competency label `AI Infrastructure & Framework Engineering` renders from `src/app/page.tsx` and `src/app/work/page.tsx`, directly above the project's summary on the homepage.

Phase 6 content production checked those claims against `github.com/jigargajjarcad/orchestai`. Three are contradicted by the repository:

- **It is not a framework.** `AgentType` is a closed enum of six values. `DependencyInjection.cs` registers each agent and each tool by concrete type — there is no `AddAgent<T>()`, no assembly scanning, and no public extension point. The consumer surface is HTTP with an API key, not a package. That repository's own ADR-005 declines to introduce a seventh agent type partly because doing so "avoids adding another enum value," which treats adding an agent as a cost rather than as an extension point.
- **There are no extension points** in the sense §9 claims. Adding an agent means editing the enum, writing the class, registering it, and updating orchestrator routing, from inside the repository.
- **It was not taken to production release.** Its ADR-011 describes a "pre-adoption development phase"; ADR-004 records single-instance-only approval state; ADR-015 records that a second API instance "would silently defeat" the rate limiter, the tool-call counter, and the eval queue. The project has no users and no maintained public instance.

The claims were not dishonest when written. They described the project's intent at Phase 1, before its implementation had settled. They became false as the implementation drifted, and nothing in the process re-checked them until content production put the description next to the source.

### Decision

**The framework claim is withdrawn. The project is described as an AI orchestration service, and the competency remains AI infrastructure engineering.**

Applied in code by this record:

- `src/app/page.tsx` and `src/app/work/page.tsx` — the display label becomes `AI Infrastructure Engineering`.

The `competency` value `ai-infrastructure` is **unchanged**. It is a slug, not a claim; the schema enumeration, ADR-012's non-competition rule, and the content contract are untouched.

Authorised by this record but **not applied here**, as corrections to frozen documents under `ROADMAP.md` §6:

- `FOUNDATION.md` §9, portfolio table — the competency cell becomes `AI Infrastructure Engineering`, and the question "Can this person design systems other engineers build on?" becomes "Can this person build infrastructure that holds under adversarial use?"
- `FOUNDATION.md` §9, project paragraph — "a multi-agent AI framework … taken to production release" becomes "a multi-tenant multi-agent orchestration service on .NET with CQRS and MCP integration, released at v1.0"; the sentence contrasting framework engineering with product engineering is rewritten around isolation, cost control, and observability rather than extension points.
- `HOMEPAGE_NARRATIVE.md` §4 — the justification for featuring the project drops "framework design is judged by abstraction quality" and rests on the reasons that survive: it is public, it is full-depth, and every claim in the band is checkable in one click.

### Alternatives considered

**Change the `competency` enum value.** Rejected. The overclaim is in the display label and in prose, not in the slug. Changing the enum would touch the content schema, ADR-012, existing frontmatter, and route generation to fix a wording problem.

**Keep the label and soften the case study instead.** Rejected, and it is the alternative worth naming explicitly. It inverts the rule the site is built on: where a document and its artifact disagree, the artifact wins. Adjusting the evidence to preserve the claim is the exact failure this project exists to argue against.

**Feature a different case study on the homepage.** Rejected. `HOMEPAGE_NARRATIVE.md` §4 features this project because it is public and presented at full depth, and both reasons survive intact. Only the word "framework" fails.

**Leave `FOUNDATION.md` §9 alone and add a correction note elsewhere.** Rejected. The freeze exists to prevent redesign-by-drift, not to preserve errors. `ROADMAP.md` §6 already classifies factual corrections as bug fixes, and a frozen document that states something the repository disproves is worse than an edited one.

### Consequences

- The homepage stops rendering a claim that the case study immediately refutes. This was visible above the fold.
- **The case study is stronger for it.** The evidence it can actually show — isolation that fails closed, admission control that refuses to partially execute, OpenTelemetry-shaped tracing — is infrastructure engineering, and it is verifiable. The framework claim was the only part a reader could disprove in under a minute.
- **A precedent, and a gap.** Claims in frozen documents about *external* repositories are only as current as the last time they were checked against those repositories. This is the first such correction. `FOUNDATION.md` §9's descriptions of NovaMind AI and the Edge10 platform have **not** been verified against their sources, and should be before either case study is written.
- ADR-012's non-competition rule is unaffected. Infrastructure engineering remains distinct from product engineering and from enterprise engineering; only the sub-claim about extension points is withdrawn.
- `README.md` still says "14 ADRs" and "`ADR-001 – ADR-014`". That was already stale before this record and is now stale by five. Noted here; not fixed by this record, since `README.md` is outside the freeze register and can be corrected directly.

---

<a id="adr-020"></a>
## ADR-020 — The home page argues by demonstration, not by description

**Status:** Accepted · 2026-08-06 · Amends `FOUNDATION.md` §5, `HOMEPAGE_NARRATIVE.md` §4–§5, `TOKENS.md` §3.2 and §4.5

### Context

Version 1 of `/` shipped at the end of Phase 5 and was, by the measures this project had set itself, correct. Six bands in the objection sequence from `FOUNDATION.md` §3. The positioning sentence verbatim in the primary position, per §5. Every band a `Stack` of `Text` inside one `Container`, every value from a token, every heading at the right level, 100 on the accessibility audit.

It was also flat, and the reason is structural rather than cosmetic.

**Every band made its argument by asserting it in prose.** The claim "I design systems rather than write code" was a paragraph saying so. The claim "verification is the scarce part" was a sentence saying so. A reader is asked to accept six assertions from a stranger, and the only evidence offered is that the assertions are well written. That is the exact rhetorical position ADR-013 says this portfolio should not occupy: it demonstrates writing ability and asks for engineering ability to be inferred.

**Every band also looked identical.** Six `Stack gap={6}` blocks in one column produce a document. Nothing in peripheral vision tells a reader they have crossed from one idea into another, so scrolling reads as continuing a page rather than as progressing through an argument, and there is no reason at any point to keep going.

And the `<h1>` was `POSITIONING` — "AI-Native Full-Stack Engineer designing reliable software systems through architecture, orchestration, and verification." That sentence names a category and lists three disciplines. It is precisely the right sentence for a `<meta name="description">`, where a machine is matching terms, and precisely the wrong one for the first three seconds of a human visit, where a category is not a claim and a list is not remembered.

### Decision

**The home page presents systems the reader can explore, in place of paragraphs describing them. Seven bands, each with its own surface, its own number, and its own visual form.**

Four changes carry it:

1. **The `<h1>` becomes `THESIS`** — "I build AI systems that survive production." A claim that can be wrong, which is what makes the evidence below it worth reading. `POSITIONING` is unchanged, remains the document description, and remains on the page verbatim as the line directly beneath. This amends `FOUNDATION.md` §5's *position* requirement; it does not touch §5's identity requirement, which is that the sentence is defined once and never paraphrased.
2. **Bands 2, 3 and 4 become explorable diagrams** — a seven-stage lifecycle rail, a six-layer architecture explorer, a seven-stage retrieval pipeline. Each is a WAI-ARIA tablist over a data model in `src/content/home.ts`, each server-renders every stage, and script only adds the ability to move between them.
3. **The band becomes a component** (`components/layout/Band.tsx`) owning surface, numbering, and section rhythm — so a section boundary is visible before it is read, and band spacing cannot drift band by band.
4. **A ninth type step and a mono annotation token** (`type-hero` at step 900; `type-mono`) give the page two voices: the display serif for statements a person makes, mono for labels a system emits. That pairing is the whole visual argument, and it is why the site does not need decoration to look like engineering.

Band 5 is new and deliberately slim: the six-section structure names two projects, the site has four case studies, and two of them appeared in no other band.

**Every number in `src/content/home.ts` is checkable against a case study**, and the file cites the source above each block. The chunk size, the embedding dimensions, the ten-to-five narrowing, the six agent names — all are stated in `content/case-studies/`. A diagram that flatters the architecture would be the worst artefact on the site, because it is the one a reader assumes was drawn from the code.

### Alternatives considered

**Keep V1 and improve its typography and spacing.** Rejected, and this was the owner's explicit instruction, but it is worth recording why the instruction was right. V1's problem was not that the paragraphs were badly set. It was that they were paragraphs. Better spacing on an assertion leaves an assertion.

**Use an animation library and a richer visual vocabulary.** Rejected — see ADR-021. Every effect specified was achievable in CSS and SVG at ~9 KB of client JavaScript, against roughly 40 KB for the library alone. ADR-006 makes the budget precede the effect, and a portfolio whose thesis is production discipline cannot exceed its own budget for decoration.

**Draw the architecture as a static image.** Rejected. An image is not checkable, cannot be read by assistive technology beyond its alt text, cannot be kept in sync with the case study by review, and would have to be re-exported by hand every time a fact changed. A data model in TypeScript is reviewable in a diff.

**Present all four case studies as equal explorable systems.** Rejected. That is the menu that featuring exists to avoid (`HOMEPAGE_NARRATIVE.md` §4). Two systems at full depth and the rest as a quiet index is a stronger claim than four at half depth.

**Leave `FOUNDATION.md` §5 alone and open with `POSITIONING`.** Rejected. §5's purpose is to stop the positioning sentence drifting across surfaces, and it still does that — the sentence is still defined once and still rendered verbatim here. What §5 additionally fixed was its screen position, and that was a layout decision recorded inside a content document.

### Consequences

- **The band structure is no longer frozen at six.** `HOMEPAGE_NARRATIVE.md` §5 said it was. That freeze existed to stop bands accumulating by drift, and this record replaces it with a stronger constraint: a band must produce a belief no other band produces, and it must justify its form. Band 5 is the test case, and it is the quietest band on the page for exactly that reason.
- **The page now ships client JavaScript it did not before** — 5.0 KB route-specific, 112 KB first load against the 120 KB budget. Nine percent headroom is the tightest this project has run. The next feature that wants client JavaScript on `/` will have to displace something, which is what a budget is for.
- **`tests/quality/homepage.spec.ts` was rewritten.** The band contract it asserted is gone. What it asserts now is what did not change: the objection sequence, the positioning sentence's presence, the absence of any call to action, and — new — that every diagram renders in full without JavaScript.
- **Content and presentation are now coupled in one direction.** `src/content/home.ts` restates facts that live in MDX case studies. There is no mechanism that catches divergence; the file says so, and it is reviewed when a case study changes. This is a real gap and it is the most likely source of a future factual error on this site.
- Three documents are amended by this record rather than superseded: `FOUNDATION.md` §5 (position only), `HOMEPAGE_NARRATIVE.md` §4–§5 (band count and band form), `TOKENS.md` §3.2 and §4.5 (step 900, `type-hero`, `type-mono`, `color-grid-line`, `color-flow`).

---

<a id="adr-021"></a>
## ADR-021 — Ambient system motion is a second motion system, bounded separately

**Status:** Superseded by ADR-023 · 2026-08-06 · Amends `ARCHITECTURE.md` §9, `MOTION.md`

### Context

`ARCHITECTURE.md` §9 prohibits outright "any animation exceeding 400 ms," and ADR-011 froze the motion scale at four durations. ADR-018 removed the animation library after measuring it at 95× the cost of the behaviour it provided.

ADR-020 needs a request to visibly traverse an architecture diagram. There is no honest way to do that inside 400 ms: a pulse crossing six nodes in under half a second reads as a flicker, not as a journey, and the duration is not incidental to the effect — it *is* the effect. The alternative is a static diagram, which loses the one thing that distinguishes an architecture drawing on a portfolio from an architecture drawing in a README.

The prohibition is nonetheless correct for everything it was written about. §9's three sanctioned purposes — orienting to new content, confirming an interaction, establishing continuity — are all cases where a reader is *waiting* for the animation before they can read or act. A 2.6-second transition in any of them is a 2.6-second delay.

So the conflict is not between the rule and the feature. It is that one rule is covering two different things.

### Decision

**Motion is two systems with separate budgets, and they are kept separate in code, not merely in prose.**

| System | Token export | Bound | Character |
|---|---|---|---|
| Interface motion | `duration`, `easing`, `stagger` | ≤ 400 ms, ADR-011 | The reader is waiting on it |
| Ambient system motion | `flow` | 2.6 s / 4.4 s cycles | The reader is never waiting on it |

Admission to the ambient system requires all four:

1. It depicts a process that the diagram is *about*. It is not applied to interface chrome.
2. It is continuous and non-blocking. No content is unreadable, and no control is unusable, at any point in the cycle.
3. It is removable without loss. Every diagram renders its full topology and every label with animation removed — the moving dash is drawn *over* a static edge that is always present.
4. It is compositor-cheap and library-free. `stroke-dashoffset` and `opacity` on a handful of SVG paths.

The separation is enforced rather than documented: `flow` is a distinct export, `tests/unit/tokens.test.ts` asserts that `duration` still holds exactly four values none of which exceeds 400 ms, and that every `flow` cycle exceeds it. Merging the two — the obvious future "tidy-up" — fails the suite.

`src/styles/systems.css` is the second exception this project grants to "no component styling in the global stylesheet," and it is granted for the same reason as the first: `@keyframes`, SVG paint properties, and dash geometry have no Tailwind expression and no per-component home.

### Alternatives considered

**Raise §9's ceiling to cover both.** Rejected, and it is the tempting one. It would take one number and no new concepts — and it would license a 2.6-second hover state, a 2.6-second page transition, and a 2.6-second entrance reveal, none of which anyone decided to allow. A ceiling raised to accommodate a case it was not written for stops constraining the cases it *was* written for.

**Add `duration.ambient` alongside the existing four.** Rejected for the same reason in smaller form. It puts a value in the scale that §9's own sentence forbids, so the rule and the scale contradict each other in the same repository.

**Adopt an animation library now that there is a real consumer.** Rejected. ADR-018's arithmetic did not change: the total client cost of all three explorable diagrams plus every flow animation is about 9 KB gzipped. The library alone is roughly four times that, and `/` is already the worst route against a budget that ADR-006 does not permit raising for a visual effect.

**Draw static diagrams and drop the motion.** Rejected, but it is the honest fallback and it is exactly what reduced-motion readers get. Constraint 3 exists to guarantee that path is not a degraded experience but a complete one.

### Consequences

- **Reduced motion removes ambient flow entirely, and this is verified, not assumed.** `globals.css` sets `animation: none` globally under `prefers-reduced-motion`, and `progressive-enhancement.spec.ts` already asserts across every route that no element has a running animation in that mode. The new diagrams came under that gate without a line of new test code.
- **There are now two motion systems to learn**, and a contributor can pick the wrong one. The mitigation is that picking wrong is visible: `flow.cycle` on a hover state is a 2.6-second hover.
- **`flow.origin` exists solely so that a zero delay is a token.** It looks like over-engineering and it is deliberate: `check-tokens.mjs` rejects a bare duration in CSS, and an exemption for "it is only zero" is how a scale starts leaking.
- The `flow` cycle values are chosen, not measured. There is no user research behind 2.6 seconds; it is the value at which a pulse crossing the hero topology reads as deliberate rather than as either urgent or stalled, judged by looking at it.

---

<a id="adr-022"></a>
## ADR-022 — The home page reports measurements, and prints what it cannot measure

**Status:** Superseded by ADR-023 · 2026-08-06 · Supersedes the band structure of ADR-020; amends `HOMEPAGE_NARRATIVE.md` §4–§5

### Context

Version 2 shipped a home page that was, by every gate this project owns, correct: seven bands in the objection sequence, 100 on accessibility, inside every budget, explorable diagrams with full keyboard support and a complete no-JavaScript path.

It was also ordinary, and the owner's reaction — *"this is well designed"* rather than *"this engineer builds world-class AI systems"* — identified the failure precisely. Four things were wrong, and none of them was a defect any gate could have caught.

**The diagrams illustrated systems rather than measuring them.** The hero drew OrchestAI's topology with a pulse looping along its edges. Nothing was flowing; the pulse was an animation. A tasteful architecture drawing is reproducible in an afternoon and is evidence of nothing, which puts it in the same category as the gradient blobs the visual language exists to avoid — better executed, equally unfalsifiable.

**The page argued that verification is the scarce skill and showed no verification.** The thesis is *systems that survive production*. V2 wrote `npm run ci` in a lifecycle stage and stopped. Meanwhile the most credible artefact this project owns — a site with hard budgets that actually block merges, 170 checks, a token pipeline, and 21 decision records, all currently green — appeared nowhere on it.

**Every interaction was a tablist.** Three of them. Click a thing, a paragraph swaps. That is the lowest-information interaction that exists: it reveals prose, it does not teach a relationship, and it was reaching for interactivity rather than for meaning.

**Nothing on the page required AI engineering to have built**, and nothing showed judgement about *not* using AI — which is the rarest signal in this market and the one the material already supported.

### Decision

**The home page reports measurements of itself, teaches the notation those measurements are in, and applies that notation to two real systems. Then it prints what it cannot measure, and what it refused to build.**

Five bands, each producing a belief no other band produces:

| Band | Produces | Mechanism |
|---|---|---|
| 1 Hero | This person instruments things — and I just watched it | Live span waterfall of the reader's own page load, from the Performance API |
| 2 Verification | Everything here is checkable | Budgets, gates and scores from the build, re-verified every CI run — then what none of it reaches |
| 3 Systems | They build real systems, and I can read them | OrchestAI and NovaMind in the notation band 1 taught |
| 4 Failure | They think about production, not demos | Failure modes, containment mechanisms, and a map that dims when nothing contains one |
| 5 Judgement | They know when the AI-shaped answer is wrong | Six refusals, each with its cost stated |

Three things carry it, and each is a rule rather than a component.

**1. Numbers on this page are produced by a tool and verified by CI.** `scripts/measure.mjs` reads the build output and writes `src/content/measured.json`; `scripts/check-measured.mjs` recomputes everything on every CI run and fails on any drift. Nothing is typed by hand. A portfolio that states figures which were true once is worse than one that states none.

**2. One notation, and it is honest about which axis it is on.** The same `Trace` component renders all three waterfalls. The hero's bars are milliseconds. The two system traces encode *span containment*, and their axis caption says so, because neither system has production traffic and a latency column on either would be the one fabricated number on a page whose whole argument is that its numbers are checkable. The contrast between the two — real milliseconds two screens above, an explicit refusal below — is a stronger demonstration of where the line sits than any statement about integrity would be.

**3. The unflattering material is load-bearing, and it is protected by tests.** `NOT_VERIFIED` sits directly beneath four green gauges. One failure mode has an empty `enforcedBy` and dims the whole containment map. Every refusal states what it cost, including nine days rebuilding a solved problem and a system shipped with no automated tests. `tests/quality/homepage.spec.ts` asserts each of these, because softening them would break no build, fail no lint, and look like an improvement in review.

Two V2 bands are gone. The lifecycle merged into band 2, where the method now arrives with its output attached. The philosophy quotes were deleted: band 5 demonstrates the same positions at a stated cost, and a principle that is visibly expensive is worth more than one that is well phrased.

### Alternatives considered

**Iterate on V2 — better typography, richer diagrams, more motion.** Rejected, and the owner ruled it out explicitly, but the reason stands on its own: V2's problem was not that its assertions were badly set. It was that they were assertions. No amount of typographic care converts a claim into evidence.

**Use an animation library, as requested, to make the page feel richer.** Declined for the third time, and the arithmetic is now on the page: `/` renders at 110.1 KB against a 120 KB first-load budget, 8% headroom. The library alone is roughly four times the total client cost of every interaction here. More to the point, nothing in this design needed it — the trace bars are `scaleX`, the containment highlight is a class, and the honest place to spend the remaining budget was the instrumentation. A portfolio arguing that budgets are not negotiable cannot exceed its own for a tween library, and the refusal is now band 5, entry 5.

**Fabricate plausible latencies for the system traces.** Rejected, and it is worth recording that it was considered, because a duration column would make those two diagrams unambiguously better-looking. It would also be the only unverifiable number on the page, in the section a reader is most likely to check against the repository.

**Show live figures without a stale-check.** Rejected. Recorded measurements with no verification are claims with a timestamp. `check:measured` is what converts them back into measurements.

**Keep the philosophy band as well.** Rejected under the page's own rule: it produced no belief that band 5 does not produce better, and two bands making the same argument is a signal that one of them is decoration.

### Consequences

- **`/` is now the tightest route in the project**: 110.1 KB against 120 KB, and the framework runtime sits at 4% headroom. The next feature wanting client JavaScript on this page has to displace something. That is a budget working, and it is visible to the reader, which is the point.
- **`measured.json` cannot be edited by hand without CI failing**, which is the property that makes the numbers worth printing. It also means `npm run measure` must be re-run and committed after any change that moves the bundle — a real workflow cost, and the correct one.
- **A circularity had to be designed out.** The page renders its own first-load JavaScript size. Importing `measured.json` into a client component would ship the figures inside the chunk they describe, so re-measuring would change the number that changes the number. The recorded values are read on the server and passed down; `npm run measure` now converges on the first run, which was verified by running it twice against the same build.
- **The editorial tests are unusual and deliberate.** Asserting that a page still admits NovaMind has no test suite is not a normal use of a test suite. It is the only mechanism that makes the admission durable, and ADR-019 established that this project's characteristic failure is description drifting away from truth.
- **A latent defect surfaced while building this and is fixed here.** `Text` composed its size class as `` `text-type-${token}` ``, which Tailwind's extractor cannot see, so nine of fourteen type utilities were never generated. It was invisible because `globals.css` styles `h1`–`h4` as elements: headings resolved correctly through the element rule, while `lede`, `display`, and any heading token on a non-heading element silently rendered at body size. `src/design/typeClasses.ts` maps every token to a complete literal and `tests/unit/tokens.test.ts` asserts the map stays exhaustive. **V1 and V2 both shipped with this bug**, which is a direct instance of the failure mode ADR-019 named: nothing checked the artefact against its specification until someone measured it.
- **The page is longer than V2 and reading it takes real effort.** That is accepted rather than mitigated. The audience this page is written for reads a failure-mode table carefully or not at all, and shortening band 4 to save a screen would remove the reason they stayed.

---

<a id="adr-023"></a>
## ADR-023 — The home page is one idea in two hundred words

**Status:** Accepted · 2026-08-06 · Supersedes ADR-020, ADR-021 and ADR-022; supersedes `HOMEPAGE_NARRATIVE.md` §4–§5

### Context

Three redesigns in one day, each of which passed every gate this project owns and none of which produced the reaction it was built for.

V1 was six prose bands. V2 replaced them with explorable diagrams. V3 replaced those with live instrumentation, a measurement pipeline, and a CI step proving the numbers were still true. Each was a genuine improvement on the last, each was correct, and the owner's reaction to V3 — *"this is well designed"* rather than *"this engineer builds world-class AI systems"* — was the same reaction V2 had produced.

**The number that ended the argument: V3 rendered 1,914 words across 11,926 pixels — thirteen screens.** At 250 words per minute that is an eight-minute read. The audience it was written for spends forty-five seconds, so roughly nine per cent of the page was ever seen, and which nine per cent was determined by scroll position rather than by importance.

**The pattern across all three versions was mine, and it is worth naming precisely.** Every iteration added a *system* — a token architecture, then a diagram engine, then a measurement pipeline — because that is the kind of work I am good at, and because each one was defensible on its own terms. Rigour was repeatedly mistaken for taste. The tell was visible inside V3 before anyone said anything: its strongest section, *What I didn't build*, was the only one with no visualisation in it.

**And the strategic error underneath the aesthetic one:** the home page was trying to *be* the evidence. The evidence already exists — 8,800 words of case studies, one click away, written properly. V3 was competing with its own best content and losing, then charging the reader eight minutes for the privilege.

### Decision

**The home page carries one idea, in six screens and roughly two hundred words.**

> **Good systems are defined by what they refuse.**

Every screen is an instance of that sentence rather than a separate subject, which is what makes the page an argument instead of a table of contents:

| Screen | Belief | How it is an instance of the idea |
|---|---|---|
| 1 Hero | This person builds production AI systems | The page is fast because things were refused — one line says so |
| 2 Method | There is a repeatable way of working here | *Verification that blocks the merge* — a gate that says no |
| 3 OrchestAI | This system is elegant | Every run that can be rejected is rejected before any model is called |
| 4 NovaMind | This pipeline is beautifully designed | Ten candidates discarded to five before the model sees anything |
| 5 Refusals | This person has judgement, including about AI | Four things not built, one of them a failure |
| 6 Connect | I know what to do if I want to act | — |

The idea is stated outright exactly once, as the last line of screen 5, after four demonstrations of it. Stating it in the hero was tried and abandoned: an idea asserted before its evidence is a slogan, and the same sentence after its evidence is a thesis.

**Three rules follow, and they are what actually constrain future changes.**

**1. One screen, one belief.** If a screen needs three diagrams, five paragraphs or eight labels to land its belief, the belief is wrong or the screen is two screens. Asserted as a section count in CI.

**2. A visualisation must be faster than the sentence it replaces.** `10 → 5 → 1` at display size communicates NovaMind's pipeline faster than the six-row waterfall it replaced could be read, so it stays. OrchestAI has no figure, because its idea is a sentence and a diagram of it would be slower. This is the test every deleted component failed.

**3. The word count is a budget.** 340 words, enforced in CI alongside the byte budgets. This is the mechanism the project did not have and needed most: nothing in types, lint, bundle size, axe or Lighthouse has any opinion about length, so all of them stayed green across thirteen screens while the page failed at its actual job. Each addition was individually reasonable. A budget is what makes the aggregate someone's problem.

### Alternatives considered

**Keep V3 and trim it.** Rejected. The problem was not that V3 was long — it was that its form was wrong. A shorter dashboard is still a dashboard, and trimming would have preserved the components whose existence was the error.

**Keep the live trace waterfall, just smaller.** Rejected, and this was the closest call. The page-load trace was the single most original thing built in three versions. But eight rows of spans, bars and durations made an unusual idea read as *look what I measured*, which is the exact register the redesign existed to escape. The fact survives at full strength in eleven words; only its volume changed.

**Keep the failure-mode screen.** Rejected, and it is the loss that costs most. It was the section a staff engineer would read first. Its bravest sentence — *the description drifted away from the software, and nothing catches it* — is retained as one line in screen 5; the full treatment already exists in the OrchestAI case study, which is where a reader who wants it has already chosen to be.

**Go further: three screens, ninety words.** Rejected. The refusals are the rarest signal on the site and would have been the casualty, and neither system would have had room for its idea. Six screens is the point where every remaining screen still earns its place.

**Use an animation library, as requested for the fourth time.** Declined, and it is now on the page rather than in a footnote: screen 5, entry 3. The page carries 906 bytes of route JavaScript. The library is roughly forty times that, for behaviour this page does not have.

### Consequences

- **2,305 lines of working, tested, documented code were deleted**: the trace renderer, the live waterfall, the budget gauges, the failure matrix, the node-graph engine, the roving-tabs hook, four section components, and `systems.css`. All of it functioned. None of it was necessary, and the deletion is the decision.
- **Route JavaScript fell from 5.63 kB to 906 B; first load from 110.2 KB to 105.4 KB.** The page-load footnote is the only client component left.
- **ADR-021 is superseded and its motion system withdrawn.** The ambient `flow` tokens had exactly one consumer — animated diagrams — and the diagrams are gone. Retaining them "in case" would contradict TYPOGRAPHY.md §12's own rule, which this project applied to a font axis and should apply to itself. `color-flow` and `color-grid-line` are withdrawn for the same reason.
- **ADR-022's measurement pipeline survives, and only one number from it reaches the page.** `measure` and `check:measured` still run in CI, still fail on drift, and the home page renders a single figure from them. That ratio — an entire verification pipeline behind one sentence — is the right one, and it took writing the wrong version to see it.
- **The word budget will be inconvenient**, which is the point. The next genuinely good idea for this page will have to displace something rather than be appended, and appending is precisely how the page reached thirteen screens without any individual change ever looking wrong.
- **Four versions in one day is not a process to be proud of.** The first three were each defensible and each wrong in the same way, and what corrected it was not a gate — it was being told the page felt like documentation. This project's characteristic failure, named in ADR-019, is description drifting from reality; the equivalent here is *effort drifting from effect*, and nothing in CI can see it.

---

<a id="adr-024"></a>
## ADR-024 — Art direction pass: the home page is finished as a composition

**Status:** Accepted · 2026-08-06 · Amends `FOUNDATION.md` §5, `TOKENS.md` §3.2 and §4.6, `ICONOGRAPHY.md` §3, `COMPONENT_GUIDELINES.md` §3.3

### Context

ADR-023 settled what the home page says and how long it is: one idea, six screens, under three hundred words. That decision was about structure, and structure is where the previous three versions had gone wrong.

What it did not do was look at the page as a *composition*. A page can be correctly structured, correctly budgeted, and still read as a set of components that happen to be stacked — and reviewing V4 against the work it is meant to sit beside surfaced a list of specific, unglamorous defects, none of which any gate can see:

- The opening statement at 80 px ran nearly the full width of a 1440 px viewport. It was the only thing on the screen and it looked like it knew it: heavy rather than confident.
- The line beneath it was `POSITIONING` — a category description, doing the one job a subtitle must not do, which is restate the headline in duller words.
- The evidence line read "Nothing reaches `main` until N checks pass", with the branch name set at 14.5 px against 22.5 px of surrounding lede. At that ratio an inline technical term stops reading as a change of voice and starts reading as a stylesheet that failed to load.
- Section rhythm at 192 px between screens had passed the point where a gap reads as deliberate and become a gap that reads as empty.
- The primary control was a default-shaped button: 4 px radius, tight padding, no indication of direction.
- Navigation put "Work" next to "Workflow" — two items sharing a stem, so the eye had to read both to tell them apart.
- The footer restated the contact screen it sat directly beneath, heading and all.

### Decision

**Sixteen changes, none of which alters the structure ADR-023 fixed.** The ones that carry a principle:

**1. The opening statement drops from 80 px to 66 px, gains `text-balance`, and is held at prose width.** Size was only part of it — most of what made 80 px feel heavy was measure. Balanced and constrained, the statement sets in two near-equal lines and reads as a shape rather than as a paragraph that wrapped.

**2. `POSITIONING` leaves the hero and stays in the metadata.** It is replaced by `VOICE`: *"I care more about what a system does when it fails than what it does when it works."* This amends `FOUNDATION.md` §5 for the third time, and the amendment is narrower than it looks — §5 exists to stop the canonical sentence being *paraphrased* across surfaces, and it still is not. It is defined once, used verbatim, and now sits where a category description belongs: the `<meta name="description">` a search engine reads. What replaced it is the only sentence on the page written in a human voice, which is the correct number.

**3. Every remaining number and label was reviewed as typography, not as content.** Section rhythm down ~17% at every step. The two systems' metadata shortened until each sets on one line — the OrchestAI string had been breaking inside ".NET 8", splitting a version number across two lines. Refusal rows widened to 5/7 so no subject wraps, and set to share a first baseline across the serif and the sans. The closing line balanced so it no longer ends on a two-word orphan.

**4. `10 → 5 → 1` splits its colour.** Numerals in the primary text colour, arrows in the tertiary. Set uniformly it read as a string of characters; split, the eye lands on the three numbers and the arrows fall back to punctuation. That is the difference between a line of text and a diagram, and it cost one `map`.

**5. The action control becomes a designed one.** Radius to 2 px so it belongs to the same family as every hairline on the page; padding to 24 px; and a trailing arrow that moves 4 px on hover. That arrow is the only motion on the page and it is directional rather than decorative — it points where the control goes. Under reduced motion the global rule narrows `transition-property` to colour and the arrow arrives instantly, which is the correct degradation and is free.

**6. Two navigation labels change; no routes do.** "Workflow" becomes "Method", because four items of navigation must never require reading two of them to tell them apart. "Connect" becomes "Contact", because that is the word people look for — ADR-014 decided the route should exist, not what to call it.

**7. The footer stops being the contact section a second time.** It is now one row: wordmark, four marks, the year. It still satisfies `ARCHITECTURE.md` §4 — no route is a dead end — at the weight a footer should carry.

**8. Brand marks are the one exception to `ICONOGRAPHY.md` §3.** GitHub's and LinkedIn's marks drawn at 1.5 stroke with no fill are outlines nobody recognises, which is the single failure an icon cannot survive. They are reproductions of someone else's mark and their recognisability *is* their meaning, so they are drawn filled, on the same 24 grid, in the same `currentColor`. Every icon link keeps a visually-hidden label — §6 is unchanged, and an icon still never carries meaning alone.

### Alternatives considered

**Leave the hero at 80 px and fix only the measure.** Rejected, but it was close, and constraining the measure did most of the work. 66 px is the size at which the statement stops competing with itself for the reader's attention while remaining 1.5× the largest heading beneath it.

**Keep `POSITIONING` in the hero and add the human sentence as a third line.** Rejected. Three lines under a headline is a paragraph, and the category line was the one contributing least. Adding rather than replacing is the exact instinct that produced V3.

**Set the branch name larger instead of removing it.** Rejected. Raising `type-code` to fix one sentence changes every inline code span on the site, including the case studies, to solve a problem that exists in one place. "Merges" carries the same fact, needs no second typeface, and is a word shorter.

**Draw GitHub and LinkedIn in the house stroke grammar.** Rejected — see above. Consistency that destroys recognition is not consistency.

**Add a second micro-interaction somewhere.** Rejected. One directional arrow is the whole motion budget of this page, and a second would make the first ordinary.

### Consequences

- **The page is 251 words across 4.7 screens**, from 274 across 5.6. Nothing was cut for length; the reduction is entirely tightened sentences and tightened rhythm.
- **`text-balance` is now load-bearing in three places** — the statement, the hero subtitle, and the closing line. It is well supported and degrades to normal wrapping, but it is a rendering behaviour rather than a layout we control, and a browser without it will set those lines less elegantly rather than incorrectly.
- **`FOUNDATION.md` §5 has now been amended three times** (ADR-020, ADR-022, this record). The sentence has never been paraphrased and never appeared twice, which is what §5 actually protects. That the *position* has moved three times suggests §5 was specifying layout inside a content document, and a future revision should probably say so.
- **The icon set is at ten of a documented maximum of fifteen**, and two of them are not ours. That exception should not be extended: a third brand mark would mean the footer is turning into a social bar.
- **Nothing here was verifiable by a gate**, and that is the honest summary of this record. Every defect it fixes was visible only by looking at the page beside the work it wants to be compared to. The word budget from ADR-023 catches length; nothing catches *heavy*.

---

<a id="adr-025"></a>
## ADR-025 — Final polish: the headline is measured, and outbound links open away

**Status:** Accepted · 2026-08-06 · Amends `TOKENS.md` §3.2 and §4.5 · **Reverses `INTERACTION.md` §6**

### Context

ADR-024 art-directed the page. This record covers the pass after it, which was a section-by-section review against a specific list rather than a redesign — and two items on that list turned out to be decisions rather than adjustments.

**The headline.** It set on two lines at 66 px, and two lines is one line too many for a statement of forty-three characters. The instruction was to reduce it 5–8% and fit it on one line, and those two things are not compatible: the string needs 1120 px at 66 px against a content column of 1024 px, so a 5–8% reduction lands at 60–61 px and still needs 1018–1035 px. Fitting is not the same as fitting well.

**Outbound links.** `INTERACTION.md` §6 held that opening in a new tab is the reader's decision, not the author's. That is the correct default for a document a reader moves through, and it is the wrong default for the links this site has.

### Decision

**The headline anchor is 58 px, and the number was measured.** At 58 the statement occupies 984 px of a 1024 px column, leaving 40 px either side — the difference between a line that fits and a line that is wedged. The fluid clamp keeps it on one line down to roughly 1000 px of viewport, because the size and the column shrink together; below that it wraps, and should.

**Outbound links open in a new tab, with `rel="noopener noreferrer"`, announced.** Every external link on this site is a repository, a profile, or a résumé — a *reference*, opened while reading rather than instead of it. §6's principle is sound and its application here was wrong.

`noopener` is the part that matters: without it the opened document holds a live `window.opener` handle back into this one. Browsers imply it for `target="_blank"` now, and a security property that depends on the browser being current is not a property, so both tokens are written out and `tests/quality/shell.spec.ts` asserts them on every outbound link on every route.

**The rest of the pass, briefly.** `type-mono` moves from step 100 to step 200 — at 11.5 px the project metadata did not read as quiet, it read as unavailable, and a mono face is optically smaller than a sans at the same size. Project titles drop from `heading-2` to `heading-3`, because at 35 px a project name sat within nine points of the 44 px statement beside it and the two columns competed. The metadata splits into two authored lines rather than one wrapping string, which is what fixes the stranded separator. Contact columns align on their first baseline so "Available" and "BASED IN" sit on the same line. The hero closes ~54 px tighter. Refusal rows gain 16 px each.

### Alternatives considered

**Reduce the headline only 5–8%, as asked, and accept the wrap.** Rejected — the single line was the priority, and it was the right one. A statement that wraps is a sentence; a statement on one line is a statement.

**Widen the container for the hero.** Rejected. `SPACING.md` §6 allows three widths on the grounds that a fourth would mean the layout has more cases than the content does, and one headline is not a case. Reducing the type solved it without touching the layout system.

**Bring the method screen's right column 40–60 px closer, as asked.** Not done, and it is worth recording why rather than quietly leaving it. The longest clause needs 640 px at `heading-1`, which is more than seven of twelve columns hold at any gap — narrowing the heading breaks "Verification that blocks the merge." across two lines, and three clauses that each occupy one line is the entire form of that block. The grid gap came down from 48 px to 40 px, which is all the geometry has to give. Closing the remaining distance means moving the evidence line beneath the clauses, which is a layout change and was out of scope for a polish pass.

**Reduce the action control's vertical padding, as asked.** Not done. Its height is `--target-min`, 44 px, which `ACCESSIBILITY.md` §2 sets above the WCAG 2.2 floor of 24 px on the grounds that the reference device is a phone and the cost is zero. The control was made to feel more compact by closing the gap between label and arrow instead, which changes the proportion without touching the target.

**Keep `justify-between` on the contact specification rows.** Rejected. Across a 300 px column the label and its value sat 140 px apart and read as two lists rather than one block.

### Consequences

- **246 words across 4.5 screens**, from 248 across 4.7. Nothing was cut; the reduction is spacing.
- **`type-mono` grew everywhere it is used**, not only in the metadata — the hero footnote and the contact labels are larger too. Both are better for it, but that is a site-wide change made for one call site, and if a future consumer needs 11.5 px mono it will need its own token rather than a smaller `type-mono`.
- **Two items on the polish list were declined with reasons** rather than approximated. Both are geometry: one bounded by the longest clause, one by an accessibility floor. Recording them here means the next pass does not rediscover them.
- **`INTERACTION.md` §6 is reversed rather than amended**, and this is the first outright reversal of a frozen design rule on this project. The rule was not wrong in principle; it was applied to a class of link it was not written about. That distinction is worth preserving, because the principle still governs internal navigation.
- The step-900 assertion in `tests/unit/tokens.test.ts` was rewritten a third time and then replaced. It had been asserting a *ratio*, which is an art-direction value and changed with every pass; it now asserts what is actually invariant — that 900 is the top of the scale and `type-hero` is its only consumer. A test that needs editing every time the design moves was testing the design, not the system.

---

<a id="adr-026"></a>
## ADR-026 — Final proof: a missing favicon, and four things that were already right

**Status:** Accepted · 2026-08-07 · Amends `TOKENS.md` §4.5 · Adds `src/app/icon.svg`

### Context

A section-by-section proof pass over the finished home page, of the kind that happens before a launch rather than during design. The brief was explicit that anything already correct should be left alone, which makes *measuring* the point of the exercise: an art director's eye can be wrong about a three-pixel offset in either direction, and half the items on the list turned out to be correct already.

Everything below was measured in the browser — ink metrics from `canvas.measureText` for optical edges, and zero-width inline probes for true first baselines, because element bounding boxes are line boxes and not what an eye aligns to.

### Decision

**One real defect, and it was not on the list.**

**There was no favicon.** Every route requested `/favicon.ico`, received a 404, and logged a browser console error. Lighthouse counts that: `errors-in-console` was the single audit holding Best Practices at 96 rather than 100 across all ten routes, and it had been doing so since the site was built. `src/app/icon.svg` is added — the wordmark's initial, set in Georgia, which is the face declared as `Newsreader Fallback` and therefore the one a reader actually sees for the first few hundred milliseconds of a visit. A bespoke logotype would have been a design decision nobody asked for. **All four Lighthouse categories are now 100 on all ten routes.**

**Two adjustments, both measured.**

The project metadata read as detached from its title. The gap closes from 8 px to 4 px and `type-mono`'s leading comes down from 1.5 to 1.4 — the 1.5 was set when that metadata was one string that wrapped, and once it became two authored lines (ADR-025) the same value separated them into two statements instead of binding them into one block under the title. Size is unchanged at 14.5 px: the requested hierarchy is title → metadata → case study, and the next step on the scale is 18 px, which would put the metadata within four points of the 22.5 px consequence line and invert it.

Contact column alignment was wrong, and wrong in the way that is worst: `lg:items-baseline` did not propagate across two differently-structured grid children, so "Available" and "BASED IN" sat **11.45 px** apart — near enough to look intended, far enough to look missed. `lg:items-start` aligns the box tops exactly, which lands the two cap-heights within about three pixels. That is the correct trade: baseline alignment between a 35 px serif heading and a 14.5 px mono label was never going to be exact, and cap-height is what the eye reads across a 700 px gutter anyway.

### Alternatives considered

**Raise the metadata to the next type step.** Rejected — see above. Twice-requested, and the measurement is what settles it: 18 px mono against a 22.5 px consequence is not a hierarchy.

**Baseline-align the project columns.** Rejected. The two columns are top-aligned to the pixel (measured identical), and their first baselines differ by 13.4 px on OrchestAI and 27.6 px on NovaMind because the right column opens with a 44 px statement in one and a 58 px figure in the other. Baseline-aligning would fix each screen in isolation and put the two project titles at different heights relative to each other, which is the worse inconsistency.

**Force uniform refusal row heights.** Rejected. Rows measure 116, 116, 142.6 and 143.6 px; the difference is entirely whether the right-hand sentence wraps to two lines. Equalising them means padding the short rows with 27 px of nothing. The rows are already internally correct — the left and right first baselines are **exactly** 0.00 px apart in all four.

### Consequences

- **100 / 100 / 100 / 100 on every route**, from 100 / 100 / 96 / 100. The favicon was the whole of it.
- **`type-mono`'s leading changed globally** for a metadata-specific reason. It is single-line at both other call sites, so nothing else moved — but that is luck rather than design, and the token now carries a value tuned for one consumer.
- **Four of the eleven review items required no change**, and the measurements are recorded here so the next pass does not re-open them: hero optical left edge (h1 and subtitle ink differ by 0.6 px), project column top alignment (identical), refusal baselines (0.00 px), footer icon alignment (all four identical, 20 × 20).
- **The method screen's optical gutter is 73 px** from the longest clause's ink to the right column. ADR-025 recorded why it cannot close further; this records the number so the question is answerable without re-measuring.
- The page holds one line at 58 px down to laptop width, wraps at tablet and below, and reports **CLS 0 with no console output at 320, 390, 900, 1024 and 1440 px**.

---

<a id="adr-027"></a>
## ADR-027 — Pre-launch validation: three defects the gates had never been able to see

**Status:** Accepted · 2026-08-07 · Amends `ARCHITECTURE.md` §6.4 · Adds `PreBlock`

### Context

Final validation before the first production deploy. Everything was green — types, lint, format, 53 unit tests, 121 browser checks, four Lighthouse categories at 100 across ten routes — and a sweep at six viewport widths found three defects anyway. All three had shipped, and each one is instructive about a different blind spot.

### Decision

**1. `<pre>` never scrolled, and the specification said it did.**

`COMPONENT_GUIDELINES.md` §8.3 reads: *"Horizontal scroll within the block; the page never scrolls horizontally."* No `overflow` property was ever written. Two case studies pushed the document 110 px and 338 px wide at 390 px, and one pushed it at 375 px — inside the documented minimum viewport. Fixed in the base layer rather than in `CodeBlock`, because markdown emits bare `<pre>` for fenced blocks and the guarantee has to hold for all of them. `max-width: 100%` is the load-bearing half: without it a `<pre>` in a grid track sizes to its content and `overflow-x` never gets a chance to apply.

**2. `Comparison` declared a scroll region and never enabled scrolling.**

`tabIndex={0}`, `role="region"` and `aria-label` were all present — every part of making a scroll container keyboard-accessible except the part that makes it a scroll container. A three-column table cannot shrink below its content, so it widened the page instead.

**3. Fixing the first two exposed a WCAG 2.1.1 failure, and `axe` caught it immediately.**

Once every `<pre>` actually scrolled, the ones markdown produces became scrollable regions with no keyboard access — a keyboard-only reader could see content was cut off and had no way to reach it. `PreBlock` maps the native element to the same treatment `CodeBlock` already used.

This is the one native-element override in the MDX map, and §6.4's closed set is intact: an author still cannot reference `PreBlock`, and a case study reaching outside the eight enumerated components still fails to compile. What changed is how an element the author already had renders.

**Also removed:** `RevealGroup` and the `delayMs` prop that existed only to serve it. No surface has staggered a group since V2.

### Alternatives considered

**Treat the 320 px overflow as out of scope.** Tempting — `VIEWPORT_MIN` is 375 and the wireframes specify 375 as the mobile anchor. Rejected once the same table was measured overflowing by 3 px at 375 px itself. The narrow-viewport check is what surfaced a defect that existed inside the supported range.

**Convert the fenced blocks in the affected case studies to `<CodeBlock>`.** Rejected. It fixes two documents and leaves the next fenced block anyone writes with the same defect. The failure was structural.

**Add `tabIndex` without `role` and `aria-label`.** Rejected. It satisfies `axe`, and a bare `tabIndex` on non-interactive content produces a tab stop that announces nothing — `CodeBlock`'s existing comment already says why.

**Withdraw the `stagger` token now that `RevealGroup` is gone.** Deferred. It has no consumer, and ADR-023 withdrew `flow` on exactly that reasoning — but `stagger` is frozen by ADR-011 and part of the documented motion scale, so removing it is a design decision rather than cleanup. Noted in `Reveal`'s docstring so the next motion change starts from the fact.

### Consequences

- **Zero horizontal overflow and zero console output at 320, 375, 390, 768, 1024 and 1440 px**, on all ten routes. Previously four routes overflowed at 320 and two at 390.
- **All four Lighthouse categories remain 100 on all ten routes.**
- **Three defects, and none of them was invisible to tooling — they were invisible to the tooling as configured.** `axe` runs on every route and would have caught the keyboard-access failure years earlier if anything had been scrollable; the overflow checks did not exist. A viewport sweep is now part of pre-deploy validation, and it is the check that found all three.
- **Two of the three were specifications that had been written and never implemented.** Both components documented the behaviour in their own docstrings. That is a worse failure mode than an undocumented gap, because the docstring is what a reviewer reads instead of the code.

---

<a id="adr-028"></a>
## ADR-028 — `/work` adopts the home page's editorial language; the project card is withdrawn

**Status:** Accepted · 2026-08-07 · Supersedes `COMPONENT_GUIDELINES.md` §4.1 (visual treatment) · Amends `wireframes/02-work.md` §4–§6

### Context

Home V4 is the site's visual reference (ADR-023 through ADR-027). `/work` was built in Phase 5 against a specification written in Phase 3, and the audit measured the gap precisely:

| | Home V4 | `/work` before |
|---|---|---|
| Space below the header | 106 px | **0 px** — the `<h1>` sat on the header's hairline |
| Body measure | 68 ch | **90 ch**, roughly twice `TYPOGRAPHY.md` §5's cap |
| Separation between projects | — | 24 px, against 8 px *inside* each entry |

The last row is the whole problem. With entries separated by 24 px and their own six elements spaced 8 px apart, nothing told the eye where one project ended and the next began; the page read as one long column of similar-weight text.

`COMPONENT_GUIDELINES.md` §4.1 specifies the fix as a *card*: `--color-surface-raised`, a 1 px border, a two-column grid at `--bp-sm`, and a 2 px lift on hover. That specification predates the home page's editorial language, which has no cards, no borders around content, and no decorative motion.

**Two documents already pointed the other way.** `SPACING.md` §4: *"Section boundaries are marked by space, not by rules. A hairline appears between sections only where the space alone is ambiguous — which, at these values, is almost never."* And `VISUAL_LANGUAGE.md` §2.1 reserves the hairline for structure that space cannot express. A card is a stronger boundary than a hairline; if a hairline is more than the space needs, a card certainly is.

### Decision

**`/work` is laid out in the home page's language, and §4.1's visual treatment is withdrawn.**

Everything in §4.1 that was not a visual choice is kept, and each was kept for its stated reason:

- **The whole entry is one link with one accessible name.** `INTERACTION.md` §11 — three links inside an entry produce a link list full of "Read more".
- **The competency label leads**, because ADR-012 requires the competency thesis to be legible at a glance.
- **No cover image**, which would consume the above-the-fold image budget.
- **Content determines height** (`SPACING.md` §7).
- **Hover moves the title to `--color-interactive`** — the one piece of §4.1's hover state that is not motion.

What replaces the card is spacing taken from the documents rather than chosen: `SPACING.md` §5 fixes `/work` at `default` density, so the rhythm is `section-md` between entries, `section-lg` at the two major boundaries — page header to content, and the flagship set to the methodology chapter — and `section-sm` between a heading and the sub-section it introduces. Summaries move into the measure column (§6). The page opens at `pt-section-md`, which is the home page's own opening measure.

**The competency label spans both columns rather than sitting inside the left one.** Nested, it pushed the title 36 px down while the right column began immediately, so the eye reached the description before the project name — the exact inversion of the reading order `ROUTE_SPECIFICATIONS.md` §1 specifies. Spanning, it reads as what §1 calls it: a label over a section.

**All four entries render identically**, per §1: *"a reader who came to compare needs comparable presentation."* The methodology study differs only in heading level, which `ACCESSIBILITY.md` §8 permits — level is a structural claim and size is not.

### Alternatives considered

**Implement §4.1 as written.** Rejected, and this is the substance of the record. It would have produced a page that looks like it was designed before the home page — which is exactly what the audit found, and exactly what this pass was asked to fix. A specification is superseded by a later decision, not by being ignored; hence this record rather than a silent departure.

**Keep §4.1's two-column card grid at `--bp-sm`.** Rejected. A grid of cards is a comparison-by-scanning layout; the home page's language is comparison-by-reading, one subject at a time. Single column also means the entries stack identically at every width, so there is no breakpoint at which the layout has to be re-judged.

**Separate entries with hairlines rather than space.** Rejected on `SPACING.md` §4 — space is the default and a rule is the exception, and at 106 px the boundary is not ambiguous.

**Make the continue affordance a real action link, matching the home page's bordered control.** Rejected. It would be a second focusable element inside a link, which is both invalid and the precise failure §4.1 and `INTERACTION.md` §11 describe. It carries the home page's wording and glyph without pretending to be a separate target.

### Consequences

- **Measured against Home V4, the two pages now agree exactly** on space below the header (106 px), section heading size (35 px), lede size (22.5 px) and content left edge (208 px). The `<h1>` differs by design: `type-hero` has one consumer, and ADR-020 gave it to the home page's opening statement.
- **The page grew from 1.7 screens to 2.5** on the same content. No copy changed.
- **`COMPONENT_GUIDELINES.md` §4.1 and `wireframes/02-work.md` now describe a component that does not exist.** They are amended rather than deleted, in this project's convention — the wireframe's ASCII layouts are the record of what the argument above is arguing against.
- **§5.1 lifecycle badges and §5.2 stack tags are unused by this page** and were not implemented. Both are chip treatments in the same family as the card; if another surface needs them, that surface should decide, not inherit.
- **Zero overflow and CLS 0 at 320–1440 px**, console clean, Lighthouse 100/100/100/100 on `/work` and on all ten routes.

---

<a id="adr-029"></a>
## ADR-029 — `/workflow` is set as an article; two components leave it

**Status:** Accepted · 2026-08-07 · Amends `wireframes/04-workflow.md` §7 · Extends ADR-028 to `COMPONENT_GUIDELINES.md` §4.2

### Context

`/workflow` carried the strongest content on the site and the weakest presentation of it: 1,127 words at 90 characters per line, opening flush against the header's hairline, with six sections separated by the same 80 px used inside them.

**Two of those were straightforward failures to implement the contract.** Wireframe §6 states `⟨--container-prose 68ch for all remaining sections⟩` over *Each stage*, *How I know it is correct*, *Where this breaks down* and *See it in practice*. The page ran every one of them at `container-wide`. `TYPOGRAPHY.md` §5 calls measure "the largest single lever on reading comfort" and caps it at 68; four dense paragraphs at 90 is exactly the case it describes, where "the return sweep becomes unreliable and readers lose their line". Top padding was absent for the same reason it was absent everywhere before ADR-028 — nothing had ever set it.

**The third was invisible and worse.** `Callout` renders `<aside data-variant="caution">` with a paragraph label, and **no stylesheet has ever targeted `data-variant`**. The three failure modes — the section wireframe §9 calls pivotal, the one a collaborator is actually reading for — were visually indistinguishable from body text, and their names did not read as headings at all. The component has been shipping unstyled since it was written.

### Decision

**The page is set as a long-form article.** Prose measure on the four sections the wireframe names; `pt-section-md` to open, matching the home page and `/work`; `section-md` between every section, per `SPACING.md` §5, which fixes `/workflow` at `default` density.

**One rhythm, two values, both the home page's.** Twenty-four pixels from a heading to what it introduces, forty from that content to the sentence or action closing it. The page previously used three different heading-to-content gaps — 24, 32 and 40 — with nothing distinguishing them. Forty now means one thing only: an `<h2>` introducing a run of `<h3>` sub-blocks.

**The failure modes become three `<h3>` sub-sections.** Wireframe §7 maps them to `Callout`; that mapping is amended. §9's rationale is that the section is "three explicit callouts rather than a paragraph" — the argument is about the three being *separately named*, and a real heading does that where an unstyled paragraph label does not. The heading level is correct here (`h3` under `h2`), which is the level-skip `Callout`'s own docstring exists to avoid inside MDX.

**The ownership split loses the generic card**, extending ADR-028's reasoning one component further. `COMPONENT_GUIDELINES.md` §4.2 scopes the generic card to "grouped content within a case study"; this is not a case study, so the card was outside its own stated scope before any question of style. What made the split legible was two columns and a label, and both remain.

**Stage metadata moves to the mono voice.** `INPUT`, `OUTPUT`, `OWNER` and `DONE WHEN` were `type-label` — a 14 px semibold sans, the same weight as the values it introduces, so the four fields read as two columns of content rather than as keys and values. Mono uppercase tertiary is the metadata voice used on the home page and `/work`.

**The ADR count is now derived.** "Decision records — 19 ADRs" was hard-coded and had drifted nine short. It reads from `measured.json`, which `check:measured` re-verifies on every CI run — the same mechanism ADR-022 gave the home page's check count. A number in a link label is not copy, and a wrong one on a page whose subject is verification is the worst place on the site for it to be.

### Alternatives considered

**Style `Callout` instead of replacing it here.** Rejected for now, and it is the more complete fix. `Callout` is an MDX component used across four case studies, and giving it a visual treatment changes four pages that have not been reviewed. It is recorded as outstanding work rather than done quietly as a side effect of this page.

**Keep the cards and simply tighten them.** Rejected. A raised surface with a border was the loudest object on a page carried entirely by typography, and §4.2 did not license it here in the first place.

**Draw a rule between each section, as `/work` does at its one chapter boundary.** Rejected. `SPACING.md` §4 makes space the default and the rule an exception for where space is ambiguous; six sections each opening with a 35 px heading after 106 px of space are not ambiguous. `/work` needed one because a ragged two-column bottom edge made a single boundary genuinely unclear.

**Number the stages in *Each stage* to differentiate them.** Rejected. The numbers already exist in *The sequence* directly above, and the home page's editorial vocabulary has no numbered lists — 48 px between stages against 16 px inside one does the same work with nothing added.

### Consequences

- **All 1,127 words are retained.** Nothing was cut, shortened or rewritten. Measure went from 90 characters to 68, top padding from 0 px to 106, and the page from 6.0 screens to 7.4 — it is longer precisely because it is now spaced to be read.
- **`wireframes/04-workflow.md` §7 no longer describes the built page** in two rows: the ownership split and the failure modes. It is amended in place rather than deleted.
- **`Callout` remains unstyled and is now used only by case studies.** That is a real outstanding defect, recorded here so the case-study pass starts from it rather than rediscovering it.
- **A page-level `<header>` was tried and reverted.** Inside `main` it carries no role, and it made `tests/quality/accessibility.spec.ts` count two `header` elements — the check `ACCESSIBILITY.md` §8 relies on. Fixing the page rather than loosening the assertion is the correct direction, and worth recording because the temptation runs the other way.
- Lighthouse 100/100/100/100 on `/workflow` and all ten routes; zero overflow and CLS 0 at 320–1440 px; console clean.

## ADR-030 — `/about` and `/connect` share one content edge; paired columns break out

**Status:** Accepted · 2026-08-07 · Amends `wireframes/06-connect.md` §6 · Extends ADR-028 and ADR-029

### Context

Both editorial pages were built as two stacked containers: `Container width="wide"` for the `<h1>`, `Container width="prose"` for everything under it. Both centre with `mx-auto`, so the two never shared a left edge. On `/about` the heading sat 174 px left of the body it introduced. Every other route on the site starts its content at 208 px, and these two did not — the one alignment a reader notices without being able to name it.

`/connect` had a second problem underneath the first. Wireframe §6 constrains the page to `⟨--container-prose 68ch — the card does not sprawl⟩`, and it laid two columns inside that measure, giving each roughly 30 characters. `TYPOGRAPHY.md` §5 puts the comfortable range at 45–75. Every bullet in *Open to* and *Less useful* wrapped to three lines, most of them ending on a single orphaned word.

The pairing itself was also wrong. *Currently* is one short paragraph and held the entire left column; *Open to* and *Less useful* shared the right and together ran about three times its height. The block left roughly 400 px of empty space beneath *Currently* and read as one column that had been padded rather than two that had been paired.

### Decision

**One `Container width="wide"` per page, with `max-w-prose` on the content inside it.** This holds exactly the measure the wireframe was protecting while putting both pages on the same 208 px content edge as `/`, `/work` and `/workflow`. Measured drift across all five routes is now 0 px.

**The two paired regions on `/connect` break out to `container-wide`.** `SPACING.md` §6 sanctions break-outs from prose for structured content and requires an immediate return to prose, which is what happens. The §6 note is amended rather than overruled: it was written against placeholder bullets of about 34 characters, and the real ones run to 77. At `wide` each column is about 42 characters and the same bullets set in one or two lines.

**`Currently` leaves the pair and runs at prose width under the lede.** The regrouping is the truer one — *Open to* and *Less useful* are the same question answered in both directions and belong beside each other, while *Currently* answers a different question and belongs with the opening. DOM order is unchanged, so the mobile sequence is still *Currently, Open to, Less useful*.

**Both contact lists share one grid and one field-label voice.** Mono uppercase tertiary, the metadata voice ADR-029 settled on, so `Email` on the left sits on the same line as `Timezone` on the right. The lists stack below `sm`; see the consequence below.

**Bullets hang rather than indent.** `list-outside` with a left inset, so a wrapped line returns to the text edge instead of the marker, and 12 px between items rather than 8 so three wrapped lines do not read as one paragraph.

### Alternatives considered

**Honour §6 literally and accept 30-character columns.** Rejected. The note's stated purpose is that the card should not sprawl, and the page still opens and closes at prose width; what it was protecting is intact. Holding the letter of it would have kept a measure below the floor the type documentation sets, on the page whose entire job is to be read quickly.

**Keep *Currently* as the left column and rebalance by moving *Less useful* beneath it.** Rejected. It balances the desktop heights and breaks the mobile reading order, which would become *Currently, Less useful, Open to* — the refusal before the invitation.

**Introduce a fourth container width between `prose` and `wide`.** Rejected on `SPACING.md` §6's own grounds: a fourth width would mean the layout has more cases than the content does.

### Consequences

- **Content edge is now identical on all five routes** — 208 px for `h1` and body alike, 0 px drift.
- **`wireframes/06-connect.md` §6 no longer describes the built page** for the two paired regions. Amended in place.
- **A horizontal scrollbar at 320 px was found and fixed.** The contact lists used a fixed `6rem` label column; an email address has no break opportunity, so its min-content width is the whole string, and the track sized to it pushed the page 27 px past the viewport. The lists stack below `sm`, and `break-words` guards an address longer than this one. Zero overflow at 320, 360, 390, 414, 768, 1024, 1280 and 1440 px.
- **One word was added to `/connect`:** the field label `Elsewhere`, needed once the GitHub/LinkedIn/Résumé row joined the same labelled grid as `Email`. No other copy changed on either page.
- **`measured.json` was found corrupted at `HEAD` and regenerated.** `scripts/measure.mjs` reads `.next/app-build-manifest.json`, and `next dev` writes that same file — so measuring while a dev server runs records dev chunks. ADR-022's gate had committed 1,816.6 KB first load, 3 routes and 0 KB CSS. The correct figures are 104.9 KB and 12 routes; `origin/main` was never affected. See the consequence below.
- **`npm run measure` is only valid with no dev server running.** The gate is self-checking but not self-protecting: `check:measured` recomputes from the same clobbered manifest, so a corrupt recording and a corrupt verification agree with each other whenever both run against a live dev server. This is recorded as outstanding work — the durable fix is a separate `distDir` for measurement, not a note.
- 123/123 browser checks, 53/53 unit tests, full `npm run ci` green, Lighthouse 100/100/100/100 on all ten routes, CLS 0, production console clean.

## ADR-031 — the profile marks are one shared row, and `/connect` renders it too

**Status:** Accepted · 2026-08-07 · Amends `ICONOGRAPHY.md` §6 · Owner request

### Context

`/connect` listed the four ways to reach this person as text links — `Send an email` under the address, then `GitHub`, `LinkedIn` and `Résumé` under a second field label. The footer renders exactly the same four destinations as marks. The owner asked for the footer's treatment on `/connect`.

Two things stood in the way. `ICONOGRAPHY.md` §6 permits icon-only controls against three conditions and then names four that qualify, stating the list is closed; the footer's row was already a fifth, grandfathered by ADR-024 with the claim that "§6 is unchanged". And the four links were defined twice — once in `Footer.tsx`, once inline in the page — so a changed résumé path or profile URL would have gone stale in one of them with nothing to catch it.

### Decision

**One list, in `src/content/site.ts`.** `PROFILE_LINKS` is `{ href, label, icon, external }[]`, imported by the footer and by `/connect`. `icon` is typed `IconName`, so a mark with no glyph is a compile error rather than a blank square, and `external` decides `target`/`rel` at both call sites from one fact. The type import from `components` into `content` is `import type` only, so it leaves no runtime edge in that direction.

**§6 is amended rather than quietly exceeded.** The closed list gains a fifth entry — the profile mark row — described as a set rather than a control, and is closed again at five. ADR-024's position that the footer row needed no amendment is the part being corrected; the row always was an exception, and writing it down is what stops the sixth one from being argued for on the same silence.

**In page content the marks take the link colour.** §6's last clause — an icon is never the sole indicator that something is interactive — is the binding one here. A footer row survives it on position and convention; on `/connect` these are the actions the page exists to offer, and they replaced links that were unmistakably links. The footer's marks stay tertiary. This is recorded in §6 as an obligation attached to the row, not left to the call site.

**The marks sit outside the definition list.** A `<dd>` asserts that its content defines the `<dt>` above it, and a GitHub profile does not define an email address. The list now holds one field — `EMAIL` and the address — and the marks follow it as a separate labelled row.

**The row hangs left by `space-3`.** A 20 px glyph centred in a 44 px target sits 12 px inside its own box, so the row is pulled back by exactly that to put the first mark on the section's edge, flush with the heading and the field label. Targets stay 44 px square.

### Alternatives considered

**Keep visible labels and put the icon beside each word.** Rejected as not what was asked, and it is worth being plain that it is the more conservative option: it needs no amendment to §6 and it makes the affordance unarguable. It was rejected because it is the existing link list with decoration added — the request was for the footer's row, and the accessible names, the colour, and the 44 px targets carry what the words carried.

**Leave the mail mark out and keep `Send an email` as text.** Rejected. It would have split one row of four destinations into a text link plus three marks, which is neither treatment.

**Export `LINKS` from `Footer.tsx` and import it into the page.** Rejected. A layout component is not where shared content belongs, and `site.ts` already owns `contact`, which this list is derived from.

### Consequences

- **`ICONOGRAPHY.md` §6's closed list is now five, not four**, and the row carries a colour obligation the other four do not.
- **The four destinations are defined once.** The footer and `/connect` cannot disagree about a URL again.
- **One word leaves `/connect`:** the `Elsewhere` field label ADR-030 added, no longer needed once the marks left the definition list. The visible words `Send an email`, `GitHub`, `LinkedIn` and `Résumé` are gone from the page body; all four survive as accessible names.
- **This trades visible affordance for compactness on the page where the links matter most.** The mitigation is the link colour, and it is a real trade rather than a free one — recorded so that if the page later reads as having no call to action, the cause is written down.
- Four 44 px targets, accessible names verified, external marks open away with `rel="me noopener noreferrer"`.

## ADR-032 — `/resume` is a two-column document at `wide`; print is fixed by fragmentation, not by cutting

**Status:** Accepted · 2026-08-07 · Amends `wireframes/07-resume.md` §6 · Extends ADR-030 and ADR-031 · Owner request

### Context

Five things were true of `/resume` before this pass, and only the first was visible.

`Container width="prose"` centres, so the résumé's content edge sat at **382 px** while every other route on the site sat at 208 px — the last page still off the site's edge after ADR-030 fixed `/about` and `/connect`. Section rhythm was a flat 64 px, which is not on the section scale at all, though `SPACING.md` §5 fixes `/resume` at `default` density and therefore `md`. The heading-to-content gap was 32 px in Experience and 24 px everywhere else. Contact was a row of raw hyperlinks. And "Selected work" was three one-line labels naming a competency and a stack — the thinnest section on a page where it carries the strongest technical evidence.

Underneath those was a contradiction between two frozen documents. Wireframe §6 puts dates and employer in a metadata column beside the prose, inside a 68ch container. Measured, the longest period — "November 2022 — January 2025" — sets at **253 px** in mono. A column that holds it leaves the description about **43 characters**, and `TYPOGRAPHY.md` §5 states that "below 50, the eye returns too frequently and the reader loses rhythm". The column as built was 192 px, which wrapped **all five** periods onto two lines and still only reached 49 characters. §6's metadata column, §6's 68ch container, and §5's floor on measure: at 772 px any two of the three can hold.

### Decision

**The document runs at `container-wide`, and the measure is capped inside it.** The column is 288 px — the width of the longest thing that has to sit on one line, the periods at 253 px and `AI INFRASTRUCTURE ENGINEERING` at 262 px — and the description is 712 px, which is 63 characters. All three constraints hold. §6's stated concern is that "a résumé that fills a 1440 px viewport is unreadable", and what makes it unreadable is the measure, not the container: the measure is still capped, at 63. Between `md` and `lg` the column has not engaged and the entry is single-column, so the description carries `max-w-prose` — without it that band ran to 85 characters.

**One metadata column for the whole document.** Experience, Engineering projects, Technologies and Education all use 288 px, so labels begin at 208 px and content at 520 px on every section. Section rhythm is `section-md`, heading-to-content is 24 px, entries are 40 px apart against 8 px inside one.

**The whole identity block sits in that column, and only the description sits beside it** (owner request, on review of the first version). Period, employer and role for a job; competency and name for a project. The first version left the role heading in the right-hand column above its own prose, which reads as a heading with a caption to its left; moving it makes the left column an identity block and the right column a single continuous argument. Only one role — "AI-Native Full-Stack Engineer", 367 px against a 288 px column — needs two lines, and it now breaks evenly rather than orphaning a word, because of the following.

**`text-wrap` is implemented.** `TYPOGRAPHY.md` §5 has required balanced heading wrapping and pretty paragraph wrapping since Phase 3 and neither was ever set anywhere in the stylesheet. It surfaced here because a 288 px column is the first place on the site where a heading wraps at all: "AI-Native Full-Stack Engineer" broke with "Engineer" alone on line two, which is verbatim the defect §5 describes. `balance` applies only to headings that wrap, so single-line headings — including the home page's, verified at one line on desktop before and after — are untouched.

**"Selected work" becomes "Engineering projects", expanded.** Every clause is drawn from the case study's own `summary`, `role` and `outcomes` rather than written fresh, so the résumé cannot claim more than the case study substantiates. That cuts both ways: NovaMind states that its verification stayed manual, because the case study says so and a résumé quietly omitting what the linked document admits is exactly the discrepancy §9 exists to prevent. Edge10 stays short — Experience covers it across two roles.

**Contact takes ADR-031's mark row, and paper gets text instead.** A printed glyph cannot be clicked and an ATS cannot read one, so the marks are `data-print-hide` and a `data-print-only` line carries the same four destinations as extractable text. **Download as PDF** takes the `action` variant the home page already uses — a hairline border on a 44 px target, no fill and no accent.

**Print is fixed by fragmentation rather than by cutting content.** Four changes, in the order they were needed: `--space-section-*` is remapped for paper, which the existing block had missed; margins go from 14 mm to 12 mm; body leading goes from 1.6 to 1.5, which is 6 % on one property, against the 16 % on rhythm *or type size* §6 rejected for forcing two pages; and `[data-print-keep]` becomes block flow. Three pages, which §6 permits.

### Alternatives considered

**Widen the metadata column to 16 rem and keep `prose`.** Rejected: it puts the description at 43 characters, under §5's own floor. This was implemented and measured before being rejected.

**Drop the column and lead each entry with a mono label, as `/work` does.** Implemented, measured, and rejected on review — it satisfied every number and read as a flat left-aligned stack, inconsistent with the two-column Technologies and Education directly beneath it. Recorded because the numbers were all green and the page was still wrong.

**Abbreviate months to `Feb 2025 — Mar 2026`.** Fits a 12 rem column and is ordinary résumé practice. Rejected: the owner supplied the period in full and asked that no other date change, and a rendering that visibly differs from what was asked for is not a formatting decision to take unilaterally.

**Cut the expanded projects back to fit two pages.** Rejected. §6 already established that "the page count follows the content rather than the content following the page count", and the expansion was the point of the pass.

### Consequences

- **All five routes now share one content edge.** 208 px, 0 px drift.
- **`wireframes/07-resume.md` §6 no longer describes the built page** in two rows: the container is `wide`, and the metadata column is 288 px rather than unspecified. Amended in place.
- **Three print defects were found only by measuring the print render**, and each looked correct in source. `[data-print-only]` was declared after `@media print` at equal specificity, so it lost on source order and the PDF carried *no contact details at all*. `display: block` for fragmentation was written in `@layer base`, where Tailwind's `grid` utility outranks it, so it applied to nothing and the page count did not move. And the metadata label is a `span`, so `h1, h2, h3 { break-after: avoid }` never covered it — page two ended on `AI PRODUCT ENGINEERING` with `NovaMind AI` overleaf.
- **Three separate ways an entry could lose its title were found in the PDF, each after a layout change that looked complete.** The metadata label is a `span`, so the heading rule never covered it. Then the role moved into that column and page one ended on "Bombardier" with "Full Stack Engineer" overleaf. The identity block is now kept whole and welded to its description — three short lines, so it costs almost nothing.
- **Entries may now split across a page.** The rule that kept them whole was costing 344 px of wasted page and a fourth side; `break-after: avoid` on the heading plus `orphans`/`widows` prevents the defect it was written for — a heading stranded from its prose — without the waste.
- **`end: null` became `end: '2026-03'` on the current role.** `null` is this type's encoding for "current", and the owner's new period closes it; leaving the flag would have made the data disagree with the string it renders.
- PDF verified at three pages with `pypdf`: every contact destination, both project names and their technical detail extractable as real text, `Download as PDF` correctly absent, no stranded heading or label at any page foot.
- 123/123 browser checks, 53/53 unit, full CI green, Lighthouse 100/100/100/100 on all ten routes, zero overflow and 44 px targets at 320–1920 px, console clean.

## ADR-033 — the case-study template is implemented, not redesigned

**Status:** Accepted · 2026-08-07 · Implements `TYPOGRAPHY.md` §4, `COMPONENT_GUIDELINES.md` §8.1–§8.8 · Amends `ICONOGRAPHY.md` §6 · Closes the defect recorded in ADR-029

### Context

The four case studies carry 8,747 words across 32 chapters and are the highest-value surface on the site — `EXPERIENCE_FLOW.md` §2 calls this the handoff a cold arrival lands on. They were also the only route whose presentation had never been written. Measured on `/work/orchestai` before this pass:

- The body rendered inside `Container width="wide"`, so prose set at **90 characters** against `TYPOGRAPHY.md` §5's cap of 68 — the measure §5 describes as the point where "the return sweep becomes unreliable and readers lose their line". `Prose`, the component that exists to prevent exactly this, was never used by anything.
- **`TYPOGRAPHY.md` §4's vertical rhythm existed nowhere in the stylesheet.** `globals.css` resets `p` and `h1`–`h4` margins to zero and nothing put them back: every paragraph gap measured **0 px**, and the space above and below all eight `<h2>` chapter headings measured **0 px**.
- **All eight content components were unstyled.** Not "roughly styled" — `grep -c className` returned zero for seven of the eight. `Callout` was the one ADR-029 recorded; the other seven were the same defect, unnoticed.
- The competency printed its raw slug, `ai-infrastructure`. The metadata was a bare `<dl>`, whose `dd` has no indent once the reset removes its margin, so terms and definitions ran together. The header spaced its label, title, lifecycle, lede and metadata at a uniform 16 px, which is a list, not a hierarchy.

### Decision

**Nothing here is a design decision that the documentation had not already made.** §4 specifies the rhythm as a table; §8.1–§8.8 specify each component property by property. This ADR records that they were implemented and how, not what was chosen.

**Prose rhythm is derived from line height, not the spacing scale.** `SPACING.md` §2 draws that boundary in as many words: "prose spacing derives from line height (`TYPOGRAPHY.md` §4); everything else uses this scale. Two systems, each in its correct domain." So the unit is one body line — `--type-body-size × --type-body-line-height` — and every value is a multiple of it: 1 line between paragraphs, 3 before an `<h2>`, 2 before an `<h3>`, 0.5 after any heading, 0.75 into a list, 1.5 either side of a block. Because the body size is a `clamp()`, the entire rhythm resolves fluidly and needs no breakpoints.

**Leading trim is implemented rather than approximated.** Each heading subtracts its own half-leading, `(line-height − 1) ÷ 2 × 1em`, where `1em` inside the heading is its own size. §4 is right that without it "every heading in the document is misaligned by a different amount depending on its size" — one expression, correct at every viewport.

**Margins are top-only.** Bottom margins collapse against top margins differently by element and by browser, and the rule that wins is then not predictable from reading the stylesheet.

**The hero takes the home page's project-screen hierarchy** — mono label, title bound to its lifecycle at 4 px, lede at 24 px, metadata block at 40 px — and the metadata takes the labelled grid `/resume` and `/connect` use, so a reader crossing from either recognises it. Outcomes move above the body behind a hairline: a reader who stops at the fold has still read what the project achieved.

**Source and Live become marks**, in ADR-031's treatment. `ICONOGRAPHY.md` §6 gains no sixth icon-only entry: its "profile mark row" is generalised to a mark row, because a repository and a deployment are the same kind of thing as a profile — a destination the page names rather than describes. A `globe` icon joins the set as its eleventh of a documented fifteen, drawn in §3's stroke grammar rather than as a third brand mark.

### Alternatives considered

**Style the components individually and skip the shared rhythm.** Rejected. Part of the brief was that "every improvement should automatically benefit all four case-study pages", and rhythm is the improvement that does — one scoped block fixed 32 chapters across four documents, where per-component styling would have left the native markdown between them still flush.

**Put the rhythm in each component.** Rejected on `globals.css`'s own charter: it owns base typography, and the spacing between a paragraph and the heading above it belongs to neither element's component.

**Break code blocks and comparison tables out to `--container-wide`,** as §8.3 and §8.8 permit. Deferred rather than rejected: both already scroll horizontally inside a focusable region, which is the accessibility obligation, and a break-out needs negative margins whose value the token scale does not carry. Recorded as outstanding.

**Use `<header>` and `<footer>` inside `<article>`.** Valid HTML, and both carry no landmark role there. Rejected because `tests/quality/accessibility.spec.ts` counts `header` *elements* to prove there is one page header, and four routes failed. ADR-029 hit this on `/workflow` and settled the direction: fix the page, not the assertion.

### Consequences

- **All four case studies are now structurally identical**, verified rather than asserted: label top 183 px, content edge 208 px, measure 772 px, 84 px above a chapter and 14 px below it, 96 px metadata column, 24 px callout padding, 1 px footer rule — the same on every one.
- **The reading measure is 68 characters at desktop** and never exceeds it; at 320 px, 17 elements extend past the viewport and **all 17 are inside `role="region"` scroll containers**, which is §8.3's "horizontal scroll within the block; the page never scrolls horizontally". Zero uncontained.
- **`Callout` is styled, closing the defect ADR-029 left open.** Nine callouts across four studies were indistinguishable from body text.
- **The documents got longer, and that is the point.** `/work/orchestai` went from 7,601 px to roughly 12,900 px without a word being added or removed. It is longer because it is now spaced to be read.
- **`Timeline` was top-aligned and is now baseline-aligned.** Its 14.5 px mono period and its serif stage heading start at different optical heights, so every period floated about ten pixels above the stage it belonged to. It is the same correction `/work` and `/resume` already carried, and because `Timeline` is one shared component it landed on all four case studies at once — which is the argument for the shared template stated as a result rather than an intention.
- **`Prose` is used for the first time since it was written.** A component can pass every test it has and still be dead code, and nothing in CI notices.
- Live URLs updated: OrchestAI to `orchestai-two.vercel.app`, NovaMind to `www.trynovamind.com`.
- 123/123 browser checks, 53/53 unit, full CI green, Lighthouse 100/100/100/100 on all ten routes, zero page overflow and clean console across four pages × seven widths.

# Architecture

**Status:** Active — implementation began Phase 5 (`ROADMAP.md` §1)
**Owner:** Jigar Gajjar
**Last reviewed:** 2026-08-04
**Governed by:** [`FOUNDATION.md`](./FOUNDATION.md) · Decisions recorded in [`DECISIONS.md`](./DECISIONS.md)

This document specifies the intended architecture of jigargajjar.dev. It describes structure, contracts, and constraints. It contains no application code, and none should be added to it — code belongs in the repository, and this document should survive being read two years from now by someone deciding whether a change is consistent with the design.

Every constraint here traces to a goal in `FOUNDATION.md` §3 or to a recorded decision. If a constraint has no such trace, it is a preference in disguise and should be challenged.

---

## 1. Stack

| Concern | Choice | Rationale |
|---|---|---|
| Framework | Next.js (App Router) | Static rendering by default with React Server Components; per-route bundle control; first-party MDX and image handling. ADR-007 |
| Language | TypeScript, `strict` | Content schema, route params, and component contracts are typed end to end. Type errors block merge. |
| Styling | Tailwind CSS | Token-driven design system expressed in configuration rather than prose; no runtime CSS-in-JS cost; dead style elimination at build. §8 |
| Motion | None — native `IntersectionObserver` and CSS transitions | No animation library is a dependency. The four sanctioned patterns need one observer and a transition; a library measured 95× more for the same behaviour. Constrained by §9, ADR-011 and ADR-018. |
| Content | MDX on the filesystem | Case studies are documents, not database rows. Version-controlled, reviewable in pull requests, no runtime dependency. ADR-008 |
| Validation | Zod schemas at build time | Frontmatter is a contract. A malformed case study fails the build rather than rendering wrong. §6.3 |
| Hosting | Vercel | First-party App Router support: static generation, edge CDN, image optimization, no adapter layer. ADR-007 |
| Testing | Vitest (unit), Playwright (E2E, a11y, keyboard) | Content layer is unit-tested; rendered routes are audited against real browsers. §12 |
| Quality gates | Lighthouse CI, axe-core, bundle assertions | The measurement instrument, per ADR-009. §10, §12 |

**Explicitly excluded:** any client-side state management library, any component library, any analytics SDK, any font or script served from a third-party origin, any CMS or headless content service. Each would need to justify itself against a specific budget line in §10; none can.

---

## 2. Rendering model

**Static by default.** Every route is statically generated at build time. The site's content changes when a commit lands, so there is no correctness argument for request-time rendering and there is a strong performance argument against it. Time to first byte becomes a CDN edge lookup.

**No ISR, no on-demand revalidation, no request-time data fetching.** Content lives in the repository. A content change is a deploy. This eliminates cache invalidation as a category of problem.

**Server Components by default.** Layouts, pages, case-study bodies, and every content-rendering component are server components and ship no JavaScript. This is the primary mechanism for meeting the bundle budget in §10.

**Client Components are leaves, and they are exceptional.** A component becomes a client component only if it requires one of: user interaction state, viewport or scroll observation, `matchMedia`, or animation. When one is needed, the boundary is pushed as far down the tree as possible so that a single interactive element does not pull its ancestors' content into the client bundle.

The expected complete set of client components:

- The motion primitives in §9 (entrance reveal, interaction feedback)
- The theme controller, if a theme toggle ships
- Mobile navigation disclosure
- Copy-to-clipboard on code blocks

If this list grows, that is a design smell and it gets examined rather than accommodated.

**Progressive enhancement is a hard requirement.** Every route must be fully readable and navigable with JavaScript disabled. Content must never depend on a client component to become visible — an entrance animation that starts at zero opacity must render at full opacity when its script never runs. This is enforced by a Playwright suite with JavaScript disabled (§11) rather than by good intentions.

---

## 3. Folder structure

```
jigargajjar.dev/
├── .github/
│   └── workflows/
│       ├── ci.yml                     # typecheck, lint, unit, build, bundle budget
│       └── quality.yml                # Lighthouse CI, axe, keyboard, no-JS, links
├── content/                           # Authored content. No code.
│   ├── notes/                         # Engineering notes — rendered within /workflow. ADR-014
│   └── case-studies/
│       ├── novamind-ai/
│       │   ├── index.mdx
│       │   └── media/
│       ├── orchestai/
│       ├── edge10-athlete-performance/
│       └── jigargajjar-dev/
├── docs/
│   ├── FOUNDATION.md
│   ├── ARCHITECTURE.md
│   └── DECISIONS.md
├── public/
│   ├── fonts/                         # Self-hosted, subset, woff2 only
│   └── resume.pdf
├── src/
│   ├── app/                           # Routing only. Pages compose; they do not implement.
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── work/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       ├── page.tsx
│   │   │       └── opengraph-image.tsx
│   │   ├── about/page.tsx
│   │   ├── workflow/page.tsx
│   │   ├── resume/page.tsx
│   │   ├── connect/page.tsx
│   │   ├── not-found.tsx
│   │   ├── opengraph-image.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── primitives/                # Container, Prose, Stack, Text, Link, Button
│   │   ├── layout/                    # Header, Footer, Nav, SkipLink
│   │   ├── content/                   # MDX component map — see §6.4
│   │   ├── motion/                    # The only sanctioned animation surface — see §9
│   │   └── sections/                  # Composed page sections (Hero, WorkIndex, ...)
│   ├── content/                       # The content layer — see §6
│   │   ├── schema.ts                  # Zod schemas; single source of truth
│   │   ├── loader.ts                  # Filesystem read, parse, validate, sort
│   │   └── types.ts                   # Types inferred from schema — never hand-written
│   ├── design/
│   │   ├── tokens.ts                  # Type scale, space, color, motion, breakpoints
│   │   └── motion.ts                  # Duration and easing tokens, variants — see §9
│   ├── lib/
│   │   ├── metadata.ts                # Per-route metadata construction
│   │   └── mdx.ts                     # MDX compilation configuration
│   └── styles/
│       └── globals.css                # Tailwind layers, font-face, base element styles
├── tests/
│   ├── unit/                          # Content layer, schema, metadata
│   └── quality/                       # a11y, keyboard, no-JS, links
├── lighthouserc.json
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

### Structural rules

1. **`content/` contains no code and `src/` contains no prose.** A case study is edited without touching the application; the application is refactored without touching case studies. This is the mechanism behind goal 7 in `FOUNDATION.md`.
2. **`src/app/` composes, it does not implement.** A page file assembles sections and supplies metadata. Rendering logic lives in `components/`; data access lives in `content/`. A route file that exceeds roughly 100 lines has absorbed something that belongs elsewhere.
3. **`components/primitives/` has no domain knowledge.** A primitive knows nothing about case studies. If it needs to, it belongs in `content/` or `sections/`.
4. **The content layer is the only filesystem reader.** No component reads from `content/` directly. One boundary, one place to change, one place to test.
5. **`design/tokens.ts` is the single source of design values.** Tailwind config is derived from it. A hard-coded pixel value, hex color, or duration in a component is a defect. §8
6. **Media lives beside its case study.** Moving or deleting a case study takes its assets with it and leaves nothing orphaned.
7. **Types are inferred from schemas, never declared in parallel.** Two definitions of the same shape drift, and the drift is discovered at runtime.

---

## 4. Routing

| Route | Rendering | Primary audience | Purpose |
|---|---|---|---|
| `/` | Static | 1 → 2 | Positioning statement, competency thesis, entry to every layer |
| `/work` | Static | 2 | Case-study index framed by competency story, not chronology |
| `/work/[slug]` | Static (generated per case study) | 2 → 3 | Full case study; internally layered per §6.2 |
| `/about` | Static | 2 | Background, experience, how this person operates with a team |
| `/workflow` | Static | 2 → 3, collaborators | The AI-native engineering process, end to end. Defined in §6.6 |
| `/resume` | Static | 1 | Condensed, printable, linkable; PDF also served from `public/` |
| `/connect` | Static | Collaborators, 1 | Availability, current focus, what to bring, channels, response expectations. ADR-014 |
| `/404` | Static | — | Recovery paths to `/` and `/work` |

**Non-page routes:** `sitemap.ts`, `robots.ts`, root `opengraph-image.tsx`, and a per-case-study `opengraph-image.tsx` generating cards at build time.

### Routing rules

- **URLs are permanent.** `/work/[slug]` values are chosen once. A rename requires a redirect in `next.config.mjs`, which is maintained indefinitely. Links in an application, a message, or someone's notes must not rot.
- **Flat depth.** No route exceeds two segments. Depth adds navigational cost with no benefit at this scale.
- **No route is a dead end.** Every page terminates in a next action appropriate to its layer: contact for layer 1, the next case study for layer 2 (ADR-016 defines adjacency), a source link for layer 3.
- **`/workflow` carries the positioning argument.** It exists because the AI-native claim in `FOUNDATION.md` §5 provokes a specific objection, and the objection deserves a dedicated surface rather than a paragraph on `/about`. It is also, in effect, the entry point to the fourth case study, and the primary surface for the collaborator audience in `FOUNDATION.md` §4.4. Its purpose and information architecture are defined in §6.6.
- **`/work` orders by competency story, not by date.** Chronological ordering implies a career narrative; competency ordering implies breadth. `FOUNDATION.md` §9 is the ordering authority. Chronology is not discarded — it moves inside each case study as the Timeline section (§6.2), where it explains one project rather than implying a career arc across all of them.

---

## 5. Information architecture

The three-layer contract in `FOUNDATION.md` §4 is implemented structurally, not by writing to an average reader. The fourth audience (`FOUNDATION.md` §4.4) is served by what the layers contain rather than by an additional tier — process, reasoning, and recorded failure are distributed through layers 2 and 3, and `/workflow` is their dedicated entry point.

**Layer 1 is above the fold on `/`.** Positioning statement, seniority, primary technologies, and contact are present before scroll on a 375 px viewport. This layer requires no interaction and no JavaScript.

**Layer 2 is the scroll depth of `/` plus the summary and architecture sections of any case study.** The competency thesis — three projects, three distinct stories — resolves on the home page without navigation, so a hiring manager who reads only `/` still leaves with the breadth argument.

**Layer 3 is the depth of a case study plus outbound source links.** Alternatives, verification methodology, recorded failures, and hindsight live in the second half of each case-study document, where a reader who has committed will find them and a reader who has not will not be blocked by them.

**Layering is by ordering, not by disclosure widgets.** No accordions, tabs, or "read more" toggles for primary content. Progressive disclosure through interaction hides content from search engines, from print, from screen readers that have not been given a reason to expand, and from readers who do not realize there is more. Depth is achieved by document order — which costs nothing and works everywhere.

---

## 6. Content strategy

### 6.1 Storage and authoring

Case studies are MDX files at `content/case-studies/<slug>/index.mdx`, one directory per case study with its media alongside. Authoring a case study is writing a document and opening a pull request. No application change is required, and the pull request diff shows exactly what a reader will see change.

MDX rather than plain Markdown because case studies need a small set of semantic components — figures with captions, comparison tables, decision records, metric callouts — that Markdown cannot express and that should not be hand-rolled as HTML in prose.

### 6.2 The case-study document model

Every case study uses the same sections in the same order. Uniformity is the point: a hiring manager reading their second case study should know where to find things, and a senior engineer should be able to compare decision quality across projects without re-learning a structure. It also makes the absence of a section visible — a case study with a thin Verification section is a case study whose central claim is thin.

| # | Section | Layer | Contains |
|---|---|---|---|
| 1 | **Summary** | 1 → 2 | One-sentence description, competency story, lifecycle (§6.3), stack, role, links to source and demo, three outcome statements |
| 2 | **Context and constraints** | 2 | The problem, who it was for, and what was non-negotiable. Constraints are what make decisions meaningful |
| 3 | **Timeline** | 2 | The chronological arc of the project, from planning to current status |
| 4 | **Architecture** | 2 → 3 | System diagram plus narrative. Components, boundaries, data flow, failure modes |
| 5 | **Key decisions** | 3 | Two to five decisions, each with alternatives considered and why they were rejected |
| 6 | **Failures & mistakes** | 3 | What was got wrong, what it cost, and what changed as a result |
| 7 | **Verification** | 3 | How correctness was established: tests, evaluation methodology, gates, review process |
| 8 | **Outcomes** | 2 | What shipped and what changed, within the disclosure policy |
| 9 | **Looking back** | 3 | What would be done differently on a rebuild today, and why |

All nine sections are required. A missing section blocks publication (`FOUNDATION.md` §11, Tier 2). Uniformity is what makes an absent or thin section legible as a signal rather than as a stylistic choice.

**Section 3 — Timeline.** Chronology is an orienting device, and it is the cheapest available comprehension aid: a reader who knows the shape of the story understands the architecture faster than one reconstructing sequence from technical description. The canonical stages, adapted per project:

| Stage | Records |
|---|---|
| Planning | What was decided to be built, and why then |
| Architecture | When the system shape was settled, and what was still unknown |
| Implementation | How the build proceeded, in phases |
| Major setbacks | Where it stalled, broke, or was redirected — the entries that make the timeline honest |
| Verification | When and how correctness was established |
| Release | What shipped, to whom |
| Future roadmap | What is planned next, or an explicit statement that the project is complete or dormant |

A timeline that runs planning → implementation → release with nothing in between is describing a project that either went unusually smoothly or is being described from memory rather than from record. The **Major setbacks** stage exists specifically to prevent the sanitized version, and it links to the detail in section 6.

**Section 6 — Failures & mistakes.** Deliberately not called "Challenges." A challenge is something external that was overcome, and the word invites the interview-answer failure mode where every difficulty resolves flatteringly. This section is about what *this engineer* got wrong:

- Assumptions that turned out to be false, and what they were based on
- Architectural decisions that had to be reversed, and what the reversal cost
- Verification failures — things that passed the checks and were still wrong, or that the checks did not cover
- Redesigns and rewrites, with the trigger that forced them
- Near-misses: things that almost failed, and what caught them

The purpose is to normalize discussing mistakes as ordinary engineering output. It also carries real evidentiary weight: under the positioning in `FOUNDATION.md` §5, a claim that verification is disciplined is far more credible from someone who documents where verification failed than from someone whose record is spotless. The senior-engineer audience treats an absent failure section as either inexperience or concealment, and the collaborator audience (`FOUNDATION.md` §4.4) weights it more heavily than any other section.

Employer work is constrained here by the disclosure policy: own mistakes only, never a colleague's or an organization's (`FOUNDATION.md` §10).

**Section 7 is the load-bearing section.** The positioning in `FOUNDATION.md` §5 stands or falls on verification. A case study cannot publish without it (`FOUNDATION.md` §11, Tier 2).

**Section 5 must contain genuinely rejected alternatives.** An alternative invented after the fact to fill a template is detectable by exactly the reader this section is written for, and it damages the surrounding content. If a decision truly had one viable path, the honest statement is that it did.

**Section 9 — Looking back.** Answers one question: if this were rebuilt today, what would be done differently? It is distinct from section 6 — failures are things that went wrong at the time, hindsight is what has been learned since, including cases where a decision was correct given what was known and is no longer correct now. Reasoning is required; a list of regrets without the reasoning behind the revision is not useful to anyone. Every mature engineering project has this section whether or not it is written down.

### 6.3 Frontmatter contract

Frontmatter is validated by a Zod schema at build time. A file that fails validation fails the build — there is no partial render and no warning-level failure, because a malformed case study is worse than a missing one.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | Project name as presented |
| `slug` | string | yes | Must match the directory name; URL is permanent (§4) |
| `competency` | enum | yes | `ai-product` · `ai-infrastructure` · `enterprise` · `methodology`. Enumerated so ADR-012 is enforced by the type system |
| `summary` | string (≤ 180 chars) | yes | The layer-1 sentence; length-capped so it stays scannable |
| `role` | string | yes | What this person did, specifically |
| `stack` | string[] | yes | Named technologies, ordered by significance |
| `outcomes` | string[] (3) | yes | Exactly three; forces prioritization |
| `sourceUrl` | url | no | Required when `disclosure` is `public` |
| `liveUrl` | url | no | — |
| `disclosure` | enum | yes | `public` · `restricted`. `restricted` triggers review against `FOUNDATION.md` §10 |
| `lifecycle` | enum | yes | Where the *project* stands. Values defined below; rendered as a badge |
| `order` | number | yes | Position in `/work`; competency-driven, not chronological |
| `visibility` | enum | yes | Where the *document* stands: `published` · `draft`. Drafts are excluded from the build and from the sitemap |
| `updated` | ISO date | yes | Surfaced to readers; stale content is a credibility cost |
| `cover` | object | yes | `{ src, alt, width, height }` — alt is required by schema (§7). Metadata only: consumed by the Open Graph card, never rendered in a reading surface (ADR-017) |

Types are inferred from the schema. There is no hand-written interface mirroring this table.

`lifecycle` and `visibility` are deliberately separate fields with deliberately distinct names. One describes the project, the other describes the write-up. A published case study about an archived project is a normal and valuable thing; collapsing both into a single `status` field would make that state inexpressible and the field's meaning ambiguous at every call site.

**Project lifecycle values.** Every project declares its lifecycle explicitly. An undeclared or stale lifecycle is a credibility problem in its own right — a project presented as production that has not been touched in two years is a false claim, and it is exactly the kind a senior engineer verifies against the repository in under a minute.

| Value | Meaning |
|---|---|
| `production` | Running in production with real users and an operational commitment. The strongest claim available, and the one most likely to be checked |
| `released` | Shipped and publicly available, without a live production deployment behind it — a library, framework, or tool at a tagged release |
| `maintained` | Not under active development, but issues are triaged and dependencies are kept current |
| `experimental` | Deliberately unstable. Built to test an approach; interfaces may change without notice |
| `research` | An investigation rather than a product. The output is findings, not a shipped artifact |
| `prototype` | Built to answer a question or demonstrate feasibility. Never intended for production and not represented as such |
| `archived` | No longer maintained, kept public for reference. Stated plainly rather than quietly implied by an old commit date |
| `future` | Planned and specified but not yet built. Only appears when the specification itself is the artifact worth showing |

The badge derived from this field is rendered by the case-study layout and the `/work` index from frontmatter — it is not authored in MDX and is therefore not part of the closed component set in §6.4. `archived` and `future` are stated as prominently as `production`; a portfolio that only labels its successes has made the labels worthless.

### 6.4 MDX component map

The set of components available inside a case study is closed. A closed set keeps documents portable, keeps the bundle bounded, and prevents case studies from accumulating one-off presentation logic.

- `Figure` — image or inline diagram with caption; alt text required
- `Diagram` — inline SVG architecture diagram, theme-aware, with real text nodes (§7)
- `Decision` — a structured decision block: context, choice, alternatives, consequence
- `Timeline` — the chronological arc required by §6.2, section 3; entries carry a stage, a period, and a body
- `Metric` — a single number with label and qualifier, tabular figures
- `Comparison` — a two-or-three-way tradeoff table
- `Callout` — a constraint, limitation, or aside; semantic, not decorative
- `CodeBlock` — syntax-highlighted at build time via a Shiki-class highlighter; no client-side highlighting library

Every component in this set is a server component except `CodeBlock`'s copy affordance, which is a client leaf.

### 6.5 Non-case-study content

Page copy for `/`, `/about`, `/workflow`, and `/resume` lives in the page's section components rather than in MDX. These are bespoke layouts where the copy and the composition are inseparable, and routing them through a content abstraction would add indirection without enabling anything.

### 6.6 The workflow page (`/workflow`)

This section defines the page's purpose and information architecture. It does not design the page.

**Purpose.** The positioning in `FOUNDATION.md` §5 claims that implementation is delegated while architecture, direction, and verification are not. That claim is unfalsifiable as a sentence. `/workflow` is where it becomes a described process that a reader can evaluate, disagree with, and check against the artifacts.

It answers three questions, in this order of importance:

1. **What actually happens between a problem and a release?** The concrete sequence, not a philosophy.
2. **Where does the human judgement enter?** Which stages are owned rather than delegated, and why those.
3. **How is correctness established when code arrives faster than it can be read line by line?** The answer to the objection every skeptical reader arrives with.

**Primary audiences.** Layer 2 and layer 3 (`FOUNDATION.md` §4), and — decisively — the collaborator audience in §4.4, for whom this is the single most relevant surface on the site. Someone deciding whether to work alongside an engineer needs to know how that engineer makes decisions, which no case-study outcome reveals.

**The process being described.** The stages, in sequence:

```
Problem
  ↓
Architecture
  ↓
ADRs
  ↓
Planning
  ↓
Implementation with Claude Code
  ↓
Verification
  ↓
Testing
  ↓
Review
  ↓
Release
  ↓
Retrospective
```

**Information architecture.**

| Region | Layer | Contains |
|---|---|---|
| Thesis | 2 | Why the process is shaped this way: the argument from `FOUNDATION.md` §2, stated in one screen |
| Process overview | 2 | The full stage sequence, visible at once. A reader must be able to grasp the shape without scrolling through ten sections |
| Stage detail | 3 | One entry per stage: what happens, what the input and output are, who owns it, and how the stage is known to be complete |
| Ownership model | 2 → 3 | Which stages are delegated and which are not, stated explicitly rather than implied. This is the section that answers the "does this person understand their own code" objection |
| Verification model | 3 | How confidence is established across stages: automated gates, review discipline, and what each catches that the others do not. The load-bearing section, mirroring §6.2 section 7 |
| Failure modes | 3 | Where this process breaks down, what it costs, and what compensates. A process description with no stated failure modes is marketing |
| Evidence | 3 | Links into the case studies and this repository where each stage is visible in practice — `docs/`, ADRs, CI configuration, pull requests |
| Engineering notes | 3 | Durable essays examining one part of the method in depth. Capped at six. **Rendered inline within this route; a note has no URL of its own, because ADR-014 declined notes as routes and the route table is closed.** ADR-014 |

**Structural requirements.**

- The stage sequence renders as content, not as an animation. It must be complete and readable with JavaScript disabled and under `prefers-reduced-motion` (§9). Any motion is an entrance reveal at most.
- The diagram is authored inline SVG with real text nodes, or semantic markup styled as a sequence — never a raster image and never a text-in-image diagram (§7).
- Every stage claim links to somewhere it can be verified. A process page that cannot be checked against artifacts is asserting exactly what the site argues against asserting.
- The page is a description of practice, not a manifesto. Where the process is aspirational rather than established, it says so.

**Relationship to the fourth case study.** `/workflow` describes the process in general; the `jigargajjar-dev` case study (`FOUNDATION.md` §9) applies it to one project the reader is currently inside. They cross-link and must not duplicate: the page owns the method, the case study owns the instance.

---

## 7. Image strategy

Images are the largest available regression risk against the performance budget, so the strategy is restrictive by default.

**Prefer no image.** Most portfolio imagery is decorative. Typography, space, and hierarchy carry the home page. An image ships when it communicates something prose cannot.

**Diagrams are authored SVG, not screenshots of diagram tools.** Inline SVG using `currentColor` so it adapts to theme, with text as real `<text>` nodes so it is selectable, searchable, translatable, and readable by assistive technology. Architecture diagrams are the highest-value visual on the site and they should not be raster images of someone else's canvas.

**Screenshots are captured deterministically.** A committed capture script produces them at fixed 2× viewport dimensions so they are reproducible and consistent across case studies. Committed to the repository beside their case study, never fetched at build time from an external origin.

**Delivery.**
- `next/image` exclusively; no bare `<img>` for content imagery.
- AVIF first, WebP fallback, generated at build.
- Explicit `width` and `height` on every image, always. This is the primary defense of the CLS budget.
- `sizes` set from the actual layout, so mobile never downloads a desktop-width asset.
- Lazy by default. `priority` is set on at most one image per route, and only when it is the measured LCP element.
- Blur placeholders generated at build for images above 400 px in either dimension.

**Alt text is a schema requirement, not a convention.** The `cover` object requires it and `Figure` requires it. Decorative images take `alt=""` deliberately; there is no path to an image with an undefined alt.

**Budgets.** Per image, ≤ 150 KB after optimization. Above the fold, at most one image on any route. Per case-study route, ≤ 400 KB of imagery total. A case study needing more imagery than that is describing rather than arguing.

**Open Graph images are generated at build time** from title, competency, and stack using the framework's image generation, so they stay consistent with content and cost nothing to maintain. Where a case study declares a `cover` (§6.3), that image is used instead; the generated card is the fallback. The cover is never rendered in a reading surface (ADR-017).

---

## 8. Design system: typography, space, color

All values originate in `src/design/tokens.ts`; Tailwind's theme is derived from it. A hard-coded value in a component is a defect (§3, rule 5) because it defeats the consistency argument in `FOUNDATION.md` §8.

**Typography.** Two families maximum: one display face for headings, one text face for body and interface. Four weights total across both. Self-hosted `woff2`, subset to Latin, preloaded, `font-display: swap`, with `size-adjust` and metric overrides on the fallback stack so the swap produces no measurable layout shift. Variable fonts preferred when the variable file is not larger than the static weights it replaces.

A modular type scale with a fixed ratio, `clamp()`-based fluid sizing between the mobile and desktop anchors, so there are no discrete jumps at breakpoints. Body measure is capped at 68 characters — long-form case studies are read for twenty minutes and measure is the single largest lever on reading comfort. Body line height 1.5–1.6; display line height 1.05–1.15 with negative tracking. Tabular, lining figures wherever numbers are compared, which includes every `Metric` and every comparison table.

**Space.** A 4 px base with an 8 px rhythm. Section spacing is its own scale, considerably larger than component spacing, and it is where the site earns "breathing room" — generous section separation costs no bytes and no main-thread time, which makes it the cheapest quality signal available. Density varies deliberately by surface: compact and immediate in the layer-1 region, spacious and paced in case-study bodies.

**Color.** A restrained palette: one neutral ramp carrying most of the interface, one accent used sparingly for interactive affordances and emphasis, and semantic tokens for callouts. Light and dark are both first-class, defined as token sets rather than as filters or inversions, honoring `prefers-color-scheme` with an optional explicit override. Contrast floors are non-negotiable and enforced (§10): 4.5:1 for body text, 3:1 for large text and interface components, 3:1 for focus indicators against adjacent colors. Reduced-opacity body text is not an available refinement technique — hierarchy comes from scale, weight, and space.

**Layout.** Responsive-first, meaning layouts are authored at the narrow width and expanded, not authored wide and patched. A small number of container widths — prose, wide, full — applied consistently. CSS Grid for page structure, flexbox within components. No fixed heights on content containers.

---

## 9. Animation strategy

Motion is a system with a budget, governed by ADR-011 and by the design principles in `FOUNDATION.md` §8.

**Test for inclusion.** Every animation answers: what does this help the reader understand? Three answers are acceptable — orienting the reader to newly arrived content, confirming that an interaction registered, and establishing continuity between two states of the same object. An animation that answers none of the three does not ship, regardless of how good it looks in isolation.

**Tokens.** Durations and easings are enumerated in `src/design/motion.ts` and used exclusively.

| Token | Duration | Applied to |
|---|---|---|
| `instant` | 100 ms | Press feedback, focus ring |
| `fast` | 160 ms | Hover, small state changes |
| `base` | 240 ms | Standard transitions |
| `entrance` | 400 ms | Content reveal on scroll |

Easing: a standard emphasized curve for most transitions, a decelerating curve for entrances, an accelerating curve for exits. No linear easing on anything a reader perceives as physical.

**Permitted properties: `transform` and `opacity` only.** Both are compositor-driven and neither triggers layout. Animating `width`, `height`, `top`, `left`, `margin`, or `padding` is prohibited — these are the difference between motion that costs nothing and motion that costs frames on a mid-range Android device, which is the device the performance budget is written for.

**Sanctioned patterns.**
- *Entrance reveal.* Opacity 0 → 1 with a translate of at most 16 px, triggered once at 20% viewport intersection. Never re-fires. Never applied to above-the-fold content, which must be visible immediately.
- *Interaction feedback.* Hover and press states at `fast` or `instant`. Transform and color only.
- *Shared continuity.* ~~Layout animation between two states of the same element.~~ **Removed by ADR-018** — no consumer was identified through phase 6, and it was the only pattern requiring an animation library. Reinstating it requires a new decision record.
- *Focus transitions.* Instant appearance, brief settle. The focus indicator never animates in slowly, because it must be perceptible the moment the key is released.

**Prohibited outright.** Scroll-jacking or scroll hijacking of any kind. Parallax on text. Cursor followers and custom cursors. Staggered reveals of more than four elements. Animation on page load that delays content. Autoplaying video. Any animation exceeding 400 ms. Any animation that must complete before content is readable.

**Reduced motion is a first-class path, not a degradation.** Under `prefers-reduced-motion: reduce`, transform-based animation is removed entirely and replaced with an instant or opacity-only transition. It is not sped up and it is not merely reduced in amplitude. The rule is applied globally in the base stylesheet so a component author cannot forget it, and the reduced-motion path is tested in CI (§11) rather than assumed.

**Bundle discipline.** No animation library is a dependency (ADR-018). Entrance reveal is the only pattern requiring JavaScript: an `IntersectionObserver` sets a state attribute and a CSS transition carries the animation. Motion components are client leaves under `components/motion/` and are the only sanctioned animation surface — an animation implemented elsewhere is a defect. Animated content renders visible without JavaScript (§2).

---

## 10. Performance budget

These numbers are constraints agreed before implementation, not measurements taken after it (`FOUNDATION.md` §6). They are enforced in CI and a violation blocks merge. The reference device profile is a mid-tier mobile device on emulated Slow 4G — the profile a recruiter checking a link on their phone actually has.

### Core Web Vitals — lab, mobile profile, every route

| Metric | Budget | Threshold it beats |
|---|---|---|
| Largest Contentful Paint | ≤ 1.5 s | "Good" is 2.5 s |
| Cumulative Layout Shift | ≤ 0.05 | "Good" is 0.1 |
| Total Blocking Time | ≤ 150 ms | Proxy for INP; "good" is 200 ms |
| First Contentful Paint | ≤ 1.0 s | — |
| Time to First Byte | ≤ 200 ms | Static from edge CDN |

### Payload — per route, gzipped

| Asset class | Budget |
|---|---|
| First-load JavaScript | ≤ 120 KB |
| Shared framework chunk | ≤ 105 KB — recorded baseline, not a design budget (ADR-015) |
| CSS | ≤ 20 KB |
| Fonts | ≤ 120 KB total, ≤ 4 files |
| Images above the fold | ≤ 150 KB, at most one image |
| Total route weight | ≤ 500 KB (≤ 900 KB for a case study including all lazy media) |

> **The shared framework chunk is a measurement, not a choice.** It is the React and Next runtime fixed by ADR-007, and no per-change engineering decision moves it. The ceiling exists to catch a framework upgrade inflating the runtime, not to constrain design. Baseline at Next 15 + React 19: **100.3 KB gzipped**, re-recorded on any major framework upgrade. **First-load JavaScript is the budget that governs our decisions** — it bounds client components, the motion runtime, and the MDX component set, and it does not move.

### Absolute constraints

- **Zero third-party network requests.** No CDN-hosted fonts, no analytics, no embeds, no tag managers. Asserted in CI as a request-origin check. This is simultaneously a performance decision and a privacy position (ADR-009).
- **Zero render-blocking resources** beyond the critical CSS Next emits.
- **Zero layout shift from font loading.** Fallback metrics are matched with `size-adjust`.
- **No client-side data fetching on initial render.** There is nothing to fetch (§2).

### Lighthouse CI assertions — mobile, every route

Performance ≥ 95 · Accessibility 100 · Best Practices ≥ 95 · SEO 100.

### Budget governance

The budget precedes visual effects (ADR-006). A proposed treatment that exceeds a budget line is not implemented and then optimized — it is redesigned or dropped. Raising a budget number requires an ADR stating what was gained in exchange, because a budget that can be quietly raised when it becomes inconvenient is not a budget.

One line in the table above is a recorded baseline rather than a budget: the shared framework chunk (ADR-015). Every other line is a budget and is subject to the rule in this section. A budget line that no engineering decision can influence should be reclassified rather than repeatedly raised — that reclassification is itself an ADR.

---

## 11. Accessibility architecture

WCAG 2.2 Level AA is a release requirement, not a target (ADR-005). The rationale is in `FOUNDATION.md` §6: a site arguing for engineering craft that is not keyboard-operable has refuted itself, and the senior-engineer layer will tab through it.

**Structural commitments.**
- Semantic HTML first. ARIA is used only where native semantics are insufficient, never as a substitute for a correct element.
- Landmark regions on every page; one `<h1>`; heading order never skips a level.
- Skip-to-content link, visible on focus, as the first focusable element.
- Focus indicators are visible, use `:focus-visible`, and meet 3:1 contrast against every adjacent color. The framework default is replaced, never removed.
- All interactive targets meet the 24×24 CSS-pixel minimum (WCAG 2.2, 2.5.8).
- Keyboard operability for every interactive element, with no traps and a logical tab order matching visual order.
- No meaning conveyed by color alone.
- Content is functional at 200% zoom and at 320 px width without horizontal scrolling.
- `prefers-reduced-motion` honored as a complete path (§9).
- Every image has deliberate alt text; diagrams carry accessible text alternatives (§7).
- Language declared; page titles unique and descriptive.

**Verification.** Three complementary methods, because automation catches roughly a third of real issues:

1. **Automated.** axe-core via Playwright against every built route. Zero serious or critical violations, enforced in CI. `eslint-plugin-jsx-a11y` at lint time.
2. **Programmatic behavioral.** Playwright suites for keyboard-only traversal, focus-visibility, reduced-motion rendering, and JavaScript-disabled rendering. These catch the failures axe cannot: traps, illogical order, content that never appears without script.
3. **Manual.** VoiceOver traversal of every route before launch and before any structural change. Recorded in the pull request. This is the only method that catches content that is technically accessible and practically unusable.

---

## 12. Verification pipeline

Per ADR-009, CI is the site's measurement instrument. Every check below blocks merge; there are no advisory checks, because an advisory check is a check that will eventually be ignored.

**`ci.yml` — on every pull request and push to `main`**

1. Install with a frozen lockfile
2. `tsc --noEmit` under `strict`
3. ESLint, including `jsx-a11y`, zero warnings
4. Format check
5. Vitest unit suite — content loader, schema validation, metadata construction
6. Production build
7. Bundle budget assertion against §10

**`quality.yml` — against the production build**

8. Lighthouse CI across every route, asserting §10
9. axe-core across every route, zero serious or critical
10. Playwright: keyboard traversal, focus visibility, reduced-motion, JavaScript-disabled rendering
11. Third-party request assertion — must be exactly zero
12. Link check, internal and external

**Merge protection.** `main` is protected. Every check above is required. Deployment to production happens from `main` only, via Vercel's Git integration; preview deployments are produced for every pull request and are where manual verification (§11, method 3) is performed.

---

## 13. Deployment

Vercel, static output, deployed from `main`. Preview deployments per pull request. Custom domain `jigargajjar.dev` with `www` redirecting to apex. HTTPS enforced with HSTS. A strict Content Security Policy is possible precisely because there are no third-party origins to allow — this is a direct dividend of the zero-third-party constraint in §10 rather than an additional effort.

**Portability position.** The application uses no Vercel-specific runtime API. The couplings are static generation, the image optimizer, and edge caching — all of which have equivalents elsewhere. A migration would be a build-and-deploy change rather than an application change. This is accepted rather than actively hedged: paying an abstraction cost today to protect against a migration that may never happen is the wrong trade at this scale (ADR-007).

---

## 14. Sequencing

The build order below front-loads the constraints. Every phase after the first inherits a pipeline that will reject work violating the budget, which means the budget cannot be quietly abandoned under deadline pressure — the standard way performance and accessibility commitments die.

| Phase | Delivers | Exit condition |
|---|---|---|
| 0 | This documentation | Complete — foundation, architecture, and decisions recorded |
| 1 | Toolchain, design tokens, CI pipeline with all gates active | An empty page passes every gate in §12 |
| 2 | Content layer: schema, loader, tests | A validated case study renders as unstyled semantic HTML |
| 3 | Layout, primitives, typography and space system | `/` and `/work` shells within budget |
| 4 | Case-study rendering and MDX component map | `/work/[slug]` complete for one real case study |
| 5 | Motion system | §9 patterns implemented; reduced-motion path verified |
| 6 | Remaining routes and content, including `/workflow` (§6.6) | All four case studies published; Tier 2 criteria met |
| 7 | Launch verification | Tier 3 comprehension testing passed (`FOUNDATION.md` §11) |

Phase 1 exists as its own phase deliberately. Standing up quality gates against an empty page is cheap; retrofitting them to a finished site is expensive and usually ends with the thresholds being lowered to match what was built.

# Wireframe — `/` Homepage

**Specification source:** [`HOMEPAGE_NARRATIVE.md`](../design/HOMEPAGE_NARRATIVE.md) · [`EXPERIENCE_FLOW.md`](../design/EXPERIENCE_FLOW.md) §6
**Shell:** see [`README.md`](./README.md) §4

---

## 1. Purpose

Convert a stranger's skepticism into enough conviction that continuing feels worth their time — then give them somewhere to continue that does not require a decision (`HOMEPAGE_NARRATIVE.md` §2).

**Optimised for conviction, not navigation.** The page does not ask the reader to choose; it guides them. Depth arrives at band 3 before any navigation is required.

## 2. Audience

All four, entering at different depths. Band 1 serves the recruiter completely. Bands 2–4 serve the hiring manager. Bands 3 and 5 serve the senior engineer. Bands 5–6 serve the collaborator.

## 3. Narrative goal

| Band | Beat | State entering | State leaving |
|---|---|---|---|
| Arrival | Orientation | Neutral, possibly rushed | Settled — nothing loading, nothing moved |
| 1 Hero | Recognition | Settled | "This is a specific person" |
| 2 Qualification | **Disarmament** | A forming objection | Objection answered before it was voiced |
| 3 Featured | **Engagement** | Open | "I have seen them solve something" |
| 4 Additional | Widening | Engaged in one thing | "There are two more, and they are different" |
| 5 Workflow | Substantiation | Convinced by output | "And the method is documented too" |
| 6 Connect | Intent | Convinced | Decided |

**Exit action:** into the OrchestAI case study from band 3 (primary). Secondary exits from bands 4, 5, 6.

---

## 4. Mobile — 375 px

Density `compact` for band 1 — the layer-1 region above the fold. `default` for bands 2–6. Compact applies only to the layer-1 region, navigation, and footer (`SPACING.md` §5); band 6 is a content band and takes `default`.

```
┌───────────────────────────────────────┐
│ ‹Skip to content›                     │
├───────────────────────────────────────┤
│ Jigar Gajjar            ☰{menu} {theme}│
├───────────────────────────────────────┤
│                          ⟨--space-section-sm⟩
│ H1                                    │
│ Senior Full-Stack Engineer            │
│ building production systems           │
│ through an AI-native                  │
│ engineering workflow —                │
│ architecting, directing, and          │
│ verifying while AI agents             │
│ implement.                            │
│                                       │
│ .NET · TypeScript · React ·           │
│ PostgreSQL · MCP                      │
│                                       │
│ ‹Read the work›  ‹Résumé›             │
│                          ⟨--space-6⟩  │
· · · · · · · · · · · · · · · · · · · · ·  ← fold, 375 × 600
│                          ⟨--space-section-md⟩
├───────────────────────────────────────┤
│ H2  What I actually do                │
│                                       │
│ Agents write the implementation.      │
│ I decide what gets built, how it is   │
│ structured, and how anyone knows it    │
│ is correct.                           │
│                                       │
│ Architecture, decomposition,          │
│ verification, and the decisions in    │
│ between are not delegated. They are   │
│ the part that is scarce.              │
│                                       │
│ Engineering is not measured by how    │  ← closing statement,
│ quickly code is written, but by how   │    display face. NOT the
│ confidently it can be verified.       │    Pull quote component
│                          ⟨--space-section-md⟩
├───────────────────────────────────────┤
│ LABEL                                 │
│ AI INFRASTRUCTURE & FRAMEWORK ENG.    │
│                                       │
│ H2  OrchestAI                         │
│ [ Production ]                        │  ← lifecycle badge
│                                       │
│ A multi-agent framework on .NET,      │
│ built so other engineers can extend   │
│ it without reading its internals.     │
│                                       │
│ H3  The decision that shaped it       │
│ ‹OWNER: 60–90 words — one             │
│  architectural decision, the          │
│  alternative rejected, and the        │
│  constraint that decided it›          │
│                                       │
│ H3  How I knew it worked              │
│ ‹OWNER: 40–60 words — how correctness │
│  was established for non-             │
│  deterministic output›                │
│                                       │
│ ‹Read the full case study {arrow-right}›
│                          ⟨--space-section-md⟩
├───────────────────────────────────────┤
│ H2  Two more, of a different kind     │
│                                       │
│ LABEL  AI PRODUCT ENGINEERING         │
│ H3 ‹NovaMind AI›                      │
│ Document intelligence with grounded   │
│ citations. Shipping an AI capability  │
│ all the way to something with users,  │
│ auth, and a data lifecycle.           │
│                                       │
│ LABEL  ENTERPRISE SOFTWARE ENG.       │
│ H3 ‹Edge10 — NHL Athlete Performance› │
│ CQRS and clean architecture in a      │
│ production organisation. Constraints  │
│ I did not choose, and stakes that     │
│ were not mine to reset.               │
│                                       │
│ ‹Compare all four case studies        │
│  {arrow-right}›                       │
│                          ⟨--space-section-md⟩
├───────────────────────────────────────┤
│ H2  How the work gets made            │
│                                       │
│ Problem, architecture, decision       │
│ records, planning, implementation,    │
│ verification, review, release,        │
│ retrospective. Where it breaks down   │
│ is documented too.                    │
│                                       │
│ ‹Read the workflow {arrow-right}›     │
│                          ⟨--space-section-md⟩
├───────────────────────────────────────┤
│ H2  Work with me                      │  ← BAND 6, distinct
│                                       │    from the footer
│ Currently open to senior engineering  │
│ roles and collaboration on AI         │
│ infrastructure.                       │
│                                       │
│ ‹What to bring, and what to expect    │
│  back {arrow-right}›                  │
│                          ⟨--space-section-lg⟩
├───────────────────────────────────────┤
│ H2  Get in touch                      │  ← FOOTER (README §4)
│ ...                                   │
└───────────────────────────────────────┘
```

◇ **Above the fold carries R1, R2, R3, R5 with no scroll and no interaction** (`ARCHITECTURE.md` §5). Verified against 375 × 600: `--type-700` h1 at 32 px mobile over seven lines, plus stack line and two links, fits with `--space-6` remaining.

◇ **Nothing above the fold animates** (`MOTION.md` §5). Entrance reveal begins at band 2.

◇ **Band 6 is a distinct band at every breakpoint, including mobile.** It sits above the footer and is not merged into it. The two are different things: band 6 makes an offer — what this person is open to — and terminates the narrative; the footer is the universal exit present on all eight routes. Collapsing them on mobile would drop a band from the frozen six-band structure on the breakpoint that defines the architecture.

◇ **Band 6 carries no call to action.** "Work with me" states availability; the link goes to `/connect` where the terms are. `EXPERIENCE_PRINCIPLES.md` §3 refuses urgency and obligation.

---

## 5. Tablet — 768 px

Changes from mobile only. Everything not listed is identical.

```
┌─────────────────────────────────────────────────────┐
│ Jigar Gajjar      Work Workflow About Connect {theme}│  ← nav expands, ≥ --bp-sm
├─────────────────────────────────────────────────────┤
│ H1  Senior Full-Stack Engineer building              │
│     production systems through an AI-native          │
│     engineering workflow — architecting,             │
│     directing, and verifying while AI agents         │
│     implement.                                       │
│                                                      │
│ .NET · TypeScript · React · PostgreSQL · MCP         │
│ ‹Read the work›   ‹Résumé›                           │
├─────────────────────────────────────────────────────┤
│ BAND 4 — two competency entries, still stacked       │
│ ┌───────────────────────┐                            │
│ │ LABEL / H3 / summary  │   ← full measure retained  │
│ └───────────────────────┘                            │
│ ‹Compare all four case studies {arrow-right}›        │
├─────────────────────────────────────────────────────┤
│ BAND 6 — unchanged from mobile, wider measure         │
│ H2  Work with me                                     │
│ Currently open to senior engineering roles           │
│ and collaboration on AI infrastructure.              │
│ ‹What to bring, and what to expect back {arrow-right}›│
└─────────────────────────────────────────────────────┘
```

◇ **Band 4 does not become a two-column grid at tablet.** Two side-by-side entries at 768 px would read as cards, which `HOMEPAGE_NARRATIVE.md` §4 band 4 explicitly forbids — the asymmetry against band 3 is the message.

◇ Navigation expands at `--bp-sm` (640 px); the `{menu}` toggle and overlay are retired.

---

## 6. Desktop — 1280 px

```
┌───────────────────────────────────────────────────────────────┐
│ Jigar Gajjar              Work  Workflow  About  Connect {theme}│
├───────────────────────────────────────────────────────────────┤
│  ⟨--container-wide, 1120⟩                                      │
│                                                                │
│  H1  Senior Full-Stack Engineer building production            │
│      systems through an AI-native engineering workflow —       │
│      architecting, directing, and verifying while              │
│      AI agents implement.                                      │
│                          ⟨measure capped at 32ch display⟩      │
│      .NET · TypeScript · React · PostgreSQL · MCP              │
│      ‹Read the work›   ‹Résumé›                                │
│                                                                │
├───────────────────────────────────────────────────────────────┤
│  ⟨--container-prose, 68ch — offset left, not centred⟩          │
│  H2  What I actually do                                        │
│  Agents write the implementation. I decide what gets           │
│  built, how it is structured, and how anyone knows it          │
│  is correct.                                                   │
│  ...                                                           │
│                                                                │
│      ┌──────────────────────────────────────────┐              │
│      │ Engineering is not measured by how       │  ← closing    │
│      │ quickly code is written, but by how      │    statement, │
│      │ confidently it can be verified.          │    breaks out │
│      └──────────────────────────────────────────┘              │
├───────────────────────────────────────────────────────────────┤
│  BAND 3 — asymmetric opener (VISUAL_LANGUAGE §2.5)             │
│                                                                │
│  LABEL  AI INFRASTRUCTURE & FRAMEWORK ENGINEERING              │
│  H2  OrchestAI                          [ Production ]         │
│  ───────────────────────────────────────────────────           │
│                                                                │
│  ⟨--container-prose⟩                                           │
│  A multi-agent framework on .NET, built so other               │
│  engineers can extend it without reading its internals.        │
│                                                                │
│  H3  The decision that shaped it                               │
│  ‹OWNER: 60–90 words›                                          │
│                                                                │
│  H3  How I knew it worked                                      │
│  ‹OWNER: 40–60 words›                                          │
│                                                                │
│  ‹Read the full case study {arrow-right}›                      │
├───────────────────────────────────────────────────────────────┤
│  BAND 4 — deliberately lighter than band 3                     │
│  H2  Two more, of a different kind                             │
│                                                                │
│  LABEL AI PRODUCT ENGINEERING                                  │
│  H3 ‹NovaMind AI›  ── summary, 2 lines ─────────               │
│  ───────────────────────────────────────────────────           │
│  LABEL ENTERPRISE SOFTWARE ENGINEERING                         │
│  H3 ‹Edge10 — NHL Athlete Performance›  ── 2 lines ──          │
│  ───────────────────────────────────────────────────           │
│  ‹Compare all four case studies {arrow-right}›                 │
├───────────────────────────────────────────────────────────────┤
│  BAND 5 — H2 How the work gets made  ‹Read the workflow›       │
├───────────────────────────────────────────────────────────────┤
│  BAND 6 — H2 Work with me  ‹What to bring {arrow-right}›       │
├───────────────────────────────────────────────────────────────┤
│  FOOTER                                                        │
└───────────────────────────────────────────────────────────────┘
```

◇ **Band 4 stays a single column at desktop.** Two columns would produce three visually equivalent projects and recreate the menu that featuring exists to avoid.

◇ **Band 4's `/work` affordance is present at every breakpoint**, including mobile. `/work` is the comparison surface, and the invitation to compare belongs where breadth has just been established — which is true at 375 px as much as at 1280 px. Hiding it on mobile to economise vertical space would be desktop-first reasoning inverted, and it would leave a mobile reader's only route to comparison behind the `{menu}` toggle.

◇ Hairlines separate band 4's entries. Sections are otherwise separated by space alone (`SPACING.md` §4).

---

## 7. Component mapping

| Element | Component | Source |
|---|---|---|
| Skip link | Skip link | `COMPONENT_GUIDELINES.md` §3.1 |
| Header, nav, theme control | Header · Mobile nav overlay | §3.1, §3.2 |
| H1, positioning, prose | Prose / Text primitives | `ARCHITECTURE.md` §3 |
| Stack line | Stack tag, non-interactive | §5.2 |
| Hero links, band links | Link | §2.1 |
| Band 2 closing statement | Composed section, display face. **Not** the Pull quote component — §8.2 forbids a pull quote introducing new content, and this sentence appears nowhere else in band 2 | §8.2 |
| Lifecycle badge | Lifecycle badge | §5.1 |
| Band 3, 4, 5, 6 | Composed sections in `components/sections/` | `ARCHITECTURE.md` §3 |
| Footer | Footer | §3.3 |

**No new components.** Band 4 is a composed section rather than project cards, per `HOMEPAGE_NARRATIVE.md` §4.

## 8. Ledger mapping

| Band | Resolves |
|---|---|
| 1 Hero | R1 role and seniority · R2 technologies · R3 real production work · R5 contact |
| 2 Qualification | H5 is the AI-workflow claim substance |
| 3 Featured | H1 shipped something real · H4 decisions actually made · S2 alternatives considered · S3 what "correct" means |
| 4 Additional | H2 breadth · C6 what problems they can solve |
| 5 Workflow | H5 at depth · C1 how decisions get made |
| 6 Connect + footer | C7 what to bring · C8 will they reply · C9 how to reach them · R5 |

## 9. Design rationale

**Band 2 precedes band 3 because an unanswered objection discounts the evidence that follows it.** `FOUNDATION.md` §3 goal 4 requires the workflow objection be answered before the reader has to ask it. A reader who reaches OrchestAI still suspecting agents wrote it unsupervised reads a case study that proves nothing, and discounted evidence cannot be re-presented.

**Band 3 links only to the case study — there is no source link here.** The repository belongs inside the case study, where the reader already understands the architectural decisions and the trade-offs that produced them. Offering it on the homepage sends a reader off-site roughly 250 words in, having seen almost nothing, and `EXPERIENCE_FLOW.md` §8 rates a source link that does not return as a high-cost leak. The in-case-study placement is protected by unread sections below it; band 3 has no such protection. One band, one exit.

**Band 3 gives one decision properly rather than nine sections briefly.** The two H3s — the decision, and how correctness was established — are the two things that make a reader want the full document. A summary of all nine sections would make the case study feel already read, which is the specific cannibalisation risk in `HOMEPAGE_NARRATIVE.md` §4.

**Band 4 is lighter than band 3 on purpose.** Equal weight across three projects is a menu. The asymmetry says *this is one of three kinds* without asking the reader to choose.

**The philosophy statement in band 2 is set in the display face but is not the Pull quote component.** `COMPONENT_GUIDELINES.md` §8.2 requires a pull quote to repeat something already in the surrounding prose — a reader who skips it must lose nothing. This sentence appears nowhere else on the homepage, so treating it as a pull quote would use the component outside its specified intent. It is the closing statement of band 2's composed section: same display face, same break-out at desktop, different component. Stated once; repeating it elsewhere would be a page that does not believe it landed.

## 10. What was deliberately removed

- **Hero image** — consumes the entire above-fold image budget for something typography carries better (`IMAGERY.md` §14)
- **Technology logo grid** — `FOUNDATION.md` §12 non-goal; the stack line names technologies in text instead
- **Metrics in band 3** — no metric is required to make one decision legible, and three adjacent metrics would pull weight away from the reasoning
- **A "featured" ribbon or badge on band 3** — position and depth already communicate primacy
- **Cards in band 4** — forbidden by `HOMEPAGE_NARRATIVE.md` §4
- **A seventh band** — §4 is closed; anything further belongs on a route
- **Any call to action in band 6** — `EXPERIENCE_PRINCIPLES.md` §3 refuses urgency and obligation

## 11. Accessibility

One `<h1>` (band 1). Bands 2–6 open at `<h2>`; band 3's two subsections are `<h3>`. Landmarks: `banner`, `main`, `contentinfo`. Tab order: skip link → wordmark → nav (4) → theme → hero links (2) → band 3 links (2) → band 4 links (3) → band 5 link → band 6 link → footer links. Matches visual order. All targets ≥ 44 × 44 px. Hierarchy survives greyscale — it is carried by scale, weight, face, and space.

## 12. Open questions

None blocking. `HOMEPAGE_NARRATIVE.md` §10 records none outstanding.

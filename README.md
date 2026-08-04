# jigargajjar.dev

Personal site of Jigar Gajjar — Senior Full-Stack Engineer building production systems through an AI-native engineering workflow: architecting, directing, and verifying while AI agents implement.

**This repository is specification-first.** The site is not built yet. What exists is the complete design and architecture specification, written before any application code, and it is the primary artifact here. If you are evaluating the engineering rather than the output, the documentation *is* the output.

## Start here

| If you have | Read |
|---|---|
| **2 minutes** | [`docs/FOUNDATION.md`](docs/FOUNDATION.md) §2 — why this exists, and the thesis it argues |
| **10 minutes** | [`docs/DECISIONS.md`](docs/DECISIONS.md) — 14 ADRs, each with alternatives considered and why they were rejected |
| **30 minutes** | [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), then [`docs/design/DESIGN_SYSTEM.md`](docs/design/DESIGN_SYSTEM.md) |
| **A specific question** | [`docs/ROADMAP.md`](docs/ROADMAP.md) §5 maps every route to the document that specifies it |

## The thesis

> Engineering is no longer constrained by writing code. It is constrained by making correct technical decisions.

Code production is commoditising. What does not commoditise is architecture, technical leadership, product thinking, verification discipline, and decision quality. This site is an argument for that position, made in the only form that is honest — by being an instance of it.

The corollary, and the reason the documentation exists at all:

> Engineering is not measured by how quickly code is written, but by how confidently it can be verified.

## Repository layout

```
docs/
├── FOUNDATION.md          Vision, audiences, positioning, success criteria, non-goals
├── ARCHITECTURE.md        Stack, rendering model, routes, content model, budgets, CI
├── DECISIONS.md           ADR-001 – ADR-014
├── ROADMAP.md             Phase sequence, freeze register, freeze policy
└── design/                17 documents — the design system and experience layer
```

`docs/design/DESIGN_SYSTEM.md` §4 maps the design directory and carries the authority table that resolves overlaps between documents.

## What is decided

Next.js App Router, statically rendered on Vercel. TypeScript strict. Tailwind driven by a three-layer token system. MDX case studies with build-time schema validation. Zero third-party requests — no analytics, no CDN fonts, no embeds.

Hard budgets, enforced in CI rather than aspired to: LCP ≤ 1.5 s, CLS ≤ 0.05, first-load JS ≤ 120 KB gzipped, Lighthouse Performance ≥ 95, Accessibility 100. WCAG 2.2 AA is a release requirement, and body text targets roughly 14:1 contrast — well past AAA.

Eight routes. Two webfont families, four weight values, one accent hue, four motion durations, fifteen icons. Each of those sets is closed, and opening one requires a decision record.

## Status

| Phase | Status |
|---|---|
| 1 — Foundation | Complete · frozen |
| 2 — Design system | Complete · frozen |
| 3 — Experience & narrative | Complete · frozen |
| 4 — Wireframes | Next |
| 5–7 — Implementation, content, launch verification | Not started |

Documentation is frozen under [`docs/ROADMAP.md`](docs/ROADMAP.md) §6. From here, documentation changes are bug fixes; new ideas require an ADR or a future milestone. Implementation follows the specification rather than redesigning it.

## Licence

Code is MIT ([`LICENSE`](LICENSE)). Written content and case studies are not — they are the author's work and are not licensed for reuse.

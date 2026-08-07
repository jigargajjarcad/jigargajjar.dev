/**
 * Résumé content — `docs/wireframes/07-resume.md`, `ROUTE_SPECIFICATIONS.md` §3.
 *
 * A data module rather than MDX: the résumé is a fixed structure with typed
 * fields, not authored prose, and the page renders only the sections that carry
 * data. That is what lets the route ship with its structure verified while the
 * owner-supplied fields are still outstanding — an empty section is omitted
 * rather than rendered as a placeholder, because `INTERACTION.md` §8 requires
 * that absence be expressed by absence.
 *
 * **Fields marked OWNER are deliberately empty.** They are biographical fact
 * and are not inferred, guessed, or filled from context.
 */

/**
 * Identity comes from `site.ts` so the résumé cannot state a different position
 * from the homepage. Re-exported for this module's own consumers.
 */
export { NAME, POSITIONING } from './site';

/** Shared with `/connect` via `site.ts` so the two cannot disagree. */
export { contact } from './site';

export type ExperienceEntry = {
  role: string;
  organisation: string;
  /** ISO 8601, for the `datetime` attribute (wireframe §11). */
  start: string;
  /** `null` means current. */
  end: string | null;
  /** Display form, e.g. "2022 — Present". Tabular figures, `TYPOGRAPHY.md` §7. */
  period: string;
  /**
   * Two to three lines of prose. `ROUTE_SPECIFICATIONS.md` §3 requires prose,
   * never a bulleted responsibility list: a bullet holds a fact, prose holds
   * what was owned and what changed.
   *
   * Optional because the source profile carries no description for three of the
   * five roles. An entry without one renders as role, organisation and dates —
   * which is true — rather than as invented prose.
   */
  summary?: string;
};

/**
 * Source: the owner's LinkedIn profile, supplied 2026-08-05. Reverse
 * chronological.
 *
 * **Edge10 entries are written to `FOUNDATION.md` §10 under the owner's Version 1
 * interpretation:** architecture-level detail plus anonymised impact. The NHL is
 * named because it is already public on the profile. Deliberately excluded —
 * athlete counts, sport and league counts, customer names, the product's
 * internal name, compliance regimes, and any proprietary benchmark. The one
 * performance claim carries its shape without its numbers.
 */
export const experience: ExperienceEntry[] = [
  {
    role: 'AI-Native Full-Stack Engineer',
    organisation: 'Edge10 Group',
    start: '2025-02',
    // Closed at the owner's instruction, 2026-08-07. `end` moves with `period`
    // rather than staying `null`: null is this type's encoding for "current",
    // and a role displaying a closing date while the data still calls it current
    // is the kind of quiet disagreement this module exists to prevent.
    end: '2026-03',
    period: 'February 2025 — March 2026',
    summary:
      'Delivers production features, migrations and defect fixes on a live NHL athlete ' +
      'management platform entirely through AI-directed development, with no manually ' +
      'written code since February 2025. Designed and deployed three agentic systems into ' +
      "the team's workflow: an API validation agent that audits new .NET endpoints against " +
      'coding standards and authorisation policies before they ship, a frontend validation ' +
      'agent that checks React changes on every pull request, and an end-to-end testing ' +
      'agent that runs once a change is complete, reducing manual QA effort across the ' +
      'team. Integrated MCP servers into everyday development to extend the toolchain for ' +
      'multi-step work.',
  },
  {
    role: 'Full Stack Developer',
    organisation: 'Edge10 Group',
    start: '2022-11',
    end: '2025-01',
    period: 'November 2022 — January 2025',
    summary:
      'Owned features end to end on the same platform: C# .NET APIs on a CQRS architecture ' +
      'with authorisation policies and command and query handlers, SQL Server schema ' +
      'design, stored procedures and access-control policies over sensitive athlete health ' +
      'and performance data, and React interfaces for practitioners and coaches. Led ' +
      'legacy-to-modern migrations independently, preserving data integrity and feature ' +
      "parity. Re-architected one feature's data layer from LINQ to native stored " +
      'procedures, taking its load time from minutes to under a second.',
  },
  {
    role: 'Full Stack Engineer',
    organisation: 'Bombardier',
    start: '2022-08',
    end: '2022-11',
    period: 'August 2022 — November 2022',
    summary:
      'Built and maintained internal enterprise applications supporting production and progress ' +
      'tracking for business-jet interior components, used across departments through role-based ' +
      'access. Worked across the stack — C#, ASP.NET MVC, .NET Framework and .NET Core, SQL ' +
      'Server, React — implementing frontend and backend features and resolving defects inside an ' +
      'established enterprise environment.',
  },
  {
    role: 'Full Stack Developer',
    organisation: 'MBC Managed IT Services',
    start: '2021-03',
    end: '2022-08',
    period: 'March 2021 — August 2022',
    summary:
      'Delivered enterprise web applications for external clients in the real estate and ' +
      'manufacturing sectors. Built and consumed REST APIs in C# across ASP.NET MVC, .NET ' +
      'Framework and .NET Core, implemented business features against SQL Server, produced ' +
      'reporting through Crystal Reports, and worked in both React and Angular front ends across ' +
      'concurrent client projects.',
  },
  {
    role: 'Full Stack Developer',
    organisation: 'Infinity Network Solutions',
    start: '2018-01',
    end: '2019-11',
    period: 'January 2018 — November 2019',
    summary:
      'Developed and maintained modules of an ERP system used by client businesses, working across ' +
      'backend and frontend: REST APIs, SQL Server, Crystal Reports output, and React and Angular ' +
      'interfaces, alongside production issue resolution. When a teammate became unavailable ' +
      'shortly before a committed release with a feature still incomplete, took over the remaining ' +
      'work and saw it through testing so the release shipped on schedule.',
  },
];

export type Project = {
  /** Matches a case-study slug where one exists, so the entry can link once published. */
  slug: string;
  name: string;
  /** The competency label `/work` uses for the same project, so the two agree. */
  kind: string;
  /** Rendered as the metadata column, in the same position as an employer's dates. */
  stack: string[];
  /**
   * Two to three lines. The test is whether a recruiter who never opens the case
   * study still learns what was built, what was architecturally decided, and
   * what was hard — `ROUTE_SPECIFICATIONS.md` §3's prose rule applied to
   * projects rather than roles.
   */
  description: string;
};

/**
 * Renamed from `selectedWork` and expanded — ADR-032.
 *
 * **"Selected work" was three one-line labels**, each naming a competency and a
 * stack and saying nothing about what was built. On a résumé that is the section
 * carrying the strongest technical evidence, and it was the thinnest thing on
 * the page: a reader had to leave the document to learn anything at all.
 *
 * Every clause below is drawn from the case study's own frontmatter — its
 * `summary`, `role` and `outcomes` — rather than written fresh, so the résumé
 * cannot claim more than the case study substantiates. Wireframe §9: nothing
 * here is not also true elsewhere. That cuts both ways, which is why NovaMind
 * states that its verification stayed manual: the case study says so, and a
 * résumé quietly omitting what the linked document admits is the discrepancy
 * §9 exists to prevent.
 *
 * Each links to its case study only once that study is published — an entry
 * pointing at a draft would 404 and fail gate 12.
 *
 * OrchestAI's `kind` is corrected against ADR-019: the wireframe predates it and
 * reads "AI infrastructure and framework engineering". The framework claim is
 * withdrawn.
 */
export const projects: Project[] = [
  {
    slug: 'orchestai',
    name: 'OrchestAI',
    kind: 'AI infrastructure engineering',
    stack: ['.NET 8', 'ASP.NET Core', 'MediatR', 'EF Core 8', 'PostgreSQL', 'MCP'],
    description:
      'Multi-tenant agent orchestration service exposed over HTTP, where the guarantees are ' +
      'enforced by infrastructure rather than by convention. Tenant isolation fails closed ' +
      'through EF Core query filters and a database constraint rather than developer ' +
      'discipline; admission, budget and rate decisions resolve before any model call, so ' +
      'rejected work never partially executes; and every run emits OpenTelemetry-shaped trace ' +
      'and span identifiers, making an execution reconstructable end to end. Sole engineer — ' +
      'architecture, decision records and verification strategy.',
  },
  {
    slug: 'novamind-ai',
    name: 'NovaMind AI',
    kind: 'AI product engineering',
    stack: ['Python 3.11', 'FastAPI', 'pgvector', 'React 18', 'Voyage AI', 'Claude'],
    description:
      'Document-intelligence platform built to implement the full retrieval lifecycle directly, ' +
      'without managed retrieval services or a RAG framework in between. Retrieval runs as four ' +
      'inspectable stages — embed, vector search, rerank, cited generation — rather than one ' +
      'opaque call, and every answer carries a citation to the passage supporting it. Vectors ' +
      'live in the same PostgreSQL instance as users and documents, so a document and its ' +
      'embeddings commit together. Sole engineer through deployment; verification stayed manual.',
  },
  {
    slug: 'edge10-athlete-performance',
    name: 'Edge10 platform',
    kind: 'Enterprise engineering',
    stack: ['C# .NET', 'CQRS', 'SQL Server', 'React'],
    // Deliberately the shortest of the three. The Experience section above
    // carries this work across two roles, and repeating it here would spend the
    // reader's attention on the one project they have already read about.
    description:
      'Athlete performance and health platform in professional sport. Feature ownership end to ' +
      'end on a CQRS .NET codebase over access-controlled SQL Server data, detailed under ' +
      'Experience above.',
  },
];

/**
 * A grouped list, never a skills matrix. No proficiency ratings, no bars, no
 * star counts — those are unverifiable claims presented as data (wireframe §4).
 */
export const technologies: { group: string; items: string[] }[] = [
  { group: 'Backend', items: ['C# .NET', 'CQRS', 'MediatR', 'PostgreSQL', 'SQL Server'] },
  { group: 'Frontend', items: ['React', 'TypeScript', 'Next.js'] },
  { group: 'AI', items: ['Anthropic SDK', 'MCP', 'RAG'] },
];

export type Education = { qualification: string; institution: string; year: string };

/** Source: the owner's LinkedIn profile, supplied 2026-08-05. */
export const education: Education[] = [
  {
    qualification: 'Web Design & Computer Programming',
    institution: 'CDI College',
    year: '2020 — 2022',
  },
  {
    qualification: 'Bachelor of Computer Applications (BCA), Information Technology',
    institution: 'Veer Narmad South Gujarat University, Surat',
    year: '2011 — 2014',
  },
];

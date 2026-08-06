/**
 * Home page content models — Version 3, ADR-022.
 *
 * V2 kept its content here for the reason `site.ts` gives: a fact inside a
 * component is a fact nobody reviews. V3 keeps that and adds a harder rule.
 *
 * **Three registers, and they are never mixed.**
 *
 *   Measured    A number produced by a tool and recorded in `measured.json`,
 *               re-verified on every CI run. Never typed by hand into this file.
 *   Structural  A property of the code — an order, a containment, a constraint.
 *               Checkable by reading the repository it cites.
 *   Absent      A thing that is not known, stated as not known.
 *
 * The third register is the one that matters. A portfolio reporting only the
 * first two is indistinguishable from one that omits its failures, and a reader
 * senior enough to be worth convincing knows every real system has them.
 * `NOT_VERIFIED`, and the uncontained rows of `FAILURE_MODES`, are not a
 * disclaimer section — they are load-bearing evidence, and deleting them would
 * make this page less credible rather than more.
 *
 * Every claim below cites where it comes from. Nothing here is an adjective.
 */

import type { GraphEdge, GraphNode } from '@/components/system/SystemGraph';

/* ────────────────────────────────────────────────────────────────────────────
 * 1. The opening claim
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * The home page `<h1>` (ADR-020, retained by ADR-022).
 *
 * `POSITIONING` in `site.ts` is unchanged, remains the document description, and
 * still appears verbatim on this page. This is the claim; that is the category.
 */
export const THESIS = 'I build AI systems that survive production.';

/**
 * The line introducing the live trace beside the thesis.
 *
 * Phrased as an instruction to look rather than as a boast, because the numbers
 * arriving underneath it are the boast and they are about the reader's own
 * machine. A sentence claiming the page is fast, sitting directly above a
 * measurement of the page being fast, is the weaker of the two.
 */
export const TRACE_LEAD = 'This page is measuring its own delivery to you.';

/* ────────────────────────────────────────────────────────────────────────────
 * 2. Traces
 *
 * One notation, three uses. The reader learns to read a span waterfall on their
 * own page load — where every number is real, live, and about them — then
 * applies it to two systems they have never seen.
 *
 * **The page-load trace has milliseconds. The system traces deliberately do
 * not.** OrchestAI has no production traffic and NovaMind's deployment has no
 * meaningful load; a latency figure on either would be invented, and a reader
 * who checked the case study would find nothing behind it. Their bars encode
 * span *containment* — which step runs inside which — which is a real property
 * of the code and the thing a trace is actually for.
 * ──────────────────────────────────────────────────────────────────────────── */

export type TraceNode = {
  readonly id: string;
  readonly label: string;
  /** What the step does. Names the mechanism, never the category. */
  readonly detail: string;
  /** Right-hand readout: a shape, a guarantee, a constraint. Never a duration. */
  readonly value?: string;
  readonly children?: readonly TraceNode[];
};

/** The spans the live trace reports, in order. Timings come from the browser. */
export const PAGE_SPANS = [
  { id: 'dns', label: 'DNS', detail: 'Domain lookup' },
  { id: 'connect', label: 'Connect', detail: 'TCP handshake and TLS negotiation' },
  { id: 'request', label: 'Request', detail: 'Time to first byte from the edge' },
  { id: 'response', label: 'Response', detail: 'Statically rendered HTML — no origin compute' },
  { id: 'parse', label: 'Parse', detail: 'HTML parsed to an interactive document' },
  { id: 'paint', label: 'First paint', detail: 'Text visible in the metric-matched fallback face' },
  { id: 'lcp', label: 'Largest paint', detail: 'The opening statement, in the webfont' },
  {
    id: 'hydrate',
    label: 'Hydrate',
    detail: 'Client islands attach. The page was readable well before this',
  },
] as const;

/**
 * OrchestAI, one run — from the OrchestAI case study.
 *
 * Every `detail` is a mechanism stated in that document: the reflective query
 * filter, the row lock, the interceptor, the anti-corruption layer, the
 * `System.Diagnostics` identifiers. A reader can open the repository and find
 * each one. That is the only kind of claim this trace is permitted to make.
 */
export const AGENT_TRACE: TraceNode = {
  id: 'run',
  label: 'POST /v1/runs',
  detail: 'An authenticated request to execute an agent run',
  value: 'HTTP · API key',
  children: [
    {
      id: 'admission',
      label: 'admission',
      detail: 'Every decision that can reject the run resolves here, before the first model call',
      value: 'fails closed',
      children: [
        {
          id: 'auth',
          label: 'authenticate',
          detail:
            'The API key resolves to a tenant. The default system tenant is unauthenticatable — a Postgres CHECK constraint forbids any key row against it',
          value: 'DB constraint',
        },
        {
          id: 'scope',
          label: 'scope to tenant',
          detail:
            'EF Core global query filters, applied by reflection to every ITenantScoped entity. The predicate never degrades to TRUE when no tenant is present',
          value: 'no TRUE fallback',
        },
        {
          id: 'budget',
          label: 'reserve budget',
          detail:
            'SELECT … FOR UPDATE on the tenant row, in the same transaction as the Pending → Running change. Over budget rejects cleanly and never truncates',
          value: 'atomic',
        },
        {
          id: 'rate',
          label: 'rate check',
          detail: 'Resolved before dispatch, like every other admission decision',
          value: 'pre-dispatch',
        },
      ],
    },
    {
      id: 'orchestrate',
      label: 'orchestrate',
      detail:
        'Scheduling, checkpointing and streaming are the orchestrator’s concern. An agent that knew how it was scheduled could only be scheduled one way',
      value: 'parallel · sequential',
      children: [
        {
          id: 'agent',
          label: 'agent turn',
          detail:
            'Agents depend on ILlmProviderFactory and carry zero vendor SDK imports — the boundary changes the vocabulary, not only the transport',
          value: 'ILlmProvider',
        },
        {
          id: 'tool',
          label: 'MCP tool call',
          detail: 'Tools registered by concrete type. No assembly scanning, no AddAgent of T',
          value: 'explicit',
        },
      ],
    },
    {
      id: 'persist',
      label: 'persist',
      detail:
        'A TenantScopingInterceptor stamps TenantId on write and rejects a mismatch rather than correcting it',
      value: 'rejects mismatch',
    },
    {
      id: 'trace',
      label: 'emit trace',
      detail:
        'ActivityTraceId and ActivitySpanId from System.Diagnostics rather than a bespoke scheme — reconstructable in any OpenTelemetry consumer',
      value: 'OTel-shaped',
    },
  ],
};

/**
 * NovaMind, one query — from the NovaMind case study.
 *
 * The `value` column is the payload leaving each span, and it is why this trace
 * is worth drawing: ten narrowing to five before generation is the one
 * non-obvious decision in the pipeline, and it is legible in a single column.
 */
export const RETRIEVAL_TRACE: TraceNode = {
  id: 'query',
  label: 'POST /query',
  detail: 'A question asked against a user’s own documents',
  value: '1 question',
  children: [
    {
      id: 'embed',
      label: 'embed',
      detail:
        'voyage-3 at 1024 dimensions, matching the 512-token chunks with 50 tokens of overlap that ingestion produced. An informed selection, not a measured one',
      value: '1 × 1024',
    },
    {
      id: 'search',
      label: 'vector search',
      detail:
        'HNSW index in pgvector, in the same PostgreSQL as users and documents — a document and its embeddings commit together or not at all',
      value: '10 candidates',
    },
    {
      id: 'rerank',
      label: 'rerank',
      detail:
        'rerank-2-lite. Similarity reliably returns relevant chunks; it does not reliably return the best ones, and the model sees only what it is given',
      value: '5 passages',
    },
    {
      id: 'generate',
      label: 'generate',
      detail:
        'Claude, streaming. Five passages, not ten — narrowing before generation is the difference between grounding an answer and burying it',
      value: '1 answer',
    },
    {
      id: 'cite',
      label: 'resolve citations',
      detail:
        'Every reference in the output resolves back to the passage supporting it. Without this the system is a summariser',
      value: 'n → source chunks',
    },
  ],
};

/* ────────────────────────────────────────────────────────────────────────────
 * 3. The pipeline that produced this page
 * ──────────────────────────────────────────────────────────────────────────── */

export type Stage = {
  readonly id: string;
  readonly name: string;
  readonly artifact: string;
  /** What this stage prevents. One clause. */
  readonly prevents: string;
};

export const PIPELINE: readonly Stage[] = [
  {
    id: 'problem',
    name: 'Problem',
    artifact: 'FOUNDATION.md',
    prevents: 'Building what was easiest to describe',
  },
  {
    id: 'architecture',
    name: 'Architecture',
    artifact: 'ARCHITECTURE.md',
    prevents: 'Meeting the trust boundary at review',
  },
  {
    id: 'decision',
    name: 'Decision',
    artifact: 'DECISIONS.md',
    prevents: 'Relitigating a settled choice',
  },
  {
    id: 'implementation',
    name: 'Claude Code',
    artifact: 'feature branch',
    prevents: 'Typing being mistaken for the scarce part',
  },
  {
    id: 'verification',
    name: 'Verification',
    artifact: 'npm run ci',
    prevents: 'Confidence resting on the author being careful',
  },
  {
    id: 'release',
    name: 'Release',
    artifact: 'main',
    prevents: 'A budget raised because shipping was close',
  },
  {
    id: 'retrospective',
    name: 'Retrospective',
    artifact: 'case study',
    prevents: 'The next plan assuming it again',
  },
];

/**
 * What stage 5 does not reach.
 *
 * This sits directly beside the green numbers, and the adjacency is the design.
 * A verification section showing only what passes describes a system nobody has
 * looked at hard enough. Every entry is condensed from a document that already
 * admits it; none is hypothetical.
 */
export const NOT_VERIFIED = [
  {
    id: 'behaviour',
    claim: 'Whether model output is any good',
    reality:
      'No assertion can establish that a generated response is correct the way it can establish that a tenant filter is correct. OrchestAI has an evaluation system for exactly this, and its regression threshold is engineering judgement — it has not been validated against observed run-to-run variance.',
    source: 'OrchestAI · Verification',
  },
  {
    id: 'novamind',
    claim: 'NovaMind, automatically',
    reality:
      'It has no automated test suite at all. Verification stayed manual throughout: a fixed document set and a fixed set of questions, re-run by hand after every change to chunking, retrieval limits, or ranking.',
    source: 'NovaMind · Verification',
  },
  {
    id: 'retrieval',
    claim: 'That the retrieval defaults are right',
    reality:
      'No sweep over chunk sizes or overlaps was carried out, and no comparison against other embedding models was run. 512 and 50 are defaults that were watched, not tuned.',
    source: 'NovaMind · What was not measured',
  },
  {
    id: 'real-users',
    claim: 'How this page performs for real people',
    reality:
      'Every figure here is a lab measurement on an emulated mid-tier phone, plus whatever your own browser just reported above. There is no real-user monitoring, because there is no third-party analytics — a privacy position that costs precisely this.',
    source: 'ARCHITECTURE.md §10 · ADR-009',
  },
] as const;

/* ────────────────────────────────────────────────────────────────────────────
 * 4. Failure modes
 *
 * Every entry names the failure first and the mechanism second, because a reader
 * senior enough to matter is scanning for the failure, not for the feature.
 * `status` is the honest axis and the uncontained rows are the point.
 * ──────────────────────────────────────────────────────────────────────────── */

export type FailureMode = {
  readonly id: string;
  /** The thing that goes wrong. */
  readonly failure: string;
  /** What happens, mechanically. */
  readonly response: string;
  readonly status: 'contained' | 'degrades' | 'open';
  /** Topology node ids that enforce this. Drives the containment map. */
  readonly enforcedBy: readonly string[];
  readonly source: string;
};

export const FAILURE_MODES: readonly FailureMode[] = [
  {
    id: 'cross-tenant',
    failure: 'A query forgets its tenant',
    response:
      'It returns nothing. The global query filter is applied by reflection to every ITenantScoped entity, and its predicate never degrades to TRUE when no tenant is in scope — the absence of a tenant is not a wildcard.',
    status: 'contained',
    enforcedBy: ['admission', 'db'],
    source: 'OrchestAI · tenant isolation',
  },
  {
    id: 'wrong-tenant-write',
    failure: 'A write carries the wrong tenant',
    response:
      'It is rejected, not corrected. The TenantScopingInterceptor stamps TenantId on write and refuses a mismatch, so a bug surfaces as a failed write rather than as silently misfiled data.',
    status: 'contained',
    enforcedBy: ['db'],
    source: 'OrchestAI · tenant isolation',
  },
  {
    id: 'budget',
    failure: 'A tenant exceeds its budget mid-run',
    response:
      'It cannot. Budget is reserved atomically under SELECT … FOR UPDATE in the same transaction as Pending → Running, so the run is rejected before dispatch — Failed status, a specific error, a RejectionEvent row. Output is never truncated.',
    status: 'contained',
    enforcedBy: ['admission'],
    source: 'OrchestAI · budget reservation',
  },
  {
    id: 'vendor',
    failure: 'The model vendor changes its SDK',
    response:
      'Agents carry zero vendor imports and depend on ILlmProviderFactory. This was believed contained long before it was: the original wrapper hid the transport while vendor request and response types kept surfacing in agent tests. A wrapper hides transport; a boundary changes vocabulary.',
    status: 'contained',
    enforcedBy: ['orchestrator', 'tools'],
    source: 'OrchestAI · Failures and mistakes',
  },
  {
    id: 'quality',
    failure: 'A prompt change makes answers quietly worse',
    response:
      'Evaluations exist to catch it, because the deterministic suite structurally cannot. The regression check compares against a tolerance band, and that band is engineering judgement — it has not been calibrated against observed variance. This is detection, not a guarantee.',
    status: 'degrades',
    enforcedBy: ['orchestrator'],
    source: 'OrchestAI · the threshold is not calibrated',
  },
  {
    id: 'drift',
    failure: 'The description drifts away from the software',
    response:
      'Nothing catches this. It happened here: the framework framing survived until the case study was checked line by line against the source, and two further claims failed the same check in the same session. The correction was a decision record, not a mechanism. There is still no gate.',
    status: 'open',
    enforcedBy: [],
    source: 'ADR-019',
  },
];

/* ────────────────────────────────────────────────────────────────────────────
 * 5. The containment map
 *
 * Retained from V2 and given a job. No longer hero decoration: selecting a
 * failure lights the parts of the system that contain it, so the map answers
 * "where does this get stopped" rather than "what components exist".
 * ──────────────────────────────────────────────────────────────────────────── */

export const MAP_VIEWBOX = [520, 296] as const;

export const MAP_NODES: readonly GraphNode[] = [
  { id: 'client', label: 'CLIENT', x: 62, y: 34, w: 100, depth: 0, kind: 'boundary' },
  {
    id: 'admission',
    label: 'ADMISSION',
    sub: 'tenant · budget · rate',
    x: 268,
    y: 34,
    w: 200,
    depth: 1,
  },
  { id: 'orchestrator', label: 'ORCHESTRATOR', x: 268, y: 150, w: 200, depth: 2 },
  { id: 'tools', label: 'AGENTS · MCP', x: 440, y: 258, w: 140, depth: 3 },
  { id: 'db', label: 'POSTGRES', x: 150, y: 258, w: 160, depth: 3, kind: 'boundary' },
];

export const MAP_EDGES: readonly GraphEdge[] = [
  { from: 'client', to: 'admission' },
  { from: 'admission', to: 'orchestrator' },
  { from: 'orchestrator', to: 'tools' },
  { from: 'orchestrator', to: 'db' },
];

export const MAP_LABEL =
  'A simplified OrchestAI topology used as a containment map: a client reaches an ' +
  'admission stage resolving tenant, budget and rate limits; admitted work reaches ' +
  'the orchestrator, which drives agents and MCP tools and writes to PostgreSQL.';

/* ────────────────────────────────────────────────────────────────────────────
 * 6. Refusals
 *
 * Where the obvious modern answer was rejected, and what it cost.
 *
 * Everyone can list what they adopted; adoption is a purchase decision. What
 * separates an engineer worth hiring is the set of things they declined and can
 * still defend. Every entry states a cost, because a refusal with no cost is not
 * a decision, it is a preference.
 * ──────────────────────────────────────────────────────────────────────────── */

export type Refusal = {
  readonly id: string;
  /** The default answer. What most people would have done. */
  readonly obvious: string;
  /** What was done instead. */
  readonly instead: string;
  readonly why: string;
  /** What the refusal cost. Never omitted. */
  readonly cost: string;
  readonly source: string;
};

export const REFUSALS: readonly Refusal[] = [
  {
    id: 'framework',
    obvious: 'Ship it as the .NET agent framework',
    instead: 'Describe it as the orchestration service it actually became',
    why: 'The extension point that would make it a framework does not exist — six fixed agent types, registration by concrete type, no public surface to extend. The framing was written at Phase 1 and the implementation moved away from it.',
    cost: 'The single most marketable sentence about the flagship project, withdrawn, from documents that were already frozen.',
    source: 'ADR-019',
  },
  {
    id: 'rag-framework',
    obvious: 'Assemble the retrieval pipeline from a framework',
    instead: 'Build ingestion, embedding, search, reranking and citation resolution directly',
    why: 'The project existed to learn the retrieval lifecycle end to end. A framework would have skipped the exact part it was built for.',
    cost: 'Nine days of a single engineer on a problem with existing solutions, and a system that shipped with no automated tests.',
    source: 'NovaMind · what was deliberately left out',
  },
  {
    id: 'vector-db',
    obvious: 'Put the vectors in a dedicated vector database',
    instead: 'pgvector, in the same PostgreSQL as users and documents',
    why: 'One database to deploy, monitor and back up — and a document commits with its embeddings, or neither commits.',
    cost: 'Said plainly in the case study rather than hidden: a dedicated index would very likely serve a far larger corpus better, and this is not the choice to defend for internet-scale search.',
    source: 'NovaMind · embeddings in Postgres',
  },
  {
    id: 'passthrough',
    obvious: 'Pass the vector results straight to the model',
    instead: 'Retrieve ten, rerank, send five',
    why: 'Similarity reliably returns relevant chunks and does not reliably return the best ones. The model sees only what it is given.',
    cost: 'A second network round trip, and its latency on every single query.',
    source: 'NovaMind · reranking',
  },
  {
    id: 'animation',
    obvious: 'Use an animation library for this page',
    instead: 'CSS transitions, SVG, and one IntersectionObserver',
    why: 'The library measured at 95× the cost of the behaviour actually needed, against a first-load budget that ADR-006 does not permit raising for a visual effect.',
    cost: 'Every interaction here had to be built and tested by hand, including the keyboard and reduced-motion paths a library would have supplied.',
    source: 'ADR-018 · ADR-021',
  },
  {
    id: 'budget',
    obvious: 'Raise the font budget so the type could stay',
    instead: 'Drop an optical-size axis and the italic face',
    why: 'A budget that can be quietly raised when it becomes inconvenient is not a budget. The documented reduction ladder was applied in order instead.',
    cost: 'No true italic anywhere on this site. Emphasis is set in the display serif roman — a compromise a typographer notices immediately.',
    source: 'ADR-006 · TYPOGRAPHY.md §5',
  },
];

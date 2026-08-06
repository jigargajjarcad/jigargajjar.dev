/**
 * Home page content models — ADR-020.
 *
 * The V2 home page is built from diagrams rather than paragraphs, and a diagram
 * is data. Keeping that data here rather than inside the components is the same
 * decision `site.ts` makes for the positioning sentence, for the same reason: a
 * fact that appears in a component is a fact nobody can review.
 *
 * **Everything in this file is checkable against a case study.** The node names,
 * the chunk size, the embedding dimensions, the candidate counts, the agent
 * roster — each is stated in a file under `content/case-studies/` and is cited
 * in the comment above its block. A diagram that flatters the architecture is worse
 * than no diagram, because it is the one artefact a reader assumes was drawn
 * from the code. When a case study changes, this file is reviewed with it.
 */

import type { GraphEdge, GraphNode } from '@/components/system/SystemGraph';

/* ────────────────────────────────────────────────────────────────────────────
 * 1. The opening statement
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * The home page `<h1>` — ADR-020.
 *
 * `POSITIONING` in `site.ts` remains the site's canonical self-description and
 * is still rendered on this page, still verbatim, immediately beneath this
 * sentence. What changed is which of the two leads. `POSITIONING` names a
 * category and lists disciplines; it is the right sentence for a `<meta
 * name="description">` and the wrong one for the first three seconds of a visit,
 * because a category is not a claim and nobody has ever remembered a list.
 *
 * This sentence makes a claim that can be wrong, which is what makes the rest of
 * the page worth reading: every band below is evidence for it, and the case
 * studies are where it is tested.
 */
export const THESIS = 'I build AI systems that survive production.';

/** The mono strip under the hero. Facts, not adjectives. */
export const HERO_FACTS = [
  { key: 'stack', value: '.NET 8 · Python · TypeScript · PostgreSQL' },
  { key: 'method', value: 'architecture → decision → agent → verification' },
  { key: 'written by', value: 'Claude Code, under review' },
] as const;

/* ────────────────────────────────────────────────────────────────────────────
 * 2. Hero topology
 *
 * OrchestAI's admission and execution path, from `content/case-studies/
 * orchestai/index.mdx`: an HTTP + API-key surface, admission resolving tenant,
 * budget and rate before any model call, and six fixed agent types of which
 * three are shown. `PostgreSQL` is drawn as a boundary node because it is
 * infrastructure the service depends on rather than owns.
 *
 * Three agents are drawn, not six. The diagram is a hero graphic at ~430 px wide
 * and six columns of mono labels at that width is illegible; the full roster is
 * named in band 3, where there is room for it. A diagram that shows less is
 * honest. A diagram that shows a different shape is not, which is why the fan-out
 * is present at all rather than being collapsed to a single "AGENTS" box.
 * ──────────────────────────────────────────────────────────────────────────── */

export const HERO_VIEWBOX = [440, 520] as const;

export const HERO_NODES: readonly GraphNode[] = [
  { id: 'client', label: 'HTTP · API KEY', x: 220, y: 34, w: 200, depth: 0, kind: 'boundary' },
  {
    id: 'admission',
    label: 'ADMISSION',
    sub: 'tenant · budget · rate',
    x: 220,
    y: 132,
    w: 240,
    depth: 1,
  },
  { id: 'orchestrator', label: 'ORCHESTRATOR', x: 220, y: 234, w: 200, depth: 2 },
  { id: 'research', label: 'RESEARCH', x: 74, y: 330, w: 120, depth: 3 },
  { id: 'writer', label: 'WRITER', x: 220, y: 330, w: 120, depth: 3 },
  { id: 'code', label: 'CODE', x: 366, y: 330, w: 120, depth: 3 },
  { id: 'tools', label: 'MCP TOOLS', x: 220, y: 418, w: 200, depth: 4 },
  { id: 'db', label: 'POSTGRES', x: 130, y: 496, w: 150, depth: 5, kind: 'boundary' },
  { id: 'trace', label: 'OTEL TRACE', x: 310, y: 496, w: 150, depth: 5 },
];

export const HERO_EDGES: readonly GraphEdge[] = [
  { from: 'client', to: 'admission' },
  { from: 'admission', to: 'orchestrator' },
  { from: 'orchestrator', to: 'research' },
  { from: 'orchestrator', to: 'writer' },
  { from: 'orchestrator', to: 'code' },
  { from: 'research', to: 'tools' },
  { from: 'writer', to: 'tools' },
  { from: 'code', to: 'tools' },
  { from: 'tools', to: 'db' },
  { from: 'tools', to: 'trace' },
];

export const HERO_GRAPH_LABEL =
  'A multi-tenant agent orchestration topology. An HTTP request carrying an API key ' +
  'reaches an admission stage that resolves tenant, budget and rate limits; admitted ' +
  'work passes to an orchestrator, which fans out to research, writer and code agents; ' +
  'those agents call MCP tools, which write to PostgreSQL and emit an OpenTelemetry trace.';

/* ────────────────────────────────────────────────────────────────────────────
 * 3. The lifecycle — band 2
 *
 * The seven stages every project on this site actually passes through. The
 * `artifact` is the file or gate the stage produces, and it is named precisely
 * because a stage with no artefact is a stage nobody can check happened.
 * ──────────────────────────────────────────────────────────────────────────── */

export type LifecycleStage = {
  readonly id: string;
  readonly name: string;
  /** One sentence. If it needs two, the stage is really two stages. */
  readonly body: string;
  /** What exists when the stage is done. */
  readonly artifact: string;
  /** The failure this stage is positioned to prevent. */
  readonly prevents: string;
};

export const LIFECYCLE: readonly LifecycleStage[] = [
  {
    id: 'problem',
    name: 'Problem',
    body: 'What is being solved, who has it, and what would make it not worth solving.',
    artifact: 'FOUNDATION.md',
    prevents: 'Building the thing that was easiest to describe.',
  },
  {
    id: 'architecture',
    name: 'Architecture',
    body: 'Boundaries, data ownership, and failure modes — settled before a file exists.',
    artifact: 'ARCHITECTURE.md',
    prevents: 'Discovering the trust boundary during code review.',
  },
  {
    id: 'decision',
    name: 'Decision',
    body: 'The alternatives that were real, the one taken, and what it costs.',
    artifact: 'ADR-0NN',
    prevents: 'Relitigating a settled choice every time it becomes inconvenient.',
  },
  {
    id: 'implementation',
    name: 'Claude Code',
    body: 'Agents write the implementation against the architecture and the records.',
    artifact: 'feature branch',
    prevents: 'Typing being mistaken for the scarce part.',
  },
  {
    id: 'verification',
    name: 'Verification',
    body: 'Gates that decide whether it is correct — not whether it runs.',
    artifact: 'npm run ci',
    prevents: 'Confidence that rests on the author having been careful.',
  },
  {
    id: 'release',
    name: 'Release',
    body: 'Merged behind green gates, or not merged. There is no third state.',
    artifact: 'main',
    prevents: 'A budget quietly raised because shipping was close.',
  },
  {
    id: 'retrospective',
    name: 'Retrospective',
    body: 'What the plan got wrong, written down while it still stings.',
    artifact: 'case study',
    prevents: 'The next plan making the same assumption.',
  },
];

/* ────────────────────────────────────────────────────────────────────────────
 * 4. OrchestAI architecture — band 3
 *
 * Layers, top-down, from `content/case-studies/orchestai/index.mdx`. Each layer
 * carries the one decision that is load-bearing for it, quoted or condensed from
 * the decision records in that document. `metric` is a stated property of the
 * system, never a benchmark: this service has no users, and a latency figure
 * here would be a number with nothing behind it.
 * ──────────────────────────────────────────────────────────────────────────── */

export type ArchitectureLayer = {
  readonly id: string;
  readonly name: string;
  readonly stack: readonly string[];
  /** The decision that shapes this layer. */
  readonly decision: string;
  /** A property that holds, stated as a property — not as a measurement. */
  readonly property: string;
};

export const ORCHESTAI_LAYERS: readonly ArchitectureLayer[] = [
  {
    id: 'edge',
    name: 'Edge',
    stack: ['ASP.NET Core', 'API key'],
    decision:
      'The consumer surface is HTTP and an API key, not a NuGet package. This is a deployable service, not a framework — the extension point that would make it one does not exist, and the case study says so rather than implying otherwise.',
    property: 'One surface. No public extension point.',
  },
  {
    id: 'admission',
    name: 'Admission',
    stack: ['MediatR', 'tenant · budget · rate'],
    decision:
      'Tenant, budget, and rate decisions all resolve before the first model call. A rejected run costs nothing and leaves nothing behind, because there is no partially executed state to clean up.',
    property: 'Rejected work never partially executes.',
  },
  {
    id: 'orchestration',
    name: 'Orchestration',
    stack: ['CQRS', 'MediatR', 'SSE'],
    decision:
      'Parallel and sequential execution, checkpointing, and streaming are the orchestrator’s concern, not the agent’s. An agent that had to know how it was being scheduled would be an agent that could only be scheduled one way.',
    property: 'Six fixed agent types, closed enum.',
  },
  {
    id: 'agents',
    name: 'Agents',
    stack: ['Orchestrator', 'Research', 'Writer', 'Code', 'Data', 'Browser'],
    decision:
      'Agents and MCP tools are registered by concrete type. There is no assembly scanning and no AddAgent<T>() — adding one means editing the enum, writing the class, and updating routing, from inside the repository.',
    property: 'Registration is explicit and greppable.',
  },
  {
    id: 'persistence',
    name: 'Persistence',
    stack: ['EF Core 8', 'PostgreSQL'],
    decision:
      'Tenant isolation is enforced by global query filters and a database constraint rather than by developer discipline. The constraint is the one that matters: a query filter can be bypassed by a future author, and the database cannot.',
    property: 'Isolation fails closed.',
  },
  {
    id: 'telemetry',
    name: 'Telemetry',
    stack: ['ActivityTraceId', 'ActivitySpanId'],
    decision:
      'Trace identifiers use System.Diagnostics rather than a custom scheme, so a run is reconstructable end to end in any OpenTelemetry-shaped consumer instead of only in a tool written for this service.',
    property: 'Every run is reconstructable.',
  },
];

/* ────────────────────────────────────────────────────────────────────────────
 * 5. NovaMind retrieval pipeline — band 4
 *
 * From `content/case-studies/novamind-ai/index.mdx`: 512-token chunks with 50
 * tokens of overlap, `voyage-3` at 1024 dimensions, HNSW in pgvector returning
 * ten candidates, `rerank-2-lite` reducing to five, then cited generation.
 *
 * `shape` is the payload leaving the stage, and it is the column that makes the
 * pipeline worth drawing at all: a reader who takes nothing else away should
 * still see that retrieval narrows 10 → 5 before the model sees anything.
 * ──────────────────────────────────────────────────────────────────────────── */

export type PipelineStage = {
  readonly id: string;
  readonly name: string;
  /** How the stage is implemented. Named technology, never a category. */
  readonly how: string;
  /** What leaves this stage. */
  readonly shape: string;
  readonly body: string;
};

export const NOVAMIND_PIPELINE: readonly PipelineStage[] = [
  {
    id: 'document',
    name: 'Document',
    how: 'PDF upload',
    shape: '1 document',
    body: 'A user’s own file. The product requirement was that answers be checkable against it, and that requirement is what shaped every stage after this one.',
  },
  {
    id: 'chunk',
    name: 'Chunk',
    how: '512 tokens · 50 overlap',
    shape: 'n passages',
    body: 'Overlap exists so that a boundary is less likely to split the sentence that answers the question. The values began as common defaults and were watched rather than tuned — the case study says so.',
  },
  {
    id: 'embed',
    name: 'Embed',
    how: 'voyage-3',
    shape: 'n × 1024',
    body: 'Chosen because it is built for retrieval and pairs with the same vendor’s reranker. No comparison against alternatives was run; it was an informed selection, not a measured one.',
  },
  {
    id: 'search',
    name: 'Vector search',
    how: 'pgvector · HNSW',
    shape: '10 candidates',
    body: 'Vectors live in the same PostgreSQL as users and documents, so a document and its embeddings commit together or not at all. One database to deploy, monitor, and back up.',
  },
  {
    id: 'rerank',
    name: 'Rerank',
    how: 'rerank-2-lite',
    shape: '5 passages',
    body: 'Similarity reliably returns relevant chunks. It does not reliably return the best ones, and the model only ever sees what it is given. Most implementations pass vector results straight through.',
  },
  {
    id: 'generate',
    name: 'Generate',
    how: 'Claude · streaming',
    shape: '1 answer',
    body: 'Five passages, not ten. Narrowing before generation is the difference between grounding an answer and burying it.',
  },
  {
    id: 'cite',
    name: 'Cite',
    how: 'resolved to source chunk',
    shape: 'n citations',
    body: 'Every reference in the output resolves back to the passage that supports it. Without this the system is a summariser, and the thing it was built to do was let someone check the answer.',
  },
];

export const NOVAMIND_PIPELINE_LABEL =
  'A retrieval pipeline in seven stages: a document is chunked at 512 tokens with 50 ' +
  'tokens of overlap, embedded with voyage-3 at 1024 dimensions, matched by HNSW index ' +
  'in pgvector to ten candidates, reranked to five passages, passed to Claude for ' +
  'streaming generation, and returned as an answer whose citations resolve to source chunks.';

/* ────────────────────────────────────────────────────────────────────────────
 * 6. Philosophy — band 5
 *
 * Four lines. Each is a position that could be disagreed with, which is the test
 * for whether it belongs: a line nobody could argue with is not a philosophy,
 * it is a platitude. Two are quoted from this repository's own documents, and
 * both are load-bearing there rather than decorative.
 * ──────────────────────────────────────────────────────────────────────────── */

export const PHILOSOPHY = [
  {
    id: 'verification',
    line: 'Engineering is not measured by how quickly code is written, but by how confidently it can be verified.',
    source: 'the whole site, in one sentence',
  },
  {
    id: 'budget',
    line: 'A budget that can be quietly raised when it becomes inconvenient is not a budget.',
    source: 'ARCHITECTURE.md §10',
  },
  {
    id: 'decision',
    line: 'The decision is the artifact. The code is its consequence.',
    source: 'ADR-004, documentation-first development',
  },
  {
    id: 'wrong',
    line: 'Write down what the plan got wrong, or the next plan will assume it again.',
    source: 'every retrospective on this site',
  },
] as const;

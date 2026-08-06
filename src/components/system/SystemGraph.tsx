import type { CSSProperties } from 'react';

import { flow } from '@/design/motion';

/**
 * A node-and-edge topology, drawn as SVG and animated entirely in CSS.
 *
 * **This renders on the server and ships no JavaScript.** That is the reason it
 * exists as a bespoke component rather than as a graph library: the whole visual
 * is one inline `<svg>` in the HTML response, so it is painted in the first
 * frame, it appears with scripting disabled (`ARCHITECTURE.md` §2), and it costs
 * the first-load JavaScript budget nothing at all. ADR-021.
 *
 * **Layout is authored, not computed.** There is no force-directed solver and no
 * auto-layout pass, because an architecture diagram whose node positions move
 * between renders is a diagram nobody can point at in a conversation. Positions
 * are viewBox coordinates supplied by the caller and they are stable forever.
 *
 * **`depth` drives the animation, not the layout.** It is the node's distance
 * from the entry point in hops, and it is what makes the pulse read as one wave
 * propagating through a system rather than as every edge blinking at once. Two
 * nodes at the same depth light together because in the real system they run
 * concurrently — the animation is a claim about the architecture, and it should
 * be wrong if the architecture is wrong.
 */

export type GraphNode = {
  readonly id: string;
  readonly label: string;
  /** Optional second line, set smaller and dimmer. Grows the node box. */
  readonly sub?: string;
  /** Horizontal centre, in viewBox units. */
  readonly x: number;
  /** Vertical centre, in viewBox units. */
  readonly y: number;
  /** Box width, in viewBox units. Authored so labels never need to wrap. */
  readonly w: number;
  /** Hops from the entry node. Drives pulse timing only. */
  readonly depth: number;
  /**
   * `boundary` nodes are what the system talks to but does not own — the client,
   * the model provider, the database. Drawn dashed, because the distinction
   * between "inside the trust boundary" and "outside it" is the single most
   * load-bearing fact in any architecture diagram.
   */
  readonly kind?: 'core' | 'boundary';
};

export type GraphEdge = {
  readonly from: string;
  readonly to: string;
  /** Suppresses the travelling pulse. For edges that carry control, not traffic. */
  readonly quiet?: boolean;
};

const NODE_H = 44;
const NODE_H_SUB = 58;

const heightOf = (node: GraphNode): number => (node.sub ? NODE_H_SUB : NODE_H);

/**
 * A cubic leaving the source vertically and arriving vertically, which produces
 * the trace-on-a-board look and collapses to a straight line when the two nodes
 * share a column. An orthogonal right-angle route was the first attempt; at
 * hero scale the corners read as a flowchart, which is the aesthetic this page
 * exists to get away from.
 */
function edgePath(from: GraphNode, to: GraphNode): string {
  const y1 = from.y + heightOf(from) / 2;
  const y2 = to.y - heightOf(to) / 2;
  if (from.x === to.x) return `M ${from.x} ${y1} L ${to.x} ${y2}`;
  const mid = (y1 + y2) / 2;
  return `M ${from.x} ${y1} C ${from.x} ${mid}, ${to.x} ${mid}, ${to.x} ${y2}`;
}

/** Custom-property carrier. `--flow-offset` is consumed by `systems.css`. */
const offset = (depth: number): CSSProperties =>
  ({ '--flow-offset': `${depth * flow.stagger}ms` }) as CSSProperties;

export function SystemGraph({
  nodes,
  edges,
  viewBox,
  label,
  highlight,
  className = '',
}: {
  nodes: readonly GraphNode[];
  edges: readonly GraphEdge[];
  /** `w h` of the coordinate space. Origin is always 0 0. */
  viewBox: readonly [number, number];
  /**
   * The diagram's accessible name. Required — an unlabelled `role="img"` is a
   * WCAG failure and a diagram that cannot be described in one sentence is
   * usually a diagram that is doing too much (`ACCESSIBILITY.md` §6).
   */
  label: string;
  /**
   * Node ids to emphasise. When supplied and non-empty the graph switches from
   * *depicting a system* to *answering a question about it*: matched nodes are
   * drawn in the flow colour, everything else recedes, and the ambient pulse is
   * suppressed entirely — a topology that is still animating while pointing at
   * something is competing with itself for the reader's attention.
   *
   * An empty array is meaningful and is not the same as `undefined`. It means
   * "nothing contains this", which is the honest answer for at least one failure
   * mode on this site, and the graph renders fully dimmed to say so.
   */
  highlight?: readonly string[];
  className?: string;
}) {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const focused = highlight !== undefined;
  const isLit = (id: string) => !focused || highlight.includes(id);
  const [width, height] = viewBox;

  const resolved = edges
    .map((edge) => {
      const from = byId.get(edge.from);
      const to = byId.get(edge.to);
      // A dangling edge is an authoring error in the model. It is dropped rather
      // than thrown on, because a diagram missing one line is a far better
      // outcome for a reader than a page that fails to render.
      return from && to ? { edge, from, to, d: edgePath(from, to) } : null;
    })
    .filter((entry) => entry !== null);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={label}
      className={`h-auto w-full ${className}`}
    >
      {/* Edges first: everything below is drawn over them, so a line never
          crosses a label. */}
      <g>
        {resolved.map(({ edge, d }) => (
          <path key={`${edge.from}-${edge.to}`} d={d} className="system-edge" />
        ))}
        {resolved
          .filter(({ edge }) => !edge.quiet && !focused)
          .map(({ edge, from, d }) => (
            <path
              key={`flow-${edge.from}-${edge.to}`}
              d={d}
              pathLength={100}
              className="system-flow"
              style={offset(from.depth)}
            />
          ))}
      </g>

      {nodes.map((node) => {
        const h = heightOf(node);
        const x = node.x - node.w / 2;
        const y = node.y - h / 2;
        const lit = isLit(node.id);
        return (
          <g key={node.id} className={focused && !lit ? 'system-dim' : undefined}>
            <rect
              x={x}
              y={y}
              width={node.w}
              height={h}
              rx={4}
              className={`system-node ${focused && lit ? 'system-node-lit' : ''}`}
              strokeDasharray={node.kind === 'boundary' ? '3 3' : undefined}
            />
            {/* The halo is a second rect inset by nothing and simply overdrawn;
                a filter-based glow would be a paint cost on every frame for a
                mid-range device, which §10 is written for. */}
            {focused ? null : (
              <rect
                x={x}
                y={y}
                width={node.w}
                height={h}
                rx={4}
                className="system-node-halo"
                style={offset(node.depth)}
              />
            )}
            <text
              x={node.x}
              y={node.sub ? node.y - 3 : node.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="currentColor"
              className="font-mono text-type-mono uppercase text-color-text-primary"
            >
              {node.label}
            </text>
            {node.sub ? (
              <text
                x={node.x}
                y={node.y + 13}
                textAnchor="middle"
                dominantBaseline="central"
                fill="currentColor"
                className="font-mono text-type-mono text-color-text-tertiary"
              >
                {node.sub}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

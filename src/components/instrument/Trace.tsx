import type { CSSProperties, ReactNode } from 'react';

import { Text } from '@/components/primitives/Text';

/**
 * A span waterfall — the page's signature notation, ADR-022.
 *
 * **One renderer, three producers.** The visitor's own page load (live, in
 * milliseconds, from the Performance API), one OrchestAI agent run, and one
 * NovaMind retrieval. The reader learns the notation on the trace that is about
 * them and then applies it, already fluent, to two systems they have never seen.
 * That transfer is the reason all three are the same component rather than three
 * bespoke diagrams — a second notation would have to be learned instead of read.
 *
 * **The renderer knows nothing about time.** Rows arrive with `start` and `end`
 * already normalised to 0–1, so the same component draws a duration waterfall
 * and a containment waterfall without a mode flag and without either producer
 * being able to lie about which it is. What distinguishes them is the `axis`
 * caption, which every caller is required to supply.
 *
 * **The bar is decorative; the row is the data.** Every row states its label,
 * detail and readout as text, so the trace is fully legible to a screen reader
 * and fully legible with CSS disabled. The bar is `aria-hidden` and adds
 * proportion, which is a thing eyes are good at and prose is bad at.
 */

export type TraceRow = {
  readonly id: string;
  readonly label: string;
  readonly detail?: string;
  /** Nesting level. 0 is the root span. */
  readonly depth: number;
  /** Bar start, 0–1 of the track. */
  readonly start: number;
  /** Bar end, 0–1 of the track. */
  readonly end: number;
  /** Right-hand readout. A duration, a shape, or a guarantee. */
  readonly value?: string;
  /** Root and container spans are drawn quieter than the work they contain. */
  readonly tone?: 'lead' | 'work';
};

/** Depth indent, in viewport-independent `ch` units of the mono face. */
const INDENT: Record<number, string> = {
  0: 'pl-0',
  1: 'pl-4',
  2: 'pl-10',
  3: 'pl-16',
};

export function Trace({
  rows,
  axis,
  pending = false,
  children,
}: {
  rows: readonly TraceRow[];
  /**
   * What the horizontal axis means. Required, and deliberately so: a waterfall
   * whose axis is unstated reads as time by default, and two of the three traces
   * on this page are not time. Stating it is what keeps them honest.
   */
  axis: string;
  /** Live traces render their structure before the numbers exist. */
  pending?: boolean;
  /** Optional note rendered beneath the axis caption. */
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-hairline border-color-border-subtle pb-3">
        <Text token="mono" as="span" color="tertiary" uppercase>
          {axis}
        </Text>
        {children}
      </div>

      <ol className="flex flex-col">
        {rows.map((row) => (
          <li
            key={row.id}
            className="group grid grid-cols-1 items-baseline gap-x-6 gap-y-1 border-b-hairline border-color-border-subtle py-3 last:border-b-0 md:grid-cols-12"
          >
            <div className={`md:col-span-2 ${INDENT[Math.min(row.depth, 3)]}`}>
              <Text token="mono" as="span" color={row.tone === 'lead' ? 'secondary' : 'primary'}>
                {row.label}
              </Text>
            </div>

            {/* The track. Purely proportional — every value it encodes is
                already present as text in this same row. */}
            <div aria-hidden="true" className="hidden md:col-span-4 md:block">
              <div className="relative h-2 w-full border-hairline border-color-border-subtle">
                <div
                  className={`absolute inset-y-0 origin-left transition-transform duration-base ease-decelerate ${
                    row.tone === 'lead' ? 'bg-color-border-strong' : 'bg-color-flow'
                  }`}
                  style={
                    {
                      left: `${row.start * 100}%`,
                      width: `${Math.max(row.end - row.start, 0.008) * 100}%`,
                      // Bars grow to their measured length rather than appearing
                      // at it. `scaleX` is compositor-driven; animating `width`
                      // would be a layout property and is prohibited (§9).
                      transform: pending ? 'scaleX(0)' : 'scaleX(1)',
                    } as CSSProperties
                  }
                />
              </div>
            </div>

            <div className="md:col-span-1 md:text-right">
              <Text token="mono" as="span" color={row.value ? 'secondary' : 'tertiary'}>
                {row.value ?? '—'}
              </Text>
            </div>

            {row.detail ? (
              <p className="md:col-span-5">
                <Text token="mono" as="span" color="tertiary">
                  {row.detail}
                </Text>
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Producer: containment
 * ──────────────────────────────────────────────────────────────────────────── */

type TraceNodeLike = {
  readonly id: string;
  readonly label: string;
  readonly detail: string;
  readonly value?: string;
  readonly children?: readonly TraceNodeLike[];
};

/**
 * Flattens a span tree into rows whose bars encode **containment, not duration**.
 *
 * A parent's bar spans exactly the extent of its leaves, so the picture reads
 * the way a real trace viewer reads — this ran inside that — while claiming
 * nothing about how long anything took. That distinction is not stylistic: the
 * systems drawn with this producer have no production traffic, and a duration
 * here would be a number with nothing behind it, on a page whose entire argument
 * is that its numbers are checkable.
 */
export function containmentRows(root: TraceNodeLike): TraceRow[] {
  const leaves: string[] = [];
  const countLeaves = (node: TraceNodeLike): void => {
    if (!node.children?.length) {
      leaves.push(node.id);
      return;
    }
    node.children.forEach(countLeaves);
  };
  countLeaves(root);
  const total = Math.max(leaves.length, 1);

  const rows: TraceRow[] = [];
  const walk = (node: TraceNodeLike, depth: number, cursor: number): number => {
    const startLeaf = cursor;
    let next = cursor;

    if (!node.children?.length) {
      next = cursor + 1;
    } else {
      for (const child of node.children) next = walk(child, depth + 1, next);
    }

    rows.push({
      id: node.id,
      label: node.label,
      detail: node.detail,
      value: node.value,
      depth,
      start: startLeaf / total,
      end: next / total,
      tone: node.children?.length ? 'lead' : 'work',
    });
    return next;
  };
  walk(root, 0, 0);

  // `walk` appends children before their parent, which is the wrong reading
  // order. Sorting by bar start, then by depth, restores the order a trace
  // viewer shows: a container immediately above the work it contains.
  return rows.sort((a, b) => a.start - b.start || a.depth - b.depth);
}

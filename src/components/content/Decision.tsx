import { Fragment } from 'react';
import type { ReactNode } from 'react';

/**
 * COMPONENT_GUIDELINES.md §8.6 — four labelled regions in fixed order.
 *
 * All four are required. A decision block missing its alternatives is the
 * failure mode ADR-002 exists to prevent, so the component takes them as
 * required props rather than collapsing gracefully.
 *
 * Region labels are not headings — the block is a definition list, so the
 * labels are announced as terms without polluting the document outline
 * (ACCESSIBILITY.md §8).
 */
export function Decision({
  context,
  choice,
  alternatives,
  consequence,
}: {
  context: ReactNode;
  choice: ReactNode;
  alternatives: ReactNode;
  consequence: ReactNode;
}) {
  const REGIONS: [string, ReactNode][] = [
    ['Context', context],
    ['Choice', choice],
    ['Alternatives considered', alternatives],
    ['Consequence', consequence],
  ];

  return (
    /* `items-baseline` puts each label on the same baseline as the body beside
       it. Top-aligned — which is what this was — a 14 px uppercase label and a
       17 px body line have different first-line baselines inside boxes that both
       start at the row top, so every label sat about six pixels high. The same
       slip was in the case-study header, `/workflow`, `/connect` and `/resume`;
       the home page had it right, and this brings the other six grids to it.

       §8.6 — "Contained by a 1 px border, no fill", which is what keeps it
       "visually distinct from a callout": bordered-no-fill against
       filled-with-left-rule. Labels are `--type-label` uppercase at
       `--color-text-secondary`, bodies `--type-body`, in the fixed order the
       spec requires. */
    <dl className="grid grid-cols-1 gap-y-6 border-hairline border-color-border-subtle p-6 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-x-6 sm:gap-y-5">
      {REGIONS.map(([label, body]) => (
        <Fragment key={label}>
          <dt className="font-text text-type-label uppercase text-color-text-secondary">{label}</dt>
          <dd className="m-0 font-text text-type-body text-color-text-primary">{body}</dd>
        </Fragment>
      ))}
    </dl>
  );
}

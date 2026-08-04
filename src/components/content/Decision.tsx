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
  return (
    <dl>
      <dt>Context</dt>
      <dd>{context}</dd>
      <dt>Choice</dt>
      <dd>{choice}</dd>
      <dt>Alternatives considered</dt>
      <dd>{alternatives}</dd>
      <dt>Consequence</dt>
      <dd>{consequence}</dd>
    </dl>
  );
}

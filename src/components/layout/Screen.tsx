import type { ReactNode } from 'react';

import { Container } from '@/components/primitives/Container';

/**
 * One screen of the home page — ADR-023.
 *
 * **It does almost nothing, and that is the change.** V2's `Band` numbered
 * itself, labelled itself, alternated its surface, and drew a rule across the
 * top; six of those in sequence produced a page that looked organised rather
 * than composed. A reader does not need to be told they have reached section
 * four. They need the previous idea to have ended and enough space to notice.
 *
 * So: one surface for the whole page, a hairline where one screen meets the
 * next, and the largest step on the section scale between them. Nothing else.
 * Everything a screen contains, it contains because that screen's single idea
 * needs it.
 */
export function Screen({
  children,
  /** Suppressed on the first screen, which follows the header's own rule. */
  divider = true,
  /**
   * Halves the bottom padding. Set on the final screen only, because `Footer`
   * already opens with `mt-section-lg` — without this the page ends on two
   * stacked large steps, which reads as the content having run out rather than
   * as the page having finished.
   */
  last = false,
}: {
  children: ReactNode;
  divider?: boolean;
  last?: boolean;
}) {
  return (
    <section className={divider ? 'border-t-hairline border-color-border-subtle' : ''}>
      <Container width="wide">
        <div className={last ? 'pb-section-md pt-section-lg' : 'py-section-lg'}>{children}</div>
      </Container>
    </section>
  );
}

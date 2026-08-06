import type { ReactNode } from 'react';

import { Container } from '@/components/primitives/Container';
import { Text } from '@/components/primitives/Text';

/**
 * A full-bleed home page band — ADR-020.
 *
 * **The V1 home page's central failure was that every section looked identical.**
 * Six stacked `Stack gap={6}` blocks in one container produce a document: the
 * reader cannot tell from peripheral vision whether they have moved between
 * ideas, so scrolling feels like reading rather than like progressing. This
 * component is the fix, and it does exactly three things.
 *
 * 1. **It goes full-bleed and owns its surface.** Alternating base and sunken
 *    across consecutive bands is what makes a section boundary visible before it
 *    is read. Elevation here is surface lightness plus a hairline, never a
 *    shadow (`COLOR_SYSTEM.md` §6).
 * 2. **It numbers itself.** The mono index is the site's machine voice, and a
 *    numbered rule at the top of every band tells the reader how far through a
 *    sequence they are — the same job a scroll bar does badly.
 * 3. **It owns the section rhythm.** `space-section-*` is applied here and
 *    nowhere else on the page, so band spacing cannot drift band by band.
 *
 * The heading is optional because band 1 has an `<h1>` of its own and must not
 * carry a second heading above it.
 */
export function Band({
  index,
  label,
  title,
  surface = 'base',
  divider = true,
  children,
}: {
  /** Position in the sequence. Rendered zero-padded as the machine voice. */
  index: number;
  /** The band's short name. Two words at most — it is set in mono at 11.5 px. */
  label: string;
  /** The band's `<h2>`. Omitted only where the band carries the page `<h1>`. */
  title?: string;
  surface?: 'base' | 'sunken';
  /**
   * The hairline above the band. Suppressed where the band below already has a
   * surface change doing the same work, so two dividers never stack.
   */
  divider?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`${surface === 'sunken' ? 'bg-color-surface-sunken' : 'bg-color-surface-base'} ${
        divider ? 'border-t-hairline border-color-border-subtle' : ''
      }`}
    >
      <Container width="wide">
        <div className="py-section-md">
          {/* The numbered rule. `aria-hidden` on the index and the rule: the
              heading below is the real structure, and a screen reader announcing
              "zero three" before every section adds nothing a heading level
              does not already carry. */}
          <div className="flex items-center gap-5">
            <span aria-hidden="true">
              <Text token="mono" as="span" color="tertiary">
                {String(index).padStart(2, '0')}
              </Text>
            </span>
            <Text token="mono" as="span" color="tertiary" uppercase>
              {label}
            </Text>
            <span
              aria-hidden="true"
              className="flex-1 border-t-hairline border-color-border-subtle"
            />
          </div>

          {title ? (
            <div className="mt-6 max-w-prose">
              <Text token="heading-2" as="h2">
                {title}
              </Text>
            </div>
          ) : null}

          <div className={title ? 'mt-16' : 'mt-12'}>{children}</div>
        </div>
      </Container>
    </section>
  );
}

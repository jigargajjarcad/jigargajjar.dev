import NextLink from 'next/link';
import type { ReactNode } from 'react';

import { Icon } from './Icon';

/**
 * COMPONENT_GUIDELINES.md §2.1.
 *
 * Prose links are always underlined — colour alone fails colour-vision
 * deficiency and forced-colors mode, so the underline is the affordance and the
 * colour is reinforcement. Navigation and card links are not underlined because
 * position and container supply it; that is the only exception.
 *
 * Outbound links carry `arrow-up-right` and are announced as external. They do
 * not open in a new tab — that decision belongs to the reader (INTERACTION.md §6).
 *
 * `action` is the third variant, added by ADR-020. It is a navigation control
 * that carries a control's affordance — a bordered target at `--target-min`,
 * matching `Button`'s secondary variant exactly. §2.2 is explicit that a control
 * which navigates is a `Link` and never a `Button`, so the alternative was a
 * `<button>` with an `onClick` that pushes a route, which breaks middle-click,
 * open-in-new-tab, and the status bar. This keeps the element correct and lets
 * the appearance say what the element does. It is unstyled by underline for the
 * reason §2.1 already sanctions: the container supplies the affordance.
 */
export function Link({
  href,
  variant = 'prose',
  external = false,
  children,
}: {
  href: string;
  variant?: 'prose' | 'bare' | 'action';
  external?: boolean;
  children: ReactNode;
}) {
  if (variant === 'action') {
    const action =
      'inline-flex min-h-target-min items-center justify-center gap-2 rounded-md border-hairline border-color-border-strong px-5 font-text text-type-label text-color-text-primary no-underline transition-colors duration-fast ease-standard hover:border-color-text-primary hover:bg-color-surface-raised active:bg-color-surface-sunken';
    return external ? (
      <a href={href} className={action}>
        {children}
        <Icon name="arrow-up-right" size="sm" />
        <span className="sr-only">(opens an external site)</span>
      </a>
    ) : (
      <NextLink href={href} className={action}>
        {children}
      </NextLink>
    );
  }

  const underline =
    variant === 'prose'
      ? 'underline decoration-hairline underline-offset-link hover:decoration-emphasis'
      : 'no-underline';
  const className = `text-color-text-accent transition-colors duration-fast ease-standard hover:text-color-interactive-hover active:text-color-interactive-pressed ${underline}`;

  if (external) {
    return (
      <a href={href} className={`${className} inline-flex items-center gap-1`}>
        {children}
        <Icon name="arrow-up-right" size="sm" />
        <span className="sr-only">(opens an external site)</span>
      </a>
    );
  }
  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  );
}

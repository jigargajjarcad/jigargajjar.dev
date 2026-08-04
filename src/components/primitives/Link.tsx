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
 */
export function Link({
  href,
  variant = 'prose',
  external = false,
  children,
}: {
  href: string;
  variant?: 'prose' | 'bare';
  external?: boolean;
  children: ReactNode;
}) {
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

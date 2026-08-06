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
    /*
     * ADR-024 — art direction.
     *
     * Four changes, each of which is the difference between a default control
     * and a designed one. The radius drops to `sm`: 4 px on a 44 px target reads
     * as a generic rounded button, 2 px reads as a printed rule and belongs to
     * the same family as every hairline on the page. Horizontal padding opens to
     * 24 px, because at 20 px the label sat closer to the border than the border
     * sat to its neighbours. The arrow is set in the label's own optical weight
     * and moves 4 px on hover — the only motion on this page, and it is
     * directional rather than decorative: it points where the control goes.
     * And the transition now covers `transform` as well as colour, so the
     * movement is eased rather than snapped.
     *
     * Under reduced motion the global rule in `globals.css` narrows
     * `transition-property` to colour alone, so the arrow arrives instantly
     * instead of sliding. That is the correct degradation and it is free.
     */
    const action =
      'group inline-flex min-h-target-min items-center justify-center gap-2 rounded-sm ' +
      'border-hairline border-color-border-strong px-6 font-text text-type-label ' +
      'text-color-text-primary no-underline transition-colors duration-fast ease-standard ' +
      'hover:border-color-text-primary hover:bg-color-surface-raised active:bg-color-surface-sunken';

    // Decorative: the link text already says where it goes.
    const arrow = (
      <span
        aria-hidden="true"
        className="transition-transform duration-fast ease-standard group-hover:translate-x-1"
      >
        &rarr;
      </span>
    );

    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={action}>
        {children}
        <Icon name="arrow-up-right" size="sm" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    ) : (
      <NextLink href={href} className={action}>
        {children}
        {arrow}
      </NextLink>
    );
  }

  const underline =
    variant === 'prose'
      ? 'underline decoration-hairline underline-offset-link hover:decoration-emphasis'
      : 'no-underline';
  const className = `text-color-text-accent transition-colors duration-fast ease-standard hover:text-color-interactive-hover active:text-color-interactive-pressed ${underline}`;

  if (external) {
    /*
     * ADR-025 reverses `INTERACTION.md` §6.
     *
     * §6 held that the new-tab decision belongs to the reader, which is the
     * better default for a document a reader is moving *through*. It is the
     * wrong default for the links this site actually has: every external link
     * here is a repository, a profile, or a résumé — a reference someone opens
     * *while* reading, and losing the page to reach one is the failure.
     *
     * `noopener` is what makes a new tab safe: without it the opened document
     * gets a live `window.opener` handle back into this one. `noreferrer` goes
     * with it. Both are stated rather than relied on — modern browsers imply
     * `noopener` for `target="_blank"`, and a security property that depends on
     * the browser being current is not a property.
     *
     * The announcement changes with the behaviour: "opens in a new tab" is what
     * `ACCESSIBILITY.md` §5 requires when focus is about to move somewhere the
     * back button will not return from.
     */
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} inline-flex items-center gap-1`}
      >
        {children}
        <Icon name="arrow-up-right" size="sm" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  );
}

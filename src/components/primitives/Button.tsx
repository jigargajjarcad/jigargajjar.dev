'use client';

import type { ComponentPropsWithRef, ReactNode } from 'react';

/**
 * COMPONENT_GUIDELINES.md §2.2. Two variants; a third would exceed what eight
 * routes require.
 *
 * Minimum target 44 x 44 px on every device — above the WCAG 2.2 minimum of
 * 24 x 24, because the reference device is a phone and the cost is zero.
 *
 * A control that navigates is a Link, not a Button. Disabled is not rendered
 * (§1): a control a reader cannot act on and cannot understand the reason for
 * is worse than its absence.
 */
export type ButtonVariant = 'primary' | 'secondary';

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    'bg-color-interactive text-color-text-on-accent hover:bg-color-interactive-hover active:bg-color-interactive-pressed',
  secondary:
    'border-hairline border-color-border-strong text-color-text-primary hover:border-color-text-primary hover:bg-color-surface-raised active:bg-color-surface-sunken',
};

export function Button({
  variant = 'secondary',
  children,
  ...rest
}: { variant?: ButtonVariant; children: ReactNode } & ComponentPropsWithRef<'button'>) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-target-min min-w-target-min items-center justify-center gap-2 rounded-md px-4 font-text text-type-label transition-colors duration-fast ease-standard active:scale-[0.99] ${VARIANT[variant]}`}
      {...rest}
    >
      {children}
    </button>
  );
}

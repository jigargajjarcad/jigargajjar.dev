import type { ReactNode } from 'react';

/**
 * Long-form reading column. TYPOGRAPHY.md §5 — measure capped at 68 characters,
 * the single largest lever on twenty-minute reading comfort. Expressed in `ch`
 * so it tracks the font rather than a pixel guess, and it never widens with the
 * viewport.
 */
export function Prose({ children }: { children: ReactNode }) {
  return <div className="max-w-prose font-text text-type-body">{children}</div>;
}

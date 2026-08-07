import type { ReactNode } from 'react';

/**
 * Long-form reading column. `TYPOGRAPHY.md` §5 — measure capped at 68
 * characters, the single largest lever on twenty-minute reading comfort.
 * Expressed in `ch` so it tracks the font rather than a pixel guess, and it
 * never widens with the viewport.
 *
 * **This component existed and was never used** (ADR-033). `/work/[slug]`
 * rendered the case-study body straight into a `wide` container, so eight
 * thousand seven hundred words of documentation set at 90 characters — the
 * measure §5 describes as the point where "the return sweep becomes unreliable
 * and readers lose their line".
 *
 * `data-prose` is the hook for the vertical rhythm in `globals.css`, which
 * implements §4's table. It is on the same element as the measure deliberately:
 * a reading column and its rhythm are one decision, and splitting them across
 * two wrappers is how they drift apart.
 */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div data-prose className="max-w-prose font-text text-type-body">
      {children}
    </div>
  );
}

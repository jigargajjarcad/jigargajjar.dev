import type { ReactNode } from 'react';

/**
 * Native fenced code blocks — ADR-027.
 *
 * `globals.css` makes every `<pre>` a horizontal scroll container, because
 * `COMPONENT_GUIDELINES.md` §8.3 requires that a long line scroll inside the
 * block rather than widen the document. That fix created a second obligation
 * immediately: **a scrollable region must be reachable by keyboard** (WCAG
 * 2.1.1), or a keyboard-only reader can see that content is cut off and has no
 * way to reach it. `axe` catches exactly this, and did.
 *
 * `CodeBlock` already solved it for authored blocks. This is the same treatment
 * for the ones markdown produces from a fenced block, which arrive as a native
 * `<pre>` that no component wraps.
 *
 * **It does not widen the authoring surface.** `ARCHITECTURE.md` §6.4 closes the
 * set of components a case study may reference at eight, and that set is
 * unchanged — an author still cannot write `<PreBlock>`. What changed is how one
 * native element renders, which is a presentation detail of markdown the author
 * already had, not a new thing to reach for.
 */
export function PreBlock({ children }: { children?: ReactNode }) {
  return (
    <pre tabIndex={0} role="region" aria-label="Code block">
      {children}
    </pre>
  );
}

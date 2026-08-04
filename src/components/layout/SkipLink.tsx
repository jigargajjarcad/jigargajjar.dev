/**
 * ACCESSIBILITY.md §4 — the first focusable element on every page, visually
 * hidden until focused, then rendered at full contrast above the header.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-20 focus-visible:rounded-md focus-visible:bg-color-surface-raised focus-visible:px-4 focus-visible:py-3 focus-visible:font-text focus-visible:text-type-body focus-visible:text-color-text-primary"
    >
      Skip to content
    </a>
  );
}

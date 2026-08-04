import type { ReactNode } from 'react';

/**
 * COMPONENT_GUIDELINES.md §8.5 and ARCHITECTURE.md §7 — inline SVG using
 * `currentColor`, with text as real `<text>` nodes so it is selectable,
 * searchable, translatable, and readable by assistive technology.
 *
 * The `<text>` nodes make labels readable; the diagram's *relationships* need a
 * description of their own, so `description` is required.
 *
 * Diagrams need no per-theme variant — `currentColor` serves both.
 */
export function Diagram({
  title,
  description,
  viewBox,
  children,
}: {
  title: string;
  description: string;
  viewBox: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={`${title}. ${description}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>{title}</title>
      <desc>{description}</desc>
      {children}
    </svg>
  );
}

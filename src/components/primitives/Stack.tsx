import type { ReactNode } from 'react';

/**
 * Vertical rhythm. SPACING.md §3 — component spacing comes from the closed
 * scale; absent steps are deliberate. Prose rhythm is a separate system and
 * does not use this component (SPACING.md §2, TYPOGRAPHY.md §4).
 */
export type StackGap = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20;

const GAP: Record<StackGap, string> = {
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
  16: 'gap-16',
  20: 'gap-20',
};

export function Stack({
  gap = 4,
  as: Tag = 'div',
  children,
}: {
  gap?: StackGap;
  as?: 'div' | 'ul' | 'nav' | 'section';
  children: ReactNode;
}) {
  return <Tag className={`flex flex-col ${GAP[gap]}`}>{children}</Tag>;
}

import type { ReactNode } from 'react';

/**
 * Layout container. SPACING.md §6 — three widths, and a fourth would mean the
 * layout has more cases than the content does. Gutters are the minimum distance
 * between content and the viewport edge and are never zero except in `full`.
 */
export type ContainerWidth = 'prose' | 'wide' | 'full';

const WIDTH: Record<ContainerWidth, string> = {
  prose: 'max-w-prose',
  wide: 'max-w-wide',
  full: 'max-w-full',
};

export function Container({
  width = 'prose',
  as: Tag = 'div',
  children,
}: {
  width?: ContainerWidth;
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav';
  children: ReactNode;
}) {
  const gutter = width === 'full' ? '' : 'px-5 md:px-8 lg:px-12';
  return <Tag className={`mx-auto w-full ${WIDTH[width]} ${gutter}`}>{children}</Tag>;
}

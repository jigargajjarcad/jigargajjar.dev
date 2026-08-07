import type { ElementType, ReactNode } from 'react';

import { TYPE_CLASS, type TypeToken } from '@/design/typeClasses';

/**
 * Typographic primitive. TOKENS.md §4.5 — a semantic type token bundles size,
 * weight, line height and tracking, applied as one unit.
 *
 * ACCESSIBILITY.md §8: heading level is a structural claim, never a size. `as`
 * and `token` are independent on purpose — a designer wanting a smaller heading
 * uses a lower level, not a smaller size on a higher one.
 *
 * The size class comes from `TYPE_CLASS` rather than from a template literal.
 * That file explains why at length; the short version is that Tailwind cannot
 * generate a class name it never sees in source, and building one at runtime
 * silently dropped nine of fourteen tokens out of the stylesheet.
 */
export type { TypeToken };

const FAMILY: Record<TypeToken, string> = {
  hero: 'font-display',
  mono: 'font-mono',
  display: 'font-display',
  'heading-1': 'font-display',
  'heading-2': 'font-display',
  'heading-3': 'font-display',
  'heading-4': 'font-text',
  lede: 'font-text',
  body: 'font-text',
  'body-sm': 'font-text',
  label: 'font-text',
  caption: 'font-text',
  metric: 'font-display',
  code: 'font-mono',
};

export type TextColor = 'primary' | 'secondary' | 'tertiary';

const COLOR: Record<TextColor, string> = {
  primary: 'text-color-text-primary',
  secondary: 'text-color-text-secondary',
  tertiary: 'text-color-text-tertiary',
};

export function Text({
  token = 'body',
  color = 'primary',
  as: Tag = 'p',
  uppercase = false,
  children,
}: {
  token?: TypeToken;
  color?: TextColor;
  as?: ElementType;
  /** TYPOGRAPHY.md §6 — eyebrow labels only, never in prose. */
  uppercase?: boolean;
  children: ReactNode;
}) {
  return (
    <Tag
      className={`${TYPE_CLASS[token]} ${FAMILY[token]} ${COLOR[color]} ${uppercase ? 'uppercase' : ''}`}
    >
      {children}
    </Tag>
  );
}

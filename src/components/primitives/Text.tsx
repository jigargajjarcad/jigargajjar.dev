import type { ElementType, ReactNode } from 'react';

/**
 * Typographic primitive. TOKENS.md §4.5 — a semantic type token bundles size,
 * weight, line height and tracking, applied as one unit.
 *
 * ACCESSIBILITY.md §8: heading level is a structural claim, never a size. `as`
 * and `token` are independent on purpose — a designer wanting a smaller heading
 * uses a lower level, not a smaller size on a higher one.
 */
export type TypeToken =
  | 'display'
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'heading-4'
  | 'lede'
  | 'body'
  | 'body-sm'
  | 'label'
  | 'caption'
  | 'metric'
  | 'code';

const FAMILY: Record<TypeToken, string> = {
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
      className={`text-type-${token} ${FAMILY[token]} ${COLOR[color]} ${uppercase ? 'uppercase' : ''}`}
    >
      {children}
    </Tag>
  );
}

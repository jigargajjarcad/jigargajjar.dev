/**
 * Literal Tailwind class names for every semantic type token.
 *
 * **This file exists because of a real defect, and it is worth stating plainly.**
 * `Text` previously built its class as `` `text-type-${token}` ``. That reads
 * fine and is wrong: Tailwind extracts candidate class names by scanning source
 * text, so a class assembled at runtime is a class it never sees and never
 * generates. Only the five tokens that happened to appear as complete literals
 * elsewhere in the codebase — `body`, `body-sm`, `heading-4`, `label`, `mono` —
 * were ever emitted into the stylesheet.
 *
 * **The failure was invisible for the worst possible reason: it mostly looked
 * right.** `globals.css` styles `h1`–`h4` as elements, so a heading token on a
 * heading element resolved to the correct size through the element rule and the
 * missing utility changed nothing. What silently broke was every token used
 * anywhere else: `lede` rendered at body size, `display` rendered at body size,
 * and a heading token deliberately applied to a `<p>` — which the `Text` API
 * explicitly supports, because `ACCESSIBILITY.md` §8 insists heading level is a
 * structural claim and never a size — rendered at body size too.
 *
 * Mapping every token to a complete literal is the fix Tailwind's extractor
 * requires. `tests/unit/tokens.test.ts` asserts this record stays exhaustive
 * against `semanticType`, so adding a token without adding its class is a test
 * failure rather than another silent size regression.
 */

import { semanticType } from './tokens';

/** Strips the `type-` prefix that `semanticType` keys carry. */
export type TypeToken = keyof typeof semanticType extends `type-${infer Name}` ? Name : never;

export const TYPE_CLASS = {
  hero: 'text-type-hero',
  mono: 'text-type-mono',
  display: 'text-type-display',
  'heading-1': 'text-type-heading-1',
  'heading-2': 'text-type-heading-2',
  'heading-3': 'text-type-heading-3',
  'heading-4': 'text-type-heading-4',
  lede: 'text-type-lede',
  body: 'text-type-body',
  'body-sm': 'text-type-body-sm',
  label: 'text-type-label',
  caption: 'text-type-caption',
  metric: 'text-type-metric',
  code: 'text-type-code',
} as const satisfies Record<TypeToken, string>;

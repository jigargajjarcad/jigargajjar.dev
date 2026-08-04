/**
 * Tailwind theme, derived from `src/design/tokens.ts`.
 *
 * TOKENS.md: "All values originate here and in `src/design/tokens.ts`;
 * Tailwind's theme is derived from that file." Nothing in this file is a
 * literal design value — every entry resolves to a CSS custom property emitted
 * by `src/styles/tokens.css`, which is itself generated from `tokens.ts`.
 *
 * `theme` replaces rather than extends, so an undocumented Tailwind default
 * (its own colour palette, spacing scale, radii, shadows) cannot be reached
 * from a class name. That is what makes "never invent a token" enforceable
 * rather than merely stated.
 */
import type { Config } from 'tailwindcss';

import {
  accent,
  breakpoint,
  duration,
  easing,
  icon,
  neutral,
  radius,
  semanticColor,
  semanticType,
  sectionSpace,
  space,
} from './src/design/tokens';

const cssVar = (name: string): string => `var(--${name})`;

const fromKeys = <T extends Record<string | number, unknown>>(
  source: T,
  prefix: string,
): Record<string, string> =>
  Object.fromEntries(Object.keys(source).map((key) => [key, cssVar(`${prefix}-${key}`)]));

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  // Themes are token sets, not a Tailwind variant strategy (COLOR_SYSTEM §8).
  // `prefers-color-scheme` and `[data-theme]` are both handled in tokens.css.
  theme: {
    screens: Object.fromEntries(Object.entries(breakpoint).map(([name, px]) => [name, `${px}px`])),
    colors: {
      transparent: 'transparent',
      currentColor: 'currentColor',
      ...fromKeys(neutral, 'neutral'),
      ...fromKeys(accent, 'accent'),
      ...Object.fromEntries(Object.keys(semanticColor).map((name) => [name, cssVar(name)])),
      'color-focus-ring-offset': cssVar('color-focus-ring-offset'),
    },
    spacing: {
      ...fromKeys(space, 'space'),
      ...Object.fromEntries(
        Object.keys(sectionSpace).map((name) => [
          `section-${name}`,
          cssVar(`space-section-${name}`),
        ]),
      ),
    },
    borderRadius: { none: '0', ...fromKeys(radius, 'radius') },
    borderWidth: {
      0: '0',
      hairline: cssVar('border-hairline'),
      emphasis: cssVar('border-emphasis'),
    },
    // A semantic type token bundles size, weight, line height and tracking
    // (TOKENS.md §4.5). Tailwind's tuple form applies them as one unit, so a
    // component cannot apply the size and forget the rest.
    fontSize: Object.fromEntries(
      Object.keys(semanticType).map((name) => [
        name,
        [
          cssVar(`${name}-size`),
          {
            lineHeight: cssVar(`${name}-line-height`),
            letterSpacing: cssVar(`${name}-tracking`),
            fontWeight: cssVar(`${name}-weight`),
          },
        ],
      ]),
    ),
    fontFamily: {
      display: [cssVar('font-display')],
      text: [cssVar('font-text')],
      mono: [cssVar('font-mono')],
    },
    fontWeight: {
      regular: cssVar('weight-regular'),
      medium: cssVar('weight-medium'),
      semibold: cssVar('weight-semibold'),
    },
    lineHeight: Object.fromEntries(
      Object.keys(semanticType).map((name) => [name, cssVar(`${name}-line-height`)]),
    ),
    letterSpacing: Object.fromEntries(
      Object.keys(semanticType).map((name) => [name, cssVar(`${name}-tracking`)]),
    ),
    maxWidth: {
      prose: cssVar('container-prose'),
      wide: cssVar('container-wide'),
      full: cssVar('container-full'),
    },
    size: fromKeys(icon, 'icon'),
    minHeight: { 'target-min': cssVar('target-min') },
    minWidth: { 'target-min': cssVar('target-min') },
    textUnderlineOffset: { link: cssVar('link-underline-offset') },
    textDecorationThickness: {
      hairline: cssVar('border-hairline'),
      emphasis: cssVar('border-emphasis'),
    },
    transitionDuration: fromKeys(duration, 'duration'),
    transitionTimingFunction: fromKeys(easing, 'ease'),
    // Deliberately absent: boxShadow, dropShadow. Elevation is surface
    // lightness plus a hairline, never a shadow (COLOR_SYSTEM.md §6).
    //
    // Also absent: density. The multipliers in SPACING.md §5 are applied once,
    // by a layout container, against the section rhythm — they are not a
    // Tailwind scale and mapping them to one would invite per-element use,
    // which compounds (TOKENS.md §9).
    extend: {},
  },
  plugins: [],
};

export default config;

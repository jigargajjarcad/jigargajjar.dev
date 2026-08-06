/**
 * Design tokens — single source of truth.
 *
 * Every value here is specified in `docs/design/TOKENS.md`, which is authoritative.
 * A hard-coded design value anywhere else in the codebase is a defect
 * (`docs/ARCHITECTURE.md` §3, rule 5).
 *
 * Three layers (`docs/design/DESIGN_SYSTEM.md` §5):
 *   Primitive  raw values, no meaning, theme-invariant
 *   Semantic   purpose, theme-aware — the layer components consume
 *   Component  one component's use of a purpose — currently none
 *
 * Rule 2 of the token architecture: semantic tokens reference primitives, never
 * other semantic tokens. The single sanctioned exception is
 * `--color-focus-ring-offset`, documented in TOKENS.md §4.3.
 */

/* ────────────────────────────────────────────────────────────────────────────
 * 1. Primitives
 * ──────────────────────────────────────────────────────────────────────────── */

/** OKLCH triplet. Authored in OKLCH for perceptual uniformity (COLOR_SYSTEM §2). */
export interface Oklch {
  /** Perceptual lightness, 0–1. */
  readonly l: number;
  /** Chroma. */
  readonly c: number;
  /** Hue angle in degrees. */
  readonly h: number;
}

/** TOKENS.md §3.1 — neutral ramp, hue 250, chroma 0.004–0.012. */
export const neutral = {
  0: { l: 0.995, c: 0.004, h: 250 },
  50: { l: 0.98, c: 0.005, h: 250 },
  100: { l: 0.962, c: 0.006, h: 250 },
  200: { l: 0.925, c: 0.008, h: 250 },
  300: { l: 0.87, c: 0.01, h: 250 },
  400: { l: 0.74, c: 0.012, h: 250 },
  500: { l: 0.62, c: 0.012, h: 250 },
  600: { l: 0.52, c: 0.012, h: 250 },
  700: { l: 0.41, c: 0.011, h: 250 },
  800: { l: 0.3, c: 0.01, h: 250 },
  900: { l: 0.215, c: 0.008, h: 250 },
  950: { l: 0.165, c: 0.006, h: 250 },
  1000: { l: 0.12, c: 0.005, h: 250 },
} as const satisfies Record<number, Oklch>;

/** TOKENS.md §3.1 — accent ramp, hue 220. */
export const accent = {
  400: { l: 0.78, c: 0.1, h: 220 },
  500: { l: 0.7, c: 0.12, h: 220 },
  600: { l: 0.56, c: 0.14, h: 220 },
  700: { l: 0.48, c: 0.145, h: 220 },
  800: { l: 0.4, c: 0.13, h: 220 },
} as const satisfies Record<number, Oklch>;

/**
 * TOKENS.md §3.1 — status ramps, hues 150 / 75 / 25.
 *
 * TOKENS.md records these in this file rather than in the document, "because
 * they are computed from the floors rather than chosen". The floors are
 * ACCESSIBILITY.md §3: 4.5:1 for text against its surface.
 *
 * Derivation, using the CIE L* → relative-luminance approximation:
 *   `-text-light` must clear 4.5:1 against `--neutral-50` (raised, the tighter
 *   of the two light surfaces) → L ≤ 0.485, and against its own `-tint-light`
 *   (L 0.96) → L ≤ 0.46, which is the binding constraint. Set to 0.45.
 *   `-text-dark` must clear 4.5:1 against `--neutral-900` (raised, the tighter
 *   of the two dark surfaces) → L ≥ 0.639. Set to 0.72–0.80 for headroom.
 *   Tints are surfaces, not text, and carry no contrast floor of their own;
 *   they are constrained only by keeping their paired text token above 4.5:1.
 *
 * Verified by `tests/unit/tokens.test.ts`, which recomputes every pair.
 */
export const status = {
  positive: {
    textLight: { l: 0.45, c: 0.13, h: 150 },
    textDark: { l: 0.78, c: 0.13, h: 150 },
    tintLight: { l: 0.96, c: 0.03, h: 150 },
    tintDark: { l: 0.24, c: 0.04, h: 150 },
  },
  caution: {
    textLight: { l: 0.45, c: 0.1, h: 75 },
    textDark: { l: 0.8, c: 0.1, h: 75 },
    tintLight: { l: 0.96, c: 0.03, h: 75 },
    tintDark: { l: 0.24, c: 0.04, h: 75 },
  },
  critical: {
    textLight: { l: 0.45, c: 0.15, h: 25 },
    textDark: { l: 0.72, c: 0.14, h: 25 },
    tintLight: { l: 0.96, c: 0.03, h: 25 },
    tintDark: { l: 0.24, c: 0.04, h: 25 },
  },
} as const;

/** TOKENS.md §3.2 — type scale. Fluid between the 375 px and 1280 px anchors. */
export const typeScale = {
  100: { mobile: 11.5, desktop: 11.5 },
  200: { mobile: 14, desktop: 14.5 },
  300: { mobile: 17, desktop: 18 },
  400: { mobile: 20, desktop: 22.5 },
  500: { mobile: 24, desktop: 28 },
  600: { mobile: 28, desktop: 35 },
  700: { mobile: 32, desktop: 44 },
  800: { mobile: 38, desktop: 55 },
} as const;

/**
 * TOKENS.md §3.3 — font families.
 *
 * The adjusted fallback families come before the raw system faces: they are the
 * same faces carrying the metric overrides in `globals.css`, so the pre-swap
 * render matches the webfont's measurements and §10's zero-layout-shift line
 * holds. The unadjusted names remain behind them for engines that do not
 * support metric overrides.
 */
export const fontFamily = {
  display: '"Newsreader Variable", "Newsreader Fallback", Georgia, serif',
  text: '"Inter Variable", "Inter Fallback", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
} as const;

/**
 * TOKENS.md §3.3 — four weight values across two families.
 * `medium` is valid only in the display face; `semibold` only in the text face.
 */
export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
} as const;

/** TOKENS.md §3.4 — component spacing scale. Absent steps are deliberate. */
export const space = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const;

/** TOKENS.md §3.5 — motion. Frozen by ARCHITECTURE.md §9; additions require an ADR. */
export const duration = {
  instant: 100,
  fast: 160,
  base: 240,
  entrance: 400,
} as const;

export const easing = {
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  decelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
  accelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
} as const;

export const stagger = {
  interval: 60,
  max: 4,
} as const;

/** TOKENS.md §3.6 — dimension. Two radii only. No shadow scale: COLOR_SYSTEM §6. */
export const radius = { sm: 2, md: 4 } as const;
export const border = { hairline: 1, emphasis: 2 } as const;
export const icon = { sm: 16, md: 20, lg: 24 } as const;
export const container = { prose: '68ch', wide: '1120px', full: '100%' } as const;
export const breakpoint = { sm: 640, md: 900, lg: 1280 } as const;

/* ────────────────────────────────────────────────────────────────────────────
 * 2. Fluid helpers
 * ──────────────────────────────────────────────────────────────────────────── */

const VIEWPORT_MIN = 375;
const VIEWPORT_MAX = breakpoint.lg;
const ROOT_FONT_SIZE = 16;

const round = (n: number, places = 4): number => Number.parseFloat(n.toFixed(places));

/** px → rem, relative to a 16 px root. */
export const rem = (px: number): string => `${round(px / ROOT_FONT_SIZE)}rem`;

/**
 * `clamp()` between the mobile and desktop anchors, per TOKENS.md §3.2 and §4.6.
 * Expressed in rem so it scales with a reader's browser font-size setting.
 */
export const fluid = (minPx: number, maxPx: number): string => {
  if (minPx === maxPx) return rem(minPx);
  const slope = (maxPx - minPx) / (VIEWPORT_MAX - VIEWPORT_MIN);
  const intercept = minPx - slope * VIEWPORT_MIN;
  return `clamp(${rem(minPx)}, ${rem(intercept)} + ${round(slope * 100)}vw, ${rem(maxPx)})`;
};

/** OKLCH triplet → CSS colour function. */
export const oklch = ({ l, c, h }: Oklch): string => `oklch(${round(l, 3)} ${round(c, 3)} ${h})`;

/* ────────────────────────────────────────────────────────────────────────────
 * 3. Semantic tokens — the layer components consume
 * ──────────────────────────────────────────────────────────────────────────── */

export type Theme = 'light' | 'dark';

/** TOKENS.md §4.1–§4.4. Every entry maps a purpose to a primitive, per theme. */
export const semanticColor = {
  'color-text-primary': { light: neutral[1000], dark: neutral[50] },
  'color-text-secondary': { light: neutral[800], dark: neutral[400] },
  'color-text-tertiary': { light: neutral[700], dark: neutral[500] },
  'color-text-accent': { light: accent[700], dark: accent[500] },
  'color-text-on-accent': { light: neutral[0], dark: neutral[1000] },

  'color-surface-base': { light: neutral[0], dark: neutral[950] },
  'color-surface-raised': { light: neutral[50], dark: neutral[900] },
  'color-surface-sunken': { light: neutral[100], dark: neutral[1000] },
  'color-surface-overlay': { light: neutral[0], dark: neutral[900] },

  'color-border-subtle': { light: neutral[200], dark: neutral[800] },
  'color-border-strong': { light: neutral[600], dark: neutral[500] },

  'color-interactive': { light: accent[700], dark: accent[500] },
  'color-interactive-hover': { light: accent[600], dark: accent[400] },
  'color-interactive-pressed': { light: accent[800], dark: accent[600] },
  'color-focus-ring': { light: accent[700], dark: accent[400] },

  'color-status-positive': {
    light: status.positive.textLight,
    dark: status.positive.textDark,
  },
  'color-status-positive-tint': {
    light: status.positive.tintLight,
    dark: status.positive.tintDark,
  },
  'color-status-caution': {
    light: status.caution.textLight,
    dark: status.caution.textDark,
  },
  'color-status-caution-tint': {
    light: status.caution.tintLight,
    dark: status.caution.tintDark,
  },
  'color-status-critical': {
    light: status.critical.textLight,
    dark: status.critical.textDark,
  },
  'color-status-critical-tint': {
    light: status.critical.tintLight,
    dark: status.critical.tintDark,
  },
} as const satisfies Record<string, Record<Theme, Oklch>>;

/**
 * TOKENS.md §4.3 — the one sanctioned exception to rule 2. Its correct value is
 * definitionally "whatever the page surface is", so it aliases a semantic token.
 */
export const focusRingOffset = 'var(--color-surface-base)';

/** TOKENS.md §4.5 — each token bundles size, family, weight, line height, tracking. */
export interface TypeToken {
  readonly step: keyof typeof typeScale;
  readonly family: keyof typeof fontFamily;
  readonly weight: keyof typeof fontWeight;
  readonly lineHeight: number;
  readonly tracking: string;
}

export const semanticType = {
  'type-display': {
    step: 800,
    family: 'display',
    weight: 'regular',
    lineHeight: 1.05,
    tracking: '-0.025em',
  },
  'type-heading-1': {
    step: 700,
    family: 'display',
    weight: 'regular',
    lineHeight: 1.1,
    tracking: '-0.02em',
  },
  'type-heading-2': {
    step: 600,
    family: 'display',
    weight: 'regular',
    lineHeight: 1.15,
    tracking: '-0.015em',
  },
  'type-heading-3': {
    step: 500,
    family: 'display',
    weight: 'medium',
    lineHeight: 1.25,
    tracking: '-0.01em',
  },
  'type-heading-4': {
    step: 400,
    family: 'text',
    weight: 'semibold',
    lineHeight: 1.35,
    tracking: '-0.005em',
  },
  'type-lede': {
    step: 400,
    family: 'text',
    weight: 'regular',
    lineHeight: 1.5,
    tracking: '-0.005em',
  },
  'type-body': { step: 300, family: 'text', weight: 'regular', lineHeight: 1.6, tracking: '0' },
  'type-body-sm': { step: 200, family: 'text', weight: 'regular', lineHeight: 1.55, tracking: '0' },
  'type-label': {
    step: 200,
    family: 'text',
    weight: 'semibold',
    lineHeight: 1.3,
    tracking: '0.01em',
  },
  'type-caption': {
    step: 100,
    family: 'text',
    weight: 'regular',
    lineHeight: 1.45,
    tracking: '0.005em',
  },
  'type-metric': {
    step: 800,
    family: 'display',
    weight: 'regular',
    lineHeight: 1.0,
    tracking: '-0.02em',
  },
  'type-code': { step: 200, family: 'mono', weight: 'regular', lineHeight: 1.55, tracking: '0' },
} as const satisfies Record<string, TypeToken>;

/** TOKENS.md §4.6 — section rhythm. Fluid, and deliberately not on the component scale. */
export const sectionSpace = {
  sm: { mobile: 56, desktop: 80 },
  md: { mobile: 80, desktop: 128 },
  lg: { mobile: 112, desktop: 192 },
} as const;

/** TOKENS.md §4.7 — density multipliers. Applied once, by the container. */
export const density = {
  compact: 0.75,
  default: 1,
  reading: 1.25,
} as const;

/* ────────────────────────────────────────────────────────────────────────────
 * 3b. Component tokens
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * TOKENS.md §5 — the component layer is optional and exceptional. It exists
 * only where a component needs a value no semantic token expresses.
 *
 * Both entries below are specified in `COMPONENT_GUIDELINES.md` as component
 * values with no semantic equivalent:
 *
 *   `target-min`           §2.2 and ACCESSIBILITY.md §2. The minimum interactive
 *                          target, above the WCAG 2.2 floor of 24. It is an
 *                          accessibility constraint, not a spacing step, and it
 *                          must not drift with the spacing scale.
 *   `link-underline-offset` §2.1. The underline is the link affordance; its
 *                          offset is optical and relative to the type size, so
 *                          it is expressed in `em` and belongs to no space step.
 *
 * Underline *thickness* deliberately reuses `--border-hairline` (1 px) and
 * `--border-emphasis` (2 px) rather than adding tokens for the same values.
 */
export const componentToken = {
  'target-min': '44px',
  'link-underline-offset': '0.15em',
} as const;

/* ────────────────────────────────────────────────────────────────────────────
 * 4. CSS custom property emission
 * ──────────────────────────────────────────────────────────────────────────── */

/** Primitive and theme-invariant custom properties. */
export function rootVariables(): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const [step, value] of Object.entries(neutral)) vars[`--neutral-${step}`] = oklch(value);
  for (const [step, value] of Object.entries(accent)) vars[`--accent-${step}`] = oklch(value);

  for (const [step, { mobile, desktop }] of Object.entries(typeScale)) {
    vars[`--type-${step}`] = fluid(mobile, desktop);
  }

  vars['--font-display'] = fontFamily.display;
  vars['--font-text'] = fontFamily.text;
  vars['--font-mono'] = fontFamily.mono;
  vars['--weight-regular'] = String(fontWeight.regular);
  vars['--weight-medium'] = String(fontWeight.medium);
  vars['--weight-semibold'] = String(fontWeight.semibold);

  for (const [step, px] of Object.entries(space)) vars[`--space-${step}`] = rem(px);

  for (const [name, ms] of Object.entries(duration)) vars[`--duration-${name}`] = `${ms}ms`;
  for (const [name, curve] of Object.entries(easing)) vars[`--ease-${name}`] = curve;
  vars['--stagger-interval'] = `${stagger.interval}ms`;
  vars['--stagger-max'] = String(stagger.max);

  vars['--radius-sm'] = `${radius.sm}px`;
  vars['--radius-md'] = `${radius.md}px`;
  vars['--border-hairline'] = `${border.hairline}px`;
  vars['--border-emphasis'] = `${border.emphasis}px`;
  for (const [name, px] of Object.entries(icon)) vars[`--icon-${name}`] = `${px}px`;
  vars['--container-prose'] = container.prose;
  vars['--container-wide'] = container.wide;
  vars['--container-full'] = container.full;
  for (const [name, px] of Object.entries(breakpoint)) vars[`--bp-${name}`] = `${px}px`;

  for (const [name, { mobile, desktop }] of Object.entries(sectionSpace)) {
    vars[`--space-section-${name}`] = fluid(mobile, desktop);
  }
  for (const [name, value] of Object.entries(density)) vars[`--density-${name}`] = String(value);

  for (const [name, value] of Object.entries(componentToken)) vars[`--${name}`] = value;

  for (const [name, token] of Object.entries(semanticType)) {
    const { mobile, desktop } = typeScale[token.step];
    vars[`--${name}-size`] = fluid(mobile, desktop);
    vars[`--${name}-family`] = `var(--font-${token.family})`;
    vars[`--${name}-weight`] = `var(--weight-${token.weight})`;
    vars[`--${name}-line-height`] = String(token.lineHeight);
    vars[`--${name}-tracking`] = token.tracking;
  }

  return vars;
}

/** Theme-dependent semantic custom properties. */
export function themeVariables(theme: Theme): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [name, value] of Object.entries(semanticColor)) {
    vars[`--${name}`] = oklch(value[theme]);
  }
  vars['--color-focus-ring-offset'] = focusRingOffset;
  return vars;
}

const declarations = (vars: Record<string, string>, indent = '  '): string =>
  Object.entries(vars)
    .map(([name, value]) => `${indent}${name}: ${value};`)
    .join('\n');

/**
 * The complete generated stylesheet. `src/styles/tokens.css` is written from
 * this and committed; `scripts/check-tokens.mjs` asserts the two stay in sync.
 */
export function tokensCss(): string {
  return [
    '/*',
    ' * GENERATED FILE — do not edit.',
    ' * Source: src/design/tokens.ts. Regenerate with `npm run tokens:generate`.',
    ' */',
    '',
    ':root {',
    declarations(rootVariables()),
    '',
    declarations(themeVariables('light')),
    '  color-scheme: light;',
    '}',
    '',
    '@media (prefers-color-scheme: dark) {',
    '  :root {',
    declarations(themeVariables('dark'), '    '),
    '    color-scheme: dark;',
    '  }',
    '}',
    '',
    ':root[data-theme="light"] {',
    declarations(themeVariables('light')),
    '  color-scheme: light;',
    '}',
    '',
    ':root[data-theme="dark"] {',
    declarations(themeVariables('dark')),
    '  color-scheme: dark;',
    '}',
    '',
    // `wireframes/07-resume.md` §6 — print resolves to light regardless of the
    // reader's setting. Emitted from the same `light` source as every other
    // block above rather than restated by hand, so a token change cannot leave
    // the printed document behind. Last in the file so it wins over both the
    // media query and the explicit `[data-theme]` override.
    '@media print {',
    '  :root {',
    declarations(themeVariables('light'), '    '),
    '    color-scheme: light;',
    '  }',
    '}',
    '',
  ].join('\n');
}

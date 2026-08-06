import { describe, expect, it } from 'vitest';

import {
  accent,
  breakpoint,
  container,
  density,
  duration,
  easing,
  fontWeight,
  icon,
  neutral,
  radius,
  semanticColor,
  semanticType,
  space,
  stagger,
  status,
  typeScale,
  type Oklch,
} from '../../src/design/tokens';
import { TYPE_CLASS } from '../../src/design/typeClasses';

/** CIE L* -> relative luminance, then the WCAG contrast ratio. */
const luminance = (l: number): number => ((l * 100 + 16) / 116) ** 3;
const contrast = (a: Oklch, b: Oklch): number => {
  const [hi, lo] = [luminance(a.l) + 0.05, luminance(b.l) + 0.05].sort((x, y) => y - x) as [
    number,
    number,
  ];
  return hi / lo;
};

describe('primitives match TOKENS.md', () => {
  it('neutral ramp is 13 steps at hue 250', () => {
    expect(Object.keys(neutral)).toHaveLength(13);
    expect(Object.values(neutral).every((c) => c.h === 250)).toBe(true);
    expect(neutral[0].l).toBe(0.995);
    expect(neutral[1000].l).toBe(0.12);
  });

  it('accent ramp is 5 steps at hue 220', () => {
    expect(Object.keys(accent)).toHaveLength(5);
    expect(Object.values(accent).every((c) => c.h === 220)).toBe(true);
  });

  it('type scale is 9 steps with the documented anchors', () => {
    expect(Object.keys(typeScale)).toHaveLength(9);
    expect(typeScale[300]).toEqual({ mobile: 17, desktop: 18 });
    expect(typeScale[800]).toEqual({ mobile: 38, desktop: 55 });
    // ADR-020 — step 900 exists for the home page's opening statement.
    expect(typeScale[900]).toEqual({ mobile: 40, desktop: 58 });
  });

  it('step 900 is the top of the scale and has exactly one consumer', () => {
    // This assertion has been rewritten twice to accommodate a design change,
    // which is the signal that the thing it was testing — a ratio against
    // whatever size happened to sit beneath it — was an opinion rather than an
    // invariant. It kept needing revision because it was encoding a value, not
    // a rule.
    //
    // What is actually true of step 900, and stays true: it is the largest step
    // on the scale, and `type-hero` is the only token that reaches it. Its
    // exact value is an art-direction decision recorded in ADR-025 and measured
    // against the column it has to fit; a unit test is the wrong place to
    // relitigate it.
    const steps = Object.keys(typeScale).map(Number);
    expect(Math.max(...steps)).toBe(900);

    const atTop = Object.entries(semanticType).filter(([, token]) => token.step === 900);
    expect(atTop.map(([name]) => name)).toEqual(['type-hero']);
  });

  it('space scale omits steps 7, 9, 11, 13-15, 17-19 deliberately', () => {
    expect(Object.keys(space).map(Number)).toEqual([0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20]);
  });

  it('motion is four durations and three easings, frozen by ADR-011', () => {
    // ADR-021 added a second, ambient motion system for animated diagrams;
    // ADR-023 withdrew it with the diagrams. The scale is back to exactly what
    // ADR-011 froze, and nothing on the site animates for longer than 400 ms.
    expect(Object.values(duration)).toEqual([100, 160, 240, 400]);
    expect(Object.values(duration).every((ms) => ms <= 400)).toBe(true);
    expect(Object.keys(easing)).toHaveLength(3);
    expect(stagger).toEqual({ interval: 60, max: 4 });
  });

  it('dimension tokens match, with exactly two radii and three containers', () => {
    expect(radius).toEqual({ sm: 2, md: 4 });
    expect(Object.keys(container)).toEqual(['prose', 'wide', 'full']);
    expect(icon).toEqual({ sm: 16, md: 20, lg: 24 });
    expect(breakpoint).toEqual({ sm: 640, md: 900, lg: 1280 });
  });

  it('four weight values across two families', () => {
    expect(Object.values(fontWeight)).toEqual([400, 500, 600]);
  });

  it('density multipliers match SPACING.md §5', () => {
    expect(density).toEqual({ compact: 0.75, default: 1, reading: 1.25 });
  });
});

describe('contrast floors — ACCESSIBILITY.md §3', () => {
  const surface = { light: neutral[0], dark: neutral[950] } as const;

  const expectations: [keyof typeof semanticColor, number][] = [
    ['color-text-primary', 13],
    ['color-text-secondary', 7],
    ['color-text-tertiary', 4.5],
    ['color-text-accent', 4.5],
  ];

  for (const [token, floor] of expectations) {
    for (const theme of ['light', 'dark'] as const) {
      it(`${token} clears ${floor}:1 on ${theme}`, () => {
        expect(contrast(semanticColor[token][theme], surface[theme])).toBeGreaterThanOrEqual(floor);
      });
    }
  }

  it('border-strong clears 3:1 against base and raised, both themes', () => {
    expect(contrast(semanticColor['color-border-strong'].light, neutral[0])).toBeGreaterThanOrEqual(
      3,
    );
    expect(
      contrast(semanticColor['color-border-strong'].light, neutral[50]),
    ).toBeGreaterThanOrEqual(3);
    expect(
      contrast(semanticColor['color-border-strong'].dark, neutral[950]),
    ).toBeGreaterThanOrEqual(3);
    expect(
      contrast(semanticColor['color-border-strong'].dark, neutral[900]),
    ).toBeGreaterThanOrEqual(3);
  });

  it('focus ring clears 3:1 against the page surface, both themes', () => {
    expect(contrast(semanticColor['color-focus-ring'].light, neutral[0])).toBeGreaterThanOrEqual(3);
    expect(contrast(semanticColor['color-focus-ring'].dark, neutral[950])).toBeGreaterThanOrEqual(
      3,
    );
  });

  it('status text clears 4.5:1 on its own tint and on the raised surface', () => {
    for (const name of ['positive', 'caution', 'critical'] as const) {
      const s = status[name];
      expect(contrast(s.textLight, s.tintLight)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(s.textDark, s.tintDark)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(s.textLight, neutral[50])).toBeGreaterThanOrEqual(4.5);
      expect(contrast(s.textDark, neutral[900])).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('text-on-accent clears 4.5:1 against its accent fill', () => {
    expect(
      contrast(semanticColor['color-text-on-accent'].light, accent[700]),
    ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrast(semanticColor['color-text-on-accent'].dark, accent[500]),
    ).toBeGreaterThanOrEqual(4.5);
  });
});

describe('type tokens reach the stylesheet', () => {
  /**
   * Guards a defect that shipped and was invisible for weeks.
   *
   * `Text` built its size class as a template literal, so Tailwind — which finds
   * class names by scanning source text — generated only the five that happened
   * to appear as complete literals elsewhere. Nine tokens were missing from the
   * stylesheet entirely. It looked correct because `globals.css` styles h1–h4 as
   * elements, so headings resolved through the element rule; what silently broke
   * was `lede`, `display`, and any heading token applied to a non-heading, which
   * is a combination the `Text` API exists to support.
   */
  it('every semantic type token has a literal class name', () => {
    for (const key of Object.keys(semanticType)) {
      const token = key.replace('type-', '') as keyof typeof TYPE_CLASS;
      expect(TYPE_CLASS[token]).toBe(`text-${key}`);
    }
  });

  it('the class map carries no token the scale does not define', () => {
    for (const token of Object.keys(TYPE_CLASS)) {
      expect(Object.keys(semanticType)).toContain(`type-${token}`);
    }
  });

  it('every class name is a complete literal, never assembled', () => {
    // The failure mode is a value like `text-type-${x}`. A literal contains no
    // interpolation and matches the class-name grammar exactly.
    for (const value of Object.values(TYPE_CLASS)) {
      expect(value).toMatch(/^text-type-[a-z0-9-]+$/);
    }
  });
});

describe('token architecture — DESIGN_SYSTEM.md §5', () => {
  it('every semantic colour resolves to a primitive in both themes', () => {
    const primitives = new Set(
      [...Object.values(neutral), ...Object.values(accent)].map((c) => `${c.l}/${c.c}/${c.h}`),
    );
    const statusValues = new Set(
      Object.values(status)
        .flatMap((s) => Object.values(s))
        .map((c) => `${c.l}/${c.c}/${c.h}`),
    );
    for (const value of Object.values(semanticColor)) {
      for (const theme of ['light', 'dark'] as const) {
        const key = `${value[theme].l}/${value[theme].c}/${value[theme].h}`;
        expect(primitives.has(key) || statusValues.has(key)).toBe(true);
      }
    }
  });

  it('every semantic type token references a real scale step', () => {
    for (const token of Object.values(semanticType)) {
      expect(typeScale[token.step]).toBeDefined();
    }
  });

  it('display face uses only weights 400 and 500; text face only 400 and 600', () => {
    for (const token of Object.values(semanticType)) {
      if (token.family === 'display') expect(['regular', 'medium']).toContain(token.weight);
      if (token.family === 'text') expect(['regular', 'semibold']).toContain(token.weight);
    }
  });
});

import { describe, expect, it } from 'vitest';

import {
  accent,
  breakpoint,
  container,
  density,
  duration,
  easing,
  flow,
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
    expect(typeScale[900]).toEqual({ mobile: 40, desktop: 80 });
  });

  it('step 900 is a step change from 800, not another rung of the ramp', () => {
    // The point of the step is that it is different in kind from a section
    // heading. At the 1.25 ratio the rest of the ramp uses it would land at 69,
    // which is a slightly bigger heading rather than an opening statement.
    const ratio = typeScale[900].desktop / typeScale[800].desktop;
    expect(ratio).toBeGreaterThan(1.4);
  });

  it('space scale omits steps 7, 9, 11, 13-15, 17-19 deliberately', () => {
    expect(Object.keys(space).map(Number)).toEqual([0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20]);
  });

  it('motion is four durations and three easings, frozen by ADR-011', () => {
    expect(Object.values(duration)).toEqual([100, 160, 240, 400]);
    expect(Object.keys(easing)).toHaveLength(3);
    expect(stagger).toEqual({ interval: 60, max: 4 });
  });

  it('ambient flow is a separate system and never leaks into the §9 ceiling', () => {
    // ADR-021 — every flow value exceeds the 400 ms ceiling that ARCHITECTURE.md
    // §9 places on interface motion, which is exactly why it is not in
    // `duration`. This assertion is what stops a future author from "tidying"
    // the two together: doing so raises the interface ceiling by a factor of six
    // without anyone deciding to.
    expect(Object.values(duration).every((ms) => ms <= 400)).toBe(true);
    // Only the cycle lengths carry the argument. `stagger` is an offset between
    // elements and `origin` is the absence of one — neither is the length of an
    // animation, so neither is bound by a ceiling on animation length.
    for (const ms of [flow.cycle, flow.slow]) expect(ms).toBeGreaterThan(400);
    expect(flow.slow).toBeGreaterThan(flow.cycle);
    expect(flow.stagger).toBeLessThan(flow.cycle);
    expect(flow.origin).toBe(0);
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

  it('the diagram flow colour clears 3:1 against the page surface, both themes', () => {
    // ADR-021 — `color-flow` is a graphic, not text, so the floor is the 3:1
    // non-text contrast requirement rather than 4.5:1. It is asserted because a
    // travelling pulse a reader cannot see is a diagram that silently lost its
    // only depiction of movement.
    expect(contrast(semanticColor['color-flow'].light, neutral[0])).toBeGreaterThanOrEqual(3);
    expect(contrast(semanticColor['color-flow'].dark, neutral[950])).toBeGreaterThanOrEqual(3);
  });

  it('the schematic grid stays below the floor it is exempt from', () => {
    // Deliberately inverted. `color-grid-line` carries no information, and the
    // risk it actually runs is becoming *too* visible and reading as a table.
    expect(contrast(semanticColor['color-grid-line'].light, neutral[0])).toBeLessThan(3);
    expect(contrast(semanticColor['color-grid-line'].dark, neutral[950])).toBeLessThan(3);
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

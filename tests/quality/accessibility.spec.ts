import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { ROUTES } from './routes';

/** ARCHITECTURE.md §12 check 9 — zero serious or critical, every route. */
for (const route of ROUTES) {
  test(`axe: ${route}`, async ({ page }) => {
    await page.goto(route);
    const { violations } = await new AxeBuilder({ page })
      // `best-practice` is included so `heading-order` actually runs — it is
      // not a WCAG-tagged rule, so a WCAG-only tag set never evaluates it, and
      // ACCESSIBILITY.md §8 requires that heading levels never skip.
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
      .analyze();
    const blocking = violations.filter(
      (v) =>
        v.impact === 'serious' ||
        v.impact === 'critical' ||
        // ACCESSIBILITY.md §8 — "Heading levels never skip." axe rates this
        // `moderate`, below the impact filter, so it is asserted by name.
        v.id === 'heading-order',
    );
    expect(blocking.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
}

/** ACCESSIBILITY.md §8 — one h1, landmarks present. */
for (const route of ROUTES) {
  test(`structure: ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('header')).toHaveCount(1);
    await expect(page.locator('footer')).toHaveCount(1);
  });
}

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { ROUTES } from './routes';

/**
 * Settle entrance reveals before auditing.
 *
 * `MOTION.md` §5 holds below-fold content at `opacity: 0` until its observer
 * fires. axe blends that against the background and reports a contrast failure
 * — 1.46:1 for text that is mid-animation and off-screen. WCAG 1.4.3 governs
 * text as presented to the reader, and that text is not yet presented, so the
 * finding is an artefact of auditing a transient state rather than a defect.
 *
 * `opacity` is the correct mechanism regardless: `visibility: hidden` would
 * suppress the contrast finding but remove the content from the accessibility
 * tree, which is a real regression for anyone navigating by headings.
 *
 * So the page is scrolled to settle every reveal, then returned to the top, and
 * the audit runs against the state a reader actually reads.
 */
async function settleReveals(page: import('@playwright/test').Page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page
    .waitForFunction(() => document.querySelector('[data-reveal="pending"]') === null, null, {
      timeout: 5_000,
    })
    .catch(() => {
      throw new Error('An entrance reveal never fired; content would stay at opacity 0.');
    });
  await page.evaluate(() => window.scrollTo(0, 0));
}

/** ARCHITECTURE.md §12 check 9 — zero serious or critical, every route. */
for (const route of ROUTES) {
  test(`axe: ${route}`, async ({ page }) => {
    await page.goto(route);
    await settleReveals(page);
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

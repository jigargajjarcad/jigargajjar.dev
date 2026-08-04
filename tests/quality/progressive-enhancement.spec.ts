import { expect, test } from '@playwright/test';

import { ROUTES } from './routes';

/** ARCHITECTURE.md §2 — every route readable with JavaScript disabled. */
test.describe('no JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  for (const route of ROUTES) {
    test(`renders: ${route}`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
    });
  }
});

/** MOTION.md §9 — reduced motion applies no transform-based animation. */
test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });
  for (const route of ROUTES) {
    test(`no transform animation: ${route}`, async ({ page }) => {
      await page.goto(route);
      const animated = await page.evaluate(
        () =>
          [...document.querySelectorAll('*')].filter((el) => {
            const s = getComputedStyle(el);
            return s.transitionProperty.includes('transform') || s.animationName !== 'none';
          }).length,
      );
      expect(animated).toBe(0);
    });
  }
});

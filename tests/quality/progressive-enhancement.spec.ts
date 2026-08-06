import { expect, test } from '@playwright/test';

import { ROUTES } from './routes';

/**
 * `ARCHITECTURE.md` §12 gate 10 — JavaScript-disabled rendering and the
 * reduced-motion path.
 *
 * **Both checks are applied per-context and per-page rather than through
 * `test.use`.** With this configuration `test.use({ javaScriptEnabled: false })`
 * and `test.use({ reducedMotion: 'reduce' })` do not take effect — the project's
 * device profile wins — so both suites ran against a normal browser and passed
 * without exercising either path. They were green and they were verifying
 * nothing. `browser.newContext()` and `page.emulateMedia()` are honoured, and
 * both are asserted below before the routes are checked, so the gate fails
 * loudly if the emulation ever stops applying again.
 */

test.describe('no JavaScript', () => {
  test('the emulation is actually in effect', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/');

    // `page.evaluate` is not a valid probe here: Playwright runs it over the
    // debugger protocol, so it still returns with page scripting disabled.
    // The observable proof that client JavaScript did not run is one of our own
    // client effects — `Reveal` sets `data-reveal` on mount, and `/` carries
    // three of them. If any appear, scripting was live and the no-JS
    // assertions below are meaningless.
    const revealed = await page.locator('[data-reveal]').count();
    expect(revealed).toBe(0);

    await context.close();
  });

  for (const route of ROUTES) {
    test(`renders: ${route}`, async ({ browser }) => {
      const context = await browser.newContext({ javaScriptEnabled: false });
      const page = await context.newPage();
      await page.goto(route);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await context.close();
    });
  }
});

test.describe('reduced motion', () => {
  test('the emulation is actually in effect', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const matches = await page.evaluate(
      () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );
    expect(matches).toBe(true);
  });

  /** MOTION.md §9 — reduced motion applies no transform-based animation. */
  for (const route of ROUTES) {
    test(`no transform animation: ${route}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
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

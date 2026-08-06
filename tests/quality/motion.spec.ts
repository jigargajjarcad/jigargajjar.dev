import { expect, test } from '@playwright/test';

/**
 * Entrance reveal — `MOTION.md` §5, `ARCHITECTURE.md` §9 phase-5 exit condition
 * ("§9 patterns implemented; reduced-motion path verified").
 *
 * `/` is the surface under test: bands 2–6 carry the reveal, band 1 does not.
 *
 * The reduced-motion and no-JavaScript paths are covered generically for every
 * route in `progressive-enhancement.spec.ts`. What is asserted here is the part
 * that generic sweep cannot see — that the animation actually runs when it
 * should, that it lands in the correct final state, and that the content is
 * never dependent on it.
 */

const REVEALED = '[data-reveal]';

test.describe('entrance reveal', () => {
  test('content is present in server output before any script runs', async ({ browser }) => {
    // MOTION.md §5 — "the default state in markup is the final state". An
    // element relying on script to become visible is a defect, so the reveal
    // attribute must be absent from the HTML the server sends.
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'What I actually do' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Work with me' })).toBeVisible();
    expect(await page.locator(REVEALED).count()).toBe(0);

    await context.close();
  });

  test('band 1 is never animated — it is above the fold', async ({ page }) => {
    await page.goto('/');
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    // The hero must not sit inside a reveal wrapper at any point.
    expect(await h1.locator('xpath=ancestor::*[@data-reveal]').count()).toBe(0);
  });

  test('below-fold bands reveal on scroll and settle at full opacity', async ({ page }) => {
    await page.goto('/');

    const last = page.locator(REVEALED).last();
    await last.scrollIntoViewIfNeeded();

    // §5 — the transition resolves at --duration-entrance (400ms).
    await expect(last).toHaveAttribute('data-reveal', 'shown', { timeout: 2000 });
    await expect.poll(async () => last.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
  });

  test('a revealed element does not re-fire when scrolled away and back', async ({ page }) => {
    await page.goto('/');

    const target = page.locator(REVEALED).last();
    await target.scrollIntoViewIfNeeded();
    await expect(target).toHaveAttribute('data-reveal', 'shown', { timeout: 2000 });

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(150);
    await target.scrollIntoViewIfNeeded();

    // §5 — "fires once per element per page load". The observer is disconnected,
    // so the state cannot return to `pending`.
    await expect(target).toHaveAttribute('data-reveal', 'shown');
  });

  test('reduced motion applies no pending state at all', async ({ browser }) => {
    // §9 — under reduced motion the animation is removed, not shortened. The
    // component declines to apply `pending`, so nothing is ever hidden.
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    // The attribute is never written at all — not written and then overridden.
    // Nothing is hidden, so there is nothing to reveal and no observer to run.
    expect(await page.locator(REVEALED).count()).toBe(0);

    await expect(page.getByRole('heading', { name: 'What I actually do' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Work with me' })).toBeVisible();

    await context.close();
  });

  test('only transform and opacity transition — never a layout property', async ({ page }) => {
    // §9 — "permitted properties: transform and opacity only". Animating a
    // layout property is the difference between motion that costs nothing and
    // motion that costs frames on the reference device.
    await page.goto('/');
    const properties = await page
      .locator(REVEALED)
      .evaluateAll((els) => els.map((el) => getComputedStyle(el).transitionProperty));

    expect(properties.length).toBeGreaterThan(0);
    for (const property of properties) {
      expect(property).toBe('opacity, transform');
    }
  });
});

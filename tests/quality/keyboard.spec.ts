import { expect, test } from '@playwright/test';

import { ROUTES } from './routes';

/** ARCHITECTURE.md §12 check 10 — keyboard traversal and focus visibility. */
for (const route of ROUTES) {
  test(`skip link is the first focusable element: ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.getAttribute('href'));
    expect(focused).toBe('#main');
  });

  test(`every focusable element shows a focus indicator: ${route}`, async ({ page }) => {
    await page.goto(route);
    const focusables = await page.locator('a[href], button, input, select, textarea').all();
    for (let i = 0; i < focusables.length; i += 1) {
      await page.keyboard.press('Tab');
      const outline = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return null;
        const style = getComputedStyle(el);
        return `${style.outlineStyle}/${style.outlineWidth}`;
      });
      expect(outline).not.toBe('none/0px');
    }
  });
}

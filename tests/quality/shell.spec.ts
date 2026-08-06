import { expect, test } from '@playwright/test';

/**
 * Application shell infrastructure — COMPONENT_GUIDELINES.md §3.1–§3.3,
 * INTERACTION.md §11, ACCESSIBILITY.md §4.
 */

test('exactly one theme control exists at any width', async ({ page }) => {
  await page.goto('/');
  // Mobile: the control lives in the footer, not the header.
  await expect(page.getByRole('button', { name: /^Theme:/ })).toHaveCount(1);
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(page.getByRole('button', { name: /^Theme:/ })).toHaveCount(1);
});

test('theme control is a three-state menu with visible labels', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: /^Theme:/ });
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  const menu = page.getByRole('menu', { name: 'Theme' });
  await expect(menu.getByRole('menuitemradio')).toHaveCount(3);
  for (const label of ['Light', 'Dark', 'System']) {
    await expect(menu.getByText(label, { exact: true })).toBeVisible();
  }
});

test('theme choice applies and persists across a reload', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /^Theme:/ }).click();
  await page.getByRole('menuitemradio', { name: 'Dark' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('theme menu closes on Escape and returns focus to its trigger', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: /^Theme:/ });
  await trigger.click();
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();
});

test('mobile navigation traps focus, locks scroll, and restores on Escape', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Navigation' });
  await toggle.click();
  const dialog = page.getByRole('dialog', { name: 'Navigation' });
  await expect(dialog).toBeVisible();
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  // Focus stays inside the panel across a full cycle.
  for (let i = 0; i < 8; i += 1) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(toggle).toBeFocused();
});

test('current route is marked by weight and aria-current, not colour alone', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/work');
  const current = page.getByRole('link', { name: 'Work', exact: true });
  await expect(current).toHaveAttribute('aria-current', 'page');
  await expect(current).toHaveCSS('font-weight', '600');
});

test('navigation is a plain visible list without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://localhost:3000/');
  // Markup first, disclosure second (INTERACTION.md §9).
  for (const label of ['Work', 'Method', 'About', 'Contact']) {
    await expect(page.getByRole('link', { name: label, exact: true })).toHaveCount(1);
  }
  await context.close();
});

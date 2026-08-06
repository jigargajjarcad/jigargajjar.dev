import { expect, test } from '@playwright/test';

import { POSITIONING } from '../../src/content/site';

/**
 * Homepage band contract — `HOMEPAGE_NARRATIVE.md` §4–§5.
 *
 * The band structure is frozen at six and the order is the objection sequence.
 * Bands 3 and 4 are content-driven and render nothing until the flagship case
 * studies exist (Phase 6), so these assertions cover the invariants that hold
 * regardless of content.
 */

test('band 1 is the positioning sentence, verbatim and as the only h1', async ({ page }) => {
  await page.goto('/');
  const h1 = page.locator('h1');
  await expect(h1).toHaveCount(1);
  // Asserted against the canonical constant rather than a copy of it: a literal
  // here would be a seventh place the sentence could drift from, which is the
  // failure this file exists to catch.
  await expect(h1).toHaveText(POSITIONING);
});

test('band 2 precedes any evidence band', async ({ page }) => {
  await page.goto('/');
  // FOUNDATION.md §3 goal 4 — the workflow objection is answered before the
  // reader has to ask it. An unresolved objection discounts what follows.
  const headings = await page.locator('main h2').allTextContents();
  expect(headings[0]).toBe('What I actually do');
});

test('bands appear in the frozen order', async ({ page }) => {
  await page.goto('/');
  const headings = await page.locator('main h2').allTextContents();
  const expected = ['What I actually do', 'How the work gets made', 'Work with me'];
  // Bands 3 and 4 insert between 2 and 5 when content exists; the relative
  // order of the bands that always render must not change.
  expect(headings.filter((h) => expected.includes(h))).toEqual(expected);
});

test('band 6 is distinct from the footer, not merged into it', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main h2', { hasText: 'Work with me' })).toHaveCount(1);
  await expect(page.locator('footer h2', { hasText: 'Get in touch' })).toHaveCount(1);
});

test('no band carries a call to action', async ({ page }) => {
  await page.goto('/');
  // EXPERIENCE_PRINCIPLES.md §3 refuses urgency and obligation.
  const body = (await page.locator('main').textContent()) ?? '';
  for (const phrase of ['Get started', 'Sign up', "Let's talk", 'Hire me', 'Contact me today']) {
    expect(body).not.toContain(phrase);
  }
});

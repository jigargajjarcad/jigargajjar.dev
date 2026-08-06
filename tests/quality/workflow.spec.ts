import { expect, test } from '@playwright/test';

/**
 * `/workflow` structure — `docs/wireframes/04-workflow.md` §7 and §11,
 * `ARCHITECTURE.md` §6.6.
 *
 * axe, keyboard traversal, no-JavaScript rendering and the third-party
 * assertion already cover this route generically through `ROUTES`. What is
 * asserted here is the structure the wireframe made a decision about, so that a
 * later refactor cannot quietly undo it.
 */

test.describe('/workflow', () => {
  test('the sequence is an ordered list of ten stages, not a Timeline', async ({ page }) => {
    await page.goto('/workflow');

    // §7 records using Timeline here as a rejected near-miss:
    // COMPONENT_GUIDELINES.md §7 restricts it to project chronology inside a
    // case study. An <ol> is what announces position and count.
    const sequence = page.locator('ol').first();
    await expect(sequence).toBeVisible();
    await expect(sequence.locator('li')).toHaveCount(10);

    await expect(sequence.locator('li').first()).toContainText('Problem');
    await expect(sequence.locator('li').last()).toContainText('Retrospective');
  });

  test('ownership splits six owned against four delegated', async ({ page }) => {
    await page.goto('/workflow');

    // The division is the argument the section exists to make, and the counts
    // are what make it checkable in five seconds.
    await expect(page.getByRole('list', { name: 'Owned stages' }).locator('li')).toHaveCount(6);
    await expect(page.getByRole('list', { name: 'Delegated stages' }).locator('li')).toHaveCount(4);
  });

  test('every owned and delegated stage appears in the sequence', async ({ page }) => {
    await page.goto('/workflow');

    const sequence = await page.locator('ol').first().locator('li').allInnerTexts();
    const owned = await page
      .getByRole('list', { name: 'Owned stages' })
      .locator('li')
      .allInnerTexts();

    // "Planning detail" and "Release mechanics" name a part of a stage rather
    // than the stage, so only the owned side is asserted as an exact subset.
    for (const stage of owned) {
      expect(sequence.some((entry) => entry.includes(stage))).toBe(true);
    }
  });

  test('the sequence connector is decorative and carries no accessible text', async ({ page }) => {
    await page.goto('/workflow');

    // The arrow is generated content with an empty alt string
    // (`content: "→" / ""`), so it is drawn but never announced. It must not
    // reach the accessibility tree or the text content of the list.
    const text = await page.locator('ol').first().innerText();
    expect(text).not.toContain('→');
  });
});

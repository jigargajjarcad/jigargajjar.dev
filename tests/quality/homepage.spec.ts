import { expect, test } from '@playwright/test';

import { FAILURE_MODES, REFUSALS, THESIS } from '../../src/content/home';
import { POSITIONING } from '../../src/content/site';
import measured from '../../src/content/measured.json';

/**
 * Home page contract — Version 3, ADR-022.
 *
 * Two kinds of assertion live here, and the second kind is the unusual one.
 *
 * **Structural**, as in every previous version: the objection sequence, the
 * band order, the absence of a call to action, and the requirement that every
 * diagram render completely without JavaScript.
 *
 * **Editorial**, which is new. This page's argument rests on printing things
 * that are unflattering — failure modes that are not contained, verification
 * gaps, and the cost of every refusal. Those are exactly the passages a future
 * revision will be tempted to soften, and softening them would not break a
 * build, fail a lint, or look wrong in review. The tests below make removing
 * them a test failure, because the honesty is the feature.
 */

test('band 1 leads with the thesis, as the only h1', async ({ page }) => {
  await page.goto('/');
  const h1 = page.locator('h1');
  await expect(h1).toHaveCount(1);
  await expect(h1).toHaveText(THESIS);
});

test('the positioning sentence is still on the page, verbatim', async ({ page }) => {
  // FOUNDATION.md §5. Moved out of the `<h1>` by ADR-020, never dropped.
  await page.goto('/');
  await expect(page.locator('main')).toContainText(POSITIONING);
});

test('bands appear in the frozen order', async ({ page }) => {
  await page.goto('/');
  const headings = await page.locator('main h2').allTextContents();
  expect(headings).toEqual([
    'Everything here is checkable',
    'Two systems, one notation',
    'What breaks, and where it stops',
    'What I didn’t build',
    'Work with me',
  ]);
});

test('the workflow objection is answered before any system is shown', async ({ page }) => {
  await page.goto('/');
  // FOUNDATION.md §3 goal 4 — unresolved objections discount the evidence that
  // follows, so the pipeline naming Claude Code as stage four of seven must
  // precede the case studies. Unchanged across all three versions.
  const headings = await page.locator('main h2').allTextContents();
  expect(headings.indexOf('Everything here is checkable')).toBeLessThan(
    headings.indexOf('Two systems, one notation'),
  );
  const pipeline = page.locator('main').getByText('Claude Code', { exact: true });
  await expect(pipeline).toHaveCount(1);
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

/**
 * The instrument. The hero's credibility rests on the numbers being real and on
 * the structure surviving without them.
 */
test.describe('live trace', () => {
  test('reports real timings from the browser', async ({ page }) => {
    await page.goto('/');

    // The headline resolves from "Measuring…" to a millisecond figure.
    const headline = page.getByText(/It reached you in \d+ ms\./);
    await expect(headline).toBeVisible();

    // Every span reports a duration, not a placeholder. Each row also carries
    // its description, so the match is anywhere in the row rather than anchored
    // to the end of it.
    // There are exactly eight spans, so requiring eight filled rows is requiring
    // that none was left as the placeholder the server rendered.
    const trace = page.locator('main ol').first();
    await expect(trace.locator('li')).toHaveCount(8);
    expect(
      await trace
        .locator('li')
        .filter({ hasText: /\d+ ms/ })
        .count(),
    ).toBe(8);
  });

  test('renders its full structure without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/');

    // ARCHITECTURE.md §2 — script supplies numbers, never structure. Every span
    // label and description is in the HTML response, and the reader is told
    // plainly that the live figures need JavaScript rather than being shown a
    // silent blank.
    for (const label of ['DNS', 'Connect', 'Largest paint', 'Hydrate']) {
      await expect(page.locator('main').getByText(label, { exact: true })).toHaveCount(1);
    }
    await expect(page.locator('main')).toContainText('Live figures need JavaScript');

    await context.close();
  });
});

/**
 * The rendered measurements are the recorded ones.
 *
 * `check:measured` already proves the recording matches the build. This proves
 * the page renders the recording rather than a number someone typed next to it,
 * which is the remaining way a figure on this page could become a fiction.
 */
test('the verification band renders the recorded measurements', async ({ page }) => {
  await page.goto('/');
  const band = page.locator('main section', { hasText: 'Everything here is checkable' }).last();

  await expect(band).toContainText(String(measured.bundle.homeFirstLoadKb));
  await expect(band).toContainText(String(measured.bundle.homeFirstLoadBudgetKb));
  await expect(band).toContainText(String(measured.repository.decisionRecords));
  await expect(band).toContainText(String(measured.gates.unitTests + measured.gates.browserChecks));
});

/**
 * Editorial invariants. These protect the passages that make the page credible
 * and that nothing else would notice the loss of.
 */
test.describe('honesty', () => {
  test('the verification band states what it does not reach', async ({ page }) => {
    await page.goto('/');
    const band = page.locator('main section', { hasText: 'Everything here is checkable' }).last();
    await expect(band.getByRole('heading', { name: 'What none of it reaches' })).toBeVisible();
    // The specific admission that costs the most to print, and is therefore the
    // most likely to quietly disappear.
    await expect(band).toContainText('no automated test suite');
  });

  test('at least one failure mode is uncontained, and says so', async ({ page }) => {
    // A failure matrix in which everything is contained is a failure matrix
    // nobody stress-tested. The model must always carry a non-contained row.
    expect(FAILURE_MODES.some((mode) => mode.status !== 'contained')).toBe(true);
    expect(FAILURE_MODES.some((mode) => mode.enforcedBy.length === 0)).toBe(true);

    await page.goto('/');
    const band = page
      .locator('main section', { hasText: 'What breaks, and where it stops' })
      .last();
    await expect(band.getByText('Not contained')).toHaveCount(1);
    await expect(band).toContainText('there is no gate for this');
  });

  test('selecting an uncontained failure dims the whole map', async ({ page }) => {
    await page.goto('/');
    const tabs = page.getByRole('tablist', { name: 'Failure modes' }).getByRole('tab');
    const index = FAILURE_MODES.findIndex((mode) => mode.enforcedBy.length === 0);

    await tabs.nth(index).click();
    const dimmed = await page.locator('.system-dim').count();
    // Every node recedes, because nothing enforces this one.
    expect(dimmed).toBeGreaterThan(0);
    await expect(page.locator('[role="tabpanel"]').last()).toContainText('Nothing stops this one');
  });

  test('every refusal states what it cost', async ({ page }) => {
    expect(REFUSALS.every((r) => r.cost.length > 0)).toBe(true);

    await page.goto('/');
    const band = page.locator('main section', { hasText: 'What I didn’t build' }).last();
    // A refusal with no consequence is a preference. One label per entry.
    await expect(band.getByText('What it cost')).toHaveCount(REFUSALS.length);
  });
});

/**
 * The system traces must never acquire a duration column.
 *
 * Neither OrchestAI nor NovaMind has production traffic. A latency figure on
 * either would be the one fabricated number on a page whose argument is that its
 * numbers are checkable — and it is an easy, well-meant addition for someone
 * making the diagrams "more complete" later.
 */
test('system traces carry containment, not timings', async ({ page }) => {
  await page.goto('/');
  const band = page.locator('main section', { hasText: 'Two systems, one notation' }).last();

  await expect(band.getByText('span containment · not time · one agent run')).toBeVisible();
  await expect(band.getByText('span containment · not time · one query')).toBeVisible();
  await expect(
    band.getByText('no production traffic — a duration here would be invented'),
  ).toHaveCount(2);

  const text = (await band.textContent()) ?? '';
  expect(text).not.toMatch(/\d+\s?ms/);
});

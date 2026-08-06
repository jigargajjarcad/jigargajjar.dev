import { expect, test } from '@playwright/test';

import { THESIS } from '../../src/content/home';
import { POSITIONING } from '../../src/content/site';

/**
 * Home page contract — V2, `HOMEPAGE_NARRATIVE.md` §4–§5 and ADR-020.
 *
 * The band structure moved from six to seven and the presentation moved from
 * prose to explorable diagrams. **What did not move is the objection sequence**,
 * and that is what most of this file asserts: the order in which a reader's
 * doubts are answered is the page's actual design, and it is the thing a future
 * visual revision is most likely to break without noticing.
 *
 * Assertions are written against the canonical constants rather than against
 * copies of the strings, for the reason `site.ts` gives: a literal here would be
 * one more place the sentence can drift from.
 */

test('band 1 leads with the thesis, as the only h1', async ({ page }) => {
  await page.goto('/');
  const h1 = page.locator('h1');
  await expect(h1).toHaveCount(1);
  await expect(h1).toHaveText(THESIS);
});

test('the positioning sentence is still on the page, verbatim', async ({ page }) => {
  // FOUNDATION.md §5 — ADR-020 moved this sentence out of the `<h1>` and into
  // the line beneath it. It did not remove it, and it did not paraphrase it.
  // This is the assertion that keeps "moved" from quietly becoming "dropped".
  await page.goto('/');
  await expect(page.locator('main')).toContainText(POSITIONING);
});

test('the workflow objection is answered before any evidence', async ({ page }) => {
  await page.goto('/');
  // FOUNDATION.md §3 goal 4 — an unresolved objection discounts what follows,
  // so band 2 precedes every band that presents work.
  const headings = await page.locator('main h2').allTextContents();
  expect(headings[0]).toBe('What actually happens');
});

test('bands appear in the frozen order', async ({ page }) => {
  await page.goto('/');
  const headings = await page.locator('main h2').allTextContents();
  const expected = [
    'What actually happens',
    'OrchestAI',
    'NovaMind AI',
    'The rest of the work',
    'Engineering philosophy',
    'Work with me',
  ];
  expect(headings).toEqual(expected);
});

test('band 7 is distinct from the footer, not merged into it', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main h2', { hasText: 'Work with me' })).toHaveCount(1);
  await expect(page.locator('footer h2', { hasText: 'Get in touch' })).toHaveCount(1);
});

test('no band carries a call to action', async ({ page }) => {
  await page.goto('/');
  // EXPERIENCE_PRINCIPLES.md §3 refuses urgency and obligation. Unchanged by the
  // redesign — a more visually confident page is not a licence to start selling.
  const body = (await page.locator('main').textContent()) ?? '';
  for (const phrase of ['Get started', 'Sign up', "Let's talk", 'Hire me', 'Contact me today']) {
    expect(body).not.toContain(phrase);
  }
});

/**
 * The diagrams. ADR-021 — every one of them is a server-rendered SVG or a
 * server-rendered list that script only makes *explorable*. The distinction is
 * the whole architecture of this page, and these are the assertions that hold it
 * in place.
 */
test.describe('system diagrams', () => {
  test('the hero topology renders without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/');

    // Present in the HTML response, named, and carrying its nodes — not a
    // placeholder waiting for hydration.
    const graph = page.getByRole('img', { name: /orchestration topology/i });
    await expect(graph).toBeVisible();
    await expect(graph.locator('text')).not.toHaveCount(0);

    await context.close();
  });

  test('every explorable diagram renders its content without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/');

    // ARCHITECTURE.md §2 — script adds exploration, never content. Each rail
    // must ship every one of its stages, with the first already selected.
    for (const [name, count] of [
      ['Delivery lifecycle', 7],
      ['OrchestAI architecture layers', 6],
      ['Retrieval pipeline stages', 7],
    ] as const) {
      const tabs = page.getByRole('tablist', { name }).getByRole('tab');
      await expect(tabs).toHaveCount(count);
      await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
    }

    await context.close();
  });

  test('a rail is one tab stop, and arrows move within it', async ({ page }) => {
    await page.goto('/');
    const tabs = page.getByRole('tablist', { name: 'Delivery lifecycle' }).getByRole('tab');

    await tabs.first().focus();
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');

    await page.keyboard.press('ArrowRight');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(tabs.nth(1)).toBeFocused();

    // Wrapping, per the APG. From the first tab, ArrowLeft reaches the last.
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await expect(tabs.nth(6)).toHaveAttribute('aria-selected', 'true');

    await page.keyboard.press('Home');
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');

    // The roving part: only one tab is in the document's tab order.
    const reachable = await tabs.evaluateAll(
      (els) => els.filter((el) => el.getAttribute('tabindex') === '0').length,
    );
    expect(reachable).toBe(1);
  });

  test('selecting a stage swaps the panel it controls', async ({ page }) => {
    await page.goto('/');
    const tabs = page.getByRole('tablist', { name: 'Retrieval pipeline stages' }).getByRole('tab');

    const panelFor = async (index: number) => {
      const id = await tabs.nth(index).getAttribute('aria-controls');
      return page.locator(`#${id}`);
    };

    await expect(await panelFor(0)).toBeVisible();
    await tabs.nth(4).click();

    // Stage 5 is the reranker, and its panel is the one place on the home page
    // that explains why ten candidates become five.
    const panel = await panelFor(4);
    await expect(panel).toBeVisible();
    await expect(panel).toContainText('rerank-2-lite');
  });
});

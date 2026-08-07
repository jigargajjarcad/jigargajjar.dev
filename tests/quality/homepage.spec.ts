import { expect, test } from '@playwright/test';

import {
  CLOSING,
  METHOD,
  METHOD_EVIDENCE,
  REFUSALS,
  SYSTEMS,
  THESIS,
} from '../../src/content/home';
import { POSITIONING, VOICE } from '../../src/content/site';

/**
 * Home page contract — Version 4, ADR-023.
 *
 * **The unusual assertions here are the ones about size.** Every previous
 * version of this page was correct and too long; V3 shipped 1,914 words across
 * thirteen screens for a visitor who stays under a minute. Nothing in a normal
 * gate — types, lint, budgets, axe, Lighthouse — has any opinion about that, and
 * every one of them was green while the page was failing at its actual job.
 *
 * So the word count is a budget now, in the same sense the bundle is. It is the
 * only mechanism that stops the next good idea from being added on top of the
 * last one, which is how this page reached thirteen screens without any single
 * change ever looking wrong.
 */

/**
 * ARCHITECTURE.md §10 governs bytes; this governs attention, which is the
 * scarcer resource and was the one nothing measured.
 */
const WORD_BUDGET = 340;

test('band 1 leads with the thesis, as the only h1', async ({ page }) => {
  await page.goto('/');
  const h1 = page.locator('h1');
  await expect(h1).toHaveCount(1);
  await expect(h1).toHaveText(THESIS);
});

test('the claim is explained in a human voice, not a category', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main')).toContainText(VOICE);
});

test('the positioning sentence remains the document description', async ({ page }) => {
  // FOUNDATION.md §5, as amended by ADR-024. The canonical sentence is still
  // defined once and still used verbatim — it moved from the hero to the place
  // a category description actually belongs, which is the metadata a search
  // engine reads. What §5 forbids is paraphrase, and nothing here paraphrases.
  await page.goto('/');
  const description = await page.locator('meta[name="description"]').getAttribute('content');
  expect(description).toBe(POSITIONING);
});

test('the page stays inside its word budget', async ({ page }) => {
  await page.goto('/');
  const text = (await page.locator('main').innerText()) ?? '';
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  // Reported on failure, because the useful information is how far over it went
  // and the diff that did it — not that a boolean flipped.
  expect(words, `home page renders ${words} words; budget is ${WORD_BUDGET}`).toBeLessThanOrEqual(
    WORD_BUDGET,
  );
});

test('there are six screens and no more', async ({ page }) => {
  await page.goto('/');
  // One screen, one belief (`HOMEPAGE_NARRATIVE.md` §4). A seventh section is
  // not a formatting choice — it is a claim that a seventh belief is needed.
  await expect(page.locator('main > section, main > div > section')).toHaveCount(6);
});

test('screens appear in the frozen order', async ({ page }) => {
  await page.goto('/');
  const headings = await page.locator('main h2').allTextContents();
  expect(headings).toEqual([
    METHOD.join(''),
    'OrchestAI',
    'NovaMind AI',
    'What I didn’t build',
    'Available',
  ]);
});

test('the workflow objection is answered before any project appears', async ({ page }) => {
  await page.goto('/');
  // FOUNDATION.md §3 goal 4 — unchanged across all four versions. The method
  // screen precedes both systems; in V4 it does so in fifteen words.
  const headings = await page.locator('main h2').allTextContents();
  expect(headings.indexOf(METHOD.join(''))).toBe(0);
  await expect(page.locator('main')).toContainText('Verification that blocks the merge');
  // ADR-024 — the evidence line carries no inline `<code>`; at 14.5 px against
  // 22.5 px of lede an inline technical term read as a broken stylesheet.
  await expect(page.locator('main')).toContainText(METHOD_EVIDENCE);
  await expect(page.locator('main code')).toHaveCount(0);
});

test('no screen carries a call to action', async ({ page }) => {
  await page.goto('/');
  // EXPERIENCE_PRINCIPLES.md §3 refuses urgency and obligation.
  const body = (await page.locator('main').textContent()) ?? '';
  for (const phrase of ['Get started', 'Sign up', "Let's talk", 'Hire me', 'Contact me today']) {
    expect(body).not.toContain(phrase);
  }
});

test('every screen exits into the work', async ({ page }) => {
  await page.goto('/');
  // The page's job is to make someone open a case study, so each system screen
  // links to its own. A screen with no exit is a screen that ends the visit.
  for (const system of SYSTEMS) {
    await expect(page.locator(`main a[href="/work/${system.slug}"]`)).toHaveCount(1);
  }
});

/**
 * The single idea. These protect the two sentences that carry it, both of which
 * are cheap to soften and expensive to lose.
 */
test.describe('the one idea', () => {
  test('the page states what it is about, once, at the end', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main')).toContainText(CLOSING);
    // Once. Repeating it earlier would turn a conclusion into a slogan.
    const body = (await page.locator('main').textContent()) ?? '';
    expect(body.split('defined by what it refuses').length - 1).toBe(1);
  });

  test('the refusal that admits a failure is still there', async ({ page }) => {
    // The one line on this site that costs something to print. It survived the
    // cut from 1,914 words to 273 precisely because it is the most valuable
    // sentence here, and it is the most likely to be quietly tidied away later.
    const drift = REFUSALS.find((refusal) => refusal.id === 'drift');
    expect(drift).toBeDefined();

    // Asserted against the constant rather than a copy of its wording. The
    // sentence is edited from time to time; what must never change is that a
    // refusal admitting an uncaught failure is on the page at all.
    expect(drift?.what).toContain('drift');
    await page.goto('/');
    await expect(page.locator('main')).toContainText(drift!.line);
  });
});

/**
 * The hero footnote. It reports the reader's own visit; all of that must be
 * real, and none of it may cost layout.
 */
test.describe('page reading', () => {
  test('reports a live measurement of this visit', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/this page reached you in \d+ ms · /)).toBeVisible();
  });

  test('costs no layout shift, because it names its own', async ({ page }) => {
    await page.goto('/');
    // ARCHITECTURE.md §10 caps CLS at 0.05 for the route. This asserts the
    // stricter thing the sentence itself claims: the number arriving moves
    // nothing. A line that measured layout shift and caused it would be the
    // most embarrassing defect this site could ship.
    const shift = await page.evaluate(() =>
      (
        performance.getEntriesByType('layout-shift') as (PerformanceEntry & {
          value: number;
          hadRecentInput: boolean;
        })[]
      )
        .filter((entry) => !entry.hadRecentInput)
        .reduce((total, entry) => total + entry.value, 0),
    );
    expect(shift).toBe(0);
  });

  test('its absence costs the page nothing', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/');

    // ARCHITECTURE.md §2. The footnote simply does not appear; every word of
    // the page is in the HTML response either way.
    await expect(page.locator('h1')).toHaveText(THESIS);
    await expect(page.locator('main')).toContainText(CLOSING);
    await expect(page.getByText(/reached you in/)).toHaveCount(0);

    await context.close();
  });
});

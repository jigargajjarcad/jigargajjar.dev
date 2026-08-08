import { expect, test } from '@playwright/test';

import { ROUTES } from './routes';

/**
 * Every request a route makes must succeed — ADR-035.
 *
 * **Written after production shipped a 404, and it would not have caught that
 * 404. Both halves matter.**
 *
 * `/resume` linked the PDF through `next/link`, which prefetches its target as
 * an RSC payload. `/resume.pdf` is a file in `public/`, not a route, so on
 * Vercel the prefetch returned 404 on every single load of the page. Clicking
 * worked — the direct URL is a healthy 200 — so nothing that checked the
 * rendered page or followed links could see it.
 *
 * **It does not reproduce locally.** `next start` serves `/resume.pdf?_rsc=…`
 * from `public/` and returns 200, because the static handler ignores the query
 * string; on Vercel the RSC-headed request is routed to the server function
 * instead, which has no such route. This spec was run against the unfixed build
 * and passed. That was verified, not assumed, and it is recorded here so nobody
 * later reads this file as proof that the class of bug is covered.
 *
 * What it does cover is every failing request that *is* reproducible locally: a
 * missing asset, a broken image, a bad font path, a 404 favicon — which was a
 * real defect on this site once, holding Best Practices at 96 on all ten
 * routes. The suite had 123 checks and none of them watched the network at all,
 * so a page could render perfectly, pass axe, score 100 on Lighthouse, and
 * still fire a failing request on every visit.
 *
 * The gap this leaves — production-only routing behaviour — is closed by
 * sweeping the deployed site after a release, not from here.
 *
 * Redirects are not failures, so only 4xx and 5xx count.
 */
for (const route of ROUTES) {
  test(`no failed requests: ${route}`, async ({ page }) => {
    const failures: string[] = [];

    page.on('response', (response) => {
      // The document's own status is not this spec's business, and asserting on
      // it is wrong: `/does-not-exist` is in `ROUTES` precisely so the 404 page
      // is checked, and a 404 page that does not return 404 is the defect. The
      // first version of this file failed on that route, which is a test bug
      // rather than a site bug. `accessibility.spec.ts` already asserts every
      // route's structure; what is unwatched is the sub-resources.
      const request = response.request();
      if (request.isNavigationRequest() && request.frame() === page.mainFrame()) return;

      if (response.status() >= 400) {
        failures.push(`${response.status()} ${response.url()}`);
      }
    });
    page.on('requestfailed', (request) => {
      // `requestfailed` fires for aborted navigations too; only genuine network
      // failures carry an error text worth reporting.
      const failure = request.failure();
      if (failure) failures.push(`${failure.errorText} ${request.url()}`);
    });

    await page.goto(route, { waitUntil: 'networkidle' });
    // Prefetches are triggered by the router after paint, not during load, so
    // the assertion has to wait for them or it passes on a page that is about
    // to make a failing request.
    await page.waitForTimeout(1200);

    expect(failures).toEqual([]);
  });
}

import { expect, test } from '@playwright/test';

import { ROUTES } from './routes';

/** ARCHITECTURE.md §10 — zero third-party network requests. ADR-009. */
for (const route of ROUTES) {
  test(`no third-party requests: ${route}`, async ({ page, baseURL }) => {
    const origin = new URL(baseURL ?? 'http://localhost:3000').origin;
    const external: string[] = [];
    page.on('request', (req) => {
      const url = req.url();
      if (!url.startsWith(origin) && !url.startsWith('data:') && !url.startsWith('blob:')) {
        external.push(url);
      }
    });
    await page.goto(route, { waitUntil: 'networkidle' });
    expect(external).toEqual([]);
  });
}

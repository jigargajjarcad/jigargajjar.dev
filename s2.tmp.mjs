import { chromium } from '@playwright/test';
const OUT = process.argv[2];
const b = await chromium.launch();
const ctx = await b.newContext({
  viewport: { width: 1440, height: 900 },
  colorScheme: 'dark',
  deviceScaleFactor: 1,
});
const p = await ctx.newPage();
await p.goto('http://localhost:3000/work', { waitUntil: 'networkidle' });
await p.waitForTimeout(600);
const el = p.locator('main > div > div').last();
await p.evaluate(() => {
  const h = [...document.querySelectorAll('main h2')].find((x) => x.textContent === 'Methodology');
  h.scrollIntoView({ block: 'center' });
});
await p.waitForTimeout(300);
await p.screenshot({ path: `${OUT}/w-chapter.png` });
await b.close();

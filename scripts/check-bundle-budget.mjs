/**
 * Bundle budget (ARCHITECTURE.md §10). Gzipped, per route.
 *
 *   First-load JavaScript  <= 120 KB   (the scripts one route actually loads)
 *   Shared framework chunk <= 105 KB   RECORDED BASELINE, not a design budget.
 *                                     Measured floor at Next 15 + React 19 is
 *                                     100.3 KB. The ceiling catches framework
 *                                     upgrade regressions. ADR-015.
 *   CSS                    <=  20 KB
 *
 * Measured from Next's app build manifest, so "first load" means what a reader
 * downloads for that route — not the sum of every chunk in the output, which
 * over-counts by a factor of the route count.
 *
 * Raising a number requires an ADR. ARCHITECTURE.md §10: a treatment that
 * exceeds a budget line is redesigned or dropped, never optimised later.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';

const KB = 1024;
const BUDGET = { firstLoadJs: 120 * KB, sharedChunk: 105 * KB, css: 20 * KB };

if (!existsSync('.next/app-build-manifest.json')) {
  console.error('No build output. Run `npm run build` first.');
  process.exit(1);
}

const manifest = JSON.parse(readFileSync('.next/app-build-manifest.json', 'utf8'));
const gz = (file) => {
  const path = join('.next', file);
  return existsSync(path) ? gzipSync(readFileSync(path)).length : 0;
};

const routes = Object.entries(manifest.pages);
const jsOf = (files) => files.filter((f) => f.endsWith('.js'));

// Shared chunk: files present in every route's first load.
const shared = jsOf(routes[0][1])
  .filter(([,] = [], _i) => true)
  .filter((file) => routes.every(([, files]) => files.includes(file)));
const sharedBytes = shared.reduce((n, f) => n + gz(f), 0);

const perRoute = routes.map(([route, files]) => [
  route,
  jsOf(files).reduce((n, f) => n + gz(f), 0),
]);
const worst = perRoute.reduce((a, b) => (b[1] > a[1] ? b : a));

const cssBytes = (() => {
  const dir = '.next/static/css';
  if (!existsSync(dir)) return 0;
  return readdirSync(dir)
    .filter((f) => f.endsWith('.css'))
    .reduce((n, f) => n + gzipSync(readFileSync(join(dir, f))).length, 0);
})();

const fmt = (n) => `${(n / KB).toFixed(1)} KB`;
const checks = [
  [`First-load JavaScript (worst route: ${worst[0]})`, worst[1], BUDGET.firstLoadJs],
  ['Shared framework chunk', sharedBytes, BUDGET.sharedChunk],
  ['CSS', cssBytes, BUDGET.css],
];

let failed = false;
for (const [label, actual, budget] of checks) {
  const ok = actual <= budget;
  if (!ok) failed = true;
  const headroom = (((budget - actual) / budget) * 100).toFixed(0);
  console.log(
    `  ${ok ? 'PASS' : 'FAIL'}  ${label}: ${fmt(actual)} / ${fmt(budget)} (${headroom}% headroom)`,
  );
}

if (failed) {
  console.error('Bundle budget exceeded. ARCHITECTURE.md §10 — redesign or drop, do not raise.');
  process.exit(1);
}
console.log(`Bundle budget passed across ${routes.length} routes.`);

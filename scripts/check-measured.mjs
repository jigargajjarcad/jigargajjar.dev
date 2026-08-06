/**
 * Proves the numbers on the home page are still true — ADR-022.
 *
 * This is the gate that makes displaying measurements defensible. Without it,
 * `src/content/measured.json` is a file of claims that were true once, and a
 * portfolio asserting "109.5 KB against a 120 KB budget" months after that
 * stopped being the case is worse than one that says nothing.
 *
 * Everything derived from the build output is recomputed and compared exactly.
 * Lighthouse is exempt from recomputation — it needs a server, a browser, and
 * ninety seconds, and it runs in its own CI job (`npm run lhci`) which asserts
 * the same thresholds directly. What is checked here instead is that the
 * recorded Lighthouse figures are not older than the tolerance below, so a
 * stale score cannot sit on the page indefinitely.
 */
import { readFileSync } from 'node:fs';

import { measure } from './measure.mjs';

/** Lighthouse figures older than this stop being a measurement of this site. */
const LIGHTHOUSE_MAX_AGE_DAYS = 30;

const committed = JSON.parse(readFileSync('src/content/measured.json', 'utf8'));
const actual = await measure();

const failures = [];

/** Compares every leaf, reporting the full path so a diff is actionable. */
function compare(path, a, b) {
  if (a === null || b === null || typeof a !== 'object') {
    if (a !== b)
      failures.push(`${path}: committed ${JSON.stringify(a)}, actual ${JSON.stringify(b)}`);
    return;
  }
  for (const key of new Set([...Object.keys(a), ...Object.keys(b ?? {})])) {
    compare(`${path}.${key}`, a[key], b?.[key]);
  }
}

for (const section of ['bundle', 'gates', 'repository']) {
  compare(section, committed[section], actual[section]);
}

if (!committed.lighthouse) {
  failures.push('lighthouse: no figures recorded. Run `npm run lhci` then `npm run measure`.');
} else {
  const age = (Date.now() - Date.parse(committed.lighthouse.measuredAt)) / 86_400_000;
  if (age > LIGHTHOUSE_MAX_AGE_DAYS) {
    failures.push(
      `lighthouse.measuredAt: ${Math.round(age)} days old, ceiling is ${LIGHTHOUSE_MAX_AGE_DAYS}.` +
        ' Run `npm run lhci` then `npm run measure`.',
    );
  }
}

if (failures.length) {
  console.error(
    'Recorded measurements disagree with this build:\n' +
      failures.map((f) => `  ${f}`).join('\n') +
      '\n\nThe home page states these numbers. Run `npm run measure` and commit the result.',
  );
  process.exit(1);
}

console.log(
  `Measurements verified — ${actual.bundle.homeFirstLoadKb} KB first load, ` +
    `${actual.gates.unitTests + actual.gates.browserChecks} checks, ` +
    `lighthouse recorded ${committed.lighthouse.measuredAt}.`,
);

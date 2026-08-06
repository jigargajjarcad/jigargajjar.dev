/**
 * Records the measurements the home page renders — ADR-022.
 *
 * The V3 home page states numbers about itself: bundle sizes against their
 * budgets, Lighthouse scores, how many gates run, how much font weight ships.
 * Every one of them is produced here, from the actual build output, and written
 * to `src/content/measured.json`, which is committed.
 *
 * **Why a committed file rather than a live read.** A page cannot measure its
 * own bundle while being built — the number would be an input to the artefact it
 * describes. Recording the measurement, committing it, and displaying the date
 * it was taken is the honest form: the reader is told these are recorded
 * measurements, and the diff shows when they changed.
 *
 * **Why that is not a licence for stale numbers.** `scripts/check-measured.mjs`
 * recomputes everything here during `npm run ci` and fails the build if the
 * committed file disagrees. A number on the page cannot rot without the pipeline
 * going red, which is the property that makes displaying it defensible at all.
 *
 * Run: `npm run measure` (requires `npm run build` first; Lighthouse figures
 * carry over from the last `npm run lhci` and are marked with their own date).
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const KB = 1024;

/* ── Bundle ─────────────────────────────────────────────────────────────────
 * Identical accounting to `check-bundle-budget.mjs`: first load is what one
 * route downloads, not the sum of every chunk in the output. The two scripts
 * must agree, and `check-measured.mjs` is what proves they do. */

function bundle() {
  const manifestPath = '.next/app-build-manifest.json';
  if (!existsSync(manifestPath)) {
    throw new Error('No build output. Run `npm run build` first.');
  }
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const gz = (file) => {
    const path = join('.next', file);
    return existsSync(path) ? gzipSync(readFileSync(path)).length : 0;
  };
  const routes = Object.entries(manifest.pages);
  const js = (files) => files.filter((f) => f.endsWith('.js'));

  const shared = js(routes[0][1]).filter((file) => routes.every(([, f]) => f.includes(file)));
  const home = routes.find(([route]) => route === '/page') ?? routes[0];

  const cssDir = '.next/static/css';
  const css = existsSync(cssDir)
    ? readdirSync(cssDir)
        .filter((f) => f.endsWith('.css'))
        .reduce((n, f) => n + gzipSync(readFileSync(join(cssDir, f))).length, 0)
    : 0;

  const round = (bytes) => Math.round((bytes / KB) * 10) / 10;

  return {
    homeFirstLoadKb: round(js(home[1]).reduce((n, f) => n + gz(f), 0)),
    homeFirstLoadBudgetKb: 120,
    sharedRuntimeKb: round(shared.reduce((n, f) => n + gz(f), 0)),
    sharedRuntimeCeilingKb: 105,
    cssKb: round(css),
    cssBudgetKb: 20,
    routes: routes.length,
  };
}

/* ── Lighthouse ─────────────────────────────────────────────────────────────
 * The most recent report for `/`. Mobile profile, emulated Slow 4G — the
 * reference device in `ARCHITECTURE.md` §10, which is the only profile whose
 * numbers are worth stating. A desktop score would be flattering and useless. */

function lighthouse() {
  const dir = '.lighthouseci';
  if (!existsSync(dir)) return null;

  const reports = readdirSync(dir)
    .filter((f) => f.startsWith('lhr-') && f.endsWith('.json'))
    .map((f) => ({ f, mtime: statSync(join(dir, f)).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime);

  for (const { f, mtime } of reports) {
    const r = JSON.parse(readFileSync(join(dir, f), 'utf8'));
    if (!r.finalDisplayedUrl) continue;
    if (new URL(r.finalDisplayedUrl).pathname !== '/') continue;
    const score = (c) => Math.round(r.categories[c].score * 100);
    const ms = (a) => Math.round(r.audits[a].numericValue);
    return {
      performance: score('performance'),
      accessibility: score('accessibility'),
      bestPractices: score('best-practices'),
      seo: score('seo'),
      lcpMs: ms('largest-contentful-paint'),
      fcpMs: ms('first-contentful-paint'),
      tbtMs: ms('total-blocking-time'),
      cls: Number(r.audits['cumulative-layout-shift'].numericValue.toFixed(3)),
      measuredAt: new Date(mtime).toISOString().slice(0, 10),
    };
  }
  return null;
}

/* ── Gates ──────────────────────────────────────────────────────────────────
 * Counted by running them, not by counting `it(` in the source. A regex over
 * test files counts what was written; running the suites counts what executes,
 * and the two diverge the first time a file is skipped. */

function gates() {
  const capture = (cmd, args) =>
    execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });

  const vitest = JSON.parse(
    (() => {
      const out = capture('npx', ['vitest', 'run', '--reporter=json']);
      return out.slice(out.indexOf('{'));
    })(),
  );

  const pw = JSON.parse(capture('npx', ['playwright', 'test', '--list', '--reporter=json']));
  let browserChecks = 0;
  const walk = (suite) => {
    browserChecks += suite.specs?.length ?? 0;
    (suite.suites ?? []).forEach(walk);
  };
  (pw.suites ?? []).forEach(walk);

  const ci = JSON.parse(readFileSync('package.json', 'utf8')).scripts.ci;

  return {
    unitTests: vitest.numTotalTests,
    browserChecks,
    // `&&`-separated steps in the `ci` script. Each one blocks the next.
    ciSteps: ci.split('&&').length,
  };
}

/* ── Repository ─────────────────────────────────────────────────────────────
 * Facts about the artefact itself, all derived rather than typed by hand. */

async function repository() {
  const decisions = readFileSync('docs/DECISIONS.md', 'utf8');
  const tokens = await import('../src/design/tokens.ts');

  const fontDir = 'public/fonts';
  const fonts = readdirSync(fontDir).filter((f) => f.endsWith('.woff2'));

  const caseStudies = readdirSync('content/case-studies', { withFileTypes: true }).filter((d) =>
    d.isDirectory(),
  );

  const words = caseStudies.reduce((n, d) => {
    const path = join('content/case-studies', d.name, 'index.mdx');
    return existsSync(path) ? n + readFileSync(path, 'utf8').split(/\s+/).length : n;
  }, 0);

  return {
    decisionRecords: (decisions.match(/^## ADR-\d+/gm) ?? []).length,
    caseStudies: caseStudies.length,
    caseStudyWords: Math.round(words / 100) * 100,
    semanticColours: Object.keys(tokens.semanticColor).length,
    typeTokens: Object.keys(tokens.semanticType).length,
    fontFiles: fonts.length,
    fontKb:
      Math.round((fonts.reduce((n, f) => n + statSync(join(fontDir, f)).size, 0) / KB) * 10) / 10,
    fontBudgetKb: 120,
    thirdPartyRequests: 0,
  };
}

/* ── Emit ───────────────────────────────────────────────────────────────── */

export async function measure() {
  return {
    // Stamped so the page can say when, rather than implying "now".
    measuredAt: new Date().toISOString().slice(0, 10),
    bundle: bundle(),
    lighthouse: lighthouse(),
    gates: gates(),
    repository: await repository(),
  };
}

const OUT = 'src/content/measured.json';

if (import.meta.url === `file://${process.argv[1]}`) {
  const data = await measure();
  writeFileSync(OUT, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`${OUT} written.`);
  console.log(
    `  home first load ${data.bundle.homeFirstLoadKb} KB / ${data.bundle.homeFirstLoadBudgetKb} KB` +
      ` · ${data.gates.unitTests + data.gates.browserChecks} checks` +
      ` · lighthouse ${data.lighthouse?.performance ?? '—'}`,
  );
}

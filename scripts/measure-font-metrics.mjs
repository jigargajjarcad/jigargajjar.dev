/**
 * Font measurement — `ARCHITECTURE.md` §10, `TYPOGRAPHY.md` §5 and §12.
 *
 * Reports two things and asserts neither. This is a measurement instrument, not
 * a CI gate; whether the font budget becomes a gate is an open decision.
 *
 *   1. File inventory against §10 — "Fonts <= 120 KB total, <= 4 files".
 *   2. Fallback metric overrides, computed from the real font files.
 *
 * Why this exists. §8 requires `size-adjust` and metric overrides on the
 * fallback stack so that swapping from the fallback to the webfont produces no
 * measurable layout shift (§10, "zero layout shift from font loading"). Those
 * values are specific to the exact pairing of webfont and fallback, and
 * `TYPOGRAPHY.md` §12 warns that a face swap without recomputing them
 * reintroduces shift. They are therefore measured here rather than guessed, and
 * rerun whenever a font file changes.
 *
 * Method. The real woff2 is inlined as a data URI in headless Chromium and
 * measured against its fallback with the canvas text metrics API, at a large
 * font size so rounding is immaterial. Reading the metrics from the rendering
 * engine that will actually perform the swap is more faithful than parsing the
 * font tables and reimplementing the engine's own fallback arithmetic.
 *
 * Usage: npm run measure:fonts
 */
import { chromium } from '@playwright/test';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const FONT_DIR = 'public/fonts';
const KB = 1024;

/** §10 — the documented font budget. Reported against, never asserted here. */
const BUDGET = { totalBytes: 120 * KB, fileCount: 4 };

/**
 * The pairings that need overrides. `fallback` is the first real family in the
 * corresponding chain in `src/design/tokens.ts`, because that is the face the
 * reader actually sees before the swap.
 */
const PAIRINGS = [
  {
    file: 'inter-variable-roman.woff2',
    webfont: 'Inter Variable',
    fallback: 'system-ui',
    cssFamily: 'Inter Fallback',
  },
  {
    file: 'newsreader-variable-roman.woff2',
    webfont: 'Newsreader Variable',
    fallback: 'Georgia',
    cssFamily: 'Newsreader Fallback',
  },
];

/**
 * Mixed-case Latin with the punctuation TYPOGRAPHY.md §5 names, so the width
 * ratio reflects the glyphs the site actually sets rather than an alphabet.
 */
const SAMPLE =
  'Engineering is not measured by how quickly code is written — but by how ' +
  'confidently it can be verified. §1 "quoted" ‘single’ 0123456789';

/** Measured at 1000px so sub-pixel rounding cannot reach the reported decimals. */
const MEASURE_PX = 1000;

function fail(message) {
  console.error(`\n  ${message}\n`);
  process.exit(1);
}

function inventory() {
  if (!existsSync(FONT_DIR)) fail(`${FONT_DIR} does not exist.`);

  const files = readdirSync(FONT_DIR)
    .filter((name) => name.endsWith('.woff2'))
    .map((name) => ({ name, bytes: statSync(join(FONT_DIR, name)).size }))
    .sort((a, b) => b.bytes - a.bytes);

  if (files.length === 0) {
    fail(
      `No .woff2 files in ${FONT_DIR}.\n` +
        '  Expected: inter-variable-roman.woff2, inter-variable-italic.woff2,\n' +
        '            newsreader-variable-roman.woff2',
    );
  }

  const total = files.reduce((sum, f) => sum + f.bytes, 0);

  console.log('\nFont inventory — ARCHITECTURE.md §10\n');
  for (const f of files) {
    console.log(`  ${f.name.padEnd(36)} ${(f.bytes / KB).toFixed(1).padStart(7)} KB`);
  }

  const countState = files.length <= BUDGET.fileCount ? 'within' : 'OVER';
  const totalState = total <= BUDGET.totalBytes ? 'within' : 'OVER';
  console.log(`\n  Files  ${files.length} / ${BUDGET.fileCount}  (${countState} budget)`);
  console.log(
    `  Total  ${(total / KB).toFixed(1)} KB / ${BUDGET.totalBytes / KB} KB  (${totalState} budget)`,
  );

  if (totalState === 'OVER' || countState === 'OVER') {
    console.log(
      '\n  Over budget. TYPOGRAPHY.md §5 defines the reduction ladder, in order:\n' +
        '    1. Narrow the Inter weight axis to 400-600 exactly\n' +
        '    2. Drop the Newsreader `opsz` axis and select a fixed optical size\n' +
        '    3. Drop Inter Italic and set <em> in the display serif roman\n' +
        '  Raising the budget is not on the list (ADR-006).',
    );
  }

  return files;
}

/** Ascent, descent and sample width for one family, as ratios of the em. */
async function metricsFor(page, family) {
  return page.evaluate(
    async ({ family, sample, px }) => {
      await document.fonts.ready;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.font = `${px}px ${family}`;
      const m = ctx.measureText(sample);
      return {
        ascent: m.fontBoundingBoxAscent / px,
        descent: m.fontBoundingBoxDescent / px,
        width: m.width / px,
      };
    },
    { family, sample: SAMPLE, px: MEASURE_PX },
  );
}

const pct = (n) => `${(n * 100).toFixed(2)}%`;

async function main() {
  inventory();

  const browser = await chromium.launch();
  const page = await browser.newPage();
  const blocks = [];

  for (const pairing of PAIRINGS) {
    const path = join(FONT_DIR, pairing.file);
    if (!existsSync(path)) {
      console.log(`\n  Skipping ${pairing.webfont} — ${pairing.file} not present.`);
      continue;
    }

    const dataUri = `data:font/woff2;base64,${readFileSync(path).toString('base64')}`;
    await page.setContent(`<!doctype html><meta charset="utf-8"><style>
      @font-face {
        font-family: "${pairing.webfont}";
        src: url(${dataUri}) format('woff2');
        font-display: block;
      }
    </style>`);

    const web = await metricsFor(page, `"${pairing.webfont}"`);
    const fallback = await metricsFor(page, pairing.fallback);

    // size-adjust scales the *fallback* so its advance widths match the webfont;
    // the ascent and descent overrides are then expressed against that adjusted
    // em, which is why they are divided by the same ratio.
    const sizeAdjust = web.width / fallback.width;

    blocks.push(
      [
        `@font-face {`,
        `  font-family: '${pairing.cssFamily}';`,
        `  src: local('${pairing.fallback}');`,
        `  size-adjust: ${pct(sizeAdjust)};`,
        `  ascent-override: ${pct(web.ascent / sizeAdjust)};`,
        `  descent-override: ${pct(web.descent / sizeAdjust)};`,
        `  line-gap-override: 0%;`,
        `}`,
      ].join('\n'),
    );

    console.log(
      `\n  ${pairing.webfont} vs ${pairing.fallback} — ` +
        `width ratio ${sizeAdjust.toFixed(4)}, ` +
        `ascent ${web.ascent.toFixed(4)}, descent ${web.descent.toFixed(4)}`,
    );
  }

  await browser.close();

  if (blocks.length > 0) {
    console.log(
      '\n\nPaste into src/styles/globals.css, after the webfont @font-face blocks,\n' +
        'then point the fallback chains in src/design/tokens.ts at these families:\n',
    );
    console.log(blocks.join('\n\n'));
    console.log('');
  }
}

main().catch((error) => fail(error.message));

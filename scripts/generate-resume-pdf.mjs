/**
 * Résumé PDF generation — `wireframes/07-resume.md` §9, `ROUTE_SPECIFICATIONS.md` §3.
 *
 * "The PDF is generated from this route at build time. Two hand-maintained
 * résumés drift, and the failure is specific: a recruiter forwards a PDF
 * contradicting the site, and the hiring manager finds it."
 *
 * So this prints the real `/resume` route rather than composing a second
 * document. The page is the single source; the PDF is a rendering of it, and it
 * cannot say something the site does not.
 *
 * Chromium is already present as a Playwright dependency, so no new package is
 * added to produce it. Output is real selectable text with live link
 * annotations — not an image — which is what makes it parseable by an
 * applicant-tracking system.
 *
 * Print styling lives in `globals.css` and `tokens.css`: light theme forced,
 * site chrome suppressed, headings kept with their content, entries kept whole.
 *
 * Usage: npm run resume:pdf   (builds first; starts and stops its own server)
 */
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';

const URL = 'http://localhost:3000/resume';
const OUTPUT = 'public/resume.pdf';
const KB = 1024;

/** Chromium needs the served build; a `file://` load has no routing. */
function startServer() {
  const server = spawn('npm', ['run', 'start'], {
    stdio: 'ignore',
    detached: false,
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
  });
  return server;
}

async function waitForServer(timeoutMs = 45_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(URL, { method: 'HEAD' });
      if (response.ok) return;
    } catch {
      // not up yet
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  throw new Error(`Server did not answer ${URL} within ${timeoutMs / 1000}s.`);
}

async function main() {
  if (!existsSync('.next')) {
    throw new Error('No production build found. Run `npm run build` first.');
  }

  const server = startServer();
  let browser;

  try {
    await waitForServer();

    browser = await chromium.launch();
    const page = await browser.newPage();

    // Print emulation, so the `@media print` rules apply to the PDF exactly as
    // they would to paper rather than to the screen rendering.
    await page.emulateMedia({ media: 'print' });
    // `load`, not `networkidle`: the framework keeps connections open, so
    // network idle never arrives on a statically rendered page.
    await page.goto(URL, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);

    await page.pdf({
      path: OUTPUT,
      format: 'A4',
      printBackground: false,
      // §6 prefers two sides of A4 and accepts three. Margins are the first
      // lever before the page's own rhythm, which the screen shares: 12 mm
      // rather than 14 buys about 15 px of column per side and was what took
      // the expanded document from four pages back to three (ADR-032). Below
      // 12 mm a résumé starts to look like it is fighting the page.
      margin: { top: '12mm', right: '12mm', bottom: '12mm', left: '12mm' },
      // No header or footer template: page furniture is noise in a two-page
      // document and confuses ATS text extraction.
      displayHeaderFooter: false,
      preferCSSPageSize: false,
    });

    const bytes = statSync(OUTPUT).size;
    console.log(`\n  Wrote ${OUTPUT} — ${(bytes / KB).toFixed(1)} KB`);
    console.log('  Source: the /resume route. Regenerate whenever it changes.\n');
  } finally {
    await browser?.close();
    server.kill('SIGTERM');
  }
}

main().catch((error) => {
  console.error(`\n  ${error.message}\n`);
  process.exit(1);
});

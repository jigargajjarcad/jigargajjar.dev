/**
 * Token enforcement (TOKENS.md §7, ARCHITECTURE.md §3 rule 5).
 *   1. No hard-coded design values outside tokens.ts.
 *   2. src/styles/tokens.css is in sync with src/design/tokens.ts.
 *   3. No component reaches past the semantic layer to a primitive.
 */
import { readFileSync } from 'node:fs';
import { globSync } from 'node:fs';
import { tokensCss } from '../src/design/tokens.ts';

const failures = [];

const generated = tokensCss();
const committed = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
if (generated !== committed) {
  failures.push('src/styles/tokens.css is stale. Run `npm run tokens:generate`.');
}

const SOURCE = globSync('src/**/*.{ts,tsx,css}', { cwd: process.cwd() }).filter(
  (f) => !f.endsWith('src/design/tokens.ts') && !f.endsWith('src/styles/tokens.css'),
);

const HARDCODED = [
  { re: /#[0-9a-fA-F]{3,8}\b/, what: 'hex colour' },
  { re: /\b(?:rgb|rgba|hsl|hsla|oklch)\(/, what: 'colour function' },
  { re: /:\s*-?\d*\.?\d+(px|rem|em)\b/, what: 'literal dimension' },
  { re: /\b\d+ms\b/, what: 'literal duration' },
  { re: /cubic-bezier\(/, what: 'literal easing' },
  { re: /box-shadow/, what: 'shadow (COLOR_SYSTEM §6 — elevation is never a shadow)' },
];

for (const file of SOURCE) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (/^\s*(\/\*|\*|\/\/)/.test(line)) return;
    for (const { re, what } of HARDCODED) {
      if (re.test(line)) failures.push(`${file}:${i + 1} hard-coded ${what} — use a token`);
    }
    if (/var\(--(?:neutral|accent)-\d+\)/.test(line)) {
      failures.push(
        `${file}:${i + 1} references a primitive — components use semantic tokens only`,
      );
    }
  });
}

if (failures.length) {
  console.error('Token enforcement failed:\n' + failures.map((f) => `  ${f}`).join('\n'));
  process.exit(1);
}
console.log(`Token enforcement passed (${SOURCE.length} files).`);

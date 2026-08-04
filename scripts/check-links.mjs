/** Link validation (ARCHITECTURE.md §12, check 12) — internal markdown links. */
import { readFileSync, globSync, existsSync } from 'node:fs';
import { dirname, join, normalize } from 'node:path';

const failures = [];
for (const file of globSync('{docs/**/*.md,README.md}')) {
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      for (const [, , target] of line.matchAll(/\[([^\]]+)\]\(([^)#][^)]*)\)/g)) {
        if (/^https?:/.test(target)) continue;
        const resolved = normalize(join(dirname(file), target.split('#')[0]));
        if (!existsSync(resolved)) failures.push(`${file}:${i + 1} -> ${target}`);
      }
    });
}
if (failures.length) {
  console.error('Broken links:\n' + failures.map((f) => `  ${f}`).join('\n'));
  process.exit(1);
}
console.log('Link validation passed.');

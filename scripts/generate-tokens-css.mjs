/** Regenerates src/styles/tokens.css from src/design/tokens.ts. */
import { writeFileSync } from 'node:fs';
import { tokensCss } from '../src/design/tokens.ts';

writeFileSync(new URL('../src/styles/tokens.css', import.meta.url), tokensCss());
console.log('src/styles/tokens.css regenerated from src/design/tokens.ts');

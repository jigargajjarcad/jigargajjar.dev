/** The eight routes of ARCHITECTURE.md §4. */
export const ROUTES = [
  '/',
  '/work',
  '/about',
  '/workflow',
  '/resume',
  '/connect',
  '/work/jigargajjar-dev', // exercises the MDX pipeline end to end
  '/does-not-exist', // exercises not-found.tsx
] as const;

import { loadCaseStudySlugs } from '../../src/content/loader';

/**
 * Every route the quality gates run against: the eight routes of
 * `ARCHITECTURE.md` §4, plus one per published case study.
 *
 * Case-study routes are **derived, not listed**. A hardcoded list silently
 * excludes new content from all four gates — accessibility, keyboard,
 * progressive enhancement, and third-party requests — and the exclusion is
 * invisible, because the suite still passes. That is how `/work/orchestai` was
 * authored, built, and reviewed without any gate ever loading it.
 *
 * Drafts are absent because `generateStaticParams` excludes them
 * (`ARCHITECTURE.md` §6.3): a draft has no route, so a test against one would
 * fail on a 404 rather than on a defect. A case study comes under gate at the
 * moment its `visibility` flips to `published`, with no second edit required.
 */
export const ROUTES: readonly string[] = [
  '/',
  '/work',
  '/about',
  '/workflow',
  '/resume',
  '/connect',
  ...loadCaseStudySlugs().map((slug) => `/work/${slug}`),
  '/does-not-exist', // exercises not-found.tsx
];

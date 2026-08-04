import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

import matter from 'gray-matter';

import { caseStudyFrontmatterSchema } from './schema';
import type { CaseStudy } from './types';

/**
 * The content layer. `ARCHITECTURE.md` §3, rule 4: this is the only filesystem
 * reader in the application. No component reads from `content/` directly — one
 * boundary, one place to change, one place to test.
 *
 * §6.1 — case studies are MDX files at `content/case-studies/<slug>/index.mdx`.
 * §6.3 — a file that fails validation fails the build. There is no partial
 * render and no warning-level failure.
 */
export const CASE_STUDY_ROOT = 'content/case-studies';

export class ContentValidationError extends Error {
  constructor(directory: string, detail: string) {
    super(`Invalid case study "${directory}": ${detail}`);
    this.name = 'ContentValidationError';
  }
}

/** Parses and validates one directory. Throws rather than returning a partial. */
export function loadCaseStudy(root: string, directory: string): CaseStudy {
  const file = join(root, directory, 'index.mdx');
  if (!existsSync(file)) {
    throw new ContentValidationError(directory, 'missing index.mdx');
  }

  const { data, content } = matter(readFileSync(file, 'utf8'));
  const parsed = caseStudyFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    const detail = parsed.error.issues
      .map((issue) => `${issue.path.join('.') || '(root)'} — ${issue.message}`)
      .join('; ');
    throw new ContentValidationError(directory, detail);
  }

  // §6.3 — "Must match the directory name". A slug that disagrees with its
  // directory produces a URL that does not resolve to the file it names.
  if (parsed.data.slug !== directory) {
    throw new ContentValidationError(
      directory,
      `slug "${parsed.data.slug}" does not match its directory name`,
    );
  }

  return { frontmatter: parsed.data, body: content, directory };
}

/**
 * Every published case study, ordered by `order`.
 *
 * §6.3 — "Drafts are excluded from the build and from the sitemap." Ordering is
 * competency-driven and not chronological (ADR-012).
 */
export function loadCaseStudies(root: string = CASE_STUDY_ROOT): CaseStudy[] {
  if (!existsSync(root)) return [];

  const directories = readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const studies = directories
    .filter((directory) => existsSync(join(root, directory, 'index.mdx')))
    .map((directory) => loadCaseStudy(root, directory))
    .filter((study) => study.frontmatter.visibility === 'published');

  assertUniqueOrder(studies);
  return studies.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

/** Two studies sharing an `order` makes `/work` ordering non-deterministic. */
function assertUniqueOrder(studies: CaseStudy[]): void {
  const seen = new Map<number, string>();
  for (const study of studies) {
    const { order } = study.frontmatter;
    const existing = seen.get(order);
    if (existing !== undefined) {
      throw new ContentValidationError(
        study.directory,
        `order ${order} is already used by "${existing}"; ordering would be non-deterministic`,
      );
    }
    seen.set(order, study.directory);
  }
}

/** Slugs for `generateStaticParams`. Published only. */
export function loadCaseStudySlugs(root: string = CASE_STUDY_ROOT): string[] {
  return loadCaseStudies(root).map((study) => study.frontmatter.slug);
}

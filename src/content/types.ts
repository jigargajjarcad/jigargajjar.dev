import type { z } from 'zod';

import type { caseStudyFrontmatterSchema } from './schema';

/**
 * Types inferred from the schema. `ARCHITECTURE.md` §3, rule 7 and §6.3:
 * "Types are inferred from schemas, never declared in parallel. Two
 * definitions of the same shape drift, and the drift is discovered at
 * runtime."
 */
export type CaseStudyFrontmatter = z.infer<typeof caseStudyFrontmatterSchema>;

export type Competency = CaseStudyFrontmatter['competency'];
export type Lifecycle = CaseStudyFrontmatter['lifecycle'];
export type Disclosure = CaseStudyFrontmatter['disclosure'];
export type Visibility = CaseStudyFrontmatter['visibility'];

/** A validated case study: its frontmatter, its body, and where it came from. */
export interface CaseStudy {
  readonly frontmatter: CaseStudyFrontmatter;
  /** Raw MDX body. Compilation is phase 4 (`ARCHITECTURE.md` §14). */
  readonly body: string;
  /** Directory name under `content/case-studies/`. Must equal the slug. */
  readonly directory: string;
}

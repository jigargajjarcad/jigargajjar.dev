import { z } from 'zod';

/**
 * Case-study frontmatter contract — `docs/ARCHITECTURE.md` §6.3.
 *
 * "Frontmatter is validated by a Zod schema at build time. A file that fails
 * validation fails the build — there is no partial render and no
 * warning-level failure, because a malformed case study is worse than a
 * missing one."
 *
 * This module is the single source of truth for the shape. Types are inferred
 * from it (`types.ts`); there is no hand-written interface mirroring the table.
 */

/** §6.3 — enumerated so ADR-012 is enforced by the type system. */
export const COMPETENCIES = [
  'ai-product',
  'ai-infrastructure',
  'enterprise',
  'methodology',
] as const;

/** §6.3 — where the *project* stands. Rendered as a badge. */
export const LIFECYCLES = [
  'production',
  'released',
  'maintained',
  'experimental',
  'research',
  'prototype',
  'archived',
  'future',
] as const;

/** §6.3 — `restricted` triggers review against `FOUNDATION.md` §10. */
export const DISCLOSURES = ['public', 'restricted'] as const;

/** §6.3 — where the *document* stands. Deliberately distinct from lifecycle. */
export const VISIBILITIES = ['published', 'draft'] as const;

/** §7 — alt text is a schema requirement, not a convention. */
const coverSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1, 'Alt text is required. ARCHITECTURE.md §7 permits no image without it.'),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const caseStudyFrontmatterSchema = z
  .object({
    title: z.string().min(1),
    slug: z
      .string()
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Slug must be lowercase kebab-case; URLs are permanent.',
      ),
    competency: z.enum(COMPETENCIES),
    summary: z
      .string()
      .min(1)
      .max(
        180,
        'Summary is the layer-1 sentence and is capped at 180 characters so it stays scannable.',
      ),
    role: z.string().min(1),
    stack: z.array(z.string().min(1)).min(1),
    outcomes: z
      .array(z.string().min(1))
      .length(
        3,
        'Exactly three outcomes. Three forces prioritisation; four becomes a list nobody weights.',
      ),
    sourceUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    disclosure: z.enum(DISCLOSURES),
    lifecycle: z.enum(LIFECYCLES),
    order: z.number().int().nonnegative(),
    visibility: z.enum(VISIBILITIES),
    updated: z.iso.date('`updated` must be an ISO date (YYYY-MM-DD).'),
    cover: coverSchema,
  })
  .superRefine((value, ctx) => {
    // §6.3 — sourceUrl is "Required when `disclosure` is `public`". A public
    // case study without source is a claim the reader cannot check.
    if (value.disclosure === 'public' && !value.sourceUrl) {
      ctx.addIssue({
        code: 'custom',
        path: ['sourceUrl'],
        message: 'sourceUrl is required when disclosure is `public` (ARCHITECTURE.md §6.3).',
      });
    }
  });

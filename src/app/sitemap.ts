import type { MetadataRoute } from 'next';

import { loadCaseStudies } from '@/content/loader';
import { ORIGIN } from '@/content/site';

/** ARCHITECTURE.md §4 — the eight routes, less `/404`. */
const STATIC_ROUTES = ['', '/work', '/about', '/workflow', '/resume', '/connect'] as const;

/**
 * ARCHITECTURE.md §6.3 — "Drafts are excluded from the build and from the
 * sitemap." `loadCaseStudies` returns published studies only, so exclusion is a
 * property of the content layer rather than a filter repeated at each consumer.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.map((path) => ({ url: `${ORIGIN}${path}` })),
    ...loadCaseStudies().map((study) => ({
      url: `${ORIGIN}/work/${study.frontmatter.slug}`,
      lastModified: study.frontmatter.updated,
    })),
  ];
}

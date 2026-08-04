import { loadCaseStudySlugs } from '@/content/loader';

/**
 * ARCHITECTURE.md §2 — statically generated per case study. The content layer
 * is the only filesystem reader (§3, rule 4); this route asks it for slugs and
 * knows nothing about the filesystem itself.
 *
 * Rendering the nine-section document model is phase 4 of §14, together with
 * the MDX component map. This page currently proves the loader integration
 * only.
 */
export function generateStaticParams(): { slug: string }[] {
  return loadCaseStudySlugs().map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <h1>{slug}</h1>;
}

import { notFound } from 'next/navigation';

import { CASE_STUDY_ROOT, loadCaseStudies } from '@/content/loader';
import { CaseStudyBody } from '@/lib/mdx';

/**
 * ARCHITECTURE.md §14 phase 4 — case-study rendering through the MDX component
 * map. Statically generated per case study (§2); the content layer is the only
 * filesystem reader (§3, rule 4).
 *
 * The nine-section layout regions of COMPONENT_GUIDELINES.md §6 and their
 * visual treatment are not implemented here. Phase 4's deliverable is that a
 * validated case study renders as semantic HTML through the documented map.
 */
export function generateStaticParams(): { slug: string }[] {
  return loadCaseStudies().map((study) => ({ slug: study.frontmatter.slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = loadCaseStudies(CASE_STUDY_ROOT).find((item) => item.frontmatter.slug === slug);
  if (!study) notFound();

  const { frontmatter } = study;
  return (
    <article>
      <p>{frontmatter.competency}</p>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.lifecycle}</p>
      <p>{frontmatter.summary}</p>
      <dl>
        <dt>Role</dt>
        <dd>{frontmatter.role}</dd>
        <dt>Stack</dt>
        <dd>{frontmatter.stack.join(' · ')}</dd>
        <dt>Updated</dt>
        <dd>
          <time dateTime={frontmatter.updated}>{frontmatter.updated}</time>
        </dd>
      </dl>
      <ul>
        {frontmatter.outcomes.map((outcome) => (
          <li key={outcome}>{outcome}</li>
        ))}
      </ul>
      <CaseStudyBody source={study.body} />
    </article>
  );
}

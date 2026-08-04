import { notFound } from 'next/navigation';

import { Container } from '@/components/primitives/Container';
import { Link } from '@/components/primitives/Link';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';
import { loadCaseStudies } from '@/content/loader';
import { CaseStudyBody } from '@/lib/mdx';

/**
 * `/work/[slug]` — ARCHITECTURE.md §6.2, COMPONENT_GUIDELINES.md §6.
 *
 * Three regions: header (compact), body (reading), footer (default). Statically
 * generated per case study; the content layer is the only filesystem reader.
 *
 * This page must self-orient (EXPERIENCE_FLOW.md §2): the highest-value handoff
 * on the site lands here with no context, so the header is the layer-1 surface
 * for a cold arrival rather than a preamble for readers who scrolled the home
 * page.
 */
export function generateStaticParams(): { slug: string }[] {
  return loadCaseStudies().map((study) => ({ slug: study.frontmatter.slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = loadCaseStudies().find((item) => item.frontmatter.slug === slug);
  if (!study) notFound();

  const { frontmatter: f } = study;

  return (
    <Container width="wide">
      <article>
        <Stack gap={12}>
          {/* Header region — COMPONENT_GUIDELINES.md §6, density compact. */}
          <Stack gap={4}>
            <Text token="label" color="secondary" as="p" uppercase>
              {f.competency}
            </Text>
            <Text token="heading-1" as="h1">
              {f.title}
            </Text>
            <Text token="body-sm" color="secondary">
              {f.lifecycle}
            </Text>
            <Text token="lede">{f.summary}</Text>

            <dl>
              <dt>Role</dt>
              <dd>{f.role}</dd>
              <dt>Stack</dt>
              <dd>{f.stack.join(' · ')}</dd>
              <dt>Updated</dt>
              <dd>
                <time dateTime={f.updated}>{f.updated}</time>
              </dd>
            </dl>

            {/* INTERACTION.md §8 — where disclosure is restricted the link is
                absent, not disabled, and no badge appears in its place. The
                reason is stated in the case study's own prose (FOUNDATION §10). */}
            {f.sourceUrl ? (
              <Link href={f.sourceUrl} external>
                Source
              </Link>
            ) : null}
            {f.liveUrl ? (
              <Link href={f.liveUrl} external>
                Live site
              </Link>
            ) : null}

            <ul>
              {f.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </Stack>

          {/* Body region — the nine-section document model, rendered through the
              closed MDX component map (ARCHITECTURE.md §6.4). */}
          <div>
            <CaseStudyBody source={study.body} />
          </div>

          {/* Footer region. `ARCHITECTURE.md` §4 — no route is a dead end.
              The adjacent-case-study link is deliberately absent: adjacency is
              undefined in the documentation and is not guessed here. */}
          <Stack gap={4}>
            {f.sourceUrl ? (
              <Link href={f.sourceUrl} external>
                Source on GitHub
              </Link>
            ) : null}
            <Link href="/work">All case studies</Link>
          </Stack>
        </Stack>
      </article>
    </Container>
  );
}

import { Container } from '@/components/primitives/Container';
import { Link } from '@/components/primitives/Link';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';
import { loadCaseStudies } from '@/content/loader';
import type { CaseStudy } from '@/content/types';

/**
 * `/work` — ROUTE_SPECIFICATIONS.md §1.
 *
 * The comparison surface, not the primary path: homepage bands 3 and 4 link
 * directly into case studies, so a reader arriving here has chosen breadth over
 * depth.
 *
 * Section order per §1: page header, the flagship case studies ordered by
 * `order`, then the methodology case study set apart, then the footer.
 *
 * Built from documented primitives only. The Project card
 * (COMPONENT_GUIDELINES.md §4.1) is not implemented today; the listing carries
 * the same content in the same reading order without its visual treatment.
 */
const COMPETENCY_LABEL: Record<CaseStudy['frontmatter']['competency'], string> = {
  'ai-product': 'AI Product Engineering',
  // ADR-019 — the framework claim is withdrawn; the `competency` slug is unchanged.
  'ai-infrastructure': 'AI Infrastructure Engineering',
  enterprise: 'Enterprise Software Engineering',
  methodology: 'Engineering Methodology',
};

/** §4.1 — the whole entry is one link with one accessible name. */
function CaseStudyEntry({ study, level }: { study: CaseStudy; level: 'h2' | 'h3' }) {
  const { frontmatter: f } = study;
  return (
    <li>
      <Link href={`/work/${f.slug}`} variant="bare">
        <Stack gap={2}>
          {/* §4.1 — the competency label leads, so the page scans as distinct
              stories rather than as a list of projects (ADR-012). */}
          <Text token="label" color="secondary" as="span" uppercase>
            {COMPETENCY_LABEL[f.competency]}
          </Text>
          <Text token="heading-3" as={level}>
            {f.title}
          </Text>
          <Text token="body-sm" color="secondary" as="span">
            {f.lifecycle}
          </Text>
          <Text token="body" as="span">
            {f.summary}
          </Text>
          <Text token="body-sm" color="secondary" as="span">
            {f.stack.join(' · ')}
          </Text>
          <Text token="body-sm" as="span">
            Read the case study
          </Text>
        </Stack>
      </Link>
    </li>
  );
}

export default function WorkPage() {
  const studies = loadCaseStudies();
  const flagship = studies.filter((s) => s.frontmatter.competency !== 'methodology');
  const methodology = studies.filter((s) => s.frontmatter.competency === 'methodology');

  return (
    <Container width="wide">
      <Stack gap={12}>
        <Stack gap={4}>
          <Text token="heading-1" as="h1">
            Work
          </Text>
          <Text token="lede">
            Three projects, three different kinds of engineering. Plus this site, which is the
            fourth.
          </Text>
        </Stack>

        {flagship.length > 0 ? (
          <Stack gap={6} as="ul">
            {flagship.map((study) => (
              <CaseStudyEntry key={study.frontmatter.slug} study={study} level="h2" />
            ))}
          </Stack>
        ) : null}

        {methodology.length > 0 ? (
          <Stack gap={6}>
            <Text token="heading-2" as="h2">
              Methodology
            </Text>
            <Text token="body">
              The fourth case study is this site. Specification first, decisions recorded, gates
              before features.
            </Text>
            <Stack gap={6} as="ul">
              {methodology.map((study) => (
                <CaseStudyEntry key={study.frontmatter.slug} study={study} level="h3" />
              ))}
            </Stack>
          </Stack>
        ) : null}
      </Stack>
    </Container>
  );
}

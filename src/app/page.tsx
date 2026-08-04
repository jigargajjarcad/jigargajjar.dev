import { Container } from '@/components/primitives/Container';
import { Link } from '@/components/primitives/Link';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';
import { loadCaseStudies } from '@/content/loader';
import type { CaseStudy } from '@/content/types';

/**
 * `/` — implemented from `docs/wireframes/01-home.md`, which is the contract.
 * Narrative reasoning is `HOMEPAGE_NARRATIVE.md`; the band structure there is
 * frozen at six.
 *
 * Optimised for conviction, not navigation (§1). The page does not ask the
 * reader to choose; depth arrives at band 3 before any navigation is required.
 *
 * Density: `compact` for band 1, the layer-1 region above the fold; `default`
 * for bands 2–6 (`SPACING.md` §5).
 *
 * Bands 3 and 4 are content-driven. They render nothing until the flagship case
 * studies exist, which is Phase 6 of `ROADMAP.md`. The wireframe's `‹OWNER›`
 * slots are a wireframe convention and are not shipped as copy.
 */

/** `HOMEPAGE_NARRATIVE.md` §4 names the featured project explicitly. */
const FEATURED_SLUG = 'orchestai';

const COMPETENCY_LABEL: Record<CaseStudy['frontmatter']['competency'], string> = {
  'ai-product': 'AI Product Engineering',
  // ADR-019 — the framework claim is withdrawn; the `competency` slug is unchanged.
  'ai-infrastructure': 'AI Infrastructure Engineering',
  enterprise: 'Enterprise Software Engineering',
  methodology: 'Engineering Methodology',
};

export default function HomePage() {
  // `/work` houses the methodology study; it has no homepage band
  // (`ROUTE_SPECIFICATIONS.md` §1).
  const flagship = loadCaseStudies().filter((s) => s.frontmatter.competency !== 'methodology');
  const featured = flagship.find((s) => s.frontmatter.slug === FEATURED_SLUG) ?? flagship[0];
  const additional = flagship.filter((s) => s !== featured);

  return (
    <Container width="wide">
      <Stack gap={20}>
        {/* ── Band 1 · Hero ──────────────────────────────────────────────
            Produces: this is a specific person, not a category.
            Answers R1, R2, R3 and provides the R5 exit. Present without
            scroll at 375 px; nothing here animates (`MOTION.md` §5). */}
        <Stack gap={6}>
          <Text token="heading-1" as="h1">
            Senior Full-Stack Engineer building production systems through an AI-native engineering
            workflow — architecting, directing, and verifying while AI agents implement.
          </Text>
          <Text token="body" color="secondary">
            .NET · TypeScript · React · PostgreSQL · MCP
          </Text>
          <Stack gap={2}>
            <Link href="/work">Read the work</Link>
            <Link href="/resume">Résumé</Link>
          </Stack>
        </Stack>

        {/* ── Band 2 · Qualification ─────────────────────────────────────
            Produces: the claim is a position, not a shortcut. The only band
            that removes a belief rather than creating one, and the reason it
            precedes the evidence (`FOUNDATION.md` §3, goal 4). It states a
            position and does not link away. */}
        <Stack gap={6}>
          <Text token="heading-2" as="h2">
            What I actually do
          </Text>
          <Text token="body">
            Agents write the implementation. I decide what gets built, how it is structured, and how
            anyone knows it is correct.
          </Text>
          <Text token="body">
            Architecture, decomposition, verification, and the decisions in between are not
            delegated. They are the part that is scarce.
          </Text>
          {/* Band 2's closing statement, set in the display face. Not the Pull
              quote component — §8.2 forbids a pull quote introducing new
              content, and this sentence appears nowhere else on the page. */}
          <Text token="heading-3" as="p">
            Engineering is not measured by how quickly code is written, but by how confidently it
            can be verified.
          </Text>
        </Stack>

        {/* ── Band 3 · Featured flagship ─────────────────────────────────
            Produces: I have seen this person solve something hard, and I did
            not have to go looking for it. A taste of the case study, never a
            compression of it — a reader who feels they have read it will not
            open it. One exit only: the case study. */}
        {featured ? (
          <Stack gap={6}>
            <Text token="label" color="secondary" as="p" uppercase>
              {COMPETENCY_LABEL[featured.frontmatter.competency]}
            </Text>
            <Text token="heading-2" as="h2">
              {featured.frontmatter.title}
            </Text>
            <Text token="body-sm" color="secondary">
              {featured.frontmatter.lifecycle}
            </Text>
            <Text token="body">{featured.frontmatter.summary}</Text>
            <Link href={`/work/${featured.frontmatter.slug}`}>Read the full case study</Link>
          </Stack>
        ) : null}

        {/* ── Band 4 · Additional projects ───────────────────────────────
            Produces: three genuinely different competencies. Deliberately
            lighter than band 3 — equal weight would recreate the menu that
            featuring exists to avoid. Presented as competency stories with a
            project attached, not as cards. */}
        {additional.length > 0 ? (
          <Stack gap={6}>
            <Text token="heading-2" as="h2">
              Two more, of a different kind
            </Text>
            <Stack gap={6} as="ul">
              {additional.map((study) => (
                <li key={study.frontmatter.slug}>
                  <Stack gap={2}>
                    <Text token="label" color="secondary" as="span" uppercase>
                      {COMPETENCY_LABEL[study.frontmatter.competency]}
                    </Text>
                    <Text token="heading-3" as="h3">
                      <Link href={`/work/${study.frontmatter.slug}`} variant="bare">
                        {study.frontmatter.title}
                      </Link>
                    </Text>
                    <Text token="body" as="span">
                      {study.frontmatter.summary}
                    </Text>
                  </Stack>
                </li>
              ))}
            </Stack>
            <Link href="/work">Compare all four case studies</Link>
          </Stack>
        ) : null}

        {/* ── Band 5 · Workflow ──────────────────────────────────────────
            Produces: the method is documented, not asserted. Placed after the
            work, because a method claim is credible in proportion to the
            evidence already in hand. */}
        <Stack gap={6}>
          <Text token="heading-2" as="h2">
            How the work gets made
          </Text>
          <Text token="body">
            Problem, architecture, decision records, planning, implementation, verification, review,
            release, retrospective. Where it breaks down is documented too.
          </Text>
          <Link href="/workflow">Read the workflow</Link>
        </Stack>

        {/* ── Band 6 · Connect ───────────────────────────────────────────
            Produces: I know what to do if I want to act. A distinct band, not
            merged into the footer. No call to action —
            `EXPERIENCE_PRINCIPLES.md` §3 refuses urgency and obligation. */}
        <Stack gap={6}>
          <Text token="heading-2" as="h2">
            Work with me
          </Text>
          <Text token="body">
            Currently open to senior engineering roles and collaboration on AI infrastructure.
          </Text>
          <Link href="/connect">What to bring, and what to expect back</Link>
        </Stack>
      </Stack>
    </Container>
  );
}

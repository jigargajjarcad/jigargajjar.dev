import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { pageMetadata } from '@/app/metadata';

import { Container } from '@/components/primitives/Container';
import { Icon, type IconName } from '@/components/primitives/Icon';
import { Link } from '@/components/primitives/Link';
import { Prose } from '@/components/primitives/Prose';
import { Text } from '@/components/primitives/Text';
import { CASE_STUDY_ROOT, loadCaseStudies, nextCaseStudy } from '@/content/loader';
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
 *
 * **Laid out by ADR-033, which is mostly implementation of contract rather than
 * design.** Before it: the body rendered at `wide`, so 8,747 words set at 90
 * characters against `TYPOGRAPHY.md` §5's cap of 68; `TYPOGRAPHY.md` §4's
 * vertical rhythm existed nowhere, so every paragraph gap and every space around
 * all thirty-two chapter headings measured 0 px; the competency printed its raw
 * slug, `ai-infrastructure`; the metadata list was an unstyled `<dl>`; and the
 * header spaced its label, title, lifecycle, lede and metadata at a uniform
 * 16 px, which is not a hierarchy.
 */

/** The labels `/work` uses, so a study and its listing cannot disagree. */
const COMPETENCY_LABEL: Record<string, string> = {
  'ai-product': 'AI Product Engineering',
  'ai-infrastructure': 'AI Infrastructure Engineering',
  enterprise: 'Enterprise Software Engineering',
  methodology: 'Engineering Methodology',
};

/**
 * A project's destinations as marks — the row `ICONOGRAPHY.md` §6 carries, in the
 * treatment ADR-031 settled and `/connect` and `/resume` already use.
 *
 * §6's closed list gains no sixth entry: its "profile mark row" is generalised
 * to a mark row, because a repository and a deployment are the same kind of
 * thing as a profile — a destination the page names rather than describes. Each
 * mark keeps a visually-hidden label, so the accessible name is a word.
 */
function ProjectMarks({ sourceUrl, liveUrl }: { sourceUrl?: string; liveUrl?: string }) {
  const marks: { href: string; label: string; icon: IconName }[] = [];
  if (sourceUrl) marks.push({ href: sourceUrl, label: 'Source on GitHub', icon: 'github' });
  if (liveUrl) marks.push({ href: liveUrl, label: 'Live deployment', icon: 'globe' });
  if (marks.length === 0) return null;

  return (
    <ul aria-label="Project links" className="-ml-3 flex list-none items-center gap-1">
      {marks.map((mark) => (
        <li key={mark.href}>
          <a
            href={mark.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-target-min min-w-target-min items-center justify-center rounded-sm text-color-text-accent transition-colors duration-fast ease-standard hover:text-color-interactive-hover active:text-color-interactive-pressed"
          >
            <Icon name={mark.icon} size="md" />
            <span className="sr-only">{mark.label} (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
export function generateStaticParams(): { slug: string }[] {
  return loadCaseStudies().map((study) => ({ slug: study.frontmatter.slug }));
}

/**
 * Title and description come from frontmatter rather than being written twice.
 * `summary` is already the layer-1 sentence, capped at 180 characters so it
 * stays scannable (`ARCHITECTURE.md` §6.3) — which is exactly what a search
 * result and a shared link need.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = loadCaseStudies().find((item) => item.frontmatter.slug === slug);
  if (!study) return {};

  const { title, summary } = study.frontmatter;
  const base = pageMetadata({
    title,
    description: summary,
    path: `/work/${slug}`,
    type: 'article',
  });

  // The methodology study is named after the site, so the root template would
  // render "jigargajjar.dev · jigargajjar.dev". An absolute title says what the
  // page is instead of saying the name twice.
  return title === 'jigargajjar.dev'
    ? { ...base, title: { absolute: `${title} — the methodology case study` } }
    : base;
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = loadCaseStudies().find((item) => item.frontmatter.slug === slug);
  if (!study) notFound();

  const { frontmatter: f } = study;
  const next = nextCaseStudy(CASE_STUDY_ROOT, slug);

  return (
    <Container width="wide">
      {/* `pt-section-md` is the opening measure every other route uses, and
          `SPACING.md` §5 puts a case-study body at `reading` density, whose
          section rhythm is `lg` — that is the gap between the three regions. */}
      <article className="pb-section-md pt-section-md">
        {/* ── Header ─────────────────────────────────────────────────────
            The hierarchy the home page's project screens use: a mono label, the
            title, then the sentence. Spacing is grouped rather than uniform —
            4 px binds the title to its lifecycle, 24 px opens the lede, 40 px
            separates the metadata block — because a single 16 px gap between
            five different kinds of thing states that they are peers. */}
        {/* A `div`, not a `<header>`. Inside `<article>` the element is valid
            HTML and carries no banner role, but `tests/quality/accessibility.spec.ts`
            counts `header` *elements* to prove there is exactly one page header,
            and four routes failed that check. ADR-029 hit this on `/workflow` and
            settled the direction: fix the page, not the assertion. */}
        <div className="max-w-prose">
          <div className="flex flex-col gap-4">
            <Text token="mono" color="tertiary" as="p" uppercase>
              {COMPETENCY_LABEL[f.competency] ?? f.competency}
            </Text>
            <div className="flex flex-col gap-1">
              <Text token="heading-1" as="h1">
                {f.title}
              </Text>
              <Text token="mono" color="tertiary" as="p">
                {f.lifecycle}
              </Text>
            </div>
            <Text token="lede" color="secondary">
              {f.summary}
            </Text>
          </div>

          {/* Role, stack and date as a labelled grid — the same 288 px metadata
              column and mono uppercase field labels `/resume` and `/connect`
              use, so a reader crossing from either recognises the pattern. It
              was a bare `<dl>`: `dd` has no default indent once the reset
              removes its margin, so term and definition ran together. */}
          <dl className="mt-10 grid grid-cols-1 gap-y-3 sm:grid-cols-[6rem_1fr] sm:items-baseline sm:gap-x-6">
            <dt>
              <Text token="mono" color="tertiary" as="span" uppercase>
                Role
              </Text>
            </dt>
            <dd className="m-0">
              <Text token="body" as="span">
                {f.role}
              </Text>
            </dd>
            <dt>
              <Text token="mono" color="tertiary" as="span" uppercase>
                Stack
              </Text>
            </dt>
            <dd className="m-0">
              <Text token="body" as="span">
                {f.stack.join(' · ')}
              </Text>
            </dd>
            <dt>
              <Text token="mono" color="tertiary" as="span" uppercase>
                Updated
              </Text>
            </dt>
            <dd className="m-0">
              <Text token="body" as="span">
                <time dateTime={f.updated}>{f.updated}</time>
              </Text>
            </dd>
          </dl>

          {/* INTERACTION.md §8 — where disclosure is restricted the link is
              absent, not disabled, and no badge appears in its place. The
              reason is stated in the case study's own prose (FOUNDATION §10). */}
          <div className="mt-6">
            <ProjectMarks sourceUrl={f.sourceUrl} liveUrl={f.liveUrl} />
          </div>

          {/* What the project actually achieved, ahead of the argument for it.
              A reader who stops here has still read the outcomes. */}
          {f.outcomes.length > 0 ? (
            <div className="mt-10 border-t-hairline border-color-border-subtle pt-10">
              <Text token="mono" color="tertiary" as="p" uppercase>
                Outcomes
              </Text>
              <ul className="mt-6 flex list-outside list-disc flex-col gap-3 pl-5">
                {f.outcomes.map((outcome) => (
                  <li key={outcome}>
                    <Text token="body" as="span">
                      {outcome}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Body region — the nine-section document model, rendered through the
            closed MDX component map (ARCHITECTURE.md §6.4), inside the reading
            column it was always specified to use. */}
        <div className="mt-section-lg">
          <Prose>
            <CaseStudyBody source={study.body} />
          </Prose>
        </div>

        {/* Footer region. `ARCHITECTURE.md` §4 — no route is a dead end.
            ADR-016: one forward link, cycling by `order`, no previous. It is
            absent while only one study is published, because linking a study
            to itself is not a next action. The link carries the destination
            title so its accessible name is unique — a bare "Next" is the
            classic unusable link in a screen-reader link list.

            A hairline marks this boundary. `SPACING.md` §4 makes space the
            default and the rule the exception "where the space alone is
            ambiguous", and the end of an eight-thousand-word document is
            exactly that: after thirty-two chapters, one more gap does not read
            as "the document has ended". */}
        <div className="mt-section-lg max-w-prose border-t-hairline border-color-border-subtle pt-section-md">
          <div className="flex flex-col gap-6">
            {next ? (
              <div>
                <Text token="mono" color="tertiary" as="p" uppercase>
                  Next case study
                </Text>
                <div className="mt-2">
                  <Link href={`/work/${next.frontmatter.slug}`} variant="action">
                    {next.frontmatter.title}
                  </Link>
                </div>
              </div>
            ) : null}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link href="/work">All case studies</Link>
            </div>
          </div>
        </div>
      </article>
    </Container>
  );
}

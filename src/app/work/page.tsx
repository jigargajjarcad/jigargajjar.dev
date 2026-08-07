import type { Metadata } from 'next';

import { Container } from '@/components/primitives/Container';
import { Link } from '@/components/primitives/Link';
import { Text } from '@/components/primitives/Text';
import { loadCaseStudies } from '@/content/loader';
import type { CaseStudy } from '@/content/types';
import { pageMetadata } from '@/app/metadata';

/**
 * `/work` — `ROUTE_SPECIFICATIONS.md` §1, wireframe `02-work.md`, ADR-028.
 *
 * The comparison surface, not the primary path: the home page links directly
 * into two case studies, so a reader arriving here has chosen breadth over
 * depth. Section order is §1's: page header, the flagship studies ordered by
 * `order`, then the methodology study set apart, then the footer.
 *
 * **The layout is Home V4's, and the card treatment in COMPONENT_GUIDELINES
 * §4.1 is withdrawn** (ADR-028). §4.1 specifies a raised surface, a 1 px
 * border, a two-column grid and a 2 px hover lift; that was written in Phase 3,
 * before the home page settled into an editorial language with no cards, no
 * borders around content, and no decorative motion. Two documents already
 * pointed this way: `SPACING.md` §4 — *"section boundaries are marked by space,
 * not by rules"* — and `VISUAL_LANGUAGE.md` §2.1, which reserves the hairline
 * for structure that space cannot express. At `section-md` between entries,
 * space is not ambiguous.
 *
 * **What §4.1 keeps is everything that was not visual.** The whole entry is one
 * link with one accessible name; the competency label leads, because ADR-012
 * requires the competency thesis to be legible at a glance; there is no cover
 * image; and content determines height.
 *
 * **All four entries render identically** (§1: "a reader who came to compare
 * needs comparable presentation"). The methodology study is separated by a
 * heading, not demoted — it takes the same type sizes and differs only in
 * heading level, which `ACCESSIBILITY.md` §8 permits because level is a
 * structural claim and size is not.
 */

const COMPETENCY_LABEL: Record<CaseStudy['frontmatter']['competency'], string> = {
  'ai-product': 'AI Product Engineering',
  // ADR-019 — the framework claim is withdrawn; the `competency` slug is unchanged.
  'ai-infrastructure': 'AI Infrastructure Engineering',
  enterprise: 'Enterprise Software Engineering',
  methodology: 'Engineering Methodology',
};

/**
 * One entry, in the home page's two-column editorial rhythm: identity on the
 * left, substance on the right. DOM order is the reading order §1 specifies —
 * competency, title, status, summary, stack, continue — and below `lg` the
 * columns stack into exactly that sequence.
 *
 * Hover changes the title's colour and nothing else. §4.1 also specified a 2 px
 * lift; ADR-028 drops it, and the colour change it specified alongside is the
 * part that survives.
 */
function CaseStudyEntry({ study, level }: { study: CaseStudy; level: 'h2' | 'h3' }) {
  const { frontmatter: f } = study;
  const Heading = level;
  return (
    <li>
      <Link href={`/work/${f.slug}`} variant="bare">
        <article className="group flex flex-col gap-5">
          {/*
            The competency label spans both columns rather than sitting inside
            the left one. Nested, it pushed the title thirty-six pixels down
            while the right column started immediately, so the eye reached the
            description before the project name — the exact inversion of the
            reading order §1 specifies. Spanning, it reads as what it is: a
            section label over a two-column block.
          */}
          <Text token="mono" as="span" color="tertiary" uppercase>
            {COMPETENCY_LABEL[f.competency]}
          </Text>

          {/* `items-baseline` puts the title and the summary's first line on the
              same baseline. Top-aligned, a 35 px serif and a 22.5 px sans start
              at different optical heights and the two columns read as slipped. */}
          <div className="grid gap-6 lg:grid-cols-12 lg:items-baseline lg:gap-16">
            <div className="flex flex-col gap-1 lg:col-span-4">
              {/* Raw element rather than `Text`, which owns its own colour and
                  cannot be overridden at the call site. This is the one piece of
                  §4.1's hover treatment that survives ADR-028 — the title moves
                  to `--color-interactive` while the entry is hovered, so the
                  whole block reads as a target without lifting or bordering. */}
              <Heading className="font-display text-type-heading-2 text-color-text-primary transition-colors duration-fast ease-standard group-hover:text-color-interactive">
                {f.title}
              </Heading>
              <Text token="mono" as="span" color="tertiary">
                {f.lifecycle}
              </Text>
            </div>

            {/*
              Two values, both taken from the home page's project screen rather
              than chosen: 20 px inside the content group, 40 px before the
              action. At a uniform 24 px the stack read as a third peer of the
              description and the CTA read as a fourth, so the eye reached the
              action before it had finished reading.
            */}
            <div className="flex flex-col gap-10 lg:col-span-8">
              <div className="flex flex-col gap-5">
                {/* `SPACING.md` §6 — all body copy sits in the measure column.
                    The summary previously ran the full 1120 px container, at
                    roughly twice `TYPOGRAPHY.md` §5's 68-character cap. */}
                <div className="max-w-prose">
                  <Text token="lede" as="span" color="secondary">
                    {f.summary}
                  </Text>
                </div>
                <Text token="mono" as="span" color="tertiary">
                  {f.stack.join(' · ')}
                </Text>
              </div>
              {/* Not a nested link — the entry already is one, and a second
                  focusable control inside it is exactly the "link list full of
                  Read more" that INTERACTION.md §11 rules out. It carries the
                  home page's action-link wording and glyph so the affordance
                  reads the same, without pretending to be a separate target. */}
              <span className="flex items-center gap-2 text-color-text-primary">
                <Text token="label" as="span">
                  Read the case study
                </Text>
                <span aria-hidden="true">&rarr;</span>
              </span>
            </div>
          </div>
        </article>
      </Link>
    </li>
  );
}

export const metadata: Metadata = pageMetadata({
  title: 'Work',
  description:
    'Four case studies, one per competency: AI infrastructure, AI product engineering, ' +
    'enterprise engineering, and the methodology behind this site.',
  path: '/work',
});

export default function WorkPage() {
  const studies = loadCaseStudies();
  const flagship = studies.filter((s) => s.frontmatter.competency !== 'methodology');
  const methodology = studies.filter((s) => s.frontmatter.competency === 'methodology');

  return (
    <Container width="wide">
      {/* `SPACING.md` §4 and §5 — `/work` is `default` density, so the section
          rhythm is `md`, with `lg` reserved for the two major boundaries: page
          header to content, and the flagship set to the methodology chapter.
          The page opened flush against the header before ADR-028; `pt-section-md`
          is the home page's own opening measure. */}
      <div className="pb-section-md pt-section-md">
        <div className="flex max-w-prose flex-col gap-6">
          <Text token="heading-1" as="h1">
            Work
          </Text>
          {/* States the plan without claiming a count of published studies —
              ADR-012 fixes the three competencies, but how many are written is
              a fact the listing below already carries. */}
          <Text token="lede" color="secondary">
            Three kinds of engineering, one project each, plus this site — which documents how the
            work gets made. What is published so far is below.
          </Text>
        </div>

        {flagship.length > 0 ? (
          <ul className="mt-section-lg flex flex-col gap-section-md">
            {flagship.map((study) => (
              <CaseStudyEntry key={study.frontmatter.slug} study={study} level="h2" />
            ))}
          </ul>
        ) : null}

        {/*
          The chapter boundary, set exactly as `layout/Screen` sets one on the
          home page: `section-lg` above the rule, `section-lg` below it.

          Space alone was not enough, and `SPACING.md` §4 anticipates precisely
          this — a hairline appears "where the space alone is ambiguous". At
          `section-lg` against `section-md` between entries the ratio is only
          1.5×, and the two-column layout leaves a ragged bottom edge that
          shrinks the perceived difference further, so the largest token on the
          scale still read as "another project" rather than as "a different kind
          of thing". `VISUAL_LANGUAGE.md` §2.1 makes the rule the primary
          structural element, and this is the same rule the home page draws
          between every one of its screens — it makes the two pages more alike,
          not less.
        */}
        {methodology.length > 0 ? (
          <div className="mt-section-lg border-t-hairline border-color-border-subtle pt-section-lg">
            {/* Same internal spacing as the page header above: both are a
                heading introducing a lede, so both are set the same way. */}
            <div className="flex max-w-prose flex-col gap-6">
              <Text token="heading-2" as="h2">
                Methodology
              </Text>
              <Text token="lede" color="secondary">
                This site is its own case study. Specification first, decisions recorded, gates
                before features.
              </Text>
            </div>
            <ul className="mt-section-sm flex flex-col gap-section-md">
              {methodology.map((study) => (
                <CaseStudyEntry key={study.frontmatter.slug} study={study} level="h3" />
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Container>
  );
}

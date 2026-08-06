import type { Metadata } from 'next';

import { Band } from '@/components/layout/Band';
import { Reveal } from '@/components/motion/Reveal';
import { Link } from '@/components/primitives/Link';
import { Text } from '@/components/primitives/Text';
import { Hero } from '@/components/sections/Hero';
import { ArchitectureExplorer } from '@/components/system/ArchitectureExplorer';
import { LifecycleRail } from '@/components/system/LifecycleRail';
import { PipelineFlow } from '@/components/system/PipelineFlow';
import { loadCaseStudies } from '@/content/loader';
import { PHILOSOPHY } from '@/content/home';
import { AVAILABILITY, NAME, POSITIONING, contact } from '@/content/site';
import type { CaseStudy } from '@/content/types';
import { pageMetadata } from '@/app/metadata';

/**
 * `/` — Version 2. Specified in `docs/wireframes/01-home.md`, decided in
 * ADR-020, and it replaces the six-band document that preceded it.
 *
 * **What changed, and why.** V1 was correct and unmemorable. It answered the
 * reader's objections in the right order and it answered every one of them in
 * prose, so a visitor's experience was reading six paragraphs that made claims
 * about engineering. This page makes the same claims by *being* the thing it
 * describes: the argument for "I design systems" is a system the reader can walk
 * through, and the argument for "verification is the scarce part" is a lifecycle
 * where implementation is stage four of seven.
 *
 * **The objection sequence survived the redesign.** `FOUNDATION.md` §3 goal 4
 * requires the workflow objection — *agents wrote this, so what did you do* — to
 * be answered before the evidence, because an unresolved objection discounts
 * everything after it. Band 2 still holds that position. What changed is that it
 * is now answered by structure rather than by assertion.
 *
 * **Band 5 is new and deliberately slim.** The brief for this page names six
 * sections; the site has four case studies, and two of them appear in no other
 * band. A low-weight index is the smallest thing that stops them from silently
 * disappearing, and it is kept visually quiet so it cannot compete with bands 3
 * and 4 — equal weight would recreate the menu that featuring exists to avoid.
 *
 * **Motion.** Band 1 carries no entrance reveal (`MOTION.md` §5, above the
 * fold). Bands 2–7 do. The ambient flow inside the diagrams is a separate system
 * governed by ADR-021 and is not an entrance animation.
 */

/** `HOMEPAGE_NARRATIVE.md` §4 names the featured project explicitly. */
const FEATURED_SLUG = 'orchestai';
const PIPELINE_SLUG = 'novamind-ai';

const COMPETENCY_LABEL: Record<CaseStudy['frontmatter']['competency'], string> = {
  'ai-product': 'AI Product Engineering',
  // ADR-019 — the framework claim is withdrawn; the `competency` slug is unchanged.
  'ai-infrastructure': 'AI Infrastructure Engineering',
  enterprise: 'Enterprise Software Engineering',
  methodology: 'Engineering Methodology',
};

/**
 * §3 — the home page sets an absolute title rather than using the template,
 * because "jigargajjar.dev · jigargajjar.dev" is what the template would
 * otherwise produce here.
 */
export const metadata: Metadata = {
  ...pageMetadata({ title: NAME, description: POSITIONING, path: '' }),
  title: { absolute: `${NAME} — AI-Native Full-Stack Engineer` },
};

export default function HomePage() {
  // `/work` houses the methodology study; it has no homepage band
  // (`ROUTE_SPECIFICATIONS.md` §1).
  const flagship = loadCaseStudies().filter((s) => s.frontmatter.competency !== 'methodology');
  const featured = flagship.find((s) => s.frontmatter.slug === FEATURED_SLUG);
  const pipeline = flagship.find((s) => s.frontmatter.slug === PIPELINE_SLUG);
  // Whatever is left after the two bands that name a project explicitly. Derived
  // rather than listed, so a new case study appears here without an edit.
  const remaining = flagship.filter((s) => s !== featured && s !== pipeline);

  return (
    <>
      <Hero />

      {/* ── Band 2 · The lifecycle ─────────────────────────────────────────
          Produces: this person designs the process, and implementation is one
          stage inside it. Answers the workflow objection structurally — the
          reader finds "Claude Code" at position four and draws the conclusion
          themselves, which is worth more than being told it. */}
      <Reveal>
        <Band index={2} label="Method" title="What actually happens" surface="sunken">
          <LifecycleRail />
        </Band>
      </Reveal>

      {/* ── Band 3 · Featured system ───────────────────────────────────────
          Produces: I have explored a real production architecture and I did not
          have to go looking for it. A taste of the case study, never a
          compression of it — a reader who feels they have read it will not open
          it. One exit only: the case study. */}
      {featured ? (
        <Reveal>
          <Band index={3} label={COMPETENCY_LABEL[featured.frontmatter.competency]}>
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-5">
                <Text token="heading-2" as="h2">
                  {featured.frontmatter.title}
                </Text>
                <div className="max-w-prose">
                  <Text token="lede" color="secondary">
                    {featured.frontmatter.summary}
                  </Text>
                </div>
              </div>

              <ArchitectureExplorer />

              <div>
                <Link href={`/work/${featured.frontmatter.slug}`} variant="action">
                  Read the full case study
                </Link>
              </div>
            </div>
          </Band>
        </Reveal>
      ) : null}

      {/* ── Band 4 · The retrieval pipeline ────────────────────────────────
          Produces: a second competency, shown rather than claimed. Deliberately
          a different visual form from band 3 — a sequence, not a stack —
          because two projects presented in the same component read as two
          instances of one thing. */}
      {pipeline ? (
        <Reveal>
          <Band
            index={4}
            label={COMPETENCY_LABEL[pipeline.frontmatter.competency]}
            surface="sunken"
          >
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-5">
                <Text token="heading-2" as="h2">
                  {pipeline.frontmatter.title}
                </Text>
                <div className="max-w-prose">
                  <Text token="lede" color="secondary">
                    {pipeline.frontmatter.summary}
                  </Text>
                </div>
              </div>

              <PipelineFlow />

              <div>
                <Link href={`/work/${pipeline.frontmatter.slug}`} variant="action">
                  Read the full case study
                </Link>
              </div>
            </div>
          </Band>
        </Reveal>
      ) : null}

      {/* ── Band 5 · The rest of the work ──────────────────────────────────
          Produces: there is more, and it is a different kind. Intentionally the
          quietest band on the page. */}
      {remaining.length > 0 ? (
        <Reveal>
          {/* The heading states no count. `remaining` is derived — currently one
              study, two the moment another non-methodology case study is
              published — and a title reading "Two more" would have been wrong
              from the day it shipped. */}
          <Band index={5} label="Also on this site" title="The rest of the work">
            <div className="flex flex-col gap-8">
              <ul className="flex flex-col border-t-hairline border-color-border-subtle">
                {remaining.map((study) => (
                  <li
                    key={study.frontmatter.slug}
                    className="border-b-hairline border-color-border-subtle py-6"
                  >
                    <div className="grid gap-3 md:grid-cols-12 md:items-baseline md:gap-6">
                      <div className="md:col-span-3">
                        <Text token="mono" as="span" color="tertiary" uppercase>
                          {COMPETENCY_LABEL[study.frontmatter.competency]}
                        </Text>
                      </div>
                      <div className="flex flex-col gap-2 md:col-span-9">
                        <Text token="heading-4" as="h3">
                          <Link href={`/work/${study.frontmatter.slug}`} variant="bare">
                            {study.frontmatter.title}
                          </Link>
                        </Text>
                        <Text token="body-sm" color="secondary">
                          {study.frontmatter.summary}
                        </Text>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div>
                <Link href="/work">Compare every case study</Link>
              </div>
            </div>
          </Band>
        </Reveal>
      ) : null}

      {/* ── Band 6 · Philosophy ────────────────────────────────────────────
          Produces: a position I could disagree with, which is what makes it a
          position. Four lines, no supporting paragraph — a philosophy that
          needs explaining is not yet a philosophy. */}
      <Reveal>
        <Band index={6} label="Position" surface="sunken">
          <h2 className="sr-only">Engineering philosophy</h2>
          <ul className="flex flex-col">
            {PHILOSOPHY.map((entry, index) => (
              <li
                key={entry.id}
                className="border-t-hairline border-color-border-subtle py-10 first:border-t-0 first:pt-0 last:pb-0"
              >
                <div className="grid gap-4 md:grid-cols-12 md:gap-8">
                  <div aria-hidden="true" className="md:col-span-1">
                    <Text token="mono" as="span" color="tertiary">
                      {String(index + 1).padStart(2, '0')}
                    </Text>
                  </div>
                  <div className="flex flex-col gap-4 md:col-span-11">
                    <Text token="heading-1" as="p">
                      {entry.line}
                    </Text>
                    <Text token="mono" color="tertiary">
                      {entry.source}
                    </Text>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Band>
      </Reveal>

      {/* ── Band 7 · Connect ───────────────────────────────────────────────
          Produces: I know what to do if I want to act. A distinct band, not
          merged into the footer. No call to action — `EXPERIENCE_PRINCIPLES.md`
          §3 refuses urgency and obligation, and that survives the redesign
          unchanged. */}
      <Reveal>
        <Band index={7} label="Availability" title="Work with me">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="flex flex-col gap-6 md:col-span-7">
              <Text token="lede" color="secondary">
                {AVAILABILITY}
              </Text>
              <div className="flex flex-wrap gap-3">
                <Link href="/connect" variant="action">
                  What to bring, and what to expect back
                </Link>
                <Link href="/resume" variant="action">
                  Résumé
                </Link>
              </div>
            </div>
            <dl className="flex flex-col gap-5 md:col-span-5">
              {[
                ['Based in', contact.location],
                ['Working hours', contact.timezone],
                ['Email', contact.email],
              ].map(([term, value]) => (
                <div key={term} className="flex flex-col gap-1">
                  <dt>
                    <Text token="mono" as="span" color="tertiary" uppercase>
                      {term}
                    </Text>
                  </dt>
                  <dd>
                    <Text token="body-sm" as="span" color="secondary">
                      {value}
                    </Text>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Band>
      </Reveal>
    </>
  );
}

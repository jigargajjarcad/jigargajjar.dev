import { Trace, containmentRows } from '@/components/instrument/Trace';
import { Link } from '@/components/primitives/Link';
import { Text } from '@/components/primitives/Text';
import { AGENT_TRACE, RETRIEVAL_TRACE } from '@/content/home';
import type { CaseStudy } from '@/content/types';

/**
 * Band 3 — two systems, read in the notation the reader already learned.
 *
 * **V2 gave each project its own bespoke visual: a layer stack and a staged
 * pipeline.** Two components, two things to learn, and the reader's attention
 * spent on the diagrams rather than on what they contained. V3 renders both in
 * the same waterfall the hero used on their own page load, which means the
 * reader arrives already fluent and every unit of attention goes to the content.
 * Sameness of form is what makes the difference of content legible.
 *
 * **These traces carry no timings, and the axis caption says so.** Both systems
 * exist, both are public, and neither has production traffic. A latency column
 * here would be the one fabricated thing on a page whose entire argument is that
 * its numbers are checkable — and the contrast with the hero's real
 * milliseconds, two screens above, is the strongest possible demonstration of
 * where the line is.
 */
export function Systems({
  orchestrai,
  novamind,
  others,
}: {
  orchestrai?: CaseStudy;
  novamind?: CaseStudy;
  /** Published studies with no trace of their own. Kept, never featured. */
  others: readonly CaseStudy[];
}) {
  const systems = [
    { study: orchestrai, trace: AGENT_TRACE, axis: 'span containment · not time · one agent run' },
    { study: novamind, trace: RETRIEVAL_TRACE, axis: 'span containment · not time · one query' },
  ].filter((entry): entry is { study: CaseStudy; trace: typeof AGENT_TRACE; axis: string } =>
    Boolean(entry.study),
  );

  return (
    <div className="flex flex-col gap-20">
      {systems.map(({ study, trace, axis }) => (
        <article key={study.frontmatter.slug} className="flex flex-col gap-10">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-baseline">
            <div className="flex flex-col gap-3 lg:col-span-5">
              <Text token="heading-2" as="h3">
                {study.frontmatter.title}
              </Text>
              <Text token="mono" color="tertiary">
                {study.frontmatter.stack.join(' · ')}
              </Text>
            </div>
            <div className="max-w-prose lg:col-span-7">
              <Text token="lede" color="secondary">
                {study.frontmatter.summary}
              </Text>
            </div>
          </div>

          <Trace rows={containmentRows(trace)} axis={axis}>
            <Text token="mono" as="span" color="tertiary">
              no production traffic — a duration here would be invented
            </Text>
          </Trace>

          <div>
            <Link href={`/work/${study.frontmatter.slug}`} variant="action">
              {`Read the ${study.frontmatter.title} case study`}
            </Link>
          </div>
        </article>
      ))}

      {others.length > 0 ? (
        <div className="flex flex-col gap-6 border-t-hairline border-color-border-subtle pt-10">
          {/*
            The remaining published work. Deliberately the quietest thing in the
            band — enough that nothing is invisible, never enough to compete with
            two systems shown at depth. Derived from content, so a new case study
            appears here without an edit.
          */}
          <Text token="mono" color="tertiary" uppercase>
            Also published
          </Text>
          <ul className="flex flex-col">
            {others.map((study) => (
              <li
                key={study.frontmatter.slug}
                className="border-b-hairline border-color-border-subtle py-5 first:border-t-hairline"
              >
                <div className="grid gap-2 md:grid-cols-12 md:items-baseline md:gap-6">
                  <div className="md:col-span-4">
                    <Text token="heading-4" as="span">
                      <Link href={`/work/${study.frontmatter.slug}`} variant="bare">
                        {study.frontmatter.title}
                      </Link>
                    </Text>
                  </div>
                  <div className="md:col-span-8">
                    <Text token="body-sm" as="span" color="secondary">
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
      ) : null}
    </div>
  );
}

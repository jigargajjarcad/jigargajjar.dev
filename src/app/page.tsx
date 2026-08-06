import type { Metadata } from 'next';

import { FailureMatrix } from '@/components/instrument/FailureMatrix';
import { Band } from '@/components/layout/Band';
import { Reveal } from '@/components/motion/Reveal';
import { Link } from '@/components/primitives/Link';
import { Text } from '@/components/primitives/Text';
import { Hero } from '@/components/sections/Hero';
import { Refusals } from '@/components/sections/Refusals';
import { Systems } from '@/components/sections/Systems';
import { Verification } from '@/components/sections/Verification';
import { loadCaseStudies } from '@/content/loader';
import { AVAILABILITY, NAME, POSITIONING, contact } from '@/content/site';
import { pageMetadata } from '@/app/metadata';

/**
 * `/` — Version 3. Decided in ADR-022; layout contract in
 * `docs/wireframes/01-home.md` §14.
 *
 * **What V2 got wrong.** It was correct and it was ordinary. Every claim was a
 * claim: a topology that illustrated a system rather than measuring one, three
 * tablists whose interaction revealed a paragraph, and a page that argued
 * verification was the scarce skill while showing no verification anywhere. A
 * reader had to take all of it on trust, and the whole point of the thesis is
 * that trust should not be necessary.
 *
 * **What V3 does instead: it makes the page checkable.**
 *
 *   Band 1  measures the reader's own page load, live, in milliseconds
 *   Band 2  shows the gates and budgets, from the build, re-verified in CI
 *   Band 3  reads two real systems in the notation band 1 just taught
 *   Band 4  names what breaks and where it stops — including where it does not
 *   Band 5  names what was refused, and what refusing it cost
 *
 * Every band produces a belief the others cannot, which is the test
 * `HOMEPAGE_NARRATIVE.md` §4 sets. Two V2 bands are gone: the lifecycle merged
 * into band 2, where the method now arrives with a receipt; and the philosophy
 * quotes were deleted outright, because band 5 demonstrates the same positions
 * at cost, and a principle that is visibly expensive is worth more than a
 * principle that is well phrased.
 *
 * **The objection sequence is intact.** `FOUNDATION.md` §3 goal 4 puts the
 * *agents wrote this* objection before any evidence; band 2 holds that position
 * with "Claude Code" as stage four of seven.
 */

const ORCHESTRAI = 'orchestai';
const NOVAMIND = 'novamind-ai';

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
  const published = loadCaseStudies();
  const orchestrai = published.find((s) => s.frontmatter.slug === ORCHESTRAI);
  const novamind = published.find((s) => s.frontmatter.slug === NOVAMIND);
  const others = published.filter((s) => s !== orchestrai && s !== novamind);

  return (
    <>
      <Hero />

      {/* ── Band 2 · Verification ──────────────────────────────────────────
          Produces: the method is real, and here is its output. Holds the
          objection-sequence position V2's lifecycle band held. */}
      <Reveal>
        <Band index={2} label="Verification" title="Everything here is checkable" surface="sunken">
          <Verification />
        </Band>
      </Reveal>

      {/* ── Band 3 · Systems ───────────────────────────────────────────────
          Produces: this person builds real systems, and I can read them.
          One notation, deliberately the same as band 1's — with the axis
          caption doing the work of saying what these traces do not claim. */}
      <Reveal>
        <Band index={3} label="Systems" title="Two systems, one notation">
          <Systems orchestrai={orchestrai} novamind={novamind} others={others} />
        </Band>
      </Reveal>

      {/* ── Band 4 · Failure modes ─────────────────────────────────────────
          Produces: this person thinks about production, not demos. The band a
          staff engineer reads first, and the one most portfolios omit. */}
      <Reveal>
        <Band index={4} label="Failure" title="What breaks, and where it stops" surface="sunken">
          <FailureMatrix />
        </Band>
      </Reveal>

      {/* ── Band 5 · Refusals ──────────────────────────────────────────────
          Produces: this person has judgement, including about AI itself.
          Replaces V2's philosophy band — the same positions, demonstrated at a
          stated cost rather than asserted in a quotable sentence. */}
      <Reveal>
        <Band index={5} label="Judgement" title="What I didn’t build">
          <Refusals />
        </Band>
      </Reveal>

      {/* ── Band 6 · Connect ───────────────────────────────────────────────
          Produces: I know what to do if I want to act. No call to action —
          `EXPERIENCE_PRINCIPLES.md` §3 refuses urgency and obligation. */}
      <Reveal>
        <Band index={6} label="Availability" title="Work with me" surface="sunken">
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

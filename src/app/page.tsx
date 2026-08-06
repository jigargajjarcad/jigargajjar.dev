import type { Metadata } from 'next';

import { PageReading } from '@/components/instrument/PageReading';
import { Screen } from '@/components/layout/Screen';
import { Reveal } from '@/components/motion/Reveal';
import { Container } from '@/components/primitives/Container';
import { Link } from '@/components/primitives/Link';
import { Text } from '@/components/primitives/Text';
import { CLOSING, METHOD, REFUSALS, SYSTEMS, THESIS } from '@/content/home';
import { loadCaseStudies } from '@/content/loader';
import { totalChecks } from '@/content/measured';
import { AVAILABILITY, NAME, POSITIONING, contact } from '@/content/site';
import { pageMetadata } from '@/app/metadata';

/**
 * `/` — Version 4. Decided in ADR-023; layout contract in
 * `docs/wireframes/01-home.md` §15.
 *
 * **One idea, six screens, two hundred words.**
 *
 *     Good systems are defined by what they refuse.
 *
 * Every screen is an instance of that sentence rather than a separate subject.
 * OrchestAI rejects a run before any model is called. NovaMind discards five of
 * ten candidates before the model sees anything. The method screen is a gate
 * that blocks a merge. The last screen is a list of things not built. The page
 * itself is two hundred words because everything else was refused — which is the
 * final proof of the idea and the reason the page is this short.
 *
 * **What V3 got wrong.** It measured 1,914 words across thirteen screens: an
 * eight-minute read for a visitor who stays forty-five seconds, so about nine
 * per cent of it was ever seen. Every version had added a *system* — a token
 * architecture, then a diagram engine, then a measurement pipeline — and
 * mistaken rigour for taste. The tell was already visible in V3: its strongest
 * section was the only one with no visualisation in it.
 *
 * **The homepage's job is not to prove; it is to make someone want to read the
 * case studies.** The proof exists — 8,800 words of them, one click away. V3 was
 * competing with its own best content and losing.
 *
 * The objection sequence from `FOUNDATION.md` §3 goal 4 survives intact: screen
 * 2 answers *agents wrote this, so what did you do* before any project appears.
 * It now takes fifteen words.
 */

/** Featured in screen order. The rest of the work lives at `/work`. */
const FEATURED = SYSTEMS.map((system) => system.slug);

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
  const featured = SYSTEMS.map((system) => ({
    system,
    study: published.find((s) => s.frontmatter.slug === system.slug),
  })).filter((entry) => entry.study !== undefined);

  const total = published.length;
  const hasMore = published.some((s) => !FEATURED.includes(s.frontmatter.slug));

  return (
    <>
      {/* ── 1 · Hero ───────────────────────────────────────────────────────
          Belief: this person builds production AI systems.
          Nothing animates — it is above the fold (`MOTION.md` §5). */}
      <section>
        <Container width="wide">
          <div className="flex flex-col gap-12 pb-section-md pt-section-md">
            <div className="flex flex-col gap-10">
              <Text token="hero" as="h1">
                {THESIS}
              </Text>

              {/* `POSITIONING` verbatim (`FOUNDATION.md` §5) — the category,
                  beneath the claim. Held at prose width so it reads as a
                  subtitle rather than as a second headline. */}
              <div className="max-w-prose">
                <Text token="lede" color="secondary">
                  {POSITIONING}
                </Text>
              </div>

              <div>
                <Link href="/work" variant="action">
                  Read the work
                </Link>
              </div>
            </div>

            {/* The one surviving instrument. A footnote, deliberately. */}
            <div className="border-t-hairline border-color-border-subtle pt-6">
              <PageReading />
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2 · Method ─────────────────────────────────────────────────────
          Belief: there is a repeatable way of working here. Holds the
          objection-sequence position across all four versions — the third
          clause answers it, and is the page's idea in its first form. */}
      <Reveal>
        <Screen>
          <div className="grid gap-12 lg:grid-cols-12">
            <h2 className="flex flex-col gap-1 lg:col-span-8">
              {METHOD.map((clause) => (
                <span key={clause} className="font-display text-type-heading-1">
                  {clause}
                </span>
              ))}
            </h2>
            <div className="flex flex-col gap-6 lg:col-span-4 lg:justify-end">
              <Text token="lede" color="secondary">
                Nothing reaches <code>main</code> until {totalChecks} checks pass.
              </Text>
              <div>
                <Link href="/workflow">How it works</Link>
              </div>
            </div>
          </div>
        </Screen>
      </Reveal>

      {/* ── 3–4 · The systems ──────────────────────────────────────────────
          Belief: these are elegant. One idea each, and each is the page's
          idea — one rejects before working, the other discards before
          answering. */}
      {featured.map(({ system, study }) => (
        <Reveal key={system.slug}>
          <Screen>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="flex flex-col gap-3 lg:col-span-4">
                <Text token="heading-2" as="h2">
                  {study?.frontmatter.title}
                </Text>
                <Text token="mono" color="tertiary">
                  {system.meta}
                </Text>
              </div>

              <div className="flex flex-col gap-8 lg:col-span-8">
                {/* The figure exists only where three numerals arrive faster
                    than a sentence. One system has one; one does not. */}
                {system.figure ? (
                  <p aria-hidden="true">
                    <Text token="hero" as="span" color="secondary">
                      {system.figure}
                    </Text>
                  </p>
                ) : null}

                <Text token="heading-1" as="p">
                  {system.idea}
                </Text>
                <div className="max-w-prose">
                  <Text token="lede" color="secondary">
                    {system.consequence}
                  </Text>
                </div>

                <div className="flex flex-wrap items-center gap-8">
                  <Link href={`/work/${system.slug}`} variant="action">
                    Read the case study
                  </Link>
                  {system.figure && hasMore ? (
                    <Link href="/work">{`All ${total} case studies`}</Link>
                  ) : null}
                </div>
              </div>
            </div>
          </Screen>
        </Reveal>
      ))}

      {/* ── 5 · Refusals ───────────────────────────────────────────────────
          Belief: this person has judgement, and says no. The page's idea,
          named — after four demonstrations of it rather than before. */}
      <Reveal>
        <Screen>
          <div className="flex flex-col gap-16">
            <Text token="heading-2" as="h2">
              What I didn’t build
            </Text>

            <ul className="flex flex-col">
              {REFUSALS.map((refusal) => (
                <li
                  key={refusal.id}
                  className="grid gap-x-16 gap-y-3 border-t-hairline border-color-border-subtle py-8 last:border-b-hairline md:grid-cols-12"
                >
                  <div className="md:col-span-4">
                    <Text token="heading-3" as="span">
                      {refusal.what}
                    </Text>
                  </div>
                  <div className="md:col-span-8">
                    <Text token="body" as="span" color="secondary">
                      {refusal.line}
                    </Text>
                  </div>
                </li>
              ))}
            </ul>

            <div className="max-w-prose">
              <Text token="heading-2" as="p">
                {CLOSING}
              </Text>
            </div>
          </div>
        </Screen>
      </Reveal>

      {/* ── 6 · Connect ────────────────────────────────────────────────────
          Belief: I know what to do if I want to act. No call to action —
          `EXPERIENCE_PRINCIPLES.md` §3 refuses urgency and obligation. */}
      <Reveal>
        <Screen last>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col gap-8 lg:col-span-7">
              <Text token="heading-2" as="h2">
                Work with me
              </Text>
              <div className="max-w-prose">
                <Text token="lede" color="secondary">
                  {AVAILABILITY}
                </Text>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/connect" variant="action">
                  What to bring
                </Link>
                <Link href="/resume" variant="action">
                  Résumé
                </Link>
              </div>
            </div>

            <dl className="flex flex-col gap-5 lg:col-span-5 lg:justify-end">
              {[
                ['Based in', contact.location],
                ['Hours', contact.timezone],
                ['Email', contact.email],
              ].map(([term, value]) => (
                <div key={term} className="flex items-baseline justify-between gap-6">
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
        </Screen>
      </Reveal>
    </>
  );
}

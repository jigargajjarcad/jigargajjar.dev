import { Fragment } from 'react';
import type { Metadata } from 'next';

import { PageReading } from '@/components/instrument/PageReading';
import { Screen } from '@/components/layout/Screen';
import { Reveal } from '@/components/motion/Reveal';
import { Container } from '@/components/primitives/Container';
import { Link } from '@/components/primitives/Link';
import { Text } from '@/components/primitives/Text';
import { CLOSING, METHOD, METHOD_EVIDENCE, REFUSALS, SYSTEMS, THESIS } from '@/content/home';
import { loadCaseStudies } from '@/content/loader';
import { totalChecks } from '@/content/measured';
import { AVAILABILITY, NAME, POSITIONING, VOICE, contact } from '@/content/site';
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
          <div className="flex flex-col gap-12 pb-section-sm pt-section-md">
            <div className="flex flex-col gap-8">
              {/*
                `text-balance` is what fixes the line breaks. At 66 px the
                statement sets in two lines either way; balanced, the two are
                near-equal in length and the block reads as a shape rather than
                as a paragraph that happened to wrap. `max-w-prose` stops it
                running the full 1120 px, which was most of why 80 px felt heavy.
              */}
              <h1 className="text-balance font-display text-type-hero text-color-text-primary">
                {THESIS}
              </h1>

              {/* ADR-024 — the one sentence on this page in a human voice.
                  `POSITIONING` remains the document description; it is no longer
                  the line beneath the claim, because a category cannot explain
                  a claim. */}
              <p className="max-w-prose text-balance font-text text-type-lede text-color-text-secondary">
                {VOICE}
              </p>
            </div>

            <div>
              <Link href="/work" variant="action">
                Read the engineering
              </Link>
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
          {/*
            The column split is 8/4 and cannot usefully be tightened. The
            longest clause needs 640 px at `heading-1`, which is more than seven
            of twelve columns hold at any gap — narrowing the heading breaks
            "Verification that blocks the merge." onto two lines, and three
            clauses that each occupy one line is the entire form of this block.
            The gap comes down from 48 px to 40 px, which is the whole of what
            the grid has to give here. ADR-025.
          */}
          <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
            <h2 className="flex flex-col gap-1 lg:col-span-8">
              {METHOD.map((clause) => (
                <span key={clause} className="font-display text-type-heading-1">
                  {clause}
                </span>
              ))}
            </h2>
            <div className="flex flex-col gap-5 lg:col-span-4 lg:justify-end">
              <Text token="lede" color="secondary">
                {`${METHOD_EVIDENCE} ${totalChecks} checks pass.`}
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
              <div className="flex flex-col gap-1 lg:col-span-4">
                {/*
                  `heading-3`, not `heading-2`. At 35 px the project name sat
                  within nine points of the 44 px statement beside it, so the two
                  columns competed. At 28 px the name reads as what it is — a
                  label on a statement — which is the editorial relationship this
                  layout was drawn for. ACCESSIBILITY.md §8 explicitly permits
                  two headings at the same level to take different sizes; the
                  level is a structural claim and the size is not.
                */}
                <Text token="heading-3" as="h2">
                  {study?.frontmatter.title}
                </Text>
                {/* `secondary`, not `tertiary`: 7:1 against the surface rather
                    than 4.5:1. Combined with the token's size increase this is
                    the fix for the weakest area on the page. Two lines, set
                    rather than wrapped — see `System.kind`. */}
                <div className="flex flex-col">
                  <Text token="mono" color="secondary">
                    {system.kind}
                  </Text>
                  <Text token="mono" color="secondary">
                    {system.stack}
                  </Text>
                </div>
              </div>

              <div className="flex flex-col gap-10 lg:col-span-8">
                {/* The figure exists only where three numerals arrive faster
                    than a sentence. One system has one; one does not. */}
                {system.figure ? (
                  /*
                    The page's only figure, and the craft is in the split:
                    numerals in the primary colour, arrows in the tertiary. Set
                    uniformly they read as one string of characters; set this way
                    the eye lands on 10, 5 and 1 and the arrows fall back to
                    being punctuation. That is the difference between a line of
                    text and a diagram. ADR-024.
                  */
                  <p
                    aria-hidden="true"
                    className="flex items-baseline gap-4 font-display text-type-hero"
                  >
                    {system.figure.split(' → ').map((value, index) => (
                      <span key={value} className="flex items-baseline gap-4">
                        {index > 0 ? (
                          <span className="text-color-text-tertiary">&rarr;</span>
                        ) : null}
                        <span className="text-color-text-primary">{value}</span>
                      </span>
                    ))}
                  </p>
                ) : null}

                <div className="flex flex-col gap-5">
                  <p className="max-w-prose text-balance font-display text-type-heading-1 text-color-text-primary">
                    {system.idea}
                  </p>
                  <div className="max-w-prose">
                    <Text token="lede" color="secondary">
                      {system.consequence}
                    </Text>
                  </div>
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
          <div className="flex flex-col gap-12">
            <Text token="heading-2" as="h2">
              What I didn’t build
            </Text>

            <ul className="flex flex-col">
              {REFUSALS.map((refusal) => (
                <li
                  key={refusal.id}
                  className="grid gap-x-16 gap-y-3 border-t-hairline border-color-border-subtle py-10 last:border-b-hairline md:grid-cols-12 md:items-baseline"
                >
                  <div className="md:col-span-5">
                    <Text token="heading-3" as="span">
                      {refusal.what}
                    </Text>
                  </div>
                  <div className="md:col-span-7">
                    <Text token="body" as="span" color="secondary">
                      {refusal.line}
                    </Text>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-4 max-w-prose text-balance font-display text-type-heading-2 text-color-text-primary">
              {CLOSING}
            </p>
          </div>
        </Screen>
      </Reveal>

      {/* ── 6 · Connect ────────────────────────────────────────────────────
          Belief: I know what to do if I want to act. No call to action —
          `EXPERIENCE_PRINCIPLES.md` §3 refuses urgency and obligation. */}
      <Reveal>
        <Screen last>
          {/*
            `items-baseline` aligns the first baseline of each column, so
            "Available" and "BASED IN" sit on exactly the same line. Bottom
            alignment had them within twenty pixels of each other, which is the
            worst of both — near enough to look intended, far enough to look
            missed. ADR-025.
          */}
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            <div className="flex flex-col gap-8 lg:col-span-7">
              <Text token="heading-2" as="h2">
                Available
              </Text>
              <div className="max-w-prose">
                <Text token="lede" color="secondary">
                  {AVAILABILITY}
                </Text>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/connect" variant="action">
                  Start a conversation
                </Link>
                <Link href="/resume" variant="action">
                  Résumé
                </Link>
              </div>
            </div>

            {/*
              A two-column grid rather than three rows of `justify-between`.
              Spread across the full column the label and its value sat 140 px
              apart and read as two lists; sized to the widest label, they read
              as one specification block.
            */}
            <dl className="grid grid-cols-[auto_1fr] items-baseline gap-x-8 gap-y-4 lg:col-span-4 lg:col-start-9">
              {[
                ['Based in', contact.location],
                ['Hours', contact.timezone],
                ['Email', contact.email],
              ].map(([term, value]) => (
                <Fragment key={term}>
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
                </Fragment>
              ))}
            </dl>
          </div>
        </Screen>
      </Reveal>
    </>
  );
}

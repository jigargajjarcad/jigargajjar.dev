import type { Metadata } from 'next';

import { Reveal } from '@/components/motion/Reveal';
import { Container } from '@/components/primitives/Container';
import { Link } from '@/components/primitives/Link';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';
import { pageMetadata } from '@/app/metadata';

/**
 * `/about` — implemented from `docs/wireframes/05-about.md`, which is the
 * contract. Specified by `ROUTE_SPECIFICATIONS.md` §2.
 *
 * The thinnest route on the site, and deliberately so. `/resume` owns the
 * facts, `/workflow` owns the method, the case studies own capability;
 * "how do you work with other engineers" is what is left, and it is genuinely
 * unanswered elsewhere. Section 2 is therefore longer than sections 1 and 3
 * combined — if it stops being so, this page has become a biography.
 *
 * Prose, never bullets: `CONTENT_STRATEGY.md` §8 — reasoning bulleted is
 * reasoning amputated, and how someone handles disagreement cannot survive
 * being reduced to a list.
 *
 * **Draft provenance.** Section 1 follows the wireframe's own copy, corrected
 * where it had drifted: it read "for the past eighteen months", which rots, so
 * it is anchored to February 2025. Section 3 is drawn from two failures this
 * repository actually records — ADR-019 and ADR-018.
 *
 * Section 2 states evidence before interpretation and nothing beyond it. Each
 * paragraph rests on something checkable: sole ownership of features and
 * critical fixes; the decision records in `DECISIONS.md`, which carry rejected
 * alternatives and revisit triggers; the validation agents built at Edge10; and
 * the five records here (ADR-015 through ADR-019) that exist only because
 * implementation met a question the specification had not answered. No claim is
 * made about temperament or preference that no artifact could support.
 *
 * No availability, focus, or contact details here — `/connect` owns them
 * (ADR-014). Duplicating them creates two surfaces that decay independently.
 */

const NEXT = [
  { href: '/workflow', label: 'How the work gets made — the workflow' },
  { href: '/connect', label: 'What to bring, and what to expect back' },
  { href: '/resume', label: 'Résumé — the record' },
];

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'How I work with other engineers: how decisions get recorded, what I am useful for in ' +
    'review, and what I am trying to get better at.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <Container width="wide">
        <Text token="heading-1" as="h1">
          About
        </Text>
      </Container>

      <Container width="prose">
        <Stack gap={16}>
          {/* ── Who and what ────────────────────────────────────────────
              Frames the page. Carries no unique ledger question of its own. */}
          <Stack gap={6}>
            <Text token="body">
              I build production software, and have done for long enough to have opinions about what
              makes it survive contact with a team. Most of that work has been backend — C# .NET,
              CQRS, clean architecture, SQL Server — with enough React to be useful on the other
              side of the API.
            </Text>
            <Text token="body">
              Since February 2025 I have worked in an AI-native workflow: agents write the
              implementation, and I architect, direct, and verify. That is a change in method, not a
              change in standards.
            </Text>
            <Text token="body">
              The domain I know best is athlete performance in professional sport, where the data is
              sensitive, the users are specialists, and being wrong is visible quickly.
            </Text>
          </Stack>

          {/* ── How I work with other engineers ─────────────────────────
              The reason this route exists. Resolves H7, which no other
              surface answers. */}
          <Reveal>
            <Stack gap={6}>
              <Text token="heading-2" as="h2">
                How I work with other engineers
              </Text>
              <Text token="body">
                Most of what I have built I have owned end to end — requirements through production,
                often as the only engineer on the feature. That shapes how I work with other people:
                I try to leave behind something another engineer can pick up without asking me
                anything, because frequently there was nobody to ask.
              </Text>
              <Text token="body">
                In practice that means decisions get written down with the alternatives that lost,
                and with the condition that should reopen them. A decision recorded as a conclusion
                is an instruction; a decision recorded with its rejected options is an argument
                someone else can disagree with. I would rather be argued with in writing six months
                later than have someone assume I had a reason I did not have.
              </Text>
              <Text token="body">
                In review I am more useful on structure than on style. I will spend time on whether
                a boundary sits in the right place, whether a failure mode has been considered, and
                whether the result can be verified — and very little on formatting, which tooling
                should settle. Where I have built review tooling, that was the point: validation
                agents that check standards and design conventions on every pull request, so human
                review is spent on the parts that need judgement.
              </Text>
              <Text token="body">
                When work stalls with me it is usually a question of specification rather than
                throughput. Five of this project&rsquo;s decision records exist only because
                implementation reached a question the documentation did not answer, and each was
                written down and resolved rather than guessed at. Most of my delivery work has been
                as the sole engineer on a feature under a deadline, which is where that habit came
                from — there was nobody to escalate to.
              </Text>
              <Text token="body">
                I am comfortable being wrong in public. This site documents two of my own errors in
                detail, because a record containing only successes is not a record.
              </Text>
            </Stack>
          </Reveal>

          {/* ── What I am trying to get better at ───────────────────────
              A credibility device of the same kind as a case study's
              Failures section, not modesty. Both examples are recorded in
              this repository. */}
          <Reveal>
            <Stack gap={6}>
              <Text token="heading-2" as="h2">
                What I am trying to get better at
              </Text>
              <Text token="body">
                Describing my own work accurately before checking it. Twice on this site I stated
                something about a system I had built — that one project was an extensible framework,
                and that a dependency would cost 15–18 KB — and both were wrong in the same
                direction: more generous than the artifact. Both were caught the same way, by
                putting the claim next to the source and reading them together. I now treat my own
                description of a system as a claim that needs verifying, which is slower, and has
                been worth it.
              </Text>
            </Stack>
          </Reveal>

          {/* ── Where to go next ────────────────────────────────────────
              A `<ul>` so the count is announced. */}
          <Reveal>
            <Stack gap={6}>
              <Text token="heading-2" as="h2">
                Where to go next
              </Text>
              <Stack gap={3} as="ul">
                {NEXT.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </Stack>
            </Stack>
          </Reveal>
        </Stack>
      </Container>
    </>
  );
}

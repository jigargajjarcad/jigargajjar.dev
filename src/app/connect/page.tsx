import type { Metadata } from 'next';

import { Reveal } from '@/components/motion/Reveal';
import { Container } from '@/components/primitives/Container';
import { Link } from '@/components/primitives/Link';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';
import { contact } from '@/content/site';
import { pageMetadata } from '@/app/metadata';

/**
 * `/connect` — implemented from `docs/wireframes/06-connect.md`, which is the
 * contract. Specified by `EXPERIENCE_FLOW.md` §11 and ADR-014.
 *
 * A professional card, not a contact form. The site is not collecting
 * submissions; it is starting engineering conversations. ADR-014 created this
 * route because the competency thesis says what this person *can* do and
 * nothing about what they want brought to them — capability is not appetite.
 *
 * No form at any breakpoint (`INTERACTION.md` §12): it would require a third
 * party or a server, both prohibited, and would add the site's only validation
 * surface, only error states, and only spam vector, to replace an email link
 * that already works everywhere.
 *
 * **Draft provenance.** "Currently" and the first "Open to" entry are drawn
 * from the owner's LinkedIn summary. The wireframe's first entry read "Senior
 * and staff engineering roles"; it is aligned here to the profile, which names
 * AI Engineer roles and carries no "Senior" — the same correction applied to
 * the positioning sentence. The speaking entry and the "Less useful" items are
 * statements of appetite that no source can verify, and are flagged for review.
 *
 * This is the one surface on the site with a months-scale shelf life. "Currently"
 * is reviewed whenever a case study is added.
 */

/** §8 — genuinely parallel, enumerable, scanned rather than read. Bullets are
    correct here and almost nowhere else on the site (`CONTENT_STRATEGY.md` §8). */
const OPEN_TO = [
  'AI Engineer and Full-Stack roles where production delivery and AI tooling meet',
  'Collaboration on AI infrastructure and agent systems',
  'Technical conversations about AI-native software engineering — implementation approaches, architecture, and what has not worked',
];

/**
 * Stated as preference rather than policy. These are the clearest signal of
 * appetite on the page and they save both sides time, but an absolute rule
 * invites the reader to test it — and the owner would rather decline case by
 * case than publish a door that is closed.
 */
const LESS_USEFUL = [
  'I usually decline recruiter outreach with no role attached',
  'I am generally less interested in unpaid technical evaluations',
];

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <Stack gap={4}>
      <Text token="heading-2" as="h2">
        {heading}
      </Text>
      {children}
    </Stack>
  );
}

function Bullets({ items, label }: { items: string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex list-inside list-disc flex-col gap-2">
      {items.map((item) => (
        <li key={item}>
          <Text token="body" as="span">
            {item}
          </Text>
        </li>
      ))}
    </ul>
  );
}

export const metadata: Metadata = pageMetadata({
  title: 'Connect',
  description: 'What to bring, what I am open to, and what to expect back.',
  path: '/connect',
});

export default function ConnectPage() {
  return (
    <>
      <Container width="wide">
        <Stack gap={6}>
          <Text token="heading-1" as="h1">
            Connect
          </Text>
          {/* Philosophy. Prose rather than bullets because it carries
              reasoning — it sets the shape of a good approach. */}
          <Text token="body">
            The most useful messages arrive with a specific problem attached. You do not need a
            formal brief — one paragraph about what is hard is enough to start.
          </Text>
        </Stack>
      </Container>

      {/* Constrained to `prose` even at desktop: a business card that fills
          1120 px stops reading as a card. This is the one page where the
          content is deliberately small and the restraint is the point. */}
      <Container width="prose">
        <Stack gap={16}>
          <Reveal>
            {/* Two columns pair the question with its answer — what is being
                worked on beside what is open. Reading order stays vertical
                within each column, and DOM order is preserved. */}
            <div className="grid gap-10 md:grid-cols-2 md:gap-x-8">
              <Section heading="Currently">
                {/* TODO — time-sensitive. ADR-014 identifies this as the one
                    surface on the site with a months-scale shelf life. Review
                    it whenever a major project or role changes, and whenever a
                    case study is added; everything else here is durable. */}
                <Text token="body">
                  Building in the open in the AI engineering space — retrieval-augmented generation,
                  multi-agent orchestration, and evaluation. The current work is this site and the
                  case studies behind it.
                </Text>
              </Section>

              <Stack gap={10}>
                <Section heading="Open to">
                  <Bullets items={OPEN_TO} label="Open to" />
                </Section>
                <Section heading="Less useful">
                  <Bullets items={LESS_USEFUL} label="Less useful" />
                </Section>
              </Stack>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid gap-10 md:grid-cols-2 md:gap-x-8">
              <Section heading="Where to reach me">
                <Stack gap={4}>
                  {/* The address is selectable plaintext beside the mailto
                      link. `mailto:` fails for readers with no configured mail
                      client, which is a real share on shared and corporate
                      machines (wireframe §4). */}
                  <Stack gap={1}>
                    <Text token="label" color="secondary" as="p" uppercase>
                      Email
                    </Text>
                    <Text token="body" as="p">
                      {contact.email}
                    </Text>
                    <Link href={`mailto:${contact.email}`}>Send an email</Link>
                  </Stack>
                  <Stack gap={2} as="ul">
                    <li>
                      <Link href={contact.github} external>
                        GitHub
                      </Link>
                    </li>
                    <li>
                      <Link href={contact.linkedin} external>
                        LinkedIn
                      </Link>
                    </li>
                    <li>
                      <Link href="/resume">Résumé</Link>
                    </li>
                  </Stack>
                </Stack>
              </Section>

              <Section heading="What to expect back">
                <Stack gap={4}>
                  <dl className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-2">
                    <dt>
                      <Text token="label" color="secondary" as="span" uppercase>
                        Timezone
                      </Text>
                    </dt>
                    <dd className="m-0">
                      <Text token="body" as="span">
                        {contact.timezone}
                      </Text>
                    </dd>
                    <dt>
                      <Text token="label" color="secondary" as="span" uppercase>
                        Response
                      </Text>
                    </dt>
                    <dd className="m-0">
                      <Text token="body" as="span">
                        Within a few days. If something is time-bound, say so in the subject.
                      </Text>
                    </dd>
                  </dl>
                  {/* The negative is what makes the rest credible: a page
                      promising a reply to everything promises something nobody
                      honours. */}
                  <Text token="body">
                    I read everything. I do not reply to messages with no specific ask.
                  </Text>
                </Stack>
              </Section>
            </div>
          </Reveal>
        </Stack>
      </Container>
    </>
  );
}

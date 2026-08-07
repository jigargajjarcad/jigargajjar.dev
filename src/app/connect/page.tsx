import type { Metadata } from 'next';

import { Reveal } from '@/components/motion/Reveal';
import { Container } from '@/components/primitives/Container';
import { Link } from '@/components/primitives/Link';
import { Text } from '@/components/primitives/Text';
import { contact } from '@/content/site';
import { pageMetadata } from '@/app/metadata';

/**
 * `/connect` — implemented from `docs/wireframes/06-connect.md`, which is the
 * contract. Specified by `EXPERIENCE_FLOW.md` §11 and ADR-014. Laid out by
 * ADR-030.
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
 * **The `prose` constraint is kept and its implementation changed.** The page
 * was two containers — `wide` for the heading, `prose` for everything else —
 * and because both centre with `mx-auto` the heading and the body had different
 * left edges. `max-w-prose` inside one `wide` container holds the same measure,
 * which is what "a business card that fills 1120 px stops reading as a card"
 * was protecting, while putting this page on the same 208 px content edge as
 * every other route.
 *
 * **Draft provenance.** "Currently" and the first "Open to" entry are drawn
 * from the owner's LinkedIn summary. The speaking entry and the "Less useful"
 * items are statements of appetite that no source can verify.
 *
 * This is the one surface on the site with a months-scale shelf life.
 * "Currently" is reviewed whenever a case study is added.
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

/** 24 px from a heading to what it introduces — the value every other page uses. */
function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6">
      <Text token="heading-2" as="h2">
        {heading}
      </Text>
      {children}
    </section>
  );
}

/**
 * `list-outside` with a left inset, not `list-inside`.
 *
 * Inside, the marker is part of the first line box, so a wrapped bullet returns
 * to the marker's left edge and the list loses its vertical alignment — which is
 * the entire scanning affordance a bullet list exists for. Outside gives a
 * hanging indent, and 12 px between items rather than 8 stops three lines of
 * wrapped text reading as one paragraph.
 */
function Bullets({ items, label }: { items: string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex list-outside list-disc flex-col gap-3 pl-5">
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

/** The metadata voice used on `/work` and `/workflow`: mono, uppercase, tertiary. */
function FieldLabel({ children }: { children: string }) {
  return (
    <Text token="mono" color="tertiary" as="span" uppercase>
      {children}
    </Text>
  );
}

export const metadata: Metadata = pageMetadata({
  title: 'Connect',
  description: 'What to bring, what I am open to, and what to expect back.',
  path: '/connect',
});

export default function ConnectPage() {
  return (
    <Container width="wide">
      {/*
        The page header holds the prose measure; the two paired regions break
        out to `container-wide`, which `SPACING.md` §6 sanctions for structured
        content and returns to prose immediately after.

        Wireframe §6 constrains the whole card to 68ch — "the card does not
        sprawl" — and that assumption was written against placeholder bullets of
        about 34 characters. The real ones run to 77. Two columns inside 772 px
        gives each roughly 30 characters, below the floor `TYPOGRAPHY.md` §5
        sets for comfortable reading, and every bullet wrapped to three lines
        with a one-word last line. At `wide` each column is about 42 characters
        and the same bullets set in two. ADR-030.
      */}
      <div className="pb-section-md pt-section-md">
        {/* Philosophy. Prose rather than bullets because it carries reasoning —
            it sets the shape of a good approach, and it is set as a lede so the
            page opens by answering "when should I write to you". */}
        <div className="flex max-w-prose flex-col gap-6">
          <Text token="heading-1" as="h1">
            Connect
          </Text>
          <Text token="lede" color="secondary">
            The most useful messages arrive with a specific problem attached. You do not need a
            formal brief — one paragraph about what is hard is enough to start.
          </Text>
        </div>

        {/*
          "Currently" runs at prose width rather than as the left column of a
          pair. It is one short paragraph; "Open to" and "Less useful" together
          run about three times its height, so as a column it left roughly four
          hundred pixels of empty space beneath itself and the block read as one
          column that had been padded rather than as two that had been paired.

          The regrouping is also the truer one. "Open to" and "Less useful" are
          the same question answered in both directions, and they belong beside
          each other; "Currently" answers a different question — where the work
          is now — and belongs with the lede that opens the page. DOM order is
          unchanged, so the mobile sequence is still Currently, Open to, Less
          useful.
        */}
        <Reveal>
          <div className="mt-section-md max-w-prose">
            <Section heading="Currently">
              {/* Time-sensitive. ADR-014 identifies this as the one surface on
                  the site with a months-scale shelf life. Review it whenever a
                  major project or role changes, and whenever a case study is
                  added; everything else here is durable. */}
              <Text token="body">
                Building in the open in the AI engineering space — retrieval-augmented generation,
                multi-agent orchestration, and evaluation. The current work is this site and the
                case studies behind it.
              </Text>
            </Section>
          </div>
        </Reveal>

        {/* The column gap is 64 px, matching the two-column rhythm on `/work`
            and the home page; it was 32 px, which read as one column that had
            been split rather than as two that had been paired. */}
        <Reveal>
          <div className="mt-section-lg grid gap-12 md:grid-cols-2 md:gap-x-16">
            <Section heading="Open to">
              <Bullets items={OPEN_TO} label="Open to" />
            </Section>
            <Section heading="Less useful">
              <Bullets items={LESS_USEFUL} label="Less useful" />
            </Section>
          </div>
        </Reveal>

        {/* The destination of the page. Both columns now lead with the same
            mono field label and share one grid, so "Email" on the left sits on
            the same line as "Timezone" on the right instead of being a
            differently-weighted label in a differently-shaped block. */}
        <Reveal>
          <div className="mt-section-md grid gap-12 md:grid-cols-2 md:gap-x-16">
            <Section heading="Where to reach me">
              <div className="flex flex-col gap-6">
                <dl className="grid grid-cols-1 gap-y-3 sm:grid-cols-[6rem_1fr] sm:gap-x-6">
                  <dt>
                    <FieldLabel>Email</FieldLabel>
                  </dt>
                  {/* The address is selectable plaintext beside the mailto link.
                      `mailto:` fails for readers with no configured mail client,
                      which is a real share on shared and corporate machines
                      (wireframe §4). */}
                  {/* `break-words` inherits to the address. An email has no
                      break opportunity, so its min-content width is the whole
                      string, and a grid track sized to it pushed the page 27 px
                      wider than a 320 px viewport — a horizontal scrollbar on
                      the narrowest supported width. Stacking the list below
                      `sm` is what actually fixes it; this is the guard for an
                      address longer than this one. */}
                  <dd className="m-0 flex flex-col gap-2 break-words">
                    <Text token="body" as="span">
                      {contact.email}
                    </Text>
                    <Link href={`mailto:${contact.email}`}>Send an email</Link>
                  </dd>
                  <dt>
                    <FieldLabel>Elsewhere</FieldLabel>
                  </dt>
                  <dd className="m-0">
                    <ul className="flex flex-col gap-3">
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
                    </ul>
                  </dd>
                </dl>
              </div>
            </Section>

            <Section heading="What to expect back">
              <div className="flex flex-col gap-6">
                <dl className="grid grid-cols-1 gap-y-3 sm:grid-cols-[6rem_1fr] sm:gap-x-6">
                  <dt>
                    <FieldLabel>Timezone</FieldLabel>
                  </dt>
                  <dd className="m-0">
                    <Text token="body" as="span">
                      {contact.timezone}
                    </Text>
                  </dd>
                  <dt>
                    <FieldLabel>Response</FieldLabel>
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
                <Text token="body" color="secondary">
                  I read everything. I do not reply to messages with no specific ask.
                </Text>
              </div>
            </Section>
          </div>
        </Reveal>
      </div>
    </Container>
  );
}

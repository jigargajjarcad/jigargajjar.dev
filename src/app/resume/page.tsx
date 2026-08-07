import type { Metadata } from 'next';
import NextLink from 'next/link';

import { ProfileMarks } from '@/components/content/ProfileMarks';
import { Container } from '@/components/primitives/Container';
import { Link } from '@/components/primitives/Link';
import { Text } from '@/components/primitives/Text';
import { loadCaseStudySlugs } from '@/content/loader';
import { pageMetadata } from '@/app/metadata';
import {
  NAME,
  POSITIONING,
  contact,
  education,
  experience,
  projects,
  technologies,
} from '@/content/resume';

/**
 * `/resume` — implemented from `docs/wireframes/07-resume.md`, which is the
 * contract. Specified by `ROUTE_SPECIFICATIONS.md` §3. Laid out by ADR-032.
 *
 * Written for a recruiter scanning between meetings: role, seniority, and a
 * forwarding path without hunting. The measure stays capped at `prose` on every
 * viewport — a résumé that fills a 1440 px window is unreadable — so the desktop
 * treatment adds a metadata column rather than width (wireframe §6).
 *
 * **The prose cap is kept and its implementation changed** (ADR-032, following
 * ADR-030). The page was a bare `Container width="prose"`, which centres, so its
 * content edge sat at 382 px while every other route on the site sat at 208 px.
 * `max-w-prose` inside a `wide` container holds exactly the same 68ch measure and
 * puts the résumé on the same edge as the rest of the site.
 *
 * **Sections render only when they carry data.** `INTERACTION.md` §8 requires
 * absence to be expressed by absence, because a placeholder tells the reader
 * something exists that they cannot reach.
 *
 * Project entries link to their case study only once it is published. A draft
 * has no route, so an unconditional link would 404 and fail gate 12.
 *
 * Nothing on this route animates. The whole document is a scan surface, and an
 * entrance reveal on a résumé delays the one thing the reader came for.
 */

/**
 * One entry — a role or a project — as the wireframe's metadata column: the
 * fixed, scannable facts on the left, the heading and prose on the right.
 *
 * **The column is kept and the document is widened, because at `prose` the two
 * cannot both be right** (ADR-032). The longest period, "November 2022 —
 * January 2025", sets at 253 px in mono. Inside a 772 px measure that column
 * leaves the description about 43 characters, and `TYPOGRAPHY.md` §5 is explicit
 * that "below 50, the eye returns too frequently and the reader loses rhythm".
 * The column as drawn was 192 px, which wrapped *all five* periods onto two
 * lines and still only reached 49 characters.
 *
 * Three constraints, and only two fit at 772 px: §6's metadata column, §6's 68ch
 * container, and §5's floor on measure. At `container-wide` all three hold — the
 * column is 288 px, the description is 712 px, and that is 63 characters, which
 * is inside §5's range rather than under it. §6's concern is stated as "a résumé
 * that fills a 1440 px viewport is unreadable", and what makes it unreadable is
 * the measure, not the container: the measure is still capped, at 63.
 *
 * 288 px is the width of the longest thing that has to sit on one line — the
 * periods at 253 px and "AI INFRASTRUCTURE ENGINEERING" at 262 px — not a round
 * number chosen first and tested after.
 *
 * `items-baseline` puts the metadata's first line on the same baseline as the
 * role. Top-aligned, a 14.5 px mono line and a 24 px serif heading start at
 * different optical heights and the columns read as slipped.
 */
function Entry({ meta, children }: { meta: React.ReactNode; children: React.ReactNode }) {
  return (
    <div
      data-print-keep
      className="grid gap-1 lg:grid-cols-[18rem_1fr] lg:items-baseline lg:gap-x-6"
    >
      {/* The call site owns the voices inside the column: a period and an
          employer are not the same kind of fact, and setting both in one string
          pushed the column to two wrapped lines at every entry. */}
      <div className="flex flex-col gap-1">{meta}</div>
      {/* `max-w-prose` matters only between `md` and `lg`, where the metadata
          column has not engaged yet and the entry is a single column: without it
          the description ran the full container — 960 px, or 85 characters, past
          the 75 `TYPOGRAPHY.md` §5 calls the point where "the return sweep
          becomes unreliable". Above `lg` the column is already 712 px, so the cap
          never binds. */}
      <div className="flex max-w-prose flex-col gap-2">{children}</div>
    </div>
  );
}

/**
 * `section-md` above every `<h2>` and 24 px below it.
 *
 * Both values come from elsewhere rather than from this page. `SPACING.md` §5
 * fixes `/resume` at `default` density, whose section rhythm is `md`; the page
 * previously used a flat 64 px, which is not on the section scale at all and
 * left the résumé the one route pacing itself differently from the site. The
 * 24 px from a heading to what it introduces is the value `/work`, `/workflow`,
 * `/about` and `/connect` all use. Experience alone used 32 px, for no reason
 * that survived being looked for.
 *
 * Print compresses `--space-section-*` in `globals.css`; without that remap this
 * change would have added roughly a page and a half to the PDF.
 */
function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mt-section-md flex flex-col gap-6">
      <Text token="heading-2" as="h2">
        {heading}
      </Text>
      {children}
    </section>
  );
}

export const metadata: Metadata = pageMetadata({
  title: 'Résumé',
  description:
    'Experience, engineering projects, technologies and education. Also available as a PDF.',
  path: '/resume',
});

export default function ResumePage() {
  const published = new Set(loadCaseStudySlugs());

  return (
    <Container width="wide">
      <div className="pb-section-md pt-section-md">
        {/* ── Header ─────────────────────────────────────────────────────
            Positioning verbatim the same sentence as `/` band 1 — a résumé that
            says something the site does not is a discrepancy a recruiter will
            notice (wireframe §9). */}
        <div className="flex max-w-prose flex-col gap-6">
          <Text token="heading-1" as="h1">
            {NAME}
          </Text>
          <Text token="lede" color="secondary">
            {POSITIONING}
          </Text>

          {/*
            Contact, in the site's own icon language rather than as a row of raw
            hyperlinks — ADR-032, extending ADR-031's mark row to a third
            surface. Location stays as text: it is a fact, not a destination,
            and there is no glyph that means "Gujarat".
          */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {contact.location ? (
              <Text token="body-sm" color="secondary" as="span">
                {contact.location}
              </Text>
            ) : null}
            <div data-print-hide>
              <ProfileMarks label="Profiles and direct contact" />
            </div>
          </div>

          {/*
            Paper cannot be clicked, and an envelope glyph with no address beside
            it is useless on a printed résumé — it is also the form an ATS parser
            reads. The marks are hidden in print and this line takes their place,
            carrying the same four destinations as selectable, extractable text.
            `ProfileMarks` keeps its visually-hidden labels for screen readers;
            this is the same information for the printed page.
          */}
          <p data-print-only className="text-type-body-sm font-text text-color-text-secondary">
            {[contact.email, 'github.com/jigargajjarcad', 'linkedin.com/in/jigar-gajjar-cad'].join(
              '  ·  ',
            )}
          </p>

          {/*
            Part of the document, not an aside beside it. This was a `body-sm`
            text link sitting under the contact row, which is where a reader's
            eye has already stopped — findable only by someone looking for it.
            It takes the `action` variant the home page uses for its primary
            calls to action: a hairline border on a 44 px target. That is the
            site's existing interaction language rather than a new button style,
            and it is quiet by construction — no fill, no accent, no shadow.

            `self-start` so it is sized by its label rather than stretching the
            full measure, which would make it the loudest object on the page.
          */}
          <div data-print-hide className="mt-2 self-start">
            <Link href="/resume.pdf" variant="action">
              Download as PDF
            </Link>
          </div>
        </div>

        {experience.length > 0 ? (
          <Section heading="Experience">
            {/* Entries are separated by 40 px against the 8 px inside one, so the
                boundary between two roles is unambiguous without a rule between
                them (`SPACING.md` §4 — space, not rules). */}
            <div className="flex flex-col gap-10">
              {experience.map((entry) => (
                <Entry
                  key={`${entry.organisation}-${entry.role}`}
                  meta={
                    <>
                      {/* `time` wraps the period alone — the machine-readable
                          claim is the date, not the employer. Wireframe §11 puts
                          dates before the role in source, as read. */}
                      <Text token="mono" color="tertiary" as="span" uppercase>
                        <time dateTime={entry.start}>{entry.period}</time>
                      </Text>
                      {/* The employer stays in the sans at `body-sm`, not the
                          mono tertiary of the period. A recruiter scans for
                          company names, and tertiary is the quietest colour on
                          the page — the date is metadata, the employer is not. */}
                      <Text token="body-sm" color="secondary" as="span">
                        {entry.organisation}
                      </Text>
                    </>
                  }
                >
                  <Text token="heading-3" as="h3">
                    {entry.role}
                  </Text>
                  {entry.summary ? <Text token="body">{entry.summary}</Text> : null}
                </Entry>
              ))}
            </div>
          </Section>
        ) : null}

        {/* ── Engineering projects ───────────────────────────────────────
            Renamed from "Selected work" and expanded — ADR-032. Set in the same
            two-column rhythm as Experience, with the stack occupying the
            position an employer's dates occupy, so the page reads as one
            document rather than as two lists that happen to share a page. */}
        <Section heading="Engineering projects">
          <div className="flex flex-col gap-10">
            {projects.map((project) => (
              <Entry
                key={project.slug}
                meta={
                  <Text token="mono" color="tertiary" as="span" uppercase>
                    {project.kind}
                  </Text>
                }
              >
                {/* The title takes `/work`'s treatment, not the prose link's.
                    `Link`'s default variant is `prose` — accent plus a
                    hairline underline — which on a 24 px serif heading reads as
                    a hyperlink dropped into a document rather than as a title
                    that happens to be reachable, and prints as an underlined
                    blue heading. Primary with a hover colour change is what
                    `/work` uses for exactly this, and it costs nothing on
                    paper. */}
                <Text token="heading-3" as="h3">
                  {published.has(project.slug) ? (
                    <NextLink
                      href={`/work/${project.slug}`}
                      className="text-color-text-primary no-underline transition-colors duration-fast ease-standard hover:text-color-interactive"
                    >
                      {project.name}
                    </NextLink>
                  ) : (
                    project.name
                  )}
                </Text>
                <Text token="body">{project.description}</Text>
                {/* The stack closes the entry rather than leading it, exactly as
                    on `/work`: it is the least useful line to a reader deciding
                    whether to keep reading, and the most useful to one who has
                    already decided. Too wide for any metadata column — the
                    longest runs 559 px — which is the other half of why the
                    column went. */}
                <Text token="mono" color="tertiary" as="span">
                  {project.stack.join(' · ')}
                </Text>
              </Entry>
            ))}
          </div>
        </Section>

        {/* ── Technologies ───────────────────────────────────────────────
            A grouped definition list, never a skills matrix: no proficiency
            ratings, no bars, no star counts. Those are unverifiable claims
            presented as data (wireframe §4).

            The group labels take the mono uppercase tertiary voice ADR-029
            settled on for metadata across the site; they were `label`, a 14 px
            semibold sans, which is the same weight as the values beside them, so
            the list read as two columns of content rather than as keys and
            values. */}
        <Section heading="Technologies">
          <dl className="grid gap-1 md:grid-cols-[18rem_1fr] md:gap-x-6">
            {technologies.map((group) => (
              <div key={group.group} className="contents">
                <dt>
                  <Text token="mono" color="tertiary" as="span" uppercase>
                    {group.group}
                  </Text>
                </dt>
                <dd className="m-0">
                  <Text token="body" as="span">
                    {group.items.join(' · ')}
                  </Text>
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        {education.length > 0 ? (
          <Section heading="Education">
            {/* Same two-column grid as Technologies, so the three metadata
                columns on this page — dates, stacks, group labels — all begin on
                one vertical line. */}
            <dl className="grid gap-1 md:grid-cols-[18rem_1fr] md:gap-x-6">
              {education.map((entry) => (
                <div key={entry.qualification} className="contents">
                  <dt>
                    <Text token="mono" color="tertiary" as="span">
                      {entry.year}
                    </Text>
                  </dt>
                  <dd className="m-0">
                    <Text token="body" as="span">
                      {`${entry.qualification}, ${entry.institution}`}
                    </Text>
                  </dd>
                </div>
              ))}
            </dl>
          </Section>
        ) : null}
      </div>
    </Container>
  );
}

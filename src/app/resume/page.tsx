import type { Metadata } from 'next';

import { Container } from '@/components/primitives/Container';
import { Link } from '@/components/primitives/Link';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';
import { loadCaseStudySlugs } from '@/content/loader';
import { pageMetadata } from '@/app/metadata';
import {
  NAME,
  POSITIONING,
  contact,
  education,
  experience,
  selectedWork,
  technologies,
} from '@/content/resume';

/**
 * `/resume` — implemented from `docs/wireframes/07-resume.md`, which is the
 * contract. Specified by `ROUTE_SPECIFICATIONS.md` §3.
 *
 * Written for a recruiter scanning between meetings on a phone: role,
 * seniority, and a forwarding path without scrolling. The measure stays capped
 * at `prose` on every viewport — a résumé that fills a 1440 px window is
 * unreadable — so the desktop treatment adds a metadata column rather than
 * width (wireframe §6).
 *
 * **Sections render only when they carry data.** Experience and Education are
 * owner-supplied and currently empty, so they are omitted rather than rendered
 * as placeholders: `INTERACTION.md` §8 requires absence to be expressed by
 * absence, because a placeholder tells the reader something exists that they
 * cannot reach.
 *
 * Selected-work entries link to their case study only once it is published. A
 * draft has no route, so an unconditional link would 404 and fail gate 12.
 *
 * Nothing on this route animates. The whole document is a scan surface, and an
 * entrance reveal on a résumé delays the one thing the reader came for.
 */

type ContactItem = { label: string; href: string };

function ContactLine() {
  const links: ContactItem[] = [{ label: 'GitHub', href: contact.github }];
  if (contact.email) links.unshift({ label: contact.email, href: `mailto:${contact.email}` });
  if (contact.linkedin) links.push({ label: 'LinkedIn', href: contact.linkedin });

  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {contact.location ? (
        <li>
          <Text token="body-sm" color="secondary" as="span">
            {contact.location}
          </Text>
        </li>
      ) : null}
      {links.map((item) => (
        <li key={item.href}>
          <Link href={item.href} external={item.href.startsWith('http')}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export const metadata: Metadata = pageMetadata({
  title: 'Résumé',
  description: 'Experience, selected work, technologies and education. Also available as a PDF.',
  path: '/resume',
});

export default function ResumePage() {
  const published = new Set(loadCaseStudySlugs());

  return (
    <Container width="prose">
      <Stack gap={16}>
        {/* ── Header ─────────────────────────────────────────────────────
            Positioning and contact above the fold. Verbatim the same sentence
            as `/` band 1 — a résumé that says something the site does not is a
            discrepancy a recruiter will notice (wireframe §9). */}
        <Stack gap={6}>
          <Text token="heading-1" as="h1">
            {NAME}
          </Text>
          <Text token="body">{POSITIONING}</Text>
          <ContactLine />
          {/* Present, not prominent (wireframe §4). On mobile the HTML is the
              better experience — pinch-zooming a PDF on a phone is worse in
              every respect — so the reader is not pushed toward it. The file is
              generated from this page by `npm run resume:pdf`, never authored
              separately, so the two cannot disagree. */}
          <p data-print-hide className="text-type-body-sm font-text text-color-text-secondary">
            <Link href="/resume.pdf">Download as PDF</Link>
          </p>
        </Stack>

        {experience.length > 0 ? (
          <Stack gap={8} as="section">
            <Text token="heading-2" as="h2">
              Experience
            </Text>
            {/* Desktop places dates and organisation in a metadata column over a
                single DOM order — dates precede their role in source, as read
                (wireframe §11). Content never splits across columns. */}
            <Stack gap={8}>
              {experience.map((entry) => (
                <div
                  key={`${entry.organisation}-${entry.role}`}
                  data-print-keep
                  className="grid gap-2 lg:grid-cols-[12rem_1fr] lg:gap-x-6"
                >
                  <div className="flex flex-col gap-1">
                    <Text token="body-sm" color="secondary" as="span">
                      <time dateTime={entry.start}>{entry.period}</time>
                    </Text>
                    <Text token="body-sm" color="secondary" as="span">
                      {entry.organisation}
                    </Text>
                  </div>
                  <Stack gap={2}>
                    <Text token="heading-3" as="h3">
                      {entry.role}
                    </Text>
                    {entry.summary ? <Text token="body">{entry.summary}</Text> : null}
                  </Stack>
                </div>
              ))}
            </Stack>
          </Stack>
        ) : null}

        {/* ── Selected work ──────────────────────────────────────────────
            The bridge to `/work`. Names become links as case studies publish. */}
        <Stack gap={6} as="section">
          <Text token="heading-2" as="h2">
            Selected work
          </Text>
          <Stack gap={4} as="ul">
            {selectedWork.map((work) => (
              <li key={work.slug}>
                <Text token="body" as="span">
                  {published.has(work.slug) ? (
                    <Link href={`/work/${work.slug}`}>{work.name}</Link>
                  ) : (
                    work.name
                  )}
                  {` — ${work.description}`}
                </Text>
              </li>
            ))}
          </Stack>
        </Stack>

        {/* ── Technologies ───────────────────────────────────────────────
            A grouped definition list, never a skills matrix: no proficiency
            ratings, no bars, no star counts. Those are unverifiable claims
            presented as data (wireframe §4). */}
        <Stack gap={6} as="section">
          <Text token="heading-2" as="h2">
            Technologies
          </Text>
          <dl className="grid gap-3 md:grid-cols-[8rem_1fr] md:gap-x-6">
            {technologies.map((group) => (
              <div key={group.group} className="contents">
                <dt>
                  <Text token="label" color="secondary" as="span" uppercase>
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
        </Stack>

        {education.length > 0 ? (
          <Stack gap={6} as="section">
            <Text token="heading-2" as="h2">
              Education
            </Text>
            <Stack gap={3} as="ul">
              {education.map((entry) => (
                <li key={entry.qualification}>
                  <Text token="body" as="span">
                    {`${entry.qualification}, ${entry.institution}, ${entry.year}`}
                  </Text>
                </li>
              ))}
            </Stack>
          </Stack>
        ) : null}
      </Stack>
    </Container>
  );
}

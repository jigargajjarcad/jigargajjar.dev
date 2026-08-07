// Type-only, so it disappears at compile time and creates no runtime edge from
// content to components. `IconName` is the authority on which glyphs are drawn,
// and `PROFILE_LINKS` below has to name four of them.
import type { IconName } from '@/components/primitives/Icon';

/**
 * Canonical site identity — `FOUNDATION.md` §5.
 *
 * §5: "This sentence is the site's thesis. It appears verbatim in the primary
 * position on the home page. It is not paraphrased, softened, or A/B varied
 * across surfaces, because inconsistent positioning reads as uncertainty about
 * one's own claim."
 *
 * It is defined once here and imported by every surface that renders it — the
 * homepage `<h1>`, the document metadata, the résumé header — and by the test
 * that asserts it. Previously the sentence was written out in six places and
 * drifted from the owner's LinkedIn profile without anything catching it.
 * A constant cannot disagree with itself.
 *
 * Prose in `FOUNDATION.md` and `README.md` must be updated by hand when this
 * changes; those are documents, not consumers.
 */

/**
 * The production origin — `ARCHITECTURE.md` §13, custom domain `jigargajjar.dev`.
 *
 * Canonical URLs, Open Graph URLs, the sitemap and robots all resolve against
 * this one constant. It was previously written out separately in `sitemap.ts`
 * and `robots.ts`, which is two places for a value that must never disagree.
 */
export const ORIGIN = 'https://jigargajjar.dev';

export const NAME = 'Jigar Gajjar';

export const POSITIONING =
  'AI-Native Full-Stack Engineer designing reliable software systems through ' +
  'architecture, orchestration, and verification.';

/**
 * Owner-supplied, 2026-08-05. Shared by `/resume` and `/connect` so the two
 * cannot list different addresses.
 *
 * Region only, never the street address: a home address on a public, indexed
 * page invites unsolicited contact and cannot be retracted. No telephone
 * number — neither route's specification has a field for one.
 *
 * `timezone` is derived from `location` and is stated because `/connect`
 * resolves ledger question R4, which is a recruiter asking when this person is
 * reachable.
 */
export const contact = {
  location: 'Gujarat, India',
  timezone: 'IST (UTC+5:30)',
  email: 'jigargajjarcad@gmail.com',
  github: 'https://github.com/jigargajjarcad',
  linkedin: 'https://www.linkedin.com/in/jigar-gajjar-cad',
} as const;

/**
 * The four places this person can be reached, as one list — ADR-031.
 *
 * The footer and `/connect` both render these marks. Defined twice they would
 * drift: the résumé path or a profile URL changes in one place, and the other
 * keeps pointing at the old one with nothing to catch it. `icon` is typed as
 * `IconName`, so a mark with no glyph is a compile error rather than a blank
 * square, and `external` decides `target`/`rel` at both call sites from a
 * single fact instead of two hand-written attribute sets.
 *
 * Order is deliberate and shared: the two profiles a reader is most likely to
 * check, then the two direct routes to the owner.
 */
export const PROFILE_LINKS: readonly {
  href: string;
  label: string;
  icon: IconName;
  external: boolean;
}[] = [
  { href: contact.github, label: 'GitHub', icon: 'github', external: true },
  { href: contact.linkedin, label: 'LinkedIn', icon: 'linkedin', external: true },
  { href: `mailto:${contact.email}`, label: 'Email', icon: 'mail', external: false },
  { href: '/resume', label: 'Résumé', icon: 'document', external: false },
];

/**
 * The one-line availability statement, shared by the footer and the homepage's
 * closing band. `/connect` carries the full version — this is its summary, and
 * it exists as a constant for the same reason `POSITIONING` does: it was
 * written out in three places and two of them went stale.
 *
 * Reviewed alongside `/connect` whenever availability changes (ADR-014).
 */
export const AVAILABILITY =
  'Open to AI Engineer and Full-Stack roles, and collaboration on AI infrastructure.';

/**
 * The line beneath the home page's opening statement — ADR-024.
 *
 * **This replaced `POSITIONING` in that slot, and the swap is the point.**
 * "AI-Native Full-Stack Engineer designing reliable software systems through
 * architecture, orchestration, and verification" is an accurate description of a
 * category. It is the right sentence to hand a search engine, which is where it
 * still lives — `POSITIONING` is unchanged and remains the document
 * description. It was the wrong sentence to put under a claim, because a
 * category cannot explain a claim; it can only restate it in duller words.
 *
 * This sentence explains what "survive production" means, in the words an
 * engineer would actually use, and it is a position someone could disagree
 * with — which is what makes it worth reading and worth remembering.
 *
 * It is also the only sentence on the home page written in a human voice rather
 * than a technical one, and one is the correct number.
 */
export const VOICE =
  'I care more about what a system does when it fails than what it does when it works.';

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
 * The one-line availability statement, shared by the footer and the homepage's
 * closing band. `/connect` carries the full version — this is its summary, and
 * it exists as a constant for the same reason `POSITIONING` does: it was
 * written out in three places and two of them went stale.
 *
 * Reviewed alongside `/connect` whenever availability changes (ADR-014).
 */
export const AVAILABILITY =
  'Open to AI Engineer and Full-Stack roles, and collaboration on AI infrastructure.';

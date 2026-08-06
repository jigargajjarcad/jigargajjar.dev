import type { Metadata } from 'next';

import { ORIGIN } from '@/content/site';

/**
 * Per-route metadata construction — `ARCHITECTURE.md` §3.
 *
 * Every route builds its metadata here rather than assembling the same five
 * fields by hand. Before this existed, all eleven pages rendered the identical
 * `<title>` and description: indistinguishable in a tab strip, in a search
 * result, and in a shared link.
 *
 * **No image is declared.** The Open Graph image routes specified in §4 are not
 * implemented, and the `cover` assets they would consume do not exist on disk
 * (ADR-017 records this as latent). A card with no image renders as text on
 * every platform; a card pointing at a missing image renders as broken. The
 * omission is deliberate and should be revisited when the image routes land.
 *
 * `twitter.card` is therefore `summary` rather than `summary_large_image`,
 * which is the correct type for a card carrying no image.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
}: {
  /** Slots into the `%s · jigargajjar.dev` template set by the root layout. */
  title: string;
  /** What the page actually contains. Not a pitch for it. */
  description: string;
  /** Route path with a leading slash; the empty string for the home page. */
  path: string;
  type?: 'website' | 'article';
}): Metadata {
  const url = `${ORIGIN}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type, siteName: 'jigargajjar.dev', title, description, url },
    twitter: { card: 'summary', title, description },
  };
}

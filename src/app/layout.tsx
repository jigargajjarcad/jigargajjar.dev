import type { Metadata } from 'next';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SkipLink } from '@/components/layout/SkipLink';
import { ThemeScript } from '@/components/layout/ThemeScript';
import { ORIGIN, POSITIONING } from '@/content/site';

import '../styles/globals.css';

/**
 * Application shell. ARCHITECTURE.md §2 — layouts are server components and
 * ship no JavaScript of their own; the interactive leaves inside the header and
 * footer are the only client boundaries.
 *
 * Landmarks per ACCESSIBILITY.md §8: banner, main, contentinfo. The skip link
 * is the first focusable element on every page (§4).
 */
/**
 * Root defaults. `metadataBase` resolves the relative URLs that per-route
 * metadata produces; the title template gives every page a distinguishable tab
 * without each one repeating the site name.
 */
export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN),
  title: { default: 'jigargajjar.dev', template: '%s · jigargajjar.dev' },
  description: POSITIONING,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* TYPOGRAPHY.md §5 — both preloaded. There are only two, every route
            needs both, and preloading is what makes `swap` imperceptible.
            `crossOrigin` is required on font preloads even same-origin: without
            it the browser fetches twice. Inter Italic was dropped to meet the
            §10 budget (§5, reduction 3). */}
        <link
          rel="preload"
          href="/fonts/inter-variable-roman.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/newsreader-variable-roman.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <ThemeScript />
      </head>
      <body className="bg-color-surface-base text-color-text-primary">
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SkipLink } from '@/components/layout/SkipLink';
import { ThemeScript } from '@/components/layout/ThemeScript';
import { Container } from '@/components/primitives/Container';

import '../styles/globals.css';

/**
 * Application shell. ARCHITECTURE.md §2 — layouts are server components and
 * ship no JavaScript of their own; the interactive leaves inside the header and
 * footer are the only client boundaries.
 *
 * Landmarks per ACCESSIBILITY.md §8: banner, main, contentinfo. The skip link
 * is the first focusable element on every page (§4).
 */
export const metadata: Metadata = {
  title: 'jigargajjar.dev',
  description:
    'Senior Full-Stack Engineer building production systems through an AI-native engineering workflow.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-color-surface-base text-color-text-primary">
        <SkipLink />
        <Header />
        <main id="main">
          <Container width="wide">
            <div className="py-section-md">{children}</div>
          </Container>
        </main>
        <Footer />
      </body>
    </html>
  );
}

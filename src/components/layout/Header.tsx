import NextLink from 'next/link';

import { Container } from '@/components/primitives/Container';

import { MobileNav } from './MobileNav';
import { Nav } from './Nav';
import { ThemeControl } from './ThemeControl';

/**
 * COMPONENT_GUIDELINES.md §3.1 and `docs/wireframes/README.md` §4.
 *
 * Wordmark left; navigation right; theme control adjacent. Separated from
 * content by a hairline.
 *
 * Not sticky — it consumes vertical space on the surface where it matters most,
 * and a sticky element is the commonest cause of focus being obscured
 * (WCAG 2.2, 2.4.11).
 *
 * The theme control appears at `--bp-sm` and above only; below it the control
 * moves to the footer, so exactly one exists at any width.
 */
export function Header() {
  return (
    <header className="border-b-hairline border-color-border-subtle">
      <Container width="wide">
        <div className="flex min-h-target-min items-center justify-between gap-4 py-4">
          <NextLink
            href="/"
            className="font-display text-type-heading-4 text-color-text-primary no-underline"
          >
            Jigar Gajjar
          </NextLink>
          <div className="flex items-center gap-6">
            <nav aria-label="Primary" className="hidden sm:block">
              <Nav />
            </nav>
            <div className="hidden sm:block">
              <ThemeControl />
            </div>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}

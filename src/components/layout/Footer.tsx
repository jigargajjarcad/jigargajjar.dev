import { Container } from '@/components/primitives/Container';
import { Link } from '@/components/primitives/Link';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';

import { ThemeControl } from './ThemeControl';

/**
 * COMPONENT_GUIDELINES.md §3.3 and `docs/wireframes/README.md` §4.
 *
 * The terminal action for every route (ARCHITECTURE.md §4 — no route is a dead
 * end). It resolves ledger R5 and C9 everywhere, and it is retained alongside
 * `/connect` rather than replaced by it: a reader decides mid-page, and a route
 * cannot reach that moment (ADR-014).
 *
 * The address is selectable plaintext beside the `mailto:` link — `mailto:`
 * fails for readers without a configured mail client (INTERACTION.md §16).
 *
 * The theme control appears here below `--bp-sm` only; above it the control
 * lives in the header.
 */
const EMAIL = 'jigargajjarcad@gmail.com';

export function Footer() {
  return (
    <footer className="mt-section-lg border-t-hairline border-color-border-subtle">
      <Container width="wide">
        <div className="py-section-sm">
          <Stack gap={6}>
            <Text as="h2" token="heading-4">
              Get in touch
            </Text>
            <Text token="body" color="secondary">
              Open to senior engineering roles and collaboration on AI infrastructure.
            </Text>
            <Stack gap={2} as="ul">
              <li className="list-none">
                <Text token="body-sm" color="secondary" as="span">
                  {EMAIL}
                </Text>{' '}
                <Link href={`mailto:${EMAIL}`}>Send an email</Link>
              </li>
              <li className="list-none">
                <Link href="https://github.com/jigargajjarcad" external>
                  GitHub
                </Link>
              </li>
              <li className="list-none">
                <Link href="https://www.linkedin.com/in/jigargajjar" external>
                  LinkedIn
                </Link>
              </li>
              <li className="list-none">
                <Link href="/resume">Résumé</Link>
              </li>
            </Stack>
            <div className="sm:hidden">
              <ThemeControl />
            </div>
            <Text token="caption" color="tertiary">
              © 2026 Jigar Gajjar
            </Text>
          </Stack>
        </div>
      </Container>
    </footer>
  );
}

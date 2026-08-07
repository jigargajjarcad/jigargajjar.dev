import { Container } from '@/components/primitives/Container';
import { Icon, type IconName } from '@/components/primitives/Icon';
import { Text } from '@/components/primitives/Text';
import { NAME, contact } from '@/content/site';

import { ThemeControl } from './ThemeControl';

/**
 * The end of every route — COMPONENT_GUIDELINES.md §3.3, rewritten by ADR-024.
 *
 * **It used to be the contact section again.** A heading, the availability
 * sentence, the address, and four text links — all of which the home page had
 * just said one screen above. Repeating a section verbatim beneath itself is the
 * clearest signal a page can send that it does not trust the reader to have read
 * it, and on every other route it was simply four links wearing a paragraph.
 *
 * What remains is one row: the wordmark, four marks, the year. It still answers
 * `ARCHITECTURE.md` §4 — no route is a dead end — and it now does so at the
 * weight a footer should carry, which is barely any.
 *
 * **The icons keep their names.** `ICONOGRAPHY.md` §6 is explicit that an icon
 * never carries meaning alone; each link has a visually-hidden label, so the
 * accessible name is a word and the icon is reinforcement. That is also what
 * keeps the row usable at 44 px targets rather than becoming a puzzle.
 */

const LINKS: readonly { href: string; label: string; icon: IconName; external: boolean }[] = [
  { href: contact.github, label: 'GitHub', icon: 'github', external: true },
  { href: contact.linkedin, label: 'LinkedIn', icon: 'linkedin', external: true },
  { href: `mailto:${contact.email}`, label: 'Email', icon: 'mail', external: false },
  { href: '/resume', label: 'Résumé', icon: 'document', external: false },
];

export function Footer() {
  return (
    <footer className="mt-section-sm border-t-hairline border-color-border-subtle">
      <Container width="wide">
        <div className="flex flex-col gap-8 py-section-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <Text token="mono" color="tertiary">
              © 2026 {NAME}
            </Text>
            {/* The address stays selectable plaintext beside the mail link:
                `mailto:` fails for a reader with no configured mail client
                (INTERACTION.md §16), and a footer is where they look for it. */}
            <Text token="mono" color="tertiary">
              {contact.email}
            </Text>
          </div>

          <div className="flex items-center gap-2">
            <ul className="flex list-none items-center gap-1">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'me noopener noreferrer' } : {})}
                    className="flex min-h-target-min min-w-target-min items-center justify-center rounded-sm text-color-text-tertiary transition-colors duration-fast ease-standard hover:text-color-text-primary"
                  >
                    <Icon name={link.icon} size="md" />
                    <span className="sr-only">
                      {link.label}
                      {link.external ? ' (opens in a new tab)' : ''}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            {/* Below `--bp-sm` the theme control lives here; above it, in the
                header. Exactly one exists at any width. */}
            <div className="sm:hidden">
              <ThemeControl />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

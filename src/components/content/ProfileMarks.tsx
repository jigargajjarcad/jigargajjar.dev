import { Icon } from '@/components/primitives/Icon';
import { PROFILE_LINKS } from '@/content/site';

/**
 * The four destinations as marks — `ICONOGRAPHY.md` §6, ADR-031, extended to
 * `/resume` by ADR-032.
 *
 * **This is not a new pattern; it is the third copy of an existing one.** The
 * row was written in `Footer.tsx`, written again on `/connect`, and `/resume`
 * needs the same four marks in the same order. Three hand-maintained copies of
 * one row drift — in colour, in `rel`, in whether a label is hidden — so the
 * markup moves here and the pages choose a tone.
 *
 * Every mark keeps a visually-hidden label, so the accessible name is a word and
 * the glyph is reinforcement. That is the condition §6 attaches to every
 * icon-only control, and it is why this component owns the label rather than
 * leaving it to each call site.
 *
 * `tone` exists because §6's last clause — an icon is never the sole indicator
 * that something is interactive — binds differently by position. In a footer,
 * placement and convention carry it and the marks stay tertiary. In page
 * content they are the actions the surface exists to offer, and colour is what
 * carries the affordance once the words are gone.
 *
 * `hang` cancels the 12 px a 20 px glyph sits inside its own 44 px target, so a
 * left-aligned row starts on the text edge rather than 12 px inside it. The
 * target stays 44 px square either way (`ACCESSIBILITY.md` §7); only the optical
 * edge moves.
 */
export function ProfileMarks({
  tone = 'link',
  hang = true,
  label = 'Profiles and direct contact',
}: {
  tone?: 'muted' | 'link';
  hang?: boolean;
  label?: string;
}) {
  const colour =
    tone === 'muted'
      ? 'text-color-text-tertiary hover:text-color-text-primary'
      : 'text-color-text-accent hover:text-color-interactive-hover active:text-color-interactive-pressed';

  return (
    <ul aria-label={label} className={`flex list-none items-center gap-1 ${hang ? '-ml-3' : ''}`}>
      {PROFILE_LINKS.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            {...(link.external ? { target: '_blank', rel: 'me noopener noreferrer' } : {})}
            className={`flex min-h-target-min min-w-target-min items-center justify-center rounded-sm transition-colors duration-fast ease-standard ${colour}`}
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
  );
}

import type { ReactNode } from 'react';

/**
 * Generic card — `COMPONENT_GUIDELINES.md` §4.2.
 *
 * "Used for grouped content within a case study. Same surface and border
 * treatment; no hover state, because it is not interactive. A card that does
 * not link should never appear interactive."
 *
 * The surface and border are the default state of the project card (§4.1):
 * `--color-surface-raised` with a 1 px `--color-border-subtle`. None of §4.1's
 * hover, focus or active treatments are carried across — that difference is the
 * component's entire purpose. Elevation is surface lightness plus a hairline
 * border, never a shadow (`COLOR_SYSTEM.md` §6).
 */
export function Card({
  as: Tag = 'div',
  children,
}: {
  as?: 'div' | 'section' | 'li';
  children: ReactNode;
}) {
  return (
    <Tag className="rounded-md border-hairline border-color-border-subtle bg-color-surface-raised p-6">
      {children}
    </Tag>
  );
}

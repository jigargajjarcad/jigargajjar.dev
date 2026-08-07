import type { SVGProps } from 'react';

/**
 * Icon set. ICONOGRAPHY.md §2 — inline SVG, no library. §3 — 24 grid, 20 live
 * area, 1.5 stroke, `currentColor`, no fills, round caps and joins.
 *
 * §6 — icons never carry meaning alone. Every icon here is `aria-hidden`; the
 * accessible name comes from the control that contains it.
 *
 * Only the six icons the application shell needs are drawn. The set is closed
 * at fifteen (§7); the remaining nine arrive with their consumers.
 */
export type IconName =
  | 'menu'
  | 'close'
  | 'sun'
  | 'moon'
  | 'monitor'
  | 'arrow-up-right'
  | 'mail'
  | 'document'
  | 'github'
  | 'linkedin';

/**
 * Brand marks — ADR-024, and the single exception to §3's stroke grammar.
 *
 * §3 specifies 1.5 stroke, no fills, `currentColor`. Applied to GitHub's and
 * LinkedIn's marks that rule produces outlines nobody recognises, which is the
 * one failure an icon cannot survive: these are not our icons, they are
 * reproductions of someone else's, and their recognisability *is* their meaning.
 * They are drawn filled, at the same 24 grid and the same `currentColor`, so
 * they sit correctly beside the set without pretending to belong to it.
 */
const BRAND: ReadonlySet<IconName> = new Set(['github', 'linkedin']);

const PATHS: Record<IconName, string> = {
  menu: 'M3 6h18M3 12h18M3 18h18',
  close: 'M5 5l14 14M19 5L5 19',
  sun: 'M12 4V2M12 22v-2M4 12H2M22 12h-2M6 6L4.5 4.5M19.5 19.5L18 18M18 6l1.5-1.5M4.5 19.5L6 18',
  moon: 'M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z',
  monitor: 'M3 5h18v11H3zM9 20h6M12 16v4',
  'arrow-up-right': 'M7 17L17 7M8 7h9v9',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  document: 'M14 3H7a1 1 0 00-1 1v16a1 1 0 001 1h10a1 1 0 001-1V7zM14 3v4h4M9 13h6M9 17h4',
  github:
    'M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22 0 1.6-.02 2.9-.02 3.29 0 .32.22.7.83.58A12.01 12.01 0 0024 12.5C24 5.87 18.63.5 12 .5z',
  linkedin:
    'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45zM5.34 7.43a2.07 2.07 0 110-4.13 2.07 2.07 0 010 4.13zM7.12 20.45H3.55V9h3.57zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z',
};

const CIRCLES: Partial<Record<IconName, { cx: number; cy: number; r: number }>> = {
  sun: { cx: 12, cy: 12, r: 4 },
};

export type IconSize = 'sm' | 'md' | 'lg';

const SIZE: Record<IconSize, string> = { sm: 'size-sm', md: 'size-md', lg: 'size-lg' };

export function Icon({
  name,
  size = 'md',
  ...rest
}: { name: IconName; size?: IconSize } & SVGProps<SVGSVGElement>) {
  const circle = CIRCLES[name];
  const brand = BRAND.has(name);
  return (
    <svg
      viewBox="0 0 24 24"
      fill={brand ? 'currentColor' : 'none'}
      stroke={brand ? 'none' : 'currentColor'}
      strokeWidth={brand ? undefined : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={SIZE[size]}
      {...rest}
    >
      <path d={PATHS[name]} />
      {circle ? <circle cx={circle.cx} cy={circle.cy} r={circle.r} /> : null}
    </svg>
  );
}

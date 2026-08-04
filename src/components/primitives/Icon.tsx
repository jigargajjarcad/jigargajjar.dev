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
export type IconName = 'menu' | 'close' | 'sun' | 'moon' | 'monitor' | 'arrow-up-right';

const PATHS: Record<IconName, string> = {
  menu: 'M3 6h18M3 12h18M3 18h18',
  close: 'M5 5l14 14M19 5L5 19',
  sun: 'M12 4V2M12 22v-2M4 12H2M22 12h-2M6 6L4.5 4.5M19.5 19.5L18 18M18 6l1.5-1.5M4.5 19.5L6 18',
  moon: 'M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z',
  monitor: 'M3 5h18v11H3zM9 20h6M12 16v4',
  'arrow-up-right': 'M7 17L17 7M8 7h9v9',
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
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
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

'use client';

import { usePathname } from 'next/navigation';
import NextLink from 'next/link';

/**
 * COMPONENT_GUIDELINES.md §3.1 — primary navigation.
 *
 * Four items. `/resume` and `/404` do not belong in primary navigation, which
 * leaves the documented maximum of five unspent.
 *
 * Current route is marked by two mechanisms — weight 600 and
 * `aria-current="page"`. Colour alone would fail the same test link colour does
 * (ACCESSIBILITY.md §5).
 */
export const PRIMARY_NAV = [
  { href: '/work', label: 'Work' },
  { href: '/workflow', label: 'Workflow' },
  { href: '/about', label: 'About' },
  { href: '/connect', label: 'Connect' },
] as const;

export function Nav({ orientation = 'horizontal' }: { orientation?: 'horizontal' | 'vertical' }) {
  const pathname = usePathname();
  return (
    <ul
      className={
        orientation === 'horizontal'
          ? 'flex list-none items-center gap-6'
          : 'flex list-none flex-col gap-2'
      }
    >
      {PRIMARY_NAV.map((item) => {
        const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <NextLink
              href={item.href}
              aria-current={current ? 'page' : undefined}
              className={`flex min-h-target-min items-center font-text text-type-body-sm no-underline transition-colors duration-fast ease-standard hover:text-color-interactive ${
                current ? 'font-semibold text-color-text-primary' : 'text-color-text-secondary'
              }`}
            >
              {item.label}
            </NextLink>
          </li>
        );
      })}
    </ul>
  );
}

'use client';

import { useEffect, useState } from 'react';

import { Text } from '@/components/primitives/Text';

/**
 * One line, at the foot of the hero — ADR-023.
 *
 * All that survives of V3's instrumentation, and it is stronger for it. V3
 * rendered this measurement as an eight-row waterfall with bars, durations and
 * descriptions: a genuinely unusual idea, presented as a dashboard, which made
 * it read as *look what I measured*. The same fact in eleven words reads as
 * confidence, and confidence was the thing the whole page was missing.
 *
 * It is still real, still live, still the reader's own visit, and still openable
 * in their devtools. Nothing about the claim was softened — only its volume.
 *
 * **Zero layout shift is a constraint here, not an aspiration**, because the
 * sentence names its own layout shift. The element renders at full height from
 * the first paint with a non-breaking space in it, so the number arriving
 * changes no geometry. A line that measured CLS and caused CLS would be the most
 * embarrassing bug this site could ship.
 */
export function PageReading() {
  const [line, setLine] = useState<string | null>(null);

  useEffect(() => {
    try {
      const nav = performance.getEntriesByType('navigation')[0] as
        PerformanceNavigationTiming | undefined;
      if (!nav) return;

      const paints = performance.getEntriesByType('largest-contentful-paint');
      const lcp = paints[paints.length - 1]?.startTime ?? nav.domContentLoadedEventEnd;

      const shift = (
        performance.getEntriesByType('layout-shift') as (PerformanceEntry & {
          value: number;
          hadRecentInput: boolean;
        })[]
      )
        .filter((entry) => !entry.hadRecentInput)
        .reduce((total, entry) => total + entry.value, 0);

      setLine(
        `this page reached you in ${Math.round(lcp)} ms · ` +
          (shift === 0 ? 'zero layout shift' : `${shift.toFixed(3)} layout shift`),
      );
    } catch {
      // A browser without these entry types. The line simply does not appear;
      // nothing else on the page depends on it.
    }
  }, []);

  return (
    <Text token="mono" color="tertiary">
      {line ?? ' '}
    </Text>
  );
}

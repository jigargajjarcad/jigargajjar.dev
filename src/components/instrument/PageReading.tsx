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
 *
 * **Read through `PerformanceObserver`, not `getEntriesByType`** (ADR-027).
 * The two are equivalent for navigation timing, and they are not for
 * `largest-contentful-paint` or `layout-shift`: reading those from the timeline
 * directly is deprecated, and Chrome logs a console warning for each call. Two
 * warnings on the home page, from the one component whose entire subject is
 * measurement quality, is the wrong place to be sloppy. `buffered: true`
 * delivers the entries that were recorded before this component existed, which
 * is all of them — both events are long past by the time an island hydrates.
 */

type Reading = { lcp: number; shift: number };

type LayoutShift = PerformanceEntry & { value: number; hadRecentInput: boolean };

export function PageReading() {
  const [reading, setReading] = useState<Reading | null>(null);

  useEffect(() => {
    const nav = performance.getEntriesByType('navigation')[0] as
      PerformanceNavigationTiming | undefined;
    if (!nav) return;

    let lcp = 0;
    let shift = 0;
    let published = false;
    const observers: PerformanceObserver[] = [];

    /**
     * Published once and then disconnected. Layout shift keeps accumulating for
     * as long as the page is open, and a figure that changes while the reader is
     * looking at it is worse than no figure — this sentence is a statement about
     * delivery, not a live meter.
     */
    const publish = () => {
      if (published) return;
      published = true;
      setReading({ lcp: lcp || nav.domContentLoadedEventEnd, shift });
      for (const observer of observers) observer.disconnect();
    };

    const observe = (type: string, onEntries: (entries: PerformanceEntryList) => void) => {
      try {
        const observer = new PerformanceObserver((list) => {
          onEntries(list.getEntries());
          if (type === 'largest-contentful-paint') publish();
        });
        observer.observe({ type, buffered: true });
        observers.push(observer);
      } catch {
        // An engine without this entry type. The line simply does not appear.
      }
    };

    observe('layout-shift', (entries) => {
      for (const entry of entries) {
        const ls = entry as LayoutShift;
        if (!ls.hadRecentInput) shift += ls.value;
      }
    });

    observe('largest-contentful-paint', (entries) => {
      for (const entry of entries) lcp = Math.max(lcp, entry.startTime);
    });

    // A page with no largest-contentful-paint entry would otherwise never
    // publish. One frame is enough for the buffered callbacks to have run.
    const fallback = requestAnimationFrame(() => requestAnimationFrame(publish));

    return () => {
      cancelAnimationFrame(fallback);
      for (const observer of observers) observer.disconnect();
    };
  }, []);

  return (
    <Text token="mono" color="tertiary">
      {reading
        ? `this page reached you in ${Math.max(0, Math.round(reading.lcp))} ms · ` +
          (reading.shift === 0 ? 'zero layout shift' : `${reading.shift.toFixed(3)} layout shift`)
        : ' '}
    </Text>
  );
}

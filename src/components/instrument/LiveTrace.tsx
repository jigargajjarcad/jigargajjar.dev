'use client';

import { useEffect, useState } from 'react';

import { Text } from '@/components/primitives/Text';
import { PAGE_SPANS, TRACE_LEAD } from '@/content/home';

import { Trace, type TraceRow } from './Trace';

/**
 * The visitor's own page load, traced live — ADR-022, band 1.
 *
 * **This is the part of the page that cannot be copied.** Every other portfolio
 * can draw an architecture diagram; this one reports what actually happened
 * between the reader pressing Enter and the words appearing, on their machine,
 * in milliseconds they can verify in their own devtools. It is a claim about
 * engineering that the reader confirms by having already experienced it, which
 * is a fundamentally different rhetorical position from being told.
 *
 * It also teaches the notation. The two system traces further down use the same
 * component, so by the time a reader reaches an OrchestAI agent run they are
 * already fluent in reading it — and they have been shown, by contrast, that
 * those traces carry no timings on purpose.
 *
 * **Nothing here is required for the page to work.** The server renders every
 * span label, its description, and the axis; script fills in numbers. With
 * JavaScript disabled the reader sees the same structure and the recorded lab
 * measurement instead, clearly labelled as such. The row heights and the value
 * column are identical in both states, so filling them in costs no layout shift
 * — which matters more than usual here, because the thing being measured is
 * this page's own layout stability.
 *
 * **The lab fallback arrives as a prop, and that is not a style preference.**
 * This page renders its own first-load JavaScript size. If the recorded
 * measurements were imported here — into a client component — they would ship
 * inside the very chunk they describe, and re-measuring would change the number
 * that changes the number. Keeping `measured.json` on the server side of the
 * boundary breaks the loop: the JS budget is independent of the figures, so
 * `npm run measure` converges on the first run instead of oscillating.
 */

type Sample = {
  readonly id: string;
  readonly from: number;
  readonly to: number;
  /** A point in time rather than an interval — first paint, LCP, hydration. */
  readonly marker?: boolean;
};

const round = (ms: number): string => `${Math.max(0, Math.round(ms))} ms`;

function collect(hydratedAt: number): { samples: Sample[]; lcp: number; cls: number } | null {
  const nav = performance.getEntriesByType('navigation')[0] as
    PerformanceNavigationTiming | undefined;
  if (!nav) return null;

  const paint = performance
    .getEntriesByType('paint')
    .find((entry) => entry.name === 'first-contentful-paint');

  // `buffered` entries are already in the timeline by the time this runs, so no
  // observer is needed: the largest paint on this page is the `<h1>`, and it has
  // long since happened. An observer would also keep firing as the reader
  // scrolls, which would make the number move while they looked at it.
  const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
  const lcp = lcpEntries.length > 0 ? (lcpEntries[lcpEntries.length - 1]?.startTime ?? 0) : 0;

  const cls = (
    performance.getEntriesByType('layout-shift') as (PerformanceEntry & {
      value: number;
      hadRecentInput: boolean;
    })[]
  )
    .filter((entry) => !entry.hadRecentInput)
    .reduce((total, entry) => total + entry.value, 0);

  const samples: Sample[] = [
    { id: 'dns', from: nav.domainLookupStart, to: nav.domainLookupEnd },
    { id: 'connect', from: nav.connectStart, to: nav.connectEnd },
    { id: 'request', from: nav.requestStart, to: nav.responseStart },
    { id: 'response', from: nav.responseStart, to: nav.responseEnd },
    { id: 'parse', from: nav.responseEnd, to: nav.domInteractive },
    { id: 'paint', from: paint?.startTime ?? 0, to: paint?.startTime ?? 0, marker: true },
    { id: 'lcp', from: lcp, to: lcp, marker: true },
    { id: 'hydrate', from: hydratedAt, to: hydratedAt, marker: true },
  ];

  return { samples, lcp: lcp || nav.domContentLoadedEventEnd, cls };
}

export function LiveTrace({ fallback }: { fallback: { lcpMs: number; cls: number } | null }) {
  const [reading, setReading] = useState<ReturnType<typeof collect>>(null);
  const [unsupported, setUnsupported] = useState(false);

  useEffect(() => {
    // `performance.now()` at the first client effect is when this island became
    // interactive. It is labelled exactly that rather than "interactive", which
    // would overclaim: React may still be hydrating other islands.
    const hydratedAt = performance.now();
    try {
      const result = collect(hydratedAt);
      if (result) setReading(result);
      else setUnsupported(true);
    } catch {
      // A browser without the Performance entry types this reads. The static
      // path below is complete, so there is nothing to recover — only a
      // different, honest label to show.
      setUnsupported(true);
    }
  }, []);

  const total = reading ? Math.max(...reading.samples.map((s) => s.to), reading.lcp, 1) : 1;

  const rows: TraceRow[] = PAGE_SPANS.map((span) => {
    const sample = reading?.samples.find((s) => s.id === span.id);
    return {
      id: span.id,
      label: span.label,
      detail: span.detail,
      depth: 0,
      start: sample ? sample.from / total : 0,
      end: sample ? sample.to / total : 0,
      value: sample ? round(sample.marker ? sample.to : sample.to - sample.from) : undefined,
      tone: sample?.marker ? 'lead' : 'work',
    };
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Text token="mono" color="tertiary" uppercase>
          {TRACE_LEAD}
        </Text>
        {/*
          The headline number. `aria-live` is deliberately absent: the figure
          arrives once, milliseconds after load, and announcing it would
          interrupt a screen-reader user mid-heading for a number that is also
          present in the rows below.
        */}
        <Text token="heading-3" as="p">
          {reading ? (
            <>
              It reached you in <span className="text-color-text-accent">{round(reading.lcp)}</span>
              .
            </>
          ) : unsupported ? (
            <>Your browser does not expose the timings this reads.</>
          ) : (
            <>Measuring…</>
          )}
        </Text>
      </div>

      <Trace
        rows={rows}
        pending={!reading}
        axis={reading ? `live · this visit · ${round(total)} total` : 'live · this visit'}
      >
        <Text token="mono" as="span" color="tertiary">
          {reading
            ? `layout shift ${reading.cls.toFixed(3)}`
            : `recorded lab: LCP ${fallback?.lcpMs ?? '—'} ms, CLS ${fallback?.cls ?? '—'}`}
        </Text>
      </Trace>

      <p>
        <Text token="mono" as="span" color="tertiary">
          {reading
            ? 'Read from the Performance API on your device. Open devtools and check it.'
            : 'Live figures need JavaScript. The recorded value above is a lab measurement on an emulated mid-tier phone.'}
        </Text>
      </p>
    </div>
  );
}

'use client';

import { Text } from '@/components/primitives/Text';
import { SystemGraph } from '@/components/system/SystemGraph';
import { useRovingTabs } from '@/components/system/useRovingTabs';
import { FAILURE_MODES, MAP_EDGES, MAP_LABEL, MAP_NODES, MAP_VIEWBOX } from '@/content/home';

/**
 * What breaks, and where it stops — ADR-022.
 *
 * **This is the section most portfolios do not have, and it is the one a staff
 * engineer reads first.** Everything else on a portfolio describes a happy path.
 * A reader who has run something in production knows the happy path is the easy
 * half, and that an engineer who cannot name their failure modes has either not
 * shipped or not looked.
 *
 * **Selecting a failure lights the parts of the system that contain it.** That
 * is the interaction earning its place: it answers *where does this get stopped*
 * on the topology itself, which is a spatial question that prose answers badly.
 * The same fact is also written into every row, so the map amplifies rather than
 * hides — nothing here requires a pointer, or a script, to be readable.
 *
 * **The uncontained rows are load-bearing.** One failure mode on this page has
 * an empty `enforcedBy`, and selecting it dims the entire map. That moment is
 * worth more than the four green rows above it: it is the page demonstrating
 * that it will show you a gap rather than round it off.
 */

const STATUS: Record<
  (typeof FAILURE_MODES)[number]['status'],
  { label: string; tint: string; text: string }
> = {
  contained: {
    label: 'Contained',
    tint: 'bg-color-status-positive-tint',
    text: 'text-color-status-positive',
  },
  degrades: {
    label: 'Detected only',
    tint: 'bg-color-status-caution-tint',
    text: 'text-color-status-caution',
  },
  open: {
    label: 'Not contained',
    tint: 'bg-color-status-critical-tint',
    text: 'text-color-status-critical',
  },
};

export function FailureMatrix() {
  const { selected, tabProps, active } = useRovingTabs(FAILURE_MODES);
  if (!active) return null;

  const enforcing = MAP_NODES.filter((node) => active.enforcedBy.includes(node.id));

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div
        role="tablist"
        aria-label="Failure modes"
        aria-orientation="vertical"
        className="flex flex-col lg:col-span-7"
      >
        {FAILURE_MODES.map((mode, index) => {
          const status = STATUS[mode.status];
          const isActive = index === selected;
          return (
            <button
              key={mode.id}
              {...tabProps(index, mode.id)}
              type="button"
              className={`system-target flex flex-col gap-3 border-t-hairline border-color-border-subtle py-6 text-left last:border-b-hairline ${
                isActive ? 'border-l-emphasis border-l-color-flow pl-5' : 'pl-0'
              }`}
            >
              <span className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className={`${status.tint} ${status.text} px-2 py-1`}>
                  <Text token="mono" as="span" uppercase>
                    {status.label}
                  </Text>
                </span>
                <Text token="heading-4" as="span" color={isActive ? 'primary' : 'secondary'}>
                  {mode.failure}
                </Text>
              </span>

              <Text token="body-sm" as="span" color="secondary">
                {mode.response}
              </Text>

              {/*
                The containment stated as text, not only as a highlight. The map
                is an amplifier; this line is the fact, and it is what a reader
                without a pointer, without CSS, or without sight receives.
              */}
              <span className="flex flex-wrap items-baseline gap-x-4">
                <Text token="mono" as="span" color="tertiary">
                  {mode.enforcedBy.length > 0
                    ? `Enforced at: ${mode.enforcedBy.join(' · ')}`
                    : 'Enforced at: nowhere — there is no gate for this'}
                </Text>
                <Text token="mono" as="span" color="tertiary">
                  {mode.source}
                </Text>
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
        tabIndex={-1}
        className="flex flex-col gap-5 lg:col-span-5"
      >
        {/* Sticky so the map stays in view while the reader scans six rows. Its
            own height is well under the viewport, so it can never trap focus
            beneath itself (WCAG 2.2, 2.4.11). */}
        <div className="lg:sticky lg:top-8 flex flex-col gap-5">
          <Text token="mono" color="tertiary" uppercase>
            Where it stops
          </Text>
          <SystemGraph
            nodes={MAP_NODES}
            edges={MAP_EDGES}
            viewBox={MAP_VIEWBOX}
            label={MAP_LABEL}
            highlight={active.enforcedBy}
          />
          <Text token="body-sm" color="secondary">
            {enforcing.length > 0
              ? `Stopped at ${enforcing.map((node) => node.label.toLowerCase()).join(' and ')}.`
              : 'Nothing stops this one. It is listed because it happened — and because a page showing only the contained failures would be describing a system nobody had looked at hard enough.'}
          </Text>
        </div>
      </div>
    </div>
  );
}

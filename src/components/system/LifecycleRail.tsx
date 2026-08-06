'use client';

import { LIFECYCLE } from '@/content/home';
import { Text } from '@/components/primitives/Text';

import { useRovingTabs } from './useRovingTabs';

/**
 * The seven-stage delivery lifecycle, as an explorable rail — ADR-020, band 2.
 *
 * **This band replaced three paragraphs, and that is the point.** The V1 page
 * described the method in prose; a reader either believed the description or did
 * not, and either way they had read a claim. A rail can be walked. Arriving at
 * "Claude Code" as stage four of seven — after problem, architecture, and
 * decision, and before verification, release, and retrospective — makes the
 * argument structurally, in the position of one item in a sequence, without
 * asserting anything.
 *
 * **The rail is progress, not decoration.** Everything up to the selected stage
 * is drawn in the flow colour and everything after it in the subtle border
 * colour, so the reader's position in the lifecycle is legible at a glance from
 * the connector line alone.
 *
 * Horizontal above `md`, vertical below it. The stages are a sequence in both
 * orientations, which is why `useRovingTabs` binds both axes.
 */
export function LifecycleRail() {
  const { selected, tabProps, active } = useRovingTabs(LIFECYCLE);
  if (!active) return null;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Delivery lifecycle"
        aria-orientation="horizontal"
        className="flex flex-col md:flex-row"
      >
        {LIFECYCLE.map((stage, index) => {
          const reached = index <= selected;
          const line = reached ? 'border-color-flow' : 'border-color-border-subtle';
          return (
            <button
              key={stage.id}
              {...tabProps(index, stage.id)}
              type="button"
              /*
                No vertical padding on the button below `md`. The connector is
                `self-stretch`, which stretches it to the *content* box — so any
                padding here becomes a visible break in the rail between one
                stage and the next. The spacing moves inside the label span,
                which keeps the target height identical and the line continuous.
              */
              className="system-target group flex flex-1 flex-row items-center gap-4 text-left md:flex-col md:items-stretch md:gap-4"
            >
              {/* The connector. Decorative: the same state is carried by
                  `aria-selected` on the button, and repeating it as text would
                  announce every stage twice. */}
              <span
                aria-hidden="true"
                className="flex w-6 flex-col items-center self-stretch md:h-4 md:w-auto md:flex-row"
              >
                <span
                  className={`flex-1 border-l-hairline md:border-l-0 md:border-t-hairline ${
                    index === 0 ? 'border-transparent' : line
                  }`}
                />
                <span
                  className={`h-2 w-2 shrink-0 rounded-md border-hairline ${
                    reached
                      ? 'border-color-flow bg-color-flow'
                      : 'border-color-border-strong bg-color-surface-base'
                  }`}
                />
                <span
                  className={`flex-1 border-l-hairline md:border-l-0 md:border-t-hairline ${
                    index === LIFECYCLE.length - 1 ? 'border-transparent' : line
                  }`}
                />
              </span>

              <span className="flex flex-col gap-1 py-3 md:py-0 md:pr-6 md:pt-4">
                <Text token="mono" as="span" color="tertiary">
                  {String(index + 1).padStart(2, '0')}
                </Text>
                <Text
                  token="heading-4"
                  as="span"
                  color={index === selected ? 'primary' : 'secondary'}
                >
                  {stage.name}
                </Text>
              </span>
            </button>
          );
        })}
      </div>

      {/*
        Floored at a spacing step so the section below does not move as the
        reader arrows through stages whose descriptions differ in length.
      */}
      <div
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
        tabIndex={-1}
        className="mt-10 min-h-16 border-t-hairline border-color-border-subtle pt-8"
      >
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <Text token="lede">{active.body}</Text>
          </div>
          <dl className="flex flex-col gap-5 md:col-span-5">
            {[
              ['Produces', active.artifact],
              ['Prevents', active.prevents],
            ].map(([term, value]) => (
              <div key={term} className="flex flex-col gap-1">
                <dt>
                  <Text token="mono" as="span" color="tertiary" uppercase>
                    {term}
                  </Text>
                </dt>
                <dd>
                  <Text token="body-sm" as="span" color="secondary">
                    {value}
                  </Text>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

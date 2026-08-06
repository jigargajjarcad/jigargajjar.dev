'use client';

import { ORCHESTAI_LAYERS } from '@/content/home';
import { Text } from '@/components/primitives/Text';

import { useRovingTabs } from './useRovingTabs';

/**
 * Layered architecture explorer — ADR-020, band 3.
 *
 * **Layers, not boxes-and-arrows.** OrchestAI's topology is already drawn in the
 * hero; drawing it again here would be the second time the reader is told the
 * same thing, which `CONTENT_STRATEGY.md` treats as a defect rather than as
 * reinforcement. What this band adds is the axis the topology cannot show —
 * *why each layer is shaped the way it is*. A stack is the right form for that,
 * because a decision belongs to a layer and layers have an order.
 *
 * **Every layer states a property, never a measurement.** OrchestAI has no
 * users. A latency figure or a throughput number here would be a benchmark of
 * nothing, and a reader who checks the case study would find it unsupported —
 * which would cost more credibility than the number could ever buy. "Isolation
 * fails closed" is a claim about the design that the code either honours or does
 * not, and that is the kind of claim this page is allowed to make.
 */
export function ArchitectureExplorer() {
  const { selected, tabProps, active } = useRovingTabs(ORCHESTAI_LAYERS);
  if (!active) return null;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div
        role="tablist"
        aria-label="OrchestAI architecture layers"
        aria-orientation="vertical"
        className="flex flex-col border-hairline border-color-border-subtle lg:col-span-7"
      >
        {ORCHESTAI_LAYERS.map((layer, index) => {
          const isActive = index === selected;
          return (
            <button
              key={layer.id}
              {...tabProps(index, layer.id)}
              type="button"
              className={`system-target flex min-h-target-min flex-col gap-3 px-5 py-4 text-left md:flex-row md:items-center md:gap-5 ${
                index > 0 ? 'border-t-hairline border-color-border-subtle' : ''
              } ${isActive ? 'bg-color-surface-raised' : 'bg-color-surface-base'}`}
            >
              {/*
                The active marker is a 2 px bar rather than a colour change on
                the label, because at six layers a colour change is a search and
                a bar is a glance. `aria-selected` carries it for assistive
                technology, so the bar is decorative and unannounced.
              */}
              <span
                aria-hidden="true"
                className={`hidden w-1 self-stretch md:block ${
                  isActive ? 'bg-color-flow' : 'bg-transparent'
                }`}
              />
              <span className="flex min-w-0 flex-1 items-baseline gap-4">
                <Text token="mono" as="span" color="tertiary">
                  {String(index + 1).padStart(2, '0')}
                </Text>
                <Text token="heading-4" as="span" color={isActive ? 'primary' : 'secondary'}>
                  {layer.name}
                </Text>
              </span>
              <span className="flex flex-wrap gap-2 md:justify-end">
                {layer.stack.map((item) => (
                  <span
                    key={item}
                    className="border-hairline border-color-border-subtle px-2 py-1 text-color-text-tertiary"
                  >
                    <Text token="mono" as="span">
                      {item}
                    </Text>
                  </span>
                ))}
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
        className="flex min-h-20 flex-col gap-6 lg:col-span-5"
      >
        <Text token="mono" color="tertiary" uppercase>
          Why it is shaped this way
        </Text>
        <Text token="body">{active.decision}</Text>
        <p className="border-l-emphasis border-color-flow pl-5">
          <Text token="mono" as="span" color="secondary">
            {active.property}
          </Text>
        </p>
      </div>
    </div>
  );
}

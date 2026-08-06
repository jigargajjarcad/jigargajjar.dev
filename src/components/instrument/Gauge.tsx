import type { CSSProperties } from 'react';

import { Text } from '@/components/primitives/Text';

/**
 * A measurement against the ceiling it is not allowed to cross — ADR-022.
 *
 * **The tightness is the point.** Two of the four gauges on this page sit above
 * 90% consumed, and that is not a defect to hide behind rounder numbers — it is
 * the evidence. A dashboard where everything is at 20% describes limits nobody
 * has ever had to respect; a first-load budget at 91% describes a page where
 * something was refused. The `caution` tone at 90% exists to draw the eye
 * *toward* the tight ones.
 *
 * Nothing here is decorative. The number, the ceiling, the headroom and the
 * authority for the ceiling are all present as text; the bar restates the ratio
 * for eyes, which are better at proportion than at arithmetic.
 */
export function Gauge({
  label,
  value,
  ceiling,
  unit,
  authority,
}: {
  label: string;
  value: number;
  ceiling: number;
  unit: string;
  /** The record that set this ceiling. A limit with no author is a guideline. */
  authority: string;
}) {
  const ratio = Math.min(value / ceiling, 1);
  const headroom = Math.round(((ceiling - value) / ceiling) * 100);
  // 90% is where a budget stops being headroom and starts being a constraint on
  // the next change. It is the threshold at which this page should look tense.
  const tense = ratio >= 0.9;

  return (
    <div className="flex flex-col gap-3 border-t-hairline border-color-border-subtle pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <Text token="mono" as="span" color="secondary" uppercase>
          {label}
        </Text>
        <Text token="mono" as="span" color="tertiary">
          {authority}
        </Text>
      </div>

      <div className="flex items-baseline gap-2">
        <Text token="heading-3" as="span">
          {value}
        </Text>
        <Text token="mono" as="span" color="tertiary">
          {`/ ${ceiling} ${unit}`}
        </Text>
      </div>

      <div aria-hidden="true" className="h-2 w-full border-hairline border-color-border-subtle">
        <div
          className={`h-full origin-left ${tense ? 'bg-color-status-caution' : 'bg-color-flow'}`}
          style={{ width: `${ratio * 100}%` } as CSSProperties}
        />
      </div>

      <Text token="mono" as="span" color={tense ? 'secondary' : 'tertiary'}>
        {`${headroom}% headroom`}
      </Text>
    </div>
  );
}

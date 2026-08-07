/**
 * COMPONENT_GUIDELINES.md §8.7 — a single number with label and qualifier.
 *
 * The qualifier is not optional where the number needs one: a number without
 * its conditions is a claim without its evidence. Never animated — counting-up
 * delays the evidence and adds motion with no informational content.
 */
export function Metric({
  value,
  unit,
  label,
  qualifier,
}: {
  value: string;
  unit?: string;
  label: string;
  qualifier?: string;
}) {
  return (
    /* §8.7 — value at `--type-metric` in the display face, unit at
       `--type-heading-4` in the text face and baseline-aligned to it, label
       below at `--type-label`, qualifier at `--type-caption`. `items-baseline`
       is what makes the unit sit on the value's baseline rather than its box. */
    <figure className="m-0">
      <p className="flex items-baseline gap-2">
        <strong className="font-display text-type-metric font-regular text-color-text-primary">
          {value}
        </strong>
        {unit ? (
          <span className="font-text text-type-heading-4 text-color-text-secondary">{unit}</span>
        ) : null}
      </p>
      <figcaption className="mt-2 flex flex-col gap-1">
        <span className="font-text text-type-label text-color-text-secondary">{label}</span>
        {qualifier ? (
          <span className="font-text text-type-caption text-color-text-tertiary">{qualifier}</span>
        ) : null}
      </figcaption>
    </figure>
  );
}

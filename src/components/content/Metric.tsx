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
    <figure>
      <p>
        <strong>{value}</strong>
        {unit ? <span> {unit}</span> : null}
      </p>
      <figcaption>
        {label}
        {qualifier ? <span> — {qualifier}</span> : null}
      </figcaption>
    </figure>
  );
}

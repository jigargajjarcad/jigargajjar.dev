import type { ReactNode } from 'react';

/**
 * COMPONENT_GUIDELINES.md §8.1 — three variants, each bound to a semantic status.
 *
 * The variant must be legible from the text, not only from the colour or icon
 * (ACCESSIBILITY.md §5). `critical` marks honest disclosure and must not read as
 * an error state. Never nested — a callout inside a callout means the outer one
 * is a section.
 *
 * The heading is a *label*, not a document-outline heading. §8.1 specifies it at
 * `--type-heading-4`, which is a size token; ACCESSIBILITY.md §8 is explicit
 * that "heading level is a structural claim, never a size". Rendering it as a
 * real `<h4>` would skip levels wherever a callout follows an `<h1>` or `<h2>`,
 * so it is a paragraph that names the region instead — the same treatment
 * Decision gives its four region labels.
 */
export type CalloutVariant = 'note' | 'caution' | 'critical';

/**
 * §8.1: "left border 2 px in the status colour, `--color-surface-raised`
 * background, `--space-6` padding". Specified in Phase 3 and never written —
 * `data-variant` was rendered and no stylesheet ever targeted it, so nine
 * callouts across four case studies were visually indistinguishable from body
 * text (ADR-029 recorded this; ADR-033 fixes it).
 *
 * `note` has no status colour in `COLOR_SYSTEM.md` §7 because it carries no
 * status — it is a constraint or an aside — so it takes the strong border
 * colour. The variant stays legible from the text regardless: §8.1 is explicit
 * that "a callout whose meaning depends on its border colour has failed".
 */
const RULE: Record<CalloutVariant, string> = {
  note: 'border-color-border-strong',
  caution: 'border-color-status-caution',
  critical: 'border-color-status-critical',
};

const slug = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export function Callout({
  variant = 'note',
  heading,
  children,
}: {
  variant?: CalloutVariant;
  heading?: string;
  children: ReactNode;
}) {
  const labelId = heading ? `callout-${slug(heading)}` : undefined;
  return (
    <aside
      data-variant={variant}
      {...(labelId ? { 'aria-labelledby': labelId } : { 'aria-label': `${variant} callout` })}
      className={`border-l-emphasis bg-color-surface-raised p-6 ${RULE[variant]}`}
    >
      {heading ? (
        <p id={labelId} className="mb-2 font-text text-type-heading-4 text-color-text-primary">
          {heading}
        </p>
      ) : null}
      {children}
    </aside>
  );
}

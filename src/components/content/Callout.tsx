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
    >
      {heading ? <p id={labelId}>{heading}</p> : null}
      {children}
    </aside>
  );
}

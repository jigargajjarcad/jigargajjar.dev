/**
 * COMPONENT_GUIDELINES.md §7 — section 3 of the case-study model.
 *
 * This is a project timeline, never a career timeline. Semantically an ordered
 * list: the order is the meaning and must be exposed as order, not implied by
 * position.
 *
 * `Major setbacks` entries are structurally identical to every other entry.
 * Marking them would make honest entries look like errors, which discourages
 * writing them.
 */
export const TIMELINE_STAGES = [
  'Planning',
  'Architecture',
  'Implementation',
  'Major setbacks',
  'Verification',
  'Release',
  'Future roadmap',
] as const;

export type TimelineStage = (typeof TIMELINE_STAGES)[number];

export interface TimelineEntry {
  stage: TimelineStage;
  period: string;
  body: string;
}

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    /* The same two-column identity block `/resume` uses: the fixed, scannable
       fact on the left, the prose beside it. `Timeline` is in the MDX map but
       has no §8 entry of its own, so it takes the pattern already settled
       elsewhere rather than inventing a third. Below `sm` it stacks, in reading
       order. */
    <ol className="flex list-none flex-col gap-8 p-0">
      {entries.map((entry) => (
        <li key={entry.stage} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-x-6">
          <div className="flex flex-col gap-1">
            {/* Tabular figures so periods align down the column (TYPOGRAPHY.md §7). */}
            <time className="font-mono text-type-mono uppercase text-color-text-tertiary">
              {entry.period}
            </time>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-type-heading-4 text-color-text-primary">
              {entry.stage}
            </h3>
            <p className="font-text text-type-body text-color-text-secondary">{entry.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

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
    <ol>
      {entries.map((entry) => (
        <li key={entry.stage}>
          <h3>{entry.stage}</h3>
          {/* Tabular figures so periods align down the column (TYPOGRAPHY.md §7). */}
          <p>
            <time>{entry.period}</time>
          </p>
          <p>{entry.body}</p>
        </li>
      ))}
    </ol>
  );
}

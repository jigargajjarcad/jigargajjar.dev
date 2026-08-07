/**
 * COMPONENT_GUIDELINES.md §8.8 — a two-or-three-way tradeoff comparison.
 *
 * Real table semantics: `<table>`, `<th scope>`, `<caption>`. This is tabular
 * data and assistive technology needs the structure. No zebra striping —
 * alternating rows are a workaround for tables that are too dense, and the fix
 * is fewer columns.
 *
 * **The wrapper is a scroll region and was missing its overflow** (ADR-027).
 * `tabIndex`, `role` and `aria-label` were all here, which is the part that is
 * easy to forget — a scrollable region must be keyboard-reachable (WCAG 2.1.1)
 * and a bare `tabIndex` on non-interactive content is not enough. What was
 * missing was the one property that makes it scroll at all, so a three-column
 * table widened the document instead: 3 px at 375 px, 58 px at 320 px. A table
 * cannot shrink below its content, so containing it is the only fix.
 */
export function Comparison({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: { label: string; cells: string[] }[];
}) {
  return (
    <div tabIndex={0} role="region" aria-label={caption} className="max-w-full overflow-x-auto">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Option</th>
            {columns.map((column) => (
              <th scope="col" key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {row.cells.map((cell, index) => (
                <td key={`${row.label}-${columns[index] ?? index}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

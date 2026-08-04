/**
 * COMPONENT_GUIDELINES.md §8.8 — a two-or-three-way tradeoff comparison.
 *
 * Real table semantics: `<table>`, `<th scope>`, `<caption>`. This is tabular
 * data and assistive technology needs the structure. No zebra striping —
 * alternating rows are a workaround for tables that are too dense, and the fix
 * is fewer columns.
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
    <div tabIndex={0} role="region" aria-label={caption}>
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

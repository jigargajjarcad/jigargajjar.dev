import { expect, test } from '@playwright/test';

import { ROUTES } from './routes';

/**
 * `COMPONENT_GUIDELINES.md` §8.5 — diagram labels are real `<text>` nodes so
 * they stay selectable, searchable, and translatable.
 *
 * They are also silently destructible. MDX wraps standalone content inside a
 * JSX element in a paragraph, so a label written across three lines compiles to
 * `<text><p>label</p></text>`. SVG paints no HTML paragraph, so every label
 * disappears and the figure renders as an empty box. Writing the label inline
 * fixes it, but Prettier reformats one-line elements back onto three and
 * reintroduces the defect — an expression child (`{'label'}`) is the only form
 * that survives both.
 *
 * Nothing else catches this. `Diagram` carries `role="img"` and an
 * `aria-label`, so axe passes whether or not a single label renders, and both
 * case studies shipped their diagrams empty until this gate existed.
 *
 * Two assertions, because the second is the one that generalises: a `<text>`
 * node must contain no child elements, and it must occupy non-zero width.
 */
for (const route of ROUTES) {
  test(`diagram labels render: ${route}`, async ({ page }) => {
    await page.goto(route);

    const defects = await page.evaluate(() =>
      Array.from(document.querySelectorAll('svg text'))
        .map((node) => ({
          label: node.textContent?.trim() ?? '',
          childElements: node.children.length,
          width: Number(node.getBoundingClientRect().width.toFixed(1)),
        }))
        .filter((label) => label.childElements > 0 || label.width === 0),
    );

    expect(defects).toEqual([]);
  });
}

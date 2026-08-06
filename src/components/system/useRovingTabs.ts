'use client';

import { useCallback, useRef, useState, type KeyboardEvent } from 'react';

/**
 * Roving tabindex for a tablist — `ACCESSIBILITY.md` §5, WAI-ARIA APG.
 *
 * Every explorable diagram on the home page is the same interaction underneath:
 * a set of stages, layers, or nodes, one selected at a time, with a panel
 * describing the selection. Implementing that three times would produce three
 * subtly different keyboard behaviours, and the one that gets it wrong is
 * invisible to everyone who uses a pointer. It is implemented once, here.
 *
 * **A tablist takes one tab stop, not one per tab.** `Tab` moves past the whole
 * group; arrows move within it. A seven-stage rail that consumed seven tab stops
 * would put the keyboard reader through the entire lifecycle before they could
 * reach the link underneath it.
 *
 * `Home` and `End` are included because they are in the APG and cost two lines.
 * Both orientations are supported: the same rail is a row on desktop and a
 * column on mobile, so binding only one axis would break on one of them.
 */
export function useRovingTabs<T extends { readonly id: string }>(items: readonly T[], initial = 0) {
  const [selected, setSelected] = useState(initial);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = items.length;

  const register = useCallback(
    (index: number) => (node: HTMLButtonElement | null) => {
      refs.current[index] = node;
    },
    [],
  );

  /**
   * Selection and focus move together. The APG calls this automatic activation,
   * and it is the right choice here because selecting a stage has no cost beyond
   * swapping text — there is nothing to load, so making the reader press Enter
   * after every arrow key would be ceremony without a purpose.
   */
  const move = useCallback((next: number) => {
    setSelected(next);
    refs.current[next]?.focus();
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];

      if (step !== undefined) {
        event.preventDefault();
        // Wrapping, per the APG's default for tablists. A rail that stops dead
        // at the last stage reads as broken rather than as bounded.
        move((selected + step + count) % count);
        return;
      }
      if (event.key === 'Home') {
        event.preventDefault();
        move(0);
        return;
      }
      if (event.key === 'End') {
        event.preventDefault();
        move(count - 1);
      }
    },
    [count, move, selected],
  );

  /**
   * Props for the nth tab. Spread onto the `<button>`.
   *
   * The key handler lives here rather than on the tablist. Delegating from the
   * container is the more common implementation and it is subtly wrong: a
   * `tablist` is not itself focusable, so a keydown listener on it only ever
   * fires by bubbling from a tab, and static analysis correctly flags a
   * keyboard handler on an unfocusable interactive element
   * (`jsx-a11y/interactive-supports-focus`). Binding it to the element that
   * actually holds focus is both what the APG describes and what passes.
   */
  const tabProps = useCallback(
    (index: number, id: string) => ({
      ref: register(index),
      role: 'tab' as const,
      id: `tab-${id}`,
      'aria-selected': index === selected,
      'aria-controls': `panel-${id}`,
      // The roving part: only the selected tab is reachable by Tab.
      tabIndex: index === selected ? 0 : -1,
      onClick: () => setSelected(index),
      onKeyDown,
    }),
    [onKeyDown, register, selected],
  );

  /**
   * The selected item, resolved here rather than at each call site.
   *
   * It is `T | undefined` because the model is loaded content and could in
   * principle be empty, and `noUncheckedIndexedAccess` is on precisely so that
   * possibility has to be handled rather than assumed away. Every consumer
   * renders nothing when it is undefined — a band that disappears is a far
   * better failure than a page that throws.
   */
  const active: T | undefined = items[selected] ?? items[0];

  return { selected, setSelected, onKeyDown, tabProps, active };
}

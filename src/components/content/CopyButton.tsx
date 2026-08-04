'use client';

import { useState } from 'react';

/**
 * ARCHITECTURE.md §6.4 — the one client leaf in the MDX component set.
 *
 * COMPONENT_GUIDELINES.md §8.3: always in the tab order, not only on hover — a
 * control that only exists on hover does not exist for keyboard or touch. Copy
 * success is announced, not only shown.
 *
 * INTERACTION.md §9: if the clipboard write is rejected, the control reports
 * failure in text rather than silently doing nothing.
 */
export function CopyButton({ source }: { source: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');

  return (
    <>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(source);
            setState('copied');
          } catch {
            setState('failed');
          }
          setTimeout(() => setState('idle'), 2000);
        }}
      >
        Copy
      </button>
      <span role="status" aria-live="polite">
        {state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed' : ''}
      </span>
    </>
  );
}

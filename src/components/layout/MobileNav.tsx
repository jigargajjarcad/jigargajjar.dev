'use client';

import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/primitives/Button';
import { Icon } from '@/components/primitives/Icon';

import { Nav } from './Nav';

/**
 * COMPONENT_GUIDELINES.md §3.2 — the only floating surface in the system and
 * the only place a scrim is used.
 *
 * Focus trapped while open; dismissal by the close control, Escape, or scrim
 * click; focus returned to the toggle that opened it; page scroll locked.
 *
 * INTERACTION.md §9 — if this fails to initialise, the navigation renders as a
 * plain visible list. It is markup first, disclosure second, which is why `Nav`
 * is rendered unconditionally below `--bp-sm` when JavaScript is absent.
 */
export function MobileNav() {
  const [enhanced, setEnhanced] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Markup first, disclosure second (INTERACTION.md §9). The navigation is a
  // plain visible list until JavaScript has run; only then does it become a
  // disclosure. If the script never runs, the list stays — it is not a control
  // that fails closed.
  useEffect(() => {
    setEnhanced(true);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    panelRef.current?.querySelector<HTMLElement>('a[href], button')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!enhanced) {
    return (
      <nav aria-label="Primary" className="sm:hidden">
        <Nav orientation="vertical" />
      </nav>
    );
  }

  return (
    <div className="sm:hidden">
      <Button
        ref={toggleRef}
        aria-label="Navigation"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Icon name="menu" />
      </Button>
      {open ? (
        <div className="fixed inset-0 z-20">
          <button
            type="button"
            aria-label="Close navigation"
            tabIndex={-1}
            className="absolute inset-0 bg-color-text-primary opacity-50"
            onClick={() => {
              setOpen(false);
              toggleRef.current?.focus();
            }}
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="absolute inset-y-0 right-0 flex w-full max-w-wide flex-col gap-8 bg-color-surface-overlay p-5"
          >
            <div className="flex justify-end">
              <Button
                aria-label="Close navigation"
                onClick={() => {
                  setOpen(false);
                  toggleRef.current?.focus();
                }}
              >
                <Icon name="close" />
              </Button>
            </div>
            <Nav orientation="vertical" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

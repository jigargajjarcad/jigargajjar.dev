'use client';

import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/primitives/Button';
import { Icon, type IconName } from '@/components/primitives/Icon';

import { THEME_STORAGE_KEY } from './ThemeScript';

/**
 * INTERACTION.md §11 — a three-state control: light, dark, system. A two-state
 * toggle is declined because it strands a reader who has chosen once with no
 * route back to the system default.
 *
 * Implemented as a menu button. The trigger is icon-only — one of the four
 * sanctioned icon-only controls (ICONOGRAPHY.md §6) — and each option inside
 * the menu carries a visible text label.
 *
 * ARCHITECTURE.md §2 lists the theme controller among the expected client
 * components. It is a leaf: nothing below it is interactive.
 */
type Choice = 'light' | 'dark' | 'system';

const OPTIONS: { value: Choice; label: string; icon: IconName }[] = [
  { value: 'light', label: 'Light', icon: 'sun' },
  { value: 'dark', label: 'Dark', icon: 'moon' },
  { value: 'system', label: 'System', icon: 'monitor' },
];

const apply = (choice: Choice): void => {
  const root = document.documentElement;
  if (choice === 'system') {
    root.removeAttribute('data-theme');
    localStorage.removeItem(THEME_STORAGE_KEY);
  } else {
    root.setAttribute('data-theme', choice);
    localStorage.setItem(THEME_STORAGE_KEY, choice);
  }
};

export function ThemeControl() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<Choice>('system');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') setChoice(stored);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointer = (event: MouseEvent) => {
      if (
        !menuRef.current?.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
    };
  }, [open]);

  const current = OPTIONS.find((option) => option.value === choice) ?? OPTIONS[2]!;

  return (
    <div className="relative">
      <Button
        ref={triggerRef}
        aria-label={`Theme: ${current.label}`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
      >
        <Icon name={current.icon} />
      </Button>
      {open ? (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Theme"
          className="absolute right-0 top-full z-10 mt-1 min-w-target-min rounded-md border-hairline border-color-border-subtle bg-color-surface-overlay p-1"
        >
          {OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              role="menuitemradio"
              aria-checked={choice === option.value}
              className="flex min-h-target-min w-full items-center gap-2 rounded-sm px-3 font-text text-type-body-sm text-color-text-primary transition-colors duration-fast ease-standard hover:bg-color-surface-raised"
              onClick={() => {
                setChoice(option.value);
                apply(option.value);
                setOpen(false);
                triggerRef.current?.focus();
              }}
            >
              <Icon name={option.icon} size="sm" />
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

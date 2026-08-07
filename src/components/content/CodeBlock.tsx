import { CopyButton } from './CopyButton';

/**
 * COMPONENT_GUIDELINES.md §8.3.
 *
 * Horizontal scroll within the block; the page never scrolls horizontally. No
 * line numbers by default — they are copied along with the code by most
 * selection implementations, which makes the block hostile to its primary use.
 *
 * Syntax highlighting is specified as build-time via a Shiki-class highlighter.
 * It is deliberately absent today (Day 4 scope excludes it) and is the only
 * part of this component's specification not yet implemented.
 */
export function CodeBlock({ language, children }: { language?: string; children: string }) {
  return (
    /* §8.3 — `--color-surface-sunken` behind a hairline, language label at
       `--type-caption` top right in `--color-text-tertiary`, copy control
       always present and focusable. */
    <div className="relative overflow-hidden rounded-sm border-hairline border-color-border-subtle bg-color-surface-sunken">
      <div className="flex items-center justify-between gap-4 border-b-hairline border-color-border-subtle px-4 py-2">
        <p className="font-mono text-type-caption uppercase text-color-text-tertiary">
          {language ?? ''}
        </p>
        <CopyButton source={children} />
      </div>
      {/* A scrollable region must be keyboard-reachable (WCAG 2.1.1). Giving
          it a role and a name is what makes the tab stop legitimate rather
          than a bare tabIndex on non-interactive content. */}
      <pre
        tabIndex={0}
        role="region"
        aria-label={language ? `${language} code` : 'Code'}
        className="m-0 overflow-x-auto p-4 font-mono text-type-code text-color-text-primary"
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}

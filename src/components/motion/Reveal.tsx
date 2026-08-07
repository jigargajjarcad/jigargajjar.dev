'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Entrance reveal — `MOTION.md` §5, `ARCHITECTURE.md` §9, ADR-018.
 *
 * The only scroll-triggered pattern in the system, and the only one requiring
 * JavaScript. An `IntersectionObserver` sets a state attribute; the CSS in
 * `globals.css` carries the animation. ADR-018 measured the library alternative
 * at 95× the cost for identical behaviour.
 *
 * **The default state in markup is the final state.** `pending` is applied by
 * script after mount, never in server output. An element whose CSS sets
 * `opacity: 0` and relies on script to reveal it is a defect (§5) — a script
 * failure would make the content permanently invisible. Everything here is a
 * supplement to a state change that has already happened.
 *
 * **Never apply above the fold.** Content in the initial viewport must be
 * visible immediately: animating it delays first contact with the claim and
 * jeopardises the LCP budget. `MOTION.md` §5 states this as a constraint;
 * `src/app/page.tsx` band 1 is the case it exists for.
 *
 * **Applied to blocks, not text runs** — a section, a card, a figure. Never a
 * paragraph, heading, or list item in isolation.
 *
 * `RevealGroup` and the `delayMs` prop that served it were removed in the V4
 * cleanup: the home page reveals whole screens, and no surface on the site has
 * staggered a group since. The `stagger` token remains in the scale — it is
 * frozen by ADR-011 and withdrawing it is a design decision rather than a
 * cleanup — but it currently has no consumer, and that is worth knowing before
 * the next motion change.
 */

/** §5 — 20% of the element's height intersecting the viewport. */
const THRESHOLD = 0.2;

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // §9 — under reduced motion the animation is removed entirely rather than
    // shortened, so the pending state is never applied in the first place.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Older engines without the observer keep the server-rendered final state,
    // which is already correct. There is nothing to fall back to.
    if (typeof IntersectionObserver === 'undefined') return;

    // §5 — only content entirely below the fold animates. Anything already in
    // or above the viewport is left in its final state: animating it would
    // delay first contact with the claim, and on a restored scroll position it
    // would animate content the reader has already read.
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    node.dataset.reveal = 'pending';

    const show = () => {
      node.dataset.reveal = 'shown';
      // §5 — fires once per element per page load. Re-triggering on scroll-up
      // turns a reading surface into an attention-demanding one.
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };

    // Once the element's top has passed the viewport top, the reader is inside
    // or beyond it and it must be visible regardless of ratio. Two cases need
    // this, and both strand content at opacity 0 without it — MOTION.md §1:
    // content is never invisible pending an animation.
    //
    //   1. A jump rather than a scroll — anchor link, End key, restored scroll
    //      position — produces no threshold crossing for the observer to report.
    //   2. A block taller than the viewport can never reach 20% intersection at
    //      all. At the foot of a page the remaining scroll may be too small to
    //      get there, so the documented trigger is unreachable by construction.
    const passed = () => node.getBoundingClientRect().top < 0;

    const onScroll = () => {
      if (passed()) show();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // With `threshold`, `isIntersecting` is reported once the ratio crosses
        // it, so this is §5's documented 20%-of-element-height trigger.
        for (const entry of entries) {
          if (entry.isIntersecting || passed()) show();
        }
      },
      { threshold: THRESHOLD },
    );

    observer.observe(node);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Motion tokens (`docs/ARCHITECTURE.md` §3, §9).
 *
 * Durations and easings are primitives and live in `tokens.ts`; this module is
 * their motion-system entry point and re-exports them so that
 * `src/components/motion/` has a single import.
 *
 * Two systems are re-exported, and the separation is the point (ADR-021):
 *
 *   `duration` / `easing` / `stagger`  Interface motion. Governed by
 *                                      ARCHITECTURE.md §9, ceiling 400 ms.
 *   `flow`                             Ambient motion inside a system diagram.
 *                                      Continuous, non-blocking, and above the
 *                                      §9 ceiling by design.
 *
 * A component reaching for `flow` to time a hover state is a defect, and vice
 * versa. No values are duplicated — duplicating a token is a defect (TOKENS.md §1).
 */
export { duration, easing, flow, stagger } from './tokens';

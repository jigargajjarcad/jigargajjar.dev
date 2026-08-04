/**
 * Motion tokens (`docs/ARCHITECTURE.md` §3, §9).
 *
 * Durations and easings are primitives and live in `tokens.ts`; this module is
 * their motion-system entry point and re-exports them so that
 * `src/components/motion/` has a single import. Motion *variants* arrive in
 * Phase 5 of `ARCHITECTURE.md` §14 and are deliberately absent here.
 *
 * No values are duplicated. Duplicating a token is a defect (TOKENS.md §1).
 */
export { duration, easing, stagger } from './tokens';

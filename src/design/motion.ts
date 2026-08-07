/**
 * Motion tokens (`docs/ARCHITECTURE.md` §3, §9).
 *
 * Durations and easings are primitives and live in `tokens.ts`; this module is
 * their motion-system entry point and re-exports them so `src/components/motion/`
 * has a single import.
 *
 * ADR-021 added a second, ambient system (`flow`) for continuously animated
 * system diagrams. **ADR-023 withdrew it along with the diagrams themselves.**
 * The tokens are gone rather than retained "in case": TYPOGRAPHY.md §12 states
 * the rule this follows — an axis that is never set is dead weight — and a
 * motion system with no consumer is the same thing one layer up.
 *
 * No values are duplicated. Duplicating a token is a defect (TOKENS.md §1).
 */
export { duration, easing, stagger } from './tokens';

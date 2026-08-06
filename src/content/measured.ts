/**
 * The recorded measurements the home page renders — ADR-022.
 *
 * `measured.json` is written by `npm run measure` from the actual build output
 * and re-verified by `npm run check:measured` on every CI run, which fails if a
 * single figure has drifted. Nothing in it is typed by hand, and nothing that
 * reaches the page as a number comes from anywhere else.
 *
 * This module exists so the rest of the codebase imports a *type*, not a JSON
 * blob: the page reads `measured.bundle.homeFirstLoadKb`, and if the shape of
 * the recording ever changes, the compiler says so at every call site instead of
 * rendering `undefined` into the document.
 */

import data from './measured.json';

export type Measured = {
  /** ISO date the build-derived figures were recorded. */
  readonly measuredAt: string;
  readonly bundle: {
    readonly homeFirstLoadKb: number;
    readonly homeFirstLoadBudgetKb: number;
    readonly sharedRuntimeKb: number;
    readonly sharedRuntimeCeilingKb: number;
    readonly cssKb: number;
    readonly cssBudgetKb: number;
    readonly routes: number;
  };
  /**
   * Null until `npm run lhci` has run at least once. The page renders the
   * section without it rather than rendering a zero, because a missing
   * measurement and a measurement of zero are different facts.
   */
  readonly lighthouse: {
    readonly performance: number;
    readonly accessibility: number;
    readonly bestPractices: number;
    readonly seo: number;
    readonly lcpMs: number;
    readonly fcpMs: number;
    readonly tbtMs: number;
    readonly cls: number;
    readonly measuredAt: string;
  } | null;
  readonly gates: {
    readonly unitTests: number;
    readonly browserChecks: number;
    readonly ciSteps: number;
  };
  readonly repository: {
    readonly decisionRecords: number;
    readonly caseStudies: number;
    readonly caseStudyWords: number;
    readonly semanticColours: number;
    readonly typeTokens: number;
    readonly fontFiles: number;
    readonly fontKb: number;
    readonly fontBudgetKb: number;
    readonly thirdPartyRequests: number;
  };
};

export const measured = data as Measured;

/** Every check that must pass before a change reaches `main`. */
export const totalChecks = measured.gates.unitTests + measured.gates.browserChecks;

/**
 * Home page content — Version 4, ADR-023.
 *
 * **One idea, stated six ways.**
 *
 *   Good systems are defined by what they refuse.
 *
 * That sentence is the whole page, and every screen is an instance of it rather
 * than a separate topic. OrchestAI's elegance is rejecting a run before any
 * model is called. NovaMind's is discarding five of ten candidates before the
 * model sees anything. The method screen is a gate that blocks a merge. The
 * final screen is a list of things not built. The page itself is two hundred
 * words because the rest was refused.
 *
 * **This file is small on purpose, and that is the design.** V3's model was 512
 * lines and rendered 1,914 words across thirteen screens — an eight-minute read
 * for a visitor who stays forty-five seconds, so roughly nine per cent of it was
 * ever seen. Everything cut was true. None of it was necessary, and the true
 * things that remain are louder without it.
 *
 * The rule for adding anything here: it must strengthen the one idea. A fact
 * that is merely accurate, or merely impressive, belongs in a case study, where
 * a reader who wants it has already decided to want it.
 */

/* ────────────────────────────────────────────────────────────────────────────
 * 1. Hero — belief: this person builds production AI systems
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * The `<h1>` (ADR-020, retained). `POSITIONING` in `site.ts` remains the
 * document description and still appears verbatim as the line beneath it.
 */
export const THESIS = 'I build AI systems that survive production.';

/* ────────────────────────────────────────────────────────────────────────────
 * 2. Method — belief: there is a repeatable way of working here
 *
 * Three clauses replace V3's seven-stage grid, four gauges, six counters and
 * four caveat cards — 397 words reduced to fifteen. The third clause is the
 * only one that matters and it is last on purpose: a gate that blocks is the
 * first instance of the page's idea.
 * ──────────────────────────────────────────────────────────────────────────── */

export const METHOD = [
  'Architecture before code.',
  'Decisions on the record.',
  'Verification that blocks the merge.',
] as const;

/**
 * The evidence under the method, and the reason it is not `<code>main</code>`.
 *
 * The sentence read "Nothing reaches `main` until N checks pass", with the
 * branch name set in the code face — 14.5 px against 22.5 px of surrounding
 * lede. At that ratio an inline technical term stops reading as an intentional
 * change of voice and starts reading as a stylesheet that failed to load
 * (ADR-024). "Merges" carries the same fact, needs no second typeface, and is
 * one word shorter.
 */
export const METHOD_EVIDENCE = 'Nothing merges until';

/* ────────────────────────────────────────────────────────────────────────────
 * 3–4. The two systems — belief: these are elegant
 *
 * One idea each, chosen because each is the same idea as the page's.
 *
 * Both were traces of twelve and six spans in V3. A reader at forty-five seconds
 * did not read eighteen rows of mono; they read the headline and left. The
 * headline is now all there is, and it is the sentence the case study is
 * organised around — which is what makes it an invitation rather than a summary.
 * ──────────────────────────────────────────────────────────────────────────── */

export type System = {
  readonly slug: string;
  /** Set beneath the title in mono. Named technologies, never categories. */
  readonly meta: string;
  /** The elegant idea, in one sentence. */
  readonly idea: string;
  /** Its consequence, in one sentence. Never a third. */
  readonly consequence: string;
  /**
   * An optional figure: a payload transformation set at display size. It exists
   * only where three numerals communicate faster than a sentence — which is true
   * for retrieval and false for orchestration, so only one system has one.
   */
  readonly figure?: string;
};

export const SYSTEMS: readonly System[] = [
  {
    slug: 'orchestai',
    meta: 'Agent orchestration · .NET 8 · PostgreSQL',
    idea: 'Every decision that can reject a run happens before the first model call.',
    consequence: 'Tenant, budget, rate. A rejected run costs nothing and leaves nothing behind.',
  },
  {
    slug: 'novamind-ai',
    meta: 'Document intelligence · Python · pgvector',
    // Three numerals and two arrows, at display size. This replaced a six-row
    // waterfall and says the same thing faster than the waterfall's labels could
    // be read — which is the only test a figure on this page has to pass.
    figure: '10 → 5 → 1',
    idea: 'Vector search returns what is relevant, not what is best.',
    consequence:
      'Ten candidates become five before the model sees anything. Every claim resolves to the passage behind it.',
  },
];

/* ────────────────────────────────────────────────────────────────────────────
 * 5. Refusals — belief: this person has judgement, and says no
 *
 * The page's idea, named. Four entries, one line of consequence each.
 *
 * The fourth is a failure rather than a decision, and it is the most valuable
 * line on the site: it is the one thing here that costs something to admit. V3
 * gave the failure modes their own 363-word screen with a topology map; this is
 * that screen, at one sentence, in the section where it lands hardest.
 * ──────────────────────────────────────────────────────────────────────────── */

export type Refusal = {
  readonly id: string;
  /** What was not built. A noun phrase, three words or fewer. */
  readonly what: string;
  /** Why, and what it cost. One sentence. */
  readonly line: string;
};

export const REFUSALS: readonly Refusal[] = [
  {
    id: 'framework',
    what: 'A framework.',
    line: 'The extension points never existed. I withdrew the claim.',
  },
  {
    id: 'library',
    what: 'A retrieval library.',
    line: 'It would have skipped the part worth learning.',
  },
  {
    id: 'animation',
    what: 'An animation layer.',
    line: 'Ninety-five times the cost of the behaviour needed. This page has none.',
  },
  {
    id: 'drift',
    what: 'A guard against my own drift.',
    line: 'The description drifted for weeks. Nothing caught it, and nothing does now.',
  },
];

/**
 * The closing line, and the only place the page's idea is stated outright.
 *
 * It arrives after four demonstrations of it, so it reads as a conclusion the
 * reader has already reached rather than as a claim they are being asked to
 * accept. Naming it in the hero was tried and abandoned: an idea asserted before
 * its evidence is a slogan, and the same sentence at the end is a thesis.
 */
export const CLOSING = 'Every system here is defined by what it refuses. So is this page.';

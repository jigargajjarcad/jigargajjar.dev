import { Callout } from './Callout';
import { CodeBlock } from './CodeBlock';
import { Comparison } from './Comparison';
import { Decision } from './Decision';
import { Diagram } from './Diagram';
import { Figure } from './Figure';
import { Metric } from './Metric';
import { Timeline } from './Timeline';

/**
 * The MDX component map — `ARCHITECTURE.md` §6.4.
 *
 * "The set of components available inside a case study is closed. A closed set
 * keeps documents portable, keeps the bundle bounded, and prevents case studies
 * from accumulating one-off presentation logic."
 *
 * Exactly the eight components §6.4 enumerates. No aliases, no shorthands, no
 * additions. A case study that reaches for anything else fails to compile,
 * which is what makes the set closed in practice rather than in principle.
 *
 * Native markdown elements are not overridden here: headings, paragraphs,
 * lists, blockquotes, and inline code render as semantic HTML and take their
 * typography from the base layer in `globals.css`. COMPONENT_GUIDELINES.md §8.2
 * specifies Blockquote as quoted external material, which is what the native
 * `blockquote` element already is.
 */
export const mdxComponents = {
  Figure,
  Diagram,
  Decision,
  Timeline,
  Metric,
  Comparison,
  Callout,
  CodeBlock,
} as const;

export type MdxComponentName = keyof typeof mdxComponents;

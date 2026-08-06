import { Text } from '@/components/primitives/Text';
import { REFUSALS } from '@/content/home';

/**
 * Band 5 — what was not built, and what refusing it cost — ADR-022.
 *
 * **This band replaced V2's philosophy quotes, and the swap is the single
 * biggest improvement in the redesign.** Four aphorisms with citations create
 * the impression of someone who enjoys writing aphorisms. Six refusals with
 * costs attached create the impression of someone who has had to decide
 * something — which is the thing being hired for.
 *
 * **Every entry states its cost, and that is the structural rule.** A refusal
 * with no consequence is not a decision, it is a preference, and a list of
 * preferences is a personality test. The costs here are real and several are
 * unflattering: nine days rebuilding a solved problem, a system shipped with no
 * automated tests, an index that would not survive scale, no italic anywhere on
 * this site. Printing them is what makes the reasoning above them credible.
 *
 * **It is also the only place a portfolio can honestly show judgement about
 * AI.** Everyone lists what they adopted; adoption is a purchase decision. The
 * scarce signal is knowing where the AI-shaped answer was the wrong one — and
 * two of the six entries are exactly that.
 *
 * Static, non-interactive, and long. The reader is meant to read it, and an
 * interaction that hid five of six entries behind a control would be hiding the
 * evidence to save vertical space.
 */
export function Refusals() {
  return (
    <ol className="flex flex-col">
      {REFUSALS.map((refusal, index) => (
        <li
          key={refusal.id}
          className="grid gap-x-10 gap-y-5 border-t-hairline border-color-border-subtle py-10 last:border-b-hairline md:grid-cols-12"
        >
          <div className="flex items-baseline gap-4 md:col-span-4 md:flex-col md:gap-3">
            <Text token="mono" as="span" color="tertiary">
              {String(index + 1).padStart(2, '0')}
            </Text>
            {/*
              The obvious answer, struck through. It is the only decorative
              treatment on the page and it earns its place by carrying the
              band's entire argument in one glyph: this was available, and it was
              declined. `line-through` is announced by no screen reader, so the
              heading beneath states the outcome in plain words rather than
              relying on it.
            */}
            <span className="line-through decoration-hairline">
              <Text token="body-sm" as="span" color="tertiary">
                {refusal.obvious}
              </Text>
            </span>
          </div>

          <div className="flex flex-col gap-4 md:col-span-8">
            <Text token="heading-3" as="h3">
              {refusal.instead}
            </Text>
            <Text token="body" color="secondary">
              {refusal.why}
            </Text>
            <div className="flex flex-col gap-2 border-l-emphasis border-color-status-caution pl-5">
              <Text token="mono" as="span" color="tertiary" uppercase>
                What it cost
              </Text>
              <Text token="body-sm" as="span" color="secondary">
                {refusal.cost}
              </Text>
            </div>
            <Text token="mono" color="tertiary">
              {refusal.source}
            </Text>
          </div>
        </li>
      ))}
    </ol>
  );
}

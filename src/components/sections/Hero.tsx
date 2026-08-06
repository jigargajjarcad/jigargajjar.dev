import { LiveTrace } from '@/components/instrument/LiveTrace';
import { Container } from '@/components/primitives/Container';
import { Link } from '@/components/primitives/Link';
import { Text } from '@/components/primitives/Text';
import { THESIS } from '@/content/home';
import { measured } from '@/content/measured';
import { AVAILABILITY_STATUS, POSITIONING } from '@/content/site';

/**
 * Band 1 — the claim, and then immediately the instrument — ADR-022.
 *
 * **V2's hero drew a system. V3's hero measures one.** The difference is the
 * whole redesign. A topology with a looping pulse is an illustration: tasteful,
 * reproducible in an afternoon, and evidence of nothing. What sits here instead
 * is a trace of the reader's own page load, in milliseconds their own devtools
 * will confirm — a claim about engineering that the reader verifies by having
 * already lived through it, which is a different rhetorical position entirely
 * from being told.
 *
 * **The statement is unobstructed and the trace is beneath it, full width.**
 * Putting the instrument in a right-hand column would have cost the trace the
 * horizontal room its four columns need and cost the statement the scale that
 * makes it land. Stacking gives both what they need, and it puts the first rows
 * of the trace at the fold on a laptop — which is the strongest possible reason
 * to scroll, because the reader can see numbers arriving.
 *
 * Nothing here animates on entrance (`MOTION.md` §5, above the fold). The trace
 * bars grow to their measured length once, which is not an entrance animation
 * but the arrival of data.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* The schematic grid — the page's one piece of ornament, and the paper an
          engineer draws a system on (`systems.css` §1). */}
      <div aria-hidden="true" className="system-grid system-grid-fade absolute inset-0" />

      <Container width="wide">
        <div className="relative flex flex-col gap-16 pb-section-md pt-section-sm">
          <div className="flex flex-col gap-8">
            <p className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-md bg-color-status-positive"
              />
              <Text token="mono" as="span" color="tertiary" uppercase>
                {AVAILABILITY_STATUS}
              </Text>
            </p>

            <div className="max-w-wide">
              <Text token="hero" as="h1">
                {THESIS}
              </Text>
            </div>

            <div className="grid gap-8 md:grid-cols-12 md:items-end">
              {/*
                `POSITIONING` verbatim (`FOUNDATION.md` §5), still on the page,
                still once. ADR-020 moved it beneath the thesis; ADR-022 leaves
                it there.
              */}
              <div className="max-w-prose md:col-span-7">
                <Text token="lede" color="secondary">
                  {POSITIONING}
                </Text>
              </div>
              <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
                <Link href="/work" variant="action">
                  Read the work
                </Link>
                <Link href="/workflow" variant="action">
                  How it is built
                </Link>
              </div>
            </div>
          </div>

          {/*
            The recorded lab figures are read here, on the server, and handed
            down. See `LiveTrace` — importing them inside the client component
            would put this page's own bundle measurement into the bundle it
            measures.
          */}
          <LiveTrace
            fallback={
              measured.lighthouse
                ? { lcpMs: measured.lighthouse.lcpMs, cls: measured.lighthouse.cls }
                : null
            }
          />
        </div>
      </Container>
    </section>
  );
}

import { SystemGraph } from '@/components/system/SystemGraph';
import { Container } from '@/components/primitives/Container';
import { Link } from '@/components/primitives/Link';
import { Text } from '@/components/primitives/Text';
import {
  HERO_EDGES,
  HERO_FACTS,
  HERO_GRAPH_LABEL,
  HERO_NODES,
  HERO_VIEWBOX,
  THESIS,
} from '@/content/home';
import { AVAILABILITY_STATUS, POSITIONING } from '@/content/site';

/**
 * Band 1 — the opening claim, and a live depiction of a system that backs it.
 *
 * **Nothing here animates on entrance and nothing here is revealed by script.**
 * `MOTION.md` §5 forbids entrance animation above the fold, and the graph beside
 * the statement is server-rendered SVG whose motion is ambient rather than
 * arrival: it is already running when the first frame paints. The LCP element is
 * the `<h1>`, which is text, so the largest paint has nothing to wait for.
 *
 * **The graph is the argument, not the ornament.** It is OrchestAI's real
 * admission and execution path (`content/home.ts` cites the case study for every
 * node). A reader who recognises what an admission stage is has already been
 * told something true about the work before reading a single sentence, and a
 * reader who does not has been told that this person draws systems. Neither
 * reading is available from a photograph or an abstract gradient, which is what
 * usually occupies this position.
 *
 * **Order on mobile is text, then diagram.** Below `lg` the columns stack in DOM
 * order, so the claim is what occupies the first screen at 375 px and the
 * topology is the reward for scrolling rather than an obstacle before it.
 */
export function Hero() {
  return (
    <section>
      <div className="relative overflow-hidden">
        {/* The schematic grid. Decorative, sub-contrast, and masked to fade
            before it reaches the band edges (`systems.css` §1). */}
        <div aria-hidden="true" className="system-grid system-grid-fade absolute inset-0" />

        <Container width="wide">
          <div className="relative grid gap-16 pb-section-md pt-section-sm lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="flex flex-col gap-8 lg:col-span-7">
              <p className="flex items-center gap-3">
                {/* `shrink-0`: without it the dot is a flex item that gives up
                    width to the label beside it and renders as an ellipse. */}
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 rounded-md bg-color-status-positive"
                />
                <Text token="mono" as="span" color="tertiary" uppercase>
                  {AVAILABILITY_STATUS}
                </Text>
              </p>

              <Text token="hero" as="h1">
                {THESIS}
              </Text>

              {/*
                `POSITIONING` remains verbatim and remains on this page
                (`FOUNDATION.md` §5); ADR-020 moved it from the `<h1>` to the
                line beneath it. A category description is the right sentence to
                hand a search engine and the wrong one to open with.
              */}
              <div className="max-w-prose">
                <Text token="lede" color="secondary">
                  {POSITIONING}
                </Text>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/work" variant="action">
                  Read the work
                </Link>
                <Link href="/workflow" variant="action">
                  How it is built
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <SystemGraph
                nodes={HERO_NODES}
                edges={HERO_EDGES}
                viewBox={HERO_VIEWBOX}
                label={HERO_GRAPH_LABEL}
              />
            </div>
          </div>
        </Container>
      </div>

      {/*
        The facts strip. Three statements that are checkable, in the machine
        voice, closing the band with a horizontal rule rather than with
        whitespace — so the boundary between band 1 and band 2 is a line the
        reader crosses rather than a gap they drift through.
      */}
      <div className="border-y-hairline border-color-border-subtle bg-color-surface-raised">
        <Container width="wide">
          <dl className="grid gap-6 py-6 md:grid-cols-3">
            {HERO_FACTS.map((fact) => (
              <div key={fact.key} className="flex flex-col gap-1">
                <dt>
                  <Text token="mono" as="span" color="tertiary" uppercase>
                    {fact.key}
                  </Text>
                </dt>
                <dd>
                  <Text token="mono" as="span" color="secondary">
                    {fact.value}
                  </Text>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}

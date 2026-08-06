import { Gauge } from '@/components/instrument/Gauge';
import { Text } from '@/components/primitives/Text';
import { NOT_VERIFIED, PIPELINE } from '@/content/home';
import { measured, totalChecks } from '@/content/measured';

/**
 * Band 2 — the pipeline, and the gate that actually blocks it — ADR-022.
 *
 * **Two V2 bands merged here, and the merge made both stronger.** V2 had a
 * lifecycle band that asserted a method and, separately, no evidence of the
 * method's output anywhere on the page. The lifecycle answered the workflow
 * objection by putting "Claude Code" at stage four of seven; this band keeps
 * that and then does the thing V2 never did — opens stage five and shows the
 * numbers, live from the build, re-verified on every CI run.
 *
 * **It holds V2's position in the objection sequence.** `FOUNDATION.md` §3
 * goal 4 requires the *agents wrote this, so what did you do* objection to be
 * answered before any evidence is presented, because an unresolved objection
 * discounts everything after it. Stage four of seven still does that, and now
 * the answer arrives with a receipt attached.
 *
 * **The last block is the most important one on the page.** `NOT_VERIFIED` sits
 * directly beneath four green gauges, on purpose. A verification section showing
 * only what passes describes a system nobody has looked at hard enough, and a
 * reader senior enough to be worth convincing will assume the gaps exist whether
 * or not they are printed. Printing them is the cheaper trade.
 */
export function Verification() {
  const { bundle, gates, repository, lighthouse } = measured;

  const counts: [string, string][] = [
    ['Checks that must pass', String(totalChecks)],
    ['Blocking CI steps', String(gates.ciSteps)],
    ['Routes under audit', String(bundle.routes)],
    ['Decision records', String(repository.decisionRecords)],
    ['Third-party requests', String(repository.thirdPartyRequests)],
    [
      'Lighthouse, mobile',
      lighthouse
        ? `${lighthouse.performance} · ${lighthouse.accessibility} · ${lighthouse.seo}`
        : '—',
    ],
  ];

  return (
    <div className="flex flex-col gap-20">
      {/*
        The pipeline. Static, not explorable: in V2 this was the band's subject
        and earned an interaction; here it is the frame for the gauges below, and
        an interaction would compete with them. A component that was interactive
        yesterday is not entitled to stay interactive.
      */}
      <ol className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {PIPELINE.map((stage, index) => (
          <li
            key={stage.id}
            className="flex flex-col gap-2 border-t-hairline border-color-border-subtle pt-4"
          >
            <Text token="mono" as="span" color="tertiary">
              {String(index + 1).padStart(2, '0')}
            </Text>
            <Text token="heading-4" as="span">
              {stage.name}
            </Text>
            <Text token="mono" as="span" color="secondary">
              {stage.artifact}
            </Text>
            <Text token="body-sm" as="span" color="tertiary">
              {stage.prevents}
            </Text>
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <Text token="heading-3" as="h3">
            Stage five, in full
          </Text>
          <Text token="mono" as="span" color="tertiary">
            {`recorded ${measured.measuredAt} · re-verified every CI run`}
          </Text>
        </div>

        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          <Gauge
            label="First-load JS"
            value={bundle.homeFirstLoadKb}
            ceiling={bundle.homeFirstLoadBudgetKb}
            unit="KB"
            authority="ADR-006"
          />
          <Gauge
            label="Framework runtime"
            value={bundle.sharedRuntimeKb}
            ceiling={bundle.sharedRuntimeCeilingKb}
            unit="KB"
            authority="ADR-015"
          />
          <Gauge
            label="Webfonts"
            value={repository.fontKb}
            ceiling={repository.fontBudgetKb}
            unit="KB"
            authority="TYPOGRAPHY §5"
          />
          <Gauge
            label="CSS"
            value={bundle.cssKb}
            ceiling={bundle.cssBudgetKb}
            unit="KB"
            authority="ARCHITECTURE §10"
          />
        </div>

        <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {counts.map(([term, value]) => (
            <div
              key={term}
              className="flex items-baseline justify-between gap-4 border-t-hairline border-color-border-subtle pt-4"
            >
              <dt>
                <Text token="mono" as="span" color="tertiary" uppercase>
                  {term}
                </Text>
              </dt>
              <dd>
                <Text token="heading-4" as="span">
                  {value}
                </Text>
              </dd>
            </div>
          ))}
        </dl>

        <p className="max-w-prose">
          <Text token="body-sm" as="span" color="tertiary">
            Every figure above is produced by a script from the build output and committed. A
            separate CI step recomputes them and fails if one has drifted, so a number here cannot
            go stale without the pipeline going red.
          </Text>
        </p>
      </div>

      <div className="flex flex-col gap-8 border-t-hairline border-color-border-subtle pt-10">
        <div className="flex flex-col gap-3">
          <Text token="heading-3" as="h3">
            What none of it reaches
          </Text>
          <div className="max-w-prose">
            <Text token="body" color="secondary">
              Four gauges and {totalChecks} checks establish that this page is fast, correct and
              reachable. Here is what they say nothing about.
            </Text>
          </div>
        </div>

        <ul className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {NOT_VERIFIED.map((gap) => (
            <li
              key={gap.id}
              className="flex flex-col gap-3 border-t-hairline border-color-border-subtle pt-5"
            >
              <Text token="heading-4" as="span" color="secondary">
                {gap.claim}
              </Text>
              <Text token="body-sm" as="span" color="secondary">
                {gap.reality}
              </Text>
              <Text token="mono" as="span" color="tertiary">
                {gap.source}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

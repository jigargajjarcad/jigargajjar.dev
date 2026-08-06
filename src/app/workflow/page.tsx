import type { Metadata } from 'next';

import { Callout } from '@/components/content/Callout';
import { Reveal } from '@/components/motion/Reveal';
import { Card } from '@/components/primitives/Card';
import { Container } from '@/components/primitives/Container';
import { Link } from '@/components/primitives/Link';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';
import { pageMetadata } from '@/app/metadata';

/**
 * `/workflow` — implemented from `docs/wireframes/04-workflow.md`, which is the
 * contract. Specified by `ARCHITECTURE.md` §6.6 and ADR-014.
 *
 * Converts the AI-native claim from an assertion into a described, checkable
 * process. The collaborator audience (`FOUNDATION.md` §4.4) is the decisive
 * reader here — this is the single most relevant surface on the site for
 * someone deciding whether to work alongside this engineer.
 *
 * Sections 1–7 are implemented. Section 8, the engineering notes region, is
 * deliberately absent: ADR-014 created it with "no index, no feed, no latest"
 * precisely so it carries no publishing promise, which means a region that
 * starts empty and grows is consistent with the decision in a way that a
 * half-written essay would not be.
 *
 * **Provenance.** Every stage field, every gate named in the verification
 * model, and all three failure modes describe this repository. The stage table
 * is the process that produced the site the reader is on; the failure modes are
 * incidents it actually had, not categories chosen for balance.
 *
 * The sequence is a semantic `<ol>`, never the Timeline component:
 * `COMPONENT_GUIDELINES.md` §7 restricts Timeline to project chronology inside
 * a case study, and §6.6 explicitly permits "semantic markup styled as a
 * sequence". The wireframe records that near-miss as a rejected option.
 */

type Stage = {
  name: string;
  input: string;
  output: string;
  /** Matches the ownership split below: six human, four delegated. */
  owner: 'Human' | 'Delegated';
  doneWhen: string;
};

/** Wireframe §4 — the ten stages, in order, with the four-field shape. */
const STAGES: Stage[] = [
  {
    name: 'Problem',
    input: 'A stated need, a defect, or an objection a reader will raise',
    output: 'A written problem statement carrying its constraints',
    owner: 'Human',
    doneWhen: 'The constraint is named, not just the symptom',
  },
  {
    name: 'Architecture',
    input: 'The problem statement',
    output: 'Structure, boundaries, and the budget the work has to fit',
    owner: 'Human',
    doneWhen: 'The shape is specified before any file is created',
  },
  {
    name: 'Decision records',
    input: 'A choice with more than one defensible answer',
    output: 'A record with the alternatives that lost and the condition that reopens it',
    owner: 'Human',
    doneWhen: 'The rejected options are written down with their reasons',
  },
  {
    name: 'Planning',
    input: 'The architecture and the decision records',
    output: 'A sequenced task list, each step carrying an exit condition',
    owner: 'Delegated',
    doneWhen: 'Every step can be checked rather than judged',
  },
  {
    name: 'Implementation with Claude Code',
    input: 'The plan and the frozen specification',
    output: 'Code that follows the specification rather than redesigning it',
    owner: 'Delegated',
    doneWhen: 'The change builds and the gates it touches pass',
  },
  {
    name: 'Verification',
    input: 'The implementation and the claim it makes',
    output: 'Evidence that the change does what was specified',
    owner: 'Human',
    doneWhen: 'The claim has been checked against the artifact, not against memory',
  },
  {
    name: 'Testing',
    input: 'The behaviour that has to hold',
    output: 'Tests that fail on the defect and pass on the fix',
    owner: 'Delegated',
    doneWhen: 'The test has been seen to fail, for the right reason',
  },
  {
    name: 'Review',
    input: 'The diff, and the specification it claims to implement',
    output: 'Accepted, corrected, or reverted',
    owner: 'Human',
    doneWhen: 'Every claim in the change traces to a source',
  },
  {
    name: 'Release',
    input: 'A green pipeline',
    output: 'A commit, and a deployment that follows from it',
    owner: 'Delegated',
    doneWhen: 'Every gate is green against the production build',
  },
  {
    name: 'Retrospective',
    input: 'What went wrong, and what it cost',
    output: 'A recorded failure, a new gate, or a revisit trigger',
    owner: 'Human',
    doneWhen: 'The failure has produced a change, not just a note',
  },
];

/** Wireframe §4 — six owned, four delegated. The division is the argument. */
const OWNED = [
  'Problem',
  'Architecture',
  'Decision records',
  'Verification',
  'Review',
  'Retrospective',
];

const DELEGATED = ['Planning detail', 'Implementation', 'Testing', 'Release mechanics'];

const REPO = 'https://github.com/jigargajjarcad/jigargajjar.dev';

/** Wireframe §4 — each entry is checkable in one click. */
const EVIDENCE = [
  { href: `${REPO}/tree/main/docs`, label: 'The specification — every document, written first' },
  { href: `${REPO}/blob/main/docs/DECISIONS.md`, label: 'Decision records — 19 ADRs' },
  { href: `${REPO}/tree/main/.github/workflows`, label: 'CI configuration — the gates themselves' },
  { href: `${REPO}/tree/main/tests`, label: 'The test suites' },
];

function OwnershipCard({ label, stages }: { label: string; stages: string[] }) {
  return (
    <Card>
      <Stack gap={3}>
        <Text token="label" as="p" uppercase color="secondary">
          {label}
        </Text>
        <ul aria-label={`${label} stages`} className="flex flex-col gap-2">
          {stages.map((stage) => (
            <li key={stage}>
              <Text token="body" as="span">
                {stage}
              </Text>
            </li>
          ))}
        </ul>
      </Stack>
    </Card>
  );
}

/** The four-field shape, as a definition list so each label names its value. */
function StageDetail({ stage }: { stage: Stage }) {
  const fields: [string, string][] = [
    ['Input', stage.input],
    ['Output', stage.output],
    ['Owner', stage.owner],
    ['Done when', stage.doneWhen],
  ];

  return (
    <Stack gap={3}>
      <Text token="heading-3" as="h3">
        {stage.name}
      </Text>
      <dl className="grid gap-x-4 gap-y-2 md:grid-cols-[7rem_1fr]">
        {fields.map(([label, value]) => (
          <div key={label} className="contents">
            <dt>
              <Text token="label" color="secondary" as="span" uppercase>
                {label}
              </Text>
            </dt>
            <dd className="m-0">
              <Text token="body" as="span">
                {value}
              </Text>
            </dd>
          </div>
        ))}
      </dl>
    </Stack>
  );
}

export const metadata: Metadata = pageMetadata({
  title: 'Workflow',
  description:
    'The ten stages between a problem and a release — what is owned, what is delegated, how ' +
    'correctness is established, and where the process breaks down.',
  path: '/workflow',
});

export default function WorkflowPage() {
  return (
    <Container width="wide">
      <Stack gap={20}>
        {/* ── Thesis ────────────────────────────────────────────────────
            Above the fold. Nothing here animates (`MOTION.md` §5). */}
        <Stack gap={6}>
          <Text token="heading-1" as="h1">
            Workflow
          </Text>
          <Text token="body">
            Engineering is no longer constrained by writing code. It is constrained by making
            correct technical decisions.
          </Text>
          <Text token="body">
            This is the process that follows from that. It is not a philosophy — it is what actually
            happens between a problem and a release, including the parts that go wrong.
          </Text>
        </Stack>

        {/* ── The sequence ──────────────────────────────────────────────
            An `<ol>` so position and count are announced. Two columns at
            `md`, filled column-major so DOM order and reading order both run
            1→10; row-major would put stage 2 beside stage 1 and break the
            sequence visually. At `lg` the whole shape is visible at once,
            connected by generated content that carries an empty alt string so
            it is drawn but never announced. */}
        <Reveal>
          <Stack gap={6}>
            <Text token="heading-2" as="h2">
              The sequence
            </Text>
            <ol className="grid list-inside list-decimal gap-3 md:grid-flow-col md:grid-rows-5 lg:flex lg:flex-wrap lg:gap-x-2">
              {STAGES.map((stage) => (
                <li
                  key={stage.name}
                  className="lg:after:mx-2 lg:after:text-color-text-tertiary lg:after:[content:'→'/''] lg:last:after:content-none"
                >
                  <Text token="body" as="span">
                    {stage.name}
                  </Text>
                </li>
              ))}
            </ol>
            <Text token="body">
              Ten stages. Four are delegated. The other six are not, and that division is the whole
              argument.
            </Text>
          </Stack>
        </Reveal>

        {/* ── Ownership ─────────────────────────────────────────────────
            The objection answer, made structural. A two-column list of what is
            and is not delegated is checkable in five seconds; prose making the
            same point takes a paragraph and is easier to disbelieve. */}
        <Reveal>
          <Stack gap={6}>
            <Text token="heading-2" as="h2">
              Ownership
            </Text>
            <div className="grid gap-4 md:grid-cols-2">
              <OwnershipCard label="Owned" stages={OWNED} />
              <OwnershipCard label="Delegated" stages={DELEGATED} />
            </div>
            <Text token="body">
              The objection this answers: if agents write the code, do I understand it? I define
              what correct means and I verify it. I do not type the implementation, and I do not
              delegate the definition of correct.
            </Text>
          </Stack>
        </Reveal>

        {/* ── Each stage ────────────────────────────────────────────────
            The four-field shape, ten times. "Done when" is the field that
            makes the rest usable: a stage without an exit condition is a
            stage that ends when somebody feels finished. */}
        <Reveal>
          <Stack gap={8}>
            <Text token="heading-2" as="h2">
              Each stage
            </Text>
            <Stack gap={8}>
              {STAGES.map((stage) => (
                <StageDetail key={stage.name} stage={stage} />
              ))}
            </Stack>
          </Stack>
        </Reveal>

        {/* ── Verification model ────────────────────────────────────────
            The load-bearing section: it answers the objection every skeptical
            reader arrives with. */}
        <Reveal>
          <Stack gap={6}>
            <Text token="heading-2" as="h2">
              How I know it is correct
            </Text>
            <Text token="body">
              Code arrives faster than anyone can read it line by line. That is the real objection
              to this way of working, and the answer is not that I read it all anyway. The answer is
              that correctness is defined before the code exists, and checked by something that does
              not get tired.
            </Text>
            <Text token="body">
              Twelve gates run on every change, in two pipelines. The first refuses work that is
              wrong in a way a machine can see: a frozen lockfile, strict type checking, linting
              that includes accessibility rules at zero warnings, a formatter, a token check that
              fails on any hard-coded design value, the unit suite over the content layer, a
              production build, and an assertion that the JavaScript budget still holds. The second
              runs against that production build: Lighthouse across every route, axe with the
              accessibility rule set, a browser suite covering keyboard traversal, reduced motion
              and rendering with JavaScript disabled, an assertion that the page makes exactly zero
              third-party requests, and a link check.
            </Text>
            <Text token="body">
              Each one catches something the others cannot. Types catch shape, not behaviour. Unit
              tests catch behaviour, not layout. Lighthouse catches weight and paint, but will not
              tell you that a heading level was skipped. axe catches that, and will happily pass a
              diagram whose labels never rendered — which happened here, because the element carried
              a correct accessible name and painted nothing. The browser suite caught none of it
              either, until a test was written that asserted the labels occupied non-zero width.
            </Text>
            <Text token="body">
              So the honest version is that gates catch most things and miss a category, and the
              category they miss is the one where the check itself is wrong. The compensation is
              that a gate is treated as a claim like any other: when a suite passes, that is
              evidence it ran, not evidence it tested. Two gates on this site reported green for
              weeks while verifying nothing, and both were found by asking what would have to be
              true for the result to be meaningless.
            </Text>
          </Stack>
        </Reveal>

        {/* ── Failure modes ─────────────────────────────────────────────
            The pivotal section, and it is not buried. A collaborator has no
            interview to fall back on; they are deciding whether this person
            will tell them when something is going wrong. Three explicit
            callouts rather than a paragraph, per the wireframe's rationale. */}
        <Reveal>
          <Stack gap={6}>
            <Text token="heading-2" as="h2">
              Where this breaks down
            </Text>
            <Callout variant="caution" heading="Specification ambiguity">
              <Text token="body">
                The process assumes the specification answers the question. Five of this
                project&rsquo;s decision records exist only because it did not — a budget that
                contradicted its own architecture, a field required by the schema that nothing
                rendered, an estimate nobody had measured. Each cost a stop. What compensates is
                that stopping is cheaper than guessing: the ambiguity becomes a written decision
                with its alternatives, and the next person meets an answer rather than the same gap.
              </Text>
            </Callout>
            <Callout variant="caution" heading="Verification gaps">
              <Text token="body">
                A gate that passes without testing anything is worse than no gate, because it buys
                confidence it has not earned. On this site the reduced-motion check ran for weeks
                against a browser that had reduced motion switched off, and a diagram shipped with
                every label invisible while the accessibility gate passed it. Both were found by
                accident. What compensates is meta-assertion — the checks now fail loudly if their
                own emulation stops applying — and the habit of asking what would make a green
                result meaningless.
              </Text>
            </Callout>
            <Callout variant="caution" heading="Volume outpacing review">
              <Text token="body">
                Implementation arrives faster than it can be read closely, and reading everything
                closely would remove the advantage entirely. The failure mode is real: review
                degrades into skimming, and skimming approves whatever looks familiar. What
                compensates is putting the gates in place before the features, reviewing structure
                rather than style, and refusing to merge on anything but a green pipeline — plus
                accepting that some defects will be found later, by a gate that did not exist yet.
              </Text>
            </Callout>
          </Stack>
        </Reveal>

        {/* ── Evidence ──────────────────────────────────────────────────
            Every stage above is visible in this repository, which is the only
            reason the page is worth reading. */}
        <Reveal>
          <Stack gap={6}>
            <Text token="heading-2" as="h2">
              See it in practice
            </Text>
            <Text token="body">
              Every stage above is visible in this repository. The specification was written before
              the application existed, the decisions record what was rejected, and the gates ran
              against an empty page before any feature was built.
            </Text>
            <Stack gap={3} as="ul">
              {EVIDENCE.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} external>
                    {item.label}
                  </Link>
                </li>
              ))}
            </Stack>
          </Stack>
        </Reveal>
      </Stack>
    </Container>
  );
}

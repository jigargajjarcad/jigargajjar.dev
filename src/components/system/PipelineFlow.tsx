'use client';

import { Fragment, type CSSProperties } from 'react';

import { NOVAMIND_PIPELINE, NOVAMIND_PIPELINE_LABEL } from '@/content/home';
import { Text } from '@/components/primitives/Text';
import { flow } from '@/design/motion';

import { useRovingTabs } from './useRovingTabs';

/**
 * The retrieval pipeline, as a traversable sequence — ADR-020, band 4.
 *
 * **The `shape` line is the component.** Every RAG diagram on the internet draws
 * the same seven boxes; almost none of them say what leaves each one. Reading
 * `1 document → n passages → n × 1024 → 10 candidates → 5 passages → 1 answer`
 * down the row tells a reader who knows the domain that reranking is present and
 * that generation sees five passages rather than ten — which is the single
 * non-obvious decision in the whole pipeline. The boxes are the excuse to show
 * that line.
 *
 * **The pulse crosses connectors in sequence, not all at once.** Each connector
 * is offset by `flow.stagger` from the one before it, so a single pulse appears
 * to travel the length of the pipeline. Firing every connector together would
 * depict seven independent stages, which is the opposite of what a pipeline is.
 */

/**
 * A connector between two stages. Purely decorative — the sequence itself is
 * carried by the list order and by each stage's number, both of which are
 * available to a screen reader. It renders in both orientations because the
 * pipeline is a row above `lg` and a column below it, and a rotated single
 * element would rotate the dash geometry with it.
 */
function Connector({ index }: { index: number }) {
  const style = { '--flow-offset': `${index * flow.stagger}ms` } as CSSProperties;
  return (
    <>
      <svg viewBox="0 0 8 32" className="h-8 w-2 lg:hidden" aria-hidden="true">
        <path d="M4 0 V32" className="system-edge" />
        <path d="M4 0 V32" pathLength={100} className="system-flow" style={style} />
      </svg>
      <svg viewBox="0 0 32 8" className="hidden h-2 w-8 lg:block" aria-hidden="true">
        <path d="M0 4 H32" className="system-edge" />
        <path d="M0 4 H32" pathLength={100} className="system-flow" style={style} />
      </svg>
    </>
  );
}

export function PipelineFlow() {
  const { selected, tabProps, active } = useRovingTabs(NOVAMIND_PIPELINE);
  if (!active) return null;

  return (
    <div>
      {/*
        The diagram in one sentence, for a reader who is not looking at it. The
        stage buttons carry the same information but as seven fragments; a
        pipeline is a claim about an order, and an order is best given as prose.
      */}
      <p className="sr-only">{NOVAMIND_PIPELINE_LABEL}</p>

      <ol
        role="tablist"
        aria-label="Retrieval pipeline stages"
        aria-orientation="horizontal"
        className="flex flex-col items-start lg:flex-row lg:items-stretch"
      >
        {NOVAMIND_PIPELINE.map((stage, index) => (
          <Fragment key={stage.id}>
            <li role="presentation" className="w-full lg:w-auto lg:flex-1">
              <button
                {...tabProps(index, stage.id)}
                type="button"
                className={`system-target flex h-full w-full min-h-target-min flex-col gap-2 border-hairline px-4 py-4 text-left ${
                  index === selected
                    ? 'border-color-border-strong bg-color-surface-raised'
                    : 'border-color-border-subtle bg-color-surface-base'
                }`}
              >
                <Text token="mono" as="span" color="tertiary">
                  {String(index + 1).padStart(2, '0')}
                </Text>
                <Text token="label" as="span" color={index === selected ? 'primary' : 'secondary'}>
                  {stage.name}
                </Text>
                {/*
                  `mt-auto` pushes the shape to the card floor. Stage 4's name
                  wraps to two lines and every other one does not, so following
                  the name would drop this line out of alignment on exactly the
                  card where the narrowing starts — and reading the shapes across
                  the row is the entire point of the component.

                  `color-flow` is the diagram accent but is below the 4.5:1 text
                  floor; `text-accent` is the tested one. Meaning goes in the
                  tested token, never in the graphic token.
                */}
                <span className="mt-auto font-mono text-type-mono text-color-text-accent">
                  {stage.shape}
                </span>
              </button>
            </li>
            {index < NOVAMIND_PIPELINE.length - 1 ? (
              <li
                role="presentation"
                aria-hidden="true"
                className="flex items-center justify-center self-center px-6 lg:px-0"
              >
                <Connector index={index} />
              </li>
            ) : null}
          </Fragment>
        ))}
      </ol>

      <div
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
        tabIndex={-1}
        className="mt-10 grid min-h-16 gap-6 border-t-hairline border-color-border-subtle pt-8 md:grid-cols-12"
      >
        <div className="flex flex-col gap-2 md:col-span-4">
          <Text token="heading-3" as="p">
            {active.name}
          </Text>
          <Text token="mono" color="tertiary">
            {active.how}
          </Text>
        </div>
        <div className="md:col-span-8">
          <Text token="lede" color="secondary">
            {active.body}
          </Text>
        </div>
      </div>
    </div>
  );
}

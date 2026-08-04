import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import matter from 'gray-matter';
import { afterEach, describe, expect, it } from 'vitest';

import { caseStudyFrontmatterSchema } from '../../src/content/schema';
import {
  ContentValidationError,
  loadCaseStudies,
  loadCaseStudy,
  loadCaseStudySlugs,
} from '../../src/content/loader';

/**
 * Content layer — `ARCHITECTURE.md` §6.3 frontmatter contract and §14 phase 2.
 *
 * Fixtures are written to a temporary directory rather than into
 * `content/case-studies/`, because those directories hold real site content and
 * a test fixture is not content.
 */

const VALID = {
  title: 'OrchestAI',
  slug: 'orchestai',
  competency: 'ai-infrastructure',
  summary: 'A multi-agent framework on .NET, built so other engineers can extend it.',
  role: 'Sole engineer — architecture, direction, verification',
  stack: ['.NET', 'CQRS', 'MCP'],
  outcomes: ['One', 'Two', 'Three'],
  sourceUrl: 'https://github.com/example/orchestai',
  disclosure: 'public',
  lifecycle: 'production',
  order: 1,
  visibility: 'published',
  updated: '2026-08-04',
  cover: { src: 'cover.png', alt: 'Architecture diagram', width: 1200, height: 630 },
} as const;

const roots: string[] = [];

function makeRoot(studies: Record<string, Record<string, unknown>>): string {
  const root = mkdtempSync(join(tmpdir(), 'case-studies-'));
  roots.push(root);
  for (const [directory, frontmatter] of Object.entries(studies)) {
    mkdirSync(join(root, directory), { recursive: true });
    // gray-matter's own serialiser, so the fixture is valid YAML by
    // construction rather than by a hand-rolled approximation.
    writeFileSync(join(root, directory, 'index.mdx'), matter.stringify('\nBody.\n', frontmatter));
  }
  return root;
}

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe('frontmatter schema — ARCHITECTURE.md §6.3', () => {
  it('accepts a complete, valid case study', () => {
    expect(caseStudyFrontmatterSchema.safeParse(VALID).success).toBe(true);
  });

  it('rejects a summary over 180 characters', () => {
    const result = caseStudyFrontmatterSchema.safeParse({ ...VALID, summary: 'x'.repeat(181) });
    expect(result.success).toBe(false);
  });

  it('requires exactly three outcomes', () => {
    for (const outcomes of [['One'], ['One', 'Two'], ['One', 'Two', 'Three', 'Four']]) {
      expect(caseStudyFrontmatterSchema.safeParse({ ...VALID, outcomes }).success).toBe(false);
    }
  });

  it('requires sourceUrl when disclosure is public', () => {
    const { sourceUrl: _omitted, ...withoutSource } = VALID;
    expect(caseStudyFrontmatterSchema.safeParse(withoutSource).success).toBe(false);
  });

  it('permits a restricted case study with no source — Edge10 has none', () => {
    const { sourceUrl: _omitted, ...withoutSource } = VALID;
    const result = caseStudyFrontmatterSchema.safeParse({
      ...withoutSource,
      disclosure: 'restricted',
    });
    expect(result.success).toBe(true);
  });

  it('requires alt text on the cover — ARCHITECTURE.md §7', () => {
    const result = caseStudyFrontmatterSchema.safeParse({
      ...VALID,
      cover: { ...VALID.cover, alt: '' },
    });
    expect(result.success).toBe(false);
  });

  it('enumerates competency so ADR-012 is enforced by the type system', () => {
    expect(caseStudyFrontmatterSchema.safeParse({ ...VALID, competency: 'design' }).success).toBe(
      false,
    );
  });

  it('enumerates all eight lifecycle values and rejects anything else', () => {
    const values = [
      'production',
      'released',
      'maintained',
      'experimental',
      'research',
      'prototype',
      'archived',
      'future',
    ];
    for (const lifecycle of values) {
      expect(caseStudyFrontmatterSchema.safeParse({ ...VALID, lifecycle }).success).toBe(true);
    }
    expect(caseStudyFrontmatterSchema.safeParse({ ...VALID, lifecycle: 'live' }).success).toBe(
      false,
    );
  });

  it('keeps lifecycle and visibility as separate fields', () => {
    // A published case study about an archived project is normal and valuable.
    const result = caseStudyFrontmatterSchema.safeParse({
      ...VALID,
      lifecycle: 'archived',
      visibility: 'published',
    });
    expect(result.success).toBe(true);
  });

  it('requires an ISO date for updated', () => {
    expect(
      caseStudyFrontmatterSchema.safeParse({ ...VALID, updated: '4 August 2026' }).success,
    ).toBe(false);
  });
});

describe('loader — ARCHITECTURE.md §3 rule 4, §6.3', () => {
  it('loads and validates a case study', () => {
    const root = makeRoot({ orchestai: VALID });
    const study = loadCaseStudy(root, 'orchestai');
    expect(study.frontmatter.title).toBe('OrchestAI');
    expect(study.body.trim()).toBe('Body.');
    expect(study.directory).toBe('orchestai');
  });

  it('fails the build when the slug disagrees with its directory', () => {
    const root = makeRoot({ 'orchest-ai': VALID });
    expect(() => loadCaseStudy(root, 'orchest-ai')).toThrow(ContentValidationError);
  });

  it('fails the build on malformed frontmatter rather than rendering it', () => {
    const root = makeRoot({ orchestai: { ...VALID, outcomes: ['Only one'] } });
    expect(() => loadCaseStudy(root, 'orchestai')).toThrow(/Exactly three outcomes/);
  });

  it('excludes drafts from the build', () => {
    const root = makeRoot({
      orchestai: VALID,
      novamind: { ...VALID, slug: 'novamind', order: 2, visibility: 'draft' },
    });
    expect(loadCaseStudies(root).map((s) => s.directory)).toEqual(['orchestai']);
  });

  it('sorts by order, which is competency-driven and not chronological', () => {
    const root = makeRoot({
      edge10: { ...VALID, slug: 'edge10', order: 3 },
      orchestai: { ...VALID, order: 1 },
      novamind: { ...VALID, slug: 'novamind', order: 2 },
    });
    expect(loadCaseStudies(root).map((s) => s.frontmatter.order)).toEqual([1, 2, 3]);
  });

  it('rejects a duplicate order — ordering would be non-deterministic', () => {
    const root = makeRoot({
      orchestai: VALID,
      novamind: { ...VALID, slug: 'novamind', order: 1 },
    });
    expect(() => loadCaseStudies(root)).toThrow(/already used by/);
  });

  it('returns published slugs for generateStaticParams', () => {
    const root = makeRoot({
      orchestai: VALID,
      novamind: { ...VALID, slug: 'novamind', order: 2, visibility: 'draft' },
    });
    expect(loadCaseStudySlugs(root)).toEqual(['orchestai']);
  });

  it('returns an empty set when no content exists yet', () => {
    const root = makeRoot({});
    expect(loadCaseStudies(root)).toEqual([]);
    expect(loadCaseStudies('does/not/exist')).toEqual([]);
  });
});

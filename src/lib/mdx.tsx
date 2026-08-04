import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';

import { mdxComponents } from '@/components/content/mdx-components';

/**
 * MDX compilation — `ARCHITECTURE.md` §3, §6.1, §6.4.
 *
 * Pipeline: filesystem -> content loader -> schema validation -> MDX compile ->
 * component mapping -> semantic HTML. This module owns compile and mapping;
 * `src/content/loader.ts` owns the filesystem and validation.
 *
 * Evaluated on the server during static generation (`ARCHITECTURE.md` §2), so
 * the output is HTML in the build artefact and no MDX runtime reaches the
 * client. The bundle budget is unaffected.
 *
 * No remark or rehype plugins are configured. None is specified, and every
 * plugin is bytes and behaviour the documentation did not ask for. Comparison
 * is a component rather than a markdown table, so GFM is not required.
 *
 * `@mdx-js/mdx` directly, rather than a wrapper: `next-mdx-remote@6` silently
 * drops MDX expression attributes, compiling `<Timeline entries={[…]} />` to
 * `Timeline({})`. Six of the eight components in the closed set take non-string
 * props, so that wrapper cannot render the documented map.
 */
export async function CaseStudyBody({ source }: { source: string }) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    baseUrl: import.meta.url,
  });
  return <Content components={mdxComponents} />;
}

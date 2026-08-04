import Image from 'next/image';
import type { ReactNode } from 'react';

/**
 * COMPONENT_GUIDELINES.md §8.4 — image or inline diagram with caption.
 *
 * Alt text is a schema requirement, not a convention (ARCHITECTURE.md §7), so
 * it is a required prop. The caption is not alt text: the caption is visible to
 * everyone and adds context; the alt describes the image for those who cannot
 * see it. Duplicating one into the other serves neither.
 *
 * Explicit dimensions always — the primary CLS defence.
 */
export function Figure({
  src,
  alt,
  width,
  height,
  caption,
  children,
}: {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  caption: string;
  /** An inline `Diagram` instead of a raster image. */
  children?: ReactNode;
}) {
  return (
    <figure>
      {children ?? (
        <Image src={src ?? ''} alt={alt ?? ''} width={width ?? 0} height={height ?? 0} />
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

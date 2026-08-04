/** Statically generated per case study once the content layer exists (phase 2). */
export function generateStaticParams(): { slug: string }[] {
  return [];
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <h1>{slug}</h1>;
}

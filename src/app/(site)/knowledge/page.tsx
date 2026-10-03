import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { PageTitle } from '@/components/site/page-title';
import { BlockRenderer, Block } from '@/components/admin/block-renderer';
import { getKnowledgePage } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Knowledge',
  description: 'Technical interests, current learning areas, and engineering approach.',
  openGraph: {
    title: 'Knowledge — d3f4lt0',
    description: 'Technical interests, current learning areas, and engineering approach.',
    url: 'https://d3f4lt0.dev/knowledge',
    siteName: 'd3f4lt0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Knowledge — d3f4lt0',
    description: 'Technical interests, current learning areas, and engineering approach.',
  },
};

export default function KnowledgePage() {
  const knowledge = getKnowledgePage();
  const blocks = (knowledge.blocks || []) as Block[];

  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <PageTitle>{knowledge.title || 'Knowledge'}</PageTitle>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl space-y-10">
          {blocks
            .sort((a, b) => a.order - b.order)
            .map((block) => (
              <BlockRenderer key={block.id} block={block} />
            ))}
        </div>
      </Section>
    </div>
  );
}

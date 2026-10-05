import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { PageTitle } from '@/components/site/page-title';
import { BlockRenderer, Block } from '@/components/admin/block-renderer';
import { getAboutPage } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About',
  description: 'Building software one system at a time. This website documents projects, technical decisions, and experiments built with an architecture-first mindset.',
  openGraph: {
    title: 'About — d3f4lt0',
    description: 'Building software one system at a time. This website documents projects, technical decisions, and experiments built with an architecture-first mindset.',
    url: 'https://d3f4lt0.dev/about',
    siteName: 'd3f4lt0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — d3f4lt0',
    description: 'Building software one system at a time. This website documents projects, technical decisions, and experiments built with an architecture-first mindset.',
  },
};

export default function AboutPage() {
  const about = getAboutPage();
  const blocks = (about?.blocks || []) as Block[];

  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <PageTitle>{about?.title || 'Building software one system at a time.'}</PageTitle>
          <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">{about?.body || ''}</p>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl space-y-10">
          {blocks
            .filter((b) => b.id !== 'about-hero-title' && b.id !== 'about-hero-body')
            .sort((a, b) => a.order - b.order)
            .reduce<Array<{ block: Block; contact?: boolean }>>((acc, block) => {
              const isContact = block.id.startsWith('about-contact');
              if (isContact && acc.length && acc[acc.length - 1].contact) {
                acc[acc.length - 1].block = block;
              } else {
                acc.push({ block, contact: isContact });
              }
              return acc;
            }, [])
            .map(({ block, contact }) => (
              contact ? (
                <div key={block.id} id="contact">
                  <BlockRenderer block={block} />
                </div>
              ) : (
                <BlockRenderer key={block.id} block={block} />
              )
            ))}
        </div>
      </Section>
    </div>
  );
}

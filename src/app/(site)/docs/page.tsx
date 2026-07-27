import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { PageTitle } from '@/components/site/page-title';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Architecture and design documentation.',
  openGraph: {
    title: 'Documentation — d3f4lt0',
    description: 'Architecture and design documentation.',
    url: 'https://d3f4lt0.dev/docs',
    siteName: 'd3f4lt0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Documentation — d3f4lt0',
    description: 'Architecture and design documentation.',
  },
};

export default function DocsPage() {
  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <PageTitle>Documentation</PageTitle>
          <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">
            Architecture and design documentation.
          </p>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            number="01"
            title="Architecture"
            description="System design, data flow, and component interactions."
          />
          <div className="mt-6">
            <Link
              href="/docs/architecture"
              className="link-underline text-sm font-medium text-primary"
            >
              View architecture documentation
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { PageTitle } from '@/components/site/page-title';

export const metadata: Metadata = {
  title: 'Architecture',
  description: 'System design, data flow, and component interactions.',
  openGraph: {
    title: 'Architecture — d3f4lt0',
    description: 'System design, data flow, and component interactions.',
    url: 'https://d3f4lt0.dev/docs/architecture',
    siteName: 'd3f4lt0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Architecture — d3f4lt0',
    description: 'System design, data flow, and component interactions.',
  },
};

export default function DocsArchitecturePage() {
  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <PageTitle>Architecture</PageTitle>
          <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">
            System design, data flow, and component interactions.
          </p>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            number="01"
            title="Overview"
          />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              Documentation is in progress. This page will contain architecture diagrams, data flow descriptions, and component interaction details.
            </p>
            <p>
              For now, the best source of truth is the project repositories and the journal.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="/docs"
              className="link-underline text-sm font-medium text-primary"
            >
              Back to documentation
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

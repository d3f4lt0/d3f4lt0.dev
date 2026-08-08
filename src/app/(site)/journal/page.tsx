import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { PageTitle } from '@/components/site/page-title';
import { TimelineItem } from '@/components/ui/timeline-item';
import { getJournalEntries } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Development notes, release notes, and technical decisions.',
  openGraph: {
    title: 'Journal — d3f4lt0',
    description: 'Development notes, release notes, and technical decisions.',
    url: 'https://d3f4lt0.dev/journal',
    siteName: 'd3f4lt0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Journal — d3f4lt0',
    description: 'Development notes, release notes, and technical decisions.',
  },
};

export default async function JournalPage() {
  const journalEntries = getJournalEntries();

  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <PageTitle>Journal</PageTitle>
          <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">
            Journal of decisions, milestones, and lessons learned.
          </p>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            number="01"
            title="Recent Entries"
            description="Chronological log of engineering milestones."
          />
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <Card className="border-border/60 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="divide-y divide-border/60">
                {journalEntries.map((entry) => (
                  <TimelineItem
                    key={entry.date + entry.title}
                    date={entry.date}
                    title={entry.title}
                    summary={entry.summary}
                    href={entry.href}
                    lessonsLearned=""
                    relatedProject={entry.relatedProject}
                    relatedProjectHref={entry.relatedProjectHref}
                    status={entry.status}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="mt-8">
            <Link
              href="#"
              className="link-underline text-sm font-medium text-primary"
            >
              View archive
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

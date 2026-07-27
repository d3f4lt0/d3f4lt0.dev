import { Metadata } from 'next';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import { PageTitle } from '@/components/site/page-title';
import { ProjectTimeline } from '@/components/site/project-timeline';
import { GitHubMetadataCard } from '@/components/site/github-metadata';
import { GitHubMetadata } from '@/lib/github';

export const metadata: Metadata = {
  title: 'phantom-fetch',
  description: 'Headless content fetcher with stealth mode, cookie handling, and structured output.',
  openGraph: {
    title: 'phantom-fetch — d3f4lt0',
    description: 'Headless content fetcher with stealth mode, cookie handling, and structured output.',
    url: 'https://d3f4lt0.dev/projects/phantom-fetch',
    siteName: 'd3f4lt0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'phantom-fetch — d3f4lt0',
    description: 'Headless content fetcher with stealth mode, cookie handling, and structured output.',
  },
};

const techStack = {
  Language: ['Python'],
  Automation: ['Playwright'],
  Focus: ['Stealth', 'Scraping', 'CLI'],
};

const progressItems = [
  { label: 'Core Fetcher', status: 'active' },
  { label: 'Cookie Handling', status: 'active' },
  { label: 'Stealth Mode', status: 'active' },
  { label: 'Output Formats', status: 'pending' },
];

const futureIdeas = [
  'Rotating proxy support',
  'JavaScript rendering tuning',
  'Structured data extraction',
  'Retry and backoff policies',
];

const notes = [
  'Built for research workflows that need controlled browser behavior.',
  'Prioritizes reliability over speed.',
  'Output is designed to be consumed by downstream analysis tools.',
];

const timeline = [
  { label: 'Project Started', date: '2026-06-28', description: 'Frustration with existing headless browser detection led to the first experiment.', status: 'completed' },
  { label: 'First Prototype', date: '2026-07-06', description: 'Basic Playwright wrapper with custom user agent and viewport.', status: 'completed' },
  { label: 'Architecture Rewrite', date: '2026-07-14', description: 'Added cookie persistence, stealth plugins, and structured JSON output.', status: 'completed' },
  { label: 'Public Release', date: '2026-07-05', description: 'Repository made public with CLI interface and examples.', status: 'completed' },
  { label: 'Current Status', date: '2026-07-27', description: 'Active. Core fetcher and stealth mode are working reliably.', status: 'active' },
  { label: 'Future Milestones', date: '', description: 'Proxy rotation, structured extraction, backoff policies.', status: 'pending' },
];

const githubMetadata: GitHubMetadata = {
  started: '2026-06-12',
  lastActivity: '2026-07-19',
  status: 'Maintained',
  visibility: 'public',
  repository: 'github.com/d3f4lt0/phantom-fetch',
  documentation: 'README',
  primaryLanguage: 'Python',
  description: 'Headless content fetcher with stealth mode, cookie handling, and structured output.',
};

export default function PhantomFetchPage() {
  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">phantom-fetch</h1>
          <div className="mt-1 h-px w-12 bg-border/60" aria-hidden="true" />
          <p className="mt-6 text-lg leading-7 text-foreground/80 text-balance">
            Headless content fetcher with stealth mode, cookie handling, and structured output.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>Status: Active</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
            <span>Repository: github.com/d3f4lt0/phantom-fetch</span>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="01" title="Purpose" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              Most headless browsers are detectable. phantom-fetch uses Playwright with explicit stealth configurations to reduce browser automation signals while maintaining structured output for downstream processing.
            </p>
            <p>
              It is built for research pipelines where consistent, repeatable fetches are more important than raw throughput.
            </p>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="02" title="Tech Stack" />
        </div>
        <div className="mx-auto mt-12 max-w-2xl space-y-6">
          {Object.entries(techStack).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xs font-medium text-muted-foreground/50 uppercase tracking-wider mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="03" title="Project Timeline" />
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <ProjectTimeline entries={timeline} />
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="04" title="Current Progress" />
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {progressItems.map((item) => (
              <Card key={item.label} className="border-border/60 bg-card/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground/80">{item.label}</span>
                    <span className="text-xs text-muted-foreground/70">{item.status}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="05" title="GitHub" description="Repository metadata placeholders for future API integration." />
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <GitHubMetadataCard data={githubMetadata} />
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="06" title="Future Ideas" />
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="grid gap-3">
            {futureIdeas.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="07" title="Notes" />
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="grid gap-3">
            {notes.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

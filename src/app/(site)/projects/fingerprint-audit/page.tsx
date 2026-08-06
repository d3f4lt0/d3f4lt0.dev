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
  title: 'fingerprint-audit',
  description: 'Browser fingerprint collection and comparison tool for privacy and security research.',
  openGraph: {
    title: 'fingerprint-audit — d3f4lt0',
    description: 'Browser fingerprint collection and comparison tool for privacy and security research.',
    url: 'https://d3f4lt0.dev/projects/fingerprint-audit',
    siteName: 'd3f4lt0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'fingerprint-audit — d3f4lt0',
    description: 'Browser fingerprint collection and comparison tool for privacy and security research.',
  },
};

const techStack = {
  Language: ['Python'],
  Automation: ['Selenium', 'Playwright'],
  Focus: ['Privacy', 'Security', 'Research'],
};

const progressItems = [
  { label: 'Collection', status: 'active' },
  { label: 'Attribute Parsing', status: 'active' },
  { label: 'Comparison Engine', status: 'active' },
  { label: 'Reporting', status: 'pending' },
];

const futureIdeas = [
  'Cross-browser fingerprint stability analysis',
  'Canvas and WebGL fingerprinting',
  'Timezone and locale spoofing detection',
  'Export to JSON and HTML reports',
];

const notes = [
  'Designed for controlled research environments.',
  'Compares fingerprints across browser profiles and configurations.',
  'Does not collect personally identifiable information.',
];

const timeline = [
  { label: 'Project Started', date: '2026-06-25', description: 'Research into browser fingerprinting techniques began.', status: 'completed' },
  { label: 'First Prototype', date: '2026-07-03', description: 'Basic fingerprint collection using Selenium WebDriver.', status: 'completed' },
  { label: 'Architecture Rewrite', date: '2026-07-12', description: 'Switched to structured output and comparison engine.', status: 'completed' },
  { label: 'Public Release', date: '2026-07-10', description: 'Repository made public with core collection module.', status: 'completed' },
  { label: 'Current Status', date: '2026-07-27', description: 'Stable collection tool, analysis layer postponed.', status: 'completed' },
  { label: 'Future Milestones', date: '', description: 'HTML reports, WebGL fingerprinting, cross-browser stability analysis.', status: 'pending' },
];

const githubMetadata: GitHubMetadata = {
  started: '2026-07-05',
  lastActivity: '2026-07-22',
  status: 'Active',
  visibility: 'public',
  repository: 'github.com/d3f4lt0/fingerprint-audit',
  documentation: 'README',
  primaryLanguage: 'Python',
  description: 'Browser fingerprint collection and comparison tool for privacy and security research.',
};

export default function FingerprintAuditPage() {
  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">fingerprint-audit</h1>
          <div className="mt-1 h-px w-12 bg-border/60" aria-hidden="true" />
          <p className="mt-6 text-lg leading-7 text-foreground/80 text-balance">
            Browser fingerprint collection and comparison tool for privacy and security research.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>Status: Dormant</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
            <span>stable collection tool, analysis layer postponed</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
            <span>Repository: github.com/d3f4lt0/fingerprint-audit</span>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="01" title="Purpose" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              Browser fingerprints are used to track users without cookies. fingerprint-audit collects these signals in a controlled way so differences between browser profiles, extensions, and privacy settings can be compared objectively.
            </p>
            <p>
              The tool is built for researchers and engineers who need to understand how configuration changes affect browser identifiability.
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

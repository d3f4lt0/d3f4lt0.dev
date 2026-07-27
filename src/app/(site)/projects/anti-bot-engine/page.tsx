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
  title: 'anti-bot-engine',
  description: 'Signal-based bot detection layer using behavioral fingerprinting and adaptive challenges.',
  openGraph: {
    title: 'anti-bot-engine — d3f4lt0',
    description: 'Signal-based bot detection layer using behavioral fingerprinting and adaptive challenges.',
    url: 'https://d3f4lt0.dev/projects/anti-bot-engine',
    siteName: 'd3f4lt0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'anti-bot-engine — d3f4lt0',
    description: 'Signal-based bot detection layer using behavioral fingerprinting and adaptive challenges.',
  },
};

const techStack = {
  Language: ['TypeScript'],
  Runtime: ['Node.js'],
  Focus: ['Security', 'Behavioral Analysis', 'Challenges'],
};

const progressItems = [
  { label: 'Fingerprinting', status: 'active' },
  { label: 'Signal Collection', status: 'active' },
  { label: 'Challenge System', status: 'active' },
  { label: 'Dashboard', status: 'pending' },
];

const futureIdeas = [
  'Machine learning scoring model',
  'Real-time alerting pipeline',
  'Integration with edge middleware',
  'Browser automation detection heuristics',
];

const notes = [
  'Focuses on behavior rather than IP reputation.',
  'Designed to integrate into existing request pipelines.',
  'Challenge responses are logged for analysis and tuning.',
];

const timeline = [
  { label: 'Project Started', date: '2026-07-05', description: 'Research into behavioral fingerprinting techniques began.', status: 'completed' },
  { label: 'First Prototype', date: '2026-07-12', description: 'Basic signal collection and scoring logic implemented.', status: 'completed' },
  { label: 'Architecture Rewrite', date: '2026-07-18', description: 'Replaced synchronous checks with an async challenge pipeline.', status: 'completed' },
  { label: 'Public Release', date: '2026-07-15', description: 'Repository made public with core fingerprinting module.', status: 'completed' },
  { label: 'Current Status', date: '2026-07-27', description: 'Active. Fingerprinting and challenge system are functional.', status: 'active' },
  { label: 'Future Milestones', date: '', description: 'ML scoring model, edge middleware integration, dashboard.', status: 'pending' },
];

const githubMetadata: GitHubMetadata = {
  started: '2026-06-18',
  lastActivity: '2026-07-20',
  status: 'Prototype',
  visibility: 'public',
  repository: 'github.com/d3f4lt0/anti-bot-engine',
  documentation: 'README',
  primaryLanguage: 'TypeScript',
  description: 'Signal-based bot detection layer using behavioral fingerprinting and adaptive challenges.',
};

export default function AntiBotEnginePage() {
  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">anti-bot-engine</h1>
          <div className="mt-1 h-px w-12 bg-border/60" aria-hidden="true" />
          <p className="mt-6 text-lg leading-7 text-foreground/80 text-balance">
            Signal-based bot detection layer using behavioral fingerprinting and adaptive challenges.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>Status: Active</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
            <span>Repository: github.com/d3f4lt0/anti-bot-engine</span>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="01" title="Purpose" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              Bot detection is often reduced to IP blocking or CAPTCHAs. anti-bot-engine takes a different approach: collect behavioral signals during normal interaction and use them to score requests without interrupting real users.
            </p>
            <p>
              The system issues adaptive challenges only when signals cross a threshold, keeping friction low for humans and cost high for automation.
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

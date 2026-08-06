import { Metadata } from 'next';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/badge';
import { Tag } from '@/components/ui/tag';
import { PageTitle } from '@/components/site/page-title';
import { ProjectTimeline } from '@/components/site/project-timeline';
import { GitHubMetadataCard } from '@/components/site/github-metadata';
import { GitHubMetadata } from '@/lib/github';

export const metadata: Metadata = {
  title: 'ARGUS',
  description: 'A private personal operating system designed to unify identity, knowledge, money, files, time, and intelligence into one calm, local-first home.',
  openGraph: {
    title: 'ARGUS — d3f4lt0',
    description: 'A private personal operating system designed to unify identity, knowledge, money, files, time, and intelligence into one calm, local-first home.',
    url: 'https://d3f4lt0.dev/projects/argus',
    siteName: 'd3f4lt0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARGUS — d3f4lt0',
    description: 'A private personal operating system designed to unify identity, knowledge, money, files, time, and intelligence into one calm, local-first home.',
  },
};

const techStack = {
  Frontend: ['Next.js 14', 'React 18', 'TypeScript 5', 'Tailwind CSS'],
  Backend: ['FastAPI', 'Python 3.10+', 'httpx', 'websockets'],
  Language: ['Python', 'TypeScript'],
  Database: ['SQLite', 'SQLAlchemy'],
  Charts: ['Recharts'],
  Styling: ['Tailwind CSS', 'CSS Variables'],
  Tooling: ['Vitest', 'Playwright', 'ESLint', 'Prettier', 'Husky'],
};

const progressItems = [
  { label: 'Planning', status: 'completed' },
  { label: 'Documentation', status: 'completed' },
  { label: 'Frontend', status: 'building' },
  { label: 'Backend', status: 'building' },
  { label: 'Trading Engine', status: 'building' },
  { label: 'Testing', status: 'pending' },
];

const futureIdeas = [
  'Authentication',
  'Live market data',
  'Strategy engine',
  'Deployment',
];

const notes = [
  'Built for the MEX exchange.',
  'Modular architecture: collector, indicators, decision, execution.',
  'Every component is testable in isolation.',
  'Every output is logged and reviewable.',
];

const timeline = [
  { label: 'Project Started', date: '2026-06-10', description: 'Initial concept and requirements defined.', status: 'completed' },
  { label: 'First Prototype', date: '2026-06-22', description: 'Basic portfolio tracking and candlestick collection.', status: 'completed' },
  { label: 'Architecture Rewrite', date: '2026-07-01', description: 'Reorganized into engines: collector, indicators, decision, execution.', status: 'completed' },
  { label: 'Public Release', date: '2026-07-18', description: 'v1.0.0 shipped. Core pipeline operational.', status: 'completed' },
  { label: 'Current Status', date: '2026-07-27', description: 'Active engineering development. Not yet ready for public release.', status: 'building' },
  { label: 'Future Milestones', date: '', description: 'Authentication, live market data, strategy engine, deployment.', status: 'pending' },
];

const githubMetadata: GitHubMetadata = {
  started: '2026-06-15',
  lastActivity: '2026-07-27',
  status: 'Private Development',
  visibility: 'private',
  repository: 'Internal',
  documentation: 'Internal',
  primaryLanguage: 'Python',
  description: 'Internal trading intelligence platform. Not publicly accessible.',
};

export default function ArgusProjectPage() {
  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <StatusBadge status="building" label="Building" />
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
            <span className="text-xs font-mono text-muted-foreground/40 tracking-wider">
              Private
            </span>
          </div>
          <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">ARGUS</h1>
          <div className="mt-1 h-px w-12 bg-border/60" aria-hidden="true" />
          <p className="mt-6 text-lg leading-7 text-foreground/80 text-balance">
            A private personal operating system designed to unify identity, knowledge, money, files, time, and intelligence into one calm, local-first home.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>Repository: Private</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
            <span>Documentation: Internal</span>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="01" title="Overview" />
          <div className="mt-6 space-y-5 text-base leading-7 text-muted-foreground">
            <p>
              ARGUS is a private personal operating system designed to unify identity, knowledge, files, finance, projects, time, and personal organization into one calm, local-first home.
            </p>
            <p>
              It was originally built as a professional-grade market analysis and trading assistant for the MEX exchange. The project has since evolved into something broader: a unified environment for managing the pieces of a digital life.
            </p>
            <p>
              The main objectives remain modularity, explainability, and long-term maintainability. Every component is testable in isolation. Every output is logged and reviewable.
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
          <SectionHeader number="04" title="Development Progress" />
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {progressItems.map((item) => (
              <Card key={item.label} className="border-border/60 bg-card/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground/80">{item.label}</span>
                    <StatusBadge status={item.status} />
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
    </div>
  );
}

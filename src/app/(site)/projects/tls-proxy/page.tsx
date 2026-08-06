import { Metadata } from 'next';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import { PageTitle } from '@/components/site/page-title';
import { ProjectTimeline } from '@/components/site/project-timeline';
import { GitHubMetadataCard } from '@/components/site/github-metadata';
import { GitHubMetadata, fetchGitHubMetadata } from '@/lib/github';

export const metadata: Metadata = {
  title: 'tls-proxy',
  description: 'Lightweight TLS termination proxy with configurable cipher suites and mutual TLS support.',
  openGraph: {
    title: 'tls-proxy — d3f4lt0',
    description: 'Lightweight TLS termination proxy with configurable cipher suites and mutual TLS support.',
    url: 'https://d3f4lt0.dev/projects/tls-proxy',
    siteName: 'd3f4lt0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'tls-proxy — d3f4lt0',
    description: 'Lightweight TLS termination proxy with configurable cipher suites and mutual TLS support.',
  },
};

const techStack = {
  Language: ['Go'],
  Protocols: ['TLS 1.2', 'TLS 1.3', 'mTLS'],
  Focus: ['Performance', 'Security', 'Minimalism'],
};

const progressItems = [
  { label: 'Core', status: 'active' },
  { label: 'Cipher Configuration', status: 'active' },
  { label: 'mTLS', status: 'active' },
  { label: 'Testing', status: 'pending' },
];

const futureIdeas = [
  'HTTP/3 support',
  'Dynamic certificate reloading',
  'Metrics and observability hooks',
  'Plugin system for custom handlers',
];

const notes = [
  'Built for internal service mesh experimentation.',
  'Designed to run as a sidecar with minimal footprint.',
  'Configuration via environment variables or single YAML file.',
];

const timeline = [
  { label: 'Project Started', date: '2026-06-15', description: 'Initial concept and requirements defined.', status: 'completed' },
  { label: 'First Prototype', date: '2026-06-28', description: 'Basic TLS termination with default cipher suites.', status: 'completed' },
  { label: 'Architecture Rewrite', date: '2026-07-05', description: 'Refactored for explicit cipher suite control and mTLS support.', status: 'completed' },
  { label: 'Public Release', date: '2026-07-25', description: 'Repository made public with documentation and examples.', status: 'completed' },
  { label: 'Current Status', date: '2026-07-27', description: 'v1 stable, awaiting mTLS work.', status: 'completed' },
  { label: 'Future Milestones', date: '', description: 'HTTP/3 support, dynamic reloading, metrics hooks.', status: 'pending' },
];

const githubMetadata: GitHubMetadata = {
  started: '2026-06-04',
  lastActivity: '2026-07-18',
  status: 'Research',
  visibility: 'public',
  repository: 'github.com/d3f4lt0/tls-proxy',
  documentation: 'README',
  primaryLanguage: 'Go',
  description: 'Lightweight TLS termination proxy with configurable cipher suites and mutual TLS support.',
};

export default function TlsProxyPage() {
  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">tls-proxy</h1>
          <div className="mt-1 h-px w-12 bg-border/60" aria-hidden="true" />
          <p className="mt-6 text-lg leading-7 text-foreground/80 text-balance">
            Lightweight TLS termination proxy with configurable cipher suites and mutual TLS support.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>Status: Dormant</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
            <span>v1 stable, awaiting mTLS work</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
            <span>Repository: github.com/d3f4lt0/tls-proxy</span>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="01" title="Purpose" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              TLS termination is usually handled by heavy infrastructure components. tls-proxy is a minimal alternative that does one thing: terminate TLS with explicit control over cipher suites, certificate validation, and mutual authentication.
            </p>
            <p>
              It is intended for development environments, internal services, and scenarios where a full ingress controller is overkill.
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

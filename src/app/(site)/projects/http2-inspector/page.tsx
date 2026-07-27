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
  title: 'http2-inspector',
  description: 'Low-level HTTP/2 frame inspector and analysis tool for debugging protocol-level behavior.',
  openGraph: {
    title: 'http2-inspector — d3f4lt0',
    description: 'Low-level HTTP/2 frame inspector and analysis tool for debugging protocol-level behavior.',
    url: 'https://d3f4lt0.dev/projects/http2-inspector',
    siteName: 'd3f4lt0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'http2-inspector — d3f4lt0',
    description: 'Low-level HTTP/2 frame inspector and analysis tool for debugging protocol-level behavior.',
  },
};

const techStack = {
  Language: ['Rust'],
  Protocol: ['HTTP/2', 'Frames', 'HPACK'],
  Focus: ['Debugging', 'Protocol Analysis', 'CLI'],
};

const progressItems = [
  { label: 'Frame Parsing', status: 'active' },
  { label: 'Header Inspection', status: 'active' },
  { label: 'Stream Analysis', status: 'active' },
  { label: 'Output Formats', status: 'pending' },
];

const futureIdeas = [
  'HTTP/3 frame inspection',
  'Live capture from network interfaces',
  'Export to Wireshark-compatible formats',
  'Plugin system for custom analyzers',
];

const notes = [
  'Built while debugging production HTTP/2 issues.',
  'Focuses on raw frame inspection rather than high-level request tracing.',
  'CLI-first interface for terminal workflows.',
];

const timeline = [
  { label: 'Project Started', date: '2026-07-01', description: 'Started while debugging HTTP/2 stream resets in production.', status: 'completed' },
  { label: 'First Prototype', date: '2026-07-08', description: 'Basic frame parser capable of reading raw binary HTTP/2 traffic.', status: 'completed' },
  { label: 'Architecture Rewrite', date: '2026-07-15', description: 'Switched to a streaming parser to handle large captures without loading everything into memory.', status: 'completed' },
  { label: 'Public Release', date: '2026-07-22', description: 'Repository made public with documentation and installation instructions.', status: 'completed' },
  { label: 'Current Status', date: '2026-07-27', description: 'Active. Core frame parsing and header inspection are working.', status: 'active' },
  { label: 'Future Milestones', date: '', description: 'Live capture support, Wireshark export, plugin system.', status: 'pending' },
];

const githubMetadata: GitHubMetadata = {
  started: '2026-06-29',
  lastActivity: '2026-07-26',
  status: 'Active',
  visibility: 'public',
  repository: 'github.com/d3f4lt0/http2-inspector',
  documentation: 'README',
  primaryLanguage: 'Rust',
  description: 'Low-level HTTP/2 frame inspector and analysis tool for debugging protocol-level behavior.',
};

export default function Http2InspectorPage() {
  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">http2-inspector</h1>
          <div className="mt-1 h-px w-12 bg-border/60" aria-hidden="true" />
          <p className="mt-6 text-lg leading-7 text-foreground/80 text-balance">
            Low-level HTTP/2 frame inspector and analysis tool for debugging protocol-level behavior.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>Status: Active</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
            <span>Repository: github.com/d3f4lt0/http2-inspector</span>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="01" title="Purpose" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              HTTP/2 debugging tools rarely expose raw frame data. http2-inspector fills that gap by parsing frames directly and presenting headers, stream state, and flow control information in a readable format.
            </p>
            <p>
              It is useful when protocol-level issues need to be isolated without the noise of higher-level application logs.
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

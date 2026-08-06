import { Metadata } from 'next';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import { PageTitle } from '@/components/site/page-title';
import { StatusBadge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'ARGUS',
  description: 'One home for your digital life.\nIdentity, knowledge, files, money, projects, time, and AI—unified in one local-first system.',
  openGraph: {
    title: 'ARGUS — d3f4lt0',
    description: 'One home for your digital life.\nIdentity, knowledge, files, money, projects, time, and AI—unified in one local-first system.',
    url: 'https://d3f4lt0.dev/projects/argus',
    siteName: 'd3f4lt0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARGUS — d3f4lt0',
    description: 'One home for your digital life.\nIdentity, knowledge, files, money, projects, time, and AI—unified in one local-first system.',
  },
};

const rooms = [
  { name: 'Identity', description: 'Profiles, credentials, and access—one place for who you are online.' },
  { name: 'Mind', description: 'Notes, reading, and knowledge—things you learn and want to keep.' },
  { name: 'Money', description: 'Portfolios, transactions, and financial clarity without spreadsheets.' },
  { name: 'Files', description: 'Documents, media, and artifacts—organized, searchable, yours.' },
  { name: 'Time', description: 'Calendar, scheduling, and rhythms—life has a schedule.' },
  { name: 'Projects', description: 'Tasks, milestones, and execution—work that moves forward.' },
  { name: 'AI', description: 'Intelligence and automation—assistants that respect your context.' },
];

const principles = [
  'Privacy by default. Data stays local unless you choose otherwise.',
  'Local-first. No cloud dependency. No forced subscriptions.',
  'Ownership. You control the format, the storage, and the future.',
  'Long-term. Built to outlive platforms, frameworks, and trends.',
];

export default function ArgusProjectPage() {
  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <StatusBadge status="building" label="In Progress" />
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
            <span className="text-xs font-mono text-muted-foreground/40 tracking-wider">
              Private
            </span>
          </div>
          <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">ARGUS</h1>
          <div className="mt-1 h-px w-12 bg-border/60" aria-hidden="true" />
          <p className="mt-6 text-lg leading-7 text-foreground/80 text-balance">
            One home for your digital life.
          </p>
          <p className="mt-2 text-lg leading-7 text-foreground/80 text-balance">
            Identity, knowledge, files, money, projects, time, and AI—unified in one local-first system.
          </p>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="01" title="Why ARGUS?" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              Modern tools fragment attention. Identity lives in one app, notes in another, finances in a spreadsheet, projects in a tracker. ARGUS exists to end that fragmentation without sacrificing depth or control.
            </p>
            <p>
              It is not another productivity suite. It is a single environment for the pieces of a digital life—calm by default, local-first, and built to last.
            </p>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="02" title="What ARGUS will become" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              Seven core rooms, each addressing a different part of life. Together, they form a coherent whole.
            </p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {rooms.map((room) => (
              <Card key={room.name} className="border-border/60 bg-card/50">
                <CardContent className="p-5">
                  <h3 className="text-sm font-medium text-foreground/80">{room.name}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground/75 leading-relaxed">{room.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="03" title="Development status" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              Active engineering development. The core architecture is in progress. No public release date. No public repository.
            </p>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="04" title="Principles" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            {principles.map((principle) => (
              <p key={principle}>{principle}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="05" title="Interested in the project?" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              ARGUS is a solo engineering effort. I am not hiring, and this is not a job posting.
            </p>
            <p>
              If you are an engineer, designer, or researcher who cares about personal software, local-first architecture, or calm technology, I would value a thoughtful conversation.
            </p>
            <p>
              Reach out at <a href="mailto:d3f4lt0@proton.me" className="link-underline text-primary">d3f4lt0@proton.me</a>.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}

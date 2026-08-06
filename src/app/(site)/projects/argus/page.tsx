import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import { PageTitle } from '@/components/site/page-title';
import { StatusBadge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'ARGUS',
  description: 'A private personal operating system designed to unify identity, knowledge, files, finance, projects, time, and intelligence into one calm, local-first home.',
  openGraph: {
    title: 'ARGUS — d3f4lt0',
    description: 'A private personal operating system designed to unify identity, knowledge, files, finance, projects, time, and intelligence into one calm, local-first home.',
    url: 'https://d3f4lt0.dev/projects/argus',
    siteName: 'd3f4lt0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARGUS — d3f4lt0',
    description: 'A private personal operating system designed to unify identity, knowledge, files, finance, projects, time, and intelligence into one calm, local-first home.',
  },
};

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
            A private personal operating system designed to unify identity, knowledge, files, finance, projects, time, and intelligence into one calm, local-first home.
          </p>
          <div className="mt-8">
            <Link
              href="/now"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              View Project →
            </Link>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="01" title="Mission" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              Replace the fragmented experience of using separate apps for identity, knowledge, files, finance, projects, time, and personal organization with one calm, local-first home.
            </p>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="02" title="Vision" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              A single environment that respects privacy, ownership, and long-term thinking. Every piece of your digital life in one place, under your control.
            </p>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="03" title="Why it exists" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              Modern tools fragment attention. Identity lives in one app, notes in another, finances in a spreadsheet, projects in a tracker. ARGUS exists to end that fragmentation without sacrificing depth or control.
            </p>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="04" title="Current development status" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              Active engineering development. The core architecture is in progress. No public release date. No public repository.
            </p>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="05" title="High-level roadmap" />
          <div className="mt-6 grid gap-3">
            {[
              'Identity and access layer',
              'Knowledge and notes system',
              'File and media management',
              'Finance and portfolio tracking',
              'Project and task orchestration',
              'Time and calendar integration',
              'Intelligence and automation layer',
            ].map((item) => (
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
          <SectionHeader number="06" title="Philosophy" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground/80">Privacy-first.</span> Data stays local by default. Remote sync is optional and encrypted.
            </p>
            <p>
              <span className="font-semibold text-foreground/80">Local-first.</span> The system works without cloud services. Ownership is non-negotiable.
            </p>
            <p>
              <span className="font-semibold text-foreground/80">Long-term vision.</span> Built to outlive trends, frameworks, and platforms.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}

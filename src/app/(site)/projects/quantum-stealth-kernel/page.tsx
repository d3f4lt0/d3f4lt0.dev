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
  title: 'quantum-stealth-kernel',
  description: 'Experimental kernel module exploring process cloaking and filesystem obfuscation techniques.',
  openGraph: {
    title: 'quantum-stealth-kernel — d3f4lt0',
    description: 'Experimental kernel module exploring process cloaking and filesystem obfuscation techniques.',
    url: 'https://d3f4lt0.dev/projects/quantum-stealth-kernel',
    siteName: 'd3f4lt0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'quantum-stealth-kernel — d3f4lt0',
    description: 'Experimental kernel module exploring process cloaking and filesystem obfuscation techniques.',
  },
};

const techStack = {
  Language: ['C'],
  Target: ['Linux Kernel', 'LKM'],
  Focus: ['Security', 'Obfuscation', 'Research'],
};

const progressItems = [
  { label: 'Research', status: 'active' },
  { label: 'Proof of Concept', status: 'active' },
  { label: 'Process Hiding', status: 'active' },
  { label: 'Filesystem Obfuscation', status: 'pending' },
];

const futureIdeas = [
  'Rootkit detection evasion techniques',
  'Network socket hiding',
  'Cross-version kernel compatibility',
  'Formal verification of hook stability',
];

const notes = [
  'Research-only. Not intended for production use.',
  'Designed for kernel security research and educational purposes.',
  'Requires kernel debug symbols for development.',
];

const timeline = [
  { label: 'Project Started', date: '2026-06-20', description: 'Research phase initiated after reading Linux kernel internals.', status: 'completed' },
  { label: 'First Prototype', date: '2026-07-02', description: 'Basic process hiding via syscall table modification.', status: 'completed' },
  { label: 'Architecture Rewrite', date: '2026-07-10', description: 'Moved to filesystem hooking for artifact obfuscation.', status: 'completed' },
  { label: 'Public Release', date: '2026-07-18', description: 'Repository made public with research notes and safety warnings.', status: 'completed' },
  { label: 'Current Status', date: '2026-07-27', description: 'Experimental research project.', status: 'completed' },
  { label: 'Future Milestones', date: '', description: 'Socket hiding, kernel compatibility layer, formal verification.', status: 'pending' },
];

const githubMetadata: GitHubMetadata = {
  started: '2026-07-10',
  lastActivity: '2026-07-24',
  status: 'Experimental',
  visibility: 'public',
  repository: 'github.com/d3f4lt0/quantum-stealth-kernel',
  documentation: 'README',
  primaryLanguage: 'C',
  description: 'Experimental kernel module exploring process cloaking and filesystem obfuscation techniques.',
};

export default function QuantumStealthKernelPage() {
  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">quantum-stealth-kernel</h1>
          <div className="mt-1 h-px w-12 bg-border/60" aria-hidden="true" />
          <p className="mt-6 text-lg leading-7 text-foreground/80 text-balance">
            Experimental kernel module exploring process cloaking and filesystem obfuscation techniques.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>Status: Dormant</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
            <span>experimental research project</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
            <span>Repository: github.com/d3f4lt0/quantum-stealth-kernel</span>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="01" title="Purpose" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              Kernel-level visibility is assumed by most security tools. This project challenges that assumption by exploring methods to hide processes and obfuscate filesystem artifacts from standard enumeration techniques.
            </p>
            <p>
              The goal is not to build malware, but to understand kernel visibility boundaries well enough to build better detection mechanisms.
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

import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/badge';
import { Tag } from '@/components/ui/tag';
import { PageTitle } from '@/components/site/page-title';
import type { Project } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Open-source tools and systems built for engineering problems. Each project is a self-contained engineering effort with its own documentation, changelog, and architecture.',
  openGraph: {
    title: 'Projects — d3f4lt0',
    description: 'Open-source tools and systems built for engineering problems.',
    url: 'https://d3f4lt0.dev/projects',
    siteName: 'd3f4lt0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects — d3f4lt0',
    description: 'Open-source tools and systems built for engineering problems.',
  },
};

const projects: Project[] = [
  {
    name: 'tls-proxy',
    description: 'Lightweight TLS termination proxy with configurable cipher suites and mutual TLS support.',
    href: '/projects/tls-proxy',
    status: 'dormant',
    state: 'v1 stable, awaiting mTLS work',
    stack: ['Go', 'TLS', 'Proxy'],
    lastUpdated: '2026-07-25',
    repository: 'github.com/d3f4lt0/tls-proxy',
    documentation: null,
  },
  {
    name: 'http2-inspector',
    description: 'Low-level HTTP/2 frame inspector and analysis tool for debugging protocol-level behavior.',
    href: '/projects/http2-inspector',
    status: 'dormant',
    state: 'CLI working, no GUI planned',
    stack: ['Rust', 'HTTP/2', 'CLI'],
    lastUpdated: '2026-07-22',
    repository: 'github.com/d3f4lt0/http2-inspector',
    documentation: null,
  },
  {
    name: 'quantum-stealth-kernel',
    description: 'Experimental kernel module exploring process cloaking and filesystem obfuscation techniques.',
    href: '/projects/quantum-stealth-kernel',
    status: 'dormant',
    state: 'experimental research project',
    stack: ['C', 'Linux Kernel', 'Security'],
    lastUpdated: '2026-07-18',
    repository: 'github.com/d3f4lt0/quantum-stealth-kernel',
    documentation: null,
  },
  {
    name: 'anti-bot-engine',
    description: 'Signal-based bot detection layer using behavioral fingerprinting and adaptive challenges.',
    href: '/projects/anti-bot-engine',
    status: 'dormant',
    state: 'signals layer frozen, future direction under evaluation',
    stack: ['TypeScript', 'Node.js', 'Security'],
    lastUpdated: '2026-07-15',
    repository: 'github.com/d3f4lt0/anti-bot-engine',
    documentation: null,
  },
  {
    name: 'fingerprint-audit',
    description: 'Browser fingerprint collection and comparison tool for privacy and security research.',
    href: '/projects/fingerprint-audit',
    status: 'dormant',
    state: 'stable collection tool, analysis layer postponed',
    stack: ['Python', 'Selenium', 'Privacy'],
    lastUpdated: '2026-07-10',
    repository: 'github.com/d3f4lt0/fingerprint-audit',
    documentation: null,
  },
  {
    name: 'phantom-fetch',
    description: 'Headless content fetcher with stealth mode, cookie handling, and structured output.',
    href: '/projects/phantom-fetch',
    status: 'dormant',
    state: 'stealth fetcher complete, awaiting future maintenance',
    stack: ['Python', 'Playwright', 'CLI'],
    lastUpdated: '2026-07-05',
    repository: 'github.com/d3f4lt0/phantom-fetch',
    documentation: null,
  },
  {
    name: 'ARGUS',
    description: 'One home for your digital life.\nIdentity, knowledge, files, money, projects, time, and AI—unified in one local-first system.',
    href: '/projects/argus',
    status: 'building',
    state: 'Private project currently in active engineering development.',
    stack: [],
    lastUpdated: '2026-08-06',
    repository: null,
    documentation: null,
  },
];

export default function ProjectsPage() {
  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <PageTitle>Projects</PageTitle>
          <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">
            Open-source tools and systems built for engineering problems.
          </p>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            number="01"
            title="All Projects"
            description="Each project is a self-contained engineering effort with its own documentation, changelog, and architecture."
          />
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project) => (
              <Link key={project.name} href={project.href} className="group block">
                <Card className="card-hover-lift h-full border-border/60 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl tracking-tight">{project.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={project.status} />
                      </div>
                    </div>
                    <CardDescription className="leading-6">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground/80">{project.state}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <Tag key={item}>{item}</Tag>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground/70">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        {project.lastUpdated}
                      </span>
                      {project.repository && (
                        <span className="truncate">{project.repository}</span>
                      )}
                    </div>
                    {project.documentation && (
                      <div className="mt-3 text-xs text-muted-foreground/70">
                        {project.documentation}
                      </div>
                    )}
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary/80 transition-colors duration-150 ease-out group-hover:text-primary">
                      <span className="link-underline">View project</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

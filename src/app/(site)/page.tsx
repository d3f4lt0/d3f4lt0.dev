import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/badge';
import { Tag } from '@/components/ui/tag';
import { TimelineItem } from '@/components/ui/timeline-item';
import { PageTitle } from '@/components/site/page-title';
import { getProjects, getJournalEntries } from '@/lib/content';

export const metadata: Metadata = {
  title: 'd3f4lt0',
  description: 'Portfolio of d3f4lt0. Projects, technical decisions, and experiments built with an architecture-first mindset.',
  openGraph: {
    title: 'd3f4lt0',
    description: 'Portfolio of d3f4lt0. Projects, technical decisions, and experiments built with an architecture-first mindset.',
    url: 'https://d3f4lt0.dev',
    siteName: 'd3f4lt0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'd3f4lt0',
    description: 'Portfolio of d3f4lt0. Projects, technical decisions, and experiments built with an architecture-first mindset.',
  },
};

export default async function HomePage() {
  const projects = getProjects();
  const journalEntries = getJournalEntries().slice(0, 3);

  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24 lg:pb-[96px]">
        <div className="mx-auto max-w-2xl">
          <PageTitle>d3f4lt0</PageTitle>
          <div className="mt-1 h-px w-12 bg-border/60" aria-hidden="true" />
          <p className="mt-8 text-lg leading-7 text-foreground/80 text-balance">
            I like building things that outlive my motivation.
          </p>
          <p className="mt-4 text-sm leading-6 text-muted-foreground/75">
            One must imagine d3f4lt happy pushing code into the void.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/projects"
              className="link-underline text-sm font-medium text-primary"
            >
              Projects
            </Link>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
            <Link
              href="/journal"
              className="link-underline text-sm font-medium text-primary"
            >
              Journal
            </Link>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
            <Link
              href="/knowledge"
              className="link-underline text-sm font-medium text-primary"
            >
              Knowledge
            </Link>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
            <a
              href="https://github.com/d3f4lt0"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm font-medium text-primary"
            >
              GitHub
            </a>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
            <Link
              href="/now"
              className="link-underline text-sm font-medium text-primary"
            >
              Now
            </Link>
          </div>
        </div>
      </Section>

      <p className="py-8 text-center text-sm font-semibold text-muted-foreground/60">
        Looking for trade calls? Keep looking.
      </p>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            number="01"
            title="Projects"
            description="Things I've built."
          />
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="group block">
                <Card className="card-hover-lift h-full border-border/60 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl tracking-tight">{project.title}</CardTitle>
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
                        {project.tags.map((item) => (
                          <Tag key={item}>{item}</Tag>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground/70">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        {project.date}
                      </span>
                      {project.github && (
                        <span className="truncate">{project.github}</span>
                      )}
                    </div>
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

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            number="02"
            title="Journal"
            description="Recent notes and updates."
          />
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="divide-y divide-border/60">
            {journalEntries.map((entry) => (
              <TimelineItem
                key={entry.date + entry.title}
                date={entry.date}
                title={entry.title}
                summary={entry.summary}
                href={entry.href}
              />
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/journal"
              className="link-underline text-sm font-medium text-primary"
            >
              View all entries
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

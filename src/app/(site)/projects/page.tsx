import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/badge';
import { Tag } from '@/components/ui/tag';
import { PageTitle } from '@/components/site/page-title';
import { getProjects } from '@/lib/content';

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

export default async function ProjectsPage() {
  const projects = getProjects();

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
    </div>
  );
}

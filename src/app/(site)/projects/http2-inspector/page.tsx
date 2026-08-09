import { Metadata } from 'next';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import { PageTitle } from '@/components/site/page-title';
import { StatusBadge } from '@/components/ui/badge';
import { getProjectBySlug } from '@/lib/content';

export async function generateMetadata() {
  const project = getProjectBySlug('http2-inspector');

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} — d3f4lt0`,
      description: project.description,
      url: `https://d3f4lt0.dev/projects/${project.slug}`,
      siteName: 'd3f4lt0',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — d3f4lt0`,
      description: project.description,
    },
  };
}

export default async function ProjectPage() {
  const project = getProjectBySlug('http2-inspector');

  if (!project) {
    return (
      <div className="page-fade-in">
        <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
          <div className="mx-auto max-w-2xl">
            <PageTitle>Project Not Found</PageTitle>
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <StatusBadge status={project.status} />
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
            <span className="text-xs font-mono text-muted-foreground/40 tracking-wider">
              {project.public ? 'Public' : 'Private'}
            </span>
          </div>
          <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">{project.title}</h1>
          <div className="mt-1 h-px w-12 bg-border/60" aria-hidden="true" />
          <p className="mt-6 text-lg leading-7 text-foreground/80 text-balance">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>Status: {project.status}</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
            <span>{project.state}</span>
            {project.github && (
              <>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
                <span>Repository: {project.github}</span>
              </>
            )}
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="01" title="Overview" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>{project.body || project.description}</p>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="02" title="Tags" />
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

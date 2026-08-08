import { Metadata } from 'next';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import { PageTitle } from '@/components/site/page-title';
import { StatusBadge } from '@/components/ui/badge';
import { getProjectBySlug } from '@/lib/content';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

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

export default async function ArgusProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

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
            <StatusBadge status={project.status} label="In Progress" />
            <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
            <span className="text-xs font-mono text-muted-foreground/40 tracking-wider">
              Private
            </span>
          </div>
          <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">{project.title}</h1>
          <div className="mt-1 h-px w-12 bg-border/60" aria-hidden="true" />
          <p className="mt-6 text-lg leading-7 text-foreground/80 text-balance">
            {project.description}
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
            {[
              { name: 'Identity', description: 'Profiles, credentials, and access—one place for who you are online.' },
              { name: 'Mind', description: 'Notes, reading, and knowledge—things you learn and want to keep.' },
              { name: 'Money', description: 'Understand your money—not just track it.' },
              { name: 'Files', description: 'Everything worth keeping, always within reach.' },
              { name: 'Time', description: 'Plan your time with clarity, not complexity.' },
              { name: 'Projects', description: 'Turn ideas into finished work, one step at a time.' },
              { name: 'AI', description: 'Helpful when you ask. Invisible when you don\'t.' },
            ].map((room) => (
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
              ARGUS is currently being built one room at a time. The foundations are in place, and the focus is on creating something reliable before adding more features.
            </p>
            <p>
              There is no public release date, and the source code remains private.
            </p>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="04" title="Principles" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>Privacy by default. Data stays local unless you choose otherwise.</p>
            <p>Local-first. No cloud dependency. No forced subscriptions.</p>
            <p>Ownership. You control the format, the storage, and the future.</p>
            <p>Long-term. Built to outlive platforms, frameworks, and trends.</p>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="05" title="Interested in the project?" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              ARGUS is a long-term personal project.
            </p>
            <p>
              I&apos;m not building a startup, and I&apos;m not looking to grow a team overnight.
            </p>
            <p>
              If you&apos;re an engineer, designer, or researcher who enjoys thoughtful software, privacy, local-first systems, or building products with long-term vision, I&apos;d genuinely enjoy exchanging ideas.
            </p>
            <p>
              Whether it&apos;s architecture, UX, security, or simply discussing better software, feel free to reach out.
            </p>
            <p>
              d3f4lt0@proton.me
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}

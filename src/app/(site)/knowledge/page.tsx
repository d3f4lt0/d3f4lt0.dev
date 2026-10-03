import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import { PageTitle } from '@/components/site/page-title';
import { getKnowledgePage } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Knowledge',
  description: 'Technical interests, current learning areas, and engineering approach.',
  openGraph: {
    title: 'Knowledge — d3f4lt0',
    description: 'Technical interests, current learning areas, and engineering approach.',
    url: 'https://d3f4lt0.dev/knowledge',
    siteName: 'd3f4lt0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Knowledge — d3f4lt0',
    description: 'Technical interests, current learning areas, and engineering approach.',
  },
};

export default function KnowledgePage() {
  const knowledge = getKnowledgePage();

  const interests = (knowledge.interests || []) as { title: string; description: string }[];
  const learning = (knowledge.learning || []) as { title: string; context: string }[];
  const tools = (knowledge.stack || {}) as Record<string, string[]>;
  const workingStyle = (knowledge.working_style || []) as string[];

  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <PageTitle>{knowledge.title || 'Knowledge'}</PageTitle>
          <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">
            {knowledge.description || 'Technical interests, current learning areas, and engineering approach.'}
          </p>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            number="01"
            title={knowledge.interests_title || 'Interests'}
            description={knowledge.interests_description || 'Areas I return to repeatedly.'}
          />
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="grid gap-3">
            {interests.map((item) => (
              <Card key={item.title} className="card-hover-lift border-border/60 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-base font-medium text-foreground/80">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-6">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            number="02"
            title={knowledge.learning_title || 'Learning'}
            description={knowledge.learning_description || 'What I am studying right now.'}
          />
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="grid gap-3">
            {learning.map((item) => (
              <Card key={item.title} className="card-hover-lift border-border/60 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-medium text-foreground/80">{item.title}</h3>
                    <Tag>learning</Tag>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-6">{item.context}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            number="03"
            title={knowledge.stack_title || 'Stack'}
            description={knowledge.stack_description || 'Tools and languages I use regularly.'}
          />
        </div>
        <div className="mx-auto mt-12 max-w-2xl space-y-6">
          {Object.entries(tools).map(([category, items]) => (
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
          <SectionHeader
            number="04"
            title={knowledge.working_style_title || 'Working Style'}
            description={knowledge.working_style_description || 'Principles that shape how I build.'}
          />
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="grid gap-3">
            {workingStyle.map((item) => (
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

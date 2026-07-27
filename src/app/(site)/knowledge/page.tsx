import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import { PageTitle } from '@/components/site/page-title';

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

const interests = [
  { title: 'Distributed systems', description: 'Designing services that remain understandable under failure.' },
  { title: 'Type safety', description: 'Moving correctness left through types, schemas, and compile-time guarantees.' },
  { title: 'Observability', description: 'Logging, metrics, and traces as first-class concerns, not afterthoughts.' },
  { title: 'Trading infrastructure', description: 'Market data pipelines, execution systems, and risk-aware decision layers.' },
];

const learning = [
  { title: 'Rust', context: 'Exploring memory-safe systems programming for performance-critical components.' },
  { title: 'SQL optimization', context: 'Query planning, indexing strategies, and schema evolution at scale.' },
  { title: 'WebAssembly', context: 'Running compute-heavy logic close to the edge without leaving the browser.' },
  { title: 'Formal methods', context: 'Lightweight correctness proofs and property-based testing in Python.' },
];

const tools = {
  Languages: ['TypeScript', 'Python', 'Rust', 'SQL'],
  Frontend: ['Next.js', 'React', 'Tailwind CSS'],
  Backend: ['FastAPI', 'Node.js', 'SQLite', 'PostgreSQL'],
  Infrastructure: ['Docker', 'GitHub Actions', 'Vercel'],
  Tooling: ['ESLint', 'Prettier', 'Vitest', 'Playwright', 'Ruff'],
};

const workingStyle = [
  'Write decisions before code.',
  'Prefer boring technology.',
  'Keep interfaces small and explicit.',
  'Document why, not just what.',
  'Test behavior, not implementation.',
  'Iterate on architecture, not features.',
];

export default function KnowledgePage() {
  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <PageTitle>Knowledge</PageTitle>
          <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">
            Technical interests, current learning areas, and engineering approach.
          </p>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            number="01"
            title="Interests"
            description="Areas I return to repeatedly."
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
            title="Learning"
            description="What I am studying right now."
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
            title="Stack"
            description="Tools and languages I use regularly."
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
            title="Working Style"
            description="Principles that shape how I build."
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

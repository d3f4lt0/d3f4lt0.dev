import { Metadata } from 'next';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { PageTitle } from '@/components/site/page-title';
import { StatusBadge } from '@/components/ui/badge';
import { getNowPage } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Now',
  description: 'What I am currently building, learning, and focusing on.',
  openGraph: {
    title: 'Now — d3f4lt0',
    description: 'What I am currently building, learning, and focusing on.',
    url: 'https://d3f4lt0.dev/now',
    siteName: 'd3f4lt0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Now — d3f4lt0',
    description: 'What I am currently building, learning, and focusing on.',
  },
};

export default async function NowPage() {
  const nowPage = getNowPage();

  if (!nowPage) {
    return null;
  }

  const body = (nowPage.content || '').trim();
  const bodySections = body
    .split('\n## ')
    .map((section) => section.trim())
    .filter((section) => section.length > 0);

  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <PageTitle>Now</PageTitle>
          <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">
            A snapshot of current work, learning, and focus. Updated manually.
          </p>
          <p className="mt-2 text-xs text-muted-foreground/60">
            Last updated: {nowPage.updated}
          </p>
        </div>
      </Section>

      {bodySections.map((section, index) => {
        const lines = section.split('\n');
        const title = lines[0].replace(/^#+\s*/, '');
        const content = lines.slice(1).join('\n').trim();

        return (
          <Section key={index} className="py-16 sm:py-24">
            <div className="mx-auto max-w-2xl">
              <SectionHeader number={`0${index + 1}`} title={title} />
              <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
                {content.split('\n\n').map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Section>
        );
      })}

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <StatusBadge status={nowPage.focus_status} />
            <span className="text-xs font-mono text-muted-foreground/60">Private</span>
          </div>
          <SectionHeader number={`0${bodySections.length + 1}`} title={nowPage.focus_title} />
          <p className="mt-4 text-base leading-7 text-foreground/80">
            {nowPage.focus_one_liner}
          </p>
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            {nowPage.focus_description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

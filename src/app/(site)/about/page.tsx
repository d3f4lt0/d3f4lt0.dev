import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { PageTitle } from '@/components/site/page-title';
import { TimelineItem } from '@/components/ui/timeline-item';
import { getAboutPage } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About',
  description: 'Building software one system at a time. This website documents projects, technical decisions, and experiments built with an architecture-first mindset.',
  openGraph: {
    title: 'About — d3f4lt0',
    description: 'Building software one system at a time. This website documents projects, technical decisions, and experiments built with an architecture-first mindset.',
    url: 'https://d3f4lt0.dev/about',
    siteName: 'd3f4lt0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — d3f4lt0',
    description: 'Building software one system at a time. This website documents projects, technical decisions, and experiments built with an architecture-first mindset.',
  },
};

export default function AboutPage() {
  const about = getAboutPage();

  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <PageTitle>{about.title || 'Building software one system at a time.'}</PageTitle>
          <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">
            {about.body || 'This website documents projects, technical decisions, and experiments built with an architecture-first mindset. Every project is treated as a long-term system designed to remain understandable, maintainable, and continuously improved.'}
          </p>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            number="01"
            title="Philosophy"
          />
          <div className="mt-6 space-y-5 text-base leading-7 text-muted-foreground">
            <p>
              {about.philosophy_1 || 'Good software is rarely the result of writing more code. It comes from making better decisions before the first line is written.'}
            </p>
            <p className="italic text-muted-foreground/75">
              {about.philosophy_2 || 'One must imagine d3f4lt happy pushing code into the void.'}
            </p>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            number="02"
            title="Outside of programming"
          />
          <div className="mt-6 space-y-5 text-base leading-7 text-muted-foreground">
            <p>
              {about.outside || 'When I am not building something, I am usually reading, playing osu!, or exploring random ideas that catch my attention.'}
            </p>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24" id="contact">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            number="03"
            title="Contact"
          />
          <p className="mt-4 text-base text-muted-foreground">
            {about.contact_intro || 'For direct communication or collaboration inquiries.'}
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="grid gap-3">
            {(about.contacts || [
              { label: 'GitHub', href: 'https://github.com/d3f4lt0', external: true },
              { label: 'Instagram', href: 'https://instagram.com/d3f4lt0', external: true },
              { label: 'osu!', href: 'https://osu.ppy.sh/users/39891012', external: true },
              { label: 'Discord', href: 'https://discord.com/users/1264846495555784736', external: true },
              { label: 'Email', href: 'mailto:d3f4lt0@proton.me', external: false },
            ]).map((item: any) => (
              <Link
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="group block"
              >
                <Card className="card-hover-lift border-border/60 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                      <span className="text-sm font-medium text-foreground/80">{item.label}</span>
                      <span className="text-xs text-muted-foreground/70 break-all sm:break-normal">{item.href}</span>
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

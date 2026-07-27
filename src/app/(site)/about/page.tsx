import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { PageTitle } from '@/components/site/page-title';
import { TimelineItem } from '@/components/ui/timeline-item';

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

const milestones = [
  { date: '2026-07-18', title: 'v1.0.0', summary: 'Core pipeline shipped. Collector, indicators, and decision system.' },
  { date: '2026-07-19', title: 'v1.5.0', summary: 'API integration switched to api.mex.live. HMAC SHA256 auth operational.' },
  { date: '2026-07-20', title: 'v1.5.1', summary: 'Network reliability patch. Exponential backoff and retry logic added.' },
  { date: '2026-07-21', title: 'v1.5.2', summary: 'Portfolio valuation restored. Statistics synchronization fixed.' },
  { date: '2026-07-23', title: 'Design System', summary: 'Public website and documentation structure finalized.' },
];

const contacts = [
  { label: 'GitHub', href: 'https://github.com/d3f4lt0', external: true },
  { label: 'Instagram', href: 'https://instagram.com/d3f4lt0', external: true },
  { label: 'osu!', href: 'https://osu.ppy.sh/users/39891012', external: true },
  { label: 'Discord', href: 'https://discord.com/users/1264846495555784736', external: true },
  { label: 'Email', href: 'mailto:d3f4lt0@proton.me', external: false },
];

export default function AboutPage() {
  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <PageTitle>Building software one system at a time.</PageTitle>
          <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">
            This website documents projects, technical decisions, and experiments built with an architecture-first mindset. Every project is treated as a long-term system designed to remain understandable, maintainable, and continuously improved.
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
              Good software is rarely the result of writing more code. It comes from making better decisions before the first line is written.
            </p>
            <p className="italic text-muted-foreground/75">
              One must imagine d3f4lt happy pushing code into the void.
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
              When I am not building something, I am usually reading, playing osu!, or exploring random ideas that catch my attention.
            </p>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            number="03"
            title="Contact"
          />
          <p className="mt-4 text-base text-muted-foreground">
            For direct communication or collaboration inquiries.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="grid gap-3">
            {contacts.map((item) => (
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

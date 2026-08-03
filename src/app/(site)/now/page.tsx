import { Metadata } from 'next';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import { PageTitle } from '@/components/site/page-title';

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

export default function NowPage() {
  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <PageTitle>Now</PageTitle>
          <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">
            A snapshot of current work, learning, and focus. Updated manually.
          </p>
          <p className="mt-2 text-xs text-muted-foreground/60">
            Last updated: 2026-08-03
          </p>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="01" title="Currently Building" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              Porting the core TLS termination logic of tls-proxy from Go to Rust. The goal is a single binary with no external dependencies and a smaller attack surface than the current Go implementation.
            </p>
            <p>
              Refactoring anti-bot-engine challenge pipeline to support async scoring. This is a moderate rewrite and should land before the end of the month.
            </p>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="02" title="Learning" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              Deepening Rust knowledge through low-level network programming. Currently working through async runtimes and how they interact with TLS stacks.
            </p>
            <p>
              Studying HTTP/3 and QUIC transport mechanics to inform the next phase of http2-inspector and the eventual HTTP/3 support in tls-proxy.
            </p>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="03" title="Reading" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              Goodnight Punpun — re-reading it slowly, focusing more on its themes, symbolism, and visual storytelling than the plot itself.
            </p>
            <p>
              Computer Systems: A Programmers Perspective — rereading the memory hierarchy and networking chapters.
            </p>
            <p>
              UNIX Network Programming by Stevens — using it as a reference while building the Rust proxy.
            </p>
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="04" title="Current Focus" />
          <div className="mt-6 grid gap-3">
            {[
              'Reliability over features.',
              'Explicit error handling and observable failure modes.',
              'Documentation written before implementation.',
              'Reducing surface area in network-facing components.',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader number="05" title="Playing" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              osu! — I still play regularly whenever I have some free time. Mostly to relax, improve my rhythm, and have fun.
            </p>
            <p>
              <a
                href="https://osu.ppy.sh/users/39891012"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-sm font-medium text-primary"
              >
                View profile
              </a>
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
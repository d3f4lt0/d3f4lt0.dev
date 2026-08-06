import { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { PageTitle } from '@/components/site/page-title';
import { TimelineItem } from '@/components/ui/timeline-item';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Development notes, release notes, and technical decisions.',
  openGraph: {
    title: 'Journal — d3f4lt0',
    description: 'Development notes, release notes, and technical decisions.',
    url: 'https://d3f4lt0.dev/journal',
    siteName: 'd3f4lt0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Journal — d3f4lt0',
    description: 'Development notes, release notes, and technical decisions.',
  },
};

type JournalStatus = 'completed' | 'active' | 'research' | 'bugfix' | 'deployment';

interface JournalEntry {
  date: string;
  title: string;
  summary: string;
  lessonsLearned: string;
  relatedProject?: string;
  relatedProjectHref?: string;
  status: JournalStatus;
  href?: string;
}

const journalEntries: JournalEntry[] = [
  {
    date: '2026-07-27',
    title: 'Private Beta Preparation',
    summary: 'MEX ARGUS is being prepared for a small private beta. Focus is on stability, logging, and access control.',
    lessonsLearned: 'Private beta means real users. Logging and error reporting need to be production-grade before inviting anyone.',
    status: 'active',
  },
  {
    date: '2026-07-22',
    title: 'Calendar Module Stabilized',
    summary: 'Calendar-dependent scheduling logic in ARGUS now handles timezone offsets and DST transitions without drift.',
    lessonsLearned: 'Timezone handling is easy to get wrong silently. Unit tests with fixed timestamps and explicit offsets caught three bugs before release.',
    status: 'completed',
  },
  {
    date: '2026-07-21',
    title: 'ARGUS v1.5.2 Released',
    summary: 'Portfolio valuation restored using confirmed public endpoint. Statistics synchronization fixed.',
    lessonsLearned: 'Public endpoints can change without notice. Always validate response schemas before production use.',
    status: 'completed',
    href: '/journal/2026-07-21-argus-v1.5.2',
  },
  {
    date: '2026-07-20',
    title: 'Design System Migration',
    summary: 'Migrated web frontend to shadcn/ui with full dark mode support and accessibility improvements.',
    lessonsLearned: 'Component libraries accelerate delivery, but only if the abstraction matches the mental model.',
    relatedProject: 'd3f4lt0.dev',
    relatedProjectHref: '/',
    status: 'completed',
    href: '/journal/2026-07-20-design-system',
  },
  {
    date: '2026-07-19',
    title: 'API Integration Update',
    summary: 'MEX API integration switched to api.mex.live. HMAC SHA256 auth operational.',
    lessonsLearned: 'Network reliability requires explicit retry logic. Exponential backoff is not optional.',
    status: 'completed',
    href: '/journal/2026-07-19-api-update',
  },
  {
    date: '2026-07-18',
    title: 'Portfolio Website Created',
    summary: 'Launched the public-facing portfolio at d3f4lt0.dev. Minimal structure, focused on project documentation and engineering notes.',
    lessonsLearned: 'A minimal site is easier to maintain than a complex one. Start with structure, add personality later.',
    relatedProject: 'd3f4lt0.dev',
    relatedProjectHref: '/',
    status: 'completed',
  },
  {
    date: '2026-07-15',
    title: 'Finance Module Redesign',
    summary: 'ARGUS finance module rewritten to support multiple quote assets and portfolio rebalancing calculations.',
    lessonsLearned: 'Separating valuation logic from persistence made the module testable in isolation.',
    status: 'completed',
  },
  {
    date: '2026-07-12',
    title: 'Fingerprint Detection Experiments',
    summary: 'Initial experiments with browser fingerprint collection using Selenium. Compared Navigator and Screen APIs across profiles.',
    lessonsLearned: 'Browser fingerprints vary more between browser versions than between user profiles.',
    relatedProject: 'fingerprint-audit',
    relatedProjectHref: '/projects/fingerprint-audit',
    status: 'research',
  },
  {
    date: '2026-07-08',
    title: 'Architecture Rewrite',
    summary: 'ARGUS backend reorganized into collector, indicators, decision, and execution engines. Each engine is independently testable.',
    lessonsLearned: 'Explicit boundaries between engines made it easier to replace components without breaking the rest of the system.',
    status: 'completed',
  },
  {
    date: '2026-07-05',
    title: 'Files Module Completed',
    summary: 'ARGUS file handling module finished. Handles configuration loading, log rotation, and artifact cleanup.',
    lessonsLearned: 'Keep file paths relative to a known root. Absolute paths break when the deployment environment changes.',
    status: 'completed',
  },
  {
    date: '2026-07-03',
    title: 'First Version of phantom-fetch',
    summary: 'Released initial version of phantom-fetch with Playwright wrapper, custom user agent, and JSON output.',
    lessonsLearned: 'Stealth is not a single setting. It is a combination of headers, viewport, timezone, and behavior patterns.',
    relatedProject: 'phantom-fetch',
    relatedProjectHref: '/projects/phantom-fetch',
    status: 'completed',
  },
  {
    date: '2026-07-01',
    title: 'Initial Architecture for http2-inspector',
    summary: 'Designed the frame parsing pipeline for http2-inspector. Chose a streaming approach to avoid loading entire captures into memory.',
    lessonsLearned: 'Protocol analyzers should process data as a stream. Binary captures can exceed available memory.',
    relatedProject: 'http2-inspector',
    relatedProjectHref: '/projects/http2-inspector',
    status: 'research',
  },
  {
    date: '2026-06-28',
    title: 'Prototype of anti-bot-engine',
    summary: 'Built a working prototype of the signal collection layer. Captures mouse movement, timing, and interaction patterns.',
    lessonsLearned: 'Behavioral signals are noisy. Thresholds need tuning per deployment, not hardcoded globally.',
    relatedProject: 'anti-bot-engine',
    relatedProjectHref: '/projects/anti-bot-engine',
    status: 'completed',
  },
  {
    date: '2026-06-25',
    title: 'Research for quantum-stealth-kernel',
    summary: 'Started kernel-level research into process enumeration and filesystem visibility. Studied syscall table hooking and dentry caching.',
    lessonsLearned: 'Kernel research moves slower than user space. Documentation and reproducible test environments are essential.',
    relatedProject: 'quantum-stealth-kernel',
    relatedProjectHref: '/projects/quantum-stealth-kernel',
    status: 'research',
  },
  {
    date: '2026-06-18',
    title: 'Started phantom-fetch',
    summary: 'Began work on a headless content fetcher after repeated issues with detectable automation in research workflows.',
    lessonsLearned: 'Existing headless browsers are detectable by default. Stealth requires explicit configuration, not just a flag.',
    relatedProject: 'phantom-fetch',
    relatedProjectHref: '/projects/phantom-fetch',
    status: 'active',
  },
  {
    date: '2026-06-15',
    title: 'Started tls-proxy',
    summary: 'Started tls-proxy as a minimal alternative to heavy ingress controllers. Initial focus on cipher suite control and mTLS.',
    lessonsLearned: 'TLS configuration is surprisingly subtle. Explicit cipher suite lists prevent fallback to weak defaults.',
    relatedProject: 'tls-proxy',
    relatedProjectHref: '/projects/tls-proxy',
    status: 'active',
  },
  {
    date: '2026-06-10',
    title: 'Started MEX ARGUS',
    summary: 'Began development of a personal trading intelligence platform for the MEX exchange. Initial scope: portfolio tracking and candlestick collection.',
    lessonsLearned: 'Define the data model before writing the collector. Schema drift is expensive to fix later.',
    status: 'active',
  },
];

export default function JournalPage() {
  return (
    <div className="page-fade-in">
      <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <PageTitle>Journal</PageTitle>
          <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">
            Journal of decisions, milestones, and lessons learned.
          </p>
        </div>
      </Section>

      <Section className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            number="01"
            title="Recent Entries"
            description="Chronological log of engineering milestones."
          />
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <Card className="border-border/60 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="divide-y divide-border/60">
                {journalEntries.map((entry) => (
                  <TimelineItem
                    key={entry.date + entry.title}
                    date={entry.date}
                    title={entry.title}
                    summary={entry.summary}
                    href={entry.href}
                    lessonsLearned={entry.lessonsLearned}
                    relatedProject={entry.relatedProject}
                    relatedProjectHref={entry.relatedProjectHref}
                    status={entry.status}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="mt-8">
            <Link
              href="#"
              className="link-underline text-sm font-medium text-primary"
            >
              View archive
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
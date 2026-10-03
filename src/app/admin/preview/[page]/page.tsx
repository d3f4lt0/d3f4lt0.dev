'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Section } from '@/components/site/section';
import { SectionHeader } from '@/components/site/section-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PageTitle } from '@/components/site/page-title';
import { Tag } from '@/components/ui/tag';
import { TimelineItem } from '@/components/ui/timeline-item';
import { Editable } from '@/components/admin/editable';

type PageSlug = 'home' | 'now' | 'projects' | 'journal' | 'settings' | 'about';

function useOrigin() {
  const [origin, setOrigin] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin.replace(/(https?:\/\/).+@/, '$1'));
    }
  }, []);
  return origin;
}

async function apiGet(origin: string, path: string) {
  const res = await fetch(`${origin}/api/admin/content?path=${encodeURIComponent(path)}`);
  if (!res.ok) throw new Error('Failed to load');
  return res.json();
}

async function apiPost(origin: string, path: string, content: string, sha?: string, message?: string) {
  const res = await fetch(`${origin}/api/admin/content`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path, content, sha, message: message || `Update ${path} via admin` }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Save failed');
  }
  return res.json();
}

async function apiList(origin: string, dir: string) {
  const res = await fetch(`${origin}/api/admin/content/list?dir=${encodeURIComponent(dir)}`);
  if (!res.ok) throw new Error('Failed to list');
  return res.json();
}

export default function AdminPreviewPage() {
  const params = useParams();
  const page = (params?.page as PageSlug) || 'home';
  const origin = useOrigin();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [site, setSite] = useState<{ title: string; tagline: string; subtagline: string; trade_line: string } | null>(null);
  const [siteSha, setSiteSha] = useState<string | undefined>();

  const [now, setNow] = useState<{ title: string; updated: string; sections: { title: string; content: string }[] } | null>(null);
  const [nowSha, setNowSha] = useState<string | undefined>();

  const [projects, setProjects] = useState<any[]>([]);
  const [projectsSha, setProjectsSha] = useState<Record<string, string | undefined>>({});

  const [journal, setJournal] = useState<any[]>([]);
  const [journalSha, setJournalSha] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    if (!origin) return;
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (page === 'home' || page === 'settings') {
      apiGet(origin, 'content/settings/site.json')
        .then((data) => {
          setSite(JSON.parse(data.content));
          setSiteSha(data.sha);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else if (page === 'now') {
      apiGet(origin, 'content/now/index.md')
        .then(async (data) => {
          const matter = (await import('gray-matter')).default;
          const { data: frontmatter, content: body } = matter(data.content);
          const sections = body
            .split('\n## ')
            .map((s: string) => s.trim())
            .filter((s: string) => s.length > 0)
            .map((s: string) => {
              const lines = s.split('\n');
              const title = lines[0].replace(/^#+\s*/, '');
              const content = lines.slice(1).join('\n').trim();
              return { title, content };
            });
          setNow({ title: frontmatter.title || 'Now', updated: frontmatter.updated || '', sections });
          setNowSha(data.sha);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else if (page === 'projects') {
      apiList(origin, 'content/projects')
        .then(async ({ files }: { files: string[] }) => {
          const matter = (await import('gray-matter')).default;
          const entries = await Promise.all(
            files.map(async (file) => {
              const slug = file.replace(/\.md$/, '');
              const data = await apiGet(origin, `content/projects/${file}`);
              const { data: fm } = matter(data.content);
              return { ...fm, slug, _sha: data.sha };
            })
          );
          setProjects(entries);
          setProjectsSha(Object.fromEntries(entries.map((p: any) => [p.slug, p._sha])));
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else if (page === 'journal') {
      apiList(origin, 'content/journal')
        .then(async ({ files }: { files: string[] }) => {
          const matter = (await import('gray-matter')).default;
          const entries = await Promise.all(
            files.map(async (file) => {
              const slug = file.replace(/\.md$/, '');
              const data = await apiGet(origin, `content/journal/${file}`);
              const { data: fm } = matter(data.content);
              return { ...fm, _slug: slug, _sha: data.sha };
            })
          );
          setJournal(entries);
          setJournalSha(Object.fromEntries(entries.map((e: any) => [e._slug, e._sha])));
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [page, origin]);

  const saveSite = async (patch: Partial<{ title: string; tagline: string; subtagline: string; trade_line: string }>) => {
    if (!origin || !site) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const updated = { ...site, ...patch };
      setSite(updated);
      const content = JSON.stringify(updated, null, 2);
      await apiPost(origin, 'content/settings/site.json', content, siteSha, 'Update site settings via admin');
      setSiteSha(undefined);
      setSuccess('Saved. Vercel will auto-deploy shortly.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const saveNow = async () => {
    if (!origin || !now) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const matter = (await import('gray-matter')).default;
      const body = now.sections.map((s) => `## ${s.title}\n\n${s.content}`).join('\n\n');
      const content = matter.stringify(body, { title: now.title, updated: now.updated });
      const res = await apiPost(origin, 'content/now/index.md', content, nowSha, 'Update now page via admin');
      setNowSha(res.commit ? undefined : nowSha);
      setSuccess('Saved. Vercel will auto-deploy shortly.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const saveProject = async (slug: string, patch: Record<string, any>) => {
    if (!origin) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const project = projects.find((p: any) => p.slug === slug);
      if (!project) return;
      const updated = { ...project, ...patch };
      delete updated._sha;
      delete updated._slug;
      const matter = (await import('gray-matter')).default;
      const fileContent = matter.stringify(updated.body || '', updated);
      const res = await apiPost(origin, `content/projects/${slug}.md`, fileContent, projectsSha[slug], `Update project ${slug} via admin`);
      setProjectsSha((prev) => ({ ...prev, [slug]: res.commit ? undefined : prev[slug] }));
      setSuccess('Saved. Vercel will auto-deploy shortly.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !origin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="nerv-readout">Loading...</div>
      </div>
    );
  }

  if (page === 'about') {
    return (
      <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium tracking-tight">Admin - About</h1>
              <p className="mt-1 text-sm text-muted-foreground">About page preview</p>
            </div>
            <Link href="/admin" className="link-underline text-sm font-medium text-primary">&larr; Back to Admin</Link>
          </div>
          <div className="rounded-md border border-border/60 bg-card/30 p-4">
            <h3 className="text-sm font-medium text-foreground/80">Not yet editable</h3>
            <p className="mt-1 text-sm text-muted-foreground/75">The About page is entirely hardcoded. To make it editable, move its text into a data source (e.g. content/about.md or site.json).</p>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'settings' && site) {
    return (
      <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium tracking-tight">Admin - Settings</h1>
              <p className="mt-1 text-sm text-muted-foreground">Edit site.json</p>
            </div>
            <Link href="/admin" className="link-underline text-sm font-medium text-primary">&larr; Back to Admin</Link>
          </div>

          {error && <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}
          {success && <div className="mb-6 rounded-md border border-primary/40 bg-primary/10 p-4 text-sm text-primary">{success}</div>}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Site Title</label>
              <input type="text" value={site.title} onChange={(e) => saveSite({ title: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Tagline</label>
              <textarea value={site.tagline} onChange={(e) => saveSite({ tagline: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" rows={3} disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Subtagline</label>
              <textarea value={site.subtagline} onChange={(e) => saveSite({ subtagline: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" rows={3} disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Trade Line</label>
              <textarea value={site.trade_line} onChange={(e) => saveSite({ trade_line: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" rows={3} disabled={saving} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'home' && site) {
    return (
      <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium tracking-tight">Admin - Home</h1>
              <p className="mt-1 text-sm text-muted-foreground">Click any editable text to modify it.</p>
            </div>
            <Link href="/admin" className="link-underline text-sm font-medium text-primary">&larr; Back to Admin</Link>
          </div>

          {error && <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}
          {success && <div className="mb-6 rounded-md border border-primary/40 bg-primary/10 p-4 text-sm text-primary">{success}</div>}

          <Section className="relative pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24 lg:pb-[96px]">
            <div className="absolute inset-0 bg-white/70 dark:bg-black/60" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
              <PageTitle>d3f4lt0</PageTitle>
              <div className="mt-1 h-px w-12 bg-border/60" aria-hidden="true" />
              <Editable value={site.tagline} onSave={(val) => saveSite({ tagline: val })} className="mt-8 text-lg leading-7 text-foreground/80 text-balance" as="p" saving={saving} />
              <Editable value={site.subtagline} onSave={(val) => saveSite({ subtagline: val })} className="mt-4 text-sm leading-6 text-muted-foreground/75" as="p" saving={saving} />
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link href="/projects" className="link-underline text-sm font-medium text-primary">Projects</Link>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
                <Link href="/journal" className="link-underline text-sm font-medium text-primary">Journal</Link>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
                <Link href="/knowledge" className="link-underline text-sm font-medium text-primary">Knowledge</Link>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
                <a href="https://github.com/d3f4lt0" target="_blank" rel="noopener noreferrer" className="link-underline text-sm font-medium text-primary">GitHub</a>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
                <Link href="/now" className="link-underline text-sm font-medium text-primary">Now</Link>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
                <Link href="/about#contact" className="link-underline text-sm font-medium text-primary">Contact</Link>
              </div>

              <div className="mt-8 border-l-2 border-sky-400/20 pl-6 sm:pl-8">
                <p className="text-xs font-mono text-sky-400/70">Current mode</p>
                <p className="mt-1 text-sm font-medium text-foreground/80">Dopamine Detox</p>
                <p className="mt-1 text-sm text-muted-foreground/75">
                  Most accounts are intentionally offline for now. If something genuinely urgent needs my attention,{' '}
                  <a href="mailto:d3f4lt0@proton.me" className="link-underline text-foreground/75">email</a> is the best way to reach me.
                </p>
              </div>
            </div>
          </Section>

          <p className="py-8 text-center text-sm font-semibold text-muted-foreground/60">
            <Editable value={site.trade_line} onSave={(val) => saveSite({ trade_line: val })} as="span" saving={saving} />
          </p>

          <Section className="py-16 sm:py-24">
            <div className="mx-auto max-w-2xl">
              <SectionHeader number="01" title="Projects" description="Things I've built." />
            </div>
            <div className="mx-auto mt-12 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((project) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`} className="group block">
                    <Card className="card-hover-lift h-full border-border/60 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl tracking-tight">{project.title}</CardTitle>
                          <div className="flex items-center gap-2"><Tag>{project.status}</Tag></div>
                        </div>
                        <CardDescription className="leading-6">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground/80">{project.state}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-4">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((item: string) => <Tag key={item}>{item}</Tag>)}
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground/70">
                          <span className="inline-flex items-center gap-1.5">{project.date}</span>
                          {project.github && <span className="truncate">{project.github}</span>}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </Section>

          <Section className="py-16 sm:py-24">
            <div className="mx-auto max-w-2xl">
              <SectionHeader number="02" title="Journal" description="Recent notes and updates." />
            </div>
            <div className="mx-auto mt-12 max-w-2xl">
              <div className="divide-y divide-border/60">
                {journal.slice(0, 3).map((entry) => (
                  <TimelineItem key={entry.date + entry.title} date={entry.date} title={entry.title} summary={entry.summary} href={entry.href} lessonsLearned="" relatedProject={entry.relatedProject} relatedProjectHref={entry.relatedProjectHref} status={entry.status} />
                ))}
              </div>
              <div className="mt-8">
                <Link href="/journal" className="link-underline text-sm font-medium text-primary">View all entries</Link>
              </div>
            </div>
          </Section>
        </div>
      </div>
    );
  }

  if (page === 'now' && now) {
    return (
      <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium tracking-tight">Admin - Now</h1>
              <p className="mt-1 text-sm text-muted-foreground">Click any editable text to modify it.</p>
            </div>
            <Link href="/admin" className="link-underline text-sm font-medium text-primary">&larr; Back to Admin</Link>
          </div>

          {error && <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}
          {success && <div className="mb-6 rounded-md border border-primary/40 bg-primary/10 p-4 text-sm text-primary">{success}</div>}

          <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
            <div className="mx-auto max-w-2xl">
              <PageTitle>Now</PageTitle>
              <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">A snapshot of current work, learning, and focus. Updated manually.</p>
              <p className="mt-2 text-xs text-muted-foreground/60">Last updated: <Editable value={now.updated} onSave={(val) => setNow({ ...now, updated: val })} as="span" saving={saving} /></p>
            </div>
          </Section>

          {now.sections.map((section, index) => (
            <Section key={index} className="py-16 sm:py-24">
              <div className="mx-auto max-w-2xl">
                <SectionHeader number={`0${index + 1}`} title={section.title} />
                <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
                  {section.content.split('\n\n').map((paragraph: string, pIndex: number) => (
                    <Editable key={pIndex} value={paragraph} onSave={(val) => {
                      const newSections = [...now.sections];
                      newSections[index] = { ...newSections[index], content: newSections[index].content.replace(paragraph, val) };
                      setNow({ ...now, sections: newSections });
                    }} className="text-base leading-7 text-muted-foreground" as="p" saving={saving} />
                  ))}
                </div>
              </div>
            </Section>
          ))}

          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 pb-16">
            <button type="button" onClick={saveNow} disabled={saving} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Now page'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'projects' && projects.length > 0) {
    return (
      <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium tracking-tight">Admin - Projects</h1>
              <p className="mt-1 text-sm text-muted-foreground">Click any editable text to modify it.</p>
            </div>
            <Link href="/admin" className="link-underline text-sm font-medium text-primary">&larr; Back to Admin</Link>
          </div>

          {error && <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}
          {success && <div className="mb-6 rounded-md border border-primary/40 bg-primary/10 p-4 text-sm text-primary">{success}</div>}

          <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
            <div className="mx-auto max-w-2xl">
              <PageTitle>Projects</PageTitle>
              <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">Open-source tools and systems built for engineering problems.</p>
            </div>
          </Section>

          <Section className="py-16 sm:py-24">
            <div className="mx-auto max-w-2xl">
              <SectionHeader number="01" title="All Projects" description="Each project is a self-contained engineering effort with its own documentation, changelog, and architecture." />
            </div>
            <div className="mx-auto mt-12 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((project) => (
                  <div key={project.slug} className="group block">
                    <Card className="card-hover-lift h-full border-border/60 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Editable value={project.title} onSave={(val) => saveProject(project.slug, { title: val })} className="text-xl tracking-tight" as="h3" saving={saving} />
                          <div className="flex items-center gap-2"><Tag>{project.status}</Tag></div>
                        </div>
                        <Editable value={project.description} onSave={(val) => saveProject(project.slug, { description: val })} className="leading-6" as="p" saving={saving} />
                      </CardHeader>
                      <CardContent>
                        <Editable value={project.state} onSave={(val) => saveProject(project.slug, { state: val })} className="text-sm text-muted-foreground/80" as="p" saving={saving} />
                        <div className="mt-3 flex flex-wrap items-center gap-4">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((item: string) => <Tag key={item}>{item}</Tag>)}
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground/70">
                          <span className="inline-flex items-center gap-1.5">{project.date}</span>
                          {project.github && <span className="truncate">{project.github}</span>}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </div>
    );
  }

  if (page === 'journal' && journal.length > 0) {
    return (
      <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium tracking-tight">Admin - Journal</h1>
              <p className="mt-1 text-sm text-muted-foreground">Click any editable text to modify it.</p>
            </div>
            <Link href="/admin" className="link-underline text-sm font-medium text-primary">&larr; Back to Admin</Link>
          </div>

          {error && <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}
          {success && <div className="mb-6 rounded-md border border-primary/40 bg-primary/10 p-4 text-sm text-primary">{success}</div>}

          <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
            <div className="mx-auto max-w-2xl">
              <PageTitle>Journal</PageTitle>
              <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">Journal of decisions, milestones, and lessons learned.</p>
            </div>
          </Section>

          <Section className="py-16 sm:py-24">
            <div className="mx-auto max-w-2xl">
              <SectionHeader number="01" title="Recent Entries" description="Chronological log of engineering milestones." />
            </div>
            <div className="mx-auto mt-12 max-w-2xl">
              <Card className="border-border/60 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="divide-y divide-border/60">
                    {journal.map((entry) => (
                      <TimelineItem key={entry.date + entry.title} date={entry.date} title={entry.title} summary={entry.summary} href={entry.href} lessonsLearned="" relatedProject={entry.relatedProject} relatedProjectHref={entry.relatedProjectHref} status={entry.status} />
                    ))}
                  </div>
                </CardContent>
              </Card>
              <div className="mt-8">
                <Link href="#" className="link-underline text-sm font-medium text-primary">View archive</Link>
              </div>
            </div>
          </Section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-medium tracking-tight">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">The requested admin preview page does not exist.</p>
        <Link href="/admin" className="mt-4 link-underline text-sm font-medium text-primary">&larr; Back to Admin</Link>
      </div>
    </div>
  );
}

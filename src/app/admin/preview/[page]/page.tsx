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

type PageSlug = 'home' | 'now' | 'projects' | 'journal' | 'settings' | 'about' | 'knowledge' | 'docs' | 'docs-architecture' | '404' | 'header' | 'footer';

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

  const [site, setSite] = useState<{ title: string; tagline: string; subtagline: string; trade_line: string; home_title?: string; home_tagline?: string; projects_description?: string; journal_description?: string; now_intro?: string; brand_name?: string; nav_projects?: string; nav_journal?: string; nav_knowledge?: string; nav_now?: string; nav_about?: string; footer_brand?: string; footer_projects?: string; footer_journal?: string; footer_knowledge?: string; footer_about?: string; mode_label?: string; mode_status?: string; mode_body?: string; mode_email_label?: string; view_project?: string; view_all_journal?: string; view_archive?: string; docs_title?: string; docs_description?: string; docs_architecture_title?: string; docs_architecture_description?: string; docs_view_architecture?: string; docs_back_to_docs?: string; knowledge_title?: string; knowledge_description?: string; knowledge_interests_title?: string; knowledge_interests_description?: string; knowledge_learning_title?: string; knowledge_learning_description?: string; knowledge_stack_title?: string; knowledge_stack_description?: string; knowledge_working_style_title?: string; knowledge_working_style_description?: string; '404_title'?: string; '404_body'?: string; '404_return_home'?: string; [key: string]: any } | null>(null);
  const [siteSha, setSiteSha] = useState<string | undefined>();

  const [now, setNow] = useState<{ title: string; updated: string; sections: { title: string; content: string }[] } | null>(null);
  const [nowSha, setNowSha] = useState<string | undefined>();

  const [projects, setProjects] = useState<any[]>([]);
  const [projectsSha, setProjectsSha] = useState<Record<string, string | undefined>>({});
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const [journal, setJournal] = useState<any[]>([]);
  const [journalSha, setJournalSha] = useState<Record<string, string | undefined>>({});
  const [selectedJournal, setSelectedJournal] = useState<string | null>(null);

  const [about, setAbout] = useState<{ title: string; body: string; philosophy_1?: string; philosophy_2?: string; outside?: string; contact_intro?: string; [key: string]: any } | null>(null);
  const [aboutSha, setAboutSha] = useState<string | undefined>();

  const [knowledge, setKnowledge] = useState<any>(null);
  const [knowledgeSha, setKnowledgeSha] = useState<string | undefined>();

  const [docs, setDocs] = useState<any>(null);
  const [docsSha, setDocsSha] = useState<string | undefined>();

  const [docsArch, setDocsArch] = useState<any>(null);
  const [docsArchSha, setDocsArchSha] = useState<string | undefined>();

  const [notFound, setNotFound] = useState<any>(null);
  const [notFoundSha, setNotFoundSha] = useState<string | undefined>();

  useEffect(() => {
    if (!origin) return;
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (page === 'home' || page === 'settings' || page === 'header' || page === 'footer') {
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
          if (!selectedProject && entries.length > 0) {
            setSelectedProject(entries[0].slug);
          }
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
          if (!selectedJournal && entries.length > 0) {
            setSelectedJournal(entries[0]._slug);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else if (page === 'about') {
      apiGet(origin, 'content/about.json')
        .then((data) => {
          setAbout(JSON.parse(data.content));
          setAboutSha(data.sha);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else if (page === 'knowledge') {
      apiGet(origin, 'content/knowledge.json')
        .then((data) => {
          setKnowledge(JSON.parse(data.content));
          setKnowledgeSha(data.sha);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else if (page === 'docs') {
      apiGet(origin, 'content/docs.json')
        .then((data) => {
          setDocs(JSON.parse(data.content));
          setDocsSha(data.sha);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else if (page === 'docs-architecture') {
      apiGet(origin, 'content/docs/architecture.json')
        .then((data) => {
          setDocsArch(JSON.parse(data.content));
          setDocsArchSha(data.sha);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else if (page === '404') {
      apiGet(origin, 'content/404.json')
        .then((data) => {
          setNotFound(JSON.parse(data.content));
          setNotFoundSha(data.sha);
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

  const saveSite = async (patch: Record<string, any>) => {
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

  const saveJournal = async (slug: string, patch: Record<string, any>) => {
    if (!origin) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const entry = journal.find((e: any) => e._slug === slug);
      if (!entry) return;
      const updated = { ...entry, ...patch };
      delete updated._sha;
      delete updated._slug;
      const matter = (await import('gray-matter')).default;
      const fileContent = matter.stringify(updated.body || '', updated);
      const res = await apiPost(origin, `content/journal/${slug}.md`, fileContent, journalSha[slug], `Update journal ${slug} via admin`);
      setJournalSha((prev) => ({ ...prev, [slug]: res.commit ? undefined : prev[slug] }));
      setSuccess('Saved. Vercel will auto-deploy shortly.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const saveAbout = async (patch: Record<string, any>) => {
    if (!origin || !about) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const updated = { ...about, ...patch };
      setAbout(updated);
      const content = JSON.stringify(updated, null, 2);
      await apiPost(origin, 'content/about.json', content, aboutSha, 'Update about page via admin');
      setAboutSha(undefined);
      setSuccess('Saved. Vercel will auto-deploy shortly.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const saveKnowledge = async (patch: Record<string, any>) => {
    if (!origin || !knowledge) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const updated = { ...knowledge, ...patch };
      setKnowledge(updated);
      const content = JSON.stringify(updated, null, 2);
      await apiPost(origin, 'content/knowledge.json', content, knowledgeSha, 'Update knowledge page via admin');
      setKnowledgeSha(undefined);
      setSuccess('Saved. Vercel will auto-deploy shortly.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const saveDocs = async (patch: Record<string, any>) => {
    if (!origin || !docs) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const updated = { ...docs, ...patch };
      setDocs(updated);
      const content = JSON.stringify(updated, null, 2);
      await apiPost(origin, 'content/docs.json', content, docsSha, 'Update docs page via admin');
      setDocsSha(undefined);
      setSuccess('Saved. Vercel will auto-deploy shortly.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const saveDocsArch = async (patch: Record<string, any>) => {
    if (!origin || !docsArch) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const updated = { ...docsArch, ...patch };
      setDocsArch(updated);
      const content = JSON.stringify(updated, null, 2);
      await apiPost(origin, 'content/docs/architecture.json', content, docsArchSha, 'Update docs architecture via admin');
      setDocsArchSha(undefined);
      setSuccess('Saved. Vercel will auto-deploy shortly.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const saveNotFound = async (patch: Record<string, any>) => {
    if (!origin || !notFound) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const updated = { ...notFound, ...patch };
      setNotFound(updated);
      const content = JSON.stringify(updated, null, 2);
      await apiPost(origin, 'content/404.json', content, notFoundSha, 'Update 404 page via admin');
      setNotFoundSha(undefined);
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

  if (page === 'about' && about) {
    const contacts = about.contacts || [];
    return (
      <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium tracking-tight">Admin - About</h1>
              <p className="mt-1 text-sm text-muted-foreground">Click any editable text to modify it.</p>
            </div>
            <Link href="/admin" className="link-underline text-sm font-medium text-primary">&larr; Back to Admin</Link>
          </div>

          {error && <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}
          {success && <div className="mb-6 rounded-md border border-primary/40 bg-primary/10 p-4 text-sm text-primary">{success}</div>}

          <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
            <div className="mx-auto max-w-2xl">
              <PageTitle>{about.title}</PageTitle>
              <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">{about.body}</p>
            </div>
          </Section>

          <Section className="py-16 sm:py-24">
            <div className="mx-auto max-w-2xl">
              <SectionHeader number="01" title="Philosophy" />
              <div className="mt-6 space-y-5 text-base leading-7 text-muted-foreground">
                <Editable value={about.philosophy_1 || ''} onSave={(val) => saveAbout({ philosophy_1: val })} className="text-base leading-7 text-muted-foreground" as="p" saving={saving} />
                <Editable value={about.philosophy_2 || ''} onSave={(val) => saveAbout({ philosophy_2: val })} className="italic text-muted-foreground/75" as="p" saving={saving} />
              </div>
            </div>
          </Section>

          <Section className="py-16 sm:py-24">
            <div className="mx-auto max-w-2xl">
              <SectionHeader number="02" title="Outside of programming" />
              <div className="mt-6 space-y-5 text-base leading-7 text-muted-foreground">
                <Editable value={about.outside || ''} onSave={(val) => saveAbout({ outside: val })} className="text-base leading-7 text-muted-foreground" as="p" saving={saving} />
              </div>
            </div>
          </Section>

          <Section className="py-16 sm:py-24" id="contact">
            <div className="mx-auto max-w-2xl">
              <SectionHeader number="03" title="Contact" />
              <p className="mt-4 text-base text-muted-foreground">{about.contact_intro}</p>
            </div>
            <div className="mx-auto mt-12 max-w-2xl">
              <div className="grid gap-3">
                {contacts.map((item: any) => (
                  <Link key={item.label} href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined} className="group block">
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
            <div>
              <label className="block text-sm font-medium">Home Title</label>
              <input type="text" value={site.home_title || ''} onChange={(e) => saveSite({ home_title: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Home Tagline</label>
              <textarea value={site.home_tagline || ''} onChange={(e) => saveSite({ home_tagline: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" rows={3} disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Projects Description</label>
              <textarea value={site.projects_description || ''} onChange={(e) => saveSite({ projects_description: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" rows={3} disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Journal Description</label>
              <textarea value={site.journal_description || ''} onChange={(e) => saveSite({ journal_description: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" rows={3} disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Now Intro</label>
              <textarea value={site.now_intro || ''} onChange={(e) => saveSite({ now_intro: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" rows={3} disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Brand Name</label>
              <input type="text" value={site.brand_name || ''} onChange={(e) => saveSite({ brand_name: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Nav Projects</label>
              <input type="text" value={site.nav_projects || ''} onChange={(e) => saveSite({ nav_projects: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Nav Journal</label>
              <input type="text" value={site.nav_journal || ''} onChange={(e) => saveSite({ nav_journal: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Nav Knowledge</label>
              <input type="text" value={site.nav_knowledge || ''} onChange={(e) => saveSite({ nav_knowledge: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Nav Now</label>
              <input type="text" value={site.nav_now || ''} onChange={(e) => saveSite({ nav_now: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Nav About</label>
              <input type="text" value={site.nav_about || ''} onChange={(e) => saveSite({ nav_about: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Footer Brand</label>
              <input type="text" value={site.footer_brand || ''} onChange={(e) => saveSite({ footer_brand: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Footer Projects</label>
              <input type="text" value={site.footer_projects || ''} onChange={(e) => saveSite({ footer_projects: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Footer Journal</label>
              <input type="text" value={site.footer_journal || ''} onChange={(e) => saveSite({ footer_journal: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Footer Knowledge</label>
              <input type="text" value={site.footer_knowledge || ''} onChange={(e) => saveSite({ footer_knowledge: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Footer About</label>
              <input type="text" value={site.footer_about || ''} onChange={(e) => saveSite({ footer_about: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Mode Label</label>
              <input type="text" value={site.mode_label || ''} onChange={(e) => saveSite({ mode_label: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Mode Status</label>
              <input type="text" value={site.mode_status || ''} onChange={(e) => saveSite({ mode_status: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Mode Body</label>
              <textarea value={site.mode_body || ''} onChange={(e) => saveSite({ mode_body: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" rows={3} disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Mode Email Label</label>
              <input type="text" value={site.mode_email_label || ''} onChange={(e) => saveSite({ mode_email_label: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
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
              <PageTitle>{site.home_title || site.title || 'd3f4lt0'}</PageTitle>
              <div className="mt-1 h-px w-12 bg-border/60" aria-hidden="true" />
              <Editable value={site.home_tagline || site.tagline} onSave={(val) => saveSite({ home_tagline: val })} className="mt-8 text-lg leading-7 text-foreground/80 text-balance" as="p" saving={saving} />
              <Editable value={site.subtagline} onSave={(val) => saveSite({ subtagline: val })} className="mt-4 text-sm leading-6 text-muted-foreground/75" as="p" saving={saving} />
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link href="/projects" className="link-underline text-sm font-medium text-primary">{site.nav_projects || 'Projects'}</Link>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
                <Link href="/journal" className="link-underline text-sm font-medium text-primary">{site.nav_journal || 'Journal'}</Link>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
                <Link href="/knowledge" className="link-underline text-sm font-medium text-primary">{site.nav_knowledge || 'Knowledge'}</Link>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
                <a href="https://github.com/d3f4lt0" target="_blank" rel="noopener noreferrer" className="link-underline text-sm font-medium text-primary">GitHub</a>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
                <Link href="/now" className="link-underline text-sm font-medium text-primary">{site.nav_now || 'Now'}</Link>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/30" aria-hidden="true" />
                <Link href="/about#contact" className="link-underline text-sm font-medium text-primary">Contact</Link>
              </div>

              <div className="mt-8 border-l-2 border-sky-400/20 pl-6 sm:pl-8">
                <p className="text-xs font-mono text-sky-400/70">{site.mode_label || 'Current mode'}</p>
                <p className="mt-1 text-sm font-medium text-foreground/80">{site.mode_status || 'Dopamine Detox'}</p>
                <p className="mt-1 text-sm text-muted-foreground/75">
                  {site.mode_body || 'Most accounts are intentionally offline for now. If something genuinely urgent needs my attention, '}
                  <a href="mailto:d3f4lt0@proton.me" className="link-underline text-foreground/75">{site.mode_email_label || 'email'}</a> is the best way to reach me.
                </p>
              </div>
            </div>
          </Section>

          <p className="py-8 text-center text-sm font-semibold text-muted-foreground/60">
            <Editable value={site.trade_line} onSave={(val) => saveSite({ trade_line: val })} as="span" saving={saving} />
          </p>

          <Section className="py-16 sm:py-24">
            <div className="mx-auto max-w-2xl">
              <SectionHeader number="01" title="Projects" description={site.projects_description || 'Things I\'ve built.'} />
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
              <SectionHeader number="02" title="Journal" description={site.journal_description || 'Recent notes and updates.'} />
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
              <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">{site?.now_intro || 'A snapshot of current work, learning, and focus. Updated manually.'}</p>
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

  if (page === 'projects' && projects.length > 0 && selectedProject) {
    const project = projects.find((p: any) => p.slug === selectedProject) || projects[0];
    return (
      <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium tracking-tight">Admin - Projects</h1>
              <p className="mt-1 text-sm text-muted-foreground">Pick a project, then click text to edit.</p>
            </div>
            <Link href="/admin" className="link-underline text-sm font-medium text-primary">&larr; Back to Admin</Link>
          </div>

          {error && <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}
          {success && <div className="mb-6 rounded-md border border-primary/40 bg-primary/10 p-4 text-sm text-primary">{success}</div>}

          <div className="mb-6">
            <label className="block text-sm font-medium">Select project</label>
            <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving}>
              {projects.map((p: any) => (
                <option key={p.slug} value={p.slug}>{p.title} ({p.slug})</option>
              ))}
            </select>
          </div>

          <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
            <div className="mx-auto max-w-2xl">
              <PageTitle>Projects</PageTitle>
              <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">{site?.projects_description || 'Open-source tools and systems built for engineering problems.'}</p>
            </div>
          </Section>

          <Section className="py-16 sm:py-24">
            <div className="mx-auto max-w-2xl">
              <SectionHeader number="01" title="All Projects" description="Each project is a self-contained engineering effort with its own documentation, changelog, and architecture." />
            </div>
            <div className="mx-auto mt-12 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="group block">
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
              </div>
            </div>
          </Section>
        </div>
      </div>
    );
  }

  if (page === 'journal' && journal.length > 0 && selectedJournal) {
    const entry = journal.find((e: any) => e._slug === selectedJournal) || journal[0];
    return (
      <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium tracking-tight">Admin - Journal</h1>
              <p className="mt-1 text-sm text-muted-foreground">Pick an entry, then click text to edit.</p>
            </div>
            <Link href="/admin" className="link-underline text-sm font-medium text-primary">&larr; Back to Admin</Link>
          </div>

          {error && <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}
          {success && <div className="mb-6 rounded-md border border-primary/40 bg-primary/10 p-4 text-sm text-primary">{success}</div>}

          <div className="mb-6">
            <label className="block text-sm font-medium">Select entry</label>
            <select value={selectedJournal} onChange={(e) => setSelectedJournal(e.target.value)} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving}>
              {journal.map((e: any) => (
                <option key={e._slug} value={e._slug}>{e.date} — {e.title}</option>
              ))}
            </select>
          </div>

          <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
            <div className="mx-auto max-w-2xl">
              <PageTitle>Journal</PageTitle>
              <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">{site?.journal_description || 'Journal of decisions, milestones, and lessons learned.'}</p>
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
                    <TimelineItem
                      date={entry.date}
                      title={entry.title}
                      summary={entry.summary}
                      href={entry.href}
                      lessonsLearned=""
                      relatedProject={entry.relatedProject}
                      relatedProjectHref={entry.relatedProjectHref}
                      status={entry.status}
                    />
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

  if (page === 'knowledge' && knowledge) {
    const interests = (knowledge.interests || []) as { title: string; description: string }[];
    const learning = (knowledge.learning || []) as { title: string; context: string }[];
    const workingStyle = (knowledge.working_style || []) as string[];

    return (
      <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium tracking-tight">Admin - Knowledge</h1>
              <p className="mt-1 text-sm text-muted-foreground">Click any editable text to modify it.</p>
            </div>
            <Link href="/admin" className="link-underline text-sm font-medium text-primary">&larr; Back to Admin</Link>
          </div>

          {error && <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}
          {success && <div className="mb-6 rounded-md border border-primary/40 bg-primary/10 p-4 text-sm text-primary">{success}</div>}

          <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
            <div className="mx-auto max-w-2xl">
              <PageTitle>{knowledge.title || 'Knowledge'}</PageTitle>
              <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">{knowledge.description || 'Technical interests, current learning areas, and engineering approach.'}</p>
            </div>
          </Section>

          <Section className="py-16 sm:py-24">
            <div className="mx-auto max-w-2xl">
              <SectionHeader number="01" title={knowledge.interests_title || 'Interests'} description={knowledge.interests_description || 'Areas I return to repeatedly.'} />
            </div>
            <div className="mx-auto mt-12 max-w-2xl">
              <div className="grid gap-3">
                {interests.map((item, index) => (
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
              <SectionHeader number="02" title={knowledge.learning_title || 'Learning'} description={knowledge.learning_description || 'What I am studying right now.'} />
            </div>
            <div className="mx-auto mt-12 max-w-2xl">
              <div className="grid gap-3">
                {learning.map((item, index) => (
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
              <SectionHeader number="03" title={knowledge.stack_title || 'Stack'} description={knowledge.stack_description || 'Tools and languages I use regularly.'} />
            </div>
            <div className="mx-auto mt-12 max-w-2xl space-y-6">
              {Object.entries(knowledge.stack || {}).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-xs font-medium text-muted-foreground/50 uppercase tracking-wider mb-3">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {(items as string[]).map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section className="py-16 sm:py-24">
            <div className="mx-auto max-w-2xl">
              <SectionHeader number="04" title={knowledge.working_style_title || 'Working Style'} description={knowledge.working_style_description || 'Principles that shape how I build.'} />
            </div>
            <div className="mx-auto mt-12 max-w-2xl">
              <div className="grid gap-3">
                {workingStyle.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" aria-hidden="true" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </div>
    );
  }

  if (page === 'docs' && docs) {
    return (
      <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium tracking-tight">Admin - Docs</h1>
              <p className="mt-1 text-sm text-muted-foreground">Click any editable text to modify it.</p>
            </div>
            <Link href="/admin" className="link-underline text-sm font-medium text-primary">&larr; Back to Admin</Link>
          </div>

          {error && <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}
          {success && <div className="mb-6 rounded-md border border-primary/40 bg-primary/10 p-4 text-sm text-primary">{success}</div>}

          <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
            <div className="mx-auto max-w-2xl">
              <PageTitle>{docs.title || 'Documentation'}</PageTitle>
              <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">{docs.description || 'Architecture and design documentation.'}</p>
            </div>
          </Section>

          <Section className="py-16 sm:py-24">
            <div className="mx-auto max-w-2xl">
              <SectionHeader number="01" title={docs.architecture_title || 'Architecture'} description={docs.architecture_description || 'System design, data flow, and component interactions.'} />
              <div className="mt-6">
                <Link href="/docs/architecture" className="link-underline text-sm font-medium text-primary">{docs.view_architecture || 'View architecture documentation'}</Link>
              </div>
            </div>
          </Section>
        </div>
      </div>
    );
  }

  if (page === 'docs-architecture' && docsArch) {
    return (
      <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium tracking-tight">Admin - Docs Architecture</h1>
              <p className="mt-1 text-sm text-muted-foreground">Click any editable text to modify it.</p>
            </div>
            <Link href="/admin" className="link-underline text-sm font-medium text-primary">&larr; Back to Admin</Link>
          </div>

          {error && <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}
          {success && <div className="mb-6 rounded-md border border-primary/40 bg-primary/10 p-4 text-sm text-primary">{success}</div>}

          <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
            <div className="mx-auto max-w-2xl">
              <PageTitle>{docsArch.title || 'Architecture'}</PageTitle>
              <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">{docsArch.description || 'System design, data flow, and component interactions.'}</p>
            </div>
          </Section>

          <Section className="py-16 sm:py-24">
            <div className="mx-auto max-w-2xl">
              <SectionHeader number="01" title={docsArch.overview_title || 'Overview'} />
              <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
                {(docsArch.overview_paragraphs || []).map((paragraph: string, index: number) => (
                  <Editable key={index} value={paragraph} onSave={(val) => {
                    const newParagraphs = [...(docsArch.overview_paragraphs || [])];
                    newParagraphs[index] = val;
                    saveDocsArch({ overview_paragraphs: newParagraphs });
                  }} className="text-base leading-7 text-muted-foreground" as="p" saving={saving} />
                ))}
              </div>
              <div className="mt-8">
                <Link href="/docs" className="link-underline text-sm font-medium text-primary">{docsArch.back_to_docs || 'Back to documentation'}</Link>
              </div>
            </div>
          </Section>
        </div>
      </div>
    );
  }

  if (page === '404' && notFound) {
    return (
      <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium tracking-tight">Admin - 404</h1>
              <p className="mt-1 text-sm text-muted-foreground">Click any editable text to modify it.</p>
            </div>
            <Link href="/admin" className="link-underline text-sm font-medium text-primary">&larr; Back to Admin</Link>
          </div>

          {error && <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}
          {success && <div className="mb-6 rounded-md border border-primary/40 bg-primary/10 p-4 text-sm text-primary">{success}</div>}

          <Section className="pt-16 sm:pt-24 lg:pt-[160px] pb-16 sm:pb-24">
            <div className="mx-auto max-w-2xl">
              <PageTitle>{notFound.title || 'Not Found'}</PageTitle>
              <p className="mt-4 text-lg leading-7 text-foreground/80 text-balance">{notFound.body || 'The page you are looking for does not exist.'}</p>
              <div className="mt-8">
                <Link href="/" className="link-underline text-sm font-medium text-primary">{notFound.return_home || 'Return home'}</Link>
              </div>
            </div>
          </Section>
        </div>
      </div>
    );
  }

  if (page === 'header' && site) {
    return (
      <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium tracking-tight">Admin - Header</h1>
              <p className="mt-1 text-sm text-muted-foreground">Edit nav labels and brand name.</p>
            </div>
            <Link href="/admin" className="link-underline text-sm font-medium text-primary">&larr; Back to Admin</Link>
          </div>

          {error && <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}
          {success && <div className="mb-6 rounded-md border border-primary/40 bg-primary/10 p-4 text-sm text-primary">{success}</div>}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Brand Name</label>
              <input type="text" value={site.brand_name || ''} onChange={(e) => saveSite({ brand_name: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Nav Projects</label>
              <input type="text" value={site.nav_projects || ''} onChange={(e) => saveSite({ nav_projects: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Nav Journal</label>
              <input type="text" value={site.nav_journal || ''} onChange={(e) => saveSite({ nav_journal: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Nav Knowledge</label>
              <input type="text" value={site.nav_knowledge || ''} onChange={(e) => saveSite({ nav_knowledge: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Nav Now</label>
              <input type="text" value={site.nav_now || ''} onChange={(e) => saveSite({ nav_now: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Nav About</label>
              <input type="text" value={site.nav_about || ''} onChange={(e) => saveSite({ nav_about: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'footer' && site) {
    return (
      <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium tracking-tight">Admin - Footer</h1>
              <p className="mt-1 text-sm text-muted-foreground">Edit footer links and brand.</p>
            </div>
            <Link href="/admin" className="link-underline text-sm font-medium text-primary">&larr; Back to Admin</Link>
          </div>

          {error && <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}
          {success && <div className="mb-6 rounded-md border border-primary/40 bg-primary/10 p-4 text-sm text-primary">{success}</div>}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Footer Brand</label>
              <input type="text" value={site.footer_brand || ''} onChange={(e) => saveSite({ footer_brand: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Footer Projects</label>
              <input type="text" value={site.footer_projects || ''} onChange={(e) => saveSite({ footer_projects: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Footer Journal</label>
              <input type="text" value={site.footer_journal || ''} onChange={(e) => saveSite({ footer_journal: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Footer Knowledge</label>
              <input type="text" value={site.footer_knowledge || ''} onChange={(e) => saveSite({ footer_knowledge: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
            <div>
              <label className="block text-sm font-medium">Footer About</label>
              <input type="text" value={site.footer_about || ''} onChange={(e) => saveSite({ footer_about: e.target.value })} className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm" disabled={saving} />
            </div>
          </div>
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

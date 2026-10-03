'use client';

import Link from 'next/link';

const pages = [
  { href: '/admin/preview/home', label: 'Home', description: 'Tagline, subtagline, trade line, hero content' },
  { href: '/admin/preview/now', label: 'Now', description: 'Current focus, learning, reading sections' },
  { href: '/admin/preview/projects', label: 'Projects', description: 'Project cards and metadata' },
  { href: '/admin/preview/journal', label: 'Journal', description: 'Journal entries and summaries' },
  { href: '/admin/preview/settings', label: 'Settings', description: 'Site title, taglines, metadata' },
  { href: '/admin/preview/about', label: 'About', description: 'About page content' },
  { href: '/admin/preview/knowledge', label: 'Knowledge', description: 'Knowledge page content' },
  { href: '/admin/preview/docs', label: 'Docs', description: 'Documentation page content' },
  { href: '/admin/preview/docs-architecture', label: 'Docs Architecture', description: 'Architecture documentation content' },
  { href: '/admin/preview/404', label: '404', description: 'Not found page content' },
  { href: '/admin/preview/header', label: 'Header', description: 'Navigation labels and brand' },
  { href: '/admin/preview/footer', label: 'Footer', description: 'Footer links and brand' },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium tracking-tight">Admin</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Click-to-edit preview. Select a page to start editing.
            </p>
          </div>
          <a
            href="/admin/cms"
            className="link-underline text-sm font-medium text-primary"
          >
            Decap CMS
          </a>
        </div>

        <div className="space-y-3">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group block rounded-md border border-border/60 bg-card/50 p-5 transition-colors hover:border-primary/40 hover:bg-card/80"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-medium text-foreground/90">{page.label}</h2>
                  <p className="mt-1 text-sm text-muted-foreground/75">{page.description}</p>
                </div>
                <span className="text-sm text-primary/80 group-hover:text-primary">Open &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

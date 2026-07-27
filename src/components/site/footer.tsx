import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <nav className="flex gap-6 text-sm text-muted-foreground" aria-label="Footer">
          <Link href="/" className="transition-colors hover:text-foreground">
            d3f4lt0
          </Link>
          <Link href="/projects" className="transition-colors hover:text-foreground">
            Projects
          </Link>
          <Link href="/journal" className="transition-colors hover:text-foreground">
            Journal
          </Link>
          <Link href="/knowledge" className="transition-colors hover:text-foreground">
            Knowledge
          </Link>
          <Link href="/about" className="transition-colors hover:text-foreground">
            About
          </Link>
        </nav>
        <p className="text-xs text-muted-foreground/40">
          d3f4lt0.dev
        </p>
      </div>
    </footer>
  );
}

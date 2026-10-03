import Link from 'next/link';

interface FooterProps {
  brandName?: string;
  footerBrand?: string;
  footerProjects?: string;
  footerJournal?: string;
  footerKnowledge?: string;
  footerAbout?: string;
}

export function Footer({ brandName, footerBrand, footerProjects, footerJournal, footerKnowledge, footerAbout }: FooterProps) {
  const links = [
    { href: '/', label: footerBrand || brandName || 'd3f4lt0' },
    { href: '/projects', label: footerProjects || 'Projects' },
    { href: '/journal', label: footerJournal || 'Journal' },
    { href: '/knowledge', label: footerKnowledge || 'Knowledge' },
    { href: '/about', label: footerAbout || 'About' },
  ];

  return (
    <footer className="relative border-t border-border/40">
      <div className="nerv-corner nerv-corner--bl" aria-hidden="true" />
      <div className="nerv-corner nerv-corner--br" aria-hidden="true" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <nav className="flex gap-6 text-sm text-muted-foreground" aria-label="Footer">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-muted-foreground/40 font-mono tracking-wider">
          {footerBrand || 'd3f4lt0.dev'}
        </p>
      </div>
    </footer>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Github, Moon, Sun, Menu } from 'lucide-react';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Projects', href: '/projects' },
  { name: 'Journal', href: '/journal' },
  { name: 'Now', href: '/now' },
  { name: 'Knowledge', href: '/knowledge' },
  { name: 'About', href: '/about' },
];

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  const handleOpenSearch = useCallback(() => {
    setSearchOpen(true);
  }, []);

  const handleCloseSearch = useCallback(() => {
    setSearchOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      const firstLink = mobileMenuRef.current.querySelector('a');
      if (firstLink) {
        (firstLink as HTMLElement).focus();
      }
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen && menuToggleRef.current) {
      menuToggleRef.current.focus();
    }
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-lg font-medium text-foreground">
              d3f4lt0
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-foreground relative py-1',
                  pathname?.startsWith(item.href) ? 'text-foreground' : 'text-muted-foreground'
                )}
                aria-current={pathname?.startsWith(item.href) ? 'page' : undefined}
              >
                {item.name}
                <span
                  className={cn(
                    'absolute bottom-0 left-0 h-px bg-foreground transition-all duration-150 ease-out',
                    pathname?.startsWith(item.href) ? 'w-full' : 'w-0 hover:w-full'
                  )}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <a
            href="https://github.com/d3f4lt0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleOpenSearch}
            aria-label="Open search"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <Button
            ref={menuToggleRef}
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="border-t border-border bg-background sm:hidden mobile-menu-enter"
        >
          <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-foreground',
                  pathname?.startsWith(item.href) ? 'text-foreground' : 'text-muted-foreground'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

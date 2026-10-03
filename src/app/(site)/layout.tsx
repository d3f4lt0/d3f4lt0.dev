import { SkipToContent } from '@/components/site/skip-to-content';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { getSiteSettings } from '@/lib/content';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = getSiteSettings();

  return (
    <div className="relative flex min-h-screen flex-col">
      <SkipToContent />
      <Header
        brandName={settings.brand_name}
        navProjects={settings.nav_projects}
        navJournal={settings.nav_journal}
        navKnowledge={settings.nav_knowledge}
        navNow={settings.nav_now}
        navAbout={settings.nav_about}
      />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer
        brandName={settings.brand_name}
        footerBrand={settings.footer_brand}
        footerProjects={settings.footer_projects}
        footerJournal={settings.footer_journal}
        footerKnowledge={settings.footer_knowledge}
        footerAbout={settings.footer_about}
      />
    </div>
  );
}

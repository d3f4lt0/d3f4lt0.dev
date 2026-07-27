import { SkipToContent } from '@/components/site/skip-to-content';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SkipToContent />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

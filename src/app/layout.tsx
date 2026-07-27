import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: {
    default: 'd3f4lt0',
    template: '%s · d3f4lt0',
  },
  description: 'Portfolio of d3f4lt0',
  authors: [{ name: 'd3f4lt0' }],
  creator: 'd3f4lt0',
  keywords: ['engineering', 'portfolio', 'projects', 'd3f4lt0'],
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', url: '/android-chrome-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '512x512', url: '/android-chrome-512x512.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="grain-overlay" aria-hidden="true" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

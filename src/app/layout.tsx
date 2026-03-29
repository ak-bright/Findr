import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import MainLayoutWrapper from '@/components/MainLayoutWrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'Findr — Find Your Next Opportunity',
  description:
    'Connect with internships, NSS placements, and entry-level jobs. AI-powered CV review and smart job matching for students and recent graduates.',
  icons: {
    icon: [
      { url: '/images/logo.png', sizes: '16x16' },
      { url: '/images/logo.png', sizes: '32x32' },
      { url: '/images/logo.png', sizes: '192x192' },
      { url: '/images/logo.png', sizes: '512x512' },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${manrope.variable} layout-wrapper`}
        style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        <MainLayoutWrapper>{children}</MainLayoutWrapper>
      </body>
    </html>
  );
}

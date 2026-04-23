import type { Metadata } from 'next';
import { Instrument_Serif, Inter_Tight, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'The Learning Artistry — Training, mastered.',
    template: '%s · The Learning Artistry',
  },
  description:
    'Professional training and certification programs for individuals and teams across cloud, development, project management, quality, data, and leadership disciplines.',
  keywords: [
    'professional training', 'certification courses', 'AWS', 'PMP', 'Kubernetes',
    'cloud training', 'enterprise training', 'Six Sigma', 'corporate L&D',
  ],
  authors: [{ name: 'The Learning Artistry' }],
  creator: 'The Learning Artistry',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thelearningartistry.com'),
  openGraph: {
    title: 'The Learning Artistry',
    description:
      'Professional training and certification programs for individuals and teams.',
    type: 'website',
    siteName: 'The Learning Artistry',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Learning Artistry',
    description:
      'Professional training and certification programs for individuals and teams.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${interTight.variable} ${geistMono.variable}`}
    >
      <body className="min-h-dvh flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

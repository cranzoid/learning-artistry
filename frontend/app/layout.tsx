import type { Metadata } from 'next';
import { Fraunces, Inter, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
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
      className={`${fraunces.variable} ${inter.variable} ${geistMono.variable}`}
    >
      <body className="min-h-dvh flex flex-col bg-[var(--color-bg)] text-[var(--color-ink)] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

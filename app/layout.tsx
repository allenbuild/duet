import type { Metadata } from 'next';
import { Newsreader } from 'next/font/google';
import './globals.css';

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.duetlabs.co'),
  title: 'Duet Labs',
  description:
    'Duet builds a data layer for human collaboration, creating workflow intelligence for operators and training data for robots.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Duet Labs',
    description:
      'A data layer for human collaboration: workflow intelligence for operators and training data for robots.',
    type: 'website',
    images: [
      {
        url: '/og-warm.png',
        width: 1734,
        height: 907,
        alt: 'Duet Labs.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Duet Labs',
    description:
      'A data layer for human collaboration: workflow intelligence for operators and training data for robots.',
    images: ['/og-warm.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={newsreader.variable}>
        {children}
      </body>
    </html>
  );
}

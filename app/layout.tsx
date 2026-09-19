import type { Metadata } from 'next';
import { Newsreader } from 'next/font/google';
import { DotCursor } from './dot-cursor';
import './globals.css';

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.duetlabs.co'),
  title: 'Duet — Data for robots that work alongside humans',
  description:
    'Duet builds a data layer for human collaboration, creating workflow intelligence for operators and training data for robots.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Duet — Data for robots that work alongside humans',
    description:
      'A data layer for human collaboration: workflow intelligence for operators and training data for robots.',
    type: 'website',
    images: [
      {
        url: '/og-warm.png',
        width: 1734,
        height: 907,
        alt: 'Duet — Data for robots that work alongside humans.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Duet — Data for robots that work alongside humans',
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
        <DotCursor />
      </body>
    </html>
  );
}

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
  metadataBase: new URL('https://duet-labs.allenxtech.chatgpt.site'),
  title: 'Duet — Data for robots that work alongside humans',
  description:
    'Duet builds a data layer for human collaboration, creating workflow intelligence for operators and training data for robots.',
  openGraph: {
    title: 'Duet — Data for robots that work alongside humans',
    description:
      'A data layer for human collaboration: workflow intelligence for operators and training data for robots.',
    type: 'website',
    images: [
      {
        url: '/og.png',
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
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={newsreader.variable}>{children}</body>
    </html>
  );
}

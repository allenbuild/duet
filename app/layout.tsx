import type { Metadata } from 'next';
import { EB_Garamond } from 'next/font/google';
import './globals.css';

const garamond = EB_Garamond({ subsets: ['latin'], weight: ['400', '500'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.duetlabs.co'),
  title: 'Duet Labs',
  description:
    'Duet process-mines human collaboration for the age of human-robot teams. Our thesis is that the next scaling law in robotics is human-human interaction data.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Duet Labs',
    description:
      'Duet process-mines human collaboration for the age of human-robot teams.',
    type: 'website',
    images: [{ url: '/og-warm.png', width: 1734, height: 907, alt: 'Duet Labs.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Duet Labs',
    description:
      'Duet process-mines human collaboration for the age of human-robot teams.',
    images: ['/og-warm.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={garamond.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}

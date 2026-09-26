import type { Metadata } from 'next';
import './globals.css';

// Explicitly leave the tab icon blank instead of reusing the old custom icon.
const blankFavicon =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22/%3E';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.duetlabs.co'),
  title: 'Duet Labs',
  description:
    'Duet builds a data layer for human collaboration, creating workflow intelligence for operators and training data for robots.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [{ url: blankFavicon, type: 'image/svg+xml', sizes: '16x16' }],
    shortcut: blankFavicon,
  },
  openGraph: {
    title: 'Duet Labs',
    description:
      'A data layer for human collaboration: workflow intelligence for operators and training data for robots.',
    type: 'website',
    images: [
      {
        url: '/og-factory.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Factory line drawing on Duet Labs’ graph-paper background.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Duet Labs',
    description:
      'A data layer for human collaboration: workflow intelligence for operators and training data for robots.',
    images: [
      {
        url: '/og-factory.png',
        alt: 'Factory line drawing on Duet Labs’ graph-paper background.',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

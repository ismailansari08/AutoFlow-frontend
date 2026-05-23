import type { Metadata, Viewport } from 'next';
import './globals.css';
import { inter } from './fonts';

export const metadata: Metadata = {
  title: {
    default: 'AutoFlow',
    template: '%s · AutoFlow',
  },
  description: 'Instagram Automation SaaS — comment-to-DM, AI inbox, workflows',
  metadataBase: process.env.NEXT_PUBLIC_APP_URL
    ? new URL(process.env.NEXT_PUBLIC_APP_URL)
    : undefined,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#050508',
};

import { Providers } from './providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}


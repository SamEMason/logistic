import type { Metadata } from 'next';
import { JetBrains_Mono, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const uiFont = JetBrains_Mono({
  variable: '--font-ui',
  subsets: ['latin'],
  weight: ['500', '700', '800'],
});

const telemetryFont = IBM_Plex_Mono({
  variable: '--font-telemetry',
  subsets: ['latin'],
  weight: ['400', '700'],
});
export const metadata: Metadata = {
  title: 'Logistics App',
  description: 'Delivery logistics',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${uiFont.variable} ${telemetryFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

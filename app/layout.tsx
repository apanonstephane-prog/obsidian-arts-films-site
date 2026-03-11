import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SOTAI — Aides & Subventions Françaises',
  description:
    'Agent IA expert en financement public français pour entrepreneurs et startups numériques — 2024-2026',
  keywords: ['aides', 'subventions', 'ACRE', 'Bpifrance', 'French Tech', 'Occitanie', 'entrepreneur'],
  authors: [{ name: 'SOTAI' }],
  openGraph: {
    title: 'SOTAI — Aides & Subventions Françaises',
    description: 'Agent IA expert en financement public français',
    locale: 'fr_FR',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0055A4',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}

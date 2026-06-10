import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NČS - CS Data',
  description: 'Porovnáváme Česko a Slovensko - články, mapy a data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

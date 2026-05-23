import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about AutoFlow — Instagram automation built for Indian creators and small businesses.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

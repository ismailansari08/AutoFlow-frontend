import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s · AutoFlow',
    default: 'AutoFlow',
  },
  description: 'Instagram automation for Indian creators - comment-to-DM, AI inbox, workflows.',
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import dynamic from 'next/dynamic';
import Navbar from '@/components/marketing/Navbar';
import HeroSection from '@/components/marketing/HeroSection';
import Footer from '@/components/marketing/Footer';
import { SectionSkeleton } from '@/components/marketing/SectionSkeleton';

const TrustedBySection = dynamic(() => import('@/components/marketing/TrustedBySection'), {
  loading: () => <SectionSkeleton className="min-h-[120px]" />,
});
const LiveDemoSection = dynamic(() => import('@/components/marketing/LiveDemoSection'), {
  loading: () => <SectionSkeleton />,
});
const HowItWorks = dynamic(() => import('@/components/marketing/HowItWorks'), {
  loading: () => <SectionSkeleton />,
});
const FeaturesSection = dynamic(() => import('@/components/marketing/FeaturesSection'), {
  loading: () => <SectionSkeleton />,
});
const WorkflowPreviewSection = dynamic(
  () => import('@/components/marketing/WorkflowPreviewSection'),
  { loading: () => <SectionSkeleton /> },
);
const AIAutomationSection = dynamic(() => import('@/components/marketing/AIAutomationSection'), {
  loading: () => <SectionSkeleton />,
});
const InboxPreviewSection = dynamic(() => import('@/components/marketing/InboxPreviewSection'), {
  loading: () => <SectionSkeleton />,
});
const AnalyticsPreviewSection = dynamic(
  () => import('@/components/marketing/AnalyticsPreviewSection'),
  { loading: () => <SectionSkeleton /> },
);
const TestimonialsSection = dynamic(() => import('@/components/marketing/TestimonialsSection'), {
  loading: () => <SectionSkeleton />,
});
const PricingSection = dynamic(() => import('@/components/marketing/PricingSection'), {
  loading: () => <SectionSkeleton />,
});
const ComplianceAndFaq = dynamic(() => import('@/components/marketing/ComplianceAndFaq'), {
  loading: () => <SectionSkeleton />,
});
const FinalCTASection = dynamic(() => import('@/components/marketing/FinalCTASection'), {
  loading: () => <SectionSkeleton className="min-h-[280px]" />,
});

export const metadata = {
  title: 'AutoFlow — Turn Instagram Comments Into AI-Powered Revenue',
  description:
    'AutoFlow: comment-to-DM automation, AI inbox, workflows, and analytics for Indian creators. Free plan. Meta-approved.',
  openGraph: {
    title: 'AutoFlow — Instagram AI Automation',
    description: 'Comment-to-DM, AI inbox, workflows, and analytics for creators.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] overflow-x-hidden text-white" style={{ background: 'var(--bg-main)' }}>
      <Navbar />
      <HeroSection />
      <TrustedBySection />
      <LiveDemoSection />
      <HowItWorks />
      <FeaturesSection />
      <WorkflowPreviewSection />
      <AIAutomationSection />
      <InboxPreviewSection />
      <AnalyticsPreviewSection />
      <TestimonialsSection />
      <PricingSection />
      <ComplianceAndFaq />
      <FinalCTASection />
      <Footer />
    </div>
  );
}

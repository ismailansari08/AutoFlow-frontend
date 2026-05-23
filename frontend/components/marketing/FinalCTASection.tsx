'use client';

import { MarketingSection } from './MarketingSection';
import { ScrollReveal } from './ScrollReveal';
import { MagneticButton } from './MagneticButton';
import { AnimatedGrid } from './AnimatedGrid';

export default function FinalCTASection() {
  return (
    <MarketingSection variant="cinematic" noPadding className="py-28 md:py-36 relative">
      <AnimatedGrid />
      <div className="max-w-[1100px] mx-auto px-6 relative z-10 text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.08] mb-5">
            Build a faster response system for every high-intent comment
            <span className="block bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              without adding manual work
            </span>
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto mb-10 leading-relaxed">
            Start with the free plan, launch in minutes, and move from comment volume to qualified conversations with a cleaner workflow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton href="/signup">Start free -&gt;</MagneticButton>
            <MagneticButton href="/login" variant="secondary">
              Sign in
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </MarketingSection>
  );
}

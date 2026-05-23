'use client';

import { Sparkles, Brain, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { MarketingSection, SectionHeader } from './MarketingSection';
import { ScrollReveal } from './ScrollReveal';
import { MagneticButton } from './MagneticButton';

const capabilities = [
  {
    icon: Brain,
    title: 'Intent-aware routing',
    desc: 'Separate sales questions, support requests, and low-value noise before a human has to step in.',
  },
  {
    icon: Wand2,
    title: 'Brand-safe response rules',
    desc: 'Define tone, escalation paths, and approved messaging for every workspace and campaign.',
  },
  {
    icon: Sparkles,
    title: 'Fast answer coverage',
    desc: 'Handle repeat questions instantly, reduce manual load, and keep replies aligned with your offers.',
  },
];

export default function AIAutomationSection() {
  return (
    <MarketingSection variant="cinematic" className="py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-violet-500/30"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-cyan-500/20"
        />
      </div>

      <ScrollReveal>
        <SectionHeader
          label="AI operations layer"
          title="Automation logic that works like a real teammate"
          subtitle="Guide replies, reduce repetitive handling, and keep your inbox moving with more consistency."
        />
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {capabilities.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.08}>
            <motion.div
              className="marketing-dark-card p-6 h-full hover:border-violet-500/40 transition-colors"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3.8 + i * 0.25, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="mb-4 inline-flex rounded-2xl border border-violet-500/20 bg-violet-500/10 p-3 text-violet-300 animate-icon-glow">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-white mb-2 tracking-tight">{item.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.2} className="text-center">
        <MagneticButton href="/signup">Launch AI workflows -&gt;</MagneticButton>
      </ScrollReveal>
    </MarketingSection>
  );
}

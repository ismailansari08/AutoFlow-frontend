'use client';

import { motion } from 'framer-motion';
import {
  Bot,
  ChartColumn,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { MarketingSection, SectionHeader } from './MarketingSection';

const features = [
  {
    icon: MessageSquareText,
    title: 'Comment-triggered outreach',
    desc: 'Turn high-intent comments into direct conversations the moment they happen.',
  },
  {
    icon: Bot,
    title: 'AI response orchestration',
    desc: 'Route inquiries by intent and send replies that stay consistent with your brand.',
  },
  {
    icon: Sparkles,
    title: 'Unified team inbox',
    desc: 'Review every DM, hand off conversations, and keep follow-ups moving in one place.',
  },
  {
    icon: ChartColumn,
    title: 'Conversion visibility',
    desc: 'Track delivery, response, and funnel performance without exporting spreadsheets.',
  },
  {
    icon: ShieldCheck,
    title: 'Official platform compliance',
    desc: 'Built on the Instagram Graph API with security and policy requirements in mind.',
  },
  {
    icon: Workflow,
    title: 'Visual workflow control',
    desc: 'Design triggers, conditions, and actions with logic your team can audit at a glance.',
  },
];

export default function FeaturesSection() {
  return (
    <MarketingSection id="features" variant="light" className="bg-slate-50">
      <SectionHeader
        light
        label="Platform capabilities"
        title="Professional tools for capture, response, and conversion"
        subtitle="Everything your team needs to run Instagram engagement with more speed and less manual work."
      />

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
          },
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            whileHover={{ y: -4 }}
            className="group marketing-light-card p-8 transition-all duration-200 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60 cursor-default"
          >
            <motion.div
              className="mb-5 inline-flex rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-cyan-50 p-3.5 text-violet-600 animate-icon-float animate-icon-glow"
              animate={{
                rotate: [0, 2, 0, -2, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 4 + index * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <feature.icon className="h-5 w-5" />
            </motion.div>
            <h3 className="text-slate-900 font-semibold text-lg mb-2.5 tracking-tight">{feature.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-800">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </MarketingSection>
  );
}

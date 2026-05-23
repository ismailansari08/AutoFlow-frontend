'use client';

import { motion } from 'framer-motion';
import { MarketingSection, SectionHeader } from './MarketingSection';
import { ScrollReveal } from './ScrollReveal';

const nodes = [
  { id: 't', label: 'Comment trigger', detail: 'Keyword: PRICE', type: 'trigger' },
  { id: 'c', label: 'Intent check', detail: 'Sales interest detected', type: 'condition' },
  { id: 'a', label: 'Follow-up action', detail: 'Send DM and assign tag', type: 'action' },
];

export default function WorkflowPreviewSection() {
  return (
    <MarketingSection variant="dark" className="bg-[#0B1020]">
      <ScrollReveal>
        <SectionHeader
          label="Workflow builder"
          title="Design automations your team can understand instantly"
          subtitle="Map triggers, AI decisions, and follow-up actions on a visual canvas that stays easy to audit."
        />
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <div className="relative h-[320px] md:h-[380px] rounded-2xl border border-white/10 bg-[#050816] overflow-hidden">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(139,92,246,0.15) 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.path
              d="M 120 190 Q 280 120 400 190 T 680 190"
              fill="none"
              stroke="url(#grad)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0.3 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              viewport={{ once: true }}
            />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>

          <motion.div
            className="absolute w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]"
            animate={{ left: ['10%', '70%'], top: ['52%', '48%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          <div className="absolute inset-0 flex items-center justify-around px-4 md:px-12">
            {nodes.map((node, i) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.15 }}
                viewport={{ once: true }}
                className="relative z-10 w-[28%] max-w-[180px]"
              >
                <div
                  className={`rounded-2xl p-4 border text-center ${
                    node.type === 'trigger'
                      ? 'border-blue-500/40 bg-blue-500/10 shadow-[0_0_24px_rgba(59,130,246,0.2)]'
                      : node.type === 'condition'
                        ? 'border-amber-500/40 bg-amber-500/10'
                        : 'border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_24px_rgba(16,185,129,0.15)]'
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                    {node.type}
                  </p>
                  <p className="text-sm font-semibold text-white tracking-tight">{node.label}</p>
                  <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">{node.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </MarketingSection>
  );
}

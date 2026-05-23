'use client';

import { useState } from 'react';
import { ShieldCheck, Check, ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const complianceItems = [
  {
    title: 'Official Meta integration',
    desc: 'AutoFlow uses the Instagram Graph API and follows official platform workflows.',
  },
  {
    title: 'Secure OAuth connection',
    desc: 'Teams connect through Meta sign-in without sharing account passwords internally.',
  },
  {
    title: 'Business and creator support',
    desc: 'Built for Instagram business and creator accounts used in real campaigns.',
  },
  {
    title: 'Privacy-minded data handling',
    desc: 'Lead and conversation data can be handled with controlled access and secure storage practices.',
  },
  {
    title: 'Rate-limit awareness',
    desc: 'Automation is designed around official messaging constraints to reduce operational risk.',
  },
  {
    title: 'Flexible subscription control',
    desc: 'Start small, scale when needed, and change plans without long lock-in periods.',
  },
];

const faqs = [
  {
    id: 1,
    question: 'What does AutoFlow automate?',
    answer: 'AutoFlow listens for comment triggers, sends direct messages, supports AI-assisted replies, and helps teams manage follow-up from a shared inbox.',
  },
  {
    id: 2,
    question: 'Is this built on official Instagram infrastructure?',
    answer: 'Yes. The product is designed around official Instagram and Meta workflows rather than browser hacks or unofficial scraping tools.',
  },
  {
    id: 3,
    question: 'Which account types can use it?',
    answer: 'Instagram creator and business accounts are the standard fit because they support the official APIs required for automation.',
  },
  {
    id: 4,
    question: 'Can teams collect leads before sending links?',
    answer: 'Yes. Higher-tier workflows can guide users through lead capture steps before handing off the requested resource or offer.',
  },
  {
    id: 5,
    question: 'How is pricing structured?',
    answer: 'The platform starts with a free entry tier, then scales through paid plans designed for higher volume, more accounts, and deeper workflow control.',
  },
];

export default function ComplianceAndFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="bg-black text-white font-sans py-24 px-6 border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1100px] mx-auto space-y-28">
        <div className="space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.5, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="section-label select-none flex items-center justify-center gap-1.5"
            >
              <ShieldCheck size={13} className="text-white" /> Trust and compliance
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-white text-3xl sm:text-[36px] font-bold leading-[1.15] tracking-tight font-sans"
            >
              Built for reliable operations, not risky shortcuts
            </motion.h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal font-sans">
              Security, official platform usage, and clear operational controls should be standard, not an afterthought.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceItems.map((item, idx) => (
              <div
                key={idx}
                className="marketing-dark-card p-7 flex flex-col justify-start select-none group hover:border-white/15 transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[rgba(255,255,255,0.06)] flex items-center justify-center mb-4 text-white group-hover:scale-[1.03] transition-transform">
                  <Check size={14} />
                </div>
                <h3 className="text-white text-sm font-semibold mb-2 leading-none font-sans tracking-tight">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-[13px] leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.5, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="section-label select-none flex items-center justify-center gap-1.5"
            >
              <HelpCircle size={13} className="text-white" /> Common questions
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-white text-3xl sm:text-[32px] font-bold leading-[1.25] tracking-tight mt-3 font-sans"
            >
              Questions teams usually ask before launch
            </motion.h2>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              A quick view of platform fit, compliance posture, and operational expectations.
            </p>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-[rgba(255,255,255,0.08)] marketing-dark-card overflow-hidden shadow-sm">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id} className="transition-colors duration-150">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left py-5 px-6 flex justify-between items-center gap-4 hover:bg-[#141414]/30 focus:outline-none"
                  >
                    <span className="text-white text-sm sm:text-[15px] font-semibold leading-relaxed font-sans">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-slate-300 text-[13px] sm:text-sm leading-relaxed font-normal font-sans select-text border-t border-[rgba(255,255,255,0.04)] pt-3.5 bg-black/30">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

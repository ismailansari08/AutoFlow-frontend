'use client';

import { MarketingSection, SectionHeader } from './MarketingSection';
import { ScrollReveal } from './ScrollReveal';
import { Instagram, Sparkles } from 'lucide-react';

const messages = [
  { dir: 'in', text: 'Can you send pricing details?' },
  { dir: 'out', text: 'Absolutely. I have shared the Growth plan details and next steps in this thread.', ai: true },
  { dir: 'in', text: 'Perfect, received.' },
];

export default function InboxPreviewSection() {
  return (
    <MarketingSection variant="light">
      <ScrollReveal>
        <SectionHeader
          light
          label="Unified inbox"
          title="One place for fast replies, ownership, and follow-up"
          subtitle="Keep Instagram conversations organized with AI guidance, team visibility, and cleaner response workflows."
        />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="grid md:grid-cols-5 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-xl shadow-slate-200/50">
          <div className="md:col-span-2 space-y-2">
            {['Aarav Mehta', 'Priya Sharma', 'Karan Malhotra'].map((name, i) => (
              <div
                key={name}
                className={`p-3 rounded-xl text-sm ${
                  i === 0
                    ? 'bg-white border border-violet-200 shadow-sm'
                    : 'text-slate-600'
                }`}
              >
                <span className="font-medium text-slate-900">{name}</span>
                {i === 0 && (
                  <span className="ml-2 text-[10px] text-violet-600 font-semibold">
                    Active
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 p-4 min-h-[240px] flex flex-col">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Aarav Mehta</p>
                <p className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Instagram size={10} /> Instagram DM
                </p>
              </div>
              <span className="ml-auto text-[10px] flex items-center gap-1 text-violet-600 font-medium">
                <Sparkles size={10} /> AI active
              </span>
            </div>
            <div className="flex-1 space-y-2">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`flex ${message.dir === 'in' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                      message.dir === 'in'
                        ? 'bg-slate-100 text-slate-800'
                        : 'bg-slate-900 text-white'
                    }`}
                  >
                    {message.text}
                    {message.ai && (
                      <span className="block text-[9px] text-violet-300 mt-1">AI-assisted reply</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </MarketingSection>
  );
}

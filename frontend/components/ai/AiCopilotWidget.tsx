'use client';

import { useEffect, useRef, useState } from 'react';
import { Sparkles, Zap, ArrowRight, TrendingUp, BrainCircuit } from 'lucide-react';
import { useAiCopilotStore } from '@/lib/store/aiCopilot.store';
import { useAiCopilot } from '@/lib/hooks/useAiCopilot';
import { AiThinking, AiShimmerCard } from '@/components/ai/AiThinking';

const INSIGHT_CYCLE = [
  'Three high-intent leads replied in the last hour. A fast follow-up is likely to perform well.',
  'Your "price" keyword trigger is holding a strong DM open rate and is outperforming the workspace average.',
  'Leads tagged as hot are converting at a higher rate. Prioritizing them in the inbox should improve close speed.',
  'Workflow response time is stable and healthy. Your automations are currently running without visible delay.',
];

export function AiCopilotDashboardWidget() {
  const setOpen = useAiCopilotStore((s) => s.setOpen);
  const { sendMessage, generateRecommendations } = useAiCopilot();
  const [insightIdx, setInsightIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let mounted = true;

    generateRecommendations();

    const startCycle = async () => {
      if (!mounted) return;
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 850));
      if (!mounted) return;
      setLoading(false);

      intervalRef.current = setInterval(() => {
        setInsightIdx((prev) => (prev + 1) % INSIGHT_CYCLE.length);
      }, 6500);
    };

    startCycle();

    return () => {
      mounted = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [generateRecommendations]);

  const quickActions = [
    { label: 'Auto-DM price inquiries', prompt: 'Create a workflow to DM people who comment "price"' },
    { label: 'Build a follow-up sequence', prompt: 'Build a 24h follow-up workflow for leads who have not replied' },
    { label: 'Set AI inbox replies', prompt: 'Create a workflow that auto-replies to DMs using AI' },
  ];

  return (
    <AiShimmerCard
      active={loading}
      className="rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-950/40 to-fuchsia-950/20 p-4 space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center dashboard-icon-soft">
            <BrainCircuit size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">FLOWAI</p>
            <p className="text-[10px] text-violet-200/60">Workspace intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-300/80 font-medium">Ready</span>
        </div>
      </div>

      <div className="bg-black/20 rounded-xl px-3.5 py-3 border border-white/5 min-h-[72px] flex items-center">
        {loading ? (
          <AiThinking size="sm" label="Reviewing workspace activity" />
        ) : (
          <div key={insightIdx} className="animate-text-reveal">
            <p className="text-sm text-white/75 leading-relaxed">
              {INSIGHT_CYCLE[insightIdx]}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-1.5">
        {INSIGHT_CYCLE.map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === insightIdx
                ? 'w-5 bg-violet-300'
                : 'w-1.5 bg-white/15'
            }`}
          />
        ))}
      </div>

      <div className="space-y-1.5">
        <p className="text-[10px] font-medium text-white/25 uppercase tracking-widest">Quick actions</p>
        {quickActions.map((action, index) => (
          <button
            key={action.label}
            onClick={() => {
              setOpen(true);
              setTimeout(() => sendMessage(action.prompt), 150);
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/3 border border-white/6 hover:border-violet-500/25 hover:bg-violet-500/5 transition-all text-left group"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-lg bg-violet-500/10 border border-violet-500/10 flex items-center justify-center dashboard-icon-soft"
                style={{ animationDelay: `${index * 0.35}s` }}
              >
                <Zap size={11} className="text-violet-300 shrink-0" />
              </div>
              <span className="text-xs text-white/55 group-hover:text-white/80 transition-colors">{action.label}</span>
            </div>
            <ArrowRight size={11} className="text-white/20 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
          </button>
        ))}
      </div>

      <button
        onClick={() => setOpen(true)}
        id="dashboard-open-copilot-btn"
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
          bg-gradient-to-r from-violet-600/80 to-fuchsia-600/80
          hover:from-violet-600 hover:to-fuchsia-600
          border border-violet-500/20 transition-all
          text-sm font-semibold text-white group"
      >
        <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
        Open FLOWAI
        <TrendingUp size={12} className="opacity-60" />
      </button>
    </AiShimmerCard>
  );
}

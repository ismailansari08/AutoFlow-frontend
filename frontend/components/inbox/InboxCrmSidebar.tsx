'use client';

import type { FormEvent } from 'react';
import { Instagram, Sparkles, Sliders, TrendingUp, FileText, Star, Plus, X } from 'lucide-react';
import { GlassTextarea } from '@/components/ui/GlassField';
import type { InboxConversation } from '@/lib/inbox/mappers';

interface InboxCrmSidebarProps {
  selectedConv: InboxConversation;
  aiSummary: string | null;
  loadingSummary: boolean;
  newTagInput: string;
  onNewTagInputChange: (value: string) => void;
  onGenerateSummary: () => void;
  onNotesChange: (value: string) => void;
  onNotesBlur: () => void;
  onAddTag: (e: FormEvent) => void;
  onRemoveTag: (tag: string) => void;
  onLeadScoreChange: (score: number) => void;
}

export function InboxCrmSidebar({
  selectedConv,
  aiSummary,
  loadingSummary,
  newTagInput,
  onNewTagInputChange,
  onGenerateSummary,
  onNotesChange,
  onNotesBlur,
  onAddTag,
  onRemoveTag,
  onLeadScoreChange,
}: InboxCrmSidebarProps) {
  return (
    <div
      className="hidden lg:flex w-80 border-l flex-col p-5 overflow-y-auto shrink-0 select-none"
      style={{ background: 'var(--bg-sidebar)', borderColor: 'var(--border-glass)' }}
    >
      <h3
        className="text-[10px] font-extrabold uppercase tracking-widest mb-5 flex items-center gap-2"
        style={{ color: 'var(--text-muted)' }}
      >
        <Sliders size={12} style={{ color: '#818CF8' }} aria-hidden /> Premium Lead CRM
      </h3>

      <div className="premium-card text-center rounded-[20px] p-5 mb-5">
        <div
          className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-xl font-bold uppercase text-white shadow-lg"
          style={{ background: 'linear-gradient(135deg, #818CF8, #22D3EE)' }}
          aria-hidden
        >
          {selectedConv.name.charAt(0)}
        </div>
        <p className="text-xs font-bold mt-3 text-white tracking-tight">{selectedConv.name}</p>
        <p className="text-[10px] text-[#A0A0A0] font-light flex items-center justify-center gap-1 mt-1">
          <Instagram size={10} aria-hidden /> @{selectedConv.username}
        </p>
      </div>

      <div
        className="rounded-[18px] p-4 mb-5"
        style={{ border: '1px solid rgba(129,140,248,0.15)', background: 'rgba(129,140,248,0.10)' }}
      >
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-[10px] font-bold text-purple-300 flex items-center gap-1.5 uppercase tracking-wider">
            <Sparkles size={11} className="text-purple-400" aria-hidden />
            AI Conversation Summary
          </span>
          {aiSummary && (
            <button
              type="button"
              onClick={onGenerateSummary}
              className="text-[9px] text-gray-500 hover:text-white font-medium"
            >
              Regenerate
            </button>
          )}
        </div>
        {loadingSummary ? (
          <div className="space-y-2 py-2" aria-busy="true">
            <div className="h-2.5 bg-white/[0.04] rounded animate-pulse w-full" />
            <div className="h-2.5 bg-white/[0.04] rounded animate-pulse w-5/6" />
          </div>
        ) : aiSummary ? (
          <p className="text-[11px] text-[#D0D0D0] leading-relaxed italic font-light">&ldquo;{aiSummary}&rdquo;</p>
        ) : (
          <button
            type="button"
            onClick={onGenerateSummary}
            className="w-full py-2 bg-purple-900/40 border border-purple-500/30 hover:border-purple-500/50 rounded-lg text-[10px] font-medium text-purple-200 flex items-center justify-center gap-1.5"
          >
            <Sparkles size={11} className="text-purple-300" aria-hidden />
            Generate AI Summary
          </button>
        )}
      </div>

      <div className="premium-card mb-5 rounded-[18px] p-4">
        <div className="flex justify-between text-[11px] mb-2.5 font-semibold">
          <span className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
            <TrendingUp size={11} style={{ color: '#818CF8' }} aria-hidden /> Lead Score
          </span>
          <span className="text-white bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px]">
            {selectedConv.leadScore}/100
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={selectedConv.leadScore}
          onChange={(e) => onLeadScoreChange(Number(e.target.value))}
          className="w-full h-1 rounded-full appearance-none cursor-pointer accent-[#818CF8] focus:outline-none"
          aria-label="Lead score"
        />
      </div>

      <div className="premium-card mb-5 rounded-[18px] p-4">
        <div
          className="text-[10px] font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5"
          style={{ color: 'var(--text-muted)' }}
        >
          <FileText size={11} aria-hidden /> Notes (Autosaved)
        </div>
        <GlassTextarea
          rows={4}
          value={selectedConv.notes}
          onChange={(e) => onNotesChange(e.target.value)}
          onBlur={onNotesBlur}
          placeholder="Record lead interaction details here..."
          className="text-xs font-light leading-relaxed"
          aria-label="Lead notes"
        />
      </div>

      <div className="premium-card rounded-[18px] p-4">
        <div
          className="text-[10px] font-bold uppercase tracking-wider mb-3.5 flex items-center gap-1.5"
          style={{ color: 'var(--text-muted)' }}
        >
          <Star size={11} style={{ color: '#818CF8' }} aria-hidden /> Tags Management
        </div>
        {selectedConv.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {selectedConv.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onRemoveTag(tag)}
                className="text-[9px] bg-black border border-white/[0.06] hover:border-red-500/30 px-2.5 py-1 rounded-full flex items-center gap-1.5 text-gray-300"
              >
                {tag}
                <X size={8} className="text-gray-500" aria-hidden />
              </button>
            ))}
          </div>
        ) : (
          <p className="text-[10px] text-[#505050] italic font-light mb-3">No tags applied yet.</p>
        )}
        <form onSubmit={onAddTag} className="flex gap-2">
          <input
            value={newTagInput}
            onChange={(e) => onNewTagInputChange(e.target.value)}
            placeholder="New tag..."
            className="flex-1 glass-field rounded-lg px-2.5 py-1.5 text-[11px]"
            aria-label="New tag"
          />
          <button
            type="submit"
            className="p-1.5 bg-[#141414] border border-white/[0.08] rounded-lg text-gray-400 hover:text-white"
            aria-label="Add tag"
          >
            <Plus size={12} />
          </button>
        </form>
      </div>
    </div>
  );
}

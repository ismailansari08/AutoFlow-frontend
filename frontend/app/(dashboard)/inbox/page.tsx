'use client';

import { GlassInput } from '@/components/ui/GlassField';
import {
  Search,
  Send,
  Instagram,
  Sparkles,
  MessageCircle,
  X,
  ArrowLeft,
  Paperclip,
  Check,
  Loader2,
} from 'lucide-react';
import api from '@/lib/api/auth.api';
import { EmptyState } from '@/components/empty/EmptyState';
import { VirtualList } from '@/components/ui/VirtualList';
import { useInboxPage } from '@/lib/hooks/useInboxPage';
import { InboxCrmSidebar } from '@/components/inbox/InboxCrmSidebar';

export default function InboxPage() {
  const {
    conversations,
    loading,
    selectedConv,
    searchQuery,
    setSearchQuery,
    mobileView,
    setMobileView,
    crmSaving,
    filteredConversations,
    typingConvs,
    updateLocalConv,
    handleSelectConversation,
    chatEndRef,
    fileInputRef,
    aiTypingConvId,
    smartReplies,
    attachments,
    setAttachments,
    inputText,
    handleInputChange,
    handleSendMessage,
    sending,
    handleNotesChange,
    handleNotesBlur,
    handleAddTag,
    handleRemoveTag,
    handleLeadScoreChange,
    patchSelected,
    aiSummary,
    loadingSummary,
    handleGenerateSummary,
    newTagInput,
    setNewTagInput,
  } = useInboxPage();

  if (loading && conversations.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center premium-dot-grid" style={{ background: 'var(--bg-main)' }}>
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#818CF8' }} />
          <span className="text-xs font-light" style={{ color: 'var(--text-muted)' }}>Loading inbox workspace...</span>
        </div>
      </div>
    );
  }

  if (!loading && conversations.length > 0 && !selectedConv) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-main)' }}>
        <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
      </div>
    );
  }

  if (!loading && conversations.length === 0) {
    return (
      <div className="min-h-screen flex flex-col font-sans premium-dot-grid premium-radial-glow items-center justify-center p-6" style={{ background: 'var(--bg-main)', color: 'var(--text-primary)' }}>
        <div className="max-w-lg w-full">
          <EmptyState
            icon={<Instagram className="text-pink-400" size={32} />}
            title="No conversations yet"
            description="Connect Instagram to receive DMs, or start with a comment-to-DM workflow template."
            primaryAction={{ label: 'Connect Instagram', href: '/settings' }}
            secondaryAction={{ label: 'Comment → DM template', href: '/workflows?template=comment-dm' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden font-sans" style={{ background: 'var(--bg-main)', color: 'var(--text-primary)' }}>
      {/* Header Panel */}
      <div className="backdrop-blur-md border-b px-6 py-4 flex justify-between items-center shrink-0" style={{ background: 'rgba(8,8,15,0.90)', borderColor: 'var(--border-glass)' }}>
        <div>
          <h1 className="text-sm font-bold flex items-center gap-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            <MessageCircle size={16} style={{ color: '#818CF8' }} />
            Live Inbox & Team Workspace
          </h1>
          <p className="text-[10px] mt-0.5 font-light" style={{ color: 'var(--text-muted)' }}>
            Realtime updates active — Synced with backend API & WebSockets
          </p>
        </div>
        <div className="flex items-center gap-3">
          {crmSaving && (
            <span className="text-[10px] flex items-center gap-1.5 px-2.5 py-1 rounded-full animate-pulse" style={{ color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)' }}>
              <Loader2 size={10} className="animate-spin" /> Autosaving...
            </span>
          )}
          <div
            className="flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{ background: 'var(--alert-success-bg)', border: '1px solid var(--alert-success-border)' }}
          >
            <div className="w-1.5 h-1.5 bg-[#34D399] rounded-full animate-pulse" />
            <span className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: '#34D399' }}>Live Socket</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Conversations List */}
        <div
          className={`${mobileView === 'list' ? 'flex' : 'hidden'} md:flex w-full md:w-80 flex-shrink-0 border-r flex-col h-full`}
          style={{ background: 'var(--bg-sidebar)', borderColor: 'var(--border-glass)' }}
        >
          {/* Search bar */}
          <div className="p-4 border-b" style={{ borderColor: 'var(--border-glass)' }}>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-[#606060]" size={13} />
              <GlassInput
                type="search"
                placeholder="Filter chats by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Filter conversations by name"
                className="pl-9 pr-4 py-2.5 text-xs"
              />
            </div>
          </div>

          {/* Conversation list — virtualized when many rows */}
          <div className="flex-1 min-h-0">
            {filteredConversations.length > 20 ? (
              <VirtualList
                items={filteredConversations}
                height="100%"
                itemHeight={88}
                className="divide-y divide-[rgba(255,255,255,0.03)]"
                getKey={(c) => c.id}
                renderItem={(conv) => {
                  const isSelected = selectedConv && conv.id === selectedConv.id;
                  const hasAiActive = conv.aiActive;
                  const isUserTyping = typingConvs[conv.id];
                  return (
                    <div
                      onClick={() => handleSelectConversation(conv.id)}
                      className={`h-full px-4 py-3 cursor-pointer flex items-start gap-3 relative group transition-colors ${
                        isSelected
                          ? 'border-l-2 border-[#818CF8]'
                          : ''
                      }`}
                      style={isSelected ? { background: 'rgba(129,140,248,0.06)' } : undefined}
                      onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(129,140,248,0.04)'; }}
                      onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold uppercase shrink-0 text-white"
                        style={{ background: 'linear-gradient(135deg, #818CF8, #22D3EE)' }}
                      >
                        {conv.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold truncate text-[#E0E0E0]">{conv.name}</h4>
                        <p className="text-[9px] text-[#A0A0A0] truncate">@{conv.username}</p>
                        <p className="text-[10px] text-[#707070] truncate mt-0.5">
                          {isUserTyping ? 'Typing…' : conv.lastMessage || 'No messages'}
                        </p>
                      </div>
                      {hasAiActive && (
                        <Sparkles size={12} className="text-purple-400 shrink-0" aria-hidden />
                      )}
                    </div>
                  );
                }}
              />
            ) : (
          <div className="h-full overflow-y-auto divide-y divide-[rgba(255,255,255,0.03)]">
            {filteredConversations.map((conv) => {
              const isSelected = selectedConv && conv.id === selectedConv.id;
              const hasAiActive = conv.aiActive;
              const isUserTyping = typingConvs[conv.id];

              return (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv.id)}
                  className={`p-4 cursor-pointer flex items-start gap-3 relative group transition-colors ${
                    isSelected
                      ? 'border-l-2 border-[#818CF8]'
                      : ''
                  }`}
                  style={isSelected ? { background: 'rgba(129,140,248,0.06)' } : undefined}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(129,140,248,0.04)'; }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                >
                  {/* Quick Actions (Hover Over Row) */}
                  <div
                    className="absolute right-3 top-3 hidden group-hover:flex items-center gap-1.5 backdrop-blur shadow-xl rounded-lg p-1 transition-all duration-150 z-20"
                    style={{ background: 'rgba(8,8,15,0.90)', border: '1px solid var(--border-glass)' }}
                  >
                    <button
                      type="button"
                      title={conv.status === 'open' ? 'Resolve/Close Conversation' : 'Re-open Conversation'}
                      onClick={async (e) => {
                        e.stopPropagation();
                        const nextStatus = conv.status === 'open' ? 'closed' : 'open';
                        updateLocalConv(conv.id, { status: nextStatus });
                        try {
                          await api.patch(`/messages/conversations/${conv.id}/status`, { status: nextStatus });
                        } catch (err) {
                          console.error('Failed to change conversation status:', err);
                        }
                      }}
                      className={`p-1.5 rounded hover:bg-[#1C1C24] transition-colors ${
                        conv.status === 'open' ? 'text-[#606060] hover:text-emerald-400' : 'text-emerald-400'
                      }`}
                    >
                      <Check size={11} />
                    </button>
                    <button
                      type="button"
                      title={hasAiActive ? 'Deactivate AI Assist' : 'Activate AI Assist'}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateLocalConv(conv.id, { aiActive: !conv.aiActive });
                      }}
                      className={`p-1.5 rounded hover:bg-[#1C1C24] transition-colors ${
                        hasAiActive ? 'text-purple-400 animate-pulse' : 'text-[#606060] hover:text-purple-400'
                      }`}
                    >
                      <Sparkles size={11} />
                    </button>
                  </div>

                  {/* Avatar */}
                  <div className="relative">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold uppercase shadow-md select-none text-white"
                      style={{ background: 'linear-gradient(135deg, #818CF8, #22D3EE)' }}
                    >
                      {conv.name.charAt(0)}
                    </div>
                    {hasAiActive && (
                      <div className="absolute -bottom-1 -right-1 bg-purple-600 border border-black rounded-full p-0.5 shadow-md">
                        <Sparkles size={8} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4 className="text-xs font-semibold truncate text-[#E0E0E0]">{conv.name}</h4>
                      {conv.lastMessageTime && (
                        <span className="text-[9px] text-[#505050] whitespace-nowrap shrink-0">{conv.lastMessageTime}</span>
                      )}
                    </div>
                    <p className="text-[9px] text-[#A0A0A0] font-light truncate mb-1">@{conv.username}</p>
                    
                    {/* Dynamic Message Preview / Typing Pulse */}
                    {isUserTyping ? (
                      <p className="text-[10px] text-emerald-400 italic font-semibold flex items-center gap-1">
                        typing <span className="typing-dot bg-emerald-400" /><span className="typing-dot bg-emerald-400" /><span className="typing-dot bg-emerald-400" />
                      </p>
                    ) : (
                      <p className="text-[10px] text-[#606060] truncate font-light">
                        {conv.lastMessage}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
            {filteredConversations.length === 0 && (
              <div className="p-8 text-center text-[#606060] text-xs font-light">
                No chats found for filter.
              </div>
            )}
          </div>
            )}
          </div>
        </div>

        {/* Selected Chat Room */}
        <div
          className={`${mobileView === 'chat' ? 'flex' : 'hidden'} md:flex flex-1 flex-col min-w-0`}
          style={{ background: 'var(--bg-main)' }}
        >
          {/* Active Chat Header */}
          <div className="backdrop-blur-sm border-b px-6 py-3.5 flex justify-between items-center" style={{ background: 'rgba(8,8,15,0.80)', borderColor: 'var(--border-glass)' }}>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="md:hidden text-gray-400 hover:text-white p-1 rounded-lg"
                onClick={() => setMobileView('list')}
                aria-label="Back to conversation list"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h3 className="text-xs font-semibold flex items-center gap-1.5">
                  {selectedConv.name}
                  {selectedConv.status === 'closed' && (
                    <span className="text-[8px] font-bold bg-white/10 text-gray-400 border border-white/20 rounded-full px-2 py-0.5 uppercase tracking-widest">
                      Resolved
                    </span>
                  )}
                </h3>
                <p className="text-[9px] text-[#A0A0A0] font-light">@{selectedConv.username}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => patchSelected({ aiActive: !selectedConv.aiActive })}
              className={`text-[10px] flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 ${
                selectedConv.aiActive ? 'shadow-[0_0_12px_rgba(129,140,248,0.12)]' : 'hover:text-white'
              }`}
              style={selectedConv.aiActive ? {
                background: 'rgba(129,140,248,0.10)',
                border: '1px solid rgba(129,140,248,0.25)',
                color: '#C4B5FD',
              } : {
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-muted)',
              }}
            >
              <Sparkles size={11} style={{ color: selectedConv.aiActive ? '#818CF8' : undefined }} className={selectedConv.aiActive ? 'animate-spin-slow' : ''} />
              AI Assistant {selectedConv.aiActive ? 'Active' : 'Off'}
            </button>
          </div>

          {/* Messages History Panel */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {selectedConv.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.direction === 'inbound' ? 'justify-start' : 'justify-end'} animate-message-appear`}
              >
                <div
                  className={`max-w-[70%] rounded-[20px] px-4 py-3 text-xs leading-relaxed ${
                    msg.direction === 'inbound'
                      ? 'bg-gradient-to-br from-gray-100 to-gray-200 text-[#1A1A1A] rounded-tl-sm shadow-md font-medium'
                      : 'bg-black border border-[rgba(255,255,255,0.08)] text-[#FAFAFA] rounded-tr-sm shadow-xl'
                  }`}
                >
                  {msg.content}
                  {msg.isAiGenerated && (
                    <span className="block text-[8px] tracking-wider uppercase mt-1.5 opacity-60 text-purple-500 font-bold flex items-center gap-1">
                      <Sparkles size={8} /> AI Co-Pilot Reply
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Standard Typing Indicator inside Chat Log */}
            {typingConvs[selectedConv.id] && (
              <div className="flex justify-start animate-message-appear">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 text-[#1A1A1A] max-w-[70%] rounded-[20px] rounded-tl-sm px-4 py-3 text-xs flex items-center gap-1 font-medium shadow-md">
                  <span className="text-[10px] font-semibold text-gray-600 mr-1">Customer typing</span>
                  <span className="typing-dot bg-gray-600" />
                  <span className="typing-dot bg-gray-600" />
                  <span className="typing-dot bg-gray-600" />
                </div>
              </div>
            )}

            {/* AI Typing Indicator inside Chat Log */}
            {aiTypingConvId === selectedConv.id && (
              <div className="flex justify-start animate-message-appear">
                <div className="bg-gradient-to-r from-purple-950/30 to-pink-950/30 border border-purple-500/20 text-white max-w-[70%] rounded-[20px] rounded-tl-sm px-4 py-3.5 text-xs flex flex-col gap-1.5 animate-ai-glow">
                  <div className="flex items-center gap-1.5 font-bold text-purple-300">
                    <Sparkles size={11} className="text-purple-400 animate-pulse" />
                    <span>AI Assistant is drafting a reply</span>
                    <span className="typing-dot bg-purple-400" />
                    <span className="typing-dot bg-purple-400" />
                    <span className="typing-dot bg-purple-400" />
                  </div>
                  <p className="text-[9px] text-[#A0A0A0] leading-normal font-light">
                    AutoFlow LLM is crafting reply suggestions in background...
                  </p>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Horizontal Layout of Smart Suggestion Chips */}
          {smartReplies && smartReplies.length > 0 && (
            <div className="px-4 py-2 border-t border-[rgba(255,255,255,0.04)] bg-black/30 flex gap-2 overflow-x-auto items-center select-none no-scrollbar">
              <span className="text-[9px] text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1 shrink-0">
                <Sparkles size={10} className="text-purple-400" /> Smart Suggestions:
              </span>
              {smartReplies.map((reply, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleInputChange(reply)}
                  className="text-[10px] px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 shadow-md transform active:scale-95"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-glass)', color: 'var(--text-secondary)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-glow)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-glass)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Attachment Preview thumbnail cards above composer */}
          {attachments.length > 0 && (
            <div className="px-4 py-2.5 bg-black/40 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap gap-2 shrink-0 animate-message-appear">
              {attachments.map((file, idx) => (
                <div
                  key={idx}
                  className="bg-[#141414] border border-[rgba(255,255,255,0.08)] rounded-xl p-2 flex items-center gap-2 text-xs relative group shadow-md"
                >
                  <div className="w-8 h-8 bg-black/50 rounded-lg flex items-center justify-center text-[8px] uppercase font-bold text-[#A0A0A0] tracking-wider select-none">
                    {file.name.split('.').pop() || 'file'}
                  </div>
                  <div className="max-w-[120px]">
                    <p className="font-semibold text-[10px] truncate text-white">{file.name}</p>
                    <p className="text-[9px] text-[#606060]">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))}
                    className="text-gray-400 hover:text-white ml-1 p-1 hover:bg-white/5 rounded-full"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Chat Composer Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t flex gap-3 items-center shrink-0"
            style={{ borderColor: 'var(--border-glass)', background: 'rgba(8,8,15,0.65)' }}
          >
            {/* Hidden Input File */}
            <input
              type="file"
              ref={fileInputRef}
              multiple
              onChange={(e) => {
                if (!e.target.files) return;
                const fileList = Array.from(e.target.files).map((f) => ({
                  name: f.name,
                  size: f.size,
                  type: f.type,
                }));
                setAttachments([...attachments, ...fileList]);
              }}
              className="hidden"
            />

            {/* Paperclip selector */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-[#606060] hover:text-white p-3 hover:bg-white/5 rounded-xl transition-colors duration-150"
              title="Attach document or image"
            >
              <Paperclip size={16} />
            </button>

            {/* Main composer input */}
            <GlassInput
              id="composer-input"
              value={inputText}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={attachments.length > 0 ? 'Add message details...' : 'Type custom DM response...'}
              className="flex-1 px-4 py-3 text-sm md:text-xs font-light"
              aria-label="Message composer"
            />

            {/* Send CTA */}
            <button
              type="submit"
              disabled={sending || (!inputText.trim() && attachments.length === 0)}
              className="p-3.5 rounded-xl disabled:opacity-30 hover:scale-105 active:scale-95 transition-all text-white"
              style={{ background: 'linear-gradient(135deg, #818CF8, #22D3EE)', boxShadow: '0 0 16px rgba(129,140,248,0.35)' }}
            >
              <Send size={13} />
            </button>
          </form>
        </div>

        {selectedConv && (
          <InboxCrmSidebar
            selectedConv={selectedConv}
            aiSummary={aiSummary}
            loadingSummary={loadingSummary}
            newTagInput={newTagInput}
            onNewTagInputChange={setNewTagInput}
            onGenerateSummary={handleGenerateSummary}
            onNotesChange={handleNotesChange}
            onNotesBlur={handleNotesBlur}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            onLeadScoreChange={handleLeadScoreChange}
          />
        )}
      </div>
    </div>
  );
}

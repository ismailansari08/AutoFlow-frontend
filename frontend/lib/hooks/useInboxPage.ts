'use client';

import { useState, useEffect, useRef, type FormEvent } from 'react';
import { useInbox } from '@/lib/hooks/useInbox';
import { useSocket } from '@/lib/hooks/useSocket';
import { useInboxStore } from '@/lib/store/inbox.store';
import { fetchConversationSummary, fetchSmartReplies } from '@/lib/api/ai.api';
import type { InboxConversation } from '@/lib/inbox/mappers';
import { useSwipeBack } from '@/lib/hooks/useSwipeBack';

export function useInboxPage() {
  const {
    conversations,
    loading,
    error,
    sending,
    loadMessages,
    sendMessage,
    updateLocalConv,
    updateContactCRM,
  } = useInbox();

  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [newTagInput, setNewTagInput] = useState('');
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [crmSaving, setCrmSaving] = useState(false);
  const [attachments, setAttachments] = useState<
    Array<{ name: string; size: number; type: string }>
  >([]);

  useSwipeBack(mobileView === 'chat', () => setMobileView('list'));

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const notesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { emitTyping } = useSocket(selectedConvId);
  const aiTypingConvId = useInboxStore((s) => s.aiTypingConvId);
  const typingConvs = useInboxStore((s) => s.typingConvs);
  const smartReplies = useInboxStore((s) => s.smartReplies);
  const setSmartReplies = useInboxStore((s) => s.setSmartReplies);

  useEffect(() => {
    if (conversations.length && !selectedConvId) {
      setSelectedConvId(conversations[0].id);
    }
  }, [conversations, selectedConvId]);

  useEffect(() => {
    if (selectedConvId) loadMessages(selectedConvId);
  }, [selectedConvId, loadMessages]);

  const selectedConv =
    conversations.find((c) => c.id === selectedConvId) ?? conversations[0];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConv?.messages, aiTypingConvId, typingConvs]);

  useEffect(() => {
    setAiSummary(null);
    if (!selectedConvId) return;
    let isCurrent = true;
    const loadReplies = async () => {
      try {
        const replies = await fetchSmartReplies(selectedConvId);
        if (isCurrent) setSmartReplies(replies);
      } catch (err) {
        console.error('Error fetching smart replies:', err);
      }
    };
    loadReplies();
    return () => {
      isCurrent = false;
    };
  }, [selectedConvId, setSmartReplies]);

  const handleInputChange = (val: string) => {
    setInputText(val);
    if (!selectedConv) return;
    emitTyping(selectedConv.id, true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => emitTyping(selectedConv.id, false), 2500);
  };

  const handleSendMessage = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() && attachments.length === 0) return;
    if (!selectedConv) return;
    const text = inputText.trim() || `Sent ${attachments.length} attachment(s)`;
    setInputText('');
    setAttachments([]);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    emitTyping(selectedConv.id, false);
    try {
      await sendMessage(selectedConv.id, text);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectConversation = (id: string) => {
    setSelectedConvId(id);
    setMobileView('chat');
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const patchSelected = (patch: Partial<InboxConversation>) => {
    if (!selectedConv) return;
    updateLocalConv(selectedConv.id, patch);
  };

  const persistCRMDetails = async (fieldPatch: {
    notes?: string;
    tags?: string[];
    leadScore?: number;
  }) => {
    if (!selectedConv?.contactId) return;
    setCrmSaving(true);
    try {
      await updateContactCRM(selectedConv.contactId, fieldPatch);
    } catch (err) {
      console.error('Error persisting contact CRM details:', err);
    } finally {
      setTimeout(() => setCrmSaving(false), 800);
    }
  };

  const handleNotesChange = (val: string) => {
    patchSelected({ notes: val });
    if (notesTimeoutRef.current) clearTimeout(notesTimeoutRef.current);
    notesTimeoutRef.current = setTimeout(() => persistCRMDetails({ notes: val }), 1500);
  };

  const handleNotesBlur = () => {
    if (notesTimeoutRef.current) clearTimeout(notesTimeoutRef.current);
    if (selectedConv) persistCRMDetails({ notes: selectedConv.notes });
  };

  const handleAddTag = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim() || !selectedConv) return;
    const newTag = newTagInput.trim();
    if (selectedConv.tags.includes(newTag)) return;
    const updatedTags = [...selectedConv.tags, newTag];
    patchSelected({ tags: updatedTags });
    setNewTagInput('');
    await persistCRMDetails({ tags: updatedTags });
  };

  const handleRemoveTag = async (tagToRemove: string) => {
    if (!selectedConv) return;
    const updatedTags = selectedConv.tags.filter((t) => t !== tagToRemove);
    patchSelected({ tags: updatedTags });
    await persistCRMDetails({ tags: updatedTags });
  };

  const handleLeadScoreChange = async (score: number) => {
    if (!selectedConv) return;
    const val = Math.max(0, Math.min(100, score));
    patchSelected({ leadScore: val });
    await persistCRMDetails({ leadScore: val });
  };

  const handleGenerateSummary = async () => {
    if (!selectedConv) return;
    setLoadingSummary(true);
    try {
      const summary = await fetchConversationSummary(selectedConv.id);
      setAiSummary(summary);
    } catch (err) {
      console.error('Failed to generate summary:', err);
      setAiSummary('Failed to compile summary. Ensure OpenAI keys are valid.');
    } finally {
      setLoadingSummary(false);
    }
  };

  return {
    conversations,
    loading,
    error,
    sending,
    selectedConv,
    selectedConvId,
    inputText,
    searchQuery,
    setSearchQuery,
    newTagInput,
    setNewTagInput,
    mobileView,
    setMobileView,
    aiSummary,
    loadingSummary,
    crmSaving,
    attachments,
    setAttachments,
    aiTypingConvId,
    typingConvs,
    smartReplies,
    filteredConversations,
    chatEndRef,
    fileInputRef,
    updateLocalConv,
    handleInputChange,
    handleSendMessage,
    handleSelectConversation,
    handleNotesChange,
    handleNotesBlur,
    handleAddTag,
    handleRemoveTag,
    handleLeadScoreChange,
    handleGenerateSummary,
    patchSelected,
  };
}

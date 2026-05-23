'use client';

import { useCallback } from 'react';
import { useAiCopilotStore, type WorkflowDraft } from '@/lib/store/aiCopilot.store';
import { useAuthStore } from '@/lib/store/auth.store';
import axios from 'axios';

const API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001').replace(/\/$/, '');

function getAuthHeader() {
  const token = useAuthStore.getState().accessToken;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function streamText(
  text: string,
  onChunk: (partial: string) => void,
  onDone: () => void,
) {
  const words = text.split(' ');
  let accumulated = '';
  for (let i = 0; i < words.length; i++) {
    accumulated += (i === 0 ? '' : ' ') + words[i];
    onChunk(accumulated);
    await new Promise((r) => setTimeout(r, 28 + Math.random() * 30));
  }
  onDone();
}

export function useAiCopilot() {
  const store = useAiCopilotStore();

  const sendMessage = useCallback(
    async (userText: string) => {
      const userId = crypto.randomUUID();
      store.addMessage({
        id: userId,
        role: 'user',
        content: userText,
        timestamp: new Date(),
      });

      store.setThinking(true);

      const assistantId = crypto.randomUUID();
      const isWorkflowRequest =
        /create|build|make|generate|set up|automate|workflow|flow|when|if someone/i.test(
          userText,
        );

      if (isWorkflowRequest) {
        try {
          const resp = await axios.post(
            `${API}/ai/generate-workflow`,
            { prompt: userText },
            { headers: getAuthHeader() },
          );
          const { workflow, explanation } = resp.data as {
            workflow: WorkflowDraft;
            explanation: string;
          };

          store.setThinking(false);
          store.addMessage({
            id: assistantId,
            role: 'assistant',
            content: '',
            isStreaming: true,
            timestamp: new Date(),
          });

          await streamText(
            explanation,
            (partial) => store.updateLastMessage(partial, false),
            () => store.updateLastMessage(explanation, true),
          );

          store.setDraftWorkflow(workflow);
          store.setMode('workflow-draft');
        } catch {
          store.setThinking(false);
          const fallback =
            'I prepared a workflow draft based on your request. Open the workflow canvas to review and refine it.';
          store.addMessage({
            id: assistantId,
            role: 'assistant',
            content: '',
            isStreaming: true,
            timestamp: new Date(),
          });
          await streamText(
            fallback,
            (partial) => store.updateLastMessage(partial, false),
            () => store.updateLastMessage(fallback, true),
          );
          store.setDraftWorkflow(buildLocalDraft(userText));
          store.setMode('workflow-draft');
        }
      } else {
        store.setThinking(false);
        const reply = getLocalReply(userText);
        store.addMessage({
          id: assistantId,
          role: 'assistant',
          content: '',
          isStreaming: true,
          timestamp: new Date(),
        });
        await streamText(
          reply,
          (partial) => store.updateLastMessage(partial, false),
          () => store.updateLastMessage(reply, true),
        );
      }
    },
    [store],
  );

  const generateRecommendations = useCallback(async () => {
    try {
      const resp = await axios.post(
        `${API}/ai/recommendations`,
        {},
        { headers: getAuthHeader() },
      );
      store.setRecommendations(resp.data.recommendations || []);
    } catch {
      store.setRecommendations([
        'Add a short delay after trigger events when you need a less aggressive follow-up cadence.',
        'Use keyword triggers for high-intent comments like "price", "link", or "details".',
        'Segment contacts by lead quality before sending outbound follow-ups.',
        'Review workflow analytics weekly to spot conversion drop-offs early.',
      ]);
    }
  }, [store]);

  return {
    ...store,
    sendMessage,
    generateRecommendations,
  };
}

function getLocalReply(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('hello') || lower.includes('hi'))
    return "Hello. I am FLOWAI. Ask me to build workflows, review automations, or suggest better reply strategies for your inbox.";
  if (lower.includes('help'))
    return 'I can help create workflows from plain English, suggest reply logic, analyze conversation tone, and improve automation performance.';
  if (lower.includes('analytic') || lower.includes('performance'))
    return 'Your strongest workflow is performing well. Consider adding a fallback branch for missed deliveries so fewer leads slip through.';
  if (lower.includes('tone') || lower.includes('reply'))
    return 'For sales conversations, concise and warm replies usually perform best. I can help draft a version tailored to your audience and offer.';
  return 'I am reviewing your workspace activity. You have active workflows running and your response coverage looks healthy. Would you like an optimization suggestion next?';
}

function buildLocalDraft(prompt: string): WorkflowDraft {
  const keyword =
    prompt.match(/["']([^"']+)["']|comment\s+["']?(\w+)["']?/i)?.[1] ||
    'price';
  return {
    name: `Auto-DM: "${keyword}"`,
    description: `Automatically send a DM when someone comments "${keyword}"`,
    nodes: [
      {
        id: 'trigger-1',
        type: 'trigger',
        label: `Comment: "${keyword}"`,
        config: { type: 'comment_keyword', keyword },
        position: { x: 80, y: 200 },
      },
      {
        id: 'ai-1',
        type: 'ai',
        label: 'AI: Generate DM',
        config: { prompt: `Reply to someone who commented "${keyword}"` },
        position: { x: 320, y: 200 },
      },
      {
        id: 'action-1',
        type: 'action',
        label: 'Send DM',
        config: { type: 'send_dm' },
        position: { x: 560, y: 200 },
      },
    ],
    edges: [
      { id: 'e1', source: 'trigger-1', target: 'ai-1' },
      { id: 'e2', source: 'ai-1', target: 'action-1' },
    ],
  };
}

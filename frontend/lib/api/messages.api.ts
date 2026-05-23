import api from './auth.api';

export interface MessageStats {
  totalMessages: number;
  totalContacts: number;
  activeConversations: number;
  automationCount: number;
}

export async function fetchMessageStats(): Promise<MessageStats> {
  const { data } = await api.get<MessageStats>('/messages/stats');
  return data;
}

import api from './auth.api';
import type { Contact } from '@/lib/types/contact';

export async function fetchContacts(): Promise<Contact[]> {
  const { data } = await api.get<Contact[]>('/contacts');
  return data ?? [];
}

export interface UpdateContactPayload {
  name?: string;
  username?: string;
  notes?: string;
  tags?: string[];
  leadScore?: number;
  avatarUrl?: string;
}

export async function updateContact(
  contactId: string,
  payload: UpdateContactPayload,
): Promise<void> {
  await api.patch(`/contacts/${contactId}`, payload);
}

export async function getContact(contactId: string) {
  const res = await api.get(`/contacts/${contactId}`);
  return res.data;
}

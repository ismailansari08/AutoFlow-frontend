import type { Contact } from '@/lib/types/contact';

export function getLeadBadge(score: number) {
  if (score >= 50) {
    return {
      label: 'Hot Lead',
      className: 'bg-red-500/10 border-red-500/20 text-red-400',
    };
  }
  if (score >= 20) {
    return {
      label: 'Warm Lead',
      className: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    };
  }
  return {
    label: 'New Lead',
    className: 'bg-indigo-500/10 border-indigo-500/15 text-indigo-300',
  };
}

export function formatContactName(contact: Pick<Contact, 'name' | 'username'>) {
  return contact.name || 'Anonymous';
}

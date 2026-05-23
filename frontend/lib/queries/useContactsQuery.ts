'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchContacts } from '@/lib/api/contacts.api';
import { queryKeys } from './keys';

export function useContactsQuery() {
  return useQuery({
    queryKey: queryKeys.contacts,
    queryFn: fetchContacts,
  });
}

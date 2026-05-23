'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchMessageStats } from '@/lib/api/messages.api';
import { queryKeys } from './keys';

export function useMessageStatsQuery() {
  return useQuery({
    queryKey: queryKeys.messageStats,
    queryFn: fetchMessageStats,
  });
}

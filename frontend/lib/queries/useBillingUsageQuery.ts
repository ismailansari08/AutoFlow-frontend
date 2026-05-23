'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api/auth.api';
import { queryKeys } from './keys';

export interface BillingUsage {
  plan: string;
  subscriptionStatus?: string;
  monthlyMessageCount?: number;
  monthlyLimit?: number;
  usagePercentage?: number;
}

async function fetchBillingUsage(): Promise<BillingUsage> {
  const { data } = await api.get<BillingUsage>('/billing/usage');
  return data;
}

export function useBillingUsageQuery() {
  return useQuery({
    queryKey: queryKeys.billingUsage,
    queryFn: fetchBillingUsage,
  });
}

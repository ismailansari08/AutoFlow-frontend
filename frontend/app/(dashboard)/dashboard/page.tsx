'use client';

import {
  MessageSquare, Users, Zap, TrendingUp,
  ArrowUpRight, Plus, RefreshCw,
} from 'lucide-react';
import Link from 'next/link';
import { AnimatedCounter } from '@/components/analytics/AnimatedCounter';
import { DashboardLiveSection } from '@/components/dashboard/DashboardLiveSection';
import { AiCopilotDashboardWidget } from '@/components/ai/AiCopilotWidget';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useMessageStatsQuery } from '@/lib/queries/useMessageStatsQuery';

const StatIcon = ({ icon: Icon, color }: { icon: React.ElementType; color: string }) => (
  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: color }}>
    <Icon size={16} className="text-white opacity-90" />
  </div>
);

export default function DashboardPage() {
  const { overview, loading: analyticsLoading } = useAnalytics(30000);
  const { data: stats, isLoading, isError, refetch, isFetching } = useMessageStatsQuery();

  const m = overview?.metrics;
  const cards = [
    {
      label: 'Messages Sent',
      value: m?.totalMessages ?? stats?.totalMessages ?? 0,
      icon: MessageSquare,
      iconBg: 'rgba(129,140,248,0.18)',
      badge: m?.activeConversations != null ? 'Synced' : undefined,
      badgeColor: '#34D399',
    },
    {
      label: 'Total Contacts',
      value: m?.totalContacts ?? stats?.totalContacts ?? 0,
      icon: Users,
      iconBg: 'rgba(34,211,238,0.15)',
      badge: undefined,
      badgeColor: '#34D399',
    },
    {
      label: 'Active Chats',
      value: m?.activeConversations ?? stats?.activeConversations ?? 0,
      icon: TrendingUp,
      iconBg: 'rgba(52,211,153,0.15)',
      badge: 'Live',
      badgeColor: '#34D399',
    },
    {
      label: 'Automations',
      value: m?.totalAutomations ?? stats?.automationCount ?? 0,
      icon: Zap,
      iconBg: 'rgba(192,132,252,0.18)',
      badge: undefined,
      badgeColor: '#C084FC',
    },
  ];

  const showSkeleton = isLoading && analyticsLoading;

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Welcome back — here&apos;s your overview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ background: 'var(--alert-success-bg)', border: '1px solid var(--alert-success-border)' }}
          >
            <div className="w-1.5 h-1.5 bg-[#34D399] rounded-full animate-pulse" aria-hidden />
            <span className="text-[#34D399] text-xs font-medium">AI Online</span>
          </div>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="p-2 rounded-lg transition-colors disabled:opacity-40"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Refresh stats"
          >
            <RefreshCw size={15} className={isFetching ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {isError && (
        <div className="glass-alert glass-alert-error rounded-xl">
          <span className="text-sm font-medium">Could not load stats — try refreshing</span>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((card) => (
          <div key={card.label} className="premium-card p-4 group">
            <div className="flex items-center justify-between mb-3">
              <StatIcon icon={card.icon} color={card.iconBg} />
              {card.badge && (
                <span className="text-xs font-medium" style={{ color: card.badgeColor }}>
                  {card.badge}
                </span>
              )}
            </div>
            {showSkeleton ? (
              <div className="h-7 mb-1 empty-pulse w-12" style={{ background: 'rgba(129,140,248,0.08)' }} />
            ) : (
              <div className="text-2xl font-extrabold mb-0.5 tracking-tight">
                <AnimatedCounter value={card.value} />
              </div>
            )}
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {card.label}
            </div>
          </div>
        ))}
      </div>

      <DashboardLiveSection overview={overview} loading={analyticsLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="premium-card p-5">
          <h2 className="font-semibold text-sm mb-3 tracking-tight">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: 'Create New Workflow', desc: 'Set up a comment-to-DM automation', href: '/workflows', icon: Plus },
              { label: 'Open Inbox', desc: 'View live conversations', href: '/inbox', icon: MessageSquare },
              { label: 'View Contacts', desc: 'Manage your leads', href: '/contacts', icon: Users },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 border border-[var(--border-glass)] bg-white/[0.02] hover:border-[var(--border-glow)] hover:bg-indigo-500/[0.06] hover:-translate-y-px"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-indigo-500/10">
                  <action.icon size={14} className="text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{action.label}</div>
                  <div className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                    {action.desc}
                  </div>
                </div>
                <ArrowUpRight size={14} style={{ color: 'var(--text-muted)' }} className="shrink-0" />
              </Link>
            ))}
          </div>
        </div>
        <AiCopilotDashboardWidget />
      </div>
    </div>
  );
}

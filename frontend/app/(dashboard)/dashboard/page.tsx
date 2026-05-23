'use client';

import {
  MessageSquare, Users, Zap, TrendingUp,
  ArrowUpRight, Plus, RefreshCw, Sparkles, Inbox, Workflow,
} from 'lucide-react';
import Link from 'next/link';
import { AnimatedCounter } from '@/components/analytics/AnimatedCounter';
import { DashboardLiveSection } from '@/components/dashboard/DashboardLiveSection';
import { AiCopilotDashboardWidget } from '@/components/ai/AiCopilotWidget';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useMessageStatsQuery } from '@/lib/queries/useMessageStatsQuery';

const StatIcon = ({
  icon: Icon,
  color,
  delay = '0s',
}: {
  icon: React.ElementType;
  color: string;
  delay?: string;
}) => (
  <div
    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 dashboard-icon-soft"
    style={{ background: color, animationDelay: delay }}
  >
    <Icon size={17} className="text-white opacity-90" />
  </div>
);

export default function DashboardPage() {
  const { overview, loading: analyticsLoading } = useAnalytics(30000);
  const { data: stats, isLoading, isError, refetch, isFetching } = useMessageStatsQuery();

  const metrics = overview?.metrics;
  const cards = [
    {
      label: 'Messages Sent',
      value: metrics?.totalMessages ?? stats?.totalMessages ?? 0,
      icon: MessageSquare,
      iconBg: 'rgba(129,140,248,0.18)',
      badge: metrics?.activeConversations != null ? 'Synced' : undefined,
      badgeColor: '#34D399',
    },
    {
      label: 'Total Contacts',
      value: metrics?.totalContacts ?? stats?.totalContacts ?? 0,
      icon: Users,
      iconBg: 'rgba(34,211,238,0.15)',
      badge: undefined,
      badgeColor: '#34D399',
    },
    {
      label: 'Active Chats',
      value: metrics?.activeConversations ?? stats?.activeConversations ?? 0,
      icon: TrendingUp,
      iconBg: 'rgba(52,211,153,0.15)',
      badge: 'Live',
      badgeColor: '#34D399',
    },
    {
      label: 'Automations',
      value: metrics?.totalAutomations ?? stats?.automationCount ?? 0,
      icon: Zap,
      iconBg: 'rgba(192,132,252,0.18)',
      badge: undefined,
      badgeColor: '#C084FC',
    },
  ];

  const showSkeleton = isLoading && analyticsLoading;
  const isNewWorkspace =
    !showSkeleton &&
    (cards[0].value ?? 0) === 0 &&
    (cards[1].value ?? 0) === 0 &&
    (cards[2].value ?? 0) === 0 &&
    (cards[3].value ?? 0) === 0;

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            A live view of inbox activity, workflow performance, and team-ready actions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ background: 'var(--alert-success-bg)', border: '1px solid var(--alert-success-border)' }}
          >
            <div className="w-1.5 h-1.5 bg-[#34D399] rounded-full animate-pulse" aria-hidden />
            <span className="text-[#34D399] text-xs font-medium">FLOWAI online</span>
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

      {isNewWorkspace && (
        <div className="premium-card p-5 border border-violet-500/15 bg-gradient-to-br from-violet-950/20 to-cyan-950/10">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-violet-500/10 border border-violet-400/20 flex items-center justify-center dashboard-icon-soft shrink-0">
              <Sparkles size={18} className="text-violet-300" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Start with three simple setup steps
              </h2>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Your workspace is ready. Connect your workflow, prepare the inbox, and let FLOWAI help you launch your first automation with confidence.
              </p>
              <div className="grid gap-2 sm:grid-cols-3 mt-4">
                {[
                  {
                    icon: Workflow,
                    title: 'Create a workflow',
                    desc: 'Build your first comment-to-DM flow from the workflow canvas.',
                    href: '/workflows',
                  },
                  {
                    icon: Inbox,
                    title: 'Prepare the inbox',
                    desc: 'Review conversation routing and make sure your team view is ready.',
                    href: '/inbox',
                  },
                  {
                    icon: Sparkles,
                    title: 'Ask FLOWAI',
                    desc: 'Use guided prompts to generate a workflow or improve reply logic.',
                    href: '#flowai',
                  },
                ].map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-white/8 bg-black/15 p-3 dashboard-surface-hover"
                  >
                    <div
                      className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/10 flex items-center justify-center dashboard-icon-soft mb-3"
                      style={{ animationDelay: `${index * 0.22}s` }}
                    >
                      <step.icon size={14} className="text-violet-300" />
                    </div>
                    <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {step.title}
                    </div>
                    <div className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {step.desc}
                    </div>
                    {step.href !== '#flowai' ? (
                      <Link
                        href={step.href}
                        className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-violet-300 hover:text-violet-200"
                      >
                        Open
                        <ArrowUpRight size={12} />
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-violet-300">
                        Available in the panel below
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {isError && (
        <div className="glass-alert glass-alert-error rounded-xl">
          <span className="text-sm font-medium">Could not load stats. Try refreshing.</span>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((card, index) => (
          <div key={card.label} className="premium-card p-4 group dashboard-surface-hover">
            <div className="flex items-center justify-between mb-3">
              <StatIcon icon={card.icon} color={card.iconBg} delay={`${index * 0.3}s`} />
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
          <h2 className="font-semibold text-sm mb-1 tracking-tight">Quick Actions</h2>
          <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
            Common tasks your team can launch in one step.
          </p>
          <div className="space-y-2">
            {[
              { label: 'Create a New Workflow', desc: 'Set up a comment-to-DM automation', href: '/workflows', icon: Plus },
              { label: 'Open the Inbox', desc: 'Review live conversations and reply faster', href: '/inbox', icon: MessageSquare },
              { label: 'Review Contacts', desc: 'Check leads, tags, and conversion signals', href: '/contacts', icon: Users },
            ].map((action, index) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 border border-[var(--border-glass)] bg-white/[0.02] hover:border-[var(--border-glow)] hover:bg-indigo-500/[0.06] hover:-translate-y-px"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-indigo-500/10 dashboard-icon-soft"
                  style={{ animationDelay: `${index * 0.25}s` }}
                >
                  <action.icon size={14} className="text-indigo-300" />
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
        <div id="flowai">
          <AiCopilotDashboardWidget />
        </div>
      </div>
    </div>
  );
}

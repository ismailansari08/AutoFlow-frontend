'use client';

import { TrendingUp, Users, AlertCircle, RefreshCw } from 'lucide-react';
import { EmptyState } from '@/components/empty/EmptyState';
import { VirtualList } from '@/components/ui/VirtualList';
import { useContactsQuery } from '@/lib/queries/useContactsQuery';
import { getLeadBadge, formatContactName } from '@/lib/utils/lead-badge';
import type { Contact } from '@/lib/types/contact';

function ContactRow({ contact }: { contact: Contact }) {
  const badge = getLeadBadge(contact.leadScore);
  return (
    <div
      className="flex items-center gap-3 px-4 h-full border-b"
      style={{ borderColor: 'var(--border-glass)' }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold uppercase shrink-0"
        style={{ background: 'linear-gradient(135deg, #818CF8, #22D3EE)' }}
        aria-hidden
      >
        {contact.username?.charAt(0) || 'U'}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
          {formatContactName(contact)}
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          @{contact.username}
        </p>
      </div>
      <span
        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${badge.className}`}
      >
        {badge.label}
      </span>
    </div>
  );
}

export default function ContactsPage() {
  const { data: contacts = [], isLoading, isError, refetch, isFetching } = useContactsQuery();

  return (
    <div
      className="p-4 md:p-6 max-w-6xl mx-auto space-y-6 min-h-screen"
      style={{ background: 'var(--bg-main)', color: 'var(--text-primary)' }}
    >
      <div
        className="flex items-center justify-between pb-6"
        style={{ borderBottom: '1px solid var(--border-glass)' }}
      >
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Contacts & Leads</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Manage your Instagram leads and contacts
          </p>
        </div>
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="p-2 rounded-lg transition-colors disabled:opacity-40"
          style={{ color: 'var(--text-muted)' }}
          aria-label="Refresh contacts"
        >
          <RefreshCw size={15} className={isFetching ? 'animate-spin' : ''} />
        </button>
      </div>

      {isLoading && (
        <div className="space-y-3" aria-busy="true">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl empty-pulse" style={{ background: 'rgba(129,140,248,0.04)' }} />
          ))}
        </div>
      )}

      {isError && !isLoading && (
        <div className="glass-alert glass-alert-error rounded-xl">
          <AlertCircle size={16} className="shrink-0" />
          <div className="flex-1">
            <p className="font-medium text-xs">Unable to load contacts</p>
            <p className="text-[11px] mt-0.5 opacity-75">Check your backend connection</p>
          </div>
          <button type="button" onClick={() => refetch()} className="text-[11px] font-semibold underline shrink-0">
            Retry
          </button>
        </div>
      )}

      {!isError && contacts.length === 0 && !isLoading && (
        <EmptyState
          icon={<Users size={32} style={{ color: '#818CF8' }} />}
          title="No contacts yet"
          description="Contacts appear when users DM you or trigger a workflow. Connect Instagram and launch your first automation."
          primaryAction={{ label: 'Connect Instagram', href: '/settings' }}
          secondaryAction={{ label: 'Create workflow', href: '/workflows' }}
        />
      )}

      {contacts.length > 0 && !isLoading && !isError && contacts.length > 25 && (
        <div
          className="rounded-2xl overflow-hidden premium-card"
          style={{ backdropFilter: 'blur(16px)' }}
        >
          <VirtualList
            items={contacts}
            height={Math.min(640, contacts.length * 72)}
            itemHeight={72}
            getKey={(c) => c.id}
            renderItem={(contact) => <ContactRow contact={contact} />}
          />
        </div>
      )}

      {contacts.length > 0 && !isLoading && !isError && contacts.length <= 25 && (
        <div className="rounded-2xl table-responsive premium-card" style={{ backdropFilter: 'blur(16px)' }}>
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                {['User', 'Username', 'Lead Score', 'Status'].map((col) => (
                  <th
                    key={col}
                    className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)' }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => {
                const badge = getLeadBadge(contact.leadScore);
                return (
                  <tr key={contact.id} className="hover:bg-indigo-500/[0.04] transition-colors border-b border-[var(--border-glass)]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold uppercase shrink-0"
                          style={{ background: 'linear-gradient(135deg, #818CF8, #22D3EE)' }}
                        >
                          {contact.username?.charAt(0) || 'U'}
                        </div>
                        <span className="text-xs font-semibold">{formatContactName(contact)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                      @{contact.username}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-indigo-400">
                        <TrendingUp size={13} />
                        <span className="font-bold text-xs">{contact.leadScore}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-extrabold border ${badge.className}`}>
                        {badge.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

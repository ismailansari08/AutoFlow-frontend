'use client';

import { useEffect } from 'react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[40vh] flex items-center justify-center p-6">
      <div className="premium-card max-w-md w-full p-6 text-center space-y-4">
        <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          Something went wrong
        </h2>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          We could not load this page. Try again or return to the dashboard.
        </p>
        <div className="flex gap-2 justify-center">
          <button
            type="button"
            onClick={reset}
            className="text-xs font-semibold px-4 py-2 rounded-xl"
            style={{
              background: 'linear-gradient(135deg, #818CF8, #C084FC)',
              color: 'white',
            }}
          >
            Try again
          </button>
          <a
            href="/dashboard"
            className="text-xs font-semibold px-4 py-2 rounded-xl border"
            style={{ borderColor: 'var(--border-glass)', color: 'var(--text-secondary)' }}
          >
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

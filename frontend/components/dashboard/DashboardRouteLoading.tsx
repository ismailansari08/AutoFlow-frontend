export function DashboardRouteLoading({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="min-h-[40vh] flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"
          role="status"
          aria-label={label}
        />
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {label}
        </span>
      </div>
    </div>
  );
}

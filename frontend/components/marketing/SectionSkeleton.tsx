export function SectionSkeleton({ className = 'min-h-[320px]' }: { className?: string }) {
  return (
    <div
      className={`${className} flex items-center justify-center`}
      style={{ background: 'var(--bg-main)' }}
      aria-hidden
    >
      <div className="w-6 h-6 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
    </div>
  );
}

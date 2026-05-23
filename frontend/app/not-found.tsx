import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="min-h-screen premium-dot-grid flex items-center justify-center text-center px-4"
      style={{ background: 'var(--bg-main)' }}
    >
      <div className="premium-card rounded-[28px] p-8 sm:p-10 max-w-md w-full">
        <div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #818CF8, #C084FC, #22D3EE)' }}
        >
          404
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Page not found
        </h1>
        <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #818CF8, #C084FC, #22D3EE)' }}
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen premium-dot-grid"
      style={{ background: 'var(--bg-main)', color: 'var(--text-primary)' }}
    >
      {children}
    </div>
  );
}

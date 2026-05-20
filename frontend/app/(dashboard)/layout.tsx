import DashboardAuthGate from '@/components/dashboard/DashboardAuthGate';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardAuthGate>{children}</DashboardAuthGate>;
}


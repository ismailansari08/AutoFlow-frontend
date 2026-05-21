'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Squares2X2Icon,
  ChatBubbleOvalLeftIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import { useAuth } from '@/lib/hooks/useAuth';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Squares2X2Icon },
  { href: '/inbox', label: 'Inbox', icon: ChatBubbleOvalLeftIcon },
  { href: '/workflows', label: 'Workflows', icon: RocketLaunchIcon },
  { href: '/contacts', label: 'Contacts', icon: UserGroupIcon },
  { href: '/settings', label: 'Settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-pink-600 rounded-lg flex items-center justify-center">
            <Bars3Icon className="h-4 w-4 text-white" />
          </div>
          <span className="text-white font-bold text-lg">AutoFlow</span>
        </div>
        <button className="md:hidden text-gray-400" onClick={() => setMobileOpen(false)}>
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="min-w-0">
            <div className="text-white text-xs font-medium truncate">{user?.name || 'User'}</div>
            <div className="text-gray-500 text-xs truncate">{user?.email}</div>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <ArrowRightOnRectangleIcon size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-56 flex-shrink-0 bg-slate-900 border-r border-white/5 flex-col h-screen sticky top-0">
        <SidebarContent />
      </aside>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-3.5 left-4 z-50 text-gray-400 hover:text-white"
        onClick={() => setMobileOpen(true)}
      >
        <Bars3Icon className="w-6 h-6" />
      </button>
      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-slate-950 z-40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="md:hidden fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-white/5 z-50 flex flex-col"
            style={{ animation: 'slideInLeft 0.25s ease' }}
          >
            <SidebarContent />
          </aside>
        </>
      )}
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}

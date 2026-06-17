import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, UserPlus, DollarSign, History,
  Bell, MessageSquare, Settings, LogOut, ChevronRight,
  Shield, FileText, Menu, X
} from 'lucide-react';

const creatorNav = [
  { key: 'browse', label: 'Browse Groups', icon: Users, href: '/groups' },
  { key: 'my-group', label: 'My Group', icon: Shield, href: '/groups/my-group' },
  { key: 'earnings', label: 'Earnings', icon: DollarSign, href: '/groups/creator-earnings' },
  { key: 'commission-history', label: 'Commission History', icon: History, href: '/groups/commission-history' },
  { key: 'activity', label: 'Account Activity', icon: FileText, href: '/groups/account-activity' },
  { key: 'notifications', label: 'Notifications', icon: Bell, href: '/groups/notifications' },
  { key: 'messenger', label: 'Messenger', icon: MessageSquare, href: '/groups/messenger' },
];

const ownerNav = [
  { key: 'dashboard', label: 'Group Dashboard', icon: LayoutDashboard, href: '/groups/owner-dashboard' },
  { key: 'requests', label: 'Join Requests', icon: UserPlus, href: '/groups/join-requests' },
  { key: 'members', label: 'Members', icon: Users, href: '/groups/members' },
  { key: 'earnings', label: 'Earnings', icon: DollarSign, href: '/groups/owner-earnings' },
  { key: 'commission', label: 'Commission', icon: DollarSign, href: '/groups/commission-management' },
  { key: 'leave-requests', label: 'Leave Requests', icon: LogOut, href: '/groups/leave-requests' },
  { key: 'delegated', label: 'Delegated Management', icon: Shield, href: '/groups/delegated' },
  { key: 'activity', label: 'Activity History', icon: History, href: '/groups/activity-history' },
  { key: 'notifications', label: 'Notifications', icon: Bell, href: '/groups/notifications' },
  { key: 'messenger', label: 'Messenger', icon: MessageSquare, href: '/groups/messenger' },
  { key: 'settings', label: 'Group Settings', icon: Settings, href: '/groups/group-settings' },
];

export default function GroupsLayout({ children, activeNav, role = 'creator' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const nav = role === 'owner' ? ownerNav : creatorNav;

  return (
    <div className="min-h-screen bg-[#1a0e2e] text-white flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#2E2249] border-r border-white/10 z-50 transition-transform duration-300 flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>
        
        {/* Logo */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/b248bfd91_gemini_logo_white.png" alt="Logo" className="w-6 h-6" />
            <div className="text-xs text-white/40 mt-0.5">Groups</div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 hover:bg-white/10 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Role Toggle */}
        <div className="p-4 border-b border-white/10">
          <div className="flex rounded-lg overflow-hidden border border-white/10">
            <a href="/groups" className={`flex-1 text-center py-1.5 text-xs font-medium transition-colors ${role === 'creator' ? 'bg-purple-600 text-white' : 'text-white/50 hover:bg-white/5'}`}>Creator</a>
            <a href="/groups/owner-dashboard" className={`flex-1 text-center py-1.5 text-xs font-medium transition-colors ${role === 'owner' ? 'bg-purple-600 text-white' : 'text-white/50 hover:bg-white/5'}`}>Owner</a>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {nav.map(item => {
            const Icon = item.icon;
            const isActive = activeNav === item.key;
            return (
              <a key={item.key} href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm
                  ${isActive ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
                {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
              </a>
            );
          })}
        </nav>

        {/* Back to site */}
        <div className="p-4 border-t border-white/10">
          <a href="/" className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to LiveGemini
          </a>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-[#2E2249] border-b border-white/10">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-white/10 rounded-lg">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-semibold">LiveGemini Groups</span>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
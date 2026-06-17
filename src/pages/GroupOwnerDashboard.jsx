import React from 'react';
import { Users, UserPlus, LogOut, DollarSign, TrendingUp, Bell, Clock, AlertTriangle } from 'lucide-react';
import GroupsLayout from '../components/groups/GroupsLayout';
import StatusBadge from '../components/groups/StatusBadge';
import { mockMembers, mockJoinRequests, mockNotifications } from '../lib/groupsMockData';

const statCards = [
  { label: 'Active Creators', value: '32', icon: Users, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { label: 'Pending Requests', value: '6', icon: UserPlus, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { label: 'Leave Requests', value: '2', icon: LogOut, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { label: 'Group Earnings (Month)', value: '$8,420', icon: DollarSign, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { label: 'Owner Commission (Month)', value: '$1,260', icon: TrendingUp, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
];

export default function GroupOwnerDashboard() {
  const leavingMembers = mockMembers.filter(m => m.membershipStatus === 'leave_requested');

  return (
    <GroupsLayout activeNav="dashboard" role="owner">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Group Dashboard</h1>
          <p className="text-white/50 mt-1">Gemini Elite Creators · @geminiowner</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {statCards.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl p-4`}>
                <Icon className={`w-5 h-5 ${s.color} mb-2`} />
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-white/50 mt-1">{s.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pending Requests */}
          <div className="bg-[#2E2249] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-white flex items-center gap-2"><UserPlus className="w-4 h-4 text-yellow-400" /> Pending Join Requests</h2>
              <a href="/groups/join-requests" className="text-xs text-purple-400 hover:text-purple-300">View All →</a>
            </div>
            <div className="space-y-3">
              {mockJoinRequests.slice(0, 3).map(r => (
                <div key={r.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <img src={r.avatar} className="w-9 h-9 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white text-sm">{r.username}</div>
                    <div className="text-xs text-white/40">Requested {new Date(r.requestedAt).toLocaleDateString()}</div>
                  </div>
                  <StatusBadge status="pending" />
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-[#2E2249] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-white flex items-center gap-2"><Bell className="w-4 h-4 text-purple-400" /> Recent Notifications</h2>
              <a href="/groups/notifications" className="text-xs text-purple-400 hover:text-purple-300">View All →</a>
            </div>
            <div className="space-y-3">
              {mockNotifications.slice(0, 4).map(n => (
                <div key={n.id} className={`flex items-start gap-3 p-3 rounded-xl ${n.status === 'unread' ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-white/5'}`}>
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-purple-400 opacity-60" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white">{n.title}</div>
                    <div className="text-xs text-white/50 mt-0.5">{n.description}</div>
                    <div className="text-xs text-white/30 mt-1">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leave Requests */}
        {leavingMembers.length > 0 && (
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-5">
            <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-400" /> Creators Leaving ({leavingMembers.length})
            </h2>
            <div className="space-y-3">
              {leavingMembers.map(m => (
                <div key={m.id} className="flex items-center gap-4 p-3 bg-black/20 rounded-xl flex-wrap">
                  <img src={m.avatar} className="w-9 h-9 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white text-sm">{m.username}</div>
                    <div className="text-xs text-orange-300 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> {m.leaveCountdown} remaining
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <button className="px-3 py-1.5 border border-white/20 rounded-lg text-white/60 hover:text-white">Message</button>
                    <button className="px-3 py-1.5 border border-white/20 rounded-lg text-white/60 hover:text-white">View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'View All Members', href: '/groups/members' },
            { label: 'Manage Commission', href: '/groups/commission-management' },
            { label: 'Owner Earnings', href: '/groups/owner-earnings' },
            { label: 'Activity History', href: '/groups/activity-history' },
          ].map(l => (
            <a key={l.label} href={l.href} className="p-4 bg-white/5 border border-white/10 hover:border-purple-400/40 rounded-xl text-sm text-white/70 hover:text-white text-center transition-all">{l.label}</a>
          ))}
        </div>
      </div>
    </GroupsLayout>
  );
}
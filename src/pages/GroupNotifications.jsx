import React, { useState } from 'react';
import { Bell, UserPlus, DollarSign, LogOut, Eye, EyeOff, UserX, UserCheck, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import GroupsLayout from '../components/groups/GroupsLayout';
import { mockNotifications } from '../lib/groupsMockData';

const iconMap = {
  join_request: { icon: UserPlus, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  commission_change: { icon: DollarSign, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  leave_request: { icon: LogOut, color: 'text-orange-400', bg: 'bg-orange-500/10' },
  account_hidden: { icon: EyeOff, color: 'text-gray-400', bg: 'bg-gray-500/10' },
  join_approved: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10' },
  join_rejected: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
  account_deactivated: { icon: UserX, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  account_reactivated: { icon: UserCheck, color: 'text-green-400', bg: 'bg-green-500/10' },
};

export default function GroupNotifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selected, setSelected] = useState(null);

  const markRead = (id) => setNotifications(ns => ns.map(n => n.id === id ? { ...n, status: 'read' } : n));

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  return (
    <GroupsLayout activeNav="notifications" role="owner">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Notifications</h1>
            <p className="text-white/50 mt-1">{unreadCount} unread</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={() => setNotifications(ns => ns.map(n => ({ ...n, status: 'read' })))}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              Mark all as read
            </button>
          )}
        </div>

        <div className="space-y-2">
          {notifications.map(n => {
            const config = iconMap[n.type] || { icon: Bell, color: 'text-white/50', bg: 'bg-white/10' };
            const Icon = config.icon;
            return (
              <button key={n.id}
                onClick={() => { setSelected(n); markRead(n.id); }}
                className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all hover:border-purple-400/40
                  ${n.status === 'unread' ? 'bg-purple-500/10 border-purple-500/20' : 'bg-white/5 border-white/10'}`}>
                <div className={`w-10 h-10 ${config.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{n.title}</span>
                    {n.status === 'unread' && <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-white/60 mt-0.5">{n.description}</p>
                  <div className="text-xs text-white/30 mt-1">{n.time}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/20 flex-shrink-0 mt-3" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail Side Panel */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 z-[10000] flex justify-end" onClick={() => setSelected(null)}>
          <div className="w-full max-w-md bg-[#2E2249] h-full overflow-y-auto p-6 space-y-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-white text-xl">{selected.title}</h2>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-white/10 rounded-lg text-white/50">✕</button>
            </div>
            <p className="text-white/70">{selected.description}</p>
            <div className="text-sm text-white/40">{selected.time}</div>
            {selected.action && (
              <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-sm font-bold text-white">
                {selected.action}
              </button>
            )}
          </div>
        </div>
      )}
    </GroupsLayout>
  );
}
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import GroupsLayout from '../components/groups/GroupsLayout';
import { mockActivityHistory } from '../lib/groupsMockData';

export default function GroupAccountActivity() {
  const [search, setSearch] = useState('');

  const myActivity = mockActivityHistory.filter(a =>
    a.target.toLowerCase().includes('@amyrose') ||
    a.actor.toLowerCase().includes('@amyrose')
  );

  const filtered = myActivity.filter(a =>
    a.event.toLowerCase().includes(search.toLowerCase()) ||
    a.actor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <GroupsLayout activeNav="activity" role="creator">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Account Activity</h1>
          <p className="text-white/50 mt-1">Events related to your account within the group.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500" />
        </div>

        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-12 text-white/40">No activity found.</div>
          )}
          {filtered.map(a => (
            <div key={a.id} className="bg-[#2E2249] border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-medium text-white text-sm">{a.event}</span>
                <span className="text-xs text-white/30">{new Date(a.timestamp).toLocaleString()}</span>
              </div>
              <div className="text-xs text-white/40 mt-1">by <span className="text-purple-400">{a.actor}</span></div>
            </div>
          ))}
        </div>
      </div>
    </GroupsLayout>
  );
}
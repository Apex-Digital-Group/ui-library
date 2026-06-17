import React, { useState } from 'react';
import { Search, History, ArrowRight } from 'lucide-react';
import GroupsLayout from '../components/groups/GroupsLayout';
import { mockActivityHistory } from '../lib/groupsMockData';

export default function GroupActivityHistory() {
  const [search, setSearch] = useState('');

  const filtered = mockActivityHistory.filter(a =>
    a.event.toLowerCase().includes(search.toLowerCase()) ||
    a.actor.toLowerCase().includes(search.toLowerCase()) ||
    a.target.toLowerCase().includes(search.toLowerCase())
  );

  const eventColors = {
    'Join Request Approved': 'text-green-400',
    'Commission Change Requested': 'text-yellow-400',
    'Commission Change Approved': 'text-green-400',
    'Profile Hidden': 'text-gray-400',
    'Leave Request Started': 'text-orange-400',
    'Image Uploaded by Group Owner': 'text-blue-400',
    'Join Request Submitted': 'text-yellow-400',
  };

  return (
    <GroupsLayout activeNav="activity" role="owner">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Activity History</h1>
          <p className="text-white/50 mt-1">Full audit trail of group events and actions.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search events, actors, creators..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500" />
        </div>

        <div className="bg-[#2E2249] border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-xs">
                  <th className="text-left px-5 py-3">Event</th>
                  <th className="text-left px-4 py-3">Actor</th>
                  <th className="text-left px-4 py-3">Target</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">Change</th>
                  <th className="text-left px-5 py-3">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(a => (
                  <tr key={a.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3">
                      <span className={`font-medium ${eventColors[a.event] || 'text-white'}`}>{a.event}</span>
                    </td>
                    <td className="px-4 py-3 text-purple-400">{a.actor}</td>
                    <td className="px-4 py-3 text-white/70">{a.target}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {a.oldValue && a.newValue ? (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-white/40">{a.oldValue}</span>
                          <ArrowRight className="w-3 h-3 text-white/20" />
                          <span className="text-white">{a.newValue}</span>
                        </div>
                      ) : a.newValue ? (
                        <span className="text-xs text-white/60">{a.newValue}</span>
                      ) : <span className="text-white/20">—</span>}
                    </td>
                    <td className="px-5 py-3 text-white/40 text-xs whitespace-nowrap">
                      {new Date(a.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-white/40">
              <History className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>No events match your search.</p>
            </div>
          )}
        </div>
      </div>
    </GroupsLayout>
  );
}
import React, { useState } from 'react';
import { Search, Filter, Users, Star, ChevronRight, CheckCircle } from 'lucide-react';
import GroupsLayout from '../components/groups/GroupsLayout';
import GroupCard from '../components/groups/GroupCard';
import JoinRequestModal from '../components/groups/JoinRequestModal';
import { mockGroups, mockCreatorState } from '../lib/groupsMockData';

export default function Groups() {
  const [search, setSearch] = useState('');
  const [filterCommission, setFilterCommission] = useState('all');
  const [filterSize, setFilterSize] = useState('all');
  const [joinModalGroup, setJoinModalGroup] = useState(null);
  const [creatorState] = useState(mockCreatorState);

  const filtered = mockGroups.filter(g => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.owner.toLowerCase().includes(search.toLowerCase());
    const matchCommission = filterCommission === 'all' ||
      (filterCommission === 'low' && g.commission <= 8) ||
      (filterCommission === 'mid' && g.commission > 8 && g.commission <= 12) ||
      (filterCommission === 'high' && g.commission > 12);
    const matchSize = filterSize === 'all' ||
      (filterSize === 'small' && g.members < 30) ||
      (filterSize === 'medium' && g.members >= 30 && g.members < 60) ||
      (filterSize === 'large' && g.members >= 60);
    return matchSearch && matchCommission && matchSize;
  });

  return (
    <GroupsLayout activeNav="browse" role="creator">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Browse Groups</h1>
          <p className="text-white/60 max-w-2xl">Groups allow creators to work under a managed structure, with shared support, delegated management, and transparent commission arrangements.</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search groups or owners..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500"
            />
          </div>
          <select value={filterCommission} onChange={e => setFilterCommission(e.target.value)} className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 text-sm">
            <option value="all">All Commissions</option>
            <option value="low">Low (≤8%)</option>
            <option value="mid">Mid (9–12%)</option>
            <option value="high">High (13%+)</option>
          </select>
          <select value={filterSize} onChange={e => setFilterSize(e.target.value)} className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 text-sm">
            <option value="all">All Sizes</option>
            <option value="small">Small (&lt;30)</option>
            <option value="medium">Medium (30–60)</option>
            <option value="large">Large (60+)</option>
          </select>
        </div>

        {/* Featured Banner */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-5 flex items-center gap-4">
          <Star className="w-8 h-8 text-yellow-400 flex-shrink-0" />
          <div>
            <div className="font-semibold text-white">Featured: Gemini Elite Creators</div>
            <div className="text-sm text-white/60">Top performing group — 42 creators, 10% commission, managed by @geminiowner</div>
          </div>
          <button onClick={() => setJoinModalGroup(mockGroups[0])} className="ml-auto bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors whitespace-nowrap">View Group</button>
        </div>

        {/* Group Cards */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(group => (
            <GroupCard
              key={group.id}
              group={group}
              creatorState={creatorState}
              onJoin={() => setJoinModalGroup(group)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/40">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>No groups match your filters.</p>
          </div>
        )}
      </div>

      {joinModalGroup && (
        <JoinRequestModal
          group={joinModalGroup}
          onClose={() => setJoinModalGroup(null)}
        />
      )}
    </GroupsLayout>
  );
}
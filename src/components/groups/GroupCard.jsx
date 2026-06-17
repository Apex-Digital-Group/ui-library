import React from 'react';
import { Users, Star, ChevronRight } from 'lucide-react';

export default function GroupCard({ group, creatorState, onJoin }) {
  const isInGroup = creatorState?.status === 'active_member' || creatorState?.status === 'leave_requested';
  const hasPendingRequest = creatorState?.status === 'join_requested';
  const isThisGroup = creatorState?.groupId === group.id;

  const renderJoinBtn = () => {
    if (isInGroup) {
      return <span className="text-xs text-white/40 text-center">You are already in a group</span>;
    }
    if (hasPendingRequest && isThisGroup) {
      return <span className="px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-lg text-sm font-medium">Request Pending</span>;
    }
    return (
      <button onClick={onJoin} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-sm font-medium text-white transition-all">
        Join Group
      </button>
    );
  };

  return (
    <div className="bg-[#2E2249] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all group">
      {/* Avatar */}
      <div className="relative h-24 bg-gradient-to-r from-purple-600/30 to-pink-600/30">
        <div className="absolute bottom-0 left-4 translate-y-1/2 w-12 h-12 rounded-xl overflow-hidden border-2 border-[#2E2249] bg-[#1a0e2e]">
          <img src={group.avatar} alt={group.name} className="w-full h-full object-cover" />
        </div>
        {group.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-2 py-0.5 text-xs text-yellow-400">
            <Star className="w-3 h-3" />
            Featured
          </div>
        )}
      </div>

      <div className="pt-8 p-4 space-y-3">
        <div>
          <h3 className="font-bold text-white">{group.name}</h3>
          <p className="text-xs text-purple-400">{group.owner}</p>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-white/60">
            <Users className="w-3.5 h-3.5" />
            <span>{group.members} creators</span>
          </div>
          <div className="text-green-400 font-semibold">{group.commission}% commission</div>
        </div>

        <p className="text-xs text-white/50 line-clamp-2">{group.description}</p>

        <div className="flex items-center gap-2 pt-1">
          {renderJoinBtn()}
          <button onClick={onJoin} className="flex items-center gap-1 px-4 py-2 border border-white/20 hover:border-white/40 rounded-lg text-sm text-white/70 hover:text-white transition-all">
            View <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
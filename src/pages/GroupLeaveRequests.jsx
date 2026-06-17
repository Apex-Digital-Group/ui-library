import React from 'react';
import { Clock } from 'lucide-react';
import GroupsLayout from '../components/groups/GroupsLayout';
import { mockMembers } from '../lib/groupsMockData';

export default function GroupLeaveRequests() {
  const leavingMembers = mockMembers.filter(m => m.membershipStatus === 'leave_requested');

  return (
    <GroupsLayout activeNav="leave-requests" role="owner">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Leave Requests</h1>
          <p className="text-white/50 mt-1">{leavingMembers.length} creator(s) have requested to leave.</p>
        </div>

        {leavingMembers.length === 0 && (
          <div className="text-center py-16 text-white/40">No pending leave requests.</div>
        )}

        <div className="space-y-4">
          {leavingMembers.map(m => (
            <div key={m.id} className="bg-[#2E2249] border border-orange-500/30 rounded-2xl p-5 flex items-center gap-4 flex-wrap">
              <img src={m.avatar} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white">{m.username}</div>
                <div className="text-xs text-orange-300 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" /> {m.leaveCountdown} remaining
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-white/20 hover:bg-white/5 rounded-xl text-sm text-white/70 hover:text-white transition-all">Message</button>
                <button className="px-4 py-2 border border-orange-500/40 text-orange-400 hover:bg-orange-500/10 rounded-xl text-sm transition-all">Cancel Leave</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GroupsLayout>
  );
}
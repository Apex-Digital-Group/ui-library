import React, { useState, useEffect } from 'react';
import { Shield, Clock, DollarSign, Eye, History, MessageSquare, AlertTriangle, CheckCircle, XCircle, Users, LogOut } from 'lucide-react';
import GroupsLayout from '../components/groups/GroupsLayout';
import { mockCreatorState, mockTransactions } from '../lib/groupsMockData';
import CommissionApprovalModal from '../components/groups/CommissionApprovalModal';
import LeaveGroupModal from '../components/groups/LeaveGroupModal';
import CancelLeaveModal from '../components/groups/CancelLeaveModal';
import StatusBadge from '../components/groups/StatusBadge';

export default function GroupMyGroup() {
  const [state, setState] = useState(mockCreatorState);
  const [showCommissionModal, setShowCommissionModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showCancelLeave, setShowCancelLeave] = useState(false);
  const [countdown, setCountdown] = useState({ hours: 23, minutes: 42, seconds: 0 });

  useEffect(() => {
    if (state.status !== 'leave_requested') return;
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [state.status]);

  const renderState = () => {
    switch (state.status) {
      case 'no_group':
        return (
          <div className="text-center py-16 space-y-4">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-white/30" />
            </div>
            <h2 className="text-2xl font-bold text-white">You are not currently part of a group.</h2>
            <p className="text-white/50">Join a group to access managed creator tools, commission structures, and support.</p>
            <div className="flex gap-3 justify-center mt-6">
              <a href="/groups" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-sm font-bold text-white">Browse Groups</a>
              <a href="/groups/create" className="px-6 py-3 border border-white/20 hover:border-white/40 rounded-xl text-sm font-medium text-white">Create Group</a>
            </div>
          </div>
        );

      case 'join_requested':
        return (
          <div className="max-w-lg mx-auto space-y-4">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 space-y-4">
              <StatusBadge status="pending" label="Pending Approval" />
              <h2 className="text-xl font-bold text-white">Your request to join this group is pending.</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-white/50">Group</span><span className="text-white">{state.groupName}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Request Date</span><span className="text-white">29 Apr 2026</span></div>
                <div className="flex justify-between"><span className="text-white/50">Advertised Commission</span><span className="text-green-400 font-semibold">{state.advertisedRate}%</span></div>
              </div>
              <div className="flex gap-3 pt-2">
                <button className="flex-1 py-2.5 border border-red-500/40 text-red-400 hover:bg-red-500/10 rounded-xl text-sm font-medium transition-all">Cancel Request</button>
                <button className="flex-1 py-2.5 border border-white/20 hover:bg-white/5 rounded-xl text-sm text-white/70 flex items-center justify-center gap-2 transition-all">
                  <MessageSquare className="w-4 h-4" /> Message Owner
                </button>
              </div>
            </div>
          </div>
        );

      case 'active_member':
        return (
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <StatusBadge status="active" label="Active Member" />
                <h2 className="text-2xl font-bold text-white mt-2">{state.groupName}</h2>
                <p className="text-purple-400">{state.groupOwner}</p>
              </div>
              <button onClick={() => setShowLeaveModal(true)} className="flex items-center gap-2 px-4 py-2.5 border border-red-500/40 text-red-400 hover:bg-red-500/10 rounded-xl text-sm font-medium transition-all">
                <LogOut className="w-4 h-4" /> Leave Group
              </button>
            </div>

            {/* Commission Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Advertised Rate', value: `${state.advertisedRate}%`, color: 'text-white' },
                { label: 'Your Current Rate', value: `${state.currentRate}%`, color: 'text-yellow-400' },
                { label: 'Platform Fee', value: `${state.platformFee}%`, color: 'text-red-400' },
                { label: 'Your Net Earnings', value: `${state.netEarnings}%`, color: 'text-green-400' },
              ].map(c => (
                <div key={c.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-xs text-white/40 mb-1">{c.label}</div>
                  <div className={`text-2xl font-bold ${c.color}`}>{c.value}</div>
                </div>
              ))}
            </div>

            <div className="text-xs text-white/40 bg-white/5 rounded-lg px-3 py-2">
              Net earnings calculated as: 100% − {state.platformFee}% platform fee − {state.currentRate}% group commission = <strong className="text-white">{state.netEarnings}%</strong> (live cam earnings example)
            </div>

            {/* Pending Commission Change */}
            {state.pendingCommissionChange && state.pendingCommissionChange.status === 'pending' && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold text-white">Commission Change Requires Your Approval</span>
                </div>
                <div className="flex items-center gap-4 text-sm mb-4">
                  <span className="text-white/60">Current: <strong className="text-white">{state.pendingCommissionChange.oldRate}%</strong></span>
                  <span className="text-white/30">→</span>
                  <span className="text-white/60">Proposed: <strong className="text-yellow-400">{state.pendingCommissionChange.newRate}%</strong></span>
                </div>
                <button onClick={() => setShowCommissionModal(true)} className="px-5 py-2.5 bg-yellow-500/20 border border-yellow-500/40 hover:bg-yellow-500/30 rounded-xl text-sm font-medium text-yellow-300 transition-all">
                  Review Commission Change
                </button>
              </div>
            )}

            {/* Quick actions */}
            <div className="flex flex-wrap gap-3">
              <a href="/groups/creator-earnings" className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 hover:border-purple-400/40 rounded-xl text-sm text-white/70 hover:text-white transition-all">
                <DollarSign className="w-4 h-4" /> View Earnings
              </a>
              <a href="/groups/commission-history" className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 hover:border-purple-400/40 rounded-xl text-sm text-white/70 hover:text-white transition-all">
                <History className="w-4 h-4" /> Commission History
              </a>
              <a href="/groups/account-activity" className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 hover:border-purple-400/40 rounded-xl text-sm text-white/70 hover:text-white transition-all">
                <Eye className="w-4 h-4" /> Account Activity
              </a>
            </div>

            {/* Recent transactions */}
            <div>
              <h3 className="font-semibold text-white mb-4">Recent Transactions</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-white/40 text-xs border-b border-white/10">
                      <th className="text-left pb-2">Type</th>
                      <th className="text-right pb-2">Gross</th>
                      <th className="text-right pb-2">Platform</th>
                      <th className="text-right pb-2">Commission</th>
                      <th className="text-right pb-2 text-green-400">You Earn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTransactions.slice(0, 4).map(t => (
                      <tr key={t.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-2.5 text-white">{t.type}</td>
                        <td className="py-2.5 text-right text-white">${t.gross}</td>
                        <td className="py-2.5 text-right text-red-400">-${t.platformFee}</td>
                        <td className="py-2.5 text-right text-yellow-400">-${t.groupCommission}</td>
                        <td className="py-2.5 text-right text-green-400 font-semibold">${t.creatorAmount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'leave_requested':
        return (
          <div className="max-w-lg mx-auto space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 space-y-4">
              <StatusBadge status="leave_requested" label="Leave Requested" />
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Leave Request Active</h2>
                  <p className="text-white/60 text-sm">Your request to leave this group will complete when the countdown reaches zero. You can cancel at any time during this period.</p>
                </div>
              </div>
              {/* Countdown */}
              <div className="bg-black/30 rounded-xl p-4 text-center">
                <div className="text-xs text-white/40 mb-2">Time Remaining</div>
                <div className="text-4xl font-mono font-bold text-white">
                  {String(countdown.hours).padStart(2, '0')}:{String(countdown.minutes).padStart(2, '0')}:{String(countdown.seconds).padStart(2, '0')}
                </div>
                <div className="text-xs text-white/40 mt-1">hours · minutes · seconds</div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowCancelLeave(true)} className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-bold text-white transition-all">
                  Cancel Leave Request
                </button>
                <button className="flex-1 py-2.5 border border-white/20 hover:bg-white/5 rounded-xl text-sm text-white/70 flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Message Owner
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <GroupsLayout activeNav="my-group" role="creator">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">My Group</h1>
        <p className="text-white/50 mt-1">Your current group membership and status.</p>
      </div>
      {renderState()}
      {showCommissionModal && <CommissionApprovalModal data={state.pendingCommissionChange} groupName={state.groupName} groupOwner={state.groupOwner} currentNet={state.netEarnings} onClose={() => setShowCommissionModal(false)} />}
      {showLeaveModal && <LeaveGroupModal groupName={state.groupName} onConfirm={() => { setState(s => ({ ...s, status: 'leave_requested' })); setShowLeaveModal(false); }} onClose={() => setShowLeaveModal(false)} />}
      {showCancelLeave && <CancelLeaveModal onConfirm={() => { setState(s => ({ ...s, status: 'active_member' })); setShowCancelLeave(false); }} onClose={() => setShowCancelLeave(false)} />}
    </GroupsLayout>
  );
}
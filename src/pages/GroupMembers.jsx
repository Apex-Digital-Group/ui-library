import React, { useState } from 'react';
import { MessageSquare, Settings, Trash2, DollarSign, Shield } from 'lucide-react';
import GroupsLayout from '../components/groups/GroupsLayout';
import StatusBadge from '../components/groups/StatusBadge';
import CommissionChangeModal from '../components/groups/CommissionChangeModal';
import { mockMembers } from '../lib/groupsMockData';

export default function GroupMembers() {
  const [members, setMembers] = useState(mockMembers);
  const [commissionModal, setCommissionModal] = useState(null);
  const [removeConfirm, setRemoveConfirm] = useState(null);

  const handleRemove = (id) => {
    setMembers(ms => ms.filter(m => m.id !== id));
    setRemoveConfirm(null);
  };

  return (
    <GroupsLayout activeNav="members" role="owner">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Group Members</h1>
          <p className="text-white/50 mt-1">{members.length} creators in Gemini Elite Creators</p>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-[#2E2249] border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs">
                <th className="text-left px-5 py-3">Creator</th>
                <th className="text-left px-4 py-3">Account</th>
                <th className="text-left px-4 py-3">Membership</th>
                <th className="text-right px-4 py-3">Commission</th>
                <th className="text-right px-4 py-3">Net Earnings</th>
                <th className="text-right px-4 py-3">Sales (Month)</th>
                <th className="text-right px-4 py-3">My Commission</th>
                <th className="text-right px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={m.avatar} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <span className="font-medium text-white">{m.username}</span>
                        <div className="text-xs text-white/40">{m.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={m.accountStatus} /></td>
                  <td className="px-4 py-3"><StatusBadge status={m.membershipStatus === 'leave_requested' ? 'leave_requested' : m.membershipStatus === 'active' ? 'active_member' : m.membershipStatus} /></td>
                  <td className="px-4 py-3 text-right text-yellow-400 font-semibold">{m.commission}%</td>
                  <td className="px-4 py-3 text-right text-green-400">{m.netEarnings}%</td>
                  <td className="px-4 py-3 text-right text-white">${m.salesThisMonth.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-purple-400">${m.ownerCommissionEarned.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center gap-1.5 justify-end">
                      <button onClick={() => setCommissionModal(m)} className="p-1.5 bg-white/5 hover:bg-purple-500/20 rounded-lg text-white/50 hover:text-purple-300 transition-all" title="Manage"><Settings className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-all" title="Message"><MessageSquare className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setCommissionModal(m)} className="p-1.5 bg-white/5 hover:bg-yellow-500/20 rounded-lg text-white/50 hover:text-yellow-300 transition-all" title="Commission"><DollarSign className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setRemoveConfirm(m)} className="p-1.5 bg-white/5 hover:bg-red-500/20 rounded-lg text-white/50 hover:text-red-400 transition-all" title="Remove"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-3">
          {members.map(m => (
            <div key={m.id} className="bg-[#2E2249] border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <img src={m.avatar} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="font-semibold text-white">{m.username}</div>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    <StatusBadge status={m.accountStatus} />
                    <StatusBadge status={m.membershipStatus === 'leave_requested' ? 'leave_requested' : 'active_member'} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div className="bg-white/5 rounded-lg p-2"><div className="text-xs text-white/40">Commission</div><div className="text-yellow-400 font-semibold">{m.commission}%</div></div>
                <div className="bg-white/5 rounded-lg p-2"><div className="text-xs text-white/40">Net Earnings</div><div className="text-green-400">{m.netEarnings}%</div></div>
                <div className="bg-white/5 rounded-lg p-2"><div className="text-xs text-white/40">Sales (Month)</div><div className="text-white">${m.salesThisMonth.toLocaleString()}</div></div>
                <div className="bg-white/5 rounded-lg p-2"><div className="text-xs text-white/40">My Commission</div><div className="text-purple-400">${m.ownerCommissionEarned.toLocaleString()}</div></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setCommissionModal(m)} className="flex-1 py-2 text-center border border-white/20 rounded-xl text-xs text-white/70 hover:text-white flex items-center justify-center gap-1"><Settings className="w-3 h-3" />Manage</button>
                <button onClick={() => setCommissionModal(m)} className="flex-1 py-2 border border-yellow-500/30 rounded-xl text-xs text-yellow-400 flex items-center justify-center gap-1"><DollarSign className="w-3 h-3" />Commission</button>
                <button onClick={() => setRemoveConfirm(m)} className="px-3 py-2 border border-red-500/30 rounded-xl text-xs text-red-400"><Trash2 className="w-3 h-3" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {commissionModal && <CommissionChangeModal creator={commissionModal} onClose={() => setCommissionModal(null)} />}

      {removeConfirm && (
        <div className="fixed inset-0 bg-black/70 z-[10000] flex items-center justify-center p-4" onClick={() => setRemoveConfirm(null)}>
          <div className="w-full max-w-sm bg-[#2E2249] border border-white/20 rounded-2xl p-6 space-y-4" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-white">Remove Member?</h3>
            <p className="text-sm text-white/60">Are you sure you want to remove <strong className="text-white">{removeConfirm.username}</strong> from the group?</p>
            <div className="flex gap-3">
              <button onClick={() => setRemoveConfirm(null)} className="flex-1 py-2.5 border border-white/20 rounded-xl text-sm text-white/70 transition-all hover:bg-white/5">Cancel</button>
              <button onClick={() => handleRemove(removeConfirm.id)} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl text-sm font-bold text-white transition-all">Remove</button>
            </div>
          </div>
        </div>
      )}
    </GroupsLayout>
  );
}
import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import GroupsLayout from '../components/groups/GroupsLayout';
import CommissionChangeModal from '../components/groups/CommissionChangeModal';
import { mockMembers } from '../lib/groupsMockData';

export default function GroupCommissionManagement() {
  const [members, setMembers] = useState(mockMembers);
  const [commissionModal, setCommissionModal] = useState(null);

  return (
    <GroupsLayout activeNav="commission" role="owner">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Commission Management</h1>
          <p className="text-white/50 mt-1">Review and adjust individual creator commission rates.</p>
        </div>

        <div className="bg-[#2E2249] border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs">
                <th className="text-left px-5 py-3">Creator</th>
                <th className="text-right px-4 py-3">Current Rate</th>
                <th className="text-right px-4 py-3">Net Earnings %</th>
                <th className="text-right px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={m.avatar} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="font-medium text-white">{m.username}</div>
                        <div className="text-xs text-white/40">{m.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-yellow-400 font-semibold">{m.commission}%</td>
                  <td className="px-4 py-3 text-right text-green-400">{m.netEarnings}%</td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => setCommissionModal(m)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 hover:bg-yellow-500/20 rounded-lg text-xs text-yellow-400 transition-all ml-auto">
                      <DollarSign className="w-3 h-3" /> Adjust
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {commissionModal && <CommissionChangeModal creator={commissionModal} onClose={() => setCommissionModal(null)} />}
    </GroupsLayout>
  );
}
import React from 'react';
import { History } from 'lucide-react';
import GroupsLayout from '../components/groups/GroupsLayout';
import { mockTransactions } from '../lib/groupsMockData';

export default function GroupCommissionHistory() {
  return (
    <GroupsLayout activeNav="commission-history" role="creator">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Commission History</h1>
          <p className="text-white/50 mt-1">A record of all commission changes applied to your account.</p>
        </div>

        <div className="bg-[#2E2249] border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-xs">
                  <th className="text-left px-5 py-3">ID</th>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Type</th>
                  <th className="text-right px-4 py-3">Gross</th>
                  <th className="text-right px-4 py-3">Commission</th>
                  <th className="text-right px-5 py-3 text-green-400">You Earned</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map(t => (
                  <tr key={t.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-5 py-3 text-white/40 font-mono text-xs">{t.id}</td>
                    <td className="px-4 py-3 text-white/70">{t.date}</td>
                    <td className="px-4 py-3 text-white">{t.type}</td>
                    <td className="px-4 py-3 text-right text-white">${t.gross}</td>
                    <td className="px-4 py-3 text-right text-yellow-400">-${t.groupCommission}</td>
                    <td className="px-5 py-3 text-right text-green-400 font-semibold">${t.creatorAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </GroupsLayout>
  );
}
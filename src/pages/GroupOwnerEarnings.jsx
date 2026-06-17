import React from 'react';
import { DollarSign, TrendingUp, Eye } from 'lucide-react';
import GroupsLayout from '../components/groups/GroupsLayout';
import { mockMembers, mockTransactions } from '../lib/groupsMockData';

export default function GroupOwnerEarnings() {
  const totalGroupSales = mockMembers.reduce((s, m) => s + m.salesThisMonth, 0);
  const totalOwnerCommission = mockMembers.reduce((s, m) => s + m.ownerCommissionEarned, 0);

  return (
    <GroupsLayout activeNav="earnings" role="owner">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Group Earnings</h1>
          <p className="text-white/50 mt-1">Gemini Elite Creators · This month</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Group Sales', value: `$${totalGroupSales.toLocaleString()}`, color: 'text-white' },
            { label: 'Total Owner Commission', value: `$${totalOwnerCommission.toLocaleString()}`, color: 'text-purple-400' },
            { label: 'Active Creators', value: mockMembers.length, color: 'text-green-400' },
            { label: 'Avg Commission Rate', value: `${(mockMembers.reduce((s,m) => s+m.commission, 0)/mockMembers.length).toFixed(1)}%`, color: 'text-yellow-400' },
          ].map(s => (
            <div key={s.label} className="bg-[#2E2249] border border-white/10 rounded-2xl p-4">
              <div className="text-xs text-white/40 mb-2">{s.label}</div>
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* By Creator */}
        <div className="bg-[#2E2249] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Earnings by Creator</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-xs">
                  <th className="text-left px-5 py-3">Creator</th>
                  <th className="text-right px-4 py-3">Gross Sales</th>
                  <th className="text-right px-4 py-3">Commission Rate</th>
                  <th className="text-right px-4 py-3 text-purple-300">Owner Commission</th>
                  <th className="text-right px-4 py-3 text-green-300">Creator Net</th>
                  <th className="text-right px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockMembers.map(m => (
                  <tr key={m.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={m.avatar} className="w-7 h-7 rounded-full object-cover" />
                        <span className="text-white font-medium">{m.username}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-white">${m.salesThisMonth.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-yellow-400">{m.commission}%</td>
                    <td className="px-4 py-3 text-right text-purple-400 font-semibold">${m.ownerCommissionEarned.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-green-400">${(m.salesThisMonth - (m.salesThisMonth * 0.30) - m.ownerCommissionEarned).toFixed(2)}</td>
                    <td className="px-5 py-3 text-right">
                      <span className="flex items-center gap-1 text-xs text-white/30 justify-end">
                        <Eye className="w-3 h-3" /> {m.username}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-[#2E2249] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Recent Group Transactions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-xs">
                  <th className="text-left px-5 py-3">ID</th>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Type</th>
                  <th className="text-right px-4 py-3">Gross</th>
                  <th className="text-right px-4 py-3">Platform Fee</th>
                  <th className="text-right px-4 py-3 text-purple-300">Owner Commission</th>
                  <th className="text-right px-5 py-3 text-green-300">Creator Received</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map(t => (
                  <tr key={t.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-5 py-3 text-white/40 font-mono text-xs">{t.id}</td>
                    <td className="px-4 py-3 text-white/70">{t.date}</td>
                    <td className="px-4 py-3 text-white">{t.type}</td>
                    <td className="px-4 py-3 text-right text-white">${t.gross}</td>
                    <td className="px-4 py-3 text-right text-red-400">-${t.platformFee}</td>
                    <td className="px-4 py-3 text-right text-purple-400">${t.groupCommission}</td>
                    <td className="px-5 py-3 text-right text-green-400">${t.creatorAmount}</td>
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
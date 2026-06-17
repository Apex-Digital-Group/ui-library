import React from 'react';
import { DollarSign, TrendingUp, Camera, Heart, Image, Video, Star, CreditCard } from 'lucide-react';
import GroupsLayout from '../components/groups/GroupsLayout';
import { mockTransactions } from '../lib/groupsMockData';

const earningsByType = [
  { type: 'Live Cams', gross: 1800, platformFee: 540, commission: 216, net: 1044, icon: Camera },
  { type: 'Tips', gross: 420, platformFee: 84, commission: 50.40, net: 285.60, icon: Heart },
  { type: 'Photos', gross: 310, platformFee: 62, commission: 37.20, net: 210.80, icon: Image },
  { type: 'Videos', gross: 540, platformFee: 108, commission: 64.80, net: 367.20, icon: Video },
  { type: 'Subscriptions', gross: 170, platformFee: 34, commission: 20.40, net: 115.60, icon: Star },
];

export default function GroupCreatorEarnings() {
  const totalGross = earningsByType.reduce((s, t) => s + t.gross, 0);
  const totalFee = earningsByType.reduce((s, t) => s + t.platformFee, 0);
  const totalCommission = earningsByType.reduce((s, t) => s + t.commission, 0);
  const totalNet = earningsByType.reduce((s, t) => s + t.net, 0);

  return (
    <GroupsLayout activeNav="earnings" role="creator">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">My Earnings</h1>
          <p className="text-white/50 mt-1">Gemini Elite Creators · Current split: 12% group commission</p>
        </div>

        {/* Split Summary */}
        <div className="bg-[#2E2249] border border-white/10 rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-5">Active Earnings Split</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Platform Fee (Live Cams)', value: '30%', color: 'text-red-400' },
              { label: 'Platform Fee (Other)', value: '20%', color: 'text-orange-400' },
              { label: 'Group Commission', value: '12%', color: 'text-yellow-400' },
              { label: 'Your Net (Live Cams)', value: '58%', color: 'text-green-400' },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-white/40 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Gross Sales', value: `$${totalGross.toLocaleString()}`, color: 'text-white' },
            { label: 'Platform Fees', value: `-$${totalFee.toLocaleString()}`, color: 'text-red-400' },
            { label: 'Group Commission', value: `-$${totalCommission.toFixed(2)}`, color: 'text-yellow-400' },
            { label: 'Your Net Earnings', value: `$${totalNet.toFixed(2)}`, color: 'text-green-400' },
          ].map(s => (
            <div key={s.label} className="bg-[#2E2249] border border-white/10 rounded-2xl p-4">
              <div className="text-xs text-white/40 mb-2">{s.label}</div>
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* By Content Type */}
        <div className="bg-[#2E2249] border border-white/10 rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-5">Earnings by Content Type</h2>
          <div className="space-y-3">
            {earningsByType.map(t => {
              const Icon = t.icon;
              const pct = Math.round((t.net / totalGross) * 100);
              return (
                <div key={t.type} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                  <Icon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-white">{t.type}</span>
                      <span className="text-green-400 font-semibold text-sm">${t.net.toFixed(2)}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-white/30">
                      <span>Gross: ${t.gross}</span>
                      <span>Fee: -${t.platformFee}</span>
                      <span>Comm: -${t.commission}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-[#2E2249] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10">
            <h2 className="font-semibold text-white">Transaction History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-xs">
                  <th className="text-left px-5 py-3">ID</th>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Type</th>
                  <th className="text-right px-4 py-3">Gross</th>
                  <th className="text-right px-4 py-3">Platform</th>
                  <th className="text-right px-4 py-3">Commission</th>
                  <th className="text-right px-5 py-3 text-green-400">You Earn</th>
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
import React from 'react';
import { Lock, Unlock, Gem, ShoppingBag } from 'lucide-react';

const walletCards = [
  { label: 'Locked Tokens', value: '350', icon: Lock, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { label: 'Available Tokens', value: '750', icon: Unlock, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { label: 'Earned Tokens', value: '1,100', icon: Gem, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { label: 'Spent Tokens', value: '0', icon: ShoppingBag, color: 'text-white/40', bg: 'bg-white/5', border: 'border-white/10' },
];

const history = [
  { date: '07 May 2026', activity: 'Mia Rose qualified referral', type: 'Referral reward', amount: '+50', status: 'Unlocked', statusColor: 'text-green-400' },
  { date: '06 May 2026', activity: 'Ava Stone joined using your link', type: 'Referral reward', amount: '+50', status: 'Locked', statusColor: 'text-orange-400' },
  { date: '05 May 2026', activity: 'Leo James joined using your link', type: 'Referral reward', amount: '+50', status: 'Locked', statusColor: 'text-orange-400' },
  { date: '03 May 2026', activity: 'Nova Luxe qualified referral', type: 'Referral reward', amount: '+50', status: 'Unlocked', statusColor: 'text-green-400' },
  { date: '01 May 2026', activity: 'Early Supporter badge reward', type: 'Tier reward', amount: '+50', status: 'Unlocked', statusColor: 'text-green-400' },
];

export default function ReferTokenWallet() {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Gemini Token Wallet</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {walletCards.map(c => {
          const Icon = c.icon;
          return (
            <div key={c.label} className={`${c.bg} border ${c.border} rounded-2xl p-4`}>
              <Icon className={`w-5 h-5 ${c.color} mb-2`} />
              <div className={`text-2xl font-bold ${c.color}`}>{c.value}</div>
              <div className="text-xs text-white/50 mt-1">{c.label}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-4 py-3 text-xs text-white/50 mb-4">
        🪙 Gemini Tokens are a reward currency only. They are separate from credits and cannot be withdrawn, transferred or exchanged for cash.
      </div>

      <div className="bg-[#2E2249] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs">
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Activity</th>
                <th className="text-left px-4 py-3">Token Type</th>
                <th className="text-right px-4 py-3">Amount</th>
                <th className="text-right px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">{h.date}</td>
                  <td className="px-4 py-3 text-white">{h.activity}</td>
                  <td className="px-4 py-3 text-white/60">{h.type}</td>
                  <td className="px-4 py-3 text-right text-purple-400 font-bold">{h.amount}</td>
                  <td className={`px-4 py-3 text-right font-medium ${h.statusColor}`}>{h.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
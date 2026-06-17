import React from 'react';
import { Lock, Unlock, Clock, Star } from 'lucide-react';

const rewards = [
  {
    name: '50 Gemini Tokens',
    type: 'Referral reward',
    status: 'Locked',
    notes: 'Unlocks when Ava Stone earns $100',
    actionLabel: 'View progress',
    statusColor: 'text-orange-400',
    statusBg: 'bg-orange-500/10 border-orange-500/30',
    icon: Lock,
  },
  {
    name: 'Early Supporter Badge',
    type: 'Badge',
    status: 'Unlocked',
    notes: 'Earned after first qualified referral',
    actionLabel: 'View badge',
    statusColor: 'text-green-400',
    statusBg: 'bg-green-500/10 border-green-500/30',
    icon: Star,
  },
  {
    name: '$25 Founder Upgrade Discount',
    type: 'Founder discount',
    status: 'Available',
    notes: 'Earned after 5 qualified referrals',
    actionLabel: 'Use toward Founder upgrade',
    statusColor: 'text-emerald-400',
    statusBg: 'bg-emerald-500/10 border-emerald-500/30',
    icon: Unlock,
  },
  {
    name: 'Profile Boost',
    type: 'Visibility reward',
    status: 'Pending admin approval',
    notes: 'Earned after 5 qualified referrals',
    actionLabel: 'Awaiting approval',
    statusColor: 'text-amber-400',
    statusBg: 'bg-amber-500/10 border-amber-500/30',
    icon: Clock,
  },
  {
    name: 'Ambassador Badge',
    type: 'Badge',
    status: 'Locked',
    notes: 'Unlocks at 10 qualified referrals',
    actionLabel: 'View tier progress',
    statusColor: 'text-white/30',
    statusBg: 'bg-white/5 border-white/10',
    icon: Lock,
  },
];

export default function ReferRewardWallet() {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Reward Wallet</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map((r, i) => {
          const Icon = r.icon;
          return (
            <div key={i} className="bg-[#2E2249] border border-white/10 rounded-2xl p-5 flex flex-col gap-3 hover:border-purple-500/30 transition-all">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-bold text-white text-sm">{r.name}</div>
                  <div className="text-xs text-white/40 mt-0.5">{r.type}</div>
                </div>
                <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${r.statusBg} ${r.statusColor} whitespace-nowrap`}>
                  <Icon className="w-3 h-3" /> {r.status}
                </span>
              </div>
              <p className="text-xs text-white/50 flex-1">{r.notes}</p>
              <button className="w-full py-2 border border-white/20 hover:border-purple-400/50 rounded-xl text-xs text-white/70 hover:text-white transition-all">
                {r.actionLabel}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
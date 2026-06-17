import React, { useState } from 'react';

const ALL_REFERRALS = [
  { name: 'Mia Rose', type: 'Fan / Customer', status: 'Qualified', rule: 'Spent $20', progress: '$32 spent', yourReward: '50 tokens unlocked', theirReward: '50 tokens unlocked', date: '07 May 2026' },
  { name: 'Ava Stone', type: 'Content Creator', status: 'Verified', rule: 'Complete KYC and earn $100', progress: 'KYC complete, $65 earned', yourReward: '50 tokens locked', theirReward: '50 tokens locked', date: '06 May 2026' },
  { name: 'Leo James', type: 'Fan / Customer', status: 'Pending', rule: 'Spend $20', progress: 'Email verified, $12 spent', yourReward: '50 tokens locked', theirReward: '50 tokens locked', date: '05 May 2026' },
  { name: 'Nova Luxe', type: 'Content Creator', status: 'Qualified', rule: 'KYC complete and $100 earned', progress: '$120 earned', yourReward: '50 tokens unlocked', theirReward: '50 tokens unlocked', date: '03 May 2026' },
  { name: 'Ella Ray', type: 'Fan / Customer', status: 'Rejected', rule: 'Fraud check failed', progress: 'Duplicate signup flagged', yourReward: 'No reward', theirReward: 'No reward', date: '02 May 2026' },
];

const STATUS_STYLE = {
  Pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Verified: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Qualified: 'bg-green-500/20 text-green-400 border-green-500/30',
  Rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function ReferTable() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const filtered = ALL_REFERRALS.filter(r =>
    (statusFilter === 'All' || r.status === statusFilter) &&
    (typeFilter === 'All' || r.type === typeFilter)
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Your Referrals</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
          {['All', 'Pending', 'Verified', 'Qualified', 'Rejected'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${statusFilter === s ? 'bg-purple-600 text-white' : 'text-white/50 hover:text-white'}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
          {['All', 'Fan / Customer', 'Content Creator'].map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${typeFilter === t ? 'bg-purple-600 text-white' : 'text-white/50 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#2E2249] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-xs">
                {['Name', 'Account Type', 'Status', 'Qualification Rule', 'Progress', 'Your Reward', 'Their Reward', 'Date Joined'].map(h => (
                  <th key={h} className="text-left px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-medium text-white">{r.name}</td>
                  <td className="px-4 py-3 text-white/60">{r.type}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_STYLE[r.status]}`}>{r.status}</span>
                  </td>
                  <td className="px-4 py-3 text-white/60 text-xs">{r.rule}</td>
                  <td className="px-4 py-3 text-white/70 text-xs">{r.progress}</td>
                  <td className="px-4 py-3 text-xs">
                    <span className={r.yourReward.includes('unlocked') ? 'text-green-400' : r.yourReward === 'No reward' ? 'text-red-400' : 'text-amber-400'}>
                      {r.yourReward}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className={r.theirReward.includes('unlocked') ? 'text-green-400' : r.theirReward === 'No reward' ? 'text-red-400' : 'text-amber-400'}>
                      {r.theirReward}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-10 text-white/30 text-sm">No referrals match this filter.</div>
        )}
      </div>
    </div>
  );
}
import React from 'react';
import { Users, Clock, CheckCircle, Star, XCircle, Lock, Unlock, Percent } from 'lucide-react';

const stats = [
  { label: 'Total Referrals', value: '12', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { label: 'Pending', value: '3', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { label: 'Verified', value: '4', icon: CheckCircle, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { label: 'Qualified', value: '5', icon: Star, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { label: 'Rejected', value: '0', icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { label: 'Locked Tokens', value: '350', icon: Lock, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { label: 'Available Tokens', value: '750', icon: Unlock, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { label: 'Founder Discount', value: '£25', icon: Percent, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
];

export default function ReferStats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map(s => {
        const Icon = s.icon;
        return (
          <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl p-4`}>
            <Icon className={`w-5 h-5 ${s.color} mb-2`} />
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-white/50 mt-1">{s.label}</div>
          </div>
        );
      })}
    </div>
  );
}
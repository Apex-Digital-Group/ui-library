import React from 'react';
import { CheckCircle, Lock, Gem } from 'lucide-react';

const TIERS = [
  { threshold: 1, rewards: '50 Gemini Tokens and Early Supporter Badge', status: 'Completed' },
  { threshold: 5, rewards: '100 Gemini Tokens, Profile Boost and £25 Founder upgrade discount', status: 'Completed' },
  { threshold: 10, rewards: '250 Gemini Tokens, Ambassador Badge and Priority Platform Access', status: 'In progress' },
  { threshold: 20, rewards: '500 Gemini Tokens, Featured Profile Placement and £100 Founder upgrade discount', status: 'Locked' },
  { threshold: 30, rewards: '1,000 Gemini Tokens, VIP Badge and Founder discount', status: 'Locked' },
  { threshold: 50, rewards: '2,000 Gemini Tokens, Dragon Circle referral status and special perks', status: 'Locked' },
];

const qualified = 5;
const next = 10;

export default function ReferTierProgress() {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Referral Tier Progress</h2>

      <div className="bg-[#2E2249] border border-white/10 rounded-2xl p-6 space-y-5">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/60">{qualified} of {next} qualified referrals completed</span>
            <span className="text-purple-400 font-semibold">{Math.round((qualified / next) * 100)}%</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all" style={{ width: `${(qualified / next) * 100}%` }} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-2 text-sm">
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2">
            <span className="text-white/50 text-xs">Current tier:</span>
            <div className="text-green-400 font-medium">Profile Boost unlocked</div>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl px-4 py-2">
            <span className="text-white/50 text-xs">Next tier:</span>
            <div className="text-purple-300 font-medium">Ambassador Badge and Priority Platform Access</div>
          </div>
        </div>

        {/* Tier Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TIERS.map((t, i) => {
            const isCompleted = t.status === 'Completed';
            const isInProgress = t.status === 'In progress';
            const isLocked = t.status === 'Locked';
            return (
              <div key={i} className={`rounded-xl p-4 border transition-all
                ${isCompleted ? 'bg-green-500/10 border-green-500/30' :
                  isInProgress ? 'bg-purple-500/10 border-purple-500/30' :
                  'bg-white/5 border-white/10 opacity-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-bold text-sm">{t.threshold} Referral{t.threshold > 1 ? 's' : ''}</span>
                  {isCompleted ? <CheckCircle className="w-4 h-4 text-green-400" /> :
                   isInProgress ? <Gem className="w-4 h-4 text-purple-400" /> :
                   <Lock className="w-4 h-4 text-white/30" />}
                </div>
                <p className="text-xs text-white/50 mb-2">{t.rewards}</p>
                <span className={`text-xs font-medium
                  ${isCompleted ? 'text-green-400' : isInProgress ? 'text-purple-400' : 'text-white/30'}`}>
                  {t.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
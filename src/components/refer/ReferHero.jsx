import React from 'react';
import { Gift, ShieldCheck } from 'lucide-react';

export default function ReferHero() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="flex items-center gap-1.5 px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-xs font-medium text-purple-300">
          <Gift className="w-3 h-3" /> Content Creator
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1 bg-green-600/20 border border-green-500/30 rounded-full text-xs font-medium text-green-300">
          <ShieldCheck className="w-3 h-3" /> KYC Completed
        </span>
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
        Refer a Friend
      </h1>
      <p className="text-white/60 max-w-2xl text-base leading-relaxed">
        Invite Fans and Content Creators to join Live Gemini. Earn locked Gemini Tokens when someone joins using your referral link. Tokens unlock when the referred user completes real platform activity.
      </p>
    </div>
  );
}
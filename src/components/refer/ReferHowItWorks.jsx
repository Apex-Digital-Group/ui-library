import React from 'react';
import { Heart, Video } from 'lucide-react';

export default function ReferHowItWorks() {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">How Rewards Unlock</h2>
      <div className="grid md:grid-cols-2 gap-4">

        {/* Fan Card */}
        <div className="bg-[#2E2249] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-400" />
            <h3 className="font-bold text-white">When you refer a Fan / Customer</h3>
          </div>
          <p className="text-sm text-white/60">
            A Fan / Customer referral qualifies when the referred user verifies their email, buys credits and spends at least $20 on the platform.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-1 text-sm">
            <div className="text-white/40 text-xs mb-2 font-semibold uppercase tracking-wider">Reward</div>
            <div className="text-green-400">✓ You unlock 50 Gemini Tokens</div>
            <div className="text-green-400">✓ They unlock 50 Gemini Tokens</div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 space-y-2 text-sm">
            <div className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-2">Progress Example</div>
            <div className="flex justify-between"><span className="text-white/60">Status</span><span className="text-amber-400 font-medium">Pending spend</span></div>
            <div className="flex justify-between"><span className="text-white/60">Spend required</span><span className="text-white">$20</span></div>
            <div className="flex justify-between"><span className="text-white/60">Current spend</span><span className="text-white">$12</span></div>
            <div className="flex justify-between"><span className="text-white/60">Remaining</span><span className="text-orange-400">$8</span></div>
            <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
        </div>

        {/* Creator Card */}
        <div className="bg-[#2E2249] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-white">When you refer a Content Creator</h3>
          </div>
          <p className="text-sm text-white/60">
            A Content Creator referral qualifies when the referred creator verifies their email, completes creator setup, completes KYC and earns at least $100 on the platform.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-1 text-sm">
            <div className="text-white/40 text-xs mb-2 font-semibold uppercase tracking-wider">Reward</div>
            <div className="text-green-400">✓ You unlock 50 Gemini Tokens</div>
            <div className="text-green-400">✓ They unlock 50 Gemini Tokens</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2 text-sm">
            <div className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-2">Progress Example</div>
            <div className="flex justify-between"><span className="text-white/60">Status</span><span className="text-blue-400 font-medium">Pending earnings</span></div>
            <div className="flex justify-between"><span className="text-white/60">Earnings required</span><span className="text-white">$100</span></div>
            <div className="flex justify-between"><span className="text-white/60">Current earnings</span><span className="text-white">$65</span></div>
            <div className="flex justify-between"><span className="text-white/60">Remaining</span><span className="text-orange-400">$35</span></div>
            <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '65%' }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
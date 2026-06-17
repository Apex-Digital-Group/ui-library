import React, { useState } from 'react';
import { Percent } from 'lucide-react';

const FOUNDER_TIERS = [
  { name: 'Core Supporter', price: '$25+' },
  { name: 'Performer Power', price: '$250+' },
  { name: 'Creator Accelerator', price: '$500+' },
  { name: 'Executive Creator', price: '$1,000+' },
  { name: 'Legendary Founder', price: '$2,500+' },
  { name: 'Dragon Circle', price: '$5,000+' },
];

export default function ReferFounderDiscount() {
  const [showTiers, setShowTiers] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Founder Upgrade Discount</h2>
      <div className="bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border border-pink-500/20 rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-pink-500/20 border border-pink-500/30 rounded-2xl flex items-center justify-center">
            <Percent className="w-8 h-8 text-pink-400" />
          </div>
          <div>
            <div className="text-xs text-white/40">Available Founder Upgrade Discount</div>
            <div className="text-4xl font-bold text-pink-400">$25</div>
          </div>
        </div>

        <p className="text-sm text-white/60">
          You have earned this discount through qualified referrals. This is not a cash reward and can only be used toward a paid Founders Club upgrade.
        </p>

        <button onClick={() => setShowTiers(!showTiers)}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-xl text-white font-bold text-sm transition-all">
          Use Discount Toward Founder Upgrade
        </button>

        {showTiers && (
          <div className="space-y-3">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {FOUNDER_TIERS.map((t, i) => (
                <div key={i} className="bg-white/5 border border-white/10 hover:border-pink-500/30 rounded-xl p-4 flex items-center justify-between transition-all cursor-pointer">
                  <div>
                    <div className="font-semibold text-white text-sm">{t.name}</div>
                    <div className="text-xs text-pink-400">{t.price}</div>
                  </div>
                  <button className="text-xs px-3 py-1.5 bg-pink-600/20 border border-pink-500/30 text-pink-300 rounded-lg hover:bg-pink-600/40 transition-all">
                    Select
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-white/40">
              If a user upgrades later, they only pay the difference between their current Founder tier and the new tier.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
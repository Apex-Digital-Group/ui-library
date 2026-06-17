import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const ALLOWED = [
  'Profile boosts',
  'Featured creator slots',
  'Featured content slots',
  'Platform promotion placements',
  'Advertising discounts',
  'Voodoo shop discounts',
  'Campaign inclusion',
  'Limited visibility upgrades',
  'Partial discounts on approved purchases',
];

const BLOCKED = [
  'Cash withdrawal',
  'Creator payouts',
  'Buying private shows directly',
  'Replacing credits',
  'Normal account access',
  'Transfers between users',
  'Anything investment related',
];

export default function ReferTokenRules() {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-[#2E2249] border border-white/10 rounded-2xl p-5">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" /> What Gemini Tokens Can Be Used For
          </h3>
          <ul className="space-y-2">
            {ALLOWED.map(a => (
              <li key={a} className="flex items-center gap-2 text-sm text-white/70">
                <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#2E2249] border border-white/10 rounded-2xl p-5">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-400" /> What Gemini Tokens Cannot Be Used For
          </h3>
          <ul className="space-y-2">
            {BLOCKED.map(b => (
              <li key={b} className="flex items-center gap-2 text-sm text-white/70">
                <XCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
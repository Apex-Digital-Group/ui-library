import React from 'react';
import { FileText } from 'lucide-react';

export default function ReferLegalFooter() {
  return (
    <div className="bg-white/3 border border-white/10 rounded-2xl p-5 flex gap-3">
      <FileText className="w-4 h-4 text-white/30 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-white/30 leading-relaxed">
        Founder tiers are perk-based memberships only. No equity, shares or ownership are included. Rewards have no cash value. Gemini Tokens cannot be withdrawn or exchanged for cash. Tokens are separate from credits. Perks are subject to availability and may be updated. Investor Interest is separate and only records an expression of interest.
      </p>
    </div>
  );
}
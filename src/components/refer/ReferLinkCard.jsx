import React, { useState } from 'react';
import { Copy, Twitter, MessageCircle, Mail, Check, Link } from 'lucide-react';

const REFERRAL_CODE = 'GEMINI123';
const REFERRAL_LINK = 'livegemini.app/signup?ref=GEMINI123';

export default function ReferLinkCard() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const copy = (text, setCopied) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border border-purple-500/20 rounded-2xl p-6 space-y-5">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <Link className="w-5 h-5 text-purple-400" /> Your Referral Link
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="text-xs text-white/40 mb-1">Referral Code</div>
          <div className="text-lg font-mono font-bold text-purple-300">{REFERRAL_CODE}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="text-xs text-white/40 mb-1">Referral Link</div>
          <div className="text-sm font-mono text-white/80 truncate">{REFERRAL_LINK}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={() => copy(REFERRAL_LINK, setCopiedLink)}
          className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-medium text-white transition-all">
          {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copiedLink ? 'Copied!' : 'Copy Referral Link'}
        </button>
        <button onClick={() => copy(REFERRAL_CODE, setCopiedCode)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-medium text-white transition-all">
          {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copiedCode ? 'Copied!' : 'Copy Referral Code'}
        </button>
        <button onClick={() => alert('Share on X placeholder')}
          className="flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-black/80 border border-white/20 rounded-xl text-sm font-medium text-white transition-all">
          <Twitter className="w-4 h-4" /> Share on X
        </button>
        <button onClick={() => alert('Share on WhatsApp placeholder')}
          className="flex items-center gap-2 px-4 py-2.5 bg-green-700 hover:bg-green-800 rounded-xl text-sm font-medium text-white transition-all">
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </button>
        <button onClick={() => alert('Share by Email placeholder')}
          className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-medium text-white transition-all">
          <Mail className="w-4 h-4" /> Share by Email
        </button>
      </div>

      <p className="text-xs text-white/40 bg-yellow-500/5 border border-yellow-500/20 rounded-lg px-3 py-2">
        ⚠️ Your rewards do not unlock just because someone signs up. Rewards unlock when the referred user completes the correct qualifying action.
      </p>
    </div>
  );
}
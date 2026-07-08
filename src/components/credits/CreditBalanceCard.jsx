import React from "react";
import { Sparkles, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "../../lib/utils";

const defaultFormat = (n) => Number(n || 0).toFixed(2);

/**
 * Credit balance hero card — big balance number + "Buy Credits" CTA + spend/
 * top-up summary pills. Tailwind.
 *
 * @param {object} props
 * @param {number} [props.balance=0] @param {string} [props.creditLabel='credits']
 * @param {string} [props.title='Your Credit Balance']
 * @param {number} [props.totalSpent] Renders a spent pill when set.
 * @param {number} [props.totalPurchased] Renders a top-up pill when set.
 * @param {string} [props.buyLabel='Buy Credits'] @param {() => void} [props.onBuyCredits]
 * @param {(n:number)=>string} [props.formatAmount]
 * @param {string} [props.spentLabel='Total spent'] @param {string} [props.purchasedLabel='Total purchased']
 * @param {string} [props.className]
 */
export default function CreditBalanceCard({
  balance = 0,
  creditLabel = "credits",
  title = "Your Credit Balance",
  totalSpent,
  totalPurchased,
  buyLabel = "Buy Credits",
  onBuyCredits,
  formatAmount = defaultFormat,
  spentLabel = "Total spent",
  purchasedLabel = "Total purchased",
  className = "",
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600/30 via-[#2E2249] to-[#1a0e2e] border border-purple-500/30 p-6 md:p-8", className)}>
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl" />
      <div className="relative">
        <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          {title}
        </div>
        <div className="flex items-end gap-3 mb-6">
          <span className="text-5xl md:text-6xl font-extrabold tracking-tight text-white">{formatAmount(balance)}</span>
          <span className="text-lg text-white/50 mb-2">{creditLabel}</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {onBuyCredits && (
            <button type="button" onClick={onBuyCredits}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-xl font-semibold text-white transition-all shadow-lg shadow-purple-500/20">
              <Plus className="w-5 h-5" />
              {buyLabel}
            </button>
          )}
          {totalPurchased != null && (
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white/60">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span>{purchasedLabel}: <span className="text-white font-semibold">{formatAmount(totalPurchased)} {creditLabel}</span></span>
            </div>
          )}
          {totalSpent != null && (
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white/60">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <span>{spentLabel}: <span className="text-white font-semibold">{formatAmount(totalSpent)} {creditLabel}</span></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

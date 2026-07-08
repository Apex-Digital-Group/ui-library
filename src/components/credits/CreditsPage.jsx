import React from "react";
import { Image, Video, Camera, Heart } from "lucide-react";
import { cn } from "../../lib/utils";
import CreditBalanceCard from "./CreditBalanceCard";
import CreditStatsGrid, { defaultCreditStats } from "./CreditStatsGrid";
import PurchaseHistory, { defaultCreditFilters, defaultCreditTransactions } from "./PurchaseHistory";
import CreditInfoNote from "./CreditInfoNote";

const defaultFormat = (n) => Number(n || 0).toFixed(2);

/** type → display meta, used to derive the stats grid from transactions. */
const CATEGORY_META = {
  photo: { label: "Photos", icon: Image, color: "blue" },
  video: { label: "Videos", icon: Video, color: "purple" },
  live_cam: { label: "Live Cams", icon: Camera, color: "red" },
  tip: { label: "Tips", icon: Heart, color: "pink" },
};

function deriveStats(transactions) {
  const totals = {};
  transactions.forEach((t) => {
    if (t.direction === "in") return;
    totals[t.type] = (totals[t.type] || 0) + Number(t.amount || 0);
  });
  return Object.keys(CATEGORY_META)
    .filter((k) => totals[k] != null)
    .map((k) => ({ key: k, amount: totals[k], ...CATEGORY_META[k] }));
}

/**
 * Full-width Credits page — a pure composition of library pieces:
 * CreditBalanceCard + CreditStatsGrid + PurchaseHistory + CreditInfoNote. No
 * built-in title bar (the host app owns the header). Fully parameterized. Tailwind.
 *
 * The "Buy Credits" button fires `onBuyCredits` — route it to your buy modal/page.
 *
 * @param {object} props
 * @param {number} [props.balance=277.99] @param {string} [props.creditLabel='credits']
 * @param {Array} [props.transactions] @param {Array} [props.stats] @param {Array} [props.filters]
 * @param {number} [props.totalSpent] @param {number} [props.totalPurchased]
 * @param {() => void} [props.onBuyCredits] @param {(tx:object)=>void} [props.onTransactionClick]
 * @param {(n:number)=>string} [props.formatAmount] @param {(d:any)=>string} [props.formatDate]
 * @param {React.ReactNode} [props.footerNote] Replaces the default note; null hides it.
 * @param {number|string} [props.maxWidth] Optional content max-width. Full-width by default.
 * @param {string} [props.className]
 */
export default function CreditsPage({
  balance = 277.99,
  creditLabel = "credits",
  transactions = defaultCreditTransactions,
  stats,
  filters = defaultCreditFilters,
  totalSpent,
  totalPurchased,
  onBuyCredits,
  onTransactionClick,
  formatAmount = defaultFormat,
  formatDate = (d) => d,
  footerNote,
  maxWidth,
  className = "",
}) {
  const resolvedStats = stats ?? (transactions.length ? deriveStats(transactions) : defaultCreditStats);
  const resolvedSpent = totalSpent ?? transactions
    .filter((t) => t.direction !== "in")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const mainStyle = maxWidth ? { maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth } : undefined;

  return (
    <div className={cn("w-full min-h-screen bg-[#1a0e2e] text-white", className)}>
      <main className={cn("w-full px-4 md:px-6 py-6 md:py-8 space-y-6", maxWidth && "mx-auto")} style={mainStyle}>
        <CreditBalanceCard
          balance={balance}
          creditLabel={creditLabel}
          totalSpent={resolvedSpent}
          totalPurchased={totalPurchased}
          onBuyCredits={onBuyCredits}
          formatAmount={formatAmount}
        />
        <CreditStatsGrid stats={resolvedStats} formatAmount={formatAmount} />
        <PurchaseHistory
          transactions={transactions}
          filters={filters}
          onTransactionClick={onTransactionClick}
          formatAmount={formatAmount}
          formatDate={formatDate}
        />
        {footerNote === null ? null : (footerNote ?? <CreditInfoNote />)}
      </main>
    </div>
  );
}

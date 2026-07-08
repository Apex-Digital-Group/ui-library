import React from "react";
import { Image, Video, Camera, Heart } from "lucide-react";
import CreditBalanceCard from "./CreditBalanceCard";
import CreditStatsGrid, { defaultCreditStats } from "./CreditStatsGrid";
import PurchaseHistory, { defaultCreditFilters, defaultCreditTransactions } from "./PurchaseHistory";
import CreditInfoNote from "./CreditInfoNote";
import "./CreditsPage.css";

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
    if (t.direction === "in") return; // only spends
    totals[t.type] = (totals[t.type] || 0) + Number(t.amount || 0);
  });
  return Object.keys(CATEGORY_META)
    .filter((k) => totals[k] != null)
    .map((k) => ({ key: k, amount: totals[k], ...CATEGORY_META[k] }));
}

/**
 * Full-width Credits page — a pure composition of library pieces:
 * CreditBalanceCard + CreditStatsGrid (CreditStatCard) + PurchaseHistory
 * (CreditFilters + TransactionCard) + CreditInfoNote. No built-in title bar —
 * the host app owns the page header. Fully parameterized; host-agnostic scoped CSS.
 *
 * The "Buy Credits" button fires `onBuyCredits` — route it to your BuyCreditsPage.
 *
 * @param {object} props
 * @param {number} [props.balance=277.99] Credit balance.
 * @param {string} [props.creditLabel='credits']
 * @param {Array}  [props.transactions] Ledger rows (see PurchaseHistory).
 * @param {Array}  [props.stats] Spend cards; derived from `transactions` when omitted.
 * @param {Array}  [props.filters] History filter tabs.
 * @param {number} [props.totalSpent] Override; defaults to the sum of spend rows.
 * @param {number} [props.totalPurchased] Optional top-up total for a second pill.
 * @param {() => void} [props.onBuyCredits] CTA handler (navigate to the buy page).
 * @param {(tx:object)=>void} [props.onTransactionClick]
 * @param {(n:number)=>string} [props.formatAmount]
 * @param {(d:any)=>string} [props.formatDate]
 * @param {React.ReactNode} [props.footerNote] Replaces the default CreditInfoNote. Pass null to hide the note entirely.
 * @param {number|string} [props.maxWidth] Optional content max-width (e.g. 1024). Full-width by default.
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
    <div className={`bond-credits-page ${className}`.trim()}>
      <main className={`bond-credits-page__main${maxWidth ? " is-bounded" : ""}`} style={mainStyle}>
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

import React from "react";
import { Coins, ArrowLeft, Sparkles, Image, Video, Camera, Heart } from "lucide-react";
import CreditBalanceCard from "./CreditBalanceCard";
import CreditStatsGrid, { defaultCreditStats } from "./CreditStatsGrid";
import PurchaseHistory, { defaultCreditFilters, defaultCreditTransactions } from "./PurchaseHistory";
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
 * Full-width Credits page — balance hero + spend-by-category stats + filterable
 * purchase history + a "how credits work" note. Drop-in and fully parameterized:
 * pass your balance, transactions, and handlers. Host-agnostic scoped CSS.
 *
 * The "Buy Credits" button fires `onBuyCredits` — route it to your BuyCreditsPage.
 *
 * @param {object} props
 * @param {boolean} [props.showHeader=false] Render the built-in "Credits" title bar. Off by default — a standalone page lets the app shell own the header.
 * @param {string} [props.title='Credits'] Header title (only shown when showHeader).
 * @param {number} [props.balance=277.99] Credit balance.
 * @param {string} [props.creditLabel='credits']
 * @param {Array}  [props.transactions] Ledger rows (see PurchaseHistory).
 * @param {Array}  [props.stats] Spend cards; derived from `transactions` when omitted.
 * @param {Array}  [props.filters] History filter tabs.
 * @param {number} [props.totalSpent] Override; defaults to the sum of spend rows.
 * @param {number} [props.totalPurchased] Optional top-up total for a second pill.
 * @param {() => void} [props.onBuyCredits] CTA handler (navigate to the buy page).
 * @param {() => void} [props.onBack] Optional back handler — renders a back arrow only when set.
 * @param {string} [props.backHref] Optional back link (used only if `onBack` is omitted). No back arrow by default.
 * @param {(tx:object)=>void} [props.onTransactionClick]
 * @param {(n:number)=>string} [props.formatAmount]
 * @param {(d:any)=>string} [props.formatDate]
 * @param {React.ReactNode} [props.footerNote] Custom footer; a default note renders when omitted.
 * @param {number|string} [props.maxWidth] Optional content max-width (e.g. 1024). Full-width by default.
 * @param {string} [props.className]
 */
export default function CreditsPage({
  showHeader = false,
  title = "Credits",
  balance = 277.99,
  creditLabel = "credits",
  transactions = defaultCreditTransactions,
  stats,
  filters = defaultCreditFilters,
  totalSpent,
  totalPurchased,
  onBuyCredits,
  onBack,
  backHref,
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
      {/* The title bar is opt-in — a standalone page lets the app shell own the
          header. Pass showHeader to render the built-in "Credits" bar; pass
          onBack (or backHref) to add a back arrow to it. */}
      {showHeader && (
        <header className="bond-credits-page__header">
          <div className="bond-credits-page__header-inner">
            {onBack && (
              <button type="button" className="bond-credits-page__back" onClick={onBack} aria-label="Back">
                <ArrowLeft className="bond-credits-page__back-icon" aria-hidden="true" />
              </button>
            )}
            {!onBack && backHref && (
              <a href={backHref} className="bond-credits-page__back" aria-label="Back">
                <ArrowLeft className="bond-credits-page__back-icon" aria-hidden="true" />
              </a>
            )}
            <div className="bond-credits-page__brand">
              <Coins className="bond-credits-page__brand-icon" aria-hidden="true" />
              <h1 className="bond-credits-page__brand-title">{title}</h1>
            </div>
          </div>
        </header>
      )}

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

        {footerNote !== null && (
          <div className="bond-credits-page__note">
            <Sparkles className="bond-credits-page__note-icon" aria-hidden="true" />
            {footerNote ?? (
              <p>
                <strong>How Credits Work: </strong>
                1 credit = $1 of platform value. Use credits to unlock photos, videos, access live cam
                sessions, and tip your favourite creators.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

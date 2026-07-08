import React from "react";
import { cn } from "../../lib/utils";
import CreditFilters, { defaultCreditFilters } from "./CreditFilters";
import TransactionCard, { TRANSACTION_TYPE_META } from "./TransactionCard";

// Re-exported for back-compat.
export { defaultCreditFilters } from "./CreditFilters";

const defaultFormat = (n) => Number(n || 0).toFixed(2);

/** Default sample ledger; icon/label/colour derive from `type` via TransactionCard. */
export const defaultCreditTransactions = [
  { id: 1, type: "tip", creator: "Ahri", amount: 15, date: "2026-07-08 11:42" },
  { id: 2, type: "live_cam", creator: "Sassy Sarah", amount: 45, date: "2026-07-08 10:15" },
  { id: 3, type: "photo", creator: "Lola Lollipop", amount: 10, date: "2026-07-07 22:30" },
  { id: 4, type: "video", creator: "Candy Crush", amount: 25, date: "2026-07-07 19:05" },
  { id: 5, type: "tip", creator: "Vixen Victoria", amount: 5, date: "2026-07-07 18:20" },
];

/**
 * Purchase / spending history — {@link CreditFilters} over {@link TransactionCard}
 * rows. Uncontrolled or controlled (`activeFilter`+`onFilterChange`). Tailwind.
 *
 * @param {object} props
 * @param {string} [props.title='Purchase History']
 * @param {Array} [props.transactions] @param {Array} [props.filters] @param {object} [props.typeMeta]
 * @param {string} [props.activeFilter] @param {string} [props.defaultFilter='all']
 * @param {(key:string)=>void} [props.onFilterChange] @param {(tx:object)=>void} [props.onTransactionClick]
 * @param {(n:number)=>string} [props.formatAmount] @param {(d:any)=>string} [props.formatDate]
 * @param {string} [props.emptyText] @param {string} [props.className]
 */
export default function PurchaseHistory({
  title = "Purchase History",
  transactions = defaultCreditTransactions,
  filters = defaultCreditFilters,
  typeMeta = TRANSACTION_TYPE_META,
  activeFilter,
  defaultFilter = "all",
  onFilterChange,
  onTransactionClick,
  formatAmount = defaultFormat,
  formatDate = (d) => d,
  emptyText,
  className = "",
}) {
  const [internal, setInternal] = React.useState(defaultFilter);
  const active = activeFilter != null ? activeFilter : internal;
  const setFilter = (key) => {
    if (activeFilter == null) setInternal(key);
    onFilterChange?.(key);
  };

  const filtered = active === "all" ? transactions : transactions.filter((t) => t.type === active);
  const activeLabel = filters.find((f) => f.key === active)?.label?.toLowerCase();
  const empty = emptyText ?? `No ${active !== "all" && activeLabel ? activeLabel + " " : ""}purchases yet.`;

  return (
    <div className={cn("w-full", className)}>
      {title ? <h2 className="text-lg font-bold text-white mb-4">{title}</h2> : null}
      <CreditFilters filters={filters} activeFilter={active} onChange={setFilter} ariaLabel={title || "Filter"} className="mb-4" />
      <div className="space-y-2">
        {filtered.length === 0 && <div className="text-center py-12 text-white/40 text-sm">{empty}</div>}
        {filtered.map((tx) => (
          <TransactionCard
            key={tx.id}
            transaction={tx}
            typeMeta={typeMeta}
            onClick={onTransactionClick}
            formatAmount={formatAmount}
            formatDate={formatDate}
          />
        ))}
      </div>
    </div>
  );
}

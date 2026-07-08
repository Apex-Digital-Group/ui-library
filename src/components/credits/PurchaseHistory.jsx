import React from "react";
import CreditFilters, { defaultCreditFilters } from "./CreditFilters";
import TransactionCard, { TRANSACTION_TYPE_META } from "./TransactionCard";
import "./PurchaseHistory.css";

// Re-exported for back-compat: `import { defaultCreditFilters } from '@bond/lib/credits/PurchaseHistory'`.
export { defaultCreditFilters } from "./CreditFilters";

const defaultFormat = (n) => Number(n || 0).toFixed(2);

/** Default sample ledger so the component renders standalone in Storybook.
 * Icon / label / colour are derived from `type` via TransactionCard. */
export const defaultCreditTransactions = [
  { id: 1, type: "tip", creator: "Ahri", amount: 15, date: "2026-07-08 11:42" },
  { id: 2, type: "live_cam", creator: "Sassy Sarah", amount: 45, date: "2026-07-08 10:15" },
  { id: 3, type: "photo", creator: "Lola Lollipop", amount: 10, date: "2026-07-07 22:30" },
  { id: 4, type: "video", creator: "Candy Crush", amount: 25, date: "2026-07-07 19:05" },
  { id: 5, type: "tip", creator: "Vixen Victoria", amount: 5, date: "2026-07-07 18:20" },
];

/**
 * Purchase / spending history — a {@link CreditFilters} bar over a list of
 * {@link TransactionCard} rows. Uncontrolled (internal filter state) or
 * controlled (`activeFilter` + `onFilterChange`). Host-agnostic scoped CSS.
 *
 * @param {object} props
 * @param {string} [props.title='Purchase History']
 * @param {Array} [props.transactions] See TransactionCard for the item shape.
 * @param {Array} [props.filters] Filter tabs `{ key, label, icon? }`; `all` shows everything.
 * @param {object} [props.typeMeta] type → `{ label, icon, color }` passed to each row.
 * @param {string} [props.activeFilter] Controlled active key (omit for uncontrolled).
 * @param {string} [props.defaultFilter='all'] Initial key when uncontrolled.
 * @param {(key:string)=>void} [props.onFilterChange]
 * @param {(tx:object)=>void} [props.onTransactionClick]
 * @param {(n:number)=>string} [props.formatAmount]
 * @param {(d:any)=>string} [props.formatDate]
 * @param {string} [props.emptyText] Override the empty-state copy.
 * @param {string} [props.className]
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
    <div className={`bond-credit-history ${className}`.trim()}>
      {title ? <h2 className="bond-credit-history__title">{title}</h2> : null}

      <CreditFilters
        filters={filters}
        activeFilter={active}
        onChange={setFilter}
        ariaLabel={title || "Filter"}
        className="bond-credit-history__filters"
      />

      <div className="bond-credit-history__list">
        {filtered.length === 0 && <div className="bond-credit-history__empty">{empty}</div>}
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

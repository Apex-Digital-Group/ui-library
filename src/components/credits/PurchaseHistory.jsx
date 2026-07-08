import React from "react";
import { Sparkles, Image, Video, Camera, Heart } from "lucide-react";
import TransactionCard, { TRANSACTION_TYPE_META } from "./TransactionCard";
import "./PurchaseHistory.css";

const defaultFormat = (n) => Number(n || 0).toFixed(2);

/** Default filter tabs. */
export const defaultCreditFilters = [
  { key: "all", label: "All", icon: Sparkles },
  { key: "photo", label: "Photos", icon: Image },
  { key: "video", label: "Videos", icon: Video },
  { key: "live_cam", label: "Live Cams", icon: Camera },
  { key: "tip", label: "Tips", icon: Heart },
];

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
 * Purchase / spending history — filter chips over a list of transaction rows.
 * Works uncontrolled (internal filter state) or controlled (`activeFilter` +
 * `onFilterChange`). Host-agnostic scoped CSS.
 *
 * @param {object} props
 * @param {string} [props.title='Purchase History']
 * @param {Array} [props.transactions] Items: `{ id, type, creator, amount, date, icon?, color?, direction? }`.
 *   `direction` ∈ 'out'(default)|'in' controls the −/+ sign + colour.
 * @param {Array} [props.filters] Filter tabs: `{ key, label, icon? }`. `key==='all'` shows everything.
 * @param {string} [props.activeFilter] Controlled active filter key (omit for uncontrolled).
 * @param {string} [props.defaultFilter='all'] Initial filter when uncontrolled.
 * @param {(key:string)=>void} [props.onFilterChange]
 * @param {(tx:object)=>void} [props.onTransactionClick] Row click (adds hover/pointer when set).
 * @param {(n:number)=>string} [props.formatAmount] Amount formatter (default: 2dp).
 * @param {(date:any)=>string} [props.formatDate] Date formatter (default: as-is).
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
      <h2 className="bond-credit-history__title">{title}</h2>

      <div className="bond-credit-history__filters" role="tablist" aria-label={title}>
        {filters.map((f) => {
          const Icon = f.icon;
          const on = active === f.key;
          return (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={on}
              className={`bond-credit-history__chip${on ? " is-active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {Icon ? <Icon className="bond-credit-history__chip-icon" aria-hidden="true" /> : null}
              {f.label}
            </button>
          );
        })}
      </div>

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

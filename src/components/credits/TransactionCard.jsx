import React from "react";
import { Image, Video, Camera, Heart, Coins } from "lucide-react";
import "./TransactionCard.css";

const defaultFormat = (n) => Number(n || 0).toFixed(2);

/**
 * type → display meta (label + icon + colour). Override via the `typeMeta` prop
 * to add or relabel transaction types.
 */
export const TRANSACTION_TYPE_META = {
  tip: { label: "Tip Purchase", icon: Heart, color: "pink" },
  live_cam: { label: "Live Cam Purchase", icon: Camera, color: "red" },
  photo: { label: "Photo Purchase", icon: Image, color: "blue" },
  video: { label: "Video Purchase", icon: Video, color: "purple" },
  topup: { label: "Top-up", icon: Coins, color: "green" },
};

const titleCase = (s) =>
  String(s || "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * A single credit transaction card — icon chip, creator/title, type label, and
 * a signed amount + date. Type meta (label/icon/colour) is derived from
 * `transaction.type` via `typeMeta`, but any field on the transaction overrides
 * it. Host-agnostic scoped CSS.
 *
 * @param {object} props
 * @param {object} props.transaction `{ id, type, creator, amount, date, direction?, icon?, color?, label?, subtitle? }`.
 *   `direction` ∈ 'out'(default)|'in' sets the −/+ sign + colour. `icon`/`color`/`label`
 *   override the derived type meta.
 * @param {object} [props.typeMeta=TRANSACTION_TYPE_META] type → `{ label, icon, color }`.
 * @param {(tx:object)=>void} [props.onClick] Makes the card clickable (pointer + keyboard).
 * @param {(n:number)=>string} [props.formatAmount] Amount formatter (default: 2dp).
 * @param {(d:any)=>string} [props.formatDate] Date formatter (default: as-is).
 * @param {string} [props.className]
 */
export default function TransactionCard({
  transaction,
  typeMeta = TRANSACTION_TYPE_META,
  onClick,
  formatAmount = defaultFormat,
  formatDate = (d) => d,
  className = "",
}) {
  const tx = transaction || {};
  const meta = typeMeta[tx.type] || {};
  const Icon = tx.icon || meta.icon;
  const color = tx.color || meta.color || "purple";
  const label = tx.label || meta.label || `${titleCase(tx.type)} Purchase`;
  const incoming = tx.direction === "in";
  const clickable = typeof onClick === "function";

  return (
    <div
      className={`bond-txn-card bond-txn-card--${color}${clickable ? " is-clickable" : ""} ${className}`.trim()}
      onClick={clickable ? () => onClick(tx) : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={
        clickable
          ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(tx); } }
          : undefined
      }
    >
      <div className="bond-txn-card__icon">
        {Icon ? <Icon className="bond-txn-card__glyph" aria-hidden="true" /> : null}
      </div>
      <div className="bond-txn-card__main">
        <div className="bond-txn-card__creator">{tx.creator}</div>
        <div className="bond-txn-card__type">{tx.subtitle || label}</div>
      </div>
      <div className="bond-txn-card__meta">
        <div className={`bond-txn-card__amount${incoming ? " is-in" : " is-out"}`}>
          {incoming ? "+" : "−"}{formatAmount(tx.amount)}
        </div>
        {tx.date != null && <div className="bond-txn-card__date">{formatDate(tx.date)}</div>}
      </div>
    </div>
  );
}

import React from "react";
import { Image, Video, Camera, Heart, Coins } from "lucide-react";
import { cn } from "../../lib/utils";
import { creditChip } from "./creditColors";

const defaultFormat = (n) => Number(n || 0).toFixed(2);

/** type → display meta (label + icon + colour). Override via `typeMeta`. */
export const TRANSACTION_TYPE_META = {
  tip: { label: "Tip Purchase", icon: Heart, color: "pink" },
  live_cam: { label: "Live Cam Purchase", icon: Camera, color: "red" },
  photo: { label: "Photo Purchase", icon: Image, color: "blue" },
  video: { label: "Video Purchase", icon: Video, color: "purple" },
  topup: { label: "Top-up", icon: Coins, color: "green" },
};

const titleCase = (s) => String(s || "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * A single credit transaction card — icon chip, creator/title, type label, and
 * a signed amount + date. Meta derives from `transaction.type`; per-item fields
 * override. Tailwind.
 *
 * @param {object} props
 * @param {object} props.transaction `{ id, type, creator, amount, date, direction?, icon?, color?, label?, subtitle? }`.
 * @param {object} [props.typeMeta=TRANSACTION_TYPE_META]
 * @param {(tx:object)=>void} [props.onClick] Makes the card clickable.
 * @param {(n:number)=>string} [props.formatAmount] @param {(d:any)=>string} [props.formatDate]
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
  const c = creditChip(tx.color || meta.color || "purple");
  const label = tx.label || meta.label || `${titleCase(tx.type)} Purchase`;
  const incoming = tx.direction === "in";
  const clickable = typeof onClick === "function";

  return (
    <div
      className={cn(
        "flex items-center gap-4 p-3 md:p-4 rounded-xl bg-white/5 border border-white/10 transition-colors",
        clickable && "cursor-pointer hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-500/60",
        className,
      )}
      onClick={clickable ? () => onClick(tx) : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(tx); } } : undefined}
    >
      <div className={cn("w-11 h-11 rounded-xl ring-1 flex items-center justify-center flex-shrink-0", c.bg, c.ring)}>
        {Icon ? <Icon className={cn("w-5 h-5", c.text)} /> : null}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate text-white">{tx.creator}</div>
        <div className="text-xs text-white/40 capitalize">{tx.subtitle || label}</div>
      </div>
      <div className="text-right flex-shrink-0">
        <div className={cn("font-bold text-sm", incoming ? "text-green-400" : "text-red-400")}>
          {incoming ? "+" : "−"}{formatAmount(tx.amount)}
        </div>
        {tx.date != null && <div className="text-[10px] text-white/35">{formatDate(tx.date)}</div>}
      </div>
    </div>
  );
}

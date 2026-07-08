import React from "react";
import { cn } from "../../lib/utils";
import { creditChip } from "./creditColors";

const defaultFormat = (n) => Number(n || 0).toFixed(2);

/**
 * A single spend-by-category stat card (icon chip + amount + label). Tailwind.
 *
 * @param {object} props
 * @param {string} props.label @param {number} props.amount
 * @param {React.ComponentType} [props.icon]
 * @param {string} [props.color='purple'] pink|red|blue|purple|green|yellow.
 * @param {string} [props.suffix='spent'] Trailing word ("Photos spent"); "" to hide.
 * @param {(n:number)=>string} [props.formatAmount]
 * @param {string} [props.className]
 */
export default function CreditStatCard({
  label,
  amount,
  icon: Icon,
  color = "purple",
  suffix = "spent",
  formatAmount = defaultFormat,
  className = "",
}) {
  const c = creditChip(color);
  return (
    <div className={cn("rounded-2xl border border-white/10 p-4 flex flex-col gap-2", c.bg, className)}>
      <div className={cn("w-9 h-9 rounded-lg ring-1 flex items-center justify-center", c.bg, c.ring)}>
        {Icon ? <Icon className={cn("w-5 h-5", c.text)} /> : null}
      </div>
      <div className="text-2xl font-bold text-white">{formatAmount(amount)}</div>
      <div className="text-xs text-white/50">{label}{suffix ? ` ${suffix}` : ""}</div>
    </div>
  );
}

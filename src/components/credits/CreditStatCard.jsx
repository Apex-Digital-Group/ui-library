import React from "react";
import "./CreditStatCard.css";

const defaultFormat = (n) => Number(n || 0).toFixed(2);

/**
 * A single spend-by-category stat card (icon chip + amount + label).
 * Host-agnostic scoped CSS.
 *
 * @param {object} props
 * @param {string} props.label Category name, e.g. "Photos".
 * @param {number} props.amount Amount to display.
 * @param {React.ComponentType} [props.icon] Icon component (e.g. a lucide icon).
 * @param {string} [props.color='purple'] pink|red|blue|purple|green|yellow.
 * @param {string} [props.suffix='spent'] Trailing word ("Photos spent"). Pass "" to hide.
 * @param {(n:number)=>string} [props.formatAmount] Number formatter (default: 2dp).
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
  return (
    <div className={`bond-credit-stat bond-credit-stat--${color} ${className}`.trim()}>
      <div className="bond-credit-stat__icon">
        {Icon ? <Icon className="bond-credit-stat__glyph" aria-hidden="true" /> : null}
      </div>
      <div className="bond-credit-stat__amount">{formatAmount(amount)}</div>
      <div className="bond-credit-stat__label">{label}{suffix ? ` ${suffix}` : ""}</div>
    </div>
  );
}

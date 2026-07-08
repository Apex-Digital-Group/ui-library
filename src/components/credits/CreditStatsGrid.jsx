import React from "react";
import { Image, Video, Camera, Heart } from "lucide-react";
import "./CreditStatsGrid.css";

const defaultFormat = (n) => Number(n || 0).toFixed(2);

/** Sensible default breakdown so the grid renders standalone in Storybook. */
export const defaultCreditStats = [
  { key: "photo", label: "Photos", amount: 30, icon: Image, color: "blue" },
  { key: "video", label: "Videos", amount: 55, icon: Video, color: "purple" },
  { key: "live_cam", label: "Live Cams", amount: 105, icon: Camera, color: "red" },
  { key: "tip", label: "Tips", amount: 40, icon: Heart, color: "pink" },
];

/**
 * Spend-by-category stat cards (Photos / Videos / Live Cams / Tips …).
 * Fully data-driven — pass any set of stats. Host-agnostic scoped CSS.
 *
 * @param {object} props
 * @param {Array} [props.stats] Items: `{ key, label, amount, icon?, color? }`.
 *   `icon` is a component (e.g. a lucide icon); `color` ∈ pink|red|blue|purple|green|yellow.
 * @param {string} [props.suffix='spent'] Trailing word under each amount ("Photos spent").
 * @param {(n:number)=>string} [props.formatAmount] Number formatter (default: 2dp).
 * @param {string} [props.className]
 */
export default function CreditStatsGrid({
  stats = defaultCreditStats,
  suffix = "spent",
  formatAmount = defaultFormat,
  className = "",
}) {
  return (
    <div className={`bond-credit-stats ${className}`.trim()}>
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.key || s.label} className={`bond-credit-stat bond-credit-stat--${s.color || "purple"}`}>
            <div className="bond-credit-stat__icon">
              {Icon ? <Icon className="bond-credit-stat__glyph" aria-hidden="true" /> : null}
            </div>
            <div className="bond-credit-stat__amount">{formatAmount(s.amount)}</div>
            <div className="bond-credit-stat__label">{s.label}{suffix ? ` ${suffix}` : ""}</div>
          </div>
        );
      })}
    </div>
  );
}

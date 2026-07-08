import React from "react";
import { Image, Video, Camera, Heart } from "lucide-react";
import CreditStatCard from "./CreditStatCard";
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
 * Responsive grid of spend-by-category stat cards. Each item renders a
 * {@link CreditStatCard}. Fully data-driven; host-agnostic scoped CSS.
 *
 * @param {object} props
 * @param {Array} [props.stats] Items: `{ key, label, amount, icon?, color? }`.
 * @param {string} [props.suffix='spent'] Trailing word under each amount.
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
      {stats.map((s) => (
        <CreditStatCard
          key={s.key || s.label}
          label={s.label}
          amount={s.amount}
          icon={s.icon}
          color={s.color}
          suffix={suffix}
          formatAmount={formatAmount}
        />
      ))}
    </div>
  );
}

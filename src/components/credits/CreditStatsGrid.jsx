import React from "react";
import { Image, Video, Camera, Heart } from "lucide-react";
import { cn } from "../../lib/utils";
import CreditStatCard from "./CreditStatCard";

const defaultFormat = (n) => Number(n || 0).toFixed(2);

/** Sensible default breakdown so the grid renders standalone in Storybook. */
export const defaultCreditStats = [
  { key: "photo", label: "Photos", amount: 30, icon: Image, color: "blue" },
  { key: "video", label: "Videos", amount: 55, icon: Video, color: "purple" },
  { key: "live_cam", label: "Live Cams", amount: 105, icon: Camera, color: "red" },
  { key: "tip", label: "Tips", amount: 40, icon: Heart, color: "pink" },
];

/**
 * Responsive grid of spend-by-category cards ({@link CreditStatCard}). Tailwind.
 *
 * @param {object} props
 * @param {Array} [props.stats] `{ key, label, amount, icon?, color? }`.
 * @param {string} [props.suffix='spent'] @param {(n:number)=>string} [props.formatAmount]
 * @param {string} [props.className]
 */
export default function CreditStatsGrid({
  stats = defaultCreditStats,
  suffix = "spent",
  formatAmount = defaultFormat,
  className = "",
}) {
  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-3", className)}>
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

import React from "react";
import { cn } from "../../lib/utils";

/** Resolve a package's badge from an explicit `badge` or the popular/bestValue
 * booleans (+ configurable labels). Returns `{ label, tone }` or null. */
export function resolvePackageBadge(pkg, { popularLabel = "MOST POPULAR", bestValueLabel = "BEST VALUE" } = {}) {
  if (pkg?.badge) return pkg.badge;
  if (pkg?.popular) return { label: popularLabel, tone: "popular" };
  if (pkg?.bestValue) return { label: bestValueLabel, tone: "best" };
  return null;
}

/**
 * A single selectable credit package card — the same card for every tier;
 * the MOST POPULAR / BEST VALUE accent comes entirely from `badge`. Tailwind.
 *
 * @param {object} props
 * @param {string} [props.name] Tier name (e.g. "Gold").
 * @param {number} props.credits @param {number} props.price
 * @param {number} [props.pricePerCredit] Defaults to price/credits.
 * @param {{label:string, tone?:('popular'|'best')}} [props.badge] Ribbon; tone drives the accent.
 * @param {boolean} [props.selected=false]
 * @param {string} [props.currency='$'] @param {string} [props.creditLabel='credits']
 * @param {(n:number)=>string} [props.formatPrice]
 * @param {() => void} [props.onClick]
 * @param {string} [props.className]
 */
export default function CreditPackageCard({
  name,
  credits,
  price,
  pricePerCredit,
  badge,
  selected = false,
  currency = "$",
  creditLabel = "credits",
  formatPrice,
  onClick,
  className = "",
}) {
  const money = formatPrice || ((n) => `${currency}${Number(n).toFixed(2)}`);
  const ppc = pricePerCredit != null ? pricePerCredit : (credits ? price / credits : 0);
  const tone = badge?.tone;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "relative flex flex-col items-center justify-center pt-6 pb-4 px-3 rounded-xl border-2 transition-all duration-200 hover:scale-[1.03]",
        tone === "popular" && "border-purple-500 bg-purple-500/10 hover:bg-purple-500/20 shadow-lg shadow-purple-500/20",
        tone === "best" && "border-amber-500 bg-amber-500/10 hover:bg-amber-500/20 shadow-lg shadow-amber-500/20",
        !tone && "border-white/10 bg-white/5 hover:border-purple-400/60 hover:bg-white/10",
        selected && "ring-2 ring-pink-500/50",
        className,
      )}
    >
      {badge?.label && (
        <span
          className={cn(
            "absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-lg",
            tone === "best"
              ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black"
              : "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
          )}
        >
          {badge.label}
        </span>
      )}
      {name && (
        <div className={cn("text-xs font-semibold mb-1", tone === "popular" ? "text-purple-300" : tone === "best" ? "text-amber-300" : "text-white/60")}>
          {name}
        </div>
      )}
      <div className={cn("text-3xl font-bold mb-0.5", tone === "popular" ? "text-purple-300" : tone === "best" ? "text-amber-300" : "text-white")}>
        {credits}
      </div>
      <div className="text-[11px] text-white/50 mb-3">{creditLabel}</div>
      <div className="text-lg font-bold text-white">{money(price)}</div>
      <div className="text-[10px] text-white/35 mt-1">{money(ppc)}/credit</div>
    </button>
  );
}

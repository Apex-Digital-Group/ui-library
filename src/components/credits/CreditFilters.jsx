import React from "react";
import { Sparkles, Image, Video, Camera, Heart } from "lucide-react";
import { cn } from "../../lib/utils";

/** Default filter tabs (All / Photos / Videos / Live Cams / Tips). */
export const defaultCreditFilters = [
  { key: "all", label: "All", icon: Sparkles },
  { key: "photo", label: "Photos", icon: Image },
  { key: "video", label: "Videos", icon: Video },
  { key: "live_cam", label: "Live Cams", icon: Camera },
  { key: "tip", label: "Tips", icon: Heart },
];

/**
 * Horizontally-scrolling filter chip bar. Controlled (`activeFilter`+`onChange`)
 * or uncontrolled. Tailwind.
 *
 * @param {object} props
 * @param {Array} [props.filters] `{ key, label, icon? }`.
 * @param {string} [props.activeFilter] @param {string} [props.defaultFilter='all']
 * @param {(key:string)=>void} [props.onChange]
 * @param {string} [props.ariaLabel='Filter'] @param {string} [props.className]
 */
export default function CreditFilters({
  filters = defaultCreditFilters,
  activeFilter,
  defaultFilter = "all",
  onChange,
  ariaLabel = "Filter",
  className = "",
}) {
  const [internal, setInternal] = React.useState(defaultFilter);
  const active = activeFilter != null ? activeFilter : internal;
  const set = (key) => {
    if (activeFilter == null) setInternal(key);
    onChange?.(key);
  };

  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", className)} role="tablist" aria-label={ariaLabel}>
      {filters.map((f) => {
        const Icon = f.icon;
        const on = active === f.key;
        return (
          <button
            key={f.key}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => set(f.key)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              on
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10",
            )}
          >
            {Icon ? <Icon className="w-4 h-4" /> : null}
            {f.label}
          </button>
        );
      })}
    </div>
  );
}

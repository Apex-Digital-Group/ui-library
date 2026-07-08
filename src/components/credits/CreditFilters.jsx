import React from "react";
import { Sparkles, Image, Video, Camera, Heart } from "lucide-react";
import "./CreditFilters.css";

/** Default filter tabs (All / Photos / Videos / Live Cams / Tips). */
export const defaultCreditFilters = [
  { key: "all", label: "All", icon: Sparkles },
  { key: "photo", label: "Photos", icon: Image },
  { key: "video", label: "Videos", icon: Video },
  { key: "live_cam", label: "Live Cams", icon: Camera },
  { key: "tip", label: "Tips", icon: Heart },
];

/**
 * Horizontally-scrolling filter chip bar. Works uncontrolled (internal state)
 * or controlled (`activeFilter` + `onChange`). Host-agnostic scoped CSS.
 *
 * @param {object} props
 * @param {Array} [props.filters] `{ key, label, icon? }`.
 * @param {string} [props.activeFilter] Controlled active key (omit for uncontrolled).
 * @param {string} [props.defaultFilter='all'] Initial key when uncontrolled.
 * @param {(key:string)=>void} [props.onChange]
 * @param {string} [props.ariaLabel='Filter']
 * @param {string} [props.className]
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
    <div className={`bond-credit-filters ${className}`.trim()} role="tablist" aria-label={ariaLabel}>
      {filters.map((f) => {
        const Icon = f.icon;
        const on = active === f.key;
        return (
          <button
            key={f.key}
            type="button"
            role="tab"
            aria-selected={on}
            className={`bond-credit-filters__chip${on ? " is-active" : ""}`}
            onClick={() => set(f.key)}
          >
            {Icon ? <Icon className="bond-credit-filters__chip-icon" aria-hidden="true" /> : null}
            {f.label}
          </button>
        );
      })}
    </div>
  );
}

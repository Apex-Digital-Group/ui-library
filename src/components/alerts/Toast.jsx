import React from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import { resolveVariant, DEFAULT_ALERT_BG } from "./alertVariants";

/**
 * LiveGemini Toast — a themed notification card (accent icon chip + title +
 * message + optional action + close + auto-dismiss progress bar). Presentational
 * and fully configurable. Tailwind.
 *
 * Auto-dismiss: with `duration` set and `showProgress`, the bar animates and
 * `onClose` fires when it reaches zero. Pass a controlled `progress` (0–1) to
 * drive it yourself instead.
 *
 * @param {object} props
 * @param {('success'|'error'|'warning'|'info')} [props.variant='success']
 * @param {string} [props.title] @param {string} [props.message]
 * @param {string} [props.accent] Override the variant accent colour.
 * @param {string} [props.background] Card background (CSS colour/gradient). Configurable.
 * @param {React.ComponentType} [props.icon] Override the variant icon.
 * @param {boolean} [props.showClose=true] @param {() => void} [props.onClose]
 * @param {boolean} [props.showProgress=true] @param {number} [props.duration=4000] ms (0 = no auto-dismiss).
 * @param {number} [props.progress] Controlled 0–1 progress (overrides auto).
 * @param {string} [props.actionLabel] @param {() => void} [props.onAction]
 * @param {string} [props.className]
 */
export default function Toast({
  variant = "success",
  title,
  message,
  accent,
  background = DEFAULT_ALERT_BG,
  icon,
  showClose = true,
  onClose,
  showProgress = true,
  duration = 4000,
  progress,
  actionLabel,
  onAction,
  className = "",
}) {
  const { color, Icon } = resolveVariant(variant, accent, icon);

  const [auto, setAuto] = React.useState(1);
  React.useEffect(() => {
    if (progress != null || !showProgress || !duration) return undefined;
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const frac = Math.max(0, 1 - (t - start) / duration);
      setAuto(frac);
      if (frac > 0) raf = requestAnimationFrame(tick);
      else onClose?.();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, showProgress, progress, onClose]);

  const pct = (progress != null ? progress : auto) * 100;

  return (
    <div
      role="status"
      className={cn("relative w-full max-w-sm rounded-2xl border overflow-hidden flex items-start gap-3 p-4 pr-9", className)}
      style={{ background, borderColor: "rgba(168,148,222,0.18)" }}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}1f`, boxShadow: `inset 0 0 0 1px ${color}55` }}>
        <Icon className="w-5 h-5" style={{ color }} strokeWidth={2.5} />
      </div>

      <div className="flex-1 min-w-0">
        {title && <div className="text-sm font-bold text-white">{title}</div>}
        {message && <div className="text-xs text-white/55 mt-0.5 leading-relaxed">{message}</div>}
        {actionLabel && (
          <button type="button" onClick={onAction} className="mt-2 text-xs font-semibold hover:brightness-125 transition" style={{ color }}>
            {actionLabel}
          </button>
        )}
      </div>

      {showClose && (
        <button type="button" onClick={onClose} aria-label="Dismiss" className="absolute top-3 right-3 text-white/40 hover:text-white/80 transition-colors">
          <X className="w-4 h-4" />
        </button>
      )}

      {showProgress && duration ? (
        <div className="absolute bottom-0 left-0 h-[3px] rounded-r" style={{ width: `${pct}%`, background: color }} />
      ) : null}
    </div>
  );
}

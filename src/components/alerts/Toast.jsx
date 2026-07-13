import React from "react";
import { X } from "lucide-react";
import { resolveVariant, resolveTone, DEFAULT_ALERT_BG } from "./alertVariants";

/**
 * LiveGemini Toast — a themed notification card (left accent bar + accent icon
 * chip + title + message + optional action + close + auto-dismiss progress
 * bar). Layout uses inline styles so it renders correctly in any host app
 * (Tailwind or not); colours/text adapt to `background` luminance, so a white
 * background gets dark text automatically (override with `scheme`).
 *
 * Auto-dismiss: with `duration` set and `showProgress`, the bar animates and
 * `onClose` fires when it reaches zero. Hovering pauses the countdown.
 *
 * @param {object} props
 * @param {('success'|'error'|'warning'|'info')} [props.variant='success']
 * @param {string} [props.title] @param {string} [props.message]
 * @param {string} [props.accent] Override the variant accent colour.
 * @param {string} [props.background] Card background (CSS colour/gradient).
 * @param {('light'|'dark')} [props.scheme] Force text scheme.
 * @param {React.ComponentType} [props.icon] Override the variant icon.
 * @param {boolean} [props.showClose=true] @param {() => void} [props.onClose]
 * @param {boolean} [props.showProgress=true] @param {number} [props.duration=4000] ms (0 = no auto-dismiss).
 * @param {number} [props.progress] Controlled 0–1 progress (overrides auto).
 * @param {string} [props.actionLabel] @param {() => void} [props.onAction]
 * @param {object} [props.style]
 */
export default function Toast({
  variant = "success",
  title,
  message,
  accent,
  background = DEFAULT_ALERT_BG,
  scheme,
  icon,
  showClose = true,
  onClose,
  showProgress = true,
  duration = 4000,
  progress,
  actionLabel,
  onAction,
  style,
}) {
  const { color, Icon } = resolveVariant(variant, accent, icon);
  const tone = resolveTone(background, scheme);

  const [auto, setAuto] = React.useState(1);
  const pausedRef = React.useRef(false); // hover-pause: freeze the countdown
  // Keep onClose in a ref so a new closure each render (AlertProvider passes a
  // fresh `() => dismiss(id)` every store emit) does NOT restart the rAF loop
  // and reset the countdown. Deps stay stable → the timer runs to completion.
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;
  React.useEffect(() => {
    if (progress != null || !showProgress || !duration) return undefined;
    let raf;
    let done = false;
    let last = performance.now();
    let elapsed = 0;
    const tick = (t) => {
      if (done) return;
      if (!pausedRef.current) elapsed += t - last;
      last = t;
      const frac = Math.max(0, 1 - elapsed / duration);
      if (frac > 0) {
        setAuto(frac);
        raf = requestAnimationFrame(tick);
      } else {
        done = true;
        setAuto(0);
        onCloseRef.current?.(); // fire exactly once
      }
    };
    raf = requestAnimationFrame(tick);
    return () => { done = true; cancelAnimationFrame(raf); };
  }, [duration, showProgress, progress]);

  const pct = (progress != null ? progress : auto) * 100;

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 384,
        minWidth: 280,
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        padding: "15px 16px 15px 20px",
        borderRadius: 16,
        overflow: "hidden",
        background,
        border: `1px solid ${tone.border}`,
        boxShadow: tone.shadow,
        fontFamily: "'Manrope', system-ui, -apple-system, sans-serif",
        ...style,
      }}
    >
      {/* left accent bar */}
      <span aria-hidden style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: color, boxShadow: `0 0 16px ${color}` }} />

      {/* icon chip */}
      <span style={{ flex: "none", width: 38, height: 38, borderRadius: 11, display: "grid", placeItems: "center", color, background: `${color}1f`, boxShadow: `inset 0 0 0 1px ${color}55` }}>
        <Icon size={20} strokeWidth={2.5} />
      </span>

      <div style={{ flex: 1, minWidth: 0, paddingTop: 1 }}>
        {title != null && title !== "" && (
          <div style={{ fontWeight: 800, fontSize: 15, lineHeight: 1.25, letterSpacing: "-0.01em", color: tone.fg, wordBreak: "break-word" }}>{title}</div>
        )}
        {message != null && message !== "" && (
          <div style={{ fontSize: 13.5, lineHeight: 1.45, marginTop: 3, color: tone.muted, wordBreak: "break-word" }}>{message}</div>
        )}
        {actionLabel && (
          <button type="button" onClick={onAction} style={{ marginTop: 12, background: "none", border: "none", padding: 0, cursor: "pointer", fontWeight: 800, fontSize: 12.5, color, fontFamily: "inherit" }}>
            {actionLabel}
          </button>
        )}
      </div>

      {showClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          style={{ flex: "none", width: 26, height: 26, borderRadius: 8, border: "none", cursor: "pointer", background: "transparent", color: tone.faint, display: "grid", placeItems: "center", margin: "-3px -3px 0 0" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = tone.fg; e.currentTarget.style.background = tone.closeHover; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = tone.faint; e.currentTarget.style.background = "transparent"; }}
        >
          <X size={15} />
        </button>
      )}

      {showProgress && duration ? (
        <div style={{ position: "absolute", bottom: 0, left: 0, height: 3, width: `${pct}%`, background: color, opacity: 0.85 }} />
      ) : null}
    </div>
  );
}

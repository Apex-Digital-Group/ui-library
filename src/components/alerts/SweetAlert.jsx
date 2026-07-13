import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { resolveVariant, resolveTone, DEFAULT_ALERT_BG } from "./alertVariants";

/**
 * LiveGemini "Sweet Alert" — a themed confirmation modal (glow + circular icon
 * + title + message + action button(s)). Self-contained: renders its own
 * portal + scrim with inline styles, so it works in any host app (no Tailwind
 * dependency). Text adapts to `background` luminance (white bg → dark text).
 *
 * `onConfirm`/`onCancel`/`onDismiss` are notifications only — the parent (the
 * store) decides when to close, so an async confirm can keep the dialog open
 * (pass `busy`) until its work resolves. Pass `cancelLabel` for two buttons.
 *
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {('success'|'error'|'warning'|'info')} [props.variant='success']
 * @param {string} [props.title] @param {string} [props.message]
 * @param {string} [props.confirmLabel='OK'] @param {string} [props.cancelLabel]
 * @param {boolean} [props.busy] Confirm is in-flight → disable buttons + show a spinner.
 * @param {() => void} [props.onConfirm] @param {() => void} [props.onCancel] @param {() => void} [props.onDismiss]
 * @param {string} [props.accent] @param {string} [props.background] @param {('light'|'dark')} [props.scheme]
 * @param {React.ComponentType} [props.icon] @param {boolean} [props.closeOnBackdrop=true]
 * @param {number} [props.zIndex=2147483640]
 */
export default function SweetAlert({
  isOpen,
  variant = "success",
  title,
  message,
  confirmLabel = "OK",
  cancelLabel,
  busy = false,
  onConfirm,
  onCancel,
  onDismiss,
  accent,
  background = DEFAULT_ALERT_BG,
  scheme,
  icon,
  closeOnBackdrop = true,
  zIndex = 2147483640,
}) {
  const { color, Icon } = resolveVariant(variant, accent, icon);
  const tone = resolveTone(background, scheme);
  const confirmRef = React.useRef(null);
  const restoreRef = React.useRef(null);

  // Latest handlers in a ref so the keydown listener never closes over a stale
  // confirm/dismiss (the store can supersede the alert while it's open).
  const handlers = React.useRef({});
  handlers.current = { onConfirm, onDismiss, busy, closeOnBackdrop };

  React.useEffect(() => {
    if (!isOpen) return undefined;
    restoreRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => confirmRef.current?.focus(), 40);

    const onKey = (e) => {
      const h = handlers.current;
      if (e.key === "Escape") { e.preventDefault(); h.onDismiss?.(); }
      else if (e.key === "Enter") { if (!h.busy) { e.preventDefault(); h.onConfirm?.(); } }
      else if (e.key === "Tab") {
        // simple focus trap between the (up to two) action buttons
        const focusables = Array.from(document.querySelectorAll("[data-lga-btn]"));
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      if (restoreRef.current && typeof restoreRef.current.focus === "function") restoreRef.current.focus();
    };
  }, [isOpen]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => { if (e.target === e.currentTarget && closeOnBackdrop && !busy) onDismiss?.(); }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex,
            display: "grid",
            placeItems: "center",
            padding: 24,
            background: "radial-gradient(700px 500px at 50% 34%, rgba(155,92,246,0.14), transparent 60%), rgba(8,4,14,0.72)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-label={typeof title === "string" ? title : undefined}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ duration: 0.24, ease: [0.2, 0.9, 0.3, 1.05] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 440,
              borderRadius: 26,
              padding: "34px 32px 28px",
              textAlign: "center",
              overflow: "hidden",
              background,
              border: `1px solid ${tone.border}`,
              boxShadow: tone.shadow,
              fontFamily: "'Manrope', system-ui, -apple-system, sans-serif",
            }}
          >
            {/* top tinted aura */}
            <div aria-hidden style={{ position: "absolute", left: "50%", top: -120, width: 320, height: 240, transform: "translateX(-50%)", background: `radial-gradient(circle, ${color}55, transparent 68%)`, pointerEvents: "none" }} />

            {/* circular icon */}
            <div style={{ position: "relative", width: 92, height: 92, margin: "0 auto 22px", borderRadius: 999, display: "grid", placeItems: "center", color, background: `${color}24`, boxShadow: `inset 0 0 0 1px ${color}52, 0 0 46px -6px ${color}55` }}>
              <Icon size={42} strokeWidth={2.2} />
            </div>

            {/* div (not h3/p) so host global element styles can't override the
                colour — inline styles can't carry !important. */}
            {title != null && title !== "" && (
              <div role="heading" aria-level={2} style={{ position: "relative", margin: "0 0 8px", fontWeight: 800, fontSize: 25, lineHeight: 1.2, letterSpacing: "-0.02em", color: tone.fg }}>{title}</div>
            )}
            {message != null && message !== "" && (
              <div style={{ position: "relative", margin: "0 auto", maxWidth: "34ch", fontSize: 15, lineHeight: 1.55, color: tone.muted }}>{message}</div>
            )}

            <div style={{ position: "relative", display: "flex", gap: 12, marginTop: 26, justifyContent: "center" }}>
              {cancelLabel && (
                <button
                  type="button"
                  data-lga-btn
                  onClick={onCancel}
                  disabled={busy}
                  style={{ flex: 1, padding: "15px 24px", borderRadius: 14, cursor: busy ? "not-allowed" : "pointer", opacity: busy ? 0.6 : 1, fontFamily: "inherit", fontWeight: 800, fontSize: 15, color: tone.muted, background: tone.closeHover, border: `1px solid ${tone.border}` }}
                >
                  {cancelLabel}
                </button>
              )}
              <button
                type="button"
                data-lga-btn
                ref={confirmRef}
                onClick={onConfirm}
                disabled={busy}
                aria-busy={busy}
                style={{ flex: cancelLabel ? 1 : "0 1 auto", minWidth: cancelLabel ? undefined : 150, padding: "15px 24px", borderRadius: 14, cursor: busy ? "wait" : "pointer", opacity: busy ? 0.8 : 1, fontFamily: "inherit", fontWeight: 800, fontSize: 15, color: "#0A1024", background: color, border: "none", boxShadow: `0 12px 30px -10px ${color}88` }}
              >
                {busy ? "Please wait…" : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

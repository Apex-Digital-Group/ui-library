import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import BaseModal from "../BaseModal";
import { resolveVariant, DEFAULT_ALERT_BG } from "./alertVariants";

/**
 * LiveGemini "Sweet Alert" — a themed confirmation modal (glow + circular icon
 * + title + message + action button(s)). Extends the shared {@link BaseModal}.
 * Fully configurable: variant, accent colour, background, labels, handlers. Tailwind.
 *
 * Pass `cancelLabel` to turn it into a confirm dialog (two buttons).
 *
 * @param {object} props
 * @param {boolean} props.isOpen @param {() => void} props.onClose
 * @param {('success'|'error'|'warning'|'info')} [props.variant='success']
 * @param {string} [props.title] @param {string} [props.message]
 * @param {string} [props.confirmLabel='OK'] @param {() => void} [props.onConfirm]
 * @param {string} [props.cancelLabel] Shown → renders a two-button confirm dialog.
 * @param {() => void} [props.onCancel]
 * @param {string} [props.accent] Override the variant accent colour (hex/rgb).
 * @param {string} [props.background] Card background (CSS colour/gradient). Configurable.
 * @param {React.ComponentType} [props.icon] Override the variant icon.
 * @param {boolean} [props.closeOnBackdrop=true]
 * @param {string} [props.className]
 */
export default function SweetAlert({
  isOpen,
  onClose,
  variant = "success",
  title,
  message,
  confirmLabel = "OK",
  onConfirm,
  cancelLabel,
  onCancel,
  accent,
  background = DEFAULT_ALERT_BG,
  icon,
  closeOnBackdrop = true,
  className = "",
}) {
  const { color, Icon } = resolveVariant(variant, accent, icon);
  const confirm = () => { onConfirm?.(); onClose?.(); };
  const cancel = () => { onCancel?.(); onClose?.(); };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} lockScroll closeOnBackdrop={closeOnBackdrop} closeOnEsc backdrop="bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className={cn("relative w-full max-w-sm rounded-3xl border overflow-hidden px-8 pt-11 pb-8 text-center", className)}
        style={{ background, borderColor: "rgba(168,148,222,0.22)" }}
      >
        {/* top glow in the accent colour */}
        <div aria-hidden className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full blur-3xl" style={{ background: color, opacity: 0.22 }} />

        {/* circular icon */}
        <div className="relative mx-auto mb-5 w-16 h-16 rounded-full flex items-center justify-center" style={{ background: `${color}1f`, boxShadow: `inset 0 0 0 2px ${color}66` }}>
          <Icon className="w-8 h-8" style={{ color }} strokeWidth={2.5} />
        </div>

        {title && <h3 className="relative text-xl font-bold text-white mb-1.5">{title}</h3>}
        {message && <p className="relative text-sm text-white/60 mb-6 leading-relaxed">{message}</p>}

        <div className="relative flex gap-3 justify-center">
          {cancelLabel && (
            <button type="button" onClick={cancel} className="px-5 py-2.5 rounded-xl font-semibold text-white/80 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              {cancelLabel}
            </button>
          )}
          <button type="button" onClick={confirm} className="px-6 py-2.5 rounded-xl font-bold transition hover:brightness-110" style={{ background: color, color: "#0b0b12" }}>
            {confirmLabel}
          </button>
        </div>
      </motion.div>
    </BaseModal>
  );
}

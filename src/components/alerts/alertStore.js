import { DEFAULT_ALERT_BG } from "./alertVariants";

/**
 * Module-level store for the alert runtime. Toasts, the active sweet-alert, and
 * the global theme live here — NOT in React state — so notifications can be
 * fired from anywhere, including non-React code (axios interceptors, socket
 * handlers). <AlertProvider> subscribes and renders; the imperative singletons
 * (useToast / toast / message / notification / confirmModal) all push here.
 */

let toasts = [];
let alertState = null; // { id, variant, title, message, confirmLabel, cancelLabel, accent, background, scheme, busy, onConfirm, onCancel, _resolve }
let theme = { background: DEFAULT_ALERT_BG, position: "top-right", duration: 4500, scheme: undefined };

const listeners = new Set();
const emit = () => { for (const l of listeners) l(); };

let seq = 0;
const nextId = () => `lgt_${++seq}`;
let alertSeq = 0;
const nextAlertId = () => `lga_${++alertSeq}`;

export const alertStore = {
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  // --- snapshots (stable references between emits for useSyncExternalStore) ---
  getToasts: () => toasts,
  getAlert: () => alertState,
  getTheme: () => theme,

  // --- theme ---
  setTheme(patch) {
    theme = { ...theme, ...patch };
    emit();
  },

  // --- toasts ---
  add(opts) {
    const o = typeof opts === "string" ? { message: opts } : (opts || {});
    const id = o.id || nextId();
    const duration = o.duration != null ? o.duration : theme.duration;
    const toast = {
      id,
      position: o.position || theme.position,
      variant: o.variant || "info",
      title: o.title,
      message: o.message,
      duration,
      showProgress: o.showProgress != null ? o.showProgress : duration > 0,
      actionLabel: o.actionLabel,
      onAction: o.onAction,
      accent: o.accent,
      background: o.background, // undefined → inherit theme
      scheme: o.scheme,
    };
    toasts = [...toasts.filter((t) => t.id !== id), toast];
    emit();
    return id;
  },
  dismiss(id) {
    if (id == null) return this.dismissAll();
    toasts = toasts.filter((t) => t.id !== id);
    emit();
    return undefined;
  },
  dismissAll() {
    toasts = [];
    emit();
  },

  // --- sweet alert (one at a time) -----------------------------------------
  // Returns a Promise<boolean> (confirmed?). `opts.onConfirm`/`opts.onCancel`
  // (optionally async) let callers run work while the dialog stays open — the
  // confirm button shows a busy state and the dialog only closes once
  // onConfirm resolves (staying open if it rejects), matching antd Modal.confirm.
  openAlert(opts) {
    // supersede any currently-open alert (resolve it false first)
    if (alertState) this.finalize(alertState.id, false);
    const id = nextAlertId();
    return new Promise((resolve) => {
      alertState = { variant: "info", confirmLabel: "OK", ...opts, id, busy: false, _resolve: resolve };
      emit();
    });
  },
  /** The active alert's id (captured synchronously right after openAlert). */
  activeAlertId: () => (alertState ? alertState.id : null),

  async confirmActive() {
    const a = alertState;
    if (!a) return;
    if (typeof a.onConfirm === "function") {
      this._setBusy(a.id, true);
      try {
        await a.onConfirm();
      } catch (err) {
        this._setBusy(a.id, false); // stay open so the user can retry
        // surface the rejection instead of swallowing it silently
        if (typeof console !== "undefined") console.error("[alert] onConfirm rejected:", err);
        return;
      }
    }
    this.finalize(a.id, true);
  },
  cancelActive() {
    const a = alertState;
    if (!a) return;
    try { a.onCancel?.(); } finally { this.finalize(a.id, false); }
  },
  /** Backdrop / Escape dismissal — treated as cancel (matches antd maskClosable). */
  dismissAlert() {
    this.cancelActive();
  },
  /** Close a specific alert by id (used by the Modal.confirm handle's destroy). */
  destroyAlert(id) {
    if (alertState && alertState.id === id) this.finalize(id, false);
  },
  _setBusy(id, busy) {
    if (alertState && alertState.id === id) {
      alertState = { ...alertState, busy };
      emit();
    }
  },
  /** Resolve + clear the alert, but only if `id` is still the active one. */
  finalize(id, value) {
    if (!alertState || alertState.id !== id) return; // stale (superseded/exiting)
    const resolve = alertState._resolve;
    alertState = null;
    emit();
    resolve?.(value);
  },
};

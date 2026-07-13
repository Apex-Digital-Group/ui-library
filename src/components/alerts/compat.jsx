import { alertStore } from "./alertStore";

/**
 * Drop-in adapters that mimic the legacy notification APIs used across the
 * frontends, but render through the @bond/lib AlertProvider runtime. Swapping
 * the import is enough — call sites keep working:
 *
 *   import { toast } from "@bond/lib/alerts/compat";        // was: react-toastify
 *   import { message, notification } from "@bond/lib/alerts/compat"; // was: antd
 *   import { modal } from "@bond/lib/alerts/compat";        // was: antd Modal (.confirm/.info/…)
 *
 * All output routes to the global toast stack / sweet-alert, so position,
 * background and scheme configured on <AlertProvider> apply everywhere.
 */

const asText = (v) => (v == null ? "" : v);

// ---------------------------------------------------------------------------
// react-toastify `toast`
//   toast(content, opts) · toast.success/error/info/warn/warning/dark/loading
//   toast.dismiss(id?) · toast.update/isActive/promise (best-effort)
//   The single string becomes the toast title (react-toastify shows it as the
//   body). `opts.autoClose` (false | ms) maps to duration.
// ---------------------------------------------------------------------------
function fireToast(variant, content, opts = {}) {
  const o = opts || {};
  const duration = o.autoClose === false ? 0 : (typeof o.autoClose === "number" ? o.autoClose : undefined);
  return alertStore.add({
    variant,
    title: asText(content),
    duration,
    position: o.position, // react-toastify positions share our naming (top-right, …)
    background: o.background,
    scheme: o.scheme,
  });
}

export const toast = Object.assign(
  (content, opts) => fireToast("info", content, opts),
  {
    success: (content, opts) => fireToast("success", content, opts),
    error: (content, opts) => fireToast("error", content, opts),
    info: (content, opts) => fireToast("info", content, opts),
    warn: (content, opts) => fireToast("warning", content, opts),
    warning: (content, opts) => fireToast("warning", content, opts),
    dark: (content, opts) => fireToast("info", content, opts),
    default: (content, opts) => fireToast("info", content, opts),
    loading: (content, opts) => fireToast("info", content, { ...opts, autoClose: false }),
    dismiss: (id) => (id == null ? alertStore.dismissAll() : alertStore.dismiss(id)),
    clearWaitingQueue: () => {},
    isActive: (id) => alertStore.getToasts().some((t) => t.id === id),
    update: () => {},
    // best-effort promise() — resolves like react-toastify, showing pending/ok/err
    promise: async (p, msgs = {}, opts) => {
      const pending = msgs.pending && fireToast("info", typeof msgs.pending === "string" ? msgs.pending : msgs.pending?.render, { ...opts, autoClose: false });
      try {
        const res = await p;
        if (pending) alertStore.dismiss(pending);
        if (msgs.success) fireToast("success", typeof msgs.success === "string" ? msgs.success : msgs.success?.render, opts);
        return res;
      } catch (err) {
        if (pending) alertStore.dismiss(pending);
        if (msgs.error) fireToast("error", typeof msgs.error === "string" ? msgs.error : msgs.error?.render, opts);
        throw err;
      }
    },
  },
);

// ---------------------------------------------------------------------------
// antd `message`
//   message.success(content, duration?, onClose?) · .error/.info/.warning/.loading
//   message.open({ content, type, duration }) · .config() · .destroy()
//   antd duration is in SECONDS (default 3); returns a close function.
// ---------------------------------------------------------------------------
function fireMessage(variant, content, duration, onClose) {
  const cfg = (content && typeof content === "object" && !content.$$typeof) ? content : { content };
  const secs = duration != null ? duration : (cfg.duration != null ? cfg.duration : 3);
  const isLoading = variant === "loading";
  const id = alertStore.add({
    // "loading" isn't a real variant — map to info so it doesn't show a success ✓.
    variant: isLoading ? "info" : variant,
    title: asText(cfg.content),
    duration: isLoading ? 0 : secs * 1000,
  });
  if (typeof onClose === "function" && secs > 0) setTimeout(onClose, secs * 1000);
  const close = () => alertStore.dismiss(id);
  close.then = (res) => Promise.resolve().then(res); // antd message is thenable
  return close;
}

export const message = {
  success: (c, d, cb) => fireMessage("success", c, d, cb),
  error: (c, d, cb) => fireMessage("error", c, d, cb),
  info: (c, d, cb) => fireMessage("info", c, d, cb),
  warning: (c, d, cb) => fireMessage("warning", c, d, cb),
  warn: (c, d, cb) => fireMessage("warning", c, d, cb),
  loading: (c, d, cb) => fireMessage("loading", c, d, cb),
  open: (cfg = {}) => fireMessage(cfg.type === "loading" ? "loading" : (cfg.type || "info"), cfg, cfg.duration, cfg.onClose),
  config: () => {},
  destroy: () => alertStore.dismissAll(),
};

// ---------------------------------------------------------------------------
// antd `notification`
//   notification.success({ message, description, duration, ... }) · .open/.error/…
//   message → title, description → body. duration in SECONDS (default 4.5).
// ---------------------------------------------------------------------------
function fireNotification(variant, cfg = {}) {
  const secs = cfg.duration != null ? cfg.duration : 4.5;
  return alertStore.add({
    variant,
    title: asText(cfg.message),
    message: asText(cfg.description),
    duration: secs === 0 || secs === null ? 0 : secs * 1000,
  });
}

export const notification = {
  success: (cfg) => fireNotification("success", cfg),
  error: (cfg) => fireNotification("error", cfg),
  info: (cfg) => fireNotification("info", cfg),
  warning: (cfg) => fireNotification("warning", cfg),
  warn: (cfg) => fireNotification("warning", cfg),
  open: (cfg = {}) => fireNotification(cfg.type || "info", cfg),
  config: () => {},
  destroy: () => alertStore.dismissAll(),
};

// ---------------------------------------------------------------------------
// antd `Modal` static methods → sweet-alert
//   modal.confirm({ title, content, okText, cancelText, onOk, onCancel, okType })
//   modal.info/success/error/warning({ title, content, okText, onOk })
//   Returns { destroy, update } like antd. onOk/onCancel may return promises.
// ---------------------------------------------------------------------------
function fireModal(variant, cfg = {}, { withCancel } = {}) {
  // Pass onOk/onCancel as store handlers so an async onOk keeps the dialog open
  // (busy) until it resolves and its rejection isn't swallowed — matching antd.
  alertStore.openAlert({
    variant: cfg.okType === "danger" ? "error" : variant,
    title: asText(cfg.title),
    message: asText(cfg.content),
    confirmLabel: cfg.okText || "OK",
    cancelLabel: withCancel ? (cfg.cancelText != null ? cfg.cancelText : "Cancel") : undefined,
    onConfirm: cfg.onOk,
    onCancel: cfg.onCancel,
  });
  const id = alertStore.activeAlertId(); // captured synchronously (openAlert set it)
  return {
    destroy: () => alertStore.destroyAlert(id), // only closes THIS dialog if still open
    update: () => {},
  };
}

export const modal = {
  confirm: (cfg) => fireModal("warning", cfg, { withCancel: true }),
  info: (cfg) => fireModal("info", cfg),
  success: (cfg) => fireModal("success", cfg),
  error: (cfg) => fireModal("error", cfg),
  warning: (cfg) => fireModal("warning", cfg),
};

/** Promise-based confirm for new code: `if (await confirmModal({ title })) …` */
export function confirmModal(cfg = {}) {
  return alertStore.openAlert({
    variant: cfg.okType === "danger" ? "error" : "warning",
    title: asText(cfg.title),
    message: asText(cfg.content ?? cfg.message),
    confirmLabel: cfg.okText || "Yes, continue",
    cancelLabel: cfg.cancelText != null ? cfg.cancelText : "Cancel",
  });
}

import React from "react";
import { createPortal } from "react-dom";
import Toast from "./Toast";
import ToastStack from "./ToastStack";
import SweetAlert from "./SweetAlert";
import { alertStore } from "./alertStore";

/**
 * Imperative toast + sweet-alert runtime for the LiveGemini design system.
 *
 * Mount <AlertProvider> once near the app root. State lives in a module store
 * (see alertStore.js), so notifications can be fired from anywhere — hooks
 * (useToast/useAlert) inside components, or the singletons (toast/message/
 * notification/confirmModal) from plain JS such as axios interceptors.
 *
 *   const toast = useToast();  toast.success("Saved", "Your profile is live.");
 *   const alert = useAlert();  if (await alert.confirm({ title: "Delete?" })) del();
 *
 * Global theming — `background`, `defaultPosition` and `defaultDuration` seed
 * the store; a per-call `background` still overrides, and
 * useAlertTheme().setBackground(css) re-themes every toast/alert at runtime.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.background] Global card background for every toast/alert.
 * @param {('light'|'dark')} [props.scheme] Force text scheme globally.
 * @param {string} [props.defaultPosition='top-right'] Default toast stack position.
 * @param {number} [props.defaultDuration=4500] Default auto-dismiss ms (0 = sticky).
 * @param {number} [props.zIndex=2147483600] Stack/overlay z-index (kept above app chrome).
 */
export function AlertProvider({
  children,
  background,
  scheme,
  defaultPosition = "top-right",
  defaultDuration = 4500,
  zIndex = 2147483600,
}) {
  // seed the store from props on mount / when they change
  React.useEffect(() => {
    alertStore.setTheme({
      ...(background !== undefined ? { background } : null),
      ...(scheme !== undefined ? { scheme } : null),
      position: defaultPosition,
      duration: defaultDuration,
    });
  }, [background, scheme, defaultPosition, defaultDuration]);

  // Resolve any alert still awaiting a decision if the provider unmounts,
  // so `await alert.confirm(...)` never hangs a caller (e.g. a route guard).
  React.useEffect(() => () => { alertStore.dismissAlert(); }, []);

  const toasts = React.useSyncExternalStore(alertStore.subscribe, alertStore.getToasts, alertStore.getToasts);
  const alertState = React.useSyncExternalStore(alertStore.subscribe, alertStore.getAlert, alertStore.getAlert);
  const theme = React.useSyncExternalStore(alertStore.subscribe, alertStore.getTheme, alertStore.getTheme);

  // group toasts by position so each corner gets its own stack
  const byPosition = React.useMemo(() => {
    const m = {};
    for (const t of toasts) (m[t.position] ||= []).push(t);
    return m;
  }, [toasts]);

  const overlay = (
    <>
      {Object.entries(byPosition).map(([position, list]) => (
        <ToastStack key={position} position={position} zIndex={zIndex}>
          {list.map((t) => (
            <Toast
              key={t.id}
              variant={t.variant}
              title={t.title}
              message={t.message}
              duration={t.duration}
              showProgress={t.showProgress}
              accent={t.accent}
              background={t.background ?? theme.background}
              scheme={t.scheme ?? theme.scheme}
              actionLabel={t.actionLabel}
              onAction={t.onAction ? () => { t.onAction(); alertStore.dismiss(t.id); } : undefined}
              onClose={() => alertStore.dismiss(t.id)}
            />
          ))}
        </ToastStack>
      ))}
      <SweetAlert
        isOpen={!!alertState}
        variant={alertState?.variant}
        title={alertState?.title}
        message={alertState?.message}
        confirmLabel={alertState?.confirmLabel}
        cancelLabel={alertState?.cancelLabel}
        busy={!!alertState?.busy}
        accent={alertState?.accent}
        background={alertState?.background ?? theme.background}
        scheme={alertState?.scheme ?? theme.scheme}
        zIndex={zIndex + 40}
        onConfirm={() => alertStore.confirmActive()}
        onCancel={() => alertStore.cancelActive()}
        onDismiss={() => alertStore.dismissAlert()}
      />
    </>
  );

  return (
    <>
      {children}
      {typeof document !== "undefined" ? createPortal(overlay, document.body) : null}
    </>
  );
}

// --- imperative APIs (usable via hooks or as plain singletons) --------------

/** Fire toasts: `toast.success(title, message, opts)`, `.dismissAll()`, … */
export const toast = {
  show: (opts) => alertStore.add(opts),
  success: (title, message, opts) => alertStore.add({ ...opts, variant: "success", title, message }),
  error: (title, message, opts) => alertStore.add({ ...opts, variant: "error", title, message }),
  warning: (title, message, opts) => alertStore.add({ ...opts, variant: "warning", title, message }),
  info: (title, message, opts) => alertStore.add({ ...opts, variant: "info", title, message }),
  dismiss: (id) => alertStore.dismiss(id),
  dismissAll: () => alertStore.dismissAll(),
};

/** Sweet-alert dialogs; each returns a Promise<boolean>. */
export const alert = {
  fire: (opts) => alertStore.openAlert(opts),
  success: (opts) => alertStore.openAlert({ variant: "success", title: "Success", ...opts }),
  error: (opts) => alertStore.openAlert({ variant: "error", title: "Something went wrong", ...opts }),
  warning: (opts) => alertStore.openAlert({ variant: "warning", title: "Are you sure?", ...opts }),
  info: (opts) => alertStore.openAlert({ variant: "info", title: "Notice", ...opts }),
  confirm: (opts) => alertStore.openAlert({
    variant: "warning",
    title: "Are you sure?",
    confirmLabel: "Yes, continue",
    cancelLabel: "Cancel",
    ...opts,
  }),
};

/** Imperative toast API (stable singleton). */
export function useToast() {
  return toast;
}

/** Imperative sweet-alert API (stable singleton). */
export function useAlert() {
  return alert;
}

/** Read / change the global card background (and scheme) at runtime. */
export function useAlertTheme() {
  const theme = React.useSyncExternalStore(alertStore.subscribe, alertStore.getTheme, alertStore.getTheme);
  return {
    background: theme.background,
    scheme: theme.scheme,
    setBackground: (background, scheme) => alertStore.setTheme({ background, ...(scheme !== undefined ? { scheme } : null) }),
    setTheme: (patch) => alertStore.setTheme(patch),
  };
}

export default AlertProvider;

import React from "react";
import { createPortal } from "react-dom";
import Toast from "./Toast";
import ToastStack from "./ToastStack";
import SweetAlert from "./SweetAlert";
import { alertStore } from "./alertStore";
import { AnchoredFeedback, SnackbarStack, Announcer, FEEDBACK_CSS } from "./InlineFeedback";
import { installInteractionTracker, setRequestFailureHandler, setDialogCloseHandler, setTrackedOrigins } from "./feedbackAnchor";

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
 *
 * Inline feedback (all opt-in; defaults keep the legacy card toasts):
 * @param {('card'|'snackbar')} [props.appearance='card'] Global surface. "snackbar" = one-line
 *   bar at the bottom centre (ignores per-call positions).
 * @param {boolean} [props.autoAnchor=false] Show a message fired within 2.5s of a tap as a small
 *   pop next to the tapped control (falls back to the global surface when that is not safe).
 * @param {boolean} [props.effects=false] Micro-animation on the tapped control (ring / pop / shake).
 * @param {string} [props.avoidBottom] Selector of fixed bottom UI the snackbar sits above.
 * @param {('snackbar'|'nearest')} [props.fallback='snackbar'] Where an error / warning with no linked
 *   control goes: the global bar, or next to the nearest sensible control (open dialog's main
 *   button → last tapped control → focused control; else screen readers only).
 * @param {boolean} [props.requestErrors=false] When a request started by a tap fails (no
 *   connection / server error) and the app shows nothing, show it on the tapped control.
 * @param {{network?: string, server?: string}} [props.requestErrorText] Copy for those messages.
 * @param {string} [props.failedLabel="Failed"] Common short word a failed button shows when the
 *   error's own words do not fit inside it (translated by the app).
 * @param {string[]} [props.quietVariants=[]] Variants never shown as a global toast/snackbar when
 *   they have no control to sit on (e.g. ["success","info"]); screen readers still hear them.
 * @param {string[]} [props.trackedOrigins=[]] API origins on another site than the page (e.g. the
 *   API_URL). Only requests to the page's own site or these speak for a tap; third-party traffic
 *   (analytics, tags, CDNs) never does.
 */
export function AlertProvider({
  children,
  background,
  scheme,
  defaultPosition = "top-right",
  defaultDuration = 4500,
  zIndex = 2147483600,
  appearance = "card",
  autoAnchor = false,
  effects = false,
  avoidBottom,
  quietVariants,
  fallback = "snackbar",
  requestErrors = false,
  requestErrorText,
  failedLabel,
  trackedOrigins,
}) {
  // seed the store from props on mount / when they change
  React.useEffect(() => {
    alertStore.setTheme({
      ...(background !== undefined ? { background } : null),
      ...(scheme !== undefined ? { scheme } : null),
      position: defaultPosition,
      duration: defaultDuration,
      appearance,
      autoAnchor: !!autoAnchor,
      effects: !!effects,
      avoidBottom,
      quietVariants: Array.isArray(quietVariants) ? quietVariants : [],
      fallback,
      requestErrors: !!requestErrors,
      requestErrorText,
      failedLabel,
    });
    // quietVariants is compared by content so an inline array literal does not re-seed every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [background, scheme, defaultPosition, defaultDuration, appearance, autoAnchor, effects, avoidBottom,
    Array.isArray(quietVariants) ? quietVariants.join(",") : "", fallback, requestErrors,
    requestErrorText ? `${requestErrorText.network}|${requestErrorText.server}` : "", failedLabel]);

  // Which requests are the app's own API (compared by content, like quietVariants).
  const originsKey = Array.isArray(trackedOrigins) ? trackedOrigins.join("|") : "";
  React.useEffect(() => {
    setTrackedOrigins(originsKey ? originsKey.split("|") : []);
  }, [originsKey]);
  // Remember the last tapped control while auto-anchoring is on.
  React.useEffect(() => (autoAnchor ? installInteractionTracker() : undefined), [autoAnchor]);
  // close guard: a dialog that closes while (or right after) its button's request runs is held
  React.useEffect(() => {
    if (!autoAnchor) return undefined;
    setDialogCloseHandler((owner) => alertStore.holdForTap(owner));
    return () => setDialogCloseHandler(null);
  }, [autoAnchor]);
  React.useEffect(() => {
    if (!autoAnchor || !requestErrors) return undefined;
    setRequestFailureHandler((f) => alertStore.reportRequestFailure(f));
    return () => setRequestFailureHandler(null);
  }, [autoAnchor, requestErrors]);

  // Resolve any alert still awaiting a decision if the provider unmounts,
  // so `await alert.confirm(...)` never hangs a caller (e.g. a route guard).
  React.useEffect(() => () => { alertStore.dismissAlert(); }, []);

  const toasts = React.useSyncExternalStore(alertStore.subscribe, alertStore.getToasts, alertStore.getToasts);
  const alertState = React.useSyncExternalStore(alertStore.subscribe, alertStore.getAlert, alertStore.getAlert);
  const theme = React.useSyncExternalStore(alertStore.subscribe, alertStore.getTheme, alertStore.getTheme);

  const anchored = React.useMemo(() => toasts.filter((t) => t.anchors), [toasts]);
  const plain = React.useMemo(() => toasts.filter((t) => !t.anchors), [toasts]);
  const snackbar = theme.appearance === "snackbar";
  const inline = snackbar || anchored.length > 0 || theme.autoAnchor;

  // group toasts by position so each corner gets its own stack
  const byPosition = React.useMemo(() => {
    if (snackbar) return {};
    const m = {};
    for (const t of plain) (m[t.position] ||= []).push(t);
    return m;
  }, [plain, snackbar]);

  const overlay = (
    <>
      {inline ? <style data-lg-feedback="css">{FEEDBACK_CSS}</style> : null}
      {snackbar ? <SnackbarStack list={plain} theme={theme} zIndex={zIndex} /> : null}
      {/* above the sweet-alert (+40) so feedback on a dialog's button — or on its held copy — is never hidden behind it */}
      {anchored.map((t) => <AnchoredFeedback key={t.id} t={t} theme={theme} zIndex={zIndex + 45} />)}
      {inline ? <Announcer /> : null}
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

import { DEFAULT_ALERT_BG } from "./alertVariants";
import {
  recentInteraction,
  attributedTap,
  isInlineText,
  isBackgroundEventContext,
  isAnchorVisible,
  snapshotDialog,
  nearestFallbackAnchor,
  doneLabelFor,
  moduleSaidSomething,
  closedByUser,
  newSurfaceSince,
  watchNewSurface,
  LEAVING_SELECTOR,
  HOLD_AFTER_DONE_MS,
  AUTO_ANCHOR_VARIANTS,
  snackbarDuration,
} from "./feedbackAnchor";

/**
 * Module-level store for the alert runtime. Toasts, the active sweet-alert, and
 * the global theme live here — NOT in React state — so notifications can be
 * fired from anywhere, including non-React code (axios interceptors, socket
 * handlers). <AlertProvider> subscribes and renders; the imperative singletons
 * (useToast / toast / message / notification / confirmModal) all push here.
 */

let toasts = [];
let alertState = null; // { id, variant, title, message, confirmLabel, cancelLabel, accent, background, scheme, busy, onConfirm, onCancel, _resolve }
// Screen-reader-only announcement for messages that are not shown visually.
let announcement = null; // { id, text, assertive }
// appearance: "card" (default, legacy look) | "snackbar" (one-line bottom bar)
// autoAnchor: show tap-triggered messages on / next to the tapped control
// effects: micro-animation on the tapped control (pop / shake)
// avoidBottom: CSS selector of fixed bottom UI the snackbar must sit above
// quietVariants: variants that are never shown as a global toast/snackbar
//   (announced to screen readers only) when they have no control to sit on
// fallback: where an error / warning with no linked control goes —
//   "snackbar" (default) or "nearest" (the open dialog's main button, the last
//   tapped control, the focused control; else screen readers only — never a bar)
let theme = {
  background: DEFAULT_ALERT_BG,
  position: "top-right",
  duration: 4500,
  scheme: undefined,
  appearance: "card",
  autoAnchor: false,
  effects: false,
  avoidBottom: undefined,
  quietVariants: [],
  fallback: "snackbar",
};

const DEDUPE_MS = 2000;
// When the last error / warning was shown (or announced): a failed request is
// only reported by us if the app showed nothing after it.
let lastErrorAt = 0;
const REQUEST_FAILURE_GRACE_MS = 450;
const reportedTaps = typeof WeakSet !== "undefined" ? new WeakSet() : null;

/** While a dialog picture is held, the first tap anywhere ends it and is swallowed. */
function swallowTapsUntilClick(onFirstTap, onCopy, baseline) {
  const types = ["pointerdown", "mousedown", "touchstart", "pointerup", "mouseup", "touchend", "click"];
  let swallowing = false;
  const off = () => {
    for (const ty of types) window.removeEventListener(ty, onEvent, { capture: true });
    window.removeEventListener("keydown", onKey, true);
  };
  // Escape closes it too, like the dialog it stands for
  function onKey(e) {
    if (e.key !== "Escape") return;
    // a newer window is open (a call window): Escape is for it — let it through
    if (!newSurfaceSince(baseline)) e.stopImmediatePropagation();
    off();
    onFirstTap();
  }
  window.addEventListener("keydown", onKey, true);
  function onEvent(e) {
    if (e.type === "pointerdown" || e.type === "touchstart" || e.type === "mousedown") {
      if (!swallowing) {
        // a non-modal copy (cookie bar): only a tap ON it is swallowed; the page around it works
        const p = e.touches && e.touches[0] ? e.touches[0] : e;
        if (onCopy && !onCopy(p.clientX, p.clientY)) { off(); onFirstTap(); return; }
        swallowing = true;
        onFirstTap();
      }
    }
    if (!swallowing) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if (e.type === "click") off();
  }
  for (const ty of types) window.addEventListener(ty, onEvent, { capture: true, passive: false });
  off.busy = () => swallowing; // a tap is mid-press: its own click releases the guard
  return off;
}
/** A message takes over the hold (it removes the picture when it leaves). */
function takeHold(hold) {
  hold.owned = true;
  clearTimeout(hold.timeout);
  if (hold.stopWatch) hold.stopWatch(); // the message's own view watches from now on
  if (hold.spin) { hold.spin.remove(); hold.spin = null; hold.twin.removeAttribute("aria-busy"); }
}
/** Fade the held picture out and stop swallowing taps. */
function dropHold(hold) {
  clearTimeout(hold.timeout);
  if (hold.stopWatch) hold.stopWatch();
  // the guard ends with the copy (a tap mid-press is released by its own click)
  const done = () => { hold.clone.remove(); if (!(hold.release.busy && hold.release.busy())) hold.release(); };
  try {
    const a = hold.clone.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, easing: "ease-in", fill: "forwards" });
    a.onfinish = done;
    setTimeout(done, 400);
  } catch { done(); }
}
const nowMs = () => Date.now();
let announceSeq = 0;

const textOf = (t) => (t.title != null && t.title !== "" ? t.title : t.message);
const isQuiet = (variant) => Array.isArray(theme.quietVariants) && theme.quietVariants.includes(variant);

/**
 * Where a new toast may be shown on screen. Returns { anchors, hint } — the
 * tapped control — or null for the global surface. Explicit `opts.anchor`
 * (Element) wins; `false` forces the global surface; undefined +
 * theme.autoAnchor follows the last tap.
 */
function resolveAnchors(o, variant, text) {
  if (o.anchor === false) return null;
  if (o.duration === 0 || o.loading) return null; // sticky / progress → global
  const hasTitle = o.title != null && o.title !== "";
  const hasBody = o.message != null && o.message !== "";
  if (hasTitle && hasBody) return null; // title + body is too much for a control
  if (!isInlineText(text) && !o.checkOnly) return null;
  if (o.anchor && typeof o.anchor === "object") return o.anchor.isConnected ? { anchors: [o.anchor], extHold: o.__hold } : null;
  if (o.anchor !== undefined || !theme.autoAnchor) return null;
  if (isBackgroundEventContext()) return null; // socket / cross-window message
  // Hard link (inside the tap's handler or the API response it started) for
  // any variant; the plain time window only for success / error.
  let tap = attributedTap();
  if (!tap && (AUTO_ANCHOR_VARIANTS.has(variant) || o.actionLabel)) tap = recentInteraction(); // an Undo must reach the user
  if (!tap) return null;
  // the tap's dialog already closed (or is animating out) and is being held:
  // the result goes on the held button — results only, never "Uploading…"
  const gone = !tap.el || !tap.el.isConnected || !!tap.el.closest(LEAVING_SELECTOR) || !isAnchorVisible(tap.el);
  if (tap.hold && !tap.hold.owned && tap.hold.twin.isConnected && gone && variant !== "info") {
    return { anchors: [tap.hold.twin], hint: tap.hint, extHold: tap.hold, tap };
  }
  if (tap.el && tap.el.isConnected) return { anchors: [tap.el], hint: tap.hint, tap };
  // the tapped menu item went away with its menu: the button that opened the menu
  if (tap.opener && tap.opener.isConnected && isAnchorVisible(tap.opener)) return { anchors: [tap.opener], tap };
  // Already removed (e.g. the card holding "Remove"), but the message carries an
  // action: it is shown where the control was when it was tapped. In the
  // no-bar mode a result does the same (the inline editor closed on save, the
  // "Make default" star went away) — unless the user closed or left it.
  const fromDialog = !!tap.snap || (tap.el && typeof tap.el.closest === "function" && !!tap.el.closest('[role=dialog],[role=alertdialog],[aria-modal="true"],.ant-modal,.ant-drawer'));
  if (tap.el && tap.rect && (o.actionLabel || (theme.fallback === "nearest" && (variant === "success" || variant === "error")
    && !fromDialog && !closedByUser(tap.t, undefined, tap.href)))) {
    return { anchors: [tap.el], hint: tap.hint, rect: tap.rect, tap };
  }
  return null;
}

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
    const variant = o.variant || "info";
    if (variant === "error" || variant === "warning") lastErrorAt = nowMs();
    const text = o.title != null && o.title !== "" ? o.title : o.message;
    let placed = resolveAnchors(o, variant, text);

    // Errors / warnings with no linked control: put them next to the nearest
    // sensible control instead of a global bar (fallback="nearest").
    const errorish = variant === "error" || variant === "warning" || !!o.actionLabel;
    if (!placed && errorish && theme.fallback === "nearest" && !o.loading && o.duration !== 0 && o.anchor !== false) {
      const el = typeof text === "string" || typeof text === "number" ? nearestFallbackAnchor() : null;
      if (el) placed = { anchors: [el] };
      else {
        alertStore.announce(text, variant);
        return o.id || nextId();
      }
    }

    // Nothing on screen to attach to, and this kind of message is quiet:
    // announce it to screen readers instead of showing a toast.
    if (!placed && isQuiet(variant) && !o.actionLabel && !o.loading && o.duration !== 0) {
      alertStore.announce(text, variant);
      return o.id || nextId();
    }

    let duration;
    if (placed) duration = 0; // the anchored component decides once it is on screen
    else if (o.duration != null) duration = o.duration;
    else if (theme.appearance === "snackbar") duration = snackbarDuration(variant);
    else duration = theme.duration;

    const anchors = placed ? placed.anchors : null;
    const primary = anchors ? anchors[0] : null;
    // A success inside a dialog: freeze a copy of the dialog NOW (the app is
    // about to close it in this same tick) so it can be held on screen until
    // the ✓ on its button has been seen.
    const extHold = placed ? placed.extHold || null : null;
    if (extHold) takeHold(extHold);
    let held = null;
    if (!extHold && primary && variant === "success" && !(placed.tap && (placed.tap.dismiss || placed.tap.clickable))) {
      if (primary.isConnected && isAnchorVisible(primary)) held = snapshotDialog(primary);
      // the dialog is already animating out: the picture taken at the tap
      const ts = placed && placed.tap && placed.tap.snap;
      if (!held && ts && ts.el === primary && !ts.clone.isConnected) held = ts;
    }
    // Where the control is right now: a message with an action (Undo) stays
    // at this spot even if the control is removed (e.g. the removed card).
    let rect = placed && placed.rect ? placed.rect : null;
    const resultish = theme.fallback === "nearest" && (variant === "success" || variant === "error");
    const inDialog = !!(primary && typeof primary.closest === "function"
      && primary.closest('[role=dialog],[role=alertdialog],[aria-modal="true"],.ant-modal,.ant-drawer,[data-lg-feedback="held"]'));
    if (!rect && primary && (o.actionLabel || (resultish && !inDialog)) && primary.isConnected) {
      const r = primary.getBoundingClientRect();
      rect = { top: r.top, left: r.left, width: r.width, height: r.height };
    }

    // Same text fired again within 2s on the same surface replaces the first
    // (double clicks, effects that fire twice) instead of stacking.
    let id = o.id;
    if (!id && theme.appearance === "snackbar") {
      const dup = toasts.find((t) => t.variant === variant && t.title === o.title && t.message === o.message
        && t.anchor === primary && nowMs() - t.createdAt < DEDUPE_MS);
      if (dup) id = dup.id;
    }
    id = id || nextId();

    const tapRef = placed && placed.tap ? placed.tap : null;
    if (tapRef) tapRef.lastMessage = { id, variant, title: o.title, message: o.message, at: nowMs() };
    const toast = {
      id,
      tapRef,
      createdAt: nowMs(),
      anchor: primary,
      anchors,
      hint: placed ? placed.hint : undefined,
      tapAt: placed && placed.tap ? placed.tap.t : undefined, // a user close after this is never held
      held,
      extHold,
      rect,
      loading: !!o.loading,
      position: o.position || theme.position,
      variant,
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
    // one message per control: a newer one on the same control replaces the older
    toasts = [...toasts.filter((t) => t.id !== id && !(primary && t.anchor === primary)), toast];
    emit();
    return id;
  },
  /**
   * A request started by a tap failed (network down / server error). If the
   * app shows no error of its own within a moment — many handlers only
   * console.error — show one on the tapped control (theme.requestErrors).
   */
  reportRequestFailure({ tap, kind, at, since, wordsAtSend }) {
    if (!theme.requestErrors || !tap || !(tap.el || tap.opener)) return;
    if (reportedTaps && reportedTaps.has(tap)) return; // one message per tap
    const alertsBefore = new Set([...document.querySelectorAll('[role=alert]:not([data-lg-feedback] *):not([data-lg-feedback])')].map((n) => n.textContent));
    setTimeout(() => {
      if (lastErrorAt >= (since ?? at)) return; // the app said something (before or after the failure)
      const fresh = [...document.querySelectorAll('[role=alert]:not([data-lg-feedback] *):not([data-lg-feedback])')]
        .some((n) => n.textContent && !alertsBefore.has(n.textContent));
      if (fresh) return; // the app showed its own inline error
      if (tap.el && moduleSaidSomething(tap.el, wordsAtSend, tap.label)) return; // …or plain text near it
      if (reportedTaps) reportedTaps.add(tap);
      const texts = theme.requestErrorText || {};
      const title = kind === "network"
        ? texts.network || "No connection. Check your internet."
        : texts.server || "Something went wrong. Try again.";
      if (tap.hold && !tap.hold.owned && tap.hold.twin.isConnected) {
        alertStore.add({ variant: "error", title, anchor: tap.hold.twin, __hold: tap.hold });
        return;
      }
      const el = tap.el.isConnected && isAnchorVisible(tap.el) ? tap.el
        : tap.opener && tap.opener.isConnected && isAnchorVisible(tap.opener) ? tap.opener : undefined;
      alertStore.add({ variant: "error", title, anchor: el });
    }, REQUEST_FAILURE_GRACE_MS);
  },
  /**
   * The dialog a tap's request came from is closing (cover picker, edit
   * profile, report, forward… close themselves on success, some even before
   * the request ends). Keep a picture of the dialog on screen, show a spinner
   * on its button while the request runs, then the result on that button —
   * the module's own message if it sends one, else the button's own verb
   * ("Save position" → "Position saved") or a ✓, or the failure — then fade.
   */
  holdForTap(owner) {
    if (!theme.autoAnchor || !owner || owner.dismiss || owner.clickable || owner.hold || !owner.snap || owner.snap.clone.isConnected) return;
    const recent = Date.now() - (owner.lastDoneAt || 0) < HOLD_AFTER_DONE_MS;
    if (!(owner.pending > 0) && !recent) return; // closed later by something else (X, Cancel)
    if (!(owner.writes > 0)) return; // only reads (a list refresh): the dialog just closes
    // a message already sits on this control and holds the dialog itself
    // (an "Uploading…" info line does not: it never holds anything)
    if (toasts.some((t) => (t.anchor === owner.el || t.tapRef === owner) && (t.held || t.extHold))) return;
    const { clone, twin } = owner.snap;
    if (owner.snap.insert) owner.snap.insert(); else document.body.appendChild(clone);
    const hold = { clone, twin, owned: false, release: () => {}, spin: null, timeout: 0 };
    // a modal copy covers the page: the first tap ends it and is swallowed; a
    // bar or popover (cookie bar, popconfirm) leaves the page usable
    const modal = !owner.snap.isModal || owner.snap.isModal();
    hold.release = swallowTapsUntilClick(() => dropHold(hold), modal ? null : owner.snap.covers, owner.snap.surfaces);
    owner.hold = hold;
    if (owner.pendingWrites > 0) {
      const spin = document.createElement("span");
      spin.className = "lgf-hold-spin";
      spin.setAttribute("aria-hidden", "true");
      twin.insertBefore(spin, twin.firstChild);
      twin.setAttribute("aria-busy", "true");
      hold.spin = spin;
    }
    hold.timeout = setTimeout(() => { if (!hold.owned) dropHold(hold); }, 20000);
    // the app opened the next thing (call window, chat, another dialog): let go at once
    hold.surfaces = owner.snap.surfaces;
    hold.stopWatch = watchNewSurface(() => { if (!hold.owned) { hold.release(); dropHold(hold); } }, hold.surfaces, owner.snap.middle);
    hold.middle = owner.snap.middle;
    let decided = false;
    // the module already said how it went (its error / success arrived just
    // before the dialog closed): show THAT on the held button, nothing generic
    const lm = owner.lastMessage;
    if (lm && nowMs() - lm.at < 1000 && lm.variant !== "info") { // (already seen for seconds on the open dialog: not again)
      decided = true;
      toasts = toasts.filter((t) => t.id !== lm.id);
      emit();
      alertStore.add({ variant: lm.variant, title: lm.title, message: lm.message, anchor: twin, __hold: hold });
      return;
    }
    const settle = () => {
      if (decided || hold.owned || owner.pendingWrites > 0) return; // the save itself, not a list refresh after it
      decided = true;
      // give the module a moment to show its own message (it then takes the hold)
      setTimeout(() => {
        if (hold.owned) return;
        if (owner.failed) {
          const texts = theme.requestErrorText || {};
          const title = owner.failKind === "network"
            ? texts.network || "No connection. Check your internet."
            : texts.server || "Something went wrong. Try again.";
          alertStore.add({ variant: "error", title, anchor: twin, __hold: hold });
        } else {
          alertStore.add({ variant: "success", title: doneLabelFor(owner.label), checkOnly: true, anchor: twin, __hold: hold });
        }
      }, REQUEST_FAILURE_GRACE_MS);
    };
    owner.onSettle = settle;
    settle();
  },
  /** Screen-reader-only message (polite; errors assertive). */
  announce(text, variant) {
    if (text == null || text === "") return;
    announcement = { id: ++announceSeq, text: String(text), assertive: variant === "error" || variant === "warning" };
    if (variant === "error" || variant === "warning") lastErrorAt = nowMs();
    emit();
  },
  getAnnouncement: () => announcement,
  /**
   * No control could show the message (it vanished before it was seen):
   * quiet variants are announced only, the rest go to the global surface.
   */
  unanchor(id) {
    const t = toasts.find((x) => x.id === id);
    if (!t || !t.anchor) return;
    if (isQuiet(t.variant) && !t.actionLabel) {
      toasts = toasts.filter((x) => x.id !== id);
      alertStore.announce(textOf(t), t.variant);
      emit();
      return;
    }
    if ((t.variant === "error" || t.variant === "warning" || t.actionLabel) && theme.fallback === "nearest") {
      const el = nearestFallbackAnchor(t.anchor);
      if (el) {
        toasts = toasts.map((x) => (x.id === id ? { ...x, anchor: el, anchors: [el], hint: undefined, held: null, createdAt: nowMs() } : x));
      } else {
        toasts = toasts.filter((x) => x.id !== id);
        alertStore.announce(textOf(t), t.variant);
      }
      emit();
      return;
    }
    const duration = theme.appearance === "snackbar" ? snackbarDuration(t.variant) : theme.duration;
    toasts = toasts.map((x) => (x.id === id
      ? { ...x, anchor: null, anchors: null, held: null, duration, showProgress: duration > 0, createdAt: nowMs() }
      : x));
    emit();
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

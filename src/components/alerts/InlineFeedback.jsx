import React from "react";
import { X } from "lucide-react";
import { resolveVariant, resolveTone, isLightBackground } from "./alertVariants";
import { alertStore } from "./alertStore";
import {
  computePlacement,
  displayFor,
  inlineDuration,
  isAnchorVisible,
  isDialogClosing,
  labelCandidates,
  errorLabelCandidates,
  LEAVING_SELECTOR,
  MAX_SIDE_CHARS,
  watchNewSurface,
  closedByUser,
  replacementAt,
  originOnPage,
  newSurfaceSince,
  containerBox,
  compactText,
  removedItem,
  listShrank,
  itemBack,
  controlIn,
  placeholderFor,
  retap,
  buttonGroupOf,
  freeOfText,
  overPicture,
} from "./feedbackAnchor";

/**
 * Inline-feedback surfaces rendered by <AlertProvider>:
 *
 *  - AnchoredFeedback: the response to a tap, shown on the control itself.
 *      success on a text button → the Live Gemini "Solid green" state, inside
 *        the button, width locked: mint fill + dark ink, a check in a circle,
 *        a pulse and a sweep of light, with the most specific phrase that
 *        fits ("✓ Withdrawal cancelled"); words alone on a small button
 *        ("Posted"); else the check alone. Never a caption, never wider.
 *      error on a text button → red fill, the button shakes, the error's
 *        first words ("No connection") or a common "Failed".
 *      everything else (icons, switches, upload areas, warnings) → an inline
 *        message: icon + text in the variant colour directly under (or beside)
 *        the control, no box — like a form field error.
 *    If the control's dialog closes on success, a frozen copy of the dialog is
 *    held on screen until the ✓ has been seen.
 *  - SnackbarStack / Snackbar: one-line bar at the bottom centre, only for
 *    messages that have no control to sit on and are not quiet variants.
 *  - Announcer: screen-reader-only live region for quiet messages.
 *
 * Colours come from the existing alert theme (background + tone + variant
 * accent). Nothing here ever blocks the page: bodies are click-through, only
 * their own action / close buttons take pointer events. Motion lives in
 * FEEDBACK_CSS (injected once by the provider) so prefers-reduced-motion can
 * switch it off in one place.
 */

export const FEEDBACK_CSS = `
.lgf-pop{position:fixed;top:0;left:0;visibility:hidden;box-sizing:border-box;display:flex;align-items:flex-start;gap:6px;max-width:300px;padding:1px 0;font:600 12.5px/1.35 'Manrope',system-ui,-apple-system,sans-serif;pointer-events:none;text-shadow:0 1px 2px rgba(0,0,0,.65)}
.lgf-pop>svg{flex:none;margin-top:1.5px}
.lgf-pop>.lgf-text{min-width:0;overflow-wrap:anywhere;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.lgf-pop[data-variant=success]{color:#7CF0B4}.lgf-pop[data-variant=error]{color:#FF8A9E}.lgf-pop[data-variant=warning]{color:#FFC266}.lgf-pop[data-variant=info]{color:#8FF3F7}
.lgf-pop[data-tone=light]{text-shadow:none}
.lgf-pop[data-tone=light][data-variant=success]{color:#0E7A45}.lgf-pop[data-tone=light][data-variant=error]{color:#C42343}.lgf-pop[data-tone=light][data-variant=warning]{color:#A65F00}.lgf-pop[data-tone=light][data-variant=info]{color:#0B7F84}
.lgf-pop .lgf-act{padding:0 0 0 8px;text-decoration:underline;text-underline-offset:2px}
.lgf-pop[data-compact]>.lgf-text{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lgf-pop[data-onmedia]{padding:3px 8px;border-radius:8px;background:rgba(14,9,26,.96);box-shadow:0 4px 14px rgba(0,0,0,.35);text-shadow:none;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.lgf-pop[data-onmedia]>svg{margin-top:2px}
/* over the dimmed copy of a removed card: a small chip, readable on any picture */
.lgf-pop[data-side=inside]{align-items:center;padding:7px 14px;border-radius:999px;background:rgba(14,9,26,.96);box-shadow:0 6px 20px rgba(0,0,0,.35);text-shadow:none;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.lgf-pop[data-side=inside]>svg{margin-top:0}
.lgf-pop[data-side=inside][data-narrow]{white-space:nowrap;padding:5px 9px;gap:4px}
.lgf-pop[data-side=inside][data-narrow]>svg{display:none}
.lgf-pop[data-tone=light][data-side=inside]{background:rgba(255,255,255,.94);box-shadow:0 6px 20px rgba(20,10,40,.18)}
/* host apps may colour every <span> (interactive-twin global-theme.css: span{color:#fff}) —
   feedback text always takes its own state colour */
[data-lg-feedback]:not([data-lg-feedback=held]):not([data-lg-feedback=ghost]) span{color:inherit}
/* In-button state — Live Gemini "Solid green" save button (design export
   export-success-button / .lg-save--solid): mint fill, dark ink, a check in a
   soft circle, a pulse and a sweep of light; failure = red fill + shake. */
.lgf-morph{position:fixed;top:0;left:0;visibility:hidden;box-sizing:border-box;display:flex;align-items:center;justify-content:center;padding:0 12px;overflow:hidden;white-space:nowrap;line-height:1;pointer-events:none;border:0;
  color:#03251A;background:linear-gradient(135deg,#3cf0a8,#16c07c);box-shadow:0 14px 34px -12px rgba(47,224,154,.7)}
.lgf-morph[data-fit=swap],.lgf-morph[data-variant=error]{padding:0 8px}
.lgf-morph .lgf-in{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-width:0;max-width:100%}
.lgf-morph .lgf-tick{flex:none;display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:rgba(3,37,26,.16);color:#03251A}
.lgf-morph[data-fit=swap] .lgf-tick{display:none}
.lgf-morph .lgf-mlabel{display:inline-block;min-width:0;overflow:hidden}
.lgf-morph[data-variant=error]{color:#fff;background:linear-gradient(135deg,#ff6b85,#e0335a);box-shadow:0 14px 34px -12px rgba(255,77,109,.7)}
.lgf-morph[data-variant=error] .lgf-tick{background:rgba(255,255,255,.18);color:#fff}
.lgf-morph[data-variant=error][data-fit=text] .lgf-tick{display:none}
[data-lg-feedback=held],[data-lg-feedback=held] *:not(.lgf-hold-spin){animation:none!important;transition:none!important}
.lgf-hold-spin{display:inline-block;flex:none;width:16px;height:16px;margin-right:8px;vertical-align:-3px;box-sizing:border-box;border-radius:50%;border:2.5px solid currentColor;border-right-color:transparent;opacity:.9;animation:lgf-spin .7s linear infinite}
.lgf-on{visibility:visible}
.lgf-snack{box-sizing:border-box;display:flex;align-items:center;gap:10px;width:max-content;max-width:min(92vw,440px);padding:10px 14px;border-radius:12px;font:600 13.5px/1.35 'Manrope',system-ui,-apple-system,sans-serif;pointer-events:none;backdrop-filter:blur(22px) saturate(140%);-webkit-backdrop-filter:blur(22px) saturate(140%)}
.lgf-snack>.lgf-text{min-width:0;overflow-wrap:anywhere}
.lgf-act,.lgf-x{pointer-events:auto}
.lgf-act{flex:none;background:none;border:0;padding:0 0 0 10px;margin:0;cursor:pointer;font:inherit;font-weight:800;color:inherit}
.lgf-x{flex:none;display:grid;place-items:center;width:22px;height:22px;margin:-2px -4px -2px 0;border:0;border-radius:6px;background:transparent;cursor:pointer}
.lgf-act:focus-visible,.lgf-x:focus-visible{outline:2px solid currentColor;outline-offset:2px}
.lgf-spin{flex:none;width:14px;height:14px;border-radius:50%;border:2px solid currentColor;border-right-color:transparent;animation:lgf-spin .7s linear infinite}
@media (prefers-reduced-motion: no-preference){
  .lgf-pop.lgf-on{animation:lgf-in-down 160ms cubic-bezier(.2,.8,.2,1) both}
  .lgf-pop.lgf-on[data-side=above]{animation-name:lgf-in-up}
  .lgf-pop.lgf-on[data-side=right]{animation-name:lgf-in-left}
  /* success: appear → pulse; check draws; light sweeps across */
  .lgf-morph.lgf-on{animation:lgf-fade-in 120ms ease-out both,lgf-pulse .5s ease-out}
  .lgf-morph.lgf-on .lgf-tick path{stroke-dasharray:22;stroke-dashoffset:22;animation:lgf-draw .45s .12s ease-out forwards}
  .lgf-morph.lgf-on[data-variant=success]::after{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;
    background:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.45) 50%,transparent 70%);transform:translateX(-120%);animation:lgf-shine .9s .15s ease-out forwards}
  /* failure: the real button shakes (lgf-fx-shake) and this red state rides on it */
  .lgf-morph.lgf-on[data-variant=error]{animation:lgf-fade-in 120ms ease-out both}
  .lgf-snack{animation:lgf-snack-in 160ms cubic-bezier(.2,.8,.2,1) both}
  .lgf-pop.lgf-out,.lgf-snack.lgf-out{animation:lgf-out 120ms ease-in both}
  .lgf-morph.lgf-out{animation:lgf-out 180ms ease-in both}
  .lgf-fx-pop{animation:lgf-fx-pop 350ms cubic-bezier(.34,1.56,.64,1)}
  .lgf-fx-shake{animation:lgf-fx-shake .4s}
}
@media (prefers-reduced-motion: reduce){
  .lgf-pop.lgf-on,.lgf-morph.lgf-on,.lgf-snack{animation:lgf-fade-in 120ms ease both}
  .lgf-pop.lgf-out,.lgf-morph.lgf-out,.lgf-snack.lgf-out{animation:lgf-out 120ms ease both}
  .lgf-spin{animation-duration:2s}
}
@keyframes lgf-in-down{from{opacity:0;transform:translateY(-3px)}to{opacity:1;transform:none}}
@keyframes lgf-in-up{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:none}}
@keyframes lgf-in-left{from{opacity:0;transform:translateX(-3px)}to{opacity:1;transform:none}}
@keyframes lgf-pulse{0%{transform:scale(1)}40%{transform:scale(1.035)}100%{transform:scale(1)}}
@keyframes lgf-shine{to{transform:translateX(120%)}}
@keyframes lgf-draw{to{stroke-dashoffset:0}}
@keyframes lgf-snack-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes lgf-fade-in{from{opacity:0}to{opacity:1}}
@keyframes lgf-out{to{opacity:0}}
@keyframes lgf-spin{to{transform:rotate(360deg)}}
@keyframes lgf-fx-pop{0%{transform:scale(1)}15%{transform:scale(.85)}45%{transform:scale(1.18)}70%{transform:scale(.96)}100%{transform:scale(1)}}
@keyframes lgf-fx-shake{20%,60%{transform:translateX(-5px)}40%,80%{transform:translateX(5px)}}
`;

/** Visually hidden but read by screen readers (inline so it works without FEEDBACK_CSS). */
const SR_ONLY = {
  position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden",
  clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0,
};

const EXIT_MS = 120;
const WAIT_MS = 1000; // never wait longer than this for a control to become visible
const isErrorish = (v) => v === "error" || v === "warning";
const textOf = (t) => (t.title != null && t.title !== "" ? t.title : t.message);

let measureCtx;
/** An error that says something the user can act on (not just "failed" / "try again"). */
function meaningful(text) {
  const t = String(text ?? "").trim();
  return t.length > 0 && !/^(?:something went wrong|failed|error|request failed|network error|no connection|try again|oops)\b/i.test(t);
}

function measureText(s, font) {
  const jsdom = typeof navigator !== "undefined" && /jsdom/i.test(navigator.userAgent || "");
  if (!measureCtx && !jsdom) {
    try { measureCtx = document.createElement("canvas").getContext("2d"); } catch { measureCtx = null; }
  }
  if (!measureCtx) return s.length * 7.5;
  measureCtx.font = font;
  return measureCtx.measureText(s).width;
}

/**
 * Auto-dismiss timer that pauses while a button inside is hovered or focused.
 * Restarts when `restartKey` changes (re-fired or re-shown).
 */
function useDismissTimer(ref, duration, onExpire, restartKey) {
  const expireRef = React.useRef(onExpire);
  expireRef.current = onExpire;
  React.useEffect(() => {
    const el = ref.current;
    if (!duration || !el) return undefined;
    let remaining = duration;
    let started = Date.now();
    let timer = setTimeout(() => expireRef.current(), remaining);
    let paused = false;
    const pause = () => {
      if (paused) return;
      paused = true;
      clearTimeout(timer);
      remaining = Math.max(0, remaining - (Date.now() - started));
    };
    const resume = () => {
      if (!paused) return;
      if (el.querySelector(":hover") || el.contains(document.activeElement)) return;
      paused = false;
      started = Date.now();
      timer = setTimeout(() => expireRef.current(), remaining);
    };
    // Hovering the action / close button pauses; the body is click-through.
    el.addEventListener("mouseover", pause);
    el.addEventListener("mouseout", resume);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);
    return () => {
      clearTimeout(timer);
      el.removeEventListener("mouseover", pause);
      el.removeEventListener("mouseout", resume);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", resume);
    };
  }, [ref, duration, restartKey]);
}

/** Play a short exit fade, then remove from the store. */
function useExit(id) {
  const [leaving, setLeaving] = React.useState(false);
  const close = React.useCallback(() => {
    setLeaving(true);
    setTimeout(() => alertStore.dismiss(id), EXIT_MS);
  }, [id]);
  return [leaving, close];
}

function ActionButton({ label, onAction, color, close }) {
  if (!label) return null;
  return (
    <button
      type="button"
      className="lgf-act"
      style={color ? { color, borderLeft: "1px solid rgba(128,128,128,.28)" } : undefined}
      onClick={() => { try { onAction?.(); } finally { close(); } }}
    >
      {label}
    </button>
  );
}


// ---------------------------------------------------------------------------
// Anchored feedback (morph or pop)
// ---------------------------------------------------------------------------

/**
 * @param {object} props
 * @param {object} props.t        toast record from alertStore (has .anchors, maybe .held)
 * @param {object} props.theme    alertStore theme
 * @param {number} props.zIndex
 */
export function AnchoredFeedback({ t, theme, zIndex }) {
  const ref = React.useRef(null);
  const [leaving, close] = useExit(t.id);
  const [view, setView] = React.useState(null); // { el, mode, kind, label?, fit?, lw?, radius?, font? }
  const [shownAt, setShownAt] = React.useState(0);
  const viewRef = React.useRef(null);
  viewRef.current = view;
  const holdRef = React.useRef(null); // { clone, release } while a dialog copy is on screen
  const ghostRef = React.useRef(null); // placeholder where a removed control was (actionable messages)
  const leavingRef = React.useRef(false);
  const actedRef = React.useRef(false); // the message's action (Undo) was pressed

  const text = textOf(t);
  const errorish = isErrorish(t.variant);
  const { color, Icon } = resolveVariant(t.variant, t.accent);
  const background = t.background ?? theme.background;
  const scheme = t.scheme ?? theme.scheme;
  const light = scheme ? scheme === "light" : isLightBackground(background);

  // State machine, driven every frame:
  //   wait  — the control must be on screen and uncovered
  //   probe — rendered + positioned but hidden for two frames
  //   shown — visible; follows the control (scroll, layout shifts)
  // A success inside a dialog carries a frozen copy of that dialog (t.held).
  // The moment the real dialog starts closing, the copy is put in its place
  // and the ✓ moves onto the copy's button, so the user sees the result on
  // the dialog, right where they tapped. The copy leaves with the ✓.
  React.useLayoutEffect(() => {
    if (!ref.current || !t.anchors || !t.anchors.length) return undefined;
    let raf = 0;
    let alive = true;
    let lastKey = "";
    let anchor = t.anchors[0];
    // the dialog was already closed and is held by the store (close guard):
    // this message shows on the held button and removes the picture when it leaves
    let isTwin = !!t.extHold;
    let stopWatch = null;
    // a dialog or popup the app opens next ends the held copy (and this message)
    const watchNext = () => {
      if (!stopWatch) {
        stopWatch = watchNewSurface(() => {
          const h = holdRef.current;
          if (h && h.release) h.release(); // the next tap belongs to the new window
          close();
        }, (t.extHold && t.extHold.surfaces) || (t.held && t.held.surfaces), (t.extHold && t.extHold.middle) || (t.held && t.held.middle));
      }
    };
    if (t.extHold) { holdRef.current = t.extHold; watchNext(); }
    let lastRect = null;
    let box = null; // the card the control sits in (inline messages stay inside it)
    // where the tapped control sat at the tap (its card, that card's list)
    const tr = t.tapRef || {};
    const trail = [tr.trail, tr.openerTrail].find((x) => x && x[0] && x[0].el === t.anchors[0]) || null;
    let slotWatch = null; // the removed item coming back (Undo, a failed remove) ends its copy
    let replaceUntil = 0; // a list still redrawing: look a moment longer for what replaced the control
    let inside = false; // shown inside the empty slot of a removed card
    let standIn = false; // a chip where a vanished control was (no copy of its card)
    const st = { phase: "wait", frames: 0, since: performance.now() };
    // the user closed the dialog themselves (X, Cancel, Escape, a tap outside):
    // it goes at once — no picture put back; the message ends with it
    const since = typeof t.tapAt === "number" ? t.tapAt : st.since;
    const href = window.location.href;
    const path = window.location.pathname;
    let relocateUntil = 0;
    let forcePop = false; // beside a row on the page the user came back to: inline text, not a green bar
    // the save sent the user back a page (navigate(-1)): show the result beside
    // the row that led to where it was saved ("Display name" on /settings)
    const relocate = () => {
      if (theme.fallback !== "nearest" || !(t.variant === "success" || errorish) || window.location.pathname === path) return false;
      if (!relocateUntil) {
        relocateUntil = performance.now() + 1500;
        if (ref.current) ref.current.style.visibility = "hidden"; // never float over the new page while looking
      }
      const o = originOnPage(path);
      if (o) {
        anchor = o;
        isTwin = false;
        relocateUntil = 0;
        forcePop = true;
        if (ref.current) ref.current.style.visibility = "";
        enter(o);
        return true;
      }
      return performance.now() < relocateUntil; // the page is still rendering: keep looking
    };
    const userClosed = () => {
      if (!t.held || isTwin || !closedByUser(since, performance.now(), href)) return false;
      alive = false;
      if (st.phase === "shown") close(); else alertStore.unanchor(t.id);
      return true;
    };
    const schedule = () => { raf = requestAnimationFrame(step); };

    const hold = () => {
      const { clone, twin } = t.held;
      if (t.held.insert) t.held.insert(); else document.body.appendChild(clone);
      const modal = !t.held.isModal || t.held.isModal(); // a bar / popover copy leaves the page around it usable
      // The copy is only a picture: the first tap anywhere ends it and is
      // swallowed, so nothing behind the "modal" is clicked by mistake.
      const types = ["pointerdown", "mousedown", "touchstart", "pointerup", "mouseup", "touchend", "click"];
      let swallowing = false;
      const onEvent = (e) => {
        if (e.type === "pointerdown" || e.type === "touchstart" || e.type === "mousedown") {
          if (!swallowing) {
            // a non-modal copy (a bar, a popover): only a tap ON it is swallowed; the page around it works
            const p = e.touches && e.touches[0] ? e.touches[0] : e;
            if (!modal && t.held.covers && !t.held.covers(p.clientX, p.clientY)) { release(); close(); return; }
          }
          swallowing = true;
          close();
        }
        if (!swallowing) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        if (e.type === "click") release();
      };
      // Escape closes it too, like the dialog it stands for
      const onKey = (e) => {
        if (e.key !== "Escape") return;
        // a newer window is open (a call window): Escape is for it — let it through
        if (!newSurfaceSince(t.held.surfaces)) e.stopImmediatePropagation();
        release();
        close();
      };
      const release = () => {
        for (const ty of types) window.removeEventListener(ty, onEvent, { capture: true });
        window.removeEventListener("keydown", onKey, true);
      };
      release.busy = () => swallowing; // a tap is mid-press: its own click releases the guard
      for (const ty of types) window.addEventListener(ty, onEvent, { capture: true, passive: false });
      window.addEventListener("keydown", onKey, true);
      holdRef.current = { clone, release };
      anchor = twin;
      isTwin = true;
      watchNext();
    };

    // A message with an action (Undo) must stay reachable: keep it at the spot
    // where its control was (e.g. the card that was just removed).
    const toGhost = () => {
      // an Undo must stay reachable; a result whose row went away with a list
      // refresh (approved request, accepted order) stays where it was tapped
      const keep = t.actionLabel
        || (theme.fallback === "nearest" // the app's no-bar mode; the default mode moves it to the bar
          && (t.variant === "success" || errorish) && (st.phase !== "wait" || !!t.rect) && !t.held
          && !(t.anchors[0] && t.anchors[0].closest && t.anchors[0].closest('[role=dialog],[role=alertdialog],[aria-modal="true"],.ant-modal,.ant-drawer'))
          && !closedByUser(since, performance.now(), href));
      if (!keep || ghostRef.current) return false;
      // the whole card / row went: its message sits in the card's empty slot,
      // which keeps its place in the list (the next card does not slide under it)
      const item = removedItem(trail);
      const slot = item && item.el !== t.anchors[0] && listShrank(item) ? placeholderFor(item) : null;
      if (slot) {
        ghostRef.current = slot;
        anchor = slot;
        isTwin = true;
        inside = true;
        if (typeof MutationObserver === "function") {
          slotWatch = new MutationObserver(() => {
            if (!itemBack(item)) return;
            slotWatch.disconnect();
            if (ghostRef.current === slot) { slot.remove(); ghostRef.current = null; }
            alive = false;
            close();
          });
          slotWatch.observe(item.parent, { childList: true });
        }
        if (st.phase === "shown") enter(slot);
        else { st.phase = "wait"; st.since = performance.now(); }
        return true;
      }
      const g = lastRect || t.rect;
      if (!g || !(g.width > 0) || g.top >= window.innerHeight || g.top + g.height <= 0) return false;
      const ghost = document.createElement("div");
      ghost.setAttribute("data-lg-feedback", "ghost");
      ghost.setAttribute("aria-hidden", "true");
      ghost.style.cssText = `position:fixed;top:${g.top}px;left:${g.left}px;width:${g.width}px;height:${g.height}px;pointer-events:none;visibility:hidden`;
      document.body.appendChild(ghost);
      ghostRef.current = ghost;
      anchor = ghost;
      isTwin = true; // geometry-only visibility, like the held copy
      // the result in words on a small dark chip where the control was — it reads
      // as a note about the tap, never as a button (even if the list moves under it)
      inside = true;
      standIn = true; // short words, one line
      if (st.phase === "shown") enter(ghost);
      else { st.phase = "wait"; st.since = performance.now(); }
      return true;
    };

    // Width is locked to the button. The most specific phrase that fits
    // goes beside the ✓ ("both"), or replaces it on a small button
    // ("swap"); else the ✓ alone ("icon"). Never a generic word.
    // success: ✓ in a 24px circle + 10px gap + words ("both"); words alone
    // when the circle does not fit ("swap"); else the ✓ alone ("icon").
    // failure (design): the words alone on red ("text"); else ✕ alone.
    const morphLabel = (el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const weight = Math.max(600, parseInt(cs.fontWeight, 10) || 600);
      const font = `${weight} ${cs.fontSize} ${cs.fontFamily}`;
      const roomBoth = r.width - 24 - (24 + 10) - 2; // padding 12×2, circle + gap
      const roomText = r.width - 16 - 2; // padding 8×2
      if (t.variant === "error") {
        for (const cand of errorLabelCandidates(text, theme.failedLabel)) {
          const w = Math.ceil(measureText(cand, font));
          if (w <= roomText) return { label: cand, fit: "text", lw: w, cs, weight };
        }
      } else {
        for (const cand of labelCandidates(text)) {
          const w = Math.ceil(measureText(cand, font));
          if (w <= roomBoth) return { label: cand, fit: "both", lw: w, cs, weight };
          if (w <= roomText) return { label: cand, fit: "swap", lw: w, cs, weight };
        }
      }
      return { label: "", fit: "icon", lw: 0, cs, weight };
    };

    const enter = (el) => {
      // an icon fused into a pill ("12.00 CR | cart"): the result shows inside the
      // pill when its words fit there, instead of a line of text off the card
      if ((t.variant === "success" || t.variant === "error") && el === t.anchors[0] && !forcePop && !inside) {
        const g = buttonGroupOf(el);
        const m = g ? morphLabel(g) : null;
        if (m && m.fit !== "icon" && m.label !== (theme.failedLabel || "Failed")) { anchor = g; el = g; }
      }
      let d = displayFor(t.variant, el, el === t.anchors[0] ? t.hint : undefined);
      if (inside) d = { mode: "pop", kind: "generic" };
      // the reason does not fit the button and "Failed" would hide it ("Follow this
      // creator to start a conversation"): say it in a line next to the button instead
      let reasonLine = false;
      if (d.mode === "morph" && errorish && meaningful(text) && morphLabel(el).label === (theme.failedLabel || "Failed")) {
        d = { mode: "pop", kind: d.kind };
        reasonLine = true;
      }
      // a small removed tile (a thumbnail): its short words, on one line, inside it
      const narrow = inside && (standIn || el.getBoundingClientRect().width < 260);
      if (forcePop) d = { mode: d.kind === "switch" ? "side" : "pop", kind: d.kind };
      let extra = {};
      if (d.mode === "morph") {
        const m = morphLabel(el);
        extra = {
          ...extra,
          label: m.label,
          fit: m.fit,
          lw: m.lw,
          radius: m.cs.borderRadius,
          font: { fontFamily: m.cs.fontFamily, fontSize: m.cs.fontSize, fontWeight: m.weight },
        };
      }
      if (d.mode !== "morph") {
        // beside a tiny control ("…", an icon): the shortest specific words, inside its card
        const er = el.getBoundingClientRect();
        box = containerBox(el);
        if (d.kind === "icon" || er.width < 64 || narrow || reasonLine) {
          // the shortest specific words — and if even those do not fit the card,
          // a shorter version that still says it ("Unpublished", "Couldn't add"),
          // never a word cut in half
          // card width less its margin, the icon + gap, the backing's padding and a little slack
          const room = Math.min(standIn || reasonLine ? 340 : Infinity, (box ? box.right - box.left - 16 : window.innerWidth - 24)) - 20 - (inside ? 28 : 16) - 6;
          const first = compactText(text, t.variant);
          const pool = t.variant === "success" || t.variant === "info" ? labelCandidates(text) : errorLabelCandidates(text, "").slice(0, -1);
          const fits = (x) => measureText(x, "600 12.5px Manrope, system-ui, sans-serif") <= room;
          const short = fits(first) ? first : (pool.filter((x) => x.length < first.length).find(fits) || first);
          extra = { ...extra, text: short, compact: true };
        }
      }
      st.phase = "probe";
      st.frames = 0;
      setView({ el, ...d, ...extra, inside, narrow });
    };

    const step = () => {
      if (!alive || leavingRef.current) return; // fading out where it is
      if (t.held && !isTwin && isDialogClosing(t.held)) {
        if (userClosed()) return;
        const was = st.phase;
        hold();
        if (was === "shown") {
          // already visible on the real button: carry it over without a blink
          setView((v) => (v ? { ...v, el: anchor } : v));
          setShownAt(Date.now()); // give the held dialog a full beat
        } else {
          st.phase = "wait";
          st.since = performance.now();
        }
      }
      const a = anchor;
      if (st.phase === "wait") {
        if (!a.isConnected && t.held && !isTwin) {
          if (userClosed()) return;
          hold(); st.since = performance.now(); schedule(); return;
        }
        if (!a.isConnected) {
          if (relocate()) { schedule(); return; }
          // re-rendered in place before it was ever drawn (Accept → Deliver clip in the same tick)
          // (an error belongs to the control that failed — it only follows that same
          // item back into its list, wherever it now sits; never onto a neighbour)
          const back = !isTwin && errorish ? controlIn(itemBack(removedItem(trail)), trail, removedItem(trail)) : null;
          const next = back || (!isTwin && !errorish && !(t.held && isDialogClosing(t.held)) ? replacementAt(lastRect || t.rect, trail) : null);
          if (next) { anchor = next; schedule(); return; }
          // not taken out of its list: the list is still being drawn again — give it a moment
          const it = removedItem(trail);
          if (it && !listShrank(it) && !isTwin && !errorish) {
            if (!replaceUntil) replaceUntil = performance.now() + 300;
            if (performance.now() < replaceUntil) { schedule(); return; }
          }
          if (toGhost()) { schedule(); return; }
          alive = false; alertStore.unanchor(t.id); return;
        }
        // the held copy is on top by construction; live controls must be uncovered
        if (isTwin ? a.getBoundingClientRect().width > 0 : isAnchorVisible(a)) enter(a);
        else if (performance.now() - st.since > WAIT_MS) { alive = false; alertStore.unanchor(t.id); return; }
        schedule();
        return;
      }
      const r = a.getBoundingClientRect();
      const gone = !a.isConnected || (!isTwin && a.closest(LEAVING_SELECTOR))
        || (r.width === 0 && r.height === 0) || r.bottom < 0 || r.top > window.innerHeight;
      if (gone && relocate()) { schedule(); return; }
      // the control was re-rendered in place (a list refresh swapped "Accept"
      // for "Deliver clip"): the result stays on what now sits there
      if (gone && !isTwin && !errorish && (lastRect || t.rect) && !(t.held && isDialogClosing(t.held))) {
        const next = replacementAt(lastRect || t.rect, trail); // swapped on the very first frame: where it was at the message
        if (next && next !== a) {
          anchor = next;
          if (st.phase === "shown") setView((v) => (v ? { ...v, el: next } : v));
          else { st.phase = "wait"; st.since = performance.now(); }
          schedule();
          return;
        }
      }
      if (gone && toGhost()) { schedule(); return; }
      if (gone && t.held && !isTwin) {
        if (userClosed()) return;
        // the dialog is going away and we hold its picture: put it in place
        const was = st.phase;
        hold();
        if (was === "shown") { setView((v) => (v ? { ...v, el: anchor } : v)); setShownAt(Date.now()); }
        else { st.phase = "wait"; st.since = performance.now(); }
        schedule();
        return;
      }
      if (!gone) lastRect = { top: r.top, left: r.left, width: r.width, height: r.height };
      if (gone) {
        alive = false;
        if (st.phase === "probe" || errorish) alertStore.unanchor(t.id); // never seen / errors must reach the user
        else close();
        return;
      }
      const v = viewRef.current;
      const root = ref.current; // always the live node (the view may have re-rendered)
      if (!v || v.el !== a || !root) { schedule(); return; } // React has not rendered this view yet
      if (root.dataset.lgfMode !== v.mode) {
        // the node is reused across views: drop the other view's hand-set geometry
        for (const k of ["top", "left", "width", "height", "maxWidth"]) root.style[k] = "";
        root.dataset.lgfMode = v.mode;
        lastKey = "";
      }
      if (v.mode === "morph") {
        const key = `${r.top}|${r.left}|${r.width}|${r.height}|m`;
        if (key !== lastKey) {
          lastKey = key;
          root.style.top = `${r.top}px`;
          root.style.left = `${r.left}px`;
          root.style.width = `${r.width}px`;
          root.style.height = `${r.height}px`;
        }
      } else if (v.inside) {
        // centred on the removed card's copy (its visible part), inside its card and the screen
        root.style.maxWidth = v.narrow ? `${Math.min(window.innerWidth - 16, 380)}px` : `${Math.max(140, r.width - 24)}px`;
        const vh = window.innerHeight;
        const top = Math.max(r.top, 8);
        const bottom = Math.min(r.bottom, vh - 8);
        const pt = Math.round(Math.max(top, (top + bottom) / 2 - root.offsetHeight / 2));
        const w = root.offsetWidth;
        const lo = Math.max(8, box ? box.left + 4 : 8);
        const hi = Math.min(window.innerWidth - 8, box ? box.right - 4 : window.innerWidth - 8) - w;
        const pl = Math.round(Math.min(Math.max(r.left + r.width / 2 - w / 2, lo), Math.max(lo, hi)));
        const key = `${pt}|${pl}|i`;
        if (key !== lastKey) {
          lastKey = key;
          root.style.top = `${pt}px`;
          root.style.left = `${pl}px`;
          root.dataset.side = "inside";
          if (v.narrow) root.dataset.narrow = "1"; else delete root.dataset.narrow;
        }
      } else {
        const side = v.mode === "side" && String(text).length <= MAX_SIDE_CHARS ? "right" : "below";
        // the inline message may be as wide as a wide control (upload area), else 320px;
        // wider than its control → it starts at the control's left edge (like a field
        // error) instead of spilling out on both sides
        const boxW = box ? box.right - box.left - 16 : Infinity;
        root.style.maxWidth = `${Math.min(Math.max(320, Math.min(r.width, 480)), Math.max(140, boxW))}px`;
        let align = side === "below" && (r.width >= 200 || root.offsetWidth > r.width + 4) ? "start" : "center";
        // a small control on the right half of its card ("…" in a post header): end at its right edge
        if (side === "below" && r.width < 64 && box && root.offsetWidth > r.width + 4) {
          align = r.left + r.width / 2 > (box.left + box.right) / 2 ? "end" : "start";
        }
        const p = computePlacement(r, root.offsetWidth, root.offsetHeight, side, window.innerWidth, window.innerHeight, align, box);
        // a control on the bottom edge of its card (price | cart): below would hang
        // off the card — above it instead, inside the card (backed if over its words)
        if (p.side === "below" && box && p.top + root.offsetHeight > box.bottom) {
          const h = root.offsetHeight;
          const up = r.top - 6 - h;
          if (up >= box.top + 4 && up >= 8) {
            p.top = up;
            p.side = "above";
          }
        }
        const key = `${Math.round(p.top)}|${Math.round(p.left)}|${p.side}|${r.left}|${r.top}|p`;
        if (key !== lastKey) {
          lastKey = key;
          root.style.top = `${p.top}px`;
          root.style.left = `${p.left}px`;
          root.dataset.side = p.side;
          // on a photo / cover image, or over the page's own words, the text gets a
          // dark backing to stay readable (like a tooltip)
          const at = { top: p.top, left: p.left, width: root.offsetWidth, height: root.offsetHeight };
          if (overPicture(at) || !freeOfText(at)) root.dataset.onmedia = "1";
          else delete root.dataset.onmedia;
        }
      }
      st.frames += 1;
      if (st.phase === "probe" && (st.frames >= 2 || isTwin)) { // a held copy is stable: no hidden probe frames
        st.phase = "shown";
        setShownAt(Date.now());
      }
      schedule();
    };
    step();
    return () => { alive = false; cancelAnimationFrame(raf); if (stopWatch) stopWatch(); if (slotWatch) slotWatch.disconnect(); };
  }, [t.id, t.anchors]); // eslint-disable-line react-hooks/exhaustive-deps -- one run per message

  // The held dialog copy leaves together with the ✓ (and never outlives it).
  React.useEffect(() => {
    leavingRef.current = leaving;
    const gh = ghostRef.current;
    if (leaving && gh) {
      ghostRef.current = null;
      // Undo puts the real card back in its place at once; otherwise the copy fades away
      if (actedRef.current || !gh.style.transition) gh.remove();
      else {
        gh.style.opacity = "0";
        setTimeout(() => gh.remove(), 220);
      }
    }
    const h = holdRef.current;
    if (!leaving || !h) return;
    holdRef.current = null;
    // the guard ends with the copy (a tap mid-press is released by its own click)
    const done = () => { h.clone.remove(); if (!(h.release.busy && h.release.busy())) h.release(); };
    try {
      const anim = h.clone.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, easing: "ease-in", fill: "forwards" });
      anim.onfinish = done;
      setTimeout(done, 400); // safety net
    } catch { done(); }
  }, [leaving]);
  React.useEffect(() => () => {
    const h = holdRef.current;
    if (h) { h.clone.remove(); h.release(); }
    if (ghostRef.current) { ghostRef.current.remove(); ghostRef.current = null; }
  }, []);

  // Micro-effect on the tapped control itself: a failure always shakes it
  // (the standard "that didn't work" cue); the success pop on icons is
  // feature-flagged (theme.effects).
  React.useEffect(() => {
    if (!shownAt || !view || !view.el || view.el.closest?.('[data-lg-feedback="ghost"]')) return undefined;
    // (in a button the red state is positioned from the control every frame, so it rides along)
    const cls = errorish ? "lgf-fx-shake" : (theme.effects && t.variant === "success" && view.kind === "icon" ? "lgf-fx-pop" : null);
    if (!cls) return undefined;
    const a = view.el;
    const ar = a.getBoundingClientRect();
    const control = a.matches("button,[role=button],input,select,textarea,.ant-btn,a,[role=switch],[role=checkbox],label,[data-lg-feedback=ghost]");
    // a section / card: the message alone is enough (a full-width button still shakes)
    if (control ? ar.height > 120 : (ar.width > 480 || ar.height > 200)) return undefined;
    a.classList.remove("lgf-fx-pop", "lgf-fx-shake");
    void a.offsetWidth; // restart the animation if it is already running
    a.classList.add(cls);
    let done = false;
    // the app re-rendering the button (its loading state ends) rewrites its
    // className: put the effect back so the shake is still seen
    const mo = typeof MutationObserver === "function"
      ? new MutationObserver(() => { if (!done && !a.classList.contains(cls)) a.classList.add(cls); })
      : null;
    if (mo) mo.observe(a, { attributes: true, attributeFilter: ["class"] });
    const clear = () => { done = true; if (mo) mo.disconnect(); a.classList.remove(cls); };
    const onEnd = (e) => { if (e.target === a) clear(); };
    a.addEventListener("animationend", onEnd);
    const timer = setTimeout(clear, 700);
    return () => { clearTimeout(timer); a.removeEventListener("animationend", onEnd); clear(); };
  }, [shownAt]); // eslint-disable-line react-hooks/exhaustive-deps

  // Errors stay until they time out or the user taps anywhere else.
  React.useEffect(() => {
    if (!errorish || !shownAt) return undefined;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) close(); };
    const arm = setTimeout(() => document.addEventListener("pointerdown", onDown, true), 0);
    return () => { clearTimeout(arm); document.removeEventListener("pointerdown", onDown, true); };
  }, [errorish, shownAt, close]);

  const base = view && shownAt ? inlineDuration(t.variant, view.kind, view.mode, view.fit) : 0;
  const duration = base && t.actionLabel ? Math.max(base, 5000) : base; // time to press Undo
  useDismissTimer(ref, duration, close, shownAt);

  // Undo: the card's copy goes in the same instant the real card comes back (no jump),
  // and what the action sets off reports where the card was
  const onAction = t.onAction ? () => {
    actedRef.current = true;
    leavingRef.current = true;
    if (ghostRef.current) { ghostRef.current.remove(); ghostRef.current = null; }
    retap(t.tapRef);
    return t.onAction();
  } : undefined;

  const on = shownAt ? " lgf-on" : "";
  const out = leaving ? " lgf-out" : "";

  if (view && view.mode === "morph") {
    // (same Fragment shape as the inline view, so React keeps the node)
    return (
      <>
      {null}
      <div
        ref={ref}
        data-lg-feedback="morph"
        data-variant={t.variant}
        data-tone={light ? "light" : "dark"}
        role={errorish ? "alert" : "status"}
        aria-live={errorish ? "assertive" : "polite"}
        aria-atomic="true"
        data-fit={view.fit}
        className={`lgf-morph${on}${out}`}
        style={{ zIndex, borderRadius: view.radius, ...view.font }}
      >
        <span className="lgf-in">
        <span className="lgf-tick" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            {errorish
              ? <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              : <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
          </svg>
        </span>
        {view.label ? <span className="lgf-mlabel" aria-hidden="true">{view.label}</span> : null}
        </span>
        <span style={SR_ONLY}>{text}</span>
      </div>
      </>
    );
  }

  return (
    <>
      {null}
      <div
        ref={ref}
        data-lg-feedback="pop"
        data-variant={t.variant}
        data-tone={light ? "light" : "dark"}
        role={errorish ? "alert" : "status"}
        aria-live={errorish ? "assertive" : "polite"}
        aria-atomic="true"
        className={`lgf-pop${on}${out}`}
        data-compact={view && view.compact ? "1" : undefined}
        style={{ zIndex }}
      >
        <Icon size={14} strokeWidth={2.75} color={color} aria-hidden="true" />
        <span className="lgf-text" aria-hidden={view && view.text && view.text !== text ? "true" : undefined}>{(view && view.text) || text}</span>
        {view && view.text && view.text !== text ? <span style={SR_ONLY}>{text}</span> : null}
        <ActionButton label={t.actionLabel} onAction={onAction} close={() => { actedRef.current = true; close(); }} />
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Snackbar
// ---------------------------------------------------------------------------

export function Snackbar({ t, theme }) {
  const ref = React.useRef(null);
  const [leaving, close] = useExit(t.id);
  const { color, Icon } = resolveVariant(t.variant, t.accent);
  const background = t.background ?? theme.background;
  const tone = resolveTone(background, t.scheme ?? theme.scheme);
  const errorish = isErrorish(t.variant);
  const showClose = !t.duration || errorish;

  useDismissTimer(ref, t.duration, close, t.createdAt);

  return (
    <div
      ref={ref}
      data-lg-feedback="snackbar"
      data-variant={t.variant}
      role={errorish ? "alert" : "status"}
      aria-live={errorish ? "assertive" : "polite"}
      aria-atomic="true"
      className={`lgf-snack${leaving ? " lgf-out" : ""}`}
      style={{ background, color: tone.fg, border: `1px solid ${tone.border}`, boxShadow: tone.shadow }}
    >
      {t.loading
        ? <span className="lgf-spin" aria-hidden="true" style={{ color }} />
        : <Icon size={16} strokeWidth={2.75} color={color} aria-hidden="true" style={{ flex: "none" }} />}
      <span className="lgf-text">
        {t.title != null && t.title !== "" ? t.title : null}
        {t.title && t.message ? <span style={{ color: tone.muted, fontWeight: 500 }}> · {t.message}</span> : null}
        {!t.title && t.message ? t.message : null}
      </span>
      <ActionButton label={t.actionLabel} onAction={t.onAction} color={color} close={close} />
      {showClose ? (
        <button type="button" className="lgf-x" aria-label="Dismiss" onClick={close} style={{ color: tone.faint }}>
          <X size={14} />
        </button>
      ) : null}
    </div>
  );
}

const MAX_SNACKBARS = 3;
const BASE_BOTTOM = 24;

/** Height of visible fixed UI touching the bottom edge (cookie bar etc.). */
function measureAvoid(selector) {
  if (!selector || typeof document === "undefined") return 0;
  let off = 0;
  let nodes = [];
  try { nodes = document.querySelectorAll(selector); } catch { return 0; }
  const vh = window.innerHeight;
  for (const n of nodes) {
    const r = n.getBoundingClientRect();
    if (r.height > 0 && r.bottom > vh - 48 && r.top < vh) off = Math.max(off, vh - r.top + 12 - BASE_BOTTOM);
  }
  return Math.max(0, Math.round(off));
}

/**
 * Bottom-centre stack. Newest sits nearest the edge; at most three visible.
 * Lifts above anything matching `avoidBottom` (e.g. the cookie bar).
 */
export function SnackbarStack({ list, theme, zIndex }) {
  const ref = React.useRef(null);
  const visible = list.slice(-MAX_SNACKBARS);
  const hasItems = visible.length > 0;

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !hasItems) return undefined;
    const apply = () => {
      el.style.bottom = `calc(${BASE_BOTTOM + measureAvoid(theme.avoidBottom)}px + env(safe-area-inset-bottom, 0px))`;
    };
    apply();
    const timer = setInterval(apply, 300);
    window.addEventListener("resize", apply);
    return () => { clearInterval(timer); window.removeEventListener("resize", apply); };
  }, [hasItems, theme.avoidBottom]);

  if (!hasItems) return null;
  return (
    <div
      ref={ref}
      data-lg-feedback="stack"
      style={{
        position: "fixed",
        left: "50%",
        bottom: `calc(${BASE_BOTTOM}px + env(safe-area-inset-bottom, 0px))`,
        transform: "translateX(-50%)",
        zIndex,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        width: "max-content",
        maxWidth: "calc(100vw - 32px)",
        pointerEvents: "none",
      }}
    >
      {visible.map((t) => <Snackbar key={t.id} t={t} theme={theme} />)}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screen-reader announcer (quiet messages)
// ---------------------------------------------------------------------------

export function Announcer() {
  const a = React.useSyncExternalStore(alertStore.subscribe, alertStore.getAnnouncement, alertStore.getAnnouncement);
  return (
    <>
      <div data-lg-feedback="announcer" role="status" aria-live="polite" aria-atomic="true" style={SR_ONLY}>
        {a && !a.assertive ? <span key={a.id}>{a.text}</span> : null}
      </div>
      <div data-lg-feedback="announcer" role="alert" aria-live="assertive" aria-atomic="true" style={SR_ONLY}>
        {a && a.assertive ? <span key={a.id}>{a.text}</span> : null}
      </div>
    </>
  );
}

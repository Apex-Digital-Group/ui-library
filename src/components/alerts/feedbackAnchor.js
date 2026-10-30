/**
 * Inline feedback — anchoring rules.
 *
 * Decides where a notification fired by app code is shown:
 *   - on the control the user tapped (a text button "morphs" into a ✓ state;
 *     icons and switches get a small pop next to them; errors get a pop).
 *     When that control sits in a dialog that closes on success, the dialog
 *     is held on screen (a frozen copy) until the ✓ has been seen, or
 *   - nowhere visual (screen-reader announcement only) / the bottom snackbar,
 *     when the message has no place on screen.
 *
 * Call sites never change: <AlertProvider autoAnchor> installs a tiny
 * capture-phase tracker that remembers the last tapped control and tags API
 * requests started by that tap, and alertStore.add() asks this module whether
 * and where to anchor.
 *
 * Detection reads DOM structure only (tags, roles, classes, geometry), never
 * button text, so it behaves the same in every app language.
 */

/** Without a stronger link (same handler / tagged API call), a tap owns messages for this long. */
export const ANCHOR_WINDOW_MS = 2500;
/** Choosing / dropping a file owns messages for longer: the app reads the file first (size, length). */
export const FILE_WINDOW_MS = 8000;
/** API requests sent within this long after a tap belong to that tap. */
export const SEND_ATTRIBUTION_MS = 1000;
/** Longest text a pop will show (it wraps to at most three lines). */
export const MAX_INLINE_CHARS = 120;
/** Beside-a-switch placement only for short text; longer goes below. */
export const MAX_SIDE_CHARS = 24;

/** Elements that can own feedback. */
export const ANCHOR_SELECTOR = [
  "button",
  "[role=button]",
  "[role=switch]",
  "[role=checkbox]",
  "input[type=checkbox]",
  "input[type=radio]",
  "input[type=submit]",
  "input[type=button]",
  ".ant-btn",
  ".ant-switch",
  ".ant-checkbox-wrapper",
  ".ant-radio-wrapper",
  ".ant-radio-button-wrapper",
].join(",");

/**
 * Taps on (or inside) these never anchor. Navigation-like controls (links,
 * tabs, menus, pagination, selects, pickers) are often followed by a fetch
 * error that belongs to the page, not to the control. Modal close buttons
 * unmount immediately. Our own portal must never anchor the next message.
 * `data-feedback="global"` is the per-element opt-out.
 */
export const EXCLUDE_SELECTOR = [
  "a[href]",
  "nav",
  "[role=tablist]",
  "[role=tab]",
  "[role=menu]",
  "[role=menubar]",
  "[role=menuitem]",
  "[role=listbox]",
  "[role=option]",
  "[role=combobox]",
  ".ant-tabs-nav",
  ".ant-menu",
  ".ant-pagination",
  ".ant-select",
  ".ant-dropdown",
  ".ant-dropdown-trigger",
  ".ant-picker",
  ".ant-modal-close",
  ".ant-drawer-close",
  "[data-lg-feedback]",
  '[data-feedback="global"]',
].join(",");

/** Confirm-style surfaces (dialogs that close on confirm). */
const CONFIRM_SELECTOR = [
  "[role=alertdialog]",
  "[data-lga-btn]",
  ".ant-modal-confirm",
  ".ant-popconfirm",
  ".ant-popover-buttons",
  ".ant-popconfirm-buttons",
].join(",");

/** Dialog-like containers that may close on success (their copy is held). */
const DIALOG_SELECTOR = ".ant-modal-wrap,.ant-modal,.ant-drawer,.ant-popconfirm,.modal-dialog,[role=dialog],[role=alertdialog],[aria-modal=true]";

/** The child of <body> holding `el` when it is a portal (not the app root), else null. */
function portalRootOf(el) {
  if (!hasDom() || !el || !el.isConnected) return null;
  let root = el;
  while (root.parentElement && root.parentElement !== document.body) root = root.parentElement;
  if (root.parentElement !== document.body || root === el) return null;
  if (root.id === "root" || root.querySelector("#root") || root.matches("[data-lg-feedback]")) return null;
  return root;
}

/**
 * The dialog holding `el`: dialog markup (antd, Bootstrap, role=dialog …), or a
 * custom popup rendered through a portal as a fixed panel with no dialog
 * markup at all (credit packages, subscription, …).
 */
function dialogOf(el) {
  if (!el || typeof el.closest !== "function") return null;
  const d = el.closest(DIALOG_SELECTOR);
  if (d) return d;
  const root = portalRootOf(el);
  if (root) {
    for (let n = el.parentElement; n; n = n.parentElement) {
      if (isFixed(n)) {
        const r = n.getBoundingClientRect();
        if (r.width >= 200 && r.height >= 120) return n;
      }
      if (n === root) break;
    }
    return null;
  }
  // an overlay drawn inside the app tree (live-stream request / VIP / takeover
  // dialogs): a fixed layer named like a modal, or a dim full-screen scrim
  for (let n = el.parentElement; n && n !== document.body && n.id !== "root"; n = n.parentElement) {
    if (!isFixed(n)) continue;
    const r = n.getBoundingClientRect();
    if (r.width < 200 || r.height < 120) continue;
    if (MODALISH.test(typeof n.className === "string" ? n.className : "") || isScrim(n)
      || [...(n.parentElement ? n.parentElement.children : [])].some((x) => x !== n && isScrim(x))) return n;
  }
  return null;
}

const MODALISH = /(?:^|[\s_-])(?:modal|dialog|popup)(?:$|[\s_-])/i;
function isFixed(n) {
  try { return getComputedStyle(n).position === "fixed"; } catch { return false; }
}
/** A fixed, (nearly) full-screen, see-through dim or blur layer: a modal backdrop. */
function isScrim(n) {
  try {
    const cs = getComputedStyle(n);
    if (cs.position !== "fixed" || cs.visibility === "hidden" || parseFloat(cs.opacity) < 0.1) return false; // mounted but hidden
    const r = n.getBoundingClientRect();
    if (r.width < window.innerWidth * 0.9 || r.height < window.innerHeight * 0.9) return false;
    const blur = cs.backdropFilter || cs.webkitBackdropFilter;
    if (blur && blur !== "none") return true;
    const m = /rgba?\(([^)]+)\)/.exec(cs.backgroundColor || "");
    if (!m) return false;
    const parts = m[1].split(/[\s,/]+/).filter(Boolean);
    const alpha = parts.length > 3 ? parseFloat(parts[3]) : 1;
    return alpha >= 0.15 && alpha < 0.98;
  } catch { return false; }
}

/** rc-motion (antd Modal/Drawer/Popover) adds these while a surface animates out. */
export const LEAVING_SELECTOR = '[class*="-leave-active"],[class*="-leave-start"]';

const SWITCH_SELECTOR = "[role=switch],.ant-switch,[role=checkbox],input[type=checkbox],.ant-checkbox-wrapper";

const USER_EVENT_TYPES = new Set([
  "click", "pointerdown", "pointerup", "mousedown", "mouseup", "touchstart", "touchend",
  "keydown", "keyup", "submit", "change", "input",
]);

const hasDom = () => typeof window !== "undefined" && typeof document !== "undefined";
const now = () => (typeof performance !== "undefined" && performance.now ? performance.now() : Date.now());

// ---------------------------------------------------------------------------
// Interaction tracker
// ---------------------------------------------------------------------------

let last = null; // { el: Element|null, hint?: "submit", t: number }
// Recent taps with the page they were made on: after a save sends the user
// back (navigate(-1)), the result is shown beside the row that led there.
const tapHistory = [];
let installs = 0;
let listeners = null;

/** Nearest anchorable control for an event target, or null. */
export function pickAnchor(target) {
  if (!target || typeof target.closest !== "function") return null;
  const el = target.closest(ANCHOR_SELECTOR);
  if (!el) return null;
  const ex = el.closest(EXCLUDE_SELECTOR);
  if (!ex) return el;
  // a header <nav> is navigation — but a button inside a panel or sheet opened
  // from it ("Mark all read" in the bell panel, full-screen on a phone) is an action
  if (ex.matches("nav") && !el.closest(EXCLUDE_BUT_NAV) && (floatingMenuOf(el) || dialogOf(el) || panelIn(el, ex))) return el;
  // a real button inside a card that is a link (Follow on a creator card) is an
  // action of its own, not the link
  if (ex.matches("a[href]") && ex !== el && el.matches("button,[role=button],.ant-btn") && !el.closest(EXCLUDE_BUT_LINK)
    && visibleText(ex).length > visibleText(el).length + 2) return el; // (a link that is just this button stays a link)
  return null;
}
const EXCLUDE_BUT_NAV = EXCLUDE_SELECTOR.split(",").filter((x) => x !== "nav").join(",");
/** A panel that floats out of the header (the bell list; a full-width sheet on a phone). */
function panelIn(el, nav) {
  for (let n = el.parentElement; n && n !== nav; n = n.parentElement) {
    let cs;
    try { cs = getComputedStyle(n); } catch { return false; }
    if ((cs.position === "fixed" || cs.position === "absolute") && n.getBoundingClientRect().height >= 60) return true;
  }
  return false;
}
const EXCLUDE_BUT_LINK = EXCLUDE_SELECTOR.split(",").filter((x) => x !== "a[href]").join(",");

/**
 * A clickable row that is not a button (a search result <div onClick>): the
 * nearest small element with a pointer cursor, or null. Cards and page areas
 * are too big to carry feedback.
 */
function pickClickable(target) {
  let n = target && target.nodeType === 1 ? target : target && target.parentElement;
  for (let i = 0; n && i < 5 && n !== document.body; i += 1, n = n.parentElement) {
    if (n.closest(EXCLUDE_SELECTOR)) return null;
    let cur = "";
    try { cur = getComputedStyle(n).cursor; } catch { return null; }
    if (cur !== "pointer") continue;
    const r = n.getBoundingClientRect();
    return r.width >= 24 && r.height >= 18 && r.width <= 720 && r.height <= 120 ? n : null;
  }
  return null;
}

/** The visible thing that stands for a (usually hidden) file input: itself, its label, or its drop area. */
function fileAnchor(input) {
  const shown = (n) => { const r = n.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  if (shown(input)) return input;
  if (input.id && typeof CSS !== "undefined" && CSS.escape) {
    const lab = document.querySelector(`label[for="${CSS.escape(input.id)}"]`);
    if (lab && shown(lab)) return lab;
  }
  let n = input.parentElement;
  for (let i = 0; n && n !== document.body && i < 6; i += 1, n = n.parentElement) {
    if (n.closest(EXCLUDE_SELECTOR) && !n.closest(".ant-upload")) return null;
    const r = n.getBoundingClientRect();
    if (r.width >= 40 && r.height >= 24) return n;
  }
  return null;
}

/** The upload area / button the user just clicked to open the file picker. */
function pickerOpener() {
  if (!last || !last.target || !last.target.isConnected || now() - last.t > 60000) return null;
  // the upload / drop area first (its message needs room: "Use MP4, MOV…"), else the button
  const n = last.target.closest('.ant-upload,[class*="drop"],[class*="Drop"],[class*="upload"],[class*="Upload"]')
    || last.target.closest("label,button,[role=button]");
  if (!n || n.closest("[data-lg-feedback]")) return null;
  const r = n.getBoundingClientRect();
  return r.width >= 24 && r.height >= 18 && r.width <= 720 && r.height <= 420 ? n : null;
}

/** The drop area a file was dropped on. */
function dropAnchor(target) {
  const t = target && target.nodeType === 1 ? target : target && target.parentElement;
  if (!t || typeof t.closest !== "function" || t.closest("[data-lg-feedback]")) return null;
  return t.closest('.ant-upload,[class*="drop"],[class*="upload"],label') || t;
}

// A dropdown / "…" menu closes (and its item is removed) the moment an item is
// tapped: the result belongs to the button that opened it.
const MENU_SELECTOR = '[role=menu],[role=listbox],.ant-dropdown,.ant-dropdown-menu,.ant-popover:not(.ant-popconfirm),[class*="dropdown"],[class*="Dropdown"],[class*="menu"],[class*="Menu"],[class*="popover"],[class*="Popover"]';
/** The floating menu layer holding `n` (absolute / fixed, smaller than the screen), or null. */
function floatingMenuOf(n) {
  if (!hasDom() || !n || typeof n.closest !== "function" || n.closest("a[href]")) return null;
  let m = n.closest(MENU_SELECTOR);
  for (let i = 0; m && m !== document.body && i < 8; i += 1, m = m.parentElement) {
    let cs;
    try { cs = getComputedStyle(m); } catch { return null; }
    if (cs.position !== "absolute" && cs.position !== "fixed") continue;
    const r = m.getBoundingClientRect();
    if (r.width > 0 && r.width < window.innerWidth * 0.6 && r.height < window.innerHeight * 0.85) return m;
    return null;
  }
  return null;
}

/** Two boxes touch or nearly touch (a menu and the control that opened it). */
function nextTo(a, b) {
  const p = a.getBoundingClientRect();
  const q = b.getBoundingClientRect();
  const dx = Math.max(0, p.left - q.right, q.left - p.right);
  const dy = Math.max(0, p.top - q.bottom, q.top - p.bottom);
  return dx <= 96 && dy <= 96;
}

function record(target, el, hint) {
  const ref = el || (target && target.nodeType === 1 ? target : target && target.parentElement);
  if (ref && typeof ref.closest === "function" && ref.closest("[data-lg-feedback]")) return; // our own buttons
  // a tap on an item of a menu opened by the previous tap ("…" → Pin post,
  // Share → Copy link): its result shows on that opener
  let opener = null;
  // (a tap on a menu's own trigger — "⋮" inside a card's floating corner — is not an item of it)
  const trigger = ref && typeof ref.closest === "function" && ref.closest(".ant-dropdown-trigger,[aria-haspopup],[aria-expanded]");
  const menu = trigger ? null : floatingMenuOf(ref);
  if (menu && last && now() - last.t < 60000) {
    // the opener: the last tapped control, even one that is not an anchor
    // itself (antd marks a menu's trigger .ant-dropdown-trigger)
    const prevCtl = last.el || (last.target && typeof last.target.closest === "function"
      ? last.target.closest('button,[role=button],.ant-btn,[aria-haspopup],a') : null);
    // a menu opens right next to the control that opened it (a Like further down
    // the same card did not open the card's "⋮" menu)
    if (prevCtl && prevCtl.isConnected && !menu.contains(prevCtl) && !prevCtl.closest("[data-lg-feedback]") && nextTo(prevCtl, menu)) {
      opener = prevCtl;
      if (!el) el = opener; // the item itself is not an anchor (antd menu items): use the opener
    }
  }
  let rect = null;
  if (el) {
    const r = el.getBoundingClientRect();
    rect = { top: r.top, left: r.left, width: r.width, height: r.height };
  }
  const prev = last;
  try {
    const hit = (ref && typeof ref.closest === "function" && ref.closest('a[href],button,[role=button],[role=link],[role=menuitem],li')) || ref;
    if (hit && hit.nodeType === 1) {
      const a = hit.closest("a[href]");
      tapHistory.push({ path: window.location.pathname, href: a ? a.getAttribute("href") : null, tag: hit.tagName, text: visibleText(hit).slice(0, 80), t: now() });
      if (tapHistory.length > 30) tapHistory.shift();
    }
  } catch { /* ignore */ }
  last = { el: el || null, hint, t: now(), rect, label: el ? visibleText(el) : "", href: window.location.href, target: ref || null, trail: el ? trailOf(el) : null };
  if (opener && opener !== el) { last.opener = opener; last.openerTrail = trailOf(opener); }
  // a close / cancel tap never holds its dialog, whatever requests it sets off
  // (closing the upload wizard pauses the upload: those requests are this tap's)
  if (el && isCloseLike(el)) last.dismiss = true;
  // An action button inside a dialog: picture the dialog NOW. Many handlers
  // close the dialog first and save after (`setOpen(false); await api.post()`),
  // or close it in the same tick as the request, so by the time the request is
  // sent there is nothing left to picture.
  if (el && dialogCloseHandler && isDialogAction(el)) {
    // pointerdown then submit/click on the same button = one tap, one picture
    const reuse = prev && prev.el === el && prev.snap && last.t - prev.t < 1000 && !isDialogClosing(prev.snap);
    last.snap = reuse ? prev.snap : snapshotDialog(el);
    if (last.snap) watchDialogClose(last);
  }
}

/**
 * On the page the user just came back to: the control they tapped on it to go
 * where the save happened (the "Display name" row of /settings), or null.
 */
export function originOnPage(sincePath) {
  if (!hasDom()) return null;
  const here = window.location.pathname;
  if (here === sincePath) return null;
  for (let i = tapHistory.length - 1; i >= 0; i -= 1) {
    const h = tapHistory[i];
    if (h.path !== here) continue;
    let cands = [];
    if (h.href) {
      try { cands = [...document.querySelectorAll(`a[href="${CSS.escape ? CSS.escape(h.href) : h.href}"]`)]; } catch { cands = []; }
    }
    if (!cands.length && h.text) {
      cands = [...document.querySelectorAll(h.tag.toLowerCase())].filter((n) => visibleText(n).slice(0, 80) === h.text);
    }
    const ok = cands.find((n) => !n.closest("[data-lg-feedback]") && isAnchorVisible(n));
    if (ok) return ok;
    return null;
  }
  return null;
}

/** Plain "close / go back" buttons of a dialog: closing with them is never a result. */
const CLOSE_WORDS = new RegExp("^(?:" + [
  "cancel", "close", "back", "go back", "no", "no thanks", "not now", "keep", "keep it", "dismiss", "skip", "later",
  // (not "Done" / "OK": a text story's "Done" saves it, a confirm's "OK" deletes —
  // a close that saves nothing is never held anyway)
  "maybe later", "got it", "understood", "×", "✕", "x",
  "decline", "reject", "ignore", "deny", // an incoming call / request: declining just closes it
  // a cookie / consent prompt: any choice just puts it away (nothing to show on it)
  "accept all", "accept all cookies", "allow all", "reject all", "decline all", "deny all", "necessary only", "only necessary",
  "abbrechen", "schließen", "zurück", "nein", // de
  "annuler", "fermer", "retour", "non", // fr
  "cancelar", "cerrar", "volver", "atrás", // es
  "fechar", "voltar", "não", // pt
].join("|") + ")$", "i");
// buttons that only dismiss, whatever follows the verb ("Close window", "Discard
// upload", "Cancel upload") — not "Cancel order" / "Cancel subscription", which are actions
const DISMISS_LEAD = /^(?:close|discard|dismiss|exit|abort|go back|back to|keep editing|continue editing|not now|no thanks|maybe later)\b/i;
const DISMISS_WORK = /^(?:cancel|stop|pause)\s+(?:the\s+)?(?:upload|uploading|editing|recording|changes)\b/i;
// an icon-only button drawn as an X, or named like a close control
const CLOSE_ICON = '.lucide-x,.lucide-circle-x,.lucide-x-circle,.anticon-close,.anticon-close-circle,[data-icon="close"],[data-icon="xmark"]';
const CLOSE_CLASS = /(?:^|[\s_-])(?:close|closer|dismiss)(?:$|[\s_-]|btn|button)/i;
function isCloseLike(el) {
  if (el.closest('.ant-modal-close,.ant-drawer-close,[data-x],[data-dismiss],[data-bs-dismiss]')) return true;
  if (CLOSE_CLASS.test(typeof el.className === "string" ? el.className : "")) return true;
  if (!visibleText(el) && el.querySelector(CLOSE_ICON)) return true;
  const aria = (el.getAttribute("aria-label") || el.getAttribute("title") || "").trim();
  if (/^(?:close|dismiss|cancel)\b/i.test(aria)) return true;
  const label = visibleText(el).replace(/[.!…]+$/, "").replace(/^(?:yes|ok|okay)[,\s]+/i, "");
  // "Decline the extension?" [Cancel] [Decline]: Cancel closes, Decline is the answer
  if (REFUSE_WORDS.test(label) && hasOwnCancel(el)) return false;
  return CLOSE_WORDS.test(label) || DISMISS_LEAD.test(label) || DISMISS_WORK.test(label);
}

const REFUSE_WORDS = /^(?:decline|reject|ignore|deny|ablehnen|refuser|rechazar|recusar)$/i;
/** The control's dialog has a separate way to just close it (X, Cancel, No…). */
function hasOwnCancel(el) {
  const d = dialogOf(el);
  if (!d) return false;
  return Array.from(d.querySelectorAll("button,[role=button]")).some((b) => {
    if (b === el) return false;
    const words = visibleText(b).replace(/[.!…]+$/, "");
    if (REFUSE_WORDS.test(words)) return false;
    return isCloseLike(b);
  });
}

// ---- a dialog the USER closed is never held ----
// Only a dialog the app closes after its save is held. A close the user asked
// for (X, Cancel, Discard, Escape, a tap outside) happens at once, even while
// something it started is still running (a video upload continues in the
// background after the wizard closes).
/** A close this soon after any tap / key is that input's doing. */
export const USER_CLOSE_MS = 700;
let lastInputAt = -Infinity; // any tap or Enter / Space / Escape
let lastDismissAt = -Infinity; // a close / cancel control, or Escape
/** Did the user close it: a dismiss input after `since`, or any input right before `at`? */
export function closedByUser(since, at = now(), href) {
  // left the page (browser Back, a link) while it worked: the new page wins
  if (href && hasDom() && window.location.href !== href) return true;
  return lastDismissAt > since || (lastInputAt > since && at - lastInputAt < USER_CLOSE_MS);
}
function isDismissTarget(target) {
  const c = target && typeof target.closest === "function"
    ? target.closest("button,[role=button],.ant-btn,input[type=button],.ant-modal-close,.ant-drawer-close") : null;
  return !!c && isCloseLike(c);
}
/** A labelled button inside a dialog that may save / send / confirm something. */
function isDialogAction(el) {
  if (!el.closest || el.closest(LEAVING_SELECTOR)) return false;
  if (!el.matches("button,[role=button],input[type=submit],input[type=button],.ant-btn")) return false;
  const text = visibleText(el) || el.value || "";
  if (text.length < 2 && !el.matches("[type=submit]")) return false; // icon-only (player controls, close ×)
  return !isCloseLike(el) && !!dialogOf(el);
}

// ---- API attribution: requests started by a tap carry it to their response ----

const xhrOwner = typeof WeakMap !== "undefined" ? new WeakMap() : null;
let xhrPatched = false;

function currentEvent() {
  try { return (hasDom() && window.event) || null; } catch { return null; }
}

/**
 * The tap that owns code running right now, by a hard link: we are inside the
 * tap's own event handler, or inside the response of an API request that tap
 * started (axios uses XHR; its response runs inside the XHR's event).
 */
export function attributedTap() {
  const e = currentEvent();
  if (e && e.target && xhrOwner && xhrOwner.has(e.target)) return xhrOwner.get(e.target);
  if (!last || !last.el) return null;
  if (e && USER_EVENT_TYPES.has(e.type) && now() - last.t < SEND_ATTRIBUTION_MS) return last;
  return null;
}

// ---- requests started by a tap that fail with nothing shown ----
// Many handlers swallow failures (`catch (e) { console.error(e) }`): with the
// backend down a like simply does nothing. The tracker reports such failures
// so the alert store can show them on the tapped control when the app itself
// showed nothing.
const xhrMeta = typeof WeakMap !== "undefined" ? new WeakMap() : null; // xhr → { method, strong }
let requestFailureHandler = null;
/** Register (or clear with null) the receiver of failed tap-started requests. */
export function setRequestFailureHandler(fn) { requestFailureHandler = typeof fn === "function" ? fn : null; }

// ---- a dialog that closes while (or right after) its button's request runs ----
let dialogCloseHandler = null;
/** Register (or clear) the receiver of "this tap's dialog is closing". */
export function setDialogCloseHandler(fn) { dialogCloseHandler = typeof fn === "function" ? fn : null; }

/** A dialog that closes this long after its request finished still shows the result. */
export const HOLD_AFTER_DONE_MS = 1500;
/** A dialog closed by the tap itself: wait this long for the save to start. */
const CLOSE_FIRST_WAIT_MS = 250;

function watchDialogClose(owner) {
  if (owner.watching || typeof requestAnimationFrame !== "function") return;
  owner.watching = true;
  const start = now();
  let closedAt = 0;
  const stop = () => { owner.watching = false; };
  const tick = () => {
    if (!owner.snap || owner.hold) return stop();
    const busy = owner.pending > 0 || (owner.lastDoneAt > 0 && Date.now() - owner.lastDoneAt < HOLD_AFTER_DONE_MS);
    // another tap took over and nothing of this one is running: done watching
    if (last !== owner && !busy && !closedAt) return stop();
    if (owner.dismiss || owner.clickable) return stop();
    if (!closedAt && isDialogClosing(owner.snap)) {
      closedAt = now();
      if (closedByUser(owner.t, closedAt, owner.href)) return stop(); // the user closed it: no hold, no result picture
    }
    if (closedAt) {
      // a write is running or just finished: hold (a GET alone — a list
      // refresh — never holds; keep watching in case the write comes after it)
      if (busy && owner.writes > 0) {
        try { if (dialogCloseHandler) dialogCloseHandler(owner); } catch { /* ignore */ }
        return stop();
      }
      // closed with nothing sent yet: a handler that closes first and saves
      // after sends within a few frames; anything later is not this tap's
      if (!busy && (owner.sent > 0 || now() - closedAt > CLOSE_FIRST_WAIT_MS || closedAt - owner.t > 2 * HOLD_AFTER_DONE_MS)) return stop();
    }
    if (now() - start < 20000) requestAnimationFrame(tick); else stop();
  };
  requestAnimationFrame(tick);
}

// "Save changes" → "Changes saved", "Use as cover" → "Cover set", "Post" → "Posted".
// English verbs only; anything else → "" (the button shows the ✓ alone).
const DONE = {
  save: "saved", apply: "applied", update: "updated", post: "posted", send: "sent", submit: "submitted",
  confirm: "confirmed", delete: "deleted", remove: "removed", upload: "uploaded", publish: "published",
  add: "added", create: "created", book: "booked", pay: "paid", share: "shared", schedule: "scheduled",
  invite: "invited", subscribe: "subscribed", join: "joined", accept: "accepted", approve: "approved",
  change: "changed", set: "set", request: "requested", report: "reported", block: "blocked",
  cancel: "cancelled", transfer: "sent", redeem: "redeemed", unlock: "unlocked", buy: "bought",
  reset: "reset", forward: "forwarded", decline: "declined", reject: "rejected", restore: "restored",
  use: "set", end: "ended", stop: "stopped", leave: "left", mute: "muted", unmute: "unmuted",
  follow: "followed", unfollow: "unfollowed", hide: "hidden", archive: "archived", copy: "copied",
  withdraw: "withdrawn", verify: "verified", rate: "rated", pin: "pinned", unpin: "unpinned",
  suspend: "suspended", unsuspend: "unsuspended", enable: "enabled", disable: "disabled",
  deliver: "delivered", extend: "extended", place: "placed", order: "ordered", download: "downloaded",
  unblock: "unblocked", unsubscribe: "unsubscribed", renew: "renewed", claim: "claimed",
};
const FILLER = /^(?:the|this|that|your|my|a|an|it|now|all|as|for|again|here|me|us|them|him|her)$/i;
// "Yes, delete" / "OK, send" / "✅ Accept": the verb is the first real word
const LEAD = /^(?:yes|yeah|yep|ok|okay|sure)$/i;
// "Upload & deliver", "Decline and refund": the object ends at the joiner
const JOINER = /^(?:and|&|or|then|\+|→|>)$/i;
export function doneLabelFor(buttonText) {
  const words = String(buttonText || "").replace(/[…\.!]+$/, "").trim().split(/\s+/).filter(Boolean)
    .map((w) => (/\p{L}|\p{N}/u.test(w) ? w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "") : w)); // "Yes," → "Yes"; "&" stays
  while (words.length && (LEAD.test(words[0]) || !/\p{L}/u.test(words[0]))) words.shift(); // "Yes,", "✅"
  if (!words.length) return "";
  const verb = DONE[words[0].toLowerCase().replace(/[^a-z]/g, "")];
  if (!verb) return "";
  const rest = [];
  for (const w of words.slice(1)) {
    if (JOINER.test(w) || /^to$/i.test(w)) break; // "Request to join" → "Requested"
    if (!FILLER.test(w) && !/\d/.test(w) && /\p{L}/u.test(w)) rest.push(w);
  }
  const obj = rest.slice(-2).join(" ");
  if (!obj) return verb.charAt(0).toUpperCase() + verb.slice(1);
  return `${obj.charAt(0).toUpperCase()}${obj.slice(1).toLowerCase()} ${verb}`;
}

/** The form / dialog a control sits in: where its module prints its own error text. */
const CONTAINER_SELECTOR = "form,[role=dialog],[role=alertdialog],[aria-modal=true],.ant-modal-content,.modal-content";
const words = (text) => String(text || "").toLowerCase().split(/[^\p{L}\p{N}']+/u).filter((w) => w.length >= 3 && !/^\d+$/.test(w));
function containerWords(el) {
  let c = el && typeof el.closest === "function" ? el.closest(CONTAINER_SELECTOR) : null;
  const loose = !c;
  // not in a form or dialog (a page section such as the complaint attachments):
  // the few levels around the control, where a module prints a field / row error
  if (!c && el && el.isConnected) {
    c = el;
    for (let i = 0; i < 4 && c.parentElement && c.parentElement !== document.body && c.parentElement.id !== "root"; i += 1) c = c.parentElement;
  }
  if (!c) return null;
  // per text node (never joined across elements: "Email" + "Send" must not read
  // as "emailsend"), and never the control's own text or our own feedback
  const out = [];
  const walker = document.createTreeWalker(c, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const p = n.parentElement;
    if (!p || (el && el.contains(n)) || p.closest("[data-lg-feedback],script,style")) continue;
    out.push(...words(n.nodeValue));
  }
  if (loose) out.unshift("\u0000loose"); // marker: only an error-like line counts here
  return out;
}
const ERROR_WORDS = /^(?:couldn't|could|not|failed|fail|error|errors|unable|retry|again|network|problem|wrong|invalid|denied|refused|missing|required|cannot|can't)$/i;
/**
 * Did the control's form / dialog gain words since the request was sent (the
 * module's own inline error, with or without role=alert)? The control's own
 * label is ignored: "Sending…" → "Send" is not a message.
 */
export function moduleSaidSomething(el, wordsAtSend, label) {
  if (!Array.isArray(wordsAtSend)) return false;
  const now = containerWords(el);
  if (!now) return false;
  const before = new Set(wordsAtSend);
  const own = new Set([...words(label), ...words(el ? visibleText(el) : "")]);
  const fresh = now.filter((w) => w !== "\u0000loose" && !before.has(w) && !own.has(w));
  // outside a form / dialog the area also changes for other reasons (a list
  // marked read): only new error-like words mean the module reported it
  if (now[0] === "\u0000loose") return fresh.some((w) => ERROR_WORDS.test(w));
  return fresh.length > 0;
}

function watchRequest(xhr, owner, strong) {
  const meta = xhrMeta.get(xhr) || {};
  const sentAt = Date.now();
  const wordsAtSend = requestFailureHandler && owner.el ? containerWords(owner.el) : null;
  let aborted = false;
  let timedOut = false;
  const write = isWriteRequest(meta.method, meta.url);
  // what decides the tap's result: requests it clearly started, and writes —
  // not a read that merely went out within a second of it (a list refresh)
  const decisive = strong || write;
  owner.pending = (owner.pending || 0) + 1;
  owner.sent = (owner.sent || 0) + 1;
  // only requests that change something make a closing dialog wait (not a list refresh)
  if (write) { owner.writes = (owner.writes || 0) + 1; owner.pendingWrites = (owner.pendingWrites || 0) + 1; }
  xhr.addEventListener("abort", () => { aborted = true; });
  xhr.addEventListener("timeout", () => { timedOut = true; });
  xhr.addEventListener("loadend", () => {
    const status = xhr.status;
    owner.pending = Math.max(0, (owner.pending || 1) - 1);
    if (write) owner.pendingWrites = Math.max(0, (owner.pendingWrites || 1) - 1);
    owner.lastDoneAt = Date.now();
    if (!aborted) {
      // a "success" 200 can still carry {"success": false, "error": …}
      let soft = false;
      try {
        const body = (xhr.responseType === "" || xhr.responseType === "text") ? xhr.responseText : "";
        soft = !!body && body.length < 200000 && /"success"\s*:\s*false/.test(body);
      } catch { /* binary / no access */ }
      const key = `${meta.method} ${meta.url}`;
      if (timedOut || status === 0 || status >= 400 || soft) {
        if (decisive) {
          owner.failed = true;
          owner.failKind = timedOut || status === 0 ? "network" : "server";
          owner.failedKey = key;
        }
      } else if (write && owner.failed && owner.failedKey === key) {
        owner.failed = false; // the same write, retried (e.g. after a token refresh), went through
      }
    }
    // the save answered while its dialog is still open: picture it again, so a
    // later hold shows it as it is now (an old error from a failed try is gone)
    if (write && owner.snap && !owner.hold && owner.el && owner.el.isConnected && !isDialogClosing(owner.snap)) {
      try {
        const fresh = snapshotDialog(owner.el);
        if (fresh) { fresh.surfaces = owner.snap.surfaces; owner.snap = fresh; }
      } catch { /* keep the older picture */ }
    }
    try { if (typeof owner.onSettle === "function") owner.onSettle(); } catch { /* ignore */ }
    if (!requestFailureHandler || aborted) return;
    // a file the user picked: upload areas report their own failures (per file, with Retry)
    if (owner.hint === "file") return;
    // the tap saved something: its result is the save's, not a side read's
    if (!decisive && (owner.writes || 0) > 0) return;
    const network = timedOut || status === 0;
    // 5xx counts when the request clearly belongs to the tap (sent from its
    // handler or chain) or changes something (not a GET poll that happened
    // to start right after a tap)
    const server = status >= 500 && (strong || (meta.method && meta.method !== "GET"));
    if (!network && !server) return;
    // `since`: the app may already have shown its own error from the request's
    // error handler / axios catch, which run BEFORE this loadend listener
    try { requestFailureHandler({ tap: owner, kind: network ? "network" : "server", status, at: Date.now(), since: sentAt, wordsAtSend }); } catch { /* ignore */ }
  });
}

// ---- which requests may speak for a tap: the app's own API only ----
let extraOrigins = [];
/** Origins besides the page's own site that serve the app's API (e.g. "https://api.example.com"). */
export function setTrackedOrigins(list) {
  extraOrigins = (Array.isArray(list) ? list : []).map((o) => {
    try { return new URL(String(o), hasDom() ? window.location.href : undefined).origin; } catch { return null; }
  }).filter(Boolean);
}
const siteOf = (host) => (/^[\d.]+$|^\[|^localhost$/i.test(host) || !host.includes(".") ? host : host.split(".").slice(-2).join("."));
/**
 * Only the app's own API speaks for a tap: requests to the page's site (any
 * subdomain or port) or to a configured API origin. Third-party traffic —
 * analytics uploads (Clarity posts right after clicks), tags, CDNs — and
 * socket.io's HTTP fallback never do: an ad-blocked analytics upload would
 * otherwise read as the tap's save failing, and a slow one would hold its result.
 */
export function isTrackedRequest(url) {
  if (!hasDom()) return false;
  let u;
  try { u = new URL(String(url || ""), window.location.href); } catch { return false; }
  if (u.protocol !== "http:" && u.protocol !== "https:") return false;
  if (/\/socket\.io\//.test(u.pathname)) return false;
  if (u.origin === window.location.origin || extraOrigins.includes(u.origin)) return true;
  return siteOf(u.hostname) === siteOf(window.location.hostname);
}

// ---- saves vs reads ----
// Many APIs read with POST (users_search, vod_videos_owner_list, bell_notifications_count):
// a list refresh after a dialog closes must not count as a save.
const READ_WORDS = new Set(["list", "index", "search", "suggestions", "suggestion", "suggested", "count", "counts",
  "history", "preview", "check", "status", "get", "fetch", "lookup", "details", "detail", "info", "stats", "unread",
  "booked", "slots", "availability", "available", "calendar"]);
const WRITE_WORDS = new Set(["save", "update", "create", "delete", "remove", "add", "publish", "send", "pay", "buy",
  "book", "cancel", "accept", "decline", "approve", "reject", "upload", "start", "stop", "end", "report", "block",
  "unblock", "follow", "unfollow", "subscribe", "unsubscribe", "set", "toggle", "mark", "edit", "submit", "confirm",
  "redeem", "transfer", "withdraw", "join", "leave", "invite", "pin", "unpin", "like", "unlike", "rate", "purchase",
  "checkout", "verify", "complete", "abort", "sign", "contribute", "tip", "forward", "reply", "comment", "reserve",
  "release"]);
/** A request that changes something: PUT / PATCH / DELETE, or a POST whose endpoint is not named like a read. */
export function isWriteRequest(method, url) {
  const m = String(method || "GET").toUpperCase();
  if (m === "PUT" || m === "PATCH" || m === "DELETE") return true;
  if (m !== "POST") return false;
  let path = "";
  try { path = new URL(String(url || ""), hasDom() ? window.location.href : "http://x/").pathname.toLowerCase(); } catch { return true; }
  const words = path.split(/[^a-z]+/).filter(Boolean);
  return !(words.some((w) => READ_WORDS.has(w)) && !words.some((w) => WRITE_WORDS.has(w)));
}

/** How long a tapped button that still shows busy keeps owning the writes it starts. */
const BUSY_ATTRIBUTION_MS = 120000;
function isBusyControl(el) {
  if (!el.isConnected) return false;
  if (el.getAttribute("aria-busy") === "true" || el.classList.contains("ant-btn-loading")) return true;
  return !!el.disabled && !!dialogOf(el);
}

function patchXhr() {
  if (xhrPatched || !xhrOwner || typeof XMLHttpRequest === "undefined") return;
  xhrPatched = true;
  const open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function lgfTrackedOpen(method, url, ...rest) {
    try { if (xhrMeta) xhrMeta.set(this, { method: String(method || "GET").toUpperCase(), url: String(url || "") }); } catch { /* ignore */ }
    return open.call(this, method, url, ...rest);
  };
  const send = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function lgfTrackedSend(...args) {
    try {
      if (installs > 0 && !isBackgroundEventContext()) {
        const meta = (xhrMeta && xhrMeta.get(this)) || {};
        let owner = attributedTap();
        const strong = !!owner;
        if (!isTrackedRequest(meta.url)) {
          // not the app's API: never counted, never decides anything — but a
          // request sent inside a tap's own chain (an S3 upload part) passes
          // the link on to code running in its events (the save after it)
          if (strong) xhrOwner.set(this, owner);
          owner = null;
        } else {
          if (!owner && last && last.el && now() - last.t < SEND_ATTRIBUTION_MS) owner = last;
          // a slow save (file read, compression, upload chunks, then the save):
          // while the tapped button still shows busy, its writes are still its own
          if (!owner && last && last.el && now() - last.t < BUSY_ATTRIBUTION_MS
            && isWriteRequest(meta.method, meta.url) && isBusyControl(last.el)) owner = last;
        }
        if (owner) {
          xhrOwner.set(this, owner);
          if (xhrMeta) watchRequest(this, owner, strong);
          // a request started from a button inside a dialog: picture the dialog
          // now, and watch for it closing while (or right after) it works
          if (owner.el && !owner.snap && !owner.dismiss && !owner.clickable && dialogOf(owner.el)) {
            owner.snap = snapshotDialog(owner.el);
            if (owner.snap) watchDialogClose(owner);
          }
        }
      }
    } catch { /* never break a request */ }
    return send.apply(this, args);
  };
}

/**
 * Start tracking taps. Ref-counted, so several providers (or StrictMode's
 * double effect) are safe. Returns the matching uninstall function. The XHR
 * hook stays installed but is inert while nothing is tracking.
 */
export function installInteractionTracker() {
  if (!hasDom()) return () => {};
  if (installs++ === 0) {
    patchXhr();
    listeners = {
      pointerdown: (e) => {
        if (e.button > 0) return; // ignore right/middle clicks
        lastInputAt = now();
        if (isDismissTarget(e.target)) lastDismissAt = lastInputAt;
        const ctl = pickAnchor(e.target);
        const row = ctl ? null : pickClickable(e.target);
        record(e.target, ctl || row);
        if (row && last && last.el === row) last.clickable = true; // a selectable row: no dialog hold, no loose pinning
      },
      keydown: (e) => {
        if (e.key === "Escape") { lastInputAt = lastDismissAt = now(); return; }
        if (e.key !== "Enter" && e.key !== " ") return;
        lastInputAt = now();
        if (isDismissTarget(document.activeElement)) lastDismissAt = lastInputAt;
        record(document.activeElement, pickAnchor(document.activeElement));
      },
      change: (e) => {
        const t = e.target;
        if (t && t.tagName === "INPUT" && t.type === "file" && t.files && t.files.length) {
          const el = pickerOpener() || fileAnchor(t);
          if (el) record(el, el, "file");
        }
      },
      drop: (e) => {
        if (!e.dataTransfer || !e.dataTransfer.files || !e.dataTransfer.files.length) return;
        const el = dropAnchor(e.target);
        if (el) record(el, el, "file");
      },
      submit: (e) => {
        const form = e.target;
        const btn = e.submitter
          || (form && typeof form.querySelector === "function"
            ? form.querySelector("button[type=submit],input[type=submit],button:not([type])")
            : null);
        const el = btn && !btn.closest(EXCLUDE_SELECTOR) ? btn : null;
        record(el || form, el, el ? "submit" : undefined);
      },
    };
    for (const [type, fn] of Object.entries(listeners)) document.addEventListener(type, fn, true);
  }
  let done = false;
  return () => {
    if (done) return;
    done = true;
    if (--installs === 0 && listeners) {
      for (const [type, fn] of Object.entries(listeners)) document.removeEventListener(type, fn, true);
      listeners = null;
      last = null;
      lastInputAt = lastDismissAt = -Infinity;
    }
  };
}

/**
 * A tap on a message's own action (Undo) counts as a new tap on the control
 * that message stood for, so what the action sets off (a restore that fails)
 * reports in the same place.
 */
export function retap(prev) {
  if (!prev) return;
  last = { el: prev.el, hint: prev.hint, t: now(), rect: prev.rect, label: prev.label, href: hasDom() ? window.location.href : "", target: prev.target, trail: prev.trail, opener: prev.opener, openerTrail: prev.openerTrail };
}

/** The last tap if it is recent enough to own the next message (weak link). */
export function recentInteraction() {
  if (!last || !last.el || last.clickable) return null; // a row tap never owns a message by time alone
  if (now() - last.t > (last.hint === "file" ? FILE_WINDOW_MS : ANCHOR_WINDOW_MS)) return null;
  return last;
}

/**
 * Where an error goes when nothing links it to a control (it arrived from a
 * socket, a timer, a page load…): the main button of the dialog that is open,
 * else the last control the user tapped, else the focused control — whichever
 * is on screen. null = nowhere sensible (it is announced to screen readers).
 */
export function nearestFallbackAnchor(exclude) {
  if (!hasDom()) return null;
  const ok = (el) => el && el !== exclude && el.isConnected && !el.closest(EXCLUDE_SELECTOR) && isAnchorVisible(el);
  const dialogs = [...document.querySelectorAll('[role=dialog],[role=alertdialog],[aria-modal="true"],.ant-modal-content,.ant-drawer-content')]
    .filter((d) => !d.closest("[data-lg-feedback]") && !d.closest(LEAVING_SELECTOR) && d.getBoundingClientRect().width > 0);
  const top = dialogs[dialogs.length - 1];
  if (top) {
    const buttons = [...top.querySelectorAll("button,[role=button],.ant-btn,input[type=submit]")].filter((b) => !b.disabled && ok(b));
    const primary = buttons.find((b) => b.matches(".ant-btn-primary,[type=submit],[data-lga-btn]")) || buttons[buttons.length - 1];
    if (primary) return primary;
  }
  if (last && !last.clickable && ok(last.el)) return last.el;
  const focused = document.activeElement && pickAnchor(document.activeElement);
  return ok(focused) ? focused : null;
}

/** Test hook. */
export function __resetInteraction(value = null) {
  last = value ? { el: null, ...value, t: value.t ?? now() } : null;
}

/**
 * True while the browser is dispatching a background event: a WebSocket /
 * EventSource / worker / cross-window message, or a storage event. socket.io
 * and Django Channels handlers run synchronously inside the socket's message
 * event, so `window.event` identifies them. Those messages were not caused by
 * the last tap and must never be pinned to it.
 */
const BACKGROUND_TARGETS = ["WebSocket", "EventSource", "MessagePort", "BroadcastChannel", "Worker", "SharedWorker"];
export function isBackgroundEventContext() {
  const e = currentEvent();
  if (!e) return false;
  const target = e.target;
  for (const name of BACKGROUND_TARGETS) {
    const Ctor = window[name];
    if (typeof Ctor === "function" && target instanceof Ctor) return true;
  }
  const isWindow = !!target && (target === window || target.window === target);
  return isWindow && (e.type === "message" || e.type === "storage");
}

/** Variants allowed to follow a tap on the weak (time-window-only) link. */
export const AUTO_ANCHOR_VARIANTS = new Set(["success", "error"]);

// ---------------------------------------------------------------------------
// Classification
// ---------------------------------------------------------------------------

function visibleText(el) {
  const raw = typeof el.innerText === "string" ? el.innerText : el.textContent || "";
  return raw.replace(/\s+/g, " ").trim();
}

/** Empty, or only a count such as "12", "1.2k", "3,400". */
function isIconOnly(el) {
  const t = visibleText(el);
  return t === "" || /^[\d.,]+\s*[kKmM]?$/.test(t);
}

/**
 * "confirm" | "submit" | "switch" | "icon" | "generic"
 * Structure only. First match wins.
 */
export function classifyAnchor(el, hint) {
  if (!el) return "generic";
  if (el.closest(CONFIRM_SELECTOR)) return "confirm";
  if (hint === "submit") return "submit";
  if (el.matches(SWITCH_SELECTOR)) return "switch";
  const tag = el.tagName;
  const type = (el.getAttribute("type") || "").toLowerCase();
  if (tag === "INPUT" && type === "submit") return "submit";
  if (tag === "BUTTON" && el.form && (type === "submit" || type === "")) return "submit";
  if (el.classList.contains("ant-btn-primary") && el.closest("form")) return "submit";
  if (isIconOnly(el)) return "icon";
  return "generic";
}

/** A text control of button size: success turns the control itself into "✓ Done". */
export function isMorphable(el, kind) {
  if (kind === "switch" || kind === "icon") return false;
  const r = el.getBoundingClientRect();
  return r.height >= 18 && r.height <= 96 && r.width >= 48; // two-line buttons are still buttons
}

/**
 * How to show a message on a given element.
 * mode: "morph" (success on a text button) | "side" (switch) | "pop".
 * Confirm-dialog buttons behave like any button (their dialog is held).
 */
export function displayFor(variant, el, hint) {
  const raw = classifyAnchor(el, hint);
  const kind = raw === "confirm" ? "generic" : raw;
  // success AND error stay inside a text button (an error line under a button
  // in a modal spills out of it); warnings / info read as inline text
  if ((variant === "success" || variant === "error") && isMorphable(el, kind)) return { mode: "morph", kind };
  return { mode: kind === "switch" ? "side" : "pop", kind };
}

/** "Post created successfully." → "Post created". Other languages pass through unchanged. */
export function shortLabel(text) {
  return String(text ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\s+successfully\s*[.!]*$/i, "")
    .replace(/[.!]+$/, "")
    .trim();
}

// ---------------------------------------------------------------------------
// Eligibility + geometry
// ---------------------------------------------------------------------------

/** On screen, not animating out, and not covered by another layer. */
export function isAnchorVisible(el) {
  if (!el || !el.isConnected || !hasDom()) return false;
  if (el.closest(LEAVING_SELECTOR)) return false;
  const r = el.getBoundingClientRect();
  if (r.width <= 0 || r.height <= 0) return false;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (r.bottom <= 0 || r.top >= vh || r.right <= 0 || r.left >= vw) return false;
  if (typeof document.elementFromPoint === "function") {
    const cx = Math.min(Math.max(r.left + r.width / 2, 0), vw - 1);
    const cy = Math.min(Math.max(r.top + r.height / 2, 0), vh - 1);
    const hit = document.elementFromPoint(cx, cy);
    // A hit on an ancestor is fine (pointer-events:none on loading buttons
    // passes the hit to the parent). A hit on an unrelated layer (modal mask,
    // sticky header) means the control is covered.
    if (hit && !(el.contains(hit) || hit.contains(el) || (hit.closest && hit.closest("[data-lg-feedback]")))) {
      return false;
    }
  }
  return true;
}

/** Message must be plain text of reasonable length to live on a control. */
export function isInlineText(text) {
  if (typeof text !== "string" && typeof text !== "number") return false;
  const t = String(text).trim();
  return t.length > 0 && t.length <= MAX_INLINE_CHARS && !/\n/.test(t);
}

/**
 * Lifetime once shown, by variant and display (ms). In-button states follow the
 * Live Gemini save-button design: success 1.6 s, failure 2.2 s.
 */
export function inlineDuration(variant, kind, mode, fit) {
  if (variant === "error" && mode === "morph") return 2200; // design: then back for a retry
  if (variant === "error" || variant === "warning") return 4000;
  if (variant === "info") return 2500;
  if (mode === "morph") return fit === "icon" ? 1300 : 1600; // design resetAfter
  return kind === "switch" || kind === "icon" ? 1200 : 1600;
}

// Past participles that can end a short "noun + verb" label ("Gift sent").
const PARTICIPLE = /^(?:\w*[^e]ed|sent|left|done|paid|made|set|won|cut|put|read|kept|lost|built|held|found|bought|shown|seen|taken|given|chosen|written|hidden|broken|frozen|known|grown|drawn|begun|run|live|on|off)$/i;

/**
 * Button-sized versions of a message, most specific first — never generic:
 *   "Withdrawal cancelled. $95.00 is back in your balance" → "Withdrawal cancelled"
 *   "Gift sent · −40 credits" → "Gift sent"
 *   "Shared to your feed" → "Shared"
 */
export function labelCandidates(text) {
  const full = shortLabel(text);
  const out = [full];
  const first = full.split(/[.!?]\s+|\s+[·—–]\s+|\s+-\s+|,\s+|\s+\(/)[0].replace(/[.!]+$/, "").trim();
  out.push(first);
  out.push(first.replace(/^(?:your|the)\s+/i, ""));
  const words = first.split(" ");
  const i = words.findIndex((w) => PARTICIPLE.test(w.replace(/[^\w]/g, "")));
  // "Signed out of all devices" → "Signed out" (a phrasal verb keeps its particle)
  const PARTICLE = /^(?:out|up|in|off|back|down|over|away|on)$/i;
  const j = i >= 0 && i < words.length - 1 && PARTICLE.test(words[i + 1]) ? i + 1 : i;
  if (j >= 0 && j < words.length - 1) out.push(words.slice(0, j + 1).join(" "));
  // "Call pricing settings saved" → "Settings saved" (noun + verb at the end)
  const NOT_NOUN = /^(?:is|are|was|were|be|been|being|to|your|the|a|an|my|our|has|have|now|just|all)$/i;
  if (words.length > 2 && PARTICIPLE.test(words[words.length - 1].replace(/[^\w]/g, ""))
    && !NOT_NOUN.test(words[words.length - 2])) out.push(words.slice(-2).join(" "));
  // a narrow button ("Approve"): the verb alone still says what happened —
  // "Extension approved" → "Approved" — but never a vague one ("Set", "Done")
  const tail = (out[out.length - 1] || "").split(" ");
  const verb = tail[tail.length - 1].replace(/[^\w]/g, "");
  const before = tail.length >= 2 ? tail[tail.length - 2] : "";
  if (before && !NOT_NOUN.test(before) && !/^(?:will|get|gets|getting|not|never)$/i.test(before)
    && PARTICIPLE.test(verb) && verb.length >= 4 && !/^(?:done|live|made|held|kept|read)$/i.test(verb)) out.push(verb);
  const capFirst = (x) => (x ? x.charAt(0).toUpperCase() + x.slice(1) : x);
  return [...new Set(out.map((x) => capFirst(x.trim())).filter((x) => x && x.length <= 48))];
}

/**
 * Button-sized versions of an ERROR: what went wrong in a few words, then a
 * common "Failed" when even that does not fit. The full message (with what to
 * do) stays in the live region for screen readers.
 *   "No connection. Check your internet." → "No connection"
 *   "Couldn't send the tip. Try again."   → "Couldn't send the tip" → "Couldn't send"
 *   "Not enough credits. Top up to continue." → "Not enough credits"
 */
export function errorLabelCandidates(text, failed = "Failed") {
  const full = shortLabel(text);
  const first = full.split(/[.!?]\s+|\s+[·—–]\s+|\s+-\s+|,\s+|\s+\(/)[0].replace(/[.!]+$/, "").trim();
  const out = [first];
  // "This item is not available for purchase" → "Not available for purchase" → "Not available"
  const neg = first.match(/^(?:this|that|the|your|it)\b[^,]*?\s(?:(?:is|are|was|were)\s+not|isn't|aren't|wasn't)\s+(.+)$/i);
  if (neg) {
    const what = `Not ${neg[1]}`;
    out.push(what, what.split(/\s+(?:for|to|in|on|at|with|from|because|yet|anymore|right now)\b/i)[0]);
  }
  const m = first.match(/^(couldn't|can't|cannot)\s+(\w+)/i);
  // "Couldn't do that" → "Couldn't do" says nothing: go straight to the common word
  if (m && !/^(?:do|complete|process|perform|finish|handle|proceed|continue|that|this|it)$/i.test(m[2])) out.push(`${m[1]} ${m[2]}`);
  out.push(failed || "Failed");
  const capFirst = (x) => (x ? x.charAt(0).toUpperCase() + x.slice(1) : x);
  return [...new Set(out.map((x) => capFirst(x.trim())).filter((x) => x && x.length <= 48))];
}

/** Snackbar lifetime by variant when the caller gave none (ms). */
export function snackbarDuration(variant) {
  if (variant === "success") return 1800;
  if (variant === "info") return 3000;
  return 4000;
}

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

/**
 * Where to put a pop of size w×h for an anchor rect.
 * side "right" (switches), else "below", flipping "above" when there is no room.
 */
export function computePlacement(rect, w, h, preferSide, vw, vh, align = "center", box = null) {
  const GAP = 6;
  const EDGE = 12;
  if (preferSide === "right") {
    const left = rect.right + 8;
    if (left + w <= vw - EDGE) {
      const top = clamp(rect.top + rect.height / 2 - h / 2, EDGE, Math.max(EDGE, vh - EDGE - h));
      return { top, left, side: "right" };
    }
  }
  const roomBelow = vh - rect.bottom - GAP - EDGE;
  const roomAbove = rect.top - GAP - EDGE;
  const below = roomBelow >= h || roomAbove < h;
  const top = below ? rect.bottom + GAP : rect.top - GAP - h;
  // wide controls (upload areas, cards): text starts at the control's left edge,
  // like a field error; a small control near the right of its card: text ends at
  // its right edge; otherwise centred under it
  const want = align === "start" ? rect.left : align === "end" ? rect.right - w : rect.left + rect.width / 2 - w / 2;
  // stay inside the card the control belongs to (never over the next column), then the screen
  let lo = EDGE;
  let hi = vw - EDGE - w;
  if (box && box.right - box.left - 16 >= w) {
    lo = Math.max(lo, box.left + 8);
    hi = Math.min(hi, box.right - 8 - w);
  }
  const left = clamp(want, lo, Math.max(lo, hi));
  return { top, left, side: below ? "below" : "above" };
}

/**
 * The card / panel a control sits in: the nearest ancestor drawn as a box
 * (background, border or shadow), so an inline message stays inside it.
 */
export function containerBox(el) {
  if (!hasDom() || !el || !el.parentElement) return null;
  for (let n = el.parentElement, i = 0; n && i < 14 && n !== document.body && n.id !== "root"; n = n.parentElement, i += 1) {
    let cs;
    try { cs = getComputedStyle(n); } catch { return null; }
    const r = n.getBoundingClientRect();
    if (r.width < 160 || r.height < 48) continue;
    if (isDrawnBox(cs)) return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
  }
  return null;
}

/**
 * No words of the page under this rect (pictures and plain backgrounds are
 * fine): a message can sit there without covering anything readable.
 */
export function freeOfText(rect) {
  if (!hasDom() || typeof document.elementFromPoint !== "function") return false;
  const right = rect.left + rect.width;
  const bottom = rect.top + rect.height;
  // the words themselves (a title line is as wide as its card, its words are not)
  const covers = (node) => {
    const range = document.createRange();
    range.selectNodeContents(node);
    return Array.from(range.getClientRects()).some((q) => q.left < right + 2 && q.right > rect.left - 2 && q.top < bottom + 2 && q.bottom > rect.top - 2);
  };
  for (const fx of [0.05, 0.5, 0.95]) {
    for (const fy of [0.2, 0.8]) {
      const x = rect.left + rect.width * fx;
      const y = rect.top + rect.height * fy;
      if (x < 0 || y < 0 || x >= window.innerWidth || y >= window.innerHeight) return false;
      const hit = document.elementFromPoint(x, y);
      if (!hit) continue;
      // a control under it (a whole clickable card is not one)
      const ctl = hit.closest && hit.closest(ANCHOR_SELECTOR);
      if (ctl) {
        const q = ctl.getBoundingClientRect();
        if (q.width * q.height < 160 * 120) return false;
      }
      if (Array.from(hit.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim() && covers(n))) return false;
    }
  }
  return true;
}

/** A picture (photo, video, cover image) is under this rect: plain coloured text would not read on it. */
export function overPicture(rect) {
  if (!hasDom() || typeof document.elementFromPoint !== "function") return false;
  for (const fx of [0.15, 0.5, 0.85]) {
    const x = rect.left + rect.width * fx;
    const y = rect.top + rect.height / 2;
    if (x < 0 || y < 0 || x >= window.innerWidth || y >= window.innerHeight) continue;
    for (let n = document.elementFromPoint(x, y), i = 0; n && i < 3 && n !== document.body; n = n.parentElement, i += 1) {
      if (/^(?:IMG|VIDEO|CANVAS|PICTURE)$/.test(n.tagName)) return true;
      let bg = "";
      try { bg = getComputedStyle(n).backgroundImage; } catch { /* ignore */ }
      if (/url\(/.test(bg || "")) return true;
    }
  }
  return false;
}

/** Drawn as a box of its own: a background, a border or a shadow. */
function isDrawnBox(cs) {
  const m = /rgba?\(([^)]+)\)/.exec(cs.backgroundColor || "");
  const parts = m ? m[1].split(/[\s,/]+/).filter(Boolean) : [];
  const alpha = parts.length > 3 ? parseFloat(parts[3]) : (m ? 1 : 0);
  return alpha > 0.04 || (!!cs.backgroundImage && cs.backgroundImage !== "none")
    || parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderLeftWidth) > 0 || (!!cs.boxShadow && cs.boxShadow !== "none");
}

/**
 * A tiny icon button fused with its neighbours into one drawn pill
 * ("12.00 CR | cart"): the pill, so a result can show inside it instead of a
 * line of text spilling off the card. A plain row of icons is not a pill.
 */
export function buttonGroupOf(el) {
  if (!hasDom() || !el || !isIconOnly(el) || el.matches(SWITCH_SELECTOR)) return null;
  const p = el.parentElement;
  if (!p || p === document.body || p.id === "root") return null;
  const kids = Array.from(p.children).filter((k) => {
    const r = k.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  });
  if (kids.length < 2 || kids.length > 3 || !kids.every((k) => k.matches("button,[role=button],a[href]"))) return null;
  const r = p.getBoundingClientRect();
  if (r.height < 18 || r.height > 64 || r.width < 64 || r.width > 360) return null;
  // fused: the buttons fill the pill edge to edge
  const filled = kids.reduce((w, k) => w + k.getBoundingClientRect().width, 0);
  if (filled < r.width * 0.85) return null;
  let cs;
  try { cs = getComputedStyle(p); } catch { return null; }
  return isDrawnBox(cs) ? p : null;
}

/**
 * The tapped control and its ancestors at tap time — where each sat, among
 * which siblings — so a card removed by the tap can keep its place.
 */
export function trailOf(el) {
  if (!hasDom() || !el) return null;
  const out = [];
  for (let n = el, i = 0; n && n.parentElement && i < 12; n = n.parentElement, i += 1) {
    const p = n.parentElement;
    if (p === document.body || p === document.documentElement) break;
    const r = n.getBoundingClientRect();
    let cs = null;
    try { cs = getComputedStyle(n); } catch { /* detached */ }
    out.push({
      el: n,
      parent: p,
      next: n.nextSibling,
      kids: Array.from(p.children),
      rect: { top: r.top, left: r.left, width: r.width, height: r.height },
      radius: cs ? cs.borderRadius : "",
      margin: cs ? cs.margin : "",
      cells: n.tagName === "TR" ? n.cells.length : 0,
    });
  }
  return out;
}

/**
 * The piece of the page the tap took away with its control (the removed card,
 * row or the control alone): the highest gone ancestor whose list is still
 * there. Null when the control is still in the page.
 */
export function removedItem(trail) {
  if (!trail || !trail.length) return null;
  for (const s of trail) {
    if (s.el.isConnected) return null;
    if (s.parent.isConnected) return s;
  }
  return null;
}

const notOurs = (n) => !(n.matches && n.matches("[data-lg-feedback]"));

/**
 * The list the item sat in holds fewer items now: it was taken OUT (a removed
 * favourite, an unbanned user), not drawn again in place (a form that became
 * its row, "Accept" that became "Deliver clip").
 */
export function listShrank(item) {
  if (!item || !item.parent || !item.kids) return false;
  return Array.from(item.parent.children).filter(notOurs).length < item.kids.filter(notOurs).length;
}

/**
 * The removed item is back in its list (Undo, or the app putting it back after
 * a failed remove): the new element that is that same item — matched by the
 * words only it had, wherever it now sits — else null.
 */
export function itemBack(item) {
  if (!item || !item.parent || !item.parent.isConnected || !repeatedItem(item)) return null;
  for (const c of Array.from(item.parent.children)) {
    if (!notOurs(c) || item.kids.includes(c)) continue;
    if (c.tagName === item.el.tagName && sameItemText(item, c, true)) return c;
  }
  return null;
}

/** In the item that came back, the control at the same place the tapped one had. */
export function controlIn(back, trail, item) {
  if (!back || !trail) return null;
  const path = [];
  for (const s of trail) {
    if (s.el === item.el) break;
    path.unshift(Array.prototype.indexOf.call(s.kids, s.el));
  }
  let n = back;
  for (const i of path) n = n && n.children[i];
  return n && typeof n.matches === "function" && n.matches(ANCHOR_SELECTOR) ? n : null;
}

/**
 * Keeps a removed item in view while its message (Removed · Undo) is on
 * screen: a dimmed, inert copy of the card at the place it was, so the user
 * sees WHAT was removed and the next card does not slide under the message.
 * Undo puts the real card back into the same place; the caller removes the
 * copy when the message ends.
 */
export function placeholderFor(item) {
  if (!hasDom() || !item || !item.el || item.el.nodeType !== 1) return null;
  const p = item.parent;
  const g = item.rect;
  if (!p || !p.isConnected || p === document.body || p.id === "root") return null;
  if (!g || !(g.width > 0) || !(g.height > 0) || g.height > window.innerHeight * 0.9 || g.width > window.innerWidth) return null;
  // one of a list of like items (cards, rows, tiles) — not a page section or a form
  if (!repeatedItem(item)) return null;
  const ph = item.el.cloneNode(true);
  // a still picture: no duplicate ids, no playing / reloading media
  ph.removeAttribute("id");
  for (const n of ph.querySelectorAll("[id]")) n.removeAttribute("id");
  for (const v of ph.querySelectorAll("video")) {
    v.removeAttribute("autoplay");
    v.autoplay = false;
    v.preload = "none";
    v.muted = true;
  }
  for (const f of ph.querySelectorAll("iframe")) {
    const d = document.createElement("div");
    d.className = f.className;
    d.style.cssText = f.style.cssText;
    f.replaceWith(d);
  }
  const from = item.el.querySelectorAll("canvas");
  ph.querySelectorAll("canvas").forEach((c, i) => {
    try {
      c.width = from[i].width;
      c.height = from[i].height;
      c.getContext("2d").drawImage(from[i], 0, 0);
    } catch { /* tainted or no 2d context: leave it blank */ }
  });
  ph.setAttribute("data-lg-feedback", "ghost");
  ph.setAttribute("aria-hidden", "true");
  ph.setAttribute("inert", "");
  ph.style.pointerEvents = "none";
  ph.style.animation = "none"; // an entrance animation would replay on the copy
  ph.style.opacity = ".32";
  ph.style.filter = "saturate(.45)";
  ph.style.transition = "opacity .2s ease";
  if (ph.tagName !== "TR") ph.style.minHeight = `${g.height}px`;
  // where it was: before its old neighbour, or (a list that redrew every row)
  // before whatever now sits at its old position
  const idx = item.kids.filter(notOurs).indexOf(item.el);
  const ref = item.next && item.next.parentNode === p ? item.next
    : (idx >= 0 ? Array.from(p.children).filter(notOurs)[idx] || null : null);
  p.insertBefore(ph, ref);
  // it must show where the item was (a list swapped for a loader puts it elsewhere)
  const at = ph.getBoundingClientRect();
  if (Math.abs(at.top - g.top) > Math.max(48, g.height / 2) || Math.abs(at.left - g.left) > Math.max(48, g.width / 2)) {
    ph.remove();
    return null;
  }
  return ph;
}

const classesOf = (n) => (typeof n.className === "string" ? n.className.split(/\s+/).filter(Boolean) : []);
/** The removed element had a sibling of its own kind (same tag, a shared class) at the tap. */
function repeatedItem(item) {
  const mine = classesOf(item.el);
  return item.kids.some((k) => {
    if (k === item.el || k.tagName !== item.el.tagName || !notOurs(k)) return false;
    const theirs = classesOf(k);
    return mine.length === 0 ? theirs.length === 0 : theirs.some((c) => mine.includes(c));
  });
}

const wordsOf = (s) => new Set(String(s || "").toLowerCase().split(/[^\p{L}\p{N}@#]+/u).filter((w) => w.length > 1));
/**
 * The new row in the removed row's place is that same item drawn again: it
 * keeps the words only the removed row had (its title, name, amount), not just
 * the words every row has ("Accept", "credits").
 */
function ownWords(item) {
  const own = wordsOf(item.el.textContent);
  for (const k of item.kids) if (k !== item.el) for (const w of wordsOf(k.textContent)) own.delete(w);
  return own;
}
function sameItemText(item, row, strict = false) {
  const own = ownWords(item);
  if (!own.size) return !strict; // nothing tells the rows apart
  const now = wordsOf(row.textContent);
  let kept = 0;
  for (const w of own) if (now.has(w)) kept += 1;
  return kept / own.size >= 0.5;
}

/**
 * The shortest specific wording for a message shown beside a tiny control
 * (an icon, a "…"): "Pinned to your profile" → "Pinned". The full sentence
 * still reaches screen readers. Errors keep their first clause ("No connection").
 */
export function compactText(text, variant) {
  if (variant === "success" || variant === "info") {
    const c = labelCandidates(text);
    return c.find((x) => x.length <= 18) || c.reduce((a, b) => (b.length < a.length ? b : a), c[0] || String(text));
  }
  // one short line beside the control; the common "Failed" (always last) says nothing here
  const c = errorLabelCandidates(text).slice(0, -1);
  const first = c[0] || String(text);
  return c.find((x) => x.length <= 24) || (first.length <= 40 ? first : String(text));
}

// ---------------------------------------------------------------------------
// Holding a dialog that closes on success
// ---------------------------------------------------------------------------

/** Copy what cloneNode does not: typed values, canvases, video frames; neutralise iframes. */
function copyLiveState(src, dst) {
  const a = src.querySelectorAll("input,textarea,select,canvas,video,iframe");
  const b = dst.querySelectorAll("input,textarea,select,canvas,video,iframe");
  for (let i = 0; i < a.length; i += 1) {
    const s = a[i];
    const d = b[i];
    if (!d) continue;
    try {
      const tag = s.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
        if (s.type !== "file") d.value = s.value;
        if ("checked" in s) d.checked = s.checked;
      } else if (tag === "CANVAS") {
        d.width = s.width;
        d.height = s.height;
        const ctx = d.getContext && d.getContext("2d");
        if (ctx) ctx.drawImage(s, 0, 0);
      } else if (tag === "VIDEO" || tag === "IFRAME") {
        // a cloned video/iframe would reload and flash; show a still / an empty box instead
        const ph = document.createElement(tag === "VIDEO" ? "canvas" : "div");
        ph.className = s.className;
        ph.style.cssText = s.style.cssText;
        ph.style.width = `${s.clientWidth}px`;
        ph.style.height = `${s.clientHeight}px`;
        if (tag === "VIDEO" && s.videoWidth) {
          const k = Math.min(1, (Math.max(1, s.clientWidth) * 2) / s.videoWidth);
          ph.width = Math.round(s.videoWidth * k);
          ph.height = Math.round(s.videoHeight * k);
          ph.style.objectFit = getComputedStyle(s).objectFit;
          const ctx = ph.getContext && ph.getContext("2d");
          if (ctx) ctx.drawImage(s, 0, 0, ph.width, ph.height);
        }
        d.replaceWith(ph);
      }
    } catch { /* tainted canvas, detached media: leave as cloned */ }
  }
}

/**
 * Freeze a copy of the dialog that holds `el`, taken while it is still open.
 * Returns { clone, twin, root, dialog } — `twin` is the copy of `el` — or null when the
 * control is not in a portal-rendered dialog (antd Modal / Drawer / Popconfirm,
 * the sweet-alert …). The copy is detached until it is needed: if the real
 * dialog closes before the ✓ has been seen, the copy is put in its place.
 */
export function snapshotDialog(el) {
  if (!hasDom() || !el || !el.isConnected || el.closest(LEAVING_SELECTOR)) return null;
  const dlg = dialogOf(el);
  if (!dlg) return null;
  // The portal root: the child of <body> holding the dialog. Never the app root.
  let root = dlg;
  while (root.parentElement && root.parentElement !== document.body) root = root.parentElement;
  if (root.parentElement !== document.body) return null;
  // Inside the app tree: copy only the overlay (its outermost fixed layer) and
  // a backdrop drawn beside it, inside shallow stand-ins for its ancestors so
  // the app's CSS still matches.
  let inline = null;
  if (root.id === "root" || root.querySelector("#root")) {
    let overlay = isFixed(dlg) ? dlg : null;
    for (let n = dlg.parentElement; n && n !== document.body && n.id !== "root"; n = n.parentElement) if (isFixed(n)) overlay = n;
    if (!overlay) return null;
    const scrim = [...overlay.parentElement.children].find((x) => x !== overlay && isScrim(x)) || null;
    inline = { overlay, scrim };
    root = overlay;
  }
  if (root.getElementsByTagName("*").length > 8000) return null;
  const path = [];
  for (let n = el; n !== root; n = n.parentElement) {
    path.unshift(Array.prototype.indexOf.call(n.parentElement.children, n));
  }
  const dlgPath = [];
  if (dlg !== root && root.contains(dlg)) {
    for (let n = dlg; n !== root; n = n.parentElement) dlgPath.unshift(Array.prototype.indexOf.call(n.parentElement.children, n));
  }
  // scrolled containers (a long modal scrolled to its Save button): a copy
  // starts at the top, so remember where they were and restore on insert
  const scrolls = [];
  const pathTo = (n) => {
    const p = [];
    for (let x = n; x !== root; x = x.parentElement) p.unshift(Array.prototype.indexOf.call(x.parentElement.children, x));
    return p;
  };
  for (const n of [root, ...root.getElementsByTagName("*")]) {
    if (n.scrollTop > 0 || n.scrollLeft > 0) scrolls.push({ path: n === root ? [] : pathTo(n), top: n.scrollTop, left: n.scrollLeft });
  }
  let clone;
  try { clone = root.cloneNode(true); } catch { return null; }
  copyLiveState(root, clone);
  let twin = clone;
  for (const i of path) {
    twin = twin && twin.children[i];
  }
  if (!twin) return null;
  // Inert visual copy: no ids/names to collide with the live page, no focus,
  // hidden from assistive tech (the live region already announced the text).
  for (const n of [clone, ...clone.querySelectorAll("[id],[name],[autofocus]")]) {
    n.removeAttribute("id");
    n.removeAttribute("autofocus");
    if (n.tagName === "INPUT" || n.tagName === "SELECT" || n.tagName === "TEXTAREA") n.removeAttribute("name");
  }
  // pictured while still animating in: rc-motion's enter classes would keep the copy at opacity 0
  for (const n of [clone, ...clone.querySelectorAll('[class*="-enter"],[class*="-appear"]')]) {
    if (typeof n.className !== "string" || !/-(?:enter|appear)/.test(n.className)) continue;
    n.className = n.className.split(/\s+/).filter((c) => !/-(?:enter|appear)(?:-|$)/.test(c)).join(" ");
  }
  let shown = clone; // what goes into <body>
  if (inline) {
    let z = parseInt(getComputedStyle(inline.overlay).zIndex, 10);
    if (!Number.isFinite(z)) z = 1000;
    const outer = document.createElement("div");
    outer.style.cssText = `position:fixed;inset:0;z-index:${Math.min(z, 2147483000)};pointer-events:none`;
    let at = outer;
    const chain = [];
    for (let n = inline.overlay.parentElement; n && n !== document.body; n = n.parentElement) chain.unshift(n);
    for (const n of chain) {
      const stand = n.cloneNode(false);
      stand.removeAttribute("id");
      stand.style.setProperty("display", "contents", "important");
      at.appendChild(stand);
      at = stand;
    }
    if (inline.scrim) at.appendChild(inline.scrim.cloneNode(true));
    at.appendChild(clone);
    shown = outer;
  }
  shown.setAttribute("inert", "");
  shown.setAttribute("aria-hidden", "true");
  shown.setAttribute("data-lg-feedback", "held");
  const copy = clone; // the copy of `root` (scroll paths start here)
  clone = shown;
  /** Put the copy on screen exactly as the dialog looked (incl. scroll positions). */
  const insert = () => {
    document.body.appendChild(shown);
    for (const sc of scrolls) {
      let n = copy;
      for (const i of sc.path) n = n && n.children[i];
      if (n) { n.scrollTop = sc.top; n.scrollLeft = sc.left; }
    }
  };
  /** After insert: does the copy dim / cover the page (a modal)? A bar or popover does not. */
  /** Is this point on the copied dialog itself (not on the page around a non-modal one)? */
  const covers = (x, y) => {
    let n = copy;
    for (const i of dlgPath) n = n && n.children[i];
    const r = (n || copy).getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  };
  const isModal = () => {
    if (!shown.isConnected) return false;
    if (dlg.matches('[aria-modal="true"],.ant-modal,.ant-modal-wrap,.ant-drawer,.modal-dialog') && !dlg.matches(".ant-popconfirm")) return true;
    for (const n of [shown, ...shown.querySelectorAll("*")].slice(0, 400)) if (isScrim(n)) return true;
    return false;
  };
  /** The middle of the copied dialog (after insert). */
  const middle = () => {
    let n = copy;
    for (const i of dlgPath) n = n && n.children[i];
    const r = (n || copy).getBoundingClientRect();
    return r.width > 0 ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null;
  };
  return { clone, twin, root, dialog: dlg, el, insert, isModal, covers, middle, surfaces: openSurfaces() };
}

/**
 * A layer that is always mounted but was empty (the call window's full-screen
 * anchor) and now shows something: the app opened a window inside it.
 */
function filledSince(before, x) {
  if (!before.has(x) || !before.rects) return false;
  const was = before.rects.get(x);
  return !!was && /\|$/.test(was.key) && !/\|$/.test(surfaceKey(x));
}

/** What a window is: its classes and its title / first words (a re-render keeps both). */
function surfaceKey(n) {
  const head = n.querySelector("h1,h2,h3,h4,.ant-modal-title,[class*=title]");
  return `${typeof n.className === "string" ? n.className : ""}|${visibleText(head || n).slice(0, 40)}`;
}

/** Dialogs and portal popups on screen right now (never our own copies). */
function openSurfaces() {
  const out = new Set();
  out.rects = new Map(); // where each one was (filled at the end)
  for (const d of document.querySelectorAll(DIALOG_SELECTOR)) {
    if (d.closest("[data-lg-feedback]") || d.closest(LEAVING_SELECTOR)) continue;
    const r = d.getBoundingClientRect();
    if (r.width > 0 && r.height > 0) out.add(d);
  }
  for (const c of document.body.children) {
    if (c.id === "root" || c.matches("[data-lg-feedback],script,style,link,template,noscript")) continue;
    if (c.querySelector("[data-lg-feedback]")) continue; // the feedback layer itself
    // a few levels down (a call window sits inside its portal's wrappers), breadth-first
    const near = [];
    let level = [c];
    for (let d = 0; d < 5 && level.length && near.length < 80; d += 1) {
      near.push(...level);
      level = level.flatMap((x) => [...x.children]).slice(0, 40);
    }
    for (const n of near.slice(0, 80)) {
      if (!isFixed(n)) continue;
      const r = n.getBoundingClientRect();
      if (r.width >= 200 && r.height >= 120) { out.add(n); break; }
    }
  }
  for (const n of document.querySelectorAll('#root [class*="modal"],#root [class*="dialog"],#root [class*="popup"]')) {
    if (!MODALISH.test(typeof n.className === "string" ? n.className : "") || !isFixed(n)) continue;
    const r = n.getBoundingClientRect();
    if (r.width >= 200 && r.height >= 120) out.add(n);
  }
  for (const n of out) { const r = n.getBoundingClientRect(); out.rects.set(n, { left: r.left, top: r.top, width: r.width, height: r.height, key: surfaceKey(n) }); }
  return out;
}

/**
 * Call `onNew` once when a dialog or popup that was not on screen opens (the
 * app moved on: a call window, the next dialog, a success dialog). A held copy
 * must never sit on top of it or swallow the tap meant for it. Returns stop().
 */
export function watchNewSurface(onNew, since, at) {
  if (!hasDom() || typeof MutationObserver === "undefined" || typeof requestAnimationFrame !== "function") return () => {};
  // compare with what was open when the dialog was pictured: the next window
  // may already have opened in the same render that closed the dialog
  const before = since instanceof Set ? since : openSurfaces();
  // a surface re-rendered in place (same spot and size) is the same window
  const beforeRects = before.rects || new Map();
  const samePlace = (x) => {
    const r = x.getBoundingClientRect();
    const k = surfaceKey(x);
    for (const b of beforeRects.values()) {
      if (b.key === k && Math.abs(b.left - r.left) < 12 && Math.abs(b.top - r.top) < 12
        && Math.abs(b.width - r.width) < 12 && Math.abs(b.height - r.height) < 12) return true;
    }
    return false;
  };
  let raf = 0;
  let done = false;
  const stop = () => { done = true; mo.disconnect(); if (raf) cancelAnimationFrame(raf); };
  const check = () => {
    raf = 0;
    if (done) return;
    for (const x of openSurfaces()) {
      if ((!before.has(x) && !samePlace(x)) || filledSince(before, x)) { stop(); try { onNew(); } catch { /* ignore */ } return; }
    }
    // an in-page view took the dialog's place (the call / private-show view):
    // the layer under the held copy's middle is new and covers a good part of the screen
    if (typeof at === "function") {
      const p = at();
      const under = p && typeof document.elementFromPoint === "function" && document.elementFromPoint(p.x, p.y);
      for (let n = under, i = 0; n && n !== document.body && i < 14; n = n.parentElement, i += 1) {
        if (n.closest("[data-lg-feedback]")) break;
        if (!isFixed(n)) continue;
        const r = n.getBoundingClientRect();
        if (!before.has(n) && !samePlace(n) && r.width * r.height >= 0.3 * window.innerWidth * window.innerHeight) {
          stop(); try { onNew(); } catch { /* ignore */ } return;
        }
        break;
      }
    }
  };
  const mo = new MutationObserver(() => { if (!raf && !done) raf = requestAnimationFrame(check); });
  mo.observe(document.body, { childList: true, subtree: true });
  raf = requestAnimationFrame(check);
  return stop;
}

/**
 * The control that now sits where a removed one was (a list refresh re-rendered
 * the card and swapped "Accept" for "Deliver clip"): a button-like element
 * covering most of the old spot, or null.
 */
export function replacementAt(rect, trail) {
  if (!hasDom() || !rect || !(rect.width > 0) || typeof document.elementFromPoint !== "function") return null;
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  if (cx < 0 || cy < 0 || cx >= window.innerWidth || cy >= window.innerHeight) return null;
  // (looking through our own layers: a removed card's dimmed copy, a pop)
  const hits = typeof document.elementsFromPoint === "function" ? document.elementsFromPoint(cx, cy) : [document.elementFromPoint(cx, cy)];
  const hit = hits.find((h) => h && !(typeof h.closest === "function" && h.closest("[data-lg-feedback]")));
  const el = hit && typeof hit.closest === "function" ? hit.closest(ANCHOR_SELECTOR) : null;
  if (!el || el.closest("[data-lg-feedback]")) return null;
  // the card was removed and the NEXT card slid into its place: that is
  // another item, not this control re-rendered (a new row in its place is)
  const item = removedItem(trail);
  if (item) {
    // taken out of its list: what sits there now is ANOTHER item, even when the
    // list redrew every row (rows keyed by position)
    if (listShrank(item)) return null;
    let n = el;
    while (n && n.parentElement !== item.parent) n = n.parentElement;
    if (!n || item.kids.includes(n)) return null;
    // a whole row was drawn again: it must be the same row (not a button relabelled in place)
    if (item.el !== trail[0].el && !sameItemText(item, n)) return null;
  }
  const r = el.getBoundingClientRect();
  const ix = Math.max(0, Math.min(r.right, rect.left + rect.width) - Math.max(r.left, rect.left));
  const iy = Math.max(0, Math.min(r.bottom, rect.top + rect.height) - Math.max(r.top, rect.top));
  const overlap = ix * iy;
  return overlap >= 0.6 * rect.width * rect.height && overlap >= 0.6 * r.width * r.height ? el : null;
}

/** Has a dialog / popup opened since `before` (a set from openSurfaces)? */
export function newSurfaceSince(before) {
  if (!hasDom() || !(before instanceof Set)) return false;
  const rects = before.rects || new Map();
  for (const x of openSurfaces()) {
    if (filledSince(before, x)) return true;
    if (before.has(x)) continue;
    const r = x.getBoundingClientRect();
    const k = surfaceKey(x);
    let same = false;
    for (const b of rects.values()) {
      if (b.key === k && Math.abs(b.left - r.left) < 12 && Math.abs(b.top - r.top) < 12) { same = true; break; }
    }
    if (!same) return true;
  }
  return false;
}

/** The live dialog is closing: removed, hidden, animating out, or fading (framer exit). */
export function isDialogClosing(snap) {
  if (!snap) return false;
  const { root, dialog, el } = snap;
  if (!root.isConnected || !dialog.isConnected || dialog.closest(LEAVING_SELECTOR)) return true;
  // the motion class can sit on a wrapper between the control and the dialog
  // element (antd Modal with a long form): the control itself tells us too.
  // (The control merely going away is NOT a close: a wizard step changed inside
  // the same open dialog — e.g. picking a date in the feature-gallery modal.)
  if (el && el.isConnected && el.closest(LEAVING_SELECTOR)) return true;
  try {
    // fading out — not fading IN (a dialog tapped during its entrance also sits below 1)
    const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : 1; };
    const op = Math.min(num(getComputedStyle(root).opacity), num(getComputedStyle(dialog).opacity));
    const prev = snap.op;
    snap.op = op;
    if (op < 0.98 && prev != null && op < prev - 0.001) return true;
  } catch { /* ignore */ }
  const r = dialog.getBoundingClientRect();
  return r.width === 0 && r.height === 0;
}

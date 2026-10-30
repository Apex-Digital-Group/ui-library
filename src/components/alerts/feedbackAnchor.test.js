import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  pickAnchor,
  classifyAnchor,
  isAnchorVisible,
  isInlineText,
  computePlacement,
  inlineDuration,
  shortLabel,
  labelCandidates,
  errorLabelCandidates,
  displayFor,
  snapshotDialog,
  isDialogClosing,
  doneLabelFor,
  setDialogCloseHandler,
  moduleSaidSomething,
  isTrackedRequest,
  closedByUser,
  isWriteRequest,
  compactText,
  replacementAt,
  removedItem,
  listShrank,
  itemBack,
  controlIn,
  trailOf,
  placeholderFor,
  buttonGroupOf,
  setTrackedOrigins,
  attributedTap,
  snackbarDuration,
  installInteractionTracker,
  recentInteraction,
  __resetInteraction,
  ANCHOR_WINDOW_MS,
} from "./feedbackAnchor";

const html = (markup) => {
  document.body.innerHTML = markup;
  return document.body;
};
const rect = (el, r) => {
  el.getBoundingClientRect = () => ({ x: r.left, y: r.top, width: r.width, height: r.height, top: r.top, left: r.left, right: r.left + r.width, bottom: r.top + r.height, toJSON() {} });
  return el;
};

afterEach(() => {
  document.body.innerHTML = "";
  __resetInteraction();
  vi.useRealTimers();
});

describe("pickAnchor", () => {
  it("returns the nearest button for a tap on its icon", () => {
    html('<button id="b"><svg><path id="p"/></svg></button>');
    expect(pickAnchor(document.getElementById("p")).id).toBe("b");
  });

  it("accepts switches and antd checkbox wrappers", () => {
    html('<button role="switch" id="s"></button><label class="ant-checkbox-wrapper" id="c"><span id="ci"></span></label>');
    expect(pickAnchor(document.getElementById("s")).id).toBe("s");
    expect(pickAnchor(document.getElementById("ci")).id).toBe("c");
  });

  it.each([
    ['<a href="/x"><button id="t">Go</button></a>', "link"],
    ['<nav><button id="t">Home</button></nav>', "nav"],
    ['<div role="tablist"><button role="tab" id="t">Videos</button></div>', "tab"],
    ['<ul class="ant-pagination"><li><button id="t">2</button></li></ul>', "pagination"],
    ['<div class="ant-select"><button id="t">x</button></div>', "select"],
    ['<button class="ant-modal-close" id="t">x</button>', "modal close"],
    ['<div data-lg-feedback="snackbar"><button id="t">Retry</button></div>', "our own portal"],
    ['<button data-feedback="global" id="t">Save</button>', "explicit opt-out"],
  ])("never anchors inside %s (%s)", (markup) => {
    html(markup);
    expect(pickAnchor(document.getElementById("t"))).toBeNull();
  });

  it("ignores plain text and inputs", () => {
    html('<p id="p">hello</p><input id="i" type="text">');
    expect(pickAnchor(document.getElementById("p"))).toBeNull();
    expect(pickAnchor(document.getElementById("i"))).toBeNull();
  });
});

describe("classifyAnchor", () => {
  it("submit: native submit button, default button in a form, antd primary in a form, submit hint", () => {
    html(`
      <form><button type="submit" id="a">Save</button><button id="b">Save</button>
      <button type="button" class="ant-btn ant-btn-primary" id="c">Save</button></form>
      <button type="button" id="d">Send</button>`);
    expect(classifyAnchor(document.getElementById("a"))).toBe("submit");
    expect(classifyAnchor(document.getElementById("b"))).toBe("submit");
    expect(classifyAnchor(document.getElementById("c"))).toBe("submit");
    expect(classifyAnchor(document.getElementById("d"), "submit")).toBe("submit");
  });

  it("switch: role=switch, antd switch, checkbox", () => {
    html('<button role="switch" id="a"></button><button class="ant-switch" id="b"></button><input type="checkbox" id="c">');
    for (const id of ["a", "b", "c"]) expect(classifyAnchor(document.getElementById(id))).toBe("switch");
  });

  it("icon: no visible text or only a count, in any language", () => {
    html('<button id="a"><svg></svg></button><button id="b"><svg></svg> 1.2k</button><button id="c">Gefällt mir</button>');
    expect(classifyAnchor(document.getElementById("a"))).toBe("icon");
    expect(classifyAnchor(document.getElementById("b"))).toBe("icon");
    expect(classifyAnchor(document.getElementById("c"))).toBe("generic");
  });

  it("confirm: anything inside the sweet-alert or antd confirm/popconfirm", () => {
    html('<div role="alertdialog"><button data-lga-btn id="a">Delete</button></div><div class="ant-popconfirm"><button id="b">OK</button></div>');
    expect(classifyAnchor(document.getElementById("a"))).toBe("confirm");
    expect(classifyAnchor(document.getElementById("b"))).toBe("confirm");
  });
});

describe("isAnchorVisible", () => {
  beforeEach(() => {
    window.innerWidth = 1280;
    window.innerHeight = 800;
  });

  it("true for an on-screen element", () => {
    html('<button id="b">Save</button>');
    const b = rect(document.getElementById("b"), { top: 100, left: 100, width: 80, height: 32 });
    expect(isAnchorVisible(b)).toBe(true);
  });

  it("false when detached, zero-size or off-screen", () => {
    html('<button id="b">Save</button>');
    const b = document.getElementById("b");
    rect(b, { top: 0, left: 0, width: 0, height: 0 });
    expect(isAnchorVisible(b)).toBe(false);
    rect(b, { top: 900, left: 10, width: 80, height: 32 });
    expect(isAnchorVisible(b)).toBe(false);
    const detached = rect(document.createElement("button"), { top: 10, left: 10, width: 80, height: 32 });
    expect(isAnchorVisible(detached)).toBe(false);
  });

  it("false while its antd modal animates out", () => {
    html('<div class="ant-modal ant-zoom-leave ant-zoom-leave-active"><button id="b">Save</button></div>');
    const b = rect(document.getElementById("b"), { top: 100, left: 100, width: 80, height: 32 });
    expect(isAnchorVisible(b)).toBe(false);
  });

  it("false when another layer covers it, true when the hit passes to an ancestor", () => {
    html('<div id="wrap"><button id="b">Save</button></div><div id="mask"></div>');
    const b = rect(document.getElementById("b"), { top: 100, left: 100, width: 80, height: 32 });
    const orig = document.elementFromPoint;
    document.elementFromPoint = () => document.getElementById("mask");
    expect(isAnchorVisible(b)).toBe(false);
    document.elementFromPoint = () => document.getElementById("wrap");
    expect(isAnchorVisible(b)).toBe(true);
    document.elementFromPoint = orig;
  });
});

describe("isInlineText", () => {
  it("accepts short single-line strings only", () => {
    expect(isInlineText("Saved")).toBe(true);
    expect(isInlineText("x".repeat(120))).toBe(true);
    expect(isInlineText("x".repeat(121))).toBe(false);
    expect(isInlineText("line one\nline two")).toBe(false);
    expect(isInlineText("")).toBe(false);
    expect(isInlineText({})).toBe(false);
  });
});

describe("computePlacement", () => {
  const r = { top: 100, left: 200, width: 100, height: 40, right: 300, bottom: 140 };

  it("below and centred by default", () => {
    expect(computePlacement(r, 120, 28, "below", 1280, 800)).toEqual({ top: 146, left: 190, side: "below" });
  });

  it("flips above when there is no room below", () => {
    const low = { ...r, top: 760, bottom: 800 };
    expect(computePlacement(low, 120, 28, "below", 1280, 800).side).toBe("above");
  });

  it("right of a switch when it fits, else below", () => {
    expect(computePlacement(r, 80, 24, "right", 1280, 800).side).toBe("right");
    const edge = { ...r, left: 1200, right: 1250 };
    expect(computePlacement(edge, 80, 24, "right", 1280, 800).side).toBe("below");
  });

  it("clamps to the viewport edge", () => {
    const leftEdge = { ...r, left: 0, right: 20, width: 20 };
    expect(computePlacement(leftEdge, 200, 28, "below", 1280, 800).left).toBe(12);
  });
});

describe("durations", () => {
  it("pop and snackbar lifetimes", () => {
    expect(inlineDuration("success", "submit")).toBe(1600);
    expect(inlineDuration("success", "submit", "morph", "both")).toBe(1600); // design resetAfter
    expect(inlineDuration("success", "submit", "morph", "swap")).toBe(1600);
    expect(inlineDuration("success", "submit", "morph", "icon")).toBe(1300);
    expect(inlineDuration("error", "submit", "morph", "text")).toBe(2200); // design error reset
    expect(inlineDuration("success", "switch")).toBe(1200);
    expect(inlineDuration("error", "submit")).toBe(4000);
    expect(snackbarDuration("success")).toBe(1800);
    expect(snackbarDuration("info")).toBe(3000);
    expect(snackbarDuration("error")).toBe(4000);
  });
});

describe("interaction tracker", () => {
  it("records taps, submit buttons, expires after the window, and uninstalls", () => {
    html('<form id="f"><button type="submit" id="s">Save</button></form><button id="b">Copy</button><p id="p">x</p>');
    const off = installInteractionTracker();

    document.getElementById("b").dispatchEvent(new Event("pointerdown", { bubbles: true }));
    expect(recentInteraction().el.id).toBe("b");

    // a tap on plain content clears the previous control
    document.getElementById("p").dispatchEvent(new Event("pointerdown", { bubbles: true }));
    expect(recentInteraction()).toBeNull();

    document.getElementById("f").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    expect(recentInteraction()).toMatchObject({ hint: "submit" });
    expect(recentInteraction().el.id).toBe("s");

    __resetInteraction({ el: document.getElementById("b"), t: performance.now() - ANCHOR_WINDOW_MS - 1 });
    expect(recentInteraction()).toBeNull();

    off();
    document.getElementById("b").dispatchEvent(new Event("pointerdown", { bubbles: true }));
    expect(recentInteraction()).toBeNull();
  });
});

describe("shortLabel", () => {
  it("drops a trailing 'successfully' and end punctuation, leaves other text alone", () => {
    expect(shortLabel("Post created successfully")).toBe("Post created");
    expect(shortLabel("Profile updated successfully.")).toBe("Profile updated");
    expect(shortLabel("Gift sent!")).toBe("Gift sent");
    expect(shortLabel("Payment successful!")).toBe("Payment successful");
    expect(shortLabel("Beitrag erstellt")).toBe("Beitrag erstellt");
  });
});

describe("displayFor", () => {
  const sized = (el, w, h) => rect(el, { top: 10, left: 10, width: w, height: h });
  it("success and errors on a text button morph; warnings, icons and switches stay inline", () => {
    html('<button id="t">Save</button><button id="i" aria-label="Like"><svg></svg></button><button role="switch" id="s"></button><div role="alertdialog"><button id="c">OK</button></div>');
    const t = sized(document.getElementById("t"), 120, 36);
    sized(document.getElementById("i"), 32, 32);
    sized(document.getElementById("s"), 40, 22);
    expect(displayFor("success", t).mode).toBe("morph");
    expect(displayFor("error", t).mode).toBe("morph");
    expect(displayFor("warning", t).mode).toBe("pop");
    expect(displayFor("success", document.getElementById("i")).mode).toBe("pop");
    expect(displayFor("success", document.getElementById("s")).mode).toBe("side");
    sized(document.getElementById("c"), 120, 36);
    expect(displayFor("success", document.getElementById("c")).mode).toBe("morph"); // confirm buttons too (dialog is held)
  });
  it("very tall or tiny text elements pop instead of morphing", () => {
    html('<button id="big">Watch the full stream now</button><button id="tiny">OK</button>');
    expect(displayFor("success", sized(document.getElementById("big"), 300, 200)).mode).toBe("pop");
    expect(displayFor("success", sized(document.getElementById("tiny"), 40, 16)).mode).toBe("pop");
  });
});

describe("snapshotDialog", () => {
  it("copies a portal-rendered dialog with live values, finds the twin, strips ids/names", () => {
    document.body.innerHTML = '<div id="root"><button id="page">x</button></div><div id="portal"><div class="ant-modal-wrap"><div role="dialog"><input name="title" id="t"><button id="post">Post</button></div></div></div>';
    document.getElementById("t").value = "typed";
    const post = rect(document.getElementById("post"), { top: 10, left: 10, width: 80, height: 32 });
    rect(document.querySelector("[role=dialog]"), { top: 0, left: 0, width: 300, height: 200 });
    const snap = snapshotDialog(post);
    expect(snap).not.toBeNull();
    expect(snap.twin.textContent).toBe("Post");
    expect(snap.clone.querySelector("input").value).toBe("typed");
    expect(snap.clone.querySelector("[id],[name]")).toBeNull();
    expect(snap.clone.isConnected).toBe(false); // detached until needed
    expect(isDialogClosing(snap)).toBe(false);
    document.getElementById("portal").remove();
    expect(isDialogClosing(snap)).toBe(true);
  });

  it("keeps scroll positions when the copy is put on screen", () => {
    document.body.innerHTML = '<div id="root"></div><div id="portal"><div class="ant-modal-wrap" id="wrap"><div role="dialog"><div style="height:2000px"></div><button id="save">Save</button></div></div></div>';
    const wrap = document.getElementById("wrap");
    wrap.scrollTop = 640;
    const save = rect(document.getElementById("save"), { top: 500, left: 10, width: 80, height: 32 });
    rect(document.querySelector("[role=dialog]"), { top: 0, left: 0, width: 300, height: 600 });
    const snap = snapshotDialog(save);
    expect(snap.clone.firstElementChild.scrollTop).toBe(0); // plain cloneNode loses it
    snap.insert();
    expect(snap.clone.isConnected).toBe(true);
    expect(snap.clone.firstElementChild.scrollTop).toBe(640);
  });

  it("never copies the app root or a control outside a dialog", () => {
    document.body.innerHTML = '<div id="root"><div role="dialog"><button id="inline">Save</button></div><button id="plain">Save</button></div>';
    expect(snapshotDialog(document.getElementById("inline"))).toBeNull();
    expect(snapshotDialog(document.getElementById("plain"))).toBeNull();
  });
});

describe("attribution", () => {
  it("a message fired inside the tap's own handler is hard-linked to it", () => {
    html('<button id="b">Save</button>');
    const off = installInteractionTracker();
    const b = document.getElementById("b");
    let inside = null;
    b.addEventListener("click", () => { inside = attributedTap(); });
    b.dispatchEvent(new Event("pointerdown", { bubbles: true }));
    b.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(inside && inside.el).toBe(b);
    expect(attributedTap()).toBeNull(); // outside any event: no hard link
    off();
  });


  it("choosing a file in a hidden input records the visible upload area, with the longer file window", () => {
    html('<div class="ant-upload" id="zone"><input type="file" id="f" style="display:none"><p>Drop a video</p></div>');
    const off = installInteractionTracker();
    rect(document.getElementById("zone"), { top: 10, left: 10, width: 400, height: 160 });
    const input = document.getElementById("f");
    Object.defineProperty(input, "files", { value: [new File(["x"], "a.mp4")] });
    input.dispatchEvent(new Event("change", { bubbles: true }));
    expect(recentInteraction().el.id).toBe("zone");
    expect(recentInteraction().hint).toBe("file");
    off();
  });

});

describe("labelCandidates", () => {
  it("most specific first, shorter fallbacks after, never generic", () => {
    expect(labelCandidates("Withdrawal cancelled. $95.00 is back in your balance ($5.00 cancellation fee)")).toEqual(["Withdrawal cancelled", "Cancelled"]);
    expect(labelCandidates("Gift sent · −40 credits")).toEqual(["Gift sent · −40 credits", "Gift sent", "Sent"]);
    expect(labelCandidates("Shared to your feed")).toEqual(["Shared to your feed", "Shared"]);
    expect(labelCandidates("Your video is being reviewed")).toEqual(["Your video is being reviewed", "Video is being reviewed"]);
    expect(labelCandidates("Posted")).toEqual(["Posted"]);
    expect(labelCandidates("Call pricing settings saved.")).toEqual(["Call pricing settings saved", "Settings saved", "Saved"]);
  });
});

describe("labelCandidates: verb alone for narrow buttons", () => {
  it("ends with the specific verb, never a vague one", () => {
    expect(labelCandidates("Extension approved — new due date 30 Oct 2026").slice(-1)).toEqual(["Approved"]);
    expect(labelCandidates("Order declined — the fan has been refunded.")).toContain("Declined");
    expect(labelCandidates("Cover set")).not.toContain("Set");
    expect(labelCandidates("Your video is being reviewed")).not.toContain("Reviewed"); // not finished yet
    expect(labelCandidates("Posted")).toEqual(["Posted"]);
  });
});

describe("errorLabelCandidates", () => {
  it("what went wrong in a few words, then a common word", () => {
    expect(errorLabelCandidates("No connection. Check your internet.")).toEqual(["No connection", "Failed"]);
    expect(errorLabelCandidates("Couldn't send the tip. Try again.")).toEqual(["Couldn't send the tip", "Couldn't send", "Failed"]);
    expect(errorLabelCandidates("Not enough credits. Top up to continue.", "Échec")).toEqual(["Not enough credits", "Échec"]);
  });
});

describe("doneLabelFor", () => {
  it("turns the tapped button into a specific past-tense result", () => {
    expect(doneLabelFor("Save changes")).toBe("Changes saved");
    expect(doneLabelFor("Use as cover")).toBe("Cover set");
    expect(doneLabelFor("Save position")).toBe("Position saved");
    expect(doneLabelFor("Post")).toBe("Posted");
    expect(doneLabelFor("Send 40 credits")).toBe("Credits sent");
    expect(doneLabelFor("Update the profile…")).toBe("Profile updated");
    expect(doneLabelFor("Yes, Delete")).toBe("Deleted");
    expect(doneLabelFor("✅ Accept")).toBe("Accepted");
    expect(doneLabelFor("Upload & deliver")).toBe("Uploaded");
    expect(doneLabelFor("Decline and refund")).toBe("Declined");
    expect(doneLabelFor("Confirm & continue")).toBe("Confirmed");
    expect(doneLabelFor("Request to join")).toBe("Requested");
    expect(doneLabelFor("End call")).toBe("Call ended");
  });
  it("says nothing rather than something generic", () => {
    expect(doneLabelFor("")).toBe("");
    expect(doneLabelFor("Close")).toBe("");
    expect(doneLabelFor("OK")).toBe("");
  });
});

describe("dialog actions are pictured at tap time", () => {
  it("an action button in a dialog gets a copy; close / cancel / icon-only buttons do not", () => {
    document.body.innerHTML = '<div id="root"><button id="page">Save</button></div>'
      + '<div id="portal"><div role="dialog"><button id="x" aria-label="Close">×</button><button id="play" aria-label="Play"></button>'
      + '<div class="ant-modal-footer"><button class="ant-btn ant-btn-default" id="abbr">Abbrechen</button><button class="ant-btn ant-btn-primary" id="ok">Speichern</button></div>'
      + '<button id="cancel">Cancel</button><button id="approve">Approve</button></div></div>';
    setDialogCloseHandler(() => {});
    const off = installInteractionTracker();
    const tapOn = (id) => { document.getElementById(id).dispatchEvent(new Event("pointerdown", { bubbles: true })); return recentInteraction(); };
    expect(tapOn("approve").snap).toBeTruthy();
    expect(tapOn("approve").snap.twin.textContent).toBe("Approve");
    expect(tapOn("ok").snap).toBeTruthy(); // primary in any language
    expect(tapOn("abbr").snap).toBeUndefined(); // the plain button beside the primary = Cancel
    expect(tapOn("cancel").snap).toBeUndefined();
    expect(tapOn("x").snap).toBeUndefined();
    expect(tapOn("play").snap).toBeUndefined(); // icon-only (player controls)
    expect(tapOn("page").snap).toBeUndefined(); // not in a dialog
    off();
    setDialogCloseHandler(null);
  });

  it("\"Abbrechen\" just closes, \"Done\" may save (a text story); a copy taken mid-entrance drops the motion classes", () => {
    document.body.innerHTML = '<div id="root"></div><div id="portal"><div class="ant-modal-root"><div class="ant-modal-wrap"><div class="ant-modal ant-zoom-enter ant-zoom-enter-active" role="dialog"><button id="done">Done</button><button id="abbr">Abbrechen</button><button id="go">Weiter</button></div></div></div></div>';
    setDialogCloseHandler(() => {});
    const off = installInteractionTracker();
    const tapOn = (id) => { document.getElementById(id).dispatchEvent(new Event("pointerdown", { bubbles: true })); return recentInteraction(); };
    expect(tapOn("done").snap).toBeTruthy(); // held only if it really saves something
    expect(tapOn("done").dismiss).toBeUndefined();
    expect(tapOn("abbr").snap).toBeUndefined();
    const snap = tapOn("go").snap;
    expect(snap).toBeTruthy();
    expect(snap.clone.querySelector('[class*="-enter"]')).toBeNull();
    expect(snap.clone.querySelector(".ant-modal")).not.toBeNull();
    off();
    setDialogCloseHandler(null);
  });
});

describe("isDialogClosing", () => {
  it("fading OUT closes; fading IN (the entrance animation) does not", () => {
    document.body.innerHTML = '<div id="root"></div><div id="portal"><div role="dialog" id="d"><button id="b">Save</button></div></div>';
    rect(document.getElementById("d"), { top: 0, left: 0, width: 300, height: 200 });
    const snap = snapshotDialog(document.getElementById("b"));
    const portal = document.getElementById("portal");
    portal.style.opacity = "0.3"; // entrance in progress
    expect(isDialogClosing(snap)).toBe(false);
    portal.style.opacity = "0.7";
    expect(isDialogClosing(snap)).toBe(false); // rising
    portal.style.opacity = "1";
    expect(isDialogClosing(snap)).toBe(false);
    portal.style.opacity = "0.8";
    expect(isDialogClosing(snap)).toBe(true); // falling
  });
});

describe("moduleSaidSomething", () => {
  it("sees a new line of text in the control's form, ignores the button's own label change", () => {
    document.body.innerHTML = '<form id="f"><label>Email</label><input><button id="b">Sending…</button></form>';
    const btn = document.getElementById("b");
    const before = ["email", "sending"]; // words in the form when the request went out
    btn.textContent = "Send reset link"; // busy label restored after the failure
    expect(moduleSaidSomething(btn, before, "Send reset link")).toBe(false);
    const err = document.createElement("p");
    err.textContent = "Something Went Wrong";
    document.getElementById("f").insertBefore(err, btn);
    expect(moduleSaidSomething(btn, before, "Send reset link")).toBe(true);
    document.body.innerHTML = '<button id="lone">Like</button>';
    expect(moduleSaidSomething(document.getElementById("lone"), before, "Like")).toBe(false); // no form / dialog
  });
});

describe("isTrackedRequest: only the app's own API speaks for a tap", () => {
  it("page site and configured API yes; analytics, socket.io and non-http no", () => {
    const here = window.location;
    expect(isTrackedRequest("/api/user/update_profile")).toBe(true);
    expect(isTrackedRequest(`${here.protocol}//${here.hostname}:8000/api/user/x`)).toBe(true); // same host, other port
    expect(isTrackedRequest("https://x.clarity.ms/collect")).toBe(false);
    expect(isTrackedRequest("https://www.google-analytics.com/g/collect")).toBe(false);
    expect(isTrackedRequest("/socket.io/?EIO=4&transport=polling")).toBe(false);
    expect(isTrackedRequest("blob:whatever")).toBe(false);
    expect(isTrackedRequest("https://api.livegemini.dev/api/user/x")).toBe(false);
    setTrackedOrigins(["https://api.livegemini.dev"]);
    expect(isTrackedRequest("https://api.livegemini.dev/api/user/x")).toBe(true);
    setTrackedOrigins([]);
  });
});

describe("a dialog the user closes is never held", () => {
  it("Close / Discard / Cancel upload / Escape count as the user's close; a later scroll-tap only right before", () => {
    document.body.innerHTML = '<div id="root"></div><div id="portal"><div role="dialog">'
      + '<button id="save">Save changes</button><button id="x" aria-label="Close"><svg></svg></button>'
      + '<button id="disc">Discard upload</button><button id="cu">Cancel upload</button><button id="co">Cancel order</button>'
      + '<button id="yd">Yes, discard</button><p id="txt">text</p></div></div>';
    setDialogCloseHandler(() => {});
    const off = installInteractionTracker();
    const down = (id) => document.getElementById(id).dispatchEvent(new Event("pointerdown", { bubbles: true }));
    down("save");
    const owner = recentInteraction();
    expect(owner.snap).toBeTruthy();
    expect(closedByUser(owner.t)).toBe(false); // the save itself is not a close
    down("x");
    expect(closedByUser(owner.t)).toBe(true);
    for (const id of ["disc", "cu", "yd"]) {
      down("save");
      const o = recentInteraction();
      down(id);
      expect(closedByUser(o.t)).toBe(true);
      expect(recentInteraction().snap).toBeUndefined(); // never pictured itself
    }
    down("co");
    expect(recentInteraction().snap).toBeTruthy(); // "Cancel order" is an action
    expect(recentInteraction().dismiss).toBeUndefined();
    down("x");
    expect(recentInteraction().dismiss).toBe(true); // the close tap itself never holds its dialog
    // icon-only X without a label: an X icon or a close-type class is enough
    const dlg = document.querySelector("[role=dialog]");
    dlg.insertAdjacentHTML("beforeend", '<button id="ix"><svg class="lucide lucide-x"></svg></button><button id="cx" class="lgw-close"><svg></svg></button><button id="heart"><svg class="lucide lucide-heart"></svg></button>');
    down("ix");
    expect(recentInteraction().dismiss).toBe(true);
    down("cx");
    expect(recentInteraction().dismiss).toBe(true);
    down("heart");
    expect(recentInteraction().dismiss).toBeUndefined();
    down("save");
    const o2 = recentInteraction();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    expect(closedByUser(o2.t)).toBe(true);
    down("save");
    const o3 = recentInteraction();
    down("txt"); // a tap inside the dialog (scrolling, selecting text)
    expect(closedByUser(o3.t)).toBe(true); // …right before the close: still the user's
    expect(closedByUser(o3.t, performance.now() + 5000)).toBe(false); // the app closing it much later is not
    expect(closedByUser(o3.t, performance.now() + 5000, "http://elsewhere.test/other-page")).toBe(true); // left the page
    off();
    setDialogCloseHandler(null);
  });
});

describe("isWriteRequest: reads done with POST do not count as saves", () => {
  it("lists, searches, counts and checks are reads; saves, updates and actions are writes", () => {
    for (const u of ["/api/user/vod_videos_owner_list", "/api/user/users_search", "/api/user/bell_notifications_count",
      "/api/user/get_billing_shipping", "/api/user/subscription_promo_code/list", "/api/user/profile/check_availability",
      "/api/user/media_history", "/api/user/chats/unread-count"]) expect(isWriteRequest("POST", u)).toBe(false);
    for (const u of ["/api/user/update_profile", "/api/user/subscriber_perk_tier/list_save", "/api/user/streaming_preview/update",
      "/api/user/feed/create", "/api/user/media/multipart/sign-parts", "/api/user/vod_videos_owner_publish_status",
      "/api/user/my-delivery-countries", "/api/user/users_follow"]) expect(isWriteRequest("POST", u)).toBe(true);
    expect(isWriteRequest("GET", "/api/user/update_profile")).toBe(false);
    expect(isWriteRequest("DELETE", "/api/user/feed/post/3")).toBe(true);
  });
});

describe("menu items: the result belongs to the button that opened the menu", () => {
  it("antd-style item (not an anchor) uses the opener; a custom item keeps itself and remembers the opener", () => {
    document.body.innerHTML = '<div id="root"><button id="more" aria-label="More">…</button><button id="share">Share</button></div>'
      + '<div id="dd" style="position:absolute;top:10px;left:10px"><ul role="menu"><li role="menuitem" id="pin">Pin post</li></ul></div>'
      + '<div id="cm" class="post-menu" style="position:absolute;top:10px;left:10px"><button id="hide">Hide post</button></div>';
    for (const id of ["dd", "cm"]) rect(document.getElementById(id), { top: 10, left: 10, width: 180, height: 90 });
    const off = installInteractionTracker();
    const down = (id) => document.getElementById(id).dispatchEvent(new Event("pointerdown", { bubbles: true }));
    down("more");
    down("pin");
    expect(recentInteraction().el.id).toBe("more");
    down("share");
    down("hide");
    expect(recentInteraction().el.id).toBe("hide");
    expect(recentInteraction().opener.id).toBe("share");
    off();
  });

  it("vague errors fall back to the common word", () => {
    expect(errorLabelCandidates("Couldn't do that. Try again.")).toEqual(["Couldn't do that", "Failed"]);
  });
});

describe("inline messages beside tiny controls", () => {
  it("use the shortest specific words and stay inside the card", () => {
    expect(compactText("Pinned to your profile", "success")).toBe("Pinned");
    expect(compactText("Link copied", "success")).toBe("Link copied");
    expect(compactText("No connection. Check your internet.", "error")).toBe("No connection");
    const r = { left: 600, right: 630, top: 100, bottom: 130, width: 30, height: 30 };
    const box = { left: 170, right: 640, top: 80, bottom: 600 };
    const p = computePlacement(r, 120, 20, null, 1280, 820, "end", box);
    expect(p.left + 120).toBeLessThanOrEqual(632); // ends at the button's right edge, inside the card
    const wide = computePlacement(r, 300, 20, null, 1280, 820, "center", box);
    expect(wide.left + 300).toBeLessThanOrEqual(640 - 8); // never past the card's right edge
  });
});

describe("a removed card keeps its place", () => {
  const box = (el, r) => { el.getBoundingClientRect = () => ({ ...r, right: r.left + r.width, bottom: r.top + r.height, x: r.left, y: r.top }); };
  let grid;
  let cards;
  // jsdom has no layout: the inserted copy measures where the removed item was
  const realRect = Element.prototype.getBoundingClientRect;
  afterEach(() => { Element.prototype.getBoundingClientRect = realRect; });
  const copyLandsAt = (r) => {
    Element.prototype.getBoundingClientRect = function rect() {
      if (this.getAttribute && this.getAttribute("data-lg-feedback") === "ghost") return { ...r, right: r.left + r.width, bottom: r.top + r.height };
      return realRect.call(this);
    };
  };
  beforeEach(() => {
    document.body.innerHTML = "";
    grid = document.createElement("div");
    cards = [0, 1, 2].map((i) => {
      const c = document.createElement("article");
      c.innerHTML = `<p>post ${["alpha", "beta", "gamma"][i]}</p><button aria-label="Remove from favourites"></button>`;
      grid.appendChild(c);
      box(c, { top: 100, left: 20 + i * 420, width: 400, height: 120 });
      box(c.querySelector("button"), { top: 110, left: 380 + i * 420, width: 36, height: 36 });
      return c;
    });
    document.body.appendChild(grid);
  });

  it("finds the removed card and the list it sat in", () => {
    const trail = trailOf(cards[0].querySelector("button"));
    expect(removedItem(trail)).toBe(null); // still on the page
    grid.removeChild(cards[0]);
    const item = removedItem(trail);
    expect(item.el).toBe(cards[0]);
    expect(item.parent).toBe(grid);
    expect(item.next).toBe(cards[1]);
  });

  it("the next card sliding into the spot is not the removed control", () => {
    const btn = cards[0].querySelector("button");
    const trail = trailOf(btn);
    grid.removeChild(cards[0]);
    const slid = cards[1].querySelector("button");
    box(slid, { top: 110, left: 380, width: 36, height: 36 });
    document.elementFromPoint = () => slid;
    expect(replacementAt({ top: 110, left: 380, width: 36, height: 36 }, trail)).toBe(null);
    // a NEW row in the removed one's place (list refreshed) is the same item re-rendered
    const fresh = document.createElement("article");
    fresh.innerHTML = '<p>post alpha</p><button aria-label="Deliver clip"></button>';
    grid.insertBefore(fresh, cards[1]);
    const freshBtn = fresh.querySelector("button");
    box(freshBtn, { top: 110, left: 380, width: 36, height: 36 });
    document.elementFromPoint = () => freshBtn;
    expect(replacementAt({ top: 110, left: 380, width: 36, height: 36 }, trail)).toBe(freshBtn);
    delete document.elementFromPoint;
  });

  it("a list that redraws EVERY row after a removal: the row now in the spot is another item", () => {
    const btn = cards[0].querySelector("button");
    const trail = trailOf(btn);
    // rows keyed by position: React drops all three and draws two new ones
    grid.replaceChildren(...[1, 2].map((i) => {
      const c = document.createElement("article");
      c.innerHTML = `<p>post ${i}</p><button aria-label="Remove from favourites"></button>`;
      return c;
    }));
    const item = removedItem(trail);
    expect(listShrank(item)).toBe(true);
    const now = grid.firstElementChild.querySelector("button");
    box(now, { top: 110, left: 380, width: 36, height: 36 });
    document.elementFromPoint = () => now;
    expect(replacementAt({ top: 110, left: 380, width: 36, height: 36 }, trail)).toBe(null);
    delete document.elementFromPoint;
    // the copy goes back at the removed row's old position
    copyLandsAt(item.rect);
    const ph = placeholderFor(item);
    expect(grid.firstElementChild).toBe(ph);
  });

  it("a form drawn again as its row (same number of items) is not a removal", () => {
    const trail = trailOf(cards[1].querySelector("button"));
    const row = document.createElement("article");
    row.textContent = "Saved row";
    grid.replaceChild(row, cards[1]);
    expect(listShrank(removedItem(trail))).toBe(false);
  });

  it("puts a dimmed, inert copy of the card where the card was", () => {
    const trail = trailOf(cards[1].querySelector("button"));
    grid.removeChild(cards[1]);
    copyLandsAt(removedItem(trail).rect);
    const ph = placeholderFor(removedItem(trail));
    expect(ph).not.toBe(cards[1]);
    expect(ph.tagName).toBe("ARTICLE");
    expect(ph.textContent).toContain("post beta");
    expect(ph.parentNode).toBe(grid);
    expect(ph.nextSibling).toBe(cards[2]);
    expect(ph.getAttribute("data-lg-feedback")).toBe("ghost");
    expect(ph.hasAttribute("inert")).toBe(true);
    expect(ph.style.pointerEvents).toBe("none");
    expect(ph.style.minHeight).toBe("120px");
  });

  it("no copy when it would land somewhere else (the list was swapped for a loader)", () => {
    const trail = trailOf(cards[1].querySelector("button"));
    grid.removeChild(cards[1]);
    copyLandsAt({ top: 905, left: 20, width: 400, height: 120 });
    expect(placeholderFor(removedItem(trail))).toBe(null);
    expect(grid.querySelector('[data-lg-feedback="ghost"]')).toBe(null);
  });

  it("no copy of a one-off block (a page section, a form) — only of a list item", () => {
    document.body.innerHTML = '<main><header>Requests</header><section class="sec-padding"><button>Approve</button></section><footer>f</footer></main>';
    const sec = document.querySelector("section");
    box(sec, { top: 100, left: 0, width: 600, height: 300 });
    const trail = trailOf(sec.querySelector("button"));
    sec.remove();
    copyLandsAt({ top: 100, left: 0, width: 600, height: 300 });
    expect(placeholderFor(removedItem(trail))).toBe(null);
  });

  it("a different order now in the spot is not the removed order drawn again", () => {
    document.body.innerHTML = '<ul id="orders"><li class="order">Birthday clip 25 credits <button>Accept</button></li><li class="order">Shoutout 10 credits <button>Accept</button></li></ul>';
    const list = document.getElementById("orders");
    const first = list.firstElementChild;
    const trail = trailOf(first.querySelector("button"));
    // refreshed list, keyed by position, still two rows: a new order joined the bottom
    list.innerHTML = '<li class="order">Shoutout 10 credits <button>Accept</button></li><li class="order">Dance 12 credits <button>Accept</button></li>';
    const now = list.firstElementChild.querySelector("button");
    box(now, { top: 10, left: 300, width: 80, height: 32 });
    document.elementFromPoint = () => now;
    expect(replacementAt({ top: 10, left: 300, width: 80, height: 32 }, trail)).toBe(null);
    // the same order drawn again with its next step is a replacement
    list.innerHTML = '<li class="order">Birthday clip 25 credits <button>Deliver clip</button></li><li class="order">Shoutout 10 credits <button>Accept</button></li>';
    const again = list.firstElementChild.querySelector("button");
    box(again, { top: 10, left: 300, width: 80, height: 32 });
    document.elementFromPoint = () => again;
    expect(replacementAt({ top: 10, left: 300, width: 80, height: 32 }, trail)).toBe(again);
    delete document.elementFromPoint;
  });

  it("knows WHICH removed card came back: Undo on the first never ends the second's message", () => {
    const t0 = trailOf(cards[0].querySelector("button"));
    const t1 = trailOf(cards[1].querySelector("button"));
    grid.removeChild(cards[0]);
    grid.removeChild(cards[1]);
    const first = removedItem(t0);
    const second = removedItem(t1);
    // Undo on the first: React draws that card again (a new element), here at the end
    const again = document.createElement("article");
    again.innerHTML = '<p>post alpha</p><button aria-label="Remove from favourites"></button>';
    grid.appendChild(again);
    expect(itemBack(first)).toBe(again);
    expect(itemBack(second)).toBe(null);
    // an error about the first goes to ITS heart, wherever the card now sits
    expect(controlIn(again, t0, first)).toBe(again.querySelector("button"));
  });

  it("a table row keeps its place as a row", () => {
    document.body.innerHTML = "<table><tbody><tr id=r1><td>a</td><td><button>Approve</button></td></tr><tr><td>b</td><td>c</td></tr></tbody></table>";
    const row = document.querySelector("tr");
    box(row, { top: 50, left: 0, width: 600, height: 48 });
    const trail = trailOf(row.querySelector("button"));
    const tbody = row.parentNode;
    tbody.removeChild(row);
    copyLandsAt(removedItem(trail).rect);
    const ph = placeholderFor(removedItem(trail));
    expect(ph.tagName).toBe("TR");
    expect(ph.cells.length).toBe(2);
    expect(ph.id).toBe(""); // no duplicate ids
    expect(tbody.firstChild).toBe(ph);
  });
});

describe("buttons in a panel that opens out of the header nav", () => {
  it("Mark all read in the bell sheet (full width on a phone) is an action", () => {
    document.body.innerHTML = '<nav><ul><li><div id="sheet" style="position:fixed;top:60px;left:0;right:0"><button id="mark">Mark all read</button></div></li></ul></nav>';
    document.getElementById("sheet").getBoundingClientRect = () => ({ top: 60, left: 0, width: 390, height: 500, right: 390, bottom: 560 });
    expect(pickAnchor(document.getElementById("mark"))).toBe(document.getElementById("mark"));
  });
  it("a plain header button stays navigation", () => {
    document.body.innerHTML = '<nav><button id="menu">Menu</button></nav>';
    expect(pickAnchor(document.getElementById("menu"))).toBe(null);
  });
});

describe("buttons inside a card that is a link", () => {
  it("Follow on a creator card link is an action of its own", () => {
    document.body.innerHTML = '<a href="/profile/ava" id="card"><img alt=""><span>Ava Ross</span><span>12 videos</span><button id="f">Follow</button></a>';
    expect(pickAnchor(document.getElementById("f"))).toBe(document.getElementById("f"));
  });
});

describe("buttonGroupOf", () => {
  const box = (el, r) => { el.getBoundingClientRect = () => ({ ...r, right: r.left + r.width, bottom: r.top + r.height }); };
  it("a cart icon fused with its price into one drawn pill → the pill", () => {
    document.body.innerHTML = '<span id="pill" style="display:flex;border:1px solid pink"><button id="p"><b>0.00</b> cr</button><button id="c" aria-label="Add to basket"><svg></svg></button></span>';
    const pill = document.getElementById("pill");
    box(pill, { top: 0, left: 0, width: 110, height: 28 });
    box(document.getElementById("p"), { top: 0, left: 0, width: 80, height: 26 });
    box(document.getElementById("c"), { top: 0, left: 80, width: 28, height: 26 });
    expect(buttonGroupOf(document.getElementById("c"))).toBe(pill);
  });
  it("a plain row of icons (like, comment, share) is not a pill", () => {
    document.body.innerHTML = '<div id="row" style="display:flex"><button id="a"><svg></svg></button><button id="b"><svg></svg></button></div>';
    const row = document.getElementById("row");
    box(row, { top: 0, left: 0, width: 110, height: 28 });
    for (const id of ["a", "b"]) box(document.getElementById(id), { top: 0, left: 0, width: 28, height: 26 });
    expect(buttonGroupOf(document.getElementById("a"))).toBe(null);
  });
});

describe("short errors beside tiny controls", () => {
  it("says what is wrong in a few words", () => {
    expect(errorLabelCandidates("This item is not available for purchase.")).toEqual([
      "This item is not available for purchase", "Not available for purchase", "Not available", "Failed",
    ]);
    expect(compactText("This item is not available for purchase.", "error")).toBe("Not available");
    expect(compactText("Something went wrong while processing your request", "error")).toBe("Something went wrong while processing your request");
  });
});

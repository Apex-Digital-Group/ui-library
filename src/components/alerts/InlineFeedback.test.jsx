import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor, act, cleanup } from "@testing-library/react";
import { AlertProvider } from "./AlertProvider";
import { alertStore } from "./alertStore";
import { toast as compatToast, message as compatMessage } from "./compat";
import { __resetInteraction } from "./feedbackAnchor";

const rect = (el, r) => {
  el.getBoundingClientRect = () => ({ x: r.left, y: r.top, width: r.width, height: r.height, top: r.top, left: r.left, right: r.left + r.width, bottom: r.top + r.height, toJSON() {} });
  return el;
};

const hosts = [];
function addButton(markup = '<button type="button" id="btn">Copy link</button>') {
  const host = document.createElement("div");
  hosts.push(host);
  host.innerHTML = markup;
  document.body.appendChild(host);
  const btn = host.querySelector("button");
  rect(btn, { top: 100, left: 100, width: 100, height: 36 });
  return btn;
}


/** jsdom has no layout: give buttons and dialogs (also inside the held copy) a real size. */
function withLayout() {
  return vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function box() {
    const r = this.tagName === "BUTTON" ? { top: 300, left: 500, width: 220, height: 40 }
      : this.matches && this.matches("[role=dialog],[role=alertdialog],.ant-modal-content") ? { top: 200, left: 400, width: 420, height: 300 }
      : { top: 0, left: 0, width: 0, height: 0 };
    return { x: r.left, y: r.top, ...r, right: r.left + r.width, bottom: r.top + r.height, toJSON() {} };
  });
}

const tap = (el) => el.dispatchEvent(new Event("pointerdown", { bubbles: true }));
const inSnackbar = (text) => screen.getByText(text).closest('[data-lg-feedback="snackbar"]');
const inPop = (text) => screen.getByText(text).closest('[data-lg-feedback="pop"]');
const inMorph = (text) => screen.getByText(text).closest('[data-lg-feedback="morph"]');
const onControl = (text) => screen.getByText(text).closest('[data-lg-feedback="pop"],[data-lg-feedback="morph"]');
const announced = () => [...document.querySelectorAll('[data-lg-feedback="announcer"]')].map((n) => n.textContent).join("");

beforeEach(() => {
  window.innerWidth = 1280;
  window.innerHeight = 800;
});

afterEach(() => {
  act(() => alertStore.dismissAll());
  cleanup();
  for (const h of hosts.splice(0)) h.remove();
  __resetInteraction();
});

describe("AlertProvider default (card) mode", () => {
  it("is unchanged: no snackbar, no pop, ignores taps", async () => {
    render(<AlertProvider />);
    const btn = addButton();
    tap(btn);
    act(() => { compatToast.success("Link copied"); });
    const node = await screen.findByText("Link copied");
    expect(node.closest("[data-lg-feedback]")).toBeNull();
  });
});

describe("AlertProvider inline feedback", () => {
  it("snackbar appearance renders non-tap messages at the bottom", async () => {
    render(<AlertProvider appearance="snackbar" autoAnchor />);
    act(() => { compatToast.info("Your session expired"); });
    await screen.findByText("Your session expired");
    expect(inSnackbar("Your session expired")).not.toBeNull();
  });

  it("success on a text button turns the button itself into ✓ + label", async () => {
    render(<AlertProvider appearance="snackbar" autoAnchor />);
    const btn = addButton('<button type="button" style="font-size:14px">Copy link</button>');
    rect(btn, { top: 100, left: 100, width: 200, height: 36 });
    tap(btn);
    act(() => { compatToast.success("Link copied successfully"); });
    const morph = await waitFor(() => {
      const m = document.querySelector('[data-lg-feedback="morph"]');
      expect(m).not.toBeNull();
      return m;
    });
    expect(morph.getAttribute("role")).toBe("status");
    expect(morph.querySelector(".lgf-mlabel").textContent).toBe("Link copied"); // "successfully" trimmed
    expect(screen.queryByText("Link copied successfully").closest("[data-lg-feedback]")).toBe(morph); // full text for screen readers
    expect(document.querySelector('[data-lg-feedback="snackbar"]')).toBeNull();
  });

  it("the morph never grows past its button and never adds a caption; on a small button the words take the ✓'s place", async () => {
    render(<AlertProvider appearance="snackbar" autoAnchor />);
    const btn = addButton('<button type="button">Post</button>');
    rect(btn, { top: 100, left: 600, width: 70, height: 36 }); // jsdom: 7.5px per char → "Posted" = 45px (fits alone, not beside the ✓)
    tap(btn);
    act(() => { compatToast.success("Posted"); });
    const m = await waitFor(() => {
      const el = document.querySelector('[data-lg-feedback="morph"]');
      expect(el).not.toBeNull();
      return el;
    });
    await waitFor(() => expect(m.getAttribute("data-fit")).toBe("swap"));
    expect(m.querySelector(".lgf-mlabel").textContent).toBe("Posted");
    await waitFor(() => expect(m.style.width).toBe("70px")); // locked to the button
    expect(document.querySelector(".lgf-cap")).toBeNull();
    expect(document.body.textContent).not.toMatch(/\bDone\b/);
  });

  it("a long message is shortened to its most specific phrase that fits", async () => {
    render(<AlertProvider appearance="snackbar" autoAnchor />);
    const btn = addButton('<button type="button">Cancel withdrawal</button>');
    rect(btn, { top: 100, left: 300, width: 220, height: 44 });
    tap(btn);
    act(() => { compatToast.success("Withdrawal cancelled. $95.00 is back in your balance ($5.00 cancellation fee)"); });
    await waitFor(() => expect(document.querySelector('[data-lg-feedback="morph"] .lgf-mlabel')?.textContent).toBe("Withdrawal cancelled"));
    expect(document.querySelector('[data-lg-feedback="morph"]').getAttribute("data-fit")).toBe("both");
    // the full sentence is still there for screen readers
    expect(screen.getByText("Withdrawal cancelled. $95.00 is back in your balance ($5.00 cancellation fee)")).toBeTruthy();
  });

  it("antd message.* success on an icon button → small pop, not a morph", async () => {
    render(<AlertProvider appearance="snackbar" autoAnchor />);
    const btn = addButton('<button type="button" aria-label="Bookmark"><svg></svg></button>');
    tap(btn);
    act(() => { compatMessage.success("Post bookmarked"); });
    await screen.findByText("Post bookmarked");
    expect(inPop("Post bookmarked")).not.toBeNull();
    expect(document.querySelector('[data-lg-feedback="morph"]')).toBeNull();
  });

  it("when no phrase fits, the button shows the ✓ alone — never a caption or a bar", async () => {
    render(<AlertProvider appearance="snackbar" autoAnchor />);
    const btn = addButton();
    tap(btn);
    act(() => { compatToast.success("Subscription promotion settings are now active everywhere"); });
    await waitFor(() => expect(document.querySelector('[data-lg-feedback="morph"]')?.getAttribute("data-fit")).toBe("icon"));
    expect(document.querySelector('[data-lg-feedback="morph"] .lgf-mlabel')).toBeNull();
    expect(document.querySelector(".lgf-cap, [data-lg-feedback=\"snackbar\"]")).toBeNull();
  });

  it("an error on a text button stays INSIDE the button: red, ✕, its first words — nothing below it", async () => {
    render(<AlertProvider appearance="snackbar" autoAnchor />);
    const btn = addButton('<button type="button">Send tip</button>');
    rect(btn, { top: 100, left: 100, width: 220, height: 40 });
    tap(btn);
    act(() => { compatToast.error("Not enough credits. Top up to continue."); });
    const m = await waitFor(() => {
      const el = document.querySelector('[data-lg-feedback="morph"][data-variant="error"]');
      expect(el).not.toBeNull();
      return el;
    });
    await waitFor(() => expect(m.querySelector(".lgf-mlabel")?.textContent).toBe("Not enough credits"));
    expect(m.getAttribute("role")).toBe("alert");
    expect(screen.getByText("Not enough credits. Top up to continue.").closest('[data-lg-feedback="morph"]')).toBe(m); // full text for screen readers
    expect(document.querySelector('[data-lg-feedback="pop"]')).toBeNull();
  });

  it("a vague error whose words do not fit a small button shows the common short word", async () => {
    render(<AlertProvider appearance="snackbar" autoAnchor failedLabel="Fehlgeschlagen" />);
    const btn = addButton('<button type="button">Post</button>');
    rect(btn, { top: 100, left: 100, width: 130, height: 40 }); // jsdom 7.5px/char
    tap(btn);
    act(() => { compatToast.error("Something went wrong while refreshing your session right now"); });
    await waitFor(() => expect(document.querySelector('[data-lg-feedback="morph"] .lgf-mlabel')?.textContent).toBe("Fehlgeschlagen"));
  });

  it("an error with a reason the button cannot hold says the reason beside it, not just Failed", async () => {
    render(<AlertProvider appearance="snackbar" autoAnchor failedLabel="Fehlgeschlagen" />);
    const btn = addButton('<button type="button">Message</button>');
    rect(btn, { top: 100, left: 100, width: 130, height: 40 });
    tap(btn);
    act(() => { compatToast.error("Follow this creator to start a conversation."); });
    await waitFor(() => expect(document.querySelector('[data-lg-feedback="pop"]')).not.toBeNull());
    expect(document.querySelector('[data-lg-feedback="pop"]').textContent).toMatch(/Follow this creator/);
    expect(document.querySelector('[data-lg-feedback="morph"]')).toBeNull();
  });

  it("loading and sticky messages never anchor", async () => {
    render(<AlertProvider appearance="snackbar" autoAnchor />);
    const btn = addButton();
    tap(btn);
    act(() => { compatToast.loading("Uploading"); });
    await screen.findByText("Uploading");
    expect(inSnackbar("Uploading")).not.toBeNull();
  });

  it("explicit anchor:false forces the snackbar", async () => {
    render(<AlertProvider appearance="snackbar" autoAnchor />);
    const btn = addButton();
    tap(btn);
    act(() => { compatToast.success("Shared", { anchor: false }); });
    await screen.findByText("Shared");
    expect(inSnackbar("Shared")).not.toBeNull();
  });

  it("a dialog that closes on success is held, with the ✓ on its own button", async () => {
    const spy = withLayout();
    render(<AlertProvider appearance="snackbar" autoAnchor quietVariants={["success", "info"]} />);
    const portal = document.createElement("div");
    portal.innerHTML = '<div class="ant-modal-wrap"><div role="dialog" class="ant-modal"><div class="ant-modal-content"><textarea>hello</textarea><button type="button" id="post">Post</button></div></div></div>';
    document.body.appendChild(portal);
    hosts.push(portal);
    const post = portal.querySelector("#post");
    rect(post, { top: 300, left: 500, width: 220, height: 40 });
    tap(post);
    act(() => { compatToast.success("Post created successfully"); portal.remove(); });
    const held = await waitFor(() => {
      const h = document.querySelector('[data-lg-feedback="held"]');
      expect(h).not.toBeNull();
      return h;
    });
    hosts.push(held);
    expect(held.getAttribute("inert")).toBe("");
    expect(held.querySelector("[id]")).toBeNull(); // ids stripped
    expect(held.querySelector("textarea").value).toBe("hello");
    await waitFor(() => expect(document.querySelector('[data-lg-feedback="morph"] .lgf-mlabel')?.textContent).toBe("Post created"));
    expect(document.querySelector('[data-lg-feedback="snackbar"]')).toBeNull();
    spy.mockRestore();
  });

  it("confirm-dialog success: the sweet-alert is held with the ✓ on its button", async () => {
    const spy = withLayout();
    render(<AlertProvider appearance="snackbar" autoAnchor quietVariants={["success", "info"]} />);
    const portal = document.createElement("div");
    portal.innerHTML = '<div role="alertdialog"><button type="button" data-lga-btn>Delete</button></div>';
    document.body.appendChild(portal);
    hosts.push(portal);
    const del = portal.querySelector("button");
    rect(del, { top: 300, left: 500, width: 200, height: 40 });
    tap(del);
    act(() => { compatToast.success("Post deleted"); portal.remove(); });
    await waitFor(() => expect(document.querySelector('[data-lg-feedback="held"]')).not.toBeNull());
    hosts.push(document.querySelector('[data-lg-feedback="held"]'));
    await waitFor(() => expect(document.querySelector('[data-lg-feedback="morph"] .lgf-mlabel')?.textContent).toBe("Post deleted"));
    spy.mockRestore();
  });

  it("quiet variants with nothing to sit on are announced, never shown", async () => {
    render(<AlertProvider appearance="snackbar" autoAnchor quietVariants={["success", "info"]} />);
    act(() => { compatToast.success("Credits added to your wallet!"); compatToast.info("Redirecting to secure verification…"); });
    await waitFor(() => expect(announced()).toContain("Redirecting to secure verification…"));
    expect(document.querySelector('[data-lg-feedback="snackbar"]')).toBeNull();
    act(() => { compatToast.error("Payment could not be completed."); });
    await waitFor(() => expect(inSnackbar("Payment could not be completed.")).not.toBeNull()); // errors still visible
  });

  it("quiet success whose control vanished (not in a dialog) is announced, not a snackbar", async () => {
    render(<AlertProvider appearance="snackbar" autoAnchor quietVariants={["success", "info"]} />);
    const btn = addButton('<button type="button">Buy</button>');
    tap(btn);
    act(() => { compatToast.success("Purchased"); btn.parentElement.remove(); });
    await waitFor(() => expect(announced()).toContain("Purchased"));
    expect(document.querySelector('[data-lg-feedback="snackbar"]')).toBeNull();
  });

  it("moves to the snackbar when the anchor unmounts (modal closed on success)", async () => {
    render(<AlertProvider appearance="snackbar" autoAnchor />);
    const btn = addButton();
    tap(btn);
    act(() => { compatToast.error("Not enough credits"); });
    await screen.findByText("Not enough credits");
    expect(onControl("Not enough credits")).not.toBeNull();
    act(() => { btn.parentElement.remove(); });
    await waitFor(() => expect(inSnackbar("Not enough credits")).not.toBeNull());
  });

  it("one pop per control: a newer message replaces the older", async () => {
    render(<AlertProvider appearance="snackbar" autoAnchor />);
    const btn = addButton();
    tap(btn);
    act(() => { compatToast.success("Saved"); compatToast.error("Could not save"); });
    await screen.findByText("Could not save");
    expect(screen.queryByText("Saved")).toBeNull();
  });

  it("info and warning notices never auto-anchor", async () => {
    render(<AlertProvider appearance="snackbar" autoAnchor />);
    const btn = addButton();
    tap(btn);
    act(() => { compatToast.info("Upload started"); compatToast.warning("Low balance"); });
    await screen.findByText("Low balance");
    expect(inSnackbar("Upload started")).not.toBeNull();
    expect(inSnackbar("Low balance")).not.toBeNull();
  });

  it("a message fired from a background message event is not pinned to the last tap", async () => {
    render(<AlertProvider appearance="snackbar" autoAnchor />);
    const btn = addButton();
    tap(btn);
    const onMsg = () => compatToast.success("Private show accepted");
    window.addEventListener("message", onMsg);
    act(() => { window.dispatchEvent(new MessageEvent("message", { data: "x" })); });
    window.removeEventListener("message", onMsg);
    await screen.findByText("Private show accepted");
    expect(inSnackbar("Private show accepted")).not.toBeNull();
  });

  describe('fallback="nearest" (no global bar at all)', () => {
    const P = { appearance: "snackbar", autoAnchor: true, quietVariants: ["success", "info"], fallback: "nearest" };

    it("an error with no linked control sits under the last tapped control, never in a bar", async () => {
      render(<AlertProvider {...P} />);
      const btn = addButton('<button type="button">Go live</button>');
      tap(btn);
      __resetInteraction({ el: btn, t: performance.now() - 60000 }); // tapped a minute ago
      act(() => { compatToast.error("Your broadcast was ended in another tab."); });
      await screen.findByText("Your broadcast was ended in another tab.");
      expect(onControl("Your broadcast was ended in another tab.")).not.toBeNull();
      expect(document.querySelector('[data-lg-feedback="snackbar"]')).toBeNull();
    });

    it("with a dialog open, an unlinked error goes under the dialog's main button", async () => {
      const spy = withLayout();
      render(<AlertProvider {...P} />);
      const host = addButton('<div role="dialog"><button type="button">Cancel</button><button type="button" class="ant-btn ant-btn-primary" id="pay">Pay</button></div>');
      act(() => { compatToast.error("Payment could not be completed."); });
      await screen.findByText("Payment could not be completed.");
      const popEl = onControl("Payment could not be completed.");
      expect(popEl).not.toBeNull();
      expect(document.querySelector('[data-lg-feedback="snackbar"]')).toBeNull();
      void host;
      spy.mockRestore();
    });

    it("nothing sensible on screen → screen readers only", async () => {
      render(<AlertProvider {...P} />);
      act(() => { compatToast.error("Couldn't load your wallet. Try again."); });
      await waitFor(() => expect(announced()).toContain("Couldn't load your wallet. Try again."));
      expect(document.querySelector('[data-lg-feedback="snackbar"],[data-lg-feedback="pop"]')).toBeNull();
    });

    it("choosing a file links the next errors to the upload area (even seconds later)", async () => {
      render(<AlertProvider {...P} />);
      const host = document.createElement("div");
      host.innerHTML = '<div class="ant-upload ant-upload-drag"><input type="file" style="display:none"><p>Drop a video</p></div>';
      document.body.appendChild(host);
      hosts.push(host);
      const zone = host.querySelector(".ant-upload");
      rect(zone, { top: 100, left: 100, width: 500, height: 160 });
      const input = host.querySelector("input");
      Object.defineProperty(input, "files", { value: [new File(["x"], "clip.mp4", { type: "video/mp4" })] });
      act(() => { input.dispatchEvent(new Event("change", { bubbles: true })); });
      __resetInteraction({ el: zone, hint: "file", t: performance.now() - 5000 }); // video metadata read 5s later
      act(() => { compatToast.error("This video is 10s long. Videos must be at least 15 seconds."); });
      await screen.findByText("This video is 10s long. Videos must be at least 15 seconds.");
      expect(inPop("This video is 10s long. Videos must be at least 15 seconds.")).not.toBeNull();
    });

    it("a message with an action (Undo) stays where its removed control was", async () => {
      // jsdom has no layout: let the ghost placeholder report its inline-style box
      const orig = Element.prototype.getBoundingClientRect;
      const spy = vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function box() {
        if (this.getAttribute && this.getAttribute("data-lg-feedback") === "ghost") {
          const n = (k) => parseFloat(this.style[k]) || 0;
          return { x: n("left"), y: n("top"), top: n("top"), left: n("left"), width: n("width"), height: n("height"), right: n("left") + n("width"), bottom: n("top") + n("height"), toJSON() {} };
        }
        return orig.call(this);
      });
      render(<AlertProvider {...P} />);
      const btn = addButton('<button type="button">Remove</button>');
      let undone = false;
      btn.addEventListener("click", () => {
        compatMessage.open({ content: "Removed from favourites", duration: 5, actionLabel: "Undo", onAction: () => { undone = true; } });
        btn.parentElement.remove(); // the card disappears in the same tick
      });
      tap(btn);
      act(() => { btn.click(); });
      await waitFor(() => expect(document.querySelector('[data-lg-feedback="ghost"]')).not.toBeNull());
      const undo = await screen.findByRole("button", { name: "Undo" });
      expect(undo.closest('[data-lg-feedback="pop"]')).not.toBeNull();
      act(() => { undo.click(); });
      expect(undone).toBe(true);
      expect(document.querySelector('[data-lg-feedback="snackbar"]')).toBeNull();
      spy.mockRestore();
    });

    it("explicit anchor:false still uses the bar (opt-in only)", async () => {
      render(<AlertProvider {...P} />);
      act(() => { compatToast.error("Forced bar", { anchor: false }); });
      await screen.findByText("Forced bar");
      expect(inSnackbar("Forced bar")).not.toBeNull();
    });
  });

  it("dedupes identical snackbar messages fired twice", async () => {
    render(<AlertProvider appearance="snackbar" autoAnchor />);
    act(() => { compatToast.info("You are now live"); compatToast.info("You are now live"); });
    await screen.findByText("You are now live");
    expect(screen.getAllByText("You are now live")).toHaveLength(1);
  });

  it("an error on an icon shakes the icon itself, then clears the class", async () => {
    render(<AlertProvider appearance="snackbar" autoAnchor effects />);
    const btn = addButton('<button type="button" aria-label="Like"><svg></svg></button>');
    tap(btn);
    act(() => { compatToast.error("Failed"); });
    await screen.findByText("Failed");
    await waitFor(() => expect(btn.classList.contains("lgf-fx-shake")).toBe(true));
    await waitFor(() => expect(btn.classList.contains("lgf-fx-shake")).toBe(false), { timeout: 1500 });
  });

  it("a failure always shakes the control; the success pop on icons needs the effects flag", async () => {
    render(<AlertProvider appearance="snackbar" autoAnchor />);
    const btn = addButton('<button type="button" aria-label="Bookmark"><svg></svg></button>');
    tap(btn);
    act(() => { compatToast.error("Failed"); });
    await screen.findByText("Failed");
    await waitFor(() => expect(btn.classList.contains("lgf-fx-shake")).toBe(true));
    const icon = addButton('<button type="button" aria-label="Like"><svg></svg></button>');
    tap(icon);
    act(() => { compatToast.success("Liked"); });
    await screen.findByText("Liked");
    expect(icon.classList.contains("lgf-fx-pop")).toBe(false);
  });

  describe("requestErrors: a tap-started request fails and the app shows nothing", () => {
    it("shows the failure on the tapped control (with a shake)", async () => {
      render(<AlertProvider appearance="snackbar" autoAnchor requestErrors fallback="nearest" quietVariants={["success", "info"]} />);
      const btn = addButton('<button type="button" aria-label="Like"><svg></svg></button>');
      tap(btn);
      act(() => { alertStore.reportRequestFailure({ tap: { el: btn }, kind: "network", at: Date.now() }); });
      await waitFor(() => expect(inPop("No connection. Check your internet.")).not.toBeNull(), { timeout: 2000 });
      await waitFor(() => expect(btn.classList.contains("lgf-fx-shake")).toBe(true));
    });

    it("stays quiet when the app showed its own error", async () => {
      render(<AlertProvider appearance="snackbar" autoAnchor requestErrors fallback="nearest" />);
      const btn = addButton();
      tap(btn);
      const at = Date.now();
      act(() => { alertStore.reportRequestFailure({ tap: { el: btn }, kind: "server", at }); compatToast.error("Couldn't send the tip. Try again."); });
      await screen.findByText("Couldn't send the tip. Try again.");
      await new Promise((r) => setTimeout(r, 600));
      expect(screen.queryByText("Something went wrong. Try again.")).toBeNull();
    });

    it("stays quiet when the app's error came just BEFORE the failure report (axios catch runs first)", async () => {
      render(<AlertProvider appearance="snackbar" autoAnchor requestErrors fallback="nearest" />);
      const btn = addButton('<button type="button" aria-label="Like"><svg></svg></button>');
      tap(btn);
      const since = Date.now() - 50;
      act(() => { compatToast.error("Couldn't like this. Try again."); });
      await new Promise((r) => setTimeout(r, 5));
      act(() => { alertStore.reportRequestFailure({ tap: { el: btn }, kind: "network", at: Date.now(), since }); });
      await new Promise((r) => setTimeout(r, 600));
      expect(screen.queryByText("No connection. Check your internet.")).toBeNull();
      expect(screen.getByText("Couldn't like this. Try again.")).toBeTruthy();
    });

    it("off unless enabled", async () => {
      render(<AlertProvider appearance="snackbar" autoAnchor />);
      const btn = addButton();
      act(() => { alertStore.reportRequestFailure({ tap: { el: btn }, kind: "network", at: Date.now() }); });
      await new Promise((r) => setTimeout(r, 600));
      expect(screen.queryByText("No connection. Check your internet.")).toBeNull();
    });
  });
});

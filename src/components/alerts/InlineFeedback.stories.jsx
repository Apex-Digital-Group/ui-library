import React from "react";
import { AlertProvider } from "./AlertProvider";
import { toast, message } from "./compat";

/**
 * Inline feedback — what <AlertProvider appearance="snackbar" autoAnchor>
 * does to unchanged legacy calls (react-toastify `toast.*`, antd `message.*`).
 * Tap a control: its message appears next to it. "Fire from a timer" shows the
 * bottom snackbar used for anything that was not a direct response to a tap.
 */
export default {
  title: "Alerts/Inline feedback",
  parameters: { layout: "fullscreen" },
};

const pill = {
  fontFamily: "'Manrope', system-ui, sans-serif",
  fontWeight: 700,
  fontSize: 14,
  padding: "10px 18px",
  borderRadius: 999,
  border: "1px solid rgba(168,148,222,0.28)",
  background: "rgba(150,120,215,0.14)",
  color: "#F3F0FA",
  cursor: "pointer",
};

function Switch({ onChange }) {
  const [on, setOn] = React.useState(true);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Show me in discovery"
      onClick={() => { setOn(!on); onChange(!on); }}
      style={{ width: 42, height: 24, borderRadius: 999, border: 0, cursor: "pointer", background: on ? "#2FD07A" : "#3a2c5c" }}
    />
  );
}

function Demo({ fail }) {
  const later = (fn) => setTimeout(fn, 350); // simulated API round trip
  return (
    <div style={{ minHeight: "100vh", background: "#0d0716", color: "#F3F0FA", padding: 40, fontFamily: "'Manrope', system-ui, sans-serif", display: "grid", gap: 28, alignContent: "start" }}>
      <form
        onSubmit={(e) => { e.preventDefault(); later(() => (fail ? toast.error("Could not save") : toast.success("Profile saved"))); }}
        style={{ display: "flex", gap: 12 }}
      >
        <input defaultValue="Nova Lane" aria-label="Display name" style={{ ...pill, borderRadius: 10, background: "#1b1030" }} />
        <button type="submit" style={{ ...pill, background: "#a855f7", border: 0 }}>Save</button>
      </form>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        Show me in discovery
        <Switch onChange={() => later(() => (fail ? toast.error("Couldn't save") : toast.success("Saved")))} />
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <button type="button" aria-label="Bookmark" style={pill} onClick={() => later(() => (fail ? message.error("Couldn't bookmark") : message.success("Post bookmarked")))}>★</button>
        <button type="button" style={pill} onClick={() => later(() => (fail ? toast.error("Not enough credits") : toast.success("Tip sent · −40 credits")))}>Send 40-credit tip</button>
        <button type="button" style={pill} onClick={() => later(() => toast.success("Subscription Promotion settings saved successfully"))}>Long message → snackbar</button>
        <button type="button" data-feedback="global" style={pill} onClick={() => setTimeout(() => toast.info("You are now live"), 3000)}>Fire from a timer (3s)</button>
      </div>
    </div>
  );
}

export const Snackbar_and_anchored = {
  render: () => (<AlertProvider appearance="snackbar" autoAnchor defaultPosition="bottom-center"><Demo /></AlertProvider>),
};

export const Failures = {
  render: () => (<AlertProvider appearance="snackbar" autoAnchor defaultPosition="bottom-center"><Demo fail /></AlertProvider>),
};

export const With_effects = {
  render: () => (<AlertProvider appearance="snackbar" autoAnchor effects defaultPosition="bottom-center"><Demo /></AlertProvider>),
};

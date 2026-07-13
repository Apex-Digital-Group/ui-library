import React from "react";
import { AlertProvider, useToast, useAlert, useAlertTheme } from "./AlertProvider";

/**
 * Imperative runtime — fire toasts and confirm dialogs from anywhere under an
 * <AlertProvider> via the useToast() / useAlert() hooks. No manual rendering.
 */
export default {
  title: "Alerts/Provider (imperative)",
  parameters: { layout: "fullscreen" },
};

const btn = {
  fontFamily: "'Manrope', system-ui, sans-serif",
  fontWeight: 800,
  fontSize: 14,
  padding: "12px 18px",
  borderRadius: 12,
  border: "1px solid rgba(168,148,222,0.28)",
  background: "rgba(150,120,215,0.10)",
  color: "#F3F0FA",
  cursor: "pointer",
};

const BG_PRESETS = [
  ["Default violet", "linear-gradient(180deg,#1b1030 0%,#120a20 100%)"],
  ["White", "#ffffff"],
  ["Teal", "linear-gradient(180deg,#0a2530 0%,#04141a 100%)"],
  ["Wine", "linear-gradient(180deg,#2a1020 0%,#170812 100%)"],
];

function Demo() {
  const toast = useToast();
  const alert = useAlert();
  const { background, setBackground } = useAlertTheme();
  const [last, setLast] = React.useState("—");

  return (
    <div style={{ minHeight: "100vh", background: "#0d0716", color: "#F3F0FA", padding: 40, fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <h2 style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: 24, margin: "0 0 6px" }}>
        Imperative toasts &amp; sweet alerts
      </h2>
      <p style={{ color: "#A99FC6", margin: "0 0 24px", maxWidth: 560, lineHeight: 1.5 }}>
        Fired via <code>useToast()</code> / <code>useAlert()</code>. Toasts stack, auto-dismiss with a
        progress bar, and pause on hover. Confirm dialogs return a promise.
      </p>

      <div style={{ fontWeight: 700, color: "#A99FC6", fontSize: 13, marginBottom: 8 }}>Toasts</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
        <button style={btn} onClick={() => toast.success("Profile updated", "Your changes are live for all subscribers.")}>Success</button>
        <button style={btn} onClick={() => toast.error("Payment failed", "We couldn't process your card.")}>Error</button>
        <button style={btn} onClick={() => toast.warning("Storage almost full", "You've used 90% of your quota.")}>Warning</button>
        <button style={btn} onClick={() => toast.info("New follower", "Ruby Ravish started following you.", { actionLabel: "View", onAction: () => setLast("toast action clicked") })}>Info + action</button>
        <button style={btn} onClick={() => toast.dismissAll()}>Dismiss all</button>
      </div>

      <div style={{ fontWeight: 700, color: "#A99FC6", fontSize: 13, marginBottom: 8 }}>Sweet alerts</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
        <button style={btn} onClick={() => alert.success({ title: "Welcome to Live Gemini!", message: "Your account is verified." })}>Success</button>
        <button
          style={btn}
          onClick={async () => {
            const ok = await alert.confirm({ title: "Delete this post?", message: "This action cannot be undone." });
            setLast(ok ? "confirm → YES" : "confirm → cancelled");
            if (ok) toast.success("Deleted", "Your post was removed.");
          }}
        >
          Confirm (returns promise)
        </button>
      </div>

      <div style={{ fontWeight: 700, color: "#A99FC6", fontSize: 13, marginBottom: 8 }}>
        Global background — client-themeable (current: <code>{String(background).slice(0, 42)}…</code>)
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {BG_PRESETS.map(([label, value]) => (
          <button key={label} style={{ ...btn, outline: background === value ? "2px solid #19E2EA" : "none" }} onClick={() => { setBackground(value); toast.info(label, "Global background applied to all toasts & alerts."); }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 28, color: "#6F668C", fontSize: 13 }}>Last result: {last}</div>
    </div>
  );
}

export const Playground = {
  render: () => (
    <AlertProvider>
      <Demo />
    </AlertProvider>
  ),
};

export const CustomGlobalBackground = {
  name: "Custom Global Background (via prop)",
  render: () => (
    <AlertProvider background="linear-gradient(180deg,#0a2530 0%,#04141a 100%)">
      <Demo />
    </AlertProvider>
  ),
};

export const WhiteBottomRight = {
  name: "White · bottom-right (light card, dark text)",
  render: () => (
    <AlertProvider background="#ffffff" defaultPosition="bottom-right">
      <Demo />
    </AlertProvider>
  ),
};

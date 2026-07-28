import React from "react";
import Toast from "./Toast";
import SweetAlert from "./SweetAlert";
import { GLASS_ALERT_BG } from "./alertVariants";

// Preview of the "purple whitish glass" toasts + dialog over the dark app bg,
// so the frosted backdrop-blur is visible.
export default {
  title: "Alerts/Frosted Glass",
};

const DarkApp = ({ children }) => (
  <div
    style={{
      minHeight: "100vh",
      background:
        "radial-gradient(1200px 800px at 18% -5%, #2c1656 0%, #170b2c 44%, #0b0518 100%)",
      padding: 44,
      display: "flex",
      flexWrap: "wrap",
      gap: 22,
      alignItems: "flex-start",
    }}
  >
    {children}
  </div>
);

const COPY = {
  success: ["Saved", "Your profile is now live."],
  error: ["Payment failed", "Your card was declined — try another."],
  warning: ["Heads up", "You have unsaved changes."],
  info: ["New message", "Alex sent you a photo."],
};

export const Toasts = () => (
  <DarkApp>
    {["success", "error", "warning", "info"].map((v) => (
      <Toast
        key={v}
        variant={v}
        background={GLASS_ALERT_BG}
        duration={0}
        showProgress={false}
        title={COPY[v][0]}
        message={COPY[v][1]}
        actionLabel={v === "info" ? "View" : undefined}
      />
    ))}
  </DarkApp>
);

export const Dialog = () => (
  <DarkApp>
    <SweetAlert
      isOpen
      variant="warning"
      background={GLASS_ALERT_BG}
      title="Delete this conversation?"
      message="This can't be undone. Your messages will be permanently removed."
      confirmLabel="Yes, delete"
      cancelLabel="Cancel"
    />
  </DarkApp>
);

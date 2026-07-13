import * as React from "react";
import SweetAlert from "./SweetAlert";

export default {
  title: "Alerts/SweetAlert",
  component: SweetAlert,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    variant: { control: "select", options: ["success", "error", "warning", "info"] },
    accent: { control: "color" },
    background: { control: "text" },
    onConfirm: { action: "confirm" },
    onCancel: { action: "cancel" },
  },
};

const Demo = (args) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ minHeight: "100vh", background: "#0d0716", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <button type="button" onClick={() => setOpen(true)} style={{ padding: "12px 24px", borderRadius: 12, border: 0, cursor: "pointer", fontWeight: 700, color: "#fff", background: "linear-gradient(90deg,#9333ea,#db2777)" }}>Open alert</button>
      <SweetAlert {...args} isOpen={open} onConfirm={() => setOpen(false)} onCancel={() => setOpen(false)} onDismiss={() => setOpen(false)} />
    </div>
  );
};

export const Success = { render: Demo, args: { variant: "success", title: "Welcome to Live Gemini!", message: "Your account is verified and your feed is ready.", confirmLabel: "Enter feed" } };
export const Error = { render: Demo, args: { variant: "error", title: "Something went wrong", message: "We couldn't complete that action. Please try again.", confirmLabel: "Got it" } };
export const Warning = { render: Demo, args: { variant: "warning", title: "Heads up", message: "This will remove the item permanently.", confirmLabel: "Understood" } };
export const Info = { render: Demo, args: { variant: "info", title: "Did you know?", message: "You can tip creators directly from any stream.", confirmLabel: "Nice" } };
export const ConfirmDialog = { render: Demo, args: { variant: "error", title: "Delete account?", message: "This can't be undone. All your data will be removed.", confirmLabel: "Delete", cancelLabel: "Cancel" } };
export const CustomColours = { render: Demo, args: { variant: "success", title: "Custom theme", message: "accent + background are configurable props.", confirmLabel: "OK", accent: "#ff3d9a", background: "linear-gradient(180deg,#241033,#140a24)" } };

export const OpenByDefault = {
  render: (args) => { const [o, setO] = React.useState(true); const close = () => setO(false); return <SweetAlert {...args} isOpen={o} onConfirm={close} onCancel={close} onDismiss={close} />; },
  args: { variant: "success", title: "Welcome to Live Gemini!", message: "Your account is verified and your feed is ready.", confirmLabel: "Enter feed" },
};

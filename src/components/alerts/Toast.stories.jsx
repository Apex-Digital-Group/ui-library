import * as React from "react";
import Toast from "./Toast";

export default {
  title: "Alerts/Toast",
  component: Toast,
  tags: ["autodocs"],
  decorators: [(S) => <div style={{ background: "#0d0716", padding: 32, maxWidth: 420 }}><S /></div>],
  argTypes: {
    variant: { control: "select", options: ["success", "error", "warning", "info"] },
    accent: { control: "color" },
    background: { control: "text" },
    duration: { control: "number" },
    onClose: { action: "close" },
    onAction: { action: "action" },
  },
  args: { showProgress: false, duration: 0 },
};

export const Success = { args: { variant: "success", title: "Profile updated", message: "Your changes are live for all subscribers." } };
export const Error = { args: { variant: "error", title: "Payment failed", message: "We couldn't process your card. Try again." } };
export const Warning = { args: { variant: "warning", title: "Storage almost full", message: "You've used 90% of your upload quota." } };
export const Info = { args: { variant: "info", title: "New follower", message: "Ruby Ravish started following you." } };
export const WithAction = { args: { variant: "info", title: "Post deleted", message: "Your post was removed.", actionLabel: "Undo delete" } };
export const AutoDismiss = { args: { variant: "success", title: "Saved", message: "Auto-dismisses in 4s with a progress bar.", showProgress: true, duration: 4000 } };
export const CustomColours = { args: { variant: "success", title: "Custom accent + background", message: "accent + background props override the theme.", accent: "#ff3d9a", background: "linear-gradient(180deg,#241033,#160a24)" } };

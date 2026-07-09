import * as React from "react";
import ToastStack from "./ToastStack";
import Toast from "./Toast";

export default {
  title: "Alerts/ToastStack",
  component: ToastStack,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: { position: { control: "select", options: ["top-right","top-center","top-left","bottom-right","bottom-center","bottom-left"] } },
};

export const Positions = {
  render: (args) => (
    <div style={{ minHeight: "100vh", background: "#0d0716" }}>
      <ToastStack {...args}>
        <Toast variant="success" title="Profile updated" message="Your changes are live for all subscribers." showProgress={false} duration={0} />
        <Toast variant="info" title="New follower" message="Ruby Ravish started following you." showProgress={false} duration={0} />
        <Toast variant="warning" title="Storage almost full" message="You've used 90% of your quota." showProgress={false} duration={0} />
      </ToastStack>
    </div>
  ),
  args: { position: "top-right" },
};

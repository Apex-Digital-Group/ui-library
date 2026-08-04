import * as React from "react";
import ModalHeader from "./ModalHeader";

/** Rendered inside a mock modal card so the flat-on-surface design reads. */
const ModalCard = (Story) => (
  <div
    style={{
      maxWidth: 560,
      padding: 20,
      borderRadius: 24,
      border: "2px solid rgba(139, 69, 255, 0.3)",
      background: "linear-gradient(135deg, rgba(30, 15, 50, 0.98), rgba(50, 20, 70, 0.98))",
      boxShadow: "0 25px 80px rgba(0, 0, 0, 0.6)",
    }}
  >
    <Story />
    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, margin: 0 }}>
      Modal body content sits directly below the divider…
    </p>
  </div>
);

export default {
  title: "Modals/ModalHeader",
  component: ModalHeader,
  tags: ["autodocs"],
  decorators: [ModalCard],
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        component:
          "Canonical flat modal header (2026-08-04 redesign): bold title in its own casing, hairline divider, quiet ghost close — replaces the legacy gradient-pill header. The app's antd global skin mirrors this exactly.",
      },
    },
  },
  argTypes: { onClose: { action: "close" } },
};

export const Default = {
  args: { title: "Start Video Call" },
};

export const WithSubtitle = {
  args: { title: "Payout", subtitle: "Monthly summary for March" },
};

export const WithoutClose = {
  render: () => <ModalHeader title="Processing…" />,
};

export const LongTitle = {
  args: {
    title: "Transfer group ownership to another member of this group",
  },
};

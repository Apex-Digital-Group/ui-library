import * as React from "react";
import { UploadCloud, Camera } from "lucide-react";
import ModalHeader from "./ModalHeader";

/** Rendered inside a mock modal card. `position: relative` + `overflow:
 * hidden` on the card is what lets the gradient accent strip pin full-bleed
 * to the top edge and meet both rounded corners. */
const ModalCard = (Story) => (
  <div
    style={{
      position: "relative",
      overflow: "hidden",
      maxWidth: 560,
      padding: 20,
      borderRadius: 18,
      border: "1px solid rgba(120, 92, 180, 0.22)",
      background: "linear-gradient(135deg, rgba(30, 15, 50, 0.98), rgba(50, 20, 70, 0.98))",
      boxShadow: "0 10px 26px -8px rgba(0, 0, 0, 0.55)",
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
          "Canonical modal header (2026-09-01 redesign, matched to the Upload Video wizard the client approved): 3px cyan→purple→pink accent strip on the card's top edge, optional gradient icon chip, bold 22px title, and the dark circular close button that turns pink and rotates on hover. The app's antd global skin mirrors this exactly.",
      },
    },
  },
  argTypes: { onClose: { action: "close" } },
};

export const Default = {
  args: { title: "Start Video Call" },
};

/** The full client-reference lockup: icon chip + title + step subtitle. */
export const WizardStyle = {
  args: { title: "Upload Video", subtitle: "Step 1 of 6 · Upload Video", icon: UploadCloud },
};

export const CoverPicker = {
  args: { title: "Update cover", icon: Camera },
};

export const WithSubtitle = {
  args: { title: "Payout", subtitle: "Monthly summary for March" },
};

export const WithoutClose = {
  render: () => <ModalHeader title="Processing…" />,
};

/** Secondary/nested sheets can drop the top accent. */
export const NoAccent = {
  args: { title: "Confirm", subtitle: "This can't be undone", accent: false },
};

export const LongTitle = {
  args: {
    title: "Transfer group ownership to another member of this group",
  },
};

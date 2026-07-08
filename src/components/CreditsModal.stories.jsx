import * as React from "react";
import CreditsModal from "./CreditsModal";

export default {
  title: "Modals/CreditsModal",
  component: CreditsModal,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: { onPurchase: { action: "purchase" }, onSelectPackage: { action: "select-package" } },
};

/** Click "Get Credits" to open; the ✕, the backdrop, or Esc close it. */
const Demo = (args) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ minHeight: "100vh", background: "#1a0e2e", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600"
      >
        Get Credits
      </button>
      <CreditsModal {...args} isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export const Default = { render: Demo };
export const OpenByDefault = {
  render: (args) => {
    const [open, setOpen] = React.useState(true);
    return <CreditsModal {...args} isOpen={open} onClose={() => setOpen(false)} />;
  },
};
export const CustomLabels = { render: Demo, args: { popularLabel: "HOT DEAL", bestValueLabel: "TOP SAVER" } };

import * as React from "react";
import CreditInfoNote from "./CreditInfoNote";

export default {
  title: "Credits/CreditInfoNote",
  component: CreditInfoNote,
  tags: ["autodocs"],
  decorators: [(S) => <div style={{ background: "#1a0e2e", padding: 24, maxWidth: 720 }}><S /></div>],
};

export const Default = {};
export const CustomBlurb = {
  args: { title: "Heads up:", children: "Credits never expire and are non-refundable once spent." },
};
export const NoTitle = { args: { title: "", children: "A plain informational note without a bold lead-in." } };

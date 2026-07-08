import * as React from "react";
import CreditFilters from "./CreditFilters";

export default {
  title: "Credits/CreditFilters",
  component: CreditFilters,
  tags: ["autodocs"],
  decorators: [(S) => <div style={{ background: "#1a0e2e", padding: 24, maxWidth: 720 }}><S /></div>],
  argTypes: { onChange: { action: "change" } },
};

export const Default = {};
export const PresetActive = { args: { defaultFilter: "video" } };

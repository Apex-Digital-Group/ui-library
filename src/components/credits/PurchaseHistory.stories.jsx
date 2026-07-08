import * as React from "react";
import PurchaseHistory from "./PurchaseHistory";

export default {
  title: "Credits/PurchaseHistory",
  component: PurchaseHistory,
  tags: ["autodocs"],
  decorators: [(S) => <div style={{ background: "#1a0e2e", padding: 24, maxWidth: 720 }}><S /></div>],
  argTypes: { onFilterChange: { action: "filter" }, onTransactionClick: { action: "row-click" } },
};

export const Default = {};
export const Clickable = { args: { onTransactionClick: () => {} } };
export const Empty = { args: { transactions: [] } };

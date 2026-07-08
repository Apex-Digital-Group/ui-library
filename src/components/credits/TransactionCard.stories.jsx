import * as React from "react";
import TransactionCard from "./TransactionCard";

export default {
  title: "Credits/TransactionCard",
  component: TransactionCard,
  tags: ["autodocs"],
  decorators: [(S) => <div style={{ background: "#1a0e2e", padding: 24, maxWidth: 640, display: "flex", flexDirection: "column", gap: 8 }}><S /></div>],
  argTypes: { onClick: { action: "click" } },
};

/** Each transaction type renders its own label + icon + colour. */
export const AllTypes = {
  render: (args) => (
    <>
      <TransactionCard {...args} transaction={{ id: 1, type: "tip", creator: "Ahri", amount: 15, date: "2026-07-08 11:42" }} />
      <TransactionCard {...args} transaction={{ id: 2, type: "live_cam", creator: "Sassy Sarah", amount: 45, date: "2026-07-08 10:15" }} />
      <TransactionCard {...args} transaction={{ id: 3, type: "photo", creator: "Lola Lollipop", amount: 10, date: "2026-07-07 22:30" }} />
      <TransactionCard {...args} transaction={{ id: 4, type: "video", creator: "Candy Crush", amount: 25, date: "2026-07-07 19:05" }} />
      <TransactionCard {...args} transaction={{ id: 5, type: "topup", creator: "Card top-up", amount: 100, date: "2026-07-07 09:00", direction: "in" }} />
    </>
  ),
};

export const Tip = { args: { transaction: { id: 1, type: "tip", creator: "Ahri", amount: 15, date: "2026-07-08 11:42" } } };
export const LiveCam = { args: { transaction: { id: 2, type: "live_cam", creator: "Sassy Sarah", amount: 45, date: "2026-07-08 10:15" } } };
export const Incoming = { args: { transaction: { id: 5, type: "topup", creator: "Card top-up", amount: 100, date: "2026-07-07 09:00", direction: "in" } } };
export const Clickable = { args: { transaction: { id: 3, type: "photo", creator: "Lola Lollipop", amount: 10, date: "2026-07-07 22:30" }, onClick: () => {} } };

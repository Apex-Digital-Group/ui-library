import * as React from "react";
import CreditsPage from "./CreditsPage";

export default {
  title: "Credits/CreditsPage",
  component: CreditsPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    onBuyCredits: { action: "buy-credits" },
    onBack: { action: "back" },
    onTransactionClick: { action: "transaction-click" },
    balance: { control: "number" },
  },
};

export const Default = {};

export const WithTopUps = {
  args: {
    totalPurchased: 500,
    transactions: [
      { id: 1, type: "topup", creator: "Card top-up", amount: 100, date: "2026-07-08 09:00", direction: "in", color: "green" },
      { id: 2, type: "tip", creator: "Ahri", amount: 15, date: "2026-07-08 11:42", color: "pink" },
      { id: 3, type: "live_cam", creator: "Sassy Sarah", amount: 45, date: "2026-07-08 10:15", color: "red" },
      { id: 4, type: "photo", creator: "Lola Lollipop", amount: 10, date: "2026-07-07 22:30", color: "blue" },
    ],
  },
};

export const EmptyHistory = {
  args: { balance: 0, transactions: [] },
};

export const Bounded = {
  args: { maxWidth: 1024 },
};

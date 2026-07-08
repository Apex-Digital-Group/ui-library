import * as React from "react";
import CreditBalanceCard from "./CreditBalanceCard";

export default {
  title: "Credits/CreditBalanceCard",
  component: CreditBalanceCard,
  tags: ["autodocs"],
  decorators: [(S) => <div style={{ background: "#1a0e2e", padding: 24, maxWidth: 640 }}><S /></div>],
  argTypes: { onBuyCredits: { action: "buy-credits" }, balance: { control: "number" } },
};

export const Default = { args: { balance: 277.99, totalSpent: 230, onBuyCredits: () => {} } };
export const WithPurchasedPill = { args: { balance: 277.99, totalSpent: 230, totalPurchased: 500, onBuyCredits: () => {} } };
export const NoCTA = { args: { balance: 42, totalSpent: 8 } };

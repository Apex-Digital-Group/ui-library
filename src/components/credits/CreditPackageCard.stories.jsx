import * as React from "react";
import CreditPackageCard from "./CreditPackageCard";

export default {
  title: "Credits/CreditPackageCard",
  component: CreditPackageCard,
  tags: ["autodocs"],
  decorators: [(S) => <div style={{ background: "#1a0e2e", padding: 32, maxWidth: 220 }}><S /></div>],
  argTypes: { onClick: { action: "click" } },
};

export const Plain = { args: { name: "Bronze", credits: 27.99, price: 45.99 } };
export const MostPopular = { args: { name: "Gold", credits: 157.99, price: 240.99, badge: { label: "MOST POPULAR", tone: "popular" } } };
export const BestValue = { args: { name: "Platinum", credits: 297.99, price: 445.99, badge: { label: "BEST VALUE", tone: "best" } } };
export const Selected = { args: { name: "Silver", credits: 67.99, price: 106.99, selected: true } };
export const CustomBadge = { args: { name: "Launch", credits: 50, price: 79, badge: { label: "LIMITED", tone: "best" }, currency: "€" } };

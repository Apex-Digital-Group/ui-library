import * as React from "react";
import BuyCreditsPage from "./BuyCreditsPage";

export default {
  title: "Credits/BuyCreditsPage",
  component: BuyCreditsPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    onBack: { action: "back" },
    onPay: { action: "pay" },
    onSelectPackage: { action: "select-package" },
  },
};

export const Default = {};

export const CustomPackages = {
  args: {
    title: "Top up your wallet",
    packages: [
      { name: "Mini", credits: 5, price: 9.99 },
      { name: "Pro", credits: 50, price: 79.99, popular: true },
      { name: "Max", credits: 200, price: 299.99, bestValue: true },
    ],
  },
};

import React from "react";
import { cn } from "../../lib/utils";
import BuyCreditsFlow from "./BuyCreditsFlow";

// Re-exported for back-compat.
export {
  defaultPackages,
  defaultPricingAnchors,
  defaultPaymentMethods,
  priceForCredits,
} from "./BuyCreditsFlow";

/**
 * Full-width Buy Credits PAGE — page chrome around {@link BuyCreditsFlow}.
 * Shares the exact flow the CreditsModal uses. All flow props pass through. Tailwind.
 *
 * @param {object} props
 * @param {() => void} [props.onBack] Back at step 1 → your credits page (no arrow at step 1 if omitted).
 * @param {string} [props.className]
 * @param {...any} props ...all {@link BuyCreditsFlow} props (packages, popularLabel, onPay, …).
 */
export default function BuyCreditsPage({ onBack, className = "", ...flowProps }) {
  return (
    <div className={cn("w-full min-h-screen bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] text-white", className)}>
      <BuyCreditsFlow onExit={onBack} {...flowProps} />
    </div>
  );
}

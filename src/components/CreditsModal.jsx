import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../lib/utils";
import BaseModal from "./BaseModal";
import BuyCreditsFlow from "./credits/BuyCreditsFlow";

/**
 * CreditsModal — the "Get Credits" modal. Extends the shared {@link BaseModal}
 * shell and renders the parameterized {@link BuyCreditsFlow} (package grid +
 * slider → payment method → card/crypto) in its card. The SAME flow powers the
 * BuyCreditsPage. Tailwind.
 *
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose Fired by the ✕, the backdrop, or Esc.
 * @param {(order:{credits:number, price:number, paymentMethod:string, card?:object})=>void} [props.onPurchase]
 *   Final purchase callback (modal closes after).
 * @param {boolean} [props.closeOnBackdrop=true] @param {boolean} [props.closeOnEsc=true]
 * @param {string} [props.backdrop='bg-black/70 backdrop-blur-sm'] BaseModal backdrop classes.
 * @param {string} [props.className] Extra classes on the dialog card.
 * @param {...any} props ...all {@link BuyCreditsFlow} props (packages, popularLabel, bestValueLabel, pricingAnchors, paymentMethods, …).
 */
export default function CreditsModal({
  isOpen,
  onClose,
  onPurchase,
  closeOnBackdrop = true,
  closeOnEsc = true,
  backdrop = "bg-black/70 backdrop-blur-sm",
  className = "",
  ...flowProps
}) {
  const handlePay = (method, order) => {
    onPurchase?.({ ...order, paymentMethod: method });
    onClose?.();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      lockScroll
      closeOnBackdrop={closeOnBackdrop}
      closeOnEsc={closeOnEsc}
      backdrop={backdrop}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] rounded-2xl shadow-2xl border border-white/20",
          className,
        )}
      >
        <BuyCreditsFlow
          {...flowProps}
          onPay={handlePay}
          headerRight={
            <button type="button" onClick={onClose} aria-label="Close" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          }
        />
      </motion.div>
    </BaseModal>
  );
}

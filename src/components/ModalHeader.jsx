import * as React from "react";
import { X } from "lucide-react";

/**
 * ModalHeader — the canonical flat modal header (2026-08-04 redesign).
 *
 * Replaces the legacy gradient-pill header: bold Title-Case title in its own
 * casing on the modal surface, hairline divider, quiet ghost close button.
 * The app mirrors this styling for antd modals via its global skin
 * (interactive-twin index.css); lib-composed modals use this component
 * directly above their content.
 *
 *   <ModalHeader title="Start Video Call" onClose={close} />
 *   <ModalHeader title="Payout" subtitle="Monthly summary" onClose={close} />
 */
export default function ModalHeader({ title, subtitle, onClose, className = "" }) {
  return (
    <div
      className={`flex items-start justify-between gap-[16px] pb-[18px] mb-[14px] border-b border-white/[0.08] ${className}`.trim()}
    >
      <div className="min-w-0">
        <h2 className="m-0! text-[28px]! font-bold! leading-[1.2]! tracking-[-0.01em] text-white!">
          {title}
        </h2>
        {subtitle ? (
          <p className="m-0! mt-[4px]! text-[14px]! text-white/60!">{subtitle}</p>
        ) : null}
      </div>
      {onClose ? (
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center rounded-full border border-white/20 bg-transparent text-white/85 transition-all duration-200 hover:bg-white/10 hover:border-white/40 cursor-pointer"
        >
          <X size={18} />
        </button>
      ) : null}
    </div>
  );
}

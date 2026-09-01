import * as React from "react";
import { X } from "lucide-react";

/**
 * ModalHeader — the canonical modal header (2026-09-01 redesign, matched to
 * the client-approved Upload Video wizard):
 *
 *  - 3px gradient hairline (cyan → purple → pink) pinned to the modal card's
 *    TOP EDGE. It positions against the card, so the card must be its
 *    containing block (any `relative`, or the transform lib cards animate
 *    with) and clip it (`overflow-hidden` + the card's border-radius).
 *    Opt out with `accent={false}` for nested/secondary sheets.
 *  - optional gradient icon chip (46px, rounded 14px) left of the title —
 *    pass a lucide component via `icon`.
 *  - bold 22px title in its own casing + quiet 13px subtitle.
 *  - 36px circular close button: dark glass at rest, pink + 90° rotate on
 *    hover (same recipe as .lgw-close / .credit-popup-close).
 *
 * The app mirrors this styling for antd modals via its global skin
 * (interactive-twin index.css); lib-composed modals use this component
 * directly above their content.
 *
 *   <ModalHeader title="Upload Video" subtitle="Step 1 of 6" icon={UploadCloud} onClose={close} />
 *   <ModalHeader title="Update cover" onClose={close} />
 */
export default function ModalHeader({ title, subtitle, icon: Icon, onClose, accent = true, className = "" }) {
  return (
    <div
      className={`flex items-center gap-[14px] pb-[16px] mb-[14px] border-b border-[rgba(120,92,180,0.22)] ${className}`.trim()}
    >
      {accent ? (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,#22d3ee,#a855f7_45%,#ec4899)]"
        />
      ) : null}
      {Icon ? (
        <span
          aria-hidden="true"
          className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-[14px] text-white bg-[linear-gradient(135deg,#22d3ee,#a855f7_55%,#ec4899)] shadow-[0_8px_22px_rgba(168,85,247,0.35)]"
        >
          {React.isValidElement(Icon) ? Icon : <Icon size={22} />}
        </span>
      ) : null}
      <div className="min-w-0 flex-1">
        <h2 className="m-0! text-[22px]! font-extrabold! leading-[1.15]! tracking-[-0.01em] text-white!">
          {title}
        </h2>
        {subtitle ? (
          <p className="m-0! mt-[2px]! text-[13px]! text-[rgba(214,205,240,0.6)]!">{subtitle}</p>
        ) : null}
      </div>
      {onClose ? (
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center rounded-full border border-[rgba(120,92,180,0.22)] bg-black/30 text-white transition-all duration-300 hover:bg-[rgba(235,64,122,0.3)] hover:border-[rgba(235,64,122,0.5)] hover:rotate-90 cursor-pointer"
        >
          <X size={18} />
        </button>
      ) : null}
    </div>
  );
}

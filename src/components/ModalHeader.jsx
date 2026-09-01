import * as React from "react";
import { X } from "lucide-react";
import "./ModalHeader.css";

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
 * Styled with its own CSS (bond-mh*) like every lib component — consumers
 * don't run Tailwind over lib sources.
 *
 *   <ModalHeader title="Upload Video" subtitle="Step 1 of 6" icon={UploadCloud} onClose={close} />
 *   <ModalHeader title="Update cover" onClose={close} />
 */
export default function ModalHeader({ title, subtitle, icon: Icon, onClose, accent = true, className = "" }) {
  return (
    <div className={`bond-mh ${className}`.trim()}>
      {accent ? <span aria-hidden="true" className="bond-mh__accent" /> : null}
      {Icon ? (
        <span aria-hidden="true" className="bond-mh__icon">
          {React.isValidElement(Icon) ? Icon : <Icon size={22} />}
        </span>
      ) : null}
      <div className="bond-mh__body">
        <h2 className="bond-mh__title">{title}</h2>
        {subtitle ? <p className="bond-mh__sub">{subtitle}</p> : null}
      </div>
      {onClose ? (
        <button type="button" aria-label="Close" onClick={onClose} className="bond-mh__close">
          <X size={18} />
        </button>
      ) : null}
    </div>
  );
}

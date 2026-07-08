import React from "react";
import { Sparkles } from "lucide-react";
import "./CreditInfoNote.css";

/**
 * Small info blurb — an icon beside a lead-in + body. Reusable for any note
 * ("How Credits Work", disclaimers, tips…). Host-agnostic scoped CSS.
 *
 * @param {object} props
 * @param {React.ComponentType} [props.icon=Sparkles] Leading icon (pass null to hide).
 * @param {string} [props.title='How Credits Work:'] Bold lead-in (pass "" to hide).
 * @param {React.ReactNode} [props.children] Body text; a default credits blurb renders when omitted.
 * @param {string} [props.className]
 */
export default function CreditInfoNote({
  icon: Icon = Sparkles,
  title = "How Credits Work:",
  children,
  className = "",
}) {
  return (
    <div className={`bond-credit-note ${className}`.trim()}>
      {Icon ? <Icon className="bond-credit-note__icon" aria-hidden="true" /> : null}
      <p className="bond-credit-note__text">
        {title ? <strong className="bond-credit-note__lead">{title} </strong> : null}
        {children ??
          "1 credit = $1 of platform value. Use credits to unlock photos, videos, access live cam sessions, and tip your favourite creators."}
      </p>
    </div>
  );
}

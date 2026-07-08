import React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Small info blurb — icon + bold lead-in + body. Reusable for any note. Tailwind.
 *
 * @param {object} props
 * @param {React.ComponentType} [props.icon=Sparkles] Leading icon (null to hide).
 * @param {string} [props.title='How Credits Work:'] Bold lead-in ("" to hide).
 * @param {React.ReactNode} [props.children] Body; default credits blurb when omitted.
 * @param {string} [props.className]
 */
export default function CreditInfoNote({
  icon: Icon = Sparkles,
  title = "How Credits Work:",
  children,
  className = "",
}) {
  return (
    <div className={cn("flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 text-xs text-white/50", className)}>
      {Icon ? <Icon className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" /> : null}
      <p className="m-0 leading-relaxed">
        {title ? <span className="text-white font-semibold">{title} </span> : null}
        {children ??
          "1 credit = $1 of platform value. Use credits to unlock photos, videos, access live cam sessions, and tip your favourite creators."}
      </p>
    </div>
  );
}

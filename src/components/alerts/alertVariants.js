import { Check, X, AlertTriangle, Info } from "lucide-react";

// LiveGemini feedback palette (neon-dark). Accent per variant; override with an
// `accent` prop on any component.
export const ALERT_VARIANTS = {
  success: { accent: "#2FD07A", Icon: Check },
  error:   { accent: "#FF4D6D", Icon: X },
  warning: { accent: "#F5A623", Icon: AlertTriangle },
  info:    { accent: "#19E2EA", Icon: Info },
};

export const resolveVariant = (variant, accent, iconOverride) => {
  const v = ALERT_VARIANTS[variant] || ALERT_VARIANTS.success;
  return { color: accent || v.accent, Icon: iconOverride || v.Icon };
};

// Default dark card background (configurable via a `background` prop).
export const DEFAULT_ALERT_BG = "linear-gradient(180deg,#1b1030 0%,#120a20 100%)";

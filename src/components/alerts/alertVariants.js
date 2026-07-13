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

// ---------------------------------------------------------------------------
// Tone / theming — toasts + alerts can sit on a dark OR a light background
// (e.g. a client setting background="#ffffff"). Text, border and shadow must
// flip with it. We sniff the first solid colour out of the background string
// (works for gradients too) and compute relative luminance; a `scheme` override
// ('light' | 'dark') skips detection when the background is un-parseable.
// ---------------------------------------------------------------------------

/** Pull the first #hex / rgb() colour out of a CSS background string → luminance 0–1, or null. */
function backgroundLuminance(bg) {
  if (typeof bg !== "string") return null;
  const hex = bg.match(/#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/);
  const rgb = bg.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  let r;
  let g;
  let b;
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    r = parseInt(h.slice(0, 2), 16);
    g = parseInt(h.slice(2, 4), 16);
    b = parseInt(h.slice(4, 6), 16);
  } else if (rgb) {
    r = +rgb[1]; g = +rgb[2]; b = +rgb[3];
  } else if (/\b(white|ivory|snow|ghostwhite|linen|whitesmoke)\b/i.test(bg)) {
    return 1;
  } else {
    return null;
  }
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/** True when the card background is light enough to need dark text. */
export function isLightBackground(bg) {
  const L = backgroundLuminance(bg);
  return L != null && L > 0.6;
}

// Text / border / shadow token sets per scheme.
const TONES = {
  light: {
    fg: "#1a1420",
    muted: "rgba(24,16,36,0.62)",
    faint: "rgba(24,16,36,0.42)",
    closeHover: "rgba(24,16,36,0.06)",
    border: "rgba(24,16,36,0.12)",
    shadow: "0 16px 40px -16px rgba(20,15,40,0.28), 0 0 0 1px rgba(24,16,36,0.04) inset",
  },
  dark: {
    fg: "#F3F0FA",
    muted: "rgba(255,255,255,0.55)",
    faint: "rgba(255,255,255,0.42)",
    closeHover: "rgba(255,255,255,0.06)",
    border: "rgba(168,148,222,0.18)",
    shadow: "0 24px 60px -22px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02) inset",
  },
};

/**
 * Resolve text/border/shadow tokens for a given background.
 * @param {string} background CSS colour or gradient.
 * @param {('light'|'dark')} [scheme] Force a scheme (skips luminance sniffing).
 */
export function resolveTone(background, scheme) {
  const key = scheme || (isLightBackground(background) ? "light" : "dark");
  return TONES[key] || TONES.dark;
}

import * as React from "react";
import {
  Shield, ShieldCheck, ShieldAlert, Monitor, Smartphone, Tablet,
  LogIn, LogOut, KeyRound, XCircle, Users, Check,
} from "lucide-react";
import "./Security.css";

/**
 * Security-checkup primitives (settings-v2 "Security checkup" wizard).
 * Same R3 look as the settings primitives; plain `bond-sec-*` CSS, no antd.
 *
 * Plan: docs/2026-08-05-security-checkup-review-and-plan.md
 */

// --- password scoring: pure, exported so the change-password page reuses it ---
export function scorePassword(pw, { email = "", name = "" } = {}) {
  const value = String(pw || "");
  if (!value) return { score: 0, label: "", checks: {} };

  const checks = {
    length: value.length >= 8,
    longer: value.length >= 12,
    lower: /[a-z]/.test(value),
    upper: /[A-Z]/.test(value),
    digit: /\d/.test(value),
    symbol: /[^A-Za-z0-9]/.test(value),
  };
  const personal = [];
  const emailStr = String(email || "").trim().toLowerCase();
  if (emailStr) {
    personal.push(emailStr);
    if (emailStr.includes("@")) personal.push(emailStr.split("@")[0]);
  }
  if (name) personal.push(String(name).trim().toLowerCase());
  const needles = personal.filter((s) => s.length >= 3);
  const looksPersonal = needles.some((s) => value.toLowerCase().includes(s));

  let raw = 0;
  if (checks.length) raw += 1;
  if (checks.lower && checks.upper) raw += 1;
  if (checks.digit) raw += 1;
  if (checks.symbol) raw += 1;
  if (checks.longer) raw += 1;
  if (looksPersonal || value.length < 8) raw = Math.min(raw, 1);

  // Clamp to 0..4 buckets.
  const score = Math.max(0, Math.min(4, raw));
  const label = ["Very weak", "Weak", "Fair", "Good", "Strong"][score];
  return { score, label, checks, looksPersonal };
}

export function PasswordStrengthMeter({ password, email = "", name = "", className = "" }) {
  const { score, label } = scorePassword(password, { email, name });
  const show = String(password || "").length > 0;
  return (
    <div className={`bond-sec-meter ${className}`.trim()} aria-hidden={!show}>
      <div className="bond-sec-meter__bars" data-score={score}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`bond-sec-meter__bar ${show && i < score ? "is-on" : ""}`.trim()} />
        ))}
      </div>
      {show ? <div className={`bond-sec-meter__label bond-sec-meter__label--${score}`}>{label}</div> : null}
    </div>
  );
}

// --- summary score ring (n/5 secure) ---
export function SecurityScoreRing({ value = 0, total = 5, label = "secure", size = 96 }) {
  const pct = total > 0 ? Math.max(0, Math.min(1, value / total)) : 0;
  const r = (size - 12) / 2;
  const c = 2 * Math.PI * r;
  const strong = pct >= 0.8;
  const warn = pct < 0.5;
  const stroke = strong ? "#22c55e" : warn ? "#fbbf24" : "#00d4d4";
  return (
    <div className="bond-sec-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="8" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={stroke} strokeWidth="8"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="bond-sec-ring__center">
        <div className="bond-sec-ring__value">{value}/{total}</div>
        <div className="bond-sec-ring__label">{label}</div>
      </div>
    </div>
  );
}

// --- step card shell ---
const STATUS_ICON = { ok: ShieldCheck, warn: ShieldAlert, info: Shield };
export function SecurityStepCard({ index, title, status = "info", statusLabel, children, className = "" }) {
  const Icon = STATUS_ICON[status] || Shield;
  return (
    <section className={`bond-sec-card bond-sec-card--${status} ${className}`.trim()}>
      <header className="bond-sec-card__head">
        <div className="bond-sec-card__icon"><Icon size={20} /></div>
        <div className="bond-sec-card__titles">
          {typeof index === "number" ? <span className="bond-sec-card__eyebrow">Step {index}</span> : null}
          <h3 className="bond-sec-card__title">{title}</h3>
        </div>
        {statusLabel ? <span className={`bond-sec-chip bond-sec-chip--${status}`}>{statusLabel}</span> : null}
      </header>
      <div className="bond-sec-card__body">{children}</div>
    </section>
  );
}

// --- device row ---
const DEVICE_ICON = { web: Monitor, desktop: Monitor, mobile: Smartphone, android: Smartphone, ios: Smartphone, tablet: Tablet };
export function DeviceRow({ device = {}, onRemove, removing = false }) {
  const Icon = DEVICE_ICON[String(device.device_type || "").toLowerCase()] || Monitor;
  const meta = [device.ip_address, device.location, device.last_seen_label]
    .filter(Boolean).join(" · ");
  return (
    <div className={`bond-sec-devrow ${device.stale ? "is-stale" : ""}`.trim()}>
      <div className="bond-sec-devrow__icon"><Icon size={18} /></div>
      <div className="bond-sec-devrow__copy">
        <div className="bond-sec-devrow__name">
          {device.device_name || device.device_type || "Unknown device"}
          {device.is_current ? <span className="bond-sec-badge">This device</span> : null}
          {device.stale ? <span className="bond-sec-badge bond-sec-badge--muted">Inactive 90d+</span> : null}
        </div>
        {meta ? <div className="bond-sec-devrow__meta">{meta}</div> : null}
      </div>
      {onRemove ? (
        <button type="button" className="bond-sec-devrow__btn" onClick={() => onRemove(device)} disabled={removing}>
          {removing ? "…" : "Remove"}
        </button>
      ) : null}
    </div>
  );
}

// --- activity row ---
const ACTIVITY_ICON = {
  login: LogIn, logout: LogOut, logout_all_devices: LogOut,
  password_change: KeyRound, device_revoked: Users, failed_login: XCircle,
};
export function ActivityRow({ event = {} }) {
  const Icon = ACTIVITY_ICON[event.type] || Check;
  const danger = event.type === "failed_login";
  const meta = [event.at_label || event.at, event.location, event.ip].filter(Boolean).join(" · ");
  return (
    <div className={`bond-sec-actrow ${danger ? "is-danger" : ""}`.trim()}>
      <div className="bond-sec-actrow__icon"><Icon size={16} /></div>
      <div className="bond-sec-actrow__copy">
        <div className="bond-sec-actrow__text">{event.reason || event.type}</div>
        {meta ? <div className="bond-sec-actrow__meta">{meta}</div> : null}
      </div>
    </div>
  );
}

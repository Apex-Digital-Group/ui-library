import React from "react";
import "./Purchases.css";

/**
 * "Things I've Bought" building blocks (LG-330 purchases redesign).
 *
 * Presentational only — data and actions arrive via props; no API calls,
 * router, or storage access. The host composes:
 *
 *   <PurchaseStatCard>    hero stat tiles (spent / owned / subs / balance)
 *   <SubscriptionCard>    active-subscription card (status pill, renews, CTA)
 *   <PurchaseItemCard>    horizontal purchase row (thumb + meta + actions) —
 *                         one card for albums, videos and custom clips via
 *                         badges/actions props
 *
 * Tabs/section headers/empty states reuse the favourites set.
 * Peer deps: react. Styling scoped via bond-pur-* classes.
 */

function initialOf(name) {
  return (name || "?").trim().charAt(0).toUpperCase();
}

function AvatarCircle({ url, name, size = "md" }) {
  if (url) return <img className={`bond-pur-avatar bond-pur-avatar--${size}`} src={url} alt="" />;
  return (
    <span className={`bond-pur-avatar bond-pur-avatar--${size} bond-pur-avatar--fallback`}>
      {initialOf(name)}
    </span>
  );
}

export function PurchaseStatCard({ label, value, suffix, actionLabel, onAction, highlight = false }) {
  return (
    <div className={`bond-pur-stat ${highlight ? "bond-pur-stat--highlight" : ""}`}>
      <span className="bond-pur-stat__label">{label}</span>
      <div className="bond-pur-stat__row">
        <span className="bond-pur-stat__value">
          {value}
          {suffix ? <span className="bond-pur-stat__suffix"> {suffix}</span> : null}
        </span>
        {actionLabel && onAction ? (
          <button type="button" className="bond-pur-stat__action" onClick={onAction}>
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function SubscriptionCard({
  name,
  handle,
  tierText,
  avatarUrl,
  status = "active", // 'active' | 'ending'
  statusText,
  renewsLabel, // e.g. "RENEWS 3 SEP" or "ACCESS UNTIL 22 AUG"
  priceText,   // e.g. "25 credits / mo"
  actionLabel, // Manage / Resume
  onAction,
}) {
  return (
    <div className="bond-pur-card bond-pur-sub">
      <span className="bond-pur-accent" />
      <div className="bond-pur-sub__head">
        <AvatarCircle url={avatarUrl} name={name} size="lg" />
        <div className="bond-pur-sub__names">
          <div className="bond-pur-sub__name">{name}</div>
          <div className="bond-pur-sub__meta">
            {handle}
            {tierText ? ` · ${tierText}` : ""}
          </div>
        </div>
        {statusText ? (
          <span className={`bond-pur-status bond-pur-status--${status}`}>{statusText}</span>
        ) : null}
      </div>
      <div className="bond-pur-sub__foot">
        <div className="bond-pur-sub__renew">
          {renewsLabel ? <span className="bond-pur-sub__renew-label">{renewsLabel}</span> : null}
          {priceText ? <span className="bond-pur-sub__price">{priceText}</span> : null}
        </div>
        {actionLabel && onAction ? (
          <button
            type="button"
            className={status === "ending" ? "bond-pur-btn-primary" : "bond-pur-btn-ghost"}
            onClick={onAction}
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function PurchaseItemCard({
  title,
  thumbUrl,
  // thumb overlays
  durationText,       // bottom-right badge
  typeBadge,          // top-left pill, e.g. "Custom clip"
  countText,          // bottom-left pill, e.g. "3 videos" / "12 photos"
  statusBadge,        // e.g. "In progress" — highlighted top-left pill
  // body
  authorName,
  authorAvatarUrl,
  dateText,           // "2 Aug 2026" (purchase/order date)
  note,               // e.g. "Due in 2 days · she has accepted the brief"
  accessBadge,        // e.g. "Access ends in 5 days" (pink pill in body)
  priceText,          // "120 credits"
  actions = [],       // [{label, onClick, primary}]
  onOpen,
}) {
  return (
    <div className="bond-pur-card bond-pur-item">
      <div className="bond-pur-item__thumb" onClick={onOpen} role={onOpen ? "button" : undefined}>
        {thumbUrl ? <img src={thumbUrl} alt={title || "purchase"} loading="lazy" /> : <div className="bond-pur-item__thumb-fallback" />}
        {statusBadge ? (
          <span className="bond-pur-pill bond-pur-pill--status">{statusBadge}</span>
        ) : typeBadge ? (
          <span className="bond-pur-pill bond-pur-pill--type">{typeBadge}</span>
        ) : null}
        {countText ? <span className="bond-pur-pill bond-pur-pill--count">{countText}</span> : null}
        {durationText ? <span className="bond-pur-item__duration">{durationText}</span> : null}
      </div>
      <div className="bond-pur-item__body">
        <div>
          <div className="bond-pur-item__title">{title}</div>
          <div className="bond-pur-item__author">
            <AvatarCircle url={authorAvatarUrl} name={authorName} size="sm" />
            {authorName}
            {dateText ? ` · ${dateText}` : ""}
          </div>
          {note ? <div className="bond-pur-item__note">{note}</div> : null}
          {accessBadge ? <span className="bond-pur-pill bond-pur-pill--access">{accessBadge}</span> : null}
        </div>
        <div className="bond-pur-item__foot">
          {priceText ? <span className="bond-pur-item__price">{priceText}</span> : null}
          <div className="bond-pur-item__actions">
            {actions.map((action) => (
              <button
                key={action.label}
                type="button"
                className={action.primary ? "bond-pur-btn-primary" : "bond-pur-btn-ghost"}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import "./LeftNav.css";

/**
 * base44 left navigation rail — the vertical icon+label menu from the base44
 * Feed page (Home, Reels, Messages, Search, Explore, Notifications, Create,
 * Dashboard, Profile). Replaces the legacy "Filter Posts" sidebar.
 *
 * Presentational and host-agnostic (scoped CSS, no Tailwind). The host supplies
 * each item's icon (a React node, e.g. a lucide icon) plus either an `href`
 * (rendered as a link) or an `onClick` (rendered as a button — use for items
 * that open a modal such as Search/Create). Items with neither render as an
 * inert anchor with an empty link, so menu entries with no destination yet stay
 * visible but do nothing.
 *
 * @param {object} props
 * @param {Array} props.items Each: `{ key, label, icon, href?, onClick?, badge?, active?, disabled? }`.
 * @param {(item: object) => void} [props.onItemClick] Called for any item activation (after item.onClick).
 * @param {string} [props.className] Extra class names on the <nav>.
 * @param {string} [props.ariaLabel='Primary'] Accessible label for the nav landmark.
 */
export default function LeftNav({ items = [], onItemClick, className = "", ariaLabel = "Primary" }) {
  const classes = ["bond-leftnav", className].filter(Boolean).join(" ");

  return (
    <nav className={classes} aria-label={ariaLabel}>
      <ul className="bond-leftnav__list">
        {items.map((item) => {
          const itemClasses = [
            "bond-leftnav__item",
            item.active ? "is-active" : "",
            item.disabled ? "is-disabled" : "",
          ]
            .filter(Boolean)
            .join(" ");

          const inner = (
            <>
              <span className="bond-leftnav__icon">
                {item.icon}
                {item.badge ? <span className="bond-leftnav__badge">{item.badge}</span> : null}
              </span>
              <span className="bond-leftnav__label">{item.label}</span>
            </>
          );

          const handle = (e) => {
            if (item.disabled) {
              e.preventDefault();
              return;
            }
            item.onClick?.(e);
            onItemClick?.(item);
          };

          return (
            <li key={item.key ?? item.label}>
              {item.onClick ? (
                <button
                  type="button"
                  className={itemClasses}
                  onClick={handle}
                  disabled={item.disabled}
                  aria-current={item.active ? "page" : undefined}
                >
                  {inner}
                </button>
              ) : (
                <a
                  className={itemClasses}
                  href={item.disabled ? undefined : item.href || undefined}
                  onClick={handle}
                  aria-current={item.active ? "page" : undefined}
                  aria-disabled={item.disabled || !item.href ? true : undefined}
                >
                  {inner}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

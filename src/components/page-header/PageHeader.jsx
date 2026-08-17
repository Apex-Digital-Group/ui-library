import * as React from "react";
import "./PageHeader.css";

/**
 * PageHeader — the shared page hero (LG-347: every page's title is an H1).
 *
 * Extracted from /feature's fb-hero: glass card with the purple→pink wash,
 * gradient H1 (cyan→magenta), muted subtitle, and a right-hand actions slot.
 * The TAG is fixed to <h1> by design — pages restyle via `size`, never by
 * demoting the heading.
 *
 *   <PageHeader
 *     title="What do you want to feature?"
 *     subtitle="Choose what to feature, pick the best date, and book the slot you want."
 *     actions={<><button className="fb-ghost-btn">Analytics</button></>}
 *   />
 *
 * Props:
 *  - title       (string|node, required) — rendered inside the <h1>
 *  - subtitle    (string|node) — muted line under the title
 *  - actions     (node) — right-hand slot (buttons, search, anything)
 *  - size        ('md' | 'lg') — md = 23px page standard, lg = the /feature
 *                clamp(22px…30px) hero scale. Default 'lg'.
 *  - plain       (bool) — drop the glass card (bare title block) for pages
 *                whose design has no hero panel. Default false.
 *  - className   — extra classes on the root
 */
export default function PageHeader({
  title,
  subtitle,
  actions,
  size = "lg",
  plain = false,
  className = "",
  children,
}) {
  return (
    <header
      className={[
        "bond-page-header",
        `bond-page-header--${size}`,
        plain ? "bond-page-header--plain" : "",
        className,
      ].filter(Boolean).join(" ")}
    >
      <div className="bond-page-header__copy">
        <h1 className="bond-page-header__title">{title}</h1>
        {subtitle ? <p className="bond-page-header__subtitle">{subtitle}</p> : null}
      </div>
      {actions ? <div className="bond-page-header__actions">{actions}</div> : null}
      {children}
    </header>
  );
}

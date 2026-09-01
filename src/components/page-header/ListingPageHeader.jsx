import * as React from "react";
import PageHeader from "./PageHeader";
import ListingToolbar from "../listing/ListingToolbar";

/**
 * ListingPageHeader — the approved listing-page hero (Videos redesign):
 * PageHeader's glass card with the gradient H1 + subtitle on the left, and the
 * page's EXISTING toolbar controls (ListingToolbar.Search / Select /
 * ViewToggle — same components, unchanged styling) docked on the right.
 *
 * Children are the toolbar controls; they render inside an `embedded`
 * ListingToolbar so the card owns the surface and the controls keep their
 * exact standalone look:
 *
 *   <ListingPageHeader
 *     title="Videos"
 *     subtitle="Free and premium videos from your favourite creators."
 *   >
 *     <ListingToolbar.Search placeholder="Search Videos" onCommit={apply} />
 *     <ListingToolbar.Select value={sort} options={SORTS} onChange={setSort} />
 *     <ListingToolbar.ViewToggle value={view} onChange={setView} />
 *   </ListingPageHeader>
 *
 * Props: title (required), subtitle, size ('md'|'lg', default 'md' — listing
 * pages are quieter than the /feature hero), plain, className — all forwarded
 * to PageHeader. `toolbarProps` spreads onto the embedded ListingToolbar.
 */
export default function ListingPageHeader({
  title,
  subtitle,
  size = "md",
  plain = false,
  className = "",
  toolbarProps = {},
  children,
}) {
  return (
    <PageHeader
      title={title}
      subtitle={subtitle}
      size={size}
      plain={plain}
      className={["bond-listing-page-header", className].filter(Boolean).join(" ")}
      actions={
        children ? (
          <ListingToolbar variant="embedded" {...toolbarProps}>
            {children}
          </ListingToolbar>
        ) : null
      }
    />
  );
}

import * as React from "react";
import ListingPageHeader from "./ListingPageHeader";
import ListingToolbar from "../listing/ListingToolbar";
import { Bookmark } from "lucide-react";

export default {
  title: "Page chrome/ListingPageHeader",
  component: ListingPageHeader,
  parameters: {
    layout: "padded",
    backgrounds: { default: "app", values: [{ name: "app", value: "#150f22" }] },
  },
};

const SORTS = [
  { value: "recent", label: "Most Recent" },
  { value: "popular", label: "Most Popular" },
  { value: "price_low", label: "Price: Low to High" },
];

/** The approved Videos redesign: current header colours + gradient title,
 * existing search / sort / view-toggle controls docked right, subtext new. */
export function Videos() {
  const [sort, setSort] = React.useState("recent");
  const [view, setView] = React.useState("grid");
  return (
    <ListingPageHeader
      title="Videos"
      subtitle="Free and premium videos from your favourite creators — new drops every day."
    >
      <ListingToolbar.Search placeholder="Search Videos" onCommit={() => {}} />
      <ListingToolbar.Select value={sort} options={SORTS} onChange={setSort} ariaLabel="Sort" />
      <ListingToolbar.ViewToggle value={view} onChange={setView} />
    </ListingPageHeader>
  );
}

/** Search-only — pages without sort/layout controls. */
export function SearchOnly() {
  return (
    <ListingPageHeader title="Photos" subtitle="Galleries and photo sets from creators you follow.">
      <ListingToolbar.Search placeholder="Search Photos" onCommit={() => {}} />
    </ListingPageHeader>
  );
}

/** No tools at all — degrades to the plain PageHeader card. */
export function TitleOnly() {
  return (
    <ListingPageHeader
      title="Stories"
      subtitle="Moments that disappear after 24 hours."
    />
  );
}

/* The full client composition: icon chip + eyebrow + copy on the left,
   page-injectable controls (search / sort / layout toggle) docked right. */
export const SavedByYou = {
  render: () => (
    <ListingPageHeader
      title="Saved videos"
      subtitle="Everything you bookmarked, in one place."
      eyebrow="Saved by you"
      icon={Bookmark}
    >
      <ListingToolbar.Search placeholder="Search Videos" onCommit={() => {}} />
      <ListingToolbar.Select
        value="recent"
        options={[{ value: "recent", label: "Most Recent" }, { value: "top", label: "Top Rated" }]}
        onChange={() => {}}
      />
      <ListingToolbar.ViewToggle value="standard" onChange={() => {}} />
    </ListingPageHeader>
  ),
};

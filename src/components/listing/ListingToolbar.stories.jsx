import * as React from "react";
import { useState } from "react";
import ListingToolbar from "./ListingToolbar";
import { SlidersHorizontal, Upload, Radio, RefreshCw, MoreVertical } from "lucide-react";

const Page = (Story) => (
  <div style={{ background: "#1a0e2e", padding: 24, minHeight: 220 }}>
    <Story />
  </div>
);

export default {
  title: "Listing/ListingToolbar",
  component: ListingToolbar,
  tags: ["autodocs"],
  decorators: [Page],
  parameters: {
    docs: {
      description: {
        component:
          "Shared listing header — compound components + open slots per docs/2026-08-02-listing-toolbar-review.md. " +
          "The shell owns geometry; inject any mix of Search / Select / ViewToggle / Button / IconButton / custom Slot children in any order.",
      },
    },
  },
};

const GROUP_SCOPES = [
  { value: "all", label: "All Groups" },
  { value: "joinable", label: "Joinable" },
  { value: "joined", label: "Joined" },
  { value: "pending", label: "Pending Requests" },
  { value: "owned", label: "Owned by me" },
];
const GROUP_SORTS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "members_desc", label: "Most members" },
  { value: "members_asc", label: "Fewest members" },
  { value: "name_asc", label: "Name A-Z" },
  { value: "name_desc", label: "Name Z-A" },
];
const VIDEO_SORTS = [
  { value: "recent", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "title_asc", label: "Title A-Z" },
  { value: "title_desc", label: "Title Z-A" },
  { value: "price_low", label: "Lowest Price" },
  { value: "price_high", label: "Highest Price" },
];

/** Groups flavour: search + scope + sort + view toggle (creator view of /group/view-all). */
export const GroupsFlavour = {
  render: () => {
    const [scope, setScope] = useState("all");
    const [sort, setSort] = useState("newest");
    const [view, setView] = useState("standard");
    return (
      <ListingToolbar>
        <ListingToolbar.Search placeholder="Search Groups" onCommit={(v) => console.log("search:", v)} />
        <ListingToolbar.Spacer />
        <ListingToolbar.Select ariaLabel="Scope" value={scope} options={GROUP_SCOPES} onChange={setScope} />
        <ListingToolbar.Select ariaLabel="Sort" icon={SlidersHorizontal} value={sort} options={GROUP_SORTS} onChange={setSort} />
        <ListingToolbar.ViewToggle value={view} onChange={setView} />
      </ListingToolbar>
    );
  },
};

/** Videos flavour: subnav variant, one sort select. */
export const VideosSubnav = {
  render: () => {
    const [sort, setSort] = useState("recent");
    const [view, setView] = useState("standard");
    return (
      <ListingToolbar variant="subnav">
        <ListingToolbar.Search placeholder="Search Videos" maxWidth={360} onCommit={(v) => console.log("search:", v)} />
        <ListingToolbar.Spacer />
        <ListingToolbar.Select ariaLabel="Sort" icon={SlidersHorizontal} value={sort} options={VIDEO_SORTS} onChange={setSort} />
        <ListingToolbar.ViewToggle value={view} onChange={setView} />
      </ListingToolbar>
    );
  },
};

/** VodList flavour: injected primary CTA button (proves Button injection). */
export const WithCtaButton = {
  render: () => {
    const [view, setView] = useState("standard");
    return (
      <ListingToolbar>
        <ListingToolbar.Search placeholder="Search" onCommit={() => {}} />
        <ListingToolbar.Spacer />
        <ListingToolbar.Button onClick={() => console.log("upload")}>
          <Upload size={14} /> Upload Video
        </ListingToolbar.Button>
        <ListingToolbar.Button variant="ghost" onClick={() => console.log("schedule")}>
          Schedule
        </ListingToolbar.Button>
        <ListingToolbar.ViewToggle value={view} onChange={setView} />
      </ListingToolbar>
    );
  },
};

/** Live-list flavour: fully custom left block via Slot (proves Slot injection). */
export const WithCustomSlot = {
  render: () => (
    <ListingToolbar>
      <ListingToolbar.Slot>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#a855f7,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Radio size={18} color="#fff" />
        </div>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Live streams</div>
          <div style={{ color: "rgba(220,200,255,0.55)", fontSize: 12 }}>Your past broadcasts</div>
        </div>
      </ListingToolbar.Slot>
      <ListingToolbar.Spacer />
      <ListingToolbar.Search placeholder="Search streams" onCommit={() => {}} />
      <ListingToolbar.IconButton title="Refresh" onClick={() => console.log("refresh")}>
        <RefreshCw size={16} />
      </ListingToolbar.IconButton>
    </ListingToolbar>
  ),
};

/** Minimal: search only. */
export const Minimal = {
  render: () => (
    <ListingToolbar>
      <ListingToolbar.Search placeholder="Search galleries..." onCommit={() => {}} />
    </ListingToolbar>
  ),
};

/** Everything at once, order = render order. */
export const KitchenSink = {
  render: () => {
    const [scope, setScope] = useState("all");
    const [sort, setSort] = useState("newest");
    const [view, setView] = useState("featured");
    return (
      <ListingToolbar sticky>
        <ListingToolbar.Slot>
          <span style={{ color: "#fff", fontWeight: 700 }}>Groups</span>
        </ListingToolbar.Slot>
        <ListingToolbar.Search placeholder="Search Groups" onCommit={() => {}} />
        <ListingToolbar.Spacer />
        <ListingToolbar.Select ariaLabel="Scope" value={scope} options={GROUP_SCOPES} onChange={setScope} />
        <ListingToolbar.Select ariaLabel="Sort" icon={SlidersHorizontal} value={sort} options={GROUP_SORTS} onChange={setSort} />
        <ListingToolbar.Button onClick={() => {}}>Create Group</ListingToolbar.Button>
        <ListingToolbar.IconButton title="More">
          <MoreVertical size={16} />
        </ListingToolbar.IconButton>
        <ListingToolbar.ViewToggle value={view} onChange={setView} persistKey="storybook-demo" />
      </ListingToolbar>
    );
  },
};

/** ViewToggle persistence demo: reload the story — the mode is restored. */
export const PersistedViewToggle = {
  render: () => {
    const [view, setView] = useState("standard");
    return (
      <ListingToolbar>
        <ListingToolbar.Slot>
          <span style={{ color: "rgba(220,200,255,0.7)", fontSize: 13 }}>
            current: <strong style={{ color: "#fff" }}>{view}</strong> (persisted — survives reload)
          </span>
        </ListingToolbar.Slot>
        <ListingToolbar.Spacer />
        <ListingToolbar.ViewToggle value={view} onChange={setView} persistKey="persist-demo" />
      </ListingToolbar>
    );
  },
};

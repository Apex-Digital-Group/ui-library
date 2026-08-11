import * as React from "react";
import {
  FavTabs,
  FavSectionHeader,
  FavProfileCard,
  FavAlbumCard,
  FavVideoCard,
  FavPostCard,
  FavEmptyState,
} from "./Favourites";

const IMG = "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=720";
const IMG2 = "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=720";
const AVATAR = "https://i.pravatar.cc/80?img=5";
const noop = () => {};

const DarkBg = (Story) => (
  <div style={{ background: "linear-gradient(180deg, #22123a 0%, #150d24 100%)", padding: 24, minHeight: 400 }}>
    <Story />
  </div>
);

export default {
  title: "Components/Favourites",
  tags: ["autodocs"],
  decorators: [DarkBg],
};

export const Tabs = {
  render: () => {
    const [active, setActive] = React.useState("all");
    return (
      <FavTabs
        items={[
          { key: "all", label: "All", count: 9 },
          { key: "post", label: "Posts", count: 3 },
          { key: "video", label: "Videos", count: 1 },
          { key: "album", label: "Albums", count: 2 },
          { key: "user", label: "Profiles", count: 3 },
        ]}
        active={active}
        onChange={setActive}
      />
    );
  },
};

export const ProfileSection = {
  render: () => (
    <div>
      <FavSectionHeader title="Profiles" count={3} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 270px), 1fr))", gap: 16 }}>
        <FavProfileCard name="Sassy-Gal" avatarUrl={AVATAR} coverUrl={IMG} isLive
          subscribersText="12.4k subscribers" onView={noop} onRemove={noop} />
        <FavProfileCard name="KirstenBurke" avatarUrl={AVATAR} coverUrl={IMG2}
          subscribersText="8.1k subscribers" onView={noop} onRemove={noop} />
      </div>
    </div>
  ),
};

export const AlbumAndVideo = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 270px), 1fr))", gap: 16 }}>
      <FavAlbumCard title="Me and my friends" coverUrl={IMG} photoCountText="24 photos"
        authorName="HeatherAlvarez" savedAtText="Saved 3 Aug" onOpen={noop} onRemove={noop} />
      <FavAlbumCard title="Premium set" coverUrl={IMG2} photoCountText="12 photos" premium
        authorName="EmilyMays" savedAtText="Saved 28 Jul" onOpen={noop} onRemove={noop} />
      <FavVideoCard title="Me Posing Seductively in a Bedroom" thumbUrl={IMG}
        durationText="7:24" authorName="EmilyMays" onOpen={noop} onRemove={noop} />
    </div>
  ),
};

export const Posts = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 16 }}>
      <FavPostCard authorName="Nova-Lane" authorAvatarUrl={AVATAR} timeAgoText="4 months ago"
        body="I felt like dressing up, putting music on, and filming something playful. Subscribers are getting the bolder version first."
        tags={["Collars", "Ice Play", "Lingerie"]} reactionCount={4} commentCount={3}
        onOpen={noop} onRemove={noop} />
      <FavPostCard authorName="EmilyMays" authorAvatarUrl={AVATAR} timeAgoText="1 week ago"
        body="Like my new bikini??" reactionCount={2} commentCount={0}
        onOpen={noop} onRemove={noop} />
    </div>
  ),
};

export const Empty = {
  render: () => <FavEmptyState ctaLabel="Browse creators" onCta={noop} />,
};

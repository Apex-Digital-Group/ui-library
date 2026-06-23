import * as React from "react";
import PostCard from "./PostCard";

const IMG = "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=720";
const IMG2 = "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=720";
const AVATAR = "https://i.pravatar.cc/80?img=5";
const noop = () => {};

const baseArgs = {
  author: { name: "crystal_queen", picture: AVATAR, verified: true },
  timeText: "5m",
  caption: "Just went live! Come join me 💜👑 Link in bio!",
  media: [{ type: "image", url: IMG }],
  liked: false,
  likesText: "Liked by bella_bombshell and 89 others",
  onOpenLikes: noop,
  onToggleLike: noop,
  onReact: noop,
  onToggleSave: noop,
  share: { onShare: noop },
  comments: { count: 12, visible: false, onToggle: noop, canComment: true, value: "", onChange: noop, onSubmit: noop },
  menuItems: [
    { key: "save", label: "❤️ Save", onClick: noop },
    { key: "report", label: "🚩 Report Post", onClick: noop },
  ],
};

const DarkBg = (Story) => (
  <div style={{ background: "#160a2c", padding: 24, maxWidth: 470 }}>
    <Story />
  </div>
);

export default {
  title: "Components/Feed/PostCard",
  component: PostCard,
  tags: ["autodocs"],
  decorators: [DarkBg],
};

export const Default = { args: baseArgs };

export const Liked = { args: { ...baseArgs, liked: true, currentReaction: "like" } };

export const Reacted = { args: { ...baseArgs, liked: true, currentReaction: "love" } };

export const Video = {
  args: { ...baseArgs, media: [{ type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" }] },
};

export const Locked = {
  args: { ...baseArgs, locked: { isLocked: true, priceText: "50 Credits", onUnlock: noop } },
};

export const Gallery = {
  args: { ...baseArgs, media: [{ type: "image", url: IMG }, { type: "image", url: IMG2 }, { type: "image", url: AVATAR }] },
};

export const CommentsOpen = {
  render: (args) => {
    const [value, setValue] = React.useState("");
    const [visible, setVisible] = React.useState(true);
    return (
      <PostCard
        {...args}
        comments={{
          count: 2,
          visible,
          canComment: true,
          value,
          onChange: setValue,
          onSubmit: () => setValue(""),
          onToggle: () => setVisible((v) => !v),
          listSlot: (
            <div style={{ color: "#fff", fontSize: 14, display: "grid", gap: 6 }}>
              <div><b>Fan123</b> Amazing! 😍 <span style={{ color: "rgba(255,255,255,0.4)" }}>1h</span></div>
              <div><b>Viewer456</b> So beautiful ✨ <span style={{ color: "rgba(255,255,255,0.4)" }}>2h</span></div>
            </div>
          ),
        }}
      />
    );
  },
  args: baseArgs,
};

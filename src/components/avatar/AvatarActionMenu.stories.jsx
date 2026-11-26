import * as React from "react";
import { Eye, Camera, ImagePlus } from "lucide-react";
import { AvatarActionMenu } from "./AvatarActionMenu";

const log = (what) => () => console.info(`[AvatarActionMenu] ${what}`);

const ITEMS = [
  { key: "view", label: "View photo", icon: Eye, onSelect: log("view") },
  { key: "change", label: "Change profile picture", icon: Camera, onSelect: log("change") },
  { key: "story", label: "Add story", icon: ImagePlus, onSelect: log("story") },
];

const DarkSurface = (Story) => (
  <div style={{ padding: 48, background: "#1a0e2e", borderRadius: 18 }}>
    <Story />
  </div>
);

/** A dark circular avatar (overflow hidden, like the profile hero) with the
 * badge as a sibling, centred on the circle's 45° point: 14.65% in from the
 * right/bottom edge, minus half of the 44px hit area. */
function OnAvatarFrame({ avatarSize, ...args }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        aria-label="Open profile photo options"
        onClick={() => setOpen(true)}
        style={{
          display: "block",
          width: avatarSize,
          height: avatarSize,
          padding: 0,
          border: "4px solid rgba(255,255,255,0.12)",
          borderRadius: "50%",
          overflow: "hidden",
          cursor: "pointer",
          background: "linear-gradient(160deg, #4c1d95, #831843)",
        }}
      />
      <AvatarActionMenu
        {...args}
        open={open}
        onOpenChange={setOpen}
        className="bond-aam-story-pos"
      />
      <style>{`.bond-aam-story-pos{position:absolute;right:calc(14.65% - 22px);bottom:calc(14.65% - 22px);z-index:5}`}</style>
    </div>
  );
}

export default {
  title: "Components/AvatarActionMenu",
  component: AvatarActionMenu,
  tags: ["autodocs"],
  decorators: [DarkSurface],
  args: { items: ITEMS },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        component:
          "Round “+” badge for a profile avatar. Opens a dropdown on desktop and a bottom sheet on phones (below `mobileBreakpoint`). The visual badge is `size` px; the hit area is always 44×44. Set `ringColor` to the surface behind the avatar. Root and portalled menu carry `data-bond-avatar-menu` so consumers can ignore bubbled clicks.",
      },
    },
  },
};

export const Default = {};

export const NoPhoto = {
  args: {
    items: ITEMS.map((item) => (item.key === "view" ? { ...item, hidden: true } : item)),
  },
};

export const Mobile = {
  args: { mobileBreakpoint: 651 },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

export const OnAvatar = {
  render: (args) => <OnAvatarFrame avatarSize={176} {...args} />,
};

export const OnAvatarSmall = {
  render: (args) => <OnAvatarFrame avatarSize={108} {...args} />,
};

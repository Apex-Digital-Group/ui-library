import * as React from "react";
import { Eye, Camera, ImagePlus, Play } from "lucide-react";
import { StoryRing } from "./StoryRing";
import { AvatarActionMenu } from "../avatar/AvatarActionMenu";

const Avatar = ({ size = 176 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      overflow: "hidden",
      border: "3px solid rgba(255,255,255,0.15)",
      background: "linear-gradient(160deg, #4c1d95, #831843)",
    }}
  />
);

const ITEMS = [
  { key: "view-story", label: "View story", icon: Play, onSelect: () => {} },
  { key: "view", label: "View profile picture", icon: Eye, onSelect: () => {} },
  { key: "change", label: "Change profile picture", icon: Camera, onSelect: () => {} },
  { key: "story", label: "Add Story", icon: ImagePlus, onSelect: () => {} },
];

export default {
  title: "Components/StoryRing",
  component: StoryRing,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 48, background: "#1a0e2e", borderRadius: 18 }}><Story /></div>],
  args: { state: "new", thickness: 3, gap: 3 },
  argTypes: { state: { control: "inline-radio", options: ["new", "seen", "none"] } },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        component:
          "Live-story ring drawn outside a round avatar: gradient for unseen items (`new`), grey once all are viewed (`seen`), nothing for `none`. The gap is transparent and the ring ignores pointer events; the consumer owns the accessible control.",
      },
    },
  },
  render: (args) => (
    <StoryRing {...args}>
      <Avatar />
    </StoryRing>
  ),
};

export const New = {};
export const Seen = { args: { state: "seen" } };
export const None = { args: { state: "none" } };

/** The "+" photo-menu badge on the 45° point, as a sibling of the ring so it
 * is never clipped — at the profile hero's three avatar sizes. */
export const WithPlusBadge = {
  render: (args) => (
    <div style={{ display: "flex", gap: 48, alignItems: "flex-end" }}>
      {[176, 128, 108].map((size) => (
        <div key={size} style={{ position: "relative", display: "inline-block" }}>
          <StoryRing {...args}>
            <Avatar size={size} />
          </StoryRing>
          <AvatarActionMenu items={ITEMS} className="bond-story-ring-story-pos" />
        </div>
      ))}
      <style>{`.bond-story-ring-story-pos{position:absolute;right:calc(14.65% - 22px);bottom:calc(14.65% - 22px);z-index:5}`}</style>
    </div>
  ),
};

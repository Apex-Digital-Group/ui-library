import * as React from "react";
import { StoryCard } from "./StoryCard";

const SAMPLE =
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/5bbab6525_0a375a0a705a1f1052460dd069d2953f_erotic_576x324.jpeg";

const DarkBg = (Story) => (
  <div style={{ background: "#1a0e2e", padding: 24, borderRadius: 12 }}>
    <Story />
  </div>
);

export default {
  title: "Story/StoryCard",
  component: StoryCard,
  tags: ["autodocs"],
  decorators: [DarkBg],
  argTypes: {
    variant: { control: "select", options: ["story", "add"] },
    hasNew: { control: "boolean" },
    size: { control: { type: "number", min: 40, max: 128, step: 4 } },
    gapColor: { control: "color" },
    onClick: { action: "clicked" },
  },
};

export const New = {
  args: { image: SAMPLE, username: "ahri_official", hasNew: true },
};

export const Viewed = {
  args: { image: SAMPLE, username: "candy_crush", hasNew: false },
};

export const AddStory = {
  args: { variant: "add", image: SAMPLE, username: "you" },
};

export const LongName = {
  args: { image: SAMPLE, username: "very_long_username_that_truncates", hasNew: true },
};

export const Row = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <StoryCard variant="add" image={SAMPLE} />
      <StoryCard image={SAMPLE} username="ahri_official" hasNew />
      <StoryCard image={SAMPLE} username="candy_crush" hasNew />
      <StoryCard image={SAMPLE} username="lola_lollipop" />
      <StoryCard image={SAMPLE} username="vixen_vic" hasNew />
    </div>
  ),
};

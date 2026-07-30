import * as React from "react";
import CommentsSection from "./CommentsSection";

const noop = () => {};

const defaultComments = [
  {
    id: "1",
    author: { name: "Emily Mays" },
    createdAt: "4 months ago",
    message: "This looks great — really clean work.",
    reactionCounts: { like: 1, haha: 1 },
  },
  {
    id: "2",
    author: { name: "Emily Mays" },
    createdAt: "4 months ago",
    message: "Can we make the spacing a little tighter on mobile?",
    reactionCounts: { haha: 1 },
    replies: [
      {
        id: "2-1",
        author: { name: "Admin", verified: true },
        createdAt: "4 months ago",
        message: "Yes, I'll update the responsive spacing.",
        reactionCounts: { like: 1 },
        myReaction: "like",
      },
    ],
  },
];

export default {
  title: "Components/Feed/CommentsSection",
  component: CommentsSection,
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark", values: [{ name: "dark", value: "#090817" }] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "min(720px, calc(100vw - 32px))", padding: "32px 0" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export const Default = {
  args: {
    comments: defaultComments,
    onSubmit: (message) => console.log("submit comment", message),
    onReact: noop,
    onAuthorClick: noop,
    onSubmitReply: noop,
  },
};

export const Empty = {
  args: { ...Default.args, comments: [] },
};

export const SingleComment = {
  args: {
    ...Default.args,
    comments: [
      {
        id: "1",
        author: { name: "Aisha Khan" },
        createdAt: "2 minutes ago",
        message: "The new comments layout feels much easier to scan.",
        reactionCounts: { like: 4 },
      },
    ],
  },
};

export const WithLongConversation = {
  args: {
    ...Default.args,
    comments: [
      {
        id: "1",
        author: { name: "Emily Mays" },
        createdAt: "4 months ago",
        message:
          "This is a longer comment to demonstrate how the component handles wrapping, spacing, and readability across multiple lines without making the layout feel crowded.",
        reactionCounts: { like: 12, love: 3 },
        replies: [
          {
            id: "1-1",
            author: { name: "Admin", verified: true },
            createdAt: "4 months ago",
            message: "Thanks — we have tightened the mobile spacing as well.",
            reactionCounts: { like: 2 },
          },
        ],
      },
    ],
  },
};

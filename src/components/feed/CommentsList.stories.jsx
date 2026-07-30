import * as React from "react";
import CommentsList from "./CommentsList";

const AVATAR = "https://i.pravatar.cc/80?img=5";
const noop = () => {};

const baseComments = [
  {
    id: "1",
    author: { name: "Emily Mays", verified: false },
    createdAt: "4 months ago",
    message: "This looks great — really clean work.",
    reactionCounts: { like: 1, haha: 1 },
    myReaction: null,
  },
  {
    id: "2",
    author: { name: "Emily Mays" },
    createdAt: "4 months ago",
    message: "Can we make the spacing a little tighter on mobile?",
    reactionCounts: { haha: 1 },
    myReaction: null,
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

const DarkBg = (Story) => (
  <div style={{ background: "#160a2c", padding: 24, maxWidth: 620, borderRadius: 16 }}>
    <Story />
  </div>
);

export default {
  title: "Components/Feed/CommentsList",
  component: CommentsList,
  tags: ["autodocs"],
  decorators: [DarkBg],
};

export const Default = {
  args: {
    comments: baseComments,
    hasAuthSession: true,
    onReact: noop,
    onAuthorClick: noop,
    onSubmitReply: noop,
    onRequireAuth: noop,
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
        author: { name: "Aisha Khan", pictureUrl: AVATAR },
        createdAt: "2 minutes ago",
        message: "The new comments layout feels much easier to scan.",
        reactionCounts: { like: 4 },
        myReaction: "like",
      },
    ],
  },
};

export const WithLongConversationAndPagination = {
  args: {
    ...Default.args,
    initialVisibleCount: 1,
    comments: [
      {
        id: "1",
        author: { name: "Emily Mays", pictureUrl: AVATAR },
        createdAt: "4 months ago",
        message:
          "This is a longer comment to demonstrate how the component handles wrapping, spacing, and readability across multiple lines without making the layout feel crowded.",
        reactionCounts: { like: 12, love: 3 },
        myReaction: "love",
        replies: [
          {
            id: "1-1",
            author: { name: "Admin", verified: true },
            createdAt: "4 months ago",
            message: "Thanks — we've tightened the mobile spacing as well.",
            reactionCounts: { like: 2 },
          },
        ],
      },
      {
        id: "2",
        author: { name: "Nina Flores" },
        createdAt: "3 months ago",
        message: "Caught the live for a bit, please do more like this.",
        reactionCounts: {},
      },
      {
        id: "3",
        author: { name: "Chloe Reed" },
        createdAt: "3 months ago",
        message: "Need another subscriber gallery soon.",
        reactionCounts: { haha: 1, wow: 2 },
      },
    ],
  },
};

export const LoggedOut = {
  args: {
    ...Default.args,
    hasAuthSession: false,
    onRequireAuth: () => alert("Join free to react/reply"),
  },
};

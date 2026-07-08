import * as React from "react";
import SuggestedForYou from "./SuggestedForYou";

const img = (id) =>
  `https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/${id}_erotic_576x324.jpeg`;

const USERS = [
  { id: 1, username: "ruby_ravish", subtitle: "Followed by ahri_official", image: img("2ad34be5e_2df005f71d92610399c40e171ae816be") },
  { id: 2, username: "misty_mischief", subtitle: "Followed by candy_crush", image: img("1f40724e2_2db87992bb845f854f53fa8117d7cdb3") },
  { id: 3, username: "kiki_curves", subtitle: "Followed by sassy_sarah", image: img("accccad24_3cf988944d4f851aa9fb76a68682858c") },
  { id: 4, username: "scarlett_sin", subtitle: "Followed by vixen_victoria", image: img("efb8651b9_3d86f4a25c11d28c4f34674864e750c9") },
  { id: 5, username: "diva_diamond", subtitle: "Followed by bella_bomb", image: img("b945b2292_3e53c33383a0623d312d97afb9f7ed15") },
];

const Sidebar = (Story) => (
  <div style={{ background: "#160a2c", padding: 24, width: 320, borderRadius: 12 }}>
    <Story />
  </div>
);

export default {
  title: "Feed/SuggestedForYou",
  component: SuggestedForYou,
  tags: ["autodocs"],
  decorators: [Sidebar],
  argTypes: {
    onSeeAll: { action: "see-all" },
    onFollowToggle: { action: "follow-toggle" },
    onUserClick: { action: "user-click" },
    loading: { control: "boolean" },
  },
};

export const Default = {
  args: { users: USERS },
};

export const SomeFollowing = {
  args: {
    users: USERS.map((u, i) => (i % 2 === 0 ? { ...u, isFollowing: true } : u)),
  },
};

export const Busy = {
  args: { users: USERS.map((u, i) => (i === 1 ? { ...u, busy: true } : u)) },
};

export const Loading = {
  args: { users: [], loading: true },
};

export const Empty = {
  args: { users: [] },
};

/** Interactive: clicking Follow flips local state, like the host wiring does. */
export const Interactive = {
  render: () => {
    const [list, setList] = React.useState(USERS.map((u) => ({ ...u })));
    return (
      <SuggestedForYou
        users={list}
        onSeeAll={() => {}}
        onFollowToggle={(user) =>
          setList((prev) =>
            prev.map((u) => (u.id === user.id ? { ...u, isFollowing: !u.isFollowing } : u))
          )
        }
        onUserClick={() => {}}
      />
    );
  },
};

import * as React from "react";
import LeftNav from "./LeftNav";
import {
  Home, Clapperboard, MessageCircle, Search, Compass, Bell, PlusSquare, LayoutDashboard, User,
} from "lucide-react";

const Sidebar = (Story) => (
  <div style={{ background: "#160a2c", padding: 16, width: 260, borderRadius: 12 }}>
    <Story />
  </div>
);

export default {
  title: "Feed/LeftNav",
  component: LeftNav,
  tags: ["autodocs"],
  decorators: [Sidebar],
  argTypes: { onItemClick: { action: "item" } },
};

const items = [
  { key: "home", label: "Home", icon: <Home />, href: "/", active: true },
  { key: "reels", label: "Reels", icon: <Clapperboard /> }, // no destination -> inert
  { key: "messages", label: "Messages", icon: <MessageCircle />, href: "/account/message_board" },
  { key: "search", label: "Search", icon: <Search />, onClick: () => {} },
  { key: "explore", label: "Explore", icon: <Compass /> }, // no destination -> inert
  { key: "notifications", label: "Notifications", icon: <Bell />, href: "/all-notification", badge: 1 },
  { key: "create", label: "Create", icon: <PlusSquare />, onClick: () => {} },
  { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard />, href: "/model-dashboard" },
  { key: "profile", label: "Profile", icon: <User />, href: "/profile/me" },
];

export const Default = { args: { items } };

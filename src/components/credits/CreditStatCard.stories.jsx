import * as React from "react";
import { Image, Camera, Heart } from "lucide-react";
import CreditStatCard from "./CreditStatCard";

export default {
  title: "Credits/CreditStatCard",
  component: CreditStatCard,
  tags: ["autodocs"],
  decorators: [(S) => <div style={{ background: "#1a0e2e", padding: 24, maxWidth: 220 }}><S /></div>],
};

export const Photos = { args: { label: "Photos", amount: 30, icon: Image, color: "blue" } };
export const LiveCams = { args: { label: "Live Cams", amount: 105, icon: Camera, color: "red" } };
export const Tips = { args: { label: "Tips", amount: 40, icon: Heart, color: "pink" } };

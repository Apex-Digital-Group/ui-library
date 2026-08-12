import * as React from "react";
import { PurchaseStatCard, SubscriptionCard, PurchaseItemCard } from "./Purchases";

const IMG = "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=720";
const noop = () => {};

const DarkBg = (Story) => (
  <div style={{ background: "linear-gradient(180deg, #22123a 0%, #150d24 100%)", padding: 24 }}>
    <Story />
  </div>
);

export default {
  title: "Components/Purchases",
  tags: ["autodocs"],
  decorators: [DarkBg],
};

export const Stats = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
      <PurchaseStatCard label="Spent all time" value="14,860" suffix="credits" />
      <PurchaseStatCard label="Items owned" value="37" />
      <PurchaseStatCard label="Active subscriptions" value="3" />
      <PurchaseStatCard label="Credit balance" value="620" actionLabel="Top up" onAction={noop} highlight />
    </div>
  ),
};

export const Subscriptions = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 16 }}>
      <SubscriptionCard name="Aurora Vane" handle="@auroravane" tierText="Tier 2" status="active"
        statusText="Active" renewsLabel="RENEWS 3 SEP" priceText="25 credits / mo"
        actionLabel="Manage" onAction={noop} />
      <SubscriptionCard name="Nova Lane" handle="@novalane" tierText="Tier 1" status="ending"
        statusText="Ending" renewsLabel="ACCESS UNTIL 22 AUG" priceText="18 credits / mo"
        actionLabel="Resume" onAction={noop} />
    </div>
  ),
};

export const Items = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 460px), 1fr))", gap: 16 }}>
      <PurchaseItemCard title="Midnight Rooftop" thumbUrl={IMG} durationText="4:12"
        typeBadge="Custom clip" authorName="Aurora Vane" dateText="2 Aug 2026"
        priceText="120 credits" actions={[{ label: "Watch", onClick: noop, primary: true }]} onOpen={noop} />
      <PurchaseItemCard title="Beach Mornings — custom request" statusBadge="In progress"
        authorName="Mila Reyes" dateText="ordered 8 Aug 2026"
        note="Due in 2 days · she has accepted the brief" priceText="240 credits"
        actions={[{ label: "View order", onClick: noop }, { label: "Message", onClick: noop }]} />
      <PurchaseItemCard title="Studio Session — bundle" thumbUrl={IMG} countText="3 videos"
        authorName="Nova Lane" dateText="21 Jul 2026" priceText="210 credits"
        actions={[{ label: "Watch", onClick: noop, primary: true }]} onOpen={noop} />
      <PurchaseItemCard title="Summer Album" thumbUrl={IMG} countText="12 photos"
        authorName="Emily Mays" dateText="28 Jul 2026" priceText="60 credits"
        actions={[{ label: "View album", onClick: noop, primary: true }]} onOpen={noop} />
    </div>
  ),
};

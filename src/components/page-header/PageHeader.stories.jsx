import PageHeader from "./PageHeader";

export default {
  title: "Components/PageHeader",
  component: PageHeader,
  parameters: { backgrounds: { default: "dark" } },
};

const GhostBtn = ({ children }) => (
  <button
    type="button"
    style={{
      padding: "9px 16px", borderRadius: 12, cursor: "pointer",
      border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.05)",
      color: "#fff", fontWeight: 600, fontSize: 14,
    }}
  >
    {children}
  </button>
);

const PrimaryBtn = ({ children }) => (
  <button
    type="button"
    style={{
      padding: "9px 16px", borderRadius: 12, cursor: "pointer", border: 0,
      background: "linear-gradient(90deg, #8b45ff, #ff3d8a)",
      color: "#fff", fontWeight: 700, fontSize: 14,
    }}
  >
    {children}
  </button>
);

export const FeatureHero = {
  args: {
    title: "What do you want to feature?",
    subtitle: "Choose what to feature, pick the best date, and book the slot you want.",
    actions: (
      <>
        <GhostBtn>Analytics</GhostBtn>
        <GhostBtn>Manage Bookings</GhostBtn>
        <PrimaryBtn>Calendar View</PrimaryBtn>
      </>
    ),
  },
};

export const TitleOnly = {
  args: { title: "Favourites" },
};

export const MediumStandard = {
  args: {
    title: "Manage Group Members",
    subtitle: "Review approvals, monitor members, and quickly find the person you need.",
    size: "md",
  },
};

export const PlainNoCard = {
  args: {
    title: "My Custom Clip Orders",
    size: "md",
    plain: true,
  },
};

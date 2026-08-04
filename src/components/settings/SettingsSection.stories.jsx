import * as React from "react";
import { useState } from "react";
import SettingsSection, {
  SettingsRow, SettingsButton, SettingsActionChip, SettingsToggle, SettingsStepper, SettingsPillGroup,
} from "./SettingsSection";
import { PenSquare, Globe2, Eye, Lock, CreditCard, Bookmark, Phone, Camera, Trash2 } from "lucide-react";

const Page = (Story) => (
  <div style={{ background: "#17102b", padding: 24, maxWidth: 760 }}>
    <Story />
  </div>
);

export default {
  title: "Settings/SettingsSection",
  component: SettingsSection,
  tags: ["autodocs"],
  decorators: [Page],
  parameters: {
    docs: {
      description: {
        component:
          "Settings-page primitives per the Live Gemini Settings v3 mock: section card with gradient top edge, icon+copy+control rows, toggles/steppers/pill groups, and the COMING SOON placeholder recipe for rows whose backend doesn't exist yet.",
      },
    },
  },
};

/** The mock's Account & Profile section, fully interactive. */
export const AccountAndProfile = {
  render: () => {
    const [discovery, setDiscovery] = useState(true);
    const [lang, setLang] = useState("en");
    return (
      <SettingsSection title="Account & Profile" subtitle="Who you are on Live Gemini, and how you sign in.">
        <SettingsRow icon={<PenSquare size={18} />} title="Display name" description="The name fans see across the site."
          control={<input defaultValue="Aurora Vane" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 10, height: 36, padding: "0 12px", color: "#fff", fontSize: 14 }} />} />
        <SettingsRow icon={<Globe2 size={18} />} title="Language" description="Used for menus and notifications."
          control={<SettingsPillGroup ariaLabel="Language" value={lang} onChange={setLang}
            options={[{ value: "en", label: "English" }, { value: "es", label: "Español" }, { value: "fr", label: "Français" }]} />} />
        <SettingsRow icon={<Eye size={18} />} title="Show me in discovery" description="Appear in search, trending and category pages."
          control={<SettingsToggle ariaLabel="Show me in discovery" checked={discovery} onChange={setDiscovery} />} />
        <SettingsRow icon={<Lock size={18} />} title="Password" description="Last changed 4 months ago."
          control={<SettingsButton>Change password</SettingsButton>} />
      </SettingsSection>
    );
  },
};

/** Steppers as used by Earnings/Streaming rows. */
export const Steppers = {
  render: () => {
    const [price, setPrice] = useState(25);
    const [rate, setRate] = useState(12);
    return (
      <SettingsSection title="Streaming & Content" subtitle="What you broadcast, what you sell, and what it costs.">
        <SettingsRow icon={<CreditCard size={18} />} title="Monthly subscription price" description="What fans pay for your subscriber tier."
          control={<SettingsStepper ariaLabel="Subscription price" value={price} onChange={setPrice} min={1} max={500} prefix="$" suffix="/mo" />} />
        <SettingsRow icon={<Phone size={18} />} title="Video call rate" description="Charged per minute of one-to-one calls."
          control={<SettingsStepper ariaLabel="Call rate" value={rate} onChange={setRate} min={0} max={1000} suffix="cr/min" />} />
      </SettingsSection>
    );
  },
};

/** The placeholder recipe: backend-less rows render muted + COMING SOON. */
export const ComingSoonPlaceholders = {
  render: () => (
    <SettingsSection title="Earnings & Payments" subtitle="Credits in, payouts out, and the details behind both.">
      <SettingsRow icon={<CreditCard size={18} />} title="Payout method" description="Bank transfer, crypto, or e-wallet." comingSoon
        control={<SettingsButton>Manage</SettingsButton>} />
      <SettingsRow icon={<Camera size={18} />} title="Automatic weekly payout" description="Send everything above 500 credits each Friday." comingSoon
        control={<SettingsToggle ariaLabel="Automatic payout" checked={false} />} />
      <SettingsRow icon={<Bookmark size={18} />} title="Tax details" description="Required before your next payout clears." comingSoon
        chip={<SettingsActionChip />}
        control={<SettingsButton variant="primary">Complete</SettingsButton>} />
    </SettingsSection>
  ),
};

/** Danger row (delete account). */
export const DangerRow = {
  render: () => (
    <SettingsSection title="Privacy & Safety" subtitle="Who can reach you, and who can't.">
      <SettingsRow danger icon={<Trash2 size={18} />} title="Delete account" description="Removes your profile, videos and earnings history for good."
        control={<SettingsButton variant="danger">Delete</SettingsButton>} />
    </SettingsSection>
  ),
};

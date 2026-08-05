import * as React from "react";
import {
  SecurityScoreRing, SecurityStepCard, DeviceRow, ActivityRow, PasswordStrengthMeter,
} from "./Security";

export default {
  title: "Security/Checkup",
  parameters: { backgrounds: { default: "dark" } },
};

const dark = (children) => (
  <div style={{ maxWidth: 640, padding: 24, background: "#140a2e", borderRadius: 16 }}>{children}</div>
);

export const ScoreRing = () => dark(
  <div style={{ display: "flex", gap: 24 }}>
    <SecurityScoreRing value={5} total={5} />
    <SecurityScoreRing value={3} total={5} />
    <SecurityScoreRing value={1} total={5} />
  </div>
);

export const StepCards = () => dark(
  <>
    <SecurityStepCard index={1} title="Your devices" status="warn" statusLabel="Review">
      <DeviceRow device={{ device_name: "Chrome on macOS", device_type: "web", ip_address: "82.1.4.9", location: "London, GB", is_current: true, last_seen_label: "now" }} onRemove={() => {}} />
      <DeviceRow device={{ device_name: "Safari on iPhone", device_type: "mobile", ip_address: "31.9.2.1", location: "Manchester, GB", stale: true, last_seen_label: "4 months ago" }} onRemove={() => {}} />
    </SecurityStepCard>
    <SecurityStepCard index={2} title="Recent login activity" status="ok" statusLabel="Looks good">
      <ActivityRow event={{ type: "login", reason: "Signed in", at_label: "Today 09:12", location: "London, GB" }} />
      <ActivityRow event={{ type: "failed_login", reason: "Wrong password", at_label: "2 Aug", location: "Frankfurt, DE" }} />
      <ActivityRow event={{ type: "password_change", reason: "Password changed", at_label: "21 Jun" }} />
    </SecurityStepCard>
  </>
);

export const PasswordMeter = () => {
  const [pw, setPw] = React.useState("");
  return dark(
    <div>
      <input value={pw} onChange={(e) => setPw(e.target.value)} placeholder="type a password"
        style={{ width: "100%", height: 42, borderRadius: 10, padding: "0 12px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", color: "#fff" }} />
      <PasswordStrengthMeter password={pw} email="dolphin22blue@example.com" />
    </div>
  );
};

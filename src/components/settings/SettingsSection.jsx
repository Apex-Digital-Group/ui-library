import * as React from "react";
import "./Settings.css";

/**
 * Settings primitives (Live Gemini Settings v3 mock). A page composes:
 *
 *   <SettingsSection id="account" title="Account & Profile" subtitle="…">
 *     <SettingsSection.Row icon={<Pen/>} title="Display name" description="…"
 *                          control={<input …/>} />
 *     <SettingsSection.Row … comingSoon control={<SettingsToggle …/>} />
 *     <SettingsSection.Row danger … control={<SettingsSection.Button variant="danger">Delete</SettingsSection.Button>} />
 *   </SettingsSection>
 *
 * `comingSoon` renders the full row with the control muted + a cyan
 * COMING SOON chip — the placeholder recipe for features whose backend
 * doesn't exist yet (flip the prop off when it lands).
 */
export function SettingsSection({ id, title, subtitle, children, className = "" }) {
  return (
    <section id={id} className={`bond-set-section ${className}`.trim()}>
      <h2 className="bond-set-section__title">{title}</h2>
      {subtitle ? <p className="bond-set-section__subtitle">{subtitle}</p> : null}
      {children}
    </section>
  );
}

export function SettingsRow({ icon, title, description, control, comingSoon = false, danger = false, chip = null, className = "" }) {
  const cls = [
    "bond-set-row",
    comingSoon ? "bond-set-row--soon" : "",
    danger ? "bond-set-row--danger" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {icon ? <div className="bond-set-row__icon">{icon}</div> : null}
      <div className="bond-set-row__copy">
        <h3 className="bond-set-row__title">
          {title}
          {comingSoon ? <span className="bond-set-chip-soon">Coming soon</span> : null}
          {chip}
        </h3>
        {description ? <p className="bond-set-row__desc">{description}</p> : null}
      </div>
      <div className="bond-set-row__control">{control}</div>
    </div>
  );
}

/** 36px pill button/link. `variant`: "ghost" | "primary" | "danger". */
export function SettingsButton({ variant = "ghost", as: Comp = "button", className = "", children, ...rest }) {
  const cls = `bond-set-btn${variant !== "ghost" ? ` bond-set-btn--${variant}` : ""} ${className}`.trim();
  const extra = Comp === "button" ? { type: "button" } : {};
  return (
    <Comp className={cls} {...extra} {...rest}>
      {children}
    </Comp>
  );
}

/** Chip for rows needing attention (mock's "Action needed"). */
export function SettingsActionChip({ children = "Action needed" }) {
  return <span className="bond-set-chip-action">{children}</span>;
}

export function SettingsToggle({ checked, onChange, disabled = false, ariaLabel = "Toggle" }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      className="bond-set-toggle"
      onClick={() => !disabled && onChange && onChange(!checked)}
    />
  );
}

/** − value + stepper. Controlled; clamps to [min, max]. */
export function SettingsStepper({ value, onChange, min = 0, max = Infinity, step = 1, prefix = "", suffix = "", ariaLabel = "Value" }) {
  const set = (v) => {
    const next = Math.min(max, Math.max(min, v));
    if (next !== value && onChange) onChange(next);
  };
  return (
    <div className="bond-set-stepper" role="group" aria-label={ariaLabel}>
      <button type="button" className="bond-set-stepper__btn" aria-label="Decrease" disabled={value <= min} onClick={() => set(value - step)}>−</button>
      <span className="bond-set-stepper__value">
        {prefix}{value}
        {suffix ? <small>{suffix}</small> : null}
      </span>
      <button type="button" className="bond-set-stepper__btn" aria-label="Increase" disabled={value >= max} onClick={() => set(value + step)}>+</button>
    </div>
  );
}

/** Exclusive pill group (mock's language selector). */
export function SettingsPillGroup({ options = [], value, onChange, ariaLabel = "Options" }) {
  return (
    <div className="bond-set-pills" role="group" aria-label={ariaLabel}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={o.value === value}
          className="bond-set-pills__pill"
          onClick={() => onChange && onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

SettingsSection.Row = SettingsRow;
SettingsSection.Button = SettingsButton;
SettingsSection.ActionChip = SettingsActionChip;
SettingsSection.Toggle = SettingsToggle;
SettingsSection.Stepper = SettingsStepper;
SettingsSection.PillGroup = SettingsPillGroup;

export default SettingsSection;

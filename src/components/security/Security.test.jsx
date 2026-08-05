import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  scorePassword, PasswordStrengthMeter, SecurityScoreRing,
  SecurityStepCard, DeviceRow, ActivityRow,
} from "./Security";

describe("scorePassword", () => {
  it("empty password scores 0 with no label", () => {
    expect(scorePassword("")).toEqual({ score: 0, label: "", checks: {} });
  });

  it("short password is capped weak", () => {
    const r = scorePassword("Ab1!");
    expect(r.score).toBeLessThanOrEqual(1);
  });

  it("a long mixed password scores strong", () => {
    const r = scorePassword("Str0ngNewP@ssw0rd!");
    expect(r.score).toBe(4);
    expect(r.label).toBe("Strong");
  });

  it("penalises a password containing the email local part", () => {
    const plain = scorePassword("Dolphin22Blue!");
    const personal = scorePassword("Dolphin22Blue!", { email: "dolphin22blue@example.com" });
    expect(personal.looksPersonal).toBe(true);
    expect(personal.score).toBeLessThan(plain.score);
  });

  it("reports individual checks", () => {
    const r = scorePassword("abcdEF12!x");
    expect(r.checks.upper).toBe(true);
    expect(r.checks.digit).toBe(true);
    expect(r.checks.symbol).toBe(true);
    expect(r.checks.length).toBe(true);
  });
});

describe("PasswordStrengthMeter", () => {
  it("hides label until a password is typed", () => {
    const { container, rerender } = render(<PasswordStrengthMeter password="" />);
    expect(container.querySelector(".bond-sec-meter__label")).toBeNull();
    rerender(<PasswordStrengthMeter password="Str0ngNewP@ssw0rd!" />);
    expect(screen.getByText("Strong")).toBeTruthy();
  });
});

describe("SecurityScoreRing", () => {
  it("renders value/total", () => {
    render(<SecurityScoreRing value={3} total={5} />);
    expect(screen.getByText("3/5")).toBeTruthy();
  });
});

describe("SecurityStepCard", () => {
  it("renders step eyebrow, title, status chip and children", () => {
    render(
      <SecurityStepCard index={1} title="Your devices" status="warn" statusLabel="Review">
        <span>body</span>
      </SecurityStepCard>
    );
    expect(screen.getByText("Step 1")).toBeTruthy();
    expect(screen.getByText("Your devices")).toBeTruthy();
    expect(screen.getByText("Review")).toBeTruthy();
    expect(screen.getByText("body")).toBeTruthy();
  });
});

describe("DeviceRow", () => {
  it("shows name, This device badge, and fires onRemove", () => {
    const onRemove = vi.fn();
    render(<DeviceRow device={{ device_name: "Chrome on macOS", is_current: true, ip_address: "8.8.8.8" }} onRemove={onRemove} />);
    expect(screen.getByText("Chrome on macOS")).toBeTruthy();
    expect(screen.getByText("This device")).toBeTruthy();
    fireEvent.click(screen.getByText("Remove"));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});

describe("ActivityRow", () => {
  it("renders event reason", () => {
    render(<ActivityRow event={{ type: "failed_login", reason: "Wrong password", ip: "1.2.3.4" }} />);
    expect(screen.getByText("Wrong password")).toBeTruthy();
  });
});

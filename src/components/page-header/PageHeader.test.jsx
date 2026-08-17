import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PageHeader from "./PageHeader";

describe("PageHeader", () => {
  it("renders the title as an H1 (LG-347)", () => {
    render(<PageHeader title="What do you want to feature?" />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("What do you want to feature?");
    expect(h1.tagName).toBe("H1");
  });

  it("renders subtitle and actions slots when given", () => {
    render(
      <PageHeader
        title="T"
        subtitle="the sub line"
        actions={<button type="button">Calendar View</button>}
      />
    );
    expect(screen.getByText("the sub line")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Calendar View" })).toBeInTheDocument();
  });

  it("omits subtitle and actions containers when absent", () => {
    const { container } = render(<PageHeader title="T" />);
    expect(container.querySelector(".bond-page-header__subtitle")).toBeNull();
    expect(container.querySelector(".bond-page-header__actions")).toBeNull();
  });

  it("applies size and plain modifiers", () => {
    const { container, rerender } = render(<PageHeader title="T" />);
    expect(container.firstChild.className).toContain("bond-page-header--lg");
    rerender(<PageHeader title="T" size="md" plain />);
    expect(container.firstChild.className).toContain("bond-page-header--md");
    expect(container.firstChild.className).toContain("bond-page-header--plain");
  });

  it("keeps exactly one H1 regardless of slots", () => {
    render(
      <PageHeader title="Main" subtitle="s" actions={<span>x</span>}>
        <div>extra</div>
      </PageHeader>
    );
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});

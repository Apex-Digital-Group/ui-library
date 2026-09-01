import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ListingPageHeader from "./ListingPageHeader";
import ListingToolbar from "../listing/ListingToolbar";

describe("ListingPageHeader", () => {
  it("renders the H1 title, subtitle and toolbar children", () => {
    render(
      <ListingPageHeader title="Videos" subtitle="All the videos.">
        <ListingToolbar.Search placeholder="Search Videos" onCommit={vi.fn()} />
      </ListingPageHeader>
    );
    expect(screen.getByRole("heading", { level: 1, name: "Videos" })).toBeInTheDocument();
    expect(screen.getByText("All the videos.")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search Videos")).toBeInTheDocument();
  });

  it("embeds the toolbar without its standalone shell chrome", () => {
    const { container } = render(
      <ListingPageHeader title="Videos">
        <ListingToolbar.Search placeholder="s" onCommit={vi.fn()} />
      </ListingPageHeader>
    );
    const toolbar = container.querySelector(".bond-ltb");
    expect(toolbar).not.toBeNull();
    expect(toolbar.classList.contains("bond-ltb--embedded")).toBe(true);
  });

  it("renders no toolbar wrapper when there are no children", () => {
    const { container } = render(<ListingPageHeader title="Stories" />);
    expect(container.querySelector(".bond-ltb")).toBeNull();
  });
});

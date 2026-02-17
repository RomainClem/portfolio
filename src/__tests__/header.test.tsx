import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Header } from "@/components/layout/Header";

// Mock the virtual module
vi.mock("virtual:markdown-pages", () => ({
  pages: [
    { routePath: "/", slug: "index", load: vi.fn() },
    { routePath: "/about", slug: "about", load: vi.fn() },
    { routePath: "/posts/hello-world", slug: "hello-world", load: vi.fn() },
  ],
}));

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
}

describe("Header", () => {
  it("renders the logo link to home", () => {
    renderHeader();
    const logo = screen.getByText("RC");
    expect(logo).toBeInTheDocument();
    expect(logo.closest("a")).toHaveAttribute("href", "/");
  });

  it("renders nav links for non-index pages", () => {
    renderHeader();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("does not render a nav link for the index page", () => {
    renderHeader();
    // "Index" should not appear as a nav item
    expect(screen.queryByText("Index")).not.toBeInTheDocument();
  });

  it("nav links point to correct routes", () => {
    renderHeader();
    const aboutLink = screen.getByText("About");
    expect(aboutLink.closest("a")).toHaveAttribute("href", "/about");

    const helloLink = screen.getByText("Hello World");
    expect(helloLink.closest("a")).toHaveAttribute("href", "/posts/hello-world");
  });
});

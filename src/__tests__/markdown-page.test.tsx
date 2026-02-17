import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { MarkdownPage } from "@/components/pages/MarkdownPage";

// Mock the virtual module
vi.mock("virtual:markdown-pages", () => ({
  pages: [
    {
      routePath: "/",
      slug: "index",
      load: () => Promise.resolve({ default: "# Home\n\nWelcome home." }),
    },
    {
      routePath: "/about",
      slug: "about",
      load: () => Promise.resolve({ default: "# About\n\nAbout page." }),
    },
    {
      routePath: "/posts/hello-world",
      slug: "hello-world",
      load: () =>
        Promise.resolve({ default: "# Hello World\n\nFirst post." }),
    },
  ],
}));

// Mock the Markdown component to avoid Shiki initialization in tests
vi.mock("@/components/ui/Markdown", () => ({
  Markdown: ({ content, className }: { content: string; className?: string }) => (
    <div className={className} data-testid="markdown-content">
      {content}
    </div>
  ),
}));

function renderWithRouter(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="*" element={<MarkdownPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("MarkdownPage routing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the index page at /", async () => {
    renderWithRouter("/");
    await waitFor(() => {
      expect(screen.getByTestId("markdown-content")).toHaveTextContent(
        "# Home"
      );
    });
  });

  it("renders the about page at /about", async () => {
    renderWithRouter("/about");
    await waitFor(() => {
      expect(screen.getByTestId("markdown-content")).toHaveTextContent(
        "# About"
      );
    });
  });

  it("renders a nested post at /posts/hello-world", async () => {
    renderWithRouter("/posts/hello-world");
    await waitFor(() => {
      expect(screen.getByTestId("markdown-content")).toHaveTextContent(
        "# Hello World"
      );
    });
  });

  it("shows 404 for non-existent routes", async () => {
    renderWithRouter("/non-existent");
    await waitFor(() => {
      expect(screen.getByText("404")).toBeInTheDocument();
      expect(screen.getByText("Page not found.")).toBeInTheDocument();
    });
  });
});

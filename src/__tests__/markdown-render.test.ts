import { describe, it, expect } from "vitest";
import { renderMarkdown } from "@/components/ui/Markdown";

describe("renderMarkdown", () => {
  it("renders a heading", async () => {
    const html = await renderMarkdown("# Hello World");
    expect(html).toContain("<h1>");
    expect(html).toContain("Hello World");
    expect(html).toContain("</h1>");
  });

  it("renders paragraphs", async () => {
    const html = await renderMarkdown("This is a paragraph.");
    expect(html).toContain("<p>");
    expect(html).toContain("This is a paragraph.");
  });

  it("renders bold text", async () => {
    const html = await renderMarkdown("This is **bold** text.");
    expect(html).toContain("<strong>bold</strong>");
  });

  it("renders italic text", async () => {
    const html = await renderMarkdown("This is *italic* text.");
    expect(html).toContain("<em>italic</em>");
  });

  it("renders links", async () => {
    const html = await renderMarkdown("[Link](https://example.com)");
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain("Link");
  });

  it("adds target=_blank to external links", async () => {
    const html = await renderMarkdown("[Ext](https://example.com)");
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("adds target=_blank to mailto links", async () => {
    const html = await renderMarkdown("[Email](mailto:hi@example.com)");
    expect(html).toContain('target="_blank"');
  });

  it("does NOT add target=_blank to internal links", async () => {
    const html = await renderMarkdown("[Home](/)");
    expect(html).not.toContain('target="_blank"');
    expect(html).toContain('href="/"');
  });

  it("renders horizontal rules", async () => {
    const html = await renderMarkdown("---");
    expect(html).toContain("<hr>");
  });

  it("renders unordered lists", async () => {
    const html = await renderMarkdown("- Item 1\n- Item 2");
    expect(html).toContain("<ul>");
    expect(html).toContain("<li>");
    expect(html).toContain("Item 1");
    expect(html).toContain("Item 2");
  });

  it("renders code blocks with shiki", async () => {
    const html = await renderMarkdown(
      '```typescript\nconst x = 1;\n```'
    );
    expect(html).toContain("<pre");
    // Shiki wraps code in a <pre> with a class or style
    expect(html).toContain("const");
  });

  it("renders inline code", async () => {
    const html = await renderMarkdown("Use `console.log` here");
    expect(html).toContain("<code>");
    expect(html).toContain("console.log");
  });

  it("renders blockquotes", async () => {
    const html = await renderMarkdown("> This is a quote");
    expect(html).toContain("<blockquote>");
    expect(html).toContain("This is a quote");
  });
});

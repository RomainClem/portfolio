import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import os from "os";
import { markdownPages } from "@/plugins/markdown-pages";
import type { Plugin, ResolvedConfig } from "vite";

function createTempPagesDir() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "md-pages-test-"));
  return tmpDir;
}

function getPlugin(pagesDir: string): Plugin {
  const plugin = markdownPages(pagesDir);
  // Simulate Vite calling configResolved
  const fakeConfig = { root: "/" } as ResolvedConfig;
  if (typeof plugin === "object" && "configResolved" in plugin) {
    (plugin.configResolved as (config: ResolvedConfig) => void)(fakeConfig);
  }
  return plugin;
}

describe("markdownPages Vite plugin", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = createTempPagesDir();
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("resolves the virtual module id", () => {
    const plugin = getPlugin(tmpDir);
    const resolved = (plugin as { resolveId: (id: string) => string | undefined }).resolveId(
      "virtual:markdown-pages"
    );
    expect(resolved).toBe("\0virtual:markdown-pages");
  });

  it("does not resolve other module ids", () => {
    const plugin = getPlugin(tmpDir);
    const resolved = (plugin as { resolveId: (id: string) => string | undefined }).resolveId(
      "some-other-module"
    );
    expect(resolved).toBeUndefined();
  });

  it("generates correct routes for index.md", () => {
    fs.writeFileSync(path.join(tmpDir, "index.md"), "# Home");
    const plugin = getPlugin(tmpDir);
    const code = (plugin as { load: (id: string) => string | undefined }).load(
      "\0virtual:markdown-pages"
    );
    expect(code).toBeDefined();
    expect(code).toContain('routePath: "/"');
    expect(code).toContain('slug: "index"');
  });

  it("generates correct routes for nested md files", () => {
    fs.mkdirSync(path.join(tmpDir, "posts"));
    fs.writeFileSync(path.join(tmpDir, "posts", "hello-world.md"), "# Hello");
    const plugin = getPlugin(tmpDir);
    const code = (plugin as { load: (id: string) => string | undefined }).load(
      "\0virtual:markdown-pages"
    );
    expect(code).toContain('routePath: "/posts/hello-world"');
    expect(code).toContain('slug: "hello-world"');
  });

  it("generates routes for multiple files", () => {
    fs.writeFileSync(path.join(tmpDir, "index.md"), "# Home");
    fs.writeFileSync(path.join(tmpDir, "about.md"), "# About");
    fs.mkdirSync(path.join(tmpDir, "posts"));
    fs.writeFileSync(path.join(tmpDir, "posts", "first.md"), "# First");
    const plugin = getPlugin(tmpDir);
    const code = (plugin as { load: (id: string) => string | undefined }).load(
      "\0virtual:markdown-pages"
    )!;
    expect(code).toContain('routePath: "/"');
    expect(code).toContain('routePath: "/about"');
    expect(code).toContain('routePath: "/posts/first"');
  });

  it("ignores non-md files", () => {
    fs.writeFileSync(path.join(tmpDir, "readme.txt"), "text");
    fs.writeFileSync(path.join(tmpDir, "index.md"), "# Home");
    const plugin = getPlugin(tmpDir);
    const code = (plugin as { load: (id: string) => string | undefined }).load(
      "\0virtual:markdown-pages"
    )!;
    expect(code).not.toContain("readme");
    expect(code).toContain("index");
  });

  it("handles empty pages directory", () => {
    const plugin = getPlugin(tmpDir);
    const code = (plugin as { load: (id: string) => string | undefined }).load(
      "\0virtual:markdown-pages"
    )!;
    expect(code).toBe("export const pages = [\n\n];\n");
  });

  it("handles non-existent pages directory gracefully", () => {
    const plugin = getPlugin("/non/existent/path");
    const code = (plugin as { load: (id: string) => string | undefined }).load(
      "\0virtual:markdown-pages"
    )!;
    expect(code).toBe("export const pages = [\n\n];\n");
  });

  it("generates load functions that reference ?raw imports", () => {
    fs.writeFileSync(path.join(tmpDir, "about.md"), "# About");
    const plugin = getPlugin(tmpDir);
    const code = (plugin as { load: (id: string) => string | undefined }).load(
      "\0virtual:markdown-pages"
    )!;
    expect(code).toContain("?raw");
    expect(code).toContain("import(");
  });
});

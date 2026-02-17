import fs from "fs";
import path from "path";
import type { Plugin, ResolvedConfig } from "vite";

const VIRTUAL_MODULE_ID = "virtual:markdown-pages";
const RESOLVED_VIRTUAL_MODULE_ID = "\0" + VIRTUAL_MODULE_ID;

export interface MarkdownPageMeta {
  slug: string;
  routePath: string;
  filePath: string;
}

/**
 * Vite plugin that scans the `pages/` directory for `.md` files
 * and exposes them as a virtual module with lazy-loaded route data.
 *
 * File mapping:
 *   pages/index.md       -> /
 *   pages/hero.md        -> /hero
 *   pages/posts/hello.md -> /posts/hello
 */
export function markdownPages(pagesDir = "pages"): Plugin {
  let resolvedPagesDir: string;
  let config: ResolvedConfig;

  function scanPages(): MarkdownPageMeta[] {
    const pages: MarkdownPageMeta[] = [];

    function walk(dir: string, prefix: string) {
      if (!fs.existsSync(dir)) return;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          walk(path.join(dir, entry.name), `${prefix}${entry.name}/`);
        } else if (entry.name.endsWith(".md")) {
          const slug = entry.name.replace(/\.md$/, "");
          const routePath =
            slug === "index" && prefix === ""
              ? "/"
              : `/${prefix}${slug}`.replace(/\/+/g, "/");
          pages.push({
            slug,
            routePath,
            filePath: path.join(dir, entry.name),
          });
        }
      }
    }

    walk(resolvedPagesDir, "");
    return pages;
  }

  return {
    name: "vite-plugin-markdown-pages",

    configResolved(resolvedConfig) {
      config = resolvedConfig;
      resolvedPagesDir = path.resolve(config.root, pagesDir);
    },

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        const pages = scanPages();

        // Generate code that exports route metadata + lazy content loaders
        const imports = pages
          .map(
            (p, i) =>
              `  { routePath: ${JSON.stringify(p.routePath)}, slug: ${JSON.stringify(p.slug)}, load: () => import(${JSON.stringify(p.filePath + "?raw")}) }`
          )
          .join(",\n");

        return `export const pages = [\n${imports}\n];\n`;
      }
    },

    configureServer(server) {
      // Watch the pages directory for changes and trigger HMR
      server.watcher.add(resolvedPagesDir);
      server.watcher.on("all", (event, filePath) => {
        if (filePath.startsWith(resolvedPagesDir) && filePath.endsWith(".md")) {
          const mod = server.moduleGraph.getModuleById(
            RESOLVED_VIRTUAL_MODULE_ID
          );
          if (mod) {
            server.moduleGraph.invalidateModule(mod);
            server.ws.send({ type: "full-reload" });
          }
        }
      });
    },
  };
}

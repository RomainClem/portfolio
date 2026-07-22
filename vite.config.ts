import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import mdx from "@mdx-js/rollup"
import remarkFrontmatter from "remark-frontmatter"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"
import remarkGfm from "remark-gfm"
import rehypeShiki from "@shikijs/rehype"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig(async ({ command }) => {
  const plugins = [
    // enforce: 'pre' ensures MDX transforms .mdx to JSX before React/Babel sees it
    { enforce: "pre" as const, ...mdx({
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkGfm,
      ],
      rehypePlugins: [
        [rehypeShiki, {
          // Dual themes: `light` is inlined as the default; `dark` is emitted as
          // CSS variables (--shiki-dark, --shiki-dark-bg, …) that index.css
          // activates under the .dark class at runtime.
          themes: {
            light: "vitesse-light",
            dark: "vitesse-dark",
          },
          defaultColor: "light",
          langs: ["typescript", "tsx", "javascript", "csharp", "python", "bash", "json", "css", "html"],
        }],
      ],
    })},
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    tailwindcss(),
  ]

  // Only load the Cloudflare plugin during build to avoid slow dev startup
  if (command === "build") {
    const { cloudflare } = await import("@cloudflare/vite-plugin")
    plugins.push(cloudflare())
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})

import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig(async ({ command }) => {
  const plugins = [react(), tailwindcss()]

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
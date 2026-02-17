import { defineConfig } from "vitest/config";
import path from "path";
import { markdownPages } from "./src/plugins/markdown-pages";

export default defineConfig({
  plugins: [markdownPages()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/__tests__/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
});

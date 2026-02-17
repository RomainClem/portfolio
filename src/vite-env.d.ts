/// <reference types="vite/client" />

declare module "*.md?raw" {
  const content: string;
  export default content;
}

declare module "virtual:markdown-pages" {
  export interface PageEntry {
    routePath: string;
    slug: string;
    load: () => Promise<{ default: string }>;
  }
  export const pages: PageEntry[];
}

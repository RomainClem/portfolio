import type { ComponentType } from "react"
import type {
  BlogFrontmatter,
  ExperienceFrontmatter,
  ProjectFrontmatter,
} from "@/types/content"

interface MDXModule<T = Record<string, unknown>> {
  default: ComponentType
  frontmatter: T
}

// --- Blog posts ---

const blogContentModules = import.meta.glob<MDXModule<BlogFrontmatter>>(
  "../content/blog/*.mdx",
  { eager: true }
)

export function getBlogPosts() {
  return Object.entries(blogContentModules)
    .map(([filepath, mod]) => {
      const slug = filepath.split("/").pop()!.replace(".mdx", "")
      return { slug, frontmatter: mod.frontmatter }
    })
    .filter((post) => post.frontmatter.published)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
}

export function getBlogPost(slug: string) {
  const key = `../content/blog/${slug}.mdx`
  const mod = blogContentModules[key]
  if (!mod) return null
  return { Component: mod.default, frontmatter: mod.frontmatter }
}

// --- Experience entries ---

const experienceModules = import.meta.glob<MDXModule<ExperienceFrontmatter>>(
  "../content/experience/*.mdx",
  { eager: true }
)

export function getExperienceEntries() {
  return Object.values(experienceModules)
    .map((mod) => ({
      Component: mod.default,
      frontmatter: mod.frontmatter,
    }))
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order)
}

// --- Project entries ---

const projectModules = import.meta.glob<MDXModule<ProjectFrontmatter>>(
  "../content/projects/*.mdx",
  { eager: true }
)

export function getProjectEntries() {
  return Object.values(projectModules)
    .map((mod) => ({
      Component: mod.default,
      frontmatter: mod.frontmatter,
    }))
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order)
}

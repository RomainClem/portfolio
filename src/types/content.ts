export interface BlogFrontmatter {
  title: string
  date: string
  summary: string
  tags: string[]
  published: boolean
}

export interface ExperienceFrontmatter {
  company: string
  position: string
  duration: string
  companyUrl: string
  technologies: string[]
  order: number
}

export interface ProjectFrontmatter {
  title: string
  description: string
  tags: string[]
  featured: boolean
  liveUrl?: string
  githubUrl?: string
  order: number
}

export interface HeroFrontmatter {
  name: string
  title: string
  tagline: string
}

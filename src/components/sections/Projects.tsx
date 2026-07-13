import { getProjectEntries } from "@/lib/content"
import { MdxContent } from "@/components/markdown/MdxContent"

export function Projects() {
  const entries = getProjectEntries()

  if (entries.length === 0) return null

  return (
    <section className="flex items-start justify-center px-4 py-16">
      <div className="max-w-2xl w-full space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading">
          Projects
        </h2>

        <div className="space-y-8">
          {entries.map(({ Component, frontmatter }) => (
            <div key={frontmatter.title} className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="font-medium">{frontmatter.title}</h3>
                <div className="flex gap-2">
                  {frontmatter.githubUrl && (
                    <a
                      href={frontmatter.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground underline decoration-dashed underline-offset-4 hover:text-foreground transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                  {frontmatter.liveUrl && (
                    <a
                      href={frontmatter.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground underline decoration-dashed underline-offset-4 hover:text-foreground transition-colors"
                    >
                      Live
                    </a>
                  )}
                </div>
              </div>

              <MdxContent className="text-sm [&_p]:text-muted-foreground">
                <Component />
              </MdxContent>

              <div className="flex gap-2 flex-wrap pt-1">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

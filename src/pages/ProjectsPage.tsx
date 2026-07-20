import { getProjectEntries } from "@/lib/content"
import { PageShell } from "@/components/layout"

export function ProjectsPage() {
  const projects = getProjectEntries()

  return (
    <PageShell
      title="Projects"
      tagline="Side projects, tools and experiments. All open source."
    >
      {/* TODO: the design shows two more entries, "shiplog" and "grid-life" — both
          flagged as placeholders in the handoff README. Add real projects as MDX
          files in src/content/projects/ when there is something to show. */}
      <div className="flex flex-col gap-11">
        {projects.map(({ frontmatter }, index) => (
          <article key={frontmatter.title} className="flex gap-6">
            <span className="w-8 shrink-0 pt-0.5 font-heading text-xl italic text-faint">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-baseline gap-3.5">
                <h3 className="font-heading text-2xl font-semibold">
                  {frontmatter.title}
                </h3>
                {frontmatter.githubUrl && (
                  <a
                    href={frontmatter.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-muted-foreground underline decoration-dashed underline-offset-4 transition-colors hover:text-foreground"
                  >
                    GitHub ↗
                  </a>
                )}
                {frontmatter.liveUrl && (
                  <a
                    href={frontmatter.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-muted-foreground underline decoration-dashed underline-offset-4 transition-colors hover:text-foreground"
                  >
                    Live ↗
                  </a>
                )}
              </div>
              <p className="text-[15px] leading-[1.6] text-muted-foreground">
                {frontmatter.description}
              </p>
              <span className="text-[13px] text-faint">
                {frontmatter.tags.join(" · ")}
              </span>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  )
}

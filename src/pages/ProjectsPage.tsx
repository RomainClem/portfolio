import { getProjectEntries } from "@/lib/content"

export function ProjectsPage() {
  const projects = getProjectEntries()

  return (
    <section className="flex justify-center px-6 pt-[140px] pb-[100px]">
      <div className="flex w-full max-w-[640px] flex-col gap-12">
        <div className="flex flex-col gap-2.5">
          <h1 className="font-heading text-[32px] leading-[1.1] font-semibold tracking-[-0.02em] sm:text-[44px]">
            Projects
          </h1>
          <p className="text-base text-muted-foreground">
            Side projects, tools and experiments. All open source.
          </p>
        </div>

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
      </div>
    </section>
  )
}

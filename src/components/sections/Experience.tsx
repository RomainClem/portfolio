import { getExperienceEntries } from "@/lib/content"
import { MdxContent } from "@/components/markdown/MdxContent"

export function Experience() {
  const entries = getExperienceEntries()

  if (entries.length === 0) return null

  return (
    <section className="flex items-start justify-center px-4 py-16">
      <div className="max-w-2xl w-full space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-heading">
          Experience
        </h2>

        <div className="space-y-8">
          {entries.map(({ Component, frontmatter }) => (
            <div key={frontmatter.company} className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div>
                  <h3 className="font-medium">{frontmatter.position}</h3>
                  <a
                    href={frontmatter.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm italic text-muted-foreground underline decoration-dashed underline-offset-4 hover:text-foreground transition-colors"
                  >
                    {frontmatter.company}
                  </a>
                </div>
                <span className="text-sm text-muted-foreground">
                  {frontmatter.duration}
                </span>
              </div>

              <MdxContent className="text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_p]:text-muted-foreground [&_li]:text-muted-foreground">
                <Component />
              </MdxContent>

              <div className="flex gap-2 flex-wrap pt-1">
                {frontmatter.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tech}
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

import { skills } from "@/data/config"
import { getExperienceEntries } from "@/lib/content"
import { PageShell } from "@/components/layout"
import { DashedLink } from "@/components/ui/DashedLink"

const skillGroups: Array<[string, string[]]> = [
  ["Languages", skills.languages],
  ["Frontend", skills.frontend],
  ["Backend", skills.backend],
  ["Tools", skills.tools],
]

export function AboutPage() {
  const entries = getExperienceEntries()

  return (
    <PageShell
      title="About"
      tagline={
        <>
          Paris → Cork → Dublin → Copenhagen. I studied computer science in
          Ireland and cut my teeth at{" "}
          <DashedLink name="Bank of America" url="https://www.bankofamerica.com" />,{" "}
          <DashedLink name="Huawei" url="https://www.huawei.com" /> and{" "}
          <DashedLink name="Trellix" url="https://www.trellix.com" /> (previously
          McAfee and FireEye) before moving to Denmark, where I've spent the
          past three years at{" "}
          <DashedLink name="Novo Nordisk Engineering" url="https://www.nne.com" />.
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-[28px] font-semibold">Skills</h2>
        <div className="grid grid-cols-[140px_1fr] gap-x-6 gap-y-2.5 text-[15px]">
          {skillGroups.map(([label, values]) => (
            <div key={label} className="contents">
              <span className="font-heading italic text-faint">{label}</span>
              <span className="text-muted-foreground">{values.join(", ")}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-7">
        <h2 className="font-heading text-[28px] font-semibold">Experience</h2>
        {entries.map(({ Component, frontmatter }) => (
          <div
            key={frontmatter.company}
            className="grid grid-cols-[150px_1fr] gap-x-6 gap-y-2"
          >
            <span className="pt-[3px] text-sm text-faint">
              {frontmatter.duration}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-[17px] font-medium">{frontmatter.position}</h3>
              <a
                href={frontmatter.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start text-sm italic text-muted-foreground underline decoration-dashed underline-offset-4 transition-colors hover:text-foreground"
              >
                {frontmatter.company}
              </a>
              <div className="mt-0.5 text-sm leading-[1.6] text-muted-foreground [&_p]:m-0 [&_ul]:m-0 [&_ul]:list-none [&_ul]:p-0">
                <Component />
              </div>
            </div>
          </div>
        ))}
        {/* TODO: pre-2023 experience (Trellix, Huawei, Bank of America) — the
            durations and summaries in the design are unverified placeholders.
            Add real entries as MDX files in src/content/experience/ once verified. */}
      </div>
    </PageShell>
  )
}

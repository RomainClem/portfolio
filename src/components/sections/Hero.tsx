import HeroContent, { frontmatter } from "@/content/pages/hero.mdx"
import type { HeroFrontmatter } from "@/types/content"

const hero = frontmatter as unknown as HeroFrontmatter

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl space-y-6">
        {/* Name & Title */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading">
            {hero.name}
          </h1>
          <p className="text-sm sm:text-s italic text-muted-foreground">
            {hero.title}
          </p>
        </div>

        {/* Tagline */}
        <p className="text-muted-foreground leading-relaxed">
          {hero.tagline}
        </p>

        {/* MDX Content */}
        <div className="text-muted-foreground leading-relaxed [&_hr]:mx-12 [&_hr]:my-4 [&_p]:mb-1 [&_a]:italic [&_a]:font-medium [&_a]:underline [&_a]:decoration-dashed [&_a]:underline-offset-4 [&_a]:hover:text-foreground [&_a]:transition-colors">
          <HeroContent />
        </div>
      </div>
    </section>
  )
}

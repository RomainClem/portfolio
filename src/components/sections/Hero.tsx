import HeroContent, { frontmatter } from "@/content/pages/hero.mdx"
import type { HeroFrontmatter } from "@/types/content"

const hero = frontmatter as unknown as HeroFrontmatter

export function Hero() {
  return (
    <section className="box-border flex min-h-screen items-center justify-center px-6 pt-[120px] pb-[100px]">
      <div className="flex max-w-[640px] flex-col gap-[26px]">
        {/* Name & cédille line */}
        <div className="flex flex-col gap-3">
          <h1 className="font-heading text-[38px] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[58px]">
            {hero.name}
          </h1>
          <p className="font-heading text-[17px] italic text-muted-foreground">
            {hero.title}
          </p>
        </div>

        {/* Tagline */}
        <p className="text-base leading-[1.65] text-muted-foreground">
          {hero.tagline}
        </p>

        {/* MDX content: intro paragraph, hr, contact block.
            hr margins add up with the 26px column gap to match the design (34px = 26 + 8);
            contact paragraphs sit flush at line-height 1.9, reading as one block. */}
        <div className="text-base text-muted-foreground [&_hr]:mx-12 [&_hr]:my-[34px] [&_p]:m-0 [&_p]:leading-[1.9] [&_p:first-of-type]:leading-[1.65]">
          <HeroContent />
        </div>
      </div>
    </section>
  )
}

import { useParams, Link } from "react-router"
import { getBlogPost } from "@/lib/content"
import { MdxContent } from "@/components/markdown/MdxContent"

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getBlogPost(slug) : null

  if (!post) {
    return (
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="space-y-4 text-center">
          <h1 className="font-heading text-2xl font-semibold">Post not found</h1>
          <Link
            to="/blog"
            className="font-heading text-[15px] italic text-muted-foreground underline decoration-dashed underline-offset-4 transition-colors hover:text-foreground"
          >
            &larr; Back to blog
          </Link>
        </div>
      </section>
    )
  }

  const { Component, frontmatter } = post

  return (
    <section className="flex justify-center px-6 pt-[140px] pb-[100px]">
      <div className="flex w-full max-w-[640px] flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-[32px] leading-[1.1] font-semibold tracking-[-0.02em] sm:text-[44px]">
            {frontmatter.title}
          </h1>
          <span className="font-heading text-sm italic text-faint">
            {[
              new Date(frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              ...frontmatter.tags,
            ].join(" · ")}
          </span>
        </div>

        <MdxContent>
          <Component />
        </MdxContent>

        <div>
          <Link
            to="/blog"
            className="inline-block font-heading text-[15px] italic text-muted-foreground underline decoration-dashed underline-offset-4 transition-colors hover:text-foreground"
          >
            &larr; Back to blog
          </Link>
        </div>
      </div>
    </section>
  )
}

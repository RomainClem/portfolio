import { useParams, Link } from "react-router"
import { getBlogPost } from "@/lib/content"
import { MdxContent } from "@/components/markdown/MdxContent"

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getBlogPost(slug) : null

  if (!post) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold font-heading">Post not found</h1>
          <Link
            to="/blog"
            className="text-sm text-muted-foreground underline decoration-dashed underline-offset-4 hover:text-foreground transition-colors"
          >
            &larr; Back to blog
          </Link>
        </div>
      </section>
    )
  }

  const { Component, frontmatter } = post

  return (
    <section className="min-h-screen flex items-start justify-center px-4 pt-24 pb-16">
      <div className="max-w-2xl w-full space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading">
            {frontmatter.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {new Date(frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="flex gap-2 flex-wrap">
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

        <MdxContent>
          <Component />
        </MdxContent>

        <Link
          to="/blog"
          className="inline-block text-sm text-muted-foreground underline decoration-dashed underline-offset-4 hover:text-foreground transition-colors"
        >
          &larr; Back to blog
        </Link>
      </div>
    </section>
  )
}

import { Link } from "react-router"
import { getBlogPosts } from "@/lib/content"

export function BlogListPage() {
  const posts = getBlogPosts()

  return (
    <section className="min-h-screen flex items-start justify-center px-4 pt-24 pb-16">
      <div className="max-w-2xl w-full space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading">
            Blog
          </h1>
          <p className="text-muted-foreground">
            Thoughts on software engineering, tools, and things I find interesting.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-muted-foreground italic">No posts yet.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.slug} className="space-y-1">
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-lg font-medium underline decoration-dashed underline-offset-4 hover:text-foreground transition-colors"
                >
                  {post.frontmatter.title}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-muted-foreground text-sm">
                  {post.frontmatter.summary}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {post.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}

        <Link
          to="/"
          className="inline-block text-sm text-muted-foreground underline decoration-dashed underline-offset-4 hover:text-foreground transition-colors"
        >
          &larr; Back home
        </Link>
      </div>
    </section>
  )
}

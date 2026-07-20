import { Link } from "react-router"
import { getBlogPosts } from "@/lib/content"
import { PageShell } from "@/components/layout"

export function BlogListPage() {
  const posts = getBlogPosts()

  return (
    <PageShell
      title="Blog"
      tagline="Thoughts on software engineering, tools, and things I find interesting."
    >
      {posts.length === 0 ? (
        <p className="italic text-muted-foreground">No posts yet.</p>
      ) : (
        <div className="flex flex-col gap-9">
          {posts.map((post) => (
            <article key={post.slug} className="flex flex-col items-start gap-1.5">
              <Link
                to={`/blog/${post.slug}`}
                className="font-heading text-2xl font-semibold underline decoration-dashed underline-offset-[5px] transition-colors hover:text-muted-foreground"
              >
                {post.frontmatter.title}
              </Link>
              <span className="font-heading text-sm italic text-faint">
                {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <p className="text-[15px] leading-[1.6] text-muted-foreground">
                {post.frontmatter.summary}
              </p>
              <span className="text-[13px] text-faint">
                {post.frontmatter.tags.join(" · ")}
              </span>
            </article>
          ))}
        </div>
      )}
    </PageShell>
  )
}

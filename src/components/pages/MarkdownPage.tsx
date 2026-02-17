import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Markdown } from "@/components/ui/Markdown";
import { pages } from "virtual:markdown-pages";

export function MarkdownPage() {
  const params = useParams();
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState(false);

  // Build the current route path from params
  const routePath = params["*"] ? `/${params["*"]}` : "/";

  useEffect(() => {
    setContent(null);
    setError(false);

    const page = pages.find((p) => p.routePath === routePath);
    if (!page) {
      setError(true);
      return;
    }

    page.load().then((mod) => {
      setContent(mod.default);
    });
  }, [routePath]);

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-3xl font-bold font-heading mb-4">404</h1>
          <p className="text-muted-foreground">Page not found.</p>
        </div>
      </section>
    );
  }

  if (content === null) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <Markdown content={content} />
      </div>
    </section>
  );
}

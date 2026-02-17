import { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";
import { fromHighlighter } from "@shikijs/markdown-it/core";

// Lazy-initialize a shared highlighter + markdown-it instance
let mdPromise: Promise<MarkdownIt> | null = null;

function getMd(): Promise<MarkdownIt> {
  if (!mdPromise) {
    mdPromise = (async () => {
      const highlighter = await createHighlighterCore({
        themes: [import("shiki/themes/github-dark.mjs")],
        langs: [
          import("shiki/langs/typescript.mjs"),
          import("shiki/langs/javascript.mjs"),
          import("shiki/langs/css.mjs"),
          import("shiki/langs/html.mjs"),
          import("shiki/langs/json.mjs"),
          import("shiki/langs/bash.mjs"),
          import("shiki/langs/python.mjs"),
          import("shiki/langs/csharp.mjs"),
        ],
        engine: createOnigurumaEngine(import("shiki/wasm")),
      });

      const md = MarkdownIt({ html: true, linkify: true });

      md.use(
        fromHighlighter(highlighter, {
          theme: "github-dark",
        })
      );

      // Make external links open in a new tab
      const defaultRender =
        md.renderer.rules.link_open ||
        function (tokens, idx, options, _env, self) {
          return self.renderToken(tokens, idx, options);
        };

      md.renderer.rules.link_open = function (
        tokens,
        idx,
        options,
        env,
        self
      ) {
        const href = tokens[idx].attrGet("href");
        if (href && (href.startsWith("http") || href.startsWith("mailto:"))) {
          tokens[idx].attrSet("target", "_blank");
          tokens[idx].attrSet("rel", "noopener noreferrer");
        }
        return defaultRender(tokens, idx, options, env, self);
      };

      return md;
    })();
  }
  return mdPromise;
}

/** Exported for testing – render markdown string to HTML */
export async function renderMarkdown(content: string): Promise<string> {
  const md = await getMd();
  return md.render(content);
}

interface MarkdownProps {
  /** Raw markdown string */
  content: string;
  /** Additional CSS classes for the wrapper */
  className?: string;
}

export function Markdown({ content, className = "" }: MarkdownProps) {
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    renderMarkdown(content).then((rendered) => {
      if (!cancelled) {
        setHtml(rendered);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [content]);

  if (loading) {
    return (
      <div className={`markdown-content ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

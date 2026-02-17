import { Link } from "react-router";
import { pages } from "virtual:markdown-pages";

export function Header() {
  // Build nav items from page manifest (exclude index — shown as logo link)
  const navItems = pages
    .filter((p) => p.routePath !== "/")
    .map((p) => ({
      label: p.slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      href: p.routePath,
    }));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-heading font-bold hover:text-foreground transition-colors"
        >
          RC
        </Link>
        {navItems.length > 0 && (
          <ul className="flex gap-6">
            {navItems.map(({ label, href }) => (
              <li key={href}>
                <Link
                  to={href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}

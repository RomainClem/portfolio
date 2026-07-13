import { Link, useLocation } from "react-router"

export function Header() {
  const { pathname } = useLocation()

  const links = [
    { to: "/", label: "Home" },
    { to: "/blog", label: "Blog" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-heading text-lg font-bold">
          RC
        </Link>
        <div className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm transition-colors hover:text-foreground ${
                pathname === link.to
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}

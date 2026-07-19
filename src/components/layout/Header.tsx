import { useState } from "react"
import type { CSSProperties } from "react"
import { Link, useLocation } from "react-router"

type Theme = "light" | "dark"

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
]

// Same cast trick as SquiggleFrame: SVG geometry via CSS so calc() works
const rectStyle = {
  stroke: "var(--faint)",
  x: "2px",
  y: "2px",
  width: "calc(100% - 4px)",
  height: "calc(100% - 4px)",
} as CSSProperties

function getInitialTheme(): Theme {
  // The inline script in index.html applies .dark before paint; mirror it here
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

export function Header() {
  const { pathname } = useLocation()
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark"
    document.documentElement.classList.toggle("dark", next === "dark")
    localStorage.setItem("theme", next)
    setTheme(next)
  }

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to)

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 py-6">
      <nav className="pointer-events-auto relative flex items-center gap-4 rounded-full bg-pill px-5 py-[11px] text-sm shadow-[0_2px_10px_rgba(0,0,0,0.07)] backdrop-blur-sm sm:gap-7 sm:px-[31px]">
        <span aria-hidden="true" className="pointer-events-none absolute inset-0">
          <svg width="100%" height="100%" className="block overflow-visible">
            <filter id="squiggle-nav" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.05"
                numOctaves="2"
                seed="4"
                result="noise"
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
            </filter>
            <rect
              fill="none"
              strokeWidth="1.2"
              rx="20"
              strokeDasharray="8 6"
              filter="url(#squiggle-nav)"
              style={rectStyle}
            />
          </svg>
        </span>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={
              isActive(link.to)
                ? "font-medium text-foreground"
                : "text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            {link.label}
          </Link>
        ))}
        <button
          type="button"
          onClick={toggleTheme}
          className="cursor-pointer p-0 font-heading text-sm italic text-faint transition-colors hover:text-foreground"
        >
          {theme === "dark" ? "light" : "dark"}
        </button>
      </nav>
    </header>
  )
}

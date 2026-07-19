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

// One torn edge + rotation per scrap (indices 0-3 = links, 4 = theme toggle);
// each polygon is a different irregular tear so no two scraps match.
const scraps = [
  {
    rotate: "-2deg",
    clipPath:
      "polygon(2% 8%, 12% 2%, 30% 5%, 47% 0%, 65% 4%, 82% 1%, 97% 7%, 100% 40%, 96% 68%, 99% 92%, 80% 98%, 60% 94%, 38% 100%, 18% 95%, 3% 98%, 0% 65%, 4% 35%)",
  },
  {
    rotate: "1.5deg",
    clipPath:
      "polygon(0% 12%, 15% 4%, 33% 0%, 52% 6%, 70% 2%, 88% 5%, 100% 10%, 97% 35%, 100% 62%, 96% 90%, 84% 100%, 63% 96%, 45% 99%, 26% 94%, 8% 100%, 2% 72%, 0% 40%)",
  },
  {
    rotate: "-1deg",
    clipPath:
      "polygon(3% 10%, 14% 0%, 35% 6%, 55% 2%, 74% 7%, 92% 0%, 100% 25%, 96% 50%, 100% 78%, 93% 97%, 72% 93%, 52% 100%, 30% 96%, 12% 99%, 0% 88%, 4% 55%, 1% 28%)",
  },
  {
    rotate: "2deg",
    clipPath:
      "polygon(1% 20%, 8% 3%, 28% 7%, 46% 1%, 66% 6%, 85% 2%, 98% 8%, 100% 34%, 95% 58%, 100% 85%, 87% 99%, 66% 95%, 47% 100%, 27% 97%, 9% 93%, 0% 70%, 3% 45%)",
  },
  {
    rotate: "-1.5deg",
    clipPath:
      "polygon(4% 6%, 18% 1%, 36% 7%, 57% 0%, 77% 5%, 94% 2%, 100% 30%, 96% 55%, 99% 80%, 91% 100%, 70% 94%, 50% 98%, 31% 93%, 13% 100%, 0% 92%, 3% 60%, 1% 30%)",
  },
]

const scrapStyle = (index: number) =>
  ({
    "--rot": scraps[index].rotate,
    clipPath: scraps[index].clipPath,
  }) as CSSProperties

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
      <nav className="pointer-events-auto flex items-center gap-[6px] sm:gap-[10px]">
        {links.map((link, index) => (
          <Link
            key={link.to}
            to={link.to}
            style={scrapStyle(index)}
            className={`scrap ${isActive(link.to) ? "scrap-active" : "scrap-idle"}`}
          >
            {link.label}
          </Link>
        ))}
        <button
          type="button"
          onClick={toggleTheme}
          style={scrapStyle(4)}
          className="scrap scrap-toggle"
        >
          {theme === "dark" ? "light" : "dark"}
        </button>
      </nav>
    </header>
  )
}

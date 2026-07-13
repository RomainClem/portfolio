import { socials } from "@/data/config"

export function Footer() {
  return (
    <footer className="relative z-10 border-t py-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <div className="flex justify-center gap-4 mb-2">
          {Object.values(socials).map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dashed underline-offset-4 hover:text-foreground transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

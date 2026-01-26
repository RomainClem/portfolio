import { Github, Linkedin, Mail } from "lucide-react";
import { personalInfo, socialLinks } from "@/data/portfolio";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl space-y-6">
        {/* Name & Title */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {personalInfo.name}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            {personalInfo.title}
          </p>
        </div>

        {/* Tagline */}
        <p className="text-muted-foreground leading-relaxed">
          {personalInfo.tagline}
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-4 pt-2">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
          <Button asChild variant="outline" size="sm">
            <a 
              href="/cv.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="View CV"
            >
              CV
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

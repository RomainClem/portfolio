import { personalInfo, companies, socials } from "@/data/portfolio";

// Helper component for links with dashed underline
function DashedLink({ name, url }: { name: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="italic font-medium underline decoration-dashed underline-offset-4 hover:text-foreground transition-colors"
    >
      {name}
    </a>
  );
}

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl space-y-6">
        {/* Name & Title */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {personalInfo.name}
          </h1>
          <p className="text-sm sm:text-s italic text-muted-foreground">
            {personalInfo.title}
          </p>
        </div>

        {/* Tagline */}
        <p className="text-muted-foreground leading-relaxed ">
          {personalInfo.tagline}
        </p>

        {/* Presentation with company links */}
        <p className="text-muted-foreground leading-relaxed ">
          I'm from Paris, France, and have lived in Ireland for 5 years where I
          studied computer science and worked as a software engineer for a few
          companies such as{" "}
          <DashedLink {...companies.bankOfAmerica} />,{" "}
          <DashedLink {...companies.huawei} /> and{" "}
          <DashedLink {...companies.trellix} /> (previously McAfee and
          FireEye). I currently live in Copenhagen, Denmark, where I've been working as a
          software engineer for the past 2 years for{" "}
          <DashedLink {...companies.novoNordisk} />.
        </p>
        <hr className="mx-12" />
        {/* Social Links */}
        <p className="text-muted-foreground leading-relaxed mb-0">Connect with me on <DashedLink {...socials.linkedin} /> or send me an email <DashedLink {...socials.mail} /></p>
        <p className="text-muted-foreground leading-relaxed mb-0">Find my side projects on <DashedLink {...socials.github} /></p>
        <p className="text-muted-foreground leading-relaxed mb-0">Have a look at my  <DashedLink {...socials.resume} /></p>

      </div>
    </section>
  );
}

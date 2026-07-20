import { socials } from "@/data/config"
import { DashedLink } from "@/components/ui/DashedLink"

export function HomePage() {
  return (
    <section className="box-border flex min-h-screen items-center justify-center px-6 pt-[120px] pb-[100px]">
      <div className="flex max-w-[640px] flex-col gap-[26px]">
        {/* Name & cédille line */}
        <div className="flex flex-col gap-3">
          <p className="postit relative z-10 -mb-[22px] -ml-1 self-start">
            Software Engineer · Copenhagen
          </p>
          <h1 className="font-heading text-[38px] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[58px]">
            Romain Clémençon
          </h1>
          <p className="font-heading text-[17px] italic text-muted-foreground">
            The French cédille (ç) is a hook under the letter 'c' that softens
            a hard /k/ into a soft /s/. It's the only thing standing between
            my name and total chaos.
          </p>
        </div>

        {/* Tagline */}
        <p className="text-base leading-[1.65] text-muted-foreground">
          Hey! I'm Romain, pronounced like the lettuce, spelled like the
          empire, mispronounced like everything else.
        </p>

        <div className="text-base text-muted-foreground">
          <p className="leading-[1.65]">
            I'm currently digitalizing engineering tools at{" "}
            <DashedLink name="Novo Nordisk Engineering" url="https://www.nne.com" />.
            Before that: a decade of building software across banking, fintech
            and security.
          </p>

          <hr className="mx-12 my-[34px]" />

          <p className="leading-[1.9]">
            Connect with me on <DashedLink {...socials.linkedin} /> or send me
            an email <DashedLink {...socials.mail} />
          </p>
          <p className="leading-[1.9]">
            Find my side projects on <DashedLink {...socials.github} />
          </p>
          <p className="leading-[1.9]">
            Have a look at my <DashedLink {...socials.resume} />
          </p>
        </div>
      </div>
    </section>
  )
}

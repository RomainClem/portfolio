import { socials } from "@/data/config"
import { DashedLink } from "@/components/ui/DashedLink"

export function HomePage() {
  return (
    <section className="box-border flex min-h-screen items-center justify-center px-6 pt-[120px] pb-[100px]">
      <div className="flex max-w-[640px] flex-col gap-[26px]">
        {/* Name & cédille line */}
        <div className="flex flex-col gap-3">
          <h1 className="font-heading text-[38px] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[58px]">
            Romain Clémençon
          </h1>
          <p className="font-heading text-[17px] italic text-muted-foreground">
            The French cédille (ç) is a hook under the letter 'c' that changes
            its pronunciation from a hard /k/ sound to a soft /s/ or you'll
            call me a Moron.
          </p>
        </div>

        {/* Tagline */}
        <p className="text-base leading-[1.65] text-muted-foreground">
          Hey! I'm Romain, a software engineer and you might have already
          called me a moron (cf. title).
        </p>

        <div className="text-base text-muted-foreground">
          <p className="leading-[1.65]">
            I'm from Paris, France, and have lived in Ireland for 5 years
            where I studied computer science and worked as a software engineer
            for a few companies such as{" "}
            <DashedLink name="Bank of America" url="https://www.bankofamerica.com" />,{" "}
            <DashedLink name="Huawei" url="https://www.huawei.com" /> and{" "}
            <DashedLink name="Trellix" url="https://www.trellix.com" />{" "}
            (previously McAfee and FireEye). I currently live in Copenhagen,
            Denmark, where I've been working as a software engineer for the
            past 2 years and a half for{" "}
            <DashedLink name="Novo Nordisk Engineering" url="https://www.nne.com" />.
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

import type { ReactNode } from "react"

export function PageShell({
  title,
  tagline,
  children,
}: {
  title: string
  tagline?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="flex justify-center px-6 pt-[140px] pb-[100px]">
      <div className="flex w-full max-w-[640px] flex-col gap-12">
        <div className="flex flex-col gap-2.5">
          <h1 className="font-heading text-[32px] leading-[1.1] font-semibold tracking-[-0.02em] sm:text-[44px]">
            {title}
          </h1>
          {tagline && (
            <p className="text-base leading-[1.65] text-muted-foreground">
              {tagline}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}

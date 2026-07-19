import type { ReactNode } from "react"

interface MdxContentProps {
  children: ReactNode
  className?: string
}

export function MdxContent({ children, className = "" }: MdxContentProps) {
  return (
    <article className={`prose max-w-none ${className}`}>
      {children}
    </article>
  )
}

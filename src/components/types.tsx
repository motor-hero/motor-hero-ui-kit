import type { ReactNode } from "react"

export interface RenderLinkProps {
  href: string
  className?: string
  children: ReactNode
  onClick?: () => void
  title?: string
  "aria-current"?: "page"
}

export type RenderLink = (props: RenderLinkProps) => ReactNode

export const defaultRenderLink: RenderLink = ({ children, ...props }) => (
  <a {...props}>{children}</a>
)

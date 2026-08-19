import { cn } from "@/lib/utils"

/** Page gutter and max width. Every section's content sits inside one of these. */
export function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn("container-page", className)}>{children}</div>
}

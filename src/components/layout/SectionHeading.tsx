import { cn } from "@/lib/utils"

/**
 * Eyebrows are rationed to at most one per three sections (see CLAUDE.md).
 * Most sections should pass a title alone.
 *
 * The title and description stack vertically. The "big headline left, small
 * explainer floating right" split header is deliberately not supported.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  align = "start",
  tone = "dark",
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  as?: "h1" | "h2" | "h3"
  align?: "start" | "center"
  tone?: "dark" | "light"
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow", tone === "light" && "text-sky-200")}>{eyebrow}</p>
      ) : null}

      <Tag
        className={cn(
          Tag === "h1"
            ? "text-[clamp(1.75rem,3.4vw,2.75rem)]"
            : "text-[clamp(1.5rem,2.6vw,2.125rem)]",
          tone === "light" && "text-white"
        )}
      >
        {title}
      </Tag>

      {description ? (
        <div
          className={cn(
            "measure text-[1.1875rem] leading-relaxed",
            tone === "light" ? "text-navy-100" : "text-ink-muted",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </div>
      ) : null}
    </div>
  )
}

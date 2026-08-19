import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

/**
 * Label above, control in the middle, error below. Never a placeholder used as
 * a label. The error owns its own id so the control can point at it with
 * aria-describedby, and it is announced when it appears.
 */
export function FormField({
  name,
  label,
  error,
  hint,
  optional = false,
  className,
  children,
}: {
  name: string
  label: string
  error?: string
  hint?: string
  optional?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={name}>
        {label}
        {optional ? (
          <span className="font-normal text-ink-muted">Optional</span>
        ) : null}
      </Label>

      {children}

      {hint ? (
        <p id={`${name}-hint`} className="text-[0.875rem] text-ink-muted">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={`${name}-error`}
          role="alert"
          className="text-[0.875rem] font-medium text-destructive"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}

/** Ties a control to its hint and error without emitting an empty attribute. */
export function describedBy(
  name: string,
  { error, hint }: { error?: string; hint?: boolean }
): string | undefined {
  const ids = [hint ? `${name}-hint` : null, error ? `${name}-error` : null]
    .filter(Boolean)
    .join(" ")

  return ids || undefined
}

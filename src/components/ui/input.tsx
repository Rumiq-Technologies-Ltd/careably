import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

/*
 * Restyled from the shadcn base-nova default: 44px tall, 8px radius per the
 * shape lock, and no `md:text-sm` step-down. Shrinking input text to 14px on
 * desktop is the wrong direction for this audience.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-input border border-input bg-white px-3.5 text-base text-ink transition-colors outline-none",
        "placeholder:text-ink-muted/70",
        "focus-visible:border-ring focus-visible:outline-3 focus-visible:outline-offset-0 focus-visible:outline-ring/40",
        "disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-70",
        "aria-invalid:border-destructive aria-invalid:outline-3 aria-invalid:outline-destructive/25",
        className
      )}
      {...props}
    />
  )
}

export { Input }

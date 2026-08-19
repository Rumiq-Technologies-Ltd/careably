import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-28 w-full rounded-input border border-input bg-white px-3.5 py-2.5 text-base leading-relaxed text-ink transition-colors outline-none",
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

export { Textarea }

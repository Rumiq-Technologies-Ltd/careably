import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * 15px rather than the stock 14px. Nothing user-facing on this site drops
 * below 15px. Labels sit above their input, never inside it as a placeholder.
 */
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-[0.9375rem] leading-snug font-semibold text-navy-900 select-none",
        className
      )}
      {...props}
    />
  )
}

export { Label }

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * Restyled from the shadcn base-nova default to the Careably brand.
 *
 * Two deliberate departures from that default:
 *  - Heights start at 44px. The stock 32px default fails the minimum target
 *    size this project holds itself to.
 *  - No dark: variants. The theme is locked light (see docs/brand.md).
 *
 * The 7px radius comes from the client's own stylesheet, not the pill shape
 * the previous brand used.
 */
const buttonBase = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-[7px] border border-transparent text-[0.9375rem] font-bold whitespace-nowrap transition-[background-color,border-color,color,transform] duration-150 outline-none select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.125rem]",
  {
    variants: {
      variant: {
        primary: "bg-navy-900 text-white hover:bg-navy-950",
        outline:
          "border-[1.5px] border-teal-500 bg-white text-navy-900 hover:bg-teal-50",
        teal: "bg-teal-800 text-white hover:bg-teal-900",
        white: "bg-white text-navy-900 hover:bg-teal-50",
        ghost: "text-navy-900 hover:bg-teal-50",
        link: "h-auto rounded-none px-0 text-teal-800 underline underline-offset-4 hover:text-teal-900",
      },
      size: {
        default: "h-11 px-6",
        lg: "h-12 px-7 text-base",
        sm: "h-10 px-5",
        icon: "size-11 px-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

/**
 * Merges through `cn` rather than returning raw cva output.
 *
 * cva only concatenates, so `buttonVariants({ className: "hidden lg:inline-flex" })`
 * would leave both `inline-flex` and `hidden` in the class list and the element
 * would stay visible. Resolving the conflict here means every call site,
 * including links styled as buttons, is safe by default.
 */
function buttonVariants({
  className,
  ...variants
}: VariantProps<typeof buttonBase> & { className?: string } = {}) {
  return cn(buttonBase(variants), className)
}

function Button({
  className,
  variant,
  size,
  ...props
}: Omit<ButtonPrimitive.Props, "className"> &
  VariantProps<typeof buttonBase> & {
    // Base UI also accepts a (state) => string callback here. Narrowed to a
    // plain string so the variant merge above stays straightforward.
    className?: string
  }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  )
}

export { Button, buttonVariants }

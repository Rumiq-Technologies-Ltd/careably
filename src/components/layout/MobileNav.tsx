"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { PRIMARY_NAV } from "@/constants/navigation"
import { ROUTES } from "@/constants/routes"
import { CTA, SITE } from "@/constants/site"

/**
 * The reference HTML hid the nav entirely below 1000px with no replacement,
 * which strands every mobile visitor with no way to reach any section. This
 * is the disclosure that replaces it.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  function close() {
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKeyDown)
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex size-11 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-teal-50"
      >
        {open ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          ref={panelRef}
          className="fixed inset-x-0 top-[78px] bottom-0 z-40 overflow-y-auto border-t border-hairline bg-white px-5 py-6"
        >
          <nav aria-label="Main">
            <ul className="flex flex-col gap-1">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  {/* Closing on click rather than on a pathname change: the
                      anchor links do not change the pathname, so an effect
                      would leave the panel open over the target. */}
                  <Link
                    href={item.href}
                    onClick={close}
                    className="flex min-h-12 items-center rounded-lg px-2 text-lg font-semibold text-navy-900 transition-colors hover:bg-teal-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href={ROUTES.contact}
            onClick={close}
            className={buttonVariants({ size: "lg", className: "mt-6 w-full" })}
          >
            {CTA.header}
          </Link>

          <a
            href={`mailto:${SITE.email}`}
            onClick={close}
            className="mt-4 flex min-h-12 items-center justify-center text-base font-semibold text-teal-800"
          >
            {SITE.email}
          </a>
        </div>
      ) : null}
    </div>
  )
}

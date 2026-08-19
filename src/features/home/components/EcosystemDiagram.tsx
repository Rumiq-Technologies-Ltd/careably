import { ArrowDown, ArrowUp } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  ECOSYSTEM_BOTTOM,
  ECOSYSTEM_LEFT,
  ECOSYSTEM_RIGHT,
  ECOSYSTEM_TOP,
  type EcosystemNode,
} from "@/constants/difference"

function Pill({ node }: { node: EcosystemNode }) {
  const { icon: Icon, label } = node
  return (
    <span className="inline-flex items-center gap-2.5 rounded-xl border border-hairline bg-white px-4 py-2.5 text-[0.9375rem] font-semibold text-navy-900 shadow-card">
      <Icon className="size-[18px] shrink-0 text-teal-700" strokeWidth={1.75} aria-hidden />
      {label}
    </span>
  )
}

function EndCap({
  node,
  tone,
}: {
  node: EcosystemNode
  tone: "navy" | "teal"
}) {
  const { icon: Icon, label } = node
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-[0.9375rem] font-semibold text-white shadow-card",
        // teal-800, not the design's brighter teal: this label is 15px, and
        // white on teal-600 measures 3.44:1 against a 4.5:1 requirement.
        tone === "navy" ? "bg-navy-900" : "bg-teal-800"
      )}
    >
      <Icon className="size-[18px] shrink-0" strokeWidth={1.75} aria-hidden />
      {label}
    </span>
  )
}

/** Dashed connector. Decorative, so it collapses out below lg. */
const connector = "hidden h-px flex-1 border-t border-dashed border-teal-300 lg:block"

/**
 * Careably sitting between the people who need services and the providers who
 * deliver them.
 *
 * Presented as a real list to assistive technology: the connecting lines and
 * arrows are decorative and hidden, and below `lg` the whole thing collapses to
 * a plain stack rather than trying to hold a radial layout on a phone.
 */
export function EcosystemDiagram() {
  return (
    <figure className="m-0">
      <figcaption className="sr-only">
        Careably connects residents, families and communities with dental,
        podiatry, audiology, primary care, therapy, wellness, transportation and
        other services.
      </figcaption>

      <div className="flex flex-col items-center gap-3">
        <EndCap node={ECOSYSTEM_TOP} tone="navy" />
        <span className="hidden h-6 border-l border-dashed border-teal-300 lg:block" aria-hidden />
        <ArrowDown className="hidden size-4 text-teal-500 lg:block" strokeWidth={2.5} aria-hidden />
      </div>

      <div className="mt-3 grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
        <ul className="flex flex-col gap-3">
          {ECOSYSTEM_LEFT.map((node) => (
            <li key={node.label} className="flex items-center justify-end">
              <Pill node={node} />
              <span className={connector} aria-hidden />
            </li>
          ))}
        </ul>

        <div
          className="mx-auto flex size-[180px] shrink-0 flex-col items-center justify-center rounded-full border-[5px] border-teal-50 bg-white shadow-lift"
          aria-hidden
        >
          <span className="font-serif text-[3.5rem] leading-none font-bold text-teal-600">
            C
          </span>
          <span className="mt-1 font-serif text-[1.375rem] font-bold text-navy-900">
            Careably
          </span>
        </div>

        <ul className="flex flex-col gap-3">
          {ECOSYSTEM_RIGHT.map((node) => (
            <li key={node.label} className="flex items-center justify-start">
              <span className={connector} aria-hidden />
              <Pill node={node} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 flex flex-col items-center gap-3">
        <ArrowUp className="hidden size-4 text-teal-500 lg:block" strokeWidth={2.5} aria-hidden />
        <span className="hidden h-6 border-l border-dashed border-teal-300 lg:block" aria-hidden />
        <EndCap node={ECOSYSTEM_BOTTOM} tone="teal" />
      </div>
    </figure>
  )
}

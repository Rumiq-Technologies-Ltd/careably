import { Section } from "@/components/layout/Section"
import { SERVICE_CATEGORIES, SERVICES_HEADING } from "@/constants/services"

/**
 * Three columns divided by hairlines, matching the design.
 *
 * Each category's items render as dot-separated rows. The separators are
 * decorative, so they are marked aria-hidden and the items stay as list
 * semantics underneath.
 */
export function ServicesOverview() {
  return (
    <Section id="categories" tone="tint">
      <h2 className="text-center text-[clamp(1.75rem,3.2vw,2.375rem)]">
        {SERVICES_HEADING}
      </h2>
      <div className="mx-auto mt-5 h-px w-16 bg-teal-400" aria-hidden />

      <div className="reveal mt-12 grid gap-10 md:grid-cols-3 md:gap-0">
        {SERVICE_CATEGORIES.map(({ key, icon: Icon, title, rows }, index) => (
          <div
            key={key}
            className={
              index < SERVICE_CATEGORIES.length - 1
                ? "px-2 md:border-r md:border-hairline md:px-8"
                : "px-2 md:px-8"
            }
          >
            <span className="mx-auto flex size-[68px] items-center justify-center rounded-full bg-teal-50">
              <Icon className="size-8 text-teal-700" strokeWidth={1.75} aria-hidden />
            </span>

            <h3 className="mt-4 text-center font-sans text-[1.125rem] font-bold tracking-wide text-teal-800 uppercase">
              {title}
            </h3>

            <ul className="mt-4 flex flex-col items-center gap-1.5">
              {rows.map((row) => (
                <li
                  key={row.join("-")}
                  className="text-center text-[0.9375rem] leading-relaxed text-ink"
                >
                  {row.map((item, itemIndex) => (
                    <span key={item}>
                      {itemIndex > 0 ? (
                        <span className="mx-1.5 text-teal-400" aria-hidden>
                          &middot;
                        </span>
                      ) : null}
                      {item}
                    </span>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

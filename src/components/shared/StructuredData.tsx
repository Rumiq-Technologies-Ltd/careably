/**
 * Emits JSON-LD.
 *
 * The payload is built from typed constants in this repository, never from
 * user input, so there is no injection surface here. The `<` escape is
 * belt-and-braces against a future value containing a closing script tag.
 */
export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}

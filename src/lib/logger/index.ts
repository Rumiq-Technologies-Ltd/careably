type Level = "info" | "warn" | "error"

type Fields = Record<string, unknown>

/**
 * Structured logging. One line of JSON per event so production logs stay
 * greppable.
 *
 * Never pass the inquiry message body, and never pass a full contact record.
 * A correlation ID plus the inquiry type is enough to trace a submission
 * through the pipeline without putting personal data in the log stream.
 */
function write(level: Level, event: string, fields: Fields = {}): void {
  const line = JSON.stringify({ level, event, ...fields })

  if (level === "error") {
    console.error(line)
    return
  }

  if (level === "warn") {
    console.warn(line)
    return
  }

  console.info(line)
}

export const logger = {
  info: (event: string, fields?: Fields) => write("info", event, fields),
  warn: (event: string, fields?: Fields) => write("warn", event, fields),
  error: (event: string, fields?: Fields) => write("error", event, fields),
}

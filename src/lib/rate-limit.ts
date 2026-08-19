interface Bucket {
  timestamps: number[]
}

const buckets = new Map<string, Bucket>()

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
/** Guards the Map itself against unbounded growth from spoofed IPs. */
const MAX_TRACKED_KEYS = 5000

/**
 * Fixed-window limiter held in process memory.
 *
 * This is best-effort, not a guarantee. Each serverless instance keeps its own
 * Map, so a caller spread across instances gets a higher effective limit, and
 * the counters reset whenever an instance recycles. It is enough to blunt a
 * naive flood, and it is paired with a honeypot and a timing check rather than
 * relied on alone. If real abuse shows up, move this to a shared store and
 * keep the same call signature.
 */
export function checkRateLimit(key: string): { allowed: boolean } {
  const now = Date.now()

  if (buckets.size > MAX_TRACKED_KEYS) {
    buckets.clear()
  }

  const bucket = buckets.get(key) ?? { timestamps: [] }
  const recent = bucket.timestamps.filter(
    (timestamp) => now - timestamp < WINDOW_MS
  )

  if (recent.length >= MAX_PER_WINDOW) {
    buckets.set(key, { timestamps: recent })
    return { allowed: false }
  }

  recent.push(now)
  buckets.set(key, { timestamps: recent })
  return { allowed: true }
}

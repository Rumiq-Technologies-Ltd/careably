import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Stable in Next 16, moved out of `experimental`.
  typedRoutes: true,

  // `cacheComponents` is deliberately left off. It is the umbrella flag that
  // replaced dynamicIO, useCache and ppr, and it would force the Cache
  // Components model onto a fully static marketing site for no benefit.
}

export default nextConfig

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * React Compiler is enabled via .babelrc configuration
   * The compiler provides automatic optimization and memoization for React components:
   * - Automatically memoizes components and values
   * - Eliminates need for manual useMemo, useCallback, and memo()
   * - Improves performance without developer intervention
   *
   * Configuration: See .babelrc for babel-plugin-react-compiler settings
   */

  /**
   * Next.js 16 Performance Optimizations
   */
  
  // Cache Components (formerly PPR) - Enables granular caching and streaming
  // Combines static and dynamic rendering for optimal performance
  cacheComponents: true, // Enable globally (can opt-out per route if needed)
  
  // Turbopack - Next.js 16's faster bundler (use with `next dev --turbo`)
  // Already available by default in Next.js 16, no config needed

  transpilePackages: ["geist"],
};
export default config;

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
if (!process.env.SKIP_ENV_VALIDATION) {
  await import("./src/env.mjs");
}

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  reactCompiler: true,

  // Cache Components (formerly PPR) - Enables granular caching and streaming
  cacheComponents: true,

  transpilePackages: ["geist"],
};
export default config;

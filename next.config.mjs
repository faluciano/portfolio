/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
if (!process.env.SKIP_ENV_VALIDATION) {
  // @ts-expect-error -- env validation side-effect import
  await import("./src/env.ts");
}

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  reactCompiler: true,

  // Cache Components (formerly PPR) - Enables granular caching and streaming
  cacheComponents: true,

  transpilePackages: ["geist"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/devicons/devicon/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/usebruno/bruno/**",
      },
    ],
  },
};
export default config;

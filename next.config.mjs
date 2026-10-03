/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  reactCompiler: true,

  // Cache Components (formerly PPR) - Enables granular caching and streaming
  cacheComponents: true,

  transpilePackages: ["geist"],
};
export default config;

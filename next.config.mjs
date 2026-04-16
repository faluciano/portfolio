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

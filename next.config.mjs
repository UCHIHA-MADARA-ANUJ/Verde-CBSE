/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  headers: async () => [
    {
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
        { key: "Access-Control-Allow-Headers", value: "Content-Type" },
      ],
    },
  ],
  // Windows: use polling for more stable file watching
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        poll: 300,
        aggregateTimeout: 300,
        ignored: ["**/.next/**", "**/node_modules/**"],
      };
    }
    return config;
  },
};
export default nextConfig;

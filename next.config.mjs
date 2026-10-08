/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // The three WebGL scenes are plain static HTML in /public, so Next's image
  // optimiser is never in the critical path. Keeping it off avoids a needless
  // serverless function on Vercel.
  images: { unoptimized: true },

  compiler: {
    // strip console noise from production bundles, keep errors
    removeConsole: isDev ? false : { exclude: ["error", "warn"] },
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
      {
        // ~2 MB of vendored three.js — immutable, never revalidate
        source: "/vendor/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // the preloaded scene documents
        source: "/scenes/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, must-revalidate" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },

  webpack: (config, { isServer, dev }) => {
    // Polling is a local Windows-watcher workaround only. Enabling it on a
    // build machine just burns CPU, so it must never reach production.
    if (dev && !isServer) {
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

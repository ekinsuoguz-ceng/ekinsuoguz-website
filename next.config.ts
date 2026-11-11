import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Images uploaded to Convex Storage.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.convex.cloud",
        pathname: "/api/storage/**",
      },
    ],
  },
};

export default nextConfig;

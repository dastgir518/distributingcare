import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Note: For production, this should be restricted to exactly your WordPress domain
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ]
  }
};

export default nextConfig;

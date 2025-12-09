import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.autofun.co.id",
      },
      {
        protocol: "https",
        hostname: "s3-alpha-sig.figma.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      {
        protocol: "http",
        hostname: "31.220.81.182",
      },
      {
        protocol: "http",
        hostname: "69.62.80.7",
      },
      {
        protocol: "https",
        hostname: "api.inspeksimobil.id",
      },
      {
        protocol: "https",
        hostname: "staging-api.inspeksimobil.id",
      },
    ],
  },
  output: "standalone",
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

export default nextConfig;

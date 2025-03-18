import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "images.autofun.co.id",
      "s3-alpha-sig.figma.com",
    ],
  },
};

export default nextConfig;

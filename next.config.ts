import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "images.autofun.co.id",
      "s3-alpha-sig.figma.com",
      "i.ibb.co.com",
      "31.220.81.182",
      "69.62.80.7",
    ],
  },
  output: "standalone",
};

export default nextConfig;

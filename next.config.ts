import type { NextConfig } from "next";
import * as dns from "dns";

// Force IPv4 ordering to fix ETIMEDOUT errors on IPv6 networks
// This fixes Next.js Image Optimization fetching from S3/Backblaze
try {
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {
  // Ignore if not available in older Node versions, but we assume Node 18+
}

const nextConfig: NextConfig = {
  // ==========================================
  // SECURITY CONFIGURATION
  // ==========================================

  // Disable x-powered-by header to avoid exposing Next.js version
  poweredByHeader: false,

  // Enable React strict mode for better security and performance
  reactStrictMode: true,

  // Compress responses for better performance
  compress: true,

  // Security headers configuration
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // ==========================================
  // IMAGE OPTIMIZATION
  // ==========================================
  images: {
    unoptimized: true,
    // Limit image sizes to prevent abuse
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Limit formats
    formats: ["image/avif", "image/webp"],
    // Minimize stale content
    minimumCacheTTL: 60,
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
        protocol: "https",
        hostname: "api.inspeksimobil.id",
      },
      {
        protocol: "https",
        hostname: "staging-api.inspeksimobil.id",
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
        protocol: "http",
        hostname: "147.93.81.117",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "*.backblazeb2.com",
      },
      {
        protocol: "https",
        hostname: "f005.backblazeb2.com",
      },
      {
        protocol: "https",
        hostname: "sl-car-dano.s3.us-east-005.backblazeb2.com",
      }
    ],
  },

  // ==========================================
  // BUILD CONFIGURATION
  // ==========================================

  // Enable standalone output for optimized Docker deployments
  output: "standalone",

  // Disable source maps in production to prevent information leakage
  productionBrowserSourceMaps: false,

  // Webpack configuration
  webpack: (config, { isServer }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    // Ignore specific modules that aren't needed
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
      };
    }

    return config;
  },

  // ==========================================
  // EXPERIMENTAL FEATURES (Security-related)
  // ==========================================
  experimental: {
    // Enable server actions with proper size limits
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;

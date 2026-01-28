import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Security middleware for Next.js
 * Adds security headers to all responses to protect against common attacks
 */
export function middleware(_request: NextRequest) {
  // Clone the response
  const response = NextResponse.next();

  const isDev = process.env.NODE_ENV !== "production";

  // Get the nonce for CSP (you can generate this dynamically per request if needed)
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  // Content Security Policy - Strict policy to prevent XSS attacks
  // Note: You may need to adjust these based on your specific needs
  const connectSrc = [
    "'self'",
    "https://api.inspeksimobil.id",
    "https://staging-api.inspeksimobil.id",
    "http://31.220.81.182",
    "http://76.13.21.243",
    // Local dev
    "https://localhost:3000",
    "https://localhost:3010",
    ...(isDev
      ? [
          "http://localhost:3000",
          "http://localhost:3010",
          "ws://localhost:3000",
          "ws://localhost:3010",
        ]
      : []),
  ].join(" ");

  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'", // unsafe-inline needed for styled-components/emotion
    "img-src 'self' data: blob: https://images.unsplash.com https://plus.unsplash.com https://images.autofun.co.id https://s3-alpha-sig.figma.com https://i.ibb.co.com https://api.inspeksimobil.id https://staging-api.inspeksimobil.id http://31.220.81.182 http://76.13.21.243",
    "font-src 'self' data:",
    `connect-src ${connectSrc}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    // In dev we often call local HTTP services; don't auto-upgrade to HTTPS.
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");

  // Security Headers
  const securityHeaders: Record<string, string> = {
    // Prevent clickjacking attacks
    "X-Frame-Options": "DENY",
    
    // Prevent MIME type sniffing
    "X-Content-Type-Options": "nosniff",
    
    // Enable XSS protection in older browsers
    "X-XSS-Protection": "1; mode=block",
    
    // Control referrer information
    "Referrer-Policy": "strict-origin-when-cross-origin",
    
    // Permissions Policy (formerly Feature Policy)
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    
    // Strict Transport Security (HSTS) - Force HTTPS (production only)
    ...(isDev
      ? {}
      : {
          // max-age is set to 1 year, includeSubDomains ensures all subdomains use HTTPS
          "Strict-Transport-Security":
            "max-age=31536000; includeSubDomains; preload",
        }),
    
    // Content Security Policy
    "Content-Security-Policy": cspDirectives,
    
  };

  // Apply security headers to the response
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Add nonce to request headers for use in pages
  response.headers.set("x-nonce", nonce);

  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

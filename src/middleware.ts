import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Security middleware for Next.js
 * Adds security headers to all responses to protect against common attacks
 */
export function middleware(_request: NextRequest) {
  // Clone the response
  const response = NextResponse.next();

  // Content Security Policy - Relaxed for Next.js compatibility
  // Next.js requires 'unsafe-eval' and 'unsafe-inline' for proper functioning
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Required for Next.js
    "style-src 'self' 'unsafe-inline'", // Required for CSS-in-JS
    "img-src 'self' data: blob: https: http:", // Allow images from CDNs
    "font-src 'self' data:",
    "connect-src 'self' https://prod-api.inspeksimobil.id https://staging-api.inspeksimobil.id https://api.inspeksimobil.id http://31.220.81.182 http://69.62.80.7 http://147.93.81.117 http://localhost:3010 http://localhost:3012 https://sl-car-dano.s3.us-east-005.backblazeb2.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
  ].join("; ");

  // Security Headers
  const securityHeaders = {
    // Prevent clickjacking attacks
    "X-Frame-Options": "DENY",

    // Prevent MIME type sniffing
    "X-Content-Type-Options": "nosniff",

    // Enable XSS protection in older browsers
    "X-XSS-Protection": "1; mode=block",

    // Control referrer information
    "Referrer-Policy": "strict-origin-when-cross-origin",

    // Permissions Policy (formerly Feature Policy)
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",

    // Strict Transport Security (HSTS) - Force HTTPS
    // max-age is set to 1 year, includeSubDomains ensures all subdomains use HTTPS
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",

    // Content Security Policy
    "Content-Security-Policy": cspDirectives,

    // Cross-Origin policies for additional isolation
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Embedder-Policy": "unsafe-none",
    "Cross-Origin-Resource-Policy": "cross-origin",
  };

  // Apply security headers to the response
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

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

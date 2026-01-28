const DEFAULT_DEV_API_URL = "http://localhost:3010/api/v1";

function normalizeApiUrl(raw?: string): string | undefined {
  if (!raw) return undefined;

  try {
    const parsed = new URL(raw);

    // Development backend runs HTTP; normalize localhost URLs away from https.
    const isLocalhost =
      parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";

    if (isLocalhost && parsed.protocol === "https:") {
      parsed.protocol = "http:";
    }

    // Remove trailing slash for consistent concatenation.
    return parsed.toString().replace(/\/$/, "");
  } catch {
    // If it's not a valid absolute URL, return as-is.
    return raw.replace(/\/$/, "");
  }
}

export const API_BASE_URL: string | undefined = (() => {
  const normalized = normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL);
  if (normalized) return normalized;

  if (process.env.NODE_ENV !== "production") {
    return DEFAULT_DEV_API_URL;
  }

  return undefined;
})();

export function requireApiBaseUrl(): string {
  if (!API_BASE_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not configured (and no dev default is available)."
    );
  }
  return API_BASE_URL;
}

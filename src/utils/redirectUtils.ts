/**
 * Utility functions for handling redirects after authentication
 */

export const REDIRECT_KEY = "redirectAfterLogin";

/**
 * Saves the current page URL to localStorage for redirect after login
 */
export const saveRedirectUrl = (url?: string) => {
  if (typeof window !== "undefined") {
    const redirectUrl =
      url || window.location.pathname + window.location.search;
    localStorage.setItem(REDIRECT_KEY, redirectUrl);
  }
};

/**
 * Gets the saved redirect URL and clears it from localStorage
 * Only returns internal URLs for security
 */
export const getAndClearRedirectUrl = (): string | null => {
  if (typeof window !== "undefined") {
    const redirectUrl = localStorage.getItem(REDIRECT_KEY);
    if (redirectUrl) {
      localStorage.removeItem(REDIRECT_KEY);

      // Security check: only allow internal URLs (starting with /)
      if (redirectUrl.startsWith("/") && !redirectUrl.startsWith("//")) {
        return redirectUrl;
      }
    }
  }
  return null;
};

/**
 * Clears the saved redirect URL without returning it
 */
export const clearRedirectUrl = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(REDIRECT_KEY);
  }
};

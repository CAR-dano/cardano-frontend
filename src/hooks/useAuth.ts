"use client";

import { useAppSelector, AppDispatch } from "../lib/store";
import { refreshToken, logout } from "../lib/features/auth/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "../components/ui/use-toast";

// Paths that don't require authentication
const publicPaths = ["/auth", "/", "/result"];

// Token refresh interval in milliseconds (15 minutes)
const TOKEN_REFRESH_INTERVAL = 15 * 60 * 1000;

// Session timeout in milliseconds (30 minutes of inactivity)
const SESSION_TIMEOUT = 30 * 60 * 1000;

// Warning before session timeout in milliseconds (1 minute before timeout)
const WARNING_BEFORE_TIMEOUT = 60 * 1000;

export default function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();

  const {
    isAuthenticated,
    user,
    accessToken,
    isLoading,
    lastTokenCheck,
    isAuthInitialized,
  } = useAppSelector((state) => state.auth);

  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const [sessionTimeoutId, setSessionTimeoutId] =
    useState<NodeJS.Timeout | null>(null);
  const [isTimeoutWarningOpen, setIsTimeoutWarningOpen] = useState(false);
  const [timeoutWarningTimestamp, setTimeoutWarningTimestamp] = useState<
    number | null
  >(null);

  // Check if the current path is public
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  // Update last activity time on user interactions
  const updateLastActivity = () => {
    setLastActivity(Date.now());
    // Clear timeout warning if it's open
    if (isTimeoutWarningOpen) {
      setIsTimeoutWarningOpen(false);
      setTimeoutWarningTimestamp(null);
    }
  };

  // Reset the session timer
  const resetSession = () => {
    updateLastActivity();

    // Refresh the token to ensure it's still valid
    if (accessToken) {
      dispatch(refreshToken());
    }
  };

  // Check for session timeout
  const checkSessionTimeout = () => {
    if (!isAuthenticated) return;

    const now = Date.now();
    const inactiveTime = now - lastActivity;

    // If the warning is already showing, don't show it again
    if (isTimeoutWarningOpen) return;

    // If approaching timeout, show warning
    if (inactiveTime >= SESSION_TIMEOUT - WARNING_BEFORE_TIMEOUT) {
      setIsTimeoutWarningOpen(true);
      setTimeoutWarningTimestamp(now);
    }
  };

  // Handle session timeout
  const handleSessionTimeout = () => {
    // Only timeout if the warning was shown and not interacted with
    if (isTimeoutWarningOpen && timeoutWarningTimestamp) {
      const now = Date.now();
      const timeoutWarningTime = now - timeoutWarningTimestamp;

      if (timeoutWarningTime >= WARNING_BEFORE_TIMEOUT) {
        handleLogout();

        // Show toast notification for session expiration
        toast({
          title: "Session Expired",
          description: "You have been logged out due to inactivity.",
          variant: "destructive",
        });
      }
    }
  };

  // Handle logout with optional message
  const handleLogout = (message?: string) => {
    // Clear timeout warning
    setIsTimeoutWarningOpen(false);
    setTimeoutWarningTimestamp(null);

    dispatch(logout());
    router.push("/auth");

    if (message) {
      toast({
        title: "Logged Out",
        description: message,
        variant: "default",
      });
    }
  };

  // Set up activity tracking
  useEffect(() => {
    if (!isAuthenticated) return;

    // Track user activity
    const events = ["mousedown", "keydown", "touchstart", "scroll"];
    events.forEach((event) => {
      window.addEventListener(event, updateLastActivity);
    });

    // Set up session timeout checker
    const timeoutId = setInterval(() => {
      checkSessionTimeout();
      // Also handle the actual timeout
      if (isTimeoutWarningOpen) {
        handleSessionTimeout();
      }
    }, 15000); // Check every 15 seconds

    setSessionTimeoutId(timeoutId);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, updateLastActivity);
      });
      if (sessionTimeoutId) {
        clearInterval(sessionTimeoutId);
      }
    };
  }, [
    isAuthenticated,
    lastActivity,
    isTimeoutWarningOpen,
    timeoutWarningTimestamp,
  ]);

  // Token refresh logic
  useEffect(() => {
    // Skip for public paths or when no token is available
    if (isPublicPath || !accessToken) return;

    const now = Date.now();

    // If last token check was more than the refresh interval ago, refresh the token
    if (!lastTokenCheck || now - lastTokenCheck > TOKEN_REFRESH_INTERVAL) {
      dispatch(refreshToken());
    }

    // Set up periodic token refresh
    const refresherId = setInterval(() => {
      if (isAuthenticated && accessToken) {
        dispatch(refreshToken());
      }
    }, TOKEN_REFRESH_INTERVAL);

    return () => {
      clearInterval(refresherId);
    };
  }, [accessToken, isAuthenticated, lastTokenCheck, isPublicPath, dispatch]);

  // Route protection
  useEffect(() => {
    // Skip for public paths or if auth hasn't initialized
    if (isPublicPath || !isAuthInitialized) return;

    // Redirect to login if not authenticated and trying to access protected route
    if (!isLoading && !isAuthenticated && !isPublicPath) {
      router.push("/auth");
    }
  }, [
    isAuthenticated,
    isLoading,
    pathname,
    router,
    isPublicPath,
    isAuthInitialized,
  ]);

  return {
    isAuthenticated,
    isLoading,
    user,
    isAuthInitialized,
    logout: handleLogout,
    resetSession,
    isTimeoutWarningOpen,
    setIsTimeoutWarningOpen,
    isAdminOrReviewer: user?.role === "ADMIN" || user?.role === "REVIEWER",
  };
}

"use client";

import { useAppSelector, AppDispatch } from "../lib/store";
import { refreshToken, logout } from "../lib/features/auth/authSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "../components/ui/use-toast";

// Paths that don't require authentication
const publicPaths = ["/auth", "/", "/result"];

// Token refresh interval in milliseconds (15 minutes)
const TOKEN_REFRESH_INTERVAL = 30 * 60 * 1000;

let refreshIntervalId: ReturnType<typeof setInterval> | null = null;
let refreshSubscriberCount = 0;
let latestAccessToken: string | null = null;
let latestIsAuthenticated = false;
let latestDispatch: AppDispatch | null = null;
let latestIsRefreshing = false;

const ensureRefreshTimer = () => {
  if (refreshIntervalId || !latestDispatch) {
    return;
  }

  refreshIntervalId = setInterval(() => {
    if (
      latestDispatch &&
      latestIsAuthenticated &&
      latestAccessToken &&
      !latestIsRefreshing
    ) {
      latestDispatch(refreshToken());
    }
  }, TOKEN_REFRESH_INTERVAL);
};

const clearRefreshTimer = () => {
  if (refreshIntervalId) {
    clearInterval(refreshIntervalId);
    refreshIntervalId = null;
  }
};

export default function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();

  const {
    isAuthenticated,
    user,
    accessToken,
    isLoading,
    isRefreshing,
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
  const hasSubscribedForRefresh = useRef(false);

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

  // Cleanup function to cancel any ongoing requests
  const cleanupOnLogout = () => {
    // Clear any timeouts
    if (sessionTimeoutId) {
      clearInterval(sessionTimeoutId);
      setSessionTimeoutId(null);
    }

    // Reset activity states
    setIsTimeoutWarningOpen(false);
    setTimeoutWarningTimestamp(null);
  }; // Handle logout with optional message
  const handleLogout = async (message?: string) => {
    try {
      // Cleanup first
      cleanupOnLogout();

      // Dispatch logout and wait for completion
      await dispatch(logout()).unwrap();

      // Show message if provided
      if (message) {
        toast({
          title: "Logged Out",
          description: message,
          variant: "default",
        });
      }

      // Force a hard navigation to ensure clean state
      window.location.href = "/auth";
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, still cleanup and redirect
      cleanupOnLogout();
      window.location.href = "/auth";
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

    // Disable session timeout checker
    // const timeoutId = setInterval(() => {
    //   checkSessionTimeout();
    //   // Also handle the actual timeout
    //   if (isTimeoutWarningOpen) {
    //     handleSessionTimeout();
    //   }
    // }, 15000); // Check every 15 seconds

    // setSessionTimeoutId(timeoutId);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, updateLastActivity);
      });
      // if (sessionTimeoutId) {
      //   clearInterval(sessionTimeoutId);
      // }
    };
  }, [
    isAuthenticated,
    lastActivity,
    isTimeoutWarningOpen,
    timeoutWarningTimestamp,
  ]);

  useEffect(() => {
    latestAccessToken = accessToken || null;
    latestIsAuthenticated = isAuthenticated;
    latestDispatch = dispatch;
    latestIsRefreshing = isRefreshing;
  }, [accessToken, isAuthenticated, isRefreshing, dispatch]);

  // Token refresh logic
  useEffect(() => {
    const shouldRefresh = !isPublicPath && !!accessToken && isAuthenticated;

    if (!shouldRefresh) {
      if (hasSubscribedForRefresh.current) {
        refreshSubscriberCount = Math.max(refreshSubscriberCount - 1, 0);
        if (refreshSubscriberCount === 0) {
          clearRefreshTimer();
        }
        hasSubscribedForRefresh.current = false;
      }
      return;
    }

    const now = Date.now();

    if (!lastTokenCheck || now - lastTokenCheck > TOKEN_REFRESH_INTERVAL) {
      dispatch(refreshToken());
    }

    if (!hasSubscribedForRefresh.current) {
      refreshSubscriberCount += 1;
      ensureRefreshTimer();
      hasSubscribedForRefresh.current = true;
    }

    return () => {
      if (hasSubscribedForRefresh.current) {
        refreshSubscriberCount = Math.max(refreshSubscriberCount - 1, 0);
        if (refreshSubscriberCount === 0) {
          clearRefreshTimer();
        }
        hasSubscribedForRefresh.current = false;
      }
    };
  }, [accessToken, isAuthenticated, lastTokenCheck, isPublicPath, dispatch]);

  const effectiveLoading = isLoading && !isRefreshing;

  // Route protection
  useEffect(() => {
    // Skip for public paths or if auth hasn't initialized
    if (isPublicPath || !isAuthInitialized) return;

    // Redirect to login if not authenticated and trying to access protected route
    if (!effectiveLoading && !isAuthenticated && !isPublicPath) {
      router.push("/auth");
    }
  }, [
    isAuthenticated,
    effectiveLoading,
    pathname,
    router,
    isPublicPath,
    isAuthInitialized,
  ]);

  return {
    isAuthenticated,
    isLoading: effectiveLoading,
    isRefreshing,
    user,
    isAuthInitialized,
    logout: handleLogout,
    resetSession,
    isTimeoutWarningOpen,
    setIsTimeoutWarningOpen,
    isAdminOrReviewer: user?.role === "ADMIN" || user?.role === "REVIEWER",
  };
}

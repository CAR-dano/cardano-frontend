"use client";

import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import LoadingScreen from "../../components/LoadingFullScreen";
import { toast } from "../../hooks/use-toast";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRoles?: Array<
    "SUPERADMIN" | "ADMIN" | "REVIEWER" | "USER" | "CUSTOMER"
  >;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requiredRoles = [],
}) => {
  const { isAuthenticated, isLoading, user, isAuthInitialized } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  useEffect(() => {
    // Wait until auth is fully initialized and not loading
    if (isAuthInitialized && !isLoading) {
      // Authentication check
      if (!isAuthenticated) {
        // Don't show toast if we're already on auth page to prevent duplicate messages
        if (
          typeof window !== "undefined" &&
          !window.location.pathname.includes("/auth")
        ) {
          toast({
            title: "Authentication Required",
            description: "Please log in to access this page",
            variant: "destructive",
          });
        }

        // Use window.location for hard redirect to ensure clean state
        window.location.href = "/auth";
        return;
      }

      // Role-based authorization check
      if (requiredRoles.length > 0) {
        const hasRequiredRole =
          user && requiredRoles.includes(user.role as any);

        if (!hasRequiredRole) {
          toast({
            title: "Access Denied",
            description: "You don't have permission to access this page",
            variant: "destructive",
          });
          window.location.href = "/";
          return;
        }
      }

      setIsAuthorized(true);
      setIsAuthChecked(true);
    }
  }, [isAuthenticated, isLoading, user, requiredRoles, isAuthInitialized]);

  // Show loading while waiting for auth to initialize or complete checking
  if (!isAuthInitialized || isLoading || !isAuthChecked) {
    return <LoadingScreen message="Verifying access..." />;
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;

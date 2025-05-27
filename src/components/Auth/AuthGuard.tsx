"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";
import LoadingScreen from "../../components/LoadingFullScreen";
import { toast } from "../../hooks/use-toast";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRoles?: Array<"ADMIN" | "REVIEWER" | "USER">;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requiredRoles = [],
}) => {
  const { isAuthenticated, isLoading, user, isAuthInitialized } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    // Wait until auth is fully initialized and not loading
    if (isAuthInitialized && !isLoading) {
      // Authentication check
      if (!isAuthenticated) {
        toast({
          title: "Authentication Required",
          description: "Please log in to access this page",
          variant: "destructive",
        });
        router.push("/auth");
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
          router.push("/");
          return;
        }
      }

      setIsAuthorized(true);
      setIsAuthChecked(true);
    }
  }, [
    isAuthenticated,
    isLoading,
    router,
    user,
    requiredRoles,
    isAuthInitialized,
  ]);

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

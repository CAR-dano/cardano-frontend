"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector, AppDispatch } from "../../lib/store";
import {
  checkToken,
  setAuthInitialized,
} from "../../lib/features/auth/authSlice";
import LoadingScreen from "../../components/LoadingFullScreen";

interface AuthInitializerProps {
  children: React.ReactNode;
}

/**
 * AuthInitializer verifies authentication state at app startup and
 * ensures proper initialization before rendering the app content.
 * This prevents flashing of protected content or unnecessary redirects.
 */
const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isInitializing, setIsInitializing] = useState(true);

  const { isAuthInitialized, accessToken } = useAppSelector(
    (state) => state.auth
  );
  useEffect(() => {
    const initializeAuth = async () => {
      // Skip initialization if already done
      if (isAuthInitialized) {
        setIsInitializing(false);
        return;
      }

      try {
        // Check for token in localStorage first, then Redux state
        const storedToken =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const tokenToCheck = storedToken || accessToken;
        if (tokenToCheck) {
          await dispatch(checkToken(tokenToCheck)).unwrap();
        } else {
          // No token found, mark as initialized with not authenticated
          dispatch(setAuthInitialized(true));
        }
      } catch (error) {
        console.error("Error during auth initialization:", error);
        // Even on error, we mark auth as initialized
        dispatch(setAuthInitialized(true));
      } finally {
        setIsInitializing(false);
      }
    };

    // Only run on client
    if (typeof window !== "undefined") {
      initializeAuth();
    }
  }, [dispatch, isAuthInitialized, accessToken]);

  // Show loading screen while initializing
  if (isInitializing) {
    return <LoadingScreen message="Initializing application..." />;
  }

  return <>{children}</>;
};

export default AuthInitializer;

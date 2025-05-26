"use client";

import React from "react";
import useAuth from "@/hooks/useAuth";
import SessionTimeoutDialog from "@/components/Dialog/SessionTimeoutDialog";

interface SessionTimeoutWrapperProps {
  children: React.ReactNode;
}

export default function SessionTimeoutWrapper({ children }: SessionTimeoutWrapperProps) {
  // Get auth-related functionality
  const { 
    isAuthenticated, 
    isTimeoutWarningOpen, 
    setIsTimeoutWarningOpen, 
    resetSession, 
    logout 
  } = useAuth();

  return (
    <>
      {children}
      
      {/* Session timeout warning dialog */}
      {isAuthenticated && (
        <SessionTimeoutDialog
          isOpen={isTimeoutWarningOpen}
          onStayLoggedIn={() => {
            resetSession();
            setIsTimeoutWarningOpen(false);
          }}
          onLogout={() => {
            logout("You have been logged out due to inactivity");
          }}
          timeRemaining={60} // 60 seconds warning before logout
          countdownStart={60}
        />
      )}
    </>
  );
}
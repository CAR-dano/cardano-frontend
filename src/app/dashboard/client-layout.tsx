"use client";
import Header from "../../components/Admin/Header";
import Sidebar from "../../components/Admin/Sidebar";
import AuthGuard from "../../components/Auth/AuthGuard";
import LoadingScreen from "../../components/LoadingFullScreen";
import SessionTimeoutWrapper from "../../components/SessionTimeoutWrapper";
import useAuth from "../../hooks/useAuth";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function DashboardClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading } = useAuth();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if path is a preview page that should skip the dashboard layout
  const isPreviewPage = mounted && pathname.startsWith("/dashboard/preview/");

  if (!mounted) {
    return <LoadingScreen message="Loading dashboard..." />;
  }

  if (isPreviewPage) {
    // Render children directly without dashboard layout for preview pages
    return <>{children}</>;
  }

  return (
    <AuthGuard requiredRoles={["ADMIN", "REVIEWER"]}>
      {isLoading ? (
        <LoadingScreen message="Loading dashboard..." />
      ) : (
        <SessionTimeoutWrapper>
          <div className="flex flex-col lg:flex-row bg-gray-100 dark:bg-gray-900 font-rubik h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 bg-white dark:bg-gray-800 min-w-0 overflow-y-auto">
              <Header />
              <div className="p-4 lg:p-6 xl:p-10">{children}</div>
            </main>
          </div>
        </SessionTimeoutWrapper>
      )}
    </AuthGuard>
  );
}

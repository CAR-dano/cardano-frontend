"use client";
import Header from "@/components/Admin/Header";
import Sidebar from "@/components/Admin/Sidebar";
import LoadingScreen from "@/components/LoadingFullScreen";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/lib/store";
import { useEffect, useState } from "react";

export default function CreatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useAppSelector((state) => state.auth.user);

  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to access this page.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/dashboard/auth";
      }, 2000);
    } else if (user.role !== "ADMIN") {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access this page.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="flex flex-col lg:flex-row bg-primary font-rubik">
          <Sidebar />
          <main className="flex-1 bg-white">
            <Header />
            <div className="p-10">{children}</div>
          </main>
        </div>
      )}
    </>
  );
}

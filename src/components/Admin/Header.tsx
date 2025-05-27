"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { useAppSelector } from "../../lib/store";
import { ThemeToggle } from "../../components/ui/ThemeToggle";

const Header = () => {
  const user = useAppSelector((state) => state.auth.user);
  const currentTime = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section - Breadcrumb */}
        <div className="flex items-center space-x-4">
          <BreadcrumbComponent />
        </div>

        {/* Right Section - User Info & Actions */}
        <div className="flex items-center space-x-6">
          {/* Date & Time */}
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {currentTime}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {currentDate}
            </p>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Search size={20} />
          </button>

          <div className="relative">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={20} />
          </button> */}
        </div>
      </div>
    </header>
  );
};

const BreadcrumbComponent = () => {
  const pathName = usePathname();
  const path = pathName.split("/").filter((item) => item);

  // Create breadcrumb items with proper labels
  const getBreadcrumbLabel = (item: string) => {
    const labels: { [key: string]: string } = {
      dashboard: "Dashboard",
      review: "Draft Reviewer",
      database: "Data Tersimpan",
      usermanagement: "User Management",
      data: "Detail Data",
      preview: "Preview",
    };
    return labels[item] || item.charAt(0).toUpperCase() + item.slice(1);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Home Icon */}
      <div className="flex items-center justify-center w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
        <svg
          className="w-4 h-4 text-orange-600 dark:text-orange-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </div>

      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/dashboard"
              className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-colors"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          {path.map((item, index) => {
            if (item === "admin") return null;

            const href = `/${path.slice(0, index + 1).join("/")}`;
            const isLast = index === path.length - 1;

            return (
              <React.Fragment key={index}>
                <BreadcrumbSeparator className="text-gray-400 dark:text-gray-500" />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={href}
                    className={`font-medium transition-colors ${
                      isLast
                        ? "text-orange-600 dark:text-orange-400 cursor-default"
                        : "text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                    }`}
                  >
                    {getBreadcrumbLabel(item)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Header;

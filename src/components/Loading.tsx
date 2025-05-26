import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const Loading = () => {
  const { isDarkModeEnabled } = useTheme();

  return (
    <div
      className={`flex items-center justify-center p-8 ${
        isDarkModeEnabled ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Modern spinner with multiple rings */}
        <div className="relative">
          {/* Outer ring */}
          <div
            className={`w-16 h-16 border-4 rounded-full animate-spin ${
              isDarkModeEnabled
                ? "border-blue-800 border-t-blue-400"
                : "border-blue-100 border-t-blue-500"
            }`}
          ></div>

          {/* Middle ring */}
          <div
            className={`absolute top-2 left-2 w-12 h-12 border-4 rounded-full animate-spin animate-pulse ${
              isDarkModeEnabled
                ? "border-orange-800 border-t-orange-400"
                : "border-orange-100 border-t-orange-500"
            }`}
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>

          {/* Inner ring */}
          <div
            className={`absolute top-4 left-4 w-8 h-8 border-4 rounded-full animate-spin ${
              isDarkModeEnabled
                ? "border-purple-800 border-t-purple-400"
                : "border-purple-100 border-t-purple-500"
            }`}
            style={{ animationDuration: "0.8s" }}
          ></div>

          {/* Center dot */}
          <div
            className={`absolute top-6 left-6 w-4 h-4 rounded-full animate-pulse ${
              isDarkModeEnabled
                ? "bg-gradient-to-r from-blue-400 to-purple-400"
                : "bg-gradient-to-r from-blue-500 to-purple-500"
            }`}
          ></div>
        </div>

        {/* Loading text with typing animation */}
        <div className="flex items-center space-x-1">
          <span
            className={`font-medium ${
              isDarkModeEnabled ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Memuat
          </span>
          <div className="flex space-x-1">
            <div
              className={`w-1 h-1 rounded-full animate-bounce ${
                isDarkModeEnabled ? "bg-blue-400" : "bg-blue-500"
              }`}
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className={`w-1 h-1 rounded-full animate-bounce ${
                isDarkModeEnabled ? "bg-blue-400" : "bg-blue-500"
              }`}
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className={`w-1 h-1 rounded-full animate-bounce ${
                isDarkModeEnabled ? "bg-blue-400" : "bg-blue-500"
              }`}
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className={`w-32 h-1 rounded-full overflow-hidden ${
            isDarkModeEnabled ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          <div
            className={`h-full rounded-full animate-pulse ${
              isDarkModeEnabled
                ? "bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400"
                : "bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500"
            }`}
          ></div>
        </div>

        {/* Optional loading message */}
        <p
          className={`text-xs text-center max-w-xs ${
            isDarkModeEnabled ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Sedang memproses data inspeksi...
        </p>
      </div>
    </div>
  );
};

// Alternative compact loading spinner for inline use
export const LoadingSpinner = ({
  size = "sm",
  color = "blue",
}: {
  size?: "xs" | "sm" | "md" | "lg";
  color?: "blue" | "orange" | "purple" | "gray";
}) => {
  const { isDarkModeEnabled } = useTheme();

  const sizeClasses = {
    xs: "w-4 h-4",
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const colorClasses = {
    blue: isDarkModeEnabled
      ? "border-blue-800 border-t-blue-400"
      : "border-blue-100 border-t-blue-500",
    orange: isDarkModeEnabled
      ? "border-orange-800 border-t-orange-400"
      : "border-orange-100 border-t-orange-500",
    purple: isDarkModeEnabled
      ? "border-purple-800 border-t-purple-400"
      : "border-purple-100 border-t-purple-500",
    gray: isDarkModeEnabled
      ? "border-gray-700 border-t-gray-400"
      : "border-gray-200 border-t-gray-500",
  };

  return (
    <div
      className={`${sizeClasses[size]} border-2 ${colorClasses[color]} rounded-full animate-spin`}
    ></div>
  );
};

// Loading skeleton for table rows
export const LoadingSkeleton = ({ rows = 3 }: { rows?: number }) => {
  const { isDarkModeEnabled } = useTheme();

  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div
            className={`flex space-x-4 p-4 rounded-lg border ${
              isDarkModeEnabled
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full ${
                isDarkModeEnabled ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
            <div className="flex-1 space-y-2">
              <div
                className={`h-4 rounded w-3/4 ${
                  isDarkModeEnabled ? "bg-gray-700" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`h-3 rounded w-1/2 ${
                  isDarkModeEnabled ? "bg-gray-700" : "bg-gray-200"
                }`}
              ></div>
            </div>
            <div className="space-y-2">
              <div
                className={`h-4 rounded w-16 ${
                  isDarkModeEnabled ? "bg-gray-700" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`h-3 rounded w-12 ${
                  isDarkModeEnabled ? "bg-gray-700" : "bg-gray-200"
                }`}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Loading overlay for full screen
export const LoadingOverlay = ({
  message = "Memuat...",
}: {
  message?: string;
}) => {
  const { isDarkModeEnabled } = useTheme();

  return (
    <div
      className={`fixed inset-0 bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center ${
        isDarkModeEnabled ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div
        className={`flex flex-col items-center space-y-4 p-8 rounded-lg shadow-lg border ${
          isDarkModeEnabled
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Car loading animation */}
        <div className="relative w-24 h-16">
          <svg viewBox="0 0 96 64" className="w-full h-full">
            {/* Road */}
            <rect
              x="0"
              y="48"
              width="96"
              height="8"
              className={`fill-gray-300 ${
                isDarkModeEnabled ? "fill-gray-600" : ""
              }`}
            />
            <rect
              x="0"
              y="52"
              width="96"
              height="2"
              className={`fill-yellow-400 ${
                isDarkModeEnabled ? "fill-yellow-300" : ""
              }`}
            />

            {/* Car body with moving animation */}
            <g className="animate-pulse">
              <rect
                x="20"
                y="32"
                width="40"
                height="16"
                rx="2"
                className={`fill-blue-500 ${
                  isDarkModeEnabled ? "fill-blue-400" : ""
                }`}
              />
              <rect
                x="24"
                y="28"
                width="20"
                height="8"
                rx="1"
                className={`fill-blue-300 ${
                  isDarkModeEnabled ? "fill-blue-200" : ""
                }`}
              />
              {/* Wheels */}
              <circle
                cx="28"
                cy="52"
                r="4"
                className={`fill-gray-600 animate-spin ${
                  isDarkModeEnabled ? "fill-gray-500" : ""
                }`}
              />
              <circle
                cx="52"
                cy="52"
                r="4"
                className={`fill-gray-600 animate-spin ${
                  isDarkModeEnabled ? "fill-gray-500" : ""
                }`}
              />
              {/* Headlight */}
              <circle
                cx="62"
                cy="38"
                r="2"
                className={`fill-yellow-300 animate-pulse ${
                  isDarkModeEnabled ? "fill-yellow-200" : ""
                }`}
              />
            </g>

            {/* Exhaust smoke */}
            <g className="opacity-60">
              <circle
                cx="18"
                cy="36"
                r="1"
                className={`fill-gray-400 animate-bounce ${
                  isDarkModeEnabled ? "fill-gray-500" : ""
                }`}
                style={{ animationDelay: "0ms" }}
              />
              <circle
                cx="16"
                cy="34"
                r="1.5"
                className={`fill-gray-400 animate-bounce ${
                  isDarkModeEnabled ? "fill-gray-500" : ""
                }`}
                style={{ animationDelay: "200ms" }}
              />
              <circle
                cx="14"
                cy="32"
                r="1"
                className={`fill-gray-400 animate-bounce ${
                  isDarkModeEnabled ? "fill-gray-500" : ""
                }`}
                style={{ animationDelay: "400ms" }}
              />
            </g>
          </svg>
        </div>

        <div className="text-center">
          <h3
            className={`text-lg font-semibold mb-2 ${
              isDarkModeEnabled ? "text-gray-100" : "text-gray-900"
            }`}
          >
            {message}
          </h3>
          <p
            className={`text-sm ${
              isDarkModeEnabled ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Mohon tunggu sebentar...
          </p>
        </div>

        {/* Progress bar */}
        <div
          className={`w-48 h-2 rounded-full overflow-hidden ${
            isDarkModeEnabled ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          <div
            className={`h-full rounded-full animate-pulse ${
              isDarkModeEnabled
                ? "bg-gradient-to-r from-blue-400 to-orange-400"
                : "bg-gradient-to-r from-blue-500 to-orange-500"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

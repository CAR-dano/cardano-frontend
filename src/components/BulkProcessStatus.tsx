"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../lib/store";
import {
  FiCheck,
  FiX,
  FiLoader,
  FiClock,
  FiMinimize2,
  FiMaximize2,
  FiXCircle,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { clearBulkProcess } from "../lib/features/bulk/bulkSlice";

const BulkProcessStatus = () => {
  const bulkState = useAppSelector((state) => state.bulk);
  const dispatch = useAppDispatch();
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second when processing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (bulkState.isProcessing) {
      interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [bulkState.isProcessing]);

  // Don't show if no process is running or no items
  if (
    !bulkState.processId &&
    !bulkState.isProcessing &&
    bulkState.items.length === 0
  ) {
    return null;
  }

  const progressPercentage =
    bulkState.totalItems > 0
      ? Math.round((bulkState.processedItems / bulkState.totalItems) * 100)
      : 0;

  const handleClearProcess = () => {
    dispatch(clearBulkProcess());
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getElapsedTime = () => {
    if (!bulkState.startedAt) return "";

    const start = new Date(bulkState.startedAt);
    const end = bulkState.finishedAt
      ? new Date(bulkState.finishedAt)
      : currentTime;
    const diff = Math.floor((end.getTime() - start.getTime()) / 1000);

    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;

    return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
  };

  const getProcessingStatus = () => {
    if (bulkState.isProcessing) {
      return {
        color: "blue",
        icon: FiLoader,
        label: "Processing...",
        bgClass: "bg-gradient-to-r from-blue-500 to-blue-600",
        textClass: "text-white",
      };
    }

    if (bulkState.errorItems > 0) {
      return {
        color: "yellow",
        icon: FiAlertCircle,
        label: "Completed with Errors",
        bgClass: "bg-gradient-to-r from-yellow-500 to-yellow-600",
        textClass: "text-white",
      };
    }

    return {
      color: "green",
      icon: FiCheckCircle,
      label: "Completed Successfully",
      bgClass: "bg-gradient-to-r from-green-500 to-green-600",
      textClass: "text-white",
    };
  };

  const status = getProcessingStatus();
  const IconComponent = status.icon;

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isMinimized ? "w-72" : "w-96"
      }`}
    >
      {/* Main Status Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
        {/* Header with gradient */}
        <div className={`${status.bgClass} ${status.textClass} px-6 py-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                {bulkState.isProcessing ? (
                  <IconComponent className="animate-spin w-6 h-6" />
                ) : (
                  <IconComponent className="w-6 h-6" />
                )}
                {bulkState.isProcessing && (
                  <div className="absolute -inset-2 border-2 border-white border-opacity-30 rounded-full animate-pulse"></div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold">{status.label}</h3>
                <div className="text-sm opacity-90">
                  {bulkState.isProcessing
                    ? `${bulkState.processedItems} of ${bulkState.totalItems} items`
                    : `Finished in ${getElapsedTime()}`}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? (
                  <FiMaximize2 size={16} />
                ) : (
                  <FiMinimize2 size={16} />
                )}
              </button>

              {!bulkState.isProcessing && (
                <button
                  onClick={handleClearProcess}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
                  title="Close"
                >
                  <FiXCircle size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span className="font-medium">Progress</span>
            <span className="font-bold text-gray-800 dark:text-gray-200">
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ease-out ${
                bulkState.isProcessing
                  ? "bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse"
                  : bulkState.errorItems > 0
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                  : "bg-gradient-to-r from-green-400 to-green-600"
              }`}
              style={{ width: `${progressPercentage}%` }}
            >
              {bulkState.isProcessing && (
                <div className="h-full w-full bg-white bg-opacity-20 animate-shimmer"></div>
              )}
            </div>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Statistics Cards */}
            <div className="px-6 py-4">
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-3 border border-blue-200 dark:border-blue-700">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-400 bg-opacity-10 rounded-full -mr-8 -mt-8"></div>
                  <div className="relative">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {bulkState.totalItems}
                    </div>
                    <div className="text-xs font-medium text-blue-500 dark:text-blue-300">
                      Total Items
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl p-3 border border-green-200 dark:border-green-700">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-green-400 bg-opacity-10 rounded-full -mr-8 -mt-8"></div>
                  <div className="relative">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {bulkState.successItems}
                    </div>
                    <div className="text-xs font-medium text-green-500 dark:text-green-300">
                      Successful
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-xl p-3 border border-red-200 dark:border-red-700">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-red-400 bg-opacity-10 rounded-full -mr-8 -mt-8"></div>
                  <div className="relative">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {bulkState.errorItems}
                    </div>
                    <div className="text-xs font-medium text-red-500 dark:text-red-300">
                      Failed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Items List */}
            {bulkState.items.length > 0 && (
              <div className="px-6 pb-4">
                <div className="max-h-48 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                  {bulkState.items.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                        item.status === "success"
                          ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700"
                          : item.status === "error"
                          ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700"
                          : item.status === "processing"
                          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 animate-pulse"
                          : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.customerName || `Item ${index + 1}`}
                        </div>
                        {item.vehiclePlate && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            🚗 {item.vehiclePlate}
                          </div>
                        )}
                        {item.errorMessage && (
                          <div className="text-xs text-red-600 dark:text-red-400 truncate mt-1">
                            ⚠️ {item.errorMessage}
                          </div>
                        )}
                      </div>

                      <div className="ml-3 flex-shrink-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            item.status === "success"
                              ? "bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300"
                              : item.status === "error"
                              ? "bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300"
                              : item.status === "processing"
                              ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-400"
                          }`}
                        >
                          {item.status === "pending" && <FiClock size={14} />}
                          {item.status === "processing" && (
                            <FiLoader className="animate-spin" size={14} />
                          )}
                          {item.status === "success" && <FiCheck size={14} />}
                          {item.status === "error" && <FiX size={14} />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Time Info */}
            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  {bulkState.startedAt && (
                    <span>Started: {formatTime(bulkState.startedAt)}</span>
                  )}
                  <span className="flex items-center">
                    <FiClock className="mr-1" />
                    Duration: {getElapsedTime()}
                  </span>
                </div>
                {bulkState.finishedAt && (
                  <span>Finished: {formatTime(bulkState.finishedAt)}</span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BulkProcessStatus;
